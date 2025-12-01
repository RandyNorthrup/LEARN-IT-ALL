# Content Management - File-Based System

LEARN-IT-ALL uses a **hybrid file-based content system** for managing courses, lessons, exercises, and quizzes.

## 📁 Directory Structure

```
content/
└── courses/
    └── [course-id]/
        ├── course.json          # Course metadata
        ├── lessons/
        │   ├── 01-intro.md      # Markdown lessons with frontmatter
        │   ├── 02-basics.md
        │   └── ...
        ├── exercises/
        │   ├── ex-hello.json    # Exercise definitions with test cases
        │   ├── ex-variables.json
        │   └── ...
        └── quizzes/
            ├── quiz-ch1.json    # Quiz questions and answers
            └── ...
```

## 🎨 Format Choice

| Content Type | Format | Why |
|--------------|--------|-----|
| **Lessons** | Markdown (`.md`) | Human-friendly prose, code blocks, formatting |
| **Courses** | JSON (`.json`) | Structured metadata, chapters, prerequisites |
| **Exercises** | JSON (`.json`) | Test cases, validation rules, structured data |
| **Quizzes** | JSON (`.json`) | Questions, options, correct answers |

---

## 📝 Creating Content

### 1. Course Metadata (`course.json`)

```json
{
  "id": "python-basics",
  "title": "Learn Python - Fundamentals",
  "description": "Master Python programming from scratch",
  "difficulty": "beginner",
  "estimatedHours": 20,
  "language": "python",
  "tags": ["python", "programming", "beginner"],
  "prerequisites": [],
  "chapters": [
    {
      "id": "ch1-intro",
      "title": "Chapter 1: Getting Started",
      "description": "Introduction to Python",
      "order": 1,
      "lessons": ["01-what-is-python.md", "02-variables.md"]
    }
  ],
  "author": "LEARN-IT-ALL",
  "published": true,
  "createdAt": "2025-11-18T00:00:00Z",
  "updatedAt": "2025-11-18T00:00:00Z"
}
```

### 2. Lessons (Markdown with Frontmatter)

Create `lessons/01-what-is-python.md`:

```markdown
---
id: what-is-python
title: What is Python?
chapterId: ch1-intro
order: 1
duration: 15
objectives:
  - Understand what Python is
  - Learn Python use cases
  - Write your first program
---

# What is Python?

Python is a **high-level programming language**...

## Your First Program

\`\`\`python
print("Hello, World!")
\`\`\`
```

**Frontmatter fields:**
- `id`: Unique lesson identifier (matches filename)
- `title`: Lesson title
- `chapterId`: Chapter this lesson belongs to
- `order`: Display order within chapter
- `duration`: Estimated minutes to complete
- `objectives`: Learning objectives (array)

**Content:**
- Write in standard Markdown
- Use code blocks with language tags
- Include headings, lists, bold, italics, etc.

### 3. Exercises (`exercises/ex-hello-world.json`)

```json
{
  "id": "ex-hello-world",
  "lessonId": "what-is-python",
  "title": "Your First Python Program",
  "description": "Write a program that prints 'Hello, World!'",
  "difficulty": "beginner",
  "points": 10,
  "language": "python",
  "starterCode": "# Write your code below\n",
  "solution": "print(\"Hello, World!\")",
  "hints": [
    "Use the print() function",
    "Remember to use quotes around text"
  ],
  "testCases": [
    {
      "id": "tc1",
      "description": "Should print 'Hello, World!'",
      "input": "",
      "expectedOutput": "Hello, World!",
      "isHidden": false
    }
  ]
}
```

**Test Case Types:**
1. **Output matching**: Check `expectedOutput` against actual output
2. **Validation code**: Use `validation` field with Python assertions

Example with validation:
```json
{
  "id": "tc2",
  "description": "Should create variable 'name'",
  "validation": "assert 'name' in dir(), 'Variable name not found'",
  "isHidden": false
}
```

