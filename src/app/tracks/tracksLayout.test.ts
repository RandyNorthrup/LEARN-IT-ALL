import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(path.join(process.cwd(), 'src/app/tracks/Tracks.module.css'), 'utf8');
const source = readFileSync(path.join(process.cwd(), 'src/app/tracks/page.tsx'), 'utf8');

describe('learning tracks surface', () => {
  it('does not expose dead course links while no full path is published', () => {
    expect(source).toContain('No complete learning paths are open yet.');
    expect(source).toContain('role="status"');
    expect(source).not.toContain('/learn/');
  });

  it('uses touch-sized actions, visible focus, and a one-column narrow layout', () => {
    expect(styles).toMatch(/\.empty a\s*\{[^}]*min-height:\s*46px;/);
    expect(styles).toMatch(/\.empty a:focus-visible,[\s\S]*?outline:\s*3px/);
    expect(styles).toMatch(
      /@media \(max-width:\s*900px\)[\s\S]*?\.empty,[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\);/
    );
  });
});
