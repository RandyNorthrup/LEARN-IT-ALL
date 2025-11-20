# 🎓 LEARN-IT-ALL

**A Complete Custom Learning Platform for Interactive Technical Education**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📋 Overview

LEARN-IT-ALL is a comprehensive, **local-first learning platform** designed for technical education. Built with modern web technologies, it provides an interactive environment for students to learn programming, IT certifications, and technical skills through structured courses, hands-on exercises, quizzes, and gamified challenges.

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
| **Database** | SQLite with Prisma ORM 7.0 |
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

# Generate Prisma client
npm run postinstall

# Run database migrations
npm run db:migrate

# Seed the database (optional)
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the platform.

---

## 📁 Project Structure

```
LEARN-IT-ALL/
├── content/              # Course content (JSON-based curriculum)
│   └── courses/
│       ├── python-basics/
│       ├── comptia-a-plus/
│       └── comptia-network-plus/
├── prisma/               # Database schema and migrations
│   ├── schema.prisma
│   └── migrations/
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

### 🐍 Python Basics
Complete introduction to Python programming with 50+ exercises covering:
- Variables and data types
- Functions and control flow
- Lists and data structures
- Error handling
- Best practices

### 💻 CompTIA A+ Certification
Comprehensive IT certification preparation covering:
- Hardware fundamentals
- Operating systems
- Networking basics
- Security fundamentals
- Troubleshooting

### 🌐 CompTIA Network+ Certification
Network infrastructure and administration:
- Network protocols
- OSI model
- Network devices
- Security concepts
- Troubleshooting methodologies

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
npm run db:migrate       # Run Prisma migrations
npm run db:reset         # Reset database
npm run db:seed          # Seed database with content

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

The platform uses SQLite with Prisma ORM. Key models include:

- **User** - User profiles and preferences
- **Course** - Course metadata and structure
- **Lesson** - Individual lesson content
- **Exercise** - Coding challenges
- **Quiz** - Assessments and questions
- **Progress** - User progress tracking
- **Achievement** - Gamification rewards

See `prisma/schema.prisma` for the complete schema.

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
- **Prisma** - Next-generation ORM
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
- [ ] Additional course content
- [ ] Enhanced progress analytics
- [ ] More gamified challenges
- [ ] Certificate generation
- [ ] Export/import progress
- [ ] Multi-language support

---

**Built with ❤️ for learners everywhere**
