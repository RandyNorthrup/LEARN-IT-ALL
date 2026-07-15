import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  LEGACY_COURSE_SHAPES,
  type LegacySurface,
  resolveLegacyCurriculumTarget,
} from './legacyMigration';
import { loadCurriculumGraph } from './repository';

const allowedKinds: Record<LegacySurface, string[]> = {
  lesson: ['theory'],
  exercise: ['workshop', 'lab', 'debug', 'review', 'project'],
  quiz: ['quiz', 'exam'],
};

describe('legacy curriculum retirement', () => {
  it('keeps no learner content in the retired version 1 directory', () => {
    expect(existsSync(path.join(process.cwd(), 'content', 'courses'))).toBe(false);
  });

  for (const [courseId, shape] of Object.entries(LEGACY_COURSE_SHAPES)) {
    it(`maps every known ${courseId} ordinal to an existing equivalent V2 activity`, () => {
      const graph = loadCurriculumGraph(courseId);
      const activityById = new Map(graph.activities.map((activity) => [activity.id, activity]));

      const totals: Record<LegacySurface, number> = {
        lesson: shape.lessons,
        exercise: shape.exercises,
        quiz: shape.quizzes,
      };

      for (const surface of Object.keys(totals) as LegacySurface[]) {
        for (let ordinal = 1; ordinal <= totals[surface]; ordinal += 1) {
          const prefix = surface === 'quiz' ? 'quiz' : surface;
          const target = resolveLegacyCurriculumTarget(
            graph,
            surface,
            `${prefix}-${String(ordinal).padStart(3, '0')}-retired-bookmark`
          );
          expect(target, `${surface} ${ordinal}`).not.toBeNull();
          const activity = activityById.get(target?.activityId ?? '');
          expect(activity).toBeDefined();
          expect(allowedKinds[surface]).toContain(activity?.kind);
          expect(target?.href).toBe(`/learn/${courseId}/${activity?.moduleId}/${activity?.id}`);
        }
      }
    });
  }

  it('maps final exams to the current exam and rejects unknown or out-of-range bookmarks', () => {
    const graph = loadCurriculumGraph('responsive-web-design');
    const target = resolveLegacyCurriculumTarget(graph, 'quiz', 'final-exam');
    const activity = graph.activities.find((candidate) => candidate.id === target?.activityId);

    expect(activity?.kind).toBe('exam');
    expect(resolveLegacyCurriculumTarget(graph, 'lesson', 'lesson-999-missing')).toBeNull();
    expect(resolveLegacyCurriculumTarget(graph, 'lesson', 'not-a-lesson')).toBeNull();
  });
});
