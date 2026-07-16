import { describe, expect, it } from 'vitest';
import {
  cumulativeLearningFiles,
  type LearningFiles,
  latestLearningFiles,
  learningInputDrafts,
} from './draft';

const starterFiles: LearningFiles = {
  html: '<main></main>',
  css: '',
  javascript: '',
  python: '',
  go: '',
  sql: '',
  shell: '',
  prompt: '',
  config: '',
};

describe('latestLearningFiles', () => {
  it('restores the most recent cumulative code increment', () => {
    const result = latestLearningFiles(
      [
        {
          stepId: 'step-one',
          status: 'COMPLETED',
          attempts: 1,
          hintsUsed: 0,
          earnedXp: 10,
          draftJson: JSON.stringify({ files: { html: '<main><h1>Saved</h1></main>' } }),
        },
      ],
      starterFiles
    );
    expect(result.html).toContain('<h1>Saved</h1>');
    expect(result.css).toBe('');
  });

  it('ignores corrupt history and preserves the starter artifact', () => {
    const result = latestLearningFiles(
      [
        {
          stepId: 'step-one',
          status: 'IN_PROGRESS',
          attempts: 0,
          hintsUsed: 0,
          earnedXp: 0,
          draftJson: '{broken',
        },
      ],
      starterFiles
    );
    expect(result).toEqual(starterFiles);
  });

  it('restores cumulative Python, Go, SQL, network, prompt, and gate lab work', () => {
    const result = latestLearningFiles(
      [
        {
          stepId: 'step-python-shell',
          status: 'IN_PROGRESS',
          attempts: 0,
          hintsUsed: 0,
          earnedXp: 0,
          draftJson: JSON.stringify({
            files: {
              python: 'print("ready")',
              go: 'package main\nfunc main() {}',
              sql: 'SELECT name FROM teams;',
              shell: 'ping 192.0.2.1',
              prompt: 'Goal: diagnose the failure',
              config: 'lint: biome check .',
            },
          }),
        },
      ],
      starterFiles
    );
    expect(result.python).toBe('print("ready")');
    expect(result.go).toContain('package main');
    expect(result.sql).toContain('SELECT name');
    expect(result.shell).toBe('ping 192.0.2.1');
    expect(result.prompt).toContain('diagnose');
    expect(result.config).toContain('biome');
  });

  it('carries the latest prerequisite artifact into a new activity', () => {
    const result = cumulativeLearningFiles(
      [],
      [
        [
          {
            stepId: 'earlier-build',
            status: 'COMPLETED',
            attempts: 1,
            hintsUsed: 0,
            earnedXp: 10,
            draftJson: JSON.stringify({ files: { html: '<main>First layer</main>' } }),
          },
        ],
        [
          {
            stepId: 'latest-build',
            status: 'COMPLETED',
            attempts: 1,
            hintsUsed: 0,
            earnedXp: 10,
            draftJson: JSON.stringify({ files: { html: '<main>Second layer</main>' } }),
          },
        ],
      ],
      starterFiles
    );

    expect(result.html).toBe('<main>Second layer</main>');
  });

  it('prefers current activity work over inherited project work', () => {
    const result = cumulativeLearningFiles(
      [
        {
          stepId: 'current-build',
          status: 'IN_PROGRESS',
          attempts: 0,
          hintsUsed: 0,
          earnedXp: 0,
          draftJson: JSON.stringify({ files: { html: '<main>Current draft</main>' } }),
        },
      ],
      [
        [
          {
            stepId: 'prior-build',
            status: 'COMPLETED',
            attempts: 1,
            hintsUsed: 0,
            earnedXp: 10,
            draftJson: JSON.stringify({ files: { html: '<main>Prior draft</main>' } }),
          },
        ],
      ],
      starterFiles
    );

    expect(result.html).toBe('<main>Current draft</main>');
  });
});

describe('learningInputDrafts', () => {
  it('restores choice, ordering, and written responses by step', () => {
    const result = learningInputDrafts([
      {
        stepId: 'predict-step',
        status: 'COMPLETED',
        attempts: 1,
        hintsUsed: 0,
        earnedXp: 10,
        draftJson: JSON.stringify({
          selectedOptionId: 'bounded-answer',
          orderedOptionIds: ['frame', 'model', 'run', 'verify'],
        }),
      },
      {
        stepId: 'reflect-step',
        status: 'COMPLETED',
        attempts: 1,
        hintsUsed: 0,
        earnedXp: 10,
        draftJson: JSON.stringify({
          textResponse: 'The learner explains the changed-case evidence.',
        }),
      },
    ]);

    expect(result.selectedByStep).toEqual({ 'predict-step': 'bounded-answer' });
    expect(result.orderByStep).toEqual({
      'predict-step': ['frame', 'model', 'run', 'verify'],
    });
    expect(result.textByStep).toEqual({
      'reflect-step': 'The learner explains the changed-case evidence.',
    });
  });

  it('ignores corrupt and incorrectly typed fields while preserving valid drafts', () => {
    const result = learningInputDrafts([
      {
        stepId: 'broken-step',
        status: 'IN_PROGRESS',
        attempts: 0,
        hintsUsed: 0,
        earnedXp: 0,
        draftJson: '{broken',
      },
      {
        stepId: 'mixed-step',
        status: 'IN_PROGRESS',
        attempts: 0,
        hintsUsed: 0,
        earnedXp: 0,
        draftJson: JSON.stringify({
          selectedOptionId: 42,
          orderedOptionIds: ['frame', 42],
          textResponse: 'Recover this response.',
        }),
      },
    ]);

    expect(result).toEqual({
      selectedByStep: {},
      orderByStep: {},
      textByStep: { 'mixed-step': 'Recover this response.' },
    });
  });
});
