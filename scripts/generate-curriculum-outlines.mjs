import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const courseRoot = path.join(process.cwd(), 'content', 'v2', 'courses');

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

const courseIds = (await readdir(courseRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const courseId of courseIds) {
  const root = path.join(courseRoot, courseId);
  const course = await readJson(path.join(root, 'course.json'));
  if (course.id !== courseId) throw new Error(`Course directory mismatch: ${courseId}`);

  const modules = await Promise.all(
    course.moduleIds.map((moduleId) => readJson(path.join(root, 'modules', `${moduleId}.json`)))
  );
  const activities = [];
  for (const module of modules) {
    if (module.courseId !== courseId) throw new Error(`Module owner mismatch: ${module.id}`);
    for (const activityId of module.activityIds) {
      const activity = await readJson(path.join(root, 'activities', `${activityId}.json`));
      if (activity.courseId !== courseId || activity.moduleId !== module.id) {
        throw new Error(`Activity owner mismatch: ${activity.id}`);
      }
      activities.push({
        schemaVersion: activity.schemaVersion,
        id: activity.id,
        courseId: activity.courseId,
        moduleId: activity.moduleId,
        kind: activity.kind,
        title: activity.title,
        prerequisites: activity.prerequisites,
        estimatedMinutes: activity.estimatedMinutes,
        stepIds: activity.steps.map((step) => step.id),
      });
    }
  }

  const outline = { schemaVersion: 1, course, modules, activities };
  await writeFile(path.join(root, 'outline.json'), `${JSON.stringify(outline)}\n`);
}

console.log(`Generated verified runtime outlines for ${courseIds.length} courses.`);
