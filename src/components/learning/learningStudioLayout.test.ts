import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(
  path.join(process.cwd(), 'src/components/learning/LearningStudio.module.css'),
  'utf8'
);
const studio = readFileSync(
  path.join(process.cwd(), 'src/components/learning/LearningStudio.tsx'),
  'utf8'
);

describe('learning studio responsive runtime layout', () => {
  it('gives every activity page a screen-reader-visible level-one heading', () => {
    expect(studio).toContain('<h1 className={styles.visuallyHidden}>{activity.title}</h1>');
    expect(styles).toMatch(
      /\.visuallyHidden\s*\{[^}]*position: absolute;[^}]*clip-path: inset\(50%\);[^}]*white-space: nowrap;/
    );
  });

  it('keeps runtime controls below the sticky course header on wide screens', () => {
    expect(styles).toMatch(
      /@media \(min-width: 901px\)[\s\S]*?\.runtimePanel\s*\{[\s\S]*?position: sticky;[\s\S]*?top: calc\(76px \+ 1rem\);[\s\S]*?align-self: start;/
    );
  });

  it('clips the rounded workspace without creating a scroll container that defeats sticky controls', () => {
    expect(styles).toMatch(/\.codeWorkspace\s*\{[^}]*overflow: clip;/);
    expect(styles).not.toMatch(/\.codeWorkspace\s*\{[^}]*overflow: hidden;/);
  });

  it('gives runtime actions a touch-size target', () => {
    expect(styles).toMatch(/\.previewBar button\s*\{[^}]*min-height: 44px;/);
    expect(styles).toMatch(/\.feedback button\s*\{[^}]*min-height: 44px;/);
  });

  it('stacks evidence labels and long source text on narrow screens', () => {
    expect(styles).toMatch(
      /@media \(max-width: 640px\)[\s\S]*?\.inlineEvidence\s*\{[\s\S]*?grid-template-columns: 1fr;[\s\S]*?gap: 0\.35rem;/
    );
    expect(styles).toMatch(/\.inlineEvidence dd\s*\{[^}]*overflow-wrap: anywhere;/);
  });
});
