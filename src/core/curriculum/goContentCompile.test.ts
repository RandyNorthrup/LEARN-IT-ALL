import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Go learner code compilation audit', () => {
  it('parses and type-checks every Go Basics and HTTP client learner source', () => {
    const cache = path.join(tmpdir(), 'learn-it-all-go-content-cache');
    mkdirSync(cache, { recursive: true });
    const result = spawnSync('go', ['run', './scripts/tools/go-content-audit/main.go'], {
      cwd: process.cwd(),
      encoding: 'utf8',
      env: { ...process.env, GOCACHE: cache },
    });

    expect(result.status, result.stderr || result.stdout).toBe(0);
    expect(result.stdout).toContain('Go content audit passed');
  }, 30_000);
});
