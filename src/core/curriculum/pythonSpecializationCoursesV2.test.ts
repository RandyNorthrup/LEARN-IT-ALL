import { describe, expect, it } from 'vitest';
import { loadCurriculumGraph } from './repository';

const expectations = {
  'python-functional': {
    modules: 12,
    activities: 125,
    competencies: 60,
    steps: 1081,
    checks: 1182,
    prerequisites: ['python-basics', 'python-oop'],
    starterMarker: 'immutable transformation portfolio',
  },
  'python-dsa': {
    modules: 16,
    activities: 165,
    competencies: 80,
    steps: 1418,
    checks: 1551,
    prerequisites: ['python-basics', 'python-oop'],
    starterMarker: 'algorithm evidence portfolio',
  },
  'python-dsa-2': {
    modules: 16,
    activities: 165,
    competencies: 80,
    steps: 1413,
    checks: 1546,
    prerequisites: ['python-dsa'],
    starterMarker: 'algorithm evidence portfolio',
  },
} as const;

const requiredModuleKinds = ['theory', 'workshop', 'debug', 'lab', 'review', 'quiz'] as const;

function normalized(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

describe('Python specialization v2 courses', () => {
  for (const [courseId, expected] of Object.entries(expectations)) {
    it(`${courseId} teaches with concrete cumulative Python performance`, () => {
      const graph = loadCurriculumGraph(courseId);
      const steps = graph.activities.flatMap((activity) => activity.steps);
      const checks = graph.activities.flatMap((activity) => activity.checks);
      const instructionCounts = new Map<string, number>();

      for (const step of steps) {
        const instruction = normalized(step.instruction);
        instructionCounts.set(instruction, (instructionCounts.get(instruction) ?? 0) + 1);
      }

      expect(graph.modules).toHaveLength(expected.modules);
      expect(graph.activities).toHaveLength(expected.activities);
      expect(graph.course.competencies).toHaveLength(expected.competencies);
      expect(graph.course.prerequisites).toEqual(expected.prerequisites);
      expect(steps).toHaveLength(expected.steps);
      expect(checks).toHaveLength(expected.checks);
      expect(graph.course.credential.requiredProjectIds).toHaveLength(4);
      expect(graph.activities.at(-1)?.id).toBe(graph.course.credential.finalExamId);

      for (const module of graph.modules) {
        const kinds = new Set(
          graph.activities
            .filter((activity) => activity.moduleId === module.id)
            .map((activity) => activity.kind)
        );
        for (const kind of requiredModuleKinds) expect(kinds.has(kind)).toBe(true);
      }

      expect(instructionCounts.size / steps.length).toBeGreaterThan(0.78);
      expect(Math.max(...instructionCounts.values())).toBeLessThanOrEqual(4);
      expect(
        steps.some((step) => /in a fresh version of the stakeholder case/i.test(step.instruction))
      ).toBe(false);
      expect(steps.some((step) => /\b(?:Fp|Dsa2?)\b/.test(step.title))).toBe(false);

      const competencyStatements = graph.course.competencies.map((entry) => entry.statement);
      for (const step of steps.filter((entry) => entry.interaction === 'predict')) {
        const visibleParagraphs = step.content
          .filter((block) => block.type === 'paragraph')
          .map((block) => block.text);
        expect(
          visibleParagraphs.some((text) =>
            competencyStatements.some((statement) => text.includes(statement))
          ),
          `${courseId}/${step.id} reveals its answer before prediction`
        ).toBe(false);
      }

      const theoryActivities = graph.activities.filter((activity) => activity.kind === 'theory');
      expect(theoryActivities).toHaveLength(expected.competencies);
      for (const activity of theoryActivities) {
        const blocks = activity.steps.flatMap((step) => step.content);
        expect(blocks.some((block) => block.type === 'code' && block.language === 'python')).toBe(
          true
        );
        const calloutTitles = blocks
          .filter((block) => block.type === 'callout')
          .map((block) => block.title);
        expect(calloutTitles).toContain('Worked case pattern');
        expect(calloutTitles).toContain('Non-worked case');
      }

      const codeActivities = graph.activities.filter((activity) =>
        activity.steps.some((step) => step.interaction === 'code')
      );
      expect(codeActivities.length).toBeGreaterThan(100);
      for (const activity of codeActivities) {
        expect(activity.starterFiles?.python).toContain(expected.starterMarker);
        expect(
          activity.checks.some(
            (check) => check.type !== 'source-includes' && check.type !== 'source-matches'
          )
        ).toBe(true);
      }

      const concreteScenarios = steps.filter((step) =>
        /\[[^\]]+\]|\{[^}]+\}|edges? |records?|items?|jobs?|intervals?/i.test(step.instruction)
      );
      expect(concreteScenarios.length).toBeGreaterThan(steps.length * 0.35);
    });
  }

  it('keeps specialization competency statements distinct across both algorithm levels', () => {
    const statements = Object.keys(expectations).flatMap((courseId) =>
      loadCurriculumGraph(courseId).course.competencies.map((entry) => normalized(entry.statement))
    );
    expect(new Set(statements).size).toBe(statements.length);
  });
});
