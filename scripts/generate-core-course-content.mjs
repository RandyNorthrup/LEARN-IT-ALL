import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { generateExpandedCourseContent } from './lib/generate-expanded-course-content.mjs';

const COURSE_IDS = ['python-basics', 'python-oop', 'comptia-network-plus'];
const requestedCourseId = process.argv[2];
const courseIds = requestedCourseId ? [requestedCourseId] : COURSE_IDS;

if (requestedCourseId && !COURSE_IDS.includes(requestedCourseId)) {
  throw new Error(`Unknown core course "${requestedCourseId}". Expected: ${COURSE_IDS.join(', ')}`);
}

async function configFromBlueprint(courseId) {
  const blueprint = JSON.parse(
    await readFile(path.join(process.cwd(), 'blueprints', `${courseId}.json`), 'utf8')
  );
  return {
    id: blueprint.id,
    title: blueprint.title,
    audience: blueprint.audience,
    scope: blueprint.scope,
    sources: blueprint.sources,
    masteryThresholdPercent: blueprint.assessmentBlueprint.masteryThresholdPercent,
    modules: blueprint.modules.map((module) => {
      const representative =
        module.activities.find((activity) => activity.kind === 'workshop') ?? module.activities[0];
      return {
        id: module.id,
        context: representative.authenticContext,
        artifact: representative.learningDesign.learnerArtifact
          .replace(/^(?:add and verify|build|produce)\s+/i, '')
          .replace(/\.$/, ''),
      };
    }),
  };
}

const totals = { modules: 0, activities: 0, steps: 0, checks: 0 };
for (const courseId of courseIds) {
  const summary = await generateExpandedCourseContent(await configFromBlueprint(courseId));
  totals.modules += summary.modules;
  totals.activities += summary.activities;
  totals.steps += summary.steps;
  totals.checks += summary.checks;
  console.log(
    `Generated ${summary.courseId}: ${summary.modules} modules, ${summary.activities} activities, ${summary.steps} steps, ${summary.checks} checks.`
  );
}

console.log(
  `Generated ${courseIds.length} core v2 courses: ${totals.modules} modules, ${totals.activities} activities, ${totals.steps} learner steps, ${totals.checks} checks.`
);
