import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(
  path.join(process.cwd(), 'src/app/settings/SettingsClient.tsx'),
  'utf8'
);
const styles = readFileSync(
  path.join(process.cwd(), 'src/app/settings/Settings.module.css'),
  'utf8'
);

describe('V2 settings surface', () => {
  it('offers only current all-course and single-course resets behind a native dialog', () => {
    expect(source).toContain(
      "type ResetRequest = { type: 'all' } | { type: 'course'; courseId: string }"
    );
    expect(source).toContain('<dialog');
    expect(source).toContain('aria-describedby="reset-dialog-description"');
    expect(source).not.toContain("type: 'lesson'");
    expect(source).not.toContain("type: 'quiz'");
  });

  it('keeps controls large, visibly focused, and single-column on narrow screens', () => {
    expect(styles).toMatch(/\.panel button,\s*\n\.dialog button\s*\{[^}]*min-height:\s*48px;/);
    expect(styles).toMatch(/\.dialog button:focus-visible\s*\{[^}]*outline:\s*3px/);
    expect(styles).toMatch(
      /\.dialog\s*\{[^}]*max-height:\s*calc\(100svh\s*-\s*2rem\);[^}]*margin:\s*auto;/
    );
    expect(styles).toMatch(
      /@media \(max-width:\s*800px\)[\s\S]*?\.settingsGrid\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\);/
    );
  });
});
