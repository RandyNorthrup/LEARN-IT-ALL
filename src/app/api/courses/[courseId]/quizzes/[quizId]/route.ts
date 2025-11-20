import { NextRequest, NextResponse } from 'next/server';
import { getQuizData } from '@/lib/lessonLoader';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ courseId: string; quizId: string }> }
) {
  try {
    const { courseId, quizId } = await context.params;

    const quiz = await getQuizData(courseId, quizId);

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Error loading quiz:', error);
    return NextResponse.json({ error: 'Failed to load quiz' }, { status: 500 });
  }
}
