# LEARN-IT-ALL Project Memory

Last updated: 2026-07-16

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

## Current implementation boundary

The current tree contains none of the following:

- all 54 files under `blueprints/**`;
- all 12,985 generated files formerly under `content/v2/courses/**`;
- the populated 98 MiB local runtime index, replaced by a zero-document index;
- the blueprint schema, template, audit, and blueprint-derived RWD coverage generator;
- generated-course assertion and compile suites that only certified deleted output;
- fake course availability, hours, lesson counts, chapter counts, and path-hour data;
- stale baseline reports that treated rejected blueprints or deleted course files as active architecture;
- the Go content audit tied only to deleted generated Go lessons.
- the PicoC substitute runtime and C workspace contract, which covered only C89/C90 plus selected C99 rather than the planned C23 course;

Git history is the only prior-implementation record. Do not create an archive directory, compatibility route, renamed copy, fallback mapping, or learner-content generator.

Current infrastructure retained intentionally:

- `src/core/curriculum/schema.ts`: target v2 course/module/activity/step/check contracts;
- `src/core/curriculum/repository.ts`: digest-verifying runtime loader;
- `scripts/compile-curriculum-runtime-index.mjs`: builds the compressed runtime index and derives its lightweight outline in memory from independently reviewed source; it writes no derived file into course source;
- learning-quality and duplication audit engines;
- sandboxed browser runtimes and worker boundaries;
- current primary-source research compilers and pinned evidence.

These are the only current rebuild infrastructure; none is a compatibility layer or learner-content authoring path.

The planned C course remains in the 54-course research scope but has no live workspace/runtime contract. Reintroduce C only after current C23, sanitizer, diagnostic, isolation, delivery, accessibility, and transfer gates accept one production path.

The planned TypeScript course also remains in scope but has no live workspace/runtime contract. TypeScript 6.0.3 is the sole direct application compiler and the host-side learner diagnostics endpoint is removed. TypeScript 7.0.2 was tested and rejected for this stack because it ships without a programmatic API and current Next.js type generation did not recognize it as a complete TypeScript installation. Reintroduce TypeScript learning files only after one current isolated browser or bounded-service design passes the same gates without executing learner source through the application host CLI.

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
- 100 CSS/responsive/design concepts;
- 183 total concepts;
- 122 agent-inspected source blocks;
- 1,002 inspected challenges;
- 1,080 captured question prompts;
- 3,233 inspected implementation checks;
- 129 block-specific candidate mappings;
- 28 uninspected source blocks with exact evidence and zero guessed concepts;
- 1 assessment container without reviewable item-level evidence;
- 6 unresolved concepts;
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
- Verify public information and phone handoff at a phone viewport, and changed learner flows at supported tablet and desktop viewports.
- Browser previews remain sandboxed. Python, SQL, and Go run only in bounded workers. Shell/network work uses deterministic simulation. C and TypeScript have no approved learner runtime. No learner source reaches host command execution.
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

Do not run Lighthouse while planned content, authoring, reviews, migration-removal, duplication work, editor/progress/navigation work, or learner pilots remain. Final Lighthouse excludes SEO and requires at least 99 for performance, accessibility, and best practices on tablet and desktop.

Do not add GitHub Actions, workflow files, or push-triggered runners. Run gates locally.

## Current verification evidence

Pushed milestones:

