import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const component = readFileSync(
  path.join(process.cwd(), 'src/components/games/PracticeArcade.tsx'),
  'utf8'
);
const styles = readFileSync(
  path.join(process.cwd(), 'src/components/games/PracticeArcade.module.css'),
  'utf8'
);

describe('practice arcade accessibility contract', () => {
  it('announces deterministic feedback and exposes keyboard ordering controls', () => {
    expect(component).toContain('aria-live="polite"');
    expect(component).toMatch(/Move step \$\{index \+ 1\} up/);
    expect(component).toMatch(/Move step \$\{index \+ 1\} down/);
    expect(component).not.toContain('Math.random');
  });

  it('keeps controls touch sized and provides responsive and reduced-motion layouts', () => {
    expect(styles).toMatch(/\.orderActions button\s*\{[^}]*min-height:\s*44px;/);
    expect(styles).toMatch(/\.primaryAction,[\s\S]*?min-height:\s*48px;/);
    expect(styles).toContain('@media (max-width: 900px)');
    expect(styles).toContain('@media (max-width: 600px)');
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
  });
});
