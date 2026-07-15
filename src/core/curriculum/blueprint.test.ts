import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';

function blueprint() {
  const competencyIds = ['structure-pages', 'style-components', 'verify-accessibility'];
  const competencies = competencyIds.map((id, index) => ({
    id,
    statement: `Demonstrate competency ${id} in an independently built and verified interface.`,
    knowledgeType: index === 2 ? ('professional' as const) : ('procedural' as const),
    level: index === 0 ? ('apply' as const) : ('create' as const),
    prerequisiteIds: index === 0 ? [] : [competencyIds[index - 1]],
    misconceptions: [`A common misconception about ${id} leads to fragile implementation choices.`],
    masteryEvidence: [`An independent project supplies observable evidence for ${id}.`],
  }));
  const practiceStages = ['G', 'F', 'R', 'A', 'T'] as const;
  const introActivities = competencyIds.map((competencyId, index) => ({
    id: `activity-intro-${index + 1}`,
    title: `Introduce ${competencyId}`,
    kind: 'theory' as const,
    authenticContext: 'Improve a community learning portal used on many devices.',
    coverage: [
      { competencyId, stages: ['I' as const] },
      ...(index > 0 ? [{ competencyId: competencyIds[index - 1], stages: ['R' as const] }] : []),
    ],
    learningDesign: {
      buildsOnCompetencyIds: index > 0 ? [competencyIds[index - 1]] : [],
      newCompetencyIds: [competencyId],
      retainedPractice:
        index > 0
          ? 'Retrieve the previous interface skill before adding this bounded new capability.'
          : 'Establish the first observable foundation reused throughout the remaining course.',
      learnerArtifact: 'Produce and verify one working increment of the community learning portal.',
      supportLevel: 'modeled' as const,
    },
    estimatedMinutes: 20,
  }));

  return CourseBlueprintSchema.parse({
    schemaVersion: 1,
    id: 'responsive-web-design',
    title: 'Responsive Web Design',
    version: '1.0.0',
    status: 'approved',
    researchedAt: '2026-07-13T00:00:00.000Z',
    audience: {
      description:
        'Beginning developers who need a complete path from first document to verified responsive project.',
      entryKnowledge: ['Operate a keyboard, browser, and basic local file system.'],
      deviceConstraints: ['Mobile, tablet, or desktop browser'],
      accessibilityAssumptions: [
        'Learners may use keyboard, zoom, reduced motion, or assistive technology.',
      ],
    },
    pathways: {
      prerequisiteCourseIds: [],
      placementEvidence: [
        'Demonstrate browser, keyboard, and local file operation in a short accessible setup task.',
      ],
      completionEvidence: [
        'Complete all stakeholder projects with independent responsive and accessibility evidence.',
        'Pass the cumulative performance exam at or above the stated mastery threshold.',
      ],
    },
    scope: {
      includes: ['Semantic HTML', 'Responsive CSS', 'Accessibility verification'],
      excludes: ['Production JavaScript application architecture'],
      nextCourses: ['javascript-basics'],
    },
    sources: [
      ['HTML Living Standard', 'standard', 'https://html.spec.whatwg.org/', 'Living'],
      ['WCAG 2.2', 'standard', 'https://www.w3.org/TR/WCAG22/', '2.2'],
      [
        'MDN Curriculum',
        'curriculum-framework',
        'https://developer.mozilla.org/en-US/curriculum/',
        '2025',
      ],
    ].map(([title, authority, url, version]) => ({
      title,
      authority,
      url,
      version,
      reviewedAt: '2026-07-13',
      scope: 'Defines current technical or curricular expectations.',
    })),
    competencies,
    modules: [
      {
        id: 'foundations',
        title: 'Interface foundations',
        order: 1,
        prerequisiteModuleIds: [],
        objectives: ['Build and verify a complete accessible responsive interface.'],
        activities: [
          ...introActivities,
          ...practiceStages.map((stage, index) => ({
            id: `activity-${stage.toLowerCase()}`,
            title: `${stage} interface practice`,
            kind:
              index === 4
                ? ('project' as const)
                : index === 3
                  ? ('quiz' as const)
                  : ('workshop' as const),
            authenticContext: 'Improve a community learning portal used on many devices.',
            coverage: competencyIds.map((competencyId) => ({
              competencyId,
              stages: [stage],
            })),
            learningDesign: {
              buildsOnCompetencyIds: competencyIds,
              newCompetencyIds: [],
              retainedPractice:
                'Recall every previously introduced interface skill and apply it in a changed context.',
              learnerArtifact:
                'Extend and verify the same cumulative community portal without discarding prior work.',
              supportLevel:
                stage === 'T' || stage === 'A'
                  ? ('independent' as const)
                  : stage === 'F'
                    ? ('faded' as const)
                    : ('guided' as const),
            },
            estimatedMinutes: 20,
          })),
          {
            id: 'activity-final-exam',
            title: 'Cumulative interface performance exam',
            kind: 'exam' as const,
            authenticContext:
              'Create and verify an unfamiliar community interface under changed device and accessibility constraints.',
            coverage: competencyIds.map((competencyId) => ({
              competencyId,
              stages: ['R' as const, 'A' as const, 'T' as const],
            })),
            learningDesign: {
              buildsOnCompetencyIds: competencyIds,
              newCompetencyIds: [],
              retainedPractice:
                'Retrieve and integrate every earlier interface competency without workshop scaffolding.',
              learnerArtifact:
                'Deliver a verified unfamiliar interface plus a concise evidence and reflection packet.',
              supportLevel: 'independent' as const,
            },
            estimatedMinutes: 120,
          },
        ],
      },
    ],
    projects: ['community-site', 'resource-library', 'learning-dashboard'].map((id) => ({
      id,
      title: `Build the ${id.replace('-', ' ')}`,
      stakeholder: 'A community education coordinator',
      userNeed: 'Learners need reliable access to useful content on varied devices.',
      constraints: [
        'Keyboard accessible',
        'Responsive at three viewports',
        'Valid semantic structure',
      ],
      competencyIds,
      rubricDimensions: ['Structural quality', 'Responsive behavior', 'Accessibility evidence'],
    })),
    assessmentBlueprint: {
      masteryThresholdPercent: 80,
      formativeCorrectionPolicy:
        'Failed checks route to misconception-specific feedback, corrective practice, and a parallel retry.',
      finalExamCompetencyIds: competencyIds,
      minimumQuestionBankSize: 60,
      performanceAssessmentIds: ['community-site'],
    },
    spiralPolicy: {
      immediateGuidedUse: true,
      sameModuleFadedUse: true,
      nextRelevantLessonUse: true,
      independentLabUse: true,
      delayedRetrievalUse: true,
      cumulativeProjectUse: true,
    },
  });
}

