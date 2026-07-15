import { loadCurriculumActivity } from '@/core/curriculum/repository';
import type { CurriculumActivity } from '@/core/curriculum/schema';
import { activityAccess, orderedActivityPrerequisiteIds } from '@/core/learning/activityAccess';
import { buildActivityProgress, type StepProgressRecord } from '@/core/learning/progress';
import { dbHelpers } from '@/lib/db';

export interface StoredActivityAccess {
  canOpen: boolean;
  prerequisites: CurriculumActivity[];
  unmetPrerequisites: CurriculumActivity[];
}

export function storedActivityAccess(
  courseId: string,
  activity: CurriculumActivity
): StoredActivityAccess {
  const cache = new Map<string, CurriculumActivity>();
  const load = (activityId: string) => {
    const cached = cache.get(activityId);
    if (cached) return cached;
    const loaded = loadCurriculumActivity(courseId, activityId);
    cache.set(activityId, loaded);
    return loaded;
  };
  const prerequisiteIds = orderedActivityPrerequisiteIds(
    activity.prerequisites,
    (activityId) => load(activityId).prerequisites
  );
  const prerequisites = prerequisiteIds.map(load);
  const completedIds = new Set(
    prerequisites
      .filter((prerequisite) => {
        const records = dbHelpers.getLearningStepProgress(prerequisite.id) as StepProgressRecord[];
        return buildActivityProgress(
          prerequisite.steps.map((step) => step.id),
          records
        ).activityCompleted;
      })
      .map((prerequisite) => prerequisite.id)
  );
  const access = activityAccess(prerequisiteIds, completedIds);
  return {
    canOpen: access.canOpen,
    prerequisites,
    unmetPrerequisites: prerequisites.filter((entry) =>
      access.unmetPrerequisiteIds.includes(entry.id)
    ),
  };
}
