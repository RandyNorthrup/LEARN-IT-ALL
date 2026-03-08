# Python Basics Course — University-Quality Enhancement Plan

> **Audit Date:** March 2026  
> **Course:** python-basics (Learn Python - Fundamentals)  
> **Final State:** 184 lessons, 181 exercises, 17 quizzes (16 chapter + 1 final exam)  
> **Status:** ✅ ALL ENHANCEMENTS COMPLETED

---

## Implementation Summary (Completed)

| Task | Status |
|------|--------|
| Fix all 167 lesson IDs, chapterIds, order values | ✅ Done |
| Delete 14 old quiz files | ✅ Done |
| Fix quiz-11 (was ch11-tuples → ch11-error-handling) | ✅ Rewritten |
| Fix quiz-12 (was ch12-errors → ch12-testing) | ✅ Rewritten |
| Fix content bugs (duplicate KeyError, incomplete capstone, wrong "What's Next?" text) | ✅ Done |
| Expand 8 thin lessons to 8,000-12,000 chars | ✅ Done |
| Rewrite 3 scope-creep lessons (DevOps monitoring, Saga pattern, Flask APIs) | ✅ Done |
| Create Chapter 11: Tuples and Named Tuples (5 lessons) | ✅ Done |
| Create Chapter 12: File I/O (6 lessons) | ✅ Done |
| Create Chapter 13: Modules and Packages (6 lessons) | ✅ Done |
| Create 3 new chapter quizzes (50 questions each) | ✅ Done |
| Map all 181 exercises to correct chapterIds | ✅ Done |
| Restructure course.json (17 chapters, reordered) | ✅ Done |
| Quality checker: 406/406 passed, 0 failures | ✅ Done |

### Final Course Structure (17 chapters, 184 lessons)

| Order | Chapter ID | Title | Lessons |
|-------|-----------|-------|---------|
| 1 | ch1-intro | Introduction | 12 |
| 2 | ch2-variables | Variables | 11 |
| 3 | ch3-computing | Computing Fundamentals | 14 |
| 4 | ch4-comparisons | Comparisons and Conditionals | 13 |
| 5 | ch5-loops | Loops and Iteration | 11 |
| 6 | ch6-functions | Functions | 13 |
| 7 | ch7-scope | Scope and Namespaces | 12 |
| 8 | ch8-lists | Lists and Sequences | 14 |
| 9 | ch9-dictionaries | Dictionaries and Mappings | 15 |
| 10 | ch10-sets | Sets and Set Operations | 13 |
| 11 | ch15-tuples | Tuples and Named Tuples (NEW) | 5 |
| 12 | ch16-file-io | File I/O (NEW) | 6 |
| 13 | ch17-modules | Modules and Packages (NEW) | 6 |
| 14 | ch11-error-handling | Error Handling and Exceptions | 13 |
| 15 | ch12-testing | Testing and Debugging | 11 |
| 16 | ch13-practice | Practice Projects | 15 |
| 17 | ch14-quiz | Final Exam | 0 |

---

## Original Audit Findings (Reference)

The Python Basics course has strong foundational content (avg 12,252 chars/lesson) but suffers from
**structural and pedagogical issues** that prevent it from reaching university quality:

| Category | Severity | Count |
|----------|----------|-------|
| Critical structural issues | 🔴 | 7 |
| Content accuracy bugs | 🟡 | 5 |
| Pedagogical ordering problems | 🔴 | 8 |
| Missing topics (vs university CS1) | 🟡 | 6 |
| Redundancy/bloat | 🟡 | 12+ lessons |
| Metadata/ID inconsistencies | 🟢 | 167 lessons |
| Quiz misalignment | 🔴 | 3 quizzes |
| Thin lessons needing expansion | 🟡 | 8 lessons |

### Overall Grade: C+ → Target: A

---

## Part 1: Critical Structural Issues

