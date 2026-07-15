import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'developer-field-manual';
const starterFiles = {
  html: '<!-- Continue the Developer Field Manual token-system work here. -->',
  css: '/* Continue the Developer Field Manual token-system work here. */',
  javascript: '',
};

const models = [
  {
    id: 'css-custom-property-definition',
    activityId: 'custom-property-resolution-studio',
    title: 'Define and Resolve Custom Properties',
    context: 'field manual spacing and color value trace',
    concept:
      'A custom property name begins with two hyphens, is case-sensitive, participates in the cascade, and stores a token stream until var() is substituted into a real property. The consuming property still must accept the resolved value. Custom properties can reduce repeated decisions and expose component inputs, but a variable for every literal makes the stylesheet harder to reason about.',
    misconception: 'Custom properties are replaced before the cascade and never inherit.',
    correct:
      'Trace the winning custom-property declaration through cascade and inheritance, then validate the resolved token stream in the consuming property.',
    distractors: [
      'Treat --manual-gap and --Manual-gap as the same variable because CSS property names ignore case.',
      'Assume defining --space: wide is valid because custom properties accept any tokens in every consumer.',
    ],
    sequence: [
      'Name one reusable design decision or component input',
      'Define the custom property at the narrowest useful scope',
      'Consume it with var inside a property that accepts the resolved value',
      'Inspect cascade inheritance computed value and changed scope',
    ],
    terms: ['custom property', 'var', 'computed'],
    prerequisiteIds: ['design-consistency-feedback', 'responsive-test-matrix'],
    requirements: [
      ['root-definition', ':root {\n  --manual-space-3: 0.75rem;\n  --manual-surface: #f8fafc;\n}'],
      [
        'value-consumption',
        '.manual-section {\n  padding: var(--manual-space-3);\n  background: var(--manual-surface);\n}',
      ],
      [
        'case-record',
        '/* Custom property names are case-sensitive: --manual-surface and --Manual-surface differ. */',
      ],
      [
        'computed-record',
        '/* Verify both the winning custom-property declaration and the consuming property computed value. */',
      ],
    ],
  },
  {
    id: 'css-custom-property-cascade',
    activityId: 'custom-property-scope-cascade-lab',
    title: 'Trace Inheritance, Scope, and Local Overrides',
    context: 'field manual warning and code component theme scope',
    concept:
      'Unregistered custom properties inherit by default. A root declaration supplies a broad default, but closer component, theme, state, media, and user-origin declarations can win normally. Local overrides are useful component inputs when their names communicate meaning. The var() call resolves at the element where the consuming declaration computes, not where the variable was first declared.',
    misconception:
      'A custom property declared on root cannot be overridden safely inside a component.',
    correct:
      'Scope defaults broadly, override semantic inputs on the smallest intended subtree, and inspect the value at the consumer element.',
    distractors: [
      'Repeat every component declaration under each theme instead of changing its semantic token inputs.',
      'Use important on root so local components cannot accidentally customize their own inputs.',
    ],
    sequence: [
      'Identify the consumer and inherited value chain',
      'Locate competing origins layers specificity scope and source order',
      'Place the override on the smallest intended subtree or state',
      'Inspect descendants siblings pseudo-elements and theme boundaries',
    ],
    terms: ['inheritance', 'scope', 'override'],
    prerequisiteIds: ['css-custom-property-definition'],
    requirements: [
      [
        'component-input',
        '.warning {\n  --component-accent: var(--color-danger);\n  border-inline-start-color: var(--component-accent);\n}',
      ],
      [
        'local-override',
        '.warning[data-severity="caution"] {\n  --component-accent: var(--color-caution);\n}',
      ],
      [
        'code-scope',
        '.code-block {\n  --component-surface: var(--color-code-surface);\n  background: var(--component-surface);\n}',
      ],
      [
        'scope-record',
        '/* Inspect the token on the consuming element; inherited values resolve in each consumer context. */',
      ],
    ],
  },
  {
    id: 'css-custom-property-fallbacks',
    activityId: 'custom-property-failure-lab',
    title: 'Distinguish Missing Values from Invalid Computed Values',
    context: 'field manual token failure and fallback experiment',
    concept:
      'The second argument to var() is used when the referenced custom property is missing or guaranteed-invalid; it can contain commas and another var(). A present value can still make the consuming declaration invalid at computed-value time, causing that property to fall back according to CSS rules rather than automatically selecting the var fallback. Fallback chains should be short, intentional, and tested by removing and corrupting each value.',
    misconception: 'A var fallback repairs every syntactically invalid resolved value.',
    correct:
      'Use nested fallbacks for genuinely missing tokens, then separately test present-but-invalid values in the consuming property.',
    distractors: [
      'Add more nested fallbacks until any invalid declaration becomes valid automatically.',
      'Assume a fallback after a comma cannot itself contain commas or another var function.',
    ],
    sequence: [
      'Record the consuming property grammar and desired default',
      'Test the preferred token when present and valid',
      'Remove the token and verify the nested fallback path',
      'Set a present invalid value and inspect computed-value failure separately',
    ],
    terms: ['fallback', 'missing', 'invalid'],
    prerequisiteIds: ['css-custom-property-cascade'],
    requirements: [
      [
        'nested-fallback',
        '.manual-callout {\n  color: var(--callout-text, var(--manual-text, #0f172a));\n}',
      ],
      [
        'comma-fallback',
        '.manual-panel {\n  box-shadow: var(--panel-shadow, 0 0.25rem 1rem rgb(15 23 42 / 0.18));\n}',
      ],
      [
        'invalid-experiment',
        '.token-failure-probe {\n  --probe-size: wide;\n  inline-size: var(--probe-size, 20rem);\n}',
      ],
      [
        'failure-record',
        '/* Remove --probe-size to exercise var fallback; keep wide to observe invalid-at-computed-value behavior. */',
      ],
    ],
  },
  {
    id: 'css-design-token-system',
    activityId: 'semantic-token-architecture-studio',
    title: 'Organize Primitive, Semantic, and Component Tokens',
    context: 'field manual default high-contrast and dark theme architecture',
    concept:
      'Primitive tokens name raw scales, semantic tokens name decisions such as text, surface, border, danger, and focus, and component tokens expose bounded inputs. Components should consume semantic or component tokens rather than a palette position. Token names document purpose, themes override decisions rather than duplicate components, and accessibility constraints such as contrast and forced colors remain part of the system.',
    misconception: 'Every raw CSS value should become a token regardless of reuse or meaning.',
    correct:
      'Tokenize durable decisions, map primitives to semantic roles, expose narrow component inputs, and verify every theme and preference state.',
    distractors: [
      'Name tokens --blue-1 and --blue-2 everywhere so components know which color conveys danger.',
      'Create a separate copy of each component for dark mode to avoid cascade interactions.',
    ],
    sequence: [
      'Inventory repeated decisions and accessibility constraints',
      'Define limited primitive scales and semantic role mappings',
      'Expose component inputs only where local variation is intentional',
      'Test default dark contrast forced-colors print and local overrides',
    ],
    terms: ['primitive', 'semantic', 'component'],
    prerequisiteIds: ['css-custom-property-fallbacks'],
    requirements: [
      [
        'primitive-tokens',
        ':root {\n  --color-slate-950: #020617;\n  --color-slate-50: #f8fafc;\n  --color-amber-700: #b45309;\n}',
      ],
      [
        'semantic-tokens',
        ':root {\n  --color-text: var(--color-slate-950);\n  --color-surface: var(--color-slate-50);\n  --color-focus: var(--color-amber-700);\n}',
      ],
      [
        'theme-override',
        '[data-theme="dark"] {\n  --color-text: #f8fafc;\n  --color-surface: #0f172a;\n  color-scheme: dark;\n}',
      ],
      [
        'semantic-consumer',
        '.manual-shell {\n  color: var(--color-text);\n  background: var(--color-surface);\n}',
      ],
      [
        'token-policy',
        '/* Components consume semantic roles; primitives do not encode task meaning by themselves. */',
      ],
    ],
  },
  {
    id: 'css-property-registration',
    activityId: 'registered-property-contract-lab',
    title: 'Register Typed Custom Properties Only When Useful',
    context: 'field manual progress and emphasis property contract',
    concept:
      '@property can declare a custom property syntax, inheritance behavior, and initial value. Registration enables typed validation, interpolation, and controlled inheritance, but ordinary custom properties need no registration. A compatible unregistered fallback should still make the core experience work, and registration is justified only when typed behavior or non-inheritance solves a real problem.',
    misconception: 'Every custom property must use @property before var can consume it.',
    correct:
      'Register selected values when syntax validation, interpolation, or explicit inheritance is needed; leave ordinary design tokens unregistered.',
    distractors: [
      'Register colors spacing labels and URLs even when no typed behavior or inheritance change is required.',
      'Omit an initial value for a non-universal syntax because the browser can infer one from consumers.',
    ],
    sequence: [
      'Identify the typed behavior or inheritance problem',
      'Choose a valid syntax inheritance rule and initial value',
      'Provide a useful unregistered base declaration',
      'Test valid invalid inherited animated and unsupported conditions',
    ],
    terms: ['registration', 'syntax', 'inheritance'],
    prerequisiteIds: ['css-design-token-system'],
    requirements: [
      [
        'progress-registration',
        '@property --manual-progress {\n  syntax: "<percentage>";\n  inherits: false;\n  initial-value: 0%;\n}',
      ],
      [
        'progress-base',
        '.manual-progress {\n  --manual-progress: 0%;\n  background: linear-gradient(to right, var(--color-focus) var(--manual-progress), transparent 0);\n}',
      ],
      [
        'progress-change',
        '.manual-progress[data-complete="true"] {\n  --manual-progress: 100%;\n}',
      ],
      [
        'registration-policy',
        '/* Register only values that need typed validation, interpolation, or explicit inheritance behavior. */',
      ],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-working-with-css-variables': {
    title: 'Trace Custom-Property Resolution and Failure States',
    context: 'field manual computed-value investigation',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 8,
  },
  'mapped-workshop-city-skyline': {
    title: 'Workshop: Build a Themeable Civic Operations Skyline',
    context: 'layered operations illustration with semantic themes and registered progress',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 128,
  },
  'mapped-lab-availability-table': {
    title: 'Lab: Refactor an Availability Table into Semantic Tokens',
    context: 'independent table token cascade and failure repair',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 16,
  },
  'mapped-review-css-variables': {
    title: 'Retrieval Review: Custom Properties and Design Tokens',
    context: 'changed scopes themes missing values and registrations',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 24,
  },
  'mapped-quiz-css-variables': {
    title: 'Mastery Exam: Custom Properties and Design Tokens',
    context: 'independent cascade computed-value and token architecture decisions',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 30,
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
  blueprintModuleId: 'css-variables',
  moduleId: 'custom-properties-design-tokens',
  title: 'Custom Properties and Design Tokens',
  description:
    'Trace custom-property resolution through cascade and inheritance, distinguish missing from invalid computed values, organize meaningful token layers, build accessible themes, and register only values that benefit from typed behavior.',
  order: 24,
  objectives: [
    'Define and consume custom properties while tracing the winning declaration and computed consumer value.',
    'Use inheritance, scope, and local overrides as intentional component contracts.',
    'Test nested fallbacks separately from present-but-invalid computed values.',
    'Organize primitive, semantic, and component tokens around durable accessible design decisions.',
    'Register selected properties when typed validation, interpolation, or explicit inheritance is justified.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: [
    'design-consistency-feedback',
    'responsive-test-matrix',
    'css-cascade-origins-layers',
    'css-accessibility-regression',
  ],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'code', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'developer-field-manual-project',
  priorLastActivityId: 'mapped-lab-technical-documentation-page',
  insertAfterCompetencyId: 'responsive-test-matrix',
  insertAfterModuleId: 'developer-field-manual-project',
  estimatedHours: 2780,
  milestones,
  mappedPlans,
  activityIds: [
    'custom-property-resolution-studio',
    'custom-property-scope-cascade-lab',
    'custom-property-failure-lab',
    'semantic-token-architecture-studio',
    'registered-property-contract-lab',
    'mapped-lecture-working-with-css-variables',
    'mapped-workshop-city-skyline',
    'mapped-lab-availability-table',
    'mapped-review-css-variables',
    'mapped-quiz-css-variables',
  ],
});

console.log(
  `Generated Custom Properties: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
