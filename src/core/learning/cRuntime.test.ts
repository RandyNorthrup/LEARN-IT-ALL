import { describe, expect, it } from 'vitest';
import { C_MAX_SOURCE_CHARACTERS, C_RUN_TIMEOUT_MS, validateCSource } from './cRuntime';

describe('C browser practice runtime', () => {
  it('rejects missing, oversized, and null-byte source before worker execution', () => {
    expect(validateCSource('   ')).toContain('Write a C program');
    expect(validateCSource('x'.repeat(C_MAX_SOURCE_CHARACTERS + 1))).toContain('under');
    expect(validateCSource('int main(void) {\0}')).toContain('null bytes');
    expect(validateCSource('int main(void) { return 0; }')).toBeNull();
  });

  it('keeps the synchronous interpreter disposable and bounded', () => {
    expect(C_RUN_TIMEOUT_MS).toBe(8_000);
    expect(C_MAX_SOURCE_CHARACTERS).toBe(32 * 1024);
  });
});
