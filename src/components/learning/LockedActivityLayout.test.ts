import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(
  path.join(process.cwd(), 'src/components/learning/LockedActivity.module.css'),
  'utf8'
);

describe('locked activity layout', () => {
  it('keeps the brand link at least 44px tall', () => {
    expect(styles).toMatch(/\.brand\s*\{[^}]*min-height:\s*44px;/);
  });
});
