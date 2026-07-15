import { expandedCourseConfigs } from './data/expanded-course-configs.mjs';
import { generateCourseBlueprint } from './lib/generate-course-blueprint.mjs';

const courseId = process.argv[2];
const config = expandedCourseConfigs.find((entry) => entry.id === courseId);

if (!config) {
  const supported = expandedCourseConfigs.map((entry) => entry.id).join(', ');
  throw new Error(`Unknown expanded course "${courseId ?? ''}". Expected one of: ${supported}`);
}

const result = await generateCourseBlueprint(config);

console.log(
  `Generated ${config.title}: ${result.competencies} competencies, ${result.modules} modules, ${result.activities} activities.`
);
