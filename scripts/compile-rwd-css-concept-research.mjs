// Compile reviewed research definitions into a reproducible evidence artifact.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const stages = ['introduce', 'model', 'guided', 'faded', 'debug', 'retrieve', 'assess', 'transfer'];
const concepts = [];
const finalModule = 'css-independent-project';

function add(
  id,
  title,
  objective,
  moduleId,
  prerequisiteIds,
  sourceId,
  locator,
  claim,
  misconception,
  evidenceRequirements,
  retainedInModuleIds = [finalModule]
) {
  concepts.push({
    id,
    title,
    objective,
    order: concepts.length + 1,
    moduleId,
    prerequisiteIds,
    sourceAnchors: [{ sourceId, locator, claim }],
    misconceptions: [misconception],
    evidenceRequirements,
    stages,
    retainedInModuleIds,
    currentState: 'researched-not-authored',
  });
}

add(
  'css-source-preview-loop',
  'CSS source, computed output, and saved state',
  'Connect a declaration edited in a stylesheet to matched rules, computed values, rendered output, saved source, and the last passing artifact checkpoint.',
  'css-language-and-cascade',
  [],
  'rwd-mdn-css-fundamentals',
  '3.1 Basic CSS syntax and 3.10 Debugging CSS',
  'CSS learning begins with applying rules and inspecting the browser evidence that results.',
  'A visually changed preview proves the intended declaration matched, won the cascade, and saved correctly.',
  [
    'Learner must change one declaration, identify the matched rule and computed result, then prove the edit survives reload.',
    'A rejected near-miss must distinguish invalid syntax, unmatched selector, overridden value, unsupported value, and unsaved source.',
  ],
  ['css-boxes-and-sizing', finalModule]
);

add(
  'css-purpose-and-boundary',
  'CSS purpose and document boundary',
  'Explain and preserve the division between semantic HTML content and CSS presentation while recognizing browser and user style contributions.',
  'css-language-and-cascade',
  ['css-source-preview-loop'],
  'rwd-mdn-css-fundamentals',
  '3.1 purpose, browser styles, and applying CSS',
  'CSS provides presentation and layout while semantic HTML remains meaningful without author styling.',
  'Element choice is a styling decision, so generic elements with classes are always preferable to semantic HTML.',
  [
    'Learner must classify changed requirements as semantic structure, presentation, behavior, or user preference before editing.',
    'The styled artifact must retain a logical document and usable task path when author styles are disabled.',
  ]
);

add(
  'css-rule-declaration-anatomy',
  'Rules, declarations, properties, and values',
  'Author and label selectors, declaration blocks, declarations, properties, values, terminators, comments, and at-rules without conflating their roles.',
  'css-language-and-cascade',
  ['css-purpose-and-boundary'],
  'rwd-css-syntax-three',
  'Sections 2, 2.2, and 8: syntax, error handling, style rules, and at-rules',
  'CSS syntax separates qualified rules, at-rules, selectors, declaration blocks, declarations, properties, and values and defines bounded parser recovery.',
  'A property-value pair anywhere in a stylesheet is a complete rule and will apply globally.',
  [
    'Learner must annotate valid and malformed rule anatomy and predict the parser recovery boundary.',
    'An unfamiliar property requirement must be expressed as a valid declaration inside an intentionally targeted rule.',
  ]
);

add(
  'css-application-and-loading',
  'External, internal, and inline CSS loading',
  'Choose and verify an external stylesheet, bounded internal style block, or inline declaration based on reuse, cache, ownership, cascade, and maintenance constraints.',
  'css-language-and-cascade',
  ['css-rule-declaration-anatomy'],
  'rwd-mdn-css-fundamentals',
  '3.1 applying CSS to an HTML document',
  'MDN distinguishes inline, internal, and external application and identifies external stylesheets as the usual maintainable choice.',
  'A linked stylesheet can be assumed loaded when its filename appears in HTML source.',
  [
    'Learner must use network and CSS inspection evidence to diagnose a changed path, MIME, or load-order failure.',
    'Learner must justify the chosen application method for a changed multi-page reuse requirement.',
  ]
);

add(
  'css-type-class-id-selectors',
  'Universal, type, class, and ID selectors',
  'Select all elements or select by type, reusable class, or unique identifier while keeping hooks proportional to semantic and reuse needs.',
  'css-language-and-cascade',
  ['css-application-and-loading'],
  'rwd-selectors-four',
  'Sections 5.1, 6.1, and 8.3: type, class, and ID selectors',
  'Universal, type, class, and ID selectors have distinct matching semantics and specificity contributions.',
  'The universal selector is harmless as a default styling hook, and every other styled element needs a unique ID because classes cannot safely repeat.',
  [
    'Changed markup must match only the intended set without an accidental universal reset or redundant hooks on every element.',
    'Learner must explain why a type, class, or ID hook is the least-coupled choice for an unfamiliar requirement.',
  ]
);

add(
  'css-selector-lists-combinators',
  'Selector lists and relationships',
  'Use selector lists and descendant, child, adjacent-sibling, and general-sibling combinators to express exact document relationships.',
  'css-language-and-cascade',
  ['css-type-class-id-selectors'],
  'rwd-selectors-four',
  'Sections 4.1, 15, and 16: selector lists and combinators',
  'Selector lists group complex selectors while combinators encode descendant, child, sibling, and column relationships.',
  'A comma and a space both mean that either selector may match any descendant.',
  [
    'Learner must predict the complete matched set for a changed nested document before running it.',
    'A relationship bug must be repaired without broadening the selector to unrelated siblings or descendants.',
  ]
);

add(
  'css-attribute-selectors',
  'Attribute selectors and matching operators',
  'Match attribute presence and bounded exact, token, prefix, suffix, and substring values without confusing semantic state with text coincidence.',
  'css-language-and-cascade',
  ['css-type-class-id-selectors'],
  'rwd-mdn-css-fundamentals',
  '3.2 attribute selectors',
  'Attribute selectors provide several distinct presence and value-matching contracts.',
  'Substring matching is the safest default because it finds every intended attribute value variation.',
  [
    'Changed attributes containing similar but non-equivalent text must separate exact, token, and substring matches.',
    'Learner must choose an operator whose accepted and rejected values align with the actual attribute contract.',
  ]
);

add(
  'css-pseudo-classes',
  'State and structural pseudo-classes',
  'Style interaction, form, target, language, and structural states using pseudo-classes without replacing persistent semantics or behavior.',
  'css-language-and-cascade',
  ['css-selector-lists-combinators'],
  'rwd-selectors-four',
  'Sections 3.5 and 8 through 14: pseudo-classes',
  'Pseudo-classes select elements by state, structure, interaction, language, location, and other defined relationships.',
  'A pseudo-class adds the underlying state or interaction behavior that its selector name describes.',
  [
    'Keyboard, pointer, validation, target, and changed-structure cases must activate only their intended styles.',
    'Learner must diagnose a state that never exists rather than forcing appearance with an always-matching class.',
  ]
);

add(
  'css-pseudo-elements',
  'Pseudo-elements and generated presentation',
  'Use pseudo-elements for bounded presentational fragments while keeping required content, names, controls, and task information in the document.',
  'css-language-and-cascade',
  ['css-pseudo-classes'],
  'rwd-selectors-four',
  'Sections 3.6 and 19: pseudo-elements',
  'Pseudo-elements represent tree-abiding or other element fragments for selector matching rather than adding semantic document nodes.',
  'Text inserted with generated content is an equivalent accessible replacement for required HTML labels and instructions.',
  [
    'The artifact must remain understandable when generated content is unavailable or ignored by assistive technology.',
    'Learner must distinguish decorative use from task-critical content in changed examples.',
  ]
);

add(
  'css-list-markers-counters',
  'List markers, counters, and retained semantics',
  'Style marker position, type, image, pseudo-element, and counters while preserving list relationships, readable numbering, and fallback meaning.',
  'css-language-and-cascade',
  ['css-pseudo-elements', 'css-selector-lists-combinators'],
  'rwd-webdev-css',
  'Lists module',
  'List boxes expose marker styling and counters without requiring authors to replace semantic list structure.',
  'Removing list style also removes list semantics in every browser and assistive-technology combination.',
  [
    'Ordered, unordered, nested, reversed, start-value, long-marker, and styles-disabled cases must retain understandable relationships and numbering.',
    'Learner must choose native markers, counters, or generated decoration based on semantic order and fallback evidence.',
  ]
);

add(
  'css-inheritance-initial-unset-revert',
  'Inheritance and global values',
  'Predict inherited and non-inherited computed values and deliberately use initial, inherit, unset, or revert without treating them as synonyms.',
  'css-language-and-cascade',
  ['css-rule-declaration-anatomy'],
  'rwd-css-cascade-five',
  'Sections 4 and 7: value processing, inheritance, and explicit defaulting',
  'Properties differ in inheritance behavior, and initial, inherit, unset, revert, and revert-layer select different value sources.',
  'Every CSS property inherits from the nearest ancestor unless a child rule overrides it.',
  [
    'Learner must predict computed parent and descendant values after each global keyword in a changed property case.',
    'A component reset must preserve intentional user-agent behavior while removing only the unwanted inherited or authored value.',
  ]
);

add(
  'css-cascade-origins-importance-order',
  'Cascade origins, importance, and order',
  'Trace competing declarations through relevance, origin, importance, layer, specificity, scoping proximity, and order to identify the winner.',
  'css-language-and-cascade',
  ['css-inheritance-initial-unset-revert'],
  'rwd-css-cascade-five',
  'Section 6.1: cascade sorting order',
  'The cascade resolves conflicts through relevance, origin and importance, encapsulation, style attributes, layers, specificity, scope, and order rather than source order alone.',
  'The last declaration always wins, including against user preferences and important declarations.',
  [
    'Learner must produce a complete winner trace for author, user, animation, transition, important, and order changes.',
    'A repair must lower conflict complexity instead of appending a stronger selector or indiscriminate important flag.',
  ]
);

add(
  'css-specificity-functional-selectors',
  'Specificity and functional selectors',
  'Calculate and compare specificity for compound selectors and :is(), :not(), :has(), and :where() while avoiding escalation as an architecture strategy.',
  'css-language-and-cascade',
  ['css-cascade-origins-importance-order'],
  'rwd-selectors-four',
  'Sections 4 and 17: logical combinations and specificity',
  'Specificity compares ID, class-like, and type-like columns, while :is(), :not(), :has(), and :where() have deliberately different contribution rules.',
  'Specificity is a decimal point score, so enough type selectors eventually outweigh one class or ID.',
  [
    'Learner must compare changed selectors without converting specificity columns into a base-ten total.',
    'A component override must remain predictable after a new state selector is introduced.',
  ]
);

