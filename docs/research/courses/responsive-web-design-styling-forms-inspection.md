# Responsive Web Design v9 Styling Forms inspection

Status: `source-inspected-candidate-review`
Reviewed: 2026-07-15
Pinned source: freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`
Target: original LEARN-IT-ALL instruction; source material is coverage and depth evidence only

## Decision

All seven Styling Forms source blocks are inspected challenge by challenge. They are eligible for bounded candidate mapping, not approval. The pinned material supplies frequent edit-and-preview contact, basic control sizing and color, pseudo-class contact, one custom-checkbox technique, two nominally independent forms, and rapid recognition questions. Those are useful inventory signals.

The module is not a complete or safe form-styling curriculum. Its 61-step registration workshop spends most of its sequence reteaching HTML controls after the source has already taught forms. It sends personal-looking learner data to an external demonstration endpoint, encodes a weak password pattern, misstates radio-button required behavior, preselects a required account choice, gives unsupported age boundaries, omits autocomplete and error recovery, and then prescribes fixed visual values without requiring focus, zoom, forced-color, submission, or recovery evidence. The contact-form lab checks markup and property presence but does not define a real submission outcome. The custom-checkbox workshop removes native appearance without restoring a focus indicator, then the supposed independent lab repeats the same control, selector, pseudo-element checkmark, and color-state recipe.

LEARN-IT-ALL adopts a native-controls-first contract. Semantic HTML, labels, instructions, names, values, autocomplete, validation, submission, and recovery must work before visual styling. Native appearance and `accent-color` are the default path. `appearance: none` is advanced work, not a harmless reset: it suppresses the user-agent appearance and requires the learner to preserve the control's visual identity, focus, checked, unchecked, mixed, disabled, invalid, forced-color, keyboard, pointer, touch, speech, and submission behavior. Evolving CSS Form Control Styling features remain a freshness watch and receive no production assessment requirement until specification maturity, browser support, Web Platform Tests, accessibility, and failure evidence are accepted.

The target activities will preserve high interaction frequency while changing what counts as evidence. Learners predict a state, operate the control, inspect submitted data and browser behavior, receive specific feedback, repair a cause, and retry a changed case. Workshops fade. Labs use different controls, stakeholders, data, layouts, and reasoning. Reviews require an attempt before explanation. Quizzes mix rapid interpretation with operated controls and diagnosis. Canonical answers and changed-case expectations remain server-side.

There is no module fallback, compatibility mapping, legacy generator, or publication shortcut. Every learner-facing explanation, example, scenario, starter, check, hint, solution, assessment, and project will be original. Independent subject, instructional, assessment, accessibility, security/privacy, duplication, browser-interoperability, and learner reviews remain blockers.

## Exact source inventory

| Source block | Type | Challenges | Prompts or checks | Exact observed scope |
| --- | --- | ---: | ---: | --- |
| `lecture-best-practices-for-styling-forms` | lecture | 3 | 9 prompts | text control presentation, placeholders, textarea resizing, focus/error examples, `appearance: none`, and vendor-specific picker styling |
| `workshop-registration-form` | workshop | 61 | 207 checks | HTML registration fields followed by prescribed page, form, control, fieldset, file input, and submit styling |
| `lab-contact-form` | lab | 1 | 24 checks | fixed contact form structure plus container, label, input, textarea, button, and hover styling |
| `workshop-game-settings-panel` | workshop | 16 | 91 checks | four checkboxes, appearance suppression, borders, checked paint, generated checkmark, and transition |
| `lab-feature-selection` | lab | 1 | 15 checks | feature cards using the same appearance suppression, checked paint, border, and generated checkmark pattern |
| `review-styling-forms` | review | 1 | 0 | short restatement of text control, focus, error, appearance, and special-input styling |
| `quiz-styling-forms` | quiz | 1 | 10 prompts | recognition of appearance, focus, error, placeholder, and browser-specific special-input styling |

Totals: seven blocks, 84 challenges, 19 question prompts, and 337 implementation checks. Exact challenge IDs, source paths, SHA-256 hashes, byte counts, section inventories, language evidence, prompts, and checks remain pinned in `references/freecodecamp-rwd-v9.json`.

The three lecture files contain 18,697 source bytes. The registration workshop contains 187,209 bytes. The contact lab contains 11,712 bytes. The settings workshop contains 43,597 bytes. The feature lab contains 8,815 bytes. The review and quiz contain 1,455 and 4,335 bytes. These measurements prove inventory identity only; they do not prove correctness, originality, pedagogy, retention, accessibility, or mastery.

## Current primary authorities

### HTML Living Standard

Sources:

- <https://html.spec.whatwg.org/multipage/form-control-infrastructure.html>
- <https://html.spec.whatwg.org/multipage/input.html>
- <https://html.spec.whatwg.org/multipage/form-elements.html>

Reviewed: 2026-07-15

Form presentation cannot be separated from the underlying form contract. Controls have names, values, dirty-value state, checkedness, selection, disabledness, form ownership, reset behavior, submission behavior, validation state, and autocomplete expectations. A visible control without a meaningful name and submitted value is not complete. A styled form that loses entered work or cannot explain and recover from an invalid submission is not complete.

Radio controls with the same form owner and name form a group. If any member of a radio group is required, the group has a missing-value failure while all members are unchecked. The benchmark's claim that `required` does not work for a radio group is false. Prechecking a personal account type avoids the browser failure but changes the user decision rather than teaching the actual validation model.

Input types are not merely different rectangles. They can expose different keyboards, editing models, pickers, constraints, validation, value sanitization, and platform presentation. Autocomplete tokens communicate the purpose of expected data. Select placeholder-label behavior, file selection, text-area editing, button behavior, and native constraint validation have distinct contracts. Styling must not erase those distinctions or imply that one visual implementation covers every control.

The target sequence therefore retrieves accepted HTML form work before introducing paint. A learner must first identify the control, label, instruction, expected value, autocomplete purpose, validation rule, submission name/value, error behavior, and recovery path. CSS activity then changes presentation while tests continue to operate that accepted behavior.

### CSS Basic User Interface Level 4

Source: <https://drafts.csswg.org/css-ui/>
Reviewed: 2026-07-15

The specification defines interface presentation including outlines, accent colors, appearance, cursors, resizing, and caret behavior. The target extracts several critical boundaries:

- an outline is a presentation mechanism commonly used for focus indication and does not consume layout space like a border;
- removing a user-agent outline without supplying an equally visible state can make keyboard location undiscoverable;
- `accent-color` gives an author a bounded way to influence compatible form-control accents while allowing the user agent to adjust the result for legibility and contrast;
- `appearance: none` suppresses the native appearance of a widget and can cause it to take a primitive appearance or disappear visually;
- suppressing appearance does not automatically author an equivalent checkbox, radio, select, file picker, range, date control, or other platform widget;
- broad resets such as `all: unset` can also suppress expected focus presentation and require intentional restoration;
- the draft says `appearance: base` is not ready to ship, so it is not a current production requirement merely because it appears in an Editor's Draft.

The target does not teach `appearance: none` as a beginner checkbox recipe. Learners first use native controls and `accent-color`, then inspect browser and platform variation. Later custom-control work begins with an explicit risk inventory and must pass the same observable behavior contract as the native version. If parity is not established, retaining native appearance is the correct outcome.

### CSS Form Control Styling Level 1

Source: <https://drafts.csswg.org/css-forms-1/>
Reviewed: 2026-07-15

This Editor's Draft explores more standardized control styling through `appearance: base`, control pseudo-elements, field sizing, and other exposed parts. It is useful as a freshness watch because it shows where the platform may be heading and prevents the curriculum from fossilizing vendor-prefixed trivia.

It is not an assessed authoring baseline. The document warns that it is changing and should not be cited as anything other than work in progress. It contains open issues, incomplete definitions, and features whose browser and accessibility behavior cannot be assumed. LEARN-IT-ALL will record maturity and implementation evidence at each review. Draft-only syntax will not be required in a learner artifact, included in a canonical answer, or represented as stable production practice until supported-browser, Web Platform Test, accessibility, and failure evidence pass.

### Selectors and pseudo-elements

Sources:

- <https://drafts.csswg.org/selectors/>
- <https://drafts.csswg.org/css-pseudo/>

Reviewed: 2026-07-15

Form styling uses state and structural pseudo-classes, attribute selectors, and form-related pseudo-elements. Those selectors match existing state or exposed fragments; they do not create the underlying state, label, validation, checkedness, or behavior. Generated `content` is not an accessible substitute for a required control name or error message. `::placeholder` styles a limited placeholder fragment and does not transform placeholder text into a persistent label. `::file-selector-button` is the standardized file-control button fragment and is more defensible than a lesson built around only a WebKit calendar-picker pseudo-element.

Learners must distinguish persistent instruction, entered value, placeholder hint, browser-provided validation, custom error content, generated decoration, and accessible name. A selector that happens to paint a checkmark cannot by itself prove checked state is perceivable or operable.

### WCAG 2.2 guidance

Sources:

- <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/reflow.html>

Reviewed: 2026-07-15

The target distinguishes conformance evidence from stronger product decisions:

- keyboard focus needs a visible indicator; hover paint is not a focus indicator;
- WCAG 2.2 Target Size (Minimum) uses a 24 by 24 CSS pixel minimum or defined spacing and exception conditions, while this platform's own learner interface uses a stronger 44-pixel target policy;
- an input error must be identified and described in text when automatically detected; a red border alone is not enough;
- labels or instructions must be provided when content requires user input, including expected formats and essential constraints;
- authored visual information required to identify controls and states can need non-text contrast evidence;
- zoom and narrow-width reflow must not hide controls, values, instructions, errors, or actions.

One screenshot cannot establish these outcomes. Activities must operate the form by keyboard and pointer, vary values and invalid states, zoom, change content, inspect forced colors, and verify that the same label, state, and recovery remain available.

## Challenge-by-challenge findings

### Three-part lecture

The lecture gives beginners several useful observations. It encourages readable font size and contrast, distinguishes placeholder styling from entered text styling, notes that textarea resizing matters, warns against removing focus styles without replacement, shows a textual error example, and acknowledges that `appearance: none` can remove default focus or error presentation. Those ideas deserve deeper practice.

The execution is incomplete and sometimes points learners toward the wrong default:

- Placeholder text is discussed primarily as a color target. The module never establishes that placeholder text is transient, can disappear after entry, is not a persistent label, and should not carry essential format or recovery instructions alone.
- Textarea resizing is mentioned, but the learner does not operate a long response at zoom, compare `resize` choices, encounter content clipping, or preserve an available resizing path.
- Error styling is a static HTML/CSS example. It does not connect native validity, submitted values, error timing, focus movement, error summary, inline association, corrected state, persistence, or retry.
- Focus styling appears as advice rather than a continuing gate. Neither workshop that follows contains a complete focus-state requirement.
- The custom-checkbox material makes cross-platform visual consistency sound like the primary success criterion. Platform familiarity, input behavior, forced colors, user preferences, and maintainability are not weighed against cosmetic sameness.
- The example uses advanced properties and positioning without verifying that the learner has the layout prerequisites or understands the lost native paint.
- The special-input lesson centers a vendor-specific `::-webkit-calendar-picker-indicator` fragment. Current instruction should begin from standardized and native behavior, supported-browser evidence, and progressive enhancement rather than browser-engine trivia.
- The conclusion suggests JavaScript libraries or custom controls because some native controls vary. A library is not a proof of accessibility or parity, and replacing a control can create more state, keyboard, localization, validation, zoom, touch, and maintenance obligations.

The nine questions are recognition checks attached immediately to the explanation. They do not require a learner to operate a control, predict native versus primitive appearance, identify submitted data, compare placeholder with label, repair a focus loss, validate a changed input, or defend a native-control decision.

### Registration-form workshop: 61 steps

The source sequence has two different activities compressed into one. Steps 1 through roughly 38 construct a registration form; only the final portion applies most of the styling. This duplicates earlier HTML forms instruction and delays the CSS learning objective.

Observed HTML progression includes:

1. Add a heading and introductory paragraph.
2. Add a form using `POST` with an external `https://register-demo.freecodecamp.org` action.
3. Add three fieldsets.
4. Add labels and text, email, and password inputs.
5. Mark controls required.
6. Apply a password pattern equivalent to eight or more lowercase letters or digits zero through five.
7. Add two radio choices and preselect one.
8. Add a terms checkbox and link.
9. Add file upload, age number, select, textarea, placeholders, names, and a submit control.

