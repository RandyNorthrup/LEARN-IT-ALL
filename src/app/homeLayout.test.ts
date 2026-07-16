import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(path.join(process.cwd(), 'src/app/Home.module.css'), 'utf8');

describe('home responsive interaction layout', () => {
  it('keeps compact navigation and primary actions touch sized', () => {
    expect(styles).toMatch(/\.brand\s*\{[^}]*min-height:\s*44px;/u);
    expect(styles).toMatch(/\.header nav :where\(a\)\s*\{[^}]*min-height:\s*44px;/u);
    expect(styles).toMatch(/\.settings\s*\{[^}]*width:\s*44px;[^}]*height:\s*44px;/u);
    expect(styles).toMatch(/\.heroActions a,[\s\S]*?min-height:\s*46px;/u);
  });

  it('keeps primary navigation visible on phones', () => {
    expect(styles).toMatch(
      /@media \(max-width: 700px\)[\s\S]*?\.header nav\s*\{[^}]*display:\s*flex;[^}]*grid-column:\s*1 \/ -1;/u
    );
    expect(styles).not.toMatch(/\.header nav\s*\{[^}]*display:\s*none;/u);
  });
});
