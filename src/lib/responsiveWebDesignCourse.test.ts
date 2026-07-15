import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import type { WebExercise } from '@/types/exercise';

const courseRoot = path.join(process.cwd(), 'content', 'courses', 'responsive-web-design');
const course = JSON.parse(readFileSync(path.join(courseRoot, 'course.json'), 'utf8')) as {
  chapters: Array<{ lessons: string[]; quizId: string }>;
  sourceCoverage: { modulesCovered: number; certificationProjects: number };
};

describe('responsive web design curriculum', () => {
  it('covers every mapped module with one distinct activity and all assessments', () => {
    const lessonIds = course.chapters.flatMap((chapter) => chapter.lessons);
    const exercises = readdirSync(path.join(courseRoot, 'exercises')).map(
      (file) =>
        JSON.parse(readFileSync(path.join(courseRoot, 'exercises', file), 'utf8')) as WebExercise
    );
    const quizzes = new Set(readdirSync(path.join(courseRoot, 'quizzes')));

    expect(course.sourceCoverage.modulesCovered).toBe(29);
    expect(lessonIds).toHaveLength(28);
    expect(new Set(lessonIds).size).toBe(28);
    expect(exercises).toHaveLength(28);
    expect(new Set(exercises.map((exercise) => exercise.lessonId)).size).toBe(28);
    expect(exercises.filter((exercise) => exercise.exerciseType === 'project')).toHaveLength(5);
    expect(course.sourceCoverage.certificationProjects).toBe(5);
    expect(course.chapters.every((chapter) => quizzes.has(`${chapter.quizId}.json`))).toBe(true);
    expect(quizzes.has('final-exam.json')).toBe(true);
  });

  it('requires meaningful, varied, server-gradable practice', () => {
    const exercises = readdirSync(path.join(courseRoot, 'exercises')).map(
      (file) =>
        JSON.parse(readFileSync(path.join(courseRoot, 'exercises', file), 'utf8')) as WebExercise
    );

    expect(exercises.every((exercise) => exercise.requirements.length >= 4)).toBe(true);
    expect(exercises.every((exercise) => exercise.hints.length >= 4)).toBe(true);
    expect(new Set(exercises.map((exercise) => exercise.starterFiles.html)).size).toBe(28);
    expect(new Set(exercises.map((exercise) => exercise.title)).size).toBe(28);
    expect(new Set(exercises.map((exercise) => exercise.exerciseType)).size).toBeGreaterThan(2);
  });
});
