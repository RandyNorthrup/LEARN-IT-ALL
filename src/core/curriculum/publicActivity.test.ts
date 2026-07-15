import { describe, expect, it } from 'vitest';
import { toLearnerActivity } from './publicActivity';
import { CurriculumActivitySchema } from './schema';

describe('toLearnerActivity', () => {
  it('does not expose canonical answers or hidden checks', () => {
    const activity = CurriculumActivitySchema.parse({
      schemaVersion: 2,
      id: 'review-html-meaning',
      courseId: 'responsive-web-design',
      moduleId: 'basic-html',
      kind: 'review',
      title: 'Review durable HTML meaning',
      summary: 'Retrieve the structural reason for choosing semantic HTML elements.',
      objectives: ['Explain how semantic HTML communicates durable document meaning.'],
      competencyCoverage: {
        introduces: [],
        reinforces: ['semantic-document'],
        assesses: ['semantic-document'],
      },
      prerequisites: [],
      difficulty: 'practice',
      estimatedMinutes: 3,
      steps: [
        {
          id: 'step-choose-meaning',
          title: 'Retrieve the purpose',
          interaction: 'answer',
          instruction: 'Choose the strongest reason to prefer a native semantic element.',
          why: 'Retrieval makes the decision easier to apply in later builds.',
          checkIds: ['check-public', 'check-hidden'],
          competencyIds: ['semantic-document'],
          hints: ['Think about meaning.', 'Consider browser behavior.', 'Prefer native semantics.'],
          options: [
            { id: 'answer-native', text: 'It communicates meaning and behavior.' },
            { id: 'answer-short', text: 'It always has a shorter tag name.' },
          ],
        },
      ],
      checks: [
        {
          id: 'check-public',
          type: 'choice-equals',
          description: 'The answer identifies durable meaning.',
          failureMessage: 'Try the option about meaning and behavior.',
          hidden: false,
          competencyIds: ['semantic-document'],
          expectedOptionId: 'answer-native',
        },
        {
          id: 'check-hidden',
          type: 'choice-equals',
          description: 'Hidden transfer check.',
          failureMessage: 'Revisit native semantics.',
          hidden: true,
          competencyIds: ['semantic-document'],
          expectedOptionId: 'answer-native',
        },
      ],
      mastery: { passingPercent: 100, maxHintsForMastery: 0, spacedReviewDays: [1, 7] },
    });

    const learner = toLearnerActivity(activity);
    expect(learner.checks).toEqual([
      { id: 'check-public', description: 'The answer identifies durable meaning.' },
    ]);
    expect(JSON.stringify(learner)).not.toContain('expectedOptionId');
    expect(JSON.stringify(learner)).not.toContain('check-hidden');
    expect(JSON.stringify(learner)).not.toContain('Prefer native semantics.');
    expect(learner.steps[0].hintCount).toBe(3);
  });
});
