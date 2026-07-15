import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { ALL_COURSES, isV2Course } from '../../lib/data/courses';
import { formatConfigLabReport } from '../learning/configLabSimulator';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph } from './repository';

const courseId = 'job-search';

function normalized(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

describe('evidence-driven programming career launch', () => {
  it('publishes a complete capstone-gated cumulative career graph', () => {
    const graph = loadCurriculumGraph(courseId);
    const blueprint = CourseBlueprintSchema.parse(
      JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', `${courseId}.json`), 'utf8'))
    );
    const steps = graph.activities.reduce((sum, activity) => sum + activity.steps.length, 0);
    const checks = graph.activities.reduce((sum, activity) => sum + activity.checks.length, 0);

    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(graph.course.title).toBe('Evidence-Driven Programming Career Launch');
    expect(graph.course.prerequisites).toEqual(['capstone-project']);
    expect(graph.modules).toHaveLength(20);
    expect(graph.course.competencies).toHaveLength(100);
    expect(graph.activities).toHaveLength(206);
    expect(steps).toBe(1681);
    expect(checks).toBe(1847);
    expect(graph.course.estimatedHours).toBe(303);
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.course.credential.passingPercent).toBe(88);
    expect(graph.activities.at(-1)?.id).toBe(graph.course.credential.finalExamId);
    expect(graph.modules.map((module) => module.order)).toEqual(
      Array.from({ length: 20 }, (_, index) => index + 1)
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
          course.estimatedHours === 303 &&
          course.lessonCount === 206 &&
          course.chapterCount === 20
      )
    ).toBe(true);
  });

  it('keeps all competencies, modules, projects, user needs, and cases distinct', () => {
    const blueprint = CourseBlueprintSchema.parse(
      JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', `${courseId}.json`), 'utf8'))
    );
    const graph = loadCurriculumGraph(courseId);
    const assertUnique = (values: string[]) =>
      expect(new Set(values.map(normalized)).size).toBe(values.length);

    assertUnique(blueprint.competencies.map((competency) => competency.statement));
    assertUnique(blueprint.modules.map((module) => module.title));
    assertUnique(blueprint.projects.map((project) => project.title));
    assertUnique(blueprint.projects.map((project) => project.userNeed));
    assertUnique(graph.modules.map((module) => module.description));
    expect(
      blueprint.competencies.every(
        (competency) =>
          competency.misconceptions.length > 0 &&
          competency.masteryEvidence.length > 0 &&
          competency.prerequisiteIds.length <= 1
      )
    ).toBe(true);
  });

  it('uses current primary and authoritative sources with explicit geographic and time limits', () => {
    const blueprint = CourseBlueprintSchema.parse(
      JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', `${courseId}.json`), 'utf8'))
    );
    const sourceText = JSON.stringify(blueprint.sources);

    expect(blueprint.sources).toHaveLength(15);
    expect(new Set(blueprint.sources.map((source) => source.url)).size).toBe(15);
    expect(blueprint.sources.every((source) => source.reviewedAt === '2026-07-15')).toBe(true);
    expect(sourceText).toContain('Current eight-competency framework');
    expect(sourceText).toContain('2024 data and 2024-2034 projections');
    expect(sourceText).toContain('U.S. postings from 2025');
    expect(sourceText).toContain('GitHub Docs current 2026-07-15');
    expect(sourceText).toContain('Published 2025-07-10');
    expect(sourceText).toContain('WCAG 2.2 Recommendation; ISO IEC 40500:2025');
    expect(blueprint.sharedRequirements.join(' ')).toContain('location- and time-dependent');
  });

  it('provides varied build-to-learn practice through a safe career evidence simulator', () => {
    const graph = loadCurriculumGraph(courseId);
    const firstSource = graph.activities[0]?.starterFiles?.config ?? '';
    const activityKinds = new Set(graph.activities.map((activity) => activity.kind));
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps.filter((step) => step.interaction === 'code')
    );
    const allSteps = graph.activities.flatMap((activity) => activity.steps);

    expect(firstSource).toContain('workspace: career');
    expect(firstSource).toContain('never contact people');
    expect(formatConfigLabReport(firstSource)).toContain('CAREER EVIDENCE REVIEW: 1/12');
    expect(formatConfigLabReport(firstSource)).toContain('never executes learner commands');
    expect(activityKinds).toEqual(
      new Set(['theory', 'workshop', 'debug', 'lab', 'review', 'quiz', 'project', 'exam'])
    );
    expect(codeSteps.length).toBeGreaterThan(150);
    expect(codeSteps.every((step) => step.targetFile === 'config')).toBe(true);
    expect(allSteps.every((step) => !step.why.includes('executable Go behavior'))).toBe(true);
    expect(allSteps.every((step) => !step.why.includes('evidence evidence'))).toBe(true);
    expect(
      allSteps
        .filter((step) => step.interaction === 'code')
        .every((step) => step.why.includes('target-role'))
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
  });

  it('keeps real hiring actions and learner decisions outside browser execution', () => {
    const graph = loadCurriculumGraph(courseId);
    const serialized = JSON.stringify(graph);
    const starterSources = graph.activities.map((activity) => activity.starterFiles?.config ?? '');

    expect(serialized).toContain('learner-controlled');
    expect(serialized).not.toContain('evidence evidence');
    expect(serialized).toContain('never contact employers or people');
    expect(serialized).toContain('location- and time-dependent');
    expect(starterSources.every((source) => source.includes('workspace: career'))).toBe(true);
    expect(
      starterSources.every(
        (source) =>
          source.includes('never contact people') &&
          source.includes('learner-approved external actions only')
      )
    ).toBe(true);
  });
});
