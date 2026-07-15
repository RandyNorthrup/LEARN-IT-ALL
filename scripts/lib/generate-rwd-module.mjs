import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const defaultPatterns = [
  ['predict', 'arrange', 'inspect', 'read', 'debug', 'answer', 'reflect', 'code'],
  ['predict', 'inspect', 'arrange', 'debug', 'read', 'answer', 'reflect', 'code'],
  ['inspect', 'predict', 'read', 'arrange', 'answer', 'debug', 'reflect', 'code'],
  ['predict', 'read', 'inspect', 'answer', 'arrange', 'debug', 'reflect', 'code'],
  ['inspect', 'arrange', 'predict', 'read', 'debug', 'answer', 'reflect', 'code'],
  ['predict', 'debug', 'inspect', 'arrange', 'read', 'answer', 'reflect', 'code'],
  ['arrange', 'predict', 'inspect', 'read', 'answer', 'debug', 'reflect', 'code'],
  ['predict', 'answer', 'inspect', 'arrange', 'debug', 'read', 'reflect', 'code'],
];

function stableHash(value) {
  let result = 2166136261;
  for (const character of value) {
    result ^= character.charCodeAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function builderFor(meta) {
  const steps = [];
  const checks = [];
  const codeCheckIds = [];
  const nextStepId = () => `${meta.id}-step-${String(steps.length + 1).padStart(2, '0')}`;
  const nextCheckId = (suffix) =>
    `${meta.id}-check-${String(checks.length + 1).padStart(2, '0')}-${suffix}`;
  const base = (title, interaction, instruction, competencyId) => ({
    id: nextStepId(),
    title: (() => {
      const suffix = ` · ${meta.kind}`;
      const numberedTitle = `${String(steps.length + 1).padStart(2, '0')} · ${title}`;
      return `${numberedTitle.slice(0, 100 - suffix.length).trimEnd()}${suffix}`;
    })(),
    interaction,
    instruction: `Checkpoint ${steps.length + 1}: ${instruction} Scenario: ${meta.context}.`,
    why: `${meta.title} makes the decision observable and testable. This is checkpoint ${steps.length + 1} in ${meta.context}.`,
    buildsOnStepIds:
      steps.length === 0
        ? []
        : steps.length > 2
          ? [steps.at(-1).id, steps[0].id]
          : [steps.at(-1).id],
    content: [],
    checkIds: [],
    competencyIds: [competencyId],
    hints: [
      `${meta.title} checkpoint ${steps.length + 1}: identify the user task and data relationship first.`,
      `${meta.title} checkpoint ${steps.length + 1}: compare source, native behavior, and announced meaning.`,
      `${meta.title} checkpoint ${steps.length + 1}: make the smallest repair that preserves earlier passing work.`,
    ],
    xp: interaction === 'code' || interaction === 'debug' ? 14 : 10,
  });

  return {
    steps,
    checks,
    choice({ title, interaction, prompt, correct, distractors, competencyId, stimulus }) {
      const step = base(title, interaction, prompt, competencyId);
      const checkId = nextCheckId('choice');
      const prefix = `${meta.context.charAt(0).toUpperCase()}${meta.context.slice(1)} case ${steps.length + 1}`;
      const optionText = (text) => `${prefix}: ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
      step.options = [
        { id: `${step.id}-option-a`, text: optionText(distractors[0]) },
        { id: `${step.id}-option-b`, text: optionText(correct) },
        { id: `${step.id}-option-c`, text: optionText(distractors[1]) },
      ];
      step.checkIds = [checkId];
      step.content = [
        interaction === 'read'
          ? { type: 'paragraph', text: `${meta.explanation} Apply it to ${meta.context}.` }
          : {
              type: 'callout',
              tone: interaction === 'predict' ? 'question' : 'note',
              title: `${meta.context} evidence`,
              text: `For ${meta.title}, choose the ${competencyId.replaceAll('-', ' ')} claim that preserves the ${meta.context} purpose, native behavior, and understandable relationships when presentation changes.`,
            },
      ];
      if (stimulus) step.stimulus = stimulus;
      checks.push({
        id: checkId,
        type: 'choice-equals',
        description: `${title} follows the named user and data relationship.`,
        failureMessage: `Recheck purpose, native behavior, and available evidence for ${title}.`,
        hidden: false,
        competencyIds: [competencyId],
        expectedOptionId: `${step.id}-option-b`,
      });
      steps.push(step);
    },
    order({ title, prompt, options, competencyId }) {
      const step = base(title, 'arrange', prompt, competencyId);
      const checkId = nextCheckId('order');
      step.options = options.map((text, index) => ({
        id: `${step.id}-event-${index + 1}`,
        text: `${meta.context} phase ${steps.length + 1}.${index + 1}: ${text.charAt(0).toLowerCase()}${text.slice(1)}`,
      }));
      step.checkIds = [checkId];
      step.content = [
        {
          type: 'paragraph',
          text: `Order the ${meta.context} work by dependency and verify that each phase creates evidence needed by the next.`,
        },
      ];
      checks.push({
        id: checkId,
        type: 'order-equals',
        description: `${title} preserves the required evidence order.`,
        failureMessage: `Find the first ${meta.context} event whose required input does not yet exist.`,
        hidden: false,
        competencyIds: [competencyId],
        expectedOptionIds: step.options.map((option) => option.id),
      });
      steps.push(step);
    },
    reflect({ title, prompt, competencyId, terms }) {
      const step = base(title, 'reflect', prompt, competencyId);
      const checkId = nextCheckId('reflection');
      step.checkIds = [checkId];
      step.content = [
        {
          type: 'callout',
          tone: 'question',
          title: `${meta.context} case note`,
          text: `Defend ${competencyId.replaceAll('-', ' ')} in ${meta.context}: connect this user task to source evidence, native behavior, failure behavior, and the final retest.`,
        },
      ];
      checks.push({
        id: checkId,
        type: 'text-response',
        description: `${title} explains the decision with relevant evidence.`,
        failureMessage:
          'Use the required terms and connect at least one implementation fact to a user consequence.',
        hidden: false,
        competencyIds: [competencyId],
        minimumCharacters: 90,
        requiredTerms: terms,
      });
      steps.push(step);
    },
    code({ title, prompt, competencyId, requirements }) {
      const step = base(title, 'code', prompt, competencyId);
      for (const [
        name,
        expected,
        checkType = 'source-includes',
        file = meta.targetFile ?? 'html',
      ] of requirements) {
        const checkId = nextCheckId(name);
        codeCheckIds.push(checkId);
        checks.push({
          id: checkId,
          type: checkType,
          description: `${title} preserves the ${name.replaceAll('-', ' ')} requirement.`,
          failureMessage: `Restore the ${name.replaceAll('-', ' ')} requirement without deleting earlier valid work.`,
          hidden: false,
          competencyIds: [competencyId],
          file,
          ...(checkType === 'source-matches' ? { pattern: expected, flags: 'i' } : { expected }),
        });
      }
      step.checkIds = [...codeCheckIds];
      step.targetFile = meta.targetFile ?? 'html';
      step.content = [
        {
          type: 'callout',
          tone: 'note',
          title: `Build increment ${steps.length + 1}`,
          text: `Edit the current ${meta.context} artifact, preserve earlier checks, and verify success plus failure behavior.`,
        },
      ];
      steps.push(step);
    },
  };
}

function finalize(meta, builder, courseId, moduleId) {
  return {
    schemaVersion: 2,
    id: meta.id,
    courseId,
    moduleId,
    kind: meta.kind,
    title: meta.title,
    summary: meta.summary,
    objectives: meta.objectives,
    competencyCoverage: meta.coverage,
    prerequisites: [],
    difficulty: meta.difficulty,
    estimatedMinutes: meta.estimatedMinutes,
    ...(meta.artifactId ? { artifactId: meta.artifactId, starterFiles: meta.starterFiles } : {}),
    steps: builder.steps,
    checks: builder.checks,
    mastery: {
      passingPercent: meta.kind === 'quiz' || meta.kind === 'review' ? 85 : 80,
      maxHintsForMastery: meta.kind === 'quiz' ? 0 : 5,
      spacedReviewDays: [1, 7, 21, 60],
    },
  };
}

function conceptActivity(config, model, earlierIds, pattern) {
  const meta = {
    id: model.activityId,
    kind: 'theory',
    title: model.title,
    context: model.context,
    explanation: model.concept,
    summary: `Build and verify ${model.id.replaceAll('-', ' ')} in ${model.context} through prediction, inspection, explanation, cumulative code, and changed-case transfer.`,
    objectives: [
      `Explain ${model.id.replaceAll('-', ' ')} from purpose, behavior, and evidence.`,
      `Apply ${model.id.replaceAll('-', ' ')} without discarding earlier valid work.`,
      `Diagnose the named misconception in changed content, input, and failure states.`,
    ],
    coverage: {
      introduces: [model.id],
      reinforces: [...config.retainedCompetencyIds, ...earlierIds],
      assesses: [model.id],
    },
    difficulty: earlierIds.length < 2 ? 'practice' : 'challenge',
    estimatedMinutes: model.estimatedMinutes ?? 60,
    artifactId: config.cumulativeArtifactId,
    starterFiles: config.starterFiles,
    targetFile: config.targetFile,
  };
  const builder = builderFor(meta);
  for (const interaction of pattern) {
    if (interaction === 'code') {
      builder.code({
        title: `Build the ${model.context} layer`,
        prompt:
          model.codePrompt ?? `Add ${model.id.replaceAll('-', ' ')} to the cumulative artifact.`,
        competencyId: model.id,
        requirements: model.requirements,
      });
    } else if (interaction === 'arrange') {
      builder.order({
        title: `Sequence the ${model.context} workflow`,
        prompt: `Arrange the ${model.id.replaceAll('-', ' ')} work from intent through verification.`,
        options: model.sequence,
        competencyId: model.id,
      });
    } else if (interaction === 'reflect') {
      builder.reflect({
        title: `Defend the ${model.context} decision`,
        prompt: `Explain why “${model.misconception}” fails and how the repair should be verified.`,
        competencyId: model.id,
        terms: model.terms,
      });
    } else {
      builder.choice({
        title: `${interaction.charAt(0).toUpperCase()}${interaction.slice(1)} the ${model.context} case`,
        interaction,
        prompt: `Which claim preserves ${model.id.replaceAll('-', ' ')} when data, input, and layout change?`,
        correct:
          interaction === 'debug'
            ? `A plausible success state is incomplete evidence. ${model.correct}`
            : model.correct,
        distractors:
          interaction === 'debug'
            ? [
                `Keep the ${model.context} defect because the happy path worked once.`,
                `Replace the complete artifact before isolating the failed relationship.`,
              ]
            : [model.misconception, model.distractors[interaction === 'answer' ? 1 : 0]],
        competencyId: model.id,
        ...(interaction === 'inspect'
          ? {
              stimulus: {
                kind: model.stimulusKind ?? 'browser',
                title: `${model.title} · evidence trace`,
                caption: `Source, behavior, and failure evidence collected during ${model.context}.`,
                lines: [
                  {
                    id: `${model.activityId}-evidence-risk`,
                    label: 'observed risk',
                    text: model.misconception,
                    tone: 'problem',
                  },
                  {
                    id: `${model.activityId}-evidence-contract`,
                    label: 'required contract',
                    text: model.correct,
                    tone: 'focus',
                  },
                ],
              },
            }
          : {}),
      });
    }
  }
  return finalize(meta, builder, config.courseId, config.moduleId);
}

function mappedMeta(config, id, kind, targetSteps, plan, modelById) {
  return {
    id,
    kind,
    title: plan.title,
    context: plan.context,
    explanation: plan.focus
      .map((entry) => modelById.get(entry)?.concept)
      .filter(Boolean)
      .join(' '),
    summary: `${plan.title} retrieves prior skills in an original ${plan.context} scenario and requires implementation, behavior, failure-state, and transfer evidence.`,
    objectives: [
      `Apply ${plan.focus.map((entry) => entry.replaceAll('-', ' ')).join(', ')} in unfamiliar constraints.`,
      `Produce or audit a real ${plan.context} artifact without happy-path-only reasoning.`,
      'Preserve earlier requirements while testing keyboard, narrow-width, invalid, and assistive-semantic states.',
    ],
    coverage: { introduces: [], reinforces: [...plan.focus], assesses: [...plan.focus] },
    difficulty: kind === 'theory' ? 'practice' : kind === 'quiz' ? 'mastery' : 'challenge',
    estimatedMinutes: Math.min(600, Math.max(35, targetSteps * (kind === 'workshop' ? 7 : 5))),
    artifactId: plan.artifactId,
    starterFiles: config.starterFiles,
    targetFile: config.targetFile,
  };
}

function theoryActivity(config, meta, model, targetSteps) {
  const builder = builderFor(meta);
  builder.choice({
    title: `Predict the ${meta.context} failure`,
    interaction: 'predict',
    prompt: 'Which claim should be tested before implementation changes?',
    correct: model.correct,
    distractors: model.distractors,
    competencyId: model.id,
  });
  builder.order({
    title: `Sequence the ${meta.context} investigation`,
    prompt: 'Arrange the evidence workflow.',
    options: model.sequence,
    competencyId: model.id,
  });
  builder.choice({
    title: `Inspect the ${meta.context} behavior`,
    interaction: 'inspect',
    prompt: 'Which conclusion is supported by source and behavior evidence?',
    correct: model.correct,
    distractors: [model.misconception, model.distractors[1]],
    competencyId: model.id,
    stimulus: {
      kind: model.stimulusKind ?? 'browser',
      title: `${meta.title} · behavior trace`,
      caption: `A source and behavior trace from ${meta.context}.`,
      lines: [
        { id: `${meta.id}-trace-risk`, label: 'risk', text: model.misconception, tone: 'problem' },
        { id: `${meta.id}-trace-finding`, label: 'finding', text: model.correct, tone: 'focus' },
      ],
    },
  });
  builder.choice({
    title: `Read the ${meta.context} contract`,
    interaction: 'read',
    prompt: 'Which practice survives changed data and devices?',
    correct: model.correct,
    distractors: [model.distractors[1], model.misconception],
    competencyId: model.id,
  });
  builder.choice({
    title: `Debug the ${meta.context} misconception`,
    interaction: 'debug',
    prompt: 'Which repair reaches the failed contract?',
    correct: `The successful appearance is incomplete evidence. ${model.correct}`,
    distractors: [
      `Keep the ${meta.context} defect because one path worked.`,
      'Replace native behavior with a generic scripted box.',
    ],
    competencyId: model.id,
  });
  builder.reflect({
    title: `Defend the ${meta.context} decision`,
    prompt: 'Explain the task, implementation evidence, user consequence, and retest.',
    competencyId: model.id,
    terms: model.terms,
  });
  for (let index = builder.steps.length; index < targetSteps; index += 1) {
    if (index % 4 === 3) {
      builder.order({
        title: `Transfer sequence ${index + 1}: ${meta.context}`,
        prompt: 'Rebuild the investigation after changed data or input conditions.',
        options: model.sequence,
        competencyId: model.id,
      });
    } else {
      const interaction = index % 3 === 0 ? 'predict' : index % 3 === 1 ? 'inspect' : 'answer';
      builder.choice({
        title: `Transfer ${index + 1}: ${meta.context}`,
        interaction,
        prompt:
          'Which conclusion still holds after the scenario, input method, or failure state changes?',
        correct: model.correct,
        distractors: [model.misconception, model.distractors[index % model.distractors.length]],
        competencyId: model.id,
      });
    }
  }
  return finalize(meta, builder, config.courseId, config.moduleId);
}

function milestonesFor(plan, milestones) {
  const matches = milestones.filter((entry) => plan.focus.includes(entry[2]));
  if (matches.length === 0) throw new Error(`No milestones cover ${plan.title}`);
  return matches;
}

function milestonePicker(plan, milestones) {
  const eligible = milestonesFor(plan, milestones);
  const offsets = new Map();
  return (competencyId) => {
    const matches = eligible.filter((entry) => entry[2] === competencyId);
    if (matches.length === 0) throw new Error(`No ${competencyId} milestone covers ${plan.title}`);
    const offset = offsets.get(competencyId) ?? 0;
    offsets.set(competencyId, offset + 1);
    return matches[offset % matches.length];
  };
}

function workshopActivity(config, meta, targetSteps, plan, modelById) {
  const builder = builderFor(meta);
  const nextMilestone = milestonePicker(plan, config.milestones);
  const pattern = config.workshopPattern ?? [
    'code',
    'code',
    'inspect',
    'code',
    'debug',
    'code',
    'arrange',
  ];
  for (let index = 0; index < targetSteps; index += 1) {
    const model = modelById.get(plan.focus[index % plan.focus.length]);
    const interaction = pattern[index % pattern.length];
    if (interaction === 'inspect') {
      builder.choice({
        title: `Inspect ${meta.context} checkpoint ${index + 1}`,
        interaction: 'inspect',
        prompt: 'Which conclusion follows from the current implementation and behavior evidence?',
        correct: model.correct,
        distractors: [model.misconception, model.distractors[1]],
        competencyId: model.id,
      });
    } else if (interaction === 'debug') {
      builder.choice({
        title: `Debug ${meta.context} checkpoint ${index + 1}`,
        interaction: 'debug',
        prompt: 'Which bounded repair preserves earlier passing work?',
        correct: model.correct,
        distractors: [
          `Ignore checkpoint ${index + 1} because the happy path works.`,
          `Delete the complete ${meta.context} artifact and restart.`,
        ],
        competencyId: model.id,
      });
    } else if (interaction === 'arrange') {
      builder.order({
        title: `Rehearse ${meta.context} checkpoint ${index + 1}`,
        prompt: 'Put the verification cycle in dependency order.',
        options: model.sequence,
        competencyId: model.id,
      });
    } else if (interaction === 'reflect') {
      builder.reflect({
        title: `Defend ${meta.context} checkpoint ${index + 1}`,
        prompt:
          'Connect the implementation decision to user impact, failure behavior, and a retest.',
        competencyId: model.id,
        terms: model.terms,
      });
    } else if (interaction === 'code') {
      const [task, expected, competencyId, checkType, file] = nextMilestone(model.id);
      builder.code({
        title: `${meta.context} checkpoint ${index + 1} · ${task}`,
        prompt: `${task} in the existing artifact and rerun accumulated checks.`,
        competencyId,
        requirements: [[`increment-${index + 1}`, expected, checkType, file]],
      });
    } else {
      builder.choice({
        title: `${interaction} ${meta.context} checkpoint ${index + 1}`,
        interaction,
        prompt: 'Which claim remains valid after the scenario or state changes?',
        correct: model.correct,
        distractors: [model.misconception, model.distractors[1]],
        competencyId: model.id,
      });
    }
  }
  return finalize(meta, builder, config.courseId, config.moduleId);
}

function labActivity(config, meta, plan, modelById, targetSteps = 8) {
  const builder = builderFor(meta);
  const nextMilestone = milestonePicker(plan, config.milestones);
  const first = modelById.get(plan.focus[0]);
  if (plan.labPattern) {
    for (let index = 0; index < targetSteps; index += 1) {
      const model = modelById.get(plan.focus[index % plan.focus.length]);
      const interaction = plan.labPattern[index % plan.labPattern.length];
      const checkpoint = index + 1;
      if (interaction === 'code') {
        const [task, expected, competencyId, checkType, file] = nextMilestone(model.id);
        builder.code({
          title: `${plan.evidenceLens} build ${checkpoint} · ${task}`,
          prompt: `${task}. ${plan.labBrief} Preserve accumulated evidence and test ${plan.acceptanceEvidence}.`,
          competencyId,
          requirements: [[`independent-${checkpoint}`, expected, checkType, file]],
        });
      } else if (interaction === 'arrange') {
        builder.order({
          title: `${plan.evidenceLens} sequence ${checkpoint}`,
          prompt: `${plan.labBrief} Order the work so each observation justifies the next decision.`,
          options: model.sequence,
          competencyId: model.id,
        });
      } else if (interaction === 'reflect') {
        builder.reflect({
          title: `${plan.evidenceLens} defense ${checkpoint}`,
          prompt: `${plan.labBrief} Defend the result with ${plan.acceptanceEvidence}.`,
          competencyId: model.id,
          terms: model.terms,
        });
      } else {
        builder.choice({
          title: `${plan.evidenceLens} ${interaction} ${checkpoint}`,
          interaction,
          prompt: `${plan.labBrief} Which conclusion is justified by ${plan.acceptanceEvidence}?`,
          correct: `${model.correct} Apply that contract to ${plan.evidenceLens} and retain changed-case evidence.`,
          distractors: [
            `${model.misconception} Treat the ${plan.evidenceLens} appearance as sufficient proof.`,
            `${model.distractors[1]} Skip ${plan.acceptanceEvidence}.`,
          ],
          competencyId: model.id,
          ...(interaction === 'inspect'
            ? {
                stimulus: {
                  kind: model.stimulusKind ?? 'browser',
                  title: `${plan.evidenceLens} trace ${checkpoint}`,
                  caption: `Evidence from ${plan.labBrief}`,
                  lines: [
                    {
                      id: `${meta.id}-trace-${checkpoint}-risk`,
                      label: 'observed risk',
                      text: model.misconception,
                      tone: 'problem',
                    },
                    {
                      id: `${meta.id}-trace-${checkpoint}-acceptance`,
                      label: 'acceptance evidence',
                      text: plan.acceptanceEvidence,
                      tone: 'focus',
                    },
                  ],
                },
              }
            : {}),
        });
      }
    }
    return finalize(meta, builder, config.courseId, config.moduleId);
  }
  const layoutSeed = stableHash(`${meta.id}:lab-layout`);
  const caseInteractions = ['predict', 'inspect', 'answer', 'debug'];
  builder.choice({
    title: `Triage ${meta.context}`,
    interaction: caseInteractions[layoutSeed % caseInteractions.length],
    prompt: 'Which relationship should be tested first?',
    correct: first.correct,
    distractors: first.distractors,
    competencyId: first.id,
  });
  for (let index = 0; index < 3; index += 1) {
    const targetCompetencyId = plan.focus[index % plan.focus.length];
    const [task, expected, competencyId, checkType, file] = nextMilestone(targetCompetencyId);
    builder.code({
      title: `${meta.context} repair ${index + 1} · ${task}`,
      prompt: `Apply repair ${index + 1} and preserve earlier checks.`,
      competencyId,
      requirements: [[`repair-${index + 1}`, expected, checkType, file]],
    });
    if (index < 2) {
      const model = modelById.get(plan.focus[(index + 1) % plan.focus.length]);
      builder.choice({
        title: `Inspect ${meta.context} retest ${index + 1}`,
        interaction:
          caseInteractions[
            ((layoutSeed >>> ((index + 1) * 3)) + index + 1) % caseInteractions.length
          ],
        prompt: 'Which conclusion reaches the remaining cause?',
        correct: model.correct,
        distractors: [model.misconception, model.distractors[1]],
        competencyId: model.id,
      });
    }
  }
  builder.order({
    title: `Reconstruct ${meta.context} root cause`,
    prompt: 'Arrange the incident workflow.',
    options: first.sequence,
    competencyId: first.id,
  });
  builder.reflect({
    title: `Defend the ${meta.context} handoff`,
    prompt: 'Explain the task, evidence, failure behavior, and final retest.',
    competencyId: first.id,
    terms: first.terms,
  });
  while (builder.steps.length < targetSteps) {
    const index = builder.steps.length;
    const model = modelById.get(plan.focus[index % plan.focus.length]);
    const interaction = ['code', 'inspect', 'debug', 'arrange', 'reflect'][index % 5];
    if (interaction === 'code') {
      const [task, expected, competencyId, checkType, file] = nextMilestone(model.id);
      builder.code({
        title: `${meta.context} transfer ${index + 1} · ${task}`,
        prompt: `Apply the changed-case repair and preserve every earlier lab check.`,
        competencyId,
        requirements: [[`transfer-${index + 1}`, expected, checkType, file]],
      });
    } else if (interaction === 'arrange') {
      builder.order({
        title: `Sequence ${meta.context} transfer ${index + 1}`,
        prompt: 'Rebuild the evidence order after the constraints change.',
        options: model.sequence,
        competencyId: model.id,
      });
    } else if (interaction === 'reflect') {
      builder.reflect({
        title: `Defend ${meta.context} transfer ${index + 1}`,
        prompt: 'Explain the changed task, bounded repair, user consequence, and retest.',
        competencyId: model.id,
        terms: model.terms,
      });
    } else {
      builder.choice({
        title: `${interaction} ${meta.context} transfer ${index + 1}`,
        interaction,
        prompt: 'Which conclusion survives the changed data, user, or environment?',
        correct: model.correct,
        distractors: [model.misconception, model.distractors[1]],
        competencyId: model.id,
      });
    }
  }
  return finalize(meta, builder, config.courseId, config.moduleId);
}

function assessmentActivity(config, meta, targetSteps, plan, modelById) {
  const builder = builderFor(meta);
  const layoutSeed = stableHash(`${meta.id}:assessment-layout`);
  const caseInteractions = ['predict', 'inspect', 'answer', 'debug'];
  const orderPosition = layoutSeed % 5;
  let reflectionPosition = (layoutSeed >>> 5) % 5;
  if (reflectionPosition === orderPosition) reflectionPosition = (reflectionPosition + 2) % 5;
  for (let index = 0; index < targetSteps; index += 1) {
    const model = modelById.get(plan.focus[index % plan.focus.length]);
    if (index % 5 === orderPosition) {
      builder.order({
        title: `Sequence ${index + 1}: ${model.context}`,
        prompt: 'Reconstruct the verification workflow.',
        options: model.sequence,
        competencyId: model.id,
      });
    } else if (index % 5 === reflectionPosition && meta.kind === 'review') {
      builder.reflect({
        title: `Case note ${index + 1}: ${model.context}`,
        prompt: 'Explain task, failed relationship, consequence, and retest.',
        competencyId: model.id,
        terms: model.terms,
      });
    } else {
      const interaction =
        caseInteractions[((layoutSeed >>> ((index % 8) * 3)) + index) % caseInteractions.length];
      builder.choice({
        title: `${interaction} ${index + 1}: ${model.context}`,
        interaction,
        prompt: 'Which claim survives the changed case?',
        correct: model.correct,
        distractors: [model.misconception, model.distractors[index % 2]],
        competencyId: model.id,
      });
    }
  }
  return finalize(meta, builder, config.courseId, config.moduleId);
}

export async function generateRwdModule(config) {
  const blueprint = JSON.parse(
    await readFile(path.join(process.cwd(), 'blueprints', 'responsive-web-design.json'), 'utf8')
  );
  const blueprintModule = blueprint.modules.find((entry) => entry.id === config.blueprintModuleId);
  if (!blueprintModule) throw new Error(`Missing blueprint module ${config.blueprintModuleId}`);
  const competencies = config.competencyIds.map((competencyId) => {
    const competency = blueprint.competencies.find((entry) => entry.id === competencyId);
    if (!competency) throw new Error(`Missing competency ${competencyId}`);
    return competency;
  });
  if (new Set(config.competencyIds).size !== config.competencyIds.length) {
    throw new Error(`Duplicate competency ID in ${config.moduleId}`);
  }
  if (new Set(config.activityIds).size !== config.activityIds.length) {
    throw new Error(`Duplicate activity ID in ${config.moduleId}`);
  }
  const modelIds = config.models.map((model) => model.id);
  if (
    modelIds.length !== config.competencyIds.length ||
    modelIds.some((modelId, index) => modelId !== config.competencyIds[index])
  ) {
    throw new Error(`Models must match competencyIds exactly and in order for ${config.moduleId}`);
  }
  const modelById = new Map(config.models.map((model) => [model.id, model]));
  const concepts = new Map();
  const introduced = [];
  config.models.forEach((model, index) => {
    concepts.set(
      model.activityId,
      conceptActivity(
        config,
        model,
        [...introduced],
        (config.conceptPatterns ?? defaultPatterns)[
          index % (config.conceptPatterns ?? defaultPatterns).length
        ]
      )
    );
    introduced.push(model.id);
  });

  const mappedBlueprintById = new Map(
    blueprintModule.activities
      .filter((activity) => activity.reference)
      .map((activity) => [activity.id, activity])
  );
  const extraPlans = config.extraPlans ?? {};
  const extraBlueprintById = new Map(
    blueprintModule.activities
      .filter((activity) => !activity.reference && !activity.id.endsWith('-concept'))
      .map((activity) => [activity.id, activity])
  );
  const mappedPlanIds = Object.keys(config.mappedPlans);
  if (
    mappedPlanIds.length !== mappedBlueprintById.size ||
    mappedPlanIds.some((activityId) => !mappedBlueprintById.has(activityId))
  ) {
    throw new Error(
      `Mapped plans must cover every reference block exactly once for ${config.moduleId}`
    );
  }
  const extraPlanIds = Object.keys(extraPlans);
  if (
    extraPlanIds.length !== extraBlueprintById.size ||
    extraPlanIds.some((activityId) => !extraBlueprintById.has(activityId))
  ) {
    throw new Error(
      `Extra plans must cover every faded build and transfer lab exactly once for ${config.moduleId}`
    );
  }
  const expectedActivityIds = new Set([
    ...config.models.map((model) => model.activityId),
    ...mappedPlanIds,
    ...extraPlanIds,
  ]);
  if (
    expectedActivityIds.size !== config.activityIds.length ||
    config.activityIds.some((activityId) => !expectedActivityIds.has(activityId))
  ) {
    throw new Error(
      `activityIds must contain every concept and mapped activity once for ${config.moduleId}`
    );
  }
  const introducedBefore = new Set(config.retainedCompetencyIds);
  for (const activityId of config.activityIds) {
    const model = config.models.find((entry) => entry.activityId === activityId);
    if (model) {
      for (const prerequisiteId of model.prerequisiteIds ?? []) {
        if (!introducedBefore.has(prerequisiteId)) {
          throw new Error(`${activityId} precedes prerequisite competency ${prerequisiteId}`);
        }
      }
      introducedBefore.add(model.id);
      continue;
    }
    const plan = config.mappedPlans[activityId] ?? extraPlans[activityId];
    for (const competencyId of plan.focus) {
      if (!introducedBefore.has(competencyId)) {
        throw new Error(`${activityId} practices ${competencyId} before its introduction`);
      }
    }
  }
  const mapped = new Map();
  for (const [id, plan] of Object.entries(config.mappedPlans)) {
    const blueprintActivity = mappedBlueprintById.get(id);
    if (!blueprintActivity) throw new Error(`Missing mapped blueprint activity ${id}`);
    const minimum =
      { theory: 6, workshop: 8, lab: 8, review: 14, quiz: 20, project: 16 }[
        blueprintActivity.kind
      ] ?? 8;
    const targetSteps = Math.max(
      minimum,
      blueprintActivity.reference.upstreamChallengeCount,
      plan.targetSteps ?? 0
    );
    const meta = mappedMeta(config, id, blueprintActivity.kind, targetSteps, plan, modelById);
    const activity =
      blueprintActivity.kind === 'theory'
        ? theoryActivity(config, meta, modelById.get(plan.focus[0]), targetSteps)
        : blueprintActivity.kind === 'workshop'
          ? workshopActivity(config, meta, targetSteps, plan, modelById)
          : blueprintActivity.kind === 'lab'
            ? labActivity(config, meta, plan, modelById, targetSteps)
            : assessmentActivity(config, meta, targetSteps, plan, modelById);
    mapped.set(id, activity);
  }
  const extras = new Map();
  for (const [id, plan] of Object.entries(extraPlans)) {
    const blueprintActivity = extraBlueprintById.get(id);
    const targetSteps = plan.targetSteps;
    if (!Number.isInteger(targetSteps) || targetSteps < 8) {
      throw new Error(`${id} requires at least 8 explicitly planned steps`);
    }
    const kind = plan.kind ?? blueprintActivity.kind;
    if (kind !== blueprintActivity.kind) {
      throw new Error(`${id} kind ${kind} does not match blueprint kind ${blueprintActivity.kind}`);
    }
    const meta = mappedMeta(config, id, kind, targetSteps, plan, modelById);
    const activity =
      kind === 'workshop'
        ? workshopActivity(config, meta, targetSteps, plan, modelById)
        : kind === 'lab'
          ? labActivity(config, meta, plan, modelById, targetSteps)
          : assessmentActivity(config, meta, targetSteps, plan, modelById);
    extras.set(id, activity);
  }

  const activities = config.activityIds.map((activityId) => {
    const activity = concepts.get(activityId) ?? mapped.get(activityId) ?? extras.get(activityId);
    if (!activity) throw new Error(`Missing authored activity ${activityId}`);
    return activity;
  });
  activities.forEach((activity, index) => {
    activity.prerequisites = [index === 0 ? config.priorLastActivityId : activities[index - 1].id];
  });

  const module = {
    schemaVersion: 2,
    id: config.moduleId,
    courseId: config.courseId,
    title: config.title,
    description: config.description,
    order: config.order,
    objectives: config.objectives,
    competencyIds: config.competencyIds,
    prerequisites: [config.prerequisiteModuleId],
    activityIds: config.activityIds,
  };
  const outputRoot = path.join(process.cwd(), 'content', 'v2', 'courses', config.courseId);
  const coursePath = path.join(outputRoot, 'course.json');
  const course = JSON.parse(await readFile(coursePath, 'utf8'));
  const competencyIdSet = new Set(config.competencyIds);
  const retainedCompetencies = course.competencies.filter(
    (competency) => !competencyIdSet.has(competency.id)
  );
  const competencyBoundary = retainedCompetencies.findIndex(
    (competency) => competency.id === config.insertAfterCompetencyId
  );
  if (competencyBoundary < 0) {
    throw new Error(`Missing competency insertion boundary ${config.insertAfterCompetencyId}`);
  }
  retainedCompetencies.splice(competencyBoundary + 1, 0, ...competencies);
  course.competencies = retainedCompetencies;
  const moduleBoundary = course.moduleIds.indexOf(config.insertAfterModuleId);
  if (moduleBoundary < 0)
    throw new Error(`Missing module insertion boundary ${config.insertAfterModuleId}`);
  course.moduleIds = course.moduleIds.filter((existingId) => existingId !== config.moduleId);
  course.moduleIds.splice(moduleBoundary + 1, 0, config.moduleId);
  course.estimatedHours = Math.max(
    course.estimatedHours,
    Math.round((config.estimatedHours / 60) * 10) / 10
  );

  await mkdir(path.join(outputRoot, 'activities'), { recursive: true });
  await mkdir(path.join(outputRoot, 'modules'), { recursive: true });
  await writeFile(coursePath, `${JSON.stringify(course, null, 2)}\n`);
  await writeFile(
    path.join(outputRoot, 'modules', `${config.moduleId}.json`),
    `${JSON.stringify(module, null, 2)}\n`
  );
  for (const activity of activities) {
    await writeFile(
      path.join(outputRoot, 'activities', `${activity.id}.json`),
      `${JSON.stringify(activity, null, 2)}\n`
    );
  }
  const interactions = activities.reduce((total, activity) => total + activity.steps.length, 0);
  return { activities: activities.length, interactions, competencies: competencies.length };
}
