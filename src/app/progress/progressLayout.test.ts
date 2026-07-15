import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(path.join(process.cwd(), 'src/app/progress/page.tsx'), 'utf8');
const styles = readFileSync(
  path.join(process.cwd(), 'src/app/progress/Progress.module.css'),
  'utf8'
);

describe('V2 progress surface', () => {
  it('reports interactive evidence and does not label legacy tables as current progress', () => {
    expect(source).toContain('interactionsCompleted');
    expect(source).toContain('activitiesPracticed');
    expect(source).toContain('previous-edition records preserved');
    expect(source).not.toContain('lessonsCompleted');
    expect(source).not.toContain('quizzesPassed');
  });

  it('keeps actions touch sized, focused, and responsive', () => {
    expect(styles).toMatch(/\.actions a\s*\{[^}]*min-height:\s*48px;/);
    expect(styles).toMatch(/\.actions a:focus-visible\s*\{[^}]*outline:\s*3px/);
    expect(styles).toMatch(
      /@media \(max-width:\s*600px\)[\s\S]*?\.metrics dl\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\);/
    );
  });
});
