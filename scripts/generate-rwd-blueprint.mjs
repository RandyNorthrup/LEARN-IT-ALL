import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const reference = JSON.parse(
  await readFile(path.join(process.cwd(), 'references', 'freecodecamp-rwd-v9.json'), 'utf8')
);

const skill = (
  id,
  statement,
  misconception,
  masteryEvidence,
  knowledgeType = 'procedural',
  level = 'apply',
  prerequisiteIds = []
) => ({
  id,
  statement,
  knowledgeType,
  level,
  prerequisiteIds,
  misconceptions: [misconception],
  masteryEvidence: [masteryEvidence],
});

const specs = {
  'computer-basics': {
    title: 'Computers, Files, Browsers, and Evidence',
    context:
      'Investigate how a community website travels from a saved file to a rendered browser interface.',
    skills: [
      skill(
        'computer-systems-model',
        'Explain how hardware, operating systems, applications, and data cooperate to run a web page.',
        'A browser alone performs every hardware and operating-system responsibility.',
        'A systems diagram correctly traces user input, computation, storage, and display.',
        'conceptual',
        'explain'
      ),
      skill(
        'files-folders-paths',
        'Create, organize, identify, and reference web project files using reliable paths and extensions.',
        'A displayed filename always proves the actual extension and file type.',
        'A project opens correctly after its folder is moved to a new location.'
      ),
      skill(
        'internet-web-model',
        'Distinguish the internet, web, browser, server, URL, request, response, and local file roles.',
        'The internet and the web are interchangeable names for the same system.',
        'A request trace identifies the browser, network, server, response, and rendered document.',
        'conceptual',
        'explain'
      ),
      skill(
        'browser-rendering-model',
        'Explain how browsers parse HTML and CSS into structures that become pixels and accessible information.',
        'Browsers display source text directly without parsing or error recovery.',
        'A learner predicts how a structural or style change alters browser output.',
        'conceptual',
        'explain'
      ),
      skill(
        'browser-devtools',
        'Use browser developer tools to inspect structure, styles, layout, accessibility, and network evidence.',
        'Changing a value in developer tools permanently edits the saved source file.',
        'A debugging note links an observed problem to specific DevTools evidence.',
        'strategic',
        'apply'
      ),
      skill(
        'web-research-verification',
        'Find, compare, and verify technical information using primary specifications and official documentation.',
        'The first search result is current and authoritative because it ranks highly.',
        'A technical decision cites a current primary source and verifies browser support.',
        'metacognitive',
        'evaluate'
      ),
    ],
  },
  'basic-html': {
    title: 'Documents, Content, Links, and Media',
    context:
      'Build a public information hub that remains understandable across browsers, devices, and assistive technology.',
    anchor: 'browser-devtools',
    skills: [
      skill(
        'html-document-boilerplate',
        'Create a valid HTML document with doctype, language, metadata, title, and viewport configuration.',
        'A fragment containing a div is equivalent to a complete deployable document.',
        'An independently authored page passes document-structure checks.'
      ),
      skill(
        'html-elements-nesting',
        'Choose elements by meaning and nest, open, and close them to form a valid document tree.',
        'Indentation alone creates parent and child relationships in HTML.',
        'A DOM inspection matches the intended content hierarchy.'
      ),
      skill(
        'html-attributes',
        'Use global, boolean, enumerated, and element-specific attributes with valid syntax and purpose.',
        'Every attribute requires an arbitrary text value to become active.',
        'Attributes in an independent build match specification-defined behavior.'
      ),
      skill(
        'html-text-headings-lists',
        'Structure prose, headings, quotations, code, and lists so relationships remain explicit.',
        'Heading rank should be selected to achieve a desired font size.',
        'A content outline communicates sections without relying on CSS.'
      ),
      skill(
        'html-links-urls',
        'Create understandable links using correct absolute, relative, fragment, email, and telephone URLs.',
        'Link text such as click here remains clear outside its surrounding paragraph.',
        'All project links resolve and expose destination purpose.'
      ),
      skill(
        'html-images-alt',
        'Embed responsive images with dimensions and alternative text appropriate to image purpose.',
        'Every image needs a detailed description even when it is purely decorative.',
        'An image audit classifies informative, functional, complex, and decorative cases correctly.'
      ),
      skill(
        'html-svg',
        'Use inline and external SVG appropriately while preserving accessible names and scalable rendering.',
        'All SVG graphics automatically receive an accessible name from their path data.',
        'A meaningful SVG is named and a decorative SVG is hidden correctly.'
      ),
      skill(
        'html-audio',
        'Provide usable audio with native controls, suitable sources, fallback, and transcript support.',
        'An audio element is accessible as soon as a source file loads.',
        'A media build includes controls, fallback, and equivalent text access.'
      ),
      skill(
        'html-video',
        'Provide usable video with dimensions, controls, multiple sources, captions, and fallback content.',
        'Burned-in visual text replaces synchronized captions for all users.',
        'A video player exposes captions and remains usable without autoplay.'
      ),
      skill(
        'html-iframe',
        'Embed external documents with a descriptive title, constrained permissions, and responsive sizing.',
        'An iframe title changes the visible title displayed inside the embedded page.',
        'An embed audit verifies naming, permissions, loading behavior, and layout.'
      ),
      skill(
        'html-validation-tools',
        'Use validators, browser tools, and source inspection to locate and correct HTML conformance errors.',
        'If a browser renders a page, its source must be valid and interoperable.',
        'A defect report identifies root cause rather than only visible symptoms.',
        'strategic',
        'analyze'
      ),
    ],
  },
  'semantic-html': {
    title: 'Semantic HTML and Content Relationships',
    context:
      'Structure a civic events publication for readers, search systems, and assistive technology.',
    anchor: 'html-elements-nesting',
    skills: [
      skill(
        'semantic-landmarks',
        'Use header, nav, main, aside, section, article, and footer according to content relationships.',
        'Semantic containers are interchangeable styled replacements for div elements.',
        'A landmark audit finds one main region and purposeful navigation and complementary regions.'
      ),
      skill(
        'semantic-heading-outline',
        'Create a logical heading hierarchy that names pages and sections without skipped structural reasoning.',
        'Each section must restart at h1 regardless of its place in the page hierarchy.',
        'A heading outline remains coherent when styles are removed.'
      ),
      skill(
        'semantic-text-meaning',
        'Use emphasis, importance, definitions, abbreviations, citations, and code semantics accurately.',
        'Strong and em exist only to apply bold and italic presentation.',
        'Text-level elements communicate the intended linguistic meaning.'
      ),
      skill(
        'semantic-time-address-quotes',
        'Represent dates, contact information, quotations, and citations with suitable semantic elements.',
        'The address element can wrap any postal address anywhere on a page.',
        'Machines and people can identify dates, contacts, and quoted sources.'
      ),
      skill(
        'semantic-disclosure',
        'Use details and summary for native disclosures when their behavior matches the user need.',
        'Any custom dropdown should be replaced with details regardless of interaction requirements.',
        'A disclosure choice is justified by semantics, keyboard behavior, and task needs.'
      ),
      skill(
        'semantic-content-models',
        'Evaluate whether element nesting follows HTML content models and preserves valid meaning.',
        'If elements look correct, invalid parent-child relationships have no consequences.',
        'A validator and DOM inspection confirm valid content relationships.',
        'conceptual',
        'analyze'
      ),
      skill(
        'semantic-native-first',
        'Prefer native HTML behavior before adding roles, scripts, or custom interaction patterns.',
        'Custom elements are more professional than native controls because they allow more styling.',
        'A design review selects the simplest native element that satisfies the interaction.'
      ),
    ],
  },
  'html-forms-and-tables': {
    title: 'Forms, Validation, and Data Tables',
    context:
      'Build an accessible registration and reporting workflow for a neighborhood learning center.',
    anchor: 'semantic-native-first',
    skills: [
      skill(
        'form-purpose-method',
        'Choose form structure, action, method, and control names that represent a coherent data submission.',
        'A visible input value is submitted even when its control has no name.',
        'Submitted form data contains the intended names and values.'
      ),
      skill(
        'form-labels-instructions',
        'Give every form control a persistent accessible label and connect shared instructions and errors.',
        'Placeholder text provides an equivalent replacement for a visible label.',
        'Keyboard and screen-reader checks expose names and instructions for every control.'
      ),
      skill(
        'form-input-types',
        'Choose input types and input modes that provide appropriate semantics, validation, and device keyboards.',
        'All short text values should use type text because other types only change appearance.',
        'Controls use purpose-specific types without preventing valid international input.'
      ),
      skill(
        'form-grouping-options',
        'Group related controls with fieldset and legend and use select, radio, and checkbox semantics correctly.',
        'Visually adjacent radio buttons automatically form an announced group.',
        'An options task exposes group purpose and independent versus exclusive choices.'
      ),
      skill(
        'form-native-validation',
        'Apply required, length, range, pattern, and autocomplete attributes without hostile validation rules.',
        'A restrictive regular expression is always the strongest way to improve data quality.',
        'Valid realistic data passes while incomplete or impossible data receives specific guidance.'
      ),
      skill(
        'table-structure',
        'Represent genuinely two-dimensional data with caption, row groups, rows, headers, and data cells.',
        'Tables are an efficient general-purpose tool for aligning page layout.',
        'A data relationship remains understandable with styles disabled.'
      ),
      skill(
        'table-header-associations',
        'Use scope and explicit header associations when necessary so cells retain row and column context.',
        'Bold first-row cells provide the same programmatic relationship as header cells.',
        'A table inspection identifies the headers announced for representative cells.'
      ),
      skill(
        'form-table-testing',
        'Test forms and tables with keyboard, zoom, validation states, narrow widths, and assistive semantics.',
        'Successful mouse submission proves the form is accessible and robust.',
        'A test record includes multiple input methods and failure states.',
        'strategic',
        'evaluate'
      ),
    ],
  },
  'html-and-accessibility': {
    title: 'HTML Accessibility as an Engineering Practice',
    context:
      'Audit and repair a public-service workflow used by people with varied input and perception needs.',
    anchor: 'form-table-testing',
    skills: [
      skill(
        'accessibility-disability-models',
        'Explain how environmental barriers interact with visual, auditory, motor, speech, cognitive, and neurological needs.',
        'Accessibility is a niche feature for a small fixed category of users.',
        'A barrier analysis connects design decisions to multiple access needs.',
        'conceptual',
        'explain'
      ),
      skill(
        'accessibility-tree',
        'Relate DOM semantics, accessible names, roles, states, and properties to the accessibility tree.',
        'Screen readers announce exactly the visible text and ignore programmatic semantics.',
        'A DevTools accessibility inspection predicts the announced control information.',
        'conceptual',
        'analyze'
      ),
      skill(
        'keyboard-focus',
        'Preserve logical keyboard order, visible focus, native activation, and safe skip navigation.',
        'Adding positive tabindex values repairs any keyboard sequence.',
        'All interactive tasks complete by keyboard with a visible predictable focus path.'
      ),
      skill(
        'accessible-names-descriptions',
        'Create concise accessible names and supporting descriptions without duplicate or conflicting labels.',
        'Adding aria-label improves every element even when visible text already names it.',
        'Name computation for representative controls matches user-facing purpose.'
      ),
      skill(
        'aria-use',
        'Apply ARIA roles, states, and properties only when native semantics cannot express required behavior.',
        'ARIA attributes automatically implement keyboard interaction and state changes.',
        'A custom pattern includes accurate semantics, state updates, and keyboard behavior.'
      ),
      skill(
        'accessible-errors-status',
        'Expose validation errors and dynamic status changes in text, focus flow, and appropriate live regions.',
        'Color and a red border give every learner enough error information.',
        'Error recovery works with screen reader, keyboard, zoom, and repeated submission.'
      ),
      skill(
        'accessible-media-equivalents',
        'Provide captions, transcripts, audio description planning, and non-media alternatives based on content.',
        'Machine-generated captions need no review before publication.',
        'Media alternatives convey equivalent information with verified timing and accuracy.'
      ),
      skill(
        'accessibility-test-strategy',
        'Combine automated checks with keyboard, zoom, forced-color, reduced-motion, and assistive-technology review.',
        'A perfect automated score proves conformance and usable access.',
        'An accessibility report distinguishes automated evidence from manual findings.',
        'strategic',
        'evaluate'
      ),
    ],
  },
  'basic-css': {
    title: 'CSS Syntax, Cascade, and Visual Foundations',
    context:
      'Create a maintainable visual layer for the semantic public information hub built earlier.',
    anchor: 'accessibility-test-strategy',
    skills: [
      skill(
        'css-rules-syntax',
        'Write valid rules, selectors, declarations, properties, values, comments, and at-rules.',
        'Browsers stop processing an entire stylesheet after one invalid declaration.',
        'A stylesheet parses and invalid experiments are diagnosed with browser evidence.'
      ),
      skill(
        'css-application-methods',
        'Choose external, embedded, and inline CSS based on reuse, performance, and maintenance constraints.',
        'Inline styles are best for reusable design because they have high specificity.',
        'A project uses an external stylesheet and justifies any exception.'
      ),
      skill(
        'css-type-class-id-selectors',
        'Select elements with appropriately scoped type, class, ID, compound, and combinator selectors.',
        'More specific selectors are always safer and easier to maintain.',
        'Component selectors remain predictable without unnecessary specificity.'
      ),
      skill(
        'css-cascade-origins-layers',
        'Reason about cascade origin, importance, layers, specificity, scope, and source order.',
        'Specificity alone determines every winning declaration.',
        'A cascade trace correctly identifies why one declaration wins.'
      ),
      skill(
        'css-inheritance-initial',
        'Use inheritance, initial values, unset, revert, and currentColor deliberately.',
        'Every CSS property inherits from the parent by default.',
        'A component inherits text properties while isolating non-inherited layout.'
      ),
      skill(
        'css-box-model',
        'Predict and control content, padding, border, margin, box sizing, and margin collapse.',
        'Declared width always equals the final border-box width.',
        'Measured layout dimensions match a written box-model calculation.'
      ),
      skill(
        'css-display-flow',
        'Choose block, inline, inline-block, flow-root, and hidden display behavior based on layout needs.',
        'Display none hides content visually while preserving it for assistive technology.',
        'Content participates in the intended formatting context and access tree.'
      ),
      skill(
        'css-list-styling',
        'Style list markers and spacing without removing list meaning or scanability.',
        'Removing bullets always removes list semantics from every browser and screen reader.',
        'A styled task list preserves structure and readable marker alignment.'
      ),
      skill(
        'css-link-states',
        'Style links with distinguishable default, visited, hover, focus, and active states.',
        'Hover is sufficient feedback because every device can emulate it.',
        'Links remain identifiable without color alone and all interaction states are visible.'
      ),
      skill(
        'css-backgrounds-borders',
        'Compose background colors, images, sizing, positions, gradients, borders, radii, and shadows responsibly.',
        'A background image communicates essential content as reliably as an img element.',
        'Decorative layers remain legible and do not carry required information.'
      ),
    ],
  },
  'design-for-developers': {
    title: 'User-Centered Interface Design',
    context:
      'Turn stakeholder goals and learner research into an interface hierarchy before polishing code.',
    anchor: 'css-backgrounds-borders',
    skills: [
      skill(
        'design-user-goals',
        'Translate stakeholder requests and user research into prioritized user goals and testable tasks.',
        'The stakeholder feature list is equivalent to evidence about user needs.',
        'A design brief identifies users, jobs, constraints, and success evidence.',
        'strategic',
        'analyze'
      ),
      skill(
        'design-information-hierarchy',
        'Create visual and structural hierarchy through content order, headings, scale, contrast, and grouping.',
        'Making every important item larger creates a clearer hierarchy.',
        'Representative users can locate primary and secondary actions quickly.'
      ),
      skill(
        'design-spacing-alignment',
        'Use consistent spacing, alignment, proximity, and whitespace to communicate relationships.',
        'Whitespace is unused room that should be filled to maximize value.',
        'A spacing audit maps repeated distances to a deliberate scale.'
      ),
      skill(
        'design-color-typography',
        'Choose color and typography systems that support brand, readability, states, and accessibility.',
        'A brand color must be used for text even when it fails contrast.',
        'Design tokens produce readable text and distinguishable states.'
      ),
      skill(
        'design-consistency-feedback',
        'Make controls, status, errors, and navigation consistent while providing immediate useful feedback.',
        'Consistency means every component must look identical regardless of purpose.',
        'A user can predict behavior and recover from errors across the interface.'
      ),
      skill(
        'design-prototype-test',
        'Create low-to-high fidelity prototypes and test assumptions before expensive implementation.',
        'A polished mockup is proof that users can complete the intended task.',
        'A test report links observed behavior to a revised design decision.',
        'strategic',
        'evaluate'
      ),
    ],
  },
  'absolute-and-relative-units': {
    title: 'Sizing, Units, and Intrinsic Constraints',
    context: 'Make cards and reading layouts adapt to content, font settings, and available space.',
    anchor: 'design-spacing-alignment',
    skills: [
      skill(
        'css-absolute-units',
        'Use absolute CSS units only where their physical or pixel-relative behavior matches the medium.',
        'CSS pixels always correspond to one physical device pixel.',
        'Unit choices are justified by output medium and zoom behavior.'
      ),
      skill(
        'css-font-relative-units',
        'Use rem, em, ch, lh, and related units with accurate reference contexts.',
        'An em value always refers to the root font size.',
        'Typography and component spacing scale predictably under user font changes.'
      ),
      skill(
        'css-percentage-units',
        'Predict percentage sizing by identifying the correct containing-block reference.',
        'Every percentage resolves against viewport width.',
        'A sizing explanation names the property-specific percentage basis.'
      ),
      skill(
        'css-viewport-dynamic-units',
        'Use viewport and dynamic viewport units without obscuring content or fighting mobile browser UI.',
        'One hundred vh always equals the visible mobile screen height.',
        'A full-height layout survives mobile browser controls and zoom.'
      ),
      skill(
        'css-math-fluid-sizing',
        'Compose min, max, clamp, and calc expressions to create bounded fluid sizes.',
        'Fluid values need no minimum or maximum because every viewport scales proportionally.',
        'Text and spacing grow smoothly while staying within readable bounds.'
      ),
    ],
  },
  'pseudo-classes-and-elements': {
    title: 'State, Structure, and Generated Presentation',
    context: 'Build interactive cards and form feedback that expose state to every input mode.',
    anchor: 'css-math-fluid-sizing',
    skills: [
      skill(
        'css-action-pseudo-classes',
        'Use link, pointer, keyboard, target, and focus pseudo-classes without input-mode assumptions.',
        'Hover and focus represent the same interaction for every user.',
        'Controls show distinct useful states for mouse, touch, and keyboard.'
      ),
      skill(
        'css-structural-pseudo-classes',
        'Use child, type, empty, root, and functional structural selectors against the actual DOM.',
        'Nth-child counts only elements that match the selector before it.',
        'A selector trace correctly predicts which nodes match.'
      ),
      skill(
        'css-form-state-pseudo-classes',
        'Style required, optional, valid, invalid, checked, disabled, and indeterminate form states responsibly.',
        'Invalid styling should appear before a learner has interacted with a blank form.',
        'Validation styling is timed and explained without color-only cues.'
      ),
      skill(
        'css-functional-pseudo-classes',
        'Use is, where, not, and has while controlling specificity and browser support.',
        'The where function adds the specificity of its most specific argument.',
        'A selector is simplified without creating accidental specificity.'
      ),
      skill(
        'css-pseudo-elements',
        'Use before, after, marker, selection, placeholder, and first-letter for presentation, not essential content.',
        'Generated content is a reliable place for required instructions.',
        'The page remains understandable when generated presentation is unavailable.'
      ),
    ],
  },
  'css-colors': {
    title: 'Color Systems, Contrast, and Gradients',
    context:
      'Create a theme that communicates hierarchy and state in light, dark, and forced-color environments.',
    anchor: 'css-pseudo-elements',
    skills: [
      skill(
        'css-color-formats',
        'Represent color with named, hexadecimal, RGB, HSL, and modern color syntax while understanding alpha.',
        'Different color notations create inherently different displayed colors.',
        'Equivalent color values are recognized and alpha composition is predicted.'
      ),
      skill(
        'css-color-relationships',
        'Use hue, saturation, lightness, temperature, and harmony as tools rather than fixed aesthetic rules.',
        'A mathematically harmonious palette automatically communicates usable hierarchy.',
        'Palette choices connect to content purpose and user testing.'
      ),
      skill(
        'css-color-contrast',
        'Verify text, component, focus, and graphical contrast against applicable WCAG criteria.',
        'A contrast checker for one hex pair proves contrast in every state and gradient location.',
        'All interactive states and text sizes have recorded contrast evidence.'
      ),
      skill(
        'css-color-not-only',
        'Communicate meaning through text, shape, position, or iconography in addition to color.',
        'Adding a second shade is enough to avoid a color-only distinction.',
        'Status remains understandable in grayscale and forced colors.'
      ),
      skill(
        'css-gradients',
        'Build linear, radial, conic, and repeating gradients with controlled stops and readable overlays.',
        'A gradient is an image element and needs an alt attribute.',
        'Decorative gradients preserve contrast and do not encode required data alone.'
      ),
    ],
  },
  'styling-forms': {
    title: 'Resilient Form Interface Design',
    context:
      'Style an application workflow that stays clear across browsers, zoom, keyboard, errors, and autofill.',
    anchor: 'form-native-validation',
    skills: [
      skill(
        'css-form-inheritance',
        'Normalize form control typography and color without erasing useful native behavior.',
        'Form controls inherit every font and color property automatically.',
        'Controls match the design system while remaining recognizable.'
      ),
      skill(
        'css-form-layout',
        'Lay out labels, controls, hints, and actions with readable measure and generous target sizes.',
        'A compact desktop form can be proportionally shrunk for touch screens.',
        'The form reflows at narrow widths with usable targets and no horizontal scroll.'
      ),
      skill(
        'css-form-focus',
        'Create strong focus and focus-within treatments that survive contrast modes and are not clipped.',
        'Removing outlines is safe when hover styling exists.',
        'Every control has a visible keyboard focus indicator.'
      ),
      skill(
        'css-form-errors',
        'Style errors, success, help, required state, and disabled state with multiple cues.',
        'Red borders alone provide clear error recovery.',
        'Each state has text and programmatic meaning as well as visual treatment.'
      ),
      skill(
        'css-form-native-custom',
        'Decide when to retain native control appearance and when a fully implemented custom pattern is justified.',
        'Custom checkboxes need only a hidden native input and decorative box.',
        'A control review covers semantics, keyboard, state, zoom, and forced colors.'
      ),
      skill(
        'css-form-autofill-motion',
        'Handle autofill, placeholder, reduced motion, and browser-specific form states without hiding data.',
        'Autofill colors can be overridden without checking readability or user expectations.',
        'Completed fields remain readable and state changes respect preferences.'
      ),
    ],
  },
  'css-box-model': {
    title: 'Overflow, Effects, and Transform Geometry',
    context:
      'Create layered editorial cards that contain unpredictable content without clipping access.',
    anchor: 'css-box-model',
    skills: [
      skill(
        'css-overflow',
        'Choose visible, hidden, clip, auto, and scroll overflow while preserving content and focus access.',
        'Overflow hidden is a harmless way to repair any layout that extends beyond a card.',
        'Long content, zoom, and keyboard focus remain reachable.'
      ),
      skill(
        'css-sizing-constraints',
        'Use min and max sizes, aspect ratio, and intrinsic keywords to constrain components safely.',
        'Fixed height is the most reliable way to keep cards aligned.',
        'Components accept longer text without overlap or clipping.'
      ),
      skill(
        'css-transforms',
        'Compose translate, rotate, scale, skew, transform origin, and individual transforms predictably.',
        'Transforms move surrounding layout boxes and create space for neighbors.',
        'A geometry explanation distinguishes visual transform from document flow.'
      ),
      skill(
        'css-filters',
        'Use visual filters with restraint while preserving performance, contrast, and content meaning.',
        'A brightness filter reliably repairs contrast for arbitrary images and text.',
        'Filtered content remains legible and has a non-filter fallback.'
      ),
      skill(
        'css-shadows-depth',
        'Use box and text shadows to support hierarchy without replacing boundaries or focus indicators.',
        'More shadows always make interactive elevation clearer.',
        'Depth cues remain understandable in high contrast and without shadow.'
      ),
      skill(
        'css-containment-effects',
        'Recognize how transforms, filters, opacity, and containment create stacking and containing contexts.',
        'Z-index values compare globally across every element on the page.',
        'A stacking bug is explained from context boundaries and paint order.',
        'conceptual',
        'analyze'
      ),
      skill(
        'css-effects-debugging',
        'Debug clipping, stacking, transform, and filter defects through reduced cases and computed evidence.',
        'Raising z-index repeatedly is a dependable stacking-context fix.',
        'A reduced test case identifies the property that creates the defect.',
        'strategic',
        'analyze'
      ),
    ],
  },
  'css-flexbox': {
    title: 'One-Dimensional Layout with Flexbox',
    context: 'Build navigation, card rows, and toolbars that adapt to content and localization.',
    anchor: 'css-display-flow',
    skills: [
      skill(
        'flex-formatting-context',
        'Create a flex formatting context and identify main axis, cross axis, and direction.',
        'The main axis is always horizontal and the cross axis always vertical.',
        'A layout explanation follows the configured writing mode and direction.'
      ),
      skill(
        'flex-sizing-algorithm',
        'Predict flex base size, free space, grow, shrink, minimum size, and final item dimensions.',
        'Flex one means each item always receives exactly the same width.',
        'A sizing calculation explains why items grow or shrink differently.',
        'conceptual',
        'analyze'
      ),
      skill(
        'flex-alignment',
        'Use justify, align, self-alignment, and gaps based on the correct axis and distribution need.',
        'Justify-content vertically centers items in every flex container.',
        'Alignment rules match axis and leave content reachable.'
      ),
      skill(
        'flex-wrapping',
        'Use wrapping and flexible bases to create resilient rows without device-specific item counts.',
        'Flex-wrap alone guarantees every card has a usable minimum width.',
        'Cards wrap before content becomes cramped or overflows.'
      ),
      skill(
        'flex-order-accessibility',
        'Avoid visual reordering that separates reading, focus, and visual sequences.',
        'Changing CSS order also changes screen-reader and keyboard sequence.',
        'Source order remains logical at every layout.'
      ),
      skill(
        'flex-pattern-selection',
        'Choose Flexbox, Grid, block flow, or another method based on dimensional and content constraints.',
        'Flexbox is the modern replacement for every older layout mechanism.',
        'A layout decision names dimensions, alignment, wrapping, and source-order needs.',
        'strategic',
        'evaluate'
      ),
    ],
  },
  'css-typography': {
    title: 'Readable and Responsive Typography',
    context:
      'Design long-form learning content for varied languages, zoom levels, and reading preferences.',
    anchor: 'design-color-typography',
    skills: [
      skill(
        'css-font-families-fallbacks',
        'Build resilient font stacks and understand generic families, fallback metrics, and system fonts.',
        'A downloaded web font displays before it loads with no layout consequences.',
        'Text remains readable and stable when preferred fonts fail.'
      ),
      skill(
        'css-web-font-loading',
        'Declare web fonts with suitable formats, weights, styles, ranges, and display behavior.',
        'One regular font file can synthesize every weight and style with equal quality.',
        'Requested styles map to real resources and loading behavior is tested.'
      ),
      skill(
        'css-type-scale',
        'Create a bounded type scale that communicates hierarchy without breaking at zoom or narrow widths.',
        'Fixed pixel font sizes provide the most consistent accessible typography.',
        'Heading and body sizes remain proportional and user-scalable.'
      ),
      skill(
        'css-line-measure-spacing',
        'Control line height, measure, paragraph spacing, letter spacing, and word spacing for readability.',
        'Tightly packed long lines make reading faster because more text fits on screen.',
        'Prose stays within readable measure across viewports.'
      ),
      skill(
        'css-text-wrapping-overflow',
        'Handle long words, URLs, wrapping, hyphenation, truncation, and vertical writing without data loss.',
        'Ellipsis is safe for any content because users understand hidden text exists.',
        'Unexpected content remains available and does not force page overflow.'
      ),
      skill(
        'css-responsive-type',
        'Use relative units and clamp to adapt typography while honoring user settings and content needs.',
        'Viewport units alone are ideal because they always scale with device size.',
        'Type scales fluidly within tested readable bounds.'
      ),
    ],
  },
  'css-and-accessibility': {
    title: 'Accessible CSS Under Real User Preferences',
    context:
      'Harden every earlier interface against zoom, reflow, forced colors, reduced motion, and custom settings.',
    anchor: 'accessibility-test-strategy',
    skills: [
      skill(
        'css-zoom-reflow',
        'Support text resize and 400 percent zoom without lost content, controls, or two-dimensional scrolling.',
        'A desktop layout can remain fixed because browser zoom simply scales the screenshot.',
        'Critical workflows complete at high zoom and narrow effective widths.'
      ),
      skill(
        'css-visible-hidden-content',
        'Choose display, visibility, opacity, clipping, and visually hidden patterns with accurate access effects.',
        'Opacity zero removes an element from keyboard and accessibility navigation.',
        'Hidden-state behavior matches visual, layout, focus, and accessibility intent.'
      ),
      skill(
        'css-focus-visibility',
        'Protect visible focus indicators from resets, clipping, overlays, and insufficient contrast.',
        'A subtle color shift is enough focus evidence for every control.',
        'Focus appearance remains visible on all component backgrounds.'
      ),
      skill(
        'css-user-preferences',
        'Respond to reduced motion, contrast, color scheme, transparency, and forced-color preferences appropriately.',
        'Preference media queries should disable all useful feedback and state changes.',
        'Adaptations preserve meaning while reducing unwanted effects.'
      ),
      skill(
        'css-touch-targets',
        'Provide adequate target size, spacing, orientation flexibility, and alternatives to path-based gestures.',
        'Small icons are usable when their SVG graphic is visually sharp.',
        'Touch testing confirms target area and accidental activation risk.'
      ),
      skill(
        'css-accessibility-regression',
        'Add automated and manual accessibility regression checks to component and project completion.',
        'Accessibility needs to be checked only once after all visual work is finished.',
        'Every cumulative build records repeated access checks.',
        'professional',
        'evaluate'
      ),
    ],
  },
  'css-positioning': {
    title: 'Flow, Positioning, and Stacking',
    context:
      'Build persistent navigation and anchored notifications without covering content or focus.',
    anchor: 'css-effects-debugging',
    skills: [
      skill(
        'css-normal-flow',
        'Use normal block and inline flow as the resilient baseline before removing content from flow.',
        'Professional layouts require positioning every major region explicitly.',
        'A layout remains readable before enhancement.'
      ),
      skill(
        'css-floats',
        'Use floats for inline content wrapping and contain or clear them when appropriate.',
        'Floats are a general two-dimensional page-layout system equivalent to Grid.',
        'Text wraps around media without collapsing its container.'
      ),
      skill(
        'css-relative-position',
        'Use relative positioning for local offsets and containing-block creation without confusing flow space.',
        'Relative offsets cause following siblings to move into the vacated space.',
        'An offset element retains its original flow allocation.'
      ),
      skill(
        'css-absolute-position',
        'Position an element against the intended containing block while reserving necessary content space.',
        'Absolutely positioned content always uses the viewport as its reference.',
        'A badge remains anchored to its component across layout changes.'
      ),
      skill(
        'css-fixed-sticky',
        'Use fixed and sticky positioning with offsets, scroll containers, safe areas, and obstruction testing.',
        'Sticky positioning works independently of ancestor overflow and scroll containers.',
        'Navigation stays useful without covering targets or zoomed content.'
      ),
      skill(
        'css-stacking-contexts',
        'Predict stacking contexts and paint order created by positioning, opacity, transforms, isolation, and containment.',
        'The numerically largest z-index must appear above every page element.',
        'A layer map explains actual paint order across nested contexts.',
        'conceptual',
        'analyze'
      ),
    ],
  },
  'attribute-selectors': {
    title: 'Attribute-Driven Styling',
    context:
      'Style links, controls, validation, and data states from meaningful attributes rather than brittle content.',
    anchor: 'css-type-class-id-selectors',
    skills: [
      skill(
        'css-attribute-presence-value',
        'Use presence and exact-value attribute selectors for semantic types and states.',
        'An attribute selector changes the underlying semantic state it matches.',
        'Styles reflect truthful document attributes.'
      ),
      skill(
        'css-attribute-token-language',
        'Use token, hyphenated language, and case-sensitivity matching with accurate value models.',
        'The contains operator is interchangeable with token matching.',
        'Selectors distinguish tokens, prefixes, and language subcodes correctly.'
      ),
      skill(
        'css-attribute-substrings',
        'Use prefix, suffix, and substring matching only when stable attribute conventions justify them.',
        'Substring selectors remain safe when filenames and URL formats change arbitrarily.',
        'A selector documents the stable convention it relies on.'
      ),
      skill(
        'css-data-aria-state',
        'Style data and ARIA state without using CSS as the source of truth for interaction behavior.',
        'Changing generated content or color updates an ARIA state automatically.',
        'State styles match DOM state and scripted behavior.'
      ),
    ],
  },
  'responsive-design': {
    title: 'Responsive Systems from Content Out',
    context:
      'Adapt a learning dashboard to narrow phones, tablets, desktops, zoom, and embedded containers.',
    anchor: 'css-math-fluid-sizing',
    skills: [
      skill(
        'responsive-mobile-first',
        'Start with a robust narrow layout and add enhancements only when content and space support them.',
        'Mobile first means designing only for a standard phone width before desktop.',
        'Base styles work at the smallest supported width without override dependencies.'
      ),
      skill(
        'responsive-content-breakpoints',
        'Choose breakpoints where content or interaction needs change instead of matching device brands.',
        'A complete design needs separate breakpoints for every popular device model.',
        'Breakpoint notes identify concrete content failure evidence.'
      ),
      skill(
        'responsive-media-queries',
        'Compose range, preference, pointer, hover, orientation, and resolution queries with sensible fallbacks.',
        'Viewport width is the only environmental condition relevant to responsive design.',
        'The interface adapts to size and user capability without removing access.'
      ),
      skill(
        'responsive-images',
        'Use intrinsic sizing, picture, srcset, sizes, formats, and art direction to serve suitable images.',
        'CSS width alone prevents a browser from downloading an unnecessarily large source.',
        'Image candidates and rendered dimensions fit tested viewports.'
      ),
      skill(
        'responsive-embedded-media',
        'Make video, iframe, SVG, and other embedded media preserve ratio and avoid page overflow.',
        'Setting width one hundred percent always preserves an embed aspect ratio.',
        'All embeds resize without distortion or horizontal scrolling.'
      ),
      skill(
        'responsive-container-queries',
        'Use containment and container queries for components whose layout depends on local available space.',
        'Container queries are a direct replacement for every viewport media query.',
        'A reusable component adapts correctly in different parent layouts.'
      ),
      skill(
        'responsive-test-matrix',
        'Verify responsive behavior across content lengths, viewports, zoom, input modes, orientations, and preferences.',
        'Testing three screenshots proves a responsive system is complete.',
        'A test matrix records behavior and defects across meaningful conditions.',
        'strategic',
        'evaluate'
      ),
    ],
  },
  'css-variables': {
    title: 'Custom Properties and Design Tokens',
    context:
      'Create a theme system shared by components while preserving local exceptions and user preferences.',
    anchor: 'design-consistency-feedback',
    skills: [
      skill(
        'css-custom-property-definition',
        'Define and consume custom properties with valid names, values, and var references.',
        'Custom properties are replaced before cascade and never inherit.',
        'Tokens resolve predictably in component declarations.'
      ),
      skill(
        'css-custom-property-cascade',
        'Reason about custom-property inheritance, cascade, scope, and local component overrides.',
        'A root token cannot be overridden safely inside a component.',
        'A local theme changes one subtree without unintended global effects.'
      ),
      skill(
        'css-custom-property-fallbacks',
        'Use nested fallbacks while understanding missing values and invalid-at-computed-value behavior.',
        'A var fallback repairs every syntactically invalid computed value.',
        'A failure experiment distinguishes missing and invalid values.'
      ),
      skill(
        'css-design-token-system',
        'Organize primitive, semantic, and component tokens without hiding meaning behind arbitrary names.',
        'Every raw CSS value should become a custom property regardless of reuse.',
        'Token names communicate decisions and support coherent themes.'
      ),
      skill(
        'css-property-registration',
        'Register selected custom properties with syntax, inheritance, and initial values when typed behavior helps.',
        'Every custom property needs an at-property registration to work.',
        'A registered value animates or validates for a justified use case.'
      ),
    ],
  },
  'css-grid': {
    title: 'Two-Dimensional Layout and CSS Debugging',
    context:
      'Build a publication and dashboard grid that remains logical under changing content and source order.',
    anchor: 'flex-pattern-selection',
    skills: [
      skill(
        'grid-formatting-context',
        'Create a grid formatting context and distinguish explicit and implicit tracks.',
        'Only explicitly declared cells can participate in Grid layout.',
        'A grid inspection identifies explicit and generated tracks.'
      ),
      skill(
        'grid-track-sizing',
        'Size tracks with fixed, flexible, intrinsic, minmax, fit-content, and repeat functions.',
        'One fractional unit means one fixed fraction of viewport width.',
        'Track sizing adapts without forcing content below intrinsic minimums.'
      ),
      skill(
        'grid-placement',
        'Place items with lines, spans, negative indices, and auto-placement while preserving logical source order.',
        'Explicit visual placement changes reading and focus order.',
        'A complex layout retains meaningful DOM order.'
      ),
      skill(
        'grid-areas',
        'Use named grid areas for understandable layouts and redefine them safely at breakpoints.',
        'Area names can form non-rectangular shapes across a template.',
        'Templates are valid rectangles and reflect content priority.'
      ),
      skill(
        'grid-auto-fit-fill',
        'Choose auto-fit or auto-fill with minmax for content-driven repeating tracks.',
        'Auto-fit and auto-fill always produce identical empty-track behavior.',
        'A gallery decision accounts for empty and collapsed tracks.'
      ),
      skill(
        'grid-alignment',
        'Align the grid, tracks, and items using the correct content and self-alignment properties.',
        'Align-items controls the placement of the entire grid in its container.',
        'Alignment changes are predicted at both grid and item levels.'
      ),
      skill(
        'grid-subgrid',
        'Use subgrid where supported to align nested component content to shared parent tracks.',
        'Nested grids automatically inherit parent track lines.',
        'A card collection aligns internal regions without duplicated track values.'
      ),
      skill(
        'css-debug-method',
        'Debug cascade, selector, layout, overflow, and rendering failures with a repeatable evidence-driven method.',
        'Trying random property changes is faster than isolating the smallest failing case.',
        'A defect report records reproduction, hypothesis, evidence, fix, and regression check.',
        'strategic',
        'analyze'
      ),
    ],
  },
  'css-animations': {
    title: 'Purposeful Motion, Animation, and Final Integration',
    context:
      'Add understandable feedback and illustration without harming performance, comfort, or task completion.',
    anchor: 'css-transforms',
    skills: [
      skill(
        'css-transitions',
        'Use transitions for meaningful changes between known states with suitable properties and timing.',
        'Transition all is harmless because browsers choose only cheap properties.',
        'A state transition animates only properties that improve understanding.'
      ),
      skill(
        'css-keyframes',
        'Define, name, and apply keyframe animations with clear start, intermediate, and end states.',
        'Keyframe percentages represent elapsed milliseconds rather than relative progress.',
        'An animation reaches intended states and keeps stable fill behavior.'
      ),
      skill(
        'css-animation-timing',
        'Choose duration, delay, iteration, direction, fill, and easing based on purpose and user control.',
        'Longer or bouncier animation always makes an interface feel more engaging.',
        'Motion timing supports feedback without delaying the task.'
      ),
      skill(
        'css-animation-performance',
        'Prefer transform and opacity where suitable and measure main-thread, layout, paint, and compositing effects.',
        'Transform and opacity are always free and need no performance verification.',
        'A performance trace supports the animation implementation decision.'
      ),
      skill(
        'css-reduced-motion',
        'Provide reduced-motion alternatives that preserve status and meaning instead of merely shortening duration.',
        'A very fast animation automatically satisfies reduced-motion needs.',
        'The preferred reduction removes nonessential motion while retaining feedback.'
      ),
      skill(
        'css-animation-debug',
        'Diagnose animation precedence, interpolation, transform composition, and missing-state defects.',
        'An animation always combines automatically with a transform declared elsewhere.',
        'A reduced case identifies the exact conflicting animation or transform rule.',
        'strategic',
        'analyze'
      ),
    ],
  },
};