add(
  'css-cascade-layers-scope',
  'Cascade layers and bounded overrides',
  'Organize reset, base, component, utility, and exception styles with explicit layer order and bounded scoping instead of specificity contests.',
  'css-language-and-cascade',
  ['css-specificity-functional-selectors'],
  'rwd-css-cascade-five',
  'Section 6.4: cascade layers',
  'Cascade layers provide explicit origin-local priority architecture separate from selector specificity within each layer.',
  'A more specific selector in a lower-priority layer always beats a simple selector in a higher-priority layer.',
  [
    'Learner must predict an unlayered, layered, normal, and important conflict after layer order changes.',
    'A third-party style integration must be overridden through declared architecture without editing vendor source.',
  ]
);

add(
  'css-custom-properties-fallbacks',
  'Custom properties, substitution, and fallbacks',
  'Define and consume scoped custom properties with valid fallback behavior while distinguishing token substitution from ordinary typed property validation.',
  'css-language-and-cascade',
  ['css-inheritance-initial-unset-revert'],
  'rwd-webdev-css',
  'Custom properties module',
  'Custom properties participate in cascade and inheritance, then substitute into consuming declarations.',
  'A declared custom property is guaranteed valid for every property where var() inserts it.',
  [
    'Changed invalid, missing, inherited, and locally overridden tokens must yield the predicted computed values.',
    'Learner must design a fallback chain that survives one missing theme token without hiding unrelated errors.',
  ],
  ['css-type-color-and-design', 'responsive-systems', finalModule]
);

add(
  'css-link-state-sequence',
  'Link states and state distinguishability',
  'Style unvisited, visited, hover, focus-visible, and active link states in cascade-safe order without exposing history, removing affordance, or relying on color alone.',
  'css-language-and-cascade',
  ['css-pseudo-classes', 'css-cascade-origins-importance-order'],
  'rwd-selectors-four',
  'Sections 8.2 through 8.4 and 17: link, visited, local-link, and specificity',
  'Link states participate in selector matching and the cascade while visited-state styling is deliberately privacy constrained.',
  'Visited links may reveal any computed property and can use generated content to show a user where they browsed.',
  [
    'Keyboard, pointer, visited, unvisited, active, forced-color, and changed-background cases must retain link identity and focus evidence.',
    'Learner must trace a state conflict through cascade order and repair it without disabling another input path.',
  ]
);

add(
  'css-outer-inner-display',
  'Outer and inner display behavior',
  'Predict how block, inline, inline-block, flow-root, flex, grid, and none affect outer participation, inner formatting, and accessibility exposure.',
  'css-boxes-and-sizing',
  ['css-rule-declaration-anatomy'],
  'rwd-css-display-three',
  'Sections 2 and 3: box layout modes and the display property',
  'Display values control outer participation, inner formatting context, and box generation; legacy inline-block maps to inline flow-root.',
  'Changing an element to display block also changes its HTML meaning and accessible role.',
  [
    'Learner must predict sibling flow and child formatting for changed outer and inner display combinations.',
    'A hidden-state implementation must distinguish visually absent, non-rendered, and accessibility-hidden requirements.',
  ]
);

add(
  'css-box-model-areas',
  'Content, padding, border, and margin areas',
  'Calculate and inspect content, padding, border, and margin boxes while separating painted area from spacing and hit testing.',
  'css-boxes-and-sizing',
  ['css-outer-inner-display'],
  'rwd-mdn-css-fundamentals',
  '3.3 the box model',
  'The block box model contains distinct content, padding, border, and margin areas.',
  'Margin is part of the painted element background and reliably enlarges its pointer target.',
  [
    'Learner must calculate outer dimensions and identify the painted and clickable regions after changed values.',
    'DevTools evidence must locate an unexpected gap in the correct box area before repair.',
  ]
);

add(
  'css-box-sizing-models',
  'Content-box and border-box sizing',
  'Predict declared and rendered sizes under content-box and border-box, including padding, borders, minimums, maximums, and intrinsic constraints.',
  'css-boxes-and-sizing',
  ['css-box-model-areas'],
  'rwd-mdn-css-fundamentals',
  '3.3 alternative box model',
  'Border-box includes border and padding inside the declared box size while content-box does not.',
  'Border-box forces every element to remain at the declared width even when its contents have a larger minimum size.',
  [
    'Learner must compute both models and explain a remaining overflow caused by content rather than arithmetic.',
    'A changed component with thicker borders must retain its intended outer constraint without clipping content.',
  ]
);

add(
  'css-margin-collapse-formatting-contexts',
  'Margin collapse and formatting contexts',
  'Diagnose adjoining block margin collapse and choose spacing or a new formatting context based on layout intent instead of accidental containment.',
  'css-boxes-and-sizing',
  ['css-box-model-areas', 'css-outer-inner-display'],
  'rwd-mdn-css-fundamentals',
  '3.3 margin collapsing',
  'Vertical block margins can collapse under defined relationships, while new formatting contexts change that behavior.',
  'Two vertical margins always add together, so the gap is their sum.',
  [
    'Learner must predict parent-child and sibling margin outcomes for positive, zero, and negative changed cases.',
    'The repair must preserve intended flow rather than adding arbitrary padding to mask the observed gap.',
  ]
);

add(
  'css-intrinsic-extrinsic-sizing',
  'Intrinsic and extrinsic sizing',
  'Choose content-based, available-space, fixed, minimum-content, maximum-content, and fit-content sizing from actual constraints.',
  'css-boxes-and-sizing',
  ['css-box-sizing-models'],
  'rwd-webdev-css',
  'Sizing module',
  'CSS sizing combines intrinsic content contributions with externally imposed constraints.',
  'Every reliable layout needs explicit width and height values for all components.',
  [
    'Long, short, replaced, and empty content cases must produce predicted intrinsic sizes without magic numbers.',
    'Learner must choose a sizing mode that remains usable when container space and content length both change.',
  ]
);

add(
  'css-absolute-font-relative-viewport-units',
  'Absolute, font-relative, and viewport units',
  'Select px, physical units, em, rem, ch, cap, viewport, and dynamic viewport units according to the quantity and user adaptation required.',
  'css-boxes-and-sizing',
  ['css-intrinsic-extrinsic-sizing'],
  'rwd-css-values-four',
  '5.5 percentages; 6 distance units',
  'Length units represent different reference frames; CSS px is a reference-pixel unit, font-relative lengths resolve from defined font metrics, and default viewport units use the large viewport.',
  'Pixels are physical screen pixels, so a pixel length has the same physical size on every display and zoom level.',
  [
    'Learner must predict changed root font, local font, zoom, and viewport effects for each selected unit.',
    'A sizing choice must be defended by its reference frame rather than by visual coincidence at one viewport.',
  ]
);

add(
  'css-percentages-containing-blocks',
  'Percentages and containing blocks',
  'Resolve percentage values against the correct reference size and explain indefinite-size cases where a percentage cannot behave as expected.',
  'css-boxes-and-sizing',
  ['css-absolute-font-relative-viewport-units'],
  'rwd-css-values-four',
  '5.5 percentages and percentage-dimension mixes',
  'Percentage resolution depends on the property, containing block, writing mode, and whether the reference size is definite.',
  'Every percentage in CSS is calculated from the viewport width.',
  [
    'Learner must identify the reference dimension for width, height, margin, padding, and transform percentage cases.',
    'An indefinite-height failure must be repaired by changing the layout constraint rather than guessing a new percentage.',
  ]
);

add(
  'css-calculated-value-math',
  'Calculated values and compatible-unit math',
  'Use calc() arithmetic only where the property accepts the resulting numeric type, preserve required operator whitespace, and predict results after percentage references and relative units change.',
  'css-boxes-and-sizing',
  ['css-percentages-containing-blocks'],
  'rwd-css-values-four',
  '10 mathematical expressions and 10.1 calc()',
  'CSS calculation validity follows numeric type algebra: compatible sums can mix resolved percentages and dimensions, multiplication needs a unitless factor for a length result, and division must produce a type accepted by the property.',
  'calc() can combine any written units, and adding the numbers always produces a valid length.',
  [
    'Learner must predict valid, invalid, computed, and changed-reference cases before inspecting rendered output.',
    'A repair must explain the result type, percentage basis, operator precedence, required whitespace, and property grammar instead of merely changing literals until the declaration parses.',
  ]
);

add(
  'css-min-max-clamp-functions',
  'Minimum, maximum, and fluid value functions',
  'Compose min(), max(), clamp(), min-content, max-content, and minmax() to express bounded fluid constraints with defensible extremes.',
  'css-boxes-and-sizing',
  ['css-intrinsic-extrinsic-sizing', 'css-calculated-value-math'],
  'rwd-webdev-css',
  'Functions and sizing modules',
  'Modern CSS functions can encode lower, preferred, and upper constraints without many discrete breakpoints.',
  'Clamp chooses the middle written argument even when it falls outside the minimum and maximum.',
  [
    'Learner must calculate changed low, middle, and high input cases and identify the active constraint.',
    'A fluid size must remain within explicit readability or interaction bounds under zoom and container changes.',
  ]
);

add(
  'css-overflow-containment-scroll',
  'Overflow, clipping, and scrolling',
  'Preserve access to overflowing content by distinguishing visible, hidden, clip, auto, and scroll behavior on each logical axis.',
  'css-boxes-and-sizing',
  ['css-intrinsic-extrinsic-sizing'],
  'rwd-mdn-css-fundamentals',
  '3.8 overflow',
  'Overflow is a content-and-constraint signal whose handling can expose, clip, or create scrolling mechanisms.',
  'Overflow hidden safely fixes any layout problem because users only need content that fits the box.',
  [
    'Long words, zoom, enlarged text, focus targets, and dynamic errors must remain reachable in changed cases.',
    'Learner must locate the root size constraint before choosing whether local scrolling is actually part of the requirement.',
  ]
);

