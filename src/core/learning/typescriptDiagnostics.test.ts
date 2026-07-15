import { describe, expect, it } from 'vitest';
import { diagnoseTypeScript } from './typescriptDiagnostics';

describe('diagnoseTypeScript', () => {
  it('accepts a strict typed program', () => {
    const report = diagnoseTypeScript(
      'function double(value: number): number { return value * 2; }\nconsole.log(double(2));'
    );

    expect(report.ok).toBe(true);
    expect(report.compilerVersion).toMatch(/^6\.0\./);
    expect(report.diagnostics).toEqual([]);
  });

  it('reports semantic errors with an accessible source location', () => {
    const report = diagnoseTypeScript('const count: number = "many";');

    expect(report.ok).toBe(false);
    expect(report.diagnostics.join('\n')).toMatch(/Line 1, column 7.*string.*number/i);
  });
});
