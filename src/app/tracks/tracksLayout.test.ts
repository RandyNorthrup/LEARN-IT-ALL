import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(path.join(process.cwd(), 'src/app/tracks/Tracks.module.css'), 'utf8');
const source = readFileSync(path.join(process.cwd(), 'src/app/tracks/page.tsx'), 'utf8');

describe('learning tracks surface', () => {
  it('links every course directly to the V2 learner path', () => {
    expect(source).toMatch(/href=\{`\/learn\/\$\{course\.id\}`\}/);
    expect(source).not.toMatch(/\/tracks\/\$\{track\.id\}/);
  });

  it('uses touch-sized actions, visible focus, and one-column mobile sequences', () => {
    expect(styles).toMatch(/\.courseSequence a\s*\{[^}]*min-height:\s*72px;/);
    expect(styles).toMatch(/\.courseSequence a:focus-visible\s*\{[^}]*outline:\s*3px/);
    expect(styles).toMatch(
      /@media \(max-width:\s*640px\)[\s\S]*?\.courseSequence\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\);/
    );
  });
});