add(
  'css-logical-properties-writing-modes',
  'Logical properties and writing directions',
  'Use block, inline, start, and end properties so spacing, sizing, position, and borders survive writing-direction and writing-mode changes.',
  'css-boxes-and-sizing',
  ['css-box-model-areas'],
  'rwd-webdev-css',
  'Logical properties module',
  'Logical properties map intent to flow-relative axes instead of assuming left-to-right horizontal text.',
  'Inline-start always means the physical left edge, including right-to-left and vertical writing.',
  [
    'The component must preserve semantic start and end relationships under LTR, RTL, and vertical changed cases.',
    'Learner must replace physical properties only where the requirement is flow-relative and retain physical ones where intentional.',
  ]
);

add(
  'css-backgrounds-borders-shadows',
  'Background layers, borders, radii, and shadows',
  'Compose background layers, border geometry, radii, and shadows without encoding required meaning or damaging text contrast and focus visibility.',
  'css-boxes-and-sizing',
  ['css-box-model-areas'],
  'rwd-css-backgrounds-three',
  'Sections 2 through 7: backgrounds, borders, radii, images, and shadows',
  'Backgrounds and borders paint defined box areas and may layer images, colors, clipping, border geometry, radii, and shadows.',
  'A border, shadow, or background color is a reliable sole indicator of state for every user.',
  [
    'Changed backgrounds and high-contrast conditions must preserve required text, state, and focus evidence.',
    'Learner must predict paint order and clipping for multiple layers and rounded corners.',
  ]
);

add(
  'css-transform-reference-boxes',
  'Transforms, coordinate space, and reference boxes',
  'Compose translate, rotate, scale, skew, origin, and transform functions while predicting coordinate order, reference boxes, hit testing, stacking, and layout-flow effects.',
  'css-boxes-and-sizing',
  ['css-box-model-areas', 'css-percentages-containing-blocks'],
  'rwd-webdev-css',
  'Transforms module',
  'Transforms alter rendered coordinate space and composition without changing ordinary flow allocation.',
  'Transform functions execute right-to-left or left-to-right interchangeably because every transform result is independent.',
  [
    'Learner must predict changed function order, origin, percentage reference, overflow, hit region, and sibling-flow evidence.',
    'A visual placement repair must use layout when flow should change and transforms only when transformed rendering is the intended model.',
  ]
);

add(
  'css-font-stacks-generic-fallbacks',
  'Font stacks and generic fallbacks',
  'Build font-family stacks that preserve readable category, glyph coverage, metrics, and system fallback when preferred fonts are absent.',
  'css-type-color-and-design',
  ['css-inheritance-initial-unset-revert'],
  'rwd-webdev-css',
  'Typography module',
  'Font stacks fall through available faces and should end in an appropriate generic family.',
  'Declaring one web font guarantees its file loads and contains every character the page needs.',
  [
    'Missing font, missing glyph, slow load, and platform substitution cases must remain legible and structurally stable.',
    'Learner must justify fallback order using category, language, metrics, and content needs.',
  ]
);

add(
  'css-font-loading-variable-fonts',
  'Web font loading and variable axes',
  'Declare bounded font sources, formats, display behavior, weights, styles, and variable axes while limiting payload and layout shift.',
  'css-type-color-and-design',
  ['css-font-stacks-generic-fallbacks'],
  'rwd-webdev-css',
  'Web fonts and variable fonts coverage',
  'Font loading affects availability, rendering phases, supported styles, payload, and text metrics.',
  'One variable-font file is automatically smaller and faster than every subset of static fonts.',
  [
    'Network-disabled, slow-font, unsupported-format, and missing-weight cases must render usable fallback text.',
    'Learner must compare declared axis range and requested values, then measure payload and layout behavior.',
  ]
);

add(
  'css-type-scale-line-height',
  'Type scale, line height, and rhythm',
  'Set a readable type scale and unitless line heights that adapt through inheritance, zoom, content hierarchy, and component context.',
  'css-type-color-and-design',
  ['css-font-stacks-generic-fallbacks', 'css-absolute-font-relative-viewport-units'],
  'rwd-webdev-css',
  'Typography module',
  'Font size and line height jointly control hierarchy, readability, inheritance, and vertical rhythm.',
  'Line-height should use a fixed pixel value so nested text cannot alter a carefully designed rhythm.',
  [
    'Changed font family, zoom, nested size, and two-line control cases must retain legible spacing without clipping.',
    'Learner must defend scale ratios and line-height bounds from reading and component evidence.',
  ]
);

add(
  'css-readable-measure-alignment',
  'Readable measure and text alignment',
  'Constrain line measure and choose alignment based on reading direction, content length, scanning, and layout rather than screen width alone.',
  'css-type-color-and-design',
  ['css-type-scale-line-height', 'css-intrinsic-extrinsic-sizing'],
  'rwd-webdev-responsive',
  'Typography',
  'Responsive typography includes readable line length, spacing, sizing, and alignment across available space.',
  'Center alignment improves readability for all long-form text because each line has visual symmetry.',
  [
    'Short labels, long prose, narrow containers, and RTL text must use alignment and measure suited to the reading task.',
    'Learner must identify a readability failure from line-start consistency and measure evidence rather than preference.',
  ]
);

add(
  'css-text-wrap-spacing-decoration',
  'Wrapping, spacing, decoration, and overflow text',
  'Control wrapping, word breaking, hyphenation, spacing, decoration, and truncation without hiding content or overriding user text-spacing needs.',
  'css-type-color-and-design',
  ['css-readable-measure-alignment', 'css-overflow-containment-scroll'],
  'rwd-webdev-css',
  'Text and typography modules',
  'Text properties affect wrapping, overflow, decoration, white space, and readability under content variation.',
  'Single-line ellipsis communicates the complete hidden value to every keyboard and assistive-technology user.',
  [
    'Long URLs, unbroken identifiers, translated strings, enlarged spacing, and multi-line labels must remain understandable.',
    'Any truncation must expose the complete value through a task-appropriate accessible interaction or remove the fixed constraint.',
  ]
);

add(
  'css-color-spaces-alpha',
  'Color notation, spaces, and alpha',
  'Choose named, hexadecimal, RGB, HSL, perceptual, and wide-gamut color notation while predicting conversion, gamut mapping, and alpha compositing against changed backgrounds.',
  'css-type-color-and-design',
  ['css-rule-declaration-anatomy'],
  'rwd-css-color-four',
  'Sections 2 through 16: color terminology, syntax, spaces, alpha, interpolation, gamut mapping, resolving, and serialization',
  'CSS Color Level 4 defines legacy and modern color syntax, sRGB and perceptual or predefined spaces, alpha compositing, interpolation, gamut mapping, and resolved values as distinct concerns.',
  'An alpha color has the same visible result regardless of the layers painted behind it.',
  [
    'Learner must compare equivalent and non-equivalent notations, identify the processing space, and calculate changed composited appearance.',
    'A wide-gamut color must be inspected on supported and narrower-gamut output without treating a valid authored value as proof of the displayed result.',
  ]
);

add(
  'css-derived-color-functions',
  'Mixed, relative, and contextual colors',
  'Derive maintainable color variants with color-mix(), relative color syntax, currentColor, and supported contextual functions while choosing an interpolation space and preserving contrast under changed inputs.',
  'css-type-color-and-design',
  ['css-color-spaces-alpha', 'css-calculated-value-math'],
  'rwd-css-color-five',
  'Sections 2 through 4: color mixing, contrast selection status, and relative color syntax',
  'CSS Color Level 5 defines color mixing and relative color processing with explicit normalization, origin colors, component keywords, math, and interpolation-space behavior; draft-only features require separate interoperability evidence.',
  'Mixing two passing palette colors or changing one channel automatically preserves contrast and produces the same visual midpoint in every color space.',
  [
    'Learner must predict and inspect changed color-mix percentages, alpha, interpolation spaces, and hue paths rather than accept a plausible swatch.',
    'Relative variants must trace to their origin and retain required contrast, forced-color behavior, and a usable result when the assessed feature is unavailable in the supported browser matrix.',
  ]
);

add(
  'css-contrast-noncolor-meaning',
  'Contrast and non-color evidence',
  'Verify text, component, focus, and state contrast while providing shape, text, position, or semantics when color alone cannot carry meaning.',
  'css-type-color-and-design',
  ['css-color-spaces-alpha', 'css-backgrounds-borders-shadows'],
  'rwd-wcag-two-two',
  '1.4.1, 1.4.3, 1.4.11, and 2.4.11',
  'WCAG requires contrast and rejects color as the only visual means of conveying required information.',
  'A brand palette that passes one text contrast pair automatically passes borders, icons, focus, gradients, and all interaction states.',
  [
    'Every normal, hover, focus, active, disabled, error, and changed-background state must retain required contrast and non-color evidence.',
    'Learner must measure the actual adjacent colors rather than cite palette names or an ideal screenshot.',
  ]
);

add(
  'css-filter-effects-fallbacks',
  'Filter effects and readable fallbacks',
  'Apply bounded filter and backdrop-filter effects while preserving text, contrast, focus, performance, stacking, and usable fallback output.',
  'css-type-color-and-design',
  ['css-color-spaces-alpha', 'css-contrast-noncolor-meaning', 'css-backgrounds-borders-shadows'],
  'rwd-webdev-css',
  'Filters module',
  'Filter effects alter rendered pixels and may create performance, contrast, and containing or stacking behavior that needs direct evidence.',
  'A blur or opacity filter changes the underlying semantic state and guarantees readable contrast against every backdrop.',
  [
    'Unsupported-filter, forced-color, reduced-transparency, changed-backdrop, focus, and low-performance cases must preserve the complete task.',
    'Learner must measure actual rendered contrast and effect cost, then provide a no-filter fallback rather than encoding meaning in the effect.',
  ]
);

add(
  'css-gradients-background-images',
  'Gradients and presentational images',
  'Build gradients and decorative background images with predictable stops, sizing, repeat, position, and fallback while keeping required content in HTML.',
  'css-type-color-and-design',
  ['css-color-spaces-alpha', 'css-backgrounds-borders-shadows'],
  'rwd-css-images-four',
  'Sections 3 and 4: linear, radial, conic, and repeating gradients, color stops, interpolation methods, and image sizing',
  'CSS Images defines gradients as generated images with geometry, color-stop fixup, interpolation-space behavior, and sizing distinct from flat color values.',
  'A CSS background image receives alternative text from the element content property automatically.',
  [
    'Image-disabled and high-contrast cases must preserve the complete task and text readability.',
    'Learner must predict gradient direction, interpolation region, stop order, and fallback color after changed values.',
  ]
);

