import { describe, expect, it } from 'vitest';
import { CurriculumActivitySchema } from './schema';

function validActivity() {
  return {
    schemaVersion: 2,
    id: 'workshop-semantic-profile',
    courseId: 'responsive-web-design',
    moduleId: 'basic-html',
    kind: 'workshop',
    title: 'Build a semantic learner profile',
    summary: 'Build a profile whose structure remains useful without visual styling.',
    objectives: ['Choose landmarks that communicate the purpose of each content region.'],
    competencyCoverage: {
      introduces: ['semantic-document'],
      reinforces: [],
      assesses: ['semantic-document'],
    },
    prerequisites: [],
    difficulty: 'foundation',
    estimatedMinutes: 30,
    starterFiles: { html: '<main></main>', css: '', javascript: '' },
    steps: [
      {
        id: 'step-add-heading',
        title: 'Name the profile',
        interaction: 'code',
        instruction: 'Add an h1 inside main with the text Learner profile.',
        why: 'A single descriptive heading gives the page an understandable name.',
        buildsOnStepIds: [] as string[],
        checkIds: ['check-profile-heading'],
        competencyIds: ['semantic-document'],
        hints: [
          'Use the highest-level heading for the page title.',
          'Place the heading between the opening and closing main tags.',
          'Add <h1>Learner profile</h1> inside main.',
        ],
        xp: 10,
        targetFile: 'html',
      },
    ],
    checks: [
      {
        id: 'check-profile-heading',
        type: 'text-includes',
        description: 'The main heading names the learner profile.',
        failureMessage: 'Add the expected text to an h1 element.',
        hidden: false,
        competencyIds: ['semantic-document'],
        selector: 'h1',
        expected: 'Learner profile',
      },
    ],
    mastery: { passingPercent: 100, maxHintsForMastery: 1, spacedReviewDays: [1, 7, 30] },
  };
}

describe('CurriculumActivitySchema', () => {
  it('accepts a complete progressive code activity', () => {
    expect(CurriculumActivitySchema.parse(validActivity()).steps).toHaveLength(1);
  });

  it('accepts Python, Go, SQL, and shell workspaces for interactive labs', () => {
    const baseActivity = validActivity();
    const pythonActivity = {
      ...baseActivity,
      starterFiles: {
        html: '',
        css: '',
        javascript: '',
        python: 'def greet(name):\n    return f"Hello, {name}"',
        go: 'package main\n\nfunc main() {}',
        sql: 'SELECT name FROM teams ORDER BY name;',
        shell: '',
      },
      steps: baseActivity.steps.map((step) => ({ ...step, targetFile: 'python' })),
      checks: [
        {
          id: 'check-profile-heading',
          type: 'source-includes',
          description: 'The function defines a reusable greeting.',
          failureMessage: 'Define the requested greeting function.',
          hidden: false,
          competencyIds: ['semantic-document'],
          file: 'python',
          expected: 'def greet',
        },
      ],
    };

    const parsed = CurriculumActivitySchema.parse(pythonActivity);
    expect(parsed.steps[0].targetFile).toBe('python');
    expect(parsed.starterFiles?.python).toContain('def greet');
    expect(parsed.starterFiles?.go).toContain('package main');
    expect(parsed.starterFiles?.sql).toContain('SELECT name');
    expect(parsed.starterFiles?.shell).toBe('');

    const goActivity = {
      ...pythonActivity,
      steps: baseActivity.steps.map((step) => ({ ...step, targetFile: 'go' })),
      checks: pythonActivity.checks.map((check) => ({
        ...check,
        file: 'go',
        expected: 'package main',
      })),
    };
    expect(CurriculumActivitySchema.parse(goActivity).steps[0].targetFile).toBe('go');
  });

  it('accepts prompt and quality-gate workspaces for simulation labs', () => {
    const baseActivity = validActivity();
    const promptActivity = {
      ...baseActivity,
      starterFiles: {
        html: '',
        css: '',
        javascript: '',
        python: '',
        shell: '',
        prompt: 'Goal: produce an evidence-backed diagnosis.',
        config: 'lint: biome check .',
      },
      steps: baseActivity.steps.map((step) => ({ ...step, targetFile: 'prompt' })),
      checks: [
        {
          id: 'check-profile-heading',
          type: 'source-includes',
          description: 'The prompt defines an observable goal.',
          failureMessage: 'Add an explicit goal to the prompt.',
          hidden: false,
          competencyIds: ['semantic-document'],
          file: 'prompt',
          expected: 'Goal:',
        },
      ],
    };

    const parsed = CurriculumActivitySchema.parse(promptActivity);
    expect(parsed.steps[0].targetFile).toBe('prompt');
    expect(parsed.starterFiles?.prompt).toContain('Goal:');
    expect(parsed.starterFiles?.config).toContain('lint:');
  });

  it('allows evidence-based debug decisions without forcing a code workspace', () => {
    const baseActivity = validActivity();
    const debugDecision = {
      ...baseActivity,
      starterFiles: undefined,
      steps: baseActivity.steps.map((step) => ({
        ...step,
        interaction: 'debug',
        targetFile: undefined,
        options: [
          { id: 'repair-cause', text: 'Repair the demonstrated root cause.' },
          { id: 'repair-symptom', text: 'Hide the visible symptom only.' },
        ],
      })),
      checks: [
        {
          id: 'check-profile-heading',
          type: 'choice-equals',
          description: 'The repair addresses the demonstrated root cause.',
          failureMessage: 'Choose the cause-level repair.',
          hidden: false,
          competencyIds: ['semantic-document'],
          expectedOptionId: 'repair-cause',
        },
      ],
    };

    expect(CurriculumActivitySchema.safeParse(debugDecision).success).toBe(true);
  });

  it('rejects steps that point to missing canonical checks', () => {
    const activity = validActivity();
    activity.steps[0].checkIds = ['check-does-not-exist'];

    const result = CurriculumActivitySchema.safeParse(activity);
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.message.includes('Unknown check ID'))).toBe(
      true
    );
  });

  it('rejects duplicate step IDs', () => {
    const activity = validActivity();
    activity.steps.push({ ...activity.steps[0] });

    const result = CurriculumActivitySchema.safeParse(activity);
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.message.includes('Duplicate step ID'))).toBe(
      true
    );
  });

  it('rejects a later step that does not build on prior work', () => {
    const activity = validActivity();
    activity.steps.push({ ...activity.steps[0], id: 'step-style-heading' });

    const result = CurriculumActivitySchema.safeParse(activity);
    expect(result.success).toBe(false);
    expect(
      result.error?.issues.some((issue) =>
        issue.message.includes('must build on at least one earlier step')
      )
    ).toBe(true);
  });

  it('rejects a step that claims to build on a later step', () => {
    const activity = validActivity();
    activity.steps[0].buildsOnStepIds = ['step-style-heading'];
    activity.steps.push({
      ...activity.steps[0],
      id: 'step-style-heading',
      buildsOnStepIds: ['step-add-heading'],
    });

    const result = CurriculumActivitySchema.safeParse(activity);
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.message.includes('first step cannot'))).toBe(
      true
    );
  });
});
