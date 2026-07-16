import { describe, expect, it } from 'vitest';
import { auditLearningActivity, summarizeLearningQuality } from './learningQualityAudit';
import type { CurriculumActivity } from './schema';

function activity(overrides: Partial<CurriculumActivity> = {}): CurriculumActivity {
  const competencyId = 'html-elements';
  return {
    schemaVersion: 2,
    id: 'first-html-workshop',
    courseId: 'responsive-web-design',
    moduleId: 'html-foundations',
    kind: 'workshop',
    title: 'Build your first useful HTML page',
    summary: 'Create a small page while learning how HTML elements describe content structure.',
    objectives: ['Create and explain a correctly nested heading and paragraph.'],
    competencyCoverage: { introduces: [competencyId], reinforces: [], assesses: [] },
    prerequisites: [],
    difficulty: 'foundation',
    estimatedMinutes: 20,
    starterFiles: {
      html: '',
      css: '',
      javascript: '',
      python: '',
      go: '',
      sql: '',
      shell: '',
      prompt: '',
      config: '',
    },
    steps: [
      {
        id: 'create-heading',
        title: 'Create the main heading',
        interaction: 'code',
        instruction: 'In the HTML editor, add an h1 element containing Community garden guide.',
        why: 'The h1 identifies the page topic and gives the document a top-level heading.',
        buildsOnStepIds: [],
        content: [
          {
            type: 'paragraph',
            text: 'An HTML element usually has an opening tag, content, and a closing tag.',
          },
          {
            type: 'code',
            language: 'html',
            code: '<h1>Community garden guide</h1>',
            caption: 'The opening and closing h1 tags wrap the heading text.',
          },
        ],
        checkIds: ['heading-exists'],
        competencyIds: [competencyId],
        hints: [
          'Use the element for the page topic.',
          'Place it at the start of the HTML source.',
          'Write <h1>Community garden guide</h1>.',
        ],
        targetFile: 'html',
      },
      {
        id: 'add-paragraph',
        title: 'Add the introduction',
        interaction: 'code',
        instruction:
          'After the heading, add a paragraph that tells visitors what the guide contains.',
        why: 'A paragraph marks a complete unit of prose instead of relying on visual line breaks.',
        buildsOnStepIds: ['create-heading'],
        content: [
          {
            type: 'code',
            language: 'html',
            code: '<p>Find plots, tools, and accessible paths.</p>',
            caption: 'A p element wraps one paragraph of prose.',
          },
        ],
        checkIds: ['heading-exists', 'paragraph-exists'],
        competencyIds: [competencyId],
        hints: [
          'Use a paragraph element.',
          'Place it after the closing h1 tag.',
          'Wrap your sentence in <p> and </p>.',
        ],
        targetFile: 'html',
      },
    ],
    checks: [
      {
        id: 'heading-exists',
        type: 'dom-selector-count',
        selector: 'h1',
        minimum: 1,
        maximum: 1,
        description: 'The page has one main heading.',
        failureMessage: 'Add one h1 element for the page topic.',
        hidden: false,
        competencyIds: [competencyId],
      },
      {
        id: 'paragraph-exists',
        type: 'dom-selector-count',
        selector: 'p',
        minimum: 1,
        description: 'The page has an introductory paragraph.',
        failureMessage: 'Add a p element after the heading.',
        hidden: false,
        competencyIds: [competencyId],
      },
    ],
    mastery: { passingPercent: 80, maxHintsForMastery: 3, spacedReviewDays: [1, 7, 21] },
    ...overrides,
  };
}

describe('learner-facing curriculum quality audit', () => {
  it('accepts an early, explicit, modelled, semantic, cumulative HTML workshop', () => {
    expect(auditLearningActivity(activity())).toEqual([]);
  });

  it('rejects delayed generic editing and token-only grading', () => {
    const source = activity();
    const genericStep = {
      ...source.steps[0],
      id: 'generic-build',
      buildsOnStepIds: ['checkpoint-two'],
      instruction:
        'Edit the existing artifact. Run the checks, inspect the preview, and preserve every earlier passing requirement.',
      content: [],
      checkIds: ['heading-token'],
    };
    const weak = activity({
      steps: [
        { ...source.steps[0], id: 'checkpoint-one', interaction: 'read', targetFile: undefined },
        {
          ...source.steps[0],
          id: 'checkpoint-two',
          interaction: 'predict',
          targetFile: undefined,
          buildsOnStepIds: ['checkpoint-one'],
        },
        genericStep,
        { ...genericStep, id: 'generic-build-two', buildsOnStepIds: ['generic-build'] },
        { ...genericStep, id: 'generic-build-three', buildsOnStepIds: ['generic-build-two'] },
        { ...genericStep, id: 'generic-build-four', buildsOnStepIds: ['generic-build-three'] },
      ],
      checks: [
        {
          id: 'heading-token',
          type: 'source-includes',
          file: 'html',
          expected: '<h1>',
          description: 'The source includes an h1 token.',
          failureMessage: 'Add the expected h1 source token.',
          hidden: false,
          competencyIds: ['html-elements'],
        },
      ],
    });

    const codes = new Set(auditLearningActivity(weak).map((issue) => issue.code));
    expect(codes).toEqual(
      new Set([
        'delayed-artifact-practice',
        'generic-template-language',
        'repeated-step-instruction',
        'missing-code-models',
        'token-only-grading',
      ])
    );
  });

  it('summarizes affected activities separately from issue count', () => {
    const strong = activity();
    const weak = activity({
      id: 'weak-workshop',
      steps: strong.steps.map((step) => ({
        ...step,
        instruction: 'Commit to the claim in this checkpoint choice.',
      })),
    });
    const issues = [...auditLearningActivity(strong), ...auditLearningActivity(weak)];

    expect(summarizeLearningQuality([strong, weak], issues)).toMatchObject({
      activityCount: 2,
      affectedActivityCount: 1,
      blockerCount: 2,
      warningCount: 0,
    });
  });
});
