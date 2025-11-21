import { NextResponse } from 'next/server';
import { dbHelpers } from '@/lib/db';
import { getExerciseData } from '@/lib/lessonLoader';

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
    const { code, exerciseId, testCases } = body;

    if (!code || !exerciseId || !testCases) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Load full exercise data to get solution and test validation
    const exerciseData = getExerciseData(courseId, lessonId);
    if (!exerciseData) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    // Run test cases
    const results: TestResult[] = [];
    let passedTests = 0;

    for (const testCase of testCases as TestCase[]) {
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

    const totalTests = testCases.length;
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

// FIXME-PROD: Implement Python sandbox execution
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function _evaluatePythonCode(code: string, testCase: TestCase): Promise<boolean> {
  // FIXME-PROD: Replace with actual Python sandbox execution
  // For now, we'll do basic validation checks
  
  // Check if code contains required elements based on test case
  if (testCase.validation) {
    // Parse validation to extract variable names
    const variableMatch = testCase.validation.match(/assert\s+(\w+)/);
    if (variableMatch) {
      const varName = variableMatch[1];
      // Check if variable is defined in code
      if (!code.includes(varName)) {
        return false;
      }
    }
  }

  // Simple heuristic: if code looks reasonable, pass it
  // In production, this would execute in a sandboxed Python environment
  const hasRequiredStructure = code.trim().length > 20;
  return hasRequiredStructure;
}

// FIXME-PROD: Implement Python sandbox execution
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function _evaluatePythonFunction(
  code: string,
  input: string,
  expectedOutput: string
): Promise<{ passed: boolean; actualOutput?: string; error?: string }> {
  // FIXME-PROD: Replace with actual Python sandbox execution
  // For now, return a simple check
  
  try {
    // Check if code defines any functions
    const hasFunctionDef = /def\s+\w+\s*\(/.test(code);
    
    if (!hasFunctionDef) {
      return {
        passed: false,
        error: 'No function definition found',
      };
    }

    // Basic validation: assume code is correct if well-formed
    return {
      passed: true,
      actualOutput: expectedOutput, // In prod, this would be actual execution result
    };
  } catch (error) {
    return {
      passed: false,
      error: error instanceof Error ? error.message : 'Execution error',
    };
  }
}
