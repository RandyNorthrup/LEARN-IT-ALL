import { describe, expect, it } from 'vitest';
import { buildActivityProgress, canOpenStep } from './progress';

describe('learning progress', () => {
  const steps = ['step-one', 'step-two', 'step-three'];

  it('resumes at the first incomplete step', () => {
    const snapshot = buildActivityProgress(steps, [
      { stepId: 'step-one', status: 'COMPLETED', attempts: 1, hintsUsed: 0 },
      { stepId: 'step-two', status: 'IN_PROGRESS', attempts: 2, hintsUsed: 1 },
    ]);

    expect(snapshot.currentStepId).toBe('step-two');
    expect(snapshot.percent).toBe(33);
  });

  it('unlocks only completed work and the next step', () => {
    expect(canOpenStep(steps, ['step-one'], 'step-one')).toBe(true);
    expect(canOpenStep(steps, ['step-one'], 'step-two')).toBe(true);
    expect(canOpenStep(steps, ['step-one'], 'step-three')).toBe(false);
  });

  it('marks a fully completed activity at 100 percent', () => {
    const snapshot = buildActivityProgress(
      steps,
      steps.map((stepId) => ({
        stepId,
        status: 'COMPLETED' as const,
        attempts: 1,
        hintsUsed: 0,
      }))
    );
    expect(snapshot).toMatchObject({ activityCompleted: true, percent: 100 });
  });
});
