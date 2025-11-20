import fs from 'fs';
import path from 'path';

export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: string[];
}

export interface CourseData {
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

export function getCourseData(courseId: string): CourseData | null {
  try {
    const coursePath = path.join(process.cwd(), 'content', 'courses', courseId, 'course.json');
    
    if (!fs.existsSync(coursePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(coursePath, 'utf8');
    const courseData = JSON.parse(fileContents);
    
    return courseData;
  } catch (error) {
    console.error(`Failed to load course ${courseId}:`, error);
    return null;
  }
}

export function getLessonFiles(courseId: string): string[] {
  try {
    const lessonsDir = path.join(process.cwd(), 'content', 'courses', courseId, 'lessons');
    
    if (!fs.existsSync(lessonsDir)) {
      return [];
    }

    return fs.readdirSync(lessonsDir).filter(file => file.endsWith('.md'));
  } catch (error) {
    console.error(`Failed to load lessons for ${courseId}:`, error);
    return [];
  }
}

export function getExerciseFiles(courseId: string): string[] {
  try {
    const exercisesDir = path.join(process.cwd(), 'content', 'courses', courseId, 'exercises');
    
    if (!fs.existsSync(exercisesDir)) {
      return [];
    }

    return fs.readdirSync(exercisesDir).filter(file => file.endsWith('.json'));
  } catch (error) {
    console.error(`Failed to load exercises for ${courseId}:`, error);
    return [];
  }
}

export function getQuizFiles(courseId: string): string[] {
  try {
    const quizzesDir = path.join(process.cwd(), 'content', 'courses', courseId, 'quizzes');
    
    if (!fs.existsSync(quizzesDir)) {
      return [];
    }

    return fs.readdirSync(quizzesDir).filter(file => file.endsWith('.json'));
  } catch (error) {
    console.error(`Failed to load quizzes for ${courseId}:`, error);
    return [];
  }
}
