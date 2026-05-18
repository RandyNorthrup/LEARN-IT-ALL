# 🎓 LEARN-IT-ALL

**A Complete Custom Learning Platform for Interactive Technical Education**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite)](https://www.sqlite.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Docker-Automated_Builds-2496ED?style=flat-square&logo=docker)](https://github.com/RandyNorthrup/LEARN-IT-ALL/pkgs/container/learn-it-all)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📋 Overview

LEARN-IT-ALL is a comprehensive, **local-first learning platform** for mastering technology skills. Built with cutting-edge web technologies, it provides an immersive environment for learning programming, networking, data science, security, and more through structured courses, hands-on coding exercises, interactive quizzes, real-world projects, and gamified challenges.

**Live Content**: Multiple comprehensive courses with thousands of lessons, hundreds of project guides across dozens of categories, and interactive learning games!

### ✨ Key Features

#### 📚 Learning Content
- 🎯 **Complete Courses** - Thousands of structured lessons across Python, JavaScript, Web Development, Networking, Data Science, and more
- 💻 **Interactive Code Editor** - Built-in Monaco Editor (VS Code engine) with full syntax highlighting
- ✅ **Automated Exercise Validation** - Real-time code execution and testing with instant feedback
- 📝 **Quiz & Test Systems** - 15+ quizzes with comprehensive scoring and pass/fail criteria
- 🛠️ **Hundreds of Project Guides** - Step-by-step tutorials for building real technologies from scratch
- 📊 **Progress Tracking** - Complete SQLite database tracking every lesson, exercise, quiz, and certificate

#### 🎮 Interactive Features
- 🕹️ **Learning Games** - Code Hunter, Code Lander, Algorithm Arena, Lunar Lander, Syntax Speed, Logic Maze, Code Builder
- 🏆 **Gamification System** - Points, badges, and achievements for completed work
- 📈 **Visual Progress Dashboard** - Track your journey across all courses and projects
- 🎯 **Learning Tracks** - Curated paths through related courses
- 🎨 **Modern UI/UX** - Responsive design with Tailwind CSS 4.0 and React 19

#### 🚀 Platform Features
- 🔒 **100% Local & Private** - No authentication, no cloud, no tracking - runs entirely on your machine
- 💾 **SQLite Database** - Fast, reliable progress tracking with better-sqlite3
- 🌐 **Offline-First** - Works without internet after initial setup
- ⚡ **Blazing Fast** - Built on Next.js 16 with App Router and Turbopack
- 🐳 **Docker Ready** - Pre-built images with automated CI/CD, ready to deploy anywhere
- 🎓 **Self-Paced Learning** - Learn at your own speed, your own way

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Next.js (App Router + Turbopack) | 16.0.3 |
| **Language** | TypeScript (Strict Mode) | 5.3.3 |
| **UI Library** | React | 19.0.0 |
| **Database** | SQLite (better-sqlite3 - direct, no ORM) | 12.4.1 |
| **Styling** | Tailwind CSS + PostCSS | 4.0 |
| **Code Editor** | Monaco Editor (VS Code engine) | 0.54.0 |
| **Syntax Highlighting** | React Syntax Highlighter | 16.1.0 |
| **Markdown** | React Markdown + Gray Matter | 10.1.0 |
| **Validation** | Zod | 4.1.12 |
| **Icons** | Lucide React | 0.554.0 |
| **Code Quality** | ESLint + Prettier + TypeScript ESLint | 9.39.1 |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ or 20+ LTS recommended
- **npm** (comes with Node.js) or **yarn**
- **Git** for cloning the repository
- **Docker** (optional) for containerized deployment

### Installation

#### Option 1: Docker (Recommended for Production)

The fastest way to get started is using Docker. Pre-built images are automatically published to GitHub Container Registry on every push.

```bash
# Using Docker Compose (recommended)
docker-compose up -d

# Or pull from GitHub Container Registry
docker pull ghcr.io/randynorthrup/learn-it-all:latest
docker run -p 3000:3000 \
  -v $(pwd)/database:/app/database \
  -v $(pwd)/content:/app/content \
  ghcr.io/randynorthrup/learn-it-all:latest
```

**Docker Benefits:**
- 🚀 **Zero Configuration** - Everything pre-configured and ready to run
- 📦 **Isolated Environment** - No conflicts with your local Node.js setup
- 🔄 **Easy Updates** - Pull new image and restart container
- 💾 **Persistent Data** - Database and content survive container restarts
- 🏭 **Production-Ready** - Multi-stage builds with optimized Next.js standalone output

See [DOCKER.md](DOCKER.md) for complete Docker documentation, troubleshooting, and advanced deployment options.

**Building Your Own Image:**

You can build the Docker image locally if you want to customize it or don't want to use the pre-built image:

```bash
# Build the image
docker build -t learn-it-all:local .

# Run your custom build
docker run -p 3000:3000 \
  -v $(pwd)/database:/app/database \
  -v $(pwd)/content:/app/content \
  learn-it-all:local
```

The Dockerfile uses a multi-stage build process:
1. **deps stage** - Installs all dependencies including native packages (vips-dev for image processing)
2. **builder stage** - Builds the Next.js application in standalone mode
3. **runner stage** - Creates minimal production image with only necessary files

**Automated Builds:**

Every push to the `main` branch automatically triggers a GitHub Actions workflow that:
- Builds the Docker image with build caching for speed
- Tags with `latest`, `main`, and commit SHA
- Pushes to GitHub Container Registry (ghcr.io)
- Makes the image publicly available for anyone to pull

#### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/RandyNorthrup/LEARN-IT-ALL.git

# Navigate to project directory
cd LEARN-IT-ALL

# Install dependencies
npm install

# Start development server
npm run dev
```

The platform will:
1. Automatically initialize the SQLite database on first run
2. Create the `database/learn-it-all.db` file
3. Launch at [http://localhost:3000](http://localhost:3000)
4. Prompt you to set your display name on first visit

**That's it!** No configuration, no environment variables, no authentication setup required.

---

## 📁 Project Structure

```
LEARN-IT-ALL/
├── content/                      # All learning content (JSON-based)
│   ├── courses/                  # Complete courses with lessons, exercises, and quizzes
│   │   ├── python-basics/        # 184 lessons, 17 chapters
│   │   ├── python-oop/           # 61 lessons, 7 chapters
│   │   ├── comptia-network-plus/ # 93 lessons, 10 chapters
│   │   └── ...                   # (lessons, exercises, quizzes per course)
│   └── projects/                 # Hundreds of project guides, multiple categories
│       ├── index.json            # Project catalog
│       ├── database/             # Build Your Own Database guides
│       ├── game/                 # Build Your Own Game guides
│       └── ...                   # (more project categories)
├── database/                     # SQLite database (auto-created)
│   └── learn-it-all.db          # All user progress data
├── public/                       # Static assets (images, icons)
├── scripts/                      # Utility scripts for content management
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API routes (REST endpoints)
│   │   │   ├── courses/          # Course data endpoints
│   │   │   ├── progress/         # Progress tracking endpoints
│   │   │   ├── projects/         # Project catalog endpoints
│   │   │   ├── settings/         # User settings endpoints
│   │   │   └── tracks/           # Learning tracks endpoints
│   │   ├── courses/              # Course pages & lesson viewer
│   │   ├── dashboard/            # Main dashboard (homepage)
│   │   ├── games/                # Interactive learning games
│   │   │   ├── code-hunter/      # Find bugs in code
│   │   │   ├── code-lander/      # Guide code to safe landing
│   │   │   ├── algorithm-arena/  # Solve algorithmic puzzles
│   │   │   ├── lunar-lander/     # Physics-based challenges
│   │   │   ├── syntax-speed/     # Speed coding challenges
│   │   │   ├── logic-maze/       # Programming logic puzzles
│   │   │   └── code-builder/     # Build projects step-by-step
│   │   ├── projects/             # Project catalog & guides
│   │   ├── progress/             # Progress tracking & analytics
│   │   ├── settings/             # User preferences
│   │   ├── tracks/               # Learning tracks (curated paths)
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout with navigation
│   │   └── page.tsx              # Landing page
│   ├── components/               # Reusable React components
│   │   └── UsernameModal.tsx     # First-time user setup
│   ├── lib/                      # Utility functions
│   │   ├── constants.ts          # Named constants (no magic numbers)
│   │   ├── db.ts                 # Database helpers & schema
│   │   ├── courseLoader.ts       # Course content loader
│   │   ├── lessonLoader.ts       # Lesson content loader
│   │   └── data/                 # Static data utilities
│   └── types/                    # TypeScript type definitions
│       └── quiz.ts               # Quiz-related types
├── .github/
│   └── copilot-instructions.md   # Development guidelines
├── .gitignore
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript configuration (strict mode)
├── tailwind.config.ts            # Tailwind CSS configuration
├── eslint.config.mjs             # ESLint (standard)
├── eslint-strict.config.mjs      # ESLint (strict mode)
└── README.md                     # This file
```

---

## 📚 Available Content

### 🎓 Courses

#### Python Programming (2 courses, 245 lessons)
- **Learn Python - Fundamentals** (184 lessons, 17 chapters, 50 hours)
  - Variables, data types, strings, conditionals, loops, functions
  - Lists, dictionaries, sets, error handling, testing
  - Real-world practice projects
- **Learn Object Oriented Programming in Python** (61 lessons, 7 chapters, 18 hours)
  - Classes, objects, inheritance, polymorphism, encapsulation
  - Design patterns and OOP best practices

#### Security & Networking (1 course, 93 lessons)
- **CompTIA Network+ Certification Prep** (93 lessons, 10 chapters, 100 hours)
  - OSI model, TCP/IP, networking protocols
  - Network devices, topologies, subnetting
  - VLANs, routing, switching, troubleshooting

### 🛠️ Project Guides

Real-world, step-by-step guides from [codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x):

**Systems & Infrastructure:**
- 🐳 **Docker** - Container runtime implementations
- 🗄️ **Database** - SQL and NoSQL database engines
- 🌐 **Web Server** - HTTP servers from scratch
- 🔀 **Git** - Version control systems
- 🐚 **Shell** - Command-line interpreters
- 🖥️ **Operating System** - OS kernels and components
- 🌐 **Network Stack** - TCP/IP implementations

**Programming Languages & Tools:**
- 📝 **Programming Language** - Compilers and interpreters
- 🔍 **Regex Engine** - Pattern matching engines
- 📄 **Template Engine** - Template processors
- 📝 **Text Editor** - Code editors and IDEs
- 🧪 **Testing Framework** - Test runners

**Web & Frontend:**
- ⚛️ **Front-end Framework/Library** - React, Vue, Angular alternatives
- 🌐 **Web Browser** - Browser engines
- 🔍 **Search Engine** - Full-text search implementations

**Games & Graphics:**
- 🎮 **Game** - Game engines and games
- 🎨 **3D Renderer** - Ray tracers and renderers
- 🎲 **Voxel Engine** - Minecraft-like engines
- 🏃 **Physics Engine** - Physics simulations

**Advanced Topics:**
- 🤖 **Bot** - Chat bots and AI agents
- 🧠 **Neural Network** - Deep learning from scratch
- ⛓️ **Blockchain/Cryptocurrency** - Distributed ledgers
- 📦 **BitTorrent Client** - P2P file sharing
- 🕶️ **Augmented Reality** - AR applications
- 👁️ **Visual Recognition System** - Computer vision
- 🔧 **Command Line Tool** - CLI applications
- 🚁 **Emulator/Virtual Machine** - Hardware emulators

### 🎮 Interactive Learning Games

- **Code Hunter** 🕵️ - Find and fix bugs in code snippets
- **Code Lander** 🚀 - Guide your code to safe landing with correct syntax
- **Algorithm Arena** ⚔️ - Solve algorithmic challenges and puzzles
- **Lunar Lander** 🌙 - Navigate physics-based coding challenges
- **Syntax Speed** ⚡ - Timed coding challenges for muscle memory
- **Logic Maze** 🧩 - Navigate through programming logic puzzles
- **Code Builder** 🏗️ - Build projects incrementally with guided steps

### 📊 Learning Features

- **Progress Dashboard** - Visual overview of all completed lessons, exercises, and quizzes
- **Learning Tracks** - Curated learning paths connecting related courses
- **Quiz System** - 15+ quizzes with instant feedback and scoring
- **Exercise Validation** - Automated code testing and grading
- **Certificate Generation** - Course completion certificates (coming soon)

---

## 💻 Usage Guide

### Getting Started

1. **First Launch**
   - Visit `http://localhost:3000`
   - Set your display name (optional, defaults to "Learner")
   - You'll be taken to the main dashboard

2. **Main Dashboard**
   - View all available courses
   - See your progress across all content
   - Access learning games
   - Browse project guides
   - Check learning tracks

3. **Taking a Course**
   - Click any course card to view details
   - Choose **Structured Mode** (lessons in order) or **Open Mode** (access any lesson)
   - Complete lessons to unlock next content
   - Submit exercises for automated grading
   - Take quizzes to test your knowledge
   - Earn certificates upon completion

4. **Working with Projects**
   - Browse 344+ project guides by category
   - Follow step-by-step instructions
   - Build real technologies from scratch
   - Learn by doing with external tutorials

5. **Playing Games**
   - Access from dashboard Games section
   - Choose from 5 interactive learning games
   - Practice coding skills in fun ways
   - Track your high scores

### Key Features Walkthrough

#### Interactive Code Editor
- Full Monaco Editor (VS Code engine)
- Syntax highlighting for multiple languages
- Auto-completion and error detection
- Run code directly in browser
- Instant feedback on exercises

#### Progress Tracking
- Automatic save on every lesson completion
- Track quiz scores and attempts
- View exercise submissions history
- Monitor course completion percentages
- SQLite database stores all progress locally

#### Quiz System
- Multiple-choice questions with instant feedback
- Minimum passing scores (typically 70%)
- Unlimited retakes
- Timed quizzes (optional)
- Review answers after completion

#### Learning Modes
- **Structured Mode**: Complete lessons in order, unlock content progressively
- **Open Mode**: Access any lesson anytime, self-paced learning
- Switch modes anytime from course page

---

## 🔧 Development & Scripts

### Available Scripts

```bash
# Development
npm run dev              # Start development server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production server

# Code Quality & Linting
npm run lint             # Run ESLint (standard configuration)
npm run lint:strict      # Run ESLint (strict mode - zero warnings)
npm run lint:fix         # Auto-fix linting issues
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting (CI/CD)

# Utilities
npm run mocks:scan       # Scan for TODO/MOCK/FIXME comments in codebase
```

### Database Management

The SQLite database is managed automatically:
- **Location**: `database/learn-it-all.db`
- **Auto-initialization**: Creates schema on first run
- **Direct access**: Uses better-sqlite3 (no ORM)
- **Migrations**: Schema defined in `src/lib/db.ts`

To reset your progress:
```bash
# Stop the dev server, then delete the database
rm database/learn-it-all.db
# Restart server - database recreates automatically
npm run dev
```

### Adding New Content

#### Adding a Course
1. Create directory in `content/courses/your-course-name/`
2. Add `course.json` with course metadata
3. Create `lessons/`, `exercises/`, and `quizzes/` subdirectories
4. Follow existing course structure

#### Adding a Lesson
```json
{
  "id": "lesson-001-topic-name",
  "title": "Your Lesson Title",
  "description": "Brief description",
  "content": "Markdown content here...",
  "estimatedTime": 15,
  "order": 1
}
```

#### Adding a Quiz
```json
{
  "id": "quiz-01-topic",
  "title": "Topic Quiz",
  "passingScore": 70,
  "timeLimit": 0,
  "questions": [
    {
      "id": "q1",
      "question": "Question text?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "points": 10,
      "explanation": "Why this is correct..."
    }
  ]
}
```

See existing courses for complete examples.

---

## 🗄️ Database Schema

The platform uses **better-sqlite3** directly (no ORM). The database auto-initializes on first run with the following tables:

- **settings** - User preferences and display name
- **course_enrollments** - Course enrollment and completion tracking
- **lesson_progress** - Individual lesson completion status
- **exercise_submissions** - Coding exercise submissions and scores
- **quiz_attempts** - Quiz attempts with scores and pass/fail status
- **test_results** - Exercise test case results
- **certificates** - Course completion certificates

Database location: `database/learn-it-all.db` (SQLite file)

See `src/lib/db.ts` for the complete schema and database helper functions.

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

We welcome contributions! This project is open for improvements, bug fixes, and new features.

### How to Contribute

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/LEARN-IT-ALL.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-new-feature
   # or
   git checkout -b fix/bug-description
   ```

3. **Make Your Changes**
   - Follow the code quality standards (see below)
   - Test your changes thoroughly
   - Add or update documentation as needed

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

5. **Push and Create Pull Request**
   ```bash
   git push origin feature/amazing-new-feature
   # Then open a Pull Request on GitHub
   ```

### Contribution Guidelines

#### Before You Start
- Check existing issues and PRs to avoid duplication
- Open an issue to discuss major changes before implementing
- Scan the codebase to understand existing patterns
- Read `.github/copilot-instructions.md` for detailed guidelines

#### Code Quality Requirements
All contributions must meet these standards:

✅ **ESLint Strict Mode**
- Run `npm run lint:strict` - must pass with zero warnings
- No `any` types - use proper TypeScript typing
- No `console.log` - use proper logging
- All promises must handle errors

✅ **TypeScript Strict Mode**
- Run `npm run type-check` - must pass with no errors
- Explicit typing required for all functions and variables
- No implicit `any` types

✅ **Code Formatting**
- Run `npm run format` before committing
- Prettier configuration applied automatically
- Consistent indentation and styling

✅ **Semantic Code**
- Use named constants instead of magic numbers
- Meaningful variable and function names
- Self-documenting code with clear intent

✅ **Complete Implementations**
- No TODOs or placeholders in committed code
- Mark incomplete work with `// TODO-PHASE:` or `// FIXME:` inline
- Full implementations only - no half-finished features

#### Testing Your Changes
```bash
# Run all quality checks before submitting PR
npm run lint:strict    # Must pass
npm run type-check     # Must pass
npm run format:check   # Must pass
npm run build          # Must succeed
```

### What We're Looking For

**High Priority:**
- Bug fixes with test cases
- Performance improvements
- Accessibility enhancements
- Documentation improvements
- New course content (with proper licensing)

**Also Welcome:**
- UI/UX improvements
- New learning games
- Additional project guides
- Database optimizations
- Code refactoring

### Content Contributions

#### Adding Courses
- Must be original content or properly licensed
- Follow existing course structure
- Include lessons, exercises, and quizzes
- Provide clear learning objectives

#### Adding Projects
- Must link to high-quality external tutorials
- Include clear category and language tags
- Ensure projects are buildable and educational

#### Adding Games
- Must be educational and engaging
- Follow existing game structure
- Include clear instructions
- Test thoroughly across browsers

### Code of Conduct

- Be respectful and constructive
- Help others learn and grow
- Focus on what's best for learners
- Maintain high code quality standards

---

## 🙏 Acknowledgments & Credits

### Open Source Projects

This platform is built on the shoulders of giants. Special thanks to:

#### Core Framework & Libraries
- **[Next.js](https://nextjs.org/)** - The React framework that powers the entire platform
- **[React](https://react.dev/)** - UI library for building interactive interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and enhanced developer experience
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[better-sqlite3](https://github.com/WiseLibs/better-sqlite3)** - Fast, synchronous SQLite3 bindings

#### Developer Tools
- **[Monaco Editor](https://microsoft.github.io/monaco-editor/)** - The code editor that powers VS Code
- **[React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)** - Beautiful code syntax highlighting
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering in React
- **[Gray Matter](https://github.com/jonschlinkert/gray-matter)** - Front matter parser for markdown
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icons

#### Code Quality & Tooling
- **[ESLint](https://eslint.org/)** - Pluggable linting utility
- **[Prettier](https://prettier.io/)** - Opinionated code formatter
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript support for ESLint

### Content Sources

#### Course Content
- **Original Course Content** - Python Basics, Python OOP, CompTIA Network+
  - Custom-developed curriculum for this platform
  - Designed for hands-on, practical learning

#### Project Guides
- **[Build Your Own X](https://github.com/codecrafters-io/build-your-own-x)** - 344 project tutorials
  - Curated by [CodeCrafters](https://codecrafters.io/)
  - Licensed under [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
  - Compilation of tutorials for building technologies from scratch
  - Links to external high-quality learning resources

- **[W3Schools](https://www.w3schools.com/)** - Reference and learning resources
  - Comprehensive web development tutorials and references
  - Used for supplemental learning materials and examples
  - One of the world's largest web developer sites

### Community & Inspiration

- **Randy Northrup** - Creator and primary developer of LEARN-IT-ALL
- **The countless open-source contributors** who make free education possible
- **Developers worldwide** who create and share educational content
- **Every learner** who uses this platform to grow their skills

### Special Thanks

- **Microsoft** - For Monaco Editor and TypeScript
- **Vercel** - For Next.js and hosting platform
- **The SQLite Team** - For the incredibly reliable database engine
- **GitHub** - For hosting and collaboration tools
- **The Node.js Community** - For the ecosystem that makes this possible

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses

- Build Your Own X guides: [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
- All other dependencies: See individual package licenses

---

## 📞 Contact & Support

### Get Help
- **Issues**: [GitHub Issues](https://github.com/RandyNorthrup/LEARN-IT-ALL/issues)
- **Discussions**: [GitHub Discussions](https://github.com/RandyNorthrup/LEARN-IT-ALL/discussions)
- **Documentation**: Check `/docs/` directory (local only)

### Report a Bug
1. Check existing issues first
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Node version, browser)

### Request a Feature
1. Check existing feature requests
2. Open a new issue with "Feature Request" label
3. Describe the feature and its benefits
4. Explain your use case

### Security Issues
For security vulnerabilities, please email privately instead of opening a public issue.

---

## 🚧 Project Status & Roadmap

**Current Version**: 0.1.0 (Alpha)  
**Status**: Active Development

### Recently Completed ✅
- [x] 16 courses with 3,000+ lessons
- [x] 344 project guides across 26 categories
- [x] 5 interactive learning games
- [x] Complete progress tracking with SQLite
- [x] Quiz system with 15+ quizzes
- [x] Monaco code editor integration
- [x] Structured and Open learning modes
- [x] Full TypeScript strict mode
- [x] Comprehensive ESLint configuration

### In Progress 🔄
- [ ] Enhanced progress analytics dashboard
- [ ] Certificate generation system
- [ ] More interactive coding exercises
- [ ] Additional learning games
- [ ] Course recommendation engine

### Upcoming Features 🔮
- [ ] Export/import progress data
- [ ] Dark mode support
- [ ] Offline mode improvements
- [ ] Mobile app (React Native)
- [ ] Community features (forums, discussions)
- [ ] Peer code review system
- [ ] Live coding sessions
- [ ] Integration with external APIs

### Long-Term Vision 🌟
- Expand to 50+ courses covering all major programming languages
- Build largest collection of "Build Your Own X" projects
- Create adaptive learning paths based on user progress
- Develop AI-powered coding assistant
- Support multiple languages (i18n)
- Create instructor tools for custom course creation

---

## 📊 Project Statistics

- **Total Courses**: Growing library of comprehensive courses
- **Total Lessons**: Thousands of structured lessons
- **Total Quizzes**: Multiple quizzes per course
- **Project Guides**: Hundreds of real-world project tutorials
- **Project Categories**: Dozens of technology categories
- **Learning Games**: Multiple interactive games
- **Estimated Learning Hours**: Thousands of hours of content
- **Lines of Code**: ~15,000+ platform code
- **Content Files**: Hundreds of JSON-based content files
- **Tech Stack**: Modern React/Next.js with 20+ packages
- **Deployment**: Automated Docker CI/CD to GitHub Container Registry

---

**Built with ❤️ for learners everywhere**

*"The best way to learn is by doing." - This platform makes that possible.*
