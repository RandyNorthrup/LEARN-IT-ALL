import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync } from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import Database from 'better-sqlite3';

const FORMAT_VERSION = '3';
const root = path.resolve(import.meta.dirname, '..');
function optionValue(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  const value = process.argv[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`Missing value for ${name}`);
  return path.resolve(value);
}

const sourceRoot = optionValue('--source-root') ?? path.join(root, 'content', 'v2', 'courses');
const outputPath =
  optionValue('--output') ?? path.join(root, 'content', 'v2', '.runtime', 'curriculum.sqlite');
const runtimeRoot = path.dirname(outputPath);
const temporaryPath = `${outputPath}.${process.pid}.tmp`;
const identifierPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

function sortedDirectories(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function sortedJsonFiles(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => entry.name)
    .sort();
}

function assertIdentifier(value, context) {
  if (!identifierPattern.test(value)) throw new Error(`Invalid ${context}: ${value}`);
}

function documentRecord(kind, courseId, documentId, sourcePath, source) {
  assertIdentifier(courseId, 'course identifier');
  assertIdentifier(documentId, `${kind} identifier`);
  JSON.parse(source.toString('utf8'));
  const documentKey =
    kind === 'course' || kind === 'outline'
      ? `${kind}:${courseId}`
      : `${kind}:${courseId}:${documentId}`;
  return { documentKey, kind, courseId, documentId, sourcePath, source };
}

function sourceRecord(kind, courseId, documentId, relativePath) {
  const filePath = path.join(sourceRoot, relativePath);
  if (!existsSync(filePath)) throw new Error(`Missing curriculum source: ${relativePath}`);
  return documentRecord(kind, courseId, documentId, relativePath, readFileSync(filePath));
}

function parseRecord(record) {
  return JSON.parse(record.source.toString('utf8'));
}

function compiledOutlineRecord(courseId, courseRecord, moduleRecords, activityRecords) {
  const course = parseRecord(courseRecord);
  if (course.id !== courseId) throw new Error(`Course directory mismatch: ${courseId}`);

  const modulesById = new Map(
    moduleRecords.map((record) => [record.documentId, parseRecord(record)])
  );
  const activitiesById = new Map(
    activityRecords.map((record) => [record.documentId, parseRecord(record)])
  );
  const modules = course.moduleIds.map((moduleId) => {
    const module = modulesById.get(moduleId);
    if (!module) throw new Error(`Course ${courseId} references missing module: ${moduleId}`);
    if (module.courseId !== courseId) throw new Error(`Module owner mismatch: ${moduleId}`);
    return module;
  });
  const activities = [];
  for (const module of modules) {
    for (const activityId of module.activityIds) {
      const activity = activitiesById.get(activityId);
      if (!activity) {
        throw new Error(`Module ${module.id} references missing activity: ${activityId}`);
      }
      if (activity.courseId !== courseId || activity.moduleId !== module.id) {
        throw new Error(`Activity owner mismatch: ${activityId}`);
      }
      activities.push({
        schemaVersion: activity.schemaVersion,
        id: activity.id,
        courseId: activity.courseId,
        moduleId: activity.moduleId,
        kind: activity.kind,
        title: activity.title,
        prerequisites: activity.prerequisites,
        estimatedMinutes: activity.estimatedMinutes,
        stepIds: activity.steps.map((step) => step.id),
      });
    }
  }

  const source = Buffer.from(
    `${JSON.stringify({ schemaVersion: 1, course, modules, activities })}\n`
  );
  return documentRecord(
    'outline',
    courseId,
    courseId,
    `compiled-from:${courseId}/course.json`,
    source
  );
}

function collectSources() {
  const records = [];
  for (const courseId of sortedDirectories(sourceRoot)) {
    const courseRecord = sourceRecord('course', courseId, courseId, `${courseId}/course.json`);
    const moduleRecords = [];
    const activityRecords = [];
    records.push(courseRecord);
    for (const fileName of sortedJsonFiles(path.join(sourceRoot, courseId, 'modules'))) {
      const documentId = fileName.slice(0, -'.json'.length);
      moduleRecords.push(
        sourceRecord('module', courseId, documentId, `${courseId}/modules/${fileName}`)
      );
    }
    for (const fileName of sortedJsonFiles(path.join(sourceRoot, courseId, 'activities'))) {
      const documentId = fileName.slice(0, -'.json'.length);
      activityRecords.push(
        sourceRecord('activity', courseId, documentId, `${courseId}/activities/${fileName}`)
      );
    }
    records.push(...moduleRecords, ...activityRecords);
    records.push(compiledOutlineRecord(courseId, courseRecord, moduleRecords, activityRecords));
  }
  records.sort((left, right) => left.documentKey.localeCompare(right.documentKey));
  return records;
}

