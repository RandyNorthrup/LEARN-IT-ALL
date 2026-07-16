import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const reference = JSON.parse(
  await readFile(path.join(root, 'references', 'freecodecamp-rwd-v9.json'), 'utf8')
);
const blueprint = JSON.parse(
  await readFile(path.join(root, 'blueprints', 'responsive-web-design.json'), 'utf8')
);

const blueprintModules = new Map(blueprint.modules.map((module) => [module.id, module]));

const validationByType = {
  workshop:
    'Inspect every original step for explicit teaching, meaningful cumulative change, fading, feedback, retained correctness, and duplication before authoring can pass.',
  lab: 'Require an original changed scenario, starter, requirements, behavior checks, causal explanation, and independent evidence rather than a renamed workshop.',
  lecture:
    'Review original theory, examples, predictions, misconceptions, active checks, prerequisite assumptions, and later use before the concept can be approved.',
  review:
    'Verify mixed retrieval uses changed contexts, retrieves named earlier skills, diagnoses misconceptions, and schedules delayed evidence.',
  quiz: 'Review item objectives, distractor misconceptions, feedback, accessibility, answer security, changed cases, and false-positive or false-negative behavior.',
  exam: 'Complete independent assessment, project, delayed retention, transfer, rubric, answer-security, accessibility, and reviewer-validity evidence.',
};

const objectives = reference.chapters.flatMap((chapter) =>
  chapter.modules.flatMap((sourceModule) => {
    const module = blueprintModules.get(sourceModule.id);
    if (!module) throw new Error(`Blueprint is missing source module ${sourceModule.id}.`);

    return sourceModule.blocks.map((block) => {
      const activity = module.activities.find(
        (candidate) => candidate.reference?.upstreamBlock === block.slug
      );
      if (!activity) throw new Error(`Blueprint is missing source block ${block.slug}.`);
      const competencyIds = [...new Set(activity.coverage.map((entry) => entry.competencyId))];
      const stages = [...new Set(activity.coverage.flatMap((entry) => entry.stages))];

      return {
        objectiveId: block.objectiveId,
        sourceId: 'rwd-fcc-v9',
        sourceModuleId: sourceModule.id,
        sourceBlockSlug: block.slug,
        sourceActivityType: block.type,
        sourceChallengeIds: block.challengeOrder.map((challenge) => challenge.id),
        sourceChallengeCount: block.challengeCount,
        coverageIntent: `Benchmark the breadth and ${block.challengeCount}-challenge practice depth represented by ${block.slug} while teaching and assessing the mapped competencies through original LEARN-IT-ALL work.`,
        competencyIds,
        moduleIds: [module.id],
        stages,
        learnerWorkState: 'mapped-only',
        originalityBoundary:
          'The external identifier and count establish coverage inventory only; explanations, examples, scenarios, source, checks, feedback, projects, and solutions must be original.',
        validationNeeded: [validationByType[block.type]],
      };
    });
  })
);

const matrix = {
  schemaVersion: 1,
  courseId: 'responsive-web-design',
  snapshot: {
    sourceId: 'rwd-fcc-v9',
    upstreamCommit: reference.upstreamCommit,
    capturedAt: reference.capturedAt,
    sourceModules: reference.totals.modules,
    sourceBlocks: reference.totals.blocks,
    sourceChallenges: reference.totals.challenges,
  },
  objectives,
  gaps: [
    'Source identities and challenge counts are mapped, but challenge prose has not yet been decomposed into a reviewed standards and misconception objective graph.',
    'All existing learner work remains mapped-only and audit-required; this matrix does not approve current explanations, steps, checks, projects, or sequence.',
    'Current HTML and CSS standard anchors, browser interoperability, accessibility requirements, and prerequisite relationships still need objective-level review.',
    'Subject, instructional, assessment, accessibility, safety, and observed-learner reviews remain required before publication.',
  ],
};

const output = path.join(
  root,
  'docs',
  'research',
  'courses',
  'responsive-web-design-coverage.json'
);
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(matrix, null, 2)}\n`);
console.log(
  `Wrote ${output}: ${matrix.objectives.length} source objectives and ${matrix.objectives.flatMap((objective) => objective.sourceChallengeIds).length} challenge identities.`
);
