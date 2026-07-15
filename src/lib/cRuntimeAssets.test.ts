import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

function sha256(filename: string): string {
  return createHash('sha256').update(readFileSync(filename)).digest('hex');
}

describe('isolated C browser practice runtime', () => {
  const dockerfile = readFileSync(path.join(root, 'runtimes/c-picoc/Dockerfile'), 'utf8');
  const buildScript = readFileSync(path.join(root, 'runtimes/c-picoc/build.sh'), 'utf8');
  const runtimeReadme = readFileSync(path.join(root, 'runtimes/c-picoc/README.md'), 'utf8');
  const worker = readFileSync(path.join(root, 'public/c-worker.js'), 'utf8');
  const panel = readFileSync(path.join(root, 'src/components/learning/CRunPanel.tsx'), 'utf8');

  it('pins verified source and the current Emscripten release', () => {
    expect(dockerfile).toContain('emscripten/emsdk:6.0.3');
    expect(buildScript).toContain("PICOC_VERSION='3.2.2'");
    expect(buildScript).toContain(
      "PICOC_ARCHIVE_SHA256='802cd342c7c89bc4b65fff68f8ee613b7ac5ac76492b7093717911c3481d0fc7'"
    );
    expect(runtimeReadme).toContain('not presented as a C23 compiler');
  });

  it('ships checksum-matching, deliberately small local runtime assets', () => {
    const checksumLines = readFileSync(path.join(root, 'public/c-picoc.sha256'), 'utf8')
      .trim()
      .split('\n');
    const expected = new Map(
      checksumLines.map((line) => {
        const [hash, filename] = line.trim().split(/\s+/u);
        return [filename, hash];
      })
    );

    for (const filename of ['c-picoc.js', 'c-picoc.wasm']) {
      const asset = path.join(root, 'public', filename);
      expect(sha256(asset)).toBe(expected.get(filename));
    }
    expect(statSync(path.join(root, 'public/c-picoc.js')).size).toBeLessThan(200 * 1024);
    expect(statSync(path.join(root, 'public/c-picoc.wasm')).size).toBeLessThan(300 * 1024);
  });

  it('runs only in a disposable bounded worker and states the dialect boundary', () => {
    expect(worker).toContain("importScripts('/c-picoc.js')");
    expect(worker).toContain('MAX_SOURCE_CHARACTERS = 32 * 1024');
    expect(worker).toContain('MAX_OUTPUT_CHARACTERS = 64 * 1024');
    expect(worker).not.toContain('/api/');
    expect(worker).not.toMatch(/\beval\s*\(/u);
    expect(panel).toContain("new Worker('/c-worker.js')");
    expect(panel).toContain('PicoC subset');
    expect(panel).toContain('current Clang and GCC');
  });
});
