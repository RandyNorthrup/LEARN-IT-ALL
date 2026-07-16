# Responsive Web Design Attribute Selectors source inspection

Reviewed: 2026-07-16

Status: complete direct inspection; candidate curriculum evidence only

## Decision

All four pinned Attribute Selectors blocks are inspected challenge by challenge, including all 66 balance-sheet workshop steps, all 274 implementation checks, all three lecture files, the complete review, and all ten quiz items. The family gives learners brief contact with attribute presence, exact-value, whitespace-token, prefix, suffix, and substring selectors. It does not supply a complete attribute-matching model, a defensible semantic-data model, an authentic selector-debugging progression, an accessible data-table progression, or evidence that a learner can choose and maintain an attribute selector in changed code.

LEARN-IT-ALL will replace the family with original work that makes learners:

- separate an attribute's HTML meaning from CSS matching and visual treatment;
- predict the complete matched and rejected sets before running each selector;
- distinguish presence, exact, whitespace-token, language-prefix, prefix, suffix, and substring contracts;
- state whether comparison follows document-language defaults or an explicit `i` or `s` flag;
- handle empty strings, token boundaries, near matches, quoting, escaping, case, paths, queries, fragments, and attribute mutation;
- choose standard HTML semantics before private `data-*` state, and keep private data meaningful without its CSS;
- use `lang` and `:lang()` for inherited language semantics instead of inventing `data-lang` as a substitute;
- inspect DOM attributes, `matches()` or `querySelectorAll()` results, specificity, cascade provenance, and computed behavior;
- repair selectors that are too broad, too narrow, brittle, or coupled to accidental serialized text;
- build one coherent accessible data table whose captions, groups, row and column headers, number formats, reading order, and responsive alternatives remain correct;
- preserve visible focus, non-color meaning, zoom, reflow, keyboard access, forced colors, print output, and changed-content behavior;
- prove retained selection and semantic judgment in unfamiliar application state, document metadata, and table scenarios.

The terminal evidence is not a familiar balance sheet or the presence of a requested selector string. It is a learner who can define the data contract, predict matches, inspect the browser result, diagnose a changed-case failure, choose a less brittle hook, preserve semantics and accessibility, and defend the design.

## Inspected source boundary