Observed CSS progression includes:

1. Set page background, foreground, fixed viewport height, width, margin, and a Tahoma font.
2. Center the heading and paragraph.
3. Constrain the form to `60vw`, a 300-pixel minimum, and a 500-pixel maximum.
4. Set margins and padding on fieldsets, labels, inputs, select, and textarea.
5. Remove most fieldset borders and give only one fieldset a legend.
6. Make controls full width, assign fixed minimum heights, and paint backgrounds, borders, and text.
7. Style the inline radio and checkbox exceptions.
8. Give the submit control minimum and percentage widths.
9. Adjust the file input and terms link.

Useful properties:

- the workshop accumulates one artifact across 61 small edits;
- many edits show immediate browser feedback;
- several input types, labels, choices, textarea, select, file, and submit controls appear together;
- basic responsive intent appears through minimum, maximum, and percentage sizing;
- attribute selection and structural pseudo-class syntax retrieve earlier CSS.

The target must not preserve the defects merely to retain density.

#### Incorrect, unsafe, or unsupported form guidance

- Sending learner-entered names, email addresses, passwords, ages, files, biographies, and account choices to an external demonstration host is not an acceptable local-first practice task. The platform must keep training data deterministic and local unless a separately reviewed external integration is essential, consented, minimized, and secured.
- A password pattern limited to lowercase letters and digits zero through five is weak and teaches an arbitrary composition rule as if it were a security standard. Beginner form validation may demonstrate syntax, but password policy must not encourage predictable restrictions or pretend client validation secures credentials.
- The workshop states that `required` will not work for a radio group and then prechecks one choice. The HTML Standard defines required radio-group behavior. Preselection changes the user decision and can bias a consequential choice.
- The age range from 13 to 120 is presented without stakeholder, jurisdiction, service, inclusion, or data-minimization rationale. Real requirements cannot be invented solely to demonstrate `min` and `max`.
- The terms control links to external content but does not establish what agreement is being made, whether acceptance is necessary, or how the user can review it. A compliance-looking checkbox is not automatically ethical or usable.
- Required markers, expectations, autocomplete purposes, privacy implications, file constraints, upload progress, errors, and recovery are absent.
- The form has no demonstrated confirmation, safe failure, duplicate-submission handling, saved state, reset consequence, or returned server validation.

