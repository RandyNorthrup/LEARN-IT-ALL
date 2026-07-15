import { describe, expect, it } from 'vitest';
import { GO_MAX_SOURCE_CHARACTERS, GO_RUN_TIMEOUT_MS, validateGoSource } from './goRuntime';

describe('Go learning runtime', () => {
  it('rejects missing, oversized, and null-byte source before worker execution', () => {
    expect(validateGoSource('   ')).toContain('Write a Go program');
    expect(validateGoSource('x'.repeat(GO_MAX_SOURCE_CHARACTERS + 1))).toContain('under');
    expect(validateGoSource('package main\0')).toContain('null bytes');
    expect(validateGoSource('package main\nfunc main() {}')).toBeNull();
  });

  it('keeps the worker deadline bounded while allowing cold WebAssembly startup', () => {
    expect(GO_RUN_TIMEOUT_MS).toBe(12_000);
    expect(GO_MAX_SOURCE_CHARACTERS).toBe(32 * 1024);
  });
});
