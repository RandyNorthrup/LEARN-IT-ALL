import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(path.join(process.cwd(), 'src/app/challenges/page.tsx'), 'utf8');
const styles = readFileSync(
  path.join(process.cwd(), 'src/app/challenges/Challenges.module.css'),
  'utf8'
);

describe('V2 practice mixer', () => {
  it('loads real curriculum activities and reports prerequisite access', () => {
    expect(source).toContain('loadCurriculumActivity');
    expect(source).toContain('storedActivityAccess');
    expect(source).toContain('unmetPrerequisites.length');
    expect(source).toContain('access.unmetPrerequisites[0]');
    expect(source).toContain('Start next prerequisite');
    expect(source).not.toContain("difficulty: 'Expert'");
  });

  it('keeps room actions large, focused, and mobile-safe', () => {
    expect(styles).toMatch(/\.roomCard\s*>\s*a\s*\{[^}]*min-height:\s*48px;/);
    expect(styles).toMatch(/\.roomCard\s*>\s*a:focus-visible\s*\{[^}]*outline:\s*3px/);
    expect(styles).toMatch(
      /@media \(max-width:\s*960px\)[\s\S]*?\.roomCard\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\);/
    );
  });
});
