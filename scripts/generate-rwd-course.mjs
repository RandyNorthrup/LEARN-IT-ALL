#!/usr/bin/env node

import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const courseId = 'responsive-web-design';
const courseDir = path.join(root, 'content', 'courses', courseId);

const selector = (id, description, value, hint) => ({
  id,
  type: 'selector-exists',
  description,
  selector: value,
  hint,
});
const text = (id, description, target, expected, hint) => ({
  id,
  type: 'text-includes',
  description,
  selector: target,
  expected,
  hint,
});
const attribute = (id, description, target, name, expected, hint) => ({
  id,
  type: 'attribute-equals',
  description,
  selector: target,
  attribute: name,
  expected,
  hint,
});
const css = (id, description, target, property, expected, hint) => ({
  id,
  type: 'css-property',
  description,
  selector: target,
  property,
  expected,
  hint,
});
const source = (id, description, file, expected, hint) => ({
  id,
  type: 'source-includes',
  description,
  source: file,
  expected,
  hint,
});

const lessons = [
  {
    slug: 'computer-browser-tooling',
    title: 'How Browsers Turn Files into Pages',
    chapter: 1,
    type: 'workshop',
    objective:
      'Trace a request from URL to rendered document and use developer tools to inspect it.',
    concepts: [
      'URLs identify resources while HTTP moves representations',
      'HTML supplies structure, CSS supplies presentation, and browser developer tools expose the result',
      'file names, folders, and relative paths determine whether assets resolve',
    ],
    build:
      'Build a browser field guide with a useful heading, navigation, and a DevTools reminder.',
    html: '<main>\n  <!-- Add a heading and navigation here -->\n</main>',
    css: 'body {\n  font-family: system-ui, sans-serif;\n}\n',
    requirements: [
      selector('main', 'Use one main landmark', 'main', 'Wrap primary content in main.'),
      text('heading', 'Name the guide', 'h1', 'Browser Field Guide', 'Add an h1 with this title.'),
      attribute(
        'nav-label',
        'Label the navigation',
        'nav',
        'aria-label',
        'Field guide',
        'Use aria-label="Field guide".'
      ),
      selector(
        'devtools-tip',
        'Include a DevTools tip',
        'aside',
        'Use an aside for supporting information.'
      ),
    ],
    check: [
      'Which browser tool shows computed CSS?',
      ['Elements inspector', 'Network cable', 'URL bar', 'File manager'],
      0,
      'The Elements inspector exposes matched and computed styles.',
    ],
  },
  {
    slug: 'html-document-structure',
    title: 'Build a Valid HTML Document',
    chapter: 1,
    type: 'workshop',
    objective: 'Use HTML boilerplate, metadata, headings, paragraphs, lists, and links correctly.',
    concepts: [
      'doctype selects standards mode',
      'lang, charset, viewport, and title provide language, encoding, responsive sizing, and identity',
      'heading levels describe outline rather than visual size',
    ],
    build: 'Create a complete learning roadmap document with metadata and a short ordered list.',
    html: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <!-- Add viewport and title -->\n</head>\n<body>\n</body>\n</html>',
    css: 'body {\n  max-width: 60rem;\n  margin: 0 auto;\n}\n',
    requirements: [
      source(
        'doctype',
        'Declare standards mode',
        'html',
        '<!doctype html>',
        'Put the doctype first.'
      ),
      source(
        'viewport',
        'Add responsive viewport metadata',
        'html',
        'name="viewport"',
        'Use a viewport meta element.'
      ),
      text('title', 'Give the page a visible title', 'h1', 'Learning Roadmap', 'Add an h1.'),
      selector(
        'ordered-list',
        'Use an ordered learning sequence',
        'ol > li',
        'Add at least one li inside ol.'
      ),
    ],
    check: [
      'Why add the viewport meta element?',
      ['Match layout width to device width', 'Download CSS', 'Create a heading', 'Validate links'],
      0,
      'Viewport metadata prevents mobile browsers from using a wide virtual canvas.',
    ],
  },
  {
    slug: 'links-images-media',
    title: 'Connect Pages, Images, Audio, and Video',
    chapter: 1,
    type: 'lab',
    objective: 'Choose accessible links and media elements with resilient fallback content.',
    concepts: [
      'links need meaningful accessible names',
      'images need purpose-appropriate alt text and explicit dimensions reduce layout shift',
      'audio, video, picture, source, track, SVG, and iframe solve different media jobs',
    ],
    build: 'Create a small media gallery with an image, caption, and playable video.',
    html: '<main>\n  <h1>Field Notes</h1>\n  <!-- Build the media figure and video -->\n</main>',
    css: 'img, video {\n  max-width: 100%;\n}\n',
    requirements: [
      selector(
        'figure',
        'Group media and caption in a figure',
        'figure > figcaption',
        'Nest figcaption in figure.'
      ),
      attribute(
        'image-alt',
        'Describe the image',
        'img',
        'alt',
        'Mountain trail at sunrise',
        'Use useful alt text.'
      ),
      selector(
        'video',
        'Add a video with controls',
        'video[controls]',
        'The controls attribute enables playback UI.'
      ),
      selector(
        'captions',
        'Provide a caption track',
        'video track[kind="captions"]',
        'Use track kind="captions".'
      ),
    ],
    check: [
      'When should an image use empty alt text?',
      ['When purely decorative', 'When it is important', 'When it is linked', 'Always'],
      0,
      'Decorative images use alt="" so assistive technology can skip them.',
    ],
  },
  {
    slug: 'semantic-landmarks',
    title: 'Shape Meaning with Semantic HTML',
    chapter: 2,
    type: 'workshop',
    objective: 'Select landmarks and content elements based on meaning, not appearance.',
    concepts: [
      'header, nav, main, aside, and footer create navigable landmarks',
      'article and section group content for different reuse and outline needs',
      'time, address, blockquote, code, strong, and em express specific semantics',
    ],
    build: 'Build a blog article whose landmarks and time metadata remain useful without CSS.',
    html: '<header>\n  <h1>Signal Journal</h1>\n</header>\n<!-- Add main article and footer -->',
    css: 'body {\n  line-height: 1.6;\n}\n',
    requirements: [
      selector('article', 'Use an article for the post', 'main article', 'Nest article in main.'),
      attribute(
        'time',
        'Provide machine-readable date',
        'time',
        'datetime',
        '2026-07-13',
        'Add datetime to time.'
      ),
      selector('footer', 'Add document footer', 'body > footer', 'Use a footer after main.'),
      text(
        'quote',
        'Include the key quotation',
        'blockquote',
        'Build for people',
        'Use blockquote for the quotation.'
      ),
    ],
    check: [
      'Which element represents self-contained reusable content?',
      ['article', 'div', 'span', 'b'],
      0,
      'An article should make sense independently or in another context.',
    ],
  },
  {
    slug: 'forms-and-tables',
    title: 'Collect and Present Structured Data',
    chapter: 2,
    type: 'workshop',
    objective: 'Build usable forms and data tables with explicit relationships.',
    concepts: [
      'labels, names, values, types, autocomplete, and validation constraints define a form control contract',
      'fieldset and legend group related controls',
      'caption, thead, tbody, th scope, and tfoot make table relationships understandable',
    ],
    build: 'Create a workshop signup form beside a compact schedule table.',
    html: '<main>\n  <h1>Workshop Signup</h1>\n  <form>\n    <!-- Add labeled email control and fieldset -->\n  </form>\n</main>',
    css: 'form {\n  display: grid;\n  gap: 1rem;\n}\n',
    requirements: [
      attribute(
        'email',
        'Connect email label and control',
        'input[type="email"]',
        'id',
        'email',
        'Give input id="email" and label for="email".'
      ),
      selector(
        'fieldset',
        'Group attendance choices',
        'fieldset > legend',
        'Use fieldset and legend.'
      ),
      selector(
        'caption',
        'Name the schedule table',
        'table > caption',
        'Add a caption as first table child.'
      ),
      attribute('scope', 'Identify column headers', 'th', 'scope', 'col', 'Use scope="col".'),
    ],
    check: [
      'What connects a label to a form control?',
      ['Matching for and id values', 'Matching class values', 'Table scope', 'Placeholder text'],
      0,
      'A label for value matches its control id.',
    ],
  },
  {
    slug: 'survey-form-project',
    title: 'Certification Project: Research Survey',
    chapter: 2,
    type: 'project',
    objective:
      'Combine semantic forms, validation, and inclusive instructions in an independent build.',
    concepts: [
      'good surveys announce purpose and required fields',
      'radio buttons share a name while each has a distinct value',
      'error prevention starts with suitable input types and constraints',
    ],
    build: 'Build a complete learner research survey without step-by-step markup instructions.',
    html: '<main>\n  <h1>Learner Research Survey</h1>\n  <p id="description">Help us improve practice sessions.</p>\n  <form id="survey-form">\n  </form>\n</main>',
    css: 'body {\n  font-family: system-ui, sans-serif;\n}\n',
    requirements: [
      selector(
        'name',
        'Collect a required name',
        '#survey-form input[name="name"][required]',
        'Add a required name input.'
      ),
      selector(
        'email',
        'Collect a valid required email',
        '#survey-form input[type="email"][required]',
        'Use type email and required.'
      ),
      selector(
        'radios',
        'Add experience choices',
        '#survey-form input[type="radio"][name="experience"]',
        'Radio choices need shared name.'
      ),
      selector(
        'submit',
        'Provide a submit action',
        '#survey-form button[type="submit"]',
        'Use a submit button.'
      ),
    ],
    check: [
      'Why must radio controls in one question share a name?',
      [
        'So only one choice is selected and submitted as one field',
        'For CSS color',
        'To create labels',
        'To sort controls',
      ],
      0,
      'Shared names create one mutually exclusive form field.',
    ],
  },
  {
    slug: 'html-accessibility',
    title: 'Accessibility as Core HTML',
    chapter: 3,
    type: 'lab',
    objective: 'Use native semantics first and ARIA only to fill real semantic gaps.',
    concepts: [
      'keyboard access, visible focus, logical source order, names, roles, and states form an interaction baseline',
      'native elements usually outperform custom ARIA replicas',
      'ARIA labels, live regions, and descriptions must reflect visible purpose and current state',
    ],
    build:
      'Repair an inaccessible event card using native buttons, headings, labels, and a status region.',
    html: '<div class="event-card">\n  <div class="title">Inclusive Web Meetup</div>\n  <div class="action">Reserve seat</div>\n  <div class="message"></div>\n</div>',
    css: '.event-card {\n  padding: 1rem;\n}\n',
    requirements: [
      text(
        'heading',
        'Create a real heading',
        'h2',
        'Inclusive Web Meetup',
        'Replace visual-only title div with h2.'
      ),
      text(
        'button',
        'Use a native action button',
        'button',
        'Reserve seat',
        'Replace action div with button.'
      ),
      attribute(
        'status',
        'Announce booking status',
        '.message',
        'role',
        'status',
        'Use role="status" for async feedback.'
      ),
      source(
        'focus',
        'Add visible keyboard focus style',
        'css',
        ':focus-visible',
        'Create a :focus-visible rule.'
      ),
    ],
    check: [
      'What is the first rule of ARIA?',
      [
        'Prefer native HTML when it provides needed semantics',
        'Add role to every div',
        'Hide focus outlines',
        'Use aria-label on all text',
      ],
      0,
      'Native controls include behavior, focus, and semantics by default.',
    ],
  },
  {
    slug: 'html-review-debugging',
    title: 'HTML Review: Debug the Document',
    chapter: 3,
    type: 'lab',
    objective:
      'Diagnose invalid nesting, missing names, broken paths, and document outline problems.',
    concepts: [
      'validation catches syntax while manual keyboard and screen reader checks catch experience failures',
      'DOM inspection shows browser error recovery, not necessarily authored structure',
      'small reproducible cases make markup bugs easier to isolate',
    ],
    build: 'Debug a product card until structure, link purpose, and image alternative pass.',
    html: '<main>\n  <h1>Gear</h1>\n  <div class="product">\n    <img src="/rocket.png">\n    <a href="/courses">Click here</a>\n  </div>\n</main>',
    css: '.product {\n  border: 1px solid #ccd4e0;\n}\n',
    requirements: [
      attribute(
        'alt',
        'Give product image useful alternative text',
        '.product img',
        'alt',
        'Learning rocket',
        'Add alt="Learning rocket".'
      ),
      text(
        'link',
        'Make link purpose clear',
        '.product a',
        'Explore courses',
        'Replace Click here.'
      ),
      selector(
        'heading',
        'Name the product with a heading',
        '.product h2',
        'Add an h2 inside product.'
      ),
      selector(
        'article',
        'Use self-contained product markup',
        'article.product',
        'Change div.product to article.product.'
      ),
    ],
    check: [
      'Why can DOM inspection differ from source HTML?',
      [
        'Browsers repair malformed markup while parsing',
        'CSS deletes source',
        'HTTP renames tags',
        'ARIA rewrites files',
      ],
      0,
      'HTML parsing includes defined error recovery.',
    ],
  },
  {
    slug: 'css-foundations',
    title: 'CSS Foundations and the Cascade',
    chapter: 4,
    type: 'workshop',
    objective: 'Write valid rules and predict cascade, specificity, inheritance, and source order.',
    concepts: [
      'selectors choose elements while declarations pair properties with values',
      'origin, importance, cascade layers, specificity, scope proximity, and source order resolve conflicts',
      'inheritance and initial values differ by property',
    ],
    build: 'Style a reading card using low-specificity reusable selectors.',
    html: '<article class="reading-card">\n  <h1>CSS Without Guessing</h1>\n  <p>Predict the cascade before opening DevTools.</p>\n</article>',
    css: '/* Add card, heading, and paragraph rules */',
    requirements: [
      css(
        'card-bg',
        'Give card a white surface',
        '.reading-card',
        'background',
        'white',
        'Set background: white.'
      ),
      css(
        'card-pad',
        'Add breathing room',
        '.reading-card',
        'padding',
        '2rem',
        'Set padding: 2rem.'
      ),
      css(
        'heading-color',
        'Use readable heading color',
        '.reading-card h1',
        'color',
        '#172033',
        'Set exact heading color.'
      ),
      source(
        'layer',
        'Organize component rules in a cascade layer',
        'css',
        '@layer components',
        'Wrap rules in @layer components.'
      ),
    ],
    check: [
      'After origin and importance, what wins cascade conflicts next?',
      ['Cascade layer order', 'Alphabetical class name', 'HTML depth', 'File size'],
      0,
      'Cascade layers are considered before specificity.',
    ],
  },
  {
    slug: 'design-fundamentals',
    title: 'Design for Real Users',
    chapter: 4,
    type: 'lab',
    objective:
      'Apply hierarchy, spacing, contrast, consistency, feedback, and user-centered iteration.',
    concepts: [
      'visual hierarchy guides attention with size, weight, space, contrast, and position',
      'design tokens create consistent decisions rather than repeated magic values',
      'user flows, wireframes, prototypes, and usability tests answer different questions',
    ],
    build: 'Turn a flat settings panel into a clear hierarchy with reusable tokens.',
    html: '<section class="settings">\n  <h1>Notification settings</h1>\n  <p>Choose how updates reach you.</p>\n  <button type="button">Save preferences</button>\n</section>',
    css: ':root {\n  /* Add design tokens */\n}\n.settings {\n}\n',
    requirements: [
      source(
        'space-token',
        'Create a spacing token',
        'css',
        '--space-lg:',
        'Define --space-lg in :root.'
      ),
      css(
        'measure',
        'Limit line length',
        '.settings',
        'max-width',
        '40rem',
        'Set max-width: 40rem.'
      ),
      css(
        'spacing',
        'Apply consistent panel spacing',
        '.settings',
        'padding',
        'var(--space-lg)',
        'Use token for padding.'
      ),
      css(
        'button',
        'Make action visually distinct',
        '.settings button',
        'font-weight',
        '700',
        'Set font-weight: 700.'
      ),
    ],
    check: [
      'What should a usability test primarily observe?',
      [
        'Whether users can complete realistic tasks',
        'Whether designer likes colors',
        'CSS file size only',
        'Number of div elements',
      ],
      0,
      'Usability testing observes task completion and friction.',
    ],
  },
  {
    slug: 'css-units-sizing',
    title: 'Size Interfaces with Intent',
    chapter: 4,
    type: 'lab',
    objective: 'Choose absolute, font-relative, viewport, container, and percentage units safely.',
    concepts: [
      'rem supports global type scaling while em responds to local context',
      'percentages depend on containing blocks and viewport units need small/dynamic variants on mobile',
      'min, max, clamp, minmax, aspect-ratio, and logical properties create resilient bounds',
    ],
    build: 'Create a fluid hero whose type and spacing adapt without breakpoint jumps.',
    html: '<header class="hero">\n  <h1>Learn by building</h1>\n  <p>Practice on every screen.</p>\n</header>',
    css: '.hero {\n}\n.hero h1 {\n}\n',
    requirements: [
      css(
        'width',
        'Use a readable fluid width',
        '.hero',
        'width',
        'min(90%, 70rem)',
        'Use width: min(90%, 70rem).'
      ),
      css(
        'padding',
        'Use fluid padding',
        '.hero',
        'padding',
        'clamp(1rem,5vw,4rem)',
        'Use clamp(1rem, 5vw, 4rem).'
      ),
      css(
        'type',
        'Use fluid heading size',
        '.hero h1',
        'font-size',
        'clamp(2rem,7vw,5rem)',
        'Use clamp for font-size.'
      ),
      css('margin', 'Center the hero', '.hero', 'margin', '0 auto', 'Set margin: 0 auto.'),
    ],
    check: [
      'Which unit follows root font size?',
      ['rem', 'vw', 'px', '%'],
      0,
      'rem resolves against root element font size.',
    ],
  },
  {
    slug: 'css-colors',
    title: 'Color, Contrast, and Themes',
    chapter: 4,
    type: 'workshop',
    objective: 'Use modern color syntax, accessible contrast, and theme-aware system colors.',
    concepts: [
      'hex, rgb, hsl, hwb, lab, lch, oklab, and oklch express color differently',
      'contrast must be checked for text, controls, focus indicators, and states',
      'currentColor, color-mix, light-dark, and custom properties reduce theme duplication',
    ],
    build: 'Build a status banner using OKLCH tokens and a visible focus color.',
    html: '<section class="status">\n  <h1>Deployment ready</h1>\n  <a href="#details">View checks</a>\n</section>',
    css: ':root {\n}\n.status {\n}\n',
    requirements: [
      source(
        'token',
        'Define semantic success color',
        'css',
        '--color-success:',
        'Add a success token.'
      ),
      css(
        'surface',
        'Apply status background token',
        '.status',
        'background',
        'var(--color-success)',
        'Use the token.'
      ),
      css('text', 'Keep status text readable', '.status', 'color', 'white', 'Set color: white.'),
      source(
        'focus',
        'Create high-visibility focus style',
        'css',
        ':focus-visible',
        'Add focus-visible styling.'
      ),
    ],
    check: [
      'Why is color alone insufficient for status?',
      [
        'Some users cannot distinguish the colors',
        'CSS forbids colors',
        'Screens show grayscale only',
        'Color prevents links',
      ],
      0,
      'Pair color with text, icons, shape, or position.',
    ],
  },
  {
    slug: 'pseudo-classes-elements',
    title: 'State and Generated Details',
    chapter: 5,
    type: 'workshop',
    objective: 'Use pseudo-classes for state and pseudo-elements for nonessential decoration.',
    concepts: [
      ':hover, :focus-visible, :checked, :disabled, :valid, and :invalid expose interaction state',
      ':is, :where, :not, and :has control matching and specificity',
      '::before, ::after, ::marker, ::selection, and ::first-letter target generated or partial boxes',
    ],
    build: 'Create a task list whose completed and keyboard-focused states remain obvious.',
    html: '<ul class="tasks">\n  <li><label><input type="checkbox"> Read cascade notes</label></li>\n  <li><label><input type="checkbox"> Build a component</label></li>\n</ul>',
    css: '.tasks {\n}\n',
    requirements: [
      source('checked', 'Style completed task state', 'css', 'input:checked', 'Use :checked.'),
      source('has', 'Style list item containing checked input', 'css', 'li:has(', 'Use :has().'),
      source('marker', 'Customize list marker', 'css', '::marker', 'Use ::marker.'),
      source(
        'focus',
        'Retain keyboard focus visibility',
        'css',
        ':focus-visible',
        'Use :focus-visible.'
      ),
    ],
    check: [
      'Which selector has zero specificity?',
      [':where()', ':is()', ':has()', ':not()'],
      0,
      ':where() always contributes zero specificity.',
    ],
  },
  {
    slug: 'styling-forms',
    title: 'Style Forms Without Breaking Them',
    chapter: 5,
    type: 'lab',
    objective: 'Create clear form layout, states, targets, errors, and native-control adaptations.',
    concepts: [
      'labels stay visible; placeholders are examples, not replacements',
      'accent-color, appearance, field-sizing, and color-scheme customize controls carefully',
      'invalid styles should appear after meaningful interaction when possible',
    ],
    build: 'Style a compact account form with clear focus and invalid states.',
    html: '<form class="account-form">\n  <label for="username">Username</label>\n  <input id="username" name="username" required>\n  <button type="submit">Create account</button>\n</form>',
    css: '.account-form {\n}\n.account-form input {\n}\n',
    requirements: [
      css(
        'layout',
        'Stack controls with grid',
        '.account-form',
        'display',
        'grid',
        'Set display: grid.'
      ),
      css('gap', 'Separate form elements', '.account-form', 'gap', '0.75rem', 'Set gap.'),
      source(
        'focus',
        'Style keyboard focus',
        'css',
        'input:focus-visible',
        'Add focus-visible rule.'
      ),
      source(
        'invalid',
        'Explain invalid state visually',
        'css',
        'input:user-invalid',
        'Use :user-invalid.'
      ),
    ],
    check: [
      'What should never replace a visible label?',
      ['Placeholder text', 'A legend', 'A heading', 'Help text'],
      0,
      'Placeholders disappear and are not reliable labels.',
    ],
  },
  {
    slug: 'box-model-effects',
    title: 'Box Model, Overflow, and Effects',
    chapter: 5,
    type: 'workshop',
    objective:
      'Predict used size and apply borders, backgrounds, shadows, filters, and overflow responsibly.',
    concepts: [
      'content-box and border-box change how declared sizes combine with padding and border',
      'margin collapse, intrinsic sizing, overflow, and scroll containers affect layout',
      'shadows, gradients, filters, opacity, and blend modes should support hierarchy without harming readability',
    ],
    build: 'Create a clipped profile card with predictable sizing and subtle depth.',
    html: '<article class="profile-card">\n  <img src="/rocket.png" alt="Learning rocket">\n  <h1>Build Pilot</h1>\n</article>',
    css: '.profile-card {\n}\n.profile-card img {\n}\n',
    requirements: [
      css(
        'sizing',
        'Use predictable box sizing',
        '.profile-card',
        'box-sizing',
        'border-box',
        'Set border-box.'
      ),
      css(
        'clip',
        'Clip content to rounded card',
        '.profile-card',
        'overflow',
        'hidden',
        'Set overflow: hidden.'
      ),
      css(
        'radius',
        'Round card corners',
        '.profile-card',
        'border-radius',
        '1rem',
        'Set border-radius.'
      ),
      css(
        'image',
        'Keep image responsive',
        '.profile-card img',
        'max-width',
        '100%',
        'Set max-width: 100%.'
      ),
    ],
    check: [
      'With border-box, declared width includes what?',
      ['Content, padding, and border', 'Margin only', 'Content only', 'Viewport'],
      0,
      'border-box includes padding and border inside declared dimensions.',
    ],
  },
  {
    slug: 'flexbox-layout',
    title: 'One-Dimensional Layout with Flexbox',
    chapter: 6,
    type: 'workshop',
    objective: 'Control main-axis and cross-axis alignment, flexibility, wrapping, and ordering.',
    concepts: [
      'flex container establishes main and cross axes based on writing mode and direction',
      'flex-basis, grow, shrink, min-size, and available space determine final sizes',
      'visual reordering must not contradict keyboard or reading order',
    ],
    build: 'Build a responsive pricing row that wraps naturally and gives each card fair space.',
    html: '<section class="plans">\n  <article class="plan">Starter</article>\n  <article class="plan">Builder</article>\n  <article class="plan">Team</article>\n</section>',
    css: '.plans {\n}\n.plan {\n}\n',
    requirements: [
      css('display', 'Create flex container', '.plans', 'display', 'flex', 'Set display: flex.'),
      css(
        'wrap',
        'Allow narrow screens to wrap',
        '.plans',
        'flex-wrap',
        'wrap',
        'Set flex-wrap: wrap.'
      ),
      css('gap', 'Use gap between cards', '.plans', 'gap', '1rem', 'Set gap: 1rem.'),
      css(
        'flex',
        'Give cards resilient basis',
        '.plan',
        'flex',
        '1 1 16rem',
        'Set flex: 1 1 16rem.'
      ),
    ],
    check: [
      'Which property allows flex items onto new lines?',
      ['flex-wrap', 'align-items', 'order', 'flex-direction'],
      0,
      'flex-wrap controls single versus multiple flex lines.',
    ],
  },
  {
    slug: 'playing-cards-project',
    title: 'Certification Project: Playing Card Layout',
    chapter: 6,
    type: 'project',
    objective:
      'Apply Flexbox, pseudo-elements, spacing, and accessible text in an independent composition.',
    concepts: [
      'small constrained components reveal alignment assumptions',
      'logical spacing works across writing directions',
      'decorative suit symbols should not replace accessible card names',
    ],
    build: 'Create a hand of three responsive playing cards using Flexbox.',
    html: '<main>\n  <h1>Practice Hand</h1>\n  <section class="hand" aria-label="Playing card hand">\n  </section>\n</main>',
    css: '.hand {\n}\n.card {\n}\n',
    requirements: [
      selector(
        'cards',
        'Create at least three cards',
        '.hand .card:nth-child(3)',
        'Add three .card elements.'
      ),
      css(
        'hand-flex',
        'Lay out hand with Flexbox',
        '.hand',
        'display',
        'flex',
        'Set display flex.'
      ),
      css('hand-wrap', 'Allow cards to wrap', '.hand', 'flex-wrap', 'wrap', 'Set flex-wrap.'),
      css(
        'card-ratio',
        'Keep card proportions',
        '.card',
        'aspect-ratio',
        '2 / 3',
        'Set aspect-ratio: 2 / 3.'
      ),
    ],
    check: [
      'Why should suit symbols have accessible context?',
      [
        'Visual glyphs may not announce a full card name',
        'Flexbox requires text',
        'CSS cannot style symbols',
        'ARIA hides all symbols',
      ],
      0,
      'Accessible names should communicate rank and suit.',
    ],
  },
  {
    slug: 'css-typography',
    title: 'Readable, Resilient Typography',
    chapter: 6,
    type: 'lab',
    objective: 'Choose font stacks and tune measure, rhythm, weight, spacing, and wrapping.',
    concepts: [
      'system and web font stacks need fallbacks and appropriate loading strategy',
      'line height, measure, paragraph spacing, and hierarchy drive readability',
      'font-display, variable fonts, text-wrap, hyphenation, and overflow-wrap handle performance and edge cases',
    ],
    build: 'Typeset a long-form article with fluid heading and readable measure.',
    html: '<article class="feature">\n  <h1>Practice Changes Understanding</h1>\n  <p>Reading introduces an idea. Building makes you test its edges, explain choices, and recover from mistakes.</p>\n</article>',
    css: '.feature {\n}\n.feature h1 {\n}\n.feature p {\n}\n',
    requirements: [
      css(
        'measure',
        'Limit article measure',
        '.feature',
        'max-width',
        '65ch',
        'Set max-width: 65ch.'
      ),
      css(
        'leading',
        'Use readable paragraph leading',
        '.feature p',
        'line-height',
        '1.7',
        'Set line-height: 1.7.'
      ),
      css(
        'balance',
        'Balance heading lines',
        '.feature h1',
        'text-wrap',
        'balance',
        'Set text-wrap: balance.'
      ),
      css(
        'fluid',
        'Scale heading fluidly',
        '.feature h1',
        'font-size',
        'clamp(2rem,6vw,4rem)',
        'Use clamp.'
      ),
    ],
    check: [
      'What does ch help control in typography?',
      ['Approximate line measure', 'Screen brightness', 'Font download', 'Color contrast'],
      0,
      'ch is useful for readable text widths.',
    ],
  },
  {
    slug: 'css-accessibility',
    title: 'Accessible CSS and User Preferences',
    chapter: 7,
    type: 'lab',
    objective: 'Preserve zoom, focus, contrast, target size, reading order, and user preferences.',
    concepts: [
      'CSS can create barriers through hidden focus, fixed text, clipped content, and reordered layouts',
      'prefers-reduced-motion, prefers-contrast, forced-colors, and color-scheme respect environment needs',
      'responsive reflow at zoom is an accessibility requirement, not polish',
    ],
    build:
      'Repair an animated call-to-action so focus and reduced-motion users receive equivalent feedback.',
    html: '<a class="cta" href="#start">Start building</a>',
    css: '.cta {\n  transition: transform 300ms ease;\n}\n.cta:hover {\n  transform: scale(1.08);\n}\n',
    requirements: [
      source(
        'focus',
        'Create visible focus style',
        'css',
        '.cta:focus-visible',
        'Add focus-visible rule.'
      ),
      source(
        'motion',
        'Respect reduced motion',
        'css',
        'prefers-reduced-motion: reduce',
        'Add reduced-motion query.'
      ),
      css(
        'target',
        'Provide usable target height',
        '.cta',
        'min-height',
        '44px',
        'Set min-height: 44px.'
      ),
      css(
        'display',
        'Make target dimensions apply',
        '.cta',
        'display',
        'inline-flex',
        'Set display: inline-flex.'
      ),
    ],
    check: [
      'What should reduced-motion mode remove first?',
      [
        'Nonessential movement and large transitions',
        'All content',
        'Focus indicators',
        'Form labels',
      ],
      0,
      'Preserve meaning while reducing vestibular triggers.',
    ],
  },
  {
    slug: 'positioning-layout',
    title: 'Normal Flow, Positioning, and Stacking',
    chapter: 7,
    type: 'workshop',
    objective:
      'Use flow, floats, positioned offsets, containing blocks, and stacking contexts predictably.',
    concepts: [
      'normal flow should solve most document layout before positioning',
      'relative, absolute, fixed, and sticky use different containing blocks and scroll behavior',
      'z-index works within stacking contexts rather than as one global number line',
    ],
    build: 'Create a sticky table-of-contents and anchored notification badge.',
    html: '<div class="docs">\n  <nav class="toc" aria-label="On this page">Topics</nav>\n  <main><button class="inbox" type="button">Inbox <span class="badge">3</span></button></main>\n</div>',
    css: '.toc {\n}\n.inbox {\n}\n.badge {\n}\n',
    requirements: [
      css(
        'sticky',
        'Keep contents visible while scrolling',
        '.toc',
        'position',
        'sticky',
        'Set position sticky.'
      ),
      css('offset', 'Anchor sticky navigation', '.toc', 'top', '1rem', 'Set top: 1rem.'),
      css(
        'anchor',
        'Create badge containing block',
        '.inbox',
        'position',
        'relative',
        'Set position relative.'
      ),
      css(
        'badge',
        'Position badge independently',
        '.badge',
        'position',
        'absolute',
        'Set position absolute.'
      ),
    ],
    check: [
      'Why can a huge z-index still appear underneath?',
      [
        'It is trapped in a lower stacking context',
        'z-index accepts only 1',
        'Positioning disables paint',
        'HTML order is ignored',
      ],
      0,
      'Stacking contexts compare as units.',
    ],
  },
  {
    slug: 'attribute-selectors',
    title: 'Target Meaningful Attributes',
    chapter: 7,
    type: 'lab',
    objective: 'Use attribute selectors without coupling styles to fragile content.',
    concepts: [
      'presence and exact-value selectors target semantic states and control types',
      'substring operators match prefixes, suffixes, and tokens with optional case flags',
      'data attributes can expose component state while ARIA state must remain truthful',
    ],
    build: 'Style file links and disclosure state from their attributes.',
    html: '<nav class="resources">\n  <a href="guide.pdf">Guide</a>\n  <a href="notes.html">Notes</a>\n  <button type="button" aria-expanded="false">Details</button>\n</nav>',
    css: '.resources {\n}\n',
    requirements: [
      source('pdf', 'Target PDF links', 'css', 'a[href$=".pdf"]', 'Use suffix attribute selector.'),
      source(
        'external',
        'Target secure external links',
        'css',
        'a[href^="https://"]',
        'Use prefix selector.'
      ),
      source(
        'state',
        'Target expanded disclosure state',
        'css',
        '[aria-expanded="true"]',
        'Use exact ARIA state selector.'
      ),
      source(
        'case',
        'Match file extension case-insensitively',
        'css',
        'i]',
        'Add case-insensitive flag.'
      ),
    ],
    check: [
      'Which operator matches an attribute suffix?',
      ['$=', '^=', '*=', '~='],
      0,
      '$= matches end of attribute value.',
    ],
  },
  {
    slug: 'book-inventory-project',
    title: 'Certification Project: Book Inventory',
    chapter: 7,
    type: 'project',
    objective:
      'Combine semantic tables, attribute selectors, status styling, and responsive overflow.',
    concepts: [
      'inventory data belongs in a table when row and column relationships matter',
      'data attributes can support filtering and styling without replacing visible status text',
      'wide tables need deliberate narrow-screen behavior',
    ],
    build: 'Build a filter-ready book inventory with at least three status states.',
    html: '<main>\n  <h1>Book Inventory</h1>\n  <div class="table-scroll">\n    <table>\n      <caption>Current collection</caption>\n    </table>\n  </div>\n</main>',
    css: '.table-scroll {\n}\n',
    requirements: [
      selector(
        'headers',
        'Create table column headers',
        'thead th[scope="col"]',
        'Use thead and scope col.'
      ),
      selector(
        'rows',
        'Add at least three inventory rows',
        'tbody tr:nth-child(3)',
        'Add three rows.'
      ),
      selector(
        'status',
        'Expose a status data attribute',
        'tbody tr[data-status]',
        'Add data-status to rows.'
      ),
      css(
        'overflow',
        'Keep table usable on narrow screens',
        '.table-scroll',
        'overflow-x',
        'auto',
        'Set overflow-x: auto.'
      ),
    ],
    check: [
      'Why keep visible status text with data-status?',
      [
        'Attributes alone are not visible content',
        'CSS cannot read attributes',
        'Tables forbid attributes',
        'It reduces rows',
      ],
      0,
      'Visible text communicates state to everyone.',
    ],
  },
  {
    slug: 'responsive-design',
    title: 'Responsive Design from Content Out',
    chapter: 8,
    type: 'workshop',
    objective:
      'Create fluid reflow with intrinsic sizing, media queries, container queries, and responsive media.',
    concepts: [
      'mobile-first enhancement starts with a robust narrow layout rather than device labels',
      'breakpoints should respond to content failure, not popular hardware',
      'media and container queries solve viewport-wide and component-local adaptations',
    ],
    build: 'Make a lesson dashboard shift from one column to sidebar layout when space permits.',
    html: '<div class="dashboard">\n  <aside>Progress</aside>\n  <main>Current lesson</main>\n</div>',
    css: '.dashboard {\n  display: grid;\n  gap: 1rem;\n}\n',
    requirements: [
      css(
        'base',
        'Start with one column',
        '.dashboard',
        'grid-template-columns',
        '1fr',
        'Set one base column.'
      ),
      source(
        'media',
        'Add content-driven breakpoint',
        'css',
        '@media (min-width: 48rem)',
        'Add media query.'
      ),
      source(
        'wide',
        'Create sidebar columns in breakpoint',
        'css',
        '18rem 1fr',
        'Use 18rem 1fr inside query.'
      ),
      source(
        'container',
        'Enable component query context',
        'css',
        'container-type: inline-size',
        'Add container-type.'
      ),
    ],
    check: [
      'When should a breakpoint be added?',
      [
        'When content needs a layout change',
        'For every phone model',
        'Every 100 pixels',
        'Only at 1920px',
      ],
      0,
      'Content-driven breakpoints age better than device lists.',
    ],
  },
  {
    slug: 'technical-docs-project',
    title: 'Certification Project: Technical Documentation',
    chapter: 8,
    type: 'project',
    objective: 'Build navigable, readable documentation with responsive sidebar behavior.',
    concepts: [
      'documentation needs stable landmarks, linkable headings, code formatting, and visible current context',
      'skip links and logical source order support keyboard navigation',
      'sticky sidebars must yield cleanly to narrow layouts and zoom',
    ],
    build:
      'Create a technical documentation page with five linked sections and responsive navigation.',
    html: '<a class="skip-link" href="#main-doc">Skip to content</a>\n<nav id="navbar" aria-label="Documentation">\n  <h1>CSS Field Manual</h1>\n</nav>\n<main id="main-doc"></main>',
    css: '#navbar {\n}\n#main-doc {\n}\n',
    requirements: [
      selector(
        'sections',
        'Create five documentation sections',
        '#main-doc .main-section:nth-child(5)',
        'Add five .main-section elements.'
      ),
      selector(
        'links',
        'Link navigation to sections',
        '#navbar a[href^="#"]',
        'Add fragment links.'
      ),
      css(
        'nav',
        'Keep wide-screen navigation visible',
        '#navbar',
        'position',
        'sticky',
        'Set position sticky.'
      ),
      source(
        'mobile',
        'Adapt navigation on narrow screens',
        'css',
        '@media (max-width: 48rem)',
        'Add narrow media query.'
      ),
    ],
    check: [
      'What makes a heading directly linkable?',
      ['A stable id used by a fragment URL', 'A CSS class only', 'Bold text', 'A table caption'],
      0,
      'Fragment identifiers target element ids.',
    ],
  },
  {
    slug: 'css-variables',
    title: 'Custom Properties and Theme Systems',
    chapter: 8,
    type: 'workshop',
    objective: 'Define, inherit, override, register, and compose custom properties.',
    concepts: [
      'custom properties participate in cascade and inherit by default',
      'var fallbacks handle missing values, not every invalid computed result',
      '@property can define syntax, inheritance, and initial values for safer animation',
    ],
    build: 'Create themeable callout components with local overrides and fallbacks.',
    html: '<aside class="callout">Default note</aside>\n<aside class="callout callout--warning">Warning note</aside>',
    css: ':root {\n}\n.callout {\n}\n.callout--warning {\n}\n',
    requirements: [
      source(
        'token',
        'Define callout color token',
        'css',
        '--callout-color:',
        'Define root token.'
      ),
      css(
        'apply',
        'Apply token to border',
        '.callout',
        'border-color',
        'var(--callout-color)',
        'Use var().'
      ),
      css(
        'override',
        'Override warning token locally',
        '.callout--warning',
        '--callout-color',
        '#b45309',
        'Set local custom property.'
      ),
      source(
        'property',
        'Register a typed custom property',
        'css',
        '@property --callout-color',
        'Use @property.'
      ),
    ],
    check: [
      'Where can a custom property be overridden?',
      [
        'Any matching descendant scope through cascade',
        'Only :root',
        'Only inline styles',
        'Only JavaScript',
      ],
      0,
      'Custom properties follow cascade and scope.',
    ],
  },
  {
    slug: 'css-grid',
    title: 'Two-Dimensional Layout with Grid',
    chapter: 9,
    type: 'workshop',
    objective: 'Build explicit and implicit grids with resilient tracks, placement, and alignment.',
    concepts: [
      'grid handles rows and columns together while Flexbox excels along one dimension',
      'fr, minmax, auto-fit, auto-fill, and intrinsic keywords produce resilient tracks',
      'named lines and areas make placement intent visible but source order remains important',
    ],
    build: 'Create an auto-fitting project gallery with no device-specific breakpoints.',
    html: '<section class="gallery">\n  <article>HTML</article>\n  <article>Flexbox</article>\n  <article>Grid</article>\n  <article>Accessibility</article>\n</section>',
    css: '.gallery {\n}\n',
    requirements: [
      css('display', 'Create grid container', '.gallery', 'display', 'grid', 'Set display grid.'),
      css(
        'tracks',
        'Create intrinsic responsive tracks',
        '.gallery',
        'grid-template-columns',
        'repeat(auto-fit,minmax(14rem,1fr))',
        'Use repeat(auto-fit, minmax(14rem, 1fr)).'
      ),
      css('gap', 'Separate cards', '.gallery', 'gap', '1rem', 'Set gap.'),
      css(
        'align',
        'Stretch cards consistently',
        '.gallery',
        'align-items',
        'stretch',
        'Set align-items stretch.'
      ),
    ],
    check: [
      'What does minmax(14rem, 1fr) express?',
      [
        'Track cannot shrink below 14rem and may share remaining space',
        'Exactly 14 columns',
        'Fixed viewport height',
        'Flex order',
      ],
      0,
      'minmax gives track lower and upper bounds.',
    ],
  },
  {
    slug: 'product-landing-project',
    title: 'Certification Project: Product Landing Page',
    chapter: 9,
    type: 'project',
    objective: 'Combine semantics, responsive layout, media, form design, and polished hierarchy.',
    concepts: [
      'landing pages need a clear value proposition, evidence, and focused action',
      'sticky headers must not cover fragment targets',
      'responsive layouts preserve task priority rather than merely shrinking',
    ],
    build: 'Build a responsive landing page for a practice-first learning product.',
    html: '<header id="header">\n  <nav id="nav-bar" aria-label="Primary"></nav>\n</header>\n<main>\n  <section class="hero"><h1>Learn by shipping</h1></section>\n</main>',
    css: '#header {\n}\n.hero {\n}\n',
    requirements: [
      selector(
        'nav',
        'Add three navigation links',
        '#nav-bar .nav-link:nth-child(3)',
        'Add three .nav-link anchors.'
      ),
      selector(
        'video',
        'Include product demonstration video',
        'video[controls]',
        'Add video controls.'
      ),
      selector(
        'form',
        'Add email interest form',
        'form input[type="email"][required]',
        'Use required email input.'
      ),
      source(
        'responsive',
        'Adapt layout for wide screens',
        'css',
        '@media (min-width: 48rem)',
        'Add a media query.'
      ),
    ],
    check: [
      'What should remain first priority on narrow screens?',
      [
        'Primary user task and value proposition',
        'Decorative background',
        'Every desktop column',
        'Hover animation',
      ],
      0,
      'Responsive design preserves user priorities.',
    ],
  },
  {
    slug: 'animation-debug-review',
    title: 'Animation, Debugging, and CSS Review',
    chapter: 9,
    type: 'lab',
    objective:
      'Create purposeful motion, debug layout systematically, and synthesize CSS decisions.',
    concepts: [
      'transitions connect known states while keyframes define multi-step animation',
      'transform and opacity usually animate more smoothly than layout properties',
      'DevTools overlays, computed styles, reduced test cases, and property toggling reveal root causes',
    ],
    build: 'Animate a progress indicator, then provide a reduced-motion equivalent.',
    html: '<section class="progress-card">\n  <h1>Course progress</h1>\n  <div class="meter"><span></span></div>\n</section>',
    css: '.meter span {\n}\n',
    requirements: [
      source(
        'keyframes',
        'Define progress animation',
        'css',
        '@keyframes fill-meter',
        'Add keyframes.'
      ),
      css(
        'animation',
        'Apply progress animation',
        '.meter span',
        'animation',
        'fill-meter 1s ease-out both',
        'Set exact animation shorthand.'
      ),
      source(
        'motion',
        'Respect reduced-motion preference',
        'css',
        'prefers-reduced-motion: reduce',
        'Add media query.'
      ),
      source(
        'contain',
        'Use transform-based motion',
        'css',
        'transform:',
        'Animate transform rather than width.'
      ),
    ],
    check: [
      'Which properties are usually cheapest to animate?',
      ['transform and opacity', 'width and height', 'top and left', 'grid-template-columns'],
      0,
      'Transform and opacity often avoid layout and paint work.',
    ],
  },
];

