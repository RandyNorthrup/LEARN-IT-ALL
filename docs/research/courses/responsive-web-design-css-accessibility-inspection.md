# Responsive Web Design CSS Accessibility source inspection

Reviewed: 2026-07-16

Status: complete direct inspection; candidate curriculum evidence only

## Decision

All five pinned CSS Accessibility blocks are inspected challenge by challenge, including every one of the 67 workshop steps and every one of the 362 implementation checks in the family. The blocks establish benchmark contact with contrast, hidden content, semantic structure, forms, responsive styling, and reduced motion. They are not an acceptable target course sequence.

LEARN-IT-ALL will not teach accessibility as a copied `.sr-only` recipe, a remembered contrast-tool brand, a list of ARIA attributes, or one successful screenshot. Accessibility work must preserve a real user task while learners reason separately about:

- visual rendering and visual meaning;
- normal-flow and layout participation;
- find-in-page and fragment discoverability;
- keyboard and pointer operation;
- sequential and programmatic focus;
- accessibility-tree inclusion;
- computed role, name, description, state, property, and relationship;
- text, component, state, and focus contrast;
- non-color meaning and persistent affordances;
- zoom, reflow, text spacing, forced colors, and user preferences;
- task success with complementary automated, inspection, assistive-technology, and observed-user evidence.

The replacement must make contradictory states visible. Content can be visually absent yet remain in layout, visually present yet absent from accessibility APIs, programmatically hidden yet still focusable in a broken implementation, or available to find-in-page while not currently rendered. A single word such as “hidden” is not a sufficient mental model.

## Inspected source boundary

