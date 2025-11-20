'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  HelpCircle,
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import {
  Quiz,
  QuizQuestion,
  UserAnswer,
  QuizResult,
  MultipleChoiceQuestion,
  MultipleSelectQuestion,
  TrueFalseQuestion,
  CodeCompletionQuestion,
  CodingExerciseQuestion,
  MultiPartQuestion,
} from '@/types/quiz';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const quizId = params.quizId as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [startTime] = useState(Date.now());
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  // Load quiz data
  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await fetch(`/api/courses/${courseId}/quizzes/${quizId}`);
        if (response.ok) {
          const data = await response.json();
          setQuiz(data);
          if (data.timeLimit) {
            setTimeRemaining(data.timeLimit);
          }
        }
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [courseId, quizId]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || result) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, result]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    setSubmitting(true);

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    try {
      const response = await fetch(`/api/courses/${courseId}/quizzes/${quizId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: quiz.id,
          answers,
          timeSpent,
        }),
      });

      const data = await response.json();
      setResult(data);

      // If passed, navigate back after delay
      if (data.passed) {
        setTimeout(() => {
          router.push(`/courses/${courseId}`);
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const updateAnswer = (questionId: string, answer: UserAnswer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const toggleHints = (questionId: string) => {
    setShowHints((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-2xl font-bold text-gray-700">Loading quiz...</div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Not Found</h1>
          <Link href={`/courses/${courseId}`} className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href={`/courses/${courseId}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Course
            </Link>
            {timeRemaining !== null && !result && (
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <Clock className="h-5 w-5" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {!result ? (
          <div className="space-y-6">
            {/* Quiz Header */}
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
              <p className="text-gray-700 mb-4">{quiz.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>
                  <strong>{quiz.questions.length}</strong> questions
                </span>
                <span>•</span>
                <span>
                  Passing score: <strong>{quiz.passingScore}%</strong>
                </span>
                {quiz.timeLimit && (
                  <>
                    <span>•</span>
                    <span>
                      Time limit: <strong>{Math.floor(quiz.timeLimit / 60)} minutes</strong>
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Questions */}
            {quiz.questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                answer={answers[question.id]}
                onAnswerChange={(answer) => updateAnswer(question.id, answer)}
                showHints={showHints[question.id] || false}
                onToggleHints={() => toggleHints(question.id)}
              />
            ))}

            {/* Submit Button */}
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <button
                onClick={handleSubmit}
                disabled={submitting || Object.keys(answers).length === 0}
                className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg transition-all hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>Submit Quiz ({Object.keys(answers).length} / {quiz.questions.length} answered)</>
                )}
              </button>
            </div>
          </div>
        ) : (
          <QuizResults result={result} quiz={quiz} />
        )}
      </main>
    </div>
  );
}

// Question Card Component
interface QuestionCardProps {
  question: QuizQuestion;
  index: number;
  answer?: UserAnswer;
  onAnswerChange: (answer: UserAnswer) => void;
  showHints: boolean;
  onToggleHints: () => void;
}

function QuestionCard({
  question,
  index,
  answer,
  onAnswerChange,
  showHints,
  onToggleHints,
}: QuestionCardProps) {
  return (
    <div className="rounded-2xl bg-white shadow-xl p-6">
      <div className="flex items-start mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm mr-3 flex-shrink-0">
          {index + 1}
        </span>
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900 mb-1">{question.question}</p>
          <p className="text-sm text-gray-600">{question.points} points</p>
        </div>
      </div>

      {question.type === 'multiple-choice' && (
        <MultipleChoiceInput
          question={question as MultipleChoiceQuestion}
          answer={answer as { type: 'multiple-choice'; answer: string } | undefined}
          onChange={onAnswerChange}
        />
      )}

      {question.type === 'multiple-select' && (
        <MultipleSelectInput
          question={question as MultipleSelectQuestion}
          answer={answer as { type: 'multiple-select'; answers: string[] } | undefined}
          onChange={onAnswerChange}
        />
      )}

      {question.type === 'true-false' && (
        <TrueFalseInput
          question={question as TrueFalseQuestion}
          answer={answer as { type: 'true-false'; answer: boolean } | undefined}
          onChange={onAnswerChange}
        />
      )}

      {question.type === 'code-completion' && (
        <CodeCompletionInput
          question={question as CodeCompletionQuestion}
          answer={answer as { type: 'code-completion'; code: string } | undefined}
          onChange={onAnswerChange}
        />
      )}

      {question.type === 'coding-exercise' && (
        <CodingExerciseInput
          question={question as CodingExerciseQuestion}
          answer={answer as { type: 'coding-exercise'; code: string } | undefined}
          onChange={onAnswerChange}
          showHints={showHints}
          onToggleHints={onToggleHints}
        />
      )}

      {question.type === 'multi-part' && (
        <MultiPartInput
          question={question as MultiPartQuestion}
          answer={answer as { type: 'multi-part'; answers: UserAnswer[] } | undefined}
          onChange={onAnswerChange}
        />
      )}
    </div>
  );
}

