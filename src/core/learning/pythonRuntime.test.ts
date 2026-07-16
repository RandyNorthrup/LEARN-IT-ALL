import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  PYTHON_MAX_OUTPUT_CHARACTERS,
  PYTHON_MAX_SOURCE_CHARACTERS,
  PYTHON_RUN_TIMEOUT_MS,
  validatePythonSource,
} from './pythonRuntime';

describe('Python learning runtime', () => {
  it('rejects missing, oversized, and null-byte source before worker execution', () => {
    expect(validatePythonSource('   ')).toContain('Write a Python program');
    expect(validatePythonSource('x'.repeat(PYTHON_MAX_SOURCE_CHARACTERS + 1))).toContain('under');
    expect(validatePythonSource('print("hello")\0')).toContain('null bytes');
    expect(validatePythonSource('print("hello")')).toBeNull();
  });

  it('keeps source, output, and worker deadlines bounded in both UI and worker', () => {
    expect(PYTHON_RUN_TIMEOUT_MS).toBe(8_000);
    expect(PYTHON_MAX_SOURCE_CHARACTERS).toBe(32 * 1024);
    expect(PYTHON_MAX_OUTPUT_CHARACTERS).toBe(64 * 1024);

    const worker = readFileSync(path.join(process.cwd(), 'public', 'python-worker.mjs'), 'utf8');
    expect(worker).toContain(`const MAX_SOURCE_CHARACTERS = ${PYTHON_MAX_SOURCE_CHARACTERS}`);
    expect(worker).toContain(`const MAX_OUTPUT_CHARACTERS = ${PYTHON_MAX_OUTPUT_CHARACTERS}`);
    expect(worker).toContain('const globals = makeDictionary()');
    expect(worker).toContain('globals.destroy()');
  });

  it('uses only pinned same-origin Pyodide runtime assets', () => {
    const worker = readFileSync(path.join(process.cwd(), 'public', 'python-worker.mjs'), 'utf8');
    const runtimeFiles = [
      'pyodide.mjs',
      'pyodide.asm.mjs',
      'pyodide.asm.wasm',
      'pyodide-lock.json',
      'python_stdlib.zip',
    ];

    expect(worker).toContain("const PYODIDE_MODULE_URL = '/pyodide/pyodide.mjs'");
    expect(worker).not.toMatch(/https?:\/\//u);
    for (const fileName of runtimeFiles) {
      const installed = readFileSync(path.join(process.cwd(), 'node_modules', 'pyodide', fileName));
      const published = readFileSync(path.join(process.cwd(), 'public', 'pyodide', fileName));
      expect(published.equals(installed), fileName).toBe(true);
    }
  });
});