add(
  'design-user-needs-task-flows',
  'Evidence-backed user needs and task flows',
  'Derive user needs, constraints, task sequences, failure paths, and acceptance evidence from research rather than designing around personal preference or a fictional typical user.',
  'css-type-color-and-design',
  ['css-purpose-and-boundary'],
  'rwd-govuk-user-needs',
  'Learning about users and their needs',
  'Service design begins with evidence about varied users, desired outcomes, current behavior, barriers, and continuously validated needs.',
  'A designer represents the target audience, so personal preference is sufficient evidence of user needs.',
  [
    'Learner must convert observed or supplied research evidence into need, context, outcome, constraint, and acceptance records without prescribing a solution.',
    'A changed user with disability, language, device, time, or support constraints must alter the task model and design decision where evidence warrants it.',
  ],
  ['responsive-systems', finalModule]
);

add(
  'css-visual-hierarchy-spacing',
  'Composition, balance, scale, hierarchy, proximity, and rhythm',
  'Compose and balance size, weight, spacing, grouping, alignment, imagery, and contrast so semantic hierarchy and task priority remain perceivable without changing reading order.',
  'css-type-color-and-design',
  [
    'design-user-needs-task-flows',
    'css-readable-measure-alignment',
    'css-contrast-noncolor-meaning',
  ],
  'rwd-w3c-coga-usable',
  '4.3 clear purpose and 4.6 clear structure and relationships',
  'Clear visual hierarchy, grouping, labels, structure, and relationships help people locate content, understand context, and recover their place.',
  'The most visually prominent item can appear anywhere in the DOM because CSS establishes the true reading order.',
  [
    'Heading, group, action, image, and error hierarchy must remain clear with styles disabled, changed content, alternate reading direction, and zoom.',
    'Learner must predict attention order, identify visual weight and proximity relationships, and defend each cue against the semantic relationship and user task it supports.',
  ]
);

add(
  'design-prototypes-evaluation-iteration',
  'Prototypes, evaluation, and iterative decisions',
  'Choose low- or high-fidelity prototypes, define research questions and tasks, observe representative use, separate findings from opinion, and revise traceable design decisions.',
  'css-type-color-and-design',
  ['design-user-needs-task-flows', 'css-visual-hierarchy-spacing'],
  'rwd-govuk-user-needs',
  'Planning research, testing ideas, and validating needs through development',
  'Research continues across development phases and uses prototypes plus observed behavior to test assumptions and design ideas.',
  'A polished mockup is validated when stakeholders approve its appearance without representative users completing tasks.',
  [
    'Learner must match prototype fidelity to a bounded research question and record task success, errors, barriers, quotes, and observation limits separately.',
    'A changed finding must trace to keep, revise, reject, or investigate decisions and a planned re-test rather than an unsupported aesthetic change.',
  ],
  ['responsive-systems', finalModule]
);

add(
  'css-design-tokens-theming',
  'Design tokens and theme constraints',
  'Model semantic color, type, spacing, radius, and elevation decisions as scoped tokens while declaring supported color schemes and preserving user preferences.',
  'css-type-color-and-design',
  ['css-custom-properties-fallbacks', 'css-visual-hierarchy-spacing'],
  'rwd-css-color-adjust-one',
  'Sections 2.1 through 2.4: supported, preferred, and used color schemes',
  'Pages must opt into supported color schemes so browser-controlled UI and authored colors resolve coherently without assuming that a user agent can safely recolor arbitrary content.',
  'Tokenizing every literal guarantees a coherent design system even when tokens have no semantic purpose or constraint.',
  [
    'Default, light, dark, high-contrast, forced-color, browser-control, embedded-content, and partial-theme cases must preserve usable semantic roles and contrast.',
    'Learner must consolidate meaningful decisions, expose an understandable preference path, and avoid replacing one unexplained literal with another unexplained token.',
  ]
);

add(
  'design-brief-handoff-artifacts',
  'Evidence-backed design briefs and developer handoff',
  'Turn researched outcomes, content, accessibility needs, constraints, risks, acceptance evidence, decisions, and open questions into a versioned brief and inspectable developer handoff.',
  'css-type-color-and-design',
  ['design-user-needs-task-flows', 'design-prototypes-evaluation-iteration'],
  'rwd-sketch-developer-handoff',
  'Developer handoff, inspect, measurements, assets, variables, components, and versions',
  'Current handoff tools expose inspectable structure, measurements, assets, variables, components, comments, and versions, but those values still require implementation judgment and traceability.',
  'Stakeholder approval turns every visual coordinate into an immutable implementation requirement and resolves all accessibility, responsive, content, state, and failure questions.',
  [
    'Each implemented decision must trace to an outcome, constraint, accepted design-system rule, accessibility requirement, or explicitly recorded assumption rather than pixel imitation.',
    'A changed stakeholder constraint or ambiguous handoff value must produce a versioned question, decision, acceptance update, and re-review instead of silent invention.',
  ],
  ['responsive-systems', finalModule]
);

add(
  'design-progressive-enhancement',
  'Essential baseline and progressive enhancement',
  'Deliver essential content and task behavior in a broadly usable baseline, then add supported layout and interaction enhancements without making the enhancement the only path.',
  'css-type-color-and-design',
  ['css-purpose-and-boundary', 'design-user-needs-task-flows'],
  'rwd-mdn-progressive-enhancement',
  'Baseline content and functionality, feature detection, and accessibility alternatives',
  'Progressive enhancement begins with essential content and functionality for varied user agents and adds richer behavior only where capabilities support it.',
  'Progressive enhancement means reproducing every modern effect in old browsers or blocking the task until all enhancement code loads.',
  [
    'Styles-disabled, script-unavailable, unsupported-feature, slow-resource, preference, and input changes must preserve the bounded essential task and truthful status.',
    'Learner must identify the essential outcome, enhancement boundary, capability evidence, failure behavior, and testing matrix before adding the enhancement.',
  ],
  ['responsive-systems', 'css-interaction-accessibility-and-motion', finalModule]
);

add(
  'design-hierarchical-wayfinding',
  'Hierarchical wayfinding and breadcrumbs',
  'Choose breadcrumbs only for genuine parent-page hierarchy, expose an ordered path in a labelled navigation landmark, and identify the current page without confusing hierarchy with visit history or task progress.',
  'css-type-color-and-design',
  ['design-user-needs-task-flows', 'css-visual-hierarchy-spacing'],
  'rwd-aria-apg',
  'Breadcrumb pattern',
  'An accessible breadcrumb is a labelled navigation landmark containing parent-page links in hierarchical order and an identified current page.',
  'A breadcrumb should reproduce the exact sequence of pages the visitor opened and can replace primary navigation on every site.',
  [
    'Deep-link, short hierarchy, narrow width, zoom, long label, translated label, current-page, and keyboard cases must preserve understandable location and destinations.',
    'Learner must reject breadcrumbs where the information model has no stable parent hierarchy and choose a task-appropriate navigation aid instead.',
  ],
  ['responsive-systems', finalModule]
);

add(
  'design-card-content-actions',
  'Card grouping, content priority, and action boundaries',
  'Use a card only when a set of related content benefits from repeated grouping, preserve heading and list relationships, bound its primary and secondary actions, and make every action operable without invalid nested interaction.',
  'css-type-color-and-design',
  ['css-visual-hierarchy-spacing', 'design-user-needs-task-flows'],
  'rwd-w3c-coga-usable',
  '4.3 clear purpose and 4.5 clear controls',
  'Clear grouping, visible labels, familiar controls, and consistent purpose help people understand repeated content and choose an action without relying on visual inference.',
  'A shadow, hover effect, and pointer cursor make an entire container an accessible link even when it contains other links or buttons.',
  [
    'Long headings, missing media, multiple actions, keyboard, touch, zoom, forced-color, and changed-order cases must retain content relationships and distinct operable targets.',
    'Learner must justify whether a repeated item needs a list, article, heading, link, button, or no card treatment before applying visual containment.',
  ],
  ['responsive-systems', finalModule]
);

add(
  'design-progressive-disclosure-registration',
  'Progressive disclosure and proportionate registration',
  'Reveal secondary complexity through a clear persistent control while keeping essential information visible, and require identity or account data only when the user task and risk make it necessary.',
  'css-type-color-and-design',
  ['design-user-needs-task-flows', 'design-progressive-enhancement'],
  'rwd-w3c-coga-usable',
  '4.6 help users focus and 4.5 help users avoid and correct mistakes',
  'Interfaces should preserve context, expose clear controls, reduce unnecessary cognitive load, and let people recover without losing entered work.',
  'Hiding most controls or delaying every sign-in automatically reduces cognitive load and is always appropriate regardless of task, privacy, safety, or state continuity.',
  [
    'Essential-content, discoverability, expanded-state, keyboard, focus, refresh, privacy, saved-state, and account-required cases must preserve a complete and understandable task path.',
    'Learner must separate optional detail from required decisions and justify the exact point where registration becomes necessary using user outcome, data, continuity, abuse, and risk evidence.',
  ],
  ['responsive-systems', 'css-interaction-accessibility-and-motion', finalModule]
);

add(
  'css-form-control-states',
  'Resilient form control presentation',
  'Style native controls, labels, fieldsets, help, validation, disabled, read-only, focus, and autofill states with native appearance and accent-color first; use appearance suppression only when the complete control contract is reproduced.',
  'css-type-color-and-design',
  ['css-contrast-noncolor-meaning', 'css-pseudo-classes', 'css-box-sizing-models'],
  'rwd-css-ui-four',
  'Sections 4, 7, and 8: outline, accent-color, and appearance',
  'Form styling must preserve focus indication and control behavior; accent-color lets user agents maintain control contrast, while appearance none suppresses native appearance and can leave a primitive or invisible control that authors must rebuild.',
  'Appearance none is a harmless visual reset that preserves every control affordance, state, platform convention, forced-color adaptation, and input behavior automatically.',
  [
    'Mouse, keyboard, touch, speech, autofill, invalid, disabled, read-only, indeterminate, zoom, increased-contrast, and forced-color cases must retain identity, state, instructions, error recovery, and operation.',
    'Learner must prefer native appearance or accent-color and preserve a native control whenever custom painting cannot reproduce its complete semantic, visual, interaction, submission, and user-preference contract.',
  ]
);

