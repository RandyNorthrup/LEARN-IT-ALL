import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface LessonFrontmatter {
  id: string;
  title: string;
  chapterId: string;
  order: number;
  duration: number;
  objectives: string[];
}

export interface LessonData {
  frontmatter: LessonFrontmatter;
  content: string;
  lessonId: string;
}

export function getLessonData(courseId: string, lessonId: string): LessonData | null {
  try {
    const lessonPath = path.join(
      process.cwd(),
      'content',
      'courses',
      courseId,
      'lessons',
      `${lessonId}.md`
    );

    if (!fs.existsSync(lessonPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(lessonPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      frontmatter: data as LessonFrontmatter,
      content,
      lessonId,
    };
  } catch (error) {
    console.error(`Failed to load lesson ${lessonId}:`, error);
    return null;
  }
}

export function getExerciseData(courseId: string, lessonIdOrExerciseId: string) {
  try {
    const exercisesDir = path.join(
      process.cwd(),
      'content',
      'courses',
      courseId,
      'exercises'
    );

    if (!fs.existsSync(exercisesDir)) {
      return null;
    }

    // First try direct file match (exercise-XXX format)
    const directPath = path.join(exercisesDir, `${lessonIdOrExerciseId}.json`);
    if (fs.existsSync(directPath)) {
      const fileContents = fs.readFileSync(directPath, 'utf8');
      return JSON.parse(fileContents);
    }

    // If not found, search all exercise files for matching lessonId
    const files = fs.readdirSync(exercisesDir).filter(file => file.endsWith('.json'));
    
    for (const file of files) {
      const filePath = path.join(exercisesDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const exerciseData = JSON.parse(fileContents);
      
      if (exerciseData.lessonId === lessonIdOrExerciseId) {
        return exerciseData;
      }
    }

    return null;
  } catch (error) {
    console.error(`Failed to load exercise for ${lessonIdOrExerciseId}:`, error);
    return null;
  }
}

export function getQuizData(courseId: string, quizId: string) {
  try {
    const quizPath = path.join(
      process.cwd(),
      'content',
      'courses',
      courseId,
      'quizzes',
      `${quizId}.json`
    );

    if (!fs.existsSync(quizPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(quizPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Failed to load quiz ${quizId}:`, error);
    return null;
  }
}