The inspection covers four source blocks from freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`:

| Source block | Type | Challenges | Question prompts | Implementation checks | Source bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| `lecture-working-with-attribute-selectors` | lecture | 3 | 9 | 0 | 13,983 |
| `workshop-balance-sheet` | workshop | 66 | 0 | 274 | 359,292 |
| `review-css-attribute-selectors` | review | 1 | 0 | 0 | 4,524 |
| `quiz-css-attribute-selectors` | quiz | 1 | 10 | 0 | 4,247 |
| **Total** |  | **71** | **19** | **274** | **382,046** |

Every file was read from the pinned checkout, whose HEAD matched the recorded upstream commit. `references/freecodecamp-rwd-v9.json` remains the exact evidence record for source order, identities, paths, hashes, byte counts, section inventories, prompt counts, checks, and languages.

Direct inspection establishes benchmark breadth and defects only. It does not establish technical authority, instructional sufficiency, responsive behavior, accessibility, assessment validity, retention, transfer, originality permission, maintainability, learner success, or publication readiness.

## Current primary evidence

The replacement is bounded by:

- [Selectors Level 4](https://www.w3.org/TR/selectors-4/), W3C Working Draft dated 22 January 2026, for attribute presence and value selectors, substring matching, `i` and `s` case flags, namespace rules, invalid selectors, specificity, and matching against a tree;
- [HTML Living Standard](https://html.spec.whatwg.org/), last updated 15 July 2026 during this review, for standard attributes, document language, advisory `title` information, custom `data-*` state, ordered-list marker semantics, links, tables, captions, row groups, header cells, and the DOM attribute APIs;
- [CSS Cascading and Inheritance Level 5](https://www.w3.org/TR/css-cascade-5/) as the controlling cascade source, with [Level 6](https://www.w3.org/TR/css-cascade-6/) monitored for evolving scope behavior, for origin, importance, encapsulation, layers, specificity, scope, order, inheritance, and why `!important` is not an absolute override;
- [WAI Tables Tutorials](https://www.w3.org/WAI/tutorials/tables/) and [HTML table processing](https://html.spec.whatwg.org/multipage/tables.html) for captions, simple and irregular header associations, row and column groups, and complex-table alternatives;
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for info and relationships, meaningful sequence, use of color, contrast, reflow, non-text contrast, keyboard operation, focus appearance and obstruction, and target behavior;
- the current CSS Display, Sizing, Values, Positioned Layout, Flexbox, Backgrounds and Borders, Images, Fonts, and Color specifications for the incidental layout and presentation behaviors used by the workshop.

Selectors Level 4 is a Working Draft. The course therefore records the reviewed publication date, distinguishes stable implemented operator behavior from evolving text, and requires an accepted browser-support matrix before relying on a feature. A specification defines platform behavior; it does not establish a novice explanation, activity sequence, grading contract, or learner success.

## Source-family findings

### Three lectures compress matching into examples instead of a model

The first lecture introduces selectors using `href` and `title`, then shows presence, exact-value, whitespace-token, prefix, and suffix examples. The second uses `lang` and `data-lang`. The third selects `ol[type]`. These examples reveal syntax, but the instruction does not define the accepted and rejected set for every operator.

The family omits or underdevelops:

- `[att|="value"]`, which matches an exact value or that value followed immediately by a hyphen and is intended for language-style subcodes;
- `[att*="value"]` from the lectures, leaving it to the review and quiz rather than a complete taught comparison;
- the `i` ASCII case-insensitive and `s` identical-value flags;
- the fact that default attribute-name and value case behavior depends on the document language;
- the empty-string rule for `~=`, `^=`, `$=`, and `*=` matching nothing;
- whitespace-token boundaries, including why a requested token containing whitespace cannot match with `~=`;
- selector parsing, valid strings and identifiers, quoting, escaping, and invalid-selector behavior;
- namespaces and the distinction between `[att|=value]` and `[prefix|att]`;
- specificity and how multiple attribute selectors combine;
- live DOM attribute mutation and the resulting selector rematch;
- the difference between an HTML content attribute, an IDL property, application state, and visual state;
- how a brittle selector survives changed URLs, extra tokens, case, serialization, localization, and content administration.

The target first presents selectors as predicates over a tree. For a small DOM and an explicit attribute contract, the learner predicts a set of element identities, runs the selection, compares the actual set, and explains every discrepancy. Syntax follows the matching problem; it is not the evidence by itself.

### Link examples teach brittle string coincidence

The first lecture suggests link selectors such as prefix and suffix matches against `href`, uses a `title` attribute as a hook, removes link underlining, and makes broad accessibility claims. Several boundaries are missing:

- source `href` text can be relative, absolute, protocol-relative, fragment-only, or another valid scheme;
- a suffix such as `.com` is not a dependable domain classifier because paths, ports, queries, fragments, case, internationalized domains, and URL resolution change the text contract;
- `href^="https://"` says only that the serialized attribute begins with those characters; it does not prove destination trust, same-origin or cross-origin status, availability, safety, or externality;
- `title` is advisory information, not a dependable primary accessible name or universally discoverable tooltip;
- removing the default underline can erase the only persistent non-color cue that text is actionable;
- an attribute selector can style an existing semantic state but does not create link meaning, safety, an accessible name, keyboard behavior, or a disclosure.

The target uses real URL parsing when destination classification is application behavior and uses CSS attribute matching only when the serialized attribute is intentionally the styling contract. Learners must test relative URLs, query strings, fragments, similar suffixes, and non-HTTP schemes. Link styling must remain identifiable without color alone and must preserve focus and visited-state privacy constraints.

### `lang` and private `data-lang` are not interchangeable

HTML defines `lang` as the primary language of an element's contents and text-bearing attributes, with inheritance from a parent. Custom `data-*` attributes store page-private data, state, or annotations only when no more appropriate attribute or element exists. The source demonstrates both through exact attribute matching without protecting that distinction.

This can leave a beginner believing `data-lang="fr"` communicates French content to the browser or assistive technology. It does not. Styling language also has a more semantic selector: `:lang()`, which follows language determination and inheritance and accepts language ranges. `[lang="fr"]` only matches an element carrying that exact serialized attribute value; it does not match a descendant that inherits French or `fr-CA` unless the selector contract says so.

Target exercises make learners compare:

- an element with its own `lang="fr"`;
- a descendant inheriting French from an ancestor;
- `lang="fr-CA"`;
- an unknown or empty language value;
- a page-private `data-translation-state="reviewed"` value;
- `:lang(fr)`, `[lang="fr"]`, and `[lang|="fr"]` matched sets.

The learner must choose standard semantics first, then use private data only for genuine application state. The page must remain usable if `data-*` styling and script are removed.

### `ol[type]` needs a semantic boundary

HTML still permits the `type` attribute on `ol` when the marker kind matters, such as when prose references an item by its letter or numeral. CSS `list-style-type` handles presentation. The lecture shows attribute selection without stating when the HTML attribute is meaningful and when a class or component state is the more maintainable styling hook.

The target compares a legal appendix whose clauses are referenced as “IV” with a decorative list style. Learners preserve `type` when marker identity is part of the content contract and use CSS when the marker is only presentation. Changed-case tests include upper- and lowercase marker values, nested lists, print output, copied text, and a stylesheet-disabled view.

### The review is broader than the lectures but still reference-only

The review lists presence, exact, token, prefix, suffix, and substring operators. It does not require a learner to predict matches, run a selector, explain near misses, or diagnose a changed case. It still omits the language-prefix operator, explicit case flags, default case rules, namespaces, empty substring behavior, invalid syntax, specificity, DOM mutation, and semantic hook selection.

A useful review must retrieve the conceptual distinction under changed data. LEARN-IT-ALL review activities therefore interleave:

- predict-the-set questions;
- selector-to-contract matching;
- contract-to-selector construction;
- counterexample generation;
- DOM mutation and recomputation;
- cascade provenance diagnosis;
- semantic-hook refactoring;
- accessibility and responsive regression checks;
- delayed retrieval after other CSS topics intervene.

### The quiz measures recognition, not independent selection

The ten quiz questions ask learners to recognize syntax or recall which selector targets a described attribute. They do not supply a DOM large enough to distinguish false positives, ask learners to enumerate the matched set, mutate an attribute, inspect actual behavior, or defend a selector contract. One question asks about a whitespace-token `title` match, another about custom data, and another about an exact `alt` value. These are vulnerable to syntax memorization and encourage presentation hooks tied to prose.

Target assessment items must:

- map to a named concept and misconception;
- include plausible near-match values and a complete expected set;
- require a prediction before execution;
- verify changed-case behavior, not source text alone;
- distinguish exact, token, language-prefix, and substring needs;
- test case policy and empty-string behavior;
- ask when a standard semantic attribute, class, state pseudo-class, or private data attribute is the correct hook;
- diagnose a cascade conflict without reflexive `!important`;
- keep canonical answers and hidden cases server-side;
- collect item difficulty, discrimination, false-positive, false-negative, hint, correction, and reassessment evidence before credential use.

## Complete 66-step workshop audit

### Steps 1–27 construct accounting markup before teaching the named topic

Steps 1 through 27 build a page shell and three separate tables for Assets, Liabilities, and Net Worth. Learners create headings, a year display, rows, descriptions, current values, and total rows. The source spends more than two-fifths of the workshop on repeated HTML entry before any attribute selector is practiced.

The repetition is not deliberate retrieval with changed reasoning. The three sections repeat essentially the same row structure and hard-coded values. Checks mainly assert exact nodes, classes, text, and hierarchy. They do not ask the learner to determine whether the financial relationships are correct, explain why one coherent table or multiple tables is appropriate, or validate header associations.

The source also separates visually displayed years from screen-reader-only year text and hides the visible year strip with `aria-hidden`. That may be workable in a carefully tested implementation, but the workshop does not inspect the accessibility tree, announcement sequence, table navigation, duplicate or missing information, or behavior when CSS is unavailable. It asserts a technique without user evidence.

Target table work starts with the data relationship and user tasks:

1. What questions must a reader answer?
2. Is this one dataset or several independent datasets?
3. What is the caption?
4. Which cells are row, column, row-group, or column-group headers?
5. How are numbers represented, aligned, localized, and understood without visual position alone?
6. Can a keyboard and screen-reader user traverse the same relationships?
7. What happens at narrow width, 200% and 400% zoom, print, forced colors, and long translated labels?

Learners then implement the simplest valid structure and inspect the browser's DOM and accessibility representation before adding presentation.

### Steps 28–34 copy a visually-hidden recipe without a decision model

These steps build `span[class~="sr-only"]` using a zero border, deprecated `clip`, `clip-path: inset(50%)`, one-pixel dimensions, hidden overflow, no wrapping, absolute positioning, zero padding, and a negative margin. This creates several problems:

- the named attribute-selector topic is entangled with a copied accessibility utility;
- the learner does not decide whether content should be visible, visually hidden, fully hidden, or conditionally revealed;
- `clip` is legacy syntax and is taught without its status;
- a declaration checklist is treated as proof without accessibility-tree or task evidence;
- no focusable-content prohibition, browser matrix, zoom test, print test, high-contrast test, or component boundary is supplied;
- the class-token selector is not compared with `.sr-only`, `[class="sr-only"]`, or changed class order and additional tokens.

The target teaches visibility as separate dimensions: visual rendering, layout participation, hit testing, focusability, accessibility-tree inclusion, naming relationships, and discoverability. A tested utility may be provided by the platform design system after learners understand that model. Learners do not copy a magic incantation and call accessibility complete.

### Steps 35–43 introduce unrelated layout and a stacking myth

These steps style the heading area with Flexbox, size the main area, and make the year strip sticky. They add `z-index: 999` and say sticky positioning moves an element into its own stack. That language conflates positioned layout, stacking contexts, stack levels, paint order, and compositor layers.

A large number is not globally topmost. A descendant remains bounded by ancestor stacking contexts, top-layer elements follow a different model, and focus or hit testing can still fail even when the desired pixels appear above another box. Sticky behavior also depends on a non-auto inset, nearest scrollport, containing-block constraints, available range, overflow, and element size.

None of the workshop checks measures computed position, scroll response, overlap, paint order, hit testing, focus obstruction, or changed content. The target removes this incidental sticky exercise from attribute-selector instruction. Positioning is taught in its own causal sequence and later retrieved only when the table task genuinely needs sticky controls or headers.

### Steps 44–48 demonstrate four selector forms, then prescribe `!important`

Step 44 uses `#years span[class]`. Step 46 uses `span:not(.sr-only)`. Step 47 adds `!important` to every visually-hidden declaration and says this ensures the properties are always applied regardless of order or specificity. Step 48 removes the `:not()` selector.

