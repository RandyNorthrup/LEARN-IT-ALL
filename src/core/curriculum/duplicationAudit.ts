const STOP_WORDS = new Set(
  `a about after again against all also am an and any are as at be because been before being between both but by can could did do does doing down during each few for from further had has have having he her here hers herself him himself his how i if in into is it its itself just me more most my myself no nor not now of off on once only or other our ours ourselves out over own same she should so some such than that the their theirs them themselves then there these they this those through to too under until up very was we were what when where which while who whom why will with would you your yours yourself yourselves`.split(
    ' '
  )
);

export type AuditableActivity = {
  id: string;
  courseId: string;
  kind: string;
  summary: string;
  objectives?: string[];
  steps: Array<{
    interaction: string;
    instruction: string;
    why: string;
    competencyIds?: string[];
    content?: Array<{ text?: string; code?: string; value?: string }>;
    options?: Array<{ text: string }>;
    stimulus?: { lines?: Array<{ text: string }> };
  }>;
};

export type AuditableProject = {
  id: string;
  courseId: string;
  title: string;
  stakeholder: string;
  userNeed: string;
  constraints: string[];
};

export type DuplicationAuditOptions = {
  minimumFragmentCharacters?: number;
  minimumRepeatedActivities?: number;
  minimumRepeatedCompetencies?: number;
  maximumGenericFragmentCopies?: number;
  nearDuplicateThreshold?: number;
  projectNearDuplicateThreshold?: number;
};

export type DuplicationAuditResult = {
  totals: {
    activities: number;
    fragments: number;
    layoutGroups: number;
    nearDuplicateCandidates: number;
    projects: number;
  };
  genericTextDefects: Array<{
    normalizedText: string;
    sample: string;
    activityCount: number;
    competencyCount: number;
    courseCount: number;
    sampleActivityIds: string[];
  }>;
  layoutDefects: Array<{
    courseId: string;
    kind: string;
    activityCount: number;
    uniqueLayouts: number;
    requiredLayouts: number;
  }>;
  nearDuplicateActivities: Array<{
    courseId: string;
    kind: string;
    leftId: string;
    rightId: string;
    similarity: number;
  }>;
  nearDuplicateProjects: Array<{
    leftId: string;
    rightId: string;
    similarity: number;
  }>;
};

