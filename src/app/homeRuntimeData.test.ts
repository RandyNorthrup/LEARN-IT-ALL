import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const home = readFileSync(path.join(process.cwd(), 'src/app/page.tsx'), 'utf8');

describe('home runtime curriculum loading', () => {
  it('loads only the course and first mission instead of the complete activity graph', () => {
    expect(home).toContain("loadCurriculumCourse('responsive-web-design')");
    expect(home).toContain('loadCurriculumModule(course.id, firstModuleId)');
    expect(home).toContain('loadCurriculumActivity(course.id, firstActivityId)');
    expect(home).not.toContain('loadCurriculumGraph');
  });
});