function sourceFingerprint(records) {
  const hash = createHash('sha256');
  hash.update(`${FORMAT_VERSION}\0`);
  for (const record of records) {
    hash.update(`${record.sourcePath}\0${record.source.byteLength}\0`);
    hash.update(record.source);
    hash.update('\0');
  }
  return hash.digest('hex');
}

function currentIndexMatches(fingerprint, expectedCount) {
  if (!existsSync(outputPath)) return false;
  let database;
  try {
    database = new Database(outputPath, { readonly: true, fileMustExist: true });
    const rows = database
      .prepare('SELECT key, value FROM curriculum_metadata')
      .all()
      .map((row) => [row.key, row.value]);
    const metadata = Object.fromEntries(rows);
    return (
      metadata.format_version === FORMAT_VERSION &&
      metadata.source_fingerprint === fingerprint &&
      Number(metadata.document_count) === expectedCount
    );
  } catch {
    return false;
  } finally {
    database?.close();
  }
}

function createIndex(records, fingerprint) {
  mkdirSync(runtimeRoot, { recursive: true });
  rmSync(temporaryPath, { force: true });
  const database = new Database(temporaryPath);
  let rawBytes = 0;
  let compressedBytes = 0;
  const contentDigest = createHash('sha256');

  try {
    database.pragma('journal_mode = OFF');
    database.pragma('synchronous = OFF');
    database.pragma('temp_store = MEMORY');
    database.exec(`
      CREATE TABLE curriculum_documents (
        document_key TEXT PRIMARY KEY,
        kind TEXT NOT NULL,
        course_id TEXT NOT NULL,
        document_id TEXT NOT NULL,
        source_path TEXT NOT NULL,
        compressed_json BLOB NOT NULL,
        raw_bytes INTEGER NOT NULL,
        sha256 TEXT NOT NULL
      ) WITHOUT ROWID;
      CREATE TABLE curriculum_metadata (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      ) WITHOUT ROWID;
    `);

    const insertDocument = database.prepare(`
      INSERT INTO curriculum_documents (
        document_key,
        kind,
        course_id,
        document_id,
        source_path,
        compressed_json,
        raw_bytes,
        sha256
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const insertMetadata = database.prepare(
      'INSERT INTO curriculum_metadata (key, value) VALUES (?, ?)'
    );

    database.transaction(() => {
      for (const record of records) {
        const { source } = record;
        const digest = createHash('sha256').update(source).digest('hex');
        const compressed = gzipSync(source, { level: 9 });
        rawBytes += source.byteLength;
        compressedBytes += compressed.byteLength;
        contentDigest.update(`${record.documentKey}\0${digest}\0`);
        insertDocument.run(
          record.documentKey,
          record.kind,
          record.courseId,
          record.documentId,
          record.sourcePath,
          compressed,
          source.byteLength,
          digest
        );
      }

      const metadata = {
        format_version: FORMAT_VERSION,
        source_fingerprint: fingerprint,
        content_digest: contentDigest.digest('hex'),
        document_count: String(records.length),
        raw_bytes: String(rawBytes),
        compressed_bytes: String(compressedBytes),
      };
      for (const [key, value] of Object.entries(metadata)) insertMetadata.run(key, value);
    })();
    database.exec('VACUUM; ANALYZE;');
    database.close();
    renameSync(temporaryPath, outputPath);
  } catch (error) {
    database.close();
    rmSync(temporaryPath, { force: true });
    throw error;
  }

  return { rawBytes, compressedBytes };
}

const records = collectSources();
const fingerprint = sourceFingerprint(records);
if (currentIndexMatches(fingerprint, records.length)) {
  console.log(`Curriculum runtime index current: ${records.length} documents.`);
} else {
  const { rawBytes, compressedBytes } = createIndex(records, fingerprint);
  console.log(
    `Curriculum runtime index built: ${records.length} documents, ${rawBytes} raw bytes, ${compressedBytes} compressed bytes.`
  );
}
