import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import {
  auditLearningActivity,
  type LearningQualityIssue,
  summarizeLearningQuality,
} from '../src/core/curriculum/learningQualityAudit';
import { CurriculumActivitySchema } from '../src/core/curriculum/schema';

const courseRoot = path.join(process.cwd(), 'content', 'v2', 'courses');
const courseIds = readdirSync(courseRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const reportOnly = process.argv.includes('--report-only');
const catalogIssues: LearningQualityIssue[] = [];
const courses = [];

for (const courseId of courseIds) {
  const activityRoot = path.join(courseRoot, courseId, 'activities');
  const activities = readdirSync(activityRoot)
    .filter((entry) => entry.endsWith('.json'))
    .sort()
    .map((fileName) =>
      CurriculumActivitySchema.parse(
        JSON.parse(readFileSync(path.join(activityRoot, fileName), 'utf8'))
      )
    );
  const issues = activities.flatMap(auditLearningActivity);
  catalogIssues.push(...issues);
  courses.push({
    courseId,
    ...summarizeLearningQuality(activities, issues),
  });
}

const issueCounts: Record<string, number> = {};
for (const issue of catalogIssues) issueCounts[issue.code] = (issueCounts[issue.code] ?? 0) + 1;
const result = {
  reviewed: '2026-07-15',
  passed: catalogIssues.every((issue) => issue.severity !== 'blocker'),
  courseCount: courseIds.length,
  activityCount: courses.reduce((total, course) => total + course.activityCount, 0),
  affectedCourseCount: courses.filter((course) => course.blockerCount + course.warningCount > 0)
    .length,
  affectedActivityCount: courses.reduce((total, course) => total + course.affectedActivityCount, 0),
  blockerCount: catalogIssues.filter((issue) => issue.severity === 'blocker').length,
  warningCount: catalogIssues.filter((issue) => issue.severity === 'warning').length,
  issueCounts,
  courses,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (!reportOnly && !result.passed) process.exitCode = 1;
