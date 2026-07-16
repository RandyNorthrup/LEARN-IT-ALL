# Responsive Web Design v9 Design for Developers source inspection

Status: direct source inspection complete; candidate mapping only  
Reviewed: 2026-07-15  
Pinned source: freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`

This artifact records challenge-level research for the complete `design-for-developers` source module. It does not approve the benchmark, current LEARN-IT-ALL content, or replacement instruction. The benchmark controls minimum coverage and practice depth only. LEARN-IT-ALL must keep all learner-facing explanation, examples, scenarios, activities, checks, feedback, projects, and solutions original.

## Method and exact inventory

The inspection used every pinned path, hash, byte count, section inventory, prompt count, explanation, interactive example, review statement, distractor, and answer recorded by `references/freecodecamp-rwd-v9.json`. Product and behavior claims were then checked against current primary specifications, W3C accessibility guidance, government design guidance, and official product documentation.

| Source block                                 | Type    | Challenges | Prompts | Inspection result                                                                                                                                              |
| -------------------------------------------- | ------- | ---------: | ------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lecture-user-interface-design-fundamentals` | lecture |          8 |      24 | terminology; composition, balance, scale, hierarchy, alignment, whitespace and proximity; contrast; responsive images; progressive enhancement                 |
| `lecture-user-centered-design`               | lecture |         11 |      33 | user needs, research, requirements and testing; themes; breadcrumbs; cards; long collections; dialogs; progress; carts; disclosure; proportionate registration |
| `lecture-common-design-tools`                | lecture |          2 |       6 | design briefs, project constraints, prototypes, vector work, collaboration, inspection, and handoff tools                                                      |
| `review-design-fundamentals`                 | review  |          1 |       0 | prose inventory spanning all three lectures                                                                                                                    |
| `quiz-design-fundamentals`                   | quiz    |          1 |      40 | two 20-item recognition banks spanning terminology, patterns, research, tools, and visual rules                                                                |
| **Total**                                    |         |     **23** | **103** | All five blocks are agent-inspected, block-specific candidates                                                                                                 |

