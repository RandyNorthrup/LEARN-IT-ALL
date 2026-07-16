import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const readJson = async (...segments) =>
  JSON.parse(await readFile(path.join(root, ...segments), 'utf8'));

const reference = await readJson('references', 'freecodecamp-rwd-v9.json');
const coverage = await readJson(
  'docs',
  'research',
  'courses',
  'responsive-web-design-coverage.json'
);
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

const graphs = [htmlGraph, cssGraph];
const concepts = graphs.flatMap((graph) => graph.concepts);
const conceptById = new Map(concepts.map((concept) => [concept.id, concept]));
const conceptIdsByModule = new Map(
  graphs
    .flatMap((graph) => graph.moduleIds)
    .map((moduleId) => [
      moduleId,
      concepts.filter((concept) => concept.moduleId === moduleId).map((concept) => concept.id),
    ])
);

const unique = (ids) => [...new Set(ids)];
const moduleConcepts = (moduleId, excludedIds = []) => {
  const ids = conceptIdsByModule.get(moduleId);
  if (!ids) throw new Error(`Unknown concept module ${moduleId}.`);
  const excluded = new Set(excludedIds);
  return ids.filter((id) => !excluded.has(id));
};
const requireKnown = (context, ids) => {
  for (const id of ids) {
    if (!conceptById.has(id)) throw new Error(`${context} references unknown concept ${id}.`);
  }
  return unique(ids);
};

const htmlFirstPage = moduleConcepts('html-first-page');
const htmlDocuments = moduleConcepts('html-documents-and-paths');
const htmlMedia = moduleConcepts('html-images-and-media');
const htmlSemantics = moduleConcepts('html-text-and-semantics');
const htmlForms = moduleConcepts('html-forms');
const htmlTables = moduleConcepts('html-tables');
const htmlAccessibility = moduleConcepts('html-accessibility-and-debugging');

