import path from 'node:path';
import Database from 'better-sqlite3';
import { describe, expect, it } from 'vitest';
import {
  loadCurriculumActivity,
  loadCurriculumCourse,
  loadCurriculumModule,
  loadCurriculumOutline,
} from './repository';

const indexPath = path.join(process.cwd(), 'content', 'v2', '.runtime', 'curriculum.sqlite');

describe('curriculum runtime index', () => {
  it('contains no rejected generated curriculum documents', () => {
    const database = new Database(indexPath, {
      readonly: true,
      fileMustExist: true,
    });
    const documentCount = database
      .prepare('SELECT COUNT(*) AS count FROM curriculum_documents')
      .get() as { count: number };
    const metadataRows = database.prepare('SELECT key, value FROM curriculum_metadata').all() as {
      key: string;
      value: string;
    }[];
    database.close();

    const metadata = Object.fromEntries(metadataRows.map((row) => [row.key, row.value]));
    expect(documentCount.count).toBe(0);
    expect(metadata.document_count).toBe('0');
    expect(metadata.raw_bytes).toBe('0');
    expect(metadata.compressed_bytes).toBe('0');
    expect(metadata.content_digest).toMatch(/^[a-f0-9]{64}$/u);
  });

  it('cannot load a deleted course through any repository boundary', () => {
    expect(() => loadCurriculumCourse('responsive-web-design')).toThrow(
      'Missing curriculum document: course:responsive-web-design'
    );
    expect(() => loadCurriculumModule('responsive-web-design', 'basic-html')).toThrow(
      'Missing curriculum document: module:responsive-web-design:basic-html'
    );
    expect(() => loadCurriculumActivity('responsive-web-design', 'old-activity')).toThrow(
      'Missing curriculum document: activity:responsive-web-design:old-activity'
    );
    expect(() => loadCurriculumOutline('responsive-web-design')).toThrow(
      'Missing curriculum document: outline:responsive-web-design'
    );
  });
});