- `6b23ee63` — deny generated curriculum publication;
- `21aa3272` — remove the blueprint-derived Responsive Web Design coverage generator and feed concept alignment directly from pinned source evidence;
- `2be14c1b` — physically remove the rejected generated curriculum and blueprint inventory;
- `9ce07e46` — replace obsolete generators and runtimes with current research/runtime compilers, one CodeMirror editor path, same-origin Pyodide assets, and explicit C/TypeScript publication blockers.
- 2026-07-15 CSS Colors research wave — inspect all 5 blocks and 98 challenges; add current CSS Color 4/5, CSS Images 4, Color Adjustment, and WCAG evidence; split modern derived-color behavior into an uncredited extension; compile 93 inspected blocks and 105 bounded mappings.
- 2026-07-15 Styling Forms research wave — inspect all 7 blocks and 84 challenges; add current HTML, CSS UI 4, CSS Form Control Styling freshness-watch, and WCAG evidence; reject the repeated custom-checkbox lab; adopt native controls and `accent-color` before appearance suppression; compile 100 inspected blocks and 111 bounded mappings.
- 2026-07-15 Styling Forms verification — reproducibility gate current; focused research test 28/28; full test suite 47 files / 215 tests; type-check, normal lint, warning-failing strict lint, and Next.js 16.2.10 production build pass with 16 expected routes and zero curriculum documents. Lighthouse remains held.
- 2026-07-15 CSS Layouts and Effects research wave — inspect all 5 blocks and 54 challenges; add current CSS Box 4, Sizing 3, CSS 2.2 margin collapse, Overflow 3, Transforms 1, Filter Effects 1, and WCAG evidence; reject CSS blur as confidentiality or redaction; compile 105 inspected blocks and 115 bounded mappings.
- 2026-07-15 CSS Layouts and Effects verification — reproducibility gate current; focused research test 30/30; full test suite 47 files / 217 tests; type-check, normal lint, warning-failing strict lint, and Next.js 16.2.10 production build pass with 16 expected routes and zero curriculum documents. Lighthouse remains held.
- 2026-07-15 Flexbox research wave — inspect all 7 Flexbox and playing-cards blocks and 71 challenges; add current CSS Flexbox 1, Box Alignment 3, sizing, order, focus, and meaningful-sequence evidence; reject physical-direction recipes, unscaled shrink claims, brittle ghost items, and visual ordering that contradicts DOM and keyboard order; compile 112 inspected blocks and 121 bounded mappings.
- 2026-07-15 Flexbox verification — reproducibility gate current; focused research test 32/32; full test suite 47 files / 219 tests; type-check, normal lint, warning-failing strict lint, and Next.js 16.2.10 production build pass with 16 expected routes and zero curriculum documents. The research audit correctly retains 53 missing-dossier blockers and one incomplete-research warning. Lighthouse remains held.
- 2026-07-16 Typography research wave — inspect all 5 Typography blocks and 78 challenges; add current CSS Fonts 4, Font Loading 3, Text 4, Text Decoration 4, Inline 3, WOFF2, WCAG, WAI, and FDA evidence; split selection, delivery, metrics, variable features, line layout, text processing, and decoration into testable concepts; reject named-font consistency, serif/sans readability stereotypes, unexamined third-party requests, regulated-label tracing, tiny fixed text, negative-offset recipes, and source-string grading; compile 117 inspected blocks and 125 bounded mappings.
- 2026-07-16 Typography verification — reproducibility gate current; focused research test 35/35; full test suite 47 files / 222 tests; type-check, normal lint, warning-failing strict lint, and Next.js 16.2.10 production build pass with 16 expected routes and zero curriculum documents. Research audit records 72 sources and correctly retains 53 missing-dossier blockers plus one incomplete-research warning. Lighthouse remains held.
- 2026-07-16 current-only implementation boundary — active plan and README now describe the current replacement architecture instead of leading with deleted implementation; the exact top-level script inventory is allowlisted; no learner-content authoring script exists; runtime-index and research-report commands reject every output path inside reviewed course source; research artifacts remain byte-reproducible. Focused boundary/research gate: 4 files / 47 tests. Full gate: 47 files / 224 tests, type-check, normal lint, warning-failing strict lint, and Next.js 16.2.10 production build with 16 expected routes and zero curriculum documents. Lighthouse remains held.
- 2026-07-16 CSS Accessibility research wave — inspect all 5 blocks, 72 challenges, 16 question prompts, and 362 implementation checks; add current Media Queries Level 5 and WAI ACT aria-hidden/focus evidence; replace the broad module bundle with five exact maps; reject stale screen-reader-only recipes, redundant regions, generated required wording, tool-name recall, hover-only links, fixed responsive patches, and tribute-page structure as accessibility mastery; require rendering, layout, focus, accessibility-tree, contrast, preference, changed-state, complementary evaluation, repair, and transfer evidence. Current alignment: 122 inspected blocks, 1,002 inspected challenges, 1,080 prompts, 3,233 checks, 129 bounded mappings, 28 unmapped blocks, and 36 total blocks still requiring inspection.
- 2026-07-16 CSS Accessibility verification — reproducibility gate current; focused research/current-surface gate 2 files / 42 tests; full test suite 47 files / 226 tests; type-check, normal lint, warning-failing strict lint, and Next.js 16.2.10 production build pass with 16 expected routes and zero curriculum documents. Research audit records 75 sources and correctly retains 53 missing-dossier blockers plus one incomplete-research warning. Lighthouse remains held.

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

