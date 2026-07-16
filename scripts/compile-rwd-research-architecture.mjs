// Compile reviewed research graphs into a reproducible candidate architecture.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const readJson = async (...segments) =>
  JSON.parse(await readFile(path.join(root, ...segments), 'utf8'));

const htmlGraph = await readJson(
  'docs',
  'research',
  'courses',
  'responsive-web-design-html-concepts.json'
);
const cssGraph = await readJson(
  'docs',
  'research',
  'courses',
  'responsive-web-design-css-concepts.json'
);
const alignment = await readJson(
  'docs',
  'research',
  'courses',
  'responsive-web-design-concept-alignment.json'
);

const graphs = [htmlGraph, cssGraph];
const concepts = graphs.flatMap((graph) => graph.concepts);
const conceptById = new Map(concepts.map((concept) => [concept.id, concept]));
const module = (
  id,
  title,
  conceptIds,
  retrievalConceptIds,
  cumulativeArtifact,
  newComplexityBoundary
) => ({
  id,
  title,
  conceptIds,
  retrievalConceptIds,
  cumulativeArtifact,
  newComplexityBoundary,
});

const moduleDefinitions = [
  module(
    'html-first-content',
    'Build Meaningful Page Content Immediately',
    [
      'html-workspace-feedback-loop',
      'html-purpose-structure',
      'html-element-anatomy',
      'html-text-whitespace',
      'html-nesting-tree',
      'html-content-models',
      'html-paragraphs-breaks',
      'html-heading-hierarchy',
      'html-lists',
    ],
    [],
    'A saved community notice with a meaningful heading, paragraphs, and list whose source, tree, preview, and checkpoint remain distinguishable.',
    'Only the source-preview loop, element anatomy, ordinary text, nesting, allowed relationships, headings, paragraphs, and lists enter while the learner builds immediately.'
  ),
  module(
    'html-source-syntax-and-repair',
    'Read, Author, and Repair HTML Source',
    [
      'html-tag-element-distinction',
      'html-void-elements',
      'html-attribute-syntax',
      'html-attribute-value-types',
      'html-comments-character-references',
      'html-parser-recovery',
    ],
    ['html-element-anatomy', 'html-nesting-tree', 'html-content-models'],
    'The notice gains behavior-changing attributes, comments, reserved characters, and repaired malformed cases with source-to-DOM evidence.',
    'Tag/node distinctions, void syntax, attribute forms, character references, comments, and parser recovery enter only after usable page content exists.'
  ),
  module(
    'tooling-local-projects',
    'Own Files, Folders, Input, and Local Project State',
    [
      'tooling-local-computer-resources',
      'tooling-input-methods-ergonomics',
      'tooling-developer-tool-landscape',
      'tooling-file-manager-operations',
      'tooling-file-naming-portability',
      'tooling-project-folder-organization',
      'tooling-file-types-search-inspection',
    ],
    ['html-workspace-feedback-loop', 'html-purpose-structure'],
    'The saved notice becomes a portable learner-owned project with reversible file operations, a verified folder tree, and an ergonomic input plan.',
    'Local resources, input safety, tool roles, file operations, portable naming, folder organization, and type inspection enter around the existing artifact rather than before HTML.'
  ),
  module(
    'tooling-web-browser-research',
    'Use Browsers, Accounts, Search, and the Web Safely',
    [
      'tooling-internet-access-layers',
      'tooling-account-signin-security',
      'tooling-browser-install-update-engines',
      'tooling-browser-site-search-engine',
      'tooling-search-query-refinement',
    ],
    ['html-workspace-feedback-loop', 'tooling-local-computer-resources'],
    'The learner verifies the project in a supported browser and records a safe, reproducible research trail without exposing credentials or confusing browser, site, and search boundaries.',
    'Internet layers, account safety, browser engines and updates, destinations versus search, and query refinement enter only when the learner needs external evidence.'
  ),
  module(
    'html-documents-paths-and-loading',
    'Build Complete Documents and Trace Browser Loading',
    [
      'html-doctype-rendering-mode',
      'html-document-root-head-body',
      'html-document-language',
      'html-character-encoding',
      'html-title-metadata',
      'html-discovery-metadata',
      'html-viewport-metadata',
      'html-files-paths-urls',
      'html-browser-request-parse-render',
      'html-authority-research-verification',
    ],
    [
      'html-attribute-syntax',
      'html-parser-recovery',
      'tooling-project-folder-organization',
      'tooling-search-query-refinement',
    ],
    'The notice becomes a complete portable multi-page document set with truthful metadata, working paths, observable requests, and source-backed decisions.',
    'Document mode and envelope, language, encoding, metadata, paths, URLs, loading, rendering, and authority verification enter without adding media or CSS.'
  ),
  module(
    'html-links-and-navigation',
    'Connect Destinations with Purposeful Links',
    ['html-links-destinations', 'html-link-purpose-fragments'],
    ['html-files-paths-urls', 'html-attribute-syntax', 'html-heading-hierarchy'],
    'The document set gains working relative, absolute, fragment, email, telephone, and download paths with clear purpose and recovery from changed locations.',
    'Only link destinations, URL behavior, fragments, and link purpose enter while earlier document and path correctness remains active.'
  ),
  module(
    'html-images-graphics-and-rights',
    'Choose and Explain Images, Graphics, and Rights',
    [
      'html-replaced-content-boundaries',
      'html-images-purpose-alt',
      'html-image-dimensions-loading',
      'html-figures-captions',
      'html-media-rights-licensing',
      'html-svg-semantics',
    ],
    ['html-files-paths-urls', 'html-attribute-value-types', 'html-link-purpose-fragments'],
    'The guide gains purpose-classified images and scalable graphics with dimensions, alternatives, captions, failure behavior, and recorded permission evidence.',
    'Replaced-content boundaries, image purpose, dimensions and loading, figures, rights, and SVG enter before time-based media or embedded third parties.'
  ),
  module(
    'html-media-and-embeds',
    'Provide Equivalent Audio, Video, and Embeds',
    ['html-audio-video', 'html-captions-transcripts', 'html-iframe-title-permissions'],
    ['html-replaced-content-boundaries', 'html-files-paths-urls', 'html-images-purpose-alt'],
    'The guide gains controlled media, captions or transcripts, fallbacks, and one constrained external embed with title, permissions, privacy, and failure evidence.',
    'Time-based media and third-party embed boundaries enter only after paths, replaced content, alternatives, and external-source evaluation are usable.'
  ),
  module(
    'html-semantic-text',
    'Express Meaning in Quotations, Dates, Code, and Language',
    [
      'html-emphasis-importance',
      'html-quotations-citations',
      'html-abbreviations-expansions',
      'html-contact-address-links',
      'html-time-machine-values',
      'html-subscript-superscript',
      'html-code-preformatted-text',
      'html-editorial-annotations',
      'html-ruby-annotations',
    ],
    [
      'html-heading-hierarchy',
      'html-paragraphs-breaks',
      'html-content-models',
      'html-links-destinations',
    ],
    'The guide gains evidence-rich prose whose emphasis, quotations, citations, abbreviations, contacts, dates, scientific notation, code, edits, and language annotations carry explicit meaning.',
    'Specialized text semantics enter from actual content requirements; none is taught as a visual-formatting shortcut.'
  ),
  module(
    'html-landmarks-sections-and-disclosure',
    'Organize Landmarks, Sections, Articles, and Native Disclosure',
    [
      'html-landmarks',
      'html-sectioning-articles',
      'html-details-summary',
      'html-native-controls-first',
    ],
    ['html-heading-hierarchy', 'html-content-models', 'html-link-purpose-fragments'],
    'The guide becomes a navigable information architecture with purposeful landmarks, sections, articles, headings, and native disclosure behavior.',
    'Page-region and disclosure relationships enter while source order, headings, link purpose, and media alternatives remain enforced.'
  ),
  module(
    'html-forms-data-and-controls',
    'Collect Intentional Data with Native Controls',
    [
      'html-form-submission-data',
      'html-form-labels-instructions',
      'html-input-types-autocomplete',
      'html-choice-groups',
      'html-textarea-select-buttons',
    ],
    ['html-native-controls-first', 'html-document-language', 'html-heading-hierarchy'],
    'The guide gains a request workflow whose submitted names and values, labels, instructions, autocomplete, grouped choices, text areas, selections, and buttons are observable.',
    'Form ownership, submitted data, labels, input purpose, choice grouping, and native controls enter before validation and recovery complexity.'
  ),
  module(
    'html-form-validation-and-recovery',
    'Validate, Explain, Correct, and Recover Form Input',
    ['html-form-control-states', 'html-native-validation', 'html-form-errors-recovery'],
    ['html-form-labels-instructions', 'html-attribute-value-types', 'html-native-controls-first'],
    'The request workflow gains perceivable states, native constraints, specific error evidence, retained valid data, correction, and successful resubmission.',
    'Control state, constraint behavior, error communication, correction, and recovery enter only after submission and labeling work end to end.'
  ),
  module(
    'html-data-tables',
    'Represent Two-Dimensional Data and Header Relationships',
    [
      'html-tables-purpose',
      'html-table-structure',
      'html-table-cell-spans',
      'html-table-header-associations',
    ],
    ['html-lists', 'html-content-models', 'html-form-labels-instructions'],
    'The guide gains a genuine service schedule with caption, row groups, spans only where necessary, and programmatically verified header context.',
    'Tabular purpose, structure, spans, and header association enter without using tables for page layout.'
  ),
  module(
    'html-accessibility-models',
    'Inspect People, Barriers, Names, Trees, Order, and ARIA Boundaries',
    [
      'html-accessibility-user-barriers-tools',
      'html-native-accessibility-tree',
      'html-accessible-name-description',
      'html-accessibility-tree-inclusion',
      'html-source-order-keyboard',
      'html-aria-boundary',
      'html-accessibility-evaluation-evidence',
    ],
    [
      'html-landmarks',
      'html-images-purpose-alt',
      'html-form-errors-recovery',
      'html-table-header-associations',
      'html-captions-transcripts',
    ],
    'Learners inspect and repair the complete guide through user barriers, keyboard tasks, DOM and accessibility trees, names, descriptions, inclusion, source order, native semantics, ARIA limits, and complementary evaluation.',
    'Accessibility models become explicit evidence tools for correctness already required throughout HTML; automation is never treated as complete proof.'
  ),
  module(
    'html-validation-and-changed-cases',
    'Diagnose HTML with Validation and Changed Cases',
    ['html-validation-inspection', 'html-changed-case-testing'],
    [
      'html-parser-recovery',
      'html-document-root-head-body',
      'html-accessibility-evaluation-evidence',
      'html-form-errors-recovery',
      'html-table-header-associations',
    ],
    'Learners diagnose and repair interacting source, DOM, path, request, accessibility, form, table, and content failures, then preserve each repair with changed-case checks.',
    'Causal validation and regression evidence integrate prior HTML mechanisms; no new page feature enters.'
  ),
  module(
    'html-independent-transfer',
    'Build and Defend an Independent HTML Service',
    ['html-independent-transfer-defense'],
    [
      'html-document-root-head-body',
      'html-link-purpose-fragments',
      'html-sectioning-articles',
      'html-form-errors-recovery',
      'html-table-header-associations',
      'html-changed-case-testing',
    ],
    'An unfamiliar multi-page stakeholder service is built from empty files and defended with content, behavior, accessibility, failure, validation, privacy, and changed-case evidence.',
    'No new HTML mechanism enters; complexity comes from independent selection, integration, testing, revision, tradeoffs, and defense.'
  ),
  module(
    'css-first-rules',
    'Apply and Inspect the First CSS Rules',
    [
      'css-source-preview-loop',
      'css-purpose-and-boundary',
      'css-rule-declaration-anatomy',
      'css-application-and-loading',
      'css-type-class-id-selectors',
    ],
    [
      'html-purpose-structure',
      'html-document-root-head-body',
      'html-source-order-keyboard',
      'html-validation-inspection',
    ],
    'The independent HTML service gains a separately loaded stylesheet with inspectable rules, bounded type/class/ID matching, saved state, and a usable task path when author CSS is unavailable.',
    'CSS purpose, rule anatomy, loading, and basic selectors enter without advanced cascade, layout, or design-system mechanisms.'
  ),
  module(
    'css-selectors-and-states',
    'Match Relationships, Attributes, States, and Fragments',
    [
      'css-selector-lists-combinators',
      'css-attribute-selectors',
      'css-pseudo-classes',
      'css-pseudo-elements',
      'css-list-markers-counters',
    ],
    ['css-rule-declaration-anatomy', 'css-type-class-id-selectors', 'html-heading-hierarchy'],
    'The stylesheet gains relationship, attribute, state, pseudo-element, marker, and counter rules whose complete matched sets survive changed markup.',
    'Selector composition and presentational fragments enter while semantics, persistent content, and behavior remain in HTML.'
  ),
  module(
    'css-cascade-inheritance-and-layers',
    'Predict Inheritance, Cascade, Specificity, Layers, and Link States',
    [
      'css-inheritance-initial-unset-revert',
      'css-cascade-origins-importance-order',
      'css-specificity-functional-selectors',
      'css-cascade-layers-scope',
      'css-link-state-sequence',
    ],
    [
      'css-rule-declaration-anatomy',
      'css-application-and-loading',
      'css-attribute-selectors',
      'css-pseudo-classes',
    ],
    'The stylesheet gains predictable conflict resolution, bounded layer ownership, functional-selector specificity traces, and complete keyboard/pointer link-state behavior.',
    'Inheritance, origins, importance, specificity, source order, layers, scope, and link-state conflicts enter before reusable value systems.'
  ),
  module(
    'css-custom-properties',
    'Own Reusable Values and Registered Property Contracts',
    ['css-custom-properties-fallbacks', 'css-registered-custom-properties'],
    ['css-inheritance-initial-unset-revert', 'css-cascade-origins-importance-order'],
    'The stylesheet gains purpose-named reusable values with observable substitution, fallback, inheritance, registration, invalid-value, and animation behavior.',
    'Unregistered substitution and registered property contracts enter as distinct computed-value models, not as a token-numbering recipe.'
  ),
  module(
    'css-flow-display-and-box-model',
    'Reason from Display and the Box Model',
    [
      'css-outer-inner-display',
      'css-box-model-areas',
      'css-box-sizing-models',
      'css-margin-collapse-formatting-contexts',
    ],
    [
      'css-rule-declaration-anatomy',
      'css-cascade-origins-importance-order',
      'html-text-whitespace',
    ],
    'The styled service gains explainable outer and inner display behavior with measured content, padding, border, margin, sizing, collapse, and formatting-context evidence.',
    'Outer/inner display, box arithmetic, box sizing, margin collapse, and formatting contexts enter before sizing constraints or layout systems.'
  ),
  module(
    'css-sizing-units-and-overflow',
    'Size Normal-Flow Content with Constraints, Units, Math, and Overflow',
    [
      'css-intrinsic-extrinsic-sizing',
      'css-absolute-font-relative-viewport-units',
      'css-percentages-containing-blocks',
      'css-calculated-value-math',
      'css-min-max-clamp-functions',
      'css-overflow-containment-scroll',
      'css-logical-properties-writing-modes',
      'css-normal-flow',
    ],
    ['css-box-model-areas', 'css-box-sizing-models'],
    'Normal-flow components gain content-driven minimums, maximums, logical dimensions, computed math, and intentional overflow behavior across changed text, writing mode, and containing blocks.',
    'Sizing contributions, units, percentages, calculations, bounds, overflow, containment, logical dimensions, and the normal-flow baseline enter before Flex, Grid, or positioning.'
  ),
  module(
    'css-backgrounds-borders-and-transforms',
    'Paint and Transform Boxes without Hiding Structure',
    ['css-backgrounds-borders-shadows', 'css-transform-reference-boxes'],
    ['css-box-model-areas', 'css-percentages-containing-blocks', 'html-images-purpose-alt'],
    'Components gain purposeful backgrounds, borders, shadows, and transforms whose paint layers, reference boxes, hit areas, and semantic boundaries remain observable.',
    'Box paint and transform geometry enter before color-system effects; decoration never substitutes for content, redaction, or behavior.'
  ),
  module(
    'css-fonts-and-loading',
    'Select, Load, and Stabilize Font Resources',
    [
      'css-font-stacks-generic-fallbacks',
      'css-web-font-sources-loading',
      'css-font-metrics-fallback-stability',
      'css-variable-fonts-features',
    ],
    ['css-inheritance-initial-unset-revert', 'css-intrinsic-extrinsic-sizing'],
    'The interface gains licensed, observable font delivery with resilient stacks, fallback metrics, failure behavior, variable axes, language features, and layout-stability evidence.',
    'Font selection, delivery, metrics, fallback, synthesis, and variable features enter before typographic composition.'
  ),
  module(
    'css-text-and-typography',
    'Compose Readable Type and Text Layout',
    [
      'css-type-scale-line-height',
      'css-readable-measure-alignment',
      'css-text-wrap-spacing-decoration',
      'css-text-decoration-shadows-emphasis',
    ],
    [
      'css-font-stacks-generic-fallbacks',
      'css-font-metrics-fallback-stability',
      'css-intrinsic-extrinsic-sizing',
      'html-heading-hierarchy',
    ],
    'The interface gains readable type scale, line height, measure, alignment, wrapping, language-aware spacing, and decorations that survive changed content and font failure.',
    'Typographic composition and text paint enter from reading tasks rather than genre stereotypes or copied label dimensions.'
  ),
  module(
    'css-color-contrast-and-effects',
    'Build Color Roles, Contrast, Gradients, and Filter Fallbacks',
    [
      'css-color-spaces-alpha',
      'css-derived-color-functions',
      'css-contrast-noncolor-meaning',
      'css-filter-effects-fallbacks',
      'css-gradients-background-images',
    ],
    [
      'css-backgrounds-borders-shadows',
      'css-calculated-value-math',
      'css-readable-measure-alignment',
    ],
    'The interface gains semantic color roles, modern color calculations, non-color meaning, gradients, and bounded filters with contrast and unavailable-effect evidence.',
    'Color models, alpha, derived functions, contrast, gradients, and filters enter without treating visual effects as confidentiality, state, or accessibility proof.'
  ),
  module(
    'design-user-needs-and-prototypes',
    'Translate User Evidence into Task Flows and Tested Prototypes',
    [
      'design-user-needs-task-flows',
      'css-visual-hierarchy-spacing',
      'design-prototypes-evaluation-iteration',
      'design-brief-handoff-artifacts',
      'design-progressive-enhancement',
    ],
    ['html-sectioning-articles', 'html-form-errors-recovery', 'css-purpose-and-boundary'],
    'Learners turn stakeholder and user evidence into task flows, bounded prototypes, evaluation findings, revisions, a decision-ready brief, and a progressively enhanced baseline.',
    'User research, task evidence, prototype fidelity, evaluation, handoff, and progressive enhancement enter before component-system styling decisions.'
  ),
  module(
    'design-systems-and-components',
    'Create Hierarchy, Tokens, Components, and Recoverable States',
    [
      'css-design-tokens-theming',
      'design-hierarchical-wayfinding',
      'design-card-content-actions',
      'design-progressive-disclosure-registration',
      'css-form-control-states',
    ],
    [
      'design-user-needs-task-flows',
      'design-prototypes-evaluation-iteration',
      'css-custom-properties-fallbacks',
      'css-contrast-noncolor-meaning',
      'html-form-labels-instructions',
    ],
    'The product gains evidence-backed hierarchy, spacing, semantic tokens, wayfinding, cards, registration disclosure, and complete form-control states across a reusable component set.',
    'Component and design-system decisions enter only after user tasks, content, typography, color, and progressive enhancement have evidence.'
  ),
  module(
    'css-flex-layout',
    'Solve One-Dimensional Layout with Flex Constraints',
    [
      'css-flex-container-items-axes',
      'css-flex-direction-wrap-lines',
      'css-flex-basis-grow-shrink',
      'css-flex-alignment-distribution',
      'css-flex-gap-spacing',
      'css-flex-order-accessibility',
      'css-flex-component-transfer',
    ],
    [
      'css-normal-flow',
      'css-intrinsic-extrinsic-sizing',
      'css-visual-hierarchy-spacing',
      'html-source-order-keyboard',
    ],
    'Navigation, toolbars, media objects, forms, and card groups adapt through axes, wrapping, free-space sizing, alignment, gaps, and source-order-safe Flex choices.',
    'Flex containers, items, axes, lines, sizing, alignment, gaps, order, and component selection solve one-dimensional relationships only.'
  ),
  module(
    'css-grid-layout',
    'Compose Two-Dimensional Layout with Grid and Subgrid',
    [
      'css-grid-container-tracks-cells',
      'css-grid-explicit-tracks-fr',
      'css-grid-repeat-minmax-intrinsic',
      'css-grid-line-placement-spans',
      'css-grid-template-areas',
      'css-grid-auto-placement-dense',
      'css-grid-alignment-distribution',
      'css-subgrid-alignment',
    ],
    ['css-normal-flow', 'css-flex-component-transfer', 'css-intrinsic-extrinsic-sizing'],
    'The product gains content-led two-dimensional regions, track sizing, explicit and automatic placement, named areas, alignment, and nested subgrid relationships with source-order evidence.',
    'Grid tracks, lines, placement, areas, automatic flow, alignment, and subgrid enter after learners can distinguish one- from two-dimensional constraints.'
  ),
  module(
    'css-positioning-stacking-and-floats',
    'Trace Containing Blocks, Positioning, Stacking, Anchors, and Floats',
    [
      'css-positioning-containing-blocks',
      'css-anchor-positioning-fallbacks',
      'css-stacking-contexts-z-index',
      'css-floats-content-wrapping',
    ],
    ['css-normal-flow', 'css-percentages-containing-blocks', 'css-grid-template-areas'],
    'The product gains bounded overlays, sticky context, traceable paint order, support-gated anchor placement, and genuine figure wrapping without coordinate tracing.',
    'Containing blocks, positioning schemes, stacking contexts, anchor fallbacks, and remaining float use enter without replacing normal layout systems.'
  ),
  module(
    'responsive-fluid-foundations',
    'Build Fluid Defaults, Media, Queries, and Content Breakpoints',
    [
      'responsive-fluid-default',
      'responsive-viewport-zoom',
      'responsive-fluid-media',
      'responsive-image-selection',
      'responsive-media-query-model',
      'responsive-content-breakpoints',
      'responsive-mobile-first-enhancement',
      'responsive-range-syntax-overlap',
      'responsive-grid-auto-fit-fill',
    ],
    [
      'css-intrinsic-extrinsic-sizing',
      'css-flex-component-transfer',
      'css-grid-repeat-minmax-intrinsic',
      'html-viewport-metadata',
    ],
    'The product works fluidly across continuous widths, zoom, media failures, image candidates, intrinsic grids, and content-derived query boundaries before named device assumptions.',
    'Fluid defaults, viewport behavior, media selection, media queries, content breakpoints, narrow-first enhancement, range logic, and intrinsic grids enter together.'
  ),
  module(
    'responsive-components-navigation-and-testing',
    'Adapt Components, Navigation, and Continuous-Size Evidence',
    [
      'responsive-container-query-model',
      'responsive-container-query-units',
      'responsive-navigation-disclosure',
      'design-long-collection-navigation',
      'responsive-test-matrix',
    ],
    [
      'responsive-media-query-model',
      'responsive-content-breakpoints',
      'css-form-control-states',
      'css-flex-order-accessibility',
      'html-link-purpose-fragments',
    ],
    'Reusable components adapt to their containers; navigation remains complete; long collections remain findable; and a continuous-size, zoom, orientation, input, preference, and changed-content matrix records evidence.',
    'Container context, container units, complete navigation disclosure, collection wayfinding, and systematic responsive evidence extend viewport adaptation.'
  ),
  module(
    'interface-accessible-interaction',
    'Support Zoom, Focus, Input Capabilities, Targets, and Dialog Tasks',
    [
      'css-zoom-reflow-text-spacing',
      'css-focus-visible-indicators',
      'css-input-capability-adaptation',
      'css-target-size-spacing',
      'design-modal-dialog-focus',
    ],
    [
      'css-contrast-noncolor-meaning',
      'responsive-test-matrix',
      'css-pseudo-classes',
      'html-source-order-keyboard',
    ],
    'The responsive product preserves tasks under zoom and text spacing, exposes visible focus, adapts to input capabilities, provides usable targets, and completes dialog focus and return behavior.',
    'Interaction evidence enters across keyboard, pointer, touch, zoom, and dialog states without device detection or hover-only assumptions.'
  ),
  module(
    'interface-workflows-preferences-and-output',
    'Preserve Recovery, Correction, Forced Colors, and Non-Screen Output',
    [
      'design-multistep-progress-recovery',
      'design-cart-review-correction',
      'css-forced-colors-preferences',
      'css-print-and-non-screen-media',
    ],
    [
      'css-form-control-states',
      'css-focus-visible-indicators',
      'css-zoom-reflow-text-spacing',
      'css-design-tokens-theming',
      'responsive-media-query-model',
    ],
    'Multistep and review workflows preserve status, correction, and valid work while the visual system remains usable in forced colors, print, and other non-screen outputs.',
    'Workflow recovery and output preferences enter as complete task contracts, not late visual overrides.'
  ),
  module(
    'css-motion-transitions-and-animation',
    'Use Purposeful, Controllable, Preference-Safe Motion',
    [
      'css-reduced-motion-preference',
      'css-transitions-state-change',
      'css-keyframe-animation-model',
    ],
    ['responsive-media-query-model', 'css-pseudo-classes', 'css-focus-visible-indicators'],
    'The product gains bounded state transitions and keyframe sequences with explicit purpose, timing evidence, controls, equivalent reduced modes, and no hidden task information.',
    'Preference-safe transition and animation models enter after state, focus, responsive, and recovery behavior already works without motion.'
  ),
  module(
    'css-debugging-performance-and-regression',
    'Diagnose CSS, Measure Rendering, and Protect Changed Cases',
    [
      'css-devtools-causal-debugging',
      'css-rendering-performance-stability',
      'css-changed-case-regression',
    ],
    [
      'css-cascade-layers-scope',
      'css-stacking-contexts-z-index',
      'responsive-test-matrix',
      'css-web-font-sources-loading',
      'responsive-image-selection',
      'css-transitions-state-change',
    ],
    'Learners diagnose cascade, layout, paint, request, font, image, motion, and rendering defects from recorded evidence, then preserve repairs with behavior and changed-case regression checks.',
    'Causal debugging, runtime performance, rendering stability, and regression evidence integrate prior CSS; no new visual feature enters.'
  ),
  module(
    'css-independent-responsive-transfer',
    'Research, Build, Test, and Defend an Independent Responsive Product',
    ['css-independent-transfer-defense'],
    [
      'css-cascade-layers-scope',
      'design-user-needs-task-flows',
      'css-flex-component-transfer',
      'css-grid-template-areas',
      'responsive-navigation-disclosure',
      'css-changed-case-regression',
    ],
    'A wholly unfamiliar multi-page responsive product is researched, designed, built from empty stylesheets, tested, revised, and defended through user, semantic, cascade, layout, accessibility, responsive, performance, and changed-case evidence.',
    'No new web mechanism enters; the learner independently selects, integrates, verifies, revises, and defends an evidence-backed stakeholder outcome.'
  ),
];

