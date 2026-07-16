# LEARN-IT-ALL Project Memory

Last updated: 2026-07-15

This file is the canonical repository handoff. Reverify volatile counts before reporting them.

## Active objective

Completely rebuild LEARN-IT-ALL as a research-backed, institution-grade, modern, fun, cohesive, accessible build-to-learn platform. This is a platform and curriculum replacement, not a repair of deleted generated courses.

Every planned course must move from verified entry competence to independent performance through prerequisite-ordered, cumulative, original theory, prediction, worked examples, guided workshops, faded practice, debugging, labs, retrieval, quizzes, authentic projects, exams, correction, delayed retention, and transfer. Earlier skills remain active requirements in later work.

Build-capable courses require resumable inline workspaces with the appropriate isolated runtime or bounded authentic simulator, diagnostics, preview/output, tests, progressive hints, saved evidence, and behavior-based changed-case grading. Canonical answers remain server-side. Learner source never executes on the application host.

## Current truth

- Published courses: **0**.
- Published learning paths: **0**.
- Planned research scope: **54 courses** in `docs/research/course-inventory.json`.
- Research state: Responsive Web Design is `researching`; 53 courses are `pending`; 0 are approved.
- Reviewed course JSON under `content/v2/courses`: **0 documents**.
- Runtime curriculum index: **0 documents**.
- GitHub Actions/workflow files: **none permitted**.
- Lighthouse: **on hold**.

`src/lib/data/publishedCourses.ts` is the deny-by-default course publication manifest. It contains no courses. `src/lib/data/publishedTracks.ts` contains no learning paths. Catalog, settings, both learner routes, course attempt/draft/hint APIs, progress-reset course validation, and the tracks API respect publication state.

The learner-facing site presents an honest empty state. It does not expose planned cards, estimated hours, activity totals, XP, streaks, fake recommendations, practice rooms, or internal repository decisions.

## Hard cut completed in the current working milestone

The rejected implementation is physically removed:

- all 54 files under `blueprints/**`;
- all 12,985 generated files formerly under `content/v2/courses/**`;
- the populated 98 MiB local runtime index, replaced by a zero-document index;
- the blueprint schema, template, audit, and blueprint-derived RWD coverage generator;
- generated-course assertion and compile suites that only certified deleted output;
- fake course availability, hours, lesson counts, chapter counts, and path-hour data;
- stale baseline reports that treated rejected blueprints as active architecture;
- the Go content audit tied only to deleted generated Go lessons.

Git history is the only archive. Do not create an archive directory, old-data package, compatibility route, renamed copy, fallback mapping, or generator that can recreate deleted instruction.

Current infrastructure retained intentionally:

- `src/core/curriculum/schema.ts`: target v2 course/module/activity/step/check contracts;
- `src/core/curriculum/repository.ts`: digest-verifying runtime loader;
- `scripts/generate-curriculum-outlines.mjs`: mechanical compiler for independently reviewed source;
- `scripts/generate-curriculum-runtime-index.mjs`: mechanical compressed runtime index;
- learning-quality and duplication audit engines;
- sandboxed browser runtimes and worker boundaries;
- current primary-source research compilers and pinned evidence.

These are rebuild infrastructure, not compatibility layers.

## Research evidence

Primary platform records:

- `docs/research/platform-research-register.json`
- `docs/research/course-inventory.json`
- `docs/research/COMPETITIVE_TASK_AUDIT_2026-07-15.md`
- `docs/research/EDITOR_RUNTIME_THREAT_MODEL_2026-07-15.md`
- `docs/research/STACK_COMPATIBILITY_MATRIX_2026-07-15.md`
- `docs/research/PROGRESS_NAVIGATION_EVIDENCE_CONTRACT.md`
- `docs/research/LEARNER_RESEARCH_AND_PILOT_PROTOCOL.md`

The platform register covers 11 research tracks with bounded claims, limitations, decisions, validation, and refresh triggers. These records are research decisions, not learner-pilot completion or publication evidence.

### Responsive Web Design

Pinned external evidence: `references/freecodecamp-rwd-v9.json` at upstream commit `c115efdd41f868d8850156f6a7a211219c35a847`.

Verified source inventory:

- 4 chapters;
- 29 source modules;
- 158 source blocks;
- 1,553 exact challenge identities;
- exact source paths, SHA-256 hashes, byte counts, sections, hint checks, quiz prompts, and code-language evidence.

Current research artifacts:

- `docs/research/courses/responsive-web-design.json`
- `docs/research/courses/responsive-web-design-html-concepts.json`
- `docs/research/courses/responsive-web-design-css-concepts.json`
- `docs/research/courses/responsive-web-design-concept-alignment.json`
- `docs/research/courses/responsive-web-design-course-architecture.json`
- block-inspection notes under `docs/research/courses/`

Current candidate graph:

- 83 HTML/tooling concepts;
- 96 CSS/responsive/design concepts;
- 179 total concepts;
- 82 agent-inspected source blocks;
- 471 inspected challenges;
- 758 captured prompts;
- 96 block-specific candidate mappings;
- 61 uninspected blocks with exact evidence and zero guessed concepts;
- 1 assessment container without reviewable item-level evidence;
- 7 unresolved concepts;
- 7 explicit modern extensions not credited to the benchmark;
- candidate architecture of 17 cumulative modules and 5 original project briefs.

All mappings remain `candidate-review`. All modules and projects remain `planned-not-authored`. Source capture and agent inspection are not independent subject review, authored teaching, assessment validity, accessibility proof, retention evidence, or learner success.