const sourceModuleConcepts = {
  'basic-html': unique([
    ...htmlFirstPage,
    ...htmlDocuments,
    ...htmlMedia,
    'html-heading-hierarchy',
    'html-paragraphs-breaks',
    'html-lists',
    'html-emphasis-importance',
  ]),
  'semantic-html': htmlSemantics,
  'html-forms-and-tables': unique([...htmlForms, ...htmlTables]),
  'lab-survey-form': unique([
    ...htmlForms,
    'html-landmarks',
    'html-heading-hierarchy',
    'html-source-order-keyboard',
    'html-changed-case-testing',
    'html-independent-transfer-defense',
  ]),
  'html-and-accessibility': unique([
    ...htmlAccessibility,
    'html-images-purpose-alt',
    'html-captions-transcripts',
    'html-form-labels-instructions',
    'html-form-errors-recovery',
    'html-table-header-associations',
    'html-native-controls-first',
  ]),
  'review-html': unique([
    ...htmlFirstPage,
    ...htmlDocuments,
    ...htmlMedia,
    ...htmlSemantics,
    ...htmlForms,
    ...htmlTables,
    ...htmlAccessibility,
  ]),
  'computer-basics': [
    'html-workspace-feedback-loop',
    'html-files-paths-urls',
    'html-browser-request-parse-render',
    'html-authority-research-verification',
    'html-validation-inspection',
    'css-source-preview-loop',
  ],
  'basic-css': [
    'css-source-preview-loop',
    'css-purpose-and-boundary',
    'css-rule-declaration-anatomy',
    'css-application-and-loading',
    'css-type-class-id-selectors',
    'css-selector-lists-combinators',
    'css-pseudo-classes',
    'css-pseudo-elements',
    'css-list-markers-counters',
    'css-inheritance-initial-unset-revert',
    'css-cascade-origins-importance-order',
    'css-specificity-functional-selectors',
    'css-link-state-sequence',
    'css-outer-inner-display',
    'css-box-model-areas',
    'css-box-sizing-models',
    'css-backgrounds-borders-shadows',
  ],
  'design-for-developers': [
    'design-user-needs-task-flows',
    'css-readable-measure-alignment',
    'css-contrast-noncolor-meaning',
    'css-visual-hierarchy-spacing',
    'design-prototypes-evaluation-iteration',
    'css-design-tokens-theming',
  ],
  'absolute-and-relative-units': [
    'css-intrinsic-extrinsic-sizing',
    'css-absolute-font-relative-viewport-units',
    'css-percentages-containing-blocks',
    'css-min-max-clamp-functions',
    'responsive-fluid-default',
  ],
  'pseudo-classes-and-elements': [
    'css-selector-lists-combinators',
    'css-pseudo-classes',
    'css-pseudo-elements',
    'css-link-state-sequence',
    'css-form-control-states',
    'css-focus-visible-indicators',
  ],
  'css-colors': [
    'css-color-spaces-alpha',
    'css-contrast-noncolor-meaning',
    'css-gradients-background-images',
    'css-backgrounds-borders-shadows',
  ],
  'styling-forms': [
    'css-form-control-states',
    'css-box-sizing-models',
    'css-type-scale-line-height',
    'css-pseudo-classes',
    'css-focus-visible-indicators',
    'css-target-size-spacing',
  ],
  'css-box-model': [
    'css-box-model-areas',
    'css-box-sizing-models',
    'css-overflow-containment-scroll',
    'css-backgrounds-borders-shadows',
    'css-transform-reference-boxes',
    'css-filter-effects-fallbacks',
    'css-stacking-contexts-z-index',
  ],
  'css-flexbox': moduleConcepts('css-flexible-layout'),
  'lab-page-of-playing-cards': unique([
    ...moduleConcepts('css-flexible-layout'),
    'css-transform-reference-boxes',
    'css-changed-case-regression',
    'css-independent-transfer-defense',
  ]),
  'css-typography': [
    'css-font-stacks-generic-fallbacks',
    'css-font-loading-variable-fonts',
    'css-type-scale-line-height',
    'css-readable-measure-alignment',
    'css-text-wrap-spacing-decoration',
  ],
  'css-and-accessibility': [
    'css-contrast-noncolor-meaning',
    'css-focus-visible-indicators',
    'css-input-capability-adaptation',
    'css-target-size-spacing',
    'css-reduced-motion-preference',
    'css-forced-colors-preferences',
    'css-zoom-reflow-text-spacing',
    'css-changed-case-regression',
  ],
  'css-positioning': [
    'css-normal-flow',
    'css-positioning-containing-blocks',
    'css-stacking-contexts-z-index',
    'css-floats-content-wrapping',
    'css-transform-reference-boxes',
  ],
  'attribute-selectors': [
    'css-type-class-id-selectors',
    'css-selector-lists-combinators',
    'css-attribute-selectors',
    'css-pseudo-classes',
  ],
  'lab-book-inventory-app': [
    'css-attribute-selectors',
    'css-pseudo-classes',
    'css-contrast-noncolor-meaning',
    'css-changed-case-regression',
    'css-independent-transfer-defense',
  ],
  'responsive-design': [
    'responsive-fluid-default',
    'responsive-viewport-zoom',
    'responsive-fluid-media',
    'responsive-image-selection',
    'responsive-media-query-model',
    'responsive-content-breakpoints',
    'responsive-mobile-first-enhancement',
    'responsive-range-syntax-overlap',
    'responsive-grid-auto-fit-fill',
    'responsive-test-matrix',
  ],
  'lab-technical-documentation-page': [
    'responsive-fluid-default',
    'responsive-media-query-model',
    'responsive-content-breakpoints',
    'responsive-mobile-first-enhancement',
    'responsive-navigation-disclosure',
    'responsive-test-matrix',
    'css-zoom-reflow-text-spacing',
    'css-independent-transfer-defense',
  ],
  'css-variables': [
    'css-custom-properties-fallbacks',
    'css-cascade-origins-importance-order',
    'css-design-tokens-theming',
  ],
  'css-grid': unique([
    ...moduleConcepts('css-grid-and-positioning', [
      'css-subgrid-alignment',
      'css-positioning-containing-blocks',
      'css-stacking-contexts-z-index',
      'css-floats-content-wrapping',
    ]),
    'css-devtools-causal-debugging',
  ]),
  'lab-product-landing-page': [
    'css-grid-container-tracks-cells',
    'css-grid-explicit-tracks-fr',
    'css-grid-repeat-minmax-intrinsic',
    'css-grid-line-placement-spans',
    'css-grid-template-areas',
    'responsive-fluid-default',
    'responsive-content-breakpoints',
    'responsive-navigation-disclosure',
    'responsive-test-matrix',
    'css-independent-transfer-defense',
  ],
  'css-animations': [
    'css-transform-reference-boxes',
    'css-reduced-motion-preference',
    'css-transitions-state-change',
    'css-keyframe-animation-model',
    'css-rendering-performance-stability',
    'css-devtools-causal-debugging',
    'css-changed-case-regression',
  ],
};

