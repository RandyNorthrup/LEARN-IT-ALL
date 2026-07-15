export interface ActivityAccess {
  canOpen: boolean;
  unmetPrerequisiteIds: string[];
}

export function activityAccess(
  prerequisiteIds: string[],
  completedActivityIds: ReadonlySet<string>
): ActivityAccess {
  const unmetPrerequisiteIds = prerequisiteIds.filter(
    (activityId) => !completedActivityIds.has(activityId)
  );
  return { canOpen: unmetPrerequisiteIds.length === 0, unmetPrerequisiteIds };
}

export function orderedActivityPrerequisiteIds(
  prerequisiteIds: string[],
  dependenciesFor: (activityId: string) => string[]
): string[] {
  const ordered: string[] = [];
  const visited = new Set<string>();

  function visit(activityId: string) {
    if (visited.has(activityId)) return;
    for (const prerequisiteId of dependenciesFor(activityId)) visit(prerequisiteId);
    visited.add(activityId);
    ordered.push(activityId);
  }

  for (const prerequisiteId of prerequisiteIds) visit(prerequisiteId);
  return ordered;
}
