import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(path.join(process.cwd(), 'src/app/courses/Courses.module.css'), 'utf8');
const page = readFileSync(path.join(process.cwd(), 'src/app/courses/page.tsx'), 'utf8');

describe('course catalog accessibility contract', () => {
  it('keeps the compact home control at least touch-target height', () => {
    expect(styles).toMatch(/\.back\s*\{[^}]*min-height:\s*44px;/);
    expect(styles).toMatch(/\.brand\s*\{[^}]*min-height:\s*44px;/);
  });

  it('keeps decorative catalog icons out of the accessibility tree', () => {
    expect(page).toContain('<ArrowLeft aria-hidden="true" />');
    expect(page).toContain('<Filter aria-hidden="true" />');
    expect(page).toContain('<ArrowRight aria-hidden="true" />');
  });

  it('shows a navigable status message instead of planned or dead course cards', () => {
    expect(page).toContain('PUBLISHED_COURSES');
    expect(page).toContain('role="status"');
    expect(page).toContain('No courses are open yet.');
    expect(page).not.toContain('showPlanned');
    expect(page).not.toContain('rebuild queue');
  });

  it('provides responsive, touch-sized catalog pagination', () => {
    expect(page).toContain('aria-label="Course catalog pages"');
    expect(page).toContain('rel="prev"');
    expect(page).toContain('rel="next"');
    expect(styles).toMatch(/\.pagination a,[\s\S]*?min-height:\s*44px;/);
    expect(styles).toMatch(
      /@media \(max-width:\s*600px\)[\s\S]*?\.pagination\s*\{[\s\S]*?grid-template-columns:\s*1fr 1fr;/
    );
  });
});