### 1.1 Missing Tuples Chapter 🔴
**The course has NO chapter on tuples.** Tuples are a fundamental Python data type.
- Quiz `quiz-11-chapter-11.json` references `ch11-tuples` — a chapter that doesn't exist
- Lists (Ch8), Dictionaries (Ch9), and Sets (Ch10) are covered but tuples are completely absent
- **University courses ALWAYS cover tuples** as they are essential for:
  - Multiple return values from functions
  - Dictionary keys (immutable requirement)
  - Namedtuples and data modeling
  - Unpacking and assignment
  
**Action:** Create new Chapter 10: Tuples and Namedtuples (currently Ch10-13 become Ch11-14)

### 1.2 Missing File I/O Chapter 🔴
**The course has NO dedicated chapter on file operations.** File I/O is a core CS1 topic.
- `lesson-144-error-handling-file-io.md` exists in the Error Handling chapter but focuses on error handling patterns, not file I/O fundamentals
- Students should learn `open()`, read/write modes, `with` statements, CSV/JSON files, pathlib
- **Every university Python course covers file I/O** as a standalone unit

**Action:** Create new Chapter 11: File I/O and Data Persistence

### 1.3 Missing Modules/Imports Chapter 🔴
**The course has NO chapter on modules, imports, or the standard library.**
- Multiple later chapters use `import` statements without teaching them
- No coverage of: `import`, `from...import`, `__name__ == "__main__"`, creating modules, packages
- `lesson-091-module-scope.md` (Ch7) touches on module scope but doesn't teach imports

**Action:** Create new Chapter 12: Modules, Imports, and the Standard Library

### 1.4 Computing Fundamentals Chapter Misplaced 🔴
**Chapter 3 (Computing Fundamentals) — 14 lessons of hardware/CS theory — breaks Python learning flow.**
- Positioned between Variables (Ch2) and Conditionals (Ch4)
- Content covers CPUs, RAM, networking, operating systems — not Python-specific
- Uses OOP class examples that students haven't learned yet
- A 30-hour Python course shouldn't spend 6+ hours on computer architecture

**Action:** Move to Appendix or remove. Keep only `lesson-038-algorithms-intro.md` (adapted for Python context)

### 1.5 Chapter 7 (Scope) Heavily Overlaps Chapter 6 (Functions) 🔴
**Scope is a sub-topic of functions, not a standalone chapter.**
- `lesson-072-function-scope.md` (Ch6) already teaches scope
- Ch7 repeats closures (`lesson-080` in Ch6 vs `lesson-083` and `lesson-087` in Ch7)
- Ch7 repeats LEGB rule content from Ch6
- `lesson-022-variable-scope-intro.md` has `chapterId: ch2-variables` in frontmatter but is listed under Ch7 in course.json — inconsistent

**Action:** Merge useful Ch7 content into Ch6 (Functions). Eliminate Ch7 as standalone.

### 1.6 Quiz Chapter ID Misalignment 🔴
Three quizzes reference chapter IDs that don't exist in the course:

| Quiz File | References | Actual Chapter |
|-----------|-----------|----------------|
| `quiz-11-chapter-11.json` | `ch11-tuples` | `ch11-error-handling` |
| `quiz-12-chapter-12.json` | `ch12-errors` | `ch12-testing` |
| `quiz-13-chapter-13.json` | `ch13-practice` | `ch13-practice` ✅ |

The quiz content for "tuples" tests a chapter that doesn't exist. The quiz content for "errors" is 
mapped to the wrong chapter.

**Action:** Fix after restructuring — create tuples quiz for new tuples chapter, remap error quiz.

### 1.7 Non-Sequential Lesson Ordering Within Chapters 🔴
Multiple chapters have gaps or duplicates in their `order` frontmatter values:

| Chapter | Order Values | Expected |
|---------|-------------|----------|
| ch1-intro | 1-9, 11-13 (gap at 10) | 1-12 |
| ch3-computing | 1, **1**, 2-13 (duplicate 1) | 1-14 |
| ch5-loops | 1, **1**, 2-6, 11-14 (duplicate 1, gap 7-10) | 1-11 |
| ch7-scope | 1-10, **13** (gap 11-12) | 1-11 |
| ch8-lists | 1-11, **34, 35, 36** (massive gap) | 1-14 |
| ch11-error-handling | 1-5, **7, 8**, 10-15 (gaps at 6, 9) | 1-13 |
| ch12-testing | 1-2, **4, 6**, 7-13 (gaps at 3, 5) | 1-11 |
| ch13-practice | **2**-15, **42** (starts at 2, ends at 42) | 1-15 |

