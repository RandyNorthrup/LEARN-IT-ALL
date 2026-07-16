import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const courseRoot = path.join(process.cwd(), 'content', 'v2', 'courses');

describe('curriculum outline generation boundary', () => {
  it('does not recreate rejected courses when no reviewed course source exists', () => {
    const courseDirectories = readdirSync(courseRoot, {
      withFileTypes: true,
    }).filter((entry) => entry.isDirectory());
    expect(courseDirectories).toEqual([]);

    const output = execFileSync(process.execPath, ['scripts/generate-curriculum-outlines.mjs'], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });
    expect(output).toContain('0 courses');
    expect(
      readdirSync(courseRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())
    ).toEqual([]);
  });
});