#### Styling and responsive defects

- `height: 100vh` is prescribed on the body even though form content can exceed the viewport. The task never checks small viewport UI, zoom, browser chrome changes, long error text, translated labels, or onscreen keyboards.
- Full-width inputs are combined with padding and borders without first establishing a deliberate `box-sizing` model. This can create overflow and hides the causal sizing model.
- A `60vw` form with a fixed 300-pixel minimum can fail at high zoom or in narrow containers. The module never tests reflow.
- Visual values are literal recipes. Learners are rarely asked to choose a value from content needs, predict its effect, or inspect the containing block and used size.
- Removed fieldset borders weaken grouping without an alternative visible relationship. Two fieldsets have no legend. Visual style is treated independently from semantic and cognitive grouping.
- All labels become block boxes through one broad rule, but the module never evaluates long labels, instructions, optional indicators, inline choice groups, errors, or reading order.
- Control background and foreground colors are prescribed without measuring text, boundary, placeholder, focus, error, disabled, autofill, selected, or forced-color states.
- The submit control is styled for visual prominence but not for focus, pending, success, error, duplicate action, or disabled behavior.
- The only meaningful state work is required/checked HTML and static paint. There is no `:focus-visible` contract, validation state practice, autofill inspection, or user preference testing.

#### Pedagogical defects

