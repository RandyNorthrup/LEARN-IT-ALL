import { describe, expect, it } from 'vitest';
import { buildCourseProgress } from './courseProgress';

describe('buildCourseProgress', () => {
  it('exposes only completed lessons', () => {
    expect(
      buildCourseProgress([
        { lessonId: 'lesson-1', status: 'COMPLETED' },
        { lessonId: 'lesson-2', status: 'IN_PROGRESS' },
      ])
    ).toEqual({
      completedLessons: ['lesson-1'],
      completedExercises: [],
      passedQuizzes: [],
    });
  });
});
