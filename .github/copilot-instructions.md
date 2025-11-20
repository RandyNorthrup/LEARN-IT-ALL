# LEARN-IT-ALL - Copilot Instructions

**Last Updated**: November 17, 2025  
**Project**: LEARN-IT-ALL - Complete Custom Learning Platform  

---

## 🎯 CRITICAL PLATFORM VISION

### What We Are Building
- **Custom curriculum content**
- **Interactive lessons** with code editors and syntax highlighting
- **Automated exercise validation** and grading
- **Quiz and test systems** with scoring and pass/fail logic
- **User progress database** tracking lessons, tests, exercises
- **Local-only platform** - No authentication required

---

## CRITICAL PRINCIPLES

### 1. SCAN & ENHANCE BEFORE CREATION
- **ALWAYS** scan existing codebase before implementing new features
- Check for similar patterns, utilities, or implementations already present
- Extend existing systems rather than create duplicates
- Run linter and type checker before generating new code
- Verify all dependencies and imports resolve correctly

### 2. STRICT LINTING & TYPE SAFETY
- **ESLint**: Strict configuration with no warnings allowed
- **TypeScript**: Strict mode enabled (`strict: true`)
- **Prettier**: Auto-format all code before submission
- **No `any` types**: Always provide proper type annotations
- **No unhandled errors**: All promises must have `.catch()` or try-catch
- **No console logs**: Use proper logging system (implement if missing)
- **No commented code**: Delete or convert to proper documentation

### 3. FULL IMPLEMENTATION MINDSET
- **No TODOs**: Mark inline with // TODO-PHASE or // FIXME with description
- **No Placeholders**: Replace all placeholder text with real content
- **No Stub Functions**: If it needs implementation, implement it now or track it
- **No Mock Data**: Use real database or mark with // MOCK: comment
- **Complete Features**: Don't commit partial implementations

---

## CODE QUALITY STANDARDS

### Semantic Code & Named Constants
```typescript
// ✅ GOOD - Semantic code with named constants
const COURSE_COMPLETION_THRESHOLD_PERCENT = 100;
const LESSON_MIN_DURATION_MINUTES = 1;
const QUIZ_PASSING_SCORE_PERCENT = 70;
const COURSE_TITLE_MAX_LENGTH = 255;

interface UserProgress {
  userId: string;
  courseId: string;
  completionPercentage: number;
  lastAccessedAt: Date;
}

async function getUserProgress(userId: string): Promise<UserProgress[]> {
  try {
    if (!userId || !isValidUUID(userId)) {
      throw new ValidationError('Invalid userId format');
    }
    
    const userProgress = await db.userProgress.findMany({
      where: { userId },
      select: { courseId: true, completionPercentage: true, lastAccessedAt: true }
    });
    
    return userProgress;
  } catch (error) {
    logger.error('Failed to get user progress', { userId, error });
    throw error;
  }
}

// ❌ BAD - Magic numbers, unclear code, loose types
function getUserProgress(userId: any) {
  return db.userProgress.findMany({ where: { userId } })
    .filter(p => p.x > 50)  // What is 50? What is x?
    .slice(0, 10);          // Why 10? Hardcoded limit?
}
```

### Named Constants Pattern
```typescript
// src/lib/constants.ts - Define all magic numbers here
export const COURSE_CONSTRAINTS = {
  TITLE_MAX_LENGTH: 255,
  DESCRIPTION_MAX_LENGTH: 2000,
  COMPLETION_THRESHOLD_PERCENT: 100,
  MIN_RATING: 0,
  MAX_RATING: 5,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 1,
} as const;

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  UUID_REGEX: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
} as const;

// Usage everywhere
import { COURSE_CONSTRAINTS, PAGINATION } from '@/lib/constants';

if (title.length > COURSE_CONSTRAINTS.TITLE_MAX_LENGTH) {
  throw new ValidationError(`Title exceeds max length of ${COURSE_CONSTRAINTS.TITLE_MAX_LENGTH}`);
}
```

### Semantic Naming Guidelines
```typescript
// ✅ GOOD - Clear, semantic names
const isUserEnrolled = true;
const remainingLessonCount = 5;
const completionPercentage = 85;
const enrollmentDate = new Date();
const maxAttemptsPerLesson = 3;

// ❌ BAD - Unclear names
const x = true;
const cnt = 5;
const perc = 85;
const dt = new Date();
const max = 3;

// ✅ GOOD - Boolean names start with is/has/can/should
const isCourseLocked = true;
const hasUserCompletedLesson = false;
const canUserAccessContent = true;
const shouldShowProgressBar = true;

// ✅ GOOD - Semantic array/collection names
const enrolledCourseIds: string[] = [];
const userLessonProgresses: UserProgress[] = [];
const completedModuleMap: Map<string, Date> = new Map();

// ✅ GOOD - Semantic function names (verb-noun pattern)
function validateUserEmail(email: string): boolean
function fetchUserCourses(userId: string): Promise<Course[]>
function updateCourseProgress(userId: string, courseId: string): Promise<void>
function calculateCompletionPercentage(completedLessons: number, totalLessons: number): number
```

### Component Guidelines
```typescript
// ✅ GOOD - Proper props typing, loading/error states, accessible
interface CourseCardProps {
  courseId: string;
  title: string;
  completionPercentage: number;
  onSelect: (courseId: string) => void;
}

export function CourseCard({
  courseId,
  title,
  completionPercentage,
  onSelect
}: CourseCardProps): JSX.Element {
  if (completionPercentage < 0 || completionPercentage > 100) {
    logger.warn('Invalid completion percentage', { courseId, completionPercentage });
  }

  return (
    <button
      onClick={() => onSelect(courseId)}
      aria-label={`${title} - ${completionPercentage}% complete`}
      className={styles.card}
    >
      {/* Content */}
    </button>
  );
}

// ❌ BAD - Loose props, no accessibility, error states ignored
export function CourseCard(props: any) {
  return (
    <div onClick={() => props.onSelect(props.courseId)}>
      {props.title} - {props.percentage}%
    </div>
  );
}
```

---

## MOCK DATA & PLACEHOLDER MANAGEMENT

### When to Create Mock Data
- Database not yet implemented
- External API not available
- Feature in development
- Testing specific scenarios

### Inline Comments for TODOs
Mark incomplete work directly in code:

---

## BEFORE IMPLEMENTING ANY FEATURE

### Checklist - SCAN & ENHANCE
- [ ] Run `npm run lint` - all files pass
- [ ] Run `npm run type-check` - no TypeScript errors
- [ ] Check if similar feature exists in codebase
- [ ] Review database schema for required tables
- [ ] Check if needed API endpoints exist
- [ ] Verify all imports and dependencies available
- [ ] Review error handling patterns used elsewhere

### During Implementation
- [ ] Write TypeScript interfaces first
- [ ] Add proper error handling
- [ ] Add logging for debugging
- [ ] Add unit tests if new utilities
- [ ] Document API changes

### Before Committing
- [ ] All linting passes (ESLint + Prettier)
- [ ] All TypeScript checks pass
- [ ] No console.log statements
- [ ] TODOs/FIXMEs marked with inline comments
- [ ] Mock data marked with // MOCK: comments
- [ ] Error handling complete
- [ ] No commented-out code
- [ ] Documentation updated

---