- The workshop repeats HTML construction instead of retrieving a previously accepted form and spending the new cognitive budget on CSS.
- The learner is told the exact element, attribute, selector, property, and value for nearly every step. Support does not meaningfully fade.
- No step starts with a prediction or asks the learner to identify which existing behavior must remain.
- No deliberate near-miss asks the learner to diagnose overflow, missing focus, invalid grouping, lost submitted value, unreadable state, or failed autocomplete.
- The artifact contains personal and account data but no authentic stakeholder, privacy model, task success, or risk decision.
- The ending is another literal style adjustment, not independent reconstruction, changed-case proof, delayed retrieval, or defense.

The 207 checks are useful as low-level coaching only. They mostly inspect required elements, attributes, selectors, properties, or exact values. Passing them does not prove the form can be understood, completed, submitted, corrected, restored, or operated in changed environments.

### Contact-form lab

The lab starts from an empty body and asks for a container, heading, form, name and email fields, textarea, labels, required attributes, and submit button. It requires container and control presentation, button color, and a hover change. Twenty-four checks provide immediate feedback.

This is not yet an authentic independent lab:

- The form has no defined action, method, local handler, success state, failure state, returned validation, or saved outcome. A button press cannot prove task completion.
- Name and email data are requested without autocomplete purpose, privacy context, retention boundary, or stakeholder need.
- The requirements focus on the existence of widths, padding, colors, and border properties rather than a usable communication outcome.
- The supplied solution uses a gradient and Flexbox before the source sequence teaches Flexbox. A lab solution must not depend on untaught layout concepts.
- Fixed 300-pixel form width and `height: 100vh` are not tested at zoom, narrow containers, changed labels, or onscreen keyboards.
- The button has a hover state but no required focus, active, pending, disabled, success, or error state.
- There is no visible or programmatic error recovery requirement.
- The checks accept almost any color, width, and padding token and therefore cannot distinguish intentional design from arbitrary property presence.
- No learner explains label association, submitted names and values, validation behavior, focus order, or changed-case survival.