const chapters = [
  [
    'ch1-web-foundations',
    'Web and HTML Foundations',
    'Understand browser tooling, valid documents, links, images, and media.',
    [0, 1, 2],
  ],
  [
    'ch2-semantic-data',
    'Semantic Content, Forms, and Tables',
    'Structure meaningful content, collect data, and complete first certification project.',
    [3, 4, 5],
  ],
  [
    'ch3-html-accessibility',
    'HTML Accessibility and Review',
    'Build keyboard-friendly HTML and debug document problems.',
    [6, 7],
  ],
  [
    'ch4-css-foundations',
    'CSS, Design, Units, and Color',
    'Learn cascade mechanics and core visual design decisions.',
    [8, 9, 10, 11],
  ],
  [
    'ch5-css-components',
    'States, Forms, and the Box Model',
    'Style robust interactive components.',
    [12, 13, 14],
  ],
  [
    'ch6-flex-typography',
    'Flexbox and Typography',
    'Build one-dimensional layouts, card project, and readable type.',
    [15, 16, 17],
  ],
  [
    'ch7-css-access-layout',
    'Accessible CSS, Positioning, and Selectors',
    'Protect accessibility while building advanced layouts and inventory project.',
    [18, 19, 20, 21],
  ],
  [
    'ch8-responsive-systems',
    'Responsive Design Systems',
    'Build responsive docs and maintainable theme systems.',
    [22, 23, 24],
  ],
  [
    'ch9-grid-motion',
    'Grid, Product Project, and Motion',
    'Finish with two-dimensional layout, capstone page, animation, and review.',
    [25, 26, 27],
  ],
];

