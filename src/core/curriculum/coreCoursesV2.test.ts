import { describe, expect, it } from 'vitest';
import { loadCurriculumGraph } from './repository';

const expectations = {
  'python-basics': {
    modules: 14,
    activities: 164,
    competencies: 89,
    steps: 1413,
    workspace: 'python',
    prerequisites: [],
  },
  'python-oop': {
    modules: 13,
    activities: 147,
    competencies: 77,
    steps: 1256,
    workspace: 'python',
    prerequisites: ['python-basics'],
  },
  'comptia-network-plus': {
    modules: 18,
    activities: 218,
    competencies: 123,
    steps: 1919,
    workspace: 'shell',
    prerequisites: [],
  },
} as const;

const moduleKinds = ['theory', 'workshop', 'debug', 'lab', 'review', 'quiz'] as const;

describe('core Python and networking v2 courses', () => {
  for (const [courseId, expected] of Object.entries(expectations)) {
    it(`${courseId} is a complete cumulative interactive course`, () => {
      const graph = loadCurriculumGraph(courseId);
      const steps = graph.activities.flatMap((activity) => activity.steps);
      const sourceMarkers = graph.activities.flatMap((activity) =>
        activity.checks
          .filter((check) => check.type === 'source-includes')
          .map((check) => check.expected)
      );

      expect(graph.modules).toHaveLength(expected.modules);
      expect(graph.activities).toHaveLength(expected.activities);
      expect(graph.course.competencies).toHaveLength(expected.competencies);
      expect(steps).toHaveLength(expected.steps);
      expect(graph.course.prerequisites).toEqual(expected.prerequisites);
      expect(graph.course.credential.requiredProjectIds).toHaveLength(4);
      expect(graph.activities.at(-1)?.id).toBe(graph.course.credential.finalExamId);
      expect(new Set(sourceMarkers).size).toBe(sourceMarkers.length);

      const workspaces = new Set(
        steps.flatMap((step) => (step.targetFile ? [step.targetFile] : []))
      );
      expect(workspaces).toEqual(new Set([expected.workspace]));

      for (const module of graph.modules) {
        const kinds = new Set(
          graph.activities
            .filter((activity) => activity.moduleId === module.id)
            .map((activity) => activity.kind)
        );
        for (const kind of moduleKinds) expect(kinds.has(kind)).toBe(true);
      }

      for (const activity of graph.activities) {
        expect(activity.steps.length).toBeGreaterThanOrEqual(7);
        expect(activity.steps.every((step) => step.content.length > 0)).toBe(true);
        expect(
          activity.steps
            .filter((step) => step.interaction === 'inspect' || step.interaction === 'debug')
            .every((step) => Boolean(step.stimulus))
        ).toBe(true);
        expect(activity.steps.some((step) => step.interaction === 'reflect')).toBe(true);
        if (activity.kind === 'theory') expect(activity.steps[0].interaction).toBe('predict');
        for (const step of activity.steps.filter((entry) => entry.interaction === 'code')) {
          const checks = activity.checks.filter((check) => step.checkIds.includes(check.id));
          expect(checks.some((check) => check.type === 'source-includes')).toBe(true);
          expect(checks.some((check) => check.type !== 'source-includes')).toBe(true);
        }
      }
    });
  }

  it('adds thousands of deliberate Python and networking interactions', () => {
    const totals = Object.keys(expectations)
      .map((courseId) => loadCurriculumGraph(courseId))
      .reduce(
        (sum, graph) => ({
          modules: sum.modules + graph.modules.length,
          activities: sum.activities + graph.activities.length,
          steps:
            sum.steps +
            graph.activities.reduce(
              (activitySum, activity) => activitySum + activity.steps.length,
              0
            ),
        }),
        { modules: 0, activities: 0, steps: 0 }
      );
    expect(totals).toEqual({ modules: 45, activities: 529, steps: 4588 });
  });
});