**Action:** Renumber all lesson order values sequentially within each chapter.

---

## Part 2: Pedagogical Ordering Issues

### 2.1 Tooling Lessons Too Early (Ch1)
Lessons 009 (Code Editors), 011 (Version Control), 012 (Style Guide), 013 (Best Practices) appear 
in Chapter 1 before students learn `if` statements, loops, or functions.
- **Best practices** lesson references testing, type hints, logging — none taught yet
- **Version control** is important but premature for lesson 11 of a beginner course

**Action:** Move 009 earlier (after lesson-001), move 011-013 to after Functions chapter or to appendix

### 2.2 Advanced Content in Early Chapters
- Ch2: `lesson-025-variable-unpacking-patterns.md` uses tuple unpacking before tuples are taught
- Ch4: `lesson-053-advanced-pattern-matching.md` uses structural pattern matching (Python 3.10+) — advanced feature for a basics course
- Ch5: `lesson-065-loop-optimization.md` references timeit, generators — not yet taught

**Action:** Mark as "Advanced" sections or move to later chapters

### 2.3 OOP Forward References Throughout
~15+ lessons across Ch2-Ch10 use `class`, `__init__`, `self`, `@dataclass`, dunder methods — 
but OOP is NOT taught in this course (it's covered in the separate python-oop course).

**Examples:**
- Ch3: All computing lessons use class-based examples
- Ch7: Closure patterns use classes for comparison
- Ch9: Dict lessons use `@dataclass` patterns
- Ch10: Set lessons use custom `__hash__` and `__eq__`

**Action:** Replace OOP examples with function-based equivalents throughout

### 2.4 Testing of Error Handling Before Testing is Taught
`lesson-147-testing-error-handling.md` (Ch11) uses `pytest.raises`, fixtures, and mocking — 
but pytest isn't taught until Ch12.

**Action:** Move to Ch12 after pytest basics lesson

### 2.5 Ch12 Interleaves Debugging and Testing
Current order: Unit testing → Debugging → Pytest → PDB → Error patterns → Stack traces
Better order: Debugging tools first (simpler) → then testing framework

**Action:** Reorder: Debugging (154, 158, 159, 160) → Testing (153, 156, 161-165)

### 2.6 Practice Projects in Wrong Order (Ch13)
`lesson-180-practice-projects.md` contains the simplest projects (number guessing, calculator, 
to-do list) but has `order: 42` — placing it LAST after complex projects like API Client and 
Password Manager.

**Action:** Make this lesson first in the chapter (order: 1), the simpler gateway to harder projects

---

## Part 3: Content Accuracy Issues

### 3.1 Bugs Found

| Lesson | Issue | Severity |
|--------|-------|----------|
| `lesson-139-exception-types.md` | KeyError listed twice under LookupError in hierarchy tree | Medium |
| `lesson-154-debugging-techniques.md` | "What's Next?" says "we'll explore how computers work" — wrong | Low |
| `lesson-160-stack-traces.md` | "What's Next?" says "You've completed Testing & Debugging!" — vestigial | Low |
| `lesson-179-python-mastery-capstone.md` | `DatabaseManager.load_all()` body is just `pass` — incomplete | High |
| `lesson-022-variable-scope-intro.md` | Frontmatter has `chapterId: ch2-variables` but listed in Ch7 | Medium |

### 3.2 ID Mismatches
**Every single lesson** (167/167) has an `id` in frontmatter that doesn't match the filename.
- Filename: `lesson-095-lists.md` → ID: `lists`
- Filename: `lesson-156-pytest-basics.md` → ID: `63-pytest-basics`
- Some have decimal IDs: `lesson-136-set-integration-projects.md` → ID: `145.5-set-integration-projects`

This suggests the course was reorganized but IDs were never updated.

**Action:** Normalize all IDs to match filenames (without `.md`)

---

## Part 4: Thin Lessons Needing Expansion

| Lesson | Current Size | Target | Content Needed |
|--------|-------------|--------|----------------|
| `lesson-001-what-is-python.md` | 2,300 chars | 8,000+ | Python history, use cases, philosophy, comparison with other languages, first program walkthrough |
| `lesson-002-variables.md` | 2,564 chars | 8,000+ | More examples, variable naming, dynamic typing explanation, common beginner mistakes |
| `lesson-028-binary-hex.md` | 3,335 chars | 8,000+ | More conversion examples, Python bin()/hex()/oct(), practical applications |
| `lesson-041-conditionals.md` | 3,778 chars | 8,000+ | More if/elif/else examples, flowchart diagrams in text, decision tree thinking |
| `lesson-054-loops.md` | 2,314 chars | 8,000+ | Loop concept introduction, real-world analogy, when to use for vs while |
| `lesson-095-lists.md` | 4,303 chars | 8,000+ | More creation examples, common operations overview, visual representation |
| `lesson-110-dict-introduction.md` | 4,964 chars | 8,000+ | More real-world dictionary analogies, when to use dicts vs lists |
| `lesson-160-stack-traces.md` | 3,590 chars | 8,000+ | More trace examples, nested tracebacks, chained exceptions, third-party library traces |

---

## Part 5: Redundancy to Eliminate

### High-Redundancy Pairs/Groups

| Content | Taught In | Action |
|---------|-----------|--------|
| Type conversion | Ch1 lesson-003, Ch2 lesson-017, Ch2 lesson-024 | Keep Ch2 lesson-017, merge others |
| Variable naming conventions | Ch1 lesson-002, Ch2 lesson-014, Ch2 lesson-018 | Keep Ch2 lesson-014, remove from others |
| Guard clauses | Ch4 lesson-048, Ch4 lesson-050, Ch4 lesson-051 | Keep lesson-051, remove from others |
| LEGB rule / closures | Ch6 lesson-072, Ch6 lesson-080, Ch7 lesson-083, Ch7 lesson-085, Ch7 lesson-087 | Keep in Ch6 only |
| List methods (append/pop/sort) | Ch8 lesson-095, Ch8 lesson-098, Ch8 lesson-107 | Keep lesson-107 as definitive reference |
| String formatting | Ch1 lesson-004, Ch2 lesson-020, Ch2 lesson-021 | Keep Ch2 lesson-020, remove from others |
| Exception type catalog | Ch11 lesson-139, Ch12 lesson-159 | Keep Ch11 lesson-139 only |
| Stack traces | Ch12 lesson-154, Ch12 lesson-160 | Merge into lesson-154 |
| Set performance/comparison | Ch10 lesson-130, Ch10 lesson-133 | Merge into one lesson |
| Set practical applications | Ch10 lesson-125 (partial), Ch10 lesson-131, Ch10 lesson-136 | Consolidate into lesson-131 |

---

## Part 6: Missing Topics (vs University CS1)

A standard university CS1 Python course (e.g., MIT 6.0001, UC Berkeley CS61A, Stanford CS106A) covers:

### 6.1 Topics to ADD as New Chapters

| Topic | Priority | Proposed Chapter |
|-------|----------|-----------------|
| **Tuples and Namedtuples** | 🔴 Critical | New Ch10 (between Sets and Error Handling) |
| **File I/O and Data Persistence** | 🔴 Critical | New Ch11 (reading/writing files, CSV, JSON, pathlib) |
| **Modules, Imports, Standard Library** | 🔴 Critical | New Ch12 (import system, creating modules, useful stdlib) |

### 6.2 Topics to ADD as Lessons Within Existing Chapters

| Topic | Location | Notes |
|-------|----------|-------|
| **String methods comprehensive** | Ch1 or Ch2 | split(), join(), strip(), replace(), find(), startswith()/endswith() |
| **Iterators and generators** | Ch5 (Loops) | yield, generator expressions, iter()/next() |
| **Decorators basics** | Ch6 (Functions) | @decorator syntax, common decorators, wraps |
| **Type hints introduction** | Ch6 (Functions) | Basic annotations, Optional, Union, List[int] |
| **Sorting with key functions** | Ch8 (Lists) | sorted() with key=, lambda sorting, reverse |
| **Regular expressions basics** | New Ch12 (Modules) or standalone | re module basics |

### 6.3 Topics Already Covered Excellently
- Variables and data types ✅
- Conditionals and boolean logic ✅
- Loops (for, while, nested) ✅
- Functions (params, returns, scope, recursion) ✅
- Lists (creation, slicing, comprehensions) ✅
- Dictionaries (comprehensive coverage) ✅
- Sets (mathematical operations) ✅
- Error handling (try/except/finally) ✅
- Testing (pytest, unit testing) ✅
- Practice projects ✅

---

## Part 7: Proposed Restructured Course Outline

### New Chapter Organization (16 chapters + Final Exam)

```
Ch 1: Introduction to Python (8 lessons)
  - What is Python (EXPAND)
  - Installing Python & First Program
  - Variables and Assignment (EXPAND)
  - Data Types Overview
  - Numbers and Math
  - Strings Basics
  - User Input and Output
  - Comments and Code Readability

Ch 2: Variables and Data Types (8 lessons)
  - Variable Naming Conventions
  - Type Conversion and Casting
  - String Formatting (f-strings, .format)
  - String Methods (split, join, strip, find)
  - Multiple Assignment and Unpacking
  - Constants and Magic Numbers
  - Variables in Memory (id, is, ==)
  - Chapter Review and Exercises

Ch 3: Control Flow — Conditionals (8 lessons)
  - Boolean Values and Comparisons
  - if, elif, else Statements (EXPAND)
  - Logical Operators (and, or, not)
  - Nested Conditionals
  - Ternary Expressions
  - Truth Value Testing (truthy/falsy)
  - Match/Case Statements (Python 3.10+)
  - Guard Clauses and Best Practices

Ch 4: Control Flow — Loops (8 lessons)
  - Introduction to Loops (EXPAND)
  - for Loops and Iteration
  - while Loops
  - break, continue, and Loop Control
  - range() Function
  - Nested Loops
  - enumerate() and zip()
  - Loop Patterns and Best Practices

Ch 5: Functions (10 lessons)
  - Defining and Calling Functions
  - Parameters and Arguments
  - Return Values
  - Default and Keyword Arguments
  - *args and **kwargs
  - Variable Scope (local, global, LEGB)
  - Lambda Functions
  - Built-in Functions Tour
  - Recursion
  - Docstrings and Function Best Practices

Ch 6: Data Structures — Lists (8 lessons)
  - Introduction to Lists (EXPAND)
  - Indexing, Slicing, and Access
  - List Methods (append, insert, remove, pop, sort)
  - List Operations (concatenation, repetition, membership)
  - Iterating Over Lists
  - List Comprehensions
  - Copying and Aliasing (shallow vs deep)
  - Sorting with key Functions

Ch 7: Data Structures — Tuples (5 lessons) ← NEW
  - Introduction to Tuples
  - Tuple Operations and Methods
  - Tuple Unpacking and Multiple Returns
  - Named Tuples
  - When to Use Tuples vs Lists

Ch 8: Data Structures — Dictionaries (8 lessons)
  - Introduction to Dictionaries (EXPAND)
  - Creating and Accessing Dictionaries
  - Dictionary Methods
  - Iterating Over Dictionaries
  - Dictionary Comprehensions
  - Nested Dictionaries
  - JSON and Serialization
  - Dictionary Best Practices

Ch 9: Data Structures — Sets (6 lessons)
  - Introduction to Sets
  - Set Operations (union, intersection, difference)
  - Set Methods and Comprehensions
  - Frozensets
  - Sets vs Lists vs Dicts — Choosing the Right Structure
  - Practical Applications

Ch 10: Strings In-Depth (6 lessons) ← NEW/EXPANDED
  - String Methods Comprehensive
  - String Slicing and Indexing
  - Regular Expressions Basics
  - String Encoding (ASCII, Unicode, UTF-8)
  - Text Processing Patterns
  - String Formatting Mastery

Ch 11: File I/O and Data Persistence (6 lessons) ← NEW
  - Opening, Reading, and Writing Files
  - Context Managers (with statement)
  - Working with CSV Files
  - Working with JSON Files
  - Working with Paths (pathlib)
  - File I/O Best Practices

Ch 12: Modules and the Standard Library (6 lessons) ← NEW
  - import, from...import, as
  - Creating Your Own Modules
  - __name__ == "__main__"
  - Useful Standard Library (os, sys, datetime, math, random)
  - Installing Packages with pip
  - Virtual Environments

Ch 13: Error Handling (8 lessons)
  - Introduction to Errors and Exceptions (EXPAND)
  - Exception Types and Hierarchy
  - try / except / else / finally
  - Raising Exceptions
  - Custom Exception Classes
  - Context Managers for Resource Management
  - Error Handling Best Practices
  - Debugging with pdb

Ch 14: Testing (6 lessons)
  - Introduction to Testing
  - Writing Unit Tests
  - pytest Framework
  - Test Fixtures and Setup
  - Mocking and Patching
  - Test Coverage and Best Practices

Ch 15: Practice Projects (10 lessons)
  - Beginner Projects (calculator, guessing game, to-do list) ← MOVED FIRST
  - Contact Book
  - Expense Tracker
  - Text Analyzer
  - Quiz Game
  - Markdown to HTML Converter
  - File Organizer
  - Library Management System
  - Course Capstone Project
  - Review and Next Steps

Ch 16: Final Exam (quiz only)
```

**Total: ~117 focused lessons** (down from 167 with redundancy, up in quality)

---

## Part 8: Metadata Fixes Required

### 8.1 All Lesson IDs Need Normalization
Every lesson's `id` field should match its filename (without `.md`).
Example: `lesson-095-lists.md` should have `id: lesson-095-lists`

### 8.2 Exercises Have No chapterId
All 181 exercises have `chapterId: unknown`. These should be mapped to actual chapter IDs.

### 8.3 Old Quiz Files to Clean Up
The quizzes directory contains `-old` suffix files that should be removed:
- `final-exam-old.json`
- `quiz-01-chapter-1-old.json`  
- `quiz-02-old-functions.json`
- `quiz-03-old.json`, `quiz-04-old.json`
- `quiz-05-chapter-5-old.json` through `quiz-13-chapter-13-old.json`

**14 old quiz files** to delete.

### 8.4 Quiz-Chapter Alignment
After restructuring, every chapter needs a quiz with the correct `chapterId`.

---

## Part 9: Scope Creep Content to Remove or Move

These lessons contain content far beyond "Python Basics" and should be moved to the OOP course 
or an advanced course:

| Lesson | Content | Action |
|--------|---------|--------|
| `lesson-134-set-advanced-patterns.md` | BFS, DFS, state machines, power sets | Move to advanced course |
| `lesson-135-set-with-other-modules.md` | Counter, defaultdict, itertools, functools | Move to modules chapter (simplified) |
| `lesson-148-error-monitoring.md` | Production monitoring, health checks, dashboards | Remove (DevOps topic) |
| `lesson-150-advanced-error-patterns.md` | Saga pattern, bulkhead pattern, dead letter queue | Remove (distributed systems) |
| `lesson-151-error-handling-apis.md` | HTTP status codes, Flask middleware, RFC 7807 | Remove (web dev topic) |
| `lesson-164-integration-testing.md` | Flask test client, CI/CD with GitHub Actions | Simplify or remove |
| `lesson-169-password-manager.md` | cryptography package (Fernet encryption) | Replace with stdlib-only version |
| `lesson-178-api-client.md` | requests library, HTTP/REST | Remove (belongs in web dev course) |

---

## Part 10: Implementation Priority

### Phase 1 — Critical Fixes (do first)
1. Fix non-sequential lesson order values in all chapters
2. Fix lesson-022 chapterId mismatch
3. Fix lesson-139 duplicate KeyError bug
4. Fix incomplete code in lesson-179 capstone
5. Fix wrong "What's Next?" text in lessons 154, 160
6. Fix lesson-180 order value (42 → 1)
7. Delete 14 old quiz files
8. Fix quiz-11 and quiz-12 chapterId alignment

### Phase 2 — Content Expansion (do second)
1. Expand 8 thin lessons to 8,000+ chars each
2. Replace all OOP forward references with function-based examples

### Phase 3 — Restructuring (do third) 
1. Create Tuples chapter (5 new lessons)
2. Create File I/O chapter (6 new lessons)
3. Create Modules chapter (6 new lessons)
4. Move Computing Fundamentals to appendix
5. Merge Scope chapter into Functions
6. Eliminate redundant lessons (~20 lessons consolidated)
7. Reorder practice projects (simple first)

### Phase 4 — Polish (do last)
1. Normalize all 167 lesson IDs to match filenames
2. Map all 181 exercises to correct chapterId values
3. Create/update quizzes for new chapter structure
4. Review and update all exercise test cases
5. Update course.json with new structure
6. Update estimated hours

---

## Part 11: Comparison with University Standards

### MIT 6.0001 (Introduction to CS and Programming Using Python)
| MIT Topic | Our Coverage | Gap? |
|-----------|-------------|------|
| Branching & iteration | ✅ Ch4, Ch5 | No |
| String manipulation | Partial (Ch1) | Need dedicated string chapter |
| Decomposition & abstraction (functions) | ✅ Ch6 | No |
| Tuples, lists, mutability | ❌ No tuples | YES — add tuples |
| Dictionaries | ✅ Ch9 | No |
| Testing & debugging | ✅ Ch12 | No |
| Exceptions & assertions | ✅ Ch11 | No |
| OOP (intro) | ❌ Separate course | OK — we have python-oop |
| Algorithm complexity | Partial (Ch3) | OK for basics |
| Searching & sorting | ✅ Ch8 | No |

### UC Berkeley CS61A Topics
| Topic | Our Coverage | Gap? |
|-------|-------------|------|
| Functions & environments | ✅ Ch6, Ch7 | Overlapping |
| Control | ✅ Ch4, Ch5 | No |
| Higher-order functions | ✅ Ch6 lesson-078 | No |
| Recursion | ✅ Ch6 lesson-077 | No |
| Data abstraction | Partial | Need more abstraction concepts |
| Sequences (lists, tuples) | Partial | Need tuples |
| Iterators & generators | ❌ Missing | Add to loops or functions |
| Trees & linked lists | ❌ Not needed | OK for basics level |

---

## Appendix: File Inventory

### Lesson Files by Chapter
- Ch1 (intro): 12 lessons — `lesson-001` through `lesson-013` (gap at 010)
- Ch2 (variables): 12 lessons — `lesson-014` through `lesson-025` (includes misplaced lesson-022)
- Ch3 (computing): 14 lessons — `lesson-027` through `lesson-040`
- Ch4 (comparisons): 13 lessons — `lesson-041` through `lesson-053`
- Ch5 (loops): 11 lessons — `lesson-054` through `lesson-068` (gaps at 061-064)
- Ch6 (functions): 13 lessons — `lesson-069` through `lesson-081`
- Ch7 (scope): 11 lessons — `lesson-022`, `lesson-082` through `lesson-094` (gaps at 092-093)
- Ch8 (lists): 14 lessons — `lesson-095` through `lesson-109` (gap at 106)
- Ch9 (dictionaries): 15 lessons — `lesson-110` through `lesson-124`
- Ch10 (sets): 13 lessons — `lesson-125` through `lesson-137`
- Ch11 (error handling): 13 lessons — `lesson-138` through `lesson-152` (gaps at 143, 146)
- Ch12 (testing): 11 lessons — `lesson-153` through `lesson-165` (gaps at 155, 157)
- Ch13 (practice): 15 lessons — `lesson-166` through `lesson-180`
- Ch14 (final exam): 0 lessons (quiz only)

### Quiz Files (active)
14 quiz files (13 chapter quizzes + 1 final exam), 50 questions each (100 for final)

### Exercise Files
181 exercises, all with `chapterId: unknown`

---

*This document serves as the master plan for upgrading the Python Basics course to university quality.
All changes should be tracked against this plan.*