for (const [moduleId, ids] of Object.entries(sourceModuleConcepts)) {
  sourceModuleConcepts[moduleId] = requireKnown(`Source module ${moduleId}`, ids);
}

const benchmarkHtml = unique(
  Object.entries(sourceModuleConcepts)
    .filter(([moduleId]) =>
      [
        'basic-html',
        'semantic-html',
        'html-forms-and-tables',
        'lab-survey-form',
        'html-and-accessibility',
        'review-html',
        'computer-basics',
      ].includes(moduleId)
    )
    .flatMap(([, ids]) => ids)
);
const benchmarkCss = unique(
  Object.entries(sourceModuleConcepts)
    .filter(
      ([moduleId]) =>
        !moduleId.startsWith('html') &&
        ![
          'basic-html',
          'semantic-html',
          'lab-survey-form',
          'review-html',
          'computer-basics',
        ].includes(moduleId)
    )
    .flatMap(([, ids]) => ids)
);
sourceModuleConcepts['review-css'] = benchmarkCss;
sourceModuleConcepts['responsive-web-design-certification-exam'] = requireKnown(
  'Certification exam',
  unique([
    ...benchmarkHtml,
    ...benchmarkCss,
    'html-independent-transfer-defense',
    'css-independent-transfer-defense',
  ])
);

