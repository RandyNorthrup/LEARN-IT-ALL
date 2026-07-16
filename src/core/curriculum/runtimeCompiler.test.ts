import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { gunzipSync } from 'node:zlib';
import Database from 'better-sqlite3';
import { describe, expect, it } from 'vitest';

const courseRoot = path.join(process.cwd(), 'content', 'v2', 'courses');

describe('curriculum runtime compiler boundary', () => {
  it('does not create course-source files when no reviewed course source exists', () => {
    const courseDirectories = readdirSync(courseRoot, {
      withFileTypes: true,
    }).filter((entry) => entry.isDirectory());
    expect(courseDirectories).toEqual([]);

    const output = execFileSync(
      process.execPath,
      ['scripts/compile-curriculum-runtime-index.mjs'],
      {
        cwd: process.cwd(),
        encoding: 'utf8',
      }
    );
    expect(output).toContain('0 documents');
    expect(
      readdirSync(courseRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())
    ).toEqual([]);
  });

  it('derives a lightweight outline inside the runtime index without writing course output', () => {
    const temporaryRoot = mkdtempSync(path.join(tmpdir(), 'learn-it-all-runtime-'));
    const sourceRoot = path.join(temporaryRoot, 'courses');
    const courseDirectory = path.join(sourceRoot, 'verified-course');
    const outputPath = path.join(temporaryRoot, 'runtime', 'curriculum.sqlite');
    mkdirSync(path.join(courseDirectory, 'modules'), { recursive: true });
    mkdirSync(path.join(courseDirectory, 'activities'), { recursive: true });

    writeFileSync(
      path.join(courseDirectory, 'course.json'),
      JSON.stringify({ id: 'verified-course', moduleIds: ['first-module'] })
    );
    writeFileSync(
      path.join(courseDirectory, 'modules', 'first-module.json'),
      JSON.stringify({
        id: 'first-module',
        courseId: 'verified-course',
        activityIds: ['first-activity'],
      })
    );
    writeFileSync(
      path.join(courseDirectory, 'activities', 'first-activity.json'),
      JSON.stringify({
        schemaVersion: 2,
        id: 'first-activity',
        courseId: 'verified-course',
        moduleId: 'first-module',
        kind: 'workshop',
        title: 'First verified activity',
        prerequisites: [],
        estimatedMinutes: 20,
        steps: [{ id: 'first-step' }],
      })
    );

    try {
      execFileSync(
        process.execPath,
        [
          'scripts/compile-curriculum-runtime-index.mjs',
          '--source-root',
          sourceRoot,
          '--output',
          outputPath,
        ],
        { cwd: process.cwd(), encoding: 'utf8' }
      );

      expect(existsSync(path.join(courseDirectory, 'outline.json'))).toBe(false);
      const database = new Database(outputPath, { readonly: true, fileMustExist: true });
      const row = database
        .prepare(
          "SELECT compressed_json FROM curriculum_documents WHERE document_key = 'outline:verified-course'"
        )
        .get() as { compressed_json: Buffer };
      database.close();
      const outline = JSON.parse(gunzipSync(row.compressed_json).toString('utf8'));

      expect(outline).toMatchObject({
        schemaVersion: 1,
        course: { id: 'verified-course' },
        modules: [{ id: 'first-module' }],
        activities: [{ id: 'first-activity', stepIds: ['first-step'] }],
      });
    } finally {
      rmSync(temporaryRoot, { recursive: true, force: true });
    }
  });

  it('rejects a runtime output path inside reviewed course source', () => {
    const unsafeOutput = path.join(courseRoot, 'curriculum.sqlite');
    const result = spawnSync(
      process.execPath,
      [
        'scripts/compile-curriculum-runtime-index.mjs',
        '--source-root',
        courseRoot,
        '--output',
        unsafeOutput,
      ],
      { cwd: process.cwd(), encoding: 'utf8' }
    );

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('outside reviewed course source');
    expect(existsSync(unsafeOutput)).toBe(false);
  });
});