function lessonId(index, slug) {
  return `lesson-${String(index + 1).padStart(3, '0')}-${slug}`;
}

function markdownLesson(lesson, index) {
  const id = lessonId(index, lesson.slug);
  const concepts = lesson.concepts.map((item) => `- ${item}.`).join('\n');
  return `---
id: ${id}
title: "${lesson.title}"
chapterId: ${chapters[lesson.chapter - 1][0]}
order: ${index + 1}
duration: ${lesson.type === 'project' ? 90 : 35}
objectives:
  - "${lesson.objective}"
---

# ${lesson.title}

## Why this matters

Responsive interfaces work when structure, presentation, and interaction reinforce one another. ${lesson.objective} This lesson gives you a mental model first, then asks you to prove it in a real build.

## Theory

${concepts}

These ideas form one causal chain: browser input becomes a document tree, CSS creates boxes from that tree, and users experience those boxes through different screens, input devices, preferences, and assistive technologies. Test each link instead of treating a passing screenshot as proof.

## Worked reasoning

Before editing code, name the content relationship or layout constraint. Choose the native element or CSS mechanism that expresses it. Then test narrow width, keyboard navigation, zoom, and an unexpected amount of content. This sequence catches structural mistakes before visual polish hides them.

## Build to learn

**${lesson.type.toUpperCase()}:** ${lesson.build}

1. Read every automated requirement before coding.
2. Make the smallest semantic change that can satisfy one requirement.
3. Use the live preview, then run tests for evidence.
4. When a test fails, explain what the browser currently sees before changing code.
5. After passing, resize the preview mentally: identify one edge case the automated checks do not cover.

## Retrieval check

Without looking back, explain this lesson's most important decision in one sentence. Then name one tempting shortcut and the user who would be harmed by it.
`;
}

