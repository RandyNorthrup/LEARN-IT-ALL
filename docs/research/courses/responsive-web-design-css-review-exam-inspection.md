# Responsive Web Design CSS review and certification exam source inspection

Reviewed: 2026-07-16

Status: complete direct inspection; candidate curriculum evidence only

## Decision

The final pinned CSS review and certification exam container are fully inspected at the evidence available in the repository snapshot. The CSS review is one 59,198-byte reference challenge with 59 topic headings, zero retrieval prompts, and zero implementation checks. The exam source is one 296-byte container that says only “Start your exam in the exam environment app.” It exposes no items, tasks, objective blueprint, distractors, scoring rules, cut score, feedback policy, security boundary, accommodations, item statistics, or validity evidence.

This closes challenge-level inspection for all 158 pinned source blocks and all 1,553 pinned challenge identities. It does not close subject review, instructional review, assessment validation, authoring, runtime verification, accessibility review, duplication review, learner piloting, or publication. The exam's unavailable item bank remains a hard evidence gap. LEARN-IT-ALL will not infer, scrape around, substitute, or guess exam coverage from a title or external launch instruction.

The CSS review receives a bounded map only for concepts its 59 headings actually mention. It does not receive credit for cascade layers, logical properties, font metrics or variable-font behavior, subgrid, anchor positioning, container queries, responsive image selection, navigation disclosure, responsive test matrices, causal debugging, measured rendering performance, changed-case regression, or independent transfer. The exam container receives zero concept assignments because no item-level evidence exists.

LEARN-IT-ALL will not publish a 59-heading answer sheet as cumulative review. Review must make the learner retrieve, select, predict, explain, debug, build, and correct before reference material appears. Certification must begin from a documented claim-and-evidence blueprint and cannot open until its tasks, scoring, fairness, security, reliability, and consequence claims pass review and pilots.

## Exact source boundary

