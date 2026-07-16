# Responsive Web Design v9 Absolute and Relative Units inspection

Status: `source-inspected-candidate-review`  
Reviewed: 2026-07-15  
Pinned source: freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`  
Target: original LEARN-IT-ALL instruction; source material is coverage evidence only

## Decision

The four source blocks are fully inspected. They establish a useful minimum inventory—absolute lengths, percentages, font-relative lengths, viewport-relative lengths, calculated values, one lab, one review, and one quiz—but they are not a production curriculum design.

LEARN-IT-ALL will teach these ideas as reference-frame and constraint decisions. A learner must identify what a value is relative to, predict changed cases, inspect computed behavior, diagnose failure, repair the constraint, and preserve content under zoom, enlarged text, narrow containers, dynamic browser UI, and changed content. Merely writing a requested unit or matching one computed value is not mastery evidence.

The exact candidate maps contain no module fallback or proportional assignment. Independent subject, instructional, assessment, accessibility, and learner reviews still block authoring and publication.

## Exact source inventory

| Source block | Type | Challenges | Learner prompts or checks | Exact scope |
| --- | --- | ---: | ---: | --- |
| `lecture-working-with-relative-and-absolute-units` | lecture | 5 | 15 questions | absolute lengths; percentages; `em` and `rem`; viewport lengths; `calc()` |
| `lab-event-flyer-page` | lab | 1 | 17 checks | headings and landmarks; body spacing; `vw`; `vh`; `calc()`; percentage widths |
| `review-css-relative-and-absolute-units` | review | 1 | 0 | unit definitions and one example for each family |
| `quiz-css-relative-and-absolute-units` | quiz | 1 | 20 questions | definitions and single-case arithmetic, plus one `auto` sizing item |

Totals: four blocks, eight challenges, 35 question prompts, and 17 lab checks. Source identities, paths, byte counts, and SHA-256 values remain in `references/freecodecamp-rwd-v9.json` and the generated candidate alignment.

## Authorities and current observations

### CSS Values and Units Level 4

Source: <https://drafts.csswg.org/css-values-4/>  
Reviewed: 2026-07-15

The current Editor's Draft controls the model used here:

- a percentage is always relative to another quantity, but the accepting property defines that quantity;
- CSS absolute lengths have fixed ratios to each other, while screen media commonly anchors them to the reference pixel rather than guaranteeing a physical measurement;
- `em` resolves from the element's font size except in font properties, where it resolves from parent metrics; `rem` resolves from the root element;
- default `v*` viewport units use the large viewport, `sv*` uses the stable small viewport, and `dv*` follows the dynamic viewport with possible resize and performance costs;
- `calc()` uses typed numeric arithmetic, requires whitespace around addition and subtraction, and is valid only if the resulting type is accepted by the property;
- unitless zero is valid as a length, but it cannot always participate in a mixed calculation where parsing and type algebra require a length term.

This is a work-in-progress draft. A cited grammar is not proof of browser interoperability or usable layout. Relevant behavior needs direct changed-case browser verification.

### WCAG 2.2 and Resize Text

Sources: <https://www.w3.org/TR/WCAG22/> and <https://www.w3.org/WAI/WCAG22/Understanding/resize-text>  
Reviewed: 2026-07-15

The target must preserve content and operation when text is resized, prevent clipping and obscuring, and avoid viewport-only font sizing that defeats text resizing. Relative units can support this outcome, but a unit name is not conformance evidence. Browser zoom, text-only enlargement where available, text-spacing overrides, reflow, long content, and form controls all need direct tests.

### Current browser observation

Observed 2026-07-15 with project-pinned `agent-browser` 0.32.0 and Headless Chrome 150 on Linux:

- mixed compatible addition was supported;
- `calc(5px * 2)`, `calc(2 * 5px)`, and `calc(50px / 5)` were supported;
- dividing a length by a length was not accepted for `width` because the result is a number, not a length;
- `calc(100% - 0)` was not accepted for `width`, while `calc(100% - 0px)` was accepted;
- `svh` and `dvh` were supported.

This is a single-engine observation, not a compatibility claim. Publication requires the project's selected browser matrix and failure behavior to be recorded.

## Challenge-by-challenge findings

### Absolute lengths lecture

Useful source coverage:

- names the CSS absolute length family and fixed conversion ratios;
- distinguishes CSS layout units from physical display pixels in one caveat;
- demonstrates fixed declared dimensions and spacing.

Required corrections:

- “fixed” must mean fixed conversion within CSS value processing, not one physical size, one device pixel, or immunity to browser zoom;
- the CSS pixel must be taught as a reference-pixel unit and canonical absolute length, not a hardware-pixel promise;
- physical units can be appropriate in paged or physically calibrated contexts, but “mostly for print” is an orientation, not a property contract;
- selecting `px` for “precise control” does not prove usable layout, and fixed block heights can clip enlarged or translated content;
- the target must include zoom, density, print, long-content, and replaced-content changed cases.

### Percentages lecture

Useful source coverage:

- establishes that percentages need a reference quantity;
- includes width, height, font size, image containment, and transform examples;
- warns that percentage heights can fail without a definite reference size.

Required corrections:

- percentages are not generally proportions of the parent element; each property defines its basis;
- physical `margin-top` percentages are not based on parent height in the normal horizontal writing mode;
- transform percentages use the transformed box, not the containing block used by width;
- `max-width: 100%` is useful media containment but still needs intrinsic dimensions, aspect behavior, and overflow evidence;
- absolute positioning plus translation is not the default way to center ordinary flow content;
- responsive behavior requires changed container, writing-mode, content, and definite/indefinite-size cases rather than a one-size screenshot.

### `em` and `rem` lecture

Useful source coverage:

- distinguishes local font-relative and root font-relative values;
- shows that `em` on a non-font property follows the element's font size;
- connects font-relative sizing to user adaptation.

Required corrections:

- `em` on `font-size` resolves from parent font metrics; outside font properties it resolves from the element's computed font size;
- the initial root size is a user-agent and user preference, not a guaranteed `16px` constant;
- pixel text still responds to full-page zoom in mainstream browsers, so “pixels do not scale” is too broad;
- `rem` is not automatically accessible, and `px` is not automatically inaccessible;
- components must survive changed root size, local size, minimum-font preferences, 200% text enlargement, text-spacing overrides, and long labels;
- spacing tied to type should be intentional: some dimensions should scale with text while thin borders or media geometry may use other reference frames.

### Viewport lengths lecture

Useful source coverage:

- introduces width- and height-relative viewport units;
- warns against viewport-only typography;
- notices mobile browser interface changes.

Required corrections:

- default `vh` and `vw` use the large viewport; “browser window” is not a sufficient reference model;
- `100vh` can place content behind expanded browser UI, while `100dvh` can resize during scrolling and `100svh` can leave extra space;
- `height: 100vh` can clip content; a bounded `min-block-size` with content growth is often a better starting hypothesis;
- `width: 100vw` plus padding and borders can overflow under content-box sizing, and scrollbar behavior can also matter;
- unbounded `vw` typography can fail WCAG Resize Text; a lower and upper bound plus font-relative contribution still needs verification;
- the target must include portrait/landscape, expanded/retracted UI, keyboard overlay, zoom, scrollbar, long-content, and reduced-motion or stability considerations where resizing becomes visible.

### `calc()` lecture

Useful source coverage:

- introduces expressions, operator precedence, compatible mixed units, and required whitespace around `+` and `-`;
- shows a percentage-minus-length constraint;
- distinguishes unitless factors in multiplication and division examples.

Required corrections:

- a CSS function is not generally a block of imperative code;
- accepted calculations depend on numeric types and the grammar of the receiving property, not merely on whether every operand has a unit;
- zero does not universally require a unit, but a typed mixed expression may require a dimension term;
- division of like dimensions can produce a number in the current draft, but that number cannot be assigned to a length-only property;
- color calculations are not a beginner length example and require their own color-function grammar;
- current multiplication and division support must be tested across the supported browser matrix rather than inferred from draft syntax;
- nested calculations often simplify without nested `calc()` wrappers; learners need computed-value inspection, invalid-declaration diagnosis, and changed percentage bases.

### Event flyer lab

Useful source coverage:

- asks for a small complete document rather than an isolated declaration;
- combines landmarks, headings, spacing, percentage widths, viewport lengths, and calculation;
- begins from an empty body.

Why it cannot be reused as the target lab:

- checks require tokens and computed literals but do not prove a readable or responsive flyer;
- the image check omits alternative-text purpose and the supplied solution omits `alt`;
- the lab forces `vw`, `vh`, and an exact subtraction instead of letting the learner select and defend a reference frame;
- `90vw` plus padding and default content-box sizing is not evaluated for overflow;
- `100vh` uses the large viewport and is not tested with expanded mobile UI or content growth;
- inline-block columns repeat an older whitespace-sensitive layout pattern and are not tested with long or translated content;
- heading text only has to be nonempty; information quality, date/location semantics, readable measure, contrast, focus, and navigation are not assessed;
- no prediction, debugging, correction, explanation, changed case, or retained evidence exists.

The target independent lab will use a different stakeholder, brief, visual structure, starter, data, and grading contract. It will require unit-selection rationale, a no-JavaScript resilient baseline, image-purpose evidence, changed content, zoom/reflow evidence, dynamic viewport behavior, and a causal repair. It will not prescribe `vw` or `calc()` when a simpler intrinsic layout is better.

### Review and quiz

The review repeats definitions and examples. It provides no retrieval attempt, changed context, feedback, correction path, or delayed check.

The quiz mainly recognizes labels or performs one arithmetic substitution. Several items overgeneralize:

- `100%` width is not simply “the full width of its parent” for every property and formatting context;
- the percentage term in `calc(10px + 20%)` is not universally the parent's width;
- “points are for print” is not a decision rule;
- `rem` versus `em` needs the font-property exception;
- viewport units are not simply a percentage of “the screen”;
- `calc()` validity depends on result types and the receiving property.

The target assessment must sample reference identification, prediction, computation, invalid syntax, computed-value inspection, overflow diagnosis, accessibility consequences, unit selection, and transfer. Distractors must represent diagnosed misconceptions rather than unrelated unit names. Canonical answers remain server-side.

## Exact candidate mapping

### Lecture

- `css-absolute-font-relative-viewport-units`
- `css-percentages-containing-blocks`
- `css-calculated-value-math`

The former broad map incorrectly credited intrinsic sizing, `min()`/`max()`/`clamp()`, and complete fluid-default design. Those concepts are not taught by the five source lectures and are removed from the block map.

### Lab

- `html-heading-hierarchy`
- `html-landmarks`
- `html-sectioning-articles`
- `css-box-model-areas`
- `css-absolute-font-relative-viewport-units`
- `css-percentages-containing-blocks`
- `css-calculated-value-math`

The source uses an image but does not teach or assess the image-purpose and alternative-text contract, so it receives no image-accessibility concept credit.

### Review

- `css-absolute-font-relative-viewport-units`
- `css-percentages-containing-blocks`
- `css-calculated-value-math`

### Quiz

- `css-intrinsic-extrinsic-sizing` for the explicit `auto` sizing item
- `css-absolute-font-relative-viewport-units`
- `css-percentages-containing-blocks`
- `css-calculated-value-math`

These assignments mean only that the pinned source touches the bounded concepts. They do not claim depth, correctness, mastery, or approval.

## Original learning sequence contract

The eventual target sequence must be cumulative and must retrieve earlier HTML, cascade, box-model, intrinsic-size, media, and accessibility skills.

1. Predict fixed and changed reference frames before coding.
2. Inspect specified, computed, used, and visible outcomes in the inline editor.
3. Build one small component with content growth and user-font changes.
4. Resolve percentage bases across width, height, margin, padding, font size, and transform cases.
5. Debug an indefinite percentage height without inserting an arbitrary fixed height.
6. Compare `em` and `rem` under changed root and local font sizes.
7. Compare `vh`, `svh`, and `dvh` with simulated expanded and retracted browser UI.
8. Diagnose overflow caused by viewport width plus box-model additions.
9. Validate and repair `calc()` syntax and numeric type errors.
10. Complete a guided layout using explicit reference-frame rationale.
11. Complete faded variants with different constraints and no copied values.
12. Debug a broken responsive artifact with long text, zoom, and text-spacing changes.
13. Retrieve the models in a new scenario without the original examples.
14. Pass a quiz containing calculation, explanation, diagnosis, and selection items.
15. Complete an independent stakeholder lab and defend the result.
16. Revisit the same concepts after delay inside later typography, layout, form, and project work.

## Required evidence and grading

Every substantial units activity must combine relevant evidence from this list:

- reference quantity named for every percentage;
- definite or indefinite reference state identified;
- predicted result before preview;
- computed-value observation after preview;
- changed root font and local font cases;
- narrow and wide container cases;
- small, large, and dynamic viewport cases where relevant;
- long, short, translated, empty, and replaced content cases;
- 200% text enlargement, 400% reflow, and required text-spacing overrides where relevant;
- horizontal and vertical overflow checks;
- valid and invalid calculation cases;
- causal diagnosis and repair explanation;
- rationale for choosing or rejecting fixed, font-relative, container-relative, or viewport-relative sizing;
- retained evidence in a later activity and transfer evidence in an independent project.

Keyword presence, a requested unit suffix, a single computed value, screenshot similarity, and passing at one viewport cannot independently pass the target gate.

## Remaining blockers

- Independent subject review must confirm every concept assignment, specification interpretation, and current-browser boundary.
- The complete 180-concept introduce/model/guided/faded/debug/retrieve/assess/delayed-retain/transfer matrix is not authored.
- Original unit activities, varied scenarios, hints, correction paths, server-side checks, and solutions are not authored.
- Assessment reviewers have not mapped cognitive level, misconception, difficulty, discrimination, false-positive, or false-negative risk.
- Representative learners have not completed the unit sequence or the independent replacement lab.
- Tablet and desktop inline-editor behavior plus accessible phone handoff remain unverified for this sequence.
- The remaining 46 source blocks still need challenge-level inspection; 36 blocks and one unavailable assessment container retain exact evidence with zero guessed concept assignments.
- Lighthouse remains held until all content, migration, duplication, editor, progress, navigation, review, and pilot work is complete.