const blockConcepts = {
  'lecture-understanding-html-attributes': [
    'html-purpose-structure',
    'html-element-anatomy',
    'html-attribute-syntax',
    'html-attribute-value-types',
  ],
  'lecture-understanding-the-html-boilerplate': [
    'html-doctype-rendering-mode',
    'html-document-root-head-body',
    'html-document-language',
    'html-character-encoding',
    'html-title-metadata',
    'css-application-and-loading',
  ],
  'lecture-understanding-how-html-affects-seo': [
    'html-title-metadata',
    'html-discovery-metadata',
    'html-heading-hierarchy',
    'html-landmarks',
  ],
  'lecture-working-with-audio-and-video-elements': [
    'html-audio-video',
    'html-captions-transcripts',
  ],
  'lecture-working-with-images-and-svgs': [
    'html-images-purpose-alt',
    'html-image-dimensions-loading',
    'html-figures-captions',
    'html-svg-semantics',
  ],
  'lecture-working-with-media': [
    'html-images-purpose-alt',
    'html-audio-video',
    'html-captions-transcripts',
    'html-iframe-title-permissions',
  ],
  'lecture-working-with-links': [
    'html-files-paths-urls',
    'html-links-destinations',
    'html-link-purpose-fragments',
  ],
  'lecture-importance-of-semantic-html': [
    'html-purpose-structure',
    'html-heading-hierarchy',
    'html-landmarks',
    'html-sectioning-articles',
    'html-native-accessibility-tree',
  ],
  'lecture-understanding-nuanced-semantic-elements': [
    'html-content-models',
    'html-sectioning-articles',
    'html-details-summary',
    'html-native-controls-first',
  ],
  'lecture-working-with-text-and-time-semantic-elements': [
    'html-emphasis-importance',
    'html-quotations-citations',
    'html-machine-readable-text',
  ],
  'lecture-working-with-specialized-semantic-elements': [
    'html-landmarks',
    'html-sectioning-articles',
    'html-details-summary',
    'html-native-controls-first',
  ],
  'lecture-working-with-forms': htmlForms,
  'lecture-working-with-tables': htmlTables,
  'lecture-working-with-html-tools': [
    'html-validation-inspection',
    'html-browser-request-parse-render',
    'html-authority-research-verification',
  ],
  'lecture-importance-of-accessibility-and-good-html-structure': [
    'html-native-accessibility-tree',
    'html-source-order-keyboard',
    'html-landmarks',
    'html-heading-hierarchy',
    'html-images-purpose-alt',
  ],
  'lecture-accessible-tables-forms': [
    'html-form-labels-instructions',
    'html-form-errors-recovery',
    'html-table-header-associations',
  ],
  'lecture-introduction-to-aria': [
    'html-native-controls-first',
    'html-native-accessibility-tree',
    'html-aria-boundary',
  ],
  'lecture-accessible-media-elements': [
    'html-images-purpose-alt',
    'html-captions-transcripts',
    'html-iframe-title-permissions',
  ],
  'lecture-understanding-computer-internet-and-tooling-basics': [
    'html-workspace-feedback-loop',
    'html-browser-request-parse-render',
  ],
  'lecture-working-with-file-systems': ['html-files-paths-urls', 'html-workspace-feedback-loop'],
  'lecture-browsing-the-web-effectively': [
    'html-authority-research-verification',
    'html-browser-request-parse-render',
    'html-validation-inspection',
  ],
  'lecture-what-is-css': [
    'css-source-preview-loop',
    'css-purpose-and-boundary',
    'css-rule-declaration-anatomy',
    'css-application-and-loading',
    'css-type-class-id-selectors',
    'css-outer-inner-display',
  ],
  'lecture-css-specificity-the-cascade-algorithm-and-inheritance': [
    'css-inheritance-initial-unset-revert',
    'css-cascade-origins-importance-order',
    'css-specificity-functional-selectors',
  ],
  'lecture-styling-lists-and-links': [
    'css-list-markers-counters',
    'css-link-state-sequence',
    'css-pseudo-classes',
  ],
  'lecture-working-with-backgrounds-and-borders': [
    'css-backgrounds-borders-shadows',
    'css-gradients-background-images',
  ],
  'lecture-user-interface-design-fundamentals': [
    'design-user-needs-task-flows',
    'css-visual-hierarchy-spacing',
    'css-readable-measure-alignment',
    'css-contrast-noncolor-meaning',
  ],
  'lecture-user-centered-design': [
    'design-user-needs-task-flows',
    'design-prototypes-evaluation-iteration',
  ],
  'lecture-common-design-tools': ['design-prototypes-evaluation-iteration'],
  'lecture-working-with-relative-and-absolute-units':
    sourceModuleConcepts['absolute-and-relative-units'],
  'lecture-working-with-pseudo-classes-and-pseudo-elements-in-css':
    sourceModuleConcepts['pseudo-classes-and-elements'],
  'lecture-working-with-colors-in-css': sourceModuleConcepts['css-colors'],
  'lecture-best-practices-for-styling-forms': sourceModuleConcepts['styling-forms'],
  'lecture-working-with-css-transforms-overflow-and-filters': sourceModuleConcepts['css-box-model'],
  'lecture-working-with-css-flexbox': sourceModuleConcepts['css-flexbox'],
  'lecture-working-with-css-fonts': sourceModuleConcepts['css-typography'],
  'lecture-best-practices-for-accessibility-and-css': sourceModuleConcepts['css-and-accessibility'],
  'lecture-understanding-how-to-work-with-floats-and-positioning-in-css':
    sourceModuleConcepts['css-positioning'],
  'lecture-working-with-attribute-selectors': sourceModuleConcepts['attribute-selectors'],
  'lecture-best-practices-for-responsive-web-design': sourceModuleConcepts['responsive-design'],
  'lecture-working-with-css-variables': sourceModuleConcepts['css-variables'],
  'lecture-working-with-css-grid': sourceModuleConcepts['css-grid'].filter(
    (id) => id !== 'css-devtools-causal-debugging'
  ),
  'lecture-debugging-css': ['css-devtools-causal-debugging', 'css-changed-case-regression'],
  'lecture-animations-and-accessibility': [
    'css-reduced-motion-preference',
    'css-transitions-state-change',
    'css-keyframe-animation-model',
    'css-rendering-performance-stability',
  ],
};

