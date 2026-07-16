import { ALL_COURSES, type CourseMetadata } from './courses';

// Deny by default. Add a course only after every publication gate in AGENTS.md passes.
export const PUBLISHED_COURSE_IDS = [] as const satisfies readonly string[];

const publishedCourseIdSet = new Set<string>(PUBLISHED_COURSE_IDS);

export const PUBLISHED_COURSES: CourseMetadata[] = ALL_COURSES.filter((course) =>
  publishedCourseIdSet.has(course.id)
);

export function isPublishedCourse(courseId: string): boolean {
  return publishedCourseIdSet.has(courseId);
}
