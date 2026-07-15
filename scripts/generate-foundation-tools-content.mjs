import { foundationToolsConfigs } from './data/foundation-tools-configs.mjs';
import { generateExpandedCourseContent } from './lib/generate-expanded-course-content.mjs';

const requestedCourseId = process.argv[2];
const selected = requestedCourseId
  ? foundationToolsConfigs.filter((config) => config.id === requestedCourseId)
  : foundationToolsConfigs;

if (requestedCourseId && selected.length === 0) {
  throw new Error(`Unknown foundation tools course "${requestedCourseId}".`);
}

for (const config of selected) {
  const result = await generateExpandedCourseContent(config);
  console.log(
    `Generated ${result.courseId}: ${result.modules} modules, ${result.activities} activities, ${result.steps} steps, ${result.checks} checks.`
  );
}
