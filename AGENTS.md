# LEARN-IT-ALL Agent Instructions

These instructions apply to the entire repository. They are durable project rules, not suggestions.

## Start and working behavior

- Always load and use the `/caveman` skill. Keep updates short while preserving exact technical meaning.
- Read `docs/PROJECT_MEMORY.md` before substantial work. Before curriculum architecture or course-scope work, also read `docs/CURRICULUM_DESIGN_HANDBOOK.md` and `docs/PLATFORM_REBUILD_SPEC.md`.
- Keep the active goal and working plan current. Update the plan when scope, order, evidence, or blockers change.
- Execute requested build and refactor work end to end while safe in-scope work remains. Do not stop at recommendations.
- Preserve unrelated user work in this intentionally dirty worktree. Never reset, discard, replace, or silently reformat unrelated changes.
- Add or update tests for every code, schema, generator, content-contract, migration, and behavior change.
- Distinguish `planned`, `generated`, `schema-valid`, `flow-verified`, and `published`. Never report one state as another.
- End every user-facing session with verified results, the next concrete work, and blockers. Never call unfinished generated content complete.

## Product objective

Rebuild LEARN-IT-ALL as a modern, fun, local-first, accessible, responsive, highly interactive build-to-learn platform. This is a total platform and curriculum overhaul, not a cosmetic cleanup or small extension of the legacy course format.

Every course must take its stated learner from verified entry skills to independent mastery. Courses and lessons must follow prerequisites, accumulate skills, retrieve and reinforce earlier material, avoid duplication, and contain substantial original theory, prediction, worked examples, guided workshops, faded practice, debugging, independent labs, retrieval, quizzes, authentic projects, and cumulative exams.

The audit-required course inventory under `content/v2` is temporary live input, not the target design. Do not preserve weak repeated layouts, shallow renamed exercises, or generic generated prose for consistency. Do not add compatibility aliases, retired API tombstones, guessed migrations, fallback curriculum mappings, or generators that can recreate unapproved content. Replace each live input through researched vertical slices, verify equivalent learner data and flows, then delete the superseded input.

## Curriculum research and quality

- Research fast-changing technical content against current primary specifications, official project/vendor documentation, certification objectives, and recognized curriculum frameworks. Record exact versions, source URLs, and review dates.
- Use outside curricula only to establish coverage and depth. Keep every learner-facing explanation, example, exercise, assessment, project, and solution original.
- Responsive Web Design must cover the current freeCodeCamp Responsive Web Design v9 topic and practice depth while using original LEARN-IT-ALL material.
- Define intended learner, entry competencies, observable terminal competencies, prerequisites, misconceptions, mastery evidence, scope boundaries, and introduce/guided/faded/retrieve/assess/transfer coverage before declaring a course complete.
- Every lesson must retrieve named earlier skills, add bounded complexity, and continue enforcing previously learned correctness, accessibility, security, testing, and design habits.
- Workshops, labs, debugging tasks, quizzes, and projects must use meaningfully different scenarios, starters, requirements, reasoning, and evidence. Renamed or lightly paraphrased copies fail review.
- Code shape or keyword presence alone is not mastery evidence. Require runnable behavior, changed-case output, causal diagnosis, invariant checks, design justification, or defensible stakeholder evidence.
- Generated file or step count is inventory, never proof of pedagogy or completeness. Inspect learner flow and content quality before publication.
- Never mark a course `available`, `approved`, certified, or published until schema, prerequisite order, coverage, runnable-content, assessment, duplication, accessibility, responsive-flow, and subject-quality gates pass.

## Stack and implementation

- Upgrade the stack to the latest mutually compatible stable releases, then repair fallout. Verify versions and compatibility from primary release documentation; keep the lockfile reproducible.
- Prefer coherent replacement architecture over compatibility layers. Remove obsolete executable paths immediately when current learner data and flows do not depend on them. When data does depend on an earlier shape, migrate exact records without proportional or guessed equivalence, verify preservation, then remove the earlier schema and migration code.
- Keep canonical grading answers server-side. Client submissions are evidence, never the source of truth.
- Keep learner code isolated: browser previews remain sandboxed; Python, SQL, and Go run only in bounded workers; shell and network work use deterministic simulation; learner source never reaches host command execution.
- Use generators only for reproducible research artifacts and mechanical envelopes backed by reviewed source models. Never generate learner-facing instructional prose from topic names. Generated output must be reproducible, reviewed, and protected by schema, order, coverage, compilation, duplication, and behavior tests.

## UI and interaction

- Build accessibility and responsiveness into every UI/UX change from the first implementation. Course studios target tablet and desktop; public informational and navigation surfaces remain usable on phones.
- Support keyboard-only use, logical landmarks and headings, visible focus, announced status, large touch targets, reduced motion, structured text alternatives, and no color-only meaning.
- Make interaction genuinely useful: rapid feedback, resumable work, progressive hints, correction paths, varied practice, learner choice, and visible mastery. Gamification supports learning and never substitutes for it.
- Verify every changed learner flow at tablet and desktop viewports. Check content reflow, overflow, touch/keyboard operation, status announcements, console errors, and the actual grading/runtime path. Phone visits to course studios receive a clear accessible handoff to continue on a tablet or computer.

## Verification and Lighthouse hold

Use this non-Lighthouse gate order:

1. focused tests and audits for changed code and content;
2. full `npm test`;
3. `npm run type-check`;
4. `npm run lint`;
5. `npm run lint:strict` so warnings also fail the release gate;
6. `npm run build`;
7. browser verification of changed public and phone-handoff flows at mobile, plus changed learner flows at tablet and desktop sizes.

Do not run Lighthouse while any planned course content, migration, or platform-wide duplication work remains. Lighthouse is the final release gate only. After all content work is complete, run mobile, tablet, and desktop profiles; exclude SEO; require at least 99 for performance, accessibility, and best practices in every profile.

## Durable memory and handoff

- Treat `docs/PROJECT_MEMORY.md` as the canonical repository-local handoff. Update it whenever scope, architecture, course state, verification evidence, next work, or blockers materially change.
- Keep external agent memory as a pointer to this repository-local source, never as a competing project-status record. Resolve conflicts in favor of this file after reverifying volatile facts.
- Record dated verified facts separately from unverified in-progress work. Keep volatile counts dated and recompute them before reporting them as current.
- Preserve the active goal: total platform rebuild, complete prerequisite-ordered curricula, original interactive practice, duplication removal, current compatible stack, and final mobile/tablet/desktop Lighthouse thresholds.
- Do not weaken the curriculum release gates, learner-code isolation, accessibility rules, or Lighthouse hold unless the user explicitly changes them.
