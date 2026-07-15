import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'volunteer-shift-deck';
const starterFiles = {
  html: '<!-- Continue the Volunteer Shift Deck accessibility hardening here. -->',
  css: '/* Continue the accessible CSS regression system here. */',
  javascript: '',
};

const models = [
  {
    id: 'css-zoom-reflow',
    activityId: 'zoom-reflow-stress-lab',
    title: 'Preserve Complete Tasks at High Zoom and Narrow Width',
    context: 'shift selection at four-hundred-percent zoom',
    concept:
      'Browser zoom changes the effective CSS viewport and magnifies text, controls, spacing, and focus. Reflow requires content and workflows to remain available without two-dimensional page scrolling except for content that genuinely needs two dimensions. Relative sizes, wrapping, intrinsic constraints, and content-driven block growth outperform fixed desktop geometry.',
    misconception:
      'A desktop layout can remain fixed because browser zoom simply scales the screenshot.',
    correct:
      'Test complete workflows at high zoom and narrow effective widths, then remove fixed dimensions, clipping, and nonwrapping assumptions that lose content.',
    distractors: [
      'Disable browser zoom with viewport metadata so the desktop layout remains stable.',
      'Add one horizontal page scrollbar and consider every workflow reflow-safe.',
    ],
    sequence: [
      'Choose a complete representative task and baseline viewport',
      'Increase zoom and narrow effective width without changing content',
      'Trace clipping overlap hidden controls and two-dimensional scrolling',
      'Repair intrinsic constraints and repeat keyboard plus pointer workflows',
    ],
    terms: ['zoom', 'reflow', 'workflow'],
    prerequisiteIds: ['accessibility-test-strategy', 'css-responsive-type'],
    requirements: [
      [
        'reflow-shell',
        '.project-shell {\n  inline-size: min(100% - 2rem, 72rem);\n  min-inline-size: 0;\n}',
      ],
      ['reflow-deck', '.shift-deck {\n  display: flex;\n  flex-wrap: wrap;\n}'],
      [
        'reflow-card',
        '.shift-card {\n  min-inline-size: min(100%, 16rem);\n  block-size: auto;\n}',
      ],
    ],
  },
  {
    id: 'css-visible-hidden-content',
    activityId: 'hidden-state-contract-lab',
    title: 'Match Hidden Technique to Visual, Layout, Focus, and Access Intent',
    context: 'shift details and status visibility-state audit',
    concept:
      'Display none and the hidden attribute remove content from layout and the accessibility tree. Visibility hidden preserves layout space but removes interaction and accessibility exposure. Opacity zero leaves layout, focus, hit testing, and accessibility behavior unless other properties change. A visually hidden utility keeps text available while clipping its visual box and needs focus exceptions for skip links.',
    misconception: 'Opacity zero removes an element from keyboard and accessibility navigation.',
    correct:
      'State visual, layout, focus, hit-test, and accessibility intent first, then choose hidden, display, visibility, opacity, or a tested visually hidden pattern.',
    distractors: [
      'Move every hidden element far offscreen because focus can never follow it.',
      'Use visibility hidden for skip links and reveal them only after activation.',
    ],
    sequence: [
      'Define whether content should render occupy space receive focus accept hits and remain exposed',
      'Choose the technique matching all five states',
      'Test keyboard accessibility tree pointer and layout behavior',
      'Exercise reveal removal animation and stale-focus transitions',
    ],
    terms: ['opacity', 'focus', 'accessibility'],
    prerequisiteIds: ['css-zoom-reflow'],
    requirements: [
      ['hidden-contract', '[hidden] {\n  display: none;\n}'],
      [
        'visually-hidden',
        '.visually-hidden {\n  position: absolute;\n  inline-size: 1px;\n  block-size: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n  white-space: nowrap;\n  border: 0;\n}',
      ],
      [
        'skip-reveal',
        '.skip-link:focus-visible {\n  position: fixed;\n  inline-size: auto;\n  block-size: auto;\n  clip-path: none;\n}',
      ],
    ],
  },
  {
    id: 'css-focus-visibility',
    activityId: 'focus-visibility-regression-lab',
    title: 'Protect Focus from Resets, Clipping, and Overlays',
    context: 'shift action focus disappearance incident',
    concept:
      'Focus indicators can disappear through outline resets, low contrast, overflow clipping, overlays, same-color surfaces, transforms, and insufficient offset. A subtle color change is not a robust boundary. Every keyboard-operable target needs visible focus on every background and state, including forced colors and scrolled or sticky contexts.',
    misconception: 'A subtle color shift is enough focus evidence for every control.',
    correct:
      'Use a distinct boundary with thickness and offset, prevent clipping and overlay obstruction, and test every target across surfaces and modes.',
    distractors: [
      'Remove all outlines and rely on the browser status bar for links.',
      'Use box-shadow only because system forced colors always preserve author shadows.',
    ],
    sequence: [
      'Traverse every target by keyboard in normal and failure states',
      'Inspect contrast thickness offset clipping and overlay coverage',
      'Create a durable focus-visible boundary and forced-color adaptation',
      'Retest zoom scroll sticky content themes and high contrast',
    ],
    terms: ['focus', 'outline', 'contrast'],
    prerequisiteIds: ['css-visible-hidden-content'],
    requirements: [
      [
        'focus-ring',
        ':where(a, button, input, select, textarea):focus-visible {\n  outline: 0.2rem solid #b45309;\n  outline-offset: 0.2rem;\n}',
      ],
      ['focus-layer', '.shift-action:focus-visible {\n  position: relative;\n  z-index: 1;\n}'],
      [
        'forced-focus',
        '@media (forced-colors: active) {\n  :where(a, button, input, select, textarea):focus-visible {\n    outline-color: Highlight;\n  }\n}',
      ],
    ],
  },
  {
    id: 'css-user-preferences',
    activityId: 'user-preference-adaptation-lab',
    title: 'Adapt Presentation without Removing Useful Feedback',
    context: 'shift deck motion contrast and color-scheme preference review',
    concept:
      'Preference media features include reduced motion, increased contrast, color scheme, forced colors, and in some environments reduced transparency. Adaptations should reduce unwanted effects while preserving state, hierarchy, and feedback. Reduced motion does not mean hiding focus or instant unexplained state changes, and dark mode is not automatic inversion.',
    misconception: 'Preference media queries should disable all useful feedback and state changes.',
    correct:
      'Identify the effect causing discomfort or reduced access, replace it with a stable equivalent, and verify meaning across each supported preference.',
    distractors: [
      'Set display none on animated status messages under reduced motion.',
      'Invert every color for dark mode without rechecking contrast or imagery.',
    ],
    sequence: [
      'Inventory motion transparency contrast color and system-color effects',
      'Define a stable equivalent for each preference',
      'Implement preference queries without removing state feedback',
      'Test combinations plus runtime preference changes',
    ],
    terms: ['preference', 'motion', 'feedback'],
    prerequisiteIds: ['css-focus-visibility'],
    requirements: [
      [
        'reduced-motion',
        '@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    scroll-behavior: auto;\n    transition-duration: 0.01ms;\n    animation-duration: 0.01ms;\n    animation-iteration-count: 1;\n  }\n}',
      ],
      [
        'contrast-preference',
        '@media (prefers-contrast: more) {\n  .shift-card {\n    border-width: 0.2rem;\n  }\n}',
      ],
      [
        'dark-scheme',
        '@media (prefers-color-scheme: dark) {\n  .shift-card {\n    color: #f8fafc;\n    background-color: #172033;\n  }\n}',
      ],
    ],
  },
  {
    id: 'css-touch-targets',
    activityId: 'target-spacing-pointer-lab',
    title: 'Provide Generous Targets and Non-Gesture Alternatives',
    context: 'shift action accidental-activation review',
    concept:
      'Target usability depends on clickable area, spacing, nearby targets, posture, tremor, screen size, zoom, and input precision—not SVG sharpness. Controls need generous inline and block area, visible boundaries, and separation. Path-based or multipoint gestures need simple alternatives, and orientation should not be locked without essential reason.',
    misconception: 'Small icons are usable when their SVG graphic is visually sharp.',
    correct:
      'Size the interactive area rather than only the glyph, separate adjacent targets, and provide simple pointer and keyboard alternatives to complex gestures.',
    distractors: [
      'Make icons eight pixels wide and add a tooltip for users who miss them.',
      'Require a drag path because touch devices are designed for gestures.',
    ],
    sequence: [
      'Inventory target dimensions spacing and input precision demands',
      'Expand the actual interactive box and preserve visible boundaries',
      'Add simple activation alternatives to path or multipoint gestures',
      'Test touch stylus mouse keyboard zoom and orientation changes',
    ],
    terms: ['target', 'spacing', 'alternative'],
    prerequisiteIds: ['css-user-preferences'],
    requirements: [
      [
        'target-size',
        '.shift-action {\n  display: inline-flex;\n  min-inline-size: 2.75rem;\n  min-block-size: 2.75rem;\n  align-items: center;\n}',
      ],
      [
        'target-spacing',
        '.shift-card-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}',
      ],
      [
        'coarse-pointer',
        '@media (pointer: coarse) {\n  .shift-action {\n    padding: 0.875rem 1rem;\n  }\n}',
      ],
    ],
  },
  {
    id: 'css-accessibility-regression',
    activityId: 'css-access-regression-matrix',
    title: 'Repeat Accessibility Checks after Every Visual Change',
    context: 'shift deck component release regression system',
    concept:
      'CSS accessibility is not a final audit. Component and project completion should repeat automation, keyboard, zoom, reflow, text spacing, contrast, focus, forced colors, reduced motion, touch, orientation, print, and assistive-semantic checks. Regression records name environments, tasks, evidence, failures, repairs, and retests.',
    misconception: 'Accessibility needs to be checked only once after all visual work is finished.',
    correct:
      'Attach a risk-based automated and manual matrix to each cumulative build, run it after changes, and record evidence plus affected-path retests.',
    distractors: [
      'Run only a color contrast checker after CSS changes because semantics cannot be affected by styling.',
      'Wait until certification day so accessibility checks cover the final code only once.',
    ],
    sequence: [
      'Map component risks and representative user tasks',
      'Run automated validation and machine-detectable rules',
      'Run keyboard zoom preference touch and assistive manual checks',
      'Record repair evidence and rerun every affected task',
    ],
    terms: ['regression', 'manual', 'evidence'],
    prerequisiteIds: ['css-touch-targets'],
    requirements: [
      [
        'regression-section',
        '<section aria-labelledby="css-regression-heading">',
        'source-includes',
        'html',
      ],
      [
        'regression-heading',
        '<h2 id="css-regression-heading">CSS accessibility regression record</h2>',
        'source-includes',
        'html',
      ],
      [
        'zoom-check',
        '<li>Zoom and reflow: complete shift application at 400% without lost content.</li>',
        'source-includes',
        'html',
      ],
      [
        'preference-check',
        '<li>Preferences: forced colors, reduced motion, contrast, and dark scheme preserve meaning.</li>',
        'source-includes',
        'html',
      ],
      [
        'target-check',
        '<li>Input: keyboard, touch, pointer, and orientation changes preserve every action.</li>',
        'source-includes',
        'html',
      ],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-best-practices-for-accessibility-and-css': {
    title: 'Trace CSS Decisions through Access Conditions',
    context: 'Volunteer Shift Deck visual-access evidence lab',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-accessibility-quiz': {
    title: 'Workshop: Build an Accessible Responder Knowledge Check',
    context: 'multi-state training quiz across zoom preferences and touch',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-tribute-page': {
    title: 'Lab: Build an Accessible Community Responder Tribute',
    context: 'unfamiliar biography page with reflow focus and preference failures',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 16,
  },
  'mapped-review-css-accessibility': {
    title: 'Retrieval Review: Accessible CSS under Real Preferences',
    context: 'changed zoom input and system-preference constraints',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 20,
  },
  'mapped-quiz-css-accessibility': {
    title: 'Mastery Exam: Accessible CSS under Real Preferences',
    context: 'independent CSS accessibility regression decision',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 30,
  },
};

const milestones = [
  ['Create an intrinsic reflow shell', 'inline-size: min(100% - 2rem, 72rem);', 'css-zoom-reflow'],
  ['Allow the shell to shrink', 'min-inline-size: 0;', 'css-zoom-reflow'],
  ['Enable shift deck wrapping', 'flex-wrap: wrap;', 'css-zoom-reflow'],
  ['Allow card block growth', 'block-size: auto;', 'css-zoom-reflow'],
  ['Define true hidden removal', '[hidden] {\n  display: none;', 'css-visible-hidden-content'],
  ['Create a tested visually hidden utility', '.visually-hidden {', 'css-visible-hidden-content'],
  ['Clip the visual utility box', 'clip-path: inset(50%);', 'css-visible-hidden-content'],
  ['Reveal skip content on focus', '.skip-link:focus-visible {', 'css-visible-hidden-content'],
  [
    'Create a durable global focus ring',
    ':where(a, button, input, select, textarea):focus-visible {',
    'css-focus-visibility',
  ],
  ['Offset focus from boundaries', 'outline-offset: 0.2rem;', 'css-focus-visibility'],
  ['Raise focused actions above local paint', 'z-index: 1;', 'css-focus-visibility'],
  ['Use system highlight in forced colors', 'outline-color: Highlight;', 'css-focus-visibility'],
  [
    'Detect reduced motion preference',
    '@media (prefers-reduced-motion: reduce) {',
    'css-user-preferences',
  ],
  ['Preserve immediate stable feedback', 'transition-duration: 0.01ms;', 'css-user-preferences'],
  [
    'Detect increased contrast preference',
    '@media (prefers-contrast: more) {',
    'css-user-preferences',
  ],
  ['Provide a tested dark scheme', '@media (prefers-color-scheme: dark) {', 'css-user-preferences'],
  ['Create generous action target size', 'min-block-size: 2.75rem;', 'css-touch-targets'],
  ['Separate adjacent targets', 'gap: 0.75rem;', 'css-touch-targets'],
  ['Adapt padding for coarse pointers', '@media (pointer: coarse) {', 'css-touch-targets'],
  [
    'Document simple gesture alternatives',
    '/* Every path-based gesture has a simple activation alternative. */',
    'css-touch-targets',
  ],
  [
    'Create the regression record',
    '<section aria-labelledby="css-regression-heading">',
    'css-accessibility-regression',
    'source-includes',
    'html',
  ],
  [
    'Record zoom and reflow evidence',
    '<li>Zoom and reflow: complete shift application at 400% without lost content.</li>',
    'css-accessibility-regression',
    'source-includes',
    'html',
  ],
  [
    'Record preference evidence',
    '<li>Preferences: forced colors, reduced motion, contrast, and dark scheme preserve meaning.</li>',
    'css-accessibility-regression',
    'source-includes',
    'html',
  ],
  [
    'Record input-mode evidence',
    '<li>Input: keyboard, touch, pointer, and orientation changes preserve every action.</li>',
    'css-accessibility-regression',
    'source-includes',
    'html',
  ],
];

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'css-and-accessibility',
  moduleId: 'accessible-css-preferences-regression',
  title: 'Accessible CSS under Real User Preferences',
  description:
    'Preserve complete tasks under zoom and reflow, choose hidden-state behavior accurately, protect focus, adapt to user preferences, create generous targets, and repeat accessibility regression checks after every visual change.',
  order: 18,
  objectives: [
    'Complete critical workflows at high zoom and narrow effective widths without lost content or controls.',
    'Match hidden techniques to visual, layout, focus, hit-test, and accessibility-tree intent.',
    'Protect focus and preserve meaningful feedback under reduced motion, contrast, dark scheme, and forced colors.',
    'Provide generous multi-input targets and attach repeated access evidence to every cumulative build.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: ['accessibility-test-strategy', 'css-responsive-type', 'keyboard-focus'],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'answer', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'readable-responsive-typography',
  priorLastActivityId: 'mapped-quiz-css-typography',
  insertAfterCompetencyId: 'css-responsive-type',
  insertAfterModuleId: 'readable-responsive-typography',
  estimatedHours: 1910,
  milestones,
  mappedPlans,
  activityIds: [
    'zoom-reflow-stress-lab',
    'hidden-state-contract-lab',
    'focus-visibility-regression-lab',
    'user-preference-adaptation-lab',
    'target-spacing-pointer-lab',
    'css-access-regression-matrix',
    'mapped-lecture-best-practices-for-accessibility-and-css',
    'mapped-workshop-accessibility-quiz',
    'mapped-lab-tribute-page',
    'mapped-review-css-accessibility',
    'mapped-quiz-css-accessibility',
  ],
});

console.log(
  `Generated CSS Accessibility: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