// Multiple Choice Input
function MultipleChoiceInput({
  question,
  answer,
  onChange,
}: {
  question: MultipleChoiceQuestion;
  answer?: { type: 'multiple-choice'; answer: string };
  onChange: (answer: UserAnswer) => void;
}) {
  return (
    <div className="space-y-2">
      {question.options.map((option) => (
        <label
          key={option.id}
          className="flex items-start p-3 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50"
          style={{
            borderColor: answer?.answer === option.id ? '#3b82f6' : '#e5e7eb',
            backgroundColor: answer?.answer === option.id ? '#eff6ff' : 'white',
          }}
        >
          <input
            type="radio"
            name={question.id}
            value={option.id}
            checked={answer?.answer === option.id}
            onChange={() => onChange({ type: 'multiple-choice', answer: option.id })}
            className="mt-1 mr-3"
          />
          <span className="text-gray-900">{option.text}</span>
        </label>
      ))}
    </div>
  );
}

// Multiple Select Input
function MultipleSelectInput({
  question,
  answer,
  onChange,
}: {
  question: MultipleSelectQuestion;
  answer?: { type: 'multiple-select'; answers: string[] };
  onChange: (answer: UserAnswer) => void;
}) {
  const selectedAnswers = answer?.answers || [];

  const toggleOption = (optionId: string) => {
    const newAnswers = selectedAnswers.includes(optionId)
      ? selectedAnswers.filter((id) => id !== optionId)
      : [...selectedAnswers, optionId];
    onChange({ type: 'multiple-select', answers: newAnswers });
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
      {question.options.map((option) => (
        <label
          key={option.id}
          className="flex items-start p-3 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50"
          style={{
            borderColor: selectedAnswers.includes(option.id) ? '#3b82f6' : '#e5e7eb',
            backgroundColor: selectedAnswers.includes(option.id) ? '#eff6ff' : 'white',
          }}
        >
          <input
            type="checkbox"
            checked={selectedAnswers.includes(option.id)}
            onChange={() => toggleOption(option.id)}
            className="mt-1 mr-3"
          />
          <span className="text-gray-900">{option.text}</span>
        </label>
      ))}
    </div>
  );
}

// True/False Input
function TrueFalseInput({
  question,
  answer,
  onChange,
}: {
  question: TrueFalseQuestion;
  answer?: { type: 'true-false'; answer: boolean };
  onChange: (answer: UserAnswer) => void;
}) {
  return (
    <div className="space-y-2">
      {[
        { value: true, label: 'True' },
        { value: false, label: 'False' },
      ].map((option) => (
        <label
          key={option.label}
          className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50"
          style={{
            borderColor: answer?.answer === option.value ? '#3b82f6' : '#e5e7eb',
            backgroundColor: answer?.answer === option.value ? '#eff6ff' : 'white',
          }}
        >
          <input
            type="radio"
            name={question.id}
            checked={answer?.answer === option.value}
            onChange={() => onChange({ type: 'true-false', answer: option.value })}
            className="mr-3"
          />
          <span className="text-gray-900 font-semibold">{option.label}</span>
        </label>
      ))}
    </div>
  );
}

