import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph } from './repository';

const courses = [
  {
    id: 'javascript-basics',
    competencies: 84,
    modules: 14,
    activities: 159,
    steps: 1349,
    checks: 1480,
    projects: 4,
    prerequisiteCourseIds: ['responsive-web-design'],
    reviewedAt: '2026-07-13',
    language: 'javascript',
  },
  {
    id: 'typescript-basics',
    competencies: 75,
    modules: 15,
    activities: 155,
    steps: 1266,
    checks: 1391,
    projects: 4,
    prerequisiteCourseIds: ['javascript-basics'],
    reviewedAt: '2026-07-14',
    language: 'typescript',
  },
] as const;

describe.each(courses)('$id v2 course', (expected) => {
  it('has a valid researched cumulative blueprint', () => {
    const raw = JSON.parse(
      readFileSync(path.join(process.cwd(), 'blueprints', `${expected.id}.json`), 'utf8')
    );
    const blueprint = CourseBlueprintSchema.parse(raw);

    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.competencies).toHaveLength(expected.competencies);
    expect(blueprint.modules).toHaveLength(expected.modules);
    expect(blueprint.projects).toHaveLength(expected.projects);
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(expected.prerequisiteCourseIds);
    expect(blueprint.sources.every((source) => source.reviewedAt === expected.reviewedAt)).toBe(
      true
    );
    expect(
      blueprint.sources.every(
        (source) =>
          source.url.startsWith('https://') &&
          (source.authority === 'official-docs' || source.authority === 'standard')
      )
    ).toBe(true);
  });

  it('contains varied interactive practice and mechanically checked builds', () => {
    const graph = loadCurriculumGraph(expected.id);
    const steps = graph.activities.flatMap((activity) => activity.steps);
    const codeSteps = steps.filter((step) => step.interaction === 'code');
    const markers = graph.activities.flatMap((activity) =>
      activity.checks
        .filter((check) => check.type === 'source-includes')
        .map((check) => check.expected)
    );

    expect(graph.modules).toHaveLength(expected.modules);
    expect(graph.activities).toHaveLength(expected.activities);
    expect(steps).toHaveLength(expected.steps);
    expect(graph.activities.flatMap((activity) => activity.checks)).toHaveLength(expected.checks);
    expect(graph.course.competencies).toHaveLength(expected.competencies);
    expect(graph.course.credential.requiredProjectIds).toHaveLength(expected.projects);
    expect(graph.activities.at(-1)?.id).toBe(graph.course.credential.finalExamId);
    expect(new Set(markers).size).toBe(markers.length);
    expect(codeSteps.length).toBeGreaterThan(100);
    expect(codeSteps.every((step) => step.targetFile === expected.language)).toBe(true);

    const activityShapes = graph.activities.map((activity) =>
      activity.steps.map((step) => `${step.interaction}:${step.title}`).join('|')
    );
    expect(new Set(activityShapes).size).toBe(activityShapes.length);

    for (const activity of graph.activities) {
      expect(activity.steps.length).toBeGreaterThanOrEqual(7);
      expect(activity.steps.some((step) => step.interaction === 'reflect')).toBe(true);
      for (const step of activity.steps.filter((entry) => entry.interaction === 'code')) {
        const checks = activity.checks.filter((check) => step.checkIds.includes(check.id));
        expect(checks.some((check) => check.type === 'source-includes')).toBe(true);
        expect(checks.some((check) => check.type === 'source-matches')).toBe(true);
      }
    }
  });

  it('teaches with specific cases, runnable theory, and non-revealing predictions', () => {
    const graph = loadCurriculumGraph(expected.id);
    const instructions = graph.activities.flatMap((activity) =>
      activity.steps.map((step) => step.instruction)
    );
    const frequencies = new Map<string, number>();
    for (const instruction of instructions) {
      frequencies.set(instruction, (frequencies.get(instruction) ?? 0) + 1);
    }

    expect(new Set(instructions).size / instructions.length).toBeGreaterThan(0.98);
    expect(Math.max(...frequencies.values())).toBeLessThanOrEqual(4);
    expect(
      instructions.some(
        (instruction) =>
          instruction.includes('Use a changed') && instruction.includes('derived from this module')
      )
    ).toBe(false);
    expect(graph.activities.some((activity) => /(?:^|: )Ts\s/.test(activity.title))).toBe(false);

    const theoryActivities = graph.activities.filter((activity) => activity.kind === 'theory');
    expect(theoryActivities).toHaveLength(expected.competencies);
    for (const activity of theoryActivities) {
      const blocks = activity.steps.flatMap((step) => step.content);
      expect(
        blocks.some((block) => block.type === 'code' && block.language === expected.language)
      ).toBe(true);
      const calloutTitles = blocks
        .filter((block) => block.type === 'callout')
        .map((block) => block.title);
      expect(calloutTitles).toContain('Worked case pattern');
      expect(calloutTitles).toContain('Non-worked case');
    }

    const predictionInstructions = graph.activities.flatMap((activity) =>
      activity.steps
        .filter((step) => step.interaction === 'predict')
        .map((step) => step.instruction)
    );
    for (const competency of graph.course.competencies) {
      expect(
        predictionInstructions.some((instruction) => instruction.includes(competency.statement))
      ).toBe(false);
    }
  });
});
