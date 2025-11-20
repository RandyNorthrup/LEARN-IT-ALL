import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface ClearProgressRequest {
  type: 'all' | 'course' | 'chapter' | 'lesson' | 'quiz';
  courseId?: string;
  chapterId?: string;
  lessonId?: string;
  quizId?: string;
}

export async function POST(request: Request) {
  try {
    const body: ClearProgressRequest = await request.json();
    const { type, courseId, chapterId, lessonId, quizId } = body;

    if (!type) {
      return NextResponse.json(
        { error: 'Type is required' },
        { status: 400 }
      );
    }

    switch (type) {
      case 'all':
        // Clear all progress
        db.prepare('DELETE FROM course_enrollments').run();
        db.prepare('DELETE FROM lesson_progress').run();
        db.prepare('DELETE FROM exercise_submissions').run();
        db.prepare('DELETE FROM quiz_attempts').run();
        db.prepare('DELETE FROM test_results').run();
        db.prepare('DELETE FROM certificates').run();
        break;

      case 'course':
        if (!courseId) {
          return NextResponse.json(
            { error: 'Course ID is required' },
            { status: 400 }
          );
        }
        // Clear all progress for specific course
        db.prepare('DELETE FROM course_enrollments WHERE courseId = ?').run(courseId);
        db.prepare('DELETE FROM lesson_progress WHERE courseId = ?').run(courseId);
        db.prepare('DELETE FROM exercise_submissions WHERE courseId = ?').run(courseId);
        db.prepare('DELETE FROM quiz_attempts WHERE courseId = ?').run(courseId);
        db.prepare('DELETE FROM certificates WHERE courseId = ?').run(courseId);
        break;

      case 'chapter':
        if (!courseId || !chapterId) {
          return NextResponse.json(
            { error: 'Course ID and Chapter ID are required' },
            { status: 400 }
          );
        }
        // Clear chapter progress - lessons and quizzes that start with chapter ID
        db.prepare('DELETE FROM lesson_progress WHERE courseId = ? AND lessonId LIKE ?')
          .run(courseId, `%${chapterId}%`);
        db.prepare('DELETE FROM quiz_attempts WHERE courseId = ? AND quizId LIKE ?')
          .run(courseId, `%${chapterId}%`);
        db.prepare('DELETE FROM exercise_submissions WHERE courseId = ? AND exerciseId LIKE ?')
          .run(courseId, `%${chapterId}%`);
        break;

      case 'lesson':
        if (!lessonId) {
          return NextResponse.json(
            { error: 'Lesson ID is required' },
            { status: 400 }
          );
        }
        // Clear specific lesson progress
        db.prepare('DELETE FROM lesson_progress WHERE lessonId = ?').run(lessonId);
        // Also clear exercises for this lesson
        db.prepare('DELETE FROM exercise_submissions WHERE exerciseId LIKE ?')
          .run(`%${lessonId}%`);
        break;

      case 'quiz':
        if (!quizId) {
          return NextResponse.json(
            { error: 'Quiz ID is required' },
            { status: 400 }
          );
        }
        // Clear all attempts for specific quiz
        db.prepare('DELETE FROM quiz_attempts WHERE quizId = ?').run(quizId);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid type' },
          { status: 400 }
        );
    }

    return NextResponse.json({ 
      success: true,
      message: `Successfully cleared ${type} progress`
    });
  } catch (error) {
    console.error('Failed to clear progress:', error);
    return NextResponse.json(
      { error: 'Failed to clear progress' },
      { status: 500 }
    );
  }
}