// Code Completion Input
function CodeCompletionInput({
  question,
  answer,
  onChange,
}: {
  question: CodeCompletionQuestion;
  answer?: { type: 'code-completion'; code: string };
  onChange: (answer: UserAnswer) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="bg-gray-900 text-white p-3 rounded-lg font-mono text-sm">
        {question.starterCode}
      </div>
      <Editor
        height="150px"
        language={question.language || 'python'}
        value={answer?.code || ''}
        onChange={(value) => onChange({ type: 'code-completion', code: value || '' })}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'off',
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}

// Coding Exercise Input
function CodingExerciseInput({
  question,
  answer,
  onChange,
  showHints,
  onToggleHints,
}: {
  question: CodingExerciseQuestion;
  answer?: { type: 'coding-exercise'; code: string };
  onChange: (answer: UserAnswer) => void;
  showHints: boolean;
  onToggleHints: () => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-gray-700 whitespace-pre-wrap">{question.description}</p>

      {/* Test Cases */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-bold text-gray-900 mb-2">Test Cases</h4>
        <div className="space-y-2">
          {question.testCases.filter((tc) => !tc.isHidden).map((tc) => (
            <div key={tc.id} className="p-2 bg-gray-50 rounded text-sm">
              <p className="font-semibold text-gray-900">{tc.description}</p>
              {tc.expectedOutput && (
                <p className="text-gray-600 text-xs mt-1">Expected: {tc.expectedOutput}</p>
              )}
            </div>
          ))}
          {question.testCases.some((tc) => tc.isHidden) && (
            <p className="text-xs text-gray-500 italic">
              + {question.testCases.filter((tc) => tc.isHidden).length} hidden test(s)
            </p>
          )}
        </div>
      </div>

      {/* Hints */}
      {question.hints && question.hints.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={onToggleHints}
            className="flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm mb-2"
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            {showHints ? 'Hide' : 'Show'} Hints ({question.hints.length})
          </button>
          {showHints && (
            <ul className="space-y-2">
              {question.hints.map((hint, idx) => (
                <li key={idx} className="text-sm text-gray-700 p-2 bg-blue-50 rounded">
                  {hint}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Code Editor */}
      <div className="border-t border-gray-200 pt-4">
        <div className="bg-gray-900 p-2 rounded-t-lg flex items-center justify-between">
          <span className="text-white text-sm font-semibold">Your Solution</span>
          <span className="text-gray-400 text-xs">{question.language}</span>
        </div>
        <Editor
          height="300px"
          language={question.language}
          value={answer?.code || question.starterCode}
          onChange={(value) => onChange({ type: 'coding-exercise', code: value || '' })}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}

// Multi-Part Input
function MultiPartInput({
  question,
  answer,
  onChange,
}: {
  question: MultiPartQuestion;
  answer?: { type: 'multi-part'; answers: UserAnswer[] };
  onChange: (answer: UserAnswer) => void;
}) {
  const answers = answer?.answers || [];

  const updatePart = (partIndex: number, partAnswer: UserAnswer) => {
    const newAnswers = [...answers];
    newAnswers[partIndex] = partAnswer;
    onChange({ type: 'multi-part', answers: newAnswers });
  };

  return (
    <div className="space-y-6 pl-4 border-l-4 border-blue-200">
      {question.parts.map((part, idx) => (
        <div key={part.id} className="space-y-2">
          <p className="font-semibold text-gray-900">
            Part {idx + 1}: {part.question}
          </p>
          <div className="pl-4">
            {part.type === 'multiple-choice' && (
              <MultipleChoiceInput
                question={part as MultipleChoiceQuestion}
                answer={answers[idx] as { type: 'multiple-choice'; answer: string } | undefined}
                onChange={(ans) => updatePart(idx, ans)}
              />
            )}
            {part.type === 'true-false' && (
              <TrueFalseInput
                question={part as TrueFalseQuestion}
                answer={answers[idx] as { type: 'true-false'; answer: boolean } | undefined}
                onChange={(ans) => updatePart(idx, ans)}
              />
            )}
            {/* Add other part types as needed */}
          </div>
        </div>
      ))}
    </div>
  );
}

// Quiz Results Component
function QuizResults({ result, quiz }: { result: QuizResult; quiz: Quiz }) {
  return (
    <div className="space-y-6">
      {/* Overall Result */}
      <div
        className={`rounded-2xl shadow-xl p-8 ${result.passed ? 'bg-green-50' : 'bg-red-50'}`}
      >
        <div className="flex items-start mb-4">
          {result.passed ? (
            <CheckCircle2 className="h-8 w-8 text-green-600 mr-4 flex-shrink-0 mt-1" />
          ) : (
            <XCircle className="h-8 w-8 text-red-600 mr-4 flex-shrink-0 mt-1" />
          )}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {result.passed ? 'Congratulations! 🎉' : 'Quiz Complete'}
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              {result.passed
                ? `You passed with a score of ${result.score}%!`
                : `You scored ${result.score}%. The passing score is ${result.passingScore}%.`}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Points Earned:</span>
                <span className="ml-2 font-bold text-gray-900">
                  {result.pointsEarned} / {result.pointsPossible}
                </span>
              </div>
              {result.timeSpent && (
                <div>
                  <span className="text-gray-600">Time Spent:</span>
                  <span className="ml-2 font-bold text-gray-900">
                    {Math.floor(result.timeSpent / 60)}m {result.timeSpent % 60}s
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Question Results */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">Review Your Answers</h3>
        {result.questionResults.map((qr, idx) => {
          const question = quiz.questions.find((q) => q.id === qr.questionId);
          if (!question) return null;

          return (
            <div
              key={qr.questionId}
              className={`rounded-xl shadow-lg p-6 ${qr.correct ? 'bg-green-50' : 'bg-red-50'}`}
            >
              <div className="flex items-start mb-3">
                {qr.correct ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">
                    Question {idx + 1}: {question.question}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {qr.pointsEarned} / {qr.pointsPossible} points
                  </p>
                  {qr.explanation && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-800">
                        <strong>Explanation:</strong> {qr.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
