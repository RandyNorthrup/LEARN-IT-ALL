import { expandedCourseConfigs } from './data/expanded-course-configs.mjs';
import { generateExpandedCourseContent } from './lib/generate-expanded-course-content.mjs';

const requestedCourseId = process.argv[2];
const configs = requestedCourseId
  ? expandedCourseConfigs.filter((config) => config.id === requestedCourseId)
  : expandedCourseConfigs;

if (requestedCourseId && configs.length === 0) {
  throw new Error(
    `Unknown expanded course "${requestedCourseId}". Expected: ${expandedCourseConfigs.map((config) => config.id).join(', ')}`
  );
}

const summaries = [];
for (const config of configs) {
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
  `Generated ${summaries.length} expanded courses: ${totals.modules} modules, ${totals.activities} activities, ${totals.steps} learner steps, ${totals.checks} checks.`
);