add(
  'css-normal-flow',
  'Normal flow as the layout baseline',
  'Predict block and inline layout in normal flow before selecting any layout override, and retain source order as the primary reading and focus order.',
  'css-flexible-layout',
  ['css-outer-inner-display', 'css-intrinsic-extrinsic-sizing'],
  'rwd-mdn-css-layout',
  '5.1 CSS layout basics',
  'Normal flow is the default layout model and other mechanisms intentionally alter parts of it.',
  'A page without flexbox, grid, float, or positioning has no layout behavior to reason about.',
  [
    'Learner must draw the block and inline flow of changed content before applying layout properties.',
    'A layout requirement must first identify which normal-flow behavior is insufficient and which must remain intact.',
  ]
);

add(
  'css-flex-container-items-axes',
  'Flex containers, items, and axes',
  'Identify flex container, direct flex items, main axis, cross axis, starts, ends, and writing-mode effects before changing alignment.',
  'css-flexible-layout',
  ['css-normal-flow'],
  'rwd-mdn-css-layout',
  '5.4 flexbox terminology',
  'Flexbox lays direct children along one main axis with cross-axis alignment.',
  'The flex main axis is always horizontal and the cross axis is always vertical.',
  [
    'Learner must label axes and affected items after direction, writing mode, and nesting changes.',
    'A selector must target the actual container or item property owner rather than whichever node looks misplaced.',
  ]
);

add(
  'css-flex-direction-wrap-lines',
  'Flex direction, wrapping, and lines',
  'Choose row or column direction and wrapping behavior while preserving logical order, usable growth, and predictable new-line formation.',
  'css-flexible-layout',
  ['css-flex-container-items-axes'],
  'rwd-mdn-css-layout',
  '5.4 rows, columns, and wrapping',
  'Direction defines the main axis and wrapping creates additional flex lines when allowed.',
  'Row reverse is a safe way to reverse reading and keyboard order along with the visual row.',
  [
    'Source, visual, reading, and focus orders must be compared after direction and wrap changes.',
    'Changed item counts and label lengths must form usable lines without hiding or shrinking controls beyond their content.',
  ]
);

add(
  'css-flex-basis-grow-shrink',
  'Flex base size, growth, and shrinkage',
  'Predict flex base sizes, free-space distribution, shrink factors, minimum contributions, and resulting item sizes.',
  'css-flexible-layout',
  ['css-flex-direction-wrap-lines', 'css-intrinsic-extrinsic-sizing'],
  'rwd-webdev-css',
  'Flexbox module',
  'Flex sizing distributes positive and negative free space from base sizes subject to intrinsic minimums.',
  'Flex 1 makes every item exactly equal width regardless of content, basis, minimum size, and available space.',
  [
    'Learner must calculate or explain changed grow, shrink, basis, and min-content results before inspection.',
    'An overflow repair must address the controlling minimum or wrapping constraint rather than setting arbitrary widths.',
  ]
);

add(
  'css-flex-alignment-distribution',
  'Flex alignment and free-space distribution',
  'Use justify, align, content, items, self, and auto margins according to axis, line count, free space, and baseline needs.',
  'css-flexible-layout',
  ['css-flex-container-items-axes', 'css-flex-direction-wrap-lines'],
  'rwd-mdn-css-layout',
  '5.4 justifying and aligning content',
  'Flex alignment properties act on different axes and subjects, and some require multiple lines or free space.',
  'Align-content vertically centers items in any single-line flex container.',
  [
    'Learner must predict which box moves for single-line, multi-line, baseline, and auto-margin changed cases.',
    'A component alignment repair must avoid fixed offsets and remain correct after wrapping.',
  ]
);

add(
  'css-flex-gap-spacing',
  'Flex gaps and resilient spacing',
  'Use gap, padding, and margins according to whether spacing belongs between items, inside a container, or to one component edge.',
  'css-flexible-layout',
  ['css-flex-alignment-distribution', 'css-box-model-areas'],
  'rwd-webdev-css',
  'Flexbox and spacing coverage',
  'Gap belongs to the layout container and separates tracks or items without adding outer edge space.',
  'Margins and gap are interchangeable because both always create identical spacing at container edges and wrapped lines.',
  [
    'One, many, wrapped, reordered, and hidden item cases must preserve the intended spacing ownership.',
    'Learner must remove selector exceptions by moving truly relational spacing to the correct layout mechanism.',
  ]
);

add(
  'css-flex-order-accessibility',
  'Flex visual order and accessibility',
  'Use source order as the meaningful sequence and restrict order changes to cases where visual reordering does not contradict reading, focus, or task order.',
  'css-flexible-layout',
  ['css-flex-direction-wrap-lines'],
  'rwd-wcag-two-two',
  '1.3.2 Meaningful Sequence and 2.4.3 Focus Order',
  'Visual reordering must not break meaningful sequence or keyboard focus order.',
  'The order property updates the accessibility tree and Tab order to match the visual arrangement.',
  [
    'Keyboard, screen-reader, copy, and styles-disabled evidence must agree with the intended sequence.',
    'Learner must repair a contradiction by changing source structure unless the visual difference is semantically irrelevant.',
  ]
);

add(
  'css-flex-component-transfer',
  'Flexible component patterns',
  'Build unfamiliar navigation, media, card, toolbar, and form-row components by selecting flex constraints from content behavior rather than memorized recipes.',
  'css-flexible-layout',
  ['css-flex-basis-grow-shrink', 'css-flex-alignment-distribution', 'css-flex-gap-spacing'],
  'rwd-mdn-css-layout',
  '5.4 modern layout purpose',
  'Flexbox is suited to one-dimensional component and distribution problems.',
  'Any layout containing a row should use the same flex declaration pattern regardless of wrapping and content constraints.',
  [
    'Learner must choose and defend a flex model for an unfamiliar component before seeing starter CSS.',
    'Changed item counts, long labels, icons, missing media, and narrow space must preserve the component task.',
  ]
);

add(
  'css-grid-container-tracks-cells',
  'Grid containers, tracks, lines, cells, and areas',
  'Identify grid container, direct items, axes, lines, tracks, cells, gaps, and areas as a two-dimensional placement model.',
  'css-grid-and-positioning',
  ['css-normal-flow', 'css-flex-container-items-axes'],
  'rwd-mdn-css-layout',
  '5.4 CSS Grid terminology',
  'Grid provides explicit two-dimensional rows and columns with line-based placement.',
  'A grid cell is the visible item box, so one item always creates one new grid cell and track.',
  [
    'Learner must annotate the grid structure independently from the number and size of its child items.',
    'A nested element that is not a direct grid item must be distinguished from the item that participates in placement.',
  ]
);

add(
  'css-grid-explicit-tracks-fr',
  'Explicit tracks and fractional space',
  'Define explicit rows and columns with fixed, percentage, intrinsic, and fr tracks while accounting for gaps and minimum contributions.',
  'css-grid-and-positioning',
  ['css-grid-container-tracks-cells', 'css-intrinsic-extrinsic-sizing'],
  'rwd-mdn-css-layout',
  '5.4 defining grid rows and columns',
  'Explicit grids combine different track sizing functions, and fr distributes leftover space rather than total space.',
  'Three 1fr columns always occupy exactly one third each even when one contains an unbreakable minimum.',
  [
    'Learner must predict available-space distribution after fixed tracks, gaps, and minimum contributions.',
    'A changed long-content case must avoid overflow without replacing the grid with fixed screenshot widths.',
  ]
);

add(
  'css-grid-repeat-minmax-intrinsic',
  'Repeat, minmax, and intrinsic tracks',
  'Compose repeat(), minmax(), min-content, max-content, fit-content, and flexible tracks to encode bounded content behavior.',
  'css-grid-and-positioning',
  ['css-grid-explicit-tracks-fr', 'css-min-max-clamp-functions'],
  'rwd-webdev-css',
  'Grid module',
  'Track functions express repeatable and intrinsic constraints that respond to content and available space.',
  'Minmax ignores its minimum when space is narrow, so minmax(20rem, 1fr) cannot cause overflow.',
  [
    'Changed container and content sizes must activate the expected minimum, maximum, or flexible track behavior.',
    'Learner must reject a minimum that exceeds the smallest supported content constraint.',
  ]
);

add(
  'css-grid-line-placement-spans',
  'Grid line placement and spans',
  'Place items with positive and negative lines, spans, and named lines while preserving a logical source sequence and non-overlapping task flow.',
  'css-grid-and-positioning',
  ['css-grid-explicit-tracks-fr'],
  'rwd-mdn-css-layout',
  '5.4 positioning elements on the grid',
  'Grid items can be placed and spanned relative to numbered or named lines.',
  'Negative grid lines count backward from the implicit grid created by overflowing items.',
  [
    'Learner must draw the occupied cells for changed positive, negative, and span placements.',
    'An overlap must be intentional, readable, focus-safe, and tested rather than an unnoticed auto-placement collision.',
  ]
);

add(
  'css-grid-template-areas',
  'Named grid areas and responsive rearrangement',
  'Define complete rectangular named areas and change visual arrangements only when source, reading, focus, and task sequences remain coherent.',
  'css-grid-and-positioning',
  ['css-grid-line-placement-spans', 'css-flex-order-accessibility'],
  'rwd-webdev-css',
  'Grid module named areas',
  'Template areas provide a visual syntax for rectangular regions but do not change document order.',
  'Grid template areas rewrite the DOM sequence to match each responsive visual arrangement.',
  [
    'Area maps must be rectangular, complete, and verified across changed item presence and responsive layouts.',
    'Keyboard and reading-order evidence must remain meaningful after any visual area rearrangement.',
  ]
);

add(
  'css-grid-auto-placement-dense',
  'Implicit tracks and auto-placement',
  'Predict implicit track creation, auto-flow order, and dense packing while avoiding visual arrangements that contradict meaningful sequence.',
  'css-grid-and-positioning',
  ['css-grid-line-placement-spans'],
  'rwd-webdev-css',
  'Grid auto-placement coverage',
  'Unplaced items follow the auto-placement algorithm and may create implicit tracks.',
  'Dense auto-flow is safe for forms and reading content because it updates keyboard navigation to the packed layout.',
  [
    'Learner must trace placement after explicit, spanning, missing, and newly inserted items.',
    'Dense packing may pass only for semantically independent items whose visual order does not communicate sequence.',
  ]
);