const reuseSpecs = {
  'lab-survey-form': [
    'form-purpose-method',
    'form-labels-instructions',
    'form-input-types',
    'form-grouping-options',
    'form-native-validation',
    'semantic-landmarks',
  ],
  'review-html': [
    'html-document-boilerplate',
    'html-links-urls',
    'html-images-alt',
    'semantic-landmarks',
    'form-labels-instructions',
    'table-header-associations',
    'keyboard-focus',
    'accessible-names-descriptions',
  ],
  'lab-page-of-playing-cards': [
    'semantic-landmarks',
    'css-box-model',
    'flex-formatting-context',
    'flex-wrapping',
    'css-action-pseudo-classes',
    'css-color-contrast',
  ],
  'lab-book-inventory-app': [
    'table-structure',
    'table-header-associations',
    'css-attribute-presence-value',
    'css-data-aria-state',
  ],
  'lab-technical-documentation-page': [
    'semantic-landmarks',
    'semantic-heading-outline',
    'html-links-urls',
    'responsive-mobile-first',
    'css-fixed-sticky',
    'keyboard-focus',
  ],
  'lab-product-landing-page': [
    'design-user-goals',
    'semantic-landmarks',
    'responsive-images',
    'responsive-content-breakpoints',
    'form-labels-instructions',
    'css-color-contrast',
  ],
  'review-css': [
    'css-cascade-origins-layers',
    'css-box-model',
    'flex-pattern-selection',
    'grid-track-sizing',
    'responsive-test-matrix',
    'css-accessibility-regression',
    'css-debug-method',
  ],
  'responsive-web-design-certification-exam': [
    'html-document-boilerplate',
    'semantic-landmarks',
    'form-labels-instructions',
    'accessibility-test-strategy',
    'css-cascade-origins-layers',
    'css-box-model',
    'flex-pattern-selection',
    'grid-track-sizing',
    'responsive-test-matrix',
    'css-animation-debug',
  ],
};