The target opening begins with a meaningful HTML edit by learner action two. Required file, browser, DevTools, search, safety, and research skills enter just in time around the first artifact. The deleted 13-activity pre-HTML barrier must not return.

## Product and curriculum rules

- Research every course against current primary specifications, official documentation, certification objectives, and recognized curriculum frameworks before architecture or scale authoring.
- Keep all learner-facing prose, scenarios, code, assessments, projects, solutions, and feedback original.
- Define intended learners, entry competencies, terminal tasks, prerequisites, misconceptions, safety boundaries, authentic tasks, evidence, exclusions, and maintenance triggers.
- Require introduce, model, guided, faded, retrieve, assess, delayed-retain, and transfer evidence for every competency.
- Require meaningfully different scenarios, starters, requirements, reasoning, interactions, evidence, and correction paths across workshops, labs, debugging, quizzes, and projects.
- Keyword or source-shape presence is not mastery. Require runnable behavior, changed cases, causal diagnosis, invariants, design defense, or defensible stakeholder evidence.
- Never equate generated quantity, schema validity, or one passing walkthrough with pedagogy or completeness.
- Never publish before subject, instructional-design, assessment, accessibility, safety/privacy, duplication, runtime, responsive-flow, and observed-learner gates pass.
- Gamification must serve learning and use real evidence. No arbitrary points, streaks, loot, or dead challenge cards.
- Learner navigation describes how to learn and continue, not repository architecture or engineering history.

## UI and runtime rules

- Course studios target accessible tablet and desktop use. Public information and the phone handoff remain phone-usable.
- Every changed flow must support keyboard use, logical landmarks/headings, visible focus, announced feedback, 44-pixel targets, reduced motion, structured alternatives, and no color-only meaning.
- Verify changed flows at mobile, tablet, and desktop viewports as required by `AGENTS.md`.
- Browser previews remain sandboxed. Python, SQL, Go, and C run only in bounded workers. Shell/network work uses deterministic simulation. No learner source reaches host command execution.
- Persist real completion, attempts, hints, correction, competency mastery, retention, transfer, project readiness, drafts, and evidence. Do not invent analytics.

## Verification order

For every milestone:

1. focused tests and audits for changed code/content;
2. full `npm test`;
3. `npm run type-check`;
4. `npm run lint`;
5. `npm run lint:strict`;
6. `npm run build`;
7. browser verification of changed learner flows at required viewports.

Do not run Lighthouse while planned content, authoring, reviews, migration-removal, duplication work, editor/progress/navigation work, or learner pilots remain. Final Lighthouse excludes SEO and requires at least 99 for performance, accessibility, and best practices on mobile, tablet, and desktop.

Do not add GitHub Actions, workflow files, or push-triggered runners. Run gates locally.

## Current verification evidence

Pushed milestones:

- `6b23ee63` — deny generated curriculum publication;
- `21aa3272` — remove the blueprint-derived Responsive Web Design coverage generator and feed concept alignment directly from pinned source evidence.

Before the physical deletion milestone, the deny-by-default publication change passed 91 test files / 590 tests, type-check, normal lint, strict lint, Next.js 16.2.10 production build, and real browser checks at 390×844, 768×1024, and 1440×900. Deleted RWD routes and attempt/draft/hint APIs returned 404; `/api/tracks` returned an empty array.

The physical hard-cut milestone passed:

- reproducibility checks for all current Responsive Web Design research artifacts;
- focused research, publication, empty-source, runtime-index, outline, catalog, and audit tests;
- full `npm test`: 48 test files / 204 tests;
- `npm run type-check`;
- normal and warning-failing strict Biome gates across 140 source/script files;
- Next.js 16.2.10 production build with a zero-document runtime index;
- browser verification at 390×844 mobile, 768×1024 tablet, and 1440×900 desktop.

Home, catalog, and learning paths each rendered one H1, no horizontal overflow, no visible interactive target below 44 pixels, and accurate zero-course/zero-path states. Visual screenshot review found no cut-off, overlap, or misleading course UI. Keyboard focus used a visible 3-pixel outline. Reduced-motion emulation reported zero running animations. The browser console contained only development/HMR information and no page errors.

Tablet Settings also rendered one H1, no overflow, and no undersized controls. With zero published courses it shows no empty selector or dead single-course reset button; it explains that no open course has progress to reset while preserving the explicit all-history reset.

Both deleted Responsive Web Design page routes returned 404. Attempt, draft, hint, and course-specific progress-clear APIs returned 404. `/api/tracks` returned HTTP 200 with `[]`. The restarted review server holds the zero-document index and remains available at `http://localhost:3000`.

## Next work

1. Commit and push the verified physical hard cut.
2. Complete challenge-level inspection for the remaining 76 Responsive Web Design source blocks without guessed concept mappings.
3. Run independent subject, instructional-design, assessment, accessibility, and duplication reviews; create the complete activity matrix.
4. Author and pilot the true-beginner HTML/editor vertical slice before scaling Responsive Web Design.
5. Complete and review the full Responsive Web Design course, then research and rebuild the other 53 courses in prerequisite order.
6. Finish cohesive navigation, real mastery/progress, isolated runtimes, persistence, correction, and accessible responsive learner flows.
7. Run representative learner pilots, repair findings, and repeat all release gates.
8. Run final Lighthouse only after every earlier gate is complete.

## Blockers

No external execution blocker is currently recorded. Release is blocked by incomplete research, 53 missing course dossiers, 76 uninspected Responsive Web Design source blocks, missing independent reviews and activity matrices, zero authored/published courses, unfinished editor/progress/navigation integration, and missing observed-learner pilot evidence. Lighthouse remains intentionally blocked by this work.