const moduleIds = moduleDefinitions.map((definition) => definition.id);
const moduleOrder = new Map(moduleIds.map((moduleId, index) => [moduleId, index + 1]));
const assignedConceptIds = moduleDefinitions.flatMap((definition) => definition.conceptIds);
if (new Set(assignedConceptIds).size !== assignedConceptIds.length) {
  throw new Error('Repaired architecture assigns one or more concepts more than once.');
}
if (
  assignedConceptIds.length !== concepts.length ||
  assignedConceptIds.some((conceptId) => !conceptById.has(conceptId)) ||
  concepts.some((concept) => !assignedConceptIds.includes(concept.id))
) {
  throw new Error('Repaired architecture must assign every researched concept exactly once.');
}
const conceptModule = new Map(
  moduleDefinitions.flatMap((definition) =>
    definition.conceptIds.map((conceptId) => [conceptId, definition.id])
  )
);

const sourceObjectiveIds = alignment.alignments
  .filter((record) => record.mappingBasis === 'block-specific-source')
  .map((record) => record.objectiveId);
const unmappedSourceObjectiveIds = alignment.alignments
  .filter((record) => record.mappingBasis !== 'block-specific-source')
  .map((record) => record.objectiveId);
const mappedSourceObjectiveIdSet = new Set(sourceObjectiveIds);
const sourceObjectiveIdsByModule = new Map(
  moduleIds.map((moduleId) => [
    moduleId,
    alignment.alignments
      .filter((record) =>
        record.conceptIds.some((conceptId) => conceptModule.get(conceptId) === moduleId)
      )
      .map((record) => record.objectiveId),
  ])
);

