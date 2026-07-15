import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { describe, expect, it } from 'vitest';
import {
  loadCurriculumActivity,
  loadCurriculumCourse,
  loadCurriculumModule,
  loadCurriculumOutline,
} from './repository';
import { CurriculumActivitySchema, CurriculumCourseSchema, CurriculumModuleSchema } from './schema';

const root = process.cwd();
const sourceRoot = path.join(root, 'content', 'v2', 'courses');
const indexPath = path.join(root, 'content', 'v2', '.runtime', 'curriculum.sqlite');

function sourceJsonPaths(directory = sourceRoot): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceJsonPaths(entryPath);
    if (!entry.isFile() || !entry.name.endsWith('.json')) return [];
    return [path.relative(sourceRoot, entryPath).split(path.sep).join('/')];
  });
}

function readSource(relativePath: string): unknown {
  return JSON.parse(readFileSync(path.join(sourceRoot, relativePath), 'utf8'));
}

describe('generated curriculum runtime index', () => {
  it('indexes every source document exactly once and compresses the runtime payload', () => {
    const database = new Database(indexPath, { readonly: true, fileMustExist: true });
    const indexedPaths = database
      .prepare('SELECT source_path FROM curriculum_documents ORDER BY source_path')
      .all()
      .map((row) => (row as { source_path: string }).source_path);
    const metadataRows = database.prepare('SELECT key, value FROM curriculum_metadata').all() as {
      key: string;
      value: string;
    }[];
    database.close();

    const sourcePaths = sourceJsonPaths().sort();
    const metadata = Object.fromEntries(metadataRows.map((row) => [row.key, row.value]));
    expect(indexedPaths).toEqual(sourcePaths);
    expect(Number(metadata.document_count)).toBe(sourcePaths.length);
    expect(Number(metadata.compressed_bytes)).toBeLessThan(Number(metadata.raw_bytes));
    expect(statSync(indexPath).size).toBeLessThan(Number(metadata.raw_bytes) * 0.35);
    expect(metadata.content_digest).toMatch(/^[a-f0-9]{64}$/u);
  });

  it('returns digest-verified course, module, activity, and outline documents', () => {
    expect(loadCurriculumCourse('responsive-web-design')).toEqual(
      CurriculumCourseSchema.parse(readSource('responsive-web-design/course.json'))
    );
    expect(loadCurriculumModule('responsive-web-design', 'computer-browser-foundations')).toEqual(
      CurriculumModuleSchema.parse(
        readSource('responsive-web-design/modules/computer-browser-foundations.json')
      )
    );
    expect(loadCurriculumActivity('responsive-web-design', 'systems-signal-room')).toEqual(
      CurriculumActivitySchema.parse(
        readSource('responsive-web-design/activities/systems-signal-room.json')
      )
    );
    const sourceOutline = readSource('responsive-web-design/outline.json') as {
      course: { id: string };
      modules: { id: string }[];
      activities: { id: string }[];
    };
    const runtimeOutline = loadCurriculumOutline('responsive-web-design');
    expect(runtimeOutline.course.id).toBe(sourceOutline.course.id);
    expect(runtimeOutline.modules.map((module) => module.id)).toEqual(
      sourceOutline.modules.map((module) => module.id)
    );
    expect(runtimeOutline.activities.map((activity) => activity.id)).toEqual(
      sourceOutline.activities.map((activity) => activity.id)
    );
  });
});
