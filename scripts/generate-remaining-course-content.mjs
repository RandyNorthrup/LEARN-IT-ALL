import { networkPlusConfig } from './generate-network-plus-blueprint.mjs';
import { pythonBasicsConfig } from './generate-python-basics-blueprint.mjs';
import { pythonOopConfig } from './generate-python-oop-blueprint.mjs';
import { generateExpandedCourseContent } from './lib/generate-expanded-course-content.mjs';

const configs = [pythonBasicsConfig, pythonOopConfig, networkPlusConfig];
const requestedCourseId = process.argv[2];
const selected = requestedCourseId
  ? configs.filter((config) => config.id === requestedCourseId)
  : configs;

if (requestedCourseId && selected.length === 0) {
  throw new Error(
    `Unknown rebuilt course "${requestedCourseId}". Expected: ${configs.map((config) => config.id).join(', ')}`
  );
}

const summaries = [];
for (const config of selected) {
  const summary = await generateExpandedCourseContent(config);
  summaries.push(summary);
  console.log(
    `Generated ${summary.courseId}: ${summary.modules} modules, ${summary.activities} activities, ${summary.steps} steps, ${summary.checks} checks.`
  );
}

const totals = summaries.reduce(
  (sum, course) => ({
    modules: sum.modules + course.modules,
    activities: sum.activities + course.activities,
    steps: sum.steps + course.steps,
    checks: sum.checks + course.checks,
  }),
  { modules: 0, activities: 0, steps: 0, checks: 0 }
);

console.log(
  `Generated ${summaries.length} rebuilt courses: ${totals.modules} modules, ${totals.activities} activities, ${totals.steps} learner steps, ${totals.checks} checks.`
);
