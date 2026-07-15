export interface CourseProgress {
  completedLessons: string[];
  completedExercises: string[];
  passedQuizzes: string[];
}

export interface LessonProgressRecord {
  lessonId: string;
  status: string;
}

export function buildCourseProgress(records: LessonProgressRecord[]): CourseProgress {
  return {
    completedLessons: records
      .filter((record) => record.status === 'COMPLETED')
      .map((record) => record.lessonId),
    completedExercises: [],
    passedQuizzes: [],
  };
}
