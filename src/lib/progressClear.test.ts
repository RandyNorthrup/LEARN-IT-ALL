import { describe, expect, it } from 'vitest';
import { ClearProgressRequestSchema } from './progressClear';

describe('progress clearing contract', () => {
  it('accepts only current V2 reset scopes', () => {
    expect(ClearProgressRequestSchema.safeParse({ type: 'all' }).success).toBe(true);
    expect(
      ClearProgressRequestSchema.safeParse({ type: 'course', courseId: 'python-basics' }).success
    ).toBe(true);
    expect(
      ClearProgressRequestSchema.safeParse({ type: 'activity', activityId: 'bounded-lab' }).success
    ).toBe(true);
  });

  it('rejects retired lesson, chapter, and quiz scopes plus extra fields', () => {
    for (const type of ['lesson', 'chapter', 'quiz']) {
      expect(ClearProgressRequestSchema.safeParse({ type, lessonId: 'lesson-001' }).success).toBe(
        false
      );
    }
    expect(
      ClearProgressRequestSchema.safeParse({ type: 'all', courseId: 'python-basics' }).success
    ).toBe(false);
    expect(
      ClearProgressRequestSchema.safeParse({ type: 'course', courseId: '../../database' }).success
    ).toBe(false);
  });
});
