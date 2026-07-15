import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

describe('SQL browser runtime assets', () => {
  it('keeps the public sql.js JavaScript and WASM assets synchronized with the installed package', () => {
    const pairs = [
      ['sql-wasm.js', 'sql-wasm.js'],
      ['sql-wasm.wasm', 'sql-wasm.wasm'],
    ] as const;

    for (const [packageName, publicName] of pairs) {
      const installed = readFileSync(
        path.join(root, 'node_modules', 'sql.js', 'dist', packageName)
      );
      const published = readFileSync(path.join(root, 'public', publicName));
      expect(published.equals(installed), publicName).toBe(true);
    }
  });

  it('uses a disposable, row-bounded worker protocol with guaranteed database cleanup', () => {
    const worker = readFileSync(path.join(root, 'public', 'sql-worker.js'), 'utf8');

    expect(worker).toContain("importScripts('/sql-wasm.js')");
    expect(worker).toContain('Math.min(Number(maxRows) || 100, 500)');
    expect(worker).toContain('values.length <= rowLimit');
    expect(worker).toContain('database?.close()');
    expect(worker).not.toContain('fetch(');
    expect(worker).not.toContain('XMLHttpRequest');
  });
});
