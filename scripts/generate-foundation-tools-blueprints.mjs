import { foundationToolsConfigs } from './data/foundation-tools-configs.mjs';
import { generateCourseBlueprint } from './lib/generate-course-blueprint.mjs';

for (const config of foundationToolsConfigs) {
  const result = await generateCourseBlueprint(config);
  console.log(
    `Generated ${config.id}: ${result.competencies} competencies, ${result.modules} modules, ${result.activities} activities.`
  );
}
