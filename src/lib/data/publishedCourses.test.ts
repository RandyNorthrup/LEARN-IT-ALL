import { describe, expect, it } from 'vitest';
import { isPublishedCourse, PUBLISHED_COURSE_IDS, PUBLISHED_COURSES } from './publishedCourses';
import { PUBLISHED_LEARNING_TRACKS } from './tracks';

describe('curriculum publication gate', () => {
  it('publishes no audit-required generated course or dependent path', () => {
    expect(PUBLISHED_COURSE_IDS).toEqual([]);
    expect(PUBLISHED_COURSES).toEqual([]);
    expect(PUBLISHED_LEARNING_TRACKS).toEqual([]);
    expect(isPublishedCourse('responsive-web-design')).toBe(false);
  });

  it('keeps the publication manifest unique', () => {
    expect(new Set(PUBLISHED_COURSE_IDS).size).toBe(PUBLISHED_COURSE_IDS.length);
  });
});
