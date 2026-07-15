import { coreLanguageConfigs } from './data/core-language-configs.mjs';
import { generateCourseBlueprint } from './lib/generate-course-blueprint.mjs';

for (const config of coreLanguageConfigs) {
  const result = await generateCourseBlueprint(config);
  console.log(
    `Generated ${config.id}: ${result.competencies} competencies, ${result.modules} modules, ${result.activities} activities.`
  );
}