The inspection covers five source blocks from freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`:

| Source block | Type | Challenges | Question prompts | Implementation checks | Source bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| `lecture-best-practices-for-accessibility-and-css` | lecture | 2 | 6 | 0 | 11,266 |
| `workshop-accessibility-quiz` | workshop | 67 | 0 | 343 | 359,483 |
| `lab-tribute-page` | lab | 1 | 0 | 19 | 13,126 |
| `review-css-accessibility` | review | 1 | 0 | 0 | 6,869 |
| `quiz-css-accessibility` | quiz | 1 | 10 | 0 | 3,770 |
| **Total** |  | **72** | **16** | **362** | **394,514** |

Every source file was read from the pinned checkout, whose HEAD matched the recorded upstream commit. `references/freecodecamp-rwd-v9.json` remains the exact record for source order, identities, paths, SHA-256 hashes, byte counts, section inventories, prompt counts, checks, and code-language evidence.

Direct inspection is not independent subject review, WCAG conformance, instructional approval, assessment validation, learner-flow verification, assistive-technology compatibility, retention proof, observed-user evidence, or publication permission.

## Current primary evidence

The replacement boundaries use current primary and official evidence:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/), W3C Recommendation, for perceivable, operable, understandable, and robust outcomes. The source sequence is especially bounded by use of color, text contrast, non-text contrast, resize, reflow, text spacing, keyboard, focus visibility, focus not obscured, target size, motion, labels, errors, and name-role-value requirements.
- [HTML Living Standard](https://html.spec.whatwg.org/multipage/interaction.html), current on 2026-07-16, for `hidden`, `hidden="until-found"`, inert subtrees, focus, and interaction behavior. Native hidden, hidden-until-found, and inert are not interchangeable.
- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria/), W3C Recommendation dated 6 June 2023, for accessibility-tree exclusion and role, name, state, property, and relationship semantics. ARIA does not add CSS rendering or missing keyboard behavior.
- [W3C ACT rule 6cfa84](https://www.w3.org/WAI/standards-guidelines/act/rules/6cfa84/) for the bounded rule that an `aria-hidden="true"` subtree must not retain descendants in sequential focus navigation. The rule is informative and atomic, not complete conformance proof.
- [Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/), W3C Working Draft dated 19 February 2026, for interaction-capability and user-preference media features including `prefers-reduced-motion`, `prefers-contrast`, `forced-colors`, and `prefers-color-scheme`.
- [CSS Display Level 3](https://www.w3.org/TR/css-display-3/) and [CSS Overflow Level 3](https://www.w3.org/TR/css-overflow-3/) for box generation, display, clipping, and overflow behavior.
- [CSS Color Adjustment Level 1](https://www.w3.org/TR/css-color-adjust-1/) for forced colors and author versus user color control.
- [WAI Evaluating Web Accessibility](https://www.w3.org/WAI/test-evaluate/) and [Selecting Web Accessibility Evaluation Tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/) for the explicit limit that no tool alone determines whether a site meets accessibility standards.

Media Queries Level 5 is a Working Draft. Draft status, open issues, privacy exposure, implementation support, and Web Platform Tests remain freshness gates. A draft feature is taught only when the accepted browser matrix and an authentic learner need justify it.

## Source-family findings

### The family is not a coherent CSS accessibility progression

The family mixes document language, character encoding, metadata, SEO, landmarks, headings, images, forms, ARIA, selectors, Flexbox, fixed sizing, generated content, contrast, and motion. Some are necessary retained HTML skills. Others are ordinary layout recipes. The sequence does not explain why they are grouped, which prerequisites are active, or what user task each accessibility choice protects.

The workshop’s artifact is called an accessibility quiz, but learners spend most of its 67 steps reproducing a prescribed page. They do not evaluate the quiz with a keyboard, zoom, accessibility tree, forced colors, text spacing, changed labels, validation errors, or a representative user. Accessibility is often the subject matter printed on the page, not the behavior of the page being built.

The target must retrieve semantic HTML and forms before it adds CSS accessibility behavior. It must not reteach document boilerplate as if repeated typing were cumulative accessibility practice. Every new CSS choice needs a stated access risk, prediction, observable evidence, correction path, and later retrieval.

### Check volume does not establish accessibility evidence

The workshop contains 343 implementation checks. Direct check inspection found:

- 41 of 67 steps use DOM selector or attribute checks;
- 31 steps use CSS rule/declaration inspection helpers;
- only five steps inspect any computed style;
- no step traverses the complete keyboard path;
- no step inspects focus visibility or focus obstruction;
- no step inspects computed accessibility roles, names, descriptions, states, or relationships;
- no step validates accessibility-tree inclusion across hidden states;
- no step exercises zoom, reflow, text-spacing overrides, forced colors, changed input capability, or assistive technology;
- no step measures whether the learner can complete and recover from the quiz task.

Many checks verify exact tag names, IDs, classes, literal values, selectors, declarations, and source relationships. Those checks can confirm that a recipe was copied. They cannot establish that the result remains usable or accessible.

The lab’s 19 checks have the same problem. They require fixed IDs, a `target="_blank"` link, `display: block`, `max-width: 100%`, `height: auto`, nonempty text, and geometric centering. They do not require or inspect an image text alternative, meaningful heading hierarchy, keyboard focus, link purpose, new-window warning, contrast, reflow, zoom, text spacing, source credibility, or a complete user task.

The replacement grader must combine parsed structure, computed behavior, state transitions, accessibility snapshots, keyboard actions, changed cases, and human rubric evidence. Each check must state which claim it can falsify and which claims remain outside its authority.

### Contrast is reduced to tool recognition

The first lecture names WebAIM’s checker and TPGi’s analyzer, gives two colors, and asks learners to remember product capabilities. The review repeats those names. Three quiz items ask why contrast matters or which named product accepts typed colors or samples the screen.

This does not teach the contrast model:

- text and images of text versus component boundaries and graphical objects;
- normal text versus large text thresholds;
- actual adjacent colors after alpha compositing, gradients, images, states, and user overrides;
- placeholder, hover, focus, disabled, validation, visited, selected, and changed-background states;
- focus indication and control boundary contrast;
- non-color evidence for meaning and interaction;
- threshold comparison without rounding;
- what automated color-pair calculations cannot observe;
- when user and forced-color settings replace author colors.

The workshop tells learners to choose navigation text with at least 7:1 contrast and later to choose a footer color with “adequate” contrast. It does not record the measured pairs, context, states, threshold rationale, or changed backgrounds. It also removes link underlines and adds a hover-only reversal, weakening persistent affordance while claiming accessibility progress.

The replacement begins with relative luminance and contrast as a measurable behavior, then moves through text, controls, icons, focus, states, compositing, and non-color meaning. Tool use is interchangeable: learners must explain inputs, threshold, output, limitations, and complementary checks rather than memorize a vendor name.

### Hidden content is taught as three recipes instead of a state model

The hiding lecture distinguishes `display: none`, `visibility: hidden`, a visually-hidden class, and `hidden`. That initial distinction is useful. It is materially incomplete:

- native hidden and `hidden="until-found"` are not separated;
- inert rendering, focus, selection, find-in-page, form, and accessibility consequences are absent;
- `aria-hidden` appears only later and without the focusable-descendant failure in the lecture;
- visible content referenced for accessible names or descriptions is not examined;
- CSS overriding native hidden rendering is not considered;
- reveal control, focus placement, returned focus, and state synchronization are absent;
- `content-visibility` and find-in-page behavior are absent;
- decorative duplication, repeated labels, collapsed regions, error messages, offscreen panels, and modal backgrounds are not distinguished;
- no accessibility tree is actually inspected.

The source says hidden content should be used only when it “enhances the user experience,” which is too vague to guide a decision. The replacement needs a purpose-first matrix: irrelevant current-state content, reusable templates, collapsed but discoverable content, modal background, purely decorative duplication, supplemental visible help, and visually hidden naming each have different valid and invalid mechanisms.

Learners must test rendering, box generation, layout space, hit testing, keyboard focus, programmatic focus, find-in-page, fragment reveal, form behavior, accessibility-tree exposure, and accessible-name contribution separately. They must also repair a deliberately contradictory case such as an `aria-hidden` container with a tabbable descendant.

### The visually-hidden pattern is stale and overpromised

The lecture and workshop prescribe a memorized `.sr-only` declaration set using absolute positioning, one-pixel dimensions, negative margin, `overflow: hidden`, deprecated `clip: rect(...)`, nowrap, and no border. The prose says this makes content available “only” to screen readers.

Problems:

- visually hidden content can affect more than screen readers and is not a screen-reader-only channel;
- implementation behavior varies with layout, writing mode, browser, assistive technology, focusability, and user styles;
- the pattern does not address focusable content that must become visible on focus;
- `clip` is deprecated and the recipe omits a current `clip-path` strategy;
- indiscriminate nowrap can change announcement and localization behavior;
- a one-pixel recipe is copied without a reasoned purpose or changed-case test;
- uniquely necessary instructions should normally remain visible to everyone;
- hidden extra words can create visible-name and accessible-name divergence;
- automation cannot prove the hidden text is useful, accurate, or not duplicated.

The target will prefer visible labels and instructions. A maintained visually-hidden utility can be introduced only for a justified case, with writing-mode, zoom, text-spacing, focus, forced-color, and accessibility-tree evidence. Focusable skip links and similar controls must become visibly available on focus.

### Generated “Question” text creates contradictory semantics

Workshop steps 24 through 34 first add visually hidden “Question” text to each heading, then add `h3::before { content: "Question #"; }` to avoid repetition. This produces a fragile combination of DOM text, hidden text, a number, and CSS-generated content. Depending on browser and accessibility mapping, the spoken and visible names can diverge or repeat.

Required question identity belongs in real document text. Generated content may decorate or number when the underlying text remains complete, but it cannot be the only source of required instructions or labels. Learners need to predict the DOM, rendered text, copied text, generated boxes, accessible name, and no-CSS result separately.

### Semantic HTML and ARIA rules are sometimes misstated

The workshop correctly introduces landmarks, labels, fieldsets, legends, radio grouping, select, textarea, button, footer, and address. It also introduces defects:

- every `section` is assigned `role="region"` even though a named section already exposes region semantics in applicable mappings; excessive regions add navigation noise;
- fieldsets are told to receive an “adequate `name` attribute,” although the group’s accessible name comes from `legend`, not the `name` attribute;
- label association is described as providing assistive-technology users a “visual reference,” confusing visible labels with programmatic naming;
- an explicitly associated label wrapping a radio is called a universal best practice rather than one valid association pattern;
- the logo receives fixed alternative text without evaluating whether adjacent text duplicates it or whether the image’s purpose changes;
- the `address` element is described too broadly as linking to a “subject,” rather than contact information for its nearest article or page context;
- metadata and SEO steps are presented as accessibility work without separating discovery metadata from task accessibility.

The target teaches native semantics first, computed accessibility information second, and ARIA only where an actual semantic gap remains. Learners must explain why an ARIA role is needed, what behavior it does not add, and how repeated landmarks are named without clutter.

### Form practice omits completion and recovery

The workshop creates student name, email, date, true-or-false questions, a select, a textarea, and a submit button. It never builds a complete accessible form flow. Missing evidence includes:

- required versus optional status;
- autocomplete purpose and privacy decisions;
- clear persistent instructions;
- keyboard and touch input behavior;
- validation timing;
- inline and summary error association;
- focus after failed submission;
- preserving entered work;
- corrected resubmission;
- disabled, readonly, autofill, and high-contrast states;
- status announcement;
- successful confirmation;
- server-side error and retry;
- changed, long, or translated labels.

Steps 21 and 22 add a placeholder only to remove it immediately. This is contrived token churn, not a misconception clinic: the learner is told the answer rather than shown the failure and asked to repair it. The replacement must let a learner observe disappearing instructions, ambiguous values, low contrast, and inaccessible errors, then choose a persistent visible label and help strategy.

### Hover styling removes affordance and ignores focus

Steps 45 through 47 remove underlines, reverse navigation colors on hover, and set a pointer cursor. The rule is placed on list-item hover rather than specifying a complete link-state system. There is no equivalent `:focus-visible` design, no active or current state, no keyboard walkthrough, and no forced-color case.

A link already provides pointer affordance through the user agent. Removing its persistent underline can make links indistinguishable in context. Hover is an enhancement signal, not a complete interaction path. The target must preserve visible link identity, add a high-contrast focus indicator, test all states against changed backgrounds, and retain operation for keyboard, touch, stylus, speech, switch, and mixed-input use.

### Responsive and zoom behavior is replaced by fixed layout patches

The workshop includes a viewport meta element, Flexbox, wrapping navigation, percentages, rem and viewport units, and reduced motion. Useful responsive contact is undermined by:

- a fixed 50-pixel header height;
- `min(5vw, 1.2em)` heading text that can cap enlargement and depends on viewport width;
- a large fixed top-padding workaround for anchor visibility instead of a deliberate focus and scroll-offset model;
- `width: 50%` inputs beside `width: 10%` labels;
- a 55-pixel minimum label width that cannot handle longer labels or translation;
- inline-block alignment and right-aligned labels without narrow, zoom, or text-spacing cases;
- 60-pixel padding and other literal spacing recipes;
- a 40-percent submit-button width without changed-content or target analysis;
- no continuous-width, 200% zoom, 400% reflow, or text-spacing evidence.

The target uses fluid defaults, intrinsic sizing, logical properties, content-derived breakpoints, `scroll-margin` where appropriate, and changed-content tests. “Looks okay at one width” cannot pass.

### Reduced motion is introduced late and too narrowly

Steps 66 and 67 first apply smooth scrolling globally and then place it inside `prefers-reduced-motion: no-preference`. This does at least demonstrate progressive motion opt-in. It still reduces motion accessibility to one declaration.

Learners need to classify motion as essential, orienting, decorative, feedback, or risky; preserve state when motion is removed; handle transitions and animations as well as scrolling; avoid event logic that depends on animation completion; test rapid reversal and interrupted states; and distinguish “reduce” from “disable every duration.” The Media Queries specification also makes clear that preference features carry privacy considerations and are not disability detectors.

### The tribute lab does not assess accessibility

The lab asks for a tribute page with fixed IDs, a title, image container, image, caption, information, external link, responsive image sizing, and centering. It is primarily a structural and responsive-image exercise.

Critical weaknesses:

- an `alt` attribute is present in the provided solution but is absent from the user stories and checks;
- `figure` and `div` are treated as interchangeable for the image group;
- `figcaption` and `div` are treated as interchangeable for the caption;
- any nonempty title, caption, and information pass regardless of truth, usefulness, reading order, or heading structure;
- the external link is required to open a new tab without requiring purpose, warning, safe behavior, or a user need;
- no source credibility, rights, consent, respectful content, or stakeholder evidence is required;
- the fixed Norman Borlaug solution can be copied rather than designed for an unfamiliar subject;
- no keyboard, focus, contrast, zoom, reflow, text-spacing, forced-color, accessibility-tree, or assistive-technology evidence exists;
- centering and three computed image declarations dominate the only behavior checks.

The replacement will not call this an accessibility lab. Responsive image geometry can be retained as bounded source coverage. An actual independent accessibility lab must start from a different real task, include multiple access barriers, preserve full user operation, require evidence and repair, and accept multiple defensible implementations.

### Review and quiz reward recall rather than causal diagnosis

The review combines contrast-tool names, accessibility-tree vocabulary, `max()`, hiding declarations, an `.sr-only` recipe, smooth scrolling, reduced motion, `aria-hidden`, `hidden`, and placeholder advice. It is a reference sheet, not retrieval practice.

The quiz contains 10 recognition questions. Several ask for tool names or property vocabulary. One asks which `max(400px, 40vw)` expression becomes wider beyond 1000 pixels; that is a unit-arithmetic item, not accessibility evidence. The hidden-content answer treats all cases as a single screen-reader rule. No item asks the learner to diagnose a conflicting rendered/focus/tree state, interpret an actual contrast failure, repair a keyboard path, or choose complementary evaluation.

The target quiz uses scenario decisions and trace interpretation. Exams require an unfamiliar artifact, changed states, a causal diagnosis, a repair, a re-test, and a defensible statement of what the evidence still does not prove.

## Complete workshop-step inspection

Every step was inspected. The following table preserves the sequence’s actual contact and replacement judgment without copying its learner-facing material.

| Steps | Source contact | Replacement judgment |
| --- | --- | --- |
| 1–5 | language, stylesheet, encoding, viewport, description, title | Retrieve document fundamentals once; separate accessibility, internationalization, discovery, and responsive purposes. Do not pad a CSS accessibility workshop with boilerplate repetition. |
| 6–13 | header, main, logo, heading, navigation, sizing, aspect ratio, Flexbox, links | Retain semantic navigation and responsive contact; remove fixed artifact values, font stereotypes, and viewport-capped type. Require keyboard and changed-label evidence. |
| 14–18 | form sections, region roles, labelled regions, fonts, fragment navigation | Prefer native named sections without redundant regions; verify unique landmarks, focus destination visibility, and fragment behavior rather than attributes alone. |
| 19–22 | labels, input types, names, placeholder addition and removal | Turn the placeholder sequence into an observed misconception-and-repair clinic with persistent labels, input purpose, autocomplete, instructions, errors, and recovery. |
| 23–34 | headings, fieldsets, legends, radio groups, visually hidden text, pseudo-generated text | Keep group semantics and mutual exclusion; replace the stale hidden recipe and generated required wording with visible, computed-name, focus, and no-CSS evidence. |
| 35–41 | select, options, textarea, submit button | Require complete labelled controls, required/optional state, validation, preserved data, error focus, status, correction, and confirmation. |
| 42–44 | footer, address, line breaks, organization link | Teach address context precisely and test link purpose, destination, and contact meaning. |
| 45–50 | navigation color, removed underlines, hover reversal, Flexbox alignment, wrap | Reject hover-only affordance. Build persistent link identity and complete hover, focus-visible, active, current, touch, forced-color, and changed-background states. |
| 51–65 | fixed section widths, padding offsets, inline labels, fieldset/list styling, button and footer styling | Replace literal layout recipes with intrinsic, logical, content-driven behavior tested at zoom, reflow, text spacing, translation, long errors, and touch. Keep semantic grouping visible. |
| 66–67 | smooth scrolling and reduced-motion preference | Retain progressive opt-in as one small example; expand to motion classification, equivalent state, interruption, and changed-preference evidence. |

## Bounded source-to-concept mapping

The five blocks now receive explicit block-specific candidate maps. They do not use the former broad CSS-accessibility bundle.

- The lecture maps only to accessibility-tree inclusion, evaluation limits, display/overflow visibility, and contrast/non-color evidence.
- The workshop maps to the document, landmark, form, naming, hiding, CSS, Flexbox, responsive, interaction, and motion concepts it actually contacts. Mapping records contact, not adequacy.
- The tribute lab maps only to links, replaced content, figures/captions, headings, landmarks, box/display sizing, and fluid media. It receives no accessibility mastery credit.
- The review maps to labels, hiding, ARIA, evaluation limits, display/overflow, `min()`/`max()` behavior, contrast, and reduced motion.
- The quiz maps only to the narrow concepts sampled by its items and remains an invalid terminal assessment.

Source mapping is benchmark evidence. It is not permission to reuse prose, code, scenarios, checks, solutions, or questions. It is also not a claim that the source teaches every mapped concept completely.

## Target learning progression

CSS accessibility stays cumulative across the course instead of becoming a disposable themed module.

1. **Retrieve semantic and keyboard foundations.** Inspect native roles, names, descriptions, relationships, source order, labels, groups, alternatives, and a complete keyboard task before adding CSS.
2. **Build a rendering–layout–focus–tree matrix.** Predict and test visible, `display: none`, `visibility: hidden`, native hidden, hidden-until-found, inert, `aria-hidden`, and visually hidden cases.
3. **Repair contradictory hidden states.** Diagnose a tabbable control inside an `aria-hidden` subtree, a hidden required instruction, and an offscreen focus target.
4. **Measure contrast and non-color meaning.** Calculate actual pairs, inspect component and focus boundaries, vary states and backgrounds, and preserve meaning without color.
5. **Build complete interaction states.** Style links and controls for persistent affordance, hover, focus-visible, active, selected, disabled, error, and forced-color behavior.
6. **Adapt to input capabilities.** Use pointer and hover queries only as enhancements while retaining keyboard, touch, stylus, speech, switch, and hybrid operation.
7. **Preserve zoom and user text settings.** Repair clipping, overlays, fixed dimensions, hidden labels, anchor obstruction, and horizontal page scrolling under changed content and overrides.
8. **Respect motion and color preferences.** Remove or replace nonessential movement, retain state feedback, and use system-aware color behavior without defeating user choices.
9. **Evaluate with complementary evidence.** Combine standards inspection, automation, keyboard/zoom tasks, computed accessibility information, assistive technology, and representative-user observation while documenting limits.
10. **Transfer to an unfamiliar task.** Audit, repair, and defend a new stakeholder artifact from real failure evidence without a prescribed selector or declaration sequence.

Each activity retrieves earlier HTML, forms, source-order, responsive, cascade, box, color, and interaction competencies. Later CSS, layout, animation, lab, project, and exam work continues to enforce them.

## Required interaction and evidence design

The authored course needs genuinely different interactions:

- predict which state enters rendering, layout, focus, find-in-page, and the accessibility tree, then inspect the result;
- toggle one state at a time and explain a mismatch;
- repair a focusable descendant hidden from accessibility APIs;
- reveal a skip link on focus and prove it remains visible and unobscured;
- compare actual contrast across normal, hover, focus, error, selected, disabled, gradient, image, and forced-color states;
- replace a color-only status with text, shape, position, and programmatic state;
- test long labels, translated content, error messages, 200% zoom, 400% reflow, and WCAG text-spacing overrides;
- emulate no-hover, coarse pointer, mixed input, reduced motion, forced colors, and contrast preferences without treating them as identity labels;
- inspect computed role, name, description, state, and relationships alongside visual output;
- perform keyboard and assistive-technology task walkthroughs;
- interpret automated findings, false confidence, unsupported claims, and remaining manual work;
- debug a complete form error-and-recovery path;
- run an independent accessibility audit, repair severe findings, and re-test the task.

Hints must progress from a user symptom, to the violated invariant, to where to inspect, to a bounded mechanism. They must not reveal an exact declaration before the learner has formed and tested a hypothesis.

## Assessment contract

No isolated signal awards mastery.

| Claim | Required evidence | Insufficient alone |
| --- | --- | --- |
| Hidden state is correct | rendered state, layout, focus, find/fragment behavior, accessibility-tree result, complete task | presence of `hidden`, `aria-hidden`, `display`, or a utility class |
| Contrast is sufficient | measured actual adjacent colors for every required state, non-color meaning, forced-color inspection | palette names, one pair, screenshot, or tool pass badge |
| Keyboard access works | complete ordered task, visible unobscured focus, no trap, recovery after reveal/error/modal | tabbable selector count |
| Motion adaptation works | no-preference and reduced modes communicate the same task state without harmful movement | presence of `prefers-reduced-motion` |
| Responsive access works | changed content, continuous widths, zoom, reflow, text spacing, orientation, input, preference cases | three viewport screenshots |
| Form is accessible | names, instructions, input purpose, grouping, validation, error association, focus, preserved data, correction, confirmation | labels and fieldsets present |
| Evaluation is credible | reproducible setup, standards scope, automation limits, human checks, observed tasks, repairs, re-tests, unresolved risks | zero automated violations |
| Transfer is independent | unfamiliar stakeholder task, empty start, changed cases, causal defense, retained earlier skills | restyled workshop or prescribed IDs |

Quizzes use trace and scenario items. Debugging clinics use seeded contradictory states. Labs have different artifacts, failures, and evidence. Projects begin from stakeholder acceptance criteria and an empty source boundary. The cumulative exam samples every terminal accessibility task and includes delayed correction and transfer.

## Originality and duplication constraints

The target must not reuse or lightly rename:

- the freeCodeCamp accessibility-quiz page;
- the 67-step order;
- its fixed logo, headings, questions, colors, dimensions, selectors, or values;
- the copied `.sr-only` declaration sequence;
- the pseudo-generated “Question #” pattern;
- the Norman Borlaug tribute artifact or its fixed IDs;
- the named contrast-tool recall questions;
- source checks or solutions;
- the add-then-remove placeholder sequence;
- any workshop starter as an independent lab or project.

Candidate activity domains include an emergency-service eligibility form, transit disruption notice, library account recovery flow, community meeting agenda, medication-information handoff, and public-benefit application status. Domain choice requires stakeholder and safety review. Each artifact must have distinct content, state, failure, evidence, and transfer demands.

## Inspection outcome

This wave adds no new target concept merely to increase inventory. The existing graph already separates contrast, focus, input capability, target size, reduced motion, forced colors, zoom/reflow/text spacing, changed-case regression, accessibility-tree inclusion, and evaluation limits. The inspection strengthens current primary anchors, makes five maps exact, and records the missing behavior contract.

After this wave, the candidate alignment contains:

- 122 agent-inspected source blocks;
- 1,002 inspected source challenges;
- 1,080 captured question prompts in inspected blocks;
- 3,233 inspected implementation checks;
- 129 block-specific candidate mappings;
- 28 uninspected source blocks with exact evidence and zero guessed concepts;
- one unavailable assessment container with zero concept claims;
- 36 total source blocks still requiring challenge-level inspection;
- 183 target concepts, including seven explicit modern extensions and six unresolved concepts.

These are research inventory facts, not course completion. The family remains blocked on independent subject, instructional-design, assessment, accessibility, and duplication review; complete activity-matrix authoring; runtime and grading proof; representative learner observation; repair; and re-test.

