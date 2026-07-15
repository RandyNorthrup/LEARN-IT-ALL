import { describe, expect, it } from 'vitest';
import {
  type AuditableActivity,
  type AuditableProject,
  auditCurriculumDuplication,
  jaccardSimilarity,
  normalizeCurriculumText,
} from './duplicationAudit';

function activity(
  id: string,
  interaction: string,
  text: string,
  competencyId = `competency-${id}`
): AuditableActivity {
  return {
    id,
    courseId: 'course-a',
    kind: 'workshop',
    summary: `${text} The summary preserves a concrete stakeholder boundary and changed case.`,
    steps: [
      {
        interaction,
        instruction: text,
        why: `${text} This explanation links the result to an observable decision.`,
        competencyIds: [competencyId],
      },
    ],
  };
}

describe('curriculum duplication audit', () => {
  it('normalizes superficial punctuation and number changes', () => {
    expect(normalizeCurriculumText('Case 12: Verify A/B.')).toBe('case # verify a b');
  });

  it('calculates term-set similarity', () => {
    expect(jaccardSimilarity(new Set(['alpha', 'beta']), new Set(['beta', 'gamma']))).toBeCloseTo(
      1 / 3
    );
  });

  it('detects generic copied text, repeated layouts, and near-duplicate activities', () => {
    const copied =
      'Copy this generic learner instruction across unrelated competencies without changing its scenario, evidence, failure, transfer decision, stakeholder, environment, input, output, assumption, precondition, invariant, observation, test, counterexample, repair, regression, accessibility need, privacy boundary, security risk, recovery path, source authority, version, or review date.';
    const activities = Array.from({ length: 8 }, (_, index) =>
      activity(`activity-${index}`, 'predict', copied, `competency-${index}`)
    );
    const result = auditCurriculumDuplication(activities, [], {
      maximumGenericFragmentCopies: 3,
      nearDuplicateThreshold: 0.8,
    });

    expect(result.genericTextDefects[0]?.activityCount).toBe(8);
    expect(result.layoutDefects).toEqual([
      {
        courseId: 'course-a',
        kind: 'workshop',
        activityCount: 8,
        uniqueLayouts: 1,
        requiredLayouts: 8,
      },
    ]);
    expect(result.nearDuplicateActivities.length).toBeGreaterThan(0);
  });

  it('detects projects that merely rename the same stakeholder need', () => {
    const projects: AuditableProject[] = ['one', 'two'].map((id) => ({
      id,
      courseId: 'course-a',
      title: `Project ${id}`,
      stakeholder: 'A community coordinator and keyboard-only service user',
      userNeed:
        'They need an accessible intake workflow with clear status, protected data, tested recovery, and changed-case evidence.',
      constraints: [
        'Keyboard operation and visible focus',
        'Purpose-limited private data',
        'A verified restore and rollback path',
      ],
    }));

    const result = auditCurriculumDuplication([], projects, {
      projectNearDuplicateThreshold: 0.7,
    });
    expect(result.nearDuplicateProjects).toHaveLength(1);
  });
});
