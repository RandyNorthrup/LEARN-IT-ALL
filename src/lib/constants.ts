// Constants for LEARN-IT-ALL platform

// Quiz and Exercise Scoring
export const QUIZ_PASSING_SCORE_PERCENT = 70;
export const EXERCISE_MAX_ATTEMPTS = 5;

// Lesson Progression
export const LESSON_MIN_DURATION_SECONDS = 10;

// Course Completion
export const COURSE_COMPLETION_THRESHOLD_PERCENT = 100;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Validation
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 50;
export const COURSE_TITLE_MAX_LENGTH = 255;
export const LESSON_TITLE_MAX_LENGTH = 255;

// Status Messages
export const STATUS_MESSAGES = {
  LESSON_LOCKED: 'Complete the previous lesson to unlock this one',
  EXERCISE_REQUIRED: 'Complete the exercise to proceed to the next lesson',
  QUIZ_REQUIRED: 'Pass the quiz to unlock the next chapter',
  QUIZ_FAILED: 'You need 70% to pass. Review the material and try again.',
  QUIZ_PASSED: 'Congratulations! You passed the quiz!',
} as const;

// Course Status
export const COURSE_STATUS = {
  COMPLETE: 'complete',
  AVAILABLE: 'available',
  IN_PROGRESS: 'in-progress',
  COMING_SOON: 'coming-soon',
  LOCKED: 'locked',
} as const;

export type CourseStatus = typeof COURSE_STATUS[keyof typeof COURSE_STATUS];
