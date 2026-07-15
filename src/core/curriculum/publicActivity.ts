import type { CurriculumActivity, CurriculumCheck, CurriculumStep } from './schema';

export interface LearnerCheck {
  id: string;
  description: string;
}

export type LearnerStep = Omit<CurriculumStep, 'hints' | 'competencyIds'> & {
  hintCount: number;
};

export type LearnerActivity = Pick<CurriculumActivity, 'id' | 'courseId' | 'kind' | 'title'> & {
  steps: LearnerStep[];
  checks: LearnerCheck[];
};

export function toLearnerActivity(activity: CurriculumActivity): LearnerActivity {
  const publicCheckIds = new Set(
    activity.checks.filter((check) => !check.hidden).map((check) => check.id)
  );
  return {
    id: activity.id,
    courseId: activity.courseId,
    kind: activity.kind,
    title: activity.title,
    steps: activity.steps.map(({ hints, competencyIds: _competencyIds, ...step }) => ({
      ...step,
      hintCount: hints.length,
      checkIds: step.checkIds.filter((checkId) => publicCheckIds.has(checkId)),
    })),
    checks: activity.checks
      .filter((check) => !check.hidden)
      .map((check: CurriculumCheck) => ({
        id: check.id,
        description: check.description,
      })),
  };
}
