# 🎓 LEARN-IT-ALL

**A Complete Custom Learning Platform for Interactive Technical Education**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📋 Overview

LEARN-IT-ALL is a comprehensive, **local-first learning platform** designed for technical education. Built with modern web technologies, it provides an interactive environment for students to learn programming through structured courses, hands-on exercises, quizzes, and gamified challenges.

**Currently Available**: Python Basics course with 180+ lessons and exercises. Additional courses coming soon!

### ✨ Key Features

- 🎯 **Custom Curriculum Content** - Structured courses with lessons, exercises, and assessments
- 💻 **Interactive Code Editor** - Built-in Monaco Editor with syntax highlighting
- ✅ **Automated Exercise Validation** - Real-time code validation and grading
- 📝 **Quiz & Test Systems** - Comprehensive testing with scoring and pass/fail logic
- 📊 **Progress Tracking** - SQLite database tracking user progress across all content
- 🎮 **Gamified Learning** - Interactive games including Code Hunter, Algorithm Arena, and more
- 🚀 **Local-Only Platform** - No authentication required, perfect for offline learning
- 🎨 **Modern UI** - Responsive design with Tailwind CSS and React 19

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.0 (App Router) |
| **Language** | TypeScript 5.3 (Strict Mode) |
| **Database** | SQLite with better-sqlite3 |
| **Styling** | Tailwind CSS 4.0 |
| **Code Editor** | Monaco Editor (VS Code engine) |
| **Syntax Highlighting** | React Syntax Highlighter |
| **Markdown** | React Markdown with Gray Matter |
| **Validation** | Zod 4.1 |
| **Icons** | Lucide React |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/LEARN-IT-ALL.git

# Navigate to project directory
cd LEARN-IT-ALL

# Install dependencies
npm install

# Start development server (database auto-initializes)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the platform.

---

## 📁 Project Structure

```
LEARN-IT-ALL/
├── content/              # Course content (JSON-based curriculum)
│   └── courses/
│       └── python-basics/    # 180+ lessons, exercises, and quizzes
├── prisma/               # SQLite database (auto-created)
├── public/               # Static assets
├── scripts/              # Utility scripts
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   ├── courses/      # Course pages
│   │   ├── dashboard/    # User dashboard
│   │   ├── games/        # Gamified challenges
│   │   └── progress/     # Progress tracking
│   ├── components/       # React components
│   ├── lib/              # Utilities and helpers
│   │   ├── constants.ts  # App-wide constants
│   │   ├── db.ts         # Database utilities
│   │   └── courseLoader.ts
│   └── types/            # TypeScript type definitions
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 📚 Available Courses

### 🐍 Python Basics (Available Now)
Complete introduction to Python programming with 180+ lessons and exercises covering:
- **Chapter 1**: Python fundamentals, variables, and data types
- **Chapter 2**: String operations and user input
- **Chapter 3**: Comments, debugging, and best practices
- **Chapter 4**: Variables deep dive (naming, scope, memory)
- **Chapter 5**: Computer science fundamentals
- **Chapter 6**: Conditionals and boolean logic
- **Chapter 7**: Loops and iteration patterns
- **Chapter 8**: Functions and advanced scope
- **Chapter 9**: Lists and list operations
- **Chapter 10**: Dictionaries and key-value pairs
- **Chapter 11**: Sets and set operations
- **Chapter 12**: Error handling and testing
- **Chapter 13**: Real-world practice projects

### 🚧 Coming Soon
- 💻 CompTIA A+ Certification
- 🌐 CompTIA Network+ Certification
- 🐍 Python Advanced Topics
- 🌐 Web Development Fundamentals

---

## 🎮 Interactive Features

### Learning Modules
- **Lessons** - Structured content with explanations and examples
- **Exercises** - Hands-on coding challenges with validation
- **Quizzes** - Multiple-choice assessments with instant feedback
- **Tests** - Comprehensive evaluations with pass/fail criteria

### Gamified Challenges
- **Code Hunter** - Find bugs in code snippets
- **Algorithm Arena** - Solve algorithmic puzzles
- **Syntax Speed** - Test your coding speed
- **Logic Maze** - Navigate programming logic
- **Code Builder** - Build projects step-by-step

---

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Database
# Database auto-initializes on first run
# Progress data stored in prisma/learn-it-all.db

# Code Quality
npm run lint             # Run ESLint (standard)
npm run lint:strict      # Run ESLint (strict mode)
npm run lint:fix         # Auto-fix linting issues
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Utilities
npm run mocks:scan       # Scan for TODO/MOCK/FIXME comments
```

---

## 🗄️ Database Schema

The platform uses SQLite with better-sqlite3. Key tables include:

- **settings** - User preferences and display name
- **course_enrollments** - Course enrollment and completion tracking
- **lesson_progress** - Individual lesson completion status
- **exercise_submissions** - Coding exercise submissions and scores
- **quiz_attempts** - Quiz attempts with scores and pass/fail status
- **test_results** - Exercise test case results
- **certificates** - Course completion certificates

See `src/lib/db.ts` for the complete schema and database helpers.

---

## 🎨 Code Quality Standards

This project follows strict code quality guidelines:

### ✅ Enforced Standards
- **ESLint** - Strict configuration with zero warnings
- **TypeScript Strict Mode** - Full type safety
- **Prettier** - Consistent code formatting
- **No `any` types** - Explicit typing required
- **Semantic naming** - Named constants over magic numbers
- **Error handling** - All promises must handle errors
- **No console logs** - Use proper logging system

### 📝 Development Guidelines
- Scan codebase before implementing new features
- Extend existing systems rather than duplicate
- Mark incomplete work with inline comments (`// TODO-PHASE`, `// FIXME`)
- Document mock data with `// MOCK:` comments
- Full implementation mindset - no placeholders or stubs

See `.github/copilot-instructions.md` for complete guidelines.

---

## 🤝 Contributing

This is currently a personal learning platform project. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- All tests pass
- Code follows ESLint strict configuration
- TypeScript type checking passes
- Prettier formatting is applied

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js** - The React framework for production
- **better-sqlite3** - Fast SQLite3 bindings for Node.js
- **Monaco Editor** - The editor that powers VS Code
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library

---

## 📞 Contact & Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Check existing documentation in `/docs/` (local development only)

---

## 🚧 Project Status

**Current Version**: 0.1.0 (Alpha)

**Active Development** - This platform is under active development. Features are being added regularly.

### Roadmap
- [x] Python Basics course (180+ lessons)
- [ ] CompTIA A+ Certification course
- [ ] CompTIA Network+ Certification course
- [ ] Python Advanced Topics course
- [ ] Enhanced progress analytics dashboard
- [ ] More gamified challenges and mini-games
- [ ] Certificate generation system
- [ ] Export/import progress data
- [ ] Course recommendation engine

---

**Built with ❤️ for learners everywhere**
