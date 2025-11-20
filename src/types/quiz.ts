// Quiz Type Definitions
// Supports multiple question types: multiple choice, multiple select, true/false, code completion, coding exercise, and multi-part

export interface QuizOption {
  id: string;
  text: string;
}

// Base question interface
export interface BaseQuestion {
  id: string;
  question: string;
  points: number;
  explanation?: string;
}

// Multiple choice question (single answer)
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: QuizOption[];
  correctAnswer: string; // option id
}

// Multiple select question (multiple answers)
export interface MultipleSelectQuestion extends BaseQuestion {
  type: 'multiple-select';
  options: QuizOption[];
  correctAnswers: string[]; // array of option ids
}

// True/False question
export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

// Code completion question (fill in the blank with code)
export interface CodeCompletionQuestion extends BaseQuestion {
  type: 'code-completion';
  starterCode: string;
  correctAnswer: string;
  acceptableAnswers?: string[]; // alternative correct answers
  language?: string;
}

// Coding exercise question (write full code with test cases)
export interface CodingExerciseQuestion extends BaseQuestion {
  type: 'coding-exercise';
  description: string;
  starterCode: string;
  language: string;
  testCases: TestCase[];
  hints?: string[];
}

export interface TestCase {
  id: string;
  description: string;
  input?: string;
  expectedOutput?: string;
  validation?: string;
  isHidden: boolean;
}

// Multi-part question (combination of sub-questions)
export interface MultiPartQuestion extends BaseQuestion {
  type: 'multi-part';
  parts: QuizQuestion[]; // can contain any question type except multi-part
}

// Union type for all question types
export type QuizQuestion =
  | MultipleChoiceQuestion
  | MultipleSelectQuestion
  | TrueFalseQuestion
  | CodeCompletionQuestion
  | CodingExerciseQuestion
  | MultiPartQuestion;

// Quiz data structure
export interface Quiz {
  id: string;
  courseId: string;
  chapterId: string;
  title: string;
  description: string;
  passingScore: number; // percentage (0-100)
  timeLimit?: number; // seconds
  questions: QuizQuestion[];
}

// User answer types
export type UserAnswer =
  | { type: 'multiple-choice'; answer: string }
  | { type: 'multiple-select'; answers: string[] }
  | { type: 'true-false'; answer: boolean }
  | { type: 'code-completion'; code: string }
  | { type: 'coding-exercise'; code: string }
  | { type: 'multi-part'; answers: UserAnswer[] };

// Quiz submission
export interface QuizSubmission {
  quizId: string;
  answers: Record<string, UserAnswer>; // questionId -> answer
  timeSpent?: number; // seconds
}

// Quiz result for individual question
export interface QuestionResult {
  questionId: string;
  correct: boolean;
  pointsEarned: number;
  pointsPossible: number;
  userAnswer: UserAnswer;
  correctAnswer?: unknown;
  explanation?: string;
  testResults?: TestResult[]; // for coding exercises
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  description: string;
  expectedOutput?: string;
  actualOutput?: string;
  errorMessage?: string;
}

// Overall quiz result
export interface QuizResult {
  quizId: string;
  passed: boolean;
  score: number; // percentage (0-100)
  pointsEarned: number;
  pointsPossible: number;
  timeSpent?: number;
  questionResults: QuestionResult[];
  passingScore: number;
}
