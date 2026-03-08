'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Play, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import dynamic from 'next/dynamic';
import type { PcapData } from '@/components/PcapViewer';

// Dynamic imports for lab components (heavy dependencies)
const PcapViewer = dynamic(() => import('@/components/PcapViewer'), { ssr: false });
const PyodideSandbox = dynamic(() => import('@/components/PyodideSandbox'), { ssr: false });

interface TestCase {
  id: string;
  description: string;
  input?: string;
  expectedOutput?: string;
  validation?: string;
  testCode?: string; // for Pyodide test cases
  isHidden: boolean;
}

interface LabResource {
  type: 'pcap' | 'topology' | 'data';
  url: string;
  label?: string;
}

interface LabEnvironment {
  runtime?: 'pyodide';
  preloadModules?: string[];
  setupCode?: string;
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
  // Lab exercise extensions
  exerciseType?: 'standard' | 'lab';
  labType?: 'pcap-analysis' | 'python-sandbox' | 'cli-simulation';
  resources?: LabResource[];
  environment?: LabEnvironment;
  labQuestions?: LabQuestion[];
}

interface LabQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'short-answer';
  options?: string[];
  correctAnswer: string;
  hint?: string;
  relatedPackets?: number[]; // packet numbers to highlight in PCAP viewer
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
  const [pcapData, setPcapData] = useState<PcapData | null>(null);
  const [labAnswers, setLabAnswers] = useState<Record<string, string>>({});
  const [labResults, setLabResults] = useState<Record<string, boolean> | null>(null);

  useEffect(() => {
    async function fetchExercise() {
      try {
        const response = await fetch(`/api/courses/${courseId}/exercises/${lessonId}`);
        if (response.ok) {
          const data = await response.json();
          setExercise(data);
          setCode(data.starterCode || '');

          // If this is a PCAP lab, fetch the PCAP data
          if (data.labType === 'pcap-analysis' && data.resources) {
            const pcapResource = data.resources.find((r: LabResource) => r.type === 'pcap');
            if (pcapResource) {
              try {
                const pcapResponse = await fetch(pcapResource.url);
                if (pcapResponse.ok) {
                  const pcap = await pcapResponse.json();
                  setPcapData(pcap);
                }
              } catch (err) {
                console.error('Failed to load PCAP data:', err);
              }
            }
          }
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

  // Handle PCAP lab question submission (client-side grading)
  const handleLabSubmit = () => {
    if (!exercise?.labQuestions) return;
    const results: Record<string, boolean> = {};
    let correct = 0;
    for (const q of exercise.labQuestions) {
      const answer = labAnswers[q.id]?.trim().toLowerCase();
      const expected = q.correctAnswer.trim().toLowerCase();
      const passed = answer === expected;
      results[q.id] = passed;
      if (passed) correct++;
    }
    setLabResults(results);

    // Submit to API for persistence
    if (correct === exercise.labQuestions.length) {
      fetch(`/api/courses/${courseId}/exercises/${lessonId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: JSON.stringify(labAnswers),
          exerciseId: exercise.id,
          testCases: [],
          labResults: results,
          allPassed: true,
        }),
      }).catch(() => {});
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
        {/* Lab Exercise Layout */}
        {exercise.labType === 'pcap-analysis' ? (
          <div className="space-y-6">
            {/* Lab Title & Description */}
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-xs font-bold">PCAP LAB</span>
                <h1 className="text-2xl font-bold text-gray-900">{exercise.title}</h1>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{exercise.description}</p>
            </div>

            {/* PCAP Viewer */}
            {pcapData ? (
              <PcapViewer
                data={pcapData}
                highlightPackets={exercise.labQuestions?.flatMap((q) => q.relatedPackets || []) || []}
              />
            ) : (
              <div className="rounded-2xl bg-white shadow-xl p-6 text-center text-gray-500">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                Loading packet capture...
              </div>
            )}

            {/* Lab Questions */}
            {exercise.labQuestions && exercise.labQuestions.length > 0 && (
              <div className="rounded-2xl bg-white shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Analysis Questions</h3>
                <div className="space-y-4">
                  {exercise.labQuestions.map((q, idx) => (
                    <div key={q.id} className={`p-4 rounded-lg border ${labResults ? (labResults[q.id] ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50') : 'border-gray-200 bg-gray-50'}`}>
                      <p className="font-semibold text-gray-900 mb-2">
                        {idx + 1}. {q.question}
                        {q.relatedPackets && q.relatedPackets.length > 0 && (
                          <span className="text-xs text-gray-400 ml-2">(See packet{q.relatedPackets.length > 1 ? 's' : ''} #{q.relatedPackets.join(', #')})</span>
                        )}
                      </p>
                      {q.type === 'multiple-choice' && q.options ? (
                        <div className="space-y-1.5">
                          {q.options.map((opt, oi) => (
                            <label key={oi} className="flex items-center gap-2 text-sm cursor-pointer">
                              <input
                                type="radio"
                                name={q.id}
                                value={opt}
                                checked={labAnswers[q.id] === opt}
                                onChange={() => setLabAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                                disabled={!!labResults}
                                className="text-blue-600"
                              />
                              <span className="text-gray-800">{opt}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={labAnswers[q.id] || ''}
                          onChange={(e) => setLabAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                          disabled={!!labResults}
                          placeholder="Your answer..."
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                        />
                      )}
                      {labResults && !labResults[q.id] && (
                        <p className="text-xs text-red-600 mt-1">Correct answer: {q.correctAnswer}</p>
                      )}
                      {labResults && labResults[q.id] && (
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Correct
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                {!labResults && (
                  <button
                    onClick={handleLabSubmit}
                    className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold transition-all hover:from-indigo-700 hover:to-blue-700 shadow-lg"
                  >
                    Submit Answers
                  </button>
                )}
                {labResults && (
                  <div className={`mt-4 p-3 rounded-lg ${Object.values(labResults).every(Boolean) ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    <p className="font-semibold text-gray-900">
                      Score: {Object.values(labResults).filter(Boolean).length}/{Object.values(labResults).length}
                      {Object.values(labResults).every(Boolean) && ' 🎉 Perfect!'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

        ) : exercise.labType === 'python-sandbox' ? (
          <div className="space-y-6">
            {/* Lab Title & Description */}
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-bold">PYTHON LAB</span>
                <h1 className="text-2xl font-bold text-gray-900">{exercise.title}</h1>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{exercise.description}</p>
              {/* Hints for Python labs */}
              {exercise.hints && exercise.hints.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {showHints ? 'Hide' : 'Show'} Hints ({exercise.hints.length})
                  </button>
                  {showHints && (
                    <ul className="mt-2 space-y-1">
                      {exercise.hints.map((hint) => (
                        <li key={hint} className="text-sm text-gray-700 p-2 bg-blue-50 rounded">
                          {hint}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Pyodide Sandbox */}
            <PyodideSandbox
              starterCode={exercise.starterCode}
              testCases={exercise.testCases
                .filter((tc) => tc.testCode)
                .map((tc) => ({
                  id: tc.id,
                  description: tc.description,
                  testCode: tc.testCode!,
                  hidden: tc.isHidden,
                }))}
              preloadModules={exercise.environment?.preloadModules || []}
              setupCode={exercise.environment?.setupCode || ''}
              onResults={(results, allPassed) => {
                if (allPassed) {
                  fetch(`/api/courses/${courseId}/exercises/${lessonId}/submit`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      code: exercise.starterCode,
                      exerciseId: exercise.id,
                      testCases: [],
                      labResults: Object.fromEntries(results.map((r) => [r.id, r.passed])),
                      allPassed: true,
                    }),
                  }).catch(() => {});
                }
              }}
            />
          </div>

        ) : (
        /* Standard Exercise Layout */
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
                      {exercise.hints.map((hint) => (
                        <li key={hint} className="text-sm text-gray-700 p-3 bg-blue-50 rounded-lg">
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
        )}
      </main>
    </div>
  );
}