const modules = moduleIds.map((moduleId, index) => {
  const definition = moduleDefinitions[index];
  const moduleConcepts = definition.conceptIds.map((conceptId) => conceptById.get(conceptId));
  if (moduleConcepts.some((concept) => !concept)) {
    throw new Error(`Architecture module ${moduleId} contains an unknown concept.`);
  }
  const crossPrerequisiteModules = moduleConcepts.flatMap((concept) =>
    concept.prerequisiteIds
      .map((conceptId) => conceptModule.get(conceptId))
      .filter((owner) => owner && owner !== moduleId)
  );
  if (index > 0) crossPrerequisiteModules.push(moduleIds[index - 1]);
  const prerequisiteModuleIds = [...new Set(crossPrerequisiteModules)].sort(
    (left, right) => moduleOrder.get(left) - moduleOrder.get(right)
  );
  return {
    id: moduleId,
    title: definition.title,
    order: index + 1,
    prerequisiteModuleIds,
    conceptIds: definition.conceptIds,
    sourceObjectiveIds: sourceObjectiveIdsByModule.get(moduleId),
    retrievalConceptIds: definition.retrievalConceptIds,
    cumulativeArtifact: definition.cumulativeArtifact,
    newComplexityBoundary: definition.newComplexityBoundary,
    currentState: 'planned-not-authored',
  };
});

