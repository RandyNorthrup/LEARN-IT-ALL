'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle2, Code2 } from 'lucide-react';

interface LessonData {
  frontmatter: {
    id: string;
    title: string;
    chapterId: string;
    order: number;
    duration: number;
    objectives: string[];
  };
  content: string;
  lessonId: string;
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const response = await fetch(`/api/courses/${courseId}/lessons/${lessonId}`);
        if (response.ok) {
          const data = await response.json();
          setLesson(data);
        }
      } catch (error) {
        console.error('Failed to fetch lesson:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLesson();
  }, [courseId, lessonId]);

  const handleCompleteLesson = async () => {
    setCompleting(true);
    try {
      await fetch(`/api/courses/${courseId}/lessons/${lessonId}/complete`, {
        method: 'POST',
      });
      
      // Navigate to next lesson or back to course
      router.push(`/courses/${courseId}`);
    } catch (error) {
      console.error('Failed to complete lesson:', error);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-2xl font-bold text-gray-700">Loading lesson...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
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
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href={`/courses/${courseId}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Course
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                {lesson.frontmatter.duration} min
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white shadow-xl overflow-hidden">
          {/* Lesson Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{lesson.frontmatter.title}</h1>
            
            {/* Learning Objectives */}
            {lesson.frontmatter.objectives && lesson.frontmatter.objectives.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Learning Objectives
                </h3>
                <ul className="space-y-2">
                  {lesson.frontmatter.objectives.map((objective) => (
                    <li key={objective} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Lesson Content */}
          <div className="p-8 prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const isBlock = match && String(children).includes('\n');
                  
                  if (isBlock) {
                    return (
                      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    );
                  }
                  
                  return (
                    <code className={`${className} bg-gray-100 text-gray-900 px-2 py-1 rounded`} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {lesson.content}
            </ReactMarkdown>
          </div>

          {/* Exercise Section */}
          <div className="border-t border-gray-200 bg-yellow-50 p-8">
            <div className="flex items-start">
              <Code2 className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Complete the Exercise</h3>
                <p className="text-gray-700 mb-4">
                  Practice what you&apos;ve learned by completing the exercise for this lesson.
                  You must pass the exercise to proceed to the next lesson.
                </p>
                <Link
                  href={`/courses/${courseId}/exercises/${lessonId}`}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold transition-all hover:from-yellow-600 hover:to-orange-600"
                >
                  Start Exercise
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="border-t border-gray-200 bg-gray-50 p-6 flex items-center justify-between">
            <Link
              href={`/courses/${courseId}`}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Course Overview
            </Link>
            
            <button
              onClick={handleCompleteLesson}
              disabled={completing}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold transition-all hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
            >
              {completing ? 'Completing...' : 'Mark as Complete'}
              <CheckCircle2 className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