for (const [blockSlug, ids] of Object.entries(blockConcepts)) {
  blockConcepts[blockSlug] = requireKnown(`Source block ${blockSlug}`, ids);
}

const evidenceByType = {
  lecture: [
    'Subject reviewer must inspect every source challenge and confirm concept meaning, omissions, and limits.',
    'Instructional reviewer must verify original explanation, prediction, misconception, retrieval, and later-use design.',
  ],
  workshop: [
    'Reviewer must inspect step-level source coverage while requiring wholly original scenario, prose, code, checks, and feedback.',
    'Learner flow must prove guided practice, fading, retained correctness, debugging, and changed-case behavior.',
  ],
  lab: [
    'Reviewer must verify independent requirements differ from workshops in scenario, starter, reasoning, order, and evidence.',
    'Representative learners must complete behavior, accessibility, changed-case, explanation, and recovery evidence without recipe copying.',
  ],
  review: [
    'Review blueprint must retrieve mapped concepts through changed contexts, prediction, explanation, diagnosis, and implementation.',
    'Delayed evidence must distinguish completion from retained competence and route failures into corrective practice.',
  ],
  quiz: [
    'Assessment reviewer must map every item and distractor to concepts, misconceptions, cognitive level, and answer security.',
    'Pilot evidence must measure false positives, false negatives, difficulty, discrimination, feedback, and reassessment behavior.',
  ],
  exam: [
    'Assessment blueprint must sample mapped terminal concepts through independent behavior, diagnosis, explanation, and defense.',
    'Subject, accessibility, security, and learner-pilot reviews must approve exam validity before credential use.',
  ],
};

const alignments = reference.chapters.flatMap((chapter) =>
  chapter.modules.flatMap((sourceModule) => {
    const defaultConceptIds = sourceModuleConcepts[sourceModule.id];
    if (!defaultConceptIds)
      throw new Error(`Missing concept map for source module ${sourceModule.id}.`);
    return sourceModule.blocks.map((block) => {
      const conceptIds = requireKnown(
        `Source block ${block.slug}`,
        blockConcepts[block.slug] ?? defaultConceptIds
      );
      return {
        objectiveId: block.objectiveId,
        sourceModuleId: sourceModule.id,
        sourceBlockSlug: block.slug,
        sourceActivityType: block.type,
        sourceChallengeCount: block.challengeCount,
        conceptIds,
        mappingRationale: `Candidate mapping preserves ${block.slug} as a ${block.type} coverage and practice-depth benchmark while assigning its ${block.challengeCount} source challenges to explicit LEARN-IT-ALL concepts; it does not copy or approve learner-facing work.`,
        evidenceNeeded: evidenceByType[block.type],
        state: 'candidate-review',
      };
    });
  })
);

