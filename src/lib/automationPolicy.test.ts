import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const workflowsDirectory = path.join(root, '.github', 'workflows');

function githubWorkflowFiles(): string[] {
  if (!existsSync(workflowsDirectory)) return [];

  return readdirSync(workflowsDirectory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.ya?ml$/u.test(entry.name))
    .map((entry) => path.join(entry.parentPath, entry.name))
    .sort();
}

describe('local-only verification policy', () => {
  it('defines no GitHub Actions workflows or push-triggered runners', () => {
    expect(githubWorkflowFiles()).toEqual([]);
  });

  it('keeps every release gate available as an explicit local command', () => {
    const manifest = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8')) as {
      scripts?: Record<string, string>;
    };

    expect(manifest.scripts).toMatchObject({
      test: 'vitest run',
      'type-check': 'tsc --noEmit',
      lint: 'biome check src scripts',
      'lint:strict': 'biome check --diagnostic-level=warn src scripts',
      build: 'next build',
      'lighthouse:tablet': 'node scripts/run-lighthouse-after-content.mjs tablet',
      'lighthouse:desktop': 'node scripts/run-lighthouse-after-content.mjs desktop',
    });
  });
});
