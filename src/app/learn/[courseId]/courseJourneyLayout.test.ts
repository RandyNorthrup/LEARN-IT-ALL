import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(
  path.join(process.cwd(), 'src/app/learn/[courseId]/CourseJourney.module.css'),
  'utf8'
);

describe('course journey interaction layout', () => {
  it('keeps the brand link at least 44px tall', () => {
    expect(styles).toMatch(/\.brand\s*\{[^}]*min-height:\s*44px;/);
  });

  it('keeps every module action at least 44px tall', () => {
    expect(styles).toMatch(/\.currentModule,\s*\n\.moduleExplore\s*\{[^}]*min-height:\s*44px;/);
  });

  it('allows long course titles and hero content to shrink at mobile widths', () => {
    expect(styles).toMatch(/\.hero\s*>\s*\*\s*\{[^}]*min-width:\s*0;/);
    expect(styles).toMatch(/\.hero h1\s*\{[^}]*overflow-wrap:\s*anywhere;/);
    expect(styles).toMatch(
      /@media \(max-width:\s*560px\)[\s\S]*?\.hero h1\s*\{[^}]*font-size:\s*clamp\(2\.4rem,\s*11\.5vw,\s*4rem\);/
    );
  });

  it('keeps migrated-progress history responsive without granting mastery', () => {
    expect(styles).toMatch(/\.migrationNotice\s*\{[^}]*grid-template-columns:/);
    expect(styles).toMatch(
      /@media \(max-width:\s*900px\)[\s\S]*?\.migrationNotice\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\);/
    );
    expect(styles).toMatch(/\.migrationNotice\s*>\s*\*\s*\{[^}]*min-width:\s*0;/);
  });
});
