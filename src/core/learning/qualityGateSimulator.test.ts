import { describe, expect, it } from 'vitest';
import { evaluateQualityGates, formatQualityGateReport } from './qualityGateSimulator';

describe('quality gate simulator', () => {
  it('recognizes the complete baseline gate families', () => {
    const results = evaluateQualityGates(`
format: biome format .
lint: biome check .
types: tsc --noEmit
tests: vitest run
dead-code: knip
security: npm audit
constants: no-magic-numbers
`);
    expect(results.every((result) => result.passed)).toBe(true);
    expect(formatQualityGateReport('lint: eslint .')).toContain('never executes learner commands');
  });

  it('names missing gate families for corrective practice', () => {
    const results = evaluateQualityGates('tests: pytest');
    expect(results.find((result) => result.id === 'tests')?.passed).toBe(true);
    expect(results.find((result) => result.id === 'types')?.passed).toBe(false);
  });
});