add(
  'css-subgrid-alignment',
  'Subgrid and cross-component alignment',
  'Use subgrid when nested content must participate in ancestor track sizing and alignment, with a fallback for unsupported or unsuitable contexts.',
  'css-grid-and-positioning',
  ['css-grid-explicit-tracks-fr', 'css-grid-line-placement-spans'],
  'rwd-css-snapshot',
  'CSS Grid Layout and feature-status links',
  'Current CSS Grid scope includes nested track participation through subgrid where supported by the stable platform surface.',
  'A nested grid automatically inherits the parent track sizes and gaps without declaring subgrid.',
  [
    'Changed nested content must align across sibling components without duplicating track constants.',
    'Learner must explain when independent nested layout is preferable to ancestor track coupling.',
  ]
);

add(
  'css-positioning-containing-blocks',
  'Static, relative, absolute, fixed, and sticky positioning',
  'Select a positioning scheme by flow participation, containing block, scroll behavior, offsets, and overlap requirements.',
  'css-grid-and-positioning',
  ['css-normal-flow', 'css-percentages-containing-blocks'],
  'rwd-mdn-css-layout',
  '5.3 positioning',
  'Positioning modes differ in flow participation, containing block, offset behavior, and viewport or scroll attachment.',
  'Position relative removes the box from normal flow in the same way as absolute positioning.',
  [
    'Learner must predict original space, containing block, offset, and scroll response for every positioning mode.',
    'A positioned overlay must remain reachable and avoid obscuring focus or content at zoom and narrow sizes.',
  ]
);

add(
  'css-stacking-contexts-z-index',
  'Stacking contexts and z-index',
  'Trace stacking-context creation and paint order so local z-index values solve bounded overlap without escalating global layer numbers.',
  'css-grid-and-positioning',
  ['css-positioning-containing-blocks', 'css-backgrounds-borders-shadows'],
  'rwd-mdn-css-layout',
  '5.3 stacking context',
  'Z-axis ordering is constrained by nested stacking contexts rather than one page-wide integer list.',
  'Any z-index of 999999 must paint above every element with a smaller number anywhere in the document.',
  [
    'Learner must draw context boundaries and paint order for changed positioned, transformed, opaque, and isolated ancestors.',
    'An overlap repair must remove accidental context creation or define a small semantic layer architecture.',
  ]
);

add(
  'css-floats-content-wrapping',
  'Floats for content wrapping',
  'Use floats for bounded content wrapping, clear them deliberately, and reject them as the default multi-column page-layout mechanism.',
  'css-grid-and-positioning',
  ['css-normal-flow', 'css-margin-collapse-formatting-contexts'],
  'rwd-mdn-css-layout',
  '5.2 floats',
  'Floats remain useful for content wrapping, while flexbox and grid replace historical column-layout hacks.',
  'Float is the most compatible choice for every modern multi-column component and responsive page structure.',
  [
    'A figure-and-prose case must wrap and clear correctly after media and text size changes.',
    'Learner must migrate an obsolete float layout to flex or grid while preserving the one genuine wrapping use.',
  ]
);

add(
  'responsive-fluid-default',
  'Fluid content as the responsive baseline',
  'Begin from normal reflow and intrinsic sizing, then add only constraints justified by readability, task, media, or component evidence.',
  'responsive-systems',
  ['css-normal-flow', 'css-intrinsic-extrinsic-sizing', 'css-flex-component-transfer'],
  'rwd-mdn-css-layout',
  '5.5 responsive design',
  'Responsive design builds on flexible modern layout and content that adapts across available space.',
  'Responsive work begins by selecting device widths and forcing a separate fixed layout at each one.',
  [
    'The unenhanced artifact must reflow before breakpoints, and every added constraint must name the failure it prevents.',
    'Changed widths between tested presets must not expose horizontal page scrolling or unusable content.',
  ]
);

add(
  'responsive-viewport-zoom',
  'Viewport configuration and zoom',
  'Configure the layout viewport for device width without disabling user zoom or assuming CSS pixels equal physical pixels.',
  'responsive-systems',
  ['responsive-fluid-default'],
  'rwd-mdn-css-layout',
  '5.5 viewport meta element',
  'A correct viewport declaration enables intended responsive layout, while user-scalable restrictions harm accessibility.',
  'Maximum-scale one is required to keep a responsive page from unexpectedly reflowing when users zoom.',
  [
    'Learner must compare layout viewport behavior with missing, correct, and zoom-restricting declarations.',
    'The final document must retain pinch and browser zoom and remain usable at supported enlargement.',
  ]
);

add(
  'responsive-fluid-media',
  'Fluid images, video, and embedded content',
  'Constrain replaced media to its container while preserving intrinsic aspect ratio, meaningful cropping, controls, and failure behavior.',
  'responsive-systems',
  ['responsive-fluid-default', 'css-overflow-containment-scroll'],
  'rwd-webdev-responsive',
  'Images and media',
  'Responsive media must scale within available space while retaining appropriate aspect, content, and performance behavior.',
  'Width one hundred percent and a fixed height preserve every image aspect ratio automatically.',
  [
    'Portrait, landscape, tiny, huge, missing, and slow media cases must remain within layout and preserve required content.',
    'Learner must distinguish contain, cover, crop focal point, and intrinsic scaling requirements.',
  ]
);

add(
  'responsive-image-selection',
  'Resolution and art-direction image selection',
  'Use srcset, sizes, picture, source, type, and media so the browser selects an appropriate resource without hiding required alternative content.',
  'responsive-systems',
  ['responsive-fluid-media'],
  'rwd-webdev-responsive',
  'Responsive images',
  'Responsive image markup separates resolution switching, format selection, and art direction.',
  'The browser always chooses the largest srcset candidate, so sizes only documents the intended display width.',
  [
    'Learner must predict candidate choice for changed viewport, density, supported format, and sizes inputs.',
    'Art-direction crops must preserve the subject and alternative text meaning across sources.',
  ]
);

add(
  'responsive-media-query-model',
  'Media-query conditions and user features',
  'Compose media types, width ranges, orientation, resolution, interaction, color, contrast, and preference features around actual adaptation needs.',
  'responsive-systems',
  ['responsive-fluid-default'],
  'rwd-webdev-responsive',
  'Media queries',
  'Media queries conditionally apply CSS from viewport, output, interaction, and user-preference features.',
  'Media queries can reliably detect a phone, tablet, or desktop device category from width alone.',
  [
    'Learner must list accepted and rejected environments for changed compound conditions before running them.',
    'A query must express the capability or constraint being adapted rather than a guessed device identity.',
  ]
);

add(
  'responsive-content-breakpoints',
  'Content-derived breakpoints',
  'Introduce a breakpoint where content, measure, controls, or layout can no longer satisfy explicit acceptance constraints.',
  'responsive-systems',
  ['responsive-media-query-model', 'css-readable-measure-alignment'],
  'rwd-mdn-css-layout',
  '5.5 breakpoints',
  'Breakpoints should respond to layout needs and use relative units instead of copying particular device widths.',
  'Standard phone and tablet widths are stable design tokens that guarantee all devices are covered.',
  [
    'Learner must identify the first failing interval by continuous resizing and changed content, then place a relative-unit boundary.',
    'Widths immediately below, at, above, and between every boundary must satisfy the same task constraints.',
  ]
);

add(
  'responsive-mobile-first-enhancement',
  'Narrow-first progressive enhancement',
  'Author a simple narrow layout and add wider-space enhancements without treating narrow interaction, content, or performance as lesser versions.',
  'responsive-systems',
  ['responsive-content-breakpoints'],
  'rwd-mdn-css-layout',
  '5.5 mobile-first technique',
  'A narrow-first cascade can progressively add layout where sufficient space exists.',
  'Mobile first means hiding secondary content and features from every narrow viewport.',
  [
    'All required content and actions must remain available before the first min-width enhancement.',
    'Learner must refactor a max-width override tangle into a small additive cascade without changing task behavior.',
  ]
);

add(
  'responsive-range-syntax-overlap',
  'Range syntax and boundary ownership',
  'Use inclusive and exclusive media-query ranges so adjacent conditions have intentional boundaries without overlap gaps or fragile pixel offsets.',
  'responsive-systems',
  ['responsive-media-query-model', 'responsive-content-breakpoints'],
  'rwd-webdev-responsive',
  'Media-query range syntax',
  'Modern range syntax can express lower, upper, and interval conditions directly.',
  'Subtracting one pixel from every max-width boundary is required to prevent all responsive overlap.',
  [
    'Exact-boundary and fractional CSS-pixel cases must activate the documented rule set.',
    'Learner must explain which condition owns each boundary and why simultaneous matches are harmless or intentional.',
  ]
);

add(
  'responsive-container-query-model',
  'Container query establishment and conditions',
  'Establish a query container and adapt a reusable component to its available inline size or state independently of viewport width.',
  'responsive-systems',
  ['responsive-content-breakpoints', 'css-flex-component-transfer'],
  'rwd-webdev-css',
  'Container queries module',
  'Container queries adapt components from ancestor container conditions rather than only the viewport.',
  'Any ancestor can be queried by size without declaring containment or a container type.',
  [
    'The same component must adapt correctly in narrow sidebar, wide main, and nested contexts at one viewport width.',
    'Learner must identify the query container and reject an ancestor whose condition creates an impossible dependency.',
  ]
);

add(
  'responsive-container-query-units',
  'Container query units and bounded fluid components',
  'Use cqi, cqb, cqmin, and cqmax inside explicit bounds so component scale follows its query container without becoming unreadable.',
  'responsive-systems',
  ['responsive-container-query-model', 'css-min-max-clamp-functions'],
  'rwd-webdev-css',
  'Container queries and container units',
  'Container query units represent dimensions of the query container and can drive component-local fluid values.',
  'Container query units always reference the nearest parent element, even when it is not a query container.',
  [
    'Nested and differently named container cases must use the intended reference dimensions.',
    'Fluid type and spacing must stay within explicit minimum and maximum usability constraints.',
  ]
);

