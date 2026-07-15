import { describe, expect, it } from 'vitest';
import type { CurriculumGraph } from './repository';
import {
  loadCurriculumActivity,
  loadCurriculumCourse,
  loadCurriculumModule,
  loadCurriculumOutline,
  validateCurriculumGraph,
} from './repository';
import { CurriculumActivitySchema, CurriculumCourseSchema, CurriculumModuleSchema } from './schema';

function graph(): CurriculumGraph {
  const activity = CurriculumActivitySchema.parse({
    schemaVersion: 2,
    id: 'theory-document-structure',
    courseId: 'responsive-web-design',
    moduleId: 'basic-html',
    kind: 'theory',
    title: 'Reason about document structure',
    summary: 'Use a retrieval check to distinguish document structure from presentation.',
    objectives: ['Explain why document structure remains useful without visual styling.'],
    competencyCoverage: {
      introduces: ['semantic-document'],
      reinforces: [],
      assesses: ['semantic-document'],
    },
    prerequisites: [],
    difficulty: 'foundation',
    estimatedMinutes: 5,
    steps: [
      {
        id: 'step-document-purpose',
        title: 'Choose the structural reason',
        interaction: 'answer',
        instruction:
          'Choose the reason semantic structure should be authored before visual polish.',
        why: 'Separating structure from appearance produces more resilient interfaces.',
        checkIds: ['check-document-purpose'],
        competencyIds: ['semantic-document'],
        hints: ['Think beyond visual output.', 'Consider assistive technology.', 'Choose meaning.'],
        options: [
          { id: 'answer-meaning', text: 'It preserves meaning across presentations.' },
          { id: 'answer-color', text: 'It automatically chooses colors.' },
        ],
      },
    ],
    checks: [
      {
        id: 'check-document-purpose',
        type: 'choice-equals',
        description: 'The answer connects structure to durable meaning.',
        failureMessage: 'Reconsider which benefit survives a stylesheet failure.',
        hidden: true,
        competencyIds: ['semantic-document'],
        expectedOptionId: 'answer-meaning',
      },
    ],
    mastery: { passingPercent: 100, maxHintsForMastery: 1, spacedReviewDays: [1, 7] },
  });
  const module = CurriculumModuleSchema.parse({
    schemaVersion: 2,
    id: 'basic-html',
    courseId: 'responsive-web-design',
    title: 'Basic HTML',
    description: 'Build durable documents from meaningful elements and browser-safe metadata.',
    order: 1,
    sourceObjectiveIds: ['framework-1.1'],
    objectives: ['Create valid documents with meaningful structure and useful metadata.'],
    competencyIds: ['semantic-document'],
    prerequisites: [],
    activityIds: [activity.id],
  });
  const course = CurriculumCourseSchema.parse({
    schemaVersion: 2,
    id: 'responsive-web-design',
    title: 'Responsive Web Design',
    description:
      'Build accessible, responsive interfaces through deliberate practice and projects.',
    outcomes: [
      'Create semantic documents.',
      'Build resilient layouts.',
      'Verify accessible interactions.',
    ],
    prerequisites: [],
    competencies: [
      {
        id: 'semantic-document',
        statement:
          'Create document structures whose meaning remains understandable without presentation styles.',
        knowledgeType: 'procedural',
        level: 'apply',
        prerequisiteIds: [],
        misconceptions: ['Semantic elements are chosen only for their default visual appearance.'],
        masteryEvidence: [
          'An independently built document uses landmarks and headings for their intended purpose.',
        ],
      },
      {
        id: 'responsive-layout',
        statement:
          'Create layouts that reflow without loss of content or interaction at supported viewport sizes.',
        knowledgeType: 'procedural',
        level: 'create',
        prerequisiteIds: ['semantic-document'],
        misconceptions: ['Responsive design means shrinking a fixed desktop layout.'],
        masteryEvidence: [
          'An independent project reflows cleanly at narrow, tablet, and desktop widths.',
        ],
      },
      {
        id: 'accessible-interaction',
        statement:
          'Implement and verify interactions that work with keyboard and assistive technology.',
        knowledgeType: 'professional',
        level: 'evaluate',
        prerequisiteIds: ['semantic-document'],
        misconceptions: ['Visual similarity proves that an interaction is accessible.'],
        masteryEvidence: [
          'A project passes automated checks and a documented keyboard interaction review.',
        ],
      },
    ],
    moduleIds: [module.id],
    estimatedHours: 100,
    credential: {
      title: 'Responsive Web Design Certificate',
      requiredProjectIds: [],
      finalExamId: activity.id,
      passingPercent: 80,
    },
    status: 'draft',
  });
  return { course, modules: [module], activities: [activity] };
}

describe('validateCurriculumGraph', () => {
  it('accepts a connected ordered graph', () => {
    const valid = graph();
    expect(validateCurriculumGraph(valid)).toEqual([]);
    expect(valid.modules[0].sourceObjectiveIds).toEqual(['framework-1.1']);
  });

  it('reports dangling activity references', () => {
    const invalid = graph();
    invalid.modules[0].activityIds.push('missing-activity');
    expect(validateCurriculumGraph(invalid)).toContain(
      'Module basic-html references missing activity: missing-activity'
    );
  });

  it('reports prerequisite cycles', () => {
    const invalid = graph();
    invalid.modules[0].prerequisites.push('basic-html');
    expect(validateCurriculumGraph(invalid)).toContain(
      'Module prerequisite cycle includes basic-html'
    );
  });

  it('rejects a dependency on an activity that appears later', () => {
    const invalid = graph();
    const first = invalid.activities[0];
    const later = CurriculumActivitySchema.parse({
      ...first,
      id: 'later-document-practice',
      title: 'Later document practice',
      prerequisites: [],
    });
    first.prerequisites.push(later.id);
    invalid.modules[0].activityIds.push(later.id);
    invalid.activities.push(later);
    expect(validateCurriculumGraph(invalid)).toContain(
      'Activity theory-document-structure depends on later activity: later-document-practice'
    );
  });

  it('rejects reinforcement before a competency is introduced', () => {
    const invalid = graph();
    invalid.activities[0].competencyCoverage = {
      introduces: [],
      reinforces: ['semantic-document'],
      assesses: [],
    };
    expect(validateCurriculumGraph(invalid)).toContain(
      'Activity theory-document-structure reinforces semantic-document before it is introduced'
    );
  });

  it('rejects duplicate competency introductions', () => {
    const invalid = graph();
    const first = invalid.activities[0];
    const repeated = CurriculumActivitySchema.parse({
      ...first,
      id: 'repeated-document-introduction',
      title: 'Repeated document introduction',
      prerequisites: [first.id],
    });
    invalid.modules[0].activityIds.push(repeated.id);
    invalid.activities.push(repeated);
    expect(validateCurriculumGraph(invalid)).toContain(
      'Activity repeated-document-introduction introduces semantic-document more than once'
    );
  });
});

describe('curriculum file boundaries', () => {
  it('rejects path traversal before course content reaches filesystem access', () => {
    expect(() => loadCurriculumCourse('../outside')).toThrow();
    expect(() => loadCurriculumModule('responsive-web-design', '../outside')).toThrow();
    expect(() => loadCurriculumActivity('responsive-web-design', '../outside')).toThrow();
    expect(() => loadCurriculumOutline('../outside')).toThrow();
  });
});