const benchmarkConceptIds = new Set(alignments.flatMap((alignment) => alignment.conceptIds));
const uncoveredConcepts = concepts.filter((concept) => !benchmarkConceptIds.has(concept.id));
const extensionModuleIds = unique(uncoveredConcepts.map((concept) => concept.moduleId));
const courseExtensions = extensionModuleIds.map((moduleId) => {
  const moduleConceptRecords = uncoveredConcepts.filter((concept) => concept.moduleId === moduleId);
  return {
    extensionId: `modern-extension-${moduleId}`,
    title: `Modern extension for ${moduleId.replaceAll('-', ' ')}`,
    rationale:
      'Current primary sources require these concepts for modern, accessible, content-driven professional practice, but the pinned freeCodeCamp v9 blocks do not provide enough explicit evidence to credit them as benchmark coverage.',
    conceptIds: moduleConceptRecords.map((concept) => concept.id),
    sourceIds: unique(
      moduleConceptRecords.flatMap((concept) =>
        concept.sourceAnchors.map((anchor) => anchor.sourceId)
      )
    ),
    validationNeeded: [
      'Subject reviewer must confirm current authority, stability, scope, prerequisites, and benchmark non-overlap.',
      'Instructional, assessment, accessibility, and learner reviews must validate original introduce-through-transfer work.',
    ],
    state: 'candidate-review',
  };
});

const sourceObjectiveIds = coverage.objectives.map((objective) => objective.objectiveId);
if (
  sourceObjectiveIds.join('\n') !== alignments.map((alignment) => alignment.objectiveId).join('\n')
) {
  throw new Error('Generated alignment objective order differs from source coverage matrix.');
}

const matrix = {
  schemaVersion: 1,
  courseId: 'responsive-web-design',
  status: 'researching',
  reviewedAt: '2026-07-15',
  sourceSnapshot: {
    sourceId: coverage.snapshot.sourceId,
    upstreamCommit: reference.upstreamCommit,
    sourceObjectives: reference.totals.blocks,
    sourceChallenges: reference.totals.challenges,
  },
  conceptInventories: graphs.map((graph) => ({
    scopeId: graph.scopeId,
    conceptCount: graph.concepts.length,
    conceptIds: graph.concepts.map((concept) => concept.id),
  })),
  alignments,
  courseExtensions,
  architectureFindings: [
    'Current blueprint maps every source block to broad legacy competency bundles; this candidate matrix instead narrows lectures to named concepts and makes workshop, lab, review, quiz, project, and exam accumulation inspectable.',
    'Computer and browser concepts stay mapped to the benchmark but must enter just in time around the first HTML artifact rather than preserve the current thirteen-activity delay.',
    'Concepts absent from explicit pinned v9 evidence remain separately named modern course extensions; source-block counts cannot be used to claim their coverage.',
    'All mappings remain candidate review because source identity and topic similarity do not establish standards accuracy, pedagogical order, assessment validity, originality, accessibility, retention, or learner transfer.',
  ],
  gaps: [
    'Subject reviewer must inspect all 158 source blocks and their 1,553 challenge identities against the candidate concept assignments.',
    'Every concept needs an authored I-G-F-R-A-T activity matrix plus explicit debug, correction, delayed-retention, and transfer evidence.',
    'Workshop, lab, review, quiz, project, and exam assignments need originality and assessment-validity review before authoring scale-up.',
    'Representative beginner and accessibility pilots must verify sequence, language, editor interaction, feedback, recovery, and independent transfer.',
  ],
};

const output = path.join(
  root,
  'docs',
  'research',
  'courses',
  'responsive-web-design-concept-alignment.json'
);
await mkdir(path.dirname(output), { recursive: true });
const serialized = `${JSON.stringify(matrix, null, 2)}\n`;
if (process.argv.includes('--check')) {
  const current = await readFile(output, 'utf8');
  if (current !== serialized) throw new Error(`${output} is stale; regenerate it.`);
  console.log(
    `Current ${output}: ${alignments.length} source objectives, ${concepts.length} concepts, ${uncoveredConcepts.length} explicit modern extensions.`
  );
} else {
  await writeFile(output, serialized);
  console.log(
    `Wrote ${output}: ${alignments.length} source objectives, ${concepts.length} concepts, ${uncoveredConcepts.length} explicit modern extensions.`
  );
}