The current research/editor/runtime hard-cut milestone passed:

- complete Pseudo-classes and Pseudo-elements source inspection: 6 blocks, 74 challenges, 61 question prompts, and 270 implementation checks;
- current RWD research compilation: 117 inspected blocks, 930 inspected challenges, 1,064 captured prompts, 2,871 inspected checks, 125 block-specific mappings, 32 uninspected/unmapped blocks, and 41 total blocks still requiring inspection;
- removal of every `generate-*` script, the course-outline writer, the stale 54-course/11,742-activity baseline, dead packages, app compatibility shims, the dual TypeScript path, the host learner-diagnostics endpoint, and the obsolete PicoC runtime;
- one direct CodeMirror editor implementation with current official HTML, CSS, JavaScript, Python, SQL, and Go parsers; no Monaco, coding textarea, legacy mode, lazy alternate workspace, or second editor path;
- a single TypeScript 6.0.3 application compiler, selected after TypeScript 7.0.2 failed current Next.js type-generation compatibility and official TypeScript evidence confirmed that 7.0 ships without a programmatic API;
- five byte-identical pinned Pyodide assets served from the application origin; the CDN runtime path is gone;
- focused gate: 14 test files / 100 tests;
- full `npm test`: 47 test files / 211 tests;
- `npm run type-check`, normal lint, and warning-failing strict lint across 134 source/script files;
- Next.js 16.2.10 production build with 16 expected routes and no TypeScript learner-runtime route;
- valid complete npm tree, zero production or complete audit vulnerabilities, and one explicit `npm outdated` exception: TypeScript 6.0.3 selected/wanted versus incompatible 7.0.2 latest;
- live same-origin Pyodide asset smoke plus catalog browser checks at 390×844, 1024×768, and 1440×900: one H1, no horizontal overflow, no undersized interactive target, and no console error.

The CodeMirror component is test-, type-, lint-, and build-valid but not learner-flow-verified: publication correctly exposes no activity route, and no fake course was created to manufacture a browser test. Flow verification is a blocking acceptance task for the first independently reviewed HTML vertical slice.

## Next work

1. Complete challenge-level inspection for the remaining 36 Responsive Web Design source blocks without guessed concept mappings.
2. Run independent subject, instructional-design, assessment, accessibility, and duplication reviews; create the complete activity matrix.
3. Author and pilot the true-beginner HTML/editor vertical slice before scaling Responsive Web Design.
4. Complete and review the full Responsive Web Design course, then research and rebuild the other 53 courses in prerequisite order.
5. Finish cohesive navigation, real mastery/progress, isolated runtimes, persistence, correction, and accessible responsive learner flows; research current C and TypeScript learner runtimes before restoring either file contract.
6. Run representative learner pilots, repair findings, and repeat all release gates.
7. Run final Lighthouse only after every earlier gate is complete.

## Blockers

No external execution blocker is currently recorded. Release is blocked by incomplete research, 53 missing course dossiers, 36 uninspected Responsive Web Design source blocks, missing independent reviews and activity matrices, zero authored/published courses, unverified CodeMirror learner flow, missing approved C and TypeScript runtimes, unfinished editor diagnostics/progress/navigation integration, and missing observed-learner pilot evidence. Lighthouse remains intentionally blocked by this work.