The absolute claim about `!important` is false. Cascade outcome can still depend on origin and importance, encapsulation context, layers, scope, specificity, and order; transitions outrank important declarations in the cascade order. Blanket importance also makes correction, user overrides, components, and maintenance harder.

These steps do not ask learners to compare matched sets or cascade provenance. They add and delete selectors to reach a supplied solution. The target instead gives learners a conflict matrix, DevTools rule provenance, an explicit intended override boundary, and changed cases. The repair should normally reduce coupling, place rules in a coherent layer, or use a bounded selector. If importance is justified, the learner must explain its origin and layer interaction and prove that user needs remain respected.

### Steps 49–54 create fixed table geometry

The workshop sets table width, border collapse, positioning, captions, and calculated widths. Captions are absolutely positioned and the page relies on fixed or tightly coupled dimensions. The checks confirm declarations and DOM shape, not used geometry, wrapping, zoom, writing mode, long labels, localization, or print.

The target keeps captions in their semantic relationship and uses resilient layout. If a visual treatment moves a caption, the learner must prove meaningful order, association, focus behavior, reflow, and non-screen output. Width tests use actual bounding boxes and overflow evidence at supported tablet and desktop sizes, plus phone-readable public handoff and high zoom—not a declaration-presence proxy.

### Steps 55–61 contain most of the actual attribute-selector practice

