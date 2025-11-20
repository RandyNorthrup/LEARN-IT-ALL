import { NextRequest, NextResponse } from 'next/server';
import { getQuizData } from '@/lib/lessonLoader';
import { createQuizAttempt } from '@/lib/db';
import {
  Quiz,
  QuizSubmission,
  QuizResult,
  QuestionResult,
  UserAnswer,
  MultipleChoiceQuestion,
  MultipleSelectQuestion,
  TrueFalseQuestion,
  CodeCompletionQuestion,
  CodingExerciseQuestion,
  MultiPartQuestion,
  TestResult,
} from '@/types/quiz';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ courseId: string; quizId: string }> }
) {
  try {
    const { courseId, quizId } = await context.params;
    const submission: QuizSubmission = await request.json();

    // Load quiz data
    const quiz = await getQuizData(courseId, quizId);
    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    // Grade the quiz
    const result = gradeQuiz(quiz, submission);

    // Save to database
    await createQuizAttempt(
      quizId,
      courseId,
      submission.answers,
      result.passed,
      result.score,
      result.pointsEarned,
      result.pointsPossible,
      submission.timeSpent
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json({ error: 'Failed to submit quiz' }, { status: 500 });
  }
}

// Grade quiz submission
function gradeQuiz(quiz: Quiz, submission: QuizSubmission): QuizResult {
  const questionResults: QuestionResult[] = [];
  let totalPointsEarned = 0;
  let totalPointsPossible = 0;

  for (const question of quiz.questions) {
    const userAnswer = submission.answers[question.id];
    totalPointsPossible += question.points;

    if (!userAnswer) {
      questionResults.push({
        questionId: question.id,
        correct: false,
        pointsEarned: 0,
        pointsPossible: question.points,
        userAnswer: { type: question.type } as UserAnswer,
        explanation: question.explanation,
      });
      continue;
    }

    const result = gradeQuestion(question, userAnswer);
    questionResults.push({
      ...result,
      questionId: question.id,
      pointsPossible: question.points,
      explanation: question.explanation,
    });

    if (result.correct) {
      totalPointsEarned += result.pointsEarned;
    }
  }

  const score = totalPointsPossible > 0 ? Math.round((totalPointsEarned / totalPointsPossible) * 100) : 0;
  const passed = score >= quiz.passingScore;

  return {
    quizId: quiz.id,
    passed,
    score,
    pointsEarned: totalPointsEarned,
    pointsPossible: totalPointsPossible,
    timeSpent: submission.timeSpent,
    questionResults,
    passingScore: quiz.passingScore,
  };
}

// Grade individual question
function gradeQuestion(
  question: Quiz['questions'][0],
  userAnswer: UserAnswer
): Omit<QuestionResult, 'questionId' | 'pointsPossible' | 'explanation'> {
  switch (question.type) {
    case 'multiple-choice':
      return gradeMultipleChoice(question as MultipleChoiceQuestion, userAnswer);
    case 'multiple-select':
      return gradeMultipleSelect(question as MultipleSelectQuestion, userAnswer);
    case 'true-false':
      return gradeTrueFalse(question as TrueFalseQuestion, userAnswer);
    case 'code-completion':
      return gradeCodeCompletion(question as CodeCompletionQuestion, userAnswer);
    case 'coding-exercise':
      return gradeCodingExercise(question as CodingExerciseQuestion, userAnswer);
    case 'multi-part':
      return gradeMultiPart(question as MultiPartQuestion, userAnswer);
    default:
      return {
        correct: false,
        pointsEarned: 0,
        userAnswer,
      };
  }
}

function gradeMultipleChoice(
  question: MultipleChoiceQuestion,
  userAnswer: UserAnswer
): Omit<QuestionResult, 'questionId' | 'pointsPossible' | 'explanation'> {
  if (userAnswer.type !== 'multiple-choice') {
    return { correct: false, pointsEarned: 0, userAnswer };
  }

  const correct = userAnswer.answer === question.correctAnswer;
  return {
    correct,
    pointsEarned: correct ? question.points : 0,
    userAnswer,
    correctAnswer: question.correctAnswer,
  };
}

function gradeMultipleSelect(
  question: MultipleSelectQuestion,
  userAnswer: UserAnswer
): Omit<QuestionResult, 'questionId' | 'pointsPossible' | 'explanation'> {
  if (userAnswer.type !== 'multiple-select') {
    return { correct: false, pointsEarned: 0, userAnswer };
  }

  const sortedUserAnswers = [...userAnswer.answers].sort();
  const sortedCorrectAnswers = [...question.correctAnswers].sort();
  const correct = JSON.stringify(sortedUserAnswers) === JSON.stringify(sortedCorrectAnswers);

  return {
    correct,
    pointsEarned: correct ? question.points : 0,
    userAnswer,
    correctAnswer: question.correctAnswers,
  };
}

function gradeTrueFalse(
  question: TrueFalseQuestion,
  userAnswer: UserAnswer
): Omit<QuestionResult, 'questionId' | 'pointsPossible' | 'explanation'> {
  if (userAnswer.type !== 'true-false') {
    return { correct: false, pointsEarned: 0, userAnswer };
  }

  const correct = userAnswer.answer === question.correctAnswer;
  return {
    correct,
    pointsEarned: correct ? question.points : 0,
    userAnswer,
    correctAnswer: question.correctAnswer,
  };
}

function gradeCodeCompletion(
  question: CodeCompletionQuestion,
  userAnswer: UserAnswer
): Omit<QuestionResult, 'questionId' | 'pointsPossible' | 'explanation'> {
  if (userAnswer.type !== 'code-completion') {
    return { correct: false, pointsEarned: 0, userAnswer };
  }

  const normalizeCode = (code: string) => code.replace(/\s+/g, ' ').trim();
  const userCode = normalizeCode(userAnswer.code);

  // Check if matches correct answer or any acceptable answer
  const acceptable = question.acceptableAnswers || [question.correctAnswer];
  const correct = acceptable.some((ans) => normalizeCode(ans) === userCode);

  return {
    correct,
    pointsEarned: correct ? question.points : 0,
    userAnswer,
    correctAnswer: question.correctAnswer,
  };
}

function gradeCodingExercise(
  question: CodingExerciseQuestion,
  userAnswer: UserAnswer
): Omit<QuestionResult, 'questionId' | 'pointsPossible' | 'explanation'> {
  if (userAnswer.type !== 'coding-exercise') {
    return { correct: false, pointsEarned: 0, userAnswer };
  }

  // Run test cases (same logic as exercise submission)
  const testResults: TestResult[] = [];
  let passedCount = 0;

  for (const testCase of question.testCases) {
    const result = runTestCase(userAnswer.code, testCase);
    testResults.push(result);
    if (result.passed) passedCount++;
  }

  const allPassed = passedCount === question.testCases.length;
  const partialCredit = question.testCases.length > 0 
    ? (passedCount / question.testCases.length) * question.points 
    : 0;

  return {
    correct: allPassed,
    pointsEarned: Math.floor(partialCredit),
    userAnswer,
    testResults,
  };
}

function gradeMultiPart(
  question: MultiPartQuestion,
  userAnswer: UserAnswer
): Omit<QuestionResult, 'questionId' | 'pointsPossible' | 'explanation'> {
  if (userAnswer.type !== 'multi-part') {
    return { correct: false, pointsEarned: 0, userAnswer };
  }

  let totalEarned = 0;
  let allCorrect = true;

  question.parts.forEach((part, idx) => {
    const partAnswer = userAnswer.answers[idx];
    if (!partAnswer) {
      allCorrect = false;
      return;
    }

    const result = gradeQuestion(part, partAnswer);
    totalEarned += result.pointsEarned;
    if (!result.correct) allCorrect = false;
  });

  return {
    correct: allCorrect,
    pointsEarned: totalEarned,
    userAnswer,
  };
}

// FIXME-PROD: Replace with actual Python sandbox execution
function runTestCase(
  code: string,
  testCase: { id: string; description: string; validation?: string; expectedOutput?: string }
): TestResult {
  // Mock validation - same as exercise submission
  if (testCase.validation) {
    const passed = evaluatePythonValidation(code, testCase.validation);
    return {
      testCaseId: testCase.id,
      passed,
      description: testCase.description,
      expectedOutput: testCase.validation,
      actualOutput: passed ? testCase.validation : 'Not found',
    };
  }

  if (testCase.expectedOutput) {
    const result = evaluatePythonOutput(code, testCase.expectedOutput);
    return {
      testCaseId: testCase.id,
      passed: result.passed,
      description: testCase.description,
      expectedOutput: testCase.expectedOutput,
      actualOutput: result.actualOutput,
    };
  }

  return {
    testCaseId: testCase.id,
    passed: false,
    description: testCase.description,
    errorMessage: 'Invalid test case format',
  };
}

function evaluatePythonValidation(code: string, validation: string): boolean {
  const match = validation.match(/(\w+)\s*==\s*(.+)/);
  if (match) {
    const [, varName, expectedValue] = match;
    const regex = new RegExp(`${varName}\\s*=\\s*${expectedValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
    return regex.test(code);
  }
  return false;
}

function evaluatePythonOutput(code: string, expectedOutput: string): { passed: boolean; actualOutput: string } {
  const printMatch = code.match(/print\s*\(\s*["'](.+?)["']\s*\)/);
  if (printMatch) {
    const actualOutput = printMatch[1];
    return {
      passed: actualOutput.trim() === expectedOutput.trim(),
      actualOutput,
    };
  }
  return { passed: false, actualOutput: 'No output' };
}
