import type { CurriculumActivity, CurriculumCheck, CurriculumStep } from './schema';

export interface LearnerCheck {
  id: string;
  description: string;
}

export type LearnerStep = Omit<CurriculumStep, 'hints'> & { hintCount: number };

export type LearnerActivity = Omit<CurriculumActivity, 'checks' | 'steps'> & {
  steps: LearnerStep[];
  checks: LearnerCheck[];
};

export function toLearnerActivity(activity: CurriculumActivity): LearnerActivity {
  const publicCheckIds = new Set(
    activity.checks.filter((check) => !check.hidden).map((check) => check.id)
  );
  return {
    ...activity,
    steps: activity.steps.map(({ hints, ...step }) => ({
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