### 4. Quizzes (`quizzes/quiz-chapter-1.json`)

```json
{
  "id": "quiz-chapter-1",
  "courseId": "python-basics",
  "chapterId": "ch1-intro",
  "title": "Chapter 1 Quiz",
  "description": "Test your understanding",
  "passingScore": 70,
  "timeLimit": 600,
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What type of language is Python?",
      "points": 10,
      "options": [
        {"id": "a", "text": "Compiled"},
        {"id": "b", "text": "Interpreted"},
        {"id": "c", "text": "Assembly"}
      ],
      "correctAnswer": "b",
      "explanation": "Python is an interpreted language"
    },
    {
      "id": "q2",
      "type": "true-false",
      "question": "Python requires type declarations",
      "points": 10,
      "correctAnswer": false,
      "explanation": "Python is dynamically typed"
    },
    {
      "id": "q3",
      "type": "multiple-select",
      "question": "Python is used for: (select all)",
      "points": 15,
      "options": [
        {"id": "a", "text": "Web development"},
        {"id": "b", "text": "Data science"},
        {"id": "c", "text": "Machine learning"}
      ],
      "correctAnswers": ["a", "b", "c"],
      "explanation": "Python is versatile"
    },
    {
      "id": "q4",
      "type": "code-completion",
      "question": "Create a variable 'name' with value 'Python'",
      "points": 15,
      "starterCode": "____ = ____",
      "correctAnswer": "name = \"Python\"",
      "acceptableAnswers": ["name = \"Python\"", "name = 'Python'"],
      "explanation": "Variables use assignment operator"
    }
  ]
}
```

**Question Types:**
- `multiple-choice`: Single correct answer
- `true-false`: Boolean answer
- `multiple-select`: Multiple correct answers
- `code-completion`: Code snippet answer

---

## 🔧 Usage in Code

### Load Content

```typescript
import { 
  loadCourse, 
  loadLesson, 
  loadExercise, 
  loadQuiz 
} from '@/lib/content-loader';

// Load course
const course = await loadCourse('python-basics');

// Load single lesson
const lesson = await loadLesson('python-basics', '01-what-is-python');

// Load exercise
const exercise = await loadExercise('python-basics', 'ex-hello-world');

// Load quiz
const quiz = await loadQuiz('python-basics', 'quiz-chapter-1');
```

### API Endpoints

- **Lessons**: `GET /api/lessons?courseId=python-basics`
- **Single Lesson**: `GET /api/lessons?courseId=python-basics&id=01-what-is-python`
- **Exercises**: `GET /api/exercises?courseId=python-basics`
- **Quizzes**: `GET /api/quizzes?courseId=python-basics`

---

## ✅ Validation

All content is validated using **Zod schemas** in `src/lib/content-loader.ts`:

- Type safety at runtime
- Catches malformed content early
- Clear error messages

---

## 🚀 Adding New Content

### Create a New Course

1. Create directory: `content/courses/[course-id]/`
2. Add subdirectories: `lessons/`, `exercises/`, `quizzes/`
3. Create `course.json` with metadata
4. Add lesson Markdown files
5. Add exercise/quiz JSON files
6. Content automatically available via APIs!

### Add to Existing Course

1. Navigate to course directory
2. Add new `.md` file to `lessons/`
3. Update `course.json` to reference new lesson
4. Optionally add exercises/quizzes
5. Restart dev server (or wait for hot reload)

---

## 🎓 Example: Python Basics Course

Included example course with:
- ✅ Course metadata
- ✅ 2 lessons (What is Python, Variables)
- ✅ 2 exercises (Hello World, Variables)
- ✅ 1 quiz (50 questions, multiple types)

Location: `content/courses/python-basics/`

Test it:
```bash
npm run dev
# Visit http://localhost:3000/lessons/python-basics
```

---


**Content lives in files, progress lives in database.**