const reuseTitles = {
  'lab-survey-form': 'Certification Project: Community Needs Survey',
  'review-html': 'Cumulative HTML Review',
  'lab-page-of-playing-cards': 'Certification Project: Volunteer Shift Deck',
  'lab-book-inventory-app': 'Certification Project: Accessible Resource Inventory',
  'lab-technical-documentation-page': 'Certification Project: Developer Field Manual',
  'lab-product-landing-page': 'Certification Project: Ethical Product Launch',
  'review-css': 'Cumulative CSS Review',
  'responsive-web-design-certification-exam': 'Responsive Web Design Certification Exam',
};

const moduleOrder = [
  'computer-basics',
  'basic-html',
  'semantic-html',
  'html-forms-and-tables',
  'lab-survey-form',
  'html-and-accessibility',
  'review-html',
  'basic-css',
  'design-for-developers',
  'absolute-and-relative-units',
  'pseudo-classes-and-elements',
  'css-colors',
  'styling-forms',
  'css-box-model',
  'css-flexbox',
  'lab-page-of-playing-cards',
  'css-typography',
  'css-and-accessibility',
  'css-positioning',
  'attribute-selectors',
  'lab-book-inventory-app',
  'responsive-design',
  'lab-technical-documentation-page',
  'css-variables',
  'css-grid',
  'lab-product-landing-page',
  'css-animations',
  'review-css',
  'responsive-web-design-certification-exam',
];