The inspection covers these sources at freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`:

| Source block | Type | Challenges | Prompts | Checks | Bytes | SHA-256 |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| `review-css` | review | 1 | 0 | 0 | 59,198 | `04782cd9c9f4d328b80fe948db8e42ac74556bce752205601ec8c802fed2c955` |
| `exam-responsive-web-design-certification` | exam | 1 | 0 | 0 | 296 | `2eef33dd95fe63001a55a2a076838e9597659668fecf216c310c507d3f7e5ccf` |

Pinned review challenge: `671a9a0a140c2b9d6a75629f`, path `curriculum/challenges/english/blocks/review-css/671a9a0a140c2b9d6a75629f.md`.

Pinned exam challenge: `68db37350b398ecddd1f5dac`, path `curriculum/challenges/english/blocks/exam-responsive-web-design-certification/68db37350b398ecddd1f5dac.md`.

`references/freecodecamp-rwd-v9.json` remains the exact record for all 158 source objectives, 1,553 challenge identities, order, paths, hashes, 6,431,329 bytes, section inventories, 5,163 hint checks, 1,365 question prompts, and code languages. Captured source identity is not subject authority, pedagogical sufficiency, assessment validity, retention, transfer, originality permission, or learner success.

## Current assessment and learning evidence

The target review and certification design is bounded by:

- [IES What Works Clearinghouse: Organizing Instruction and Study to Improve Student Learning](https://ies.ed.gov/ncee/wwc/PracticeGuide/1), released September 2007 and reviewed 16 July 2026, for spacing learning over time, interleaving worked examples with problem solving, active-retrieval quizzes, using assessment to identify what remains to learn, and deep explanatory questions;
- [Standards for Educational and Psychological Testing](https://www.testingstandards.net/), 2014 edition and revision program reviewed 16 July 2026, from AERA, APA, and NCME, for validity, reliability/precision, fairness, test design, scoring, administration, reporting, and responsible interpretation of consequential assessment;
- [ETS: A Brief Introduction to Evidence-Centered Design](https://www.ets.org/research/policy_research_reports/publications/report/2003/hsgs.html), Research Report RR-03-16, for aligning claims about learner competence with observable evidence and tasks capable of eliciting that evidence;
- current HTML, CSS, accessibility, responsive, browser-runtime, and design sources already recorded in the dossier for the meaning of the competencies being reviewed and assessed;
- the complete pinned v9 evidence snapshot and all block-inspection records for benchmark breadth, defects, omissions, duplication, and practice depth.

The educational sources do not prescribe one platform layout or certify this course. They bound the claim that rereading an exposed answer sheet is not active retrieval and the claim that an exam title or pass threshold is not evidence of validity. LEARN-IT-ALL still needs subject experts, assessment specialists, accessibility reviewers, security review, representative learner pilots, and observed score evidence.

## Complete CSS review inventory

The source presents these 59 headings in a single uninterrupted review:

1. CSS basics.
2. Inline, internal, and external CSS.
3. Width and height.
4. Combinators.
5. Inline, block, and inline-block.
6. Margin and padding.
7. Specificity.
8. Design terminology.
9. UI design fundamentals.
10. Design best practices.
11. Common design tools.
12. Absolute units.
13. Relative units.
14. `calc()`.
15. User-action pseudo-classes.
16. Input pseudo-classes.
17. Location pseudo-classes.
18. Tree-structural pseudo-classes.
19. Functional pseudo-classes.
20. Pseudo-elements.
21. Color theory.
22. Color notation.
23. Box shadow.
24. Linear and radial gradients.
25. Input styling.
26. `appearance: none`.
27. Date-time and color-control styling.
28. Overflow.
29. Transforms.
30. Box model.
31. Margin collapse.
32. `content-box` and `border-box`.
33. CSS resets.
34. Filters.
35. Flexbox model.
36. `flex-direction`.
37. `flex-wrap`.
38. `justify-content`.
39. `align-items`.
40. Typography.
41. Font families.
42. “Web safe” fonts.
43. `@font-face`.
44. External fonts.
45. Text shadow.
46. Contrast tools.
47. Accessibility tree.
48. `max()`.
49. CSS accessibility practices.
50. HTML hiding attributes.
51. Placeholder accessibility.
52. Attribute selectors and links.
53. Language and private data attributes.
54. Ordered-list `type`.
55. Floats.
56. Positioning and z-index.
57. Responsive design, media queries, breakpoint bands, and narrow-first work.
58. Custom properties, registered properties, Grid, and animations.
59. Reduced-motion preference.

This breadth is useful as a benchmark inventory. Its format is not a learning activity: the source gives all answers before any attempt, contains no prompt, asks no learner to choose among similar models, executes no code, checks no behavior, collects no confidence, routes no misconception, and schedules no delayed retrieval.

## Technical findings in the review

### Cascade and specificity claims are materially incomplete

The review says inline CSS has the highest specificity and overrides internal or external CSS. It then assigns four-part numbers to inline, ID, class, and type styles. This mixes style attributes, specificity, cascade origin, importance, layer order, scoping proximity, and source order.

- A style attribute is not an extra selector column that makes every declaration win.
- Important declarations, transition and animation cascade levels, origins, layers, encapsulation contexts, and other cascade stages can determine the result before selector specificity.
- Internal and external location does not establish a separate specificity level.
- `!important` does not give a declaration universal “highest priority” regardless of all other rules; important declarations still have origin, layer, scope, specificity, and order relationships.
- Decimal-style or four-slot memorization hides functional-selector behavior and does not teach comparison of the actual selector columns.

The target review gives a set of competing declarations and requires the learner to eliminate irrelevant declarations, identify origin/importance/layer/scope, calculate selector columns, and explain the winner. Changed cases reverse a layer, add a user-important rule, and alter a functional selector.

### Sizing and unit summaries turn context-sensitive values into slogans

The review calls CSS pixels fixed and equates one pixel to 1/96 inch without distinguishing reference pixels from physical output. It says percentages are proportions of the parent, although the containing block and percentage basis depend on the property and formatting context. It treats `auto` width/height as browser choice based on content, parent, and display but does not distinguish definite size, intrinsic contribution, stretch behavior, replaced content, min/max constraints, or automatic minimums.

The margin-collapse definition says adjacent vertical margins produce the larger margin. That omits parent-child and empty-box collapse, negative margins, clearance, and formatting-context boundaries. The `max()` example is arithmetic recall and does not compare it with `min()`, `clamp()`, intrinsic sizing, or an actual content constraint.

The target review interleaves sizing cases. Learners predict containing blocks, percentage bases, intrinsic and extrinsic sizes, min/max constraints, collapsed positive/negative margins, overflow, and zoom/reflow outcomes before inspecting geometry.

### Design advice is presented as universal rules without task evidence

The review lists useful design vocabulary and user-research concepts. It also says dark mode should use desaturated colors, breadcrumbs belong at the top, cards need high-quality media, modal dialogs should always close on outside click, carts should always remain visible and use familiar icons, and design tools can be learned through vendor summaries.

Those are not universal behavior contracts. A modal may protect unfinished or destructive work from accidental outside dismissal. A cart icon without a name, state, quantity, correction path, and total evidence is not usable. Breadcrumb need and location depend on hierarchy and tasks. Dark themes still require measured contrast, states, preferences, and user testing. Adobe XD is no longer a current general-purpose product recommendation, already identified in the dedicated design inspection.

The target review presents conflicting stakeholder and user evidence. Learners select a pattern only when its prerequisites and task benefits hold, then identify keyboard, focus, state, error, persistence, return-context, and responsive evidence.

### Form and accessibility sections remain declaration-oriented

The review correctly warns against removing focus/error affordances and notes that placeholder text is not a reliable persistent instruction. It says accessibility trees expose content to assistive technology and distinguishes `display: none`, `visibility: hidden`, visually hidden CSS, `aria-hidden`, and `hidden` at a summary level.

It does not require a learner to inspect an accessible name, description, state, focus order, hidden focusable descendant, form submission, error recovery, forced colors, zoom, or keyboard task. The copied visually-hidden recipe is shown without checking clipping, focus reveal, writing mode, high contrast, or future maintenance. `aria-hidden` is described as hiding from screen readers without the broader accessibility API and focus-descendant boundary. Placeholder guidance identifies one visual confusion but does not establish persistent labels and descriptions.

The target review uses contradictory-state cases. Learners separately predict rendering, layout, focus, accessibility-tree exposure, names/descriptions, operation, and submission, then repair the cause and verify the user task.

### Typography repeats unsupported genre and readability stereotypes

The review says sans-serif typefaces are common in digital work because they are easy to read on screen and serif faces are common for print. It recommends two or three fonts for consistency. It lists font anatomy, families, web-safe fonts, `@font-face`, formats, external providers, and text shadows, but does not inspect rendered face, fallback metrics, language coverage, synthesis, loading, privacy, licensing, or layout shift.

The target review asks which face actually rendered for changed scripts, weights, styles, network states, and user settings. Learners diagnose missing glyphs, fallback shifts, synthesis, poor measure/spacing, and unreadable decoration instead of selecting a genre by stereotype.

### Flexbox and Grid review names properties without sizing or placement traces

The Flex section defines axes, direction, wrapping, main-axis distribution, and cross-axis alignment. It does not include flex base size, grow/shrink negotiation, automatic minimums, freeze cycles, gaps, visual/source order, changed content, or component transfer. Calling Flexbox a system that arranges elements “in rows and columns” can blur its one-dimensional model.

The Grid section lists tracks, `fr`, gaps, repeat, explicit/implicit grids, `minmax()`, auto-placement, line placement, areas, and alignment. It does not require track-size calculations, placement traces, percentage-gap accounting, negative-line boundaries, source order, overflow, subgrid, intrinsic responsive grids, or changed cases.

The target review gives one unfamiliar layout and asks the learner to choose normal flow, Flexbox, or Grid, draw the relevant model, predict sizes/positions, preserve source order, and verify long/missing/added content.

### Positioning summaries preserve false global-coordinate models

The review says relative positioning uses physical top/left/right/bottom within normal flow, absolute positioning behaves independently, fixed positioning is relative to the viewport, sticky is a hybrid that becomes fixed, and z-index controls the vertical stacking order of positioned elements.

These summaries omit containing-block formation, transforms and containment, original flow space, static position, automatic insets and sizing, sticky scroll containers and constraint rectangles, fixed-position exceptions, local stacking contexts, paint order, negative stack levels, logical directions, and focus/content obstruction. Sticky does not change its computed position value to fixed, and z-index is not one global vertical number line.

The target review uses containing-block and paint-order traces plus scroll/overflow changes. Learners diagnose which ancestor, formatting context, scrollport, and stacking context controls the result.

### Responsive design is reduced to device bands

The review defines responsiveness as adapting to screen size and device capabilities, calls responsive images images that scale to screen size, describes media queries primarily through device characteristics, publishes phone/tablet/desktop bands at 640 and 1024 pixels, and defines narrow-first work as prioritizing mobile devices.

This omits content constraints, intrinsic layout, responsive source selection, container conditions, explicit range ownership, fractional boundaries, zoom/reflow, input/preferences, print, writing modes, browser variation, and task invariants. Device labels do not explain why content fails at a boundary. Scaling one image does not select an appropriate resource or art direction.

The target review supplies changed content and containers. Learners identify the failing invariant, build a fluid baseline, select viewport or container conditions for a reason, predict boundary truth values, and execute the responsive evidence matrix.

### Custom-property and motion review is syntax-only

The custom-property section defines reuse, theming, `@property` syntax, and `var()` fallback. It does not distinguish token streams, specified/computed invalidity, inheritance, registered initial values, typed interpolation, registration support, cascade ownership, or semantic tokens.

The animation section lists keyframes and animation longhands and describes reduced-motion preference. It does not cover underlying style, before/active/after phases, interruption, cancellation, multiple animations, controls, reduced-mode equivalence, flash safety, runtime traces, or state preservation.

The target review asks learners to predict computed custom-property and animation states, diagnose invalid substitution and interrupted motion, and prove equivalent task behavior across preference modes.

## Review pedagogy findings

### Exposed reference is not retrieval

The page's only assignment is “Review the CSS topics and concepts.” Every explanation is visible. There is no attempt boundary, answer reveal, confidence judgment, misconception choice, code execution, feedback, correction, or later revisit. A learner can scroll to the end without retrieving or applying anything.

The target review uses a retrieve-first structure:

1. Predict or construct before reference is visible.
2. Commit a response and confidence level.
3. Observe behavior or inspect evidence.
4. Receive feedback tied to the causal misconception.
5. Correct the artifact or explanation.
6. Solve a changed case without the original cue.
7. Revisit the concept after delay and inside an interleaved set.

Reference sheets remain available after attempts and for accessibility, but reading them is not counted as mastery.

### One giant review destroys prerequisite and correction routing

The 59 headings follow the historical course order but do not identify prerequisites or separate recognition from implementation. A learner who fails a Grid sizing case cannot see whether the cause is percentages, intrinsic sizing, `minmax()`, overflow, or placement. A learner who remembers a property name but cannot operate a form appears indistinguishable from one with full task competence because no evidence is collected.

The target review is divided into interleaved evidence sets:

- language, selectors, cascade, and computed values;
- box, intrinsic sizing, overflow, and transforms;
- typography, color, assets, and rendering;
- semantics, controls, accessibility, and state;
- Flexbox, Grid, positioning, and source order;
- responsive systems, preferences, input, and output;
- motion, performance, debugging, and changed cases;
- independent integration and design defense.

Each failure maps to the smallest prerequisite repair activity, then returns the learner to a different case. The platform records demonstrated evidence, not completion of the review page.

## Exam container evidence boundary

The exam source contains front matter, the sentence “Start your exam in the exam environment app,” and empty instructions, hints, seed, and solutions sections. Its exact 296 bytes prove only that an external exam launch point exists in the benchmark navigation.

It does not reveal:

- the number or type of items;
- objective or concept coverage;
- item prompts, options, distractors, keys, projects, or coding tasks;
- cognitive level or authentic task demands;
- time limits, attempts, retakes, feedback, or remediation;
- score model, weighting, cut score, standard-setting process, or uncertainty;
- answer security, versioning, exposure limits, or canonical grading location;
- accessibility, accommodations, language, input, or supported-device behavior;
- false-positive/false-negative rates, reliability, precision, difficulty, discrimination, fairness, or differential performance;
- subject, assessment, accessibility, security, or pilot approval.

No concept can validly be assigned from this container. The alignment therefore retains `assessment-container`, zero concepts, and a blocking `assessment-items-unavailable` finding. This is not an implementation failure to hide; it is an explicit limit on benchmark evidence.

## Original certification assessment design

### 1. Claim model

Every terminal course claim names the independent task a learner can perform, the conditions and constraints, acceptable variation, prerequisite competencies, and consequences of a wrong decision. Claims cover complete HTML/CSS artifacts, accessibility, responsive behavior, debugging, testing, performance, content/design reasoning, and transfer.

### 2. Evidence model

For each claim, the blueprint specifies observable evidence capable of supporting it: parsed structure, browser behavior, changed-case output, keyboard/focus operation, accessibility information, responsive geometry, request or media behavior, causal diagnosis, test results, performance traces, design rationale, or stakeholder evidence. Keyword presence and visual similarity are explicitly insufficient.

### 3. Task model

Assessment tasks vary scenario, starter, data, content, defect, constraints, and evidence. The exam samples:

- implementation from a bounded stakeholder brief;
- prediction before execution;
- diagnosis and repair of an unfamiliar defect;
- changed-content and changed-environment regression;
- accessibility and responsive task operation;
- explanation and defense of consequential decisions;
- delayed transfer that differs from practiced projects.

No exam task copies a workshop, lab, solution, or public answer. Canonical scoring logic remains server-side. Learner submissions are evidence, never the answer authority.

### 4. Blueprint and coverage

The blueprint maps every task and scoring rule to claims, concepts, misconceptions, evidence types, cognitive demand, prerequisite dependencies, accessibility requirements, and security sensitivity. It records intended sampling and omissions. A course cannot be certified by a random subset of easy syntax questions.

### 5. Scoring and standard setting

Rubrics distinguish essential invariants from optional design variation. Partial credit requires interpretable evidence, not token counts. A documented standard-setting process determines what evidence is minimally sufficient for the certificate claim. Borderline cases, scorer agreement, automated false positives/negatives, and uncertainty are reviewed before consequences are attached.

### 6. Fairness and accessibility

Every task is checked for construct-irrelevant language, cultural knowledge, motor or visual barriers, unnecessary time pressure, color-only information, keyboard traps, inaccessible editors/previews, and accommodation conflicts. Accessibility changes preserve the assessed construct. Supported tablet and desktop paths run the actual exam and grading flow.

### 7. Security and versioning

Items, rubrics, solutions, and canonical answers remain protected server-side. Versions record source authority, review date, change reason, exposure risk, and score comparability. Retakes use equivalent but different evidence tasks. No public client bundle exposes grading truth.

### 8. Pilot and operational evidence

Representative beginners and accessibility participants complete the full flow. Analysis records completion behavior, misconception patterns, hint/feedback effects where allowed, task difficulty, discrimination, scoring consistency, false positives/negatives, time, abandonment, accessibility defects, and adverse impact. Failed evidence triggers task repair and a new pilot; it does not get relabeled complete.

## Original cumulative review sequence

The final review is not one activity. It is a scheduled sequence:

1. Entry self-assessment with confidence, not mastery credit.
2. Interleaved prediction set across distant concepts.
3. Short build that retrieves HTML, cascade, box, and layout fundamentals.
4. Debugging clinic with cascade, overflow, source-order, and accessibility defects.
5. Responsive changed-case lab across content, container, zoom, input, preference, and print.
6. Motion and performance evidence clinic.
7. Project evidence audit: learner finds missing claims and repairs them.
8. Delayed second set with new scenarios and no prior code.
9. Readiness report showing demonstrated, fragile, due-for-retrieval, and unverified competencies.
10. Exam eligibility only after required evidence and correction paths pass.

Review feedback routes to targeted practice. The platform never invents a readiness percentage from activity counts.

## Candidate alignment boundary

The CSS review receives 79 bounded concept contacts. It includes named material from HTML viewport/language/form/accessibility boundaries and CSS language, cascade, boxes, color, typography, design, forms, Flexbox, Grid, positioning, responsive systems, preferences, animation, and output. It intentionally excludes concepts that the source does not establish:

- CSS source/computed/save loop;
- cascade layers and scope;
- logical properties and writing modes;
- font metrics/fallback stability and variable features;
- derived color functions;
- Flex base/grow/shrink, gaps, source-order evidence, and transfer;
- subgrid and anchor positioning;
- responsive image source selection, range ownership, container queries, intrinsic auto-fit grids, navigation disclosure, test matrices, zoom/text-spacing evidence, target sizing, and independent responsive transfer;
- transition interruption, DevTools diagnosis, measured rendering performance, and changed-case regression.

The assessment container remains at zero concept assignments. The complete target concept graph still contains seven unresolved concepts because the pinned benchmark never supplies sufficient evidence for details/summary, HTML changed cases, HTML independent transfer, responsive navigation disclosure, responsive test matrices, CSS changed cases, or CSS independent transfer. These remain target obligations, not benchmark credits.

## Candidate status after this inspection

- all 158 source blocks have challenge-level agent inspection;
- all 1,553 source challenge identities remain exact;
- all 1,365 captured question prompts and all 5,163 captured implementation checks have been inspected inside their source blocks;
- 157 source blocks have block-specific candidate concept maps;
- zero source blocks remain in `unmapped-source` state;
- the certification block remains one inspected `assessment-container` with zero concepts and an item-level blocker;
- the architecture maps 157 source objectives and retains the exam container as its one explicit non-specific identity;
- all 186 target concepts remain `researched-not-authored`;
- seven concepts remain unresolved and seven current concepts remain explicit uncredited modern extensions.

Challenge-level source inspection is complete. Research is not complete. Independent subject review of all mappings, instructional-design review, assessment validation, originality review, accessibility and security review, full activity-matrix design, authoring, runtime verification, duplication analysis, learner pilots, retention/transfer evidence, and publication gates remain open. The dossier stays `researching`; the architecture stays `planned-not-authored`; the runtime index stays empty; Lighthouse stays held.
