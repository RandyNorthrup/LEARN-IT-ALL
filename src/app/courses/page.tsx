'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, Code2, CheckCircle2, AlertCircle, Lock } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedHours: number;
  language: string | null;
  tags: string[];
  prerequisites: string[];
  status: string;
  lessonCount: number;
  chapterCount: number;
  type: string;
}

const STATUS_CONFIG = {
  complete: {
    icon: CheckCircle2,
    label: 'Complete',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  available: {
    icon: BookOpen,
    label: 'Available',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  'coming-soon': {
    icon: AlertCircle,
    label: 'Coming Soon',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  locked: {
    icon: Lock,
    label: 'Locked',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
  },
};

const DIFFICULTY_COLORS = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('/api/courses');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesDifficulty = filter === 'all' || course.difficulty === filter;
    const matchesType = typeFilter === 'all' || course.type === typeFilter;
    return matchesDifficulty && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-2xl font-bold text-gray-700">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
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
              <h1 className="text-4xl font-bold text-gray-900">All Courses</h1>
              <p className="mt-2 text-lg text-gray-600">
                Browse {courses.length} comprehensive courses across multiple technologies
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Difficulty</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('beginner')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === 'beginner'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Beginner
                </button>
                <button
                  onClick={() => setFilter('intermediate')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === 'intermediate'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Intermediate
                </button>
                <button
                  onClick={() => setFilter('advanced')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === 'advanced'
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Advanced
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTypeFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    typeFilter === 'all'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Types
                </button>
                <button
                  onClick={() => setTypeFilter('course')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    typeFilter === 'course'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Courses
                </button>
                <button
                  onClick={() => setTypeFilter('guided-project')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    typeFilter === 'guided-project'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Guided Projects
                </button>
                <button
                  onClick={() => setTypeFilter('portfolio-project')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    typeFilter === 'portfolio-project'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Portfolio Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const statusConfig = STATUS_CONFIG[course.status as keyof typeof STATUS_CONFIG];
            const StatusIcon = statusConfig.icon;

            return (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="group rounded-2xl bg-white shadow-lg overflow-hidden transition-all hover:shadow-2xl hover:scale-105"
              >
                {/* Course Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bgColor} ${statusConfig.color}`}
                    >
                      <StatusIcon className="h-4 w-4 mr-1" />
                      {statusConfig.label}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        DIFFICULTY_COLORS[course.difficulty as keyof typeof DIFFICULTY_COLORS]
                      }`}
                    >
                      {course.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

                  {/* Course Stats */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.estimatedHours}h
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.lessonCount} lessons
                    </div>
                    {course.language && (
                      <div className="flex items-center">
                        <Code2 className="h-4 w-4 mr-1" />
                        {course.language}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {course.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {course.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        +{course.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Course Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {course.type.replace('-', ' ')}
                    </span>
                    <span className="text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center">
                      View Course
                      <svg
                        className="ml-1 h-4 w-4"
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
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses found matching your filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}
