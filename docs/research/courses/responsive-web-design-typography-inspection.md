# Responsive Web Design Typography source inspection

Reviewed: 2026-07-16

Status: complete direct inspection; candidate curriculum evidence only

## Decision

All five pinned Typography blocks are inspected challenge by challenge. They establish benchmark breadth and practice volume, but they are not safe target lessons. LEARN-IT-ALL will preserve the useful scope, exceed the interaction depth with original work, and replace the source sequence, prose, scenarios, code, checks, solutions, and assessment items.

Typography will be taught as rendered language and interface behavior, not a list of font names and pixel recipes. Learners must connect semantic content, font selection, glyph and language coverage, synthesis, licensed delivery, network and privacy behavior, font metrics, line boxes, responsive scale, measure, wrapping, spacing, decoration, contrast, zoom, reflow, and user overrides. A screenshot matching one fixed specimen is not mastery evidence.

The 68-step Nutrition Facts imitation is not a neutral design exercise. It copies the appearance and content hierarchy of regulated consumer information while reducing it to generic `div`, `p`, `span`, fixed-width, negative-margin, and tiny-text instructions. The replacement will not use a regulated label as aesthetic tracing practice.

## Inspected source boundary

The inspection covers five source blocks from freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`:

| Source block | Type | Challenges | Question prompts | Implementation checks | Source bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| `lecture-working-with-css-fonts` | lecture | 7 | 21 | 0 | 53,511 |
| `workshop-nutritional-label` | workshop | 68 | 0 | 227 | 182,028 |
| `lab-newspaper-article` | lab | 1 | 0 | 30 | 10,650 |
| `review-css-typography` | review | 1 | 0 | 0 | 10,045 |
| `quiz-css-typography` | quiz | 1 | 40 | 0 | 12,748 |
| **Total** |  | **78** | **61** | **257** | **268,982** |

Every source file was read from the pinned checkout. Checkout HEAD matched the recorded upstream commit. `references/freecodecamp-rwd-v9.json` remains the exact evidence record for file paths, source order, challenge IDs, SHA-256 hashes, byte counts, section names, prompt counts, checks, and code-language evidence.

Direct inspection is not independent subject review, instructional approval, assessment validation, learner-flow verification, legal approval, accessibility evidence, retention proof, or publication permission.

## Current primary evidence

Technical and behavior claims are bounded by:

- [CSS Fonts Module Level 4](https://www.w3.org/TR/css-fonts-4/), W3C Working Draft dated 22 April 2026;
- [CSS Font Loading Module Level 3](https://www.w3.org/TR/css-font-loading/), W3C Working Draft dated 6 April 2023;
- [CSS Text Module Level 4](https://www.w3.org/TR/css-text-4/), W3C Working Draft dated 8 June 2026;
- [CSS Text Decoration Module Level 4](https://www.w3.org/TR/css-text-decor-4/), W3C Working Draft dated 4 May 2022 plus the current Editor’s Draft;
- [CSS Inline Layout Module Level 3](https://www.w3.org/TR/css-inline-3/), W3C Working Draft dated 18 December 2024;
- [WOFF File Format 2.0](https://www.w3.org/TR/WOFF2/), W3C Recommendation dated 8 August 2024;
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and current WAI guidance for text contrast, resize, reflow, text spacing, semantic headings, and content structure;
- [FDA Nutrition Facts guidance](https://www.fda.gov/food/nutrition-facts-label/whats-nutrition-facts-label) to identify the workshop artifact as regulated information rather than a generic graphic.

CSS Fonts defines face selection, family fallback, generic mappings, matching by width, style, and weight, character-cluster support, synthesis, features, variations, source descriptors, display behavior, metric overrides, and privacy considerations. CSS Text defines language-aware transformation, white-space processing, wrapping, line breaking, hyphenation, alignment, spacing, and indentation. CSS Inline defines line boxes, baselines, and `line-height`. CSS Text Decoration defines ordered decoration and shadow painting plus ink overflow. WOFF2 defines a recommended compressed web-font container, not an end-to-end delivery policy.

Most CSS sources are Working Drafts. Their maturity, open issues, interoperability, and linked Web Platform Tests must be tracked. Draft-only syntax does not become a beginner production requirement merely because it appears in a current specification.

## Source-family findings

### Practice volume hides low decision density

The source family contains seven theory challenges, 68 guided workshop steps, one lab, one review, and two 20-item quiz pools. This confirms that typography needs a substantial learning sequence. It does not prove the source develops independent performance.

The workshop tells learners exactly which element, class, property, and literal value to add at nearly every step. Many steps add another nutrient line or move a value through a nested `span`. The lab prescribes exact classes, units, sizes, weights, transforms, indentation, and first-letter styling. The review is a reference page. Most quiz questions reward vocabulary and syntax recognition.

The learner rarely has to:

- choose a type system from content, language, and task needs;
- predict which face actually renders;
- inspect requested, matched, loaded, fallback, or synthesized fonts;
- diagnose slow or failed font delivery;
- compare fallback metrics and layout movement;
- test a real hierarchy at long content, translation, zoom, or spacing overrides;
- distinguish semantic structure from visual type hierarchy;
- explain line-box or wrapping behavior;
- choose between local, self-hosted, and third-party delivery;
- defend a font license, subset, source, privacy boundary, or payload;
- remove a decorative effect that reduces readability;
- transfer typography decisions to an unfamiliar component.

Step count is inventory. The target must raise decision, prediction, inspection, diagnosis, correction, and transfer density.

### “Web-safe” is treated as cross-platform consistency

The source says named “web-safe” fonts are very likely to appear consistently across operating systems and browsers and can improve accessibility because they are simple and easy to read. This collapses several separate questions:

- Which installed faces does the user agent expose?
- Which local alias matches a family name?
- Which exact face matches requested width, style, and weight?
- Does the face contain and correctly shape every required cluster?
- Which generic family has the user or platform selected?
- Does fallback change x-height, advance widths, line breaks, controls, or layout?
- Does the reader find the face legible for this language and task?

CSS Fonts explicitly leaves the installed-font set variable and permits user-agent privacy restrictions. Generic mappings can vary by platform, locale, and user preference. Arial, Times New Roman, Georgia, Verdana, and Trebuchet MS are not production guarantees. “Web-safe” can be useful historical vocabulary, but it cannot be the target mental model.

The replacement teaches ordered families, generic roles, actual rendered-face inspection, cluster fallback, language coverage, synthesis, and changed-platform evidence. A system stack can avoid a font download; it still does not guarantee identical typography.

### Serif versus sans-serif is overgeneralized

The source repeatedly describes sans-serif faces as easy to read on screens and serif faces as commonly for print. The quiz asks why sans-serif is generally easier on screens and accepts “simple and clean lines.” This is not an adequate accessibility rule.

Legibility and reading comfort depend on specific face design, size, x-height, stroke contrast, spacing, rendering, script, language, visual condition, content type, reader familiarity, and context. Category alone does not establish a passing choice. Decorative, script, serif, sans-serif, and monospaced categories also contain enormous internal variation.

The target lets learners identify visible anatomy and category without turning category into a universal prescription. Typeface selection must be tested with representative content, required scripts, user settings, and changed environments.

### Font matching stops at the family list

The family lecture correctly notes that fallback can happen per character. It does not build the complete author model. Missing or materially incomplete behaviors include:

- family matching and generic resolution;
- width, style, and weight matching order;
- requested values versus available faces;
- real italic versus oblique synthesis;
- synthetic bold, small caps, and position forms;
- cluster and combining-character matching;
- required shaping data for scripts;
- language-specific glyph selection;
- font-feature resolution;
- user-agent and user control of installed-font exposure;
- inspecting which face rendered each run.

The source examples name `Arial` and `Lato` without quoting or providing Lato, then imply deterministic fallback. Target activities must vary requested weight, italic, glyph coverage, language, and installed availability and require the learner to inspect the actual result.

### Font anatomy is memorized but never used

Baseline, cap height, x-height, ascenders, descenders, kerning, tracking, and leading appear as definitions and image labels. The terms do not become explanatory tools. Learners are not asked to predict why two faces at the same declared size look different, why a fallback changes wrapping, why a line box clips or grows, or why a control shifts after font swap.

The source also blurs traditional leading with CSS `line-height`. CSS inline layout calculates line boxes from inline contents, metrics, alignment, and preferred line height. `line-height` is not merely empty visual space painted between two text rows.

The target uses a metric inspector and rendered geometry. Learners compare x-height, cap height, advances, ascent, descent, line gap, line boxes, and fallback layout. They use `font-size-adjust`, `size-adjust`, and metric overrides only after measured evidence and current support review; those tools are not copied as magic stability recipes.

### `@font-face` is taught as file import syntax

The lecture provides useful initial contact with `font-family`, `src`, `url()`, `format()`, and `tech()`. It does not make the face descriptor contract operational. Critical gaps include:

- `font-weight`, `font-style`, and `font-width` descriptors versus ordinary properties;
- ranges and matching for variable faces;
- `unicode-range` and composite faces;
- `font-display` and the block, swap, and failure timeline;
- `local()` behavior and privacy or version risks;
- actual fetching, parse failure, cross-origin delivery, and request evidence;
- license permission for web embedding and redistribution;
- source ordering by supported format or technology;
- font-feature and variation descriptors;
- metric override descriptors;
- missing-glyph and missing-shaping behavior;
- how to prove a selected face rendered.

The format list gives equal beginner prominence to legacy or unsuitable formats. WOFF2 is the current W3C-recommended web container, but WOFF2 alone does not establish a correct subset, licensed artifact, display strategy, or stable fallback.

The replacement begins with one licensed self-hosted WOFF2 face and a system fallback, then introduces additional descriptors only when a changed requirement needs them. Third-party hosting is a separate architecture decision.

### External fonts ignore request, privacy, security, and resilience

The Google Fonts lesson mainly walks through a third-party interface and copies generated code. Its large Roboto example requests twelve static face combinations. It presents `<link>` and CSS `@import` as equivalent choices, then mentions load time only in closing.

Missing decisions include:

- self-hosting versus third-party hosting;
- request destination, referrer, IP and other service-visible metadata, and organizational privacy review;
- content security policy and allowed font or style origins;
- cross-origin rules and response headers;
- external service outage, blocking, filtering, or consent constraints;
- stylesheet discovery and render-blocking order;
- preconnect cost and when it helps;
- selected faces, subsets, and actual bytes transferred;
- caching and version control;
- license text, attribution, redistribution, modification, and web embedding rights;
- offline and intranet operation;
- font-display behavior and layout shift;
- whether branding benefit justifies delivery risk.

The source’s Font Squirrel walkthrough at least tells learners to inspect the license. It still cannot establish that any selected font has the required rights or coverage. LEARN-IT-ALL must provide a controlled, licensed exercise asset and require a source/license record. It must not ask beginners to browse and download arbitrary files as the primary path.

### Variable fonts and typographic features are missing

The source mentions weight, style, width, OpenType, and `tech()` but does not teach variable axes or feature resolution. A current professional sequence needs bounded coverage of:

- registered `wght`, `wdth`, `slnt`, `ital`, and `opsz` axes;
- declared axis ranges and clamping;
- custom axes as font-specific contracts;
- high-level `font-weight`, `font-width`, `font-style`, `font-optical-sizing`, `font-kerning`, and `font-variant-*` controls;
- low-level feature and variation settings only where high-level properties cannot express the need;
- ligatures, numeric forms, small capitals, position forms, language overrides, and feature conflicts;
- payload comparison against the exact static faces actually required;
- fallback when an axis or feature does not exist.

This is an explicit modern extension. It receives no benchmark credit merely because the source mentions font weight or OpenType.

### Typography accessibility is reduced to slogans

The best-practices lecture recommends simple fonts, sufficiently large text, relatively short lines, hierarchy, two or three font families, whitespace, contrast, adjustable font size, and multiple device checks. These are useful prompts, not testable contracts.

Problems include:

- no observable definition of “simple,” “large enough,” “relatively short,” or “displayed correctly”;
- no distinction between author-provided size controls and the requirement not to block browser resizing;
- no 200% resize test;
- no 400% reflow test;
- no WCAG text-spacing override test;
- no user default or minimum font preference;
- no line-height inheritance model;
- no paragraph spacing or complete-content invariant;
- no long, translated, bidirectional, or vertical text;
- no dyslexia or low-vision claims bounded by research rather than font category;
- no high-contrast or forced-color typography evidence;
- no focus, control-label, error, status, or data-table text cases;
- no relation between semantic heading rank and visual hierarchy.

WCAG Text Spacing does not require authors to set its test values by default. It requires no content or function loss when users override line height, paragraph spacing, letter spacing, and word spacing to the specified values. The replacement must teach that distinction.

### Text shadows are presented only as decoration

The source teaches x and y offsets, color, blur, negative offsets, and comma-separated layers. It says a higher blur becomes lighter and can make text stand out. It does not teach:

- shadow paint order with text and decorations;
- inheritance;
- ink overflow versus layout and scrollable overflow;
- contrast against the actual composite backdrop;
- multiple shadows obscuring glyph counters and edges;
- text shadows that imitate focus, glow, or link affordances;
- forced-color or high-contrast behavior;
- print and no-decoration behavior;
- performance and readability evidence;
- that shadow cannot be semantic emphasis or required meaning.

Text shadows do not affect layout. A large shadow can overlap neighboring content without reserving space. Target practice must predict paint and overflow, measure the actual result, and remove effects that reduce legibility.

## Block-by-block inspection

### `lecture-working-with-css-fonts`

Observed contact:

- typeface and font vocabulary;
- serif, sans-serif, script, blackletter, monospaced, and decorative categories;
- face weight, style, and width;
- baseline, cap height, x-height, ascenders, descenders, kerning, tracking, and leading;
- line length and visual hierarchy;
- family lists and generic fallbacks;
- “web-safe” installed fonts;
- `@font-face`, `src`, formats, and technology hints;
- hosted and downloaded external fonts;
- text-shadow offsets, blur, color, and layers;
- general readability, contrast, consistency, and responsive advice.

Useful scope signals:

- the source recognizes per-character fallback;
- it separates family from individual face variation;
- it names external-font performance cost and font licensing at least once;
- it makes several examples editable;
- it connects hierarchy to semantic structure in broad terms.

Major defects:

- category and “web-safe” availability become unsupported readability and consistency claims;
- interactive examples do not ask for prediction, inspection, modification, or evidence;
- no actual font request, selection, load, fallback, synthesis, or metric evidence is collected;
- external service UI instructions will age and encourage copy/paste dependency;
- the generated Roboto example requests many unnecessary faces;
- hosted `<link>` and `@import` paths are treated as equivalent syntax choices;
- variable fonts, feature resolution, font-display, unicode-range, metric overrides, and language coverage are absent;
- the accessibility advice is not tied to WCAG changed-condition tests;
- 21 questions remain recognition checks.

Bounded candidate concepts:

- stylesheet and external-resource loading contact;
- font selection and generic fallback;
- web-font source and loading contact;
- font metrics and fallback stability contact;
- type scale and line-height prerequisites;
- readable measure and alignment;
- text spacing and transformation contact;
- text decoration and shadows;
- contrast and hierarchy.

Variable-font and feature mastery receives no source credit.

### `workshop-nutritional-label`

Observed contact:

- headings, paragraphs, spans, generic containers, and a contextual `header`;
- external Open Sans loading and a sans-serif fallback;
- root and relative font sizes, weights, letter spacing, indentation, and text alignment;
- borders, padding, fixed width, box sizing, and negative margins;
- reusable classes, selector lists, combinators, and `:not()`;
- nested flex rows and alignment;
- visual grouping, hierarchy, and dense data presentation.

Useful scope signals:

- 68 cumulative edits meet the user’s requested granularity better than a short one-shot exercise;
- existing HTML, selectors, box sizing, units, pseudo-classes, and Flexbox reappear;
- the artifact makes typography visibly consequential;
- classes are reused across repeated visual roles.

Critical defects:

- the learner traces a regulated Nutrition Facts format without learning the information, legal, data, or semantic contract;
- the artifact is fixed at `270px`, not assessed for reflow, zoom, text spacing, localization, or changed data;
- the footnote is `0.6rem`, which is `9.6px` under the workshop’s fixed root size;
- several negative margins are justified as tweaking until the layout “looks correct” rather than diagnosed from metrics and layout constraints;
- the source loads an older Google Fonts endpoint without request, privacy, failure, or licensing evidence;
- semantic relationships among nutrients, quantities, units, percentages, groups, and footnote are encoded mainly by visual proximity, bold text, indentation, and nested spans;
- `i` is selected to obtain italic appearance for “Trans” rather than from a clearly taught semantic reason;
- the universal box-sizing rule is presented as a reset recipe without scope or component boundary analysis;
- black separators and tiny type are accepted without contrast, print, high-contrast, or magnification tests;
- every meaningful design choice is prescribed;
- checks mostly inspect authored element, class, selector, and literal declaration presence.

This artifact will not be recreated with different food names. An original dense-information workshop must use a non-regulated domain, semantic data relationships, realistic user tasks, accessible alternatives, responsive constraints, and changed data. Typography should express a correct information model, not substitute for one.

### `lab-newspaper-article`

Observed contact:

- document metadata in the starter;
- a main article-like container, headings, author, date, and paragraphs in the solution;
- font families and fallbacks;
- root-relative and parent-relative sizes;
- weight, italic, uppercase transformation, indentation, line height, and first-letter styling.

The lab appears independent but prescribes exact classes and almost every relevant declaration:

- root size `24px`;
- content size `16px`;
- Open Sans plus sans-serif;
- Times New Roman plus serif;
- `2rem`, `2em`, `1.5em`, weight `100`, bold, italic, uppercase;
- `20px` indentation, `2em` line height, and a `2em` first letter.

The grader checks authored strings, not computed hierarchy or rendered behavior. It never loads Open Sans, so a learner passes by naming an unavailable face. It does not check semantic element choice beyond broad descendant classes. Any nonempty article text passes. It does not evaluate line measure, language, date semantics, byline structure, paragraphs, links, quotations, image attribution, content quality, font selection, fallback, zoom, spacing, wrapping, or readability.

The supplied solution adds unrelated visual CSS not required by tests and uses fixed top padding. Its novelty is mostly surface domain: it still asks learners to transcribe a property recipe. Target independent work must begin from an editorial content brief and acceptance behavior, not a required selector/value list.

### `review-css-typography`

The review reproduces lecture definitions and examples. Its assignment says only to review the topics. It has no active recall, prediction, font inspection, fallback failure, line-box explanation, hierarchy repair, semantic comparison, or changed-condition task.

It also repeats weak claims:

- sans-serif faces are easy to read on screen as a category;
- named fonts are “web safe” as a reliable set;
- remote links and `@import` are ordinary equivalents;
- text shadows are mainly visual enhancement.

Target review must hide reference material on first attempt and retrieve actual models through mixed tasks. Reference content becomes a correction resource, not completion evidence.

### `quiz-css-typography`

The file contains two pools of 20 prompts. Coverage clusters around definitions, font-category trivia, family syntax, `@font-face`, hosted font inclusion, WOFF vocabulary, anatomy, and text-shadow syntax.

Validity and technical defects include:

- “web-safe” is assessed as a stable named-font fact;
- the answer that sans-serif is easier on screens because of simple clean lines encodes an overgeneralization;
- `@font-face` is described as “importing” custom fonts rather than defining faces and sources;
- external service syntax is tested without delivery, privacy, license, failure, or performance decisions;
- many distractors are syntactically absurd, so test-taking recognition replaces understanding;
- font anatomy is assessed as isolated terminology;
- no item asks which face rendered, why fallback changed layout, whether an italic is synthesized, or how a missing cluster is resolved;
- no line-height inheritance, line-box, metric, variable-axis, feature, language, wrap, overflow, text-spacing, reflow, or changed-content reasoning appears;
- no assessment uses rendered evidence or a runnable repair;
- the two pools remain at nearly the same low cognitive level.

Target assessment will use rendered-face evidence, network and load state, fallback geometry, line and wrap diagrams, semantic hierarchy, changed language, zoom and spacing outcomes, and small causal repairs. Distractors must represent diagnosed misconceptions.

## Duplication analysis

The family repeats low-value actions:

- recall a definition from the immediately preceding paragraph;
- name a font category from visual stereotypes;
- copy a family list;
- paste a remote font link or import;
- add another fixed class and literal value;
- wrap another fragment in a `span` to force visual alignment;
- apply a specified font size or weight;
- confirm raw CSS through source-shaped checks;
- reproduce one dense composition at one width.

Surface domains change from label to newspaper, but learners still receive the selectors, values, and result. That is not meaningful activity diversity.

Target diversity must differ in learner job, evidence, and failure:

| Activity | Learner job | Starting state | Evidence | Correction route |
| --- | --- | --- | --- | --- |
| Face-selection prediction | predict family, face, synthesis, and cluster fallback | CSS request plus installed-face matrix | prediction and rendered-face inspection | contrast family absence, missing weight, missing glyph, and language |
| Metric laboratory | compare two faces and one fallback | controlled licensed fonts | metric overlay, line breaks, line boxes, and geometry | isolate x-height, advances, ascent, descent, and line gap |
| Loading workshop | deliver one licensed self-hosted WOFF2 face | semantic page plus asset/license record | request, load, display, failure, and payload evidence | hints separate source, descriptor, fetch, parse, match, and render |
| Failure clinic | repair invisible or shifting text | broken face declarations and slow simulation | actual load state, fallback, shift, and complete-content evidence | parallel retry changes network and font metrics |
| Type-system workshop | build hierarchy for public instructions | real content with multiple lengths | semantic outline, scale, measure, line-height, and changed cases | feedback distinguishes semantic and visual hierarchy |
| International text lab | adapt multilingual content | LTR, RTL, combining, and non-Latin samples | glyph, shaping, transform, spacing, wrap, and direction evidence | reject English-only casing and spacing assumptions |
| Text-spacing clinic | preserve content under user overrides | cramped existing component | WCAG spacing, resize, and reflow evidence | identify fixed height, clipping, overlap, or truncation cause |
| Decoration experiment | predict shadow and decoration paint | text on changed backdrops | paint order, contrast, ink overflow, forced-color result | remove or bound effect when readability fails |
| Independent editorial lab | design unfamiliar long-form content | semantic content and stakeholder brief | multiple valid type systems plus defense | changed language, title length, zoom, and print reassessment |
| Retrieval assessment | diagnose mixed typography failures | screenshots plus DOM, CSS, network, and computed evidence | misconception-coded answers and causal explanation | targeted micro-practice before parallel reassessment |

No two activities may share the same domain, starter, selector set, property recipe, check fixture, hint path, or solution merely under new names and colors.

## Target prerequisite and accumulation order

Typography must follow semantic HTML, document language, headings, paragraphs, emphasis, source loading, CSS cascade, inheritance, box sizing, relative units, intrinsic sizing, color, contrast, overflow, and basic layout. It cannot repair missing semantics with visual hierarchy.

Required sequence:

1. Retrieve semantic heading, paragraph, emphasis, language, and reading-order models.
2. Connect glyphs, faces, families, metrics, line boxes, and inline formatting to rendered text.
3. Predict family, generic, face, width, style, weight, synthesis, and character-cluster matching.
4. Inspect actual rendered faces and changed language or glyph coverage.
5. Build a licensed self-hosted WOFF2 face with complete fallback and failure behavior.
6. Inspect the display timeline, request, payload, source selection, matching, and rendered result.
7. Compare fallback metrics and repair a measured layout-stability problem.
8. Introduce variable axes and high-level typographic feature controls as a modern extension.
9. Build semantic type scale, unitless line-height, vertical rhythm, and readable measure.
10. Apply language-aware wrapping, transformation, alignment, spacing, indentation, and truncation decisions.
11. Apply decoration and shadows only after paint, contrast, affordance, and fallback reasoning.
12. Test resize, reflow, user text spacing, high contrast, forced colors, print, and missing-font behavior.
13. Complete guided and faded builds with progressively less property-level direction.
14. Diagnose font, metric, line-box, wrapping, semantic, and adaptation failures in unfamiliar artifacts.
15. Complete an independent multilingual editorial interface without prescribed selectors or declaration values.
16. Retrieve typography in forms, navigation, data displays, responsive layouts, projects, and the certification assessment.

Every stage keeps earlier semantic structure, accessible names, contrast, meaningful order, focus, content preservation, testing, security, and design-evidence requirements active.

## Required behavior and grading contracts

### Semantic and visual hierarchy evidence

The document outline, regions, heading ranks, paragraphs, lists, quotations, time values, and emphasis must communicate structure without CSS. Typography may clarify that structure but cannot redefine it. Checks compare styles-on, styles-off, accessibility-tree, and heading-navigation results.

### Font selection evidence

Activities must expose:

- authored family list and generic;
- requested width, style, weight, and size;
- available faces and their ranges;
- actual selected face per relevant text run;
- real versus synthesized style;
- missing cluster and fallback face;
- language and shaping evidence.

The grade must accept equivalent defensible family strategies. It must not pass merely because source contains one font name.

### Font delivery evidence

Font activities record:

- asset source and license;
- self-hosted or third-party decision;
- declared source order, format, technology, ranges, and face descriptors;
- request URL or local asset, response, byte count, cache, CORS, and parse result;
- font display phase and usable fallback;
- actual face match and rendered use;
- offline, blocked, slow, and failed behavior;
- privacy, CSP, security, and availability boundary.

Canonical grading uses controlled licensed assets. Learner text never causes host command execution.

### Metric and line-box evidence

The inline workspace must provide accessible structured evidence for font size, x-height or aspect where available, cap height, ascent, descent, line gap, advances, line box, computed line-height, used geometry, and wrap points. A visual overlay must have an equivalent text representation.

At least one task compares:

- preferred face loaded;
- fallback face active;
- delayed swap;
- missing character fallback;
- enlarged text;
- changed heading and control labels.

Metric adjustments pass only when measured values justify them and changed strings remain unclipped.

### Responsive typography evidence

Every build-capable typography activity selects applicable cases from:

- short and long titles, headings, labels, paragraphs, URLs, and identifiers;
- English plus at least one materially different language or script where instruction scope permits;
- LTR, RTL, combining-character, and mixed-script content;
- narrow, intermediate, and wide content containers chosen from failure boundaries;
- 200% text resize and 400% zoom/reflow;
- WCAG line, paragraph, letter, and word spacing overrides;
- user default and minimum font changes where the supported environment exposes them;
- preferred font, fallback font, missing glyph, slow font, and failed font;
- default, increased contrast, and forced colors;
- screen, print, and styles-disabled output where relevant.

Checks state the invariant, observed result, and smallest next action. “Incorrect CSS” is not adequate feedback.

### Wrapping, truncation, and complete-content evidence

Long and unbreakable content must either wrap according to language and task rules or use an explicitly justified overflow interaction. Ellipsis, clipping, fixed heights, and hidden overflow cannot pass when required information becomes unavailable. Any disclosure of full content must be keyboard, touch, zoom, and assistive-technology usable.

### Decoration and shadow evidence

Learners predict shadow order, paint layers, ink bounds, and contrast before preview. Tests change backdrop and user color mode. Required meaning persists without decoration. Link, spelling, grammar, insertion, deletion, emphasis, selection, focus, and ordinary decoration must not become visually indistinguishable where those states coexist.

### Cumulative grading evidence

Later typography work rechecks:

- semantic HTML and document language;
- accessible hierarchy and reading order;
- contrast and non-color meaning;
- box and intrinsic sizing;
- overflow and content preservation;
- keyboard focus for text controls and links;
- font failure and changed content;
- resize, reflow, and spacing adaptation;
- source, license, privacy, and performance constraints.

Deleting earlier correct work cannot pass a later step merely because the current declaration exists.

## Target original activity architecture

Final Typography unit requires these distinct roles:

1. **Interactive theory:** generated text runs, face matching, metrics, line boxes, and language-aware text processing.
2. **Worked example:** expert chooses a small type system from semantic content, audience, language, and delivery constraints.
3. **Font selection laboratory:** predict, render, inspect, and correct family, face, synthesis, and glyph fallback.
4. **Guided loading workshop:** self-host one controlled licensed WOFF2 family with fallbacks and failure evidence.
5. **Metric and stability clinic:** delayed font changes line breaks and component geometry; learner proves a causal repair.
6. **Type-scale workshop:** cumulative hierarchy, unitless line-height, measure, wrapping, and rhythm with prediction checkpoints.
7. **Text adaptation clinic:** repair fixed sizes, clipping, spacing override, zoom, and multilingual failures.
8. **Decoration experiment:** test text decoration and shadows against contrast, paint, overflow, link, and forced-color constraints.
9. **Faded practice:** new content domain, fewer instructions, alternative valid decisions, progressive hints.
10. **Independent lab:** semantic multilingual editorial artifact from an empty stylesheet and stakeholder acceptance criteria.
11. **Active retrieval review:** face selection, loading, metrics, line boxes, wrapping, semantics, and accessibility in unfamiliar contexts.
12. **Assessment bank:** prediction, evidence interpretation, explanation, diagnosis, small implementation, and design selection.
13. **Delayed retrieval:** typography returns in forms, flex, grid, navigation, responsive systems, and print.
14. **Project evidence:** integrated responsive site includes type-system decision record, font delivery evidence, changed-case results, and design defense.

The later activity matrix must prove introduce, model, guided, faded, debug, retrieve, assess, delayed-retain, and transfer encounters for every typography concept. No generated prose or activity template may fill the matrix.

## Bounded candidate alignment

Challenge-level inspection narrows source contact to:

- lecture: CSS loading; family and face selection; web-font sources; metric vocabulary; type scale and line-height prerequisites; measure; spacing and transformation; text decoration and shadows; contrast; visual hierarchy;
- nutrition workshop: retained semantic HTML, loading, selectors, pseudo-classes, boxes, units, color, family fallback, web-font source contact, type scale, measure, spacing, hierarchy, and Flexbox alignment;
- newspaper lab: document metadata, headings, paragraphs, landmarks and article structure in the supplied solution; CSS loading, selectors, first-letter styling, family fallback, type scale, measure, spacing, and hierarchy;
- review: family fallback, web-font sources, metrics, type scale, measure, spacing, text shadows, and hierarchy;
- quiz: family fallback, web-font source syntax, metric terminology, type-scale terminology, spacing, text shadows, and hierarchy.

Source contact is not mastery. The benchmark does not earn credit for variable fonts and feature control, actual loading evidence, licensed delivery, metric repair, language-aware transfer, accessibility adaptation, or independent design defense that it does not require.

## Publication blockers exposed by this inspection

Typography remains `researched-not-authored`. Before learner content can become available:

- a typography subject reviewer must verify every concept, term, source locator, font-matching statement, descriptor, feature, metric, line-box model, text-processing boundary, and browser-support claim;
- an internationalization reviewer must approve language, script, shaping, bidirectional, transformation, spacing, and fallback examples;
- an accessibility reviewer must approve semantic hierarchy, rendered-face diagnostics, resize, reflow, spacing, forced-color, screen-reader, keyboard, and text-alternative paths;
- privacy, security, licensing, and performance reviewers must approve font assets and delivery exercises;
- an instructional designer must approve prerequisite order, activity diversity, fading, correction, delayed retrieval, and transfer;
- an assessment reviewer must blueprint every item and pilot false-positive, false-negative, difficulty, discrimination, hint, and reassessment behavior;
- a duplication audit must compare all scenarios, starters, instructions, requirements, checks, hints, assets, and solutions;
- the inline editor and sandboxed preview must expose structured font, network, computed, geometry, accessibility, and changed-case evidence without host execution;
- representative beginners must complete selection, loading, metric, hierarchy, adaptation, faded, and independent tasks; critical findings require repair and re-test;
- tablet and desktop learner studios plus the accessible phone handoff must pass the supported browser and assistive-technology matrix;
- all research compilation, schema, content, test, type, lint, build, and browser gates must pass.

This wave brings direct Responsive Web Design inspection to 117 of 158 source blocks: 930 challenges, 1,064 captured question prompts, and 2,871 inspected implementation checks. One hundred twenty-five blocks now have bounded block-specific candidate maps. Thirty-two uninspected blocks remain explicitly unmapped, the unavailable certification assessment remains an evidence container, and 41 total source blocks still require challenge-level inspection. The candidate graph contains 83 HTML/tooling and 100 CSS/responsive/design concepts; all 183 remain research models, not authored lessons. No Responsive Web Design module is authored, approved, available, certified, or published.
