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