describe('course blueprint audit', () => {
  it('accepts complete cumulative coverage', () => {
    expect(auditCourseBlueprint(blueprint())).toEqual([]);
  });

  it('rejects a competency that is introduced but never transferred', () => {
    const incomplete = blueprint();
    const transferActivities = incomplete.modules[0].activities.filter((activity) =>
      activity.coverage.some((entry) => entry.stages.includes('T'))
    );
    if (!transferActivities.length) throw new Error('Transfer activity missing from fixture');
    for (const transfer of transferActivities) {
      transfer.coverage = transfer.coverage.filter(
        (entry) => entry.competencyId !== 'verify-accessibility'
      );
    }

    expect(auditCourseBlueprint(incomplete)).toContain(
      'Competency verify-accessibility is missing T coverage'
    );
  });

  it('rejects a later activity that skips all prior learning', () => {
    const incomplete = blueprint();
    const guided = incomplete.modules[0].activities.find(
      (activity) => activity.id === 'activity-g'
    );
    if (!guided) throw new Error('Guided activity missing from fixture');
    guided.coverage = [{ competencyId: 'new-unmapped-skill', stages: ['G'] }];
    guided.learningDesign.buildsOnCompetencyIds = [];

    expect(auditCourseBlueprint(incomplete)).toContain(
      'Activity activity-g does not reinforce any previously introduced competency'
    );
  });

  it('rejects duplicate competency wording even when IDs differ', () => {
    const duplicated = blueprint();
    duplicated.competencies[1].statement = duplicated.competencies[0].statement.toUpperCase();

    expect(auditCourseBlueprint(duplicated)).toContain('Duplicate competency statements');
  });

  it('requires exactly one cumulative exam in the final module', () => {
    const missingExam = blueprint();
    missingExam.modules[0].activities = missingExam.modules[0].activities.filter(
      (activity) => activity.kind !== 'exam'
    );

    expect(auditCourseBlueprint(missingExam)).toContain(
      'Expected exactly one cumulative exam; found 0'
    );
  });
});
