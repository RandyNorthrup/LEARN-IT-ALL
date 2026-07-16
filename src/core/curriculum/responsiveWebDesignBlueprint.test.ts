import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';

const rawBlueprint = JSON.parse(
  readFileSync(path.join(process.cwd(), 'blueprints', 'responsive-web-design.json'), 'utf8')
);
const reference = JSON.parse(
  readFileSync(path.join(process.cwd(), 'references', 'freecodecamp-rwd-v9.json'), 'utf8')
);

interface ReferenceBlock {
  objectiveId: string;
  challengeCount: number;
  challengeOrder: Array<{ id: string; title: string }>;
}

describe('Responsive Web Design course blueprint', () => {
  it('passes the institution-grade blueprint contract', () => {
    const blueprint = CourseBlueprintSchema.parse(rawBlueprint);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
  });

  it('maps every current freeCodeCamp v9 module and block exactly once', () => {
    const referenceModules = reference.chapters.flatMap(
      (chapter: { modules: Array<{ id: string; blocks: Array<{ slug: string }> }> }) =>
        chapter.modules
    );
    const referenceBlockIds = referenceModules.flatMap(
      (module: { blocks: Array<{ slug: string }> }) =>
        module.blocks.map((block: { slug: string }) => block.slug)
    );
    const mappedBlockIds = rawBlueprint.modules.flatMap(
      (module: { activities: Array<{ reference?: { upstreamBlock: string } }> }) =>
        module.activities
          .filter((activity) => activity.reference)
          .map((activity) => activity.reference?.upstreamBlock)
    );

    expect(rawBlueprint.modules).toHaveLength(29);
    expect(mappedBlockIds).toHaveLength(158);
    expect(new Set(mappedBlockIds).size).toBe(158);
    expect(new Set(mappedBlockIds)).toEqual(new Set(referenceBlockIds));
  });

  it('retains all upstream challenge identities and maps module source objectives', () => {
    const referenceBlocks = reference.chapters.flatMap(
      (chapter: {
        modules: Array<{
          blocks: ReferenceBlock[];
        }>;
      }) => chapter.modules.flatMap((module) => module.blocks)
    ) as ReferenceBlock[];
    const challengeIds = referenceBlocks.flatMap((block) =>
      block.challengeOrder.map((challenge) => challenge.id)
    );

    expect(referenceBlocks).toHaveLength(158);
    expect(challengeIds).toHaveLength(1553);
    expect(new Set(challengeIds)).toHaveLength(1553);
    expect(
      referenceBlocks.every(
        (block) => block.challengeOrder.length === block.challengeCount && block.objectiveId
      )
    ).toBe(true);

    for (const module of rawBlueprint.modules as Array<{
      id: string;
      sourceObjectiveIds: string[];
      reference: { upstreamBlocks: number };
    }>) {
      expect(module.sourceObjectiveIds, `${module.id} source-objective map`).toHaveLength(
        module.reference.upstreamBlocks
      );
      expect(module.sourceObjectiveIds.every((id) => id.startsWith('fcc-v9-'))).toBe(true);
    }
  });

  it('records bounded source decisions and maintenance triggers', () => {
    expect(
      rawBlueprint.sources.every(
        (source: {
          id?: string;
          limitations?: string[];
          decisionIds?: string[];
          nextReview?: { triggers: string[] };
        }) =>
          source.id &&
          source.limitations?.length &&
          source.decisionIds?.length &&
          source.nextReview?.triggers.length
      )
    ).toBe(true);
  });

  it('starts with computer and browser foundations before HTML and CSS', () => {
    expect(rawBlueprint.modules.slice(0, 3).map((module: { id: string }) => module.id)).toEqual([
      'computer-basics',
      'basic-html',
      'semantic-html',
    ]);
  });

  it('uses authored foundation briefs instead of repeating a generated lesson shell', () => {
    const foundation = rawBlueprint.modules[0] as {
      objectives: string[];
      activities: Array<{
        title: string;
        authenticContext: string;
        learningDesign: { retainedPractice: string; learnerArtifact: string };
      }>;
    };
    const serialized = JSON.stringify(foundation);

    expect(foundation.objectives).toHaveLength(4);
    expect(foundation.activities).toHaveLength(13);
    expect(new Set(foundation.activities.map((activity) => activity.title)).size).toBe(13);
    expect(new Set(foundation.activities.map((activity) => activity.authenticContext)).size).toBe(
      13
    );
    expect(serialized).not.toContain('original mapped');
    expect(serialized).not.toContain('Produce a testable increment for');
    expect(serialized).not.toContain('revisit the same competencies');
  });

  it('plans granular competencies, cumulative projects, and a broad assessment bank', () => {
    expect(rawBlueprint.competencies.length).toBeGreaterThanOrEqual(120);
    expect(rawBlueprint.projects).toHaveLength(5);
    expect(rawBlueprint.assessmentBlueprint.minimumQuestionBankSize).toBeGreaterThanOrEqual(300);
    expect(rawBlueprint.referenceCoverage).toMatchObject({
      modules: 29,
      blocks: 158,
      challenges: 1553,
      everyReferenceBlockMapped: true,
    });
  });
});
