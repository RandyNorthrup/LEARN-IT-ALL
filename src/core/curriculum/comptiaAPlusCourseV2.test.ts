import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { ALL_COURSES, isV2Course } from '../../lib/data/courses';
import { formatConfigLabReport } from '../learning/configLabSimulator';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph } from './repository';

const courseId = 'comptia-a-plus';

const similarityStopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one evidence target case support task implementing it competency probe current changed keep connected mechanically reviewable artifact transfer decision scenario variation change verify failure repair reject record user device'.split(
    ' '
  )
);

function contentTerms(value: string): Set<string> {
  return new Set(
    value
      .toLowerCase()
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .split(' ')
      .filter((word) => word.length > 2 && !similarityStopWords.has(word))
  );
}

function jaccard(left: Set<string>, right: Set<string>): number {
  let intersection = 0;
  for (const term of left) if (right.has(term)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

function loadBlueprint() {
  return CourseBlueprintSchema.parse(
    JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', `${courseId}.json`), 'utf8'))
  );
}

function normalized(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function currentObjectiveIds() {
  const ids: string[] = [];
  const exams: Array<[string, number[]]> = [
    ['220-1201', [3, 8, 8, 2, 6]],
    ['220-1202', [11, 11, 4, 10]],
  ];
  for (const [exam, domains] of exams) {
    domains.forEach((objectiveCount, domainIndex) => {
      for (let objective = 1; objective <= objectiveCount; objective += 1) {
        ids.push(`${exam} ${domainIndex + 1}.${objective}`);
      }
    });
  }
  return ids;
}

describe('CompTIA A+ V15 applied support course', () => {
  it('publishes a complete cumulative beginner-to-independent support graph', () => {
    const graph = loadCurriculumGraph(courseId);
    const blueprint = loadBlueprint();
    const steps = graph.activities.reduce((sum, activity) => sum + activity.steps.length, 0);
    const checks = graph.activities.reduce((sum, activity) => sum + activity.checks.length, 0);

    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(graph.course.title).toBe('CompTIA A+ V15 Applied IT Support and Troubleshooting');
    expect(graph.course.prerequisites).toEqual([]);
    expect(graph.modules).toHaveLength(40);
    expect(graph.course.competencies).toHaveLength(200);
    expect(graph.activities).toHaveLength(407);
    expect(steps).toBe(3316);
    expect(checks).toBe(3643);
    expect(graph.course.estimatedHours).toBe(568);
    expect(graph.course.credential.requiredProjectIds).toHaveLength(6);
    expect(graph.course.credential.passingPercent).toBe(88);
    expect(graph.activities.at(-1)?.id).toBe(graph.course.credential.finalExamId);
    expect(graph.modules.map((module) => module.order)).toEqual(
      Array.from({ length: 40 }, (_, index) => index + 1)
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
          course.estimatedHours === 568 &&
          course.lessonCount === 407 &&
          course.chapterCount === 40
      )
    ).toBe(true);
  });

  it('maps every current 220-1201 and 220-1202 objective into the ordered module graph', () => {
    const blueprint = loadBlueprint();
    const expected = currentObjectiveIds();
    const mapped = blueprint.modules.flatMap((module) => module.sourceObjectiveIds);

    expect(expected).toHaveLength(63);
    expect([...new Set(mapped)].sort()).toEqual([...expected].sort());
    expect(mapped.every((objectiveId) => expected.includes(objectiveId))).toBe(true);
    expect(blueprint.modules[0]?.sourceObjectiveIds).toEqual([]);
    expect(blueprint.modules[0]?.title).toContain('Troubleshooting Method');
    expect(
      blueprint.modules.find((module) => module.id === 'support-mobile-management')
        ?.sourceObjectiveIds
    ).toEqual(expect.arrayContaining(['220-1201 1.3', '220-1202 2.8', '220-1202 3.3']));
    expect(
      blueprint.modules.find((module) => module.id === 'support-professional-pbq-defense')
        ?.sourceObjectiveIds
    ).toContain('220-1202 4.7');
    expect(JSON.stringify(blueprint)).not.toContain('220-1101');
    expect(JSON.stringify(blueprint)).not.toContain('220-1102');
  });

  it('uses dated primary standards and official current platform guidance', () => {
    const blueprint = loadBlueprint();
    const sourceText = JSON.stringify(blueprint.sources);

    expect(blueprint.sources).toHaveLength(22);
    expect(new Set(blueprint.sources.map((source) => source.url)).size).toBe(22);
    expect(blueprint.sources.every((source) => source.reviewedAt === '2026-07-14')).toBe(true);
    expect(sourceText).toContain('V15 objectives document version 4.0');
    expect(sourceText).toContain('Windows 10 22H2 support ended 2025-10-14');
    expect(sourceText).toContain('March 2026 edition');
    expect(sourceText).toContain('Registry updated 2026-06-17');
    expect(sourceText).toContain('NIST SP 800-88 Rev. 2 final 2025-09');
    expect(sourceText).toContain('ISO IEC 40500:2025');
    expect(blueprint.sharedRequirements.join(' ')).toContain('version, date, jurisdiction');
  });

  it('keeps competencies, modules, projects, user needs, and support cases distinct', () => {
    const blueprint = loadBlueprint();
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
    expect(
      blueprint.projects.every(
        (project) =>
          project.competencyIds.length >= 5 &&
          project.constraints.length >= 3 &&
          project.rubricDimensions.length >= 3
      )
    ).toBe(true);
  });

  it('provides varied build-to-learn practice through a safe support incident simulator', () => {
    const graph = loadCurriculumGraph(courseId);
    const firstSource = graph.activities[0]?.starterFiles?.config ?? '';
    const activityKinds = new Set(graph.activities.map((activity) => activity.kind));
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps.filter((step) => step.interaction === 'code')
    );
    const allSteps = graph.activities.flatMap((activity) => activity.steps);

    expect(firstSource).toContain('workspace: support');
    expect(firstSource).toContain('never execute learner');
    expect(formatConfigLabReport(firstSource)).toContain('SUPPORT INCIDENT REVIEW: 1/15');
    expect(formatConfigLabReport(firstSource)).toContain('never executes learner commands');
    expect(activityKinds).toEqual(
      new Set(['theory', 'workshop', 'debug', 'lab', 'review', 'quiz', 'project', 'exam'])
    );
    expect(codeSteps.length).toBeGreaterThan(300);
    expect(codeSteps.every((step) => step.targetFile === 'config')).toBe(true);
    expect(
      codeSteps.every(
        (step) =>
          step.instruction.includes('fictional support incident block') &&
          step.instruction.includes('repair and rollback')
      )
    ).toBe(true);
    for (const activity of graph.activities) {
      for (const step of activity.steps.filter((entry) => entry.interaction === 'code')) {
        const structureCheck = activity.checks.find(
          (check) => step.checkIds.includes(check.id) && check.type === 'source-matches'
        );
        expect(structureCheck?.hidden).toBe(true);
        if (structureCheck?.type === 'source-matches') {
          expect(structureCheck.pattern).toContain('user-impact');
          expect(structureCheck.pattern).toContain('repair-rollback');
          expect(structureCheck.pattern).toContain('escalation');
        }
      }
    }
    expect(allSteps.every((step) => !step.why.includes('executable Go behavior'))).toBe(true);
    expect(allSteps.every((step) => !step.why.includes('evidence evidence'))).toBe(true);
    expect(
      allSteps.every(
        (step) =>
          !step.instruction.includes('request or response model') &&
          !step.instruction.includes('live-network transfer') &&
          !step.instruction.includes('method semantics, target authority')
      )
    ).toBe(true);
    expect(
      codeSteps.every((step) => step.why.includes('user-impact') && step.why.includes('rollback'))
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

  it('keeps physical, credential, malware, media, device, network, and production work outside browser execution', () => {
    const graph = loadCurriculumGraph(courseId);
    const blueprint = loadBlueprint();
    const serialized = JSON.stringify(graph);
    const starterSources = graph.activities.map((activity) => activity.starterFiles?.config ?? '');
    const boundaries = `${blueprint.audience.deviceConstraints.join(' ')} ${blueprint.scope.excludes.join(' ')} ${blueprint.sharedRequirements.join(' ')}`;

    expect(serialized).toContain('authorized disposable equipment or simulator only');
    expect(serialized).toContain('commands, inspect the host, touch devices or accounts');
    expect(boundaries).toContain('never execute learner commands');
    expect(boundaries).toContain('Real electrical or high-voltage repair');
    expect(boundaries).toContain('destructive media action');
    expect(starterSources.every((source) => source.includes('workspace: support'))).toBe(true);
    expect(
      starterSources.every(
        (source) =>
          source.includes('never execute learner') &&
          source.includes('authorized disposable equipment or simulator only')
      )
    ).toBe(true);
  });

  it('keeps same-kind support activities below the near-duplicate ceiling', () => {
    const graph = loadCurriculumGraph(courseId);
    const comparable = graph.activities.map((activity) => ({
      id: activity.id,
      kind: activity.kind,
      terms: contentTerms(
        `${activity.title} ${activity.summary} ${activity.steps
          .map((step) => `${step.title} ${step.instruction}`)
          .join(' ')}`
      ),
    }));
    let closest = { score: 0, left: '', right: '' };
    for (const [index, left] of comparable.entries()) {
      for (const right of comparable.slice(index + 1)) {
        if (left.kind !== right.kind) continue;
        const score = jaccard(left.terms, right.terms);
        if (score > closest.score) closest = { score, left: left.id, right: right.id };
      }
    }
    expect(
      closest.score,
      `near-duplicate A+ activities ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);
  });
});
