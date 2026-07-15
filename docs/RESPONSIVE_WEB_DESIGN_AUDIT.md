# Responsive Web Design coverage audit

Reference snapshot: freeCodeCamp `responsive-web-design-v9`, upstream commit
`c115efdd41f868d8850156f6a7a211219c35a847` (reviewed 2026-07-13).

## Coverage result

- Upstream shape: 3 learning chapters plus exam, 29 modules, 158 blocks, 5 certification projects.
- LEARN-IT-ALL shape: 9 prerequisite-ordered chapters, 28 learning modules, 28 original code activities, 9 checkpoint quizzes, 5 certification projects, and 1 final exam.
- All upstream subject modules are covered. Exam is represented by `final-exam.json`, producing 29 mapped modules total.
- Upstream prose, tests, and projects were not copied. Coverage uses original explanations, examples, prompts, and test requirements.

## Pedagogical order

1. Browser, files, DevTools, HTML document structure, links, and media.
2. Semantic HTML, forms, tables, then survey project.
3. HTML accessibility, keyboard behavior, validation, and debugging.
4. Cascade before design systems, sizing, and color.
5. State selectors, form styling, and box model.
6. Flexbox before constrained card project and typography.
7. CSS accessibility before positioning and advanced selectors, then inventory project.
8. Responsive strategy before documentation project and variables.
9. Grid before landing-page project, then motion and cumulative debugging review.

## Activity variety

Guided workshops introduce a mechanism with constraints. Labs remove markup steps and focus on diagnosis or transfer. Projects combine several earlier skills. Every activity has unique starter files, four or more canonical server-side requirements, instant preview, actionable failure evidence, hints, draft persistence, and responsive editor layout.

## Known platform-wide debt outside this course

- Existing Python server grader still uses structural string checks rather than an isolated Python executor. Pyodide labs execute real Python in-browser, but canonical server re-execution remains future work.
- Existing Network+ deep audit reports stale expected counts, point mismatches, and many legacy text-exercise schema warnings.
- Existing courses need migration into this activity taxonomy; this change provides schema and UI foundation without mechanically cloning one exercise pattern across hundreds of lessons.