Step 55 selects `tr[class="total"]`; step 56 extends that exact serialized-class selector; step 57 compares it with `.total`; step 60 selects `[class="current"]`; and step 61 selects `[class="data"]`. These examples expose exact-value syntax but normalize an unusually brittle choice for classes.

`[class="total"]` rejects an element whose class list is `total emphasized`, whose tokens are reordered, or whose serialized spacing changes, even though `.total` and `[class~="total"]` retain the intended class-token contract. Exact serialized class matching can be valid when exact serialization is genuinely the contract, but the workshop does not establish such a requirement.

The target explicitly changes class order, adds a second class, adds a near token such as `subtotal`, and mutates `classList`. Learners predict and observe `.total`, `[class="total"]`, `[class~="total"]`, and `[class*="total"]`. They must select the hook that expresses the intended invariant and explain every false positive and negative.

Step 58 uses `:nth-of-type()` and step 59 adds a hover treatment. These are useful CSS contacts but not attribute selectors. Hover-only feedback is insufficient because touch and keyboard users may not receive it. Any actionable row needs corresponding focus and semantic interaction; a non-actionable row must not imply action through hover styling alone.

### Steps 62–66 finish through negative offsets and alignment tweaks

The final steps rely on fixed alignment and a negative right margin of `-13.5rem`, remove an earlier span rule, and align numeric values. This ends the workshop with pixel fitting rather than changed-data resilience. Long labels, larger text, different number lengths, localization, scrollbar presence, print, and column count can invalidate the result.

