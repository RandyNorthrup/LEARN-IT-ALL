# Competitive Learning-Task Audit

Reviewed: 2026-07-15

## Status and limits

This is the first evidence pass, based on current official product documentation and publicly accessible course routes. It records task hypotheses and rejected patterns. It is not a comparative effectiveness study, does not infer private product behavior, and does not claim that a popular feature improves learning.

Authenticated hands-on journeys, assistive-technology observations, pricing and lock-boundary checks, and representative learner comparison remain required. Findings below may drive a trial, never publication by imitation.

## Questions

For each platform, inspect what a learner must do to:

1. choose a goal and understand prerequisites;
2. learn a new concept rather than recognize a label;
3. build, run, inspect, revise, and recover;
4. receive useful feedback without answer leakage;
5. retrieve earlier skills and show retention;
6. complete an unfamiliar project or transfer task;
7. understand progress and the evidence behind it;
8. navigate by keyboard, screen reader, zoom, touch, and supported tablet;
9. resume after interruption, failure, or a wrong path;
10. understand cost, account, mentor, certificate, or feature boundaries.

## Evidence discipline

Each record separates four states:

- **Documented:** current official material describes the behavior.
- **Observed:** a researcher completed the task and retained dated evidence.
- **Learner-validated:** representative learners completed the task under the pilot protocol.
- **Rejected:** the pattern conflicts with a learning, accessibility, safety, privacy, or evidence requirement.

No item in this file is learner-validated yet. No screenshots, authenticated recordings, or private account data were collected in this pass.

## Task records

### freeCodeCamp Responsive Web Design v9

