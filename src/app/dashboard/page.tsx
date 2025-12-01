import Link from 'next/link';
import { Map, BookOpen, TrendingUp, Gamepad2, Trophy, Wrench } from 'lucide-react';

async function getSettings() {
  try {
    const response = await fetch('http://localhost:3000/api/settings', {
      cache: 'no-store',
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch settings:', error);
  }
  return { displayName: 'Learner' };
}

async function getStats() {
  try {
    const response = await fetch('http://localhost:3000/api/progress', {
      cache: 'no-store',
    });
    if (response.ok) {
      const data = await response.json();
      return {
        coursesStarted: data.coursesStarted || 0,
        lessonsCompleted: data.lessonsCompleted || 0,
        exercisesPassed: data.exercisesPassed || 0,
        quizzesPassed: data.quizzesPassed || 0,
      };
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error);
  }
  return {
    coursesStarted: 0,
    lessonsCompleted: 0,
    exercisesPassed: 0,
    quizzesPassed: 0,
  };
}

async function getCourseCount() {
  try {
    const response = await fetch('http://localhost:3000/api/courses', {
      cache: 'no-store',
    });
    if (response.ok) {
      const courses = await response.json();
      return courses.length;
    }
  } catch (error) {
    console.error('Failed to fetch course count:', error);
  }
  return 0;
}

export default async function DashboardPage() {
  const settings = await getSettings();
  const stats = await getStats();
  const courseCount = await getCourseCount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">LEARN-IT-ALL</h1>
              <p className="mt-1 text-gray-600">Welcome back, {settings.displayName}!</p>
            </div>
            <Link
              href="/settings"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Settings
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Your Learning Journey</h2>
          <p className="mt-2 text-lg text-gray-600">
            Choose where you want to start or continue learning
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6 mb-12">
          {/* Learning Tracks Card */}
          <Link
            href="/tracks"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative z-10">
              <Map className="mb-4 h-12 w-12" />
              <h3 className="mb-2 text-2xl font-bold">Learning Tracks</h3>
              <p className="mb-4 text-blue-100">
                Follow structured paths to master full-stack development
              </p>
              <div className="flex items-center text-sm font-semibold">
                Explore Tracks
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
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
              </div>
            </div>
          </Link>

          {/* All Courses Card */}
          <Link
            href="/courses"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 p-8 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative z-10">
              <BookOpen className="mb-4 h-12 w-12" />
              <h3 className="mb-2 text-2xl font-bold">All Courses</h3>
              <p className="mb-4 text-purple-100">
                Browse {courseCount} comprehensive courses across multiple technologies
              </p>
              <div className="flex items-center text-sm font-semibold">
                View Courses
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
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
              </div>
            </div>
          </Link>

          {/* Progress Card */}
          <Link
            href="/progress"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative z-10">
              <TrendingUp className="mb-4 h-12 w-12" />
              <h3 className="mb-2 text-2xl font-bold">Your Progress</h3>
              <p className="mb-4 text-green-100">
                Track your achievements, scores, and learning statistics
              </p>
              <div className="flex items-center text-sm font-semibold">
                View Progress
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
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
              </div>
            </div>
          </Link>

          {/* Games Card */}
          <Link
            href="/games"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative z-10">
              <Gamepad2 className="mb-4 h-12 w-12" />
              <h3 className="mb-2 text-2xl font-bold">Games</h3>
              <p className="mb-4 text-orange-100">
                Learn through interactive coding games and puzzles
              </p>
              <div className="flex items-center text-sm font-semibold">
                Play Games
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
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
              </div>
            </div>
          </Link>

          {/* Challenges Card */}
          <Link
            href="/challenges"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 p-8 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative z-10">
              <Trophy className="mb-4 h-12 w-12" />
              <h3 className="mb-2 text-2xl font-bold">Challenges</h3>
              <p className="mb-4 text-yellow-100">
                Test your skills with coding challenges and competitions
              </p>
              <div className="flex items-center text-sm font-semibold">
                Take Challenge
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
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
              </div>
            </div>
          </Link>

          {/* Projects Card - NEW */}
          <Link
            href="/projects"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 p-8 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative z-10">
              <Wrench className="mb-4 h-12 w-12" />
              <h3 className="mb-2 text-2xl font-bold">Projects</h3>
              <p className="mb-4 text-teal-100">
                Build real-world projects from scratch with guided tutorials
              </p>
              <div className="flex items-center text-sm font-semibold">
                Browse Projects
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
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
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="text-sm font-medium text-gray-600">Courses Started</div>
            <div className="mt-2 text-4xl font-bold text-gray-900">{stats.coursesStarted}</div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="text-sm font-medium text-gray-600">Lessons Completed</div>
            <div className="mt-2 text-4xl font-bold text-gray-900">{stats.lessonsCompleted}</div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="text-sm font-medium text-gray-600">Exercises Passed</div>
            <div className="mt-2 text-4xl font-bold text-gray-900">{stats.exercisesPassed}</div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="text-sm font-medium text-gray-600">Quizzes Passed</div>
            <div className="mt-2 text-4xl font-bold text-gray-900">{stats.quizzesPassed}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