function exercise(lesson, index) {
  const id = lessonId(index, lesson.slug);
  return {
    id: `exercise-${String(index + 1).padStart(3, '0')}-${lesson.slug}`,
    lessonId: id,
    title: lesson.title,
    description: lesson.build,
    instructions: [
      'Read requirements and inspect starter files.',
      'Build in small testable changes.',
      'Run tests; use failure evidence and hints.',
      'Check keyboard and narrow-screen behavior before finishing.',
    ],
    difficulty: lesson.type === 'project' ? 'advanced' : index < 10 ? 'beginner' : 'intermediate',
    points: lesson.type === 'project' ? 300 : lesson.type === 'lab' ? 140 : 100,
    language: 'html',
    exerciseType: lesson.type,
    starterFiles: { html: lesson.html, css: lesson.css },
    requirements: lesson.requirements,
    hints: lesson.requirements.map((requirement) => requirement.hint),
  };
}

function quizQuestion(lesson, index, prefix = 'q') {
  const [question, options, answer, explanation] = lesson.check;
  return {
    id: `${prefix}-${String(index + 1).padStart(2, '0')}`,
    question,
    type: 'multiple-choice',
    points: 10,
    options: options.map((option, optionIndex) => ({
      id: String.fromCharCode(97 + optionIndex),
      text: option,
    })),
    correctAnswer: String.fromCharCode(97 + answer),
    explanation,
  };
}

