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
const moduleIds = graphs.flatMap((graph) => graph.moduleIds);
const moduleOrder = new Map(moduleIds.map((moduleId, index) => [moduleId, index + 1]));
const conceptModule = new Map(concepts.map((concept) => [concept.id, concept.moduleId]));

const moduleMetadata = {
  'html-first-page': {
    title: 'Build and Inspect a First HTML Page',
    cumulativeArtifact:
      'A saved, resumable one-page community notice whose source, parsed tree, visible output, and passing checkpoint remain distinguishable.',
    newComplexityBoundary:
      'Only source editing, HTML purpose, element anatomy, text, nesting, attributes, comments, content models, and parser recovery enter here.',
    retrievalConceptIds: [],
  },
  'web-tooling-just-in-time': {
    title: 'Use Computer, Files, Browser, Search, and Tools Safely',
    cumulativeArtifact:
      'The first page becomes a learner-owned portable project with an evidence-backed folder tree, safe account and browser plan, reversible file operations, and a recorded research trail.',
    newComplexityBoundary:
      'Computer resources, input safety, internet access, sign-in boundaries, developer tool roles, file operations, naming, organization, types, browsers, and search enter only after the learner has edited HTML.',
    retrievalConceptIds: [
      'html-workspace-feedback-loop',
      'html-purpose-structure',
      'html-attribute-syntax',
    ],
  },
  'html-documents-and-paths': {
    title: 'Documents, Browser Evidence, Paths, and Discovery',
    cumulativeArtifact:
      'The notice becomes a portable multi-page information directory with complete documents, working references, truthful discovery metadata, and evidence notes.',
    newComplexityBoundary:
      'Document envelope, language, encoding, metadata, URLs, links, browser loading, and authority verification extend the first page without adding media or CSS.',
    retrievalConceptIds: [
      'html-nesting-tree',
      'html-attribute-syntax',
      'html-parser-recovery',
      'tooling-project-folder-organization',
      'tooling-search-query-refinement',
    ],
  },
  'html-images-and-media': {
    title: 'Images, Graphics, Media, and Embedded Boundaries',
    cumulativeArtifact:
      'The directory gains purpose-classified images, scalable graphics, controlled media, alternatives, and a constrained external embed.',
    newComplexityBoundary:
      'Replaced and embedded content enters only after learners can resolve paths, author attributes, inspect requests, and explain document boundaries.',
    retrievalConceptIds: [
      'html-files-paths-urls',
      'html-attribute-value-types',
      'html-browser-request-parse-render',
      'html-authority-research-verification',
    ],
  },
  'html-text-and-semantics': {
    title: 'Text Meaning, Hierarchy, Landmarks, and Native Interaction',
    cumulativeArtifact:
      'The directory becomes a structured public guide whose reading order, headings, landmarks, articles, quotations, dates, and disclosures carry explicit meaning.',
    newComplexityBoundary:
      'Semantic relationships and native disclosure enter while prior document, link, and media correctness remains enforced.',
    retrievalConceptIds: [
      'html-content-models',
      'html-link-purpose-fragments',
      'html-images-purpose-alt',
    ],
  },
  'html-forms': {
    title: 'Forms, Submitted Data, Controls, and Recovery',
    cumulativeArtifact:
      'The guide gains an accessible request workflow with purposeful data names, native controls, labels, grouped choices, validation, errors, and recovery.',
    newComplexityBoundary:
      'User input and submission enter only after native semantics, source order, attributes, text alternatives, and document relationships are usable.',
    retrievalConceptIds: [
      'html-native-controls-first',
      'html-heading-hierarchy',
      'html-document-language',
    ],
  },
  'html-tables': {
    title: 'Data Tables and Header Relationships',
    cumulativeArtifact:
      'The guide gains a genuine two-dimensional service schedule with caption, row groups, headers, and verified cell context.',
    newComplexityBoundary:
      'Tabular relationships enter without using tables for page layout or relaxing earlier semantic and keyboard requirements.',
    retrievalConceptIds: [
      'html-content-models',
      'html-heading-hierarchy',
      'html-form-labels-instructions',
    ],
  },
  'html-accessibility-and-debugging': {
    title: 'Accessibility Information and Evidence-Led HTML Debugging',
    cumulativeArtifact:
      'Learners audit and repair the complete guide using source, validation, DOM, accessibility, network, keyboard, and changed-content evidence.',
    newComplexityBoundary:
      'Accessibility-tree reasoning, ARIA boundaries, causal inspection, and changed-case testing formalize correctness already required in every earlier artifact.',
    retrievalConceptIds: [
      'html-landmarks',
      'html-form-errors-recovery',
      'html-table-header-associations',
      'html-captions-transcripts',
    ],
  },
  'html-independent-project': {
    title: 'Independent HTML Transfer and Defense',
    cumulativeArtifact:
      'An unfamiliar multi-page stakeholder artifact built from an empty project and defended with behavior, accessibility, failure, validation, and changed-case evidence.',
    newComplexityBoundary:
      'No new HTML mechanism enters; difficulty comes from independent selection, integration, testing, tradeoffs, and defense.',
    retrievalConceptIds: [
      'html-document-root-head-body',
      'html-sectioning-articles',
      'html-form-errors-recovery',
      'html-table-header-associations',
      'html-changed-case-testing',
    ],
  },
  'css-language-and-cascade': {
    title: 'CSS Language, Selectors, Cascade, and Stateful Styling',
    cumulativeArtifact:
      'The independent HTML artifact gains a separately loaded stylesheet with inspectable rules, bounded selectors, predictable conflicts, list markers, link states, and reusable tokens.',
    newComplexityBoundary:
      'Presentation begins only after semantic HTML transfer; syntax, matching, inheritance, cascade, specificity, layers, properties, and states enter before visual design recipes.',
    retrievalConceptIds: [
      'html-purpose-structure',
      'html-document-root-head-body',
      'html-source-order-keyboard',
      'html-validation-inspection',
    ],
  },
  'css-boxes-and-sizing': {
    title: 'Boxes, Intrinsic Constraints, Units, Overflow, and Geometry',
    cumulativeArtifact:
      'The styled artifact gains resilient component boxes whose size, spacing, paint, transform, and overflow remain explainable under changed content.',
    newComplexityBoundary:
      'Outer and inner display, box arithmetic, intrinsic sizing, units, logical dimensions, paint, transforms, and overflow enter before layout systems.',
    retrievalConceptIds: [
      'css-rule-declaration-anatomy',
      'css-cascade-origins-importance-order',
      'html-text-whitespace',
    ],
  },
  'css-type-color-and-design': {
    title: 'User Evidence, Typography, Color, Hierarchy, and Prototypes',
    cumulativeArtifact:
      'The artifact receives an evidence-backed design direction, readable type system, accessible color roles, visual hierarchy, resilient controls, and evaluated prototype revisions.',
    newComplexityBoundary:
      'User needs and task evidence lead visual decisions; typography, color, hierarchy, filters, tokens, controls, prototypes, and testing follow explicit constraints.',
    retrievalConceptIds: [
      'css-custom-properties-fallbacks',
      'css-intrinsic-extrinsic-sizing',
      'html-heading-hierarchy',
      'html-form-labels-instructions',
    ],
  },
  'css-flexible-layout': {
    title: 'Normal Flow and One-Dimensional Flexible Layout',
    cumulativeArtifact:
      'A reusable component set handles navigation, media, toolbars, forms, and card groups through content-driven flex constraints rather than fixed screenshots.',
    newComplexityBoundary:
      'Normal flow remains baseline; flex containers, axes, lines, sizing, alignment, gaps, order, and component selection solve one-dimensional relationships.',
    retrievalConceptIds: [
      'css-outer-inner-display',
      'css-intrinsic-extrinsic-sizing',
      'css-visual-hierarchy-spacing',
      'html-source-order-keyboard',
    ],
  },
  'css-grid-and-positioning': {
    title: 'Two-Dimensional Grid, Positioning, Stacking, and Floats',
    cumulativeArtifact:
      'The interface gains content-led page regions, nested alignment, bounded overlays, sticky context, and genuine figure wrapping with traceable paint order.',
    newComplexityBoundary:
      'Grid tracks and placement, positioning schemes, stacking contexts, and remaining float use enter after learners can size and align flexible components.',
    retrievalConceptIds: [
      'css-normal-flow',
      'css-flex-order-accessibility',
      'css-percentages-containing-blocks',
      'html-sectioning-articles',
    ],
  },
  'responsive-systems': {
    title: 'Content-Driven Responsive Pages and Components',
    cumulativeArtifact:
      'The interface adapts fluidly across continuous sizes, container contexts, media capabilities, navigation states, content variation, zoom, and image-selection conditions.',
    newComplexityBoundary:
      'Viewport and container adaptation, responsive media, content-derived breakpoints, narrow-first enhancement, range syntax, intrinsic grids, navigation, and evidence matrices integrate prior layout.',
    retrievalConceptIds: [
      'css-intrinsic-extrinsic-sizing',
      'css-grid-repeat-minmax-intrinsic',
      'css-flex-component-transfer',
      'html-viewport-metadata',
    ],
  },
  'css-interaction-accessibility-and-motion': {
    title: 'Interaction, Preferences, Motion, Performance, and Regression',
    cumulativeArtifact:
      'The responsive interface gains complete focus and pointer evidence, preference adaptations, safe motion, print output, causal diagnostics, rendering stability, and changed-case regression protection.',
    newComplexityBoundary:
      'Input capabilities, focus, targets, motion, forced colors, zoom, print, debugging, performance, and regression become explicit test dimensions rather than late polish.',
    retrievalConceptIds: [
      'css-contrast-noncolor-meaning',
      'responsive-media-query-model',
      'responsive-test-matrix',
      'html-changed-case-testing',
    ],
  },
  'css-independent-project': {
    title: 'Independent Responsive Interface Transfer and Defense',
    cumulativeArtifact:
      'A wholly unfamiliar multi-page responsive product built from empty stylesheets and defended through user, semantic, cascade, layout, accessibility, responsive, performance, and changed-case evidence.',
    newComplexityBoundary:
      'No new web mechanism enters; learner independently researches, designs, implements, tests, revises, and defends an integrated stakeholder outcome.',
    retrievalConceptIds: [
      'css-cascade-layers-scope',
      'design-user-needs-task-flows',
      'css-flex-component-transfer',
      'css-grid-template-areas',
      'responsive-container-query-model',
      'css-changed-case-regression',
    ],
  },
};

