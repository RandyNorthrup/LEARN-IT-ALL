import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'community-needs-survey';
const starterFiles = {
  html: '<!-- Continue the Community Needs Survey color and status work here. -->',
  css: '/* Continue the survey color, contrast, and decorative-layer system here. */',
  javascript: '',
};

const models = [
  {
    id: 'css-color-formats',
    activityId: 'color-format-composition-lab',
    title: 'Represent and Composite Color Deliberately',
    context: 'survey palette notation and alpha-compositing audit',
    concept:
      'Named colors, hexadecimal, rgb(), hsl(), hwb(), lab(), lch(), oklab(), and oklch() are different coordinate systems for representing color; notation alone does not improve accessibility. Alpha blends foreground with what is behind it, so the final displayed color and contrast depend on every layer. Modern perceptual spaces can make controlled lightness and chroma changes easier to reason about.',
    misconception: 'Different color notations create inherently different displayed colors.',
    correct:
      'Convert equivalent values, choose a format that makes the intended manipulation clear, and calculate or inspect alpha against the actual background stack.',
    distractors: [
      'Use eight-digit hex whenever contrast is weak because alpha automatically darkens text.',
      'Assume fifty-percent transparent black always displays as the same gray on every surface.',
    ],
    sequence: [
      'Identify the desired displayed color and any underlying layers',
      'Choose a notation suited to exact reuse or perceptual adjustment',
      'Resolve alpha compositing from back to front',
      'Inspect the final computed and sampled color in every relevant state',
    ],
    terms: ['alpha', 'format', 'background'],
    prerequisiteIds: ['css-pseudo-elements'],
    requirements: [
      ['hex-text', '.survey-content {\n  color: #1e293b;\n}'],
      ['rgb-overlay', '.survey-overlay {\n  background-color: rgb(15 23 42 / 0.72);\n}'],
      ['hsl-accent', '.survey-accent {\n  color: hsl(199 89% 30%);\n}'],
      ['oklch-focus', '.survey-control:focus-visible {\n  outline-color: oklch(0.75 0.16 75);\n}'],
    ],
  },
  {
    id: 'css-color-relationships',
    activityId: 'purpose-driven-palette-studio',
    title: 'Build Palettes from Purpose, Not Formulas',
    context: 'heat-relief service palette critique',
    concept:
      'Hue, saturation or chroma, lightness, and warm or cool associations can support grouping and tone. Analogous, complementary, split-complementary, triadic, and monochromatic relationships are exploration tools, not guarantees of hierarchy, taste, contrast, cultural meaning, or usability. Functional roles and user testing decide whether a palette succeeds.',
    misconception:
      'A mathematically harmonious palette automatically communicates usable hierarchy.',
    correct:
      'Assign colors to content and state roles, explore relationships, preserve contrast and non-color cues, and test meaning with representative contexts.',
    distractors: [
      'Use one saturated complementary pair for all text and surfaces because opposition guarantees readability.',
      'Choose warm colors for danger in every culture and product without testing interpretation.',
    ],
    sequence: [
      'List surface text action status and focus roles',
      'Explore hue chroma and lightness relationships for those roles',
      'Check contrast state distinction and non-color reinforcement',
      'Test real content themes and cultural interpretation and revise',
    ],
    terms: ['hue', 'lightness', 'purpose'],
    prerequisiteIds: ['css-color-formats'],
    requirements: [
      ['surface-role', '.survey-surface {\n  color: #1e293b;\n  background-color: #f8fafc;\n}'],
      ['primary-role', '.primary-action {\n  color: #ffffff;\n  background-color: #075985;\n}'],
      ['warning-role', '.status-warning {\n  color: #78350f;\n  background-color: #fef3c7;\n}'],
      ['success-role', '.status-success {\n  color: #14532d;\n  background-color: #dcfce7;\n}'],
    ],
  },
  {
    id: 'css-color-contrast',
    activityId: 'contrast-state-evidence-lab',
    title: 'Verify Contrast across Content and States',
    context: 'survey text control and focus contrast evidence review',
    concept:
      'Contrast must be checked for the actual foreground, background, size, weight, state, and gradient location. WCAG criteria distinguish ordinary text, large text, user-interface components, meaningful graphics, and focus indicators. Anti-aliasing, opacity, images, themes, disabled presentation, and state changes can alter the tested pair. Record evidence for every meaningful state rather than one brand swatch.',
    misconception:
      'A contrast checker for one hex pair proves contrast in every state and gradient location.',
    correct:
      'Inventory text, component, graphic, and focus states; sample actual rendered pairs at worst-case locations; and keep a state-by-state evidence record.',
    distractors: [
      'Check only default body text because hover focus error and disabled colors inherit the same ratio.',
      'Average all gradient colors into one swatch and use that ratio for every point.',
    ],
    sequence: [
      'Inventory foreground-background pairs for every content and interaction state',
      'Classify text size component graphic and focus requirements',
      'Measure rendered pairs including opacity images and gradient extremes',
      'Adjust roles and retest default hover focus active disabled error and theme states',
    ],
    terms: ['contrast', 'state', 'evidence'],
    prerequisiteIds: ['css-color-relationships'],
    requirements: [
      ['high-contrast-body', 'body {\n  color: #172033;\n  background-color: #ffffff;\n}'],
      [
        'high-contrast-action',
        '.primary-action {\n  color: #ffffff;\n  background-color: #075985;\n}',
      ],
      [
        'focus-indicator',
        '.primary-action:focus-visible {\n  outline: 0.2rem solid #b45309;\n  outline-offset: 0.2rem;\n}',
      ],
      [
        'contrast-record',
        '<li>Contrast: text, controls, graphics, and focus states measured on rendered backgrounds.</li>',
        'source-includes',
        'html',
      ],
    ],
  },
  {
    id: 'css-color-not-only',
    activityId: 'non-color-meaning-system',
    title: 'Communicate Meaning beyond Color',
    context: 'service status and validation grayscale audit',
    concept:
      'Color can reinforce meaning but must not be the only channel. Text, icons with accessible names where needed, shape, pattern, position, border style, and programmatic state can distinguish status and selection. A second shade is still color-only. Grayscale, color-vision simulations, forced colors, print, and spoken output reveal whether meaning survives.',
    misconception: 'Adding a second shade is enough to avoid a color-only distinction.',
    correct:
      'Pair every meaningful color difference with text, structure, shape, pattern, or programmatic state and verify the task without author colors.',
    distractors: [
      'Use red and orange together because two hues count as two information channels.',
      'Add decorative icons without text or names and assume every user recognizes them.',
    ],
    sequence: [
      'List every color that carries status selection priority or error meaning',
      'Add an independent text structural shape or programmatic cue',
      'Remove author colors and inspect grayscale forced colors and print',
      'Complete identification correction and navigation tasks through each mode',
    ],
    terms: ['color', 'text', 'forced colors'],
    prerequisiteIds: ['css-color-contrast'],
    requirements: [
      [
        'available-text',
        '<span class="status-label">Available now</span>',
        'source-includes',
        'html',
      ],
      [
        'limited-text',
        '<span class="status-label">Limited capacity</span>',
        'source-includes',
        'html',
      ],
      [
        'status-boundary',
        '.service-status {\n  border-inline-start: 0.35rem solid currentColor;\n}',
      ],
      [
        'selected-shape',
        '.service-option[aria-current="true"] {\n  outline: 0.2rem double currentColor;\n}',
      ],
    ],
  },
  {
    id: 'css-gradients',
    activityId: 'gradient-fallback-composer',
    title: 'Compose Gradients with Readable Fallbacks',
    context: 'decorative survey header and capacity-dial review',
    concept:
      'Linear gradients transition along a line, radial gradients from a center or shape, conic gradients around a center, and repeating gradients repeat stop intervals. Gradients are CSS images but do not use alt attributes. They should remain decorative, include a solid fallback, use controlled stops, and preserve contrast at every text location and when images or author colors disappear.',
    misconception: 'A gradient is an image element and needs an alt attribute.',
    correct:
      'Keep gradient information decorative, declare a solid fallback first, control stops and geometry, and test contrast across every painted location.',
    distractors: [
      'Encode the only capacity legend in a conic gradient because its colors are self-explanatory.',
      'Place low-contrast text over the calmest part of the gradient and ignore other widths.',
    ],
    sequence: [
      'Confirm the gradient carries no required information',
      'Choose a solid fallback and gradient geometry',
      'Place explicit stops and overlay text only on verified surfaces',
      'Test narrow widths themes print forced colors and disabled images',
    ],
    terms: ['gradient', 'fallback', 'decorative'],
    prerequisiteIds: ['css-color-not-only'],
    requirements: [
      ['solid-fallback', '.survey-hero {\n  background-color: #e0f2fe;\n}'],
      [
        'linear-gradient',
        '.survey-hero {\n  background-image: linear-gradient(135deg, #f8fafc 0%, #bae6fd 100%);\n}',
      ],
      [
        'radial-gradient',
        '.survey-accent {\n  background-image: radial-gradient(circle at center, #fef3c7 0 35%, transparent 36%);\n}',
      ],
      [
        'repeating-gradient',
        '.capacity-pattern {\n  background-image: repeating-linear-gradient(45deg, transparent 0 0.5rem, rgb(7 89 133 / 0.15) 0.5rem 1rem);\n}',
      ],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-working-with-colors-in-css': {
    title: 'Trace Color Representation, Purpose, and Evidence',
    context: 'community survey palette and compositing laboratory',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-colored-markers': {
    title: 'Workshop: Build a Multi-State Service Availability Board',
    context: 'heat-relief location status board with non-color evidence',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-colored-boxes': {
    title: 'Lab: Repair a Heat-Risk Legend',
    context: 'unfamiliar color-only risk and gradient contrast incident',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 16,
  },
  'mapped-review-css-colors': {
    title: 'Retrieval Review: Color, Contrast, Meaning, and Gradients',
    context: 'changed theme and service-status constraints',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 20,
  },
  'mapped-quiz-css-colors': {
    title: 'Mastery Exam: Color, Contrast, Meaning, and Gradients',
    context: 'independent multi-theme color release decision',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 30,
  },
};

const milestones = [
  ['Set equivalent hex text color', 'color: #1e293b;', 'css-color-formats'],
  [
    'Compose a translucent RGB overlay',
    'background-color: rgb(15 23 42 / 0.72);',
    'css-color-formats',
  ],
  ['Express an accent in HSL', 'color: hsl(199 89% 30%);', 'css-color-formats'],
  ['Express focus color in OKLCH', 'outline-color: oklch(0.75 0.16 75);', 'css-color-formats'],
  [
    'Document alpha dependence on background',
    '/* Alpha output depends on every painted background layer. */',
    'css-color-formats',
  ],
  ['Create a surface color role', '.survey-surface {', 'css-color-relationships'],
  ['Create a primary action role', '.primary-action {', 'css-color-relationships'],
  ['Create a warning role', '.status-warning {', 'css-color-relationships'],
  ['Create a success role', '.status-success {', 'css-color-relationships'],
  [
    'Document purpose before harmony',
    '/* Palette roles follow task meaning before color-wheel harmony. */',
    'css-color-relationships',
  ],
  [
    'Set high-contrast body colors',
    'body {\n  color: #172033;\n  background-color: #ffffff;\n}',
    'css-color-contrast',
  ],
  [
    'Set high-contrast action colors',
    'color: #ffffff;\n  background-color: #075985;',
    'css-color-contrast',
  ],
  ['Create a contrasting focus indicator', 'outline: 0.2rem solid #b45309;', 'css-color-contrast'],
  [
    'Record rendered contrast evidence',
    '<li>Contrast: text, controls, graphics, and focus states measured on rendered backgrounds.</li>',
    'css-color-contrast',
    'source-includes',
    'html',
  ],
  [
    'Document state-by-state contrast checks',
    '/* Measure default, hover, focus, active, disabled, error, and theme states. */',
    'css-color-contrast',
  ],
  [
    'Publish available status text',
    '<span class="status-label">Available now</span>',
    'css-color-not-only',
    'source-includes',
    'html',
  ],
  [
    'Publish limited-capacity status text',
    '<span class="status-label">Limited capacity</span>',
    'css-color-not-only',
    'source-includes',
    'html',
  ],
  [
    'Add a non-color status boundary',
    'border-inline-start: 0.35rem solid currentColor;',
    'css-color-not-only',
  ],
  ['Add a selected-state shape cue', 'outline: 0.2rem double currentColor;', 'css-color-not-only'],
  [
    'Document forced-color verification',
    '/* Status meaning survives grayscale, print, and forced colors. */',
    'css-color-not-only',
  ],
  ['Declare a solid hero fallback', 'background-color: #e0f2fe;', 'css-gradients'],
  [
    'Add a decorative linear gradient',
    'linear-gradient(135deg, #f8fafc 0%, #bae6fd 100%)',
    'css-gradients',
  ],
  [
    'Add a decorative radial accent',
    'radial-gradient(circle at center, #fef3c7 0 35%, transparent 36%)',
    'css-gradients',
  ],
  [
    'Add a repeating capacity texture',
    'repeating-linear-gradient(45deg, transparent 0 0.5rem, rgb(7 89 133 / 0.15) 0.5rem 1rem)',
    'css-gradients',
  ],
  [
    'Document decorative gradient meaning',
    '/* Gradients remain decorative; required status stays in HTML. */',
    'css-gradients',
  ],
];

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'css-colors',
  moduleId: 'css-color-contrast-gradients',
  title: 'Color Systems, Contrast, and Gradients',
  description:
    'Represent and composite color accurately, build palettes from functional roles, verify rendered contrast across states, preserve meaning without author colors, and compose decorative gradients with solid fallbacks.',
  order: 12,
  objectives: [
    'Recognize equivalent color formats and predict alpha compositing against actual layered backgrounds.',
    'Use hue, chroma, lightness, temperature, and harmony as purpose-driven exploration tools rather than usability guarantees.',
    'Record text, component, graphic, and focus contrast evidence across every meaningful state and painted location.',
    'Preserve status and selection meaning without color and keep gradients decorative with readable fallbacks.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: ['css-pseudo-elements', 'accessibility-test-strategy'],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'answer', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'css-state-structure-generated-presentation',
  priorLastActivityId: 'mapped-quiz-css-pseudo-classes',
  insertAfterCompetencyId: 'css-pseudo-elements',
  insertAfterModuleId: 'css-state-structure-generated-presentation',
  estimatedHours: 1210,
  milestones,
  mappedPlans,
  activityIds: [
    'color-format-composition-lab',
    'purpose-driven-palette-studio',
    'contrast-state-evidence-lab',
    'non-color-meaning-system',
    'gradient-fallback-composer',
    'mapped-lecture-working-with-colors-in-css',
    'mapped-workshop-colored-markers',
    'mapped-lab-colored-boxes',
    'mapped-review-css-colors',
    'mapped-quiz-css-colors',
  ],
});

console.log(
  `Generated CSS Color: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