No final step asks the learner to explain a selector, enumerate matches, test another balance sheet, correct inaccessible headers, or defend the responsive table. Completion means matching the expected source and appearance, not demonstrating the named competence.

## Check and runtime evidence audit

The 274 workshop checks were classified by what they actually inspect; zero steps call `getComputedStyle`, measure element bounds, or inspect an accessibility API:

| Evidence channel | Steps using it | Finding |
| --- | ---: | --- |
| DOM structure or source element checks | 26 | verifies requested nodes, attributes, classes, and text, but not user task success |
| CSS-help parsing or declaration checks | 39 | confirms syntax or requested declarations, but not used behavior |
| Direct source matching | 2 | especially vulnerable to alternate correct solutions and source gaming |
| Computed-style behavior | 0 | no cascade outcome or used style is established |
| Geometry or bounding boxes | 0 | no reflow, overflow, overlap, sticky, or alignment result is established |
| Accessibility API or task evidence | 0 | no name, role, state, association, reading order, focus, or navigation result is established |

Some steps use more than one structural check, so the step counts are not meant to total 66. The central result is unchanged: all 274 checks can pass without proving the learner understands attribute matching, table accessibility, cascade resolution, responsive behavior, or user success.

The target runtime must support:

- learner prediction submission before preview;
- actual DOM parsing in a sandboxed browser preview;
- matched-set comparison by stable element identity;
- safe attribute and class mutation through controlled test cases;
- `matches()` and `querySelectorAll()` evidence with invalid-selector diagnostics;
- CSS rule provenance and computed style for the property under investigation;
- hidden changed cases with additional tokens, case changes, empty values, URL components, language variants, and reordered markup;
- table header-association and accessibility-tree inspection where supported, plus required keyboard and assistive-technology task observation;
- real bounds, overflow, zoom, forced-colors, reduced-motion, print, tablet, and desktop checks when layout claims are made;
- canonical expected behavior and hidden cases on the server, never in learner-delivered client data.

No learner source may reach host command execution. Browser code stays in a sandboxed preview with an explicit resource and capability policy.

