import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

describe('Go browser runtime assets', () => {
  it('publishes a real WebAssembly module with matching Go browser support', () => {
    const wasmPath = path.join(root, 'public', 'go-runtime.wasm');
    const wasm = readFileSync(wasmPath);
    const support = readFileSync(path.join(root, 'public', 'go-wasm-exec.js'), 'utf8');

    expect(Array.from(wasm.subarray(0, 4))).toEqual([0, 97, 115, 109]);
    expect(statSync(wasmPath).size).toBeGreaterThan(1_000_000);
    expect(support).toContain('globalThis.Go = class');
    expect(support).toContain('WebAssembly');
  });

  it('loads only local runtime assets and keeps learner execution inside the worker', () => {
    const worker = readFileSync(path.join(root, 'public', 'go-worker.js'), 'utf8');

    expect(worker).toContain("importScripts('/go-wasm-exec.js')");
    expect(worker).toContain("fetch('/go-runtime.wasm')");
    expect(worker).toContain('globalThis.runLearnerGo(source)');
    expect(worker).toContain('MAX_SOURCE_CHARACTERS = 32 * 1024');
    expect(worker).not.toContain('fetch(source');
    expect(worker).not.toContain('XMLHttpRequest');
    expect(worker).not.toContain('/api/');
  });

  it('enforces bounded source/output and excludes host-capable packages', () => {
    const runner = readFileSync(path.join(root, 'runtimes', 'go-wasm', 'main.go'), 'utf8');
    const allowlist = runner.slice(
      runner.indexOf('var allowedImports'),
      runner.indexOf('type runResult')
    );

    expect(runner).toContain('maxSourceBytes = 32 * 1024');
    expect(runner).toContain('maxOutputBytes = 64 * 1024');
    expect(runner).toContain('parser.ParseFile');
    expect(runner).toContain('Env:    []string{}');
    expect(runner).not.toContain('Unrestricted: true');
    expect(allowlist).toContain('"fmt"');
    expect(allowlist).toContain('"sync"');
    expect(allowlist).toContain('"crypto/aes"');
    expect(allowlist).toContain('"crypto/hmac"');
    expect(allowlist).toContain('"crypto/ed25519"');
    expect(allowlist).not.toContain('"crypto/rand"');
    expect(allowlist).not.toContain('"crypto/tls"');
    expect(allowlist).not.toContain('"os"');
    expect(allowlist).not.toContain('"os/exec"');
    expect(allowlist).not.toContain('"net/http"');
    expect(allowlist).not.toContain('"syscall"');
    expect(allowlist).not.toContain('"unsafe"');
  });
});
