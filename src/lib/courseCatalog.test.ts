import { describe, expect, it } from 'vitest';
import {
  COURSE_CATALOG_PAGE_SIZE,
  filterCourseCatalog,
  paginateCourseCatalog,
} from './courseCatalog';
import type { CourseMetadata } from './data/courses';

const courses: CourseMetadata[] = [
  {
    id: 'beginner-course',
    title: 'Beginner course',
    description: 'A verified beginner course.',
    difficulty: 'beginner',
    estimatedHours: 1,
    tags: [],
    prerequisites: [],
    status: 'available',
    lessonCount: 1,
    chapterCount: 1,
    type: 'course',
  },
  {
    id: 'advanced-project',
    title: 'Advanced project',
    description: 'A verified advanced project.',
    difficulty: 'advanced',
    estimatedHours: 1,
    tags: [],
    prerequisites: [],
    status: 'available',
    lessonCount: 1,
    chapterCount: 1,
    type: 'portfolio-project',
  },
];

describe('course catalog', () => {
  it('filters only the publication-controlled input it receives', () => {
    expect(
      filterCourseCatalog(courses, { difficulty: 'beginner', type: 'course' }).map(
        (course) => course.id
      )
    ).toEqual(['beginner-course']);
    expect(
      filterCourseCatalog(courses, { difficulty: 'advanced', type: 'portfolio-project' }).map(
        (course) => course.id
      )
    ).toEqual(['advanced-project']);
  });

  it('paginates without duplicates or skipped records', () => {
    const catalog = Array.from({ length: COURSE_CATALOG_PAGE_SIZE + 2 }, (_, index) => ({
      ...courses[0],
      id: `course-${index + 1}`,
    }));
    const firstPage = paginateCourseCatalog(catalog, undefined);
    const secondPage = paginateCourseCatalog(catalog, '2');

    expect(firstPage).toMatchObject({
      currentPage: 1,
      totalPages: 2,
      firstResult: 1,
      lastResult: COURSE_CATALOG_PAGE_SIZE,
    });
    expect(secondPage).toMatchObject({
      currentPage: 2,
      totalPages: 2,
      firstResult: COURSE_CATALOG_PAGE_SIZE + 1,
      lastResult: COURSE_CATALOG_PAGE_SIZE + 2,
    });
    expect([...firstPage.courses, ...secondPage.courses].map((course) => course.id)).toEqual(
      catalog.map((course) => course.id)
    );
  });

  it('normalizes invalid pages and rejects invalid page sizes', () => {
    expect(paginateCourseCatalog(courses, 'not-a-page').currentPage).toBe(1);
    expect(paginateCourseCatalog(courses, '-2').currentPage).toBe(1);
    expect(paginateCourseCatalog(courses, '99', 1).currentPage).toBe(2);
    expect(() => paginateCourseCatalog(courses, '1', 0)).toThrow(RangeError);
  });

  it('returns an honest empty page when nothing is published', () => {
    expect(paginateCourseCatalog([], undefined)).toEqual({
      courses: [],
      currentPage: 1,
      totalPages: 1,
      firstResult: 0,
      lastResult: 0,
    });
  });
});
