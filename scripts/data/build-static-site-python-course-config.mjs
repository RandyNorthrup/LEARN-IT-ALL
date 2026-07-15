import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-15T10:00:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing misconception for static-site competency ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function siteModule(id, title, context, artifact, skills) {
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict the reader decision, source identity, parse state, output URL, accessibility result, failure, and evidence before reading the governing source.`,
      workshop: `A civic-publishing pair incrementally builds ${artifact} from original fixed content fixtures while retaining earlier Python, Git, HTML, CSS, URL, accessibility, security, determinism, testing, and recovery requirements.`,
      debug: `A preserved build trace contains one plausible source, path, encoding, metadata, parser, renderer, template, URL, asset, accessibility, security, cache, package, deployment, or release defect; locate the first failed boundary before editing.`,
      lab: `An independent documentation team receives a different content tree, language, route base, template, asset set, trust policy, hosting target, and accessibility need and transfers ${title.toLowerCase()} into a changed ${artifact}.`,
      review: `A delayed publication review reconstructs ${title.toLowerCase()} from revision, configuration, source bytes, document nodes, route manifest, rendered HTML, asset graph, validation report, artifact digest, deployment, and recovery evidence.`,
      quiz: `A release reviewer compares near-miss decisions for ${title.toLowerCase()} and accepts only runnable changed-case evidence, explicit limitations, and named browser, filesystem, parser, template, validator, host, CDN, DNS, and production transfer gates.`,
    },
  };
}

const modules = [
  siteModule(
    'static-site-outcomes-repo-architecture',
    'Reader Outcomes, Repository Baseline, Static Architecture, and Evidence',
    'A team says “build a blog generator” but has not defined readers, publishing authority, content ownership, supported routes, accessibility needs, repository state, or acceptance evidence.',
    'reader, repository, content, architecture, and evidence charter',
    [
      outcome(
        'ssg-reader-outcome',
        'Define reader, task, content owner, publication decision, consequence of error, and observable success before selecting syntax or tooling.',
        'Generating an index page is a complete reader outcome.',
        'strategic',
        'create'
      ),
      outcome(
        'ssg-static-boundary',
        'Distinguish build-time transformation, immutable output, browser execution, origin hosting, CDN behavior, and external services.',
        'A static site has no runtime, trust, or operational boundaries.'
      ),
      outcome(
        'ssg-repository-baseline',
        'Inspect status, revision, configuration origin, ignores, content licenses, generated files, and existing gates before editing.',
        'Generated output can be committed safely without first identifying its source and owner.'
      ),
      outcome(
        'ssg-accessibility-charter',
        'Record language, reading, keyboard, reflow, motion, media, cognitive, and assistive-technology needs as build inputs.',
        'Accessibility can be added to templates after content and routes are finished.',
        'professional',
        'create'
      ),
      outcome(
        'ssg-evidence-ladder',
        'Separate parser, renderer, file-tree, browser, accessibility, deployment, cache, and stakeholder evidence.',
        'A visually correct local page proves the published site is complete.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  siteModule(
    'static-site-http-url-model',
    'Static Delivery, HTTP Representations, URLs, Bases, and Origins',
    'Pages work from a local file but break below a project subpath, directories redirect unexpectedly, fragments point nowhere, and the team confuses filesystem paths with URLs.',
    'versioned URL and delivery contract',
    [
      outcome(
        'ssg-static-request-model',
        'Trace a browser request through URL resolution, origin, path mapping, representation selection, cache, and response metadata.',
        'Static hosting means the browser reads repository files directly.'
      ),
      outcome(
        'ssg-path-url-separation',
        'Keep platform filesystem paths, POSIX publication paths, percent-encoded URL paths, queries, and fragments as distinct types.',
        'Path joining and URL joining obey the same rules.'
      ),
      outcome(
        'ssg-base-url',
        'Model root, project-subpath, preview, custom-domain, trailing-slash, and relative-link behavior under one explicit base URL.',
        'A leading slash always points to the intended site root.'
      ),
      outcome(
        'ssg-index-routing',
        'Define clean URLs, directory indexes, canonical output files, redirects, not-found behavior, and host-specific limits.',
        'Writing about.html automatically publishes the route /about/ everywhere.'
      ),
      outcome(
        'ssg-http-evidence',
        'Verify media type, character encoding, caching, compression, conditional delivery, range needs, and error behavior on the target host.',
        'Correct HTML bytes guarantee correct delivery semantics.'
      ),
    ]
  ),
  siteModule(
    'static-site-cli-pipeline',
    'Command Lifecycle, Configuration, Pipeline, and Atomic Output',
    'The script reads arguments during import, mixes parsing with writes, partially replaces the public directory on failure, and cannot explain which configuration won.',
    'import-safe deterministic build pipeline',
    [
      outcome(
        'ssg-main-boundary',
        'Keep import-safe definitions separate from a main entry point that returns meaningful status and writes diagnostics to the correct stream.',
        'A command-line script cannot be both importable and easy to run.'
      ),
      outcome(
        'ssg-config-precedence',
        'Define defaults, project configuration, environment, flags, validation, provenance, and redacted effective configuration.',
        'The last value loaded is automatically the correct configuration.'
      ),
      outcome(
        'ssg-pipeline-stages',
        'Separate discover, admit, decode, parse, validate, route, render, asset, verify, stage, and publish contracts.',
        'A long build function is simpler because data stays local.'
      ),
      outcome(
        'ssg-pure-core-shell',
        'Keep deterministic transformations pure and pass filesystem, clock, environment, logging, and publication effects through narrow adapters.',
        'Pure functions are impractical for a filesystem build tool.'
      ),
      outcome(
        'ssg-atomic-output',
        'Build into a fresh staging root, verify it, replace output deliberately, and preserve the prior good artifact on failure.',
        'Deleting output before building is the cleanest safe publication strategy.'
      ),
    ]
  ),
  siteModule(
    'static-site-paths-content-discovery',
    'Pathlib, Content Discovery, Roots, Symlinks, and Admission',
    'Recursive discovery follows a symlink outside content, includes hidden drafts and generated output, treats directories as documents, and overwrites two sources onto one route.',
    'bounded content-discovery manifest',
    [
      outcome(
        'ssg-pathlib-semantics',
        'Use Path and PurePath operations with explicit platform, resolution, relative, and I/O semantics instead of string slicing.',
        'Calling resolve is harmless normalization with no filesystem or trust consequences.'
      ),
      outcome(
        'ssg-discovery-policy',
        'Declare roots, extensions, ignores, hidden files, drafts, ordering, maximum files, depth, and total bytes before traversal.',
        'Glob recursion returns only intended content in stable order.'
      ),
      outcome(
        'ssg-symlink-root-policy',
        'Admit or reject symlinks using resolved ancestry, cycle handling, file type, and ownership policy.',
        'A lexical prefix check prevents every content-root escape.'
      ),
      outcome(
        'ssg-route-collision',
        'Detect case, Unicode, normalization, index, extension, and slug collisions before any output write.',
        'Distinct source filenames always produce distinct public routes.'
      ),
      outcome(
        'ssg-discovery-manifest',
        'Record stable source identity, relative path, size, digest purpose, route candidate, status, and rejection reason.',
        'The list of rendered pages is enough to reproduce discovery.'
      ),
    ]
  ),
  siteModule(
    'static-site-text-encoding-metadata',
    'Bytes, Unicode, Newlines, Front Matter, Metadata, and Schemas',
    'The build relies on locale encoding, silently replaces invalid bytes, parses arbitrary YAML objects, accepts duplicate metadata keys, and compares dates in mixed formats.',
    'versioned decoded-document and metadata contract',
    [
      outcome(
        'ssg-explicit-decoding',
        'Decode source bytes with declared UTF-8 and error policy while preserving path, byte count, newline behavior, and causal diagnostics.',
        'Markdown files are text, so encoding cannot affect a build.'
      ),
      outcome(
        'ssg-unicode-policy',
        'Choose normalization, identifier, comparison, sorting, and display policies while retaining original author text.',
        'Normalizing every string with NFKC is always safe and lossless.'
      ),
      outcome(
        'ssg-front-matter-boundary',
        'Recognize bounded delimiters, separate metadata bytes from body, reject malformed closure, and avoid executing content.',
        'Anything between triple dashes is safe configuration.'
      ),
      outcome(
        'ssg-metadata-schema',
        'Validate allowed keys, required values, types, formats, unknown fields, duplicates, defaults, and source locations.',
        'A dictionary with a title key is a valid document model.'
      ),
      outcome(
        'ssg-time-language-identity',
        'Represent dates, time zones, draft state, language tags, translations, authors, and stable IDs without locale ambiguity.',
        'A human-readable date string sorts and serializes consistently.'
      ),
    ]
  ),
  siteModule(
    'static-site-document-ast',
    'Tokens, Source Spans, Document Trees, Invariants, and Traversal',
    'The parser concatenates HTML strings immediately, loses source locations, uses one mutable node class for every construct, and cannot report which input caused invalid nesting.',
    'typed source-mapped document tree',
    [
      outcome(
        'ssg-parse-phases',
        'Distinguish scanning, tokenization, block parsing, inline parsing, tree construction, transformation, validation, and rendering.',
        'Parsing Markdown is a sequence of regular-expression replacements.'
      ),
      outcome(
        'ssg-node-model',
        'Model document, block, inline, text, code, link, image, and error nodes with explicit payload and children invariants.',
        'One generic node with nullable fields is the most flexible safe AST.'
      ),
      outcome(
        'ssg-source-spans',
        'Retain source path, line, column, byte or code-point span, and original excerpt through transformations.',
        'Source location can be reconstructed reliably from rendered HTML.'
      ),
      outcome(
        'ssg-tree-invariants',
        'Reject cycles, shared mutable children, impossible parent-child pairs, invalid spans, and unbounded depth.',
        'A tree built by recursive code is automatically acyclic and valid.'
      ),
      outcome(
        'ssg-visitor-transform',
        'Traverse and transform nodes without mutating shared input or losing identity, order, diagnostics, and provenance.',
        'A visitor may change child lists while iterating without observable risk.'
      ),
    ]
  ),
  siteModule(
    'static-site-inline-tokenization',
    'Inline Scanning, Delimiters, Escapes, Code Spans, and Emphasis',
    'A regex pairs the first and last asterisks, parses markup inside code, mishandles backslash escapes, loses literal delimiters, and becomes quadratic on long adversarial input.',
    'bounded inline tokenizer and delimiter resolver',
    [
      outcome(
        'ssg-inline-scanner',
        'Advance one cursor through text, escapes, entities, code spans, delimiters, links, and literal fallbacks without dropping characters.',
        'Successful recognition is the only scanner path that needs to advance.'
      ),
      outcome(
        'ssg-code-span',
        'Match bounded backtick runs, normalize permitted interior whitespace, preserve code text, and reject missing closure predictably.',
        'Inline code can be parsed after emphasis without changing meaning.'
      ),
      outcome(
        'ssg-delimiter-runs',
        'Classify delimiter runs from surrounding characters, track opener and closer state, and resolve nested emphasis deterministically.',
        'Pairing every two asterisks implements emphasis.'
      ),
      outcome(
        'ssg-escape-entity',
        'Distinguish source escapes, character references, literal text, and later HTML output encoding.',
        'Decoding an entity and escaping HTML are opposite interchangeable operations.'
      ),
      outcome(
        'ssg-inline-complexity',
        'Bound input length, delimiter work, nesting, diagnostics, and worst-case time with changed adversarial fixtures.',
        'Short normal posts prove inline parsing has acceptable complexity.'
      ),
    ]
  ),
  siteModule(
    'static-site-inline-links-media',
    'Links, Images, References, Autolinks, and URL Safety',
    'Nested brackets confuse destination parsing, unresolved references disappear, javascript URLs survive into output, duplicate labels change silently, and every image receives its filename as alt text.',
    'reference-aware accessible link and media model',
    [
      outcome(
        'ssg-link-grammar',
        'Parse labels, destinations, optional titles, nesting, escaping, angle forms, and balanced delimiters under a named subset.',
        'Splitting link source at the first closing bracket and parenthesis is sufficient.'
      ),
      outcome(
        'ssg-reference-definitions',
        'Normalize reference labels, detect duplicates, resolve forward references, preserve unresolved source, and report locations.',
        'Reference definitions must appear before links that use them.'
      ),
      outcome(
        'ssg-url-admission',
        'Classify relative, root-relative, fragment, mail, HTTP, data, and forbidden schemes before context-aware encoding.',
        'Percent-encoding an untrusted destination makes every URL safe.'
      ),
      outcome(
        'ssg-image-alternatives',
        'Require purposeful alt text or explicit decorative treatment and preserve captions, dimensions, and asset identity separately.',
        'The image filename is an adequate accessible alternative.'
      ),
      outcome(
        'ssg-link-integrity',
        'Resolve internal targets and fragments against the route manifest and distinguish build-known, external, generated, and runtime links.',
        'A syntactically valid href proves the destination exists.'
      ),
    ]
  ),
  siteModule(
    'static-site-block-parsing',
    'Lines, Containers, Headings, Paragraphs, Lists, Quotes, and Fenced Code',
    'Blank lines erase structure, list markers nest by guesswork, headings skip source evidence, a fence closes with the wrong marker, and paragraphs swallow following blocks.',
    'line-oriented block parser with explicit continuation rules',
    [
      outcome(
        'ssg-line-model',
        'Represent line content, indentation, blankness, offset, tab expansion, newline, and container prefix without discarding source positions.',
        'Splitting on newline produces every fact a block parser needs.'
      ),
      outcome(
        'ssg-block-precedence',
        'Apply named block-start and continuation precedence so paragraphs, headings, quotes, lists, thematic breaks, and code resolve consistently.',
        'Trying each block regex in any order produces the same document.'
      ),
      outcome(
        'ssg-heading-paragraph',
        'Parse ATX headings and paragraphs with closing-marker, interruption, inline-content, and empty-heading evidence.',
        'A line starting with a hash is always a heading.'
      ),
      outcome(
        'ssg-list-quote-containers',
        'Track list marker, start, indentation, tightness, continuation, quote depth, and blank lines through nested containers.',
        'Indentation alone determines all Markdown list nesting.'
      ),
      outcome(
        'ssg-fenced-code',
        'Match opening and closing fence character and length, retain info text and literal content, and define end-of-file behavior.',
        'Any three backticks close every fenced code block.'
      ),
    ]
  ),
  siteModule(
    'static-site-nesting-recursion',
    'Recursive Containers, Stack Parsing, Depth, and Recovery',
    'Deeply nested lists overflow recursion, an unmatched container consumes the rest of the file, child offsets drift, and one invalid construct prevents later valid content from rendering.',
    'bounded nested-block parser and recovery trace',
    [
      outcome(
        'ssg-recursion-contract',
        'Define base case, recursive reduction, returned state, source advancement, and invariant for nested document structures.',
        'Recursive code is correct when it eventually stops on familiar fixtures.'
      ),
      outcome(
        'ssg-container-stack',
        'Use an explicit open-container stack where depth, continuation, closure, and source ownership need controlled iteration.',
        'Recursion and stacks cannot be combined in one parser design.'
      ),
      outcome(
        'ssg-depth-budget',
        'Reject or recover from excessive nesting before Python recursion, memory, or diagnostic output becomes unbounded.',
        'Markdown nesting is naturally too shallow to need a limit.'
      ),
      outcome(
        'ssg-error-recovery',
        'Emit a located diagnostic, preserve literal source where safe, resynchronize at a documented boundary, and continue independent parsing.',
        'A parser must either accept the whole file or produce no page.'
      ),
      outcome(
        'ssg-nesting-evidence',
        'Test mixed quote, list, code, paragraph, blank-line, and malformed nesting against tree and source-span invariants.',
        'One deeply nested happy path covers container interactions.'
      ),
    ]
  ),
  siteModule(
    'static-site-html-rendering-escaping',
    'Semantic HTML Rendering, Contextual Escaping, and Determinism',
    'Text nodes can inject markup, code is double-escaped, attributes are unquoted, heading IDs collide, dictionary order leaks into output, and raw HTML bypasses the trust model.',
    'deterministic context-safe semantic HTML renderer',
    [
      outcome(
        'ssg-renderer-contract',
        'Render each validated node through one owned semantic mapping without reparsing generated strings as source.',
        'Any HTML that looks equivalent in a browser is equally correct output.'
      ),
      outcome(
        'ssg-contextual-escaping',
        'Encode untrusted text and attribute values for their exact HTML context and reject unsafe script, style, comment, and URL placements.',
        'One global string replacement prevents all HTML injection.'
      ),
      outcome(
        'ssg-safe-html-type',
        'Keep trusted renderer output distinct from untrusted author text and make every conversion into trusted markup explicit and reviewable.',
        'A string becomes safe HTML after it has been escaped once.'
      ),
      outcome(
        'ssg-semantic-mapping',
        'Map headings, paragraphs, lists, quotes, code, links, images, tables, and landmarks to valid meaningful HTML with content constraints.',
        'Div and span elements are safer because they avoid semantic rules.'
      ),
      outcome(
        'ssg-render-determinism',
        'Stabilize ordering, whitespace policy, identifiers, serialization, and newline conventions and compare output digests across clean builds.',
        'Python preserves insertion order, so all rendered output is reproducible.'
      ),
    ]
  ),
  siteModule(
    'static-site-templates-jinja',
    'Jinja 3.1.6 Environments, Layouts, Autoescape, and Contracts',
    'Templates are constructed from author text, autoescape is assumed rather than configured, missing values render empty, safe filters spread, inheritance cycles hide layout ownership, and logic consumes arbitrary objects.',
    'strict autoescaped layout and component system',
    [
      outcome(
        'ssg-jinja-environment',
        'Create one configured Jinja environment with bounded loader roots, explicit autoescape, StrictUndefined, deterministic globals, and version evidence.',
        'Jinja enables safe HTML autoescaping for every template by default.'
      ),
      outcome(
        'ssg-template-contract',
        'Pass a documented immutable view model instead of filesystem objects, services, secrets, or unrestricted application state.',
        'Templates need the full document object to remain flexible.'
      ),
      outcome(
        'ssg-inheritance-components',
        'Use base layouts, blocks, includes, and macros with explicit ownership, required regions, naming, and bounded inheritance.',
        'Template inheritance automatically prevents duplicated markup and invalid structure.'
      ),
      outcome(
        'ssg-safe-boundary',
        'Mark only renderer-produced reviewed HTML as safe and keep titles, metadata, labels, attributes, and author strings autoescaped.',
        'The safe filter is acceptable whenever content came from a Markdown file.'
      ),
      outcome(
        'ssg-template-diagnostics',
        'Turn missing templates, undefined variables, invalid blocks, unsafe values, and source locations into actionable build failures.',
        'Rendering an empty missing value is more resilient than failing the build.'
      ),
    ]
  ),
  siteModule(
    'static-site-slugs-permalinks',
    'Slugs, Permalinks, Redirects, Canonicals, and Route Manifests',
    'Titles become unstable routes, Unicode collapses into empty slugs, case-only paths collide on deployment, old links vanish after rename, and canonical URLs point at preview origins.',
    'collision-free versioned route and redirect manifest',
    [
      outcome(
        'ssg-stable-route-identity',
        'Separate stable content identity from mutable title, source path, output path, display label, and public URL.',
        'The page title is the best permanent URL identifier.'
      ),
      outcome(
        'ssg-slug-policy',
        'Define Unicode normalization, transliteration or preservation, case, separators, reserved names, empties, length, and collision behavior.',
        'Lowercasing and replacing spaces produces portable unique slugs.'
      ),
      outcome(
        'ssg-permalink-policy',
        'Select explicit or derived permalinks, trailing-slash convention, date behavior, language prefix, and base path with migration evidence.',
        'Changing a filename cannot affect a public URL.'
      ),
      outcome(
        'ssg-redirect-graph',
        'Validate old-to-new redirects for loops, chains, conflicts, missing targets, host support, and retention ownership.',
        'Adding one redirect file guarantees every static host applies it.'
      ),
      outcome(
        'ssg-canonical-origin',
        'Build canonical, alternate-language, feed, and sitemap URLs only from production origin and route evidence, never request or preview state.',
        'A relative canonical link is portable and unambiguous.'
      ),
    ]
  ),
  siteModule(
    'static-site-navigation-taxonomy',
    'Collections, Taxonomy, Ordering, Navigation, Feeds, and Sitemaps',
    'Navigation depends on filesystem order, tags differ by case, drafts leak into feeds, pagination duplicates pages, orphan content is invisible, and sitemap URLs disagree with canonical routes.',
    'reconciled accessible site graph and derived publications',
    [
      outcome(
        'ssg-collection-query',
        'Select published documents by typed metadata, language, route, taxonomy, and time under deterministic query and ordering rules.',
        'Filtering a list of dictionaries is enough to define a stable collection.'
      ),
      outcome(
        'ssg-taxonomy-identity',
        'Normalize tag and category identity separately from labels, aliases, hierarchy, route, and language.',
        'Two tag labels that look the same are automatically one taxonomy term.'
      ),
      outcome(
        'ssg-navigation-graph',
        'Build global, local, breadcrumb, previous-next, related, and multiple-way navigation from an acyclic visible route graph.',
        'A chronological list provides sufficient navigation for every reader.'
      ),
      outcome(
        'ssg-pagination-orphans',
        'Define page size, stable boundaries, first-page route, canonical behavior, empty pages, orphans, and changed insertion cases.',
        'Pagination remains stable when new content is inserted at the beginning.'
      ),
      outcome(
        'ssg-feed-sitemap',
        'Derive feeds and sitemaps from the same published route manifest and validate absolute URLs, dates, escaping, exclusions, and counts.',
        'Feeds, sitemaps, and navigation may each discover content independently.'
      ),
    ]
  ),
  siteModule(
    'static-site-assets-fingerprints',
    'Assets, Media Admission, Fingerprints, CSS, and Integrity',
    'Assets are copied by basename, path traversal escapes the output root, CSS references are missed, hashes change with timestamps, huge images ship unchanged, and stale files survive rebuilds.',
    'bounded content-addressed asset manifest',
    [
      outcome(
        'ssg-asset-admission',
        'Admit assets by root, type, extension, signature where needed, size, dimensions, license, owner, and active-content policy.',
        'A familiar file extension proves an asset is safe and appropriate.'
      ),
      outcome(
        'ssg-asset-route',
        'Map source asset identity to collision-free public URL and output path without trusting basename or author traversal.',
        'Copying assets into one public folder cannot overwrite unrelated files.'
      ),
      outcome(
        'ssg-content-fingerprint',
        'Hash canonical bytes with recorded algorithm and use the digest for cache-busting identity without embedding unstable metadata.',
        'File modification time is a reliable content fingerprint.'
      ),
      outcome(
        'ssg-reference-rewrite',
        'Resolve and rewrite document, template, CSS, source-map, icon, manifest, and responsive-media references through one asset manifest.',
        'Only HTML src attributes can refer to generated assets.'
      ),
      outcome(
        'ssg-media-performance',
        'Generate or admit responsive image variants, dimensions, formats, loading hints, fonts, and fallbacks against quality and byte budgets.',
        'Converting every image to the newest format is automatically faster and accessible.'
      ),
    ]
  ),
  siteModule(
    'static-site-incremental-dependencies',
    'Dependency Graphs, Incremental Builds, Caches, and Watch Mode',
    'Changing a layout rebuilds one page, deleting content leaves output behind, cached nodes ignore parser versions, watch events duplicate builds, and a fast incremental result differs from a clean build.',
    'clean-equivalent incremental dependency engine',
    [
      outcome(
        'ssg-dependency-graph',
        'Record source, metadata, template, include, collection, taxonomy, route, asset, configuration, and tool-version dependencies per output.',
        'A page depends only on its Markdown source file.'
      ),
      outcome(
        'ssg-cache-key',
        'Key cached stages by canonical input bytes, relevant configuration, algorithm and tool versions, schema, and platform boundary.',
        'A source modification time is a sufficient cache key.'
      ),
      outcome(
        'ssg-invalidation',
        'Propagate changed, added, deleted, renamed, and dependency updates to every affected output and derived collection.',
        'Incremental invalidation only needs to handle edited files.'
      ),
      outcome(
        'ssg-watch-coalescing',
        'Treat watch events as hints, debounce bursts, rescan authoritative state, serialize publication, and recover from overflow or missed events.',
        'Every filesystem notification maps one-to-one to a user edit.'
      ),
      outcome(
        'ssg-clean-equivalence',
        'Compare incremental and clean route manifests, bytes, diagnostics, removals, and digests across randomized change sequences.',
        'A fast successful incremental build can be trusted without clean-build comparison.'
      ),
    ]
  ),
  siteModule(
    'static-site-accessibility-semantics',
    'Accessible Content Models, Landmarks, Headings, Links, Media, and Language',
    'Templates emit multiple mains, heading levels follow visual size, skip links target missing IDs, repeated links have vague labels, code lacks context, and media alternatives are never reviewed.',
    'WCAG 2.2 content and template conformance gate',
    [
      outcome(
        'ssg-landmark-heading-model',
        'Enforce document language, unique main, named navigation, logical heading outline, bypass mechanism, title, and meaningful sequence.',
        'Valid HTML guarantees an understandable landmark and heading structure.'
      ),
      outcome(
        'ssg-link-purpose-location',
        'Require meaningful link text, current-location evidence, multiple ways to find pages, breadcrumb semantics, and non-color state.',
        'A screen reader can infer the purpose of every “read more” link.'
      ),
      outcome(
        'ssg-media-alternatives',
        'Validate image purpose, alt decision, captions, transcripts, audio description needs, decorative handling, and accessible fallback.',
        'Every image should have a detailed nonempty alt attribute.'
      ),
      outcome(
        'ssg-code-table-content',
        'Give code blocks language and context, preserve keyboard scrolling, label tables with correct header relationships, and offer text alternatives for visual diagrams.',
        'Pre and table elements are accessible without content-specific review.'
      ),
      outcome(
        'ssg-accessibility-evidence',
        'Combine structural checks, keyboard and zoom review, screen-reader tasks, content review, changed routes, and human ownership.',
        'An automated accessibility scanner can certify the whole static site.'
      ),
    ]
  ),
  siteModule(
    'static-site-responsive-performance',
    'Responsive CSS, Reflow, Progressive Enhancement, and Performance Budgets',
    'Generated pages assume one viewport, content clips at zoom, navigation depends on JavaScript, fonts block text, images shift layout, and a fast home page hides slow long-form routes.',
    'responsive progressively enhanced performance budget',
    [
      outcome(
        'ssg-mobile-first-shell',
        'Build intrinsic layouts with content-driven breakpoints, logical properties, flexible media, readable measures, and no fixed-viewport dependency.',
        'Choosing common phone, tablet, and desktop widths makes a layout responsive.'
      ),
      outcome(
        'ssg-reflow-zoom',
        'Verify 320 CSS-pixel reflow, 200 and 400 percent zoom, text spacing, long tokens, code, tables, and translated content without two-dimensional page scrolling.',
        'A page that fits at 390 pixels will also work at zoom and with long content.'
      ),
      outcome(
        'ssg-progressive-enhancement',
        'Deliver core reading and navigation in HTML, layer CSS and optional JavaScript, and define failure behavior for blocked or broken enhancements.',
        'A static site is progressively enhanced because its files are static.'
      ),
      outcome(
        'ssg-resource-budget',
        'Budget HTML, CSS, JavaScript, fonts, images, requests, layout shifts, and critical rendering work per representative template and route.',
        'One total transfer-size limit captures user-visible performance.'
      ),
      outcome(
        'ssg-performance-evidence',
        'Measure cold and warm representative routes across mobile, tablet, desktop, slow networks, long content, missing cache, and disabled JavaScript.',
        'A local desktop load time predicts field performance.'
      ),
    ]
  ),
  siteModule(
    'static-site-security-trust',
    'Threat Models, Untrusted Content, XSS, Paths, Templates, and CSP',
    'Raw HTML executes author input, javascript links survive, a template loader escapes its root, copied SVG contains active content, secrets enter output, and CSP is treated as the only XSS defense.',
    'explicit static-publishing trust and security policy',
    [
      outcome(
        'ssg-threat-model',
        'Identify content authors, reviewers, build runner, dependencies, templates, assets, output consumers, hosting controls, protected data, and realistic attackers.',
        'Static output cannot create serious security or privacy harm.'
      ),
      outcome(
        'ssg-markdown-html-policy',
        'Disable or sanitize raw HTML according to content trust and parser configuration and test dangerous tags, attributes, URLs, and DOM identifiers.',
        'CommonMark-compliant raw HTML is safe because it came from a repository.'
      ),
      outcome(
        'ssg-template-path-defense',
        'Constrain content, include, template, output, and asset paths; reject traversal, symlink escape, special files, and output overlap.',
        'Pathlib automatically prevents directory traversal.'
      ),
      outcome(
        'ssg-secret-privacy-scan',
        'Treat every output byte as public, scan for credentials and private metadata, minimize analytics, and require consent and retention policy.',
        'A private source repository keeps generated secrets private on public hosting.'
      ),
      outcome(
        'ssg-defense-in-depth',
        'Combine contextual encoding, URL validation, sanitization where required, strict templates, CSP, integrity, dependency review, and host headers.',
        'A restrictive CSP repairs unsafe generated HTML.'
      ),
    ]
  ),
  siteModule(
    'static-site-testing-validation',
    'Fixtures, Golden Files, Properties, Fuzzing, HTML Validation, and Browser Tests',
    'Tests snapshot everything, approve changed HTML blindly, omit malformed input, compare only strings, never mutate fixtures, and treat validator success as user-flow proof.',
    'layered parser-to-browser verification matrix',
    [
      outcome(
        'ssg-test-pyramid',
        'Separate scanner, parser, renderer, route, asset, incremental, CLI, filesystem, validation, browser, accessibility, deployment, and recovery evidence.',
        'End-to-end site snapshots make lower-level tests redundant.'
      ),
      outcome(
        'ssg-golden-contract',
        'Use small reviewed input, expected tree, diagnostics, route manifest, and output fixtures with explicit update review.',
        'A large approved HTML snapshot clearly explains every intended behavior.'
      ),
      outcome(
        'ssg-property-tests',
        'Check consumption, round-trip boundaries, tree validity, escaping, route uniqueness, determinism, clean equivalence, and idempotence across generated cases.',
        'Property testing means generating random Markdown and expecting no exception.'
      ),
      outcome(
        'ssg-fuzz-resource',
        'Fuzz malformed delimiters, nesting, Unicode, metadata, paths, templates, and assets under time, memory, depth, file, and diagnostic budgets.',
        'A parser that does not crash is safe against adversarial content.'
      ),
      outcome(
        'ssg-validation-browser',
        'Combine standards validation, internal-link and fragment checks, accessibility rules, keyboard tasks, multiple viewports, and representative published-host smoke tests.',
        'Valid HTML proves routes, interactions, and reader tasks work.'
      ),
    ]
  ),
  siteModule(
    'static-site-diagnostics-observability',
    'Diagnostics, Build Reports, Metrics, Profiles, and Failure Triage',
    'The command prints unordered warnings without locations, hides skipped pages, reports only total duration, logs author content and local paths, and cannot compare a slow build with a prior release.',
    'bounded actionable build and publication evidence report',
    [
      outcome(
        'ssg-diagnostic-model',
        'Represent severity, stable code, source span, stage, message, safe context, cause, suggestion, and ownership separately.',
        'A stack trace is the most actionable build diagnostic for authors.'
      ),
      outcome(
        'ssg-diagnostic-policy',
        'Sort deterministically, deduplicate, cap cascades, promote configured warnings, summarize omissions, and return status from policy.',
        'More warnings always produce more trustworthy builds.'
      ),
      outcome(
        'ssg-build-metrics',
        'Record admitted and rejected files, pages, assets, links, bytes, cache hits, stage durations, peak memory, validation findings, and artifact digest.',
        'Total build time is enough observability for a generator.'
      ),
      outcome(
        'ssg-profile-bottleneck',
        'Profile representative cold, warm, full, incremental, long-page, high-link, and high-asset builds before optimizing measured stages.',
        'The parser must be the bottleneck because every page uses it.'
      ),
      outcome(
        'ssg-redaction-retention',
        'Redact secrets, home paths, private content, and identifiers; bound logs; define retention; and preserve enough identity for causal comparison.',
        'Local build logs cannot expose sensitive information.'
      ),
    ]
  ),
  siteModule(
    'static-site-packaging-cli',
    'Project Metadata, Python Packaging, Entry Points, Plugins, and Clean Installs',
    'The generator runs only from its repository, imports templates through the current directory, has unbounded dependencies, discovers arbitrary plugins, omits package data, and is never installed into a clean environment.',
    'installed reproducible static-site command',
    [
      outcome(
        'ssg-pyproject-metadata',
        'Declare build backend, project metadata, Python bounds, dependencies, optional groups, entry point, package data, license, and version source in pyproject.toml.',
        'A requirements file fully describes an installable command.'
      ),
      outcome(
        'ssg-console-entry',
        'Expose an import-safe console script with argument parsing, status codes, stdout and stderr contracts, help, version, and module execution parity.',
        'A console entry point receives command-line arguments automatically as parameters.'
      ),
      outcome(
        'ssg-resource-loading',
        'Load packaged templates, schemas, and default assets through supported resource APIs rather than current working directory assumptions.',
        'Relative paths beside source modules work after wheel installation.'
      ),
      outcome(
        'ssg-plugin-contract',
        'Define versioned capabilities, explicit enablement, discovery scope, configuration schema, isolation limits, deterministic order, and failure policy for plugins.',
        'Python entry-point discovery makes third-party plugins trusted and compatible.'
      ),
      outcome(
        'ssg-clean-install',
        'Build sdist and wheel, inspect contents and metadata, install into fresh supported environments, run the command elsewhere, and verify uninstall boundaries.',
        'A successful editable install proves the release artifact works.'
      ),
    ]
  ),
  siteModule(
    'static-site-ci-deployment',
    'Reproducible Builds, CI Gates, Artifacts, GitHub Pages, and Promotion',
    'CI downloads floating tools, embeds current time, deploys from a dirty workspace, rebuilds after approval, grants broad token permissions, and publishes preview origins as canonical URLs.',
    'immutable reproducible staged deployment pipeline',
    [
      outcome(
        'ssg-reproducible-build',
        'Eliminate unstable order, paths, locale, time, random values, permissions, and environment leakage; use recorded source and tool identity and compare clean digests.',
        'A deterministic Python function guarantees a reproducible site artifact.'
      ),
      outcome(
        'ssg-ci-trust',
        'Pin workflow dependencies, minimize permissions, isolate untrusted changes, protect environments, retain logs safely, and separate build from deployment authority.',
        'A repository workflow is trusted because maintainers can review it.'
      ),
      outcome(
        'ssg-artifact-promotion',
        'Build once, validate, identify, attest, retain, approve, and deploy the exact same immutable artifact instead of rebuilding.',
        'Re-running the build at deploy time is equivalent to artifact promotion.'
      ),
      outcome(
        'ssg-pages-deployment',
        'Package the public root correctly, upload a Pages artifact, deploy only from an authorized event, and verify base path, custom domain, HTTPS, and not-found behavior.',
        'Pushing generated files is the only way to deploy a custom generator to GitHub Pages.'
      ),
      outcome(
        'ssg-postdeploy-smoke',
        'Verify representative URLs, headers, assets, fragments, accessibility tasks, canonical origin, cache behavior, artifact identity, and rollback trigger after publication.',
        'A green deploy job proves the public site is correct.'
      ),
    ]
  ),
  siteModule(
    'static-site-release-recovery-defense',
    'Migration, Release Gates, Rollback, Recovery, Operations, and Defense',
    'The newest artifact replaces production without a route diff, removed URLs are discovered by readers, rollback requires rebuilding, caches preserve broken assets, ownership ends after deployment, and generated volume is called completion.',
    'production publication, migration, and recovery dossier',
    [
      outcome(
        'ssg-migration-diff',
        'Compare old and new routes, redirects, canonicals, content identity, metadata, links, assets, accessibility, and reader tasks before cutover.',
        'If every source file built, migration preserved the existing site.'
      ),
      outcome(
        'ssg-release-gates',
        'Gate one immutable artifact on content approval, correctness, accessibility, security, performance, reproducibility, portability, licenses, and operational readiness.',
        'Passing unit tests makes the latest artifact ready to publish.'
      ),
      outcome(
        'ssg-rollback-cache',
        'Retain prior artifacts and route manifests, rehearse host rollback, account for immutable asset and HTML cache behavior, and define abort thresholds.',
        'Redeploying yesterday’s source immediately restores every reader.'
      ),
      outcome(
        'ssg-recovery-ownership',
        'Diagnose broken builds, partial deploys, missing routes, bad redirects, stale caches, expired domains, and compromised content with named owners and communication.',
        'Static sites need no incident or recovery plan.'
      ),
      outcome(
        'ssg-production-defense',
        'Defend reader value, content authority, parser scope, route integrity, accessibility, security, performance, deployment, recovery, and residual risk together.',
        'Thousands of generated steps or pages prove production readiness.',
        'strategic',
        'create'
      ),
    ]
  ),
];

function source(title, url, version, scope) {
  return { title, authority: 'official-docs', url, version, reviewedAt: REVIEWED_AT, scope };
}

const sources = [
  source(
    'Python 3.14.6 Documentation',
    'https://docs.python.org/3.14/',
    'Python 3.14.6 current 2026-07-14',
    'Language, data model, typing, dataclasses, exceptions, Unicode, testing, profiling, command lines, paths, files, hashing, URLs, HTML encoding, packaging boundaries, and platform behavior.'
  ),
  source(
    'Python pathlib Documentation',
    'https://docs.python.org/3.14/library/pathlib.html',
    'Python 3.14.6 current 2026-07-14',
    'Pure and concrete paths, traversal, globbing, resolution, symlinks, relative paths, file types, and platform differences.'
  ),
  source(
    'Python html Documentation',
    'https://docs.python.org/3.14/library/html.html',
    'Python 3.14.6 current 2026-07-14',
    'HTML character-reference escaping and unescaping boundaries.'
  ),
  source(
    'Python urllib.parse Documentation',
    'https://docs.python.org/3.14/library/urllib.parse.html',
    'Python 3.14.6 current 2026-07-14',
    'URL splitting, joining, quoting, relative resolution, security caveats, and RFC versus WHATWG behavior.'
  ),
  source(
    'Python argparse Documentation',
    'https://docs.python.org/3.14/library/argparse.html',
    'Python 3.14.6 current 2026-07-14',
    'Command parsing, help, errors, subcommands, files, exits, and testable command design.'
  ),
  source(
    'CommonMark Specification',
    'https://spec.commonmark.org/0.31.2/',
    'CommonMark 0.31.2 current 2026-07-14',
    'Normative block and inline parsing rules, precedence, delimiter behavior, HTML blocks, links, examples, and conformance boundaries.'
  ),
  source(
    'markdown-it-py Package',
    'https://pypi.org/project/markdown-it-py/',
    'markdown-it-py 4.2.0 current 2026-07-14',
    'Current Python support, released artifact identity, CommonMark baseline, extensibility, and production-parser comparison.'
  ),
  source(
    'markdown-it-py Security Guidance',
    'https://markdown-it-py.readthedocs.io/en/latest/security.html',
    '4.2 documentation current 2026-07-14',
    'Raw HTML defaults, js-default safe configuration, dangerous URL handling, sanitization choices, plugin identifier safety, and trust boundaries.'
  ),
  source(
    'Jinja Documentation',
    'https://jinja.palletsprojects.com/en/stable/',
    'Jinja 3.1.6 current 2026-07-14',
    'Environments, loaders, autoescape, StrictUndefined, inheritance, includes, macros, sandbox limitations, diagnostics, and template security.'
  ),
  source(
    'MarkupSafe Documentation',
    'https://markupsafe.palletsprojects.com/en/stable/',
    'MarkupSafe 3.0.x current docs reviewed 2026-07-14',
    'Escaped text and trusted-markup type boundaries used by Jinja.'
  ),
  source(
    'HTML Living Standard',
    'https://html.spec.whatwg.org/',
    'Living Standard updated 2026-07-08',
    'Document structure, semantics, links, images, metadata, scripting, parsing, serialization, and rendering behavior.'
  ),
  source(
    'URL Living Standard',
    'https://url.spec.whatwg.org/',
    'Living Standard current 2026-07-14',
    'URL parsing, hosts, paths, percent encoding, relative resolution, and serializer behavior.'
  ),
  source(
    'HTTP Semantics',
    'https://www.rfc-editor.org/rfc/rfc9110',
    'RFC 9110 current 2026-07-14',
    'Representations, media types, content, conditional requests, ranges, redirects, and static-delivery semantics.'
  ),
  source(
    'WCAG 2.2 Recommendation',
    'https://www.w3.org/TR/WCAG22/',
    'W3C Recommendation current 2026-07-14',
    'Perceivable, operable, understandable, robust content; reflow; focus; targets; headings; labels; language; media; and status evidence.'
  ),
  source(
    'WAI Page Structure Tutorial',
    'https://www.w3.org/WAI/tutorials/page-structure/',
    'W3C WAI guidance current 2026-07-14',
    'Regions, headings, content structure, navigation, skip mechanisms, and semantic review.'
  ),
  source(
    'CSS Snapshot 2025',
    'https://www.w3.org/TR/css-2025/',
    'W3C CSS Snapshot current 2026-07-14',
    'Stable CSS specifications, responsive layout primitives, media queries, logical properties, sizing, and rendering boundaries.'
  ),
  source(
    'OWASP Cross Site Scripting Prevention',
    'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html',
    'OWASP current 2026-07-14',
    'Contextual output encoding, URL validation, sanitization, dangerous contexts, and defense-in-depth limits.'
  ),
  source(
    'OWASP File Upload Guidance',
    'https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html',
    'OWASP current 2026-07-14',
    'Filename, type, signature, size, storage, active-content, public-retrieval, and resource defenses relevant to admitted assets.'
  ),
  source(
    'Content Security Policy Level 3',
    'https://www.w3.org/TR/CSP3/',
    'W3C Working Draft current 2026-07-14',
    'Policy delivery, source expressions, nonces, hashes, reporting, and the limits of CSP as a secondary control.'
  ),
  source(
    'pytest Documentation and Changelog',
    'https://docs.pytest.org/en/stable/',
    'pytest 9.1.1 current 2026-07-14',
    'Fixtures, parametrization, temporary paths, assertions, collection, warnings, plugins, and current compatibility.'
  ),
  source(
    'Python Packaging User Guide',
    'https://packaging.python.org/en/latest/',
    'PyPA guide updated 2026-06-22',
    'pyproject metadata, dependency specifications, entry points, command packaging, artifacts, clean installation, and distribution.'
  ),
  source(
    'Reproducible Builds SOURCE_DATE_EPOCH',
    'https://reproducible-builds.org/docs/source-date-epoch/',
    'Specification and guidance current 2026-07-14',
    'Stable time inputs, deterministic build identity, environment boundaries, troubleshooting, and source-derived timestamps.'
  ),
  source(
    'Git 2.55 Documentation',
    'https://git-scm.com/docs',
    'Git 2.55 current 2026-07-14',
    'Repository status, revisions, diffs, tags, content identity, recovery, and release evidence.'
  ),
  source(
    'GitHub Pages Publishing Source',
    'https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site',
    'GitHub Pages current 2026-07-14',
    'Custom Actions builds, Pages artifacts, deploy-pages, environment protection, subpaths, public visibility, custom domains, and deployment boundaries.'
  ),
  source(
    'ACM IEEE AAAI CS2023 Curriculum',
    'https://csed.acm.org/',
    'CS2023 reviewed 2026-07-14',
    'Recognized programming-language, software-development, web, HCI, accessibility, testing, security, ethics, and professional outcomes.'
  ),
];

export const buildStaticSitePythonConfig = finalizeCourse(
  {
    id: 'build-static-site-python',
    competencyIdPrefix: 'ssg-',
    title: 'Build and Ship a Production Static Site Generator with Python 3.14',
    version: '2026.07',
    audience: {
      description:
        'Python, object-oriented programming, Git, and responsive-web learners who need to design, build, test, package, deploy, migrate, and defend a production static-site generator rather than copy a narrow Markdown replacement tutorial.',
      entryKnowledge: [
        'Write and test Python functions and classes; use dataclasses, collections, recursion, exceptions, imports, type hints, paths, files, packages, and command-line programs.',
        'Create semantic accessible responsive HTML and CSS, reason about URLs and browser behavior, and use Git status, diffs, revisions, branches, and recovery workflows.',
      ],
      deviceConstraints: [
        'Modern browser; instant Python practice uses deterministic pure parser, route, render, graph, and publication models with fixed in-memory fixtures in an isolated Pyodide 3.14 worker. Real filesystems, Jinja, markdown-it-py, validators, browsers, GitHub, Pages, DNS, TLS, CDNs, and production hosts remain explicit controlled transfer gates.',
      ],
      accessibilityAssumptions: [
        'Source spans, trees, routes, links, assets, diagnostics, reports, code, rendered structure, and deployment evidence have structured text, keyboard operation, announced status, large targets, reflow, reduced motion, and no color-only meaning.',
      ],
    },
    scope: {
      includes: [
        'Python 3.14.6; static delivery and URL models; import-safe CLI and atomic pipeline; pathlib content admission; Unicode and typed metadata; source-mapped ASTs; bounded inline and block parsing; recursion and recovery; semantic context-safe HTML rendering; Jinja 3.1.6; slugs, permalinks, redirects, navigation, taxonomies, feeds, and sitemaps; content-addressed assets; dependency-aware incremental builds; WCAG 2.2; responsive progressive enhancement; security; layered tests and validation; diagnostics and profiles; Python packaging; reproducible CI and GitHub Pages deployment; migration, rollback, recovery, and production defense',
        'A deliberately bounded educational Markdown subset compared against CommonMark 0.31.2 and markdown-it-py 4.2.0, with honest conformance, raw-HTML, parser-complexity, browser, filesystem, template, validator, deployment, and hosting transfer gates',
        'Five cumulative authentic publication deliveries and a performance-based unfamiliar-site defense examination',
      ],
      excludes: [
        'Copied CommonMark examples or external tutorial prose and code, claims that the educational parser is full CommonMark, unsafe raw HTML, arbitrary host execution, hidden answers, inaccessible output, live network publication from the browser, or production release based only on generated volume and a local happy path.',
      ],
      nextCourses: ['build-web-scraper-python', 'personal-project-1', 'python-dsa'],
    },
    sources,
    sharedRequirements: [
      'Every activity retrieves reader outcome, content authority, revision, Python and tool versions, source and route identity, trust policy, accessibility requirement, bounded-resource rule, changed fixture, failure evidence, recovery, and explicit browser-versus-production limits before adding one publishing boundary.',
      'Browser Python uses original fixed in-memory fixtures and deterministic pure functions. It does not claim native filesystem, full CommonMark, Jinja, validators, browsers, GitHub Actions, Pages, DNS, TLS, CDN, cache, or production behavior; those require controlled transfer evidence.',
      'Passing work requires a stable scenario and artifact identity, prediction, intermediate parse or graph state, exact observable output, a changed and rejected case, a test that detects a deliberate defect, accessible stakeholder evidence, and a named owner for remaining risk.',
    ],
    modules,
    projects: [
      project(
        'ssg-pipeline-parser-foundation',
        'Source-Mapped Content Pipeline and Parser Foundation',
        'static-site-nesting-recursion',
        'A multilingual community documentation editor',
        'They need an import-safe atomic command that admits authorized UTF-8 content, validates metadata, builds a source-mapped bounded document tree, parses a declared Markdown subset, reports malformed nesting precisely, and preserves literal author evidence without pretending full CommonMark conformance.',
        [
          'ssg-reader-outcome',
          'ssg-atomic-output',
          'ssg-metadata-schema',
          'ssg-tree-invariants',
          'ssg-error-recovery',
        ]
      ),
      project(
        'ssg-safe-render-route-system',
        'Safe Semantic Renderer and Stable Route System',
        'static-site-navigation-taxonomy',
        'A public-service information architect',
        'They need context-safe semantic HTML, strict autoescaped layouts, collision-free multilingual routes, redirects, meaningful navigation, feeds, sitemaps, and broken-link evidence that remain correct under a project subpath and changed content titles.',
        [
          'ssg-contextual-escaping',
          'ssg-jinja-environment',
          'ssg-stable-route-identity',
          'ssg-navigation-graph',
          'ssg-feed-sitemap',
        ]
      ),
      project(
        'ssg-accessible-incremental-site',
        'Accessible Responsive Incremental Publication',
        'static-site-responsive-performance',
        'A disability-led local news cooperative',
        'They need fingerprinted licensed media, clean-equivalent incremental builds, accessible articles and navigation, responsive reflow, progressive enhancement, representative performance budgets, and human review evidence across mobile, tablet, desktop, zoom, long content, and disabled JavaScript.',
        [
          'ssg-content-fingerprint',
          'ssg-clean-equivalence',
          'ssg-landmark-heading-model',
          'ssg-reflow-zoom',
          'ssg-performance-evidence',
        ]
      ),
      project(
        'ssg-tested-packaged-release',
        'Secure Tested and Packaged Generator Release',
        'static-site-packaging-cli',
        'An internal developer-platform release engineer',
        'They need a threat-modeled generator, safe content and template boundaries, layered parser and browser tests, bounded fuzzing, actionable diagnostics, inspected wheel and sdist artifacts, a clean-install console command, and explicit plugin limits.',
        [
          'ssg-markdown-html-policy',
          'ssg-test-pyramid',
          'ssg-fuzz-resource',
          'ssg-diagnostic-model',
          'ssg-clean-install',
        ]
      ),
      project(
        'ssg-production-publication-defense',
        'Production Publication, Migration, and Recovery Defense',
        'static-site-release-recovery-defense',
        'A joint reader, editor, accessibility, security, platform, and operations review board',
        'The board needs a reproducible immutable artifact, least-authority GitHub Pages pipeline, route and content migration diff, post-deploy smoke evidence, cache-aware rollback rehearsal, incident ownership, and a defensible record of residual risks and parser limitations.',
        [
          'ssg-reproducible-build',
          'ssg-ci-trust',
          'ssg-postdeploy-smoke',
          'ssg-migration-diff',
          'ssg-production-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar publication cases spanning reader outcome, repository and content authority, static HTTP and URLs, command and atomic pipeline, path admission, Unicode and metadata, source-mapped trees, inline and block parsing, recursion and recovery, semantic escaping, Jinja, routes and redirects, navigation and derived publications, assets, incremental dependencies, accessibility, responsive performance, security, testing, diagnostics, packaging, reproducibility, deployment, migration, rollback, recovery, and residual-risk defense with explicit browser, filesystem, library, validator, host, and production boundaries.',
    minimumQuestionBankSize: 760,
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: ['python-basics', 'python-oop', 'responsive-web-design', 'git-basics'],
  }
);
