import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadCurriculumCourse, loadCurriculumOutline } from './repository';

const courseRoot = path.join(process.cwd(), 'content', 'v2', 'courses');
const courseIds = readdirSync(courseRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

function readJson(filePath: string): Record<string, unknown> {
  return JSON.parse(readFileSync(filePath, 'utf8')) as Record<string, unknown>;
}

describe('generated curriculum outlines', () => {
  it('match every ordered module, activity, and step in all courses', () => {
    expect(courseIds).toHaveLength(54);
    for (const courseId of courseIds) {
      const root = path.join(courseRoot, courseId);
      const outline = loadCurriculumOutline(courseId);
      const course = loadCurriculumCourse(courseId);
      expect(outline.course).toEqual(course);
      expect(outline.modules.map((module) => module.id)).toEqual(course.moduleIds);

      const expectedActivities = outline.modules.flatMap((module) =>
        module.activityIds.map((activityId) => {
          const activity = readJson(path.join(root, 'activities', `${activityId}.json`));
          const steps = activity.steps as Array<{ id: string }>;
          return {
            schemaVersion: activity.schemaVersion,
            id: activity.id,
            courseId: activity.courseId,
            moduleId: activity.moduleId,
            kind: activity.kind,
            title: activity.title,
            prerequisites: activity.prerequisites,
            estimatedMinutes: activity.estimatedMinutes,
            stepIds: steps.map((step) => step.id),
          };
        })
      );
      expect(outline.activities).toEqual(expectedActivities);
    }
  }, 30_000);
});