## Correct target concept model

### Attribute semantics precede selector choice

For each styling request, the learner first names the attribute contract:

- Does the attribute merely need to exist?
- Is the complete serialized value meaningful?
- Is it a whitespace-separated token list?
- Is it an exact value or a hyphen-delimited language-style range?
- Is a prefix, suffix, or arbitrary substring genuinely stable?
- Is comparison ASCII case-sensitive, ASCII case-insensitive, or controlled by the document language?
- Is there a standard semantic attribute or state pseudo-class that should be used instead?
- Would a class communicate styling intent with less coupling?
- Is private application state appropriate in `data-*`?
- Does styling remain usable when the attribute or CSS is absent?

Only then does syntax enter. This prevents learners from choosing `*=` because it appears flexible or inventing data attributes because they are convenient.

### Matched-set prediction is mandatory

Every operator is learned with accepted and rejected cases. A minimal prediction matrix includes:

| Contract | Candidate values |
| --- | --- |
| Presence | absent, empty, nonempty |
| Exact | `ready`, `Ready`, `ready later` |
| Token | `ready`, `ready later`, `already`, `ready-later`, repeated whitespace |
| Language prefix | `en`, `en-US`, `english`, `en_US` |
| Prefix | `https://`, relative URL, leading whitespace, other scheme |
| Suffix | `.pdf`, `.pdf?download=1`, `.PDF`, `report.pdf` |
| Substring | exact text, embedded text, accidental near match, empty requested substring |

The learner identifies stable element IDs, predicts the result set, runs the selector, and reconciles differences. Later cases remove IDs and require a defensible count and content invariant so the learner cannot memorize positions.

### Specificity and cascade remain separate from matching

A selector can match the intended element and still lose the cascade. A selector can also win and be the wrong hook. The target separates:

1. selector validity;
2. the matched element set;
3. specificity contribution;
4. origin, importance, context, layer, scope, and order;
5. computed and used property behavior;
6. user-visible and accessibility consequences.

Learners inspect each layer rather than escalating specificity or adding `!important` by habit.

### Semantic data and styling hooks require maintenance evidence

The replacement includes three hook-refactoring clinics:

- replace exact prose-based `alt` styling with a semantic component hook while preserving useful alternative text;
- replace brittle URL suffix logic when application behavior really requires parsed destination data;
- replace `data-lang` with `lang` and `:lang()` while keeping a separate private translation-workflow state where it is genuinely required.

Each clinic changes content, locale, class tokens, and DOM order after the first pass. A correct solution must retain meaning and behavior.

## Pedagogical progression

### Entry contract

Before this sequence, the learner must already be able to:

- inspect a small HTML document and identify elements and attributes;
- use standard language, link, list, class, and table semantics at a basic level;
- write and load a CSS rule;
- distinguish selector, declaration, property, and value;
- operate the inline editor, preview, diagnostics, prediction panel, hints, evidence panel, and save/restore flow;
- use keyboard navigation and know how to report an accessibility barrier.

Missing entry evidence routes to corrective activities. It does not silently unlock the sequence.

### Introduce and model

The first theory activity presents a selector as a boolean predicate over an element tree. A worked example labels each element as match or no-match and explains why. Learners then predict presence and exact-value results over three elements before preview.

The next worked examples contrast token and substring matching, then language-prefix and plain prefix matching. Case flags and document-language defaults are modeled with explicit accepted and rejected values. Empty values and invalid syntax appear early enough to prevent false rules.

### Guided workshop

The original workshop is replaced by an original service-status filter. Semantic HTML represents a list of service incidents. Standard attributes carry language and link semantics; `data-*` carries page-private workflow state such as severity and acknowledgement only where no standard attribute exists.

Guidance fades across checkpoints:

1. predict presence and exact state selectors;
2. choose token versus substring for multi-value tags;
3. add case policy and counterexamples;
4. mutate state through a bounded control and inspect rematching;
5. diagnose a cascade conflict using provenance;
6. preserve focus, non-color status, forced colors, zoom, and stylesheet-disabled meaning;
7. pass hidden changed incidents and an unfamiliar locale.