export function normalizeCurriculumText(value: string): string {
  return value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\b\d+(?:\.\d+)*\b/gu, '#')
    .replace(/[^\p{Letter}\p{Number}#]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

function terms(value: string): Set<string> {
  return new Set(
    normalizeCurriculumText(value)
      .split(' ')
      .filter((term) => term.length > 2 && term !== '#' && !STOP_WORDS.has(term))
  );
}

function wordShingles(value: string, size = 3): Set<string> {
  const words = normalizeCurriculumText(value).split(' ');
  const result = new Set<string>();
  for (let index = 0; index <= words.length - size; index += 1) {
    result.add(words.slice(index, index + size).join(' '));
  }
  return result;
}

export function jaccardSimilarity(left: Set<string>, right: Set<string>): number {
  if (left.size === 0 && right.size === 0) return 1;
  let intersection = 0;
  const [smaller, larger] = left.size <= right.size ? [left, right] : [right, left];
  for (const term of smaller) if (larger.has(term)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

function textFragments(activity: AuditableActivity): Array<{
  text: string;
  competencyIds: string[];
}> {
  const fragments: Array<{ text: string; competencyIds: string[] }> = [
    { text: activity.summary, competencyIds: [] },
    ...(activity.objectives ?? []).map((text) => ({ text, competencyIds: [] })),
  ];
  for (const step of activity.steps) {
    const competencyIds = step.competencyIds ?? [];
    fragments.push({ text: step.instruction, competencyIds }, { text: step.why, competencyIds });
    for (const block of step.content ?? []) {
      // Source citations intentionally recur wherever the same primary authority
      // governs a competency. Audit authored teaching and code, not source labels.
      for (const text of [block.text, block.code]) {
        if (text) fragments.push({ text, competencyIds });
      }
    }
    for (const option of step.options ?? []) fragments.push({ text: option.text, competencyIds });
    for (const line of step.stimulus?.lines ?? []) {
      fragments.push({ text: line.text, competencyIds });
    }
  }
  return fragments;
}

function activityText(activity: AuditableActivity): string {
  return textFragments(activity)
    .map((entry) => entry.text)
    .join('\n');
}

function hash32(value: string, seed = 2166136261): number {
  let result = seed;
  for (const character of value) {
    result ^= character.codePointAt(0) ?? 0;
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function fragmentKey(value: string): string {
  return `${value.length}:${hash32(value).toString(36)}:${hash32(value, 3339675911).toString(36)}`;
}

function candidatePairs(termSets: Set<string>[]): Set<string> {
  const frequencies = new Map<string, number>();
  for (const termSet of termSets) {
    for (const term of termSet) frequencies.set(term, (frequencies.get(term) ?? 0) + 1);
  }

  const buckets = new Map<string, number[]>();
  const maximumBucketSize = Math.max(24, Math.ceil(termSets.length * 0.5));
  for (const [index, termSet] of termSets.entries()) {
    const selected: Array<{ term: string; rank: number }> = [];
    for (const term of termSet) {
      if ((frequencies.get(term) ?? 0) > maximumBucketSize) continue;
      const candidate = { term, rank: hash32(term) };
      const insertionIndex = selected.findIndex(
        (entry) =>
          candidate.rank < entry.rank || (candidate.rank === entry.rank && term < entry.term)
      );
      if (insertionIndex === -1) {
        if (selected.length < 16) selected.push(candidate);
      } else {
        selected.splice(insertionIndex, 0, candidate);
        if (selected.length > 16) selected.pop();
      }
    }
    for (const { term } of selected) {
      const bucket = buckets.get(term) ?? [];
      bucket.push(index);
      buckets.set(term, bucket);
    }
  }

  const pairs = new Set<string>();
  for (const bucket of buckets.values()) {
    for (let left = 0; left < bucket.length; left += 1) {
      for (let right = left + 1; right < bucket.length; right += 1) {
        const leftIndex = bucket[left];
        const rightIndex = bucket[right];
        pairs.add(`${Math.min(leftIndex, rightIndex)}:${Math.max(leftIndex, rightIndex)}`);
      }
    }
  }
  return pairs;
}

function requiredLayoutCount(activityCount: number): number {
  return Math.min(activityCount, Math.max(8, Math.min(20, Math.ceil(activityCount * 0.1))));
}

export function auditCurriculumDuplication(
  activities: AuditableActivity[],
  projects: AuditableProject[] = [],
  options: DuplicationAuditOptions = {}
): DuplicationAuditResult {
  const minimumFragmentCharacters = options.minimumFragmentCharacters ?? 60;
  const minimumRepeatedActivities = options.minimumRepeatedActivities ?? 5;
  const minimumRepeatedCompetencies = options.minimumRepeatedCompetencies ?? 3;
  const maximumGenericFragmentCopies = options.maximumGenericFragmentCopies ?? 50;
  const nearDuplicateThreshold = options.nearDuplicateThreshold ?? 0.75;
  const projectNearDuplicateThreshold = options.projectNearDuplicateThreshold ?? 0.82;
  const fragments = new Map<
    string,
    {
      sample?: string;
      normalizedText?: string;
      activityCount: number;
      firstActivityId: string;
      lastActivityId: string;
      sampleActivityIds?: string[];
      firstCourseId: string;
      courseIds?: Set<string>;
      firstCompetencyIds: string[];
      competencyIds?: Set<string>;
    }
  >();
  const layoutGroups = new Map<
    string,
    { courseId: string; kind: string; activities: number; layouts: Set<string> }
  >();
  let fragmentCount = 0;

  for (const activity of activities) {
    const layoutKey = `${activity.courseId}:${activity.kind}`;
    const layoutGroup = layoutGroups.get(layoutKey) ?? {
      courseId: activity.courseId,
      kind: activity.kind,
      activities: 0,
      layouts: new Set<string>(),
    };
    layoutGroup.activities += 1;
    layoutGroup.layouts.add(activity.steps.map((step) => step.interaction).join('>'));
    layoutGroups.set(layoutKey, layoutGroup);

    for (const fragment of textFragments(activity)) {
      if (fragment.text.length < minimumFragmentCharacters) continue;
      const normalizedText = normalizeCurriculumText(fragment.text);
      if (normalizedText.length < minimumFragmentCharacters - 10) continue;
      fragmentCount += 1;
      const key = fragmentKey(normalizedText);
      const existing = fragments.get(key);
      if (!existing) {
        fragments.set(key, {
          activityCount: 1,
          firstActivityId: activity.id,
          lastActivityId: activity.id,
          firstCourseId: activity.courseId,
          firstCompetencyIds: fragment.competencyIds,
        });
        continue;
      }

      existing.sample ??= fragment.text;
      existing.normalizedText ??= normalizedText;
      if (existing.lastActivityId !== activity.id) {
        existing.activityCount += 1;
        existing.lastActivityId = activity.id;
        existing.sampleActivityIds ??= [existing.firstActivityId];
        if (existing.sampleActivityIds.length < 12) existing.sampleActivityIds.push(activity.id);
      }
      if (activity.courseId !== existing.firstCourseId) {
        existing.courseIds ??= new Set([existing.firstCourseId]);
        existing.courseIds.add(activity.courseId);
      }
      const hasNewCompetency = fragment.competencyIds.some(
        (id) => !existing.firstCompetencyIds.includes(id)
      );
      if (hasNewCompetency || existing.competencyIds) {
        existing.competencyIds ??= new Set(existing.firstCompetencyIds);
        for (const id of fragment.competencyIds) existing.competencyIds.add(id);
      }
    }
  }

  const genericTextDefects = [...fragments.entries()]
    .filter(
      ([, record]) =>
        record.activityCount >= minimumRepeatedActivities &&
        (record.competencyIds?.size ?? new Set(record.firstCompetencyIds).size) >=
          minimumRepeatedCompetencies &&
        record.activityCount > maximumGenericFragmentCopies
    )
    .map(([, record]) => ({
      normalizedText: record.normalizedText ?? normalizeCurriculumText(record.sample ?? ''),
      sample: record.sample ?? '',
      activityCount: record.activityCount,
      competencyCount: record.competencyIds?.size ?? new Set(record.firstCompetencyIds).size,
      courseCount: record.courseIds?.size ?? 1,
      sampleActivityIds: (record.sampleActivityIds ?? [record.firstActivityId]).sort(),
    }))
    .sort((left, right) => right.activityCount - left.activityCount);
  fragments.clear();

  const layoutDefects = [...layoutGroups.values()]
    .filter((group) => group.activities >= 8)
    .map((group) => ({
      courseId: group.courseId,
      kind: group.kind,
      activityCount: group.activities,
      uniqueLayouts: group.layouts.size,
      requiredLayouts: requiredLayoutCount(group.activities),
    }))
    .filter((group) => group.uniqueLayouts < group.requiredLayouts)
    .sort(
      (left, right) =>
        left.uniqueLayouts / left.requiredLayouts - right.uniqueLayouts / right.requiredLayouts
    );

  const nearDuplicateActivities: DuplicationAuditResult['nearDuplicateActivities'] = [];
  let nearDuplicateCandidates = 0;
  const activitiesByGroup = new Map<string, AuditableActivity[]>();
  for (const activity of activities) {
    const key = `${activity.courseId}:${activity.kind}`;
    const group = activitiesByGroup.get(key) ?? [];
    group.push(activity);
    activitiesByGroup.set(key, group);
  }
  for (const group of activitiesByGroup.values()) {
    const indexed = group.map((activity) => ({
      activity,
      shingles: wordShingles(activityText(activity)),
    }));
    const pairs = candidatePairs(indexed.map((entry) => entry.shingles));
    nearDuplicateCandidates += pairs.size;
    for (const pair of pairs) {
      const [leftIndex, rightIndex] = pair.split(':').map(Number);
      const left = indexed[leftIndex];
      const right = indexed[rightIndex];
      if (left.shingles.size < 30 || right.shingles.size < 30) continue;
      const similarity = jaccardSimilarity(left.shingles, right.shingles);
      if (similarity < nearDuplicateThreshold) continue;
      nearDuplicateActivities.push({
        courseId: left.activity.courseId,
        kind: left.activity.kind,
        leftId: left.activity.id,
        rightId: right.activity.id,
        similarity,
      });
    }
  }
  nearDuplicateActivities.sort((left, right) => right.similarity - left.similarity);

  const nearDuplicateProjects: DuplicationAuditResult['nearDuplicateProjects'] = [];
  const projectTerms = projects.map((project) => ({
    project,
    terms: terms(
      [project.title, project.stakeholder, project.userNeed, ...project.constraints].join(' ')
    ),
  }));
  for (let leftIndex = 0; leftIndex < projectTerms.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < projectTerms.length; rightIndex += 1) {
      const left = projectTerms[leftIndex];
      const right = projectTerms[rightIndex];
      const similarity = jaccardSimilarity(left.terms, right.terms);
      if (similarity < projectNearDuplicateThreshold) continue;
      nearDuplicateProjects.push({
        leftId: `${left.project.courseId}/${left.project.id}`,
        rightId: `${right.project.courseId}/${right.project.id}`,
        similarity,
      });
    }
  }
  nearDuplicateProjects.sort((left, right) => right.similarity - left.similarity);

  return {
    totals: {
      activities: activities.length,
      fragments: fragmentCount,
      layoutGroups: layoutGroups.size,
      nearDuplicateCandidates,
      projects: projects.length,
    },
    genericTextDefects,
    layoutDefects,
    nearDuplicateActivities,
    nearDuplicateProjects,
  };
}
