import type { CourseMetadata } from '@/lib/data/courses';

export interface CourseFilters {
  difficulty: string;
  type: string;
  showPlanned: boolean;
}

export function filterCourseCatalog(
  courses: CourseMetadata[],
  { difficulty, type, showPlanned }: CourseFilters
): CourseMetadata[] {
  return courses.filter((course) => {
    const matchesDifficulty = difficulty === 'all' || course.difficulty === difficulty;
    const matchesType = type === 'all' || course.type === type;
    const isVisible = showPlanned || course.status !== 'coming-soon';

    return matchesDifficulty && matchesType && isVisible;
  });
}
