# Responsive Web Design v9 CSS Colors inspection

Status: `source-inspected-candidate-review`
Reviewed: 2026-07-15
Pinned source: freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`
Target: original LEARN-IT-ALL instruction; source material is coverage and depth evidence only

## Decision

All five CSS Colors source blocks are inspected challenge by challenge. They are now eligible for bounded candidate mapping, not approval. The pinned material provides useful beginner contact with named, RGB, HSL, and hexadecimal notation; alpha; linear and radial gradients; borders; and shadows. The 89-step marker build also supplies the requested density of frequent edits and immediate preview changes.

That density is not equivalent to a complete color curriculum. Most steps prescribe one literal edit. The lecture and quiz conflate paint-wheel, emitted-light, syntax, device, perception, emotion, contrast, and accessibility claims. The workshop does not fade support or require prediction. The lab grades notation shape and fixed class names, introduces Flexbox and Grid in its supplied solution before those topics occur in the source sequence, and never proves that a learner can select, combine, composite, measure, debug, or defend colors in a real interface.

LEARN-IT-ALL will preserve the breadth and interaction frequency while replacing the evidence model. The target sequence distinguishes authored syntax, parsed value, color space, conversion, interpolation, gamut, alpha compositing, group opacity, generated images, painted output, adjacent rendered colors, user color overrides, and non-color meaning. It requires prediction, operation, inspection, measurement, changed backgrounds and states, causal repair, delayed retrieval, and independent design defense.

The exact candidate maps contain no module fallback or compatibility map. Every learner-facing explanation, scenario, starter, check, hint, solution, and assessment will be original. Independent subject, instructional, assessment, accessibility, duplication, browser-interoperability, and learner review remain blockers.

## Exact source inventory

| Source block | Type | Challenges | Prompts or checks | Exact observed scope |
| --- | --- | ---: | ---: | --- |
| `lecture-working-with-colors-in-css` | lecture | 6 | 18 questions | color-wheel terminology; named, RGB, HSL, and hex notation; alpha; linear and radial gradients |
| `workshop-colored-markers` | workshop | 89 | 162 checks | stylesheet loading; selectors; size and spacing; RGB, hex, HSL, alpha; linear gradients; inline-block; borders; box shadows |
| `lab-colored-boxes` | lab | 1 | 11 checks | five fixed boxes using requested notation forms and non-zero dimensions |
| `review-css-colors` | review | 1 | 0 | color-wheel terms, four notation families, alpha, shadows, linear gradients, and radial gradients |
| `quiz-css-colors` | quiz | 1 | 40 question prompts | two 20-item pools of recognition and syntax questions |

Totals: five blocks, 98 challenges, 58 question prompts, and 173 implementation checks. Exact challenge IDs, source paths, SHA-256 hashes, byte counts, section inventories, and language evidence remain pinned in `references/freecodecamp-rwd-v9.json`.

The six lecture files contain 33,956 source bytes. The marker workshop contains 162,257 bytes. The lab, review, and quiz contain 8,643, 6,992, and 9,071 bytes. These byte and step counts describe inventory only; they are not quality or mastery evidence.

## Current primary authorities

### CSS Color Level 4

Source: <https://drafts.csswg.org/css-color-4/>
Reviewed: 2026-07-15

The current Editor's Draft separates concepts that the benchmark often compresses:

- modern functional syntax separates components with whitespace and alpha with `/`; legacy comma syntax remains a separate compatibility grammar for older functions;
- `rgb()` and `rgba()` are aliases that accept the same modern or legacy forms; adding alpha does not require changing the function name;
- numeric and percentage components, alpha, missing components, parsed values, resolved values, used values, and serialized values are different concerns;
- named colors, system colors, `transparent`, and `currentColor` have distinct semantics and should not be reduced to a memorized count;
- HSL is an sRGB-derived cylindrical representation, not a perceptually uniform guarantee; hue is an angle with wrapping behavior, and some components become powerless in defined conditions;
- Lab, LCH, Oklab, Oklch, and predefined color spaces such as Display P3 expand the model beyond named, hex, RGB, and HSL notation;
- a syntactically valid color may be outside the destination device gamut and require gamut mapping;
- alpha is composited with painted layers, while the `opacity` property applies a post-processing operation to the rendered element and descendants as a group;
- interpolation space, missing components, alpha premultiplication, and hue path affect intermediate colors;
- color alone must not be the sole means of conveying required information.

The draft links an implementation report and Web Platform Tests. Draft text is technical scope, not proof that every assessed feature works in the supported browser matrix. Each modern notation, interpolation form, and output condition needs current interoperability evidence before publication.

### CSS Color Level 5

Source: <https://drafts.csswg.org/css-color-5/>
Reviewed: 2026-07-15

Level 5 defines evolving ways to derive colors. `color-mix()` has percentage normalization, alpha consequences, a processing space, and optional hue-path behavior. Relative color syntax begins from an origin color, converts it to the function's processing space, exposes component keywords, and allows math over those components. These are not simple string substitutions.

The target graph therefore adds `css-derived-color-functions` as an explicit modern extension. The pinned v9 material receives no credit for it. The target will not assess draft-only syntax until the supported-browser decision, tests, and authoring status are recorded. A plausible swatch or accepted declaration is not proof that a mix is perceptually appropriate, inside gamut, accessible, or equivalent under changed input.

### CSS Images Level 4

Source: <https://drafts.csswg.org/css-images-4/>
Reviewed: 2026-07-15

Gradients are generated CSS images. They are not HTML `img` elements and do not enter the DOM as image elements. Linear, radial, conic, and repeating forms have geometry, sizing, color-stop lists, stop fixup, interpolation spaces, and hue paths. A color stop identifies a color at a position; it is not simply the place where one color “ends.” Omitted positions are resolved by defined algorithms rather than a universal visual recipe.

The current draft includes explicit interpolation-space syntax and an evolving default. The target must distinguish normative draft direction from interoperable current browser behavior. Learners will predict geometry and intermediate color, inspect changed cases, and keep required content out of presentational background images.

### CSS Color Adjustment Level 1

Source: <https://drafts.csswg.org/css-color-adjust/>
Reviewed: 2026-07-15

`color-scheme` declares supported schemes and affects browser-provided controls and system colors. Forced-colors mode can replace authored color components with a user palette. System color pairs have contextual meaning; arbitrary pairings do not guarantee contrast. Global `forced-color-adjust: none` is not an acceptable way to preserve branding at the expense of user needs.

Color work is incomplete until browser controls, focus, states, content, borders, and required distinctions survive light, dark, forced-color, and relevant preference conditions.

### WCAG 2.2 and supporting guidance

Sources:

- <https://www.w3.org/TR/WCAG22/>
- <https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html>

Reviewed: 2026-07-15

The target distinguishes at least these claims:

- required information, action, response, and visual distinction cannot depend on color alone;
- text contrast is evaluated against the actual adjacent background under the applicable criterion and text conditions;
- required component boundaries, graphical objects, and authored focus indicators can require non-text contrast evidence;
- one passing palette pair does not prove hover, focus, active, disabled, error, gradient, alpha, image, or changed-background states;
- WCAG conformance is not proof of overall usability, color preference, brand quality, emotional effect, or learner understanding.

Complementary, analogous, triadic, or monochromatic placement on a color wheel does not establish a WCAG contrast ratio. Contrast must be calculated or measured from the colors that are actually adjacent after compositing and user-agent adjustments.

## Challenge-by-challenge findings

### Six-part lecture

Useful source coverage:

- introduces a vocabulary for palettes and color relationships;
- gives editable examples for named, RGB, HSL, hex, alpha, linear-gradient, and radial-gradient syntax;
- distinguishes modern space-separated HSL from legacy comma-separated HSL;
- explains three- and six-digit hexadecimal notation;
- mentions that gradients behind text still need sufficient contrast;
- ends each challenge with three rapid recognition questions.

Required technical corrections and expansions:

- “primary,” “secondary,” and “tertiary” colors depend on the selected color model and medium. Red-yellow-blue paint-wheel claims cannot be presented as universal and then silently replaced with emitted-light RGB primaries.
- The claim that all other colors derive from three paint primaries is too broad. A model has a bounded gamut, and physical mixtures, emitted light, perception, and CSS coordinates are not interchangeable.
- Warm and cool colors do not universally cause fixed emotions such as coziness, serenity, or professionalism. Context, culture, content, adaptation, individual perception, and research evidence matter. These statements can be design hypotheses, not grading facts.
- Complementary placement may create hue difference but does not guarantee readable text or component contrast. “High contrast” needs an explicit definition and measurement target.
- A fixed count of named colors is brittle and obscures aliases, system colors, `transparent`, and `currentColor`. Learners need lookup, parsing, and semantic-use skills instead of count recall.
- RGB numeric channels are not percentages of “saturation.” Legacy `0` through `255`, percentage channels, modern whitespace syntax, optional alpha, clamping, resolution, and serialization need distinct examples.
- RGB does not produce every color a learner can see on every screen. CSS color space, destination gamut, display capability, calibration, surrounding light, and vision all affect output.
- `rgba()` is not the only RGB function that accepts alpha. Current `rgb()` and `rgba()` are aliases, and modern syntax uses `/` for alpha.
- HSL hue has angle and wrap behavior, not a memorized maximum of 360. Saturation and lightness are not perceptually uniform controls, and `50%` lightness is not a universal “normal tone.”
- At zero saturation, hue is powerless; at extreme HSL lightness, hue and saturation do not change black or white. Assessments should make learners explain those changed cases.
- Four- and eight-digit hexadecimal alpha forms are absent from the lecture even though the workshop later requires eight-digit hex.
- `opacity` and per-color alpha are not interchangeable. Group opacity includes descendants and changes compositing as a rendered group.
- A gradient function creates a CSS image value, not an image element. DOM, accessibility-tree, generated-image, and semantic-content boundaries must remain explicit.
- Linear and radial examples omit conic and repeating gradients, hard stops, transition hints, double-position stops, stop fixup, interpolation space, hue path, multiple background layers, and failure behavior.
- The lecture tells learners that gradients add depth and interest but does not require a stakeholder need, restrained use, rendering evidence, or a non-gradient path for required information.

The 18 lecture questions mostly ask which word or syntax form matches the preceding explanation. They do not require a learner to predict a parsed value, compare spaces, composite alpha, calculate contrast, inspect output gamut, diagnose an invalid declaration, or choose a color strategy for a changed user need.

### Colored-marker workshop: 89 steps

The workshop progression is exact:

1. Steps 1–15 link a stylesheet, add one heading and three empty marker `div` elements, create class selectors, set dimensions and margins, and assign named colors.
2. Steps 16–30 prescribe RGB values for black, white, primary, secondary, and tertiary swatches.
3. Steps 31–35 place complementary colors together, move red against black, and briefly discuss attention.
4. Steps 36–43 rename classes and convert the marker colors to RGB, hex, and HSL notation.
5. Steps 44–64 construct three fixed linear gradients with exact directions, stops, and color literals.
6. Steps 65–80 add empty cap and sleeve elements, compare group opacity with alpha, switch to `rgba()`, use `inline-block`, and add a double border.
7. Steps 81–89 add exact box-shadow offsets, blur, spread, and named, RGB-alpha, hex-alpha, or HSL-alpha colors.

This provides frequent source-to-preview contact, useful repetition of syntax, and visible accumulation. It also demonstrates why raw step count cannot be the target quality measure.

Pedagogical defects the target must not repeat:

- Almost every step names the exact selector, property, function, channel, and literal. The learner performs transcription more often than prediction or selection.
- Support does not fade. Step 89 is still a literal-by-literal instruction, so the workshop never establishes independent construction.
- The same three empty rectangles carry nearly the entire color sequence. Repeated edits increase step count without varied contexts, users, content, or evidence.
- No learner states a hypothesis before preview, compares the result to a prediction, inspects computed color, or explains an unexpected result.
- No deliberate near-miss requires debugging invalid syntax, a cascade conflict, a changed layer, out-of-gamut output, an unreadable state, or a forced-color failure.
- Previously learned semantic HTML and accessibility are not meaningfully retrieved. Empty `div` elements are acceptable as decoration, but the workshop never asks the learner to establish that boundary.
- The project provides no purpose beyond visual resemblance and no stakeholder acceptance criteria. Realistic marker appearance is subjective and cannot validate color competence.
- The workshop ends immediately after the final literal. It has no faded reconstruction, changed case, delayed retrieval, self-explanation, independent extension, or transfer task.

Technical defects and misleading shortcuts:

- Class order in an HTML `class` attribute does not decide which class styles win. The workshop implies that styles of the first listed classes may be overridden by later listed classes; cascade order and specificity control the result.
- `margin: auto` assigns auto to all sides, but auto block-axis margins in ordinary flow do not vertically center the marker. The observed horizontal centering depends on used inline-axis margins and a constrained width.
- The RGB lesson calls `255` “100%” of a color and equates it with saturation. A channel coordinate and HSL saturation are different models.
- “Complementary colors combine to gray” depends on model, mixing method, proportions, and processing space. It is not a universal CSS operation.
- The workshop says `linear-gradient()` creates an image element. It creates a CSS generated image value and no DOM element.
- Color-stop prose says a stop is where a color ends and transition begins. Actual stop and interpolation behavior requires positions, fixup, and the surrounding stop list.
- The `background` shorthand is introduced only to hold a gradient without warning that it resets other background longhands.
- The source says a new block `div` takes the entire marker width and pushes the sleeve down. At that point the cap already has an explicit width. The stacking is caused by block-level layout, not the cap consuming the full width.
- Borders do not have a universally black implicit color. Initial `border-style` is `none`, and the color behavior is tied to `currentColor`; the current context happens to appear black.
- Group `opacity` affects the sleeve and its descendants as one rendered group. Color alpha affects only that color's contribution. The workshop shows the visual change without requiring the learner to predict this distinction.
- `rgba()` and `hsla()` are treated as required alpha functions even though current syntax permits alpha in `rgb()` and `hsl()` and defines the older names as aliases.
- Shadows are visual paint and do not establish elevation semantics, clickable behavior, focus, contrast, or layout size. None of those boundaries is tested.

The 162 checks mostly enforce exact source structure or literal values. They are appropriate as immediate coaching checks for a tightly guided example, but insufficient as module evidence. The target can use precise checks during early modeling while requiring later behavioral and explanatory evidence that cannot be passed by copying the next token.

### Colored-box lab

The lab begins from an HTML skeleton and asks for a fixed `.color-grid`, five `div` children, shared `.color-box` classes, numbered classes, non-zero dimensions, one hex color, one RGB color, one named color, one HSL color, and any fifth background color.

Useful source properties:

- the learner starts with empty HTML body and CSS rather than a nearly complete solution;
- notation forms are retrieved without step-by-step prompts;
- eleven automated checks provide immediate completion feedback;
- one computed check rejects zero-width and zero-height boxes.

Why this is not an independent color lab:

- The stakeholder goal is “designing boxes,” so the task has no meaningful content, state, decision, or usability outcome.
- Fixed class names and notation categories dominate the rubric. A learner can pass without understanding equivalent colors, compositing, contrast, gradients, output, or accessibility.
- The source check for hexadecimal notation uses a regular expression with an empty alternative. The grading model is source-shape matching rather than parsed CSS validity and computed behavior.
- RGB and HSL regular expressions implement partial grammars. They cannot stand in for the CSS parser and can accept or reject forms differently from the platform.
- The named-color check maintains a duplicated hard-coded list and treats string membership as the outcome. It does not prove a valid computed color or an intentional semantic role.
- “Set width and height” accepts arbitrary declarations; the non-zero check observes one current preview only. There is no long content, zoom, narrow container, text-spacing, or changed-writing-mode evidence.
- `.color5` only needs a nonempty background declaration. The requirement does not define why the color exists or what evidence would make it correct.
- Empty colored boxes cannot test text contrast, component boundaries, focus indication, status communication, or non-color meaning.
- No prediction, rationale, debug path, correction, reflection, delayed retrieval, or transfer is required.
- The supplied solution introduces `display: flex`, Grid, `repeat()`, `auto-fill`, `minmax()`, and `fr` before the benchmark teaches Flexbox and Grid. That breaks prerequisite order and makes the canonical solution depend on untaught concepts.
- The solution's fixed 100-pixel boxes sit inside 150-pixel minimum tracks without explaining track sizing, alignment, or the unused space.

The target lab must use a different stakeholder and artifact from the guided workshop. It must start from accepted content and semantic structure, require learners to define meaningful color roles, preserve non-color state cues, measure actual contrast, operate light/dark/forced-color conditions, inspect alpha or gradients against changed backgrounds, and defend decisions. Layout requirements must use only already-taught concepts or explicitly retrieve them.

### Review

The review is a readable reference sheet with embedded examples. It covers the lecture vocabulary plus shadows and gradient syntax from the workshop. It can support lookup during practice, but it is not retrieval practice because the answers are shown before any attempt.

Required replacement behavior:

- begin with an unprompted prediction and short implementation sample;
- interleave earlier CSS loading, cascade, box paint, semantic HTML, and accessibility rather than repeat one module's headings;
- compare modern and legacy syntax without making aliases separate conceptual models;
- include alpha versus opacity, actual composite background, gamut, interpolation space, currentColor/system colors, and user overrides;
- ask learners to diagnose rejected and accepted near-misses;
- route each failure to a targeted correction task and then reassess with changed values;
- schedule delayed retrieval in forms, navigation, responsive components, and projects.

### Quiz

The file stores two 20-item pools while its learner text says 18 of 20 are required. Most prompts ask for a term, a channel limit, or recognition of one valid-looking string. Several items encode obsolete or incomplete models:

- “CMYK cannot be used in CSS” ignores the evolving `device-cmyk()` specification and reduces a support/maturity question to a timeless syntax fact;
- “which function allows transparency” credits only `rgba()` even though modern `rgb()` and `hsl()` accept alpha;
- “maximum hue value” credits 360 even though hue is an angle with wrapping behavior rather than a bounded maximum;
- a black HSL answer uses arbitrary hue and saturation without asking why those components are powerless at zero lightness;
- “unlimited” gradient stops ignores grammar, implementation resources, maintainability, and the actual evidence a learner should provide;
- color-wheel emotion and harmony items assess broad aesthetic generalizations as fixed facts;
- malformed distractors are often easy to reject without understanding the valid form;
- no item requires calculating alpha compositing, actual contrast, gradient geometry, interpolation, gamut mapping, computed output, forced colors, or non-color meaning;
- no item requires source-to-output diagnosis, repair, or defense.

The target assessment will use a blueprint across recall, interpretation, application, analysis, diagnosis, and transfer. Some rapid questions remain useful, but passing requires operated code and explanations. Canonical answers and changed-case expectations remain server-side.

## Exact candidate mapping

### Lecture

- `css-color-spaces-alpha`
- `css-contrast-noncolor-meaning`
- `css-gradients-background-images`
- `css-backgrounds-borders-shadows`

### Colored-marker workshop

- earlier HTML heading structure
- CSS loading, rule anatomy, type/class selectors, display, box model, and intrinsic/extrinsic sizing
- `css-color-spaces-alpha`
- `css-gradients-background-images`
- `css-backgrounds-borders-shadows`

### Colored-box lab

- CSS loading, class selectors, and intrinsic/extrinsic sizing
- `css-color-spaces-alpha`

### Review

- `css-color-spaces-alpha`
- `css-gradients-background-images`
- `css-backgrounds-borders-shadows`

### Quiz

- `css-color-spaces-alpha`
- `css-gradients-background-images`

The lecture's brief accessibility mention is bounded candidate contact with contrast and non-color meaning, not evidence that it teaches measurement or accessible application. The workshop, lab, review, and quiz do not receive contrast credit merely because they show colors.

`css-derived-color-functions` is an explicit modern extension with zero pinned-v9 credit. These mappings identify source contact only. They do not establish correctness, depth, retained skill, independent transfer, or publication readiness.

## Original cumulative learning sequence contract

The eventual LEARN-IT-ALL sequence must retrieve stylesheet loading, rule anatomy, selectors, cascade, box paint, semantic HTML, and basic accessibility in this order:

1. Identify the content, action, state, and information that color may support but may not carry alone.
2. Predict which foreground, background, border, and generated-image layers paint each relevant region.
3. Apply named color and inspect declared, computed, used, and rendered evidence without memorizing a keyword count.
4. Compare equivalent sRGB colors in hex, modern RGB, legacy RGB, and named forms; explain where textual equivalence stops.
5. Convert bounded channel examples between decimal, percentage, and hexadecimal representations.
6. Diagnose invalid tokens, mixed grammar, clamped channels, shorthand errors, and cascade losses through the CSS parser and DevTools.
7. Model HSL as a cylindrical transform of sRGB, predict hue wrapping and powerless-component cases, and reject perceptual-uniformity assumptions.
8. Compare HSL with Oklab/Oklch or another current perceptual space using changed lightness and chroma tasks.
9. Distinguish sRGB, wider predefined spaces, valid out-of-gamut values, destination output, and gamut mapping.
10. Predict alpha compositing over two changed backgrounds before preview, then calculate or inspect the result.
11. Compare per-color alpha with group opacity when descendants and overlapping layers change.
12. Use `currentColor`, paired system colors, and inherited foreground evidence in an unfamiliar component.
13. Build linear-gradient geometry from direction, line, stop positions, and omitted-position rules.
14. Compare radial, conic, and repeating gradient purposes without encoding essential content in generated images.
15. Predict and inspect hard stops, multiple-position stops, alpha interpolation, explicit color spaces, and hue paths.
16. Diagnose a gradient whose intermediate colors, changed image, or alpha layer makes text unreadable.
17. Measure text, component, graphical-object, and focus evidence against the actual adjacent rendered colors.
18. Replace color-only status with text, shape, position, pattern, semantics, or another task-appropriate cue.
19. Operate the same component in normal, hover, focus, active, disabled, error, light, dark, increased-contrast, and forced-color conditions.
20. Derive a bounded color variant with `color-mix()` or relative syntax only after supported-browser evidence is accepted; explain processing space and changed input.
21. Complete a guided status component with frequent prediction and feedback, then rebuild a different component with faded prompts.
22. Repair an alpha, contrast, cascade, gamut, and forced-color debugging clinic using causal evidence.
23. Complete an independent stakeholder lab with original semantic roles, palette constraints, measurements, non-color evidence, and a written defense.
24. Retrieve color and paint models after delay in forms, navigation, data presentation, responsive states, and each cumulative project.
25. Pass a mixed assessment containing prediction, implementation, changed cases, diagnosis, calculation, explanation, correction, and transfer.

No step may introduce Flexbox, Grid, custom properties, media queries, or another untaught mechanism merely because a supplied solution finds it convenient. When those skills become prerequisites later, color is retrieved through the new mechanism rather than retroactively hidden in an earlier answer.

## Activity diversity contract

The target activity family must not rename one colored-box exercise:

- **Theory and prediction:** compare parsed values, coordinate spaces, powerless components, compositing trees, and actual adjacent colors.
- **Worked example:** inspect a compact content component with semantic color roles and a visible non-color state cue.
- **Guided workshop:** build a public-service status panel from already accepted HTML, with frequent but fading feedback and changed states.
- **Faded practice:** style an unrelated document-review indicator with learner-selected notation and fewer prompts.
- **Debugging clinic:** repair a translucent overlay, unreadable gradient region, missing focus boundary, and forced-color disappearance from evidence.
- **Independent lab:** create a small scheduling or resource interface whose roles, states, palette, and measurements come from stakeholder constraints rather than fixed swatches.
- **Retrieval review:** answer first, inspect second, correct the model, then retry with different colors and layers.
- **Quiz:** mix rapid interpretation with code execution, contrast/compositing calculations, and diagnosed distractors.
- **Cumulative project:** defend color roles, schemes, output limits, accessibility, and uncertainty within a larger responsive system.

Scenarios, starters, content models, state sets, palettes, layout constraints, check types, hint paths, and required evidence must differ materially. A changed noun, hex literal, or number of rectangles is duplication.

## Required grading evidence

Relevant activities must require several of these evidence types, proportionate to stage:

- predicted matched rule and winning declaration before preview;
- parsed or computed color and rejected invalid declaration;
- identified color space and component meaning;
- equivalent and deliberately non-equivalent notation comparison;
- hue wrapping or powerless-component explanation;
- predicted and actual composite color over changed layers;
- group-opacity versus color-alpha output;
- gradient line or radial geometry, stop list, fixup, and interpolation prediction;
- changed interpolation space or hue-path output;
- valid versus displayed gamut evidence;
- actual foreground/background, component, graphical-object, and focus measurements;
- normal, interaction, error, disabled, light, dark, and forced-color states;
- non-color identification of required meaning;
- styles-disabled or generated-image-unavailable task completion;
- changed content, narrow container, zoom, and text-spacing survival;
- causal diagnosis naming source, cascade, processing, paint, compositing, or user-adjustment failure;
- corrected behavior on a changed case, not only the original example;
- design rationale tied to stakeholder need and known evidence limits;
- delayed retention and unfamiliar transfer.

Keyword presence, a notation-matching regular expression, a screenshot of attractive swatches, or visual similarity to a marker cannot pass a substantial activity.

## Remaining blockers

- The remaining 16 source blocks still require complete challenge-level inspection with zero guessed mappings.
- Independent subject reviewers must verify the five candidate maps and every technical correction against current specifications and interoperable browser behavior.
- The new `css-derived-color-functions` modern extension needs a supported-browser and Web Platform Test decision before assessed authoring.
- Instructional and assessment reviewers must approve the full concept-to-activity matrix, fading plan, retrieval schedule, misconception treatments, item blueprint, and corrective routes.
- Accessibility review must approve contrast procedures, non-color state evidence, forced-color behavior, output conditions, and representative assistive-technology tasks.
- Original scenarios, starters, checks, hints, solutions, and anti-duplication constraints are not yet authored.
- The first real HTML/CSS vertical slice must prove the single CodeMirror editor, sandboxed preview, parser/computed diagnostics, saved evidence, server-side canonical checks, recovery, and tablet/desktop flow.
- Representative beginners and disabled learners must complete and retain the intended outcomes; generated inventory and internal review cannot substitute for observed evidence.
- All course modules and projects remain `planned-not-authored`; no content is available or published.
- Lighthouse remains held until content, migration, duplication, editor, progress, navigation, runtime, accessibility, and learner-pilot work is complete.
