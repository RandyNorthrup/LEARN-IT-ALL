import type { CourseMetadata } from '@/lib/data/courses';

export interface CourseFilters {
  difficulty: string;
  type: string;
}

export const COURSE_CATALOG_PAGE_SIZE = 12;

export interface CourseCatalogPage {
  courses: CourseMetadata[];
  currentPage: number;
  totalPages: number;
  firstResult: number;
  lastResult: number;
}

export function filterCourseCatalog(
  courses: CourseMetadata[],
  { difficulty, type }: CourseFilters
): CourseMetadata[] {
  return courses.filter((course) => {
    const matchesDifficulty = difficulty === 'all' || course.difficulty === difficulty;
    const matchesType = type === 'all' || course.type === type;
    return matchesDifficulty && matchesType;
  });
}

export function paginateCourseCatalog(
  courses: CourseMetadata[],
  requestedPage: string | undefined,
  pageSize = COURSE_CATALOG_PAGE_SIZE
): CourseCatalogPage {
  if (!Number.isSafeInteger(pageSize) || pageSize < 1) {
    throw new RangeError('Course catalog page size must be a positive integer');
  }

  const parsedPage = Number(requestedPage);
  const normalizedPage = Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const totalPages = Math.max(1, Math.ceil(courses.length / pageSize));
  const currentPage = Math.min(normalizedPage, totalPages);
  const offset = (currentPage - 1) * pageSize;
  const pageCourses = courses.slice(offset, offset + pageSize);

  return {
    courses: pageCourses,
    currentPage,
    totalPages,
    firstResult: pageCourses.length === 0 ? 0 : offset + 1,
    lastResult: offset + pageCourses.length,
  };
}
