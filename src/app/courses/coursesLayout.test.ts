import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(path.join(process.cwd(), 'src/app/courses/Courses.module.css'), 'utf8');
const page = readFileSync(path.join(process.cwd(), 'src/app/courses/page.tsx'), 'utf8');

describe('course catalog accessibility contract', () => {
  it('keeps the compact home control at least touch-target height', () => {
    expect(styles).toMatch(/\.back\s*\{[^}]*min-height:\s*44px;/);
  });

  it('keeps decorative catalog icons out of the accessibility tree', () => {
    expect(page).toContain('<ArrowLeft aria-hidden="true" />');
    expect(page).toContain('<Filter aria-hidden="true" />');
    expect(page).toContain('<Clock3 aria-hidden="true" />');
    expect(page).toContain('<Layers3 aria-hidden="true" />');
  });
});
