import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(path.join(process.cwd(), 'src/app/Home.module.css'), 'utf8');

describe('home responsive interaction layout', () => {
  it('keeps compact header and course-map links at least 44 pixels tall', () => {
    expect(styles).toMatch(/\.brand\s*\{[^}]*min-height:\s*44px;/u);
    expect(styles).toMatch(/\.settings\s*\{[^}]*width:\s*44px;[^}]*height:\s*44px;/u);
    expect(styles).toMatch(/\.sectionHeader > a\s*\{[^}]*min-height:\s*44px;/u);
  });
});
