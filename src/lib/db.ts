import Database from 'better-sqlite3';
import { join } from 'path';

// Create singleton database connection
const dbPath = join(process.cwd(), 'database', 'learn-it-all.db');
const db = new Database(dbPath);

// Enable foreign keys and set pragmas
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

// Initialize database schema
const initSchema = `
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY DEFAULT 'settings',
  displayName TEXT NOT NULL DEFAULT 'Learner',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS course_enrollments (
  id TEXT PRIMARY KEY,
  courseId TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'IN_PROGRESS',
  completionPercentage INTEGER DEFAULT 0,
  enrolledAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  completedAt DATETIME,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lesson_progress (
  id TEXT PRIMARY KEY,
  lessonId TEXT UNIQUE NOT NULL,
  courseId TEXT NOT NULL,
  status TEXT DEFAULT 'NOT_STARTED',
  startedAt DATETIME,
  completedAt DATETIME,
  timeSpent INTEGER
);

CREATE TABLE IF NOT EXISTS exercise_submissions (
  id TEXT PRIMARY KEY,
  exerciseId TEXT NOT NULL,
  courseId TEXT NOT NULL,
  code TEXT NOT NULL,
  language TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING',
  score INTEGER DEFAULT 0,
  feedback TEXT,
  submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  completedAt DATETIME
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id TEXT PRIMARY KEY,
  quizId TEXT NOT NULL,
  courseId TEXT NOT NULL,
  answers TEXT,
  score INTEGER NOT NULL,
  pointsEarned INTEGER DEFAULT 0,
  pointsPossible INTEGER DEFAULT 0,
  passed INTEGER DEFAULT 0,
  startedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  completedAt DATETIME,
  timeSpent INTEGER
);

CREATE TABLE IF NOT EXISTS test_results (
  id TEXT PRIMARY KEY,
  submissionId TEXT NOT NULL,
  testCaseId TEXT NOT NULL,
  passed INTEGER NOT NULL,
  expectedOutput TEXT NOT NULL,
  actualOutput TEXT,
  errorMessage TEXT,
  executionTime INTEGER,
  FOREIGN KEY (submissionId) REFERENCES exercise_submissions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS certificates (
  id TEXT PRIMARY KEY,
  courseId TEXT UNIQUE NOT NULL,
  issuedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  certificateUrl TEXT
);

-- Insert default settings if not exists
INSERT OR IGNORE INTO settings (id, displayName) VALUES ('settings', 'Learner');
`;

// Run initialization
db.exec(initSchema);

