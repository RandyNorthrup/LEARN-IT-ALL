import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';

const expectations = {
  'python-functional': {
    competencies: 60,
    modules: 12,
    prerequisites: ['python-basics', 'python-oop'],
  },
  'python-dsa': { competencies: 80, modules: 16, prerequisites: ['python-basics', 'python-oop'] },
  'python-dsa-2': { competencies: 80, modules: 16, prerequisites: ['python-dsa'] },
} as const;

describe('Python specialization blueprints', () => {
  for (const [courseId, expected] of Object.entries(expectations)) {
    it(`${courseId} is researched, cumulative, and project-complete`, () => {
      const raw = JSON.parse(
        readFileSync(path.join(process.cwd(), 'blueprints', `${courseId}.json`), 'utf8')
      );
      const blueprint = CourseBlueprintSchema.parse(raw);

      expect(auditCourseBlueprint(blueprint)).toEqual([]);
      expect(blueprint.competencies).toHaveLength(expected.competencies);
      expect(blueprint.modules).toHaveLength(expected.modules);
      expect(blueprint.projects).toHaveLength(4);
      expect(blueprint.pathways.prerequisiteCourseIds).toEqual(expected.prerequisites);
      expect(blueprint.sources.length).toBeGreaterThanOrEqual(4);
      expect(blueprint.sources.every((source) => source.reviewedAt === '2026-07-13')).toBe(true);
      expect(blueprint.assessmentBlueprint.minimumQuestionBankSize).toBeGreaterThanOrEqual(240);
    });
  }
});