const projects = [
  {
    id: 'community-support-intake',
    title: 'Community Support Intake and Service Schedule',
    scenarioDomain: 'mutual-aid-coordination',
    stakeholderNeed:
      'A neighborhood mutual-aid coordinator needs residents to understand available support, request help privately, and compare service times without losing access on keyboard or assistive technology.',
    artifact:
      'A multi-page semantic service guide, request form, and data schedule built from empty HTML files.',
    placementAfterModuleId: 'html-independent-transfer',
    conceptIds: [
      'html-document-root-head-body',
      'html-landmarks',
      'html-form-submission-data',
      'html-form-errors-recovery',
      'html-table-header-associations',
      'html-changed-case-testing',
      'html-independent-transfer-defense',
    ],
    sourceObjectiveIds: ['fcc-v9-lab-survey-form'],
    requirements: [
      'Represent service, privacy, eligibility, and response expectations in semantic content before collecting data.',
      'Submit only intentionally named values and preserve labels, grouping, instructions, autocomplete, and recovery.',
      'Present real two-dimensional schedule data with caption and verified header context.',
      'Survive missing media, duplicate identifiers, long translated content, invalid input, zoom, and keyboard use.',
      'Record validation, DOM, accessibility, network, and changed-case evidence with remaining limits.',
    ],
    evidence: [
      'Runnable form-data and changed-input checks',
      'Keyboard and accessibility-tree task record',
      'Element-choice, privacy, table, and test-limit defense',
    ],
    starterPolicy:
      'Begin from an empty project and stakeholder evidence; no workshop source, requirement order, visual recipe, or final solution is supplied.',
    currentState: 'planned-not-authored',
  },
  {
    id: 'neighborhood-history-exhibit',
    title: 'Neighborhood History Evidence Exhibit',
    scenarioDomain: 'local-history-interpretation',
    stakeholderNeed:
      'A neighborhood archive needs visitors to understand one consequential local event through sourced records, images, quotations, dates, and uncertainty without turning commemoration into unsupported praise.',
    artifact:
      'A semantic, sourced, accessible interpretive exhibit with a readable visual system and explicit evidence limits.',
    placementAfterModuleId: 'design-systems-and-components',
    conceptIds: [
      'html-images-purpose-alt',
      'html-figures-captions',
      'html-quotations-citations',
      'html-time-machine-values',
      'html-sectioning-articles',
      'css-readable-measure-alignment',
      'css-contrast-noncolor-meaning',
      'design-user-needs-task-flows',
      'css-visual-hierarchy-spacing',
    ],
    sourceObjectiveIds: ['fcc-v9-lab-tribute-page'],
    requirements: [
      'Build the narrative from supplied primary and secondary records while marking disputed, inferred, and unknown claims.',
      'Use headings, sections, figures, quotations, citations, and machine-readable dates according to their actual relationships.',
      'Write image alternatives that distinguish informative evidence from adjacent-caption repetition and decoration.',
      'Create readable type, measure, spacing, emphasis, and color roles that remain usable without color and under zoom.',
      'Replace one contradicted record and defend every resulting content, semantic, and visual revision.',
    ],
    evidence: [
      'Source-to-claim trace with uncertainty and correction record',
      'Semantic, image-alternative, reading-order, contrast, and zoom inspection',
      'Hierarchy, typography, content-selection, and residual-risk defense',
    ],
    starterPolicy:
      'Supply a bounded evidence packet and stakeholder constraints only; no tribute-page prose, markup, visual recipe, requirement order, or final solution is provided.',
    currentState: 'planned-not-authored',
  },
  {
    id: 'emergency-preparedness-field-guide',
    title: 'Emergency Preparedness Field Guide',
    scenarioDomain: 'emergency-information-access',
    stakeholderNeed:
      'A regional preparedness team needs a trustworthy field guide that works in narrow or wide containers, supports long translated procedures, and keeps urgent navigation usable under zoom and mixed input.',
    artifact:
      'A content-driven responsive documentation system with adaptive navigation, media, and reusable information components.',
    placementAfterModuleId: 'responsive-components-navigation-and-testing',
    conceptIds: [
      'html-link-purpose-fragments',
      'html-sectioning-articles',
      'css-grid-repeat-minmax-intrinsic',
      'responsive-fluid-default',
      'responsive-content-breakpoints',
      'responsive-container-query-model',
      'responsive-navigation-disclosure',
      'responsive-test-matrix',
    ],
    sourceObjectiveIds: ['fcc-v9-lab-technical-documentation-page'],
    requirements: [
      'Structure procedures, warnings, references, and updates for reading and fragment navigation without CSS.',
      'Adapt navigation through complete disclosure behavior rather than hiding destinations at narrow widths.',
      'Choose breakpoints from content failure and component queries from container context.',
      'Support long translation, changed heading depth, missing media, zoom, keyboard, touch, and orientation cases.',
      'Record continuous-size boundary tests and distinguish viewport from container adaptation decisions.',
    ],
    evidence: [
      'Navigation keyboard, disclosure, and fragment behavior record',
      'Viewport and container changed-case matrix',
      'Breakpoint, layout, media, and remaining-risk defense',
    ],
    starterPolicy:
      'Begin from stakeholder content packets and risk scenarios; no technical-documentation workshop source, navigation shell, CSS, or breakpoint list is supplied.',
    currentState: 'planned-not-authored',
  },
  {
    id: 'community-energy-program-launch',
    title: 'Community Energy Program Launch',
    scenarioDomain: 'community-energy-enrollment',
    stakeholderNeed:
      'A nonprofit energy cooperative needs residents to understand a complex program, compare commitments, enroll confidently, and verify claims across devices, preferences, and failure conditions.',
    artifact:
      'An independently researched, designed, built, tested, and defended multi-page responsive program experience.',
    placementAfterModuleId: 'css-debugging-performance-and-regression',
    conceptIds: [
      'html-discovery-metadata',
      'html-form-errors-recovery',
      'design-user-needs-task-flows',
      'design-prototypes-evaluation-iteration',
      'css-cascade-layers-scope',
      'css-grid-template-areas',
      'responsive-image-selection',
      'responsive-container-query-units',
      'css-reduced-motion-preference',
      'css-changed-case-regression',
    ],
    sourceObjectiveIds: ['fcc-v9-lab-product-landing-page'],
    requirements: [
      'Trace program content and interface decisions to supplied user and stakeholder evidence rather than marketing preference.',
      'Build truthful page identity, comparison content, enrollment recovery, and complete keyboard task paths.',
      'Use explicit cascade, component, grid, viewport, and container architecture without copied templates.',
      'Adapt media, type, focus, targets, contrast, motion, forced colors, zoom, print, and performance behavior.',
      'Run changed-content, boundary, failure, preference, accessibility, and rendering-stability regression evidence.',
      'Defend tradeoffs, rejected alternatives, evidence limits, residual risks, and a prioritized next research round.',
    ],
    evidence: [
      'Independent behavior and changed-case check suite',
      'Representative accessibility and responsive task record',
      'User-need, design, implementation, test, performance, and residual-risk defense',
    ],
    starterPolicy:
      'Start from research evidence, content, and acceptance criteria only; no landing-page starter, workshop layout, requirement sequence, styling recipe, or final solution is provided.',
    currentState: 'planned-not-authored',
  },
  {
    id: 'professional-evidence-portfolio',
    title: 'Professional Evidence Portfolio',
    scenarioDomain: 'professional-practice-evidence',
    stakeholderNeed:
      "A real prospective collaborator needs to understand the learner's verified capabilities, decisions, work samples, limits, and contact path without invented projects, fake metrics, dead controls, or inaccessible presentation.",
    artifact:
      "A truthful multi-page portfolio built from the learner's completed evidence and independently defended across content, design, behavior, accessibility, responsiveness, and performance.",
    placementAfterModuleId: 'css-independent-responsive-transfer',
    conceptIds: [
      'html-discovery-metadata',
      'html-sectioning-articles',
      'html-form-errors-recovery',
      'design-brief-handoff-artifacts',
      'css-cascade-layers-scope',
      'css-grid-template-areas',
      'responsive-navigation-disclosure',
      'responsive-test-matrix',
      'css-reduced-motion-preference',
      'css-rendering-performance-stability',
      'css-changed-case-regression',
      'css-independent-transfer-defense',
    ],
    sourceObjectiveIds: ['fcc-v9-lab-personal-portfolio'],
    requirements: [
      'Use only real completed work, inspectable evidence, truthful capability claims, and explicit limits or in-progress labels.',
      'Provide meaningful page identity, project narratives, decision evidence, working navigation, and a usable contact or contact-alternative path.',
      'Build an original visual and layout system that survives changed project counts, long titles, missing media, zoom, and narrow containers.',
      'Preserve keyboard order, focus visibility, target size, contrast, reduced-motion equivalence, forced colors, and non-screen output.',
      'Measure and repair rendering stability and performance without deleting essential content or accessibility behavior.',
      'Defend stakeholder fit, source and layout architecture, tests, rejected alternatives, evidence limits, and residual risks.',
    ],
    evidence: [
      'Real artifact and claim-provenance review with working-link and contact-path checks',
      'Responsive, keyboard, accessibility, preference, changed-content, and performance evidence suite',
      'Independent design, implementation, test-limit, and professional-practice defense',
    ],
    starterPolicy:
      "Begin from the learner's own reviewed evidence and a blank project; no fake case study, portfolio shell, workshop source, layout recipe, requirement sequence, or final solution is supplied.",
    currentState: 'planned-not-authored',
  },
].map((project) => {
  const benchmarkSourceObjectiveIds = project.sourceObjectiveIds;
  return {
    ...project,
    sourceObjectiveIds: benchmarkSourceObjectiveIds.filter((objectiveId) =>
      mappedSourceObjectiveIdSet.has(objectiveId)
    ),
    unmappedSourceObjectiveIds: benchmarkSourceObjectiveIds.filter(
      (objectiveId) => !mappedSourceObjectiveIdSet.has(objectiveId)
    ),
  };
});

