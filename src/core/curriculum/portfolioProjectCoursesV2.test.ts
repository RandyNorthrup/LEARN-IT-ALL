import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { ALL_COURSES, isV2Course } from '../../lib/data/courses';
import { formatConfigLabReport } from '../learning/configLabSimulator';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph } from './repository';

const expectations = {
  'personal-project-1': {
    title: 'Independent Product Studio I: Discover, Build, Validate, and Defend',
    prerequisites: ['python-dsa', 'c-memory-management'],
    modules: 12,
    competencies: 60,
    activities: 126,
    steps: 1031,
    checks: 1133,
    hours: 199.8,
  },
  'personal-project-2': {
    title: 'Independent Product Studio II: Multi-Actor Systems, Delivery, and Operations',
    prerequisites: ['personal-project-1'],
    modules: 14,
    competencies: 70,
    activities: 146,
    steps: 1194,
    checks: 1312,
    hours: 225.6,
  },
  'capstone-project': {
    title: 'Institution-Grade Computing Capstone: Evidence, Impact, Operations, and Defense',
    prerequisites: ['personal-project-2'],
    modules: 16,
    competencies: 80,
    activities: 166,
    steps: 1356,
    checks: 1490,
    hours: 251.4,
  },
} as const;

function normalized(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

describe('independent product studios and capstone', () => {
  it('publishes three complete, prerequisite-ordered, evidence-driven course graphs', () => {
    for (const [courseId, expected] of Object.entries(expectations)) {
      const graph = loadCurriculumGraph(courseId);
      const blueprint = CourseBlueprintSchema.parse(
        JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', `${courseId}.json`), 'utf8'))
      );
      const steps = graph.activities.reduce((sum, activity) => sum + activity.steps.length, 0);
      const checks = graph.activities.reduce((sum, activity) => sum + activity.checks.length, 0);

      expect(auditCourseBlueprint(blueprint)).toEqual([]);
      expect(graph.course.title).toBe(expected.title);
      expect(graph.course.prerequisites).toEqual(expected.prerequisites);
      expect(graph.modules).toHaveLength(expected.modules);
      expect(graph.course.competencies).toHaveLength(expected.competencies);
      expect(graph.activities).toHaveLength(expected.activities);
      expect(steps).toBe(expected.steps);
      expect(checks).toBe(expected.checks);
      expect(graph.course.estimatedHours).toBe(expected.hours);
      expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
      expect(graph.course.credential.passingPercent).toBe(88);
      expect(graph.activities.at(-1)?.id).toBe(graph.course.credential.finalExamId);
      expect(graph.modules.map((module) => module.order)).toEqual(
        Array.from({ length: expected.modules }, (_, index) => index + 1)
      );
      expect(
        graph.modules.every((module, index) =>
          index === 0
            ? module.prerequisites.length === 0
            : module.prerequisites[0] === graph.modules[index - 1]?.id
        )
      ).toBe(true);
      expect(isV2Course(courseId)).toBe(true);
      expect(
        ALL_COURSES.some(
          (course) =>
            course.id === courseId &&
            course.status === 'available' &&
            course.estimatedHours === expected.hours &&
            course.lessonCount === expected.activities &&
            course.chapterCount === expected.modules
        )
      ).toBe(true);
    }
  });

  it('keeps every competency, module, project, and stakeholder need distinct across the sequence', () => {
    const blueprints = Object.keys(expectations).map((courseId) =>
      CourseBlueprintSchema.parse(
        JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', `${courseId}.json`), 'utf8'))
      )
    );
    const assertUnique = (values: string[]) =>
      expect(new Set(values.map(normalized)).size).toBe(values.length);

    assertUnique(
      blueprints.flatMap((blueprint) => blueprint.competencies.map((item) => item.statement))
    );
    assertUnique(blueprints.flatMap((blueprint) => blueprint.modules.map((item) => item.title)));
    assertUnique(blueprints.flatMap((blueprint) => blueprint.projects.map((item) => item.title)));
    assertUnique(
      blueprints.flatMap((blueprint) => blueprint.projects.map((item) => item.userNeed))
    );
    expect(
      blueprints
        .flatMap((blueprint) => blueprint.competencies)
        .every(
          (competency) =>
            competency.misconceptions.length > 0 &&
            competency.masteryEvidence.length > 0 &&
            competency.prerequisiteIds.length <= 1
        )
    ).toBe(true);
  });

  it('uses current authoritative research while keeping draft and conformance claims bounded', () => {
    for (const courseId of Object.keys(expectations)) {
      const blueprint = CourseBlueprintSchema.parse(
        JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', `${courseId}.json`), 'utf8'))
      );
      const sources = blueprint.sources;
      const sourceText = JSON.stringify(sources);

      expect(sources.length).toBeGreaterThanOrEqual(10);
      expect(new Set(sources.map((source) => source.url)).size).toBe(sources.length);
      expect(sources.every((source) => source.reviewedAt === '2026-07-15')).toBe(true);
      expect(sourceText).toContain('CS2023 final report');
      expect(sourceText).toContain('WCAG 2.2 Recommendation; ISO IEC 40500:2025');
      expect(sourceText).toContain('NIST SP 800-218 SSDF 1.1 final');
      expect(sourceText).toContain('1.1 remains an initial public draft');
      expect(sourceText).toContain('SLSA 1.2');
      expect(sourceText).toContain('SPDX 3.0.1');
    }
  });

  it('requires cumulative product evidence and keeps the browser lab non-executing', () => {
    for (const courseId of Object.keys(expectations)) {
      const graph = loadCurriculumGraph(courseId);
      const firstSource = graph.activities[0]?.starterFiles?.config ?? '';
      const firstReport = formatConfigLabReport(firstSource);
      const activityKinds = new Set(graph.activities.map((activity) => activity.kind));
      const codeSteps = graph.activities.flatMap((activity) =>
        activity.steps.filter((step) => step.interaction === 'code')
      );

      expect(firstSource).toContain('workspace: portfolio');
      expect(firstSource).toContain('never contact participants or services');
      expect(firstReport).toContain('PRODUCT EVIDENCE REVIEW: 1/12');
      expect(firstReport).toContain('never executes learner commands');
      expect(activityKinds).toEqual(
        new Set(['theory', 'workshop', 'debug', 'lab', 'review', 'quiz', 'project', 'exam'])
      );
      expect(codeSteps.length).toBeGreaterThan(expectedCodeMinimum(courseId));
      expect(codeSteps.every((step) => step.targetFile === 'config')).toBe(true);
      expect(
        graph.activities
          .flatMap((activity) => activity.steps)
          .every(
            (step) =>
              !step.why.includes('executable Go behavior') && step.why.includes('stakeholder')
          )
      ).toBe(true);
      expect(
        graph.activities.every(
          (activity) =>
            activity.steps.some((step) => step.interaction === 'reflect') &&
            activity.steps.some((step) =>
              ['predict', 'arrange', 'inspect', 'debug', 'code'].includes(step.interaction)
            )
        )
      ).toBe(true);
    }
  });
});

function expectedCodeMinimum(courseId: string) {
  return expectations[courseId as keyof typeof expectations].competencies * 1.5;
}