const titleCase = (slug) =>
  slug
    .replace(/^(lecture|workshop|lab|review|quiz|exam)-/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const moduleReferences = new Map(
  reference.chapters.flatMap((chapter) => chapter.modules.map((module) => [module.id, module]))
);

const allCompetencies = [];
let priorCompetencyId = null;
for (const moduleId of moduleOrder) {
  const spec = specs[moduleId];
  if (!spec) continue;
  for (const competency of spec.skills) {
    const prerequisiteIds = [
      ...new Set([
        ...competency.prerequisiteIds,
        ...(spec.anchor ? [spec.anchor] : []),
        ...(priorCompetencyId ? [priorCompetencyId] : []),
      ]),
    ].filter((id) => id !== competency.id);
    allCompetencies.push({ ...competency, prerequisiteIds });
    priorCompetencyId = competency.id;
  }
}

const mergeCoverage = (entries) => {
  const stagesByCompetency = new Map();
  for (const entry of entries) {
    const stages = stagesByCompetency.get(entry.competencyId) ?? new Set();
    entry.stages.forEach((stage) => {
      stages.add(stage);
    });
    stagesByCompetency.set(entry.competencyId, stages);
  }
  return [...stagesByCompetency].map(([competencyId, stages]) => ({
    competencyId,
    stages: [...stages],
  }));
};

const activityKind = (blockType, moduleType) => {
  if (moduleType === 'cert-project') return 'project';
  return {
    lecture: 'theory',
    workshop: 'workshop',
    lab: 'lab',
    review: 'review',
    quiz: 'quiz',
    exam: 'exam',
  }[blockType];
};

const stageForBlock = (blockType, moduleType) => {
  if (moduleType === 'cert-project') return ['A', 'T'];
  return {
    lecture: ['G'],
    workshop: ['G', 'F'],
    lab: ['A', 'T'],
    review: ['R'],
    quiz: ['A'],
    exam: ['A', 'T'],
  }[blockType];
};

const stageNames = {
  G: ['guided-studio', 'Guided reasoning studio', 'workshop'],
  F: ['faded-build', 'Faded-support build', 'workshop'],
  R: ['retrieval-sprint', 'Delayed retrieval sprint', 'review'],
  A: ['mastery-check', 'Competency mastery check', 'quiz'],
  T: ['transfer-lab', 'Independent transfer lab', 'lab'],
};

const authoredModulePlans = {
  'computer-basics': {
    objectives: [
      'Trace a page from input and storage through operating-system, browser, graphics, and display responsibilities.',
      'Organize a portable web project and diagnose broken relative paths, misleading extensions, and moved files.',
      'Contrast local-file loading with a network request and label the browser, URL, server, request, and response roles.',
      'Use browser evidence and primary documentation to test claims about source, the DOM, accessibility information, layout, and pixels.',
    ],
    activities: {
      'computer-basics-computer-systems-model-concept': {
        title: 'From Double-Click to Display: Map the Whole System',
        authenticContext:
          'A repair-cafe volunteer opens a saved event notice. The page appears, but the team cannot explain which parts of the computer did the work. Build a responsibility map from input through visible output.',
        retainedPractice:
          'Establish the course habit of predicting a mechanism, observing evidence, and revising the model before building.',
        learnerArtifact:
          'An annotated systems trace that separates input hardware, operating-system work, stored data, browser processing, graphics work, and display output.',
      },
      'computer-basics-files-folders-paths-concept': {
        title: 'Path Detective: Recover a Moved Community Site',
        authenticContext:
          'A community-site folder worked on one laptop but lost its image and stylesheet after a handoff. Inspect the project tree, expose real extensions, and repair references without depending on one machine location.',
        retainedPractice:
          'Reuse the complete-system map to identify which failures come from stored project data rather than browser rendering.',
        learnerArtifact:
          'A portable project tree, corrected relative-path map, and short diagnosis for each broken resource.',
      },
      'computer-basics-internet-web-model-concept': {
        title: 'Local File or Web Request? Trace Two Different Journeys',
        authenticContext:
          'The same notice opens from a Downloads folder and from a public URL. Compare both journeys so a support volunteer can tell storage access from browser-server communication.',
        retainedPractice:
          'Carry forward reliable filenames, folders, and paths while adding URL, request, response, network, and server responsibilities.',
        learnerArtifact:
          'A side-by-side sequence diagram for local-file and HTTPS loading, including the evidence that distinguishes them.',
      },
      'computer-basics-browser-rendering-model-concept': {
        title: 'Inside the Browser: Follow Source to Structure to Pixels',
        authenticContext:
          'A malformed volunteer notice still looks plausible in the browser. Predict the browser recovery, compare saved source with the constructed DOM, and trace how structure becomes layout and paint.',
        retainedPractice:
          'Retrieve both load journeys and locate exactly where browser parsing begins after bytes arrive.',
        learnerArtifact:
          'A source-to-pixels evidence chain with separate source, DOM, accessibility, style, layout, and paint observations.',
      },
      'computer-basics-browser-devtools-concept': {
        title: 'DevTools Evidence Kit: Prove What the Browser Built',
        authenticContext:
          'A teammate claims a temporary Elements-panel edit fixed the shared file. Use multiple DevTools panels to reproduce the issue, isolate the cause, and distinguish an experiment from a saved repair.',
        retainedPractice:
          'Use the rendering pipeline to choose the right evidence panel instead of clicking through tools without a hypothesis.',
        learnerArtifact:
          'A compact defect report containing reproduction steps, panel evidence, root cause, saved-source repair, and verification result.',
      },
      'computer-basics-web-research-verification-concept': {
        title: 'Source Trial: Verify a Web-Platform Claim',
        authenticContext:
          'Conflicting search results disagree about browser behavior. Establish the exact question, inspect the relevant page evidence, compare dates and authority, and confirm the claim in a current primary source.',
        retainedPractice:
          'Reuse DevTools observations as testable facts and use documentation to explain them, keeping observation separate from interpretation.',
        learnerArtifact:
          'A technical decision note with a claim, primary citation, version or date, browser evidence, uncertainty, and final recommendation.',
      },
      'mapped-lecture-understanding-computer-internet-and-tooling-basics': {
        title: 'Incident Room: Explain the Page Without Hand-Waving',
        authenticContext:
          'A new volunteer gives five plausible but incompatible explanations for how an emergency notice reached the screen. Classify each responsibility and rebuild one defensible end-to-end account.',
        retainedPractice:
          'Retrieve all six foundation models from memory, then compare the explanation against a changed incident rather than the earlier examples.',
        learnerArtifact:
          'A narrated incident timeline whose claims are tagged as observed, inferred, or verified from documentation.',
      },
      'mapped-lecture-working-with-file-systems': {
        title: 'Filesystem Dispatch: Repair a Broken Project Handoff',
        authenticContext:
          'A zipped resource site arrives with nested duplicate folders, hidden extensions, case mismatches, and absolute local paths. Triage the handoff so another learner can move and open it safely.',
        retainedPractice:
          'Keep system responsibilities and local-versus-network loading visible while diagnosing the filesystem layer.',
        learnerArtifact:
          'A cleaned handoff tree, path test matrix, and reproducible checklist for moving the project to a different folder.',
      },
      'mapped-lecture-browsing-the-web-effectively': {
        title: 'Research Sprint: Find, Judge, and Test Web Guidance',
        authenticContext:
          'A bug report cites an undated tutorial, a forum answer, and a standards page. Decide which claims can guide a repair, run a focused browser test, and document what remains uncertain.',
        retainedPractice:
          'Combine targeted searching with file, network, rendering, and DevTools evidence instead of treating search rank as proof.',
        learnerArtifact:
          'A source-quality matrix and a browser-backed recommendation that another developer can independently reproduce.',
      },
      'mapped-review-computer-basics': {
        title: 'Cold-Case Review: Diagnose Three Similar Failures',
        authenticContext:
          'Three reports all say the page is broken, but one is a path failure, one is a network response failure, and one is browser parsing recovery. Diagnose each from sparse evidence without rereading notes first.',
        retainedPractice:
          'Use spaced retrieval to discriminate between mechanisms that share the same visible symptom.',
        learnerArtifact:
          'Three concise diagnoses, each naming the responsible layer, rejected alternatives, and the next evidence to collect.',
      },
      'mapped-quiz-computer-basics': {
        title: 'Foundation Checkpoint: Defend the Evidence',
        authenticContext:
          'Respond to varied scenarios that require prediction, evidence selection, ordering, and misconception correction across the entire foundation module.',
        retainedPractice:
          'Retrieve every foundation competency under reduced support and explain why tempting distractors fail.',
        learnerArtifact:
          'A scored checkpoint with competency-level feedback and a targeted correction set for any unstable model.',
      },
      'computer-basics-faded-build': {
        title: 'Notice Pipeline Workshop: Repair, Trace, and Verify',
        authenticContext:
          'Take over a partially working repair-clinic notice. Guidance fades while you organize files, explain its loading path, inspect browser recovery, correct source, and verify the result.',
        retainedPractice:
          'Coordinate all earlier tools and explanations while prompts progressively stop naming the required evidence panel or layer.',
        learnerArtifact:
          'A portable repaired notice plus a trace log that connects every change to observed browser evidence.',
      },
      'computer-basics-transfer-lab': {
        title: 'Independent Transfer: Publish an Evacuation Resource Card',
        authenticContext:
          'A neighborhood coordinator needs one dependable offline-and-online resource card before a weather emergency. Plan the folder, build the document, test both load paths, diagnose defects, and justify technical decisions without a recipe.',
        retainedPractice:
          'Transfer the full foundation model to an unfamiliar public-safety context with no panel, path, or source choices supplied.',
        learnerArtifact:
          'A portable resource-card project, local-and-network test record, browser evidence packet, and cited verification note.',
      },
    },
  },
};

const modules = [];
const plannedActivityIds = new Set();
let priorModuleId = null;
let priorAnchor = null;

for (const [moduleIndex, moduleId] of moduleOrder.entries()) {
  const moduleReference = moduleReferences.get(moduleId);
  if (!moduleReference) throw new Error(`Reference module missing: ${moduleId}`);
  const spec = specs[moduleId];
  const ownSkillIds = spec?.skills.map((competency) => competency.id) ?? [];
  const activeSkillIds = ownSkillIds.length ? ownSkillIds : reuseSpecs[moduleId];
  if (!activeSkillIds?.length) throw new Error(`No competency mapping for ${moduleId}`);
  const context =
    spec?.context ??
    `Integrate prior competencies in a cumulative ${moduleReference.type === 'cert-project' ? 'certification project' : 'review and assessment'}.`;
  const activities = [];
  const retainedId = priorAnchor ?? activeSkillIds[0];

  if (ownSkillIds.length) {
    let conceptAnchor = priorAnchor;
    for (const competencyId of ownSkillIds) {
      const competency = allCompetencies.find((entry) => entry.id === competencyId);
      const id = `${moduleId}-${competencyId}-concept`;
      activities.push({
        id,
        title: `${spec.title}: ${competency.statement}`,
        kind: 'theory',
        authenticContext: `${context} Learners predict behavior, inspect evidence, and apply this single new idea to the cumulative artifact.`,
        coverage: mergeCoverage([
          { competencyId, stages: ['I'] },
          ...(conceptAnchor ? [{ competencyId: conceptAnchor, stages: ['R'] }] : []),
        ]),
        estimatedMinutes: 18,
      });
      plannedActivityIds.add(id);
      conceptAnchor = competencyId;
    }
  }

  for (const block of moduleReference.blocks) {
    const id = `mapped-${block.slug}`;
    const stages = stageForBlock(block.type, moduleReference.type);
    const coverage = activeSkillIds.map((competencyId) => ({ competencyId, stages }));
    if (retainedId && !activeSkillIds.includes(retainedId)) {
      coverage.push({ competencyId: retainedId, stages: ['R'] });
    }
    activities.push({
      id,
      title: `${titleCase(block.slug)} — original mapped ${block.type}`,
      kind: activityKind(block.type, moduleReference.type),
      authenticContext: `${context} This activity is an original scenario mapped to reference block ${block.slug}.`,
      coverage: mergeCoverage(coverage),
      estimatedMinutes: Math.max(8, Math.min(180, block.challengeCount * 3)),
      reference: {
        upstreamBlock: block.slug,
        upstreamType: block.type,
        upstreamChallengeCount: block.challengeCount,
      },
    });
    plannedActivityIds.add(id);
  }

  if (ownSkillIds.length) {
    const presentStages = new Map(ownSkillIds.map((id) => [id, new Set()]));
    activities.forEach((activity) => {
      activity.coverage.forEach((entry) => {
        if (presentStages.has(entry.competencyId)) {
          entry.stages.forEach((stage) => {
            presentStages.get(entry.competencyId).add(stage);
          });
        }
      });
    });
    for (const stage of ['G', 'F', 'R', 'A', 'T']) {
      const missingSkills = ownSkillIds.filter((id) => !presentStages.get(id).has(stage));
      if (!missingSkills.length) continue;
      const [suffix, title, kind] = stageNames[stage];
      const id = `${moduleId}-${suffix}`;
      activities.push({
        id,
        title: `${spec.title}: ${title}`,
        kind,
        authenticContext: `${context} Learners ${stage === 'T' ? 'solve a new stakeholder problem without a recipe' : 'revisit the same competencies with deliberately changed guidance'}.`,
        coverage: mergeCoverage([
          ...missingSkills.map((competencyId) => ({ competencyId, stages: [stage] })),
          ...(retainedId ? [{ competencyId: retainedId, stages: ['R'] }] : []),
        ]),
        estimatedMinutes: stage === 'T' ? 75 : 25,
      });
      plannedActivityIds.add(id);
    }
  }

  const authoredPlan = authoredModulePlans[moduleId];
  for (const activity of activities) {
    const authored = authoredPlan?.activities[activity.id];
    if (!authored) continue;
    activity.title = authored.title;
    activity.authenticContext = authored.authenticContext;
  }

  modules.push({
    id: moduleId,
    title: spec?.title ?? reuseTitles[moduleId] ?? titleCase(moduleId),
    order: moduleIndex + 1,
    prerequisiteModuleIds: priorModuleId ? [priorModuleId] : [],
    objectives: authoredPlan?.objectives ?? [
      ownSkillIds.length
        ? `Demonstrate every ${spec.title.toLowerCase()} competency through explanation, guided practice, independent transfer, and retained-skill checks.`
        : `Integrate and verify prior competencies in an independent ${moduleReference.type === 'cert-project' ? 'certification project' : 'cumulative assessment'}.`,
    ],
    activities,
    reference: {
      upstreamModule: moduleId,
      upstreamType: moduleReference.type,
      upstreamBlocks: moduleReference.blocks.length,
    },
  });

  priorModuleId = moduleId;
  priorAnchor = activeSkillIds.at(-1);
}

const introducedCompetencies = new Set();
for (const module of modules) {
  for (const activity of module.activities) {
    const authored = authoredModulePlans[module.id]?.activities[activity.id];
    const coveredIds = activity.coverage.map((entry) => entry.competencyId);
    const newCompetencyIds = activity.coverage
      .filter((entry) => entry.stages.includes('I'))
      .map((entry) => entry.competencyId);
    const buildsOnCompetencyIds = coveredIds.filter((id) => introducedCompetencies.has(id));
    activity.learningDesign = {
      buildsOnCompetencyIds,
      newCompetencyIds,
      retainedPractice:
        authored?.retainedPractice ??
        (buildsOnCompetencyIds.length
          ? `Retrieve and correctly reuse ${buildsOnCompetencyIds.join(', ')} in the changed scenario before adding new complexity.`
          : 'Establish the first observable foundation that every later activity will retrieve and extend.'),
      learnerArtifact:
        authored?.learnerArtifact ??
        `Produce a testable increment for ${activity.title} and attach the evidence used to verify it.`,
      supportLevel:
        activity.kind === 'theory'
          ? 'modeled'
          : activity.coverage.some(
                (entry) => entry.stages.includes('T') || entry.stages.includes('A')
              )
            ? 'independent'
            : activity.coverage.some((entry) => entry.stages.includes('F'))
              ? 'faded'
              : 'guided',
    };
    newCompetencyIds.forEach((id) => {
      introducedCompetencies.add(id);
    });
  }
}

const projects = [
  {
    id: 'community-needs-survey',
    title: 'Community Needs Survey',
    stakeholder: 'A neighborhood learning cooperative planning free workshops',
    userNeed:
      'Residents need an understandable, private, keyboard-friendly way to express schedules and learning needs.',
    constraints: [
      'Works at 320 CSS pixels and 400 percent zoom',
      'Uses native form semantics and useful validation',
      'Explains data use and avoids unnecessary collection',
    ],
    competencyIds: reuseSpecs['lab-survey-form'],
    rubricDimensions: [
      'Semantic data collection',
      'Accessible error recovery',
      'Responsive content hierarchy',
      'Ethical form design',
    ],
  },
  {
    id: 'volunteer-shift-deck',
    title: 'Volunteer Shift Planning Deck',
    stakeholder: 'A mutual-aid coordinator assigning time-sensitive volunteer roles',
    userNeed:
      'Volunteers need scannable role cards that reflow and remain understandable without visual ordering.',
    constraints: [
      'Source order matches reading order',
      'All states use more than color',
      'Cards support long translated content',
    ],
    competencyIds: reuseSpecs['lab-page-of-playing-cards'],
    rubricDimensions: [
      'Flexible layout reasoning',
      'State communication',
      'Content resilience',
      'Visual hierarchy',
    ],
  },
  {
    id: 'accessible-resource-inventory',
    title: 'Accessible Resource Inventory',
    stakeholder: 'A library team tracking devices available for community borrowing',
    userNeed:
      'Staff and patrons need to compare availability, condition, and access features on narrow and wide screens.',
    constraints: [
      'Preserves row and column relationships',
      'Supports keyboard and zoom',
      'Exposes status in text and attributes',
    ],
    competencyIds: reuseSpecs['lab-book-inventory-app'],
    rubricDimensions: [
      'Data-table semantics',
      'Attribute-driven state',
      'Responsive overflow',
      'Access verification',
    ],
  },
  {
    id: 'developer-field-manual',
    title: 'Developer Field Manual',
    stakeholder: 'A support engineering team onboarding new technicians',
    userNeed:
      'Technicians need linkable instructions, code examples, and navigation that works during incidents on any device.',
    constraints: [
      'Five or more linkable technical sections',
      'Sticky navigation never obscures targets',
      'Code and prose remain readable at zoom',
    ],
    competencyIds: reuseSpecs['lab-technical-documentation-page'],
    rubricDimensions: [
      'Information architecture',
      'Responsive navigation',
      'Technical readability',
      'Keyboard access',
    ],
  },
  {
    id: 'ethical-learning-product-launch',
    title: 'Ethical Learning Product Launch',
    stakeholder: 'A nonprofit releasing a free practice tool for adult learners',
    userNeed:
      'Prospective learners need an honest value proposition, evidence, media demonstration, and low-friction interest form.',
    constraints: [
      'No manipulative urgency or false claims',
      'Responsive media and layout',
      'Accessible form, navigation, motion, and contrast',
    ],
    competencyIds: reuseSpecs['lab-product-landing-page'],
    rubricDimensions: [
      'User-centered communication',
      'Responsive system quality',
      'Accessible interaction',
      'Performance and motion discipline',
    ],
  },
];

const blueprint = {
  schemaVersion: 1,
  id: 'responsive-web-design',
  title: 'Responsive Web Design: Build for Everyone',
  version: '2.0.0',
  status: 'audit-required',
  researchedAt: '2026-07-13T00:00:00.000Z',
  audience: {
    description:
      'True beginners and returning developers who need a complete path from computer and browser foundations to independently designed, accessible, responsive interfaces.',
    entryKnowledge: [
      'Operate a keyboard or equivalent input, open a browser, and follow plain-language file instructions.',
    ],
    deviceConstraints: [
      'Learners may use a mobile, tablet, laptop, or desktop browser with intermittent connectivity.',
    ],
    accessibilityAssumptions: [
      'Learners may use keyboard-only input, zoom, reduced motion, forced colors, screen readers, or cognitive supports.',
    ],
  },
  pathways: {
    prerequisiteCourseIds: [],
    placementEvidence: [
      'Demonstrate basic keyboard or equivalent input, browser navigation, and local file handling in a short accessible setup task.',
    ],
    completionEvidence: [
      'Complete and defend all five cumulative stakeholder projects with responsive and accessibility evidence.',
      'Pass the cumulative certification examination at or above 80 percent in unfamiliar changed cases.',
    ],
  },
  scope: {
    includes: [
      'Computer and browser foundations',
      'Semantic HTML and media',
      'Forms and data tables',
      'HTML and CSS accessibility',
      'Cascade and visual design',
      'Flexbox and Grid',
      'Responsive systems and media',
      'Custom properties, effects, and motion',
      'Debugging and five cumulative certification projects',
    ],
    excludes: [
      'JavaScript application logic beyond understanding embedded behavior',
      'Backend services and production deployment pipelines',
      'Framework-specific component architecture',
    ],
    nextCourses: ['javascript-basics', 'frontend-libraries'],
  },
  sources: [
    {
      title: 'HTML Living Standard',
      authority: 'standard',
      url: 'https://html.spec.whatwg.org/',
      version: 'Living Standard 2026-07',
      reviewedAt: '2026-07-13',
      scope:
        'HTML syntax, elements, content models, forms, tables, media, and author requirements.',
    },
    {
      title: 'CSS Snapshot 2025',
      authority: 'standard',
      url: 'https://www.w3.org/TR/css-2025/',
      version: '2025',
      reviewedAt: '2026-07-13',
      scope: 'Current stable CSS definition and module status.',
    },
    {
      title: 'Web Content Accessibility Guidelines 2.2',
      authority: 'standard',
      url: 'https://www.w3.org/TR/WCAG22/',
      version: '2.2',
      reviewedAt: '2026-07-13',
      scope: 'Accessibility success criteria and conformance baseline.',
    },
    {
      title: 'ARIA Authoring Practices Guide',
      authority: 'official-docs',
      url: 'https://www.w3.org/WAI/ARIA/apg/',
      version: '2026-07',
      reviewedAt: '2026-07-13',
      scope: 'Accessible names, landmarks, roles, states, keyboard behavior, and widget patterns.',
    },
    {
      title: 'MDN Curriculum',
      authority: 'curriculum-framework',
      url: 'https://developer.mozilla.org/en-US/curriculum/',
      version: '2025-10',
      reviewedAt: '2026-07-13',
      scope: 'Essential beginner front-end competencies and industry relevance cross-check.',
    },
    {
      title: 'Learn Responsive Design',
      authority: 'official-docs',
      url: 'https://web.dev/learn/design/',
      version: '2026-07',
      reviewedAt: '2026-07-13',
      scope:
        'Modern responsive layout, media, typography, accessibility, and user preference coverage.',
    },
    {
      title: 'freeCodeCamp Responsive Web Design v9',
      authority: 'curriculum-framework',
      url: 'https://www.freecodecamp.org/learn/responsive-web-design-v9/',
      version: reference.upstreamCommit,
      reviewedAt: '2026-07-13',
      scope: 'Required parity map for 29 modules, 158 blocks, and 1,553 reference challenges.',
    },
  ],
  competencies: allCompetencies,
  modules,
  projects,
  assessmentBlueprint: {
    masteryThresholdPercent: 80,
    formativeCorrectionPolicy:
      'Failed evidence produces misconception-specific feedback, prerequisite retrieval, smaller corrective practice, and a parallel reassessment before progression.',
    finalExamCompetencyIds: allCompetencies.map((competency) => competency.id),
    minimumQuestionBankSize: 360,
    performanceAssessmentIds: projects.map((project) => project.id),
  },
  spiralPolicy: {
    immediateGuidedUse: true,
    sameModuleFadedUse: true,
    nextRelevantLessonUse: true,
    independentLabUse: true,
    delayedRetrievalUse: true,
    cumulativeProjectUse: true,
  },
  referenceCoverage: {
    sourceCommit: reference.upstreamCommit,
    modules: reference.totals.modules,
    blocks: reference.totals.blocks,
    challenges: reference.totals.challenges,
    everyReferenceBlockMapped:
      modules.flatMap((module) => module.activities).filter((activity) => activity.reference)
        .length === reference.totals.blocks,
  },
};

const output = path.join(process.cwd(), 'blueprints', 'responsive-web-design.json');
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(blueprint, null, 2)}\n`);
console.log(
  `Wrote ${output}: ${allCompetencies.length} competencies, ${modules.length} modules, ${modules.flatMap((module) => module.activities).length} planned activities.`
);
