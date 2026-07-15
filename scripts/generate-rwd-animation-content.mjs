import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'ethical-learning-product-launch';
const starterFiles = {
  html: '<!-- Continue the Ethical Product Launch motion and feedback work here. -->',
  css: '/* Continue the Ethical Product Launch motion and feedback work here. */',
  javascript: '',
};

const models = [
  {
    id: 'css-transitions',
    activityId: 'meaningful-state-transition-lab',
    title: 'Transition Meaningful Changes between Known States',
    context: 'ethical launch action and disclosure state feedback',
    concept:
      'A transition interpolates an animatable property when its computed value changes between known states. List only properties whose motion improves cause-and-effect understanding. Transitioning all can accidentally animate layout, color-mode, or future declarations. The base and changed states must remain complete without motion, duration should not delay the task, and discrete changes need deliberate behavior rather than an interpolation assumption.',
    misconception:
      'Transition all is harmless because browsers automatically choose only cheap useful properties.',
    correct:
      'Name the exact state change and properties, keep both endpoints understandable, and verify interruption, keyboard, preference, and performance behavior.',
    distractors: [
      'Animate width height margin color and every future property to make state changes feel consistent.',
      'Delay button activation until its hover transition finishes so users see the complete effect.',
    ],
    sequence: [
      'Define the user action and meaningful before and after states',
      'Choose only properties whose interpolation clarifies the change',
      'Set restrained duration easing and interruption behavior',
      'Test keyboard pointer rapid reversal reduced motion and task timing',
    ],
    terms: ['state', 'property', 'interruption'],
    prerequisiteIds: ['css-transforms', 'css-debug-method'],
    requirements: [
      [
        'transition-list',
        '.launch-action {\n  transition-property: transform, box-shadow;\n  transition-duration: 160ms;\n  transition-timing-function: ease-out;\n}',
      ],
      [
        'transition-state',
        '.launch-action:is(:hover, :focus-visible) {\n  transform: translateY(-0.125rem);\n  box-shadow: 0 0.35rem 0.8rem rgb(15 23 42 / 0.2);\n}',
      ],
      [
        'transition-record',
        '/* Transition exact feedback properties only; never delay activation or replace visible focus. */',
      ],
    ],
  },
  {
    id: 'css-keyframes',
    activityId: 'keyframe-state-sequence-studio',
    title: 'Define Stable Keyframe State Sequences',
    context: 'ethical launch saved-progress confirmation sequence',
    concept:
      '@keyframes defines named property states at relative progress offsets from zero through one hundred percent. Percentages are not milliseconds. Omitted properties interpolate from underlying values where possible, duplicate names follow cascade rules, and animation declarations connect the sequence to an element. The static element must still communicate status before, during, after, and when animation is unsupported.',
    misconception: 'Keyframe percentages are elapsed milliseconds in the animation timeline.',
    correct:
      'Define purposeful start intermediate and end states as relative progress, then preserve a stable nonanimated status outside the sequence.',
    distractors: [
      'Put the duration into the fifty-percent keyframe so the browser knows when it occurs.',
      'Use fill-mode both as the only way the completed status remains visible.',
    ],
    sequence: [
      'Define the status meaning and stable nonanimated presentation',
      'Choose the minimum keyframe offsets needed to express feedback',
      'Apply a named animation with separate timing controls',
      'Test start interruption completion replay missing support and reduced motion',
    ],
    terms: ['keyframes', 'progress', 'status'],
    prerequisiteIds: ['css-transitions'],
    requirements: [
      [
        'keyframes',
        '@keyframes saved-confirmation {\n  0% { opacity: 0; transform: translateY(0.25rem); }\n  60% { opacity: 1; transform: translateY(0); }\n  100% { opacity: 1; transform: translateY(0); }\n}',
      ],
      [
        'animation-application',
        '.save-status[data-state="saved"] {\n  animation-name: saved-confirmation;\n  animation-duration: 420ms;\n}',
      ],
      ['static-status', '.save-status {\n  opacity: 1;\n}'],
      [
        'keyframe-record',
        '/* Keyframe offsets are relative progress, not elapsed milliseconds. */',
      ],
    ],
  },
  {
    id: 'css-animation-timing',
    activityId: 'animation-timing-control-lab',
    title: 'Choose Timing, Iteration, Direction, Fill, and Easing from Purpose',
    context: 'ethical launch feedback and decorative illustration timing audit',
    concept:
      'Duration, delay, iteration count, direction, fill mode, play state, and easing each change the timeline. Interface feedback should be brief and nonblocking; decorative motion should avoid endless high-salience loops. Cubic-bezier changes rate, steps creates discrete frames, negative delay begins partway through, and fill mode changes applied styles outside the active interval but should not replace durable state.',
    misconception: 'Longer bouncier animation always makes an interface more engaging.',
    correct:
      'Choose every timeline control from feedback purpose and user control, then verify rapid input, interruption, completion, and attention cost.',
    distractors: [
      'Run confirmation motion infinitely so users never miss that the save succeeded.',
      'Use animation delay to postpone the actual form submission until the illustration completes.',
    ],
    sequence: [
      'Classify motion as task feedback state transition or decoration',
      'Choose duration easing delay iteration direction and fill deliberately',
      'Keep task state independent from the animation timeline',
      'Test rapid activation interruption tab switching and user control',
    ],
    terms: ['duration', 'easing', 'control'],
    prerequisiteIds: ['css-keyframes'],
    requirements: [
      [
        'feedback-timing',
        '.save-status[data-state="saved"] {\n  animation: saved-confirmation 420ms cubic-bezier(0.2, 0.8, 0.2, 1) 1 both;\n}',
      ],
      [
        'decorative-timing',
        '.practice-orbit {\n  animation: practice-orbit 12s linear infinite;\n}',
      ],
      [
        'pause-state',
        '.practice-illustration[data-motion="paused"] .practice-orbit {\n  animation-play-state: paused;\n}',
      ],
      [
        'timing-record',
        '/* Task completion never waits for animation duration, delay, iteration, or fill state. */',
      ],
    ],
  },
  {
    id: 'css-animation-performance',
    activityId: 'motion-performance-evidence-lab',
    title: 'Measure Layout, Paint, and Compositing Cost',
    context: 'ethical launch illustration performance trace',
    concept:
      'Transform and opacity often avoid layout and may composite efficiently, but they are not free. Large layers, filters, shadows, blend modes, texture uploads, and too many promoted elements can consume memory and paint time. Will-change is a temporary hint, not a blanket optimization. Record a performance trace, layer evidence, frame behavior, and low-powered conditions before claiming improvement.',
    misconception: 'Transform and opacity are always free and need no performance verification.',
    correct:
      'Prefer transform or opacity when suitable, measure actual layout paint compositing and memory behavior, and remove speculative promotion hints.',
    distractors: [
      'Add will-change transform to every card so the browser permanently prepares all animations.',
      'Replace a measured cheap color change with a large composited layer because compositing is always faster.',
    ],
    sequence: [
      'Record the target device task and frame symptom',
      'Capture main-thread layout paint layer and frame evidence',
      'Change one property or layer decision and repeat the trace',
      'Verify low-power rapid interaction memory and visual correctness',
    ],
    terms: ['layout', 'paint', 'compositing'],
    prerequisiteIds: ['css-animation-timing'],
    requirements: [
      [
        'performant-keyframes',
        '@keyframes practice-orbit {\n  from { transform: rotate(0turn) translateX(3rem) rotate(0turn); }\n  to { transform: rotate(1turn) translateX(3rem) rotate(-1turn); }\n}',
      ],
      ['promotion-scope', '.practice-orbit[data-animating="true"] {\n  will-change: transform;\n}'],
      ['promotion-reset', '.practice-orbit[data-animating="false"] {\n  will-change: auto;\n}'],
      [
        'performance-record',
        '/* Trace layout, paint, layers, memory, and frames on a low-power profile before and after repair. */',
      ],
    ],
  },
  {
    id: 'css-reduced-motion',
    activityId: 'reduced-motion-equivalence-studio',
    title: 'Preserve Meaning with Reduced-Motion Alternatives',
    context: 'ethical launch status feedback and orbit illustration preference adaptation',
    concept:
      'Prefers-reduced-motion communicates a preference to reduce nonessential motion; it does not mean remove meaning or shorten every animation to nearly zero. Stop large spatial movement, parallax, zoom, rotation, and unnecessary loops. Preserve state through immediate text, icon, border, or opacity changes. The base should work when the query is unsupported, and motion controls remain useful regardless of system preference.',
    misconception: 'A very fast animation automatically satisfies reduced-motion needs.',
    correct:
      'Remove nonessential spatial movement while preserving status and task feedback through immediate nonmotion cues and user control.',
    distractors: [
      'Hide the save status in reduced-motion mode because its animation cannot run.',
      'Run the full orbit in one millisecond so it technically spends less time moving.',
    ],
    sequence: [
      'Inventory motion purpose trigger magnitude duration and repetition',
      'Separate essential status from nonessential spatial movement',
      'Provide immediate text icon border or opacity alternatives',
      'Test system preference manual control unsupported query and state changes',
    ],
    terms: ['preference', 'alternative', 'meaning'],
    prerequisiteIds: ['css-animation-performance'],
    requirements: [
      [
        'reduced-motion',
        '@media (prefers-reduced-motion: reduce) {\n  .practice-orbit,\n  .save-status[data-state="saved"] {\n    animation: none;\n    transform: none;\n  }\n}',
      ],
      [
        'status-alternative',
        '@media (prefers-reduced-motion: reduce) {\n  .save-status[data-state="saved"] {\n    opacity: 1;\n    border-inline-start: 0.4rem solid currentColor;\n  }\n}',
      ],
      [
        'motion-control',
        '.practice-illustration[data-motion="paused"] .practice-orbit {\n  animation-play-state: paused;\n}',
      ],
      [
        'motion-record',
        '/* Reduced motion preserves status text and controls while removing nonessential spatial movement. */',
      ],
    ],
  },
  {
    id: 'css-animation-debug',
    activityId: 'animation-precedence-debug-studio',
    title: 'Debug Precedence, Interpolation, Composition, and Missing States',
    context: 'ethical launch transform and animation conflict incident',
    concept:
      'Animations can override ordinary declarations for animated properties, shorthands reset omitted longhands, duplicate keyframe names can replace earlier rules, and transform animation usually replaces a separate transform rather than merging automatically. Missing endpoints, nonanimatable values, fill mode, play state, negative delay, and reduced-motion overrides can all explain surprises. Reduce the case and inspect the Animations and Computed panels before patching.',
    misconception:
      'An animation transform always combines automatically with a transform declared elsewhere.',
    correct:
      'Inspect the active animation, winning keyframes, computed timeline and full transform value, then repair composition explicitly and rerun preference states.',
    distractors: [
      'Add important to the static transform so it merges with every animated transform function.',
      'Rename random keyframes until the visual result appears correct without tracing active rules.',
    ],
    sequence: [
      'Reproduce trigger timeline preference and exact missing state',
      'Inspect active animations keyframe names shorthands and computed properties',
      'Reduce transform composition interpolation and fill behavior separately',
      'Apply one explicit repair and retest interruption reduced motion and static state',
    ],
    terms: ['precedence', 'composition', 'computed'],
    prerequisiteIds: ['css-reduced-motion'],
    requirements: [
      [
        'composed-transform',
        '@keyframes orbit-with-offset {\n  from { transform: translate(var(--orbit-x), var(--orbit-y)) rotate(0turn); }\n  to { transform: translate(var(--orbit-x), var(--orbit-y)) rotate(1turn); }\n}',
      ],
      [
        'animation-longhands',
        '.practice-orbit {\n  animation-name: orbit-with-offset;\n  animation-duration: 12s;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n}',
      ],
      [
        'debug-record',
        '/* Inspect animation precedence, shorthand resets, keyframe name, timeline, fill, and the full computed transform. */',
      ],
      [
        'regression-record',
        '/* Retest static, running, paused, interrupted, reduced-motion, hidden-tab, and rapid state-change cases. */',
      ],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-animations-and-accessibility': {
    title: 'Trace Motion Purpose, Preference, Performance, and Failure Evidence',
    context: 'ethical launch motion accessibility architecture review',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 8,
  },
  'mapped-workshop-ferris-wheel': {
    title: 'Workshop: Build a Pausable Community Resource Wheel',
    context: 'transform-based illustration with timing control and static alternative',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 48,
  },
  'mapped-lab-moon-orbit': {
    title: 'Lab: Build and Measure an Informational Orbit',
    context: 'independent keyframe composition performance and preference build',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 20,
    labPattern: ['predict', 'code', 'inspect', 'code', 'debug', 'code', 'reflect', 'arrange'],
    labBrief:
      'Build an orbiting service-status indicator for a transit display where the static label remains authoritative and motion only explains update cadence.',
    evidenceLens: 'timeline and rendering measurement',
    acceptanceEvidence:
      'a computed-style trace, animation-frame measurement, paused and interrupted states, and an equivalent reduced-motion status',
  },
  'mapped-workshop-flappy-penguin': {
    title: 'Workshop: Build an Accessible Practice-Guide Character',
    context: 'multi-state character illustration with restrained feedback and regression proof',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 120,
  },
  'mapped-lab-personal-portfolio': {
    title: 'Lab: Add Purposeful Motion to a Professional Portfolio',
    context: 'independent transition keyframe reduced-motion and performance transfer',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 20,
    labPattern: ['inspect', 'arrange', 'answer', 'debug', 'code', 'reflect', 'predict', 'code'],
    labBrief:
      'Audit a professional portfolio whose navigation underline, project-card reveal, and submission confirmation compete for attention across keyboard and touch use.',
    evidenceLens: 'portfolio task and attention audit',
    acceptanceEvidence:
      'keyboard focus continuity, rapid reversal behavior, a no-motion task path, touch-target feedback, and stakeholder task timing',
  },
  'mapped-review-css-animations': {
    title: 'Retrieval Review: CSS Motion Systems',
    context: 'changed state timing performance preference and composition constraints',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 24,
  },
  'mapped-quiz-css-animations': {
    title: 'Mastery Exam: CSS Motion Systems',
    context: 'independent motion purpose timeline performance and debug decisions',
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
  blueprintModuleId: 'css-animations',
  moduleId: 'purposeful-accessible-motion-systems',
  title: 'Purposeful and Accessible Motion Systems',
  description:
    'Use transitions and keyframes for meaningful state feedback, control timelines from purpose, measure real rendering cost, preserve meaning under reduced-motion preferences, and debug animation precedence and transform composition with browser evidence.',
  order: 27,
  objectives: [
    'Transition only properties whose interpolation clarifies a real state change without delaying tasks.',
    'Define stable keyframe sequences and choose duration, easing, delay, iteration, direction, fill, and controls deliberately.',
    'Measure layout, paint, compositing, layer, memory, and frame effects instead of assuming animation performance.',
    'Replace nonessential spatial motion with immediate equivalent status cues under reduced-motion preferences.',
    'Debug active animation precedence, shorthand resets, interpolation, fill behavior, keyframe identity, and transform composition.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: [
    'css-transforms',
    'css-debug-method',
    'css-form-autofill-motion',
    'css-accessibility-regression',
  ],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'code', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'ethical-product-launch-project',
  priorLastActivityId: 'mapped-lab-product-landing-page',
  insertAfterCompetencyId: 'css-debug-method',
  insertAfterModuleId: 'ethical-product-launch-project',
  estimatedHours: 3520,
  milestones,
  mappedPlans,
  activityIds: [
    'meaningful-state-transition-lab',
    'keyframe-state-sequence-studio',
    'animation-timing-control-lab',
    'motion-performance-evidence-lab',
    'reduced-motion-equivalence-studio',
    'animation-precedence-debug-studio',
    'mapped-lecture-animations-and-accessibility',
    'mapped-workshop-ferris-wheel',
    'mapped-lab-moon-orbit',
    'mapped-workshop-flappy-penguin',
    'mapped-lab-personal-portfolio',
    'mapped-review-css-animations',
    'mapped-quiz-css-animations',
  ],
});

console.log(
  `Generated CSS Motion: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
