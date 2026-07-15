import { expandedCourseConfigs } from './data/expanded-course-configs.mjs';
import { generateCourseBlueprint } from './lib/generate-course-blueprint.mjs';

const summaries = [];

for (const config of expandedCourseConfigs) {
  const result = await generateCourseBlueprint(config);
  summaries.push({ id: config.id, ...result });
  console.log(
    `Generated ${config.title}: ${result.competencies} competencies, ${result.modules} modules, ${result.activities} activities.`
  );
}

const totals = summaries.reduce(
  (sum, course) => ({
    competencies: sum.competencies + course.competencies,
    modules: sum.modules + course.modules,
    activities: sum.activities + course.activities,
  }),
  { competencies: 0, modules: 0, activities: 0 }
);

console.log(
  `Generated ${summaries.length} expanded course blueprints: ${totals.competencies} competencies, ${totals.modules} modules, ${totals.activities} activities.`
);
