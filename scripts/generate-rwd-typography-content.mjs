import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'volunteer-shift-deck';
const starterFiles = {
  html: '<!-- Continue the Volunteer Shift Deck typography work here. -->',
  css: '/* Continue the resilient typography system here. */',
  javascript: '',
};

const models = [
  {
    id: 'css-font-families-fallbacks',
    activityId: 'font-fallback-metric-lab',
    title: 'Build Font Stacks that Survive Failure',
    context: 'shift deck preferred-font failure and layout shift audit',
    concept:
      'Font stacks list preferred faces followed by compatible fallbacks and a generic family. System fonts avoid downloads and match platform conventions. Different fallback metrics change line breaks, control widths, and layout; font-size-adjust can preserve perceived x-height. Text must remain readable and usable when custom resources fail or load late.',
    misconception: 'A downloaded web font displays before it loads with no layout consequences.',
    correct:
      'Choose metric-compatible fallbacks, end with a generic family, and test initial, late, failed, and user-overridden font states.',
    distractors: [
      'List only one brand font because browsers synthesize a similar face when it fails.',
      'Use cursive as the universal fallback for every interface and language.',
    ],
    sequence: [
      'Identify reading roles languages and supported platforms',
      'Choose preferred faces metric-compatible fallbacks and generic family',
      'Compare line breaks x-height and control dimensions',
      'Test blocked slow failed and user-overridden font loading',
    ],
    terms: ['fallback', 'metrics', 'generic'],
    prerequisiteIds: ['design-color-typography', 'flex-pattern-selection'],
    requirements: [
      [
        'body-stack',
        'body {\n  font-family: Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;\n}',
      ],
      [
        'mono-stack',
        'code, .shift-code {\n  font-family: "Roboto Mono", "Cascadia Code", Consolas, monospace;\n}',
      ],
      ['size-adjust', 'body {\n  font-size-adjust: 0.52;\n}'],
    ],
  },
  {
    id: 'css-web-font-loading',
    activityId: 'web-font-resource-map',
    title: 'Map Real Font Resources to Requested Styles',
    context: 'shift deck font loading and synthesis investigation',
    concept:
      '@font-face maps a family, source format, style, weight range, stretch, unicode range, and display strategy to real resources. A regular file does not contain every bold or italic design. WOFF2 is the common web format, variable fonts can cover ranges, and font-display controls invisible, fallback, and swap periods. Loading tests include cache, slow network, failure, and layout shift.',
    misconception:
      'One regular font file can synthesize every weight and style with equal quality.',
    correct:
      'Declare resources for actual requested styles and ranges, choose display behavior deliberately, and verify loading plus fallback transitions.',
    distractors: [
      'Declare font-weight normal for a variable file so every other weight maps automatically.',
      'Use font-display block for all body text because invisible text prevents layout shift.',
    ],
    sequence: [
      'Inventory family weights styles stretches and character coverage used',
      'Map each request to a real WOFF2 or variable resource',
      'Choose display behavior and optional preload from measured priority',
      'Test cache slow blocked failed and late-swap states',
    ],
    terms: ['font-face', 'weight', 'font-display'],
    prerequisiteIds: ['css-font-families-fallbacks'],
    requirements: [
      [
        'font-face',
        '@font-face {\n  font-family: "Relief Sans";\n  src: url("/fonts/relief-sans-variable.woff2") format("woff2");\n  font-weight: 300 800;\n  font-style: normal;\n  font-display: swap;\n}',
      ],
      ['font-use', '.shift-deck {\n  font-family: "Relief Sans", "Segoe UI", sans-serif;\n}'],
      [
        'font-preload',
        '<link rel="preload" href="/fonts/relief-sans-variable.woff2" as="font" type="font/woff2" crossorigin>',
        'source-includes',
        'html',
      ],
    ],
  },
  {
    id: 'css-type-scale',
    activityId: 'bounded-type-scale-studio',
    title: 'Create Hierarchy with a Bounded Type Scale',
    context: 'shift deck heading and fact hierarchy review',
    concept:
      'A type scale creates repeatable relationships among body, small text, headings, and display roles. Relative units preserve user scaling, while minimum and maximum bounds prevent extreme viewport-driven sizes. Hierarchy also uses weight, line height, spacing, and structure; oversized text alone does not fix unclear content order.',
    misconception: 'Fixed pixel font sizes provide the most consistent accessible typography.',
    correct:
      'Start from user-scalable body text, define a small bounded scale by content role, and test zoom, narrow width, and long headings.',
    distractors: [
      'Set every heading in pixels so browser text preferences cannot distort the visual brand.',
      'Use the largest scale step for all important card facts.',
    ],
    sequence: [
      'Define body small heading and display content roles',
      'Choose a restrained ratio and relative units',
      'Apply readable line heights weights and bounds',
      'Test zoom long text hierarchy and narrow width',
    ],
    terms: ['scale', 'rem', 'hierarchy'],
    prerequisiteIds: ['css-web-font-loading'],
    requirements: [
      ['body-size', 'body {\n  font-size: 1rem;\n}'],
      ['card-heading', '.shift-card h3 {\n  font-size: 1.375rem;\n  line-height: 1.25;\n}'],
      [
        'page-heading',
        'h1 {\n  font-size: clamp(2rem, 1.5rem + 2vw, 3.5rem);\n  line-height: 1.1;\n}',
      ],
      ['small-role', '.shift-status {\n  font-size: 0.9375rem;\n  font-weight: 700;\n}'],
    ],
  },
  {
    id: 'css-line-measure-spacing',
    activityId: 'reading-rhythm-audit',
    title: 'Control Measure and Rhythm for Sustained Reading',
    context: 'long shift guidance readability investigation',
    concept:
      'Readable prose needs appropriate line height, line measure, paragraph spacing, and restrained letter or word spacing. Very long tight lines increase tracking and return-sweep effort; very short lines fragment reading. Unitless line-height scales with text, ch can bound approximate measure, and text spacing must survive user overrides without clipping.',
    misconception:
      'Tightly packed long lines make reading faster because more text fits on screen.',
    correct:
      'Set a readable unitless line height and bounded measure, create paragraph rhythm, and test user text-spacing overrides plus zoom.',
    distractors: [
      'Use fixed line-height in pixels so larger user text stays in the original card height.',
      'Increase letter spacing on all paragraphs until every line reaches the same width.',
    ],
    sequence: [
      'Identify prose labels facts and compact metadata roles',
      'Set unitless line height and a readable line measure',
      'Create paragraph and section rhythm without fixed heights',
      'Apply user text-spacing overrides zoom and long content',
    ],
    terms: ['line-height', 'measure', 'spacing'],
    prerequisiteIds: ['css-type-scale'],
    requirements: [
      ['body-leading', 'body {\n  line-height: 1.6;\n}'],
      ['prose-measure', '.shift-guidance {\n  max-inline-size: 65ch;\n}'],
      ['paragraph-rhythm', '.shift-guidance p + p {\n  margin-block-start: 1em;\n}'],
      ['heading-spacing', '.shift-card h3 {\n  margin-block: 0 0.75rem;\n}'],
    ],
  },
  {
    id: 'css-text-wrapping-overflow',
    activityId: 'unexpected-text-resilience-lab',
    title: 'Keep Unexpected Text Available',
    context: 'long URL translated heading and vertical-text incident',
    concept:
      'Text may contain long words, URLs, identifiers, translated labels, user spacing, or vertical writing. Overflow-wrap anywhere breaks otherwise unbreakable tokens; hyphens auto needs correct language metadata and dictionary support; word-break changes break opportunities. Ellipsis hides text and requires another complete access path, so essential content should usually wrap instead.',
    misconception: 'Ellipsis is safe for any content because users understand hidden text exists.',
    correct:
      'Allow natural wrapping, add language-aware hyphenation or emergency token breaks, and keep essential text fully available without fixed-height clipping.',
    distractors: [
      'Set white-space nowrap and text-overflow ellipsis on every heading to preserve card alignment.',
      'Insert manual br elements into translated text at English word boundaries.',
    ],
    sequence: [
      'Test longest words URLs translations spacing and writing modes',
      'Preserve normal wrapping and content-driven block growth',
      'Add language-aware hyphenation or emergency token breaking',
      'Verify copy zoom focus and full-content access',
    ],
    terms: ['wrapping', 'hyphens', 'available'],
    prerequisiteIds: ['css-line-measure-spacing'],
    requirements: [
      ['token-wrap', '.shift-card {\n  overflow-wrap: anywhere;\n}'],
      ['hyphenation', '.shift-guidance {\n  hyphens: auto;\n}'],
      ['balanced-heading', '.shift-card h3 {\n  text-wrap: balance;\n}'],
      ['pretty-prose', '.shift-guidance p {\n  text-wrap: pretty;\n}'],
    ],
  },
  {
    id: 'css-responsive-type',
    activityId: 'responsive-type-boundary-lab',
    title: 'Adapt Type within User-Scalable Bounds',
    context: 'shift deck type at narrow wide and zoomed sizes',
    concept:
      'Responsive typography combines relative minimum and maximum sizes with a fluid preferred expression. Clamp can mix rem and viewport components so text responds without becoming viewport-only. Container and content constraints still matter. Browser zoom, root font preferences, long content, and extreme viewport sizes must all retain readable hierarchy and wrapping.',
    misconception: 'Viewport units alone are ideal because they always scale with device size.',
    correct:
      'Use relative lower and upper bounds, a modest fluid component, and content tests across viewport, root-size, and zoom changes.',
    distractors: [
      'Set body text to 2vw because it tracks every screen proportion perfectly.',
      'Remove maximum bounds so display headings can fill all available space.',
    ],
    sequence: [
      'Define readable minimum and maximum sizes by content role',
      'Build a preferred expression with relative and modest viewport terms',
      'Compose clamp and preserve content-driven wrapping',
      'Test extreme widths root-size changes zoom and translations',
    ],
    terms: ['clamp', 'relative', 'zoom'],
    prerequisiteIds: ['css-text-wrapping-overflow'],
    requirements: [
      ['responsive-h1', 'h1 {\n  font-size: clamp(2rem, 1.5rem + 2vw, 3.5rem);\n}'],
      ['responsive-h2', 'h2 {\n  font-size: clamp(1.5rem, 1.25rem + 1vw, 2.25rem);\n}'],
      [
        'responsive-card-heading',
        '.shift-card h3 {\n  font-size: clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem);\n}',
      ],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-working-with-css-fonts': {
    title: 'Trace Font Resources, Metrics, Scale, and Wrapping',
    context: 'Volunteer Shift Deck typography evidence lab',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-nutritional-label': {
    title: 'Workshop: Build a Relief-Supply Facts Label',
    context: 'dense but readable emergency supply information panel',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-newspaper-article': {
    title: 'Lab: Repair a Heat-Advisory Bulletin',
    context: 'unfamiliar web-font wrapping and reading-rhythm incident',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 16,
  },
  'mapped-review-css-typography': {
    title: 'Retrieval Review: Readable and Responsive Typography',
    context: 'changed font loading language and viewport constraints',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 20,
  },
  'mapped-quiz-css-typography': {
    title: 'Mastery Exam: Readable and Responsive Typography',
    context: 'independent typography release decision',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 30,
  },
};

const milestones = [
  [
    'Build the interface font stack',
    'font-family: Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;',
    'css-font-families-fallbacks',
  ],
  [
    'Build the code font stack',
    'font-family: "Roboto Mono", "Cascadia Code", Consolas, monospace;',
    'css-font-families-fallbacks',
  ],
  ['Preserve fallback x-height', 'font-size-adjust: 0.52;', 'css-font-families-fallbacks'],
  [
    'Document font failure testing',
    '/* Test preferred, fallback, blocked, and user-overridden fonts. */',
    'css-font-families-fallbacks',
  ],
  [
    'Declare a variable WOFF2 face',
    'src: url("/fonts/relief-sans-variable.woff2") format("woff2");',
    'css-web-font-loading',
  ],
  ['Map the real weight range', 'font-weight: 300 800;', 'css-web-font-loading'],
  ['Choose swap display behavior', 'font-display: swap;', 'css-web-font-loading'],
  [
    'Preload the measured priority resource',
    '<link rel="preload" href="/fonts/relief-sans-variable.woff2" as="font" type="font/woff2" crossorigin>',
    'css-web-font-loading',
    'source-includes',
    'html',
  ],
  ['Set user-scalable body text', 'font-size: 1rem;', 'css-type-scale'],
  ['Set bounded card heading size', 'font-size: 1.375rem;', 'css-type-scale'],
  [
    'Clamp the page heading role',
    'font-size: clamp(2rem, 1.5rem + 2vw, 3.5rem);',
    'css-type-scale',
  ],
  ['Create a compact status role', 'font-size: 0.9375rem;', 'css-type-scale'],
  ['Set unitless body leading', 'line-height: 1.6;', 'css-line-measure-spacing'],
  ['Constrain guidance measure', 'max-inline-size: 65ch;', 'css-line-measure-spacing'],
  [
    'Create paragraph rhythm',
    '.shift-guidance p + p {\n  margin-block-start: 1em;',
    'css-line-measure-spacing',
  ],
  ['Create heading-to-content rhythm', 'margin-block: 0 0.75rem;', 'css-line-measure-spacing'],
  ['Break emergency long tokens', 'overflow-wrap: anywhere;', 'css-text-wrapping-overflow'],
  ['Enable language-aware hyphenation', 'hyphens: auto;', 'css-text-wrapping-overflow'],
  ['Balance short headings', 'text-wrap: balance;', 'css-text-wrapping-overflow'],
  ['Improve prose ragging', 'text-wrap: pretty;', 'css-text-wrapping-overflow'],
  [
    'Clamp the responsive page heading',
    'font-size: clamp(2rem, 1.5rem + 2vw, 3.5rem);',
    'css-responsive-type',
  ],
  [
    'Clamp the responsive section heading',
    'font-size: clamp(1.5rem, 1.25rem + 1vw, 2.25rem);',
    'css-responsive-type',
  ],
  [
    'Clamp the responsive card heading',
    'font-size: clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem);',
    'css-responsive-type',
  ],
  [
    'Document root-size and zoom tests',
    '/* Responsive type retains readable bounds under root-size changes and zoom. */',
    'css-responsive-type',
  ],
];

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'css-typography',
  moduleId: 'readable-responsive-typography',
  title: 'Readable and Responsive Typography',
  description:
    'Build metric-aware fallbacks, map real web-font resources, create bounded type scales, control reading measure and rhythm, preserve unexpected text, and adapt typography without overriding user settings.',
  order: 17,
  objectives: [
    'Build resilient font stacks and verify layout under preferred, fallback, late, blocked, and user-overridden fonts.',
    'Declare real web-font styles, weights, ranges, formats, and display behavior without synthetic assumptions.',
    'Create readable hierarchy, line height, measure, spacing, wrapping, and content-driven block growth.',
    'Use relative bounded fluid type that survives zoom, root-size changes, long content, and narrow widths.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: [
    'design-color-typography',
    'flex-pattern-selection',
    'css-color-contrast',
  ],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'answer', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'volunteer-shift-deck-project',
  priorLastActivityId: 'mapped-lab-page-of-playing-cards',
  insertAfterCompetencyId: 'flex-pattern-selection',
  insertAfterModuleId: 'volunteer-shift-deck-project',
  estimatedHours: 1770,
  milestones,
  mappedPlans,
  activityIds: [
    'font-fallback-metric-lab',
    'web-font-resource-map',
    'bounded-type-scale-studio',
    'reading-rhythm-audit',
    'unexpected-text-resilience-lab',
    'responsive-type-boundary-lab',
    'mapped-lecture-working-with-css-fonts',
    'mapped-workshop-nutritional-label',
    'mapped-lab-newspaper-article',
    'mapped-review-css-typography',
    'mapped-quiz-css-typography',
  ],
});

console.log(
  `Generated Typography: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
