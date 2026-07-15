import { describe, expect, it } from 'vitest';
import { evaluatePrompt, formatPromptHarnessReport } from './promptHarness';

describe('prompt harness', () => {
  it('recognizes a complete agent contract', () => {
    const results = evaluatePrompt(`
Goal: Diagnose the failing release and produce a repair plan.
Context: The repository uses TypeScript and Vitest.
Constraints: Read only; do not push changes.
Output: Return evidence, root cause, and proposed repair.
Done when: Every claim cites a test or log.
If blocked: State the missing evidence and ask one question.
`);

    expect(results.every((result) => result.passed)).toBe(true);
    expect(formatPromptHarnessReport('Goal: build it')).toContain('PROMPT CONTRACT');
  });

  it('reports missing contract dimensions without calling a model', () => {
    const results = evaluatePrompt('Please help with my code.');
    expect(results.some((result) => !result.passed)).toBe(true);
    expect(results.find((result) => result.id === 'done')?.passed).toBe(false);
    expect(evaluatePrompt('Goal: [replace with goal]')[0].passed).toBe(false);
  });
});
