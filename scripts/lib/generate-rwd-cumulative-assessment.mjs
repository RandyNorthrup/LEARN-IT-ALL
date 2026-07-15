import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const basePattern = ['predict', 'inspect', 'answer', 'arrange', 'debug', 'code', 'read', 'reflect'];

export async function generateRwdCumulativeAssessment(config) {
  if (config.cases.length < 8) throw new Error(`${config.activityId} requires at least 8 cases`);
  const caseTitles = config.cases.map((entry) => entry.title);
  if (new Set(caseTitles).size !== caseTitles.length) {
    throw new Error(`${config.activityId} requires unique case titles`);
  }
  const steps = [];
  const checks = [];
  const cumulativeCodeCheckIds = [];

  function base(model, interaction, caseIndex) {
    const number = steps.length + 1;
    return {
      id: `${config.activityId}-step-${String(number).padStart(3, '0')}`,
      title: `${config.shortTitle} ${number} · ${model.title} · ${interaction}`.slice(0, 100),
      interaction,
      instruction: `${config.shortTitle} checkpoint ${number}: resolve ${model.context} and preserve all earlier passing evidence.`,
      why: `${model.title} checkpoint ${number} retrieves ${model.competencyId.replaceAll('-', ' ')} in changed case ${caseIndex + 1}.`,
      buildsOnStepIds:
        number === 1 ? [] : number > 3 ? [steps.at(-1).id, steps[0].id] : [steps.at(-1).id],
      content: [],
      checkIds: [],
      competencyIds: [model.competencyId],
      hints: [
        `${config.shortTitle} checkpoint ${number}: restate the task, relationship, and failure condition.`,
        `${config.shortTitle} checkpoint ${number}: inspect source, cascade, computed behavior, layout, and user evidence as relevant.`,
        `${config.shortTitle} checkpoint ${number}: make one bounded repair and rerun failed plus retained cases.`,
      ],
      xp: interaction === 'code' || interaction === 'debug' ? 20 : 14,
    };
  }

  config.cases.forEach((model, caseIndex) => {
    const rotation = caseIndex % basePattern.length;
    const pattern = [...basePattern.slice(rotation), ...basePattern.slice(0, rotation)];
    for (const interaction of pattern) {
      const step = base(model, interaction, caseIndex);
      if (interaction === 'code') {
        for (const [
          name,
          expected,
          file = 'css',
          checkType = 'source-includes',
        ] of model.requirements) {
          const checkId = `${config.activityId}-check-${String(checks.length + 1).padStart(3, '0')}-${name}`;
          cumulativeCodeCheckIds.push(checkId);
          checks.push({
            id: checkId,
            type: checkType,
            description: `${model.title} restores the ${name.replaceAll('-', ' ')} requirement.`,
            failureMessage: `Restore ${name.replaceAll('-', ' ')} without deleting earlier ${config.shortTitle} repairs.`,
            hidden: false,
            competencyIds: [model.competencyId],
            file,
            ...(checkType === 'source-matches' ? { pattern: expected, flags: 'i' } : { expected }),
          });
        }
        step.checkIds = [...cumulativeCodeCheckIds];
        step.targetFile = model.requirements[0][2] ?? 'css';
        step.content = [
          {
            type: 'callout',
            tone: 'note',
            title: `${model.title} bounded repair`,
            text: `Apply this case repair to ${config.artifactName} and rerun every accumulated assessment check.`,
          },
        ];
      } else if (interaction === 'arrange') {
        const checkId = `${config.activityId}-check-${String(checks.length + 1).padStart(3, '0')}-order`;
        step.options = model.sequence.map((text, optionIndex) => ({
          id: `${step.id}-event-${optionIndex + 1}`,
          text: `${config.shortTitle} case ${caseIndex + 1} phase ${optionIndex + 1}: ${text}`,
        }));
        step.checkIds = [checkId];
        step.content = [
          {
            type: 'paragraph',
            text: `Order the ${model.title.toLowerCase()} response by evidence dependency.`,
          },
        ];
        checks.push({
          id: checkId,
          type: 'order-equals',
          description: `${model.title} follows a reproducible evidence sequence.`,
          failureMessage:
            'Find the first phase whose evidence or prerequisite decision does not exist yet.',
          hidden: false,
          competencyIds: [model.competencyId],
          expectedOptionIds: step.options.map((option) => option.id),
        });
      } else if (interaction === 'reflect') {
        const checkId = `${config.activityId}-check-${String(checks.length + 1).padStart(3, '0')}-reflection`;
        step.checkIds = [checkId];
        step.content = [
          {
            type: 'callout',
            tone: 'question',
            title: `${model.title} decision defense`,
            text: `Defend ${model.competencyId.replaceAll('-', ' ')} in ${model.context}: connect the repair to implementation evidence, user impact, a failed state, and a named regression retest.`,
          },
        ];
        checks.push({
          id: checkId,
          type: 'text-response',
          description: `${model.title} is defended with technical and user evidence.`,
          failureMessage:
            'Use every required term and connect cause, consequence, repair, and retest.',
          hidden: false,
          competencyIds: [model.competencyId],
          minimumCharacters: config.kind === 'exam' ? 140 : 120,
          requiredTerms: model.terms,
        });
      } else {
        const checkId = `${config.activityId}-check-${String(checks.length + 1).padStart(3, '0')}-choice`;
        const prefix = `${config.shortTitle} case ${caseIndex + 1} checkpoint ${steps.length + 1}`;
        step.options = [
          { id: `${step.id}-option-a`, text: `${prefix}: ${model.misconception}` },
          { id: `${step.id}-option-b`, text: `${prefix}: ${model.correct}` },
          {
            id: `${step.id}-option-c`,
            text: `${prefix}: replace the complete artifact before isolating the failed relationship.`,
          },
        ];
        step.checkIds = [checkId];
        step.content =
          interaction === 'read'
            ? [{ type: 'paragraph', text: `${model.correct} Apply it to ${model.context}.` }]
            : [
                {
                  type: 'callout',
                  tone: interaction === 'debug' ? 'warning' : 'question',
                  title: `${model.title} evidence`,
                  text: `For ${model.title}, choose the ${model.competencyId.replaceAll('-', ' ')} conclusion supported by source, behavior, changed-state, and user-task evidence from ${model.context}.`,
                },
              ];
        if (interaction === 'inspect' || interaction === 'debug') {
          step.stimulus = {
            kind: interaction === 'debug' ? 'code-diff' : 'browser',
            title: `${model.title} trace`,
            caption: `Conflicting evidence from ${config.shortTitle} case ${caseIndex + 1}.`,
            lines: [
              {
                id: `${step.id}-risk`,
                label: 'observed risk',
                text: model.misconception,
                tone: 'problem',
              },
              {
                id: `${step.id}-contract`,
                label: 'durable contract',
                text: model.correct,
                tone: 'focus',
              },
            ],
          };
        }
        checks.push({
          id: checkId,
          type: 'choice-equals',
          description: `${model.title} conclusion survives the changed case.`,
          failureMessage:
            'Recheck task, source, computed behavior, failure state, and regression evidence.',
          hidden: false,
          competencyIds: [model.competencyId],
          expectedOptionId: `${step.id}-option-b`,
        });
      }
      steps.push(step);
    }
  });

  const coverage = [...new Set(config.cases.map((entry) => entry.competencyId))];
  const activity = {
    schemaVersion: 2,
    id: config.activityId,
    courseId: config.courseId,
    moduleId: config.moduleId,
    kind: config.kind,
    title: config.activityTitle,
    summary: config.summary,
    objectives: config.activityObjectives,
    competencyCoverage: { introduces: [], reinforces: coverage, assesses: coverage },
    prerequisites: [config.priorLastActivityId],
    difficulty: 'mastery',
    estimatedMinutes: Math.min(600, config.estimatedMinutes),
    artifactId: config.artifactId,
    starterFiles: config.starterFiles,
    steps,
    checks,
    mastery: {
      passingPercent: config.kind === 'exam' ? 90 : 88,
      maxHintsForMastery: config.kind === 'exam' ? 0 : 2,
      spacedReviewDays: [3, 14, 45, 90],
    },
  };
  const module = {
    schemaVersion: 2,
    id: config.moduleId,
    courseId: config.courseId,
    title: config.moduleTitle,
    description: config.moduleDescription,
    order: config.order,
    objectives: config.moduleObjectives,
    competencyIds: coverage,
    prerequisites: [config.prerequisiteModuleId],
    activityIds: [config.activityId],
  };

  const outputRoot = path.join(process.cwd(), 'content', 'v2', 'courses', config.courseId);
  const coursePath = path.join(outputRoot, 'course.json');
  const course = JSON.parse(await readFile(coursePath, 'utf8'));
  const boundary = course.moduleIds.indexOf(config.insertAfterModuleId);
  if (boundary < 0) throw new Error(`${config.insertAfterModuleId} insertion boundary is missing`);
  course.moduleIds = course.moduleIds.filter((id) => id !== config.moduleId);
  course.moduleIds.splice(boundary + 1, 0, config.moduleId);
  course.estimatedHours = Math.max(
    course.estimatedHours,
    Math.round((config.courseEstimatedHours / 60) * 10) / 10
  );
  if (config.kind === 'exam') course.credential.finalExamId = config.activityId;

  await mkdir(path.join(outputRoot, 'activities'), { recursive: true });
  await mkdir(path.join(outputRoot, 'modules'), { recursive: true });
  await writeFile(coursePath, `${JSON.stringify(course, null, 2)}\n`);
  await writeFile(
    path.join(outputRoot, 'modules', `${config.moduleId}.json`),
    `${JSON.stringify(module, null, 2)}\n`
  );
  await writeFile(
    path.join(outputRoot, 'activities', `${config.activityId}.json`),
    `${JSON.stringify(activity, null, 2)}\n`
  );
  return { interactions: steps.length, checks: checks.length, competencies: coverage.length };
}