add(
  'responsive-grid-auto-fit-fill',
  'Intrinsic responsive grids',
  'Use repeat with auto-fit or auto-fill and safe minmax constraints to form content-responsive tracks without unnecessary viewport breakpoints.',
  'responsive-systems',
  ['css-grid-repeat-minmax-intrinsic', 'responsive-fluid-default'],
  'rwd-webdev-css',
  'Grid and responsive layout coverage',
  'Intrinsic grid patterns can add or collapse tracks from available space and minimum content constraints.',
  'Auto-fit and auto-fill produce identical empty-track behavior in every grid.',
  [
    'Learner must predict track count and empty-track handling for changed item counts and container widths.',
    'Minimum track constraints must not cause page overflow at the narrowest supported container.',
  ]
);

add(
  'responsive-navigation-disclosure',
  'Responsive navigation and disclosure behavior',
  'Adapt navigation presentation without removing destinations, changing meaningful order, trapping focus, or depending on hover and viewport width alone.',
  'responsive-systems',
  ['responsive-container-query-model', 'css-form-control-states', 'css-flex-order-accessibility'],
  'rwd-wai-tutorials',
  'Menus and page structure tutorials',
  'Responsive navigation requires semantic structure, explicit disclosure state, keyboard behavior, focus management, and visible access to destinations.',
  'CSS can turn a checkbox and label into a complete accessible menu button with no state or focus considerations.',
  [
    'Keyboard, touch, screen-reader, zoom, no-script, long-label, and orientation-change cases must preserve navigation access.',
    'Learner must explain the trigger name, expanded state, focus path, dismissal, and CSS-versus-behavior boundary.',
  ]
);

add(
  'design-long-collection-navigation',
  'Long collections, pagination, and restored context',
  'Choose explicit pagination or a bounded user-requested continuation for long collections, expose position and destinations, preserve history and focus, and restore context after detail navigation.',
  'responsive-systems',
  ['responsive-navigation-disclosure', 'responsive-fluid-default'],
  'rwd-govuk-pagination',
  'When to use, when not to use, and accessible pagination behavior',
  'Explicit previous, next, and page navigation gives users control and context, while automatic infinite scroll creates keyboard and return-position problems.',
  'A loading spinner and appended cards make endless automatic scrolling usable because every user can reach the footer, recover position, and understand result boundaries.',
  [
    'Keyboard, screen-reader, zoom, slow-response, empty, error, deep-link, browser-back, detail-return, changed-sort, and final-page cases must preserve location and control.',
    'Learner must justify pagination, load-more, virtualization, or another bounded pattern from task behavior and verify focus placement, status, URL/history, and restored context.',
  ],
  [finalModule]
);

add(
  'responsive-test-matrix',
  'Responsive evidence matrix',
  'Test continuous size ranges and changed content, zoom, input, preferences, orientation, density, media, performance, and browser conditions using recorded evidence.',
  'responsive-systems',
  [
    'responsive-image-selection',
    'responsive-range-syntax-overlap',
    'responsive-container-query-units',
  ],
  'rwd-webdev-responsive',
  'Testing',
  'Responsive quality requires testing beyond a few preset screenshots across content, environment, capability, and user conditions.',
  'Passing phone, tablet, and desktop screenshots proves every intermediate size and interaction state is responsive.',
  [
    'Learner must derive a risk-based matrix with boundary, between-boundary, and changed-condition cases.',
    'Each failure report must include reproduction, observed behavior, violated invariant, cause evidence, repair, and re-test.',
  ]
);

add(
  'css-zoom-reflow-text-spacing',
  'Zoom, reflow, and user text spacing',
  'Preserve content and operation under browser zoom, viewport reflow, enlarged text, and user-overridden line, paragraph, letter, and word spacing.',
  'css-interaction-accessibility-and-motion',
  ['responsive-test-matrix', 'css-text-wrap-spacing-decoration'],
  'rwd-wcag-two-two',
  '1.4.4, 1.4.10, and 1.4.12',
  'Text must resize and reflow, and user spacing overrides must not cause loss of content or function.',
  'A layout passes zoom when the browser technically allows zoom, even if fixed panels cover content afterward.',
  [
    'Two-hundred and four-hundred-percent zoom plus the text-spacing test values must retain complete reading and operation.',
    'Learner must repair fixed dimensions, clipping, overlays, or order issues from cause-level layout evidence.',
  ]
);

add(
  'css-focus-visible-indicators',
  'Keyboard focus and focus-visible indicators',
  'Create persistent, unobscured, high-contrast focus indicators using focus-visible while preserving a usable fallback and logical focus order.',
  'css-interaction-accessibility-and-motion',
  ['css-pseudo-classes', 'css-contrast-noncolor-meaning', 'css-stacking-contexts-z-index'],
  'rwd-wcag-two-two',
  '2.4.7, 2.4.11, 2.4.12, and 2.4.13',
  'Keyboard focus must be visible and not obscured, with enhanced size and contrast evidence where applicable.',
  'Removing outlines is safe when hover styling makes a control look interactive.',
  [
    'Every interactive element must expose focus through keyboard traversal, scrolling, overlays, and changed backgrounds.',
    'Learner must distinguish focus, focus-visible, focus-within, selected, active, and hover states.',
  ]
);

add(
  'css-input-capability-adaptation',
  'Hover, pointer, touch, and input capabilities',
  'Use hover, any-hover, pointer, and any-pointer as enhancement signals while keeping complete operation for mixed and changing input devices.',
  'css-interaction-accessibility-and-motion',
  ['responsive-media-query-model', 'css-pseudo-classes'],
  'rwd-webdev-responsive',
  'Interaction',
  'Responsive interaction must account for different pointer accuracy, hover support, touch, keyboards, and hybrid devices.',
  'A wide viewport proves a mouse is present, while a narrow viewport proves hover is unavailable.',
  [
    'Mouse, touch, keyboard, stylus, and hybrid capability combinations must preserve the complete task.',
    'Hover-only information must become persistent or available through an equivalent focus and activation path.',
  ]
);

add(
  'css-target-size-spacing',
  'Pointer target size and spacing',
  'Provide usable target dimensions and spacing without enlarging overlapping hit areas, hiding labels, or weakening dense-data exceptions.',
  'css-interaction-accessibility-and-motion',
  ['css-box-model-areas', 'css-input-capability-adaptation'],
  'rwd-wcag-two-two',
  '2.5.8 Target Size Minimum',
  'Pointer targets require minimum size or sufficient spacing unless a defined exception applies.',
  'A transparent pseudo-element can enlarge every target indefinitely without creating overlap or unexpected activation.',
  [
    'Small, adjacent, wrapped, zoomed, and touch cases must measure hit regions and reject overlap.',
    'Learner must document any exception and provide the strongest feasible alternative target access.',
  ]
);

add(
  'design-modal-dialog-focus',
  'Modal necessity, semantics, focus, and dismissal',
  'Use a modal only for a bounded interrupting task, make background content inert, label the dialog, contain and place focus deliberately, provide explicit dismissal, protect entered work, and restore logical focus.',
  'css-interaction-accessibility-and-motion',
  ['css-focus-visible-indicators', 'css-target-size-spacing', 'css-stacking-contexts-z-index'],
  'rwd-aria-apg',
  'Dialog modal pattern and keyboard interaction',
  'A conforming modal makes outside content inert, moves focus inside, contains the tab sequence, supports Escape, exposes a visible close action, and returns focus according to workflow.',
  'Dimming the page and closing on any outside click is a complete modal implementation even when focus escapes, content is mislabelled, or a stray pointer action discards work.',
  [
    'Keyboard, screen-reader, long-content, zoom, destructive-action, nested-trigger, validation-error, pointer-dismissal, Escape, and invoker-removal cases must preserve task state and logical focus.',
    'Learner must first reject a modal when inline content or a normal page better fits the task, then document title, description, initial focus, tab containment, dismissal, error, and return-focus behavior when modal use remains justified.',
  ],
  [finalModule]
);

add(
  'design-multistep-progress-recovery',
  'Multi-step progress, persistence, review, and recovery',
  'Break a genuinely long process into logical steps, communicate current and total progress in text, preserve entered data, support backward correction, and recover after interruption without inventing false certainty for conditional paths.',
  'css-interaction-accessibility-and-motion',
  ['css-focus-visible-indicators', 'css-form-control-states', 'css-zoom-reflow-text-spacing'],
  'rwd-wai-multistep-forms',
  'Overview and indicating progress through title, heading, progress, and step indicators',
  'Multi-page forms should use logical stages and provide perceivable progress at every step, including through page titles and main headings.',
  'A row of colored circles is sufficient progress evidence, and returning to a previous step may safely erase later valid answers.',
  [
    'Keyboard, screen-reader, refresh, session-return, conditional-step, validation, back, edit, final-review, timeout, and network-error cases must retain understandable progress and recoverable data.',
    'Learner must distinguish determinate from conditional progress, expose textual state, and demonstrate correction plus return to the prior place without unnecessary re-entry.',
  ],
  [finalModule]
);

add(
  'design-cart-review-correction',
  'Cart state, quantity correction, totals, and confirmation',
  'Keep selected items and costs inspectable, provide labelled quantity and removal controls, announce material changes, prevent silent loss, and offer a complete review-and-correct step before commitment.',
  'css-interaction-accessibility-and-motion',
  ['css-form-control-states', 'design-multistep-progress-recovery'],
  'rwd-w3c-coga-usable',
  '4.5.5 allow users to check, change, and confirm important information',
  'Important transactions need review, correction, return without data loss, clear final confirmation, and understandable cancellation or recovery paths.',
  'A familiar cart icon, product thumbnails, and prominent checkout color prove the cart is usable even when quantity changes, totals, errors, and confirmation are inaccessible.',
  [
    'Zero, maximum, invalid, delayed-price, unavailable-item, discount, tax, shipping, keyboard, screen-reader, refresh, concurrent-change, and final-confirmation cases must expose accurate state and recovery.',
    'Learner must reconcile visible line items, quantities, totals, announced changes, error ownership, review, edit return, and irreversible commitment against changed cart data.',
  ],
  [finalModule]
);

add(
  'css-reduced-motion-preference',
  'Reduced-motion adaptation',
  'Use prefers-reduced-motion to remove or replace nonessential movement while preserving state changes, spatial understanding, and task feedback.',
  'css-interaction-accessibility-and-motion',
  ['responsive-media-query-model'],
  'rwd-wcag-two-two',
  '2.3 Seizures and Physical Reactions with preference support',
  'Motion that can trigger symptoms needs bounded behavior, control, and preference-aware alternatives.',
  'Reduced motion means setting every duration to zero, even when that hides state changes or breaks event-dependent behavior.',
  [
    'No-preference and reduced-motion modes must communicate identical task state without dangerous or gratuitous movement.',
    'Learner must classify essential, orienting, decorative, and risky motion before choosing removal or substitution.',
  ]
);