The target independent lab must use a different artifact from the guided workshop, define a local deterministic submission result, require safe data minimization, operate labels and validation, preserve values through correction, and test changed content and environments. It cannot pass through source-string presence.

### Game-settings workshop

The workshop builds four custom checkboxes inside a visual panel. It prescribes a 20-pixel square, removes native appearance, applies a border, changes checked paint, inserts a checkmark with `input:checked::after`, and adds `transition: all`. Ninety-one checks enforce the sequence.

This is a high-risk technique taught as a beginner visual recipe:

- Native checkbox paint is removed before the learner inventories what it provided.
- No explicit focus style is added after the reset.
- The 20 by 20 control is below the 24 by 24 CSS pixel minimum unless a valid spacing or equivalent target exception is proven. The module does not measure the label's combined target or exception conditions.
- Checked state relies on authored color and a generated checkmark. Forced colors, generated-content loss, high contrast, and background replacement are untested.
- `transition: all` is overbroad. It can animate properties that were not intended and gives no reduced-motion decision.
- Indeterminate, disabled, invalid, read-only applicability, form reset, default checkedness, submitted name/value, and persistence are absent.
- Keyboard Space operation, label activation, pointer target, touch target, speech targeting, and focus order are not exercised.
- A cursor change is treated as affordance, but a cursor does not create semantics or keyboard behavior.
- Exact paint resemblance receives more attention than task meaning or state evidence.

A target workshop can eventually teach custom checkbox presentation, but only after a native baseline and `accent-color` exercise. The learner must capture the native behavior contract, choose which appearance variation actually harms the stakeholder task, implement the smallest enhancement, and compare every state and input path against the baseline.

### Feature-selection lab

The lab requires feature cards containing checkboxes, appearance suppression, a border, checked background and border changes, and a generated checkmark. Its 15 checks mutate state and inspect the pseudo-element and colors. The supplied solution again uses a custom checkbox and additional layout/positioning mechanisms.

This is direct instructional duplication of the immediately preceding workshop:

- both artifacts are preference or feature panels;
- both use checkbox labels as the core interaction;
- both remove native appearance;
- both draw a square border;
- both use `:checked` to repaint the square;
- both add a checkmark with `::after` generated content;
- both use color and the same glyph as the state evidence;
- both are graded mostly through selector and computed-paint presence;
- neither proves focus, keyboard, label activation, touch, speech, submitted value, reset, disabled, indeterminate, forced-color, or recovery behavior.

Changing “game settings” to “feature selection” and wrapping the controls in cards does not create independent transfer. A learner can reproduce the workshop recipe with renamed classes. The lab must be replaced with a different control family and reasoning demand—for example, styling a native select, file control, or text-entry/error flow under a stakeholder constraint—while retrieving checkbox risk in a later debugging clinic.

The supplied solution also introduces Flexbox, media queries, absolute positioning, and vendor-prefixed appearance without establishing them as prerequisites. A canonical solution may not smuggle future concepts into an earlier lab and then count successful copying as mastery.

### Review

The review is a compact answer sheet. It repeats advice about font, contrast, placeholder, resizing, focus, error styling, appearance suppression, and special controls. It can serve as a reference after retrieval but is not retrieval practice because the information is exposed before the learner attempts to reconstruct or operate it.