async function main() {
  await rm(courseDir, { recursive: true, force: true });
  await Promise.all(
    ['lessons', 'exercises', 'quizzes'].map((folder) =>
      mkdir(path.join(courseDir, folder), { recursive: true })
    )
  );

  const course = {
    id: courseId,
    title: 'Responsive Web Design: Build for Everyone',
    description:
      'A practice-first path through modern HTML, CSS, accessibility, responsive design, and five certification projects. Covers every module in freeCodeCamp Responsive Web Design v9 with original theory, workshops, labs, quizzes, and a final exam.',
    difficulty: 'beginner',
    estimatedHours: 65,
    language: 'html',
    tags: ['html', 'css', 'responsive-design', 'accessibility', 'web-design', 'certification'],
    prerequisites: [],
    chapters: chapters.map(([id, title, description, indexes], chapterIndex) => ({
      id,
      title: `Chapter ${chapterIndex + 1}: ${title}`,
      description,
      order: chapterIndex + 1,
      lessons: indexes.map((index) => `${lessonId(index, lessons[index].slug)}.md`),
      quizId: `quiz-${String(chapterIndex + 1).padStart(2, '0')}-chapter-${chapterIndex + 1}`,
    })),
    author: 'LEARN-IT-ALL',
    published: true,
    createdAt: '2026-07-13T00:00:00Z',
    updatedAt: '2026-07-13T00:00:00Z',
    sourceCoverage: {
      reference: 'freeCodeCamp Responsive Web Design v9',
      upstreamCommit: 'c115efdd41f868d8850156f6a7a211219c35a847',
      modulesCovered: 29,
      certificationProjects: 5,
    },
  };
  await writeFile(path.join(courseDir, 'course.json'), `${JSON.stringify(course, null, 2)}\n`);

  for (const [index, lesson] of lessons.entries()) {
    await writeFile(
      path.join(courseDir, 'lessons', `${lessonId(index, lesson.slug)}.md`),
      markdownLesson(lesson, index)
    );
    await writeFile(
      path.join(
        courseDir,
        'exercises',
        `exercise-${String(index + 1).padStart(3, '0')}-${lesson.slug}.json`
      ),
      `${JSON.stringify(exercise(lesson, index), null, 2)}\n`
    );
  }

  for (const [chapterIndex, chapter] of chapters.entries()) {
    const indexes = chapter[3];
    const quiz = {
      id: `quiz-${String(chapterIndex + 1).padStart(2, '0')}-chapter-${chapterIndex + 1}`,
      courseId,
      chapterId: chapter[0],
      title: `${chapter[1]} Checkpoint`,
      description: 'Retrieval practice for this chapter. Explanations appear after submission.',
      passingScore: 80,
      timeLimit: 900,
      questions: indexes.map((index, questionIndex) => quizQuestion(lessons[index], questionIndex)),
    };
    await writeFile(
      path.join(courseDir, 'quizzes', `${quiz.id}.json`),
      `${JSON.stringify(quiz, null, 2)}\n`
    );
  }

  const finalExam = {
    id: 'final-exam',
    courseId,
    chapterId: 'certification-exam',
    title: 'Responsive Web Design Final Exam',
    description:
      'Comprehensive closed-note assessment across HTML, CSS, accessibility, responsive design, and debugging.',
    passingScore: 80,
    timeLimit: 3600,
    questions: lessons.map((lesson, index) => quizQuestion(lesson, index, 'exam')),
  };
  await writeFile(
    path.join(courseDir, 'quizzes', 'final-exam.json'),
    `${JSON.stringify(finalExam, null, 2)}\n`
  );
}

await main();
