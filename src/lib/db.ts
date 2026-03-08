import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { mkdirSync } from 'fs';

// Lazy initialization - only create DB connection when needed
let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    // Create singleton database connection
    const dbPath = join(process.cwd(), 'database', 'learn-it-all.db');
    // Ensure the database directory exists
    mkdirSync(dirname(dbPath), { recursive: true });
    db = new Database(dbPath);

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
    getDb().exec(initSchema);
  }
  
  return db;
}

// Helper to generate unique IDs
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Query helpers
export const dbHelpers = {
  // Settings
  getSettings: () => {
    return getDb().prepare('SELECT * FROM settings WHERE id = ?').get('settings');
  },
  
  updateSettings: (displayName: string) => {
    return getDb().prepare('UPDATE settings SET displayName = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?')
      .run(displayName, 'settings');
  },

  // Course Enrollments
  getEnrollment: (courseId: string) => {
    return getDb().prepare('SELECT * FROM course_enrollments WHERE courseId = ?').get(courseId);
  },
  
  createEnrollment: (courseId: string) => {
    const id = generateId();
    return getDb().prepare(`
      INSERT INTO course_enrollments (id, courseId, status, completionPercentage, updatedAt)
      VALUES (?, ?, 'IN_PROGRESS', 0, CURRENT_TIMESTAMP)
    `).run(id, courseId);
  },
  
  getAllEnrollments: () => {
    return getDb().prepare('SELECT * FROM course_enrollments').all();
  },
  
  updateEnrollmentProgress: (courseId: string, percentage: number) => {
    return getDb().prepare(`
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
    return getDb().prepare('SELECT * FROM lesson_progress WHERE lessonId = ?').get(lessonId);
  },
  
  getCourseLessonProgress: (courseId: string) => {
    return getDb().prepare('SELECT * FROM lesson_progress WHERE courseId = ?').all(courseId);
  },
  
  markLessonComplete: (lessonId: string, courseId: string) => {
    const existing = getDb().prepare('SELECT * FROM lesson_progress WHERE lessonId = ?').get(lessonId);
    
    if (existing) {
      return getDb().prepare(`
        UPDATE lesson_progress 
        SET status = 'COMPLETED', completedAt = CURRENT_TIMESTAMP 
        WHERE lessonId = ?
      `).run(lessonId);
    } else {
      const id = generateId();
      return getDb().prepare(`
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
    return getDb().prepare(`
      INSERT INTO exercise_submissions (id, exerciseId, courseId, code, language, status, score, completedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(id, exerciseId, courseId, code, language, status, score);
  },
  
  getExerciseSubmissions: (exerciseId: string) => {
    return getDb().prepare('SELECT * FROM exercise_submissions WHERE exerciseId = ?').all(exerciseId);
  },
  
  getLatestExerciseSubmission: (exerciseId: string) => {
    return getDb().prepare(`
      SELECT * FROM exercise_submissions 
      WHERE exerciseId = ? 
      ORDER BY submittedAt DESC 
      LIMIT 1
    `).get(exerciseId);
  },
  
  getPassedExercisesCount: () => {
    return getDb().prepare(`
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
    return getDb().prepare(`
      INSERT INTO quiz_attempts (id, quizId, courseId, answers, score, pointsEarned, pointsPossible, passed, completedAt, timeSpent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)
    `).run(id, quizId, courseId, JSON.stringify(answers), score, pointsEarned, pointsPossible, passed ? 1 : 0, timeSpent || null);
  },
  
  getQuizAttempts: (quizId: string) => {
    return getDb().prepare('SELECT * FROM quiz_attempts WHERE quizId = ?').all(quizId);
  },
  
  getLatestQuizAttempt: (quizId: string) => {
    return getDb().prepare(`
      SELECT * FROM quiz_attempts 
      WHERE quizId = ? 
      ORDER BY startedAt DESC 
      LIMIT 1
    `).get(quizId);
  },

  // Progress Stats
  getProgressStats: () => {
    const enrollments = getDb().prepare('SELECT COUNT(*) as count FROM course_enrollments').get() as { count: number };
    const completedCourses = getDb().prepare("SELECT COUNT(*) as count FROM course_enrollments WHERE status = 'COMPLETED'").get() as { count: number };
    const completedLessons = getDb().prepare("SELECT COUNT(*) as count FROM lesson_progress WHERE status = 'COMPLETED'").get() as { count: number };
    const passedExercises = getDb().prepare("SELECT COUNT(DISTINCT exerciseId) as count FROM exercise_submissions WHERE status = 'PASSED'").get() as { count: number };
    const passedQuizzes = getDb().prepare('SELECT COUNT(*) as count FROM quiz_attempts WHERE passed = 1').get() as { count: number };
    const totalTimeSpent = getDb().prepare('SELECT COALESCE(SUM(timeSpent), 0) as total FROM lesson_progress').get() as { total: number };
    
    return {
      coursesStarted: enrollments.count,
      coursesCompleted: completedCourses.count,
      lessonsCompleted: completedLessons.count,
      exercisesPassed: passedExercises.count,
      quizzesPassed: passedQuizzes.count,
      totalStudyHours: Math.round((totalTimeSpent.total / 3600) * 10) / 10,
    };
  },

  // Progress Clearing
  clearAllProgress: () => {
    getDb().prepare('DELETE FROM course_enrollments').run();
    getDb().prepare('DELETE FROM lesson_progress').run();
    getDb().prepare('DELETE FROM exercise_submissions').run();
    getDb().prepare('DELETE FROM quiz_attempts').run();
    getDb().prepare('DELETE FROM test_results').run();
    getDb().prepare('DELETE FROM certificates').run();
  },

  clearCourseProgress: (courseId: string) => {
    getDb().prepare('DELETE FROM course_enrollments WHERE courseId = ?').run(courseId);
    getDb().prepare('DELETE FROM lesson_progress WHERE courseId = ?').run(courseId);
    getDb().prepare('DELETE FROM exercise_submissions WHERE courseId = ?').run(courseId);
    getDb().prepare('DELETE FROM quiz_attempts WHERE courseId = ?').run(courseId);
    getDb().prepare('DELETE FROM certificates WHERE courseId = ?').run(courseId);
  },

  clearChapterProgress: (courseId: string, chapterId: string) => {
    getDb().prepare('DELETE FROM lesson_progress WHERE courseId = ? AND lessonId LIKE ?')
      .run(courseId, `%${chapterId}%`);
    getDb().prepare('DELETE FROM quiz_attempts WHERE courseId = ? AND quizId LIKE ?')
      .run(courseId, `%${chapterId}%`);
    getDb().prepare('DELETE FROM exercise_submissions WHERE courseId = ? AND exerciseId LIKE ?')
      .run(courseId, `%${chapterId}%`);
  },

  clearLessonProgress: (lessonId: string) => {
    getDb().prepare('DELETE FROM lesson_progress WHERE lessonId = ?').run(lessonId);
    getDb().prepare('DELETE FROM exercise_submissions WHERE exerciseId LIKE ?')
      .run(`%${lessonId}%`);
  },

  clearQuizProgress: (quizId: string) => {
    getDb().prepare('DELETE FROM quiz_attempts WHERE quizId = ?').run(quizId);
  },
};

// Export database connection and helper functions
export { db, generateId };

// Individual exports for commonly used functions
export const createQuizAttempt = dbHelpers.createQuizAttempt;
export const markLessonComplete = dbHelpers.markLessonComplete;

// Graceful shutdown
process.on('exit', () => {
  if (db) db.close();
});
process.on('SIGINT', () => {
  if (db) db.close();
  process.exit(0);
});