add(
  'css-transitions-state-change',
  'Transitions and state continuity',
  'Transition animatable properties with bounded duration and easing so changes remain perceptible without delaying operation or animating unintended properties.',
  'css-interaction-accessibility-and-motion',
  ['css-pseudo-classes', 'css-reduced-motion-preference'],
  'rwd-webdev-css',
  'Transitions module',
  'Transitions interpolate animatable property values between states and should name intentional properties.',
  'Transition all is harmless because browsers animate only the visual properties the author expected.',
  [
    'Rapid reversal, interrupted state, reduced motion, and newly added property cases must remain predictable.',
    'Learner must choose duration and easing from feedback purpose and remove layout-affecting animation where it harms stability.',
  ]
);

add(
  'css-keyframe-animation-model',
  'Keyframes, timing, fill, and iteration',
  'Define keyframe animations with intentional interpolation, iteration, direction, delay, fill, composition, and termination behavior.',
  'css-interaction-accessibility-and-motion',
  ['css-transitions-state-change'],
  'rwd-webdev-css',
  'Animations module',
  'Keyframes define intermediate states while animation properties control timing and repetition.',
  'Animation fill mode forwards permanently changes the underlying computed property after an animation completes.',
  [
    'Learner must predict pre-delay, active, iteration-boundary, reversed, completed, and interrupted states.',
    'The underlying non-animated style must remain correct when animation is unsupported, disabled, or finished.',
  ]
);

add(
  'css-forced-colors-preferences',
  'Forced colors, contrast, and theme preferences',
  'Adapt to forced-colors, prefers-contrast, color-scheme, and light or dark preferences without defeating system colors or hiding controls.',
  'css-interaction-accessibility-and-motion',
  ['css-design-tokens-theming', 'responsive-media-query-model'],
  'rwd-webdev-css',
  'Color, focus, and user preference coverage',
  'User and system color preferences can replace or constrain author colors and require semantic system-aware styling.',
  'Forced-color-adjust none is the correct global fix whenever system colors alter the intended brand palette.',
  [
    'Forced-color, dark, light, increased-contrast, and partial-support cases must preserve controls, focus, states, and content.',
    'Learner must use system colors or selective exceptions and justify every retained author color.',
  ]
);

add(
  'css-print-and-non-screen-media',
  'Print and non-screen output',
  'Provide a print adaptation that preserves document meaning, URLs or references, page breaks, contrast, and hidden-versus-required content.',
  'css-interaction-accessibility-and-motion',
  ['responsive-media-query-model', 'css-visual-hierarchy-spacing'],
  'rwd-webdev-responsive',
  'Media queries and output adaptations',
  'Media queries can adapt documents to print and other output types rather than screen size alone.',
  'Print CSS should hide navigation and interactive content even when it contains required destinations or record context.',
  [
    'Print preview, monochrome, long-table, multi-page, and URL-reference cases must preserve useful document evidence.',
    'Learner must classify controls and navigation as irrelevant, representable, or required before hiding them.',
  ]
);

add(
  'css-devtools-causal-debugging',
  'Computed-style and layout debugging',
  'Use validation, matched rules, computed styles, box, flex, grid, accessibility, responsive, and performance evidence to test one cause hypothesis at a time.',
  'css-interaction-accessibility-and-motion',
  ['css-cascade-layers-scope', 'css-stacking-contexts-z-index', 'responsive-test-matrix'],
  'rwd-mdn-css-fundamentals',
  '3.10 debugging CSS',
  'CSS debugging requires validation and browser inspection of applied declarations and layout models.',
  'Toggling random declarations until the screenshot improves is equivalent to diagnosing the cascade and layout cause.',
  [
    'Learner must state a falsifiable hypothesis, select the evidence surface, change one variable, and record the result.',
    'A repair must survive a changed case that would fail the original guessed symptom patch.',
  ]
);

add(
  'css-rendering-performance-stability',
  'Rendering cost and layout stability',
  'Reduce blocking payload, unnecessary style work, layout shifts, expensive paint, and animation cost without sacrificing semantics or accessibility.',
  'css-interaction-accessibility-and-motion',
  ['css-font-loading-variable-fonts', 'responsive-image-selection', 'css-transitions-state-change'],
  'rwd-webdev-responsive',
  'Performance',
  'Responsive experience includes resource selection, stable rendering, and appropriate work across network and device conditions.',
  'Using transform for every moving or positioned element guarantees good performance and has no stacking or accessibility effects.',
  [
    'Slow network, delayed font, missing image dimensions, low-end rendering, and reduced-motion cases must remain stable and usable.',
    'Learner must measure the affected loading, layout, paint, or compositing evidence before and after optimization.',
  ]
);

add(
  'css-changed-case-regression',
  'Changed-case CSS regression testing',
  'Protect semantic, visual, responsive, interaction, accessibility, and performance invariants with behavior checks rather than selector-token assertions.',
  'css-interaction-accessibility-and-motion',
  [
    'css-devtools-causal-debugging',
    'css-rendering-performance-stability',
    'css-zoom-reflow-text-spacing',
  ],
  'rwd-webdev-responsive',
  'Testing',
  'Responsive CSS requires evidence across changed content, environments, interaction states, and supported output conditions.',
  'A snapshot at one viewport is a complete regression test because any CSS change necessarily alters pixels.',
  [
    'Tests must vary content, state, size, input, preferences, media, and failures while checking explicit user-facing invariants.',
    'Learner must explain which regressions automated checks can detect and which still require human or assistive-technology review.',
  ]
);

add(
  'css-independent-transfer-defense',
  'Independent responsive interface transfer and defense',
  'Design, build, test, and defend an unfamiliar multi-page responsive interface from an empty stylesheet and stakeholder acceptance criteria.',
  finalModule,
  [
    'css-cascade-layers-scope',
    'css-form-control-states',
    'css-flex-component-transfer',
    'css-grid-template-areas',
    'responsive-navigation-disclosure',
    'css-changed-case-regression',
  ],
  'rwd-fcc-v9',
  'CSS, responsive-design, project, review, quiz, and exam blocks',
  'The benchmark requires accumulated CSS and responsive design practice followed by projects and cumulative assessment.',
  'Recreating the same workshop layout with a new color palette proves independent responsive-design transfer.',
  [
    'The empty-stylesheet artifact must pass behavior, accessibility, responsive, failure, performance, validation, and changed-content evidence.',
    'Learner must defend cascade architecture, layout choices, breakpoints, container adaptations, typography, color, motion, tests, tradeoffs, and remaining uncertainty.',
  ],
  [finalModule]
);

const graph = {
  schemaVersion: 1,
  courseId: 'responsive-web-design',
  scopeId: 'css-and-responsive-design',
  status: 'researching',
  reviewedAt: '2026-07-15',
  sourceIds: [
    'rwd-css-snapshot',
    'rwd-css-syntax-three',
    'rwd-selectors-four',
    'rwd-css-cascade-five',
    'rwd-css-cascade-six',
    'rwd-css-display-three',
    'rwd-css-backgrounds-three',
    'rwd-css-values-four',
    'rwd-css-color-four',
    'rwd-css-color-five',
    'rwd-css-images-four',
    'rwd-css-ui-four',
    'rwd-wcag-two-two',
    'rwd-mdn-curriculum',
    'rwd-mdn-css-fundamentals',
    'rwd-mdn-css-layout',
    'rwd-webdev-css',
    'rwd-webdev-responsive',
    'rwd-govuk-user-needs',
    'rwd-mdn-progressive-enhancement',
    'rwd-css-color-adjust-one',
    'rwd-w3c-coga-usable',
    'rwd-govuk-pagination',
    'rwd-wai-multistep-forms',
    'rwd-sketch-developer-handoff',
    'rwd-wai-tutorials',
    'rwd-aria-apg',
    'rwd-fcc-v9',
  ],
  moduleIds: [
    'css-language-and-cascade',
    'css-boxes-and-sizing',
    'css-type-color-and-design',
    'css-flexible-layout',
    'css-grid-and-positioning',
    'responsive-systems',
    'css-interaction-accessibility-and-motion',
    finalModule,
  ],
  requiredStages: stages,
  concepts,
  architectureFindings: [
    'The deleted generated sequence fragmented cascade, units, box geometry, selectors, layout, accessibility, and responsive behavior into topic modules that did not consistently expose prerequisite edges or retained checks.',
    'Responsive design currently arrives after several isolated CSS feature modules; the replacement must introduce fluid and changed-content constraints during sizing and layout, then integrate media and container queries after those foundations.',
    'Flexbox, grid, positioning, and responsive modules require prediction and layout-inspector evidence before independent construction; visual resemblance cannot establish sizing, order, overflow, or stacking understanding.',
    'The current project sequence cannot count as transfer until each project starts from meaningfully different stakeholder constraints, uses different layout and responsive decisions, and includes accessibility plus changed-case defense.',
  ],
  gaps: [
    'Subject-matter review must verify every locator, technical claim, prerequisite edge, misconception, browser-support boundary, and omission against current specifications and interoperability evidence.',
    'Instructional and assessment review must align these concepts with the pinned v9 objective matrix and design original activities whose evidence progresses through every required stage.',
    'Accessibility review must test the proposed editor, preview, responsive controls, DOM and computed-style diagnostics, keyboard path, high contrast, zoom, reduced motion, and screen-reader feedback.',
    'Representative beginners must complete the opening HTML-to-CSS bridge, first cascade debugging sequence, first layout transfer, responsive changed cases, and independent project before the graph can be approved.',
  ],
};

const output = path.join(
  process.cwd(),
  'docs',
  'research',
  'courses',
  'responsive-web-design-css-concepts.json'
);
await mkdir(path.dirname(output), { recursive: true });
const serialized = `${JSON.stringify(graph, null, 2)}\n`;
if (process.argv.includes('--check')) {
  const current = await readFile(output, 'utf8');
  if (current !== serialized) throw new Error(`${output} is stale; regenerate it.`);
  console.log(
    `Current ${output}: ${graph.concepts.length} researched CSS and responsive concepts.`
  );
} else {
  await writeFile(output, serialized);
  console.log(`Wrote ${output}: ${graph.concepts.length} researched CSS and responsive concepts.`);
}
