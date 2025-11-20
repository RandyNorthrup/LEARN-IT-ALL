import { NextResponse } from 'next/server';
import { getExerciseData } from '@/lib/lessonLoader';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
  try {
    const { courseId, lessonId } = await params;

    // Find exercise file that matches the lesson
    const exerciseData = getExerciseData(courseId, lessonId);

    if (!exerciseData) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    // Return exercise data without the solution
    const { solution: _solution, ...exerciseWithoutSolution } = exerciseData;

    return NextResponse.json(exerciseWithoutSolution);
  } catch (error) {
    console.error('Failed to load exercise:', error);
    return NextResponse.json({ error: 'Failed to load exercise' }, { status: 500 });
  }
}
