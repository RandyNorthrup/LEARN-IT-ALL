export function skill(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  return [id, statement, misconception, knowledgeType, level];
}

export function module(id, title, context, artifact, skills) {
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
  };
}

export function project(id, title, afterModuleId, stakeholder, userNeed, competencyIds) {
  return {
    id,
    title,
    afterModuleId,
    stakeholder,
    userNeed,
    constraints: [
      'Every input, assumption, transformation, and result is traceable.',
      'Invalid, boundary, and changed cases are tested instead of silently discarded.',
      'The result is understandable and useful to its named stakeholder.',
    ],
    competencyIds,
    rubricDimensions: [
      'Correctness and defensible assumptions',
      'Changed-case and failure evidence',
      'Communication and stakeholder usefulness',
    ],
  };
}

function finalCompetencies(modules) {
  const all = modules.flatMap((entry) => entry.skills.map((item) => item[0]));
  return all.filter((_, index) => index % 4 === 0 || index === all.length - 1);
}

export function finalizeCourse(
  config,
  { researchedAt, prerequisiteCourseIds = [], masteryThresholdPercent = 85 }
) {
  return {
    ...config,
    researchedAt,
    pathways: {
      prerequisiteCourseIds,
      placementEvidence: config.audience.entryKnowledge.map(
        (entry) =>
          `A placement review or prior artifact must demonstrate this entry skill: ${entry}`
      ),
      completionEvidence: [
        `Complete and defend all ${config.projects.length} stakeholder projects against their acceptance constraints and rubrics.`,
        `Pass the cumulative performance examination at or above ${masteryThresholdPercent} percent with changed-case evidence.`,
      ],
    },
    finalExamCompetencyIds: finalCompetencies(config.modules),
    masteryThresholdPercent,
  };
}
