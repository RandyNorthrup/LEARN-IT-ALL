import { describe, expect, it } from 'vitest';
import { ALL_COURSES } from './courses';
import { LEARNING_TRACKS, orderTrackCourses } from './tracks';

describe('learning tracks', () => {
  it('expands every target to a unique prerequisite-complete sequence', () => {
    const byId = new Map(ALL_COURSES.map((course) => [course.id, course]));

    for (const track of LEARNING_TRACKS) {
      expect(new Set(track.courses).size, track.id).toBe(track.courses.length);
      const seen = new Set<string>();
      for (const courseId of track.courses) {
        const course = byId.get(courseId);
        expect(course, `${track.id}: ${courseId}`).toBeDefined();
        for (const prerequisite of course?.prerequisites ?? []) {
          expect(seen.has(prerequisite), `${track.id}: ${courseId} needs ${prerequisite}`).toBe(
            true
          );
        }
        seen.add(courseId);
      }
      const expectedHours = track.courses.reduce(
        (total, courseId) => total + (byId.get(courseId)?.estimatedHours ?? 0),
        0
      );
      expect(track.estimatedHours).toBe(Math.round(expectedHours * 10) / 10);
    }
  });

  it('rejects missing courses and prerequisite cycles', () => {
    expect(() => orderTrackCourses(['missing-course'], [])).toThrow(/missing course/);
    expect(() =>
      orderTrackCourses(
        ['course-a'],
        [
          {
            ...ALL_COURSES[0],
            id: 'course-a',
            prerequisites: ['course-b'],
          },
          {
            ...ALL_COURSES[0],
            id: 'course-b',
            prerequisites: ['course-a'],
          },
        ]
      )
    ).toThrow(/cycle/);
  });
});
