import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'accessible-resource-inventory';
const starterFiles = {
  html: '<!-- Continue the Accessible Resource Inventory responsive-system work here. -->',
  css: '/* Continue the Accessible Resource Inventory responsive-system work here. */',
  javascript: '',
};

const models = [
  {
    id: 'responsive-mobile-first',
    activityId: 'responsive-mobile-first-studio',
    title: 'Build a Narrow-Screen Baseline before Enhancements',
    context: 'resource inventory narrow-layout baseline',
    concept:
      'Mobile-first CSS begins with a complete content-driven base that works at the narrowest supported inline size, with zoom, long labels, keyboard focus, and coarse input. Enhancements come later when available space supports them. It is an ordering strategy for resilient rules, not a design for one phone model or a reason to hide content.',
    misconception:
      'Mobile first means targeting one standard phone width and adding desktop overrides later.',
    correct:
      'Make the unqueried base complete at constrained widths, then layer enhancements from observed content needs without removing tasks.',
    distractors: [
      'Hide secondary table columns on phones because narrow layouts need less information.',
      'Start with fixed desktop dimensions and shrink every value in a max-width query.',
    ],
    sequence: [
      'Inventory content tasks and smallest supported conditions',
      'Build the unqueried flow with intrinsic and flexible sizing',
      'Stress long content zoom keyboard focus and coarse input',
      'Add only evidence-backed enhancements and repeat the matrix',
    ],
    terms: ['base', 'content', 'enhancement'],
    prerequisiteIds: ['css-math-fluid-sizing', 'css-data-aria-state'],
    requirements: [
      [
        'narrow-base',
        '.inventory-shell {\n  inline-size: min(100% - 2rem, 72rem);\n  margin-inline: auto;\n}',
      ],
      ['flow-gap', '.inventory-layout {\n  display: grid;\n  gap: clamp(1rem, 3vw, 2rem);\n}'],
      [
        'touch-size',
        '.resource-action {\n  min-block-size: 2.75rem;\n  display: inline-flex;\n  align-items: center;\n}',
      ],
    ],
  },
  {
    id: 'responsive-content-breakpoints',
    activityId: 'content-breakpoint-investigation',
    title: 'Choose Breakpoints from Content Failure Evidence',
    context: 'inventory filter and table breakpoint investigation',
    concept:
      'A breakpoint belongs where content, layout, or interaction stops working—not where a device catalog says tablet begins. Resize through the continuum, increase text, translate labels, and record the first failure. Express the threshold in a relative unit when that better follows text metrics, and avoid a stack of near-duplicate device presets.',
    misconception:
      'A responsive interface needs a separate breakpoint for every popular device family.',
    correct:
      'Add the fewest breakpoints that repair documented content or interaction failures, and test immediately around each boundary.',
    distractors: [
      'Copy the current year device-width list so every hardware category has its own query.',
      'Choose breakpoints from the canvas width in the design mockup even when content fits elsewhere.',
    ],
    sequence: [
      'Resize and zoom the real content continuously',
      'Record the exact collision wrap or task failure',
      'Add one minimal query at the content threshold',
      'Test below at and above the boundary with changed content',
    ],
    terms: ['breakpoint', 'failure', 'boundary'],
    prerequisiteIds: ['responsive-mobile-first'],
    requirements: [
      [
        'breakpoint-note',
        '/* Breakpoint repairs filter labels colliding with the inventory action at 48rem content width. */',
      ],
      [
        'content-query',
        '@media (width >= 48rem) {\n  .inventory-layout {\n    grid-template-columns: minmax(14rem, 0.35fr) minmax(0, 1fr);\n  }\n}',
      ],
      [
        'boundary-test-note',
        '/* Retest at 47.99rem, 48rem, and 48.01rem with 200% zoom and long labels. */',
      ],
    ],
  },
  {
    id: 'responsive-media-queries',
    activityId: 'media-capability-query-lab',
    title: 'Query Space, Capability, and Preferences with Fallbacks',
    context: 'inventory environment and input capability adaptation',
    concept:
      'Media queries can test width ranges, orientation, resolution, pointer accuracy, hover capability, contrast, color scheme, and motion preferences. Each query should enhance a working fallback. Capability queries describe the environment but never prove a particular user or device, so essential actions cannot depend on hover, orientation, or a fine pointer.',
    misconception:
      'Viewport width is the only useful responsive condition and hover proves mouse use.',
    correct:
      'Keep essential behavior in the base, then use range, capability, and preference queries only for safe enhancements.',
    distractors: [
      'Place action labels only inside hover rules because desktops support hover.',
      'Assume landscape means a tablet and replace the interface with a device-specific layout.',
    ],
    sequence: [
      'Confirm the base exposes every task',
      'Name the environmental capability or preference being tested',
      'Add an optional enhancement without device inference',
      'Verify matching nonmatching and hybrid input environments',
    ],
    terms: ['capability', 'fallback', 'preference'],
    prerequisiteIds: ['responsive-content-breakpoints'],
    requirements: [
      [
        'hover-capability',
        '@media (hover: hover) and (pointer: fine) {\n  .resource-action:hover {\n    text-decoration-thickness: 0.2em;\n  }\n}',
      ],
      [
        'orientation-enhancement',
        '@media (orientation: landscape) and (height < 32rem) {\n  .inventory-header {\n    padding-block: 0.5rem;\n  }\n}',
      ],
      [
        'contrast-preference',
        '@media (prefers-contrast: more) {\n  .resource-table :is(th, td) {\n    border-width: 0.15rem;\n  }\n}',
      ],
      [
        'range-query',
        '@media (30rem <= width < 60rem) {\n  .inventory-summary {\n    max-inline-size: 60ch;\n  }\n}',
      ],
    ],
  },
  {
    id: 'responsive-images',
    activityId: 'responsive-image-selection-studio',
    title: 'Serve Correct Image Candidates and Art Direction',
    context: 'resource location imagery delivery audit',
    concept:
      'Fluid CSS prevents rendered overflow, but responsive image markup controls which bytes the browser selects. Width descriptors plus an accurate sizes condition let the browser choose among srcset candidates. Picture supports format alternatives and art direction when the composition must change. Intrinsic width and height reserve aspect ratio and useful alt text follows the image purpose.',
    misconception: 'Setting max-width one hundred percent prevents an oversized image download.',
    correct:
      'Combine intrinsic dimensions, fluid rendering, truthful sizes, candidate sources, and purpose-driven alternative text; use picture only when format or composition changes.',
    distractors: [
      'Put the largest source first and rely on CSS to reduce its network cost.',
      'Describe every pixel in alt text because responsive crops change the image dimensions.',
    ],
    sequence: [
      'Define the image purpose and rendered slot across layouts',
      'Author intrinsic dimensions candidates and accurate sizes',
      'Add format or art-direction sources only when needed',
      'Inspect currentSrc dimensions transfer size crop and alternative text',
    ],
    terms: ['srcset', 'sizes', 'currentSrc'],
    prerequisiteIds: ['responsive-media-queries'],
    requirements: [
      [
        'picture-source',
        '<source media="(width >= 48rem)" srcset="/images/resource-wide-960.webp 960w, /images/resource-wide-1440.webp 1440w" sizes="70vw">',
        'source-includes',
        'html',
      ],
      [
        'image-candidates',
        '<img src="/images/resource-square-640.jpg" srcset="/images/resource-square-320.jpg 320w, /images/resource-square-640.jpg 640w" sizes="(width >= 48rem) 30vw, 100vw" width="640" height="640" alt="Volunteers organizing labeled heat-relief supplies">',
        'source-includes',
        'html',
      ],
      [
        'fluid-image',
        '.resource-figure img {\n  display: block;\n  max-inline-size: 100%;\n  block-size: auto;\n}',
      ],
      [
        'image-test-note',
        '<!-- Verify currentSrc, rendered size, crop, alt purpose, and transfer size at every layout state. -->',
        'source-includes',
        'html',
      ],
    ],
  },
  {
    id: 'responsive-embedded-media',
    activityId: 'embedded-media-ratio-lab',
    title: 'Preserve Embedded Media Ratio and Access',
    context: 'resource training video and map embed repair',
    concept:
      'Video, iframe, canvas, and SVG need explicit responsive contracts. A wrapper or the element can use aspect-ratio while inline and block sizing remain flexible. Titles, captions or transcripts, controls, and fallbacks still matter. A ratio alone does not solve a fixed child width, missing iframe title, inaccessible player, or content that genuinely needs a different composition.',
    misconception: 'Width one hundred percent always preserves an embed ratio and accessibility.',
    correct:
      'Pair flexible dimensions and aspect-ratio with semantic labeling, accessible alternatives, and narrow-width overflow tests.',
    distractors: [
      'Crop every iframe with overflow hidden when its controls exceed the wrapper.',
      'Remove video controls on small screens to preserve the intended composition.',
    ],
    sequence: [
      'Identify the media task intrinsic ratio and access requirements',
      'Remove fixed inline overflow constraints',
      'Apply flexible sizing and an intentional aspect ratio',
      'Test controls labels captions fallback loading and narrow widths',
    ],
    terms: ['aspect-ratio', 'controls', 'fallback'],
    prerequisiteIds: ['responsive-images'],
    requirements: [
      ['media-frame', '.media-frame {\n  inline-size: 100%;\n  aspect-ratio: 16 / 9;\n}'],
      [
        'media-child',
        '.media-frame > :is(iframe, video) {\n  inline-size: 100%;\n  block-size: 100%;\n  border: 0;\n}',
      ],
      [
        'video-access',
        '<video controls preload="metadata" aria-describedby="training-transcript">',
        'source-includes',
        'html',
      ],
      [
        'iframe-title',
        '<iframe class="resource-map" title="Map of accessible cooling centers"',
        'source-includes',
        'html',
      ],
    ],
  },
  {
    id: 'responsive-container-queries',
    activityId: 'container-query-component-lab',
    title: 'Adapt Reusable Components to Local Space',
    context: 'inventory resource card in main and sidebar containers',
    concept:
      'Container queries let a component respond to its own available space rather than the viewport. Establish an appropriate query container, keep the base usable, and query inline-size or style conditions for local enhancements. Size containment has layout consequences, container units need fallbacks, and viewport queries remain appropriate for page-level environment changes.',
    misconception: 'Container queries replace every viewport media query and need no fallback.',
    correct:
      'Use a component base plus a named inline-size container when local composition changes; keep page-level decisions in media queries.',
    distractors: [
      'Apply size containment to every ancestor so all descendants can query the viewport.',
      'Use container units for essential text without a fallback outside query-container support.',
    ],
    sequence: [
      'Identify the reusable component and its local failure',
      'Choose the nearest stable container and containment axis',
      'Add a base plus one local-space enhancement',
      'Place the component in narrow and wide parents and retest zoom',
    ],
    terms: ['container', 'inline-size', 'component'],
    prerequisiteIds: ['responsive-embedded-media'],
    requirements: [
      ['named-container', '.resource-card-region {\n  container: resource-card / inline-size;\n}'],
      [
        'container-query',
        '@container resource-card (width >= 32rem) {\n  .resource-card {\n    grid-template-columns: minmax(8rem, 0.3fr) minmax(0, 1fr);\n  }\n}',
      ],
      [
        'container-unit-fallback',
        '.resource-card__title {\n  font-size: clamp(1.1rem, 1rem + 1cqi, 1.6rem);\n}',
      ],
      [
        'component-test-note',
        '/* Verify this card in sidebar and main containers at 200% zoom. */',
      ],
    ],
  },
  {
    id: 'responsive-test-matrix',
    activityId: 'responsive-evidence-matrix',
    title: 'Verify a Multivariable Responsive System',
    context: 'inventory responsive regression and evidence matrix',
    concept:
      'Responsive verification is a matrix, not three screenshots. Vary inline and block size, text zoom, browser zoom, content length and language, orientation, input mode, network and image selection, motion and contrast preferences, forced colors, print, and component containers. Record task outcomes and defects around boundaries so a visual success cannot hide clipping, unreachable focus, excess transfer, or lost meaning.',
    misconception: 'Phone, tablet, and desktop screenshots prove responsive behavior is complete.',
    correct:
      'Test meaningful combinations and boundary neighbors, record observable task outcomes, and rerun the matrix after every repair.',
    distractors: [
      'Approve the layout when no horizontal scrollbar appears in three viewport presets.',
      'Test long content only after launch because responsive CSS is independent of language and data.',
    ],
    sequence: [
      'Define user tasks risks boundaries and representative content',
      'Build a matrix across size zoom input preferences media and containers',
      'Record observable outcomes defects and reproduction evidence',
      'Repair minimally and rerun affected plus retained scenarios',
    ],
    terms: ['matrix', 'boundary', 'outcome'],
    prerequisiteIds: ['responsive-container-queries'],
    requirements: [
      [
        'matrix-section',
        '<section aria-labelledby="responsive-evidence-heading">',
        'source-includes',
        'html',
      ],
      [
        'matrix-heading',
        '<h2 id="responsive-evidence-heading">Responsive verification matrix</h2>',
        'source-includes',
        'html',
      ],
      [
        'matrix-cases',
        '<ul><li>Long translated content at narrow width and 200% zoom passes every task.</li><li>Keyboard, touch, coarse pointer, and hover-capable paths expose the same actions.</li><li>Image currentSrc, embed ratio, reduced motion, contrast, forced colors, print, and container placements are verified.</li></ul>',
        'source-includes',
        'html',
      ],
      [
        'boundary-record',
        '<!-- Boundary evidence: below, at, and above every content and container threshold. -->',
        'source-includes',
        'html',
      ],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-best-practices-for-responsive-web-design': {
    title: 'Trace Responsive Decisions from Content and Capability Evidence',
    context: 'inventory responsive architecture review',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 12,
  },
  'mapped-workshop-piano': {
    title: 'Workshop: Build an Adaptive Community Media Console',
    context: 'content-driven media console with local and viewport adaptations',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 64,
  },
  'mapped-review-responsive-web-design': {
    title: 'Retrieval Review: Responsive Systems',
    context: 'changed content capability media and container constraints',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 24,
  },
  'mapped-quiz-responsive-web-design': {
    title: 'Mastery Exam: Responsive Systems',
    context: 'independent multivariable responsive diagnosis',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 36,
  },
};

const extraPlans = {
  'responsive-design-transfer-lab': {
    title: 'Transfer Lab: Repair a Multilingual Transit Status Board',
    context: 'unfamiliar long-content media input and container regression',
    kind: 'lab',
    targetSteps: 20,
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
};

const milestones = models.flatMap((model) =>
  model.requirements.map(([name, expected, checkType, file]) => [
    `${model.title}: ${name.replaceAll('-', ' ')}`,
    expected,
    model.id,
    checkType,
    file,
  ])
);

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'responsive-design',
  moduleId: 'responsive-systems-content-out',
  title: 'Responsive Systems from Content Out',
  description:
    'Build complete narrow-first interfaces, choose content breakpoints, query capabilities and preferences safely, deliver suitable images and embeds, adapt components to local space, and verify the result with a multivariable regression matrix.',
  order: 22,
  objectives: [
    'Build a complete content-driven base before adding evidence-backed responsive enhancements.',
    'Choose breakpoints and media conditions from content, task, capability, and preference evidence instead of device labels.',
    'Deliver responsive images and embedded media with correct network, ratio, semantic, and fallback behavior.',
    'Use container queries for local component composition and media queries for page and environment decisions.',
    'Verify content length, widths, zoom, orientation, input, preferences, media selection, print, and container placement in a recorded matrix.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: [
    'css-math-fluid-sizing',
    'css-data-aria-state',
    'css-overflow',
    'css-accessibility-regression',
  ],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'code', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'accessible-resource-inventory-project',
  priorLastActivityId: 'mapped-lab-book-inventory-app',
  insertAfterCompetencyId: 'css-data-aria-state',
  insertAfterModuleId: 'accessible-resource-inventory-project',
  estimatedHours: 2410,
  milestones,
  mappedPlans,
  extraPlans,
  activityIds: [
    'responsive-mobile-first-studio',
    'content-breakpoint-investigation',
    'media-capability-query-lab',
    'responsive-image-selection-studio',
    'embedded-media-ratio-lab',
    'container-query-component-lab',
    'responsive-evidence-matrix',
    'mapped-lecture-best-practices-for-responsive-web-design',
    'mapped-workshop-piano',
    'responsive-design-transfer-lab',
    'mapped-review-responsive-web-design',
    'mapped-quiz-responsive-web-design',
  ],
});

console.log(
  `Generated Responsive Systems: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
