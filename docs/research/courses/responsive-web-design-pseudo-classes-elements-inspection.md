# Responsive Web Design v9 pseudo-classes and pseudo-elements inspection

Status: `source-inspected-candidate-review`
Reviewed: 2026-07-15
Pinned source: freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`
Target: original LEARN-IT-ALL instruction; source material is coverage evidence only

## Decision

All six source blocks are inspected challenge by challenge. They provide a useful topic inventory, but their order, projects, explanations, and checks cannot serve as the target curriculum.

The source introduces selector states through definitions, then asks learners to assemble two highly directed artifacts and one token-checked lab. It mixes in links, forms, flexbox, transforms, transitions, generated content, native-control replacement, and validation without first establishing all prerequisite behavior or accessibility constraints. Its review and quiz mostly measure term recognition. The target must instead make learners predict matching, inspect state, explain specificity, preserve native semantics, test keyboard and pointer parity, diagnose changed DOM cases, and defend accessible state communication.

These exact candidate maps contain no module fallback. They record only what the pinned source touches. They do not credit the source with correctness, mastery, or publication readiness. Independent subject, instructional, assessment, accessibility, duplication, and learner reviews remain blockers.

## Exact source inventory

| Source block | Type | Challenges | Prompts or checks | Exact observed scope |
| --- | --- | ---: | ---: | --- |
| `lecture-working-with-pseudo-classes-and-pseudo-elements-in-css` | lecture | 7 | 21 questions | user-action, form, location, structural, and functional pseudo-classes; generated presentation |
| `workshop-greeting-card` | workshop | 27 | 84 checks | hover, active, focus, visited, target, before/after, flex alignment, transforms, and transitions |
| `workshop-parent-teacher-conference-form` | workshop | 37 | 166 checks | form markup, selector lists, `:not()`, `::placeholder`, native radio replacement, `:checked`, transforms, transitions, and hover |
| `lab-job-application-form` | lab | 1 | 20 checks | labels and controls; focus, valid, invalid, hover, checked, sibling, attribute, and first-of-type selectors |
| `review-css-pseudo-classes` | review | 1 | 0 | definition list and examples for the lecture categories |
| `quiz-css-pseudo-classes` | quiz | 1 | 40 question prompts | two 20-item recognition pools covering the review terms |

Totals: six blocks, 74 challenges, 61 question prompts, and 270 implementation checks. Exact IDs, paths, hashes, byte counts, and section inventories remain pinned in `references/freecodecamp-rwd-v9.json`.

## Current primary authorities

### Selectors Level 4

Source: <https://drafts.csswg.org/selectors/>
Reviewed: 2026-07-15

The current Editor's Draft defines the target selector model:

- a selector is a predicate over an element and its tree relationships, not a visual-effect instruction;
- user-action states can overlap, and `:hover`, `:active`, and `:focus-within` can also match ancestors under defined conditions;
- `:active` represents the activation interval, not a durable “was clicked” state;
- `:focus` follows input focus while `:focus-visible` follows the user agent's focus-indication heuristic;
- `:is()`, `:not()`, and `:has()` take the specificity of their most specific selector-list argument, while `:where()` contributes zero specificity;
- `:has()` evaluates relative selectors anchored to the subject, cannot be nested, and currently accepts no pseudo-elements;
- `:nth-child()` and `:nth-last-child()` can use an `of S` selector list and combine its specificity with their own;
- `:user-valid` and `:user-invalid` defer presentation until meaningful user interaction, unlike immediate `:valid` and `:invalid` matching;
- `:empty` in the current draft ignores document whitespace characters, but interoperability must be tested rather than inferred from draft text;
- `:visited` is privacy constrained and user agents may deliberately limit observable behavior;
- the current normative location-pseudo-class section defines `:any-link`, `:link`, `:visited`, `:target`, and `:scope`; `:local-link` appears only in historical change notes, so the target will not teach it as a production-ready selector.

The draft is a source of semantics, not proof of browser interoperability. Every advanced selector used in assessed work needs the supported-browser matrix and a deterministic changed-case test.

### CSS Pseudo-Elements Level 4

Source: <https://drafts.csswg.org/css-pseudo/>
Reviewed: 2026-07-15

Pseudo-elements are abstract elements associated with an originating element in the rendering model. `::before` and `::after` generate styleable boxes when `content` is not `none`; they are not ordinary DOM children, and they are suppressed for replaced originating elements. The target will distinguish tree data, generated presentation, selectable rendered regions, property applicability, and accessibility exposure.

Generated content is not accepted as the sole carrier of required instructions, control names, error text, or state. A rendered glyph is not evidence that assistive technology receives stable meaning.

### HTML form behavior

Sources: <https://html.spec.whatwg.org/multipage/form-control-infrastructure.html> and <https://html.spec.whatwg.org/multipage/form-elements.html>
Reviewed: 2026-07-15

Native control state has behavior beyond appearance. Disabled controls suppress queued user-interaction clicks and are barred from constraint validation. Values, checkedness, user-validity state, form ownership, submitted names and values, radio grouping, and custom validity messages remain HTML contracts even when CSS changes presentation.

The target therefore teaches state selectors after the corresponding form semantics. Replacing native appearance must preserve input role, label activation, checked and indeterminate state, focus, keyboard use, touch target, high-contrast rendering, zoom, and submitted data.

### WCAG 2.2 supporting guidance

Sources:

- <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible>
- <https://www.w3.org/WAI/WCAG22/Understanding/use-of-color>
- <https://www.w3.org/WAI/WCAG22/Understanding/error-identification>
- <https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html>

Reviewed: 2026-07-15

The target requires visible keyboard focus, non-color state evidence, text identification of detected errors, and a reduced or disabled path for non-essential interaction-triggered motion. A border color, hover-only change, removed outline, or animated scale is not sufficient evidence.

## Challenge-by-challenge findings

### Seven-part lecture

Useful source coverage:

- names common user-action, input, location, structural, functional, and pseudo-element syntax;
- distinguishes `:focus` from `:focus-within` and `:link` from `:visited`;
- includes `:is()`, `:where()`, `:has()`, and `:not()`;
- includes `::before`, `::after`, `::first-letter`, and `::marker` examples.

Required corrections and expansions:

- pseudo-classes must be taught as match conditions over element state and tree position, not merely ways to “change appearance”;
- `:active` is the activation interval rather than a completed click;
- hover availability depends on the user's input capabilities and cannot carry unique functionality;
- the lecture demonstrates removing an outline without establishing an equivalent focus indicator;
- `:focus-visible`, focus contrast, forced colors, and keyboard/pointer parity require implementation and inspection, not mention;
- checked controls need native semantics, indeterminate/default cases, label activation, target size, zoom, and submitted-value tests;
- disabled state affects operation, validation, and submission; it is not a gray visual mode;
- validity must distinguish constraint state from a useful error experience and avoid marking untouched required fields as errors;
- `:visited` requires privacy/property restrictions and cannot be tested as an unrestricted observable state;
- `:local-link` is not in the current normative selector set and must be removed from production instruction;
- `:empty`, child indexing, type indexing, `An+B`, `of S`, and changed DOM structure need prediction and browser evidence;
- functional selectors need selector-list parsing, invalid arguments, specificity, relative-selector anchoring, and nesting constraints;
- `:has()` is relational, not merely a “parent selector”;
- pseudo-elements are rendering abstractions, not fake DOM elements;
- generated presentation cannot carry required accessible meaning;
- `::marker` property limits and `::first-letter` applicability need changed-case inspection.

Each lecture challenge ends in three recognition questions. None proves selector matching, cascade result, accessibility, or causal diagnosis.

### Greeting-card workshop

The 27 steps direct nearly every element, selector, property, and value. The learner creates a card, link actions, hidden target sections, hover transforms, link states, generated emoji, flex distribution, and transitions.

Defects the target must not repeat:

- flexbox is introduced as a preview before the learner can reason about axes or free-space distribution;
- the whole card scales to `1.1` on hover and sections skew on hover without keyboard parity or reduced-motion handling;
- links remove underlines and rely heavily on color differences;
- focus uses `:focus` with one fixed yellow outline but does not test contrast across states, forced colors, or `:focus-visible` behavior;
- visited-link behavior is treated as unrestricted and is checked only by source shape;
- hidden target sections are removed with `display: none`, then exposed by fragment navigation without focus movement, announcement, history explanation, or no-CSS behavior review;
- “Send Card” and “Share” links present success copy without real operations, making the scenario misleading;
- generated emoji demonstrate decoration but not accessible-content boundaries;
- every check is prescriptive syntax or literal-value matching; no changed state, explanation, repair, or independent decision is required.

LEARN-IT-ALL will use a different scenario. It will first require a state table, then keyboard/pointer predictions, matching inspection, focus and link distinguishability, reduced-motion behavior, fragment-target behavior, and a causal repair. It will not simulate completed transactions with static copy.

### Parent-teacher conference form workshop

The 37 steps build real native form structure before styling, which is useful retrieval. The CSS portion then introduces selector lists, `:not()`, `::placeholder`, custom radio presentation, `:checked`, transform, transition, and button hover.

Defects the target must not repeat:

- the workshop omits form action/outcome, email or phone input fields for the selected contact method, meaningful grade constraints, autocomplete tokens, error recovery, and confirmation behavior;
- placeholders are used as examples without clarifying that they do not replace persistent instructions;
- radio `appearance` is removed before forced-colors, focus, keyboard, target-size, preserved native behavior, and checked-state parity are established;
- the replacement radio has no authored focus indicator;
- checked state depends on a light-green generated circle and color alone;
- `transition: all` is prescribed and the transform-based indicator has no reduced-motion condition;
- the source explains a six-digit hex code while assigning an eight-digit alpha hex value, adding unrelated cognitive load;
- percentage width plus padding is not inspected for overflow under the default box model;
- hover is the only submit-button interaction feedback;
- step checks require exact selectors and values but never operate the form.

The target form-state sequence will retain native appearance first, inspect the accessibility tree and submitted data, add resilient enhancement, test checked and focus behavior across input modes and forced colors, then repair a deliberately broken custom control.

### Job-application lab

Useful source coverage:

- begins from an empty editor and requests labels, multiple control types, a grouped radio choice, and a submit button;
- requires focus, validity, checked, hover, attribute, sibling, and structural selectors;
- includes 20 automated checks.

Why it cannot be the target independent lab:

- tests prescribe exact selector strings and colors rather than business or learner outcomes;
- the supplied solution removes native focus outlines from text controls and radios;
- empty required controls become red and valid controls green immediately, using color as the only error/success evidence;
- there is no text error identification, correction guidance, invalid-submit flow, or successful-submit outcome;
- checked-radio grading mutates a property but does not operate label, keyboard, focus, submission, or accessibility behavior;
- native radio appearance is removed without a forced-colors or no-CSS path;
- button feedback is hover-only;
- the test for “associated labels” checks counts and `for` values but not usable group naming or control operation across changed IDs;
- no responsive overflow, zoom, enlarged text, touch target, or long-label case exists;
- no prediction, rationale, debugging, correction, delayed retrieval, or transfer evidence exists.

The target lab will use a different stakeholder and data model. It will grade native semantics, submitted data, validation timing, persistent text errors, focus visibility, keyboard and label operation, forced colors, reduced motion, zoom/reflow, changed options, and a written causal defense. Canonical expected behavior remains server-side.

### Review and quiz

The review is a term list with one embedded `:is()` editor. It contains no initial retrieval attempt, prediction, changed tree, feedback, correction, or delayed check.

The quiz stores 40 prompts in two 20-item pools and requires 18 correct. Most items ask for a definition or selector name. Important defects include:

- “while it is being clicked” oversimplifies `:active`;
- `:has()` is reduced to containing child elements rather than relative selectors;
- the item for `:empty` says no content or child elements without exposing whitespace behavior;
- `:local-link` is assessed although it is absent from the current normative selector section;
- `:valid` and `:invalid` are assessed without timing, user interaction, or error communication;
- the zero-specificity `:where()` item does not test cascade consequences;
- none of the items tests visited privacy, focus visibility, forced colors, input-modality parity, reduced motion, or accessible generated content;
- distractors are often malformed syntax or unrelated terms instead of diagnosed misconceptions.

The target assessment must include matching prediction, specificity computation, changed DOM, invalid-selector diagnosis, state timing, interaction operation, accessible-state evidence, and transfer. A learner must repair and explain at least one failure, not only recognize a keyword.

## Exact candidate mapping

### Lecture

- `css-selector-lists-combinators`
- `css-attribute-selectors`
- `css-pseudo-classes`
- `css-pseudo-elements`
- `css-specificity-functional-selectors`
- `css-link-state-sequence`
- `css-form-control-states`
- `css-focus-visible-indicators`

### Greeting-card workshop

- earlier HTML headings, paragraphs, links, and sectioning
- CSS loading, basic selectors, selector relationships, display, box model, sizing, borders and shadows, font stack, and type scale
- `css-pseudo-classes`
- `css-pseudo-elements`
- `css-link-state-sequence`
- `css-transform-reference-boxes`
- flex container/axis and alignment concepts
- `css-focus-visible-indicators`
- `css-transitions-state-change`

### Parent-teacher conference workshop

- earlier HTML heading, landmark, paragraph, form, label, input-purpose, choice-group, textarea/button, control-state, and native-validation concepts
- CSS loading, basic selectors, selector relationships, functional-selector specificity, display, box model, sizing, percentage basis, backgrounds, type, and alpha color
- `css-pseudo-classes`
- `css-pseudo-elements`
- `css-form-control-states`
- `css-transform-reference-boxes`
- `css-transitions-state-change`

### Job-application lab

- earlier HTML form, label, input-purpose, choice-group, textarea/button, control-state, native-validation, and error-recovery concepts
- CSS loading, selector relationships, attribute selectors, box model, borders, non-color meaning, form presentation, and focus indicators
- `css-pseudo-classes`

### Review and quiz

- `css-selector-lists-combinators`
- `css-pseudo-classes`
- `css-pseudo-elements`
- `css-specificity-functional-selectors`
- `css-link-state-sequence`
- `css-form-control-states`
- `css-focus-visible-indicators`

These mappings identify bounded source contact. A mapping is not evidence that the source fully teaches or validly assesses the concept.

## Original cumulative learning sequence contract

The eventual LEARN-IT-ALL sequence must retrieve HTML structure, links, forms, the cascade, selector relationships, native semantics, color, and box-model skills in this order:

1. Predict which elements match simple state and structural selectors before preview.
2. Inspect the DOM, matched rules, computed styles, and current interaction state.
3. Compare simultaneous hover, active, focus, focus-visible, and focus-within cases.
4. Build state tables for pointer, keyboard, touch, disabled, checked, and validation behavior.
5. Preserve link identity and focus while adding distinguishable state styling.
6. Diagnose privacy-constrained visited behavior and remove invalid observability assumptions.
7. Predict child and type indexing under inserted, removed, and reordered siblings.
8. Use `An+B` and `of S` in changed collections, then explain the result.
9. Compare `:is()`, `:not()`, `:where()`, and `:has()` matching and specificity.
10. Repair invalid functional selectors and a cascade conflict caused by argument specificity.
11. Distinguish DOM content, generated boxes, and accessible meaning for pseudo-elements.
12. Style markers and decoration without placing required information in generated content.
13. Inspect native form state, checkedness, labels, validation, and submitted values before custom styling.
14. Enhance controls while preserving focus, keyboard, label, forced-color, zoom, and no-CSS behavior.
15. Replace immediate color-only invalid styling with user-timed, text-described recovery.
16. Add state transitions that preserve continuity and honor reduced motion.
17. Complete guided and then faded components with different DOM structures and requirements.
18. Debug an inaccessible state system using browser, keyboard, and accessibility evidence.
19. Retrieve selector and state models in a new scenario without copied values or markup.
20. Pass a mixed assessment of prediction, implementation, diagnosis, explanation, and transfer.
21. Complete an independent stakeholder lab and defend its selector, semantic, and accessibility decisions.
22. Revisit these states after delay in navigation, forms, responsive components, and cumulative projects.

## Required grading evidence

Relevant activities must require multiple forms of evidence:

- predicted match set before execution;
- actual matched elements after execution;
- specificity tuple and winning-rule explanation;
- changed DOM with preserved intended behavior;
- keyboard, pointer, and touch-capability cases;
- visible focus and forced-colors evidence;
- native role, label, checkedness, and submitted-value evidence;
- validation timing and text error recovery;
- non-color state distinction;
- reduced-motion behavior;
- generated-content accessibility boundary;
- valid and invalid selector diagnosis;
- changed-case output, causal repair, and design defense.

Keyword or selector presence alone cannot pass a substantial activity.

## Remaining blockers

- The remaining 22 blocks still require complete challenge-level inspection with zero guessed mappings.
- independently review the candidate maps and source corrections for subject accuracy;
- establish the supported browser and assistive-technology matrix for assessed selectors;
- approve the cumulative module/activity/step/check matrix before authoring;
- design original varied scenarios and explicit anti-duplication constraints;
- build runtime checks that operate real states rather than parse selector strings only;
- run instructional, assessment, accessibility, duplication, and representative-learner reviews;
- repair pilot findings before any activity becomes available;
- keep Lighthouse held until all content, migration, platform-wide duplication, editor, progress, navigation, and pilot work is complete.
