import { describe, expect, it } from 'vitest';
import { LearningDraftSchema, LearningSubmissionSchema } from './submissionSchema';

const files = {
  html: '<main></main>',
  css: 'main {}',
  javascript: 'console.log("ready")',
  typescript: 'const ready: boolean = true;',
  python: 'print("ready")',
  go: 'package main\nfunc main() {}',
  c: 'int main(void) { return 0; }',
  sql: 'SELECT 1;',
  shell: 'printf ready',
  prompt: 'Goal: verify readiness',
  config: 'lint: biome check .',
};

describe('learning submission schemas', () => {
  it('preserves every supported source file in attempts', () => {
    const parsed = LearningSubmissionSchema.parse({ stepId: 'build-evidence', files });

    expect(parsed.files).toEqual(files);
  });

  it('preserves every supported source file in autosaved drafts', () => {
    const parsed = LearningDraftSchema.parse({ stepId: 'build-evidence', files });

    expect(parsed.files).toEqual(files);
  });

  it('allows a focused attempt while requiring complete draft snapshots', () => {
    expect(
      LearningSubmissionSchema.parse({
        stepId: 'build-evidence',
        files: { c: files.c },
      }).files
    ).toEqual({ c: files.c });
    expect(
      LearningDraftSchema.safeParse({ stepId: 'build-evidence', files: { c: files.c } }).success
    ).toBe(false);
  });
});
