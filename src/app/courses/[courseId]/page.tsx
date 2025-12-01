'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, BookOpen, Clock, Code2, Lock, CheckCircle2, Unlock } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: string[];
  quizId?: string;
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedHours: number;
  language: string;
  tags: string[];
  prerequisites: string[];
  chapters: Chapter[];
}

interface CourseProgress {
  completedLessons: string[];
  completedExercises: string[];
  passedQuizzes: string[];
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<CourseData | null>(null);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [isStructuredMode, setIsStructuredMode] = useState(() => {
    // Load learning mode preference from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('learningMode');
      return saved === 'open' ? false : true; // Default to structured mode
    }
    return true;
  });

  // Persist learning mode preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('learningMode', isStructuredMode ? 'structured' : 'open');
    }
  }, [isStructuredMode]);

  useEffect(() => {
    async function fetchCourseData() {
      try {
        const [courseRes, progressRes] = await Promise.all([
          fetch(`/api/courses/${courseId}`),
          fetch(`/api/courses/${courseId}/progress`),
        ]);

        if (courseRes.ok) {
          const courseData = await courseRes.json();
          setCourse(courseData);
        }

        if (progressRes.ok) {
          const progressData = await progressRes.json();
          setProgress(progressData);
        } else {
          setProgress({
            completedLessons: [],
            completedExercises: [],
            passedQuizzes: [],
          });
        }
      } catch (error) {
        console.error('Failed to fetch course:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourseData();
  }, [courseId]);



  const isLessonLocked = (chapterIndex: number, lessonIndex: number): boolean => {
    // In Open Mode, no lessons are locked
    if (!isStructuredMode) return false;
    
    if (chapterIndex === 0 && lessonIndex === 0) return false;

    if (lessonIndex === 0) {
      const prevChapter = course?.chapters[chapterIndex - 1];
      if (!prevChapter) return false;
      const prevChapterQuizId = prevChapter.quizId;
      // Only check quiz if previous chapter has one
      if (prevChapterQuizId) {
        return !progress?.passedQuizzes.includes(prevChapterQuizId);
      }
      // If no quiz, check if all previous chapter lessons are complete
      return !prevChapter.lessons.every(l => progress?.completedLessons.includes(l.replace('.md', '')));
    }

    const currentChapter = course?.chapters[chapterIndex];
    if (!currentChapter) return true;
    const prevLesson = currentChapter.lessons[lessonIndex - 1].replace('.md', '');
    return !progress?.completedLessons.includes(prevLesson);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-2xl font-bold text-gray-700">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link href="/courses" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Courses
          </Link>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-4">{course.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 mr-2" />
                  {course.estimatedHours} hours
                </div>
                <div className="flex items-center text-gray-700">
                  <BookOpen className="h-5 w-5 mr-2" />
                  {course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)} lessons
                </div>
                {course.language && (
                  <div className="flex items-center text-gray-700">
                    <Code2 className="h-5 w-5 mr-2" />
                    {course.language}
                  </div>
                )}
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold capitalize">
                  {course.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Content Sidebar */}
          <div className="lg:col-span-2">
            {/* Mode Toggle */}
            <div className="mb-6 rounded-2xl bg-white shadow-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Learning Mode</h3>
                  <p className="text-sm text-gray-600">
                    {isStructuredMode 
                      ? 'Complete lessons in order and pass quizzes to unlock chapters' 
                      : 'Access any lesson in any order without restrictions'}
                  </p>
                </div>
                <button
                  onClick={() => setIsStructuredMode(!isStructuredMode)}
                  className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isStructuredMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span className="sr-only">Toggle learning mode</span>
                  <span
                    className={`inline-block h-10 w-10 transform rounded-full bg-white shadow-lg transition-transform ${
                      isStructuredMode ? 'translate-x-12' : 'translate-x-1'
                    }`}
                  >
                    {isStructuredMode ? (
                      <Lock className="h-6 w-6 m-2 text-blue-600" />
                    ) : (
                      <Unlock className="h-6 w-6 m-2 text-gray-600" />
                    )}
                  </span>
                </button>
              </div>
              <div className="mt-4 flex gap-4 text-xs">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isStructuredMode ? 'bg-blue-100 text-blue-800 font-semibold' : 'bg-gray-100 text-gray-600'}`}>
                  <Lock className="h-4 w-4" />
                  Structured Mode
                </div>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${!isStructuredMode ? 'bg-green-100 text-green-800 font-semibold' : 'bg-gray-100 text-gray-600'}`}>
                  <Unlock className="h-4 w-4" />
                  Open Mode
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl bg-white shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
              
              <div className="space-y-6">
                {course.chapters.map((chapter, chapterIndex) => (
                  <div key={chapter.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900">{chapter.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
                      <div className="text-xs text-gray-500 mt-2">
                        {chapter.lessons.length} lessons
                      </div>
                    </div>
                    
                    <div className="divide-y divide-gray-100">
                      {chapter.lessons.map((lesson, lessonIndex) => {
                        const lessonId = lesson.replace('.md', '');
                        const isLocked = isLessonLocked(chapterIndex, lessonIndex);
                        const isCompleted = progress?.completedLessons.includes(lessonId);

                        return (
                          <Link
                            key={lesson}
                            href={isLocked ? '#' : `/courses/${courseId}/lessons/${lessonId}`}
                            className={`flex items-center justify-between px-6 py-4 transition-colors ${
                              isLocked
                                ? 'bg-gray-50 cursor-not-allowed opacity-60'
                                : 'hover:bg-blue-50 cursor-pointer'
                            }`}
                          >
                            <div className="flex items-center flex-1">
                              {(() => {
                                if (isCompleted) {
                                  return <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />;
                                }
                                if (isLocked) {
                                  return <Lock className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />;
                                }
                                return <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-3 flex-shrink-0" />;
                              })()}
                              <span className={`text-sm ${isLocked ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                                Lesson {chapterIndex + 1}.{lessonIndex + 1}: {lessonId.replace(/^lesson-\d+-/, '').replace(/-/g, ' ')}
                              </span>
                            </div>
                            {isLocked && (
                              <span className="text-xs text-gray-500 ml-4">
                                Complete previous lesson
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Chapter Quiz - Only show if chapter has a quiz */}
                    {chapter.quizId && (
                      <Link
                        href={`/courses/${course.id}/quizzes/${chapter.quizId}`}
                        className="block bg-purple-50 px-6 py-4 border-t border-purple-100 hover:bg-purple-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 text-purple-600 mr-3" />
                            <span className="font-semibold text-purple-900">
                              Chapter {chapterIndex + 1} Quiz
                            </span>
                          </div>
                          {isStructuredMode && (
                            <span className="text-xs text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                              Pass to unlock next chapter
                            </span>
                          )}
                        </div>
                      </Link>
                    )}
                  </div>
                ))}

                {/* Final Exam */}
                <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg overflow-hidden border-2 border-amber-200">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-xl bg-amber-100 mr-4">
                        <BookOpen className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-amber-900">Final Exam</h3>
                        <p className="text-sm text-amber-700">Comprehensive assessment of all concepts</p>
                      </div>
                    </div>
                    <Link
                      href={`/courses/${course.id}/quizzes/final-exam`}
                      className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg text-center"
                    >
                      Take Final Exam
                    </Link>
                    <p className="text-xs text-amber-700 mt-3 text-center">
                      80% required to pass • Completes entire course
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Progress Card */}
              <div className="rounded-2xl bg-white shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Progress</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Lessons</span>
                      <span className="font-semibold text-gray-900">
                        {progress?.completedLessons.length ?? 0} / {course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${((progress?.completedLessons.length ?? 0) / course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div className="rounded-2xl bg-white shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Course Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Chapters:</span>
                    <span className="text-gray-600 ml-2">{course.chapters.length}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Total Lessons:</span>
                    <span className="text-gray-600 ml-2">
                      {course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Difficulty:</span>
                    <span className="text-gray-600 ml-2 capitalize">{course.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {course.tags.length > 0 && (
                <div className="rounded-2xl bg-white shadow-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