The scenario, markup, prose, selectors, checks, hints, and solutions are original. It does not reproduce a balance sheet.

### Faded practice

A documentation release index supplies only a data contract and user goals. Learners choose hooks for release channel, file format, language, and deprecation state. Some requested classifications require URL parsing or standard semantics rather than CSS substring selectors. Hints reveal the decision questions, not finished selectors.

### Debugging clinic

A localization interface contains:

- `[class="active"]` rejecting multi-class elements;
- `[data-state*="read"]` falsely matching `unread` and `already-read`;
- `[lang="fr"]` missing inherited and regional French;
- `!important` hiding the real layer-order problem;
- `[href$=".pdf"]` failing for query strings;
- hover-only state feedback;
- private data used where `lang` is required.

The learner must reproduce each bug, predict the incorrect set, inspect actual matches and cascade provenance, repair the contract, and write one counterexample test that would fail the old code.

### Independent lab

The independent lab is an inventory triage table for accessible equipment loans. It is not an accounting statement and is not scaffolded from the workshop. Learners receive stakeholder questions, raw records, supported viewport and assistive-technology constraints, and a test interface.

They must choose a coherent table structure, associate headers, represent availability and maintenance state without color alone, use attribute selectors only where the data contract warrants them, keep private data private, support changed record lengths and locales, and provide an alternative usable narrow representation if the full grid cannot reflow without loss.

Evidence includes matched sets, behavior under attribute mutation, computed results, table associations, keyboard traversal, zoom/reflow, forced colors, print, a hidden dataset, and a short design defense.

### Retrieval, quiz, exam, and transfer

Immediate retrieval mixes operator choice with selectors, cascade, language, links, lists, and tables. Delayed retrieval occurs after Flexbox and responsive-design work, so the learner must still choose attribute selectors without a nearby recipe.

The quiz combines prediction, counterexample selection, semantic-hook judgment, and diagnosis. The exam contains an unseen DOM and hidden mutations. Transfer requires a learner-selected application state in a capstone, an explanation of the stable attribute contract, and evidence that content changes do not create false matches.

## Evidence and grading contract

| Claim | Required evidence | Insufficient alone |
| --- | --- | --- |
| Presence versus value is understood | predicted and actual matched sets across absent, empty, and nonempty attributes | `[attr]` appears in source |
| Operator contract is understood | accepted and rejected changed values for exact, token, language-prefix, prefix, suffix, and substring matching | correct operator on one supplied value |
| Case behavior is understood | document-language rule or explicit flag, plus changed-case results | selector parses |
| Hook is semantically appropriate | standard semantics or justified private state, usable without styling, maintenance defense | a `data-*` attribute exists |
| Selector is maintainable | counterexamples, token/order/content mutations, no accidental match broadening | expected screenshot |
| Cascade repair is causal | matched set, specificity, origin/layer/scope/order provenance, computed result, changed case | larger specificity or `!important` |
| Link treatment is usable | link purpose, non-color recognition, focus, URL boundary cases, changed destination | prefix or suffix selector matches one URL |
| Language treatment is correct | valid `lang`, inheritance and regional cases, `:lang()` comparison | `data-lang` style |
| Data table is accessible | coherent data model, captions/groups/headers, associations, keyboard and AT tasks, zoom/reflow/print evidence | table tags or hidden year strings |
| Transfer is independent | unfamiliar scenario, learner-selected contract, hidden mutations, diagnosis and defense | renamed balance sheet |

Canonical answers, hidden datasets, and mutation cases remain server-side. Client code submits learner evidence; it is never the grading authority.

## Hint and correction design

Hints are progressive and evidence-linked:

1. restate the intended accepted and rejected values;
2. ask which attribute grammar applies;
3. show the learner's predicted and actual matched sets without the answer;
4. identify whether the failure is parsing, matching, cascade, layout, or semantics;
5. expose one counterexample;
6. show the relevant specification excerpt in paraphrase;
7. provide a partial operator comparison;
8. reveal a worked analogous example, never the activity solution.

