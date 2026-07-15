import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

function competencyFromTuple(tuple, prerequisiteId) {
  const [id, statement, misconception, knowledgeType = 'procedural', level = 'apply'] = tuple;
  return {
    id,
    statement,
    knowledgeType,
    level,
    prerequisiteIds: prerequisiteId ? [prerequisiteId] : [],
    misconceptions: [misconception],
    masteryEvidence: [
      `A changed authentic task independently demonstrates this outcome: ${statement}`,
    ],
  };
}

function learnerCompetencyLabel(id, internalPrefix = '') {
  const visibleId =
    internalPrefix && id.startsWith(internalPrefix) ? id.slice(internalPrefix.length) : id;
  return visibleId.replaceAll('-', ' ');
}

function activity({
  id,
  title,
  kind,
  context,
  coverage,
  buildsOn,
  newCompetencies = [],
  supportLevel,
  artifact,
  estimatedMinutes,
}) {
  return {
    id,
    title,
    kind,
    authenticContext: context,
    coverage,
    learningDesign: {
      buildsOnCompetencyIds: buildsOn,
      newCompetencyIds: newCompetencies,
      retainedPractice:
        buildsOn.length > 0
          ? `Retrieve and correctly reuse ${buildsOn.join(', ')} before adding or assessing the changed requirement.`
          : 'Establish the first observable course foundation and preserve it through every later task.',
      learnerArtifact: artifact,
      supportLevel,
    },
    estimatedMinutes,
  };
}

