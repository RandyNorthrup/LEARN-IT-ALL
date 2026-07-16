export interface PublishedCourse {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language?: string;
  tags: string[];
  prerequisites: string[];
  type: 'course' | 'guided-project' | 'portfolio-project';
}

// Deny by default. Add complete metadata only after every publication gate in AGENTS.md passes.
export const PUBLISHED_COURSES = [] as readonly PublishedCourse[];
export const PUBLISHED_COURSE_IDS: readonly string[] = PUBLISHED_COURSES.map((course) => course.id);

const publishedCourseIdSet = new Set<string>(PUBLISHED_COURSE_IDS);

export function isPublishedCourse(courseId: string): boolean {
  return publishedCourseIdSet.has(courseId);
}