for (const project of projects) {
  for (const conceptId of project.conceptIds) {
    if (!conceptById.has(conceptId))
      throw new Error(`${project.id} uses unknown concept ${conceptId}.`);
  }
}

const explicitRetrievalEdges = modules.flatMap((module) =>
  module.retrievalConceptIds.map((conceptId) => `${conceptId}::${module.id}`)
);

const architecture = {
  schemaVersion: 1,
  courseId: 'responsive-web-design',
  status: 'researching',
  reviewedAt: '2026-07-16',
  entryContract: {
    intendedLearner:
      'A true beginner who can operate a supported tablet or desktop browser but may not know files, HTML, CSS, developer tools, accessibility, or responsive design.',
    openingModuleId: 'html-first-content',
    firstMeaningfulEditByLearnerAction: 2,
    delayedToolingBarrierProhibited: true,
    entryEvidence: [
      'Learner changes bounded HTML source and connects it to preview output within two actions.',
      'File, browser, DevTools, and research instruction enters at the exact artifact decision where it becomes useful.',
    ],
  },
  sourceObjectiveIds,
  unmappedSourceObjectiveIds,
  conceptIds: concepts.map((concept) => concept.id),
  moduleIds,
  modules,
  projects,
  architectureFindings: [
    'The repaired 38-module learner sequence replaces the overloaded 17-module macro-sequence and does not copy the benchmark navigation; external block identity remains coverage evidence rather than learner navigation architecture.',
    'The current computer-basics-first module and its thirteen-activity barrier are removed from the target architecture; twelve bounded computer, file, browser, account-safety, search, DevTools, and research competencies enter in two just-in-time modules only after meaningful HTML construction.',
    'HTML semantics, accessibility, source order, validation, and changed-case habits remain retrieval and correctness constraints throughout CSS, responsive, interaction, and project work.',
    'The five actual certification-project benchmarks are survey form, tribute page, technical documentation, product landing page, and personal portfolio; each now has a distinct original stakeholder transfer with different domains, artifacts, requirements, evidence, placement, and empty-start policy.',
  ],
  gaps: [
    `${unmappedSourceObjectiveIds.length} source objective remains non-specific because the external certification exam exposes no reviewable item bank; LEARN-IT-ALL must author and validate its own blueprint, item bank, forms, scoring, correction, security, and standard-setting evidence without guessing external coverage.`,
    `The disconnected macro-module retention defaults were removed instead of translated into the repaired sequence. Its ${explicitRetrievalEdges.length} named prerequisite-retrieval edges remain candidate module intent only; replace them with one activity-level reinforcement schedule covering immediate, faded, independent, delayed, assessment, correction, and transfer evidence before authoring.`,
    'Subject and instructional reviewers must inspect every module boundary, cross-concept prerequisite, retrieval choice, artifact accumulation, and new-complexity limit.',
    'Every concept still needs a complete original I-G-F-R-A-T activity matrix with debugging, correction, delayed retention, and changed-case grading.',
    'All five project briefs need stakeholder, accessibility, assessment, originality, runtime, and representative-learner review before authoring.',
    'No rejected learner content remains in the source tree; the proposed opening vertical slice must prove editor, feedback, persistence, assessment, tablet, desktop, and beginner-flow behavior before subsequent authoring.',
  ],
};

const output = path.join(
  root,
  'docs',
  'research',
  'courses',
  'responsive-web-design-course-architecture.json'
);
await mkdir(path.dirname(output), { recursive: true });
const serialized = `${JSON.stringify(architecture, null, 2)}\n`;
if (process.argv.includes('--check')) {
  const current = await readFile(output, 'utf8');
  if (current !== serialized) throw new Error(`${output} is stale; run this compiler.`);
  console.log(
    `Current ${output}: ${modules.length} modules, ${concepts.length} concepts, ${projects.length} original project briefs.`
  );
} else {
  await writeFile(output, serialized);
  console.log(
    `Wrote ${output}: ${modules.length} modules, ${concepts.length} concepts, ${projects.length} original project briefs.`
  );
}