Source: [current certification route](https://www.freecodecamp.org/learn/responsive-web-design-v9/) and [workshop authoring documentation](https://contribute.freecodecamp.org/how-to-work-on-workshops/)

- Documented pattern: granular cumulative workshop steps, labs, reviews, quizzes, certification projects, and a large practice inventory.
- Learning purpose to test: shorten the edit-feedback cycle and distribute practice across many small decisions.
- Limitation: inventory size and tiny steps do not establish explanation quality, changed-case grading, persistence reliability, project independence, or transfer.
- Adopt as trial: a versioned breadth and depth benchmark for Responsive Web Design, with wholly original teaching, scenarios, code, checks, feedback, and projects.
- Reject: copied challenge wording, renamed clones, token-presence acceptance, step count as quality, and a certificate based only on guided completion.
- Local validation: false-positive and false-negative suites, interrupted-resume tests, semantic duplication review, complete beginner observation, delayed assessment, and unfamiliar project defense.

### MDN Curriculum and Learn Web Development

Sources: [curriculum scope](https://developer.mozilla.org/en-US/curriculum/about-curriculum/) and [core modules](https://developer.mozilla.org/en-US/curriculum/core/)

- Documented pattern: standards-oriented essential front-end outcomes, explicit audience and scope, accessibility, testing, and regular review.
- Learning purpose to test: keep technical scope coherent and prevent frameworks or tricks from displacing fundamentals.
- Limitation: MDN explicitly provides a curriculum and learning resources rather than a complete assessed course for this platform.
- Adopt: technical scope authority and maintenance model, joined to original learning progression and performance evidence.
- Reject: linking to reference pages as a substitute for teaching or assessing a beginner.
- Local validation: each source objective must map through explanation, worked example, guided and faded practice, debugging, assessment, project, and transfer.

### The Odin Project

Sources: [project description](https://www.theodinproject.com/about) and [Foundations course guidance](https://www.theodinproject.com/lessons/foundations-how-this-course-will-work)

- Documented pattern: a visible roadmap, cumulative order, external research, and strategically placed build projects.
- Learning purpose to test: show why each step exists and make real artifact growth central to the route.
- Limitation: a roadmap and projects do not guarantee accessible inline tooling, formative diagnostics, misconception repair, or valid automated evidence.
- Adopt as trial: show the cumulative artifact and independent projects on the course map from the beginning.
- Reject: an unbounded link journey, unexplained project failure, or research scavenger hunt before foundational models exist.
- Local validation: learners must explain current-to-project relationships, recover from a realistic defect, and build a changed project without copying the guided artifact.

### Exercism

Sources: [Learning Mode and unlocking](https://exercism.org/docs/building/product/unlocking-exercises), [practice exercise design](https://exercism.org/docs/building/tracks/practice-exercises), and [syllabus design](https://exercism.org/docs/building/tracks/syllabus)

- Documented pattern: focused concept exercises unlock practice through a prerequisite concept tree; learners can choose Practice Mode and may use mentoring.
- Learning purpose to test: preserve concept order while allowing agency, additional practice, and human feedback.
- Limitation: documented unlocking behavior does not prove that a lock is understood, that completion demonstrates readiness, or that the same mechanism fits every domain.
- Adopt as trial: transparent evidence-based prerequisites with diagnostic, bridge, review, and practice choices.
- Reject: completion-only locks, invisible rules, one-way dead ends, or a forced linear route for a learner who can demonstrate prerequisites.
- Local validation: novice and returning learners must predict why an activity is unavailable and reach the right corrective path without facilitator explanation.

### Carnegie Mellon Open Learning Initiative

Sources: [practice pages](https://oli.cmu.edu/faq-items/practice-pages/) and [student learning guidance](https://oli.cmu.edu/students/learn-how-oli-helps-students/)

- Documented pattern: clear goals, low-stakes practice, immediate feedback, and opportunities to learn before graded assessment.
- Learning purpose to adopt: make errors usable by connecting observed evidence to the misconception and the smallest productive next action.
- Limitation: official product guidance does not validate LEARN-IT-ALL hint wording, retry policy, feedback timing, or measurement reliability.
- Adopt: correction and a parallel retry before summative evidence.
- Reject: red or green status without cause, feedback that reveals the answer, and a grade on the first encounter with a skill.
- Local validation: feedback comprehension interviews, hint-level analysis, retry transfer tasks, and assessment false-positive and false-negative review.

### Khan Academy mastery

Sources: [Mastery Challenges](https://support.khanacademy.org/hc/en-us/articles/360037494231-What-are-Mastery-Challenges) and [course and unit mastery](https://support.khanacademy.org/hc/en-us/articles/115002552631-What-are-Course-and-Unit-Mastery-)

- Documented pattern: later mixed challenges revisit eligible skills and can move a skill to a lower mastery level.
- Learning purpose to test: separate historical completion from current retained performance.
- Limitation: question-level mastery behavior cannot be transferred directly to programming, design, debugging, project quality, or professional judgment.
- Adopt as trial: delayed mixed retrieval with honest retention changes while completed work remains visible.
- Reject: XP, streaks, time spent, or repeated recognition questions as coding mastery.
- Local validation: delayed implementation, changed-case debugging, method selection, explanation, and transfer tasks must predict later independent work.

### Codecademy paths

Source: [learning-path guidance](https://help.codecademy.com/hc/en-us/articles/220453248-Picking-Your-Learning-Path)

- Documented pattern: a larger route is divided into milestones containing lessons, quizzes, and projects.
- Learning purpose to test: reduce wayfinding cost and communicate progress toward a learner goal.
- Limitation: milestone and activity completion do not prove competence, retention, or project readiness.
- Adopt as trial: clear milestone maps whose status opens the actual supporting evidence.
- Reject: an opaque percentage, paywall boundary, or activity total presented as mastery.
- Local validation: learners must accurately explain every progress label, resume the right task, and find the evidence or corrective route behind it.

### CodeSandbox Sandpack

Source: [official Sandpack documentation](https://sandpack.codesandbox.io/)

- Documented pattern: composable multi-file editing, browser bundling, live preview, errors, and dependencies in one interface.
- Learning purpose to test: keep construction, observation, diagnosis, and revision in one short feedback loop.
- Limitation: a component is not an isolation, accessibility, persistence, grading, offline, or multi-language guarantee.
- Adopt as architecture input: cohesive editor, output, diagnostics, evidence, and revision surfaces.
- Reject: arbitrary package execution, uncontrolled network access, inaccessible editor-only paths, or third-party runtime behavior as the canonical grader.
- Local validation: keyboard, screen-reader, zoom, touch, failure, timeout, persistence, changed-case, and escape attempts at tablet and desktop sizes.

### Monaco Editor

Sources: [official repository and browser support](https://github.com/microsoft/monaco-editor) and [integrator accessibility guidance](https://github.com/microsoft/monaco-editor/wiki/Accessibility-Guide-for-Integrators)

- Documented pattern: language services, diagnostics, keyboard help, screen-reader mode, high contrast, and editor accessibility APIs.
- Documented limit: mobile browsers are not supported.
- Adopt as trial: Monaco on supported tablet and desktop browsers, with explicit labels, semantic diagnostic list, focus escape, keyboard help, and screen-reader testing.
- Required fallback: a fully functional native editor when Monaco is unsupported or fails, plus a phone handoff that preserves work.
- Reject: a course activity whose only completion path depends on Monaco.
- Local validation: identical save, run, feedback, reset, recovery, and submission outcomes in Monaco and fallback paths.

## Explicitly unresolved platforms and tasks

CodeCrafters, DataCamp, Brilliant, Coursera, edX, Scrimba, Frontend Mentor, Boot.dev, and other candidate products need current official task evidence or direct authorized observation before they influence a decision. Marketing descriptions and search snippets are insufficient. Pricing, account creation, certificates, mentor queues, AI help, export, offline use, data retention, deletion, and disability accommodations remain separate audit tasks.

## Current cross-platform decisions

1. Use transparent prerequisite maps with corrective choices, not unexplained locks.
2. Show cumulative authentic projects from the start, but fade guidance before transfer.
3. Put low-stakes feedback and correction before summative evidence.
4. Mix delayed retrieval and allow retention evidence to decline without erasing completion.
5. Make milestone and progress labels open the real persisted evidence behind them.
6. Keep build, output, diagnostics, feedback, and revision together in an accessible workspace.
7. Treat every pattern above as a falsifiable trial until representative learner tasks pass.

## Next evidence pass

- complete authenticated journeys only where terms and authorization allow;
- record viewport, input method, assistive technology, account tier, date, task, expected result, observed result, friction, recovery, and evidence location;
- run the same bounded tasks on LEARN-IT-ALL vertical slices;
- severity-rate gaps, repair them, and repeat with representative learners;
- revise or reject decisions when observed behavior contradicts the current hypothesis.
