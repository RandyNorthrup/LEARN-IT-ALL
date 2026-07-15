import { pythonSpecializationConfigs } from './data/python-specialization-configs.mjs';
import { generateCourseBlueprint } from './lib/generate-course-blueprint.mjs';

for (const config of pythonSpecializationConfigs) {
  const result = await generateCourseBlueprint(config);
  console.log(
    `Generated ${config.id}: ${result.competencies} competencies, ${result.modules} modules, ${result.activities} activities.`
  );
}
