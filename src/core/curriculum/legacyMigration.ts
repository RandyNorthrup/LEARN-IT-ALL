import { type CurriculumGraph, loadCurriculumGraph } from './repository';
import type { CurriculumActivity } from './schema';

export type LegacySurface = 'lesson' | 'exercise' | 'quiz';

interface LegacyCourseShape {
  lessons: number;
  exercises: number;
  quizzes: number;
}

export const LEGACY_COURSE_SHAPES = {
  'responsive-web-design': { lessons: 28, exercises: 28, quizzes: 10 },
  'python-basics': { lessons: 184, exercises: 219, quizzes: 17 },
  'python-oop': { lessons: 61, exercises: 61, quizzes: 7 },
  'comptia-network-plus': { lessons: 93, exercises: 102, quizzes: 11 },
} as const satisfies Record<string, LegacyCourseShape>;

const SURFACE_KINDS: Record<LegacySurface, ReadonlySet<CurriculumActivity['kind']>> = {
  lesson: new Set(['theory']),
  exercise: new Set(['workshop', 'lab', 'debug', 'review', 'project']),
  quiz: new Set(['quiz', 'exam']),
};

export interface LegacyCurriculumTarget {
  courseId: string;
  moduleId: string;
  activityId: string;
  href: string;
}

function parseLegacyOrdinal(surface: LegacySurface, legacyId: string): number | null {
  if (surface === 'quiz' && /(?:^|-)final(?:-|$)|(?:^|-)exam(?:-|$)/i.test(legacyId)) {
    return Number.POSITIVE_INFINITY;
  }

  const expectedPrefix = surface === 'exercise' ? '(?:exercise|lesson)' : surface;
  const match = legacyId.match(new RegExp(`^${expectedPrefix}-(\\d+)`, 'i'));
  if (!match) return null;
  const ordinal = Number.parseInt(match[1], 10);
  return Number.isSafeInteger(ordinal) && ordinal > 0 ? ordinal : null;
}

function selectProportionalActivity(
  candidates: CurriculumActivity[],
  ordinal: number,
  legacyTotal: number
): CurriculumActivity | null {
  if (candidates.length === 0) return null;
  if (ordinal === Number.POSITIVE_INFINITY) return candidates.at(-1) ?? null;
  if (ordinal > legacyTotal) return null;

  const ratio = legacyTotal === 1 ? 0 : (ordinal - 1) / (legacyTotal - 1);
  return candidates[Math.round(ratio * (candidates.length - 1))] ?? null;
}

export function resolveLegacyCurriculumTarget(
  graph: CurriculumGraph,
  surface: LegacySurface,
  legacyId: string
): LegacyCurriculumTarget | null {
  const shape = LEGACY_COURSE_SHAPES[graph.course.id as keyof typeof LEGACY_COURSE_SHAPES];
  if (!shape) return null;

  const ordinal = parseLegacyOrdinal(surface, legacyId);
  if (ordinal === null) return null;

  const candidates = graph.activities.filter((activity) =>
    SURFACE_KINDS[surface].has(activity.kind)
  );
  const legacyTotal =
    surface === 'lesson' ? shape.lessons : surface === 'exercise' ? shape.exercises : shape.quizzes;
  const activity = selectProportionalActivity(candidates, ordinal, legacyTotal);
  if (!activity) return null;

  return {
    courseId: graph.course.id,
    moduleId: activity.moduleId,
    activityId: activity.id,
    href: `/learn/${graph.course.id}/${activity.moduleId}/${activity.id}`,
  };
}

export function getLegacyCurriculumRedirect(
  courseId: string,
  surface: LegacySurface,
  legacyId: string
): LegacyCurriculumTarget | null {
  if (!(courseId in LEGACY_COURSE_SHAPES)) return null;

  try {
    return resolveLegacyCurriculumTarget(loadCurriculumGraph(courseId), surface, legacyId);
  } catch {
    return null;
  }
}
