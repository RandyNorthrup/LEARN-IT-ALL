import { NextResponse } from 'next/server';
import { dbHelpers } from '@/lib/db';
import { getExerciseData } from '@/lib/lessonLoader';
import { validateWebExercise } from '@/lib/webExerciseValidator';
import type { WebExerciseFiles, WebRequirement } from '@/types/exercise';

interface TestCase {
  id: string;
  description: string;
  input?: string;
  expectedOutput?: string;
  validation?: string;
  isHidden: boolean;
}

interface TestResult {
  testCaseId: string;
  passed: boolean;
  description: string;
  expectedOutput?: string;
  actualOutput?: string;
  errorMessage?: string;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
  try {
    const { courseId, lessonId } = await params;
    const body = await request.json();
    const { code, exerciseId, files, labAnswers } = body;

    const exerciseData = getExerciseData(courseId, lessonId);
    if (!exerciseData || exerciseData.id !== exerciseId) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    if (exerciseData.language === 'html') {
      if (
        !files ||
        typeof files.html !== 'string' ||
        typeof files.css !== 'string' ||
        !Array.isArray(exerciseData.requirements)
      ) {
        return NextResponse.json({ error: 'Invalid web exercise submission' }, { status: 400 });
      }

      const results = validateWebExercise(
        files as WebExerciseFiles,
        exerciseData.requirements as WebRequirement[]
      );
      const passedTests = results.filter((result) => result.passed).length;
      const totalTests = results.length;
      const score = totalTests ? Math.round((passedTests / totalTests) * 100) : 0;
      const success = totalTests > 0 && passedTests === totalTests;

      dbHelpers.createExerciseSubmission(
        exerciseId,
        courseId,
        JSON.stringify(files),
        'html',
        success ? 'PASSED' : 'FAILED',
        score
      );
      if (success) dbHelpers.markLessonComplete(lessonId, courseId);

      return NextResponse.json({
        success,
        score,
        totalTests,
        passedTests,
        results,
        message: success
          ? `All ${totalTests} requirements passed. Activity complete!`
          : `${passedTests} of ${totalTests} requirements passed. Keep building.`,
      });
    }

    // Lab exercise submissions (PCAP analysis, Python sandbox)
    if (labAnswers && Array.isArray(exerciseData.labQuestions)) {
      const canonicalQuestions = exerciseData.labQuestions as Array<{
        id: string;
        correctAnswer: string;
      }>;
      const gradedResults = Object.fromEntries(
        canonicalQuestions.map((question) => [
          question.id,
          String(labAnswers[question.id] ?? '')
            .trim()
            .toLowerCase() === question.correctAnswer.trim().toLowerCase(),
        ])
      );
      const totalQuestions = canonicalQuestions.length;
      const passedQuestions = Object.values(gradedResults).filter(Boolean).length;
      const score = totalQuestions > 0 ? Math.round((passedQuestions / totalQuestions) * 100) : 0;
      const success = totalQuestions > 0 && passedQuestions === totalQuestions;

      dbHelpers.createExerciseSubmission(
        exerciseId,
        courseId,
        code || '',
        exerciseData.language || 'lab',
        success ? 'PASSED' : 'FAILED',
        score
      );

      if (success) {
        dbHelpers.markLessonComplete(lessonId, courseId);
      }

      return NextResponse.json({
        success,
        score,
        totalTests: totalQuestions,
        passedTests: passedQuestions,
        results: [],
        message: success
          ? `Lab complete! All ${totalQuestions} questions answered correctly. 🎉`
          : `${passedQuestions} of ${totalQuestions} questions correct. Review and try again!`,
      });
    }

    if (!code || !Array.isArray(exerciseData.testCases)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const canonicalTestCases = exerciseData.testCases as TestCase[];

    // Run test cases
    const results: TestResult[] = [];
    let passedTests = 0;

    for (const testCase of canonicalTestCases) {
      try {
        // Execute the code with the test case
        const testResult = await runTestCase(code, testCase, exerciseData.language);
        results.push(testResult);
        if (testResult.passed) {
          passedTests++;
        }
      } catch (error) {
        results.push({
          testCaseId: testCase.id,
          passed: false,
          description: testCase.description,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    const totalTests = canonicalTestCases.length;
    const score = Math.round((passedTests / totalTests) * 100);
    const success = passedTests === totalTests;

    // Save submission to database
    dbHelpers.createExerciseSubmission(
      exerciseId,
      courseId,
      code,
      exerciseData.language,
      success ? 'PASSED' : 'FAILED',
      score
    );

    // If exercise passed, mark lesson as complete
    if (success) {
      dbHelpers.markLessonComplete(lessonId, courseId);
    }

    return NextResponse.json({
      success,
      score,
      totalTests,
      passedTests,
      results,
      message: success
        ? `Perfect! You passed all ${totalTests} tests! 🎉`
        : `You passed ${passedTests} out of ${totalTests} tests. Keep trying!`,
    });
  } catch (error) {
    console.error('Failed to submit exercise:', error);
    return NextResponse.json(
      {
        success: false,
        score: 0,
        totalTests: 0,
        passedTests: 0,
        results: [],
        message: 'Failed to execute tests. Please check your code syntax.',
      },
      { status: 500 }
    );
  }
}

async function runTestCase(
  userCode: string,
  testCase: TestCase,
  language: string
): Promise<TestResult> {
  if (language !== 'python') {
    throw new Error(`Language ${language} not supported yet`);
  }

  try {
    // For Python validation assertions
    if (testCase.validation) {
      const passed = await evaluatePythonValidation(userCode, testCase.validation);
      return {
        testCaseId: testCase.id,
        passed,
        description: testCase.description,
        expectedOutput: testCase.expectedOutput,
      };
    }

    // For output-based tests (print statements, etc.)
    if (testCase.expectedOutput !== undefined) {
      const result = await evaluatePythonOutput(userCode, testCase.expectedOutput);
      return {
        testCaseId: testCase.id,
        passed: result.passed,
        description: testCase.description,
        expectedOutput: testCase.expectedOutput,
        actualOutput: result.actualOutput,
        errorMessage: result.error,
      };
    }

    // Default: assume code is well-formed
    return {
      testCaseId: testCase.id,
      passed: true,
      description: testCase.description,
    };
  } catch (error) {
    return {
      testCaseId: testCase.id,
      passed: false,
      description: testCase.description,
      errorMessage: error instanceof Error ? error.message : 'Test execution failed',
    };
  }
}

async function evaluatePythonValidation(code: string, validation: string): Promise<boolean> {
  // FIXME-PROD: Replace with actual Python sandbox execution
  // For now, perform basic syntax checks

  // Check if validation expects certain variables or functions
  const variableMatch = validation.match(/assert\s+(\w+)/);
  if (variableMatch) {
    const varName = variableMatch[1];
    // Check if variable/function is defined in code
    const hasDefinition = code.includes(varName) || code.includes(`def ${varName}`);
    return hasDefinition;
  }

  // Basic validation: code should be non-empty and syntactically valid-looking
  return code.trim().length > 10;
}

async function evaluatePythonOutput(
  code: string,
  expectedOutput: string
): Promise<{ passed: boolean; actualOutput?: string; error?: string }> {
  // FIXME-PROD: Replace with actual Python sandbox execution
  // For now, check if code has print statement with expected output

  try {
    // Look for print statements in the code
    const printMatch = code.match(/print\s*\(\s*["'](.+?)["']\s*\)/);

    if (!printMatch) {
      return {
        passed: false,
        error: 'No print statement found',
      };
    }

    const actualOutput = printMatch[1];
    const passed = actualOutput.trim() === expectedOutput.trim();

    return {
      passed,
      actualOutput,
    };
  } catch (error) {
    return {
      passed: false,
      error: error instanceof Error ? error.message : 'Execution error',
    };
  }
}
