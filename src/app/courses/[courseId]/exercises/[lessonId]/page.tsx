'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Play, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import Editor from '@monaco-editor/react';

interface TestCase {
  id: string;
  description: string;
  input?: string;
  expectedOutput?: string;
  validation?: string;
  isHidden: boolean;
}

interface ExerciseData {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  difficulty: string;
  points: number;
  language: string;
  starterCode: string;
  solution: string;
  hints: string[];
  testCases: TestCase[];
}

interface TestResult {
  testCaseId: string;
  passed: boolean;
  description: string;
  expectedOutput?: string;
  actualOutput?: string;
  errorMessage?: string;
}

interface SubmissionResult {
  success: boolean;
  score: number;
  totalTests: number;
  passedTests: number;
  results: TestResult[];
  message: string;
}

export default function ExercisePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;

  const [exercise, setExercise] = useState<ExerciseData | null>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    async function fetchExercise() {
      try {
        const response = await fetch(`/api/courses/${courseId}/exercises/${lessonId}`);
        if (response.ok) {
          const data = await response.json();
          setExercise(data);
          setCode(data.starterCode || '');
        }
      } catch (error) {
        console.error('Failed to fetch exercise:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchExercise();
  }, [courseId, lessonId]);

  const handleSubmit = async () => {
    if (!exercise) return;

    setSubmitting(true);
    setResult(null);

    try {
      const response = await fetch(`/api/courses/${courseId}/exercises/${lessonId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          exerciseId: exercise.id,
          testCases: exercise.testCases,
        }),
      });

      const data = await response.json();
      setResult(data);

      // If passed, mark lesson as complete and navigate back
      if (data.success && data.passedTests === data.totalTests) {
        setTimeout(() => {
          router.push(`/courses/${courseId}`);
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to submit exercise:', error);
      setResult({
        success: false,
        score: 0,
        totalTests: 0,
        passedTests: 0,
        results: [],
        message: 'Failed to submit exercise. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-2xl font-bold text-gray-700">Loading exercise...</div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Exercise Not Found</h1>
          <Link href={`/courses/${courseId}`} className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href={`/courses/${courseId}/lessons/${lessonId}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Lesson
            </Link>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyColors[exercise.difficulty as keyof typeof difficultyColors] || difficultyColors.beginner}`}>
                {exercise.difficulty}
              </span>
              <span className="text-sm font-semibold text-gray-700">{exercise.points} points</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Instructions */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{exercise.title}</h1>
              <p className="text-gray-700 whitespace-pre-wrap mb-6">{exercise.description}</p>

              {/* Test Cases Preview */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Test Cases</h3>
                <div className="space-y-2">
                  {exercise.testCases.filter(tc => !tc.isHidden).map((tc) => (
                    <div key={tc.id} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900">{tc.description}</p>
                      {tc.input && (
                        <p className="text-xs text-gray-600 mt-1">
                          <span className="font-semibold">Input:</span> {tc.input}
                        </p>
                      )}
                      {tc.expectedOutput && (
                        <p className="text-xs text-gray-600 mt-1">
                          <span className="font-semibold">Expected:</span> {tc.expectedOutput}
                        </p>
                      )}
                    </div>
                  ))}
                  {exercise.testCases.some(tc => tc.isHidden) && (
                    <p className="text-sm text-gray-500 italic">
                      + {exercise.testCases.filter(tc => tc.isHidden).length} hidden test case(s)
                    </p>
                  )}
                </div>
              </div>

              {/* Hints */}
              {exercise.hints && exercise.hints.length > 0 && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-3"
                  >
                    <AlertCircle className="h-5 w-5 mr-2" />
                    {showHints ? 'Hide' : 'Show'} Hints ({exercise.hints.length})
                  </button>
                  {showHints && (
                    <ul className="space-y-2">
                      {exercise.hints.map((hint, index) => (
                        <li key={index} className="text-sm text-gray-700 p-3 bg-blue-50 rounded-lg">
                          {hint}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Results */}
            {result && (
              <div className={`rounded-2xl shadow-xl p-6 ${result.success && result.passedTests === result.totalTests ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-start mb-4">
                  {result.success && result.passedTests === result.totalTests ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {result.success && result.passedTests === result.totalTests ? 'All Tests Passed! 🎉' : 'Some Tests Failed'}
                    </h3>
                    <p className="text-gray-700 mb-2">{result.message}</p>
                    <p className="text-sm font-semibold text-gray-700">
                      Score: {result.passedTests} / {result.totalTests} tests passed
                    </p>
                  </div>
                </div>

                {/* Test Results */}
                <div className="space-y-2 mt-4">
                  {result.results.map((testResult) => (
                    <div
                      key={testResult.testCaseId}
                      className={`p-3 rounded-lg ${testResult.passed ? 'bg-green-100' : 'bg-red-100'}`}
                    >
                      <div className="flex items-start">
                        {testResult.passed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{testResult.description}</p>
                          {!testResult.passed && (
                            <>
                              {testResult.expectedOutput && (
                                <p className="text-xs text-gray-700 mt-1">
                                  <span className="font-semibold">Expected:</span> {testResult.expectedOutput}
                                </p>
                              )}
                              {testResult.actualOutput && (
                                <p className="text-xs text-gray-700 mt-1">
                                  <span className="font-semibold">Got:</span> {testResult.actualOutput}
                                </p>
                              )}
                              {testResult.errorMessage && (
                                <p className="text-xs text-red-700 mt-1 font-mono">{testResult.errorMessage}</p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Code Editor */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-white shadow-xl overflow-hidden">
              <div className="bg-gray-900 p-4 flex items-center justify-between">
                <h3 className="text-white font-semibold">Code Editor</h3>
                <span className="text-gray-400 text-sm">{exercise.language}</span>
              </div>
              <Editor
                height="600px"
                language={exercise.language}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 4,
                  wordWrap: 'on',
                }}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting || !code.trim()}
              className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg transition-all hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Submit Solution
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
