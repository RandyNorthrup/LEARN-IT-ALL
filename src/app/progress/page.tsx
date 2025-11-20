'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, BookOpen, Code2, CheckCircle, Award, Target, Zap } from 'lucide-react';

interface ProgressStats {
  coursesStarted: number;
  coursesCompleted: number;
  lessonsCompleted: number;
  exercisesPassed: number;
  quizzesPassed: number;
  totalStudyHours: number;
}

export default function ProgressPage() {
  const [stats, setStats] = useState<ProgressStats>({
    coursesStarted: 0,
    coursesCompleted: 0,
    lessonsCompleted: 0,
    exercisesPassed: 0,
    quizzesPassed: 0,
    totalStudyHours: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await fetch('/api/progress');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch progress:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-2xl font-bold text-gray-700">Loading your progress...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/dashboard"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-2"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-4xl font-bold text-gray-900">Your Progress</h1>
              <p className="mt-2 text-lg text-gray-600">
                Track your achievements, scores, and learning statistics
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {/* Courses Started */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{stats.coursesStarted}</div>
            <div className="text-sm font-medium text-gray-600">Courses Started</div>
          </div>

          {/* Courses Completed */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{stats.coursesCompleted}</div>
            <div className="text-sm font-medium text-gray-600">Courses Completed</div>
          </div>

          {/* Lessons Completed */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{stats.lessonsCompleted}</div>
            <div className="text-sm font-medium text-gray-600">Lessons Completed</div>
          </div>

          {/* Exercises Passed */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Code2 className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{stats.exercisesPassed}</div>
            <div className="text-sm font-medium text-gray-600">Exercises Passed</div>
          </div>

          {/* Quizzes Passed */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-pink-100 rounded-xl">
                <CheckCircle className="h-8 w-8 text-pink-600" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{stats.quizzesPassed}</div>
            <div className="text-sm font-medium text-gray-600">Quizzes Passed</div>
          </div>

          {/* Total Study Hours */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <TrendingUp className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{stats.totalStudyHours}h</div>
            <div className="text-sm font-medium text-gray-600">Total Study Time</div>
          </div>
        </div>

        {/* Achievement Section */}
        <div className="rounded-2xl bg-white p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
          {stats.coursesStarted === 0 ? (
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">No achievements yet!</p>
              <p className="text-gray-500 mb-6">Start your first course to earn achievements.</p>
              <Link
                href="/courses"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold transition-all hover:from-blue-700 hover:to-indigo-700"
              >
                Browse Courses
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <div className="p-2 bg-blue-200 rounded-lg mr-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">First Steps</div>
                  <div className="text-sm text-gray-600">Started your learning journey!</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Course Progress Section */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Progress</h2>
          {stats.coursesStarted === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">You haven't started any courses yet.</p>
              <Link
                href="/courses"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold transition-all hover:from-purple-700 hover:to-pink-700"
              >
                Start Learning
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="text-gray-600">
              <p>Detailed course progress will be displayed here once you start courses.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