export async function generateCourseBlueprint(config) {
  const competencies = [];
  const modules = [];
  const introducedIds = [];
  const projectByModuleId = new Map(
    config.projects.map((project) => [project.afterModuleId, project])
  );
  let previousModuleId;
  let previousCompetencyId;

  for (const [moduleIndex, definition] of config.modules.entries()) {
    const moduleCompetencyIds = [];
    const activities = [];
    for (const [skillIndex, tuple] of definition.skills.entries()) {
      const competency = competencyFromTuple(tuple, previousCompetencyId);
      competencies.push(competency);
      moduleCompetencyIds.push(competency.id);
      const buildsOn = previousCompetencyId ? [previousCompetencyId] : [];
      activities.push(
        activity({
          id: `${definition.id}-${competency.id}-concept`,
          title: `${definition.title}: ${competency.statement}`,
          kind: 'theory',
          context: definition.contexts?.theory ?? definition.context,
          coverage: [
            { competencyId: competency.id, stages: ['I'] },
            ...(previousCompetencyId
              ? [{ competencyId: previousCompetencyId, stages: ['R'] }]
              : []),
          ],
          buildsOn,
          newCompetencies: [competency.id],
          supportLevel: skillIndex < 2 ? 'modeled' : 'guided',
          artifact: `Add and verify the ${learnerCompetencyLabel(competency.id, config.competencyIdPrefix)} increment in ${definition.artifact}.`,
          estimatedMinutes: 28,
        })
      );
      introducedIds.push(competency.id);
      previousCompetencyId = competency.id;
    }

    const practiceCoverage = moduleCompetencyIds.map((competencyId) => ({
      competencyId,
      stages: ['G', 'F'],
    }));
    activities.push(
      activity({
        id: `${definition.id}-guided-workshop`,
        title: `${definition.title}: guided cumulative workshop`,
        kind: 'workshop',
        context: definition.contexts?.workshop ?? definition.context,
        coverage: practiceCoverage,
        buildsOn: moduleCompetencyIds,
        supportLevel: 'guided',
        artifact: `Build a complete first version of ${definition.artifact} while every earlier competency remains active.`,
        estimatedMinutes: 120,
      }),
      activity({
        id: `${definition.id}-debugging-clinic`,
        title: `${definition.title}: evidence-driven debugging clinic`,
        kind: 'debug',
        context:
          definition.contexts?.debug ??
          `${definition.context} Learners isolate plausible failures, compare competing hypotheses, and record cause-level repair evidence.`,
        coverage: moduleCompetencyIds.map((competencyId) => ({
          competencyId,
          stages: ['G', 'F'],
        })),
        buildsOn: moduleCompetencyIds,
        supportLevel: 'faded',
        artifact: `Repair a changed failure in ${definition.artifact} and publish the reproduction, evidence, repair, and regression record.`,
        estimatedMinutes: 90,
      }),
      activity({
        id: `${definition.id}-independent-lab`,
        title: `${definition.title}: independent transfer lab`,
        kind: 'lab',
        context:
          definition.contexts?.lab ??
          `${definition.context} The scenario, data, constraints, and failure modes differ from the workshop.`,
        coverage: moduleCompetencyIds.map((competencyId) => ({
          competencyId,
          stages: ['A', 'T'],
        })),
        buildsOn: moduleCompetencyIds,
        supportLevel: 'independent',
        artifact: `Produce an independent changed-context version of ${definition.artifact} with automated and judgment evidence.`,
        estimatedMinutes: 150,
      }),
      activity({
        id: `${definition.id}-retrieval-review`,
        title: `${definition.title}: delayed retrieval and integration review`,
        kind: 'review',
        context:
          definition.contexts?.review ??
          `${definition.context} Learners retrieve rules and procedures before seeing feedback.`,
        coverage: moduleCompetencyIds.map((competencyId) => ({
          competencyId,
          stages: ['R'],
        })),
        buildsOn: moduleCompetencyIds,
        supportLevel: 'faded',
        artifact: `Extend the evidence record for ${definition.artifact} after a delayed changed case.`,
        estimatedMinutes: 70,
      }),
      activity({
        id: `${definition.id}-mastery-quiz`,
        title: `${definition.title}: scenario mastery assessment`,
        kind: 'quiz',
        context:
          definition.contexts?.quiz ??
          `${definition.context} Every item uses a fresh case and misconception-specific distractors.`,
        coverage: moduleCompetencyIds.map((competencyId) => ({
          competencyId,
          stages: ['A'],
        })),
        buildsOn: moduleCompetencyIds,
        supportLevel: 'independent',
        artifact: `Record independent decisions and explanations for ${definition.artifact}.`,
        estimatedMinutes: 60,
      })
    );

    const plannedProject = projectByModuleId.get(definition.id);
    if (plannedProject) {
      activities.push(
        activity({
          id: `${plannedProject.id}-project-build`,
          title: `Cumulative project: ${plannedProject.title}`,
          kind: 'project',
          context: `${plannedProject.stakeholder}. ${plannedProject.userNeed}`,
          coverage: plannedProject.competencyIds.map((competencyId) => ({
            competencyId,
            stages: ['R', 'A', 'T'],
          })),
          buildsOn: plannedProject.competencyIds,
          supportLevel: 'independent',
          artifact: `Deliver ${plannedProject.title} with acceptance evidence, rubric defense, reflection, and a changed-constraint extension.`,
          estimatedMinutes: 420,
        })
      );
    }

    if (moduleIndex === config.modules.length - 1) {
      activities.push(
        activity({
          id: `${config.id}-certification-exam`,
          title: `${config.title}: cumulative certification examination`,
          kind: 'exam',
          context: config.examContext,
          coverage: config.finalExamCompetencyIds.map((competencyId) => ({
            competencyId,
            stages: ['R', 'A', 'T'],
          })),
          buildsOn: config.finalExamCompetencyIds,
          supportLevel: 'independent',
          artifact:
            'Produce a cumulative evidence packet across unfamiliar cases, performance tasks, explanations, and root-cause repairs.',
          estimatedMinutes: 600,
        })
      );
    }

    modules.push({
      id: definition.id,
      title: definition.title,
      order: moduleIndex + 1,
      prerequisiteModuleIds: previousModuleId ? [previousModuleId] : [],
      objectives: definition.objectives,
      activities,
    });
    previousModuleId = definition.id;
  }

  const blueprint = {
    schemaVersion: 1,
    id: config.id,
    title: config.title,
    version: config.version,
    status: 'approved',
    researchedAt: config.researchedAt,
    audience: config.audience,
    pathways: config.pathways ?? {
      prerequisiteCourseIds: [],
      placementEvidence: config.audience.entryKnowledge.map(
        (entry) =>
          `A placement review or prior artifact must demonstrate this entry skill: ${entry}`
      ),
      completionEvidence: [
        `Complete and defend all ${config.projects.length} stakeholder projects against their acceptance constraints and rubrics.`,
        `Pass the cumulative performance examination at or above ${config.masteryThresholdPercent} percent with changed-case evidence.`,
      ],
    },
    scope: config.scope,
    sources: config.sources,
    sharedRequirements: config.sharedRequirements ?? [],
    competencies,
    modules,
    projects: config.projects.map(({ afterModuleId: _afterModuleId, ...project }) => project),
    assessmentBlueprint: {
      masteryThresholdPercent: config.masteryThresholdPercent,
      formativeCorrectionPolicy:
        'Failed evidence routes to the named misconception, one bounded corrective activity, and a parallel changed-case retry before progression.',
      finalExamCompetencyIds: config.finalExamCompetencyIds,
      minimumQuestionBankSize: config.minimumQuestionBankSize,
      performanceAssessmentIds: config.projects.map((project) => project.id),
    },
    spiralPolicy: {
      immediateGuidedUse: true,
      sameModuleFadedUse: true,
      nextRelevantLessonUse: true,
      independentLabUse: true,
      delayedRetrievalUse: true,
      cumulativeProjectUse: true,
    },
  };

  await mkdir(path.join(process.cwd(), 'blueprints'), { recursive: true });
  await writeFile(
    path.join(process.cwd(), 'blueprints', `${config.id}.json`),
    `${JSON.stringify(blueprint, null, 2)}\n`
  );
  return {
    competencies: competencies.length,
    modules: modules.length,
    activities: modules.reduce((total, module) => total + module.activities.length, 0),
  };
}