// Helper to generate unique IDs
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Query helpers
export const dbHelpers = {
  // Settings
  getSettings: () => {
    return db.prepare('SELECT * FROM settings WHERE id = ?').get('settings');
  },
  
  updateSettings: (displayName: string) => {
    return db.prepare('UPDATE settings SET displayName = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?')
      .run(displayName, 'settings');
  },

  // Course Enrollments
  getEnrollment: (courseId: string) => {
    return db.prepare('SELECT * FROM course_enrollments WHERE courseId = ?').get(courseId);
  },
  
  createEnrollment: (courseId: string) => {
    const id = generateId();
    return db.prepare(`
      INSERT INTO course_enrollments (id, courseId, status, completionPercentage, updatedAt)
      VALUES (?, ?, 'IN_PROGRESS', 0, CURRENT_TIMESTAMP)
    `).run(id, courseId);
  },
  
  getAllEnrollments: () => {
    return db.prepare('SELECT * FROM course_enrollments').all();
  },
  
  updateEnrollmentProgress: (courseId: string, percentage: number) => {
    return db.prepare(`
      UPDATE course_enrollments 
      SET completionPercentage = ?, 
          status = CASE WHEN ? >= 100 THEN 'COMPLETED' ELSE status END,
          completedAt = CASE WHEN ? >= 100 THEN CURRENT_TIMESTAMP ELSE completedAt END,
          updatedAt = CURRENT_TIMESTAMP
      WHERE courseId = ?
    `).run(percentage, percentage, percentage, courseId);
  },

  // Lesson Progress
  getLessonProgress: (lessonId: string) => {
    return db.prepare('SELECT * FROM lesson_progress WHERE lessonId = ?').get(lessonId);
  },
  
  getCourseLessonProgress: (courseId: string) => {
    return db.prepare('SELECT * FROM lesson_progress WHERE courseId = ?').all(courseId);
  },
  
  markLessonComplete: (lessonId: string, courseId: string) => {
    const existing = db.prepare('SELECT * FROM lesson_progress WHERE lessonId = ?').get(lessonId);
    
    if (existing) {
      return db.prepare(`
        UPDATE lesson_progress 
        SET status = 'COMPLETED', completedAt = CURRENT_TIMESTAMP 
        WHERE lessonId = ?
      `).run(lessonId);
    } else {
      const id = generateId();
      return db.prepare(`
        INSERT INTO lesson_progress (id, lessonId, courseId, status, startedAt, completedAt)
        VALUES (?, ?, ?, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `).run(id, lessonId, courseId);
    }
  },

  // Exercise Submissions
  createExerciseSubmission: (
    exerciseId: string,
    courseId: string,
    code: string,
    language: string,
    status: string = 'PENDING',
    score: number = 0
  ) => {
    const id = generateId();
    return db.prepare(`
      INSERT INTO exercise_submissions (id, exerciseId, courseId, code, language, status, score, completedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(id, exerciseId, courseId, code, language, status, score);
  },
  
  getExerciseSubmissions: (exerciseId: string) => {
    return db.prepare('SELECT * FROM exercise_submissions WHERE exerciseId = ?').all(exerciseId);
  },
  
  getLatestExerciseSubmission: (exerciseId: string) => {
    return db.prepare(`
      SELECT * FROM exercise_submissions 
      WHERE exerciseId = ? 
      ORDER BY submittedAt DESC 
      LIMIT 1
    `).get(exerciseId);
  },
  
  getPassedExercisesCount: () => {
    return db.prepare(`
      SELECT COUNT(DISTINCT exerciseId) as count 
      FROM exercise_submissions 
      WHERE status = 'PASSED'
    `).get() as { count: number };
  },

  // Quiz Attempts
  createQuizAttempt: (
    quizId: string,
    courseId: string,
    answers: Record<string, unknown>,
    passed: boolean,
    score: number,
    pointsEarned: number,
    pointsPossible: number,
    timeSpent?: number
  ) => {
    const id = generateId();
    return db.prepare(`
      INSERT INTO quiz_attempts (id, quizId, courseId, answers, score, pointsEarned, pointsPossible, passed, completedAt, timeSpent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)
    `).run(id, quizId, courseId, JSON.stringify(answers), score, pointsEarned, pointsPossible, passed ? 1 : 0, timeSpent || null);
  },
  
  getQuizAttempts: (quizId: string) => {
    return db.prepare('SELECT * FROM quiz_attempts WHERE quizId = ?').all(quizId);
  },
  
  getLatestQuizAttempt: (quizId: string) => {
    return db.prepare(`
      SELECT * FROM quiz_attempts 
      WHERE quizId = ? 
      ORDER BY startedAt DESC 
      LIMIT 1
    `).get(quizId);
  },

  // Progress Stats
  getProgressStats: () => {
    const enrollments = db.prepare('SELECT COUNT(*) as count FROM course_enrollments').get() as { count: number };
    const completedLessons = db.prepare("SELECT COUNT(*) as count FROM lesson_progress WHERE status = 'COMPLETED'").get() as { count: number };
    const passedExercises = db.prepare("SELECT COUNT(DISTINCT exerciseId) as count FROM exercise_submissions WHERE status = 'PASSED'").get() as { count: number };
    const passedQuizzes = db.prepare('SELECT COUNT(*) as count FROM quiz_attempts WHERE passed = 1').get() as { count: number };
    
    return {
      coursesStarted: enrollments.count,
      lessonsCompleted: completedLessons.count,
      exercisesPassed: passedExercises.count,
      quizzesPassed: passedQuizzes.count,
    };
  },

  // Progress Clearing
  clearAllProgress: () => {
    db.prepare('DELETE FROM course_enrollments').run();
    db.prepare('DELETE FROM lesson_progress').run();
    db.prepare('DELETE FROM exercise_submissions').run();
    db.prepare('DELETE FROM quiz_attempts').run();
    db.prepare('DELETE FROM test_results').run();
    db.prepare('DELETE FROM certificates').run();
  },

  clearCourseProgress: (courseId: string) => {
    db.prepare('DELETE FROM course_enrollments WHERE courseId = ?').run(courseId);
    db.prepare('DELETE FROM lesson_progress WHERE courseId = ?').run(courseId);
    db.prepare('DELETE FROM exercise_submissions WHERE courseId = ?').run(courseId);
    db.prepare('DELETE FROM quiz_attempts WHERE courseId = ?').run(courseId);
    db.prepare('DELETE FROM certificates WHERE courseId = ?').run(courseId);
  },

  clearChapterProgress: (courseId: string, chapterId: string) => {
    db.prepare('DELETE FROM lesson_progress WHERE courseId = ? AND lessonId LIKE ?')
      .run(courseId, `%${chapterId}%`);
    db.prepare('DELETE FROM quiz_attempts WHERE courseId = ? AND quizId LIKE ?')
      .run(courseId, `%${chapterId}%`);
    db.prepare('DELETE FROM exercise_submissions WHERE courseId = ? AND exerciseId LIKE ?')
      .run(courseId, `%${chapterId}%`);
  },

  clearLessonProgress: (lessonId: string) => {
    db.prepare('DELETE FROM lesson_progress WHERE lessonId = ?').run(lessonId);
    db.prepare('DELETE FROM exercise_submissions WHERE exerciseId LIKE ?')
      .run(`%${lessonId}%`);
  },

  clearQuizProgress: (quizId: string) => {
    db.prepare('DELETE FROM quiz_attempts WHERE quizId = ?').run(quizId);
  },
};

// Export database connection and helper functions
export { db, generateId };

// Individual exports for cleaner imports
export const getSettings = dbHelpers.getSettings;
export const updateSettings = dbHelpers.updateSettings;
export const getEnrollment = dbHelpers.getEnrollment;
export const createEnrollment = dbHelpers.createEnrollment;
export const getAllEnrollments = dbHelpers.getAllEnrollments;
export const updateEnrollmentProgress = dbHelpers.updateEnrollmentProgress;
export const getLessonProgress = dbHelpers.getLessonProgress;
export const getCourseLessonProgress = dbHelpers.getCourseLessonProgress;
export const markLessonComplete = dbHelpers.markLessonComplete;
export const createExerciseSubmission = dbHelpers.createExerciseSubmission;
export const getExerciseSubmissions = dbHelpers.getExerciseSubmissions;
export const getLatestExerciseSubmission = dbHelpers.getLatestExerciseSubmission;
export const getPassedExercisesCount = dbHelpers.getPassedExercisesCount;
export const createQuizAttempt = dbHelpers.createQuizAttempt;
export const getQuizAttempts = dbHelpers.getQuizAttempts;
export const getLatestQuizAttempt = dbHelpers.getLatestQuizAttempt;
export const getProgressStats = dbHelpers.getProgressStats;
export const clearAllProgress = dbHelpers.clearAllProgress;
export const clearCourseProgress = dbHelpers.clearCourseProgress;
export const clearChapterProgress = dbHelpers.clearChapterProgress;
export const clearLessonProgress = dbHelpers.clearLessonProgress;
export const clearQuizProgress = dbHelpers.clearQuizProgress;

// Graceful shutdown
process.on('exit', () => db.close());
process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});
