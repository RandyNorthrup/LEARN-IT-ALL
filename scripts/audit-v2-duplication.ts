import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import {
  type AuditableActivity,
  type AuditableProject,
  auditCurriculumDuplication,
} from '../src/core/curriculum/duplicationAudit';

const courseRoot = path.join(process.cwd(), 'content', 'v2', 'courses');
const courseIds = readdirSync(courseRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const activities: AuditableActivity[] = [];
const projects: AuditableProject[] = [];

for (const courseId of courseIds) {
  const activityRoot = path.join(courseRoot, courseId, 'activities');
  for (const fileName of readdirSync(activityRoot).filter((entry) => entry.endsWith('.json'))) {
    const activity = JSON.parse(
      readFileSync(path.join(activityRoot, fileName), 'utf8')
    ) as AuditableActivity;
    activities.push({
      id: activity.id,
      courseId: activity.courseId,
      kind: activity.kind,
      summary: activity.summary,
      objectives: activity.objectives,
      steps: activity.steps.map((step) => ({
        interaction: step.interaction,
        instruction: step.instruction,
        why: step.why,
        competencyIds: step.competencyIds,
        content: step.content?.map((block) => ({
          text: block.text,
          code: block.code,
        })),
        options: step.options?.map((option) => ({ text: option.text })),
        stimulus: step.stimulus
          ? { lines: step.stimulus.lines?.map((line) => ({ text: line.text })) }
          : undefined,
      })),
    });
  }
}

const result = auditCurriculumDuplication(activities, projects);
const defects =
  result.genericTextDefects.length +
  result.layoutDefects.length +
  result.nearDuplicateActivities.length +
  result.nearDuplicateProjects.length;
const passed = activities.length > 0 && defects === 0;
process.stdout.write(
  `${JSON.stringify(
    {
      ...result,
      passed,
      ...(activities.length === 0
        ? { blocker: 'No reviewed curriculum activities exist to audit.' }
        : {}),
    },
    null,
    2
  )}\n`
);
if (!passed) process.exitCode = 1;