## Current primary authority

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) controls applicable contrast, color, focus, reflow, status, input, target, consistent-help, and error outcomes. A single palette ratio or screenshot does not prove these outcomes.
- [ARIA APG breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/) defines a breadcrumb as hierarchical parent-page links in a labelled navigation landmark with current-page state. It is not visit history or multi-step progress.
- [ARIA APG modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) requires inert outside content, deliberate initial focus, contained Tab order, Escape behavior, explicit dismissal, names, and logical focus return. A dim overlay or outside click is not a modal contract.
- [WAI Multi-page Forms](https://www.w3.org/WAI/tutorials/forms/multi-page/) requires logical stages and perceivable progress through text, title, heading, or appropriate progress structures while preserving instructions and optional-step clarity.
- [W3C COGA Making Content Usable](https://www.w3.org/TR/coga-usable/) supplies informative evidence for hierarchy, grouping, signposts, clear controls, context recovery, correction, confirmation, and reduced memory burden. It does not replace WCAG conformance or research with disabled people.
- [GOV.UK pagination guidance](https://design-system.service.gov.uk/components/pagination/) documents explicit navigation, current-page context, neighbouring destinations, zoom behavior, and keyboard problems caused by automatic infinite scroll. Pattern choice remains contextual.
- [MDN Progressive Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement), last modified 18 July 2025, defines an essential broadly usable baseline followed by capability-supported enhancement and accessibility alternatives.
- [CSS Color Adjustment Level 1](https://drafts.csswg.org/css-color-adjust/) controls supported, preferred, and used color schemes plus browser-controlled UI and forced colors. Light and dark identify scheme classes, not guaranteed palettes or contrast.
- [Sketch developer handoff](https://www.sketch.com/docs/developer-handoff/), updated 3 February 2026, and [Penpot developer tools](https://help.penpot.app/user-guide/dev-tools/) establish current inspect, measurement, prototype, asset, token, comment, permission, and handoff capabilities. Generated values still need semantic and responsive implementation judgment.
- [Adobe XD support](https://helpx.adobe.com/support/xd.html) identifies XD as maintenance-mode software. It may appear in migration context but cannot be taught as an actively evolving 2026 default or assessed as vendor trivia.

## Block findings

### User interface design fundamentals

The eight challenges give useful breadth: shared design vocabulary; layout, composition, balance and scale; visual hierarchy; alignment; whitespace types and proximity; text contrast; responsive imagery; and progressive enhancement. Interactive previews make visual differences observable.

Several claims need stronger models. Color contrast is computed from relative luminance, not intuitive hue distance. WCAG ratios depend on content and criterion; 4.5:1 is not a universal pass for every text, component, focus, state, gradient, or background. Visual hierarchy cannot contradict semantic source, reading, or focus order. Whitespace needs changed content, language, zoom, and narrow-container tests rather than aesthetic approval.

The image guidance collapses intrinsic pixel dimensions, CSS layout size, source selection, density, compression, format, decoding, cropping, art direction, and alternative text into a broad “higher PPI is better” rule. The replacement must teach responsive source selection and fit-for-purpose asset evidence already represented elsewhere in the concept graph. Progressive enhancement must identify an essential task baseline and explicit enhancement boundary rather than merely placing CSS and JavaScript in external files.

### User-centered design and research

The opening two challenges distinguish user-centered design, research, requirements, observed testing, analytics, exit feedback, NPS, and A/B testing. They correctly state that requirements change with evidence. The target course must go further: demographics are not personas or permission to stereotype; analytics reveals behavior traces rather than user intent; NPS is not a complete usability measure; A/B testing needs a hypothesis, ethics, assignment integrity, guardrails, sample and uncertainty analysis; and stakeholder preference is not user evidence.

Learners must convert supplied or observed evidence into need, context, outcome, constraint, risk, task and acceptance records. Prototype tests must separate observations, participant quotes, researcher interpretations, findings, decisions, uncertainty, and re-test plans. Privacy, consent, minimization, accessibility, and representative recruitment remain active constraints.

### Themes and dark presentation

The source recommends desaturation and avoiding pure black-white combinations. Those may be palette choices but are not universal correctness rules. The replacement begins with supported color schemes, user preference, authored foreground/background pairs, browser-controlled controls, semantic tokens, contrast in every state, forced colors, media and icon treatment, explicit user control where needed, persistence, and no-flash behavior. Learners must test complete light, dark, forced-color, increased-contrast, partial-support, and changed-background cases.

### Breadcrumbs and hierarchical wayfinding

The source correctly limits breadcrumbs to deeper hierarchies and treats them as secondary navigation. It incorrectly describes them in places as the path the visitor took. The target distinguishes stable information hierarchy from history, search entry, back navigation, and process progress. Learners must build an ordered labelled navigation landmark, identify the current page, keep separators decorative, handle long or translated labels and zoom, and reject breadcrumbs for shallow or non-hierarchical structures.

### Cards

The source discusses simplicity, media, visual priority, one button versus a clickable container, and consistent affordance. It does not establish semantic grouping, heading structure, repeated-list context, nested-interactive-content limits, accessible names, focus, touch, forced colors, missing media, or action boundaries. Hover color and shadow do not make a container operable. Learners must decide whether a card is warranted, identify primary and secondary actions, preserve real link or button behavior, and pass long-content and changed-action cases.

### Long collections and infinite scroll

The source acknowledges navigation, a load-more control, back behavior, a footer reveal, and context loss. The target treats automatic endless loading as a high-risk choice. Learners compare explicit pagination, user-requested continuation, and bounded virtualization using keyboard reachability, screen-reader status, loading and error recovery, URL and history state, deep links, final boundaries, browser back, detail return, focus restoration, changed sorting, and context preservation.

### Modal dialogs

The source prefers visible dismissal and native `dialog`, but its suggestion that clicking outside should always close a modal is unsafe and incomplete. Outside interaction can be accidental or destructive. The replacement first asks whether a normal page or inline region is better. When a modal remains justified, assessment requires inert outside content, accessible naming, appropriate initial focus, contained tab sequence, Escape and visible dismissal, long-content behavior, validation, destructive-action protection, state retention, and logical focus return.

### Multi-step progress

The source covers labelled sections, backward navigation, saved progress, simple presentation, and current location. The replacement distinguishes known from conditional totals, uses text rather than color or shape alone, exposes progress through title and main heading where pages change, preserves entered data, supports back and edit, survives refresh and session return, and provides review plus correction before commitment. A row of circles is not progress evidence.

### Shopping carts

The source covers visibility, familiar symbols, thumbnails, quantities, and a checkout action. Those visual features do not prove state correctness. Learners must provide named quantity and removal controls, visible and announced updates, accurate line items and totals, errors, unavailable or changed items, persistence, no silent loss, review, correction, confirmation, and cancellation or recovery evidence. Changed prices, discounts, tax, shipping, limits, zero quantity, concurrent updates, and failure paths are required cases.

### Progressive disclosure and proportionate registration

The source correctly keeps important information visible and delays registration until value is apparent. The target separates disclosure from hiding and registration timing from conversion tactics. Secondary complexity needs a clear persistent control, exposed state, focus behavior, refresh behavior, and discoverability. Identity or account data enters only where continuity, privacy, safety, authorization, abuse, or task completion justifies it. Anonymous state, account boundaries, data minimization, saved work, authentication failure, and recovery must be explicit.

### Design briefs and current tools

The design-brief challenge identifies objectives, outcomes, audience, competition, scope, deliverables, schedule, budget, and stakeholder review. The target adds evidence provenance, content ownership, accessibility, responsive conditions, states, failures, risks, acceptance evidence, open questions, decision history, versioning, and change control. Approval does not freeze ambiguity or turn coordinates into requirements.

The tool challenge is already stale for 2026: Adobe XD is maintenance mode, Sketch now provides browser handoff despite the source's “no cloud interface” simplification, and vendor feature lists change. The replacement teaches durable capability categories through at least one current inspectable workflow: brief, low/high-fidelity prototype, vector/raster distinction, layers, components, variables/tokens, measurements, assets, annotations, comments, permissions, versions, inspect output, implementation questions, and traceable acceptance. Vendor names are examples, never mastery targets.

### Review and quiz

The review is a useful topic inventory. The quiz contains two 20-question banks but mostly measures recognition of vocabulary, preferred examples, and vendor facts. It cannot establish pattern selection, construction, behavior, diagnosis, changed-case resilience, research interpretation, or handoff judgment.

Target review interleaves earlier HTML, CSS, accessibility, user evidence, and design decisions. Target assessment combines bounded retrieval with contrast calculation, hierarchy prediction, research-method critique, brief repair, pattern selection or rejection, semantic and keyboard inspection, failure diagnosis, changed-state behavior, and an unfamiliar interface defense. Vendor-ranking questions are prohibited.

## Replacement sequence and activity contract

The candidate course sequence does not copy this five-block order:

1. Retrieve semantic HTML, task flow, CSS source/computed evidence, typography, color, and layout constraints.
2. Gather or interpret user evidence before proposing visual solutions.
3. Model composition, balance, scale, hierarchy, proximity, readable alignment, contrast, imagery, and essential baseline behavior through prediction and changed previews.
4. Produce a versioned brief, bounded prototype, research plan, observed findings, revision decision, and inspectable developer handoff.
5. Introduce each interface pattern only after its semantic, CSS, interaction, accessibility, responsive, and state prerequisites exist; require selection and rejection reasoning.
6. Use different guided workshops, faded continuations, debugging clinics, independent labs, reviews, quizzes, delayed retrieval, and unfamiliar transfer scenarios. No activity may be a renamed card, shop, or survey recipe.
7. Require original stakeholder projects to survive changed users, content, language, media, input, preference, interruption, network, history, state, and failure conditions.

Each activity names prerequisites and retained skills. Workshops model decisions and then fade support. Debugging begins from plausible failures and requires a causal diagnosis. Labs allow defensible choices but test observable contracts. Quizzes sample misconceptions without carrying mastery alone. Projects begin from a genuinely incomplete or empty artifact and require research, implementation, testing, correction, and defense evidence.

## Grading and interaction consequences

The inline workspace must combine editable HTML and CSS, bounded native behavior where required, sandboxed preview, DOM/accessibility/computed-style diagnostics, responsive container controls, light/dark/forced-color and input conditions, keyboard operation, persistent checkpoints, progressive hints, announced feedback, and server-side canonical checks.

Design grading combines:

- user evidence, assumptions, requirements, task and failure flows;
- hierarchy, grouping, contrast, reading order, focus order, and changed-content predictions;
- parsed semantics, accessible names, states, keyboard paths, status announcements, and focus restoration;
- responsive, zoom, language, missing-media, preference, history, interruption, saved-state, and error behavior;
- brief, prototype, handoff, implementation-question, revision, and re-test traceability;
- explicit pattern selection or rejection rationale;
- delayed retrieval and unfamiliar transfer.

Code shape, a screenshot, stakeholder approval, tool-generated CSS, or a correct multiple-choice answer cannot establish mastery alone.

## Remaining blockers

- Independent subject, instructional, assessment, accessibility, safety, privacy, and representative-user reviews must confirm every concept assignment and correction.
- The complete 178-concept introduce/model/guided/faded/debug/retrieve/assess/delayed-retain/transfer matrix is not authored.
- Original Design for Developers activities, checks, hints, correction paths, secure canonical grading, and learner evidence are not authored or flow-verified.
- Tablet and desktop editor behavior, accessible phone handoff, theme conditions, keyboard paths, focus restoration, persistence, and assistive-technology feedback require observed learner testing.
- Eighty source blocks still need challenge-level inspection; 64 blocks and one unavailable assessment container retain exact evidence with zero guessed concept assignments.
- Lighthouse remains on hold until all content, migration, duplication, editor, progress, navigation, review, and pilot work is complete.
