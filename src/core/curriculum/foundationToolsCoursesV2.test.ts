import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph } from './repository';

const courses = [
  {
    id: 'linux-basics',
    modules: 14,
    activities: 145,
    steps: 1251,
    checks: 1368,
    competencies: 70,
    projects: 4,
    prerequisiteCourseIds: [],
  },
  {
    id: 'git-basics',
    modules: 14,
    activities: 145,
    steps: 1260,
    checks: 1377,
    competencies: 70,
    projects: 4,
    prerequisiteCourseIds: ['linux-basics'],
  },
] as const;

describe.each(courses)('$id v2 foundation course', (expected) => {
  it('has a valid primary-source blueprint in prerequisite order', () => {
    const raw = JSON.parse(
      readFileSync(path.join(process.cwd(), 'blueprints', `${expected.id}.json`), 'utf8')
    );
    const blueprint = CourseBlueprintSchema.parse(raw);

    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.modules).toHaveLength(expected.modules);
    expect(blueprint.competencies).toHaveLength(expected.competencies);
    expect(blueprint.projects).toHaveLength(expected.projects);
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(expected.prerequisiteCourseIds);
    expect(blueprint.sources.length).toBeGreaterThanOrEqual(5);
    expect(
      blueprint.sources.every(
        (source) =>
          source.reviewedAt === '2026-07-14' &&
          source.url.startsWith('https://') &&
          (source.authority === 'official-docs' || source.authority === 'standard')
      )
    ).toBe(true);
  });

  it('provides cumulative simulated terminal practice with mechanical evidence checks', () => {
    const graph = loadCurriculumGraph(expected.id);
    const steps = graph.activities.flatMap((activity) => activity.steps);
    const checks = graph.activities.flatMap((activity) => activity.checks);
    const codeSteps = steps.filter((step) => step.interaction === 'code');
    const markers = checks
      .filter((check) => check.type === 'source-includes')
      .map((check) => check.expected);

    expect(graph.modules).toHaveLength(expected.modules);
    expect(graph.activities).toHaveLength(expected.activities);
    expect(steps).toHaveLength(expected.steps);
    expect(checks).toHaveLength(expected.checks);
    expect(graph.activities.at(-1)?.id).toBe(graph.course.credential.finalExamId);
    expect(graph.course.credential.requiredProjectIds).toHaveLength(expected.projects);
    expect(new Set(markers).size).toBe(markers.length);
    expect(codeSteps.length).toBeGreaterThan(100);
    expect(codeSteps.every((step) => step.targetFile === 'shell')).toBe(true);

    for (const activity of graph.activities) {
      expect(activity.steps.length).toBeGreaterThanOrEqual(7);
      expect(activity.steps.some((step) => step.interaction === 'reflect')).toBe(true);
      for (const step of activity.steps.filter((entry) => entry.interaction === 'code')) {
        const stepChecks = activity.checks.filter((check) => step.checkIds.includes(check.id));
        expect(stepChecks.some((check) => check.type === 'source-includes')).toBe(true);
        expect(stepChecks.some((check) => check.type === 'source-matches')).toBe(true);
      }
    }
  });

  it('uses specific changed cases, runnable theory, and non-revealing predictions', () => {
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
      instructions.some((instruction) => instruction.includes('derived from this module'))
    ).toBe(false);

    const theoryActivities = graph.activities.filter((activity) => activity.kind === 'theory');
    expect(theoryActivities).toHaveLength(expected.competencies);
    for (const activity of theoryActivities) {
      const blocks = activity.steps.flatMap((step) => step.content);
      expect(blocks.some((block) => block.type === 'code' && block.language === 'bash')).toBe(true);
      const calloutTitles = blocks
        .filter((block) => block.type === 'callout')
        .map((block) => block.title);
      expect(calloutTitles).toContain('Worked case pattern');
      expect(calloutTitles).toContain('Non-worked case');
    }

    const predictions = graph.activities.flatMap((activity) =>
      activity.steps
        .filter((step) => step.interaction === 'predict')
        .map((step) => step.instruction)
    );
    for (const competency of graph.course.competencies) {
      expect(predictions.some((instruction) => instruction.includes(competency.statement))).toBe(
        false
      );
    }
  });
});
