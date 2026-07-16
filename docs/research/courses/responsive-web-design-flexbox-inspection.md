# Responsive Web Design Flexbox source inspection

Reviewed: 2026-07-15

Status: complete direct inspection; candidate curriculum evidence only

## Decision

The pinned source establishes substantial practice volume, but it is not a safe instructional design to reproduce. LEARN-IT-ALL will preserve the breadth and exceed the practice depth with original activities. It will not copy the source sequence, wording, projects, declaration recipes, solutions, or check shapes.

The replacement Flexbox sequence must teach a causal layout model. A learner must be able to predict which boxes become flex items, how writing mode and direction establish axes, when lines form, how base sizes and constraints affect growth and shrinkage, which alignment subject moves inside which container, and why visual reordering can contradict reading and focus order. Passing evidence must include changed content and runnable behavior. A declaration string or a matching screenshot is insufficient.

## Inspected source boundary

The inspection covers seven pinned source blocks at freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`:

| Source block | Type | Challenges | Question prompts | Implementation checks | Source bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| `lecture-working-with-css-flexbox` | lecture | 2 | 6 | 0 | 21,950 |
| `workshop-flexbox-photo-gallery` | workshop | 22 | 0 | 68 | 54,821 |
| `workshop-colorful-boxes` | workshop | 43 | 0 | 81 | 85,377 |
| `lab-pricing-plans-layout` | lab | 1 | 0 | 27 | 11,580 |
| `review-css-flexbox` | review | 1 | 0 | 0 | 4,632 |
| `quiz-css-flexbox` | quiz | 1 | 40 | 0 | 14,556 |
| `lab-page-of-playing-cards` | transfer lab | 1 | 0 | 18 | 8,780 |
| **Total** |  | **71** | **46** | **194** | **201,696** |

All 71 challenge files were read from the pinned checkout. The recorded paths, order, SHA-256 hashes, byte counts, section names, prompt counts, and check counts remain in `references/freecodecamp-rwd-v9.json`. The checkout HEAD matched the pinned commit at inspection time.

This inspection answers source-scope questions. It does not approve the benchmark, the candidate concept graph, any LEARN-IT-ALL activity, or any credential claim.

## Current primary evidence

The technical baseline is:

- CSS Flexible Box Layout Module Level 1, W3C Candidate Recommendation Draft dated 14 October 2025;
- CSS Box Alignment Module Level 3, W3C Working Draft dated 30 January 2026;
- CSS Box Sizing Module Level 3 for intrinsic and extrinsic size constraints;
- WCAG 2.2 Meaningful Sequence and Focus Order guidance plus technique C27;
- the pinned source files only as direct evidence of benchmark breadth, step volume, checks, and defects.

The Flexbox specification defines flex containers and items, flow-relative axes, line wrapping, automatic minimum sizes, base sizes, growth, scaled shrinkage, constraint freezing, visual-only reordering, alignment, and the layout algorithm. Box Alignment distinguishes the alignment subject from its container, separates positional, baseline, and distributed alignment, defines fallbacks and overflow safety, and treats gaps as gutters between adjacent boxes. WCAG evidence requires meaningful programmatic sequence and logical focus order. These models replace screen-direction recipes.

Both CSS specifications are still drafts. They are the current primary technical evidence, not proof of instructional validity or browser behavior in every environment. Feature maturity, interoperability, learner comprehension, and accessibility require separate evidence.

## Source-family findings

### The family has volume but not cumulative mastery

The source offers two theory challenges, 65 guided workshop steps, two nominally independent labs, a reference review, and two 20-item quiz pools. That is useful evidence that Flexbox deserves much more than one short lesson. It is not evidence that the sequence produces independent skill.

The two workshops are dominated by literal mutations: add an element, add a class, set one named property to one named value, then replace that value with the next named value. Learners seldom predict a result, inspect computed or used geometry, explain a failure, compare two valid designs, or make a choice from stakeholder constraints. The labs continue to prescribe exact class names and exact declarations. The review presents a reference sheet. Most quiz items ask learners to recall property names or screen-direction descriptions.

The result is high action count with low decision density. Repetition is concentrated on syntax entry, not causal retrieval or transfer.

### The family skips the sizing model that makes Flexbox difficult

The source touches `flex-grow`, `flex-shrink`, `flex-basis`, and the `flex` shorthand, but does not build the model needed to predict results. Missing or materially incomplete ideas include:

- hypothetical and flex base sizes;
- positive versus negative free space;
- the difference between a grow factor and a percentage of final width;
- scaled shrink factors, which combine shrink factor with base size;
- freezing when an item hits a minimum or maximum;
- automatic minimum sizes and min-content constraints;
- why a long unbreakable token or replaced element can prevent expected shrinkage;
- why `min-inline-size: 0` can be a causal repair in one case and a destructive reflex in another;
- how `width`, `flex-basis`, intrinsic contribution, percentages, and definite or indefinite container sizes interact;
- the expansion differences among common shorthand forms;
- how wrapping changes which items share free space.

The Colorful Boxes workshop says an item with `flex-shrink: 3` will shrink three times as much as the others. That is not a generally valid result. Negative free space is distributed using scaled shrink factors and then constrained; unequal bases and minimums change the result. The replacement must make learners calculate or qualitatively predict changed cases and verify used sizes in the layout inspector.

### Physical screen directions are taught as if they were axes

The source sometimes acknowledges text direction, but the main explanations and quiz items repeatedly reduce `row` to left-to-right, `row-reverse` to right-to-left, and `column` to top-to-bottom. One quiz item describes `column` as alignment along the cross axis even though a column makes the main axis vertical in a typical horizontal writing mode.

Flex directions are flow-relative. Their physical mapping depends on writing mode and direction. The replacement must use `main-start`, `main-end`, `cross-start`, and `cross-end` first, then ask learners to map those terms in horizontal LTR, horizontal RTL, and a vertical writing mode. “Horizontal center” and “vertical center” can only be conclusions for a stated case, not definitions of `justify-content` and `align-items`.

### Visual reordering is taught without its second order

The source uses `row-reverse`, `column-reverse`, `wrap-reverse`, and `order` as visual tools without consistently distinguishing:

- DOM and source order;
- visual order;
- speech and reading order;
- sequential keyboard focus order;
- copy order;
- order with author styles disabled.

The pricing lab is the sharpest defect. The supplied structure puts the Pro plan before the Basic plan, then the requirements force Basic, Pro, and Premium into the intended visual order with `order`. Interactive plan links therefore remain in source and keyboard order even when cards appear in a different visual order. The lab mandates the dangerous mechanism instead of asking for correct HTML order.

The Flexbox specification says reverse directions and `order` affect visual layout rather than logical source, speech, or sequential navigation, and it forbids using them as substitutes for correct source order. LEARN-IT-ALL will require source order to express the meaningful task sequence. Visual-only reordering is allowed only after the learner proves that the difference is semantically irrelevant and does not disorient reading or focus.

### Alignment is taught as keyword-to-position lookup

The source covers `justify-content`, `align-items`, `align-self`, and `align-content`, but largely asks learners to swap values and observe a screenshot. It does not consistently require the preconditions that explain whether the property has an effect:

- Which element owns the property?
- What is the alignment subject?
- What is the alignment container?
- Which axis applies?
- Is there distributable free space?
- Is the container single-line or multi-line?
- Does a definite cross size create space in which lines can be packed?
- Is a size auto so stretch can operate?
- Does an auto margin absorb free space before alignment?
- Is baseline alignment the actual design requirement?
- What safe or fallback alignment applies when the preferred result overflows?

The Colorful Boxes workshop describes `align-content` as arranging items on the cross axis. More precisely, it distributes flex lines within a flex container when the relevant space and line conditions exist. It does not replace `align-items` for individual items in a single line. The workshop happens to create a tall wrapping container, but never makes the dependency the learning evidence.

### Responsive claims are not tested responsively

The lectures repeatedly associate Flexbox with responsive design. The checks do not verify the claim. They generally inspect authored CSS declarations and required nodes. They do not change container width, text length, item count, locale, zoom, image state, or input method.

The Colorful Boxes workshop uses a fixed `600px` height to create cross-axis space. The photo gallery uses fixed image dimensions and a fixed-width pseudo-element to influence the final line. The pricing lab fixes card bases at `200px`. These can demonstrate isolated mechanics, but they are not evidence of resilient responsive behavior.

The target must exercise container-driven narrow and wide cases, not just named device widths. It must include long labels, translated strings, text zoom, missing and differently proportioned images, one and many items, and intermediate widths where a memorized breakpoint is not helpful.

## Block-by-block inspection

### `lecture-working-with-css-flexbox`

Observed contact:

- normal flow compared with a flex formatting context;
- flex container and direct flex items;
- main and cross axes;
- `flex-direction`, `flex-wrap`, and `flex-flow`;
- main-axis distribution and cross-axis item alignment;
- `align-self` overrides;
- reverse direction values.

Important omissions and defects:

- the explanation makes the common horizontal writing mode feel like the model rather than one mapping;
- reverse values are shown without source, speech, and focus-order warnings;
- `nowrap` is discussed without automatic minimum sizes and intrinsic overflow;
- no flex base, grow, scaled-shrink, constraint, or used-size model appears;
- `align-content`, baseline alignment, auto margins, gaps, safe alignment, and fallback alignment are absent;
- interactive editors invite observation but do not ask for prediction, diagnosis, or saved evidence;
- six questions are recognition checks and do not establish behavior.

Bounded candidate concepts:

- normal flow;
- flex containers, items, and axes;
- direction, wrapping, and lines;
- alignment and distribution;
- visual order and accessibility as a required correction boundary.

The lecture does not support credit for flex sizing, gap ownership, or independent component transfer.

### `workshop-flexbox-photo-gallery`

Observed contact:

- stylesheet loading, headings, a gallery container, images, sources, and text alternatives;
- box-sizing comparison;
- flex container formation, row direction, wrapping, main- and cross-axis alignment;
- container padding, maximum width, auto margins, image sizing, `object-fit`, gap, and rounded corners;
- a generated pseudo-element used to alter final-line placement.

Strength worth preserving at the scope level:

- the learner produces a visible artifact over 22 steps;
- earlier image and alternative-text knowledge reappears;
- the workshop touches changed aspect ratios and distinguishes `object-fit: cover` from distortion;
- box sizing is retrieved before layout.

Instructional defects:

- most steps state the exact selector, property, and value;
- the artifact never moves from imitation to faded construction;
- the fixed-width empty pseudo-element is a brittle last-line alignment patch tied to item width, gap, count, and container geometry;
- learners are not asked to explain why the pseudo-element becomes a flex item or what happens when the image count changes;
- fixed image height plus cover cropping is accepted without focal-content or text-alternative implications;
- no long-alt, missing-image, different-ratio, one-item, reordered-item, narrow-container, zoom, RTL, or print case is graded;
- checks mostly confirm source shape and declarations rather than the gallery’s task behavior.

The replacement should not recreate a cat gallery or the ghost-item trick. A guided media strip can teach direct flex items, intrinsic dimensions, wrapping, gaps, and cropping; a later debugging clinic should expose a brittle generated-item layout and require the learner to remove it through a requirement-level repair.

### `workshop-colorful-boxes`

Observed contact:

- nested flex containers;
- wrapping and a definite cross size;
- repeated `align-content` values;
- `flex` shorthand components;
- item-specific grow, shrink, and order declarations;
- elementary styling and color labels.

This is the largest block at 43 steps, but it is also the clearest example of repetitive practice. Multiple consecutive steps mutate one `align-content` value. Multiple steps add one extra class or one item-specific selector. The result rehearses property entry while leaving the layout algorithm unexplained.

Specific defects:

- `align-content` is phrased as arranging items instead of packing lines;
- the reason the property has visible space to distribute is not made explicit evidence;
- the shrink-factor explanation ignores base sizes and constraints;
- order values are applied as a styling exercise without examining logical sequence;
- fixed dimensions create a demonstration chamber rather than a content-driven component;
- the learner never predicts numeric or relative outcomes;
- no layout-inspector evidence is required;
- no fading occurs across 43 steps;
- each item is a near-identical box, so the changed content needed to expose flex behavior is missing.

The replacement will use unequal content and constraints deliberately. Learners will first predict a small free-space calculation, then use the layout inspector to compare base size, minimum, grow, shrink, and final used size. A later clinic will add a long unbreakable identifier and a replaced element so the learner must diagnose the controlling minimum instead of hiding overflow.

### `lab-pricing-plans-layout`

Observed contact:

- a wrapping outer flex container;
- column flex cards;
- space distribution within each card;
- a three-value flex shorthand;
- one item with a later grow override;
- explicit visual ordering.

The lab is nominally independent, but it prescribes exact element types, classes, text, prices, declarations, and order values. Twenty-seven checks reward conformance to that recipe. The checks do not establish that the layout works at a narrow container, keeps complete plan content, presents a meaningful comparison, maintains logical focus, or survives changed plan count and label length.

The forced order requirement is actively unsuitable as a default model. A production comparison should place plans in meaningful source order and use CSS for layout, not for repairing authored order. If product strategy requires a visually emphasized plan, emphasis must not create a conflicting reading or focus sequence.

The replacement pricing context is also too close to a common tutorial pattern to count as the only transfer evidence. LEARN-IT-ALL will use different stakeholder domains and reserve plan-like comparison work for a changed-case assessment where source order, focus order, responsive behavior, and decision communication are explicit requirements.

### `review-css-flexbox`

The review summarizes direction, wrapping, `justify-content`, and `align-items` with editable examples. It does not retrieve flex sizing, automatic minimums, order accessibility, `align-content`, gaps as spacing ownership, baselines, auto margins, or component selection. Its assignment merely tells the learner to review.

A target review must require active retrieval: label an unfamiliar layout, predict which declaration can have an effect, calculate or explain one size outcome, diagnose one overflow, compare source and focus order, and repair a component. Reference material remains available after the first attempt, but opening a reference page is not completion evidence.

### `quiz-css-flexbox`

The file contains two pools of 20 questions, recorded as 40 question prompts. Coverage is concentrated on definitions, property names, direction values, wrapping, `justify-content`, and `align-items`.

Technical or validity problems include:

- several items equate `row` and `row-reverse` with fixed left/right screen directions;
- one item says `column` aligns items along the cross axis;
- several `nowrap` answers say items overflow without acknowledging default shrinkage and automatic minimum constraints;
- the centering items assume a specific writing mode and direction without stating them;
- the unsuitable-use question frames fixed sizing and spacing as a grid-only need even though Flexbox can support fixed bases and gaps;
- distractors are often invalid property names, so recognition can succeed without understanding;
- no item assesses grow or scaled-shrink reasoning, basis, minimums, line-specific free space, `align-content` preconditions, auto margins, baseline alignment, gap ownership, DOM versus visual versus focus order, or changed component behavior;
- the two pools repeat the same cognitive level and much of the same topic distribution.

The replacement assessment will use diagram prediction, computed-style and geometry evidence, short causal explanations, source-order inspection, and small runnable repairs. Distractors must encode diagnosed misconceptions rather than typographical nonsense.

### `lab-page-of-playing-cards`

Observed contact:

- a flex and wrapping outer container;
- fixed gap ownership;
- nested flex cards;
- `justify-content`, `align-self`, and column direction;
- repeated component construction.

The lab differs visually from the pricing context, but still dictates an exact nested `div` structure and exact declarations. Eighteen checks verify structure, positive dimensions, and authored property values. They do not test card legibility, symbol exposure, source order, zoom, narrow wrapping, long content, writing mode, or behavior with a different card count. The solution contains extra visual transforms not required by the checks, so the checked task and displayed exemplar diverge.

LEARN-IT-ALL can preserve the idea of a compact nested component only by changing the domain, requirements, starter, evidence, and reasoning. A transfer lab must ask the learner to choose a layout model from behavior constraints and defend it; it cannot name every class and declaration in advance.

## Duplication analysis

The family repeats the following low-level actions without meaningfully increasing reasoning:

- enabling `display: flex` on named containers;
- setting row or column direction from an explicit instruction;
- adding `wrap` because the instruction says wrapping is required;
- centering with named alignment values;
- adding one class and one item-specific selector at a time;
- copying exact declaration triples;
- validating authored syntax rather than used layout behavior.

The source workshops and labs differ in surface appearance, but their checking grammar is similar. The learner often knows the required property before encountering the problem. This removes selection, diagnosis, and transfer.

Target activity diversity must be structural, not cosmetic:

| Activity | Learner job | Starting state | Evidence | Failure route |
| --- | --- | --- | --- | --- |
| Axis prediction | label boxes and flow-relative axes | rendered component plus source | prediction before preview and corrected explanation | contrast horizontal LTR, horizontal RTL, and vertical writing mode |
| Guided workshop | build a resilient action bar | semantic HTML plus unstyled CSS | live behavior at changing container widths | hint narrows container/item ownership, not a property answer |
| Sizing calculation | predict three final sizes | numeric bases, factors, and constraints | written model plus inspected used sizes | replay with one changed base and one minimum |
| Debugging clinic | repair long-label overflow | failing real component | root-cause diagnosis, minimal patch, regression cases | distinguish base, automatic minimum, wrapping, and clipping |
| Accessibility clinic | repair contradictory visual and focus order | keyboard-operable but confusing component | DOM, visual, speech, focus, and styles-off evidence | force source-structure repair when sequence is meaningful |
| Faded workshop | build a media object and toolbar | partial semantic structure | requirements and changed cases, fewer instructions | progressive hints expose constraints in stages |
| Independent lab | design a multilingual command group | empty stylesheet | behavior tests and design defense | correction task changes labels, count, direction, and zoom |
| Retrieval quiz | predict and diagnose unfamiliar cases | diagrams and short runnable fragments | misconception-coded answers and explanation | prescribed corrective micro-practice |
| Transfer project | integrate flex with grid and normal flow | stakeholder brief and content | responsive, accessible, changed-case artifact and defense | reviewer returns evidence-linked findings |

No two activities may share the same scenario, starter structure, required selector set, expected declaration set, test fixture, failure, or solution shape merely under different nouns and colors.

## Target prerequisite and accumulation order

Flexbox belongs after normal flow, display roles, the box model, intrinsic and extrinsic sizing, percentages, overflow, and source-order accessibility foundations. It must not be introduced as a shortcut around those models.

Required sequence:

1. Retrieve normal flow and identify the specific distribution or alignment problem.
2. Create `flex` and `inline-flex` containers and identify direct, anonymous, nested, and excluded items.
3. Label main and cross axes in multiple writing modes before using physical directions.
4. Predict `row`, `column`, reverse values, single-line behavior, wrapping, and line stacking.
5. Compare source, visual, speech, copy, and focus order; repair meaningful contradictions in source.
6. Establish flex base sizes and the role of `flex-basis`, main-size properties, intrinsic contributions, and definiteness.
7. Distribute positive free space with grow factors and constraints.
8. Distribute negative free space with scaled shrink factors, automatic minimums, and freezing.
9. Align content and items by subject, container, axis, line count, free space, baseline, auto margin, safety, and fallback.
10. Assign gap, padding, and margins according to spacing ownership.
11. Build one guided one-dimensional component and inspect its layout evidence.
12. Debug overflow, wrapping, alignment, and order in unfamiliar existing components.
13. Complete faded practice with changed labels, counts, media, direction, zoom, and container widths.
14. Complete an independent component lab without prescribed selectors or declarations.
15. Retrieve Flexbox later inside grid, responsive navigation, forms, and the independent responsive project.

Every new stage must continue enforcing semantic HTML, meaningful source order, visible focus, contrast, zoom and reflow, content preservation, and causal debugging learned earlier.

## Required behavior and grading contracts

### Container and item evidence

Learners must identify the actual generated flex container and its items. Checks must include direct children, nested elements, anonymous text, an absolutely positioned child, and a pseudo-element case. A property placed on the wrong owner must produce feedback that names the ownership question without revealing the final declaration.

### Axis and line evidence

Before execution, the learner records main-start, main-end, cross-start, and cross-end. The same fragment then runs under changed `direction` and `writing-mode` values. The grade compares prediction, actual line formation, and the learner’s correction. Physical left, right, top, and bottom terminology is accepted only when the environment is stated.

### Sizing evidence

At least one guided case and one assessment case must expose:

- container inner main size;
- item outer flex base sizes;
- positive or negative free space;
- grow or scaled shrink factors;
- frozen constraints;
- automatic minimum behavior;
- final used sizes.

The runtime must measure behavior and changed-case output, not merely search CSS source for `flex`. Equivalent valid implementations are permitted when they satisfy the invariant.

### Alignment evidence

Checks must distinguish item alignment from line packing. A single-line case should expose why changing `align-content` has no intended item-centering effect. A multi-line case must create known cross-axis free space. Baseline and auto-margin cases must be included. Safe alignment and overflow must be inspected where supported; otherwise the activity must state and test the fallback boundary.

### Order evidence

Any activity using `order` or a reverse direction must capture:

- DOM sequence;
- visual sequence;
- sequential focus sequence for interactive descendants;
- accessible reading or speech evidence where feasible;
- styles-disabled sequence;
- a justification that the difference does not alter meaning or task order.

If the sequences conflict meaningfully, the only passing repair is to fix the source structure. Positive `tabindex` values and JavaScript focus choreography are not accepted as patches for a bad DOM sequence.

### Changed-case evidence

Every build-capable flex activity must select relevant cases from this matrix:

- one, two, many, inserted, removed, and hidden items;
- short, long, unbreakable, and translated labels;
- horizontal LTR, horizontal RTL, and at least one vertical writing mode during instruction;
- narrow, intermediate, and wide container sizes based on content failure rather than device names;
- 200% text size and 400% zoom/reflow where applicable;
- keyboard-only focus, visible focus, and sequential task order;
- missing, slow, unusually proportioned, and dimension-constrained media;
- default, increased contrast, and forced colors for interactive components;
- screen and print or styles-disabled output where sequence matters.

The learner must see which case failed, the expected invariant, the observed behavior, and a progressive hint path. A generic “incorrect” result does not meet the platform feedback contract.

## Target original activity architecture

The final Flexbox unit must contain all of these roles, with original domains chosen during activity-matrix review:

1. **Theory and prediction:** generated box tree, direct items, axes, lines, and source versus visual order.
2. **Worked example:** a small action group solved from stated content and task constraints, with the sizing and alignment reasoning visible.
3. **Guided workshop:** cumulative construction with prediction checkpoints before property entry.
4. **Sizing simulator:** learner manipulates bases, grow, shrink, and constraints; numerical and visual evidence stay synchronized.
5. **Debugging clinic:** long content and automatic minimums cause overflow; learner diagnoses and proves the repair.
6. **Accessibility clinic:** a visually reordered interactive component has contradictory focus; learner repairs source order.
7. **Faded workshop:** fewer instructions, new component, changed writing direction, and required regression evidence.
8. **Independent lab:** empty stylesheet, stakeholder behavior criteria, multiple valid solutions, no named declaration recipe.
9. **Retrieval review:** prediction, explanation, diagnosis, implementation, and comparison across unfamiliar contexts.
10. **Quiz:** misconception-coded items plus small runnable cases; no invalid-property-name trivia as the main discriminator.
11. **Delayed retrieval:** flex behavior reappears in forms, responsive navigation, grid integration, and a later debugging task.
12. **Project evidence:** integrated responsive artifact with a written or structured design defense and reviewer-visible changed-case results.

The activity matrix must document introduce, model, guided, faded, debug, retrieve, assess, delayed-retain, and transfer encounters for each flex concept. A large step count does not satisfy the matrix unless the reasoning and evidence actually progress.

## Bounded candidate alignment

The direct inspection narrows the source blocks to concepts they actually contact:

- lecture: normal flow; containers/items/axes; direction/wrap/lines; alignment/distribution; order-accessibility correction;
- photo gallery: image purpose and replaced-content boundaries; stylesheet and selector basics; pseudo-elements; box and intrinsic sizing; flex container, direction, wrapping, alignment, and gap;
- colorful boxes: stylesheet and selector basics; box and intrinsic sizing; type and color styling; flex container, direction, wrapping, sizing, alignment, and order-accessibility correction;
- pricing lab: headings and CSS basics; boxes; flex container, direction, wrapping, sizing, alignment, order-accessibility correction, and bounded component contact;
- review: container/axes, direction/wrap/lines, alignment/distribution, and incidental gap contact;
- quiz: container/axes, direction/wrap/lines, alignment/distribution, and limited component-selection contact;
- playing cards lab: landmarks, selectors, boxes, flex container, direction, wrapping, alignment, gaps, and bounded component contact.

Contact is not mastery. The source does not earn credit for changed-case regression, independent design defense, transform behavior that appears only in an unchecked solution, or concepts absent from required learner evidence.

## Publication blockers exposed by this inspection

Flexbox remains `researched-not-authored`. Before any Flexbox learner content becomes available:

- a subject reviewer must verify every candidate concept, prerequisite, source locator, sizing statement, alignment boundary, and interoperability caveat;
- an accessibility reviewer must approve source, speech, visual, copy, and focus-order tasks and the supported assistive-technology evidence path;
- an instructional designer must approve the activity matrix, fading, retrieval, correction, delayed retention, and transfer design;
- an assessment reviewer must blueprint every quiz, lab, debugging task, and project criterion and pilot false-positive and false-negative behavior;
- a duplication audit must compare scenarios, starters, requirements, checks, hints, and solutions against every earlier and later course activity;
- the inline editor and preview must expose computed and used layout evidence accessibly without executing learner source on the host;
- representative learners must complete the axis, sizing, overflow, order, faded, and independent tasks; critical findings require repair and re-test;
- tablet and desktop learner flows plus the phone handoff must pass the supported accessibility and responsive verification matrix;
- all repository research, schema, compilation, content, type, lint, build, and browser gates must pass.

This wave brings direct Responsive Web Design inspection to 112 of 158 source blocks: 852 challenges, 1,003 captured question prompts, and 2,614 inspected implementation checks. One hundred twenty-one blocks now have bounded block-specific candidate maps. Thirty-six uninspected blocks remain explicitly unmapped, the unavailable certification assessment remains an evidence container, and 46 total source blocks still require challenge-level inspection. No learner-facing Responsive Web Design module is authored, approved, available, certified, or published.
