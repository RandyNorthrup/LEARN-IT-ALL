import { pythonSpecializationConfigs } from './data/python-specialization-configs.mjs';
import { generateExpandedCourseContent } from './lib/generate-expanded-course-content.mjs';

const requestedCourseId = process.argv[2];
const selected = requestedCourseId
  ? pythonSpecializationConfigs.filter((config) => config.id === requestedCourseId)
  : pythonSpecializationConfigs;

if (requestedCourseId && selected.length === 0) {
  throw new Error(`Unknown Python specialization "${requestedCourseId}".`);
}

for (const config of selected) {
  const result = await generateExpandedCourseContent(config);
  console.log(
    `Generated ${result.courseId}: ${result.modules} modules, ${result.activities} activities, ${result.steps} steps, ${result.checks} checks.`
  );
}
