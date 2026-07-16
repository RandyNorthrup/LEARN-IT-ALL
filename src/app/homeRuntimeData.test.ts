import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const home = readFileSync(path.join(process.cwd(), 'src/app/page.tsx'), 'utf8');

describe('home runtime curriculum loading', () => {
  it('does not hard-code or load an unpublished course as a mission', () => {
    expect(home).not.toContain('responsive-web-design');
    expect(home).not.toContain('loadCurriculum');
    expect(home).toContain('No courses are open yet.');
  });
});
