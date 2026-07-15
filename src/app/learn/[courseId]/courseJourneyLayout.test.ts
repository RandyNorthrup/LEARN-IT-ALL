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
});
