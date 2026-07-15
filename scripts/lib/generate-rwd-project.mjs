import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export async function generateRwdProject(config) {
  if (config.milestones.length < 16) {
    throw new Error(`${config.activityId} requires at least 16 explicit project milestones`);
  }
  if (new Set(config.coverage).size !== config.coverage.length) {
    throw new Error(`${config.activityId} has duplicate competency coverage`);
  }

  const steps = [];
  const checks = [];
  const codeCheckIds = [];
  const supportPattern = config.supportPattern ?? [
    'inspect',
    'predict',
    'arrange',
    'debug',
    'answer',
    'reflect',
    'read',
  ];

  function base(milestone, interaction) {
    const number = steps.length + 1;
    return {
      id: `${config.activityId}-step-${String(number).padStart(2, '0')}`,
      title: `${milestone.phase} ${number} · ${milestone.title}`.slice(0, 100),
      interaction,
      instruction: `${config.shortTitle} checkpoint ${number}: ${milestone.instruction} Preserve all earlier project evidence.`,
      why: `${milestone.title} ${interaction} checkpoint ${number} retrieves ${milestone.competencyId.replaceAll('-', ' ')} in ${config.context}.`,
      buildsOnStepIds:
        number === 1 ? [] : number > 3 ? [steps.at(-1).id, steps[0].id] : [steps.at(-1).id],
      content: [],
      checkIds: [],
      competencyIds: [milestone.competencyId],
      hints: [
        `${config.shortTitle} ${milestone.phase} checkpoint ${number}: restate the user task and content relationship.`,
        `${config.shortTitle} ${milestone.phase} checkpoint ${number}: inspect source, behavior, layout, and changed-state evidence.`,
        `${config.shortTitle} ${milestone.phase} checkpoint ${number}: make one bounded change and rerun accumulated project checks.`,
      ],
      xp: interaction === 'code' || interaction === 'debug' ? 18 : 12,
    };
  }

  function addCode(milestone, milestoneIndex) {
    const step = base(milestone, 'code');
    for (const [name, expected, file, checkType = 'source-includes'] of milestone.requirements) {
      const checkId = `${config.activityId}-check-${String(checks.length + 1).padStart(2, '0')}-${name}`;
      codeCheckIds.push(checkId);
      checks.push({
        id: checkId,
        type: checkType,
        description: `${milestone.title} includes the ${name.replaceAll('-', ' ')} requirement.`,
        failureMessage: `Restore the ${name.replaceAll('-', ' ')} requirement without deleting earlier ${config.shortTitle} work.`,
        hidden: false,
        competencyIds: [milestone.competencyId],
        file,
        ...(checkType === 'source-matches' ? { pattern: expected, flags: 'i' } : { expected }),
      });
    }
    step.checkIds = [...codeCheckIds];
    step.targetFile = milestone.targetFile ?? milestone.requirements[0][2];
    step.content = [
      {
        type: 'callout',
        tone: 'note',
        title: `${milestone.phase} build ${milestoneIndex + 1}`,
        text: `${milestone.instruction} Verify normal, narrow, long-content, keyboard, and preference states as relevant.`,
      },
    ];
    steps.push(step);
  }

  function addSupport(milestone, milestoneIndex) {
    const interaction = supportPattern[milestoneIndex % supportPattern.length];
    const step = base(milestone, interaction);
    if (interaction === 'arrange') {
      const checkId = `${config.activityId}-check-${String(checks.length + 1).padStart(2, '0')}-order`;
      const sequence = milestone.sequence ?? [
        'State the user task and content relationship',
        'Implement the smallest semantic or layout contract',
        'Exercise changed content input and viewport states',
        'Record evidence and preserve earlier requirements',
      ];
      step.options = sequence.map((text, optionIndex) => ({
        id: `${step.id}-event-${optionIndex + 1}`,
        text: `${config.shortTitle} ${milestoneIndex + 1}.${optionIndex + 1}: ${text}`,
      }));
      step.checkIds = [checkId];
      step.content = [
        {
          type: 'paragraph',
          text: `Order the ${milestone.title.toLowerCase()} work by evidence dependency.`,
        },
      ];
      checks.push({
        id: checkId,
        type: 'order-equals',
        description: `${milestone.title} follows a testable implementation sequence.`,
        failureMessage: 'Find the first phase whose required evidence does not exist yet.',
        hidden: false,
        competencyIds: [milestone.competencyId],
        expectedOptionIds: step.options.map((option) => option.id),
      });
    } else if (interaction === 'reflect') {
      const checkId = `${config.activityId}-check-${String(checks.length + 1).padStart(2, '0')}-reflection`;
      step.checkIds = [checkId];
      step.content = [
        {
          type: 'callout',
          tone: 'question',
          title: `${milestone.phase} decision defense`,
          text: `Connect ${milestone.title.toLowerCase()} to implementation evidence, user impact, a failure state, and a retest.`,
        },
      ];
      checks.push({
        id: checkId,
        type: 'text-response',
        description: `${milestone.title} is defended with implementation and user evidence.`,
        failureMessage:
          'Explain the decision, consequence, failed state, and retest with the required terms.',
        hidden: false,
        competencyIds: [milestone.competencyId],
        minimumCharacters: 110,
        requiredTerms: milestone.terms,
      });
    } else {
      const checkId = `${config.activityId}-check-${String(checks.length + 1).padStart(2, '0')}-choice`;
      const prefix = `${config.shortTitle} case ${milestoneIndex + 1} step ${steps.length + 1}`;
      step.options = [
        { id: `${step.id}-option-a`, text: `${prefix}: ${milestone.misconception}` },
        { id: `${step.id}-option-b`, text: `${prefix}: ${milestone.correct}` },
        {
          id: `${step.id}-option-c`,
          text: `${prefix}: replace the complete project before isolating this relationship.`,
        },
      ];
      step.checkIds = [checkId];
      step.content =
        interaction === 'read'
          ? [
              {
                type: 'paragraph',
                text: `${milestone.correct} Apply this contract to the changed ${config.shortTitle} case.`,
              },
            ]
          : [
              {
                type: 'callout',
                tone: interaction === 'debug' ? 'warning' : 'question',
                title: `${milestone.phase} evidence`,
                text: 'Choose the conclusion supported across source, behavior, layout, preference, and changed-content evidence.',
              },
            ];
      if (interaction === 'inspect' || interaction === 'debug') {
        step.stimulus = {
          kind: interaction === 'debug' ? 'code-diff' : 'browser',
          title: `${milestone.title} trace`,
          caption: `Conflicting ${config.shortTitle} evidence from milestone ${milestoneIndex + 1}.`,
          lines: [
            {
              id: `${step.id}-risk`,
              label: 'observed risk',
              text: milestone.misconception,
              tone: 'problem',
            },
            {
              id: `${step.id}-contract`,
              label: 'durable contract',
              text: milestone.correct,
              tone: 'focus',
            },
          ],
        };
      }
      checks.push({
        id: checkId,
        type: 'choice-equals',
        description: `${milestone.title} preserves the user task and project contract.`,
        failureMessage: 'Recheck source, behavior, changed content, and input-mode evidence.',
        hidden: false,
        competencyIds: [milestone.competencyId],
        expectedOptionId: `${step.id}-option-b`,
      });
    }
    steps.push(step);
  }

  config.milestones.forEach((milestone, index) => {
    const codeFirst = config.codeFirstOn?.includes(index) ?? index % 2 === 1;
    if (codeFirst) {
      addCode(milestone, index);
      addSupport(milestone, index);
    } else {
      addSupport(milestone, index);
      addCode(milestone, index);
    }
  });

  const activity = {
    schemaVersion: 2,
    id: config.activityId,
    courseId: config.courseId,
    moduleId: config.moduleId,
    kind: 'project',
    title: config.activityTitle,
    summary: config.summary,
    objectives: config.activityObjectives,
    competencyCoverage: {
      introduces: [],
      reinforces: config.coverage,
      assesses: config.coverage,
    },
    prerequisites: [config.priorLastActivityId],
    difficulty: 'mastery',
    estimatedMinutes: Math.min(600, config.estimatedMinutes ?? config.milestones.length * 20),
    artifactId: config.artifactId,
    starterFiles: config.starterFiles,
    steps,
    checks,
    mastery: {
      passingPercent: 90,
      maxHintsForMastery: 3,
      spacedReviewDays: [2, 14, 45, 90],
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
    competencyIds: config.coverage,
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

  return { interactions: steps.length, checks: checks.length };
}