The replacement review must:

- begin with an unprompted control-state inventory and form operation;
- retrieve earlier HTML labels, names, values, autocomplete, native validation, and recovery;
- compare native appearance, accent-color, bounded author styling, and full custom paint;
- require keyboard, pointer, touch, zoom, changed content, autofill, invalid, disabled, and forced-color checks;
- show a rejected source-shape near-miss and a behavior-level correction;
- route errors into targeted corrective practice, then reassess with a different control and value;
- schedule delayed retrieval in responsive layout, accessibility, projects, and the cumulative exam.

### Quiz

The ten questions mostly ask which property or pseudo-element matches the immediately preceding review. This can check a small amount of recognition but cannot certify form styling.

Weaknesses include:

- browser-engine trivia receives assessment weight while current standardized and native-first decisions do not;
- appearance suppression is recognized without requiring the learner to name or test the lost contract;
- focus and error questions remain declarative rather than operated;
- placeholder styling is tested without label persistence or entered-value behavior;
- no item checks submitted name/value, autocomplete purpose, radio group requirements, constraint validation, error identification, correction, or persistence;
- no item requires a changed control, platform, input method, zoom level, long label, forced-color mode, or failure condition;
- distractors can often be rejected by vocabulary shape rather than causal understanding;
- no learner diagnoses an overflow, invisible focus, color-only state, missing label, or external data leak.

The target assessment blueprint will include rapid interpretation, prediction, operated code, changed-case checks, error diagnosis, repair, and explanation. A passing learner must demonstrate both native control judgment and bounded styling skill.

## Exact candidate mapping

### Lecture

- `css-form-control-states`
- `css-box-sizing-models`
- `css-type-scale-line-height`
- `css-pseudo-classes`
- `css-focus-visible-indicators`
- `css-target-size-spacing`

### Registration workshop

- earlier HTML heading and paragraph structure
- form submission, labels and instructions, input types, choice groups, textarea, select, button, control states, and native validation
- CSS loading, type/class selectors, selector relationships, attribute selectors, and pseudo-classes
- display, box model, box sizing, intrinsic/extrinsic sizing, absolute/font/viewport units, and percentages
- backgrounds, borders, shadows, fonts, type scale, color, and form-control presentation

### Contact-form lab

- earlier HTML heading structure, form labels, input types, textarea, button, and native validation
- CSS loading, type/class selectors, pseudo-classes, box model, intrinsic/extrinsic sizing, backgrounds, borders, fonts, type scale, color, and form-control presentation

### Game-settings workshop

- earlier HTML heading structure, labels, checkbox input and choice-group behavior, and control states
- CSS loading, type/class and attribute selectors, pseudo-classes, pseudo-elements, box model, sizing, backgrounds, borders, color, form-control presentation, and transitions

### Feature-selection lab

- earlier HTML labels, checkbox input and choice-group behavior, and control states
- CSS loading, type/class and attribute selectors, pseudo-classes, pseudo-elements, box model, sizing, backgrounds, borders, color, and form-control presentation

### Review

- form-control presentation, box sizing, type scale, pseudo-classes, pseudo-elements, focus indication, and target sizing

### Quiz

- form-control presentation, type scale, pseudo-classes, pseudo-elements, and focus indication

These mappings identify source contact only. They do not claim the block completely or correctly teaches a mapped concept. The benchmark receives no credit for evolving CSS Form Control Styling features, full error recovery, forced-color parity, autofill operation, behavior-preserving custom controls, or secure local data handling merely because those are required in the target.

## Original cumulative learning sequence contract

The eventual LEARN-IT-ALL form-styling sequence must retrieve accepted HTML forms and earlier CSS models in this order:

1. Operate an unstyled native form and identify each control's label, instruction, purpose, expected value, name, submitted value, autocomplete purpose, validity, and recovery path.
2. Predict source, matched rule, computed value, user-agent contribution, and rendered state before changing presentation.
3. Apply inherited font and color deliberately while preserving browser and user style contributions.
4. Size text-entry controls through content, box model, `box-sizing`, intrinsic constraints, and available inline size rather than a fixed screenshot.
5. Test long labels, long entered values, translated instructions, error text, zoom, text spacing, narrow containers, and onscreen-keyboard conditions.
6. Distinguish persistent labels and instructions from optional placeholders; verify accessible name and description after entry.
7. Preserve textarea content and an available resizing or reflow path under long input and zoom.
8. Style fieldsets, legends, grouped choices, and required or optional indicators without removing semantic or visible grouping.
9. Style native text, email, number, date, select, textarea, file, checkbox, radio, and button controls only to the degree their supported interfaces permit.
10. Use `accent-color` for a bounded native checkbox and radio theme; compare user-agent contrast adjustment and platform variation.
11. Style normal, hover, focus-visible, active, valid, invalid, user-valid, user-invalid where supported, disabled, read-only, checked, mixed, selected, autofilled, pending, success, and failure states without color-only meaning.
12. Identify errors in text, associate them with controls, preserve entered values, move or retain focus intentionally, correct the cause, and resubmit successfully.
13. Inspect submitted local deterministic name/value pairs and reject a visually complete control whose data contract is missing.
14. Diagnose padding/border overflow through the box model and containing block, then prove the repair with changed content and zoom.
15. Diagnose an invisible focus indicator through cascade and paint evidence, then prove keyboard location on every actionable element.
16. Diagnose a low-contrast or color-only invalid state using actual adjacent colors and non-color evidence.
17. Compare native appearance with `appearance: none`; inventory exactly which visual, state, input, platform, and preference behavior disappears.
18. Build one bounded custom checkbox only after the native and accent-color versions pass, then restore visible identity, focus, unchecked, checked, mixed, disabled, invalid, forced-color, keyboard, pointer, touch, speech, label, reset, and submitted-value behavior.
19. Reject the custom version and retain native appearance if complete parity cannot be demonstrated.
20. Style standardized pseudo-elements such as `::file-selector-button` through progressive enhancement while preserving the complete native control.
21. Treat evolving CSS Form Control Styling syntax as observed research until the supported-browser and maturity gates explicitly accept it.
22. Complete a guided service-preference form with frequent prediction and feedback, then rebuild a different control family with faded prompts.
23. Repair a registration, file, validation, overflow, focus, and forced-color debugging clinic from causal evidence.
24. Complete an independent local form lab with a different stakeholder, data model, control mix, visual system, and submission outcome.
25. Retrieve form behavior and styling after delay in responsive layout, navigation, accessibility, projects, and every cumulative exam.
26. Pass a mixed assessment containing state prediction, operation, submitted data, changed cases, diagnosis, explanation, correction, security/privacy judgment, and unfamiliar transfer.

Every step continues enforcing semantic HTML, accessible names, keyboard use, safe local data, source order, zoom and reflow, contrast, non-color meaning, and behavior-level grading. Later layout modules retrieve the form inside Flexbox and Grid only after those mechanisms are taught; early canonical answers do not smuggle them in.

## Activity diversity contract

The activity family must not rename one appearance-none checkbox:

- **Theory and prediction:** compare native control states, submitted values, user-agent appearance, accent paint, pseudo-class matching, and box sizes before editing.
- **Worked example:** style an existing local appointment preference form while preserving labels, autocomplete, radio requirements, validation, and confirmation.
- **Guided workshop:** improve a public-library notification form with native controls, content-driven sizing, visible focus, errors, and local deterministic submission; prompts fade across control families.
- **Faded practice:** style a different volunteer-availability form from accepted semantics with learner-selected values and fewer hints.
- **Debugging clinic:** repair a fixed-width overflow, placeholder-only label, missing focus ring, color-only error, lost submitted name, external action, and appearance-none checkbox.
- **Independent lab:** create a community repair-request intake interface with minimized data, file constraints, clear recovery, saved values, and a local evidence receipt; it must not use the workshop's control mix or layout.
- **Retrieval review:** operate first, predict second, inspect third, correct the model, then retry with different controls and values.
- **Quiz:** combine short interpretation with code execution, state operation, submission inspection, changed-case diagnosis, and explanation.
- **Cumulative project:** defend form purpose, data minimization, native versus custom control choices, state system, responsive behavior, accessibility evidence, security boundaries, and remaining uncertainty.

Scenarios, stakeholders, content models, control families, data fields, starters, layout constraints, state sets, error cases, check types, hint paths, solutions, and required evidence must differ materially. A new color palette, noun, class name, or checkbox count is duplication.

## Required grading evidence

Relevant activities must require several of these evidence types, proportionate to stage:

- identified control, label, instruction, name, value, form owner, autocomplete purpose, and submission result;
- predicted user-agent appearance, authored rule, cascade winner, computed value, and rendered state;
- operated keyboard, pointer, touch, speech, label-activation, reset, and submission paths;
- checked, unchecked, mixed, selected, disabled, read-only, required, valid, invalid, autofilled, pending, success, and failure states;
- visible focus and current keyboard location for every actionable element;
- actual target-size or spacing evidence with the exact WCAG exception, if used;
- changed long label, long value, instruction, error, translation, zoom, text spacing, narrow container, and onscreen-keyboard survival;
- persistent accessible name and description after placeholder disappearance and value entry;
- error identification in text, control association, retained value, correction, and successful retry;
- submitted local deterministic data before and after a changed case;
- native appearance versus accent-color versus custom-paint comparison;
- explicit inventory of behavior suppressed by appearance none;
- forced-color, increased-contrast, light/dark, and generated-content-unavailable evidence;
- actual text, component, boundary, focus, and state contrast where relevant;
- non-color identification of required checked, invalid, selected, success, and failure meaning;
- causal diagnosis naming HTML contract, selector, cascade, box, paint, state, validation, submission, or user-preference failure;
- corrected behavior on a changed case, not only the original screenshot;
- privacy and data-minimization rationale for every requested value;
- progressive-enhancement decision and supported-browser evidence for non-native styling;
- design defense tied to stakeholder outcome and known evidence limits;
- delayed retention and unfamiliar transfer.

Keyword presence, a source regular expression, an exact border color, a generated checkmark, a hover screenshot, or resemblance to the supplied panel cannot pass a substantial activity.

## Anti-duplication and security boundaries

The game-settings workshop and feature-selection lab are one activity family, not two independent outcomes. The target keeps only the conceptual benchmark signal and replaces both learner experiences. A guided checkbox enhancement may exist after native controls; the independent lab must use different controls and a different evidence problem. Semantic similarity review must compare scenario, control family, state graph, code shape, required reasoning, check behavior, feedback, and artifact outcome rather than only prose tokens.

All practice submission stays same-origin and deterministic. Learner examples use synthetic or clearly fictional data. No practice form posts a password, personal file, birth date, biography, or other personal-looking value to an uncontrolled external endpoint. Canonical grading remains server-side. Client submissions are evidence, not truth. Browser preview remains sandboxed and cannot navigate the parent platform or execute learner source on the host.

Password input instruction distinguishes demonstrating HTML mechanics from creating a security policy. It does not teach restrictive composition recipes as protection. Terms, consent, age, identity, and eligibility requirements appear only when a researched stakeholder and legal/product decision makes them authentic; they are not arbitrary attribute demonstrations.

## Remaining blockers

- The remaining 10 source blocks still require complete challenge-level inspection with zero guessed mappings.
- Independent subject reviewers must verify the seven candidate maps, every technical correction, and the native-controls-first decision against current specifications and interoperable browser behavior.
- CSS Form Control Styling Level 1 remains a freshness watch; no draft-only feature may enter assessed production content without maturity, browser, test, accessibility, and failure evidence.
- Instructional and assessment reviewers must approve the complete concept-to-activity matrix, fading plan, retrieval schedule, misconception treatment, item blueprint, corrective routes, and anti-duplication evidence.
- Accessibility review must approve labels, instructions, accessible names and descriptions, keyboard and speech operation, focus, target sizes, zoom/reflow, errors, non-color states, forced colors, and representative assistive-technology tasks.
- Security and privacy review must approve local deterministic submission, synthetic data, file handling, password examples, consent patterns, saved values, reset, and recovery boundaries.
- Original scenarios, starters, checks, hints, feedback, solutions, and assessments are not yet authored.
- The first real HTML/CSS vertical slice must prove the single CodeMirror editor, sandboxed preview, parsed and computed diagnostics, local submission evidence, saved state, server-side canonical checks, correction, recovery, and tablet/desktop flow.
- Representative beginners and disabled learners must complete, correct, retain, and transfer the intended outcomes; internal inspection and generated inventory cannot substitute for observed evidence.
- All course modules and projects remain `planned-not-authored`; no content is available or published.
- Lighthouse remains held until content, migration, duplication, editor, progress, navigation, runtime, accessibility, and learner-pilot work is complete.