for (const moduleId of moduleIds) {
  if (!moduleMetadata[moduleId]) throw new Error(`Missing architecture metadata for ${moduleId}.`);
}

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
  const moduleConcepts = concepts.filter((concept) => concept.moduleId === moduleId);
  const crossPrerequisiteModules = moduleConcepts.flatMap((concept) =>
    concept.prerequisiteIds
      .map((conceptId) => conceptModule.get(conceptId))
      .filter((owner) => owner && owner !== moduleId)
  );
  if (index > 0) crossPrerequisiteModules.push(moduleIds[index - 1]);
  const prerequisiteModuleIds = [...new Set(crossPrerequisiteModules)].sort(
    (left, right) => moduleOrder.get(left) - moduleOrder.get(right)
  );
  const metadata = moduleMetadata[moduleId];
  return {
    id: moduleId,
    title: metadata.title,
    order: index + 1,
    prerequisiteModuleIds,
    conceptIds: moduleConcepts.map((concept) => concept.id),
    sourceObjectiveIds: sourceObjectiveIdsByModule.get(moduleId),
    retrievalConceptIds: metadata.retrievalConceptIds,
    cumulativeArtifact: metadata.cumulativeArtifact,
    newComplexityBoundary: metadata.newComplexityBoundary,
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
    placementAfterModuleId: 'html-independent-project',
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
    id: 'museum-object-comparison',
    title: 'Museum Object Comparison Collection',
    scenarioDomain: 'museum-collection-access',
    stakeholderNeed:
      'A small museum needs visitors to compare objects with unpredictable titles, missing images, varied metadata, and touch or keyboard input across a reusable collection component.',
    artifact:
      'A flexible, accessible object-comparison collection with multiple content states and evidence controls.',
    placementAfterModuleId: 'css-flexible-layout',
    conceptIds: [
      'html-images-purpose-alt',
      'html-source-order-keyboard',
      'css-box-sizing-models',
      'css-contrast-noncolor-meaning',
      'css-flex-basis-grow-shrink',
      'css-flex-order-accessibility',
      'css-flex-component-transfer',
    ],
    sourceObjectiveIds: ['fcc-v9-lab-page-of-playing-cards'],
    requirements: [
      'Preserve source, reading, and focus order while cards wrap and compare at changed sizes.',
      'Handle long titles, missing images, optional metadata, one item, and many items without fixed-height clipping.',
      'Make selection and comparison state perceivable without color alone.',
      'Use flex sizing and spacing from content constraints instead of copied card dimensions.',
      'Explain image alternatives, basis, minimum size, wrapping, alignment, and retained semantic choices.',
    ],
    evidence: [
      'Changed item-count and content behavior checks',
      'Keyboard, focus, and non-color state inspection',
      'Flex sizing and component-selection defense',
    ],
    starterPolicy:
      'Supply only structured museum content fixtures and acceptance constraints; learner creates markup and CSS without a card-workshop starter.',
    currentState: 'planned-not-authored',
  },
  {
    id: 'public-library-availability-explorer',
    title: 'Public Library Availability Explorer',
    scenarioDomain: 'public-library-inventory',
    stakeholderNeed:
      'A public library needs patrons to scan item availability, format, audience, and branch relationships in dense data without losing context, contrast, or meaning.',
    artifact:
      'A semantic inventory and comparison interface with attribute-driven states and a responsive data layout.',
    placementAfterModuleId: 'css-grid-and-positioning',
    conceptIds: [
      'html-table-structure',
      'html-table-header-associations',
      'css-attribute-selectors',
      'css-contrast-noncolor-meaning',
      'css-grid-explicit-tracks-fr',
      'css-grid-template-areas',
      'css-grid-auto-placement-dense',
    ],
    sourceObjectiveIds: ['fcc-v9-lab-book-inventory-app'],
    requirements: [
      'Represent inventory relationships with table or grid semantics chosen from the actual comparison task.',
      'Style exact and tokenized data states without substring false positives.',
      'Keep status, selection, and exceptions distinguishable without color-only evidence.',
      'Preserve reading and focus order when visual regions or dense details move.',
      'Diagnose one cascade, placement, overflow, or stacking defect through recorded browser evidence.',
    ],
    evidence: [
      'Attribute changed-case and false-positive tests',
      'Header-context, source-order, contrast, and zoom review',
      'Causal CSS defect report and repaired regression case',
    ],
    starterPolicy:
      'Provide only anonymized deterministic inventory records; no balance-sheet or book-inventory markup, styles, selector sequence, or layout recipe is reused.',
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
    placementAfterModuleId: 'responsive-systems',
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
    placementAfterModuleId: 'css-independent-project',
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
      'css-independent-transfer-defense',
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

const architecture = {
  schemaVersion: 1,
  courseId: 'responsive-web-design',
  status: 'researching',
  reviewedAt: '2026-07-15',
  entryContract: {
    intendedLearner:
      'A true beginner who can operate a supported tablet or desktop browser but may not know files, HTML, CSS, developer tools, accessibility, or responsive design.',
    openingModuleId: 'html-first-page',
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
    'The proposed 17-module concept sequence replaces the current 29-module benchmark-shaped order; external block identity remains coverage evidence rather than learner navigation architecture.',
    'The current computer-basics-first module and its thirteen-activity barrier are removed from the target architecture; twelve bounded computer, file, browser, account-safety, search, DevTools, and research competencies enter in a just-in-time module immediately after the first HTML edit.',
    'HTML semantics, accessibility, source order, validation, and changed-case habits remain retrieval and correctness constraints throughout CSS, responsive, interaction, and project work.',
    'Five certification project benchmarks become distinct original stakeholder transfers with different domains, artifacts, requirements, concepts, evidence, placement, and empty-start policies.',
  ],
  gaps: [
    `${unmappedSourceObjectiveIds.length} source objectives remain outside module coverage until bounded concept inspection replaces their explicit unmapped state.`,
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
  if (current !== serialized) throw new Error(`${output} is stale; regenerate it.`);
  console.log(
    `Current ${output}: ${modules.length} modules, ${concepts.length} concepts, ${projects.length} original project briefs.`
  );
} else {
  await writeFile(output, serialized);
  console.log(
    `Wrote ${output}: ${modules.length} modules, ${concepts.length} concepts, ${projects.length} original project briefs.`
  );
}