After a failure, correction requires a new prediction and a changed case. Repeated guessing or hint dependence routes to a smaller contrast activity. Completion and mastery remain separate; delayed retrieval determines retained competence.

## Accessibility and responsive contract

Every activity must be operable by keyboard and touch on supported tablet and desktop devices. Public information and the phone handoff remain phone-usable. The inline workspace provides:

- logical landmarks and heading order;
- a visible skip path between instructions, editor, preview, diagnostics, and evidence;
- visible focus and no keyboard trap;
- announced run, test, save, error, hint, and completion status;
- editor instructions and a non-editor text-input path where needed;
- large targets and no hover-only information;
- reduced-motion support;
- forced-color and high-contrast resilience;
- reflow without two-dimensional page scrolling at required zoom, except for bounded data grids with a usable alternative;
- accessible names for controls and programmatic relationships between failing requirements and diagnostics;
- preserved work, explicit reset confirmation, and correction history.

Table-specific verification includes caption announcement, row and column header navigation, reading order, numeric context, long labels, localization, missing values, sorting or filtering state if present, and an alternative view when the data cannot responsibly collapse.

## Originality and duplication constraints

The target must not reuse or lightly rename:

- the balance sheet, accounting categories, years, values, layout, or 66-step sequence;
- the source lecture, review, quiz, hint, solution, or check wording;
- the copied visually-hidden recipe as an attribute-selector project;
- exact serialized-class selectors as the default class pattern;
- sticky year bars, `z-index: 999`, fixed 680-pixel canvases, or negative `13.5rem` fitting;
- add-then-delete steps whose only purpose is tracing a supplied result;
- another three-section financial table with changed labels;
- declaration or source-text checks presented as behavior evidence.

The workshop, faded task, debugging clinic, independent lab, quiz, project, and exam must differ in scenario, starter state, required reasoning, data shape, expected artifacts, hidden changes, and mastery evidence. Automated similarity gates identify suspicious overlap, but subject and instructional reviewers make the final duplication judgment.

## Review and release gates

This family remains `candidate-review` until all of the following pass:

- primary-source freshness and subject review;
- prerequisite, cognitive-load, retrieval, fading, correction, and transfer review;
- complete introduce/model/guided/faded/debug/retrieve/assess/transfer coverage;
- original prose, example, starter, requirement, hint, check, feedback, solution, and assessment review;
- schema, graph, order, coverage, and reproducible-generation tests;
- actual matched-set, mutation, cascade, behavior, and hidden-case grading tests;
- semantic table, keyboard, assistive-technology, zoom, reflow, forced-color, print, tablet, and desktop verification;
- false-positive and false-negative assessment analysis;
- security review of sandbox, saved evidence, canonical answers, and learner data;
- observed true-beginner and representative-learner pilots, repair, and re-test;
- independent subject, instructional-design, assessment, accessibility, and duplication approvals.

Generated records, passing schemas, or high step counts do not satisfy these gates.

## Inspection outcome

This wave adds no concept for inventory inflation. It deepens the existing `css-attribute-selectors` concept against current primary evidence and maps the four source blocks only to concepts actually contacted. The balance-sheet mapping records its HTML table, accessibility, selector, cascade, layout, typography, Flexbox, positioning, and stacking contacts without treating any of them as approved instruction.

After this wave, the candidate alignment contains:

- 131 agent-inspected source blocks;
- 1,161 inspected source challenges;
- 1,154 captured question prompts in inspected blocks;
- 3,822 inspected implementation checks;
- 136 block-specific candidate mappings;
- 21 uninspected source blocks with exact evidence and zero guessed concepts;
- one unavailable assessment container with zero concept claims;
- 27 total source blocks still requiring challenge-level inspection;
- 184 target concepts, including eight explicit modern extensions and six unresolved concepts.

These are research facts, not a completed course. Independent reviews, original authored learner work, runtime and grading evidence, full activity matrices, representative learner observation, repair, and re-test remain blocking.
