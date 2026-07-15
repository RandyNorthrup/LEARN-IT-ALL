import { generateRwdProject } from './lib/generate-rwd-project.mjs';

const milestone = (
  phase,
  title,
  instruction,
  competencyId,
  correct,
  misconception,
  terms,
  requirements
) => ({ phase, title, instruction, competencyId, correct, misconception, terms, requirements });

const milestones = [
  milestone(
    'Document',
    'Establish the launch document contract',
    'Create a complete language metadata title and viewport foundation.',
    'html-document-boilerplate',
    'Stable document metadata gives every launch claim and interaction the correct browser and language context.',
    'Visible hero copy makes head metadata optional for a one-page launch.',
    ['document', 'language', 'viewport'],
    [
      ['doctype', '<!doctype html>', 'html'],
      ['language', '<html lang="en">', 'html'],
      ['viewport', '<meta name="viewport" content="width=device-width, initial-scale=1">', 'html'],
      ['title', '<title>Open Practice Lab — Free Adult Learning Practice</title>', 'html'],
    ]
  ),
  milestone(
    'Access',
    'Create a first-focus skip route',
    'Link keyboard users directly to the primary launch content.',
    'keyboard-focus',
    'A visible-on-focus native skip link bypasses repeated launch navigation without changing source order.',
    'A hidden skip link is complete even if focused users cannot see it.',
    ['skip', 'focus', 'target'],
    [
      [
        'skip-link',
        '<a class="skip-link" href="#launch-content">Skip to launch content</a>',
        'html',
      ],
      ['skip-focus', '.skip-link:focus-visible {\n  inset-block-start: 1rem;\n}', 'css'],
    ]
  ),
  milestone(
    'Landmarks',
    'Create a concise launch-region map',
    'Add header labeled navigation main and footer landmarks.',
    'semantic-landmarks',
    'A small native landmark set lets users navigate purposefully without redundant role noise.',
    'Every promotional section should be a separately labeled main landmark.',
    ['landmark', 'label', 'main'],
    [
      ['header', '<header class="launch-header">', 'html'],
      ['navigation', '<nav aria-label="Launch page">', 'html'],
      ['main', '<main id="launch-content">', 'html'],
      ['footer', '<footer class="launch-footer">', 'html'],
    ]
  ),
  milestone(
    'Promise',
    'State an honest user-centered value proposition',
    'Name the audience task product boundary and free access without unsupported outcomes.',
    'design-user-goals',
    'Specific audience task and product limits help learners decide without urgency or inflated guarantees.',
    'A stronger conversion page should promise results even when evidence covers only practice completion.',
    ['audience', 'task', 'limits'],
    [
      [
        'hero-heading',
        '<h1>Practice digital skills at your pace, free and without enrollment pressure</h1>',
        'html',
      ],
      [
        'hero-summary',
        '<p>Open Practice Lab gives adult learners short guided exercises and saved progress; it does not promise employment, credentials, or fixed completion dates.</p>',
        'html',
      ],
      [
        'honesty-note',
        '<p class="claim-note">Free means no payment details, trial deadline, or automatic subscription.</p>',
        'html',
      ],
    ]
  ),
  milestone(
    'Hierarchy',
    'Order primary information before persuasion',
    'Create value evidence demonstration form and limitations sections in task order.',
    'design-information-hierarchy',
    'Structural and visual hierarchy should help users find evidence and limits before committing information.',
    'Making every call to action the largest element creates clear information priority.',
    ['order', 'evidence', 'hierarchy'],
    [
      ['evidence-section', '<section id="evidence" aria-labelledby="evidence-heading">', 'html'],
      [
        'evidence-heading',
        '<h2 id="evidence-heading">What our pilot actually measured</h2>',
        'html',
      ],
      [
        'demo-section',
        '<section id="demonstration" aria-labelledby="demonstration-heading">',
        'html',
      ],
      ['interest-section', '<section id="interest" aria-labelledby="interest-heading">', 'html'],
      ['limits-section', '<section id="limits" aria-labelledby="limits-heading">', 'html'],
    ]
  ),
  milestone(
    'Evidence',
    'Publish bounded outcome evidence',
    'Include sample method date result denominator and limitation next to the claim.',
    'design-user-goals',
    'A denominator and method distinguish measured pilot behavior from a universal product promise.',
    'A large percentage is self-explanatory and does not need sample or method context.',
    ['sample', 'method', 'limitation'],
    [
      [
        'pilot-result',
        '<p><strong>37 of 48 pilot participants completed three practice sessions in May 2026.</strong></p>',
        'html',
      ],
      [
        'pilot-method',
        '<p>Method: voluntary two-week nonprofit pilot; completion was recorded when three exercises were submitted.</p>',
        'html',
      ],
      [
        'pilot-limit',
        '<p>Limit: the pilot did not measure job outcomes, long-term retention, or results for every adult learner.</p>',
        'html',
      ],
    ]
  ),
  milestone(
    'Image',
    'Deliver an art-directed product demonstration image',
    'Add format candidates accurate sizes intrinsic dimensions and purpose-driven alt text.',
    'responsive-images',
    'Responsive image markup lets the browser choose suitable bytes while intrinsic dimensions and alt preserve layout and meaning.',
    'CSS max width prevents oversized image downloads and makes srcset unnecessary.',
    ['srcset', 'sizes', 'alt'],
    [
      [
        'picture-source',
        '<source type="image/avif" srcset="/images/practice-wide-800.avif 800w, /images/practice-wide-1400.avif 1400w" sizes="(width >= 60rem) 50vw, 100vw">',
        'html',
      ],
      [
        'responsive-image',
        '<img src="/images/practice-640.jpg" srcset="/images/practice-400.jpg 400w, /images/practice-800.jpg 800w" sizes="(width >= 60rem) 50vw, 100vw" width="800" height="600" alt="Adult learner completing a keyboard navigation exercise with progress saved">',
        'html',
      ],
      ['image-loading', 'loading="lazy" decoding="async"', 'html'],
    ]
  ),
  milestone(
    'Media',
    'Add an accessible product demonstration',
    'Provide native controls captions and a linked transcript for the demonstration video.',
    'accessible-media-equivalents',
    'Reviewed captions and a transcript provide equivalent access and support noisy quiet and low-bandwidth contexts.',
    'Machine captions can be published without review because demonstration speech is predictable.',
    ['captions', 'transcript', 'controls'],
    [
      [
        'video',
        '<video class="product-demo" controls preload="metadata" aria-describedby="demo-transcript">',
        'html',
      ],
      [
        'captions',
        '<track kind="captions" src="/media/open-practice-demo.en.vtt" srclang="en" label="English" default>',
        'html',
      ],
      [
        'transcript',
        '<a id="demo-transcript" href="/transcripts/open-practice-demo">Read the reviewed product demonstration transcript</a>',
        'html',
      ],
    ]
  ),
  milestone(
    'Form',
    'Give the interest form a truthful submission contract',
    'Set a real action method name and no-validation bypass.',
    'form-purpose-method',
    'A named form with explicit action and post method makes data destination and purpose inspectable.',
    'A button click handler is enough even when form action and method are absent.',
    ['action', 'method', 'purpose'],
    [
      [
        'form',
        '<form class="interest-form" action="/interest" method="post" aria-labelledby="interest-heading">',
        'html',
      ],
      [
        'form-name',
        '<input type="hidden" name="form-purpose" value="open-practice-interest">',
        'html',
      ],
    ]
  ),
  milestone(
    'Form',
    'Label and explain the email field',
    'Connect label hint required state autocomplete and error destination.',
    'form-labels-instructions',
    'Persistent labels and programmatic descriptions preserve purpose and requirements before and after typing.',
    'Email placeholder text is a sufficient label because browsers validate the type.',
    ['label', 'description', 'autocomplete'],
    [
      ['email-label', '<label for="interest-email">Email address</label>', 'html'],
      [
        'email-input',
        '<input id="interest-email" name="email" type="email" autocomplete="email" required aria-describedby="email-hint email-error">',
        'html',
      ],
      [
        'email-hint',
        '<p id="email-hint">Used only for launch updates; unsubscribe with any message.</p>',
        'html',
      ],
      [
        'email-error',
        '<p id="email-error" class="field-error">Enter an address in the format name@example.org.</p>',
        'html',
      ],
    ]
  ),
  milestone(
    'Choices',
    'Group optional learning interests',
    'Use fieldset legend and independent checkbox labels.',
    'form-grouping-options',
    'Fieldset and legend supply shared context while checkboxes allow zero or multiple truthful selections.',
    'A heading above unrelated checkbox divs supplies the same programmatic group name.',
    ['fieldset', 'legend', 'checkbox'],
    [
      ['fieldset', '<fieldset><legend>Optional practice interests</legend>', 'html'],
      [
        'keyboard-choice',
        '<label><input type="checkbox" name="interest" value="keyboard"> Keyboard navigation</label>',
        'html',
      ],
      [
        'layout-choice',
        '<label><input type="checkbox" name="interest" value="layout"> Responsive layout</label>',
        'html',
      ],
    ]
  ),
  milestone(
    'Consent',
    'Request explicit unbundled update consent',
    'Add an unchecked consent control with direct purpose language.',
    'form-labels-instructions',
    'Unchecked specific consent avoids dark patterns and separates optional updates from product access.',
    'Prechecking updates reduces friction without affecting meaningful consent.',
    ['consent', 'optional', 'unchecked'],
    [
      [
        'consent',
        '<label><input type="checkbox" name="updates" value="yes"> Email me occasional Open Practice Lab launch updates</label>',
        'html',
      ],
      [
        'privacy-link',
        '<a href="/privacy/open-practice-interest">Read how interest-form data is stored and deleted</a>',
        'html',
      ],
    ]
  ),
  milestone(
    'Validation',
    'Keep native validation and understandable errors',
    'Style valid and invalid states with text borders and focus while preserving browser behavior.',
    'form-native-validation',
    'Native constraints provide baseline behavior while explicit messages and multi-cue styling explain recovery.',
    'A red border alone gives every user enough error cause and repair information.',
    ['native', 'error', 'recovery'],
    [
      [
        'invalid-style',
        '.interest-form input:user-invalid {\n  border-inline-start: 0.4rem solid #b91c1c;\n}',
        'css',
      ],
      [
        'error-display',
        '.interest-form input:user-invalid ~ .field-error {\n  display: block;\n}',
        'css',
      ],
      [
        'valid-style',
        '.interest-form input:user-valid {\n  border-inline-start: 0.4rem double #166534;\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Base',
    'Build a complete narrow-first launch',
    'Use intrinsic width flexible spacing readable measure and block flow before queries.',
    'responsive-mobile-first',
    'The base must expose value evidence demonstration limits and form tasks at narrow size and zoom.',
    'Mobile-first pages may hide evidence and limits until a wider layout restores them.',
    ['base', 'intrinsic', 'flow'],
    [
      ['box-sizing', '*, *::before, *::after {\n  box-sizing: border-box;\n}', 'css'],
      [
        'launch-width',
        '.launch-shell {\n  inline-size: min(100% - 2rem, 76rem);\n  margin-inline: auto;\n}',
        'css',
      ],
      [
        'launch-flow',
        '.launch-flow > * + * {\n  margin-block-start: clamp(1rem, 4vw, 3rem);\n}',
        'css',
      ],
      [
        'image-fluid',
        '.launch-shell :is(img, video) {\n  display: block;\n  max-inline-size: 100%;\n  block-size: auto;\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Breakpoint',
    'Add one evidence-backed wide enhancement',
    'Create hero columns only after media and honest claim content fit side by side.',
    'responsive-content-breakpoints',
    'The threshold belongs to observed content fit and keeps each column shrinkable.',
    'A standard desktop breakpoint is sufficient evidence for the hero layout.',
    ['breakpoint', 'content', 'boundary'],
    [
      [
        'breakpoint-note',
        '/* At 60rem the complete claim and demonstration image fit side by side without compression. */',
        'css',
      ],
      [
        'hero-grid',
        '@media (width >= 60rem) {\n  .launch-hero {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) minmax(18rem, 1fr);\n    gap: 2rem;\n    align-items: center;\n  }\n}',
        'css',
      ],
      [
        'boundary-note',
        '/* Retest 59.99rem, 60rem, and 60.01rem with 200% zoom and translated copy. */',
        'css',
      ],
    ]
  ),
  milestone(
    'Features',
    'Lay out benefits from content rather than device counts',
    'Use auto-fit and a narrow-safe minimum for the evidence cards.',
    'grid-auto-fit-fill',
    'Auto-fit collapses empty tracks and lets occupied evidence cards use available local space.',
    'A fixed three-column grid is responsive when the page has three benefits.',
    ['auto-fit', 'minmax', 'content'],
    [
      [
        'feature-grid',
        '.evidence-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));\n  gap: 1rem;\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Media',
    'Preserve demonstration ratio and controls',
    'Give video a flexible size and stable ratio without clipping controls.',
    'responsive-embedded-media',
    'Flexible inline size plus aspect ratio preserves composition while native controls remain reachable.',
    'Overflow hidden is necessary around videos so wide controls never change layout.',
    ['ratio', 'controls', 'overflow'],
    [
      [
        'video-ratio',
        '.product-demo {\n  inline-size: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: contain;\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Contrast',
    'Create durable text action and evidence contrast',
    'Use readable tokens under default dark and forced-color conditions.',
    'css-color-contrast',
    'Contrast must be evaluated for normal text large text controls focus and meaningful boundaries in every state.',
    'A single high-contrast hero heading proves the full launch palette is accessible.',
    ['contrast', 'state', 'boundary'],
    [
      [
        'color-tokens',
        ':root {\n  --launch-text: #0f172a;\n  --launch-surface: #f8fafc;\n  --launch-action: #075985;\n  --launch-focus: #b45309;\n}',
        'css',
      ],
      [
        'launch-colors',
        '.launch-shell {\n  color: var(--launch-text);\n  background: var(--launch-surface);\n}',
        'css',
      ],
      [
        'action-colors',
        '.launch-action {\n  color: #ffffff;\n  background: var(--launch-action);\n}',
        'css',
      ],
      [
        'forced-colors',
        '@media (forced-colors: active) {\n  .launch-action, .evidence-card {\n    border: 2px solid CanvasText;\n  }\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Focus',
    'Protect visible focus on every action and field',
    'Add focus-visible boundaries that survive launch colors and card overflow.',
    'css-form-focus',
    'A strong outline and offset preserve location without relying on hover or field fill color.',
    'Buttons and inputs do not need custom focus because their shape implies keyboard location.',
    ['focus-visible', 'outline', 'location'],
    [
      [
        'focus-style',
        '.launch-shell :is(a, button, input):focus-visible {\n  outline: 0.2rem solid var(--launch-focus);\n  outline-offset: 0.2rem;\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'States',
    'Keep autofill and motion preference states readable',
    'Style completed fields without hiding user data and remove nonessential transitions on request.',
    'css-form-autofill-motion',
    'Autofilled text must remain readable and reduced-motion preferences should remove nonessential animated feedback.',
    'Browser autofill can be covered with a matching background because users already know the stored value.',
    ['autofill', 'motion', 'readable'],
    [
      [
        'autofill-style',
        '.interest-form input:autofill {\n  -webkit-text-fill-color: #0f172a;\n  caret-color: #0f172a;\n}',
        'css',
      ],
      [
        'motion-preference',
        '@media (prefers-reduced-motion: reduce) {\n  .launch-shell *,\n  .launch-shell *::before,\n  .launch-shell *::after {\n    scroll-behavior: auto;\n    transition-duration: 0.01ms;\n  }\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Action',
    'Use calm specific calls to action',
    'Name exactly what the interest form does and remove scarcity language.',
    'design-user-goals',
    'Specific optional action text supports informed choice without implying false urgency or guaranteed benefit.',
    'A countdown and only a few spots claim is acceptable when it improves nonprofit signups.',
    ['specific', 'optional', 'honest'],
    [
      [
        'primary-action',
        '<button class="launch-action" type="submit">Request optional launch updates</button>',
        'html',
      ],
      [
        'no-urgency',
        '<p>You can use the free practice library now; joining the update list is optional.</p>',
        'html',
      ],
    ]
  ),
  milestone(
    'Error',
    'Publish a form recovery summary',
    'Add an assertive summary target with links back to invalid fields.',
    'css-form-errors',
    'An error summary plus field-level text supports efficient recovery without replacing native focus and validation.',
    'Moving focus to a red banner is enough even if it does not identify fields.',
    ['summary', 'field', 'recovery'],
    [
      [
        'error-summary',
        '<div class="error-summary" role="alert" tabindex="-1"><h2>Check the interest form</h2><a href="#interest-email">Enter a valid email address</a></div>',
        'html',
      ],
    ]
  ),
  milestone(
    'Print',
    'Create a useful noninteractive launch handout',
    'Remove form and video controls while keeping claims evidence limits and transcript destination.',
    'responsive-test-matrix',
    'Print rules adapt tasks to a static medium instead of producing clipped controls and hidden evidence.',
    'A print stylesheet should preserve every interactive control because the paper copy mirrors the screen.',
    ['print', 'evidence', 'transcript'],
    [
      [
        'print-rules',
        '@media print {\n  .interest-form, .product-demo {\n    display: none;\n  }\n  .launch-shell {\n    color: #000000;\n    background: #ffffff;\n  }\n  .evidence-card {\n    break-inside: avoid;\n  }\n}',
        'css',
      ],
      [
        'print-transcript',
        '@media print {\n  #demo-transcript::after {\n    content: " (" attr(href) ")";\n  }\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Debug',
    'Record one bounded launch defect repair',
    'Document reproduction hypothesis computed evidence fix and regression result.',
    'css-debug-method',
    'A falsifiable record distinguishes root-cause repair from a screenshot-only patch.',
    'Adding overflow hidden is a complete debugging record when the page stops scrolling sideways.',
    ['hypothesis', 'computed', 'regression'],
    [
      [
        'debug-record',
        '/* Defect: translated evidence card overflows at 200% zoom. Hypothesis: auto minimum blocks shrink. Evidence: computed min-content track exceeds container. Repair: minmax(min(100%, 16rem), 1fr). */',
        'css',
      ],
    ]
  ),
  milestone(
    'Evidence',
    'Publish the ethical launch verification matrix',
    'Record claims media form content responsive keyboard preference and performance outcomes.',
    'responsive-test-matrix',
    'A launch matrix verifies user tasks and ethical constraints across changed content and environments.',
    'Conversion rate alone proves the page is responsive accessible and ethically complete.',
    ['matrix', 'claims', 'outcomes'],
    [
      ['matrix-section', '<section aria-labelledby="launch-evidence-heading">', 'html'],
      [
        'matrix-heading',
        '<h2 id="launch-evidence-heading">Ethical launch verification record</h2>',
        'html',
      ],
      [
        'matrix-list',
        '<ul><li>Every claim includes source, denominator, date, method, and limitation.</li><li>Responsive image currentSrc, video captions, transcript, zoom, and long content pass.</li><li>Keyboard, touch, autofill, validation, reduced motion, forced colors, and print preserve tasks.</li></ul>',
        'html',
      ],
    ]
  ),
  milestone(
    'Handoff',
    'Publish the no-dark-pattern decision record',
    'Document prohibited claims consent patterns and urgency devices for future editors.',
    'design-user-goals',
    'A written editorial constraint keeps ethical intent durable when campaigns and contributors change.',
    'Ethical limits belong only in team memory because publishing them in source adds noise.',
    ['claims', 'consent', 'urgency'],
    [
      [
        'ethics-record',
        '<!-- Editorial contract: no fabricated scarcity, countdowns, guaranteed outcomes, prechecked consent, disguised ads, or hidden costs. Retest all evidence and form claims after edits. -->',
        'html',
      ],
    ]
  ),
];

const result = await generateRwdProject({
  courseId: 'responsive-web-design',
  moduleId: 'ethical-product-launch-project',
  moduleTitle: 'Certification Project: Ethical Product Launch',
  moduleDescription:
    'Build an honest nonprofit learning-product launch with bounded claims, accessible evidence and media, explicit consent, resilient forms, content-driven responsive layout, durable states, and a reproducible ethical review matrix.',
  moduleObjectives: [
    'Communicate audience value, evidence, limitations, cost, consent, and next actions without manipulative urgency or unsupported outcomes.',
    'Deliver responsive images and demonstration media with captions, transcript, correct candidates, intrinsic dimensions, and ratio behavior.',
    'Build a labeled native interest form with explicit data purpose, optional consent, understandable validation, autofill, and recovery states.',
    'Verify contrast, keyboard, zoom, long content, breakpoints, reduced motion, forced colors, print, and bounded claims.',
  ],
  order: 26,
  prerequisiteModuleId: 'two-dimensional-grid-layout-debugging',
  priorLastActivityId: 'mapped-quiz-css-grid',
  insertAfterModuleId: 'two-dimensional-grid-layout-debugging',
  courseEstimatedHours: 3180,
  activityId: 'mapped-lab-product-landing-page',
  activityTitle: 'Certification Project: Open Practice Lab Ethical Launch',
  shortTitle: 'ethical launch',
  summary:
    'Deliver an original nonprofit product launch whose value proposition, evidence, limitations, demonstration media, interest form, consent, responsive system, and verification record help adult learners make an informed choice without pressure.',
  activityObjectives: [
    'Write a truthful value proposition and bounded pilot evidence with no fabricated scarcity or guaranteed outcomes.',
    'Build accessible responsive imagery, reviewed captions, a transcript, and a low-friction interest form.',
    'Implement content-driven layout, contrast, focus, validation, autofill, motion-preference, forced-color, and print behavior.',
    'Publish ethical editorial constraints and a multivariable verification matrix.',
  ],
  context: 'a nonprofit launch for a free adult-learning practice tool',
  artifactId: 'ethical-learning-product-launch',
  coverage: [
    'html-document-boilerplate',
    'keyboard-focus',
    'semantic-landmarks',
    'design-user-goals',
    'design-information-hierarchy',
    'responsive-images',
    'accessible-media-equivalents',
    'responsive-embedded-media',
    'form-purpose-method',
    'form-labels-instructions',
    'form-grouping-options',
    'form-native-validation',
    'responsive-mobile-first',
    'responsive-content-breakpoints',
    'grid-auto-fit-fill',
    'css-color-contrast',
    'css-form-focus',
    'css-form-errors',
    'css-form-autofill-motion',
    'css-debug-method',
    'responsive-test-matrix',
  ],
  estimatedMinutes: 600,
  starterFiles: {
    html: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n</body>\n</html>',
    css: '/* Build the Open Practice Lab ethical launch here. */',
    javascript: '',
  },
  supportPattern: ['predict', 'inspect', 'arrange', 'debug', 'answer', 'reflect', 'read'],
  codeFirstOn: [1, 4, 7, 10, 13, 16, 19, 22, 25],
  milestones,
});

console.log(
  `Generated Ethical Product Launch project: ${result.interactions} interactions, ${result.checks} checks.`
);
