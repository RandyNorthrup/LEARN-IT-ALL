export interface StepProgressRecord {
  stepId: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
  attempts: number;
  hintsUsed: number;
  earnedXp: number;
  draftJson?: string | null;
}

export interface ActivityProgressSnapshot {
  completedStepIds: string[];
  currentStepId: string;
  completedSteps: number;
  totalSteps: number;
  percent: number;
  activityCompleted: boolean;
  earnedXp: number;
}

export function buildActivityProgress(
  orderedStepIds: string[],
  records: StepProgressRecord[]
): ActivityProgressSnapshot {
  if (orderedStepIds.length === 0) throw new Error('Activity requires at least one step');

  const recordByStep = new Map(records.map((record) => [record.stepId, record]));
  const completedStepIds = orderedStepIds.filter(
    (stepId) => recordByStep.get(stepId)?.status === 'COMPLETED'
  );
  const firstIncomplete = orderedStepIds.find(
    (stepId) => recordByStep.get(stepId)?.status !== 'COMPLETED'
  );
  const finalStepId = orderedStepIds.at(-1);
  if (!finalStepId) throw new Error('Activity requires at least one step');
  const currentStepId = firstIncomplete ?? finalStepId;
  const completedSteps = completedStepIds.length;

  return {
    completedStepIds,
    currentStepId,
    completedSteps,
    totalSteps: orderedStepIds.length,
    percent: Math.round((completedSteps / orderedStepIds.length) * 100),
    activityCompleted: completedSteps === orderedStepIds.length,
    earnedXp: records.reduce((total, record) => total + record.earnedXp, 0),
  };
}

export function canOpenStep(
  orderedStepIds: string[],
  completedStepIds: string[],
  requestedStepId: string
): boolean {
  const requestedIndex = orderedStepIds.indexOf(requestedStepId);
  if (requestedIndex < 0) return false;
  if (completedStepIds.includes(requestedStepId)) return true;
  return requestedIndex === completedStepIds.length;
}
