import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-15T05:00:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing misconception for Bookbot competency ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function bookbotModule(id, title, context, artifact, skills) {
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict the user decision, input identity, text policy, expected report, failure boundary, and evidence that could disprove the proposed implementation before reading the governing source.`,
      workshop: `A library-tools pair incrementally builds ${artifact} from an original fixed text fixture while retaining earlier Git, Python, Unicode, determinism, bounded-resource, accessibility, testing, and evidence requirements.`,
      debug: `A preserved Bookbot run contains one plausible path, decoding, normalization, tokenization, counting, ranking, reporting, CLI, testing, performance, packaging, security, or release defect; identify the first failed boundary before changing code.`,
      lab: `An independent archive team receives a different authorized corpus, platform, language mix, file size, report consumer, terminal width, error policy, and delivery constraint and transfers ${title.toLowerCase()} into a changed ${artifact}.`,
      review: `A delayed maintenance review reconstructs ${title.toLowerCase()} from repository state, input bytes, decoded text, tokens, counters, ranking keys, report records, stdout, stderr, exit status, tests, package artifact, and release evidence.`,
      quiz: `A release reviewer compares near-miss decisions for ${title.toLowerCase()} and accepts only runnable changed-case evidence, explicit limitations, and named browser, filesystem, terminal, packaging, operating-system, load, security, and release transfer gates.`,
    },
  };
}

const modules = [
  bookbotModule(
    'bookbot-outcomes-repo-evidence',
    'Bookbot Outcomes, Repository Baseline, and Evidence',
    'A volunteer digital library asks for a word-count script but has not defined the report user, authorized input, counting policy, failure behavior, repository state, or acceptance evidence.',
    'Bookbot outcome, corpus, repository, and evidence charter',
    [
      outcome(
        'bookbot-user-decision',
        'Define the report user, decision, input corpus, output contract, consequence of error, and observable success before coding.',
        'Printing any word total is a complete Bookbot outcome.',
        'strategic',
        'create'
      ),
      outcome(
        'bookbot-corpus-authority',
        'Record text owner, license or permission, source, version, checksum, language, and allowed use before analysis.',
        'Text that can be downloaded is automatically authorized for redistribution.'
      ),
      outcome(
        'bookbot-repository-baseline',
        'Inspect Git status, branch, remotes, configuration origin, tracked files, ignore rules, and baseline tests before editing.',
        'A clean-looking editor proves the repository has no uncommitted work.'
      ),
      outcome(
        'bookbot-definition-done',
        'Translate stakeholder needs into runnable behavior, changed cases, error cases, report examples, and acceptance gates.',
        'A task is done when its happy-path output looks plausible.',
        'strategic',
        'evaluate'
      ),
      outcome(
        'bookbot-evidence-ladder',
        'Separate source, transformation, test, command, package, release, and stakeholder evidence so one green signal cannot hide another failure.',
        'A passing unit test proves the installed command and report are correct.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-cli-lifecycle-contract',
    'Command Lifecycle, Main Boundary, and Decomposition',
    'A one-file script reads global arguments during import, mixes file access with counting and printing, cannot be tested without exiting, and changes behavior when imported.',
    'testable command lifecycle and function map',
    [
      outcome(
        'bookbot-main-boundary',
        'Keep import-safe definitions separate from the __main__ execution boundary and return an exit status from main.',
        'Code at module top level is harmless because it runs only from the command line.'
      ),
      outcome(
        'bookbot-function-contracts',
        'Decompose admission, decoding, normalization, tokenization, counting, ranking, formatting, and orchestration into explicit contracts.',
        'More tiny functions automatically create a better design.'
      ),
      outcome(
        'bookbot-pure-core-shell',
        'Keep deterministic text transformations pure and pass filesystem, stream, clock, and terminal effects through a thin shell.',
        'Pure functions cannot participate in a real command-line program.'
      ),
      outcome(
        'bookbot-dataflow-ownership',
        'Trace each value from argument through bytes, text, tokens, statistics, report records, and output without hidden mutation.',
        'Python names own independent copies of every mutable value.'
      ),
      outcome(
        'bookbot-command-trace',
        'Retain invocation, tested revision, input identity, stdout, stderr, exit status, duration, and environment boundary as one run record.',
        'Captured stdout alone is enough to reproduce a command result.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-paths-file-admission',
    'Paths, File Admission, Root Boundaries, and Size Budgets',
    'The command concatenates strings into paths, follows any symlink, accepts directories and devices, reads before checking size, and reports every failure as file not found.',
    'bounded file-admission policy',
    [
      outcome(
        'bookbot-pathlike-contract',
        'Accept PathLike input, preserve the user-facing path, and distinguish lexical path composition from filesystem resolution.',
        'Path.resolve is merely prettier string normalization.'
      ),
      outcome(
        'bookbot-regular-file-admission',
        'Verify existence, regular-file type, readability, and race-aware open behavior before analysis.',
        'Anything for which Path.exists returns true is a safe text file.'
      ),
      outcome(
        'bookbot-root-symlink-policy',
        'Enforce an explicit allowed-root and symlink policy using resolved ancestry evidence rather than prefix strings.',
        'A path beginning with the allowed directory string cannot escape it.'
      ),
      outcome(
        'bookbot-byte-size-budget',
        'Reject inputs beyond a declared byte budget before unbounded allocation and preserve actual versus allowed size evidence.',
        'Character count is an adequate pre-read file-size limit.'
      ),
      outcome(
        'bookbot-file-identity',
        'Record stable path, size, modification observation, digest purpose, and open-file identity limits for reproducible analysis.',
        'A filename uniquely identifies unchanged content over time.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-text-io-encoding',
    'Bytes, Text I/O, Encodings, Newlines, and Cleanup',
    'A Bookbot relies on the platform default encoding, silently replaces invalid bytes, translates newlines differently by platform, reads the entire file twice, and leaks a handle on failure.',
    'explicit text-I/O boundary',
    [
      outcome(
        'bookbot-bytes-text-boundary',
        'Distinguish raw bytes, decoded str values, code points, grapheme clusters, and serialized output at every boundary.',
        'A Python string is the bytes stored in the source file.'
      ),
      outcome(
        'bookbot-explicit-encoding',
        'Choose and document UTF-8 or another declared encoding instead of relying on locale-dependent defaults.',
        'Modern systems always use UTF-8 as the default text encoding.'
      ),
      outcome(
        'bookbot-decode-error-policy',
        'Select strict rejection, replacement, ignore, or surrogate handling from the stakeholder evidence duty and expose data loss.',
        'Replacing malformed bytes is always the most user-friendly choice.'
      ),
      outcome(
        'bookbot-newline-policy',
        'Test LF, CRLF, CR, final-newline, blank-line, and universal-newline behavior without changing semantic counts accidentally.',
        'splitlines and split on newline always return the same records.'
      ),
      outcome(
        'bookbot-context-cleanup',
        'Use context management and narrow exception scopes so handles close and the causal error remains observable.',
        'The operating system will promptly close every forgotten file handle.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-unicode-normalization',
    'Unicode Normalization, Case Folding, and Original Evidence',
    'Visually identical words count separately, compatibility characters collapse without disclosure, lowercasing misses caseless matches, and the report cannot link normalized tokens back to original text.',
    'versioned reversible Unicode policy',
    [
      outcome(
        'bookbot-normalization-form',
        'Choose NFC, NFD, NFKC, NFKD, or no normalization from the comparison goal and version the decision.',
        'NFKC preserves every distinction that readers and identifiers may need.'
      ),
      outcome(
        'bookbot-casefold-policy',
        'Use casefold for declared caseless matching and test expansions and language-sensitive limitations rather than assuming lower is equivalent.',
        'str.lower and str.casefold always produce the same comparison key.'
      ),
      outcome(
        'bookbot-original-normalized-pair',
        'Retain original spans beside normalized comparison keys so reports remain inspectable and reversible.',
        'Once counts are correct, original spelling and offsets no longer matter.'
      ),
      outcome(
        'bookbot-combining-sequences',
        'Test precomposed and decomposed sequences, combining marks, emoji sequences, and zero-width characters as explicit cases.',
        'One visible character always occupies one Python string element.'
      ),
      outcome(
        'bookbot-unicode-version-evidence',
        'Record Unicode database and policy versions and rerun a changed fixture when either changes.',
        'Unicode behavior is timeless and cannot alter a report between Python releases.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-tokenization-word-policy',
    'Word Definitions, Tokenization, Boundaries, and Offsets',
    'Whitespace splitting treats punctuation as words, a regex drops apostrophes and non-Latin scripts, hyphen policy changes totals silently, and empty tokens enter the frequency table.',
    'tested word and token contract',
    [
      outcome(
        'bookbot-word-definition',
        'Define a word for the stakeholder, language set, punctuation, identifiers, numbers, contractions, and hyphenated forms before counting.',
        'Every reader and programming library shares one universal definition of word.'
      ),
      outcome(
        'bookbot-segmentation-choice',
        'Compare whitespace, regular-expression, Unicode-boundary, dictionary, and language-tailored segmentation against labeled cases.',
        'One regular expression can correctly tokenize every writing system.'
      ),
      outcome(
        'bookbot-apostrophe-hyphen-policy',
        'Specify leading, trailing, internal, curly-apostrophe, dash, and repeated-punctuation behavior with changed examples.',
        'Removing all punctuation cannot change word meaning or count.'
      ),
      outcome(
        'bookbot-token-offsets',
        'Return original start and end offsets with normalized token keys so count evidence can be inspected in source.',
        'A normalized token value is enough to locate its occurrence.'
      ),
      outcome(
        'bookbot-token-invariants',
        'Enforce nonempty tokens, monotonic nonoverlapping spans, declared normalization, and total-count reconciliation.',
        'If no exception occurs, tokenizer output is structurally valid.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-frequency-counter',
    'Frequency Maps, Counter Semantics, and Reconciliation',
    'A counting loop resets existing entries, aliases a shared dictionary, includes empty tokens, sorts while mutating, and never reconciles token totals with frequency totals.',
    'inspectable frequency engine',
    [
      outcome(
        'bookbot-counter-update',
        'Build frequencies with explicit dictionary or Counter updates and explain missing-key and zero-count semantics.',
        'Counter and an ordinary dictionary behave identically for every operation.'
      ),
      outcome(
        'bookbot-immutable-result',
        'Return a fresh result or an explicitly owned mutable result and prevent hidden cross-run state.',
        'Clearing a local variable also clears every alias to the same dictionary.'
      ),
      outcome(
        'bookbot-frequency-reconciliation',
        'Assert that nonnegative frequencies sum to the accepted token count and preserve excluded-token evidence.',
        'A plausible most-common list proves all tokens were counted.'
      ),
      outcome(
        'bookbot-incremental-merge',
        'Merge partial counters associatively and test partition independence for streaming and parallel transfer.',
        'Adding independently normalized counters is safe even when their token policies differ.'
      ),
      outcome(
        'bookbot-count-complexity',
        'Derive expected time and space cost from tokens and vocabulary before measuring implementation behavior.',
        'Dictionary counting becomes quadratic as the number of tokens grows.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-ranking-determinism',
    'Ranking Keys, Stable Sorts, Ties, and Top-K Reports',
    'Equal-frequency words appear in hash-dependent order, reverse sorting reverses both count and token unexpectedly, top-k truncation happens before ranking, and repeated runs produce noisy diffs.',
    'deterministic ranked-frequency report',
    [
      outcome(
        'bookbot-ranking-contract',
        'Declare primary count direction, secondary token collation, normalization, locale boundary, and exact tie policy.',
        'Descending counts automatically define a deterministic order for ties.'
      ),
      outcome(
        'bookbot-key-function',
        'Express mixed ascending and descending order with an explicit key or stable multi-pass sort and trace tuple comparison.',
        'reverse=True reverses only the first sort component.'
      ),
      outcome(
        'bookbot-stable-sort',
        'Use and test Python stable sorting when earlier order is intentionally retained within equal keys.',
        'Stable sorting means equal items may be returned in arbitrary order.'
      ),
      outcome(
        'bookbot-topk-boundary',
        'Validate k, rank the complete eligible set or use a justified selection algorithm, and specify ties at the cutoff.',
        'Slicing the first k dictionary entries before sorting returns the top k.'
      ),
      outcome(
        'bookbot-ranking-reproducibility',
        'Compare repeated and partitioned runs byte-for-byte and explain any locale, Unicode, or policy dependency.',
        'Deterministic output matters only to automated tests, not users.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-character-grapheme-metrics',
    'Code Points, Grapheme Clusters, Character Categories, and Labels',
    'A report labels len(text) as characters, counts newline and combining marks as letters, merges case categories without policy, and presents incomparable metrics under one total.',
    'honestly labeled text-metrics panel',
    [
      outcome(
        'bookbot-codepoint-grapheme',
        'Distinguish bytes, code points, extended grapheme clusters, display cells, letters, and stakeholder-defined characters.',
        'len(text) always equals the number of characters a reader sees.'
      ),
      outcome(
        'bookbot-unicode-categories',
        'Use Unicode categories or explicit predicates to separate letters, marks, numbers, punctuation, symbols, separators, and controls.',
        'str.isalpha identifies every unit a reading report should call a character.'
      ),
      outcome(
        'bookbot-letter-frequency-policy',
        'State whether character frequencies operate on original or normalized text, preserve case, and include or exclude marks.',
        'Character frequency has one obvious definition independent of normalization.'
      ),
      outcome(
        'bookbot-grapheme-transfer',
        'Name the standard-library limitation for full grapheme segmentation and require a pinned evaluated implementation in native transfer.',
        'Python slicing cannot divide a user-perceived character.'
      ),
      outcome(
        'bookbot-metric-label-evidence',
        'Label every metric with unit, inclusion policy, input version, and reconciliation or non-reconciliation rule.',
        'A report can call every text unit characters as long as the number is correct.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-streaming-bounded-memory',
    'Streaming Analysis, Chunk Boundaries, and Resource Budgets',
    'A large-file mode still calls read_text, splits tokens at chunk edges, decodes partial UTF-8 incorrectly, retains every token, and claims bounded memory without measurement.',
    'bounded streaming analyzer',
    [
      outcome(
        'bookbot-stream-iteration',
        'Process lines or bounded chunks incrementally and keep only state required by the declared report.',
        'Using a for loop over a file guarantees the whole pipeline has bounded memory.'
      ),
      outcome(
        'bookbot-partial-token-state',
        'Carry a bounded token fragment across chunk boundaries and prove concatenated-chunk equivalence.',
        'Each chunk can be tokenized independently without affecting results.'
      ),
      outcome(
        'bookbot-incremental-decoding',
        'Use an incremental decoder or text stream that preserves multibyte sequences and explicit error policy.',
        'UTF-8 bytes may be split at any position and decoded separately.'
      ),
      outcome(
        'bookbot-memory-budget',
        'Set byte, vocabulary, token-fragment, line, output, and elapsed-time budgets with rejection behavior.',
        'Streaming eliminates every possible memory-growth path.'
      ),
      outcome(
        'bookbot-batch-stream-equivalence',
        'Compare batch and streaming results across adversarial split points, malformed data, and final fragments.',
        'One ordinary file is sufficient evidence that streaming matches batch analysis.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-domain-model-pipeline',
    'Domain Records, Pure Pipeline Stages, and Serialization',
    'The program passes nested dictionaries with undocumented keys, mutates statistics during formatting, serializes Python repr output, and cannot isolate which stage changed a result.',
    'typed cumulative analysis pipeline',
    [
      outcome(
        'bookbot-domain-records',
        'Model input identity, policy, token, statistics, ranking row, and report metadata with explicit dataclasses or typed records.',
        'A dictionary is self-documenting because its keys are visible at runtime.'
      ),
      outcome(
        'bookbot-frozen-evidence',
        'Use immutable records where post-computation mutation would invalidate retained evidence.',
        'frozen dataclasses make every referenced nested object immutable.'
      ),
      outcome(
        'bookbot-stage-contracts',
        'Give each pipeline stage typed input, output, invariant, failure, and version contracts.',
        'A pipeline is correct when data reaches the final print call.'
      ),
      outcome(
        'bookbot-dependency-injection',
        'Inject readers, policies, formatters, and streams at narrow boundaries without replacing real integration evidence with mocks.',
        'Dependency injection means every object must be hidden behind a class interface.'
      ),
      outcome(
        'bookbot-serialization-schema',
        'Version JSON or CSV report schemas, preserve types and ordering, and reject non-finite or ambiguous values.',
        'Python repr output is a stable cross-language data format.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-report-format-accessibility',
    'Human Reports, Machine Output, Terminal Width, and Accessibility',
    'The report encodes meaning only with color, clips long words, changes columns by terminal width, mixes diagnostics with JSON stdout, and gives screen-reader users an unlabeled number grid.',
    'accessible human and machine report system',
    [
      outcome(
        'bookbot-report-information-architecture',
        'Order title, input identity, policy, totals, rankings, limitations, and next actions around the reader decision.',
        'A report is good when it contains every available metric.'
      ),
      outcome(
        'bookbot-stdout-stderr-contract',
        'Reserve stdout for requested report data and stderr for diagnostics while keeping exit status consistent.',
        'Users cannot observe whether output was written to stdout or stderr.'
      ),
      outcome(
        'bookbot-terminal-width',
        'Use a declared width or detected terminal width with minimums, wrapping, long-token policy, and snapshot tests.',
        'Hard-coded 80-column formatting is accessible on every terminal.'
      ),
      outcome(
        'bookbot-no-color-only',
        'Keep every status and distinction understandable without color and honor plain or no-color operation.',
        'ANSI color improves accessibility even when it is the only error signal.'
      ),
      outcome(
        'bookbot-structured-alternative',
        'Provide labeled rows, deterministic plain text, and machine-readable output as equivalent evidence rather than screenshots.',
        'A visually aligned table is automatically understandable to assistive technology.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-errors-exit-status',
    'Exceptions, Diagnostics, Exit Status, and Recovery',
    'The command catches Exception around the whole program, prints a traceback to stdout, exits zero after failure, hides the path and cause, and leaves a partial report behind.',
    'causal error and recovery contract',
    [
      outcome(
        'bookbot-domain-errors',
        'Translate expected path, admission, decoding, policy, and output failures into narrow domain errors without erasing causes.',
        'Every built-in exception should be exposed directly to command users.'
      ),
      outcome(
        'bookbot-causal-diagnostics',
        'Write concise actionable diagnostics containing operation and safe context while retaining a debuggable causal chain.',
        'A full traceback is always the clearest message for end users.'
      ),
      outcome(
        'bookbot-exit-status-map',
        'Map success, usage error, input error, analysis error, and output error to documented stable statuses.',
        'Any nonzero exit code communicates the same recovery action.'
      ),
      outcome(
        'bookbot-atomic-output',
        'Render before replace or write through an atomic strategy when a report file must not become partially valid.',
        'Closing a partially written report makes it safe to consume.'
      ),
      outcome(
        'bookbot-recovery-guidance',
        'Give a bounded next action, preserve original inputs, and distinguish retryable from policy or data failures.',
        'Retrying every file failure is a safe recovery plan.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-argparse-interface',
    'Argparse Interface, Help, Options, and Usage Errors',
    'The parser abbreviates ambiguous flags, hides defaults and units, accepts negative limits, prints colored help into snapshots, and couples parse_args directly to analysis.',
    'testable user-facing command interface',
    [
      outcome(
        'bookbot-argument-model',
        'Define positional input and explicit encoding, token, ranking, format, width, and limit options from user tasks.',
        'Every implementation setting belongs in the public CLI.'
      ),
      outcome(
        'bookbot-argument-validation',
        'Reject invalid ranges, conflicting flags, unsupported choices, and missing values at the parser boundary with usage evidence.',
        'Type conversion alone validates a command-line argument semantically.'
      ),
      outcome(
        'bookbot-help-contract',
        'Write task-oriented usage, descriptions, metavariables, defaults, units, examples, exit behavior, and accessibility notes.',
        'Auto-generated option names are sufficient command documentation.'
      ),
      outcome(
        'bookbot-parser-testability',
        'Parse supplied argument lists separately from sys.argv and return a configuration record for testing.',
        'Testing a parser requires launching a subprocess for every option.'
      ),
      outcome(
        'bookbot-python314-argparse',
        'Control Python 3.14 suggestion, color, abbreviation, and execution-name behavior explicitly where reproducibility requires it.',
        'Argparse output and defaults never change between Python versions.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-testing-fixtures',
    'Unit, Integration, CLI, Fixture, and Changed-Case Testing',
    'Tests assert only one public-domain English sample total, mock every filesystem call, compare unordered dictionaries, share mutable fixtures, and never run the installed command.',
    'risk-layered Bookbot test suite',
    [
      outcome(
        'bookbot-test-partitions',
        'Partition tests across pure units, file integration, CLI behavior, report snapshots, package installation, and stakeholder acceptance.',
        'Unit tests alone prove the complete command works.'
      ),
      outcome(
        'bookbot-table-cases',
        'Use named table and subtest cases for empty, punctuation, Unicode, malformed, large, tied, and boundary inputs.',
        'One representative fixture can cover every important text behavior.'
      ),
      outcome(
        'bookbot-temp-integration',
        'Use real temporary files and directories for filesystem contracts and reserve mocks for narrow failure injection.',
        'Mocking open is more realistic than reading a temporary file.'
      ),
      outcome(
        'bookbot-cli-subprocess',
        'Test stdout, stderr, status, help, invalid arguments, working directory, and installed entry point as observable CLI behavior.',
        'Calling main directly proves shell invocation behavior.'
      ),
      outcome(
        'bookbot-test-quality',
        'Prove tests fail under a deliberate changed behavior and protect against order, locale, encoding, platform, and stale-fixture coupling.',
        'Code coverage percentage establishes that assertions detect defects.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-performance-profiling',
    'Complexity, Timing, Profiling, Memory, and Capacity',
    'A team optimizes string concatenation from one warm run, reports elapsed time without input size, never measures memory, and ships a faster tokenizer that changes word policy.',
    'correctness-preserving capacity study',
    [
      outcome(
        'bookbot-performance-hypothesis',
        'State workload, input scale, expected complexity, environment, metric, budget, and correctness invariant before measuring.',
        'Any microbenchmark result is meaningful without a workload model.'
      ),
      outcome(
        'bookbot-timing-method',
        'Use repeated controlled timing, warmup decisions, robust summaries, and noise disclosure rather than one stopwatch value.',
        'The smallest single timing is the most accurate performance estimate.'
      ),
      outcome(
        'bookbot-cprofile-causality',
        'Use cProfile or a justified profiler to locate cumulative work before selecting a repair.',
        'The slowest-looking source line is necessarily the dominant cost.'
      ),
      outcome(
        'bookbot-memory-profile',
        'Measure peak allocations or process memory for batch and stream paths against vocabulary and output growth.',
        'Linear-time code automatically uses bounded memory.'
      ),
      outcome(
        'bookbot-performance-regression',
        'Gate representative input slices on correctness first and practical time and memory thresholds second.',
        'A faster result may be accepted even if Unicode or ranking output changes.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-packaging-release',
    'Package Layout, Pyproject Metadata, Entry Points, and Reproducible Builds',
    'Bookbot works only from the repository root, imports an uninstalled local file, lacks metadata and version identity, builds from a dirty tree, and publishes a wheel never tested after installation.',
    'installable reproducible Bookbot package',
    [
      outcome(
        'bookbot-src-layout',
        'Separate import package, tests, fixtures, documentation, and build artifacts with a src layout and explicit package discovery.',
        'A src layout is decorative and cannot expose import mistakes.'
      ),
      outcome(
        'bookbot-pyproject-metadata',
        'Declare canonical name, version policy, Python requirement, description, license, authorship, classifiers, URLs, and build system in pyproject.toml.',
        'The build backend may safely guess all missing project metadata.'
      ),
      outcome(
        'bookbot-entry-points',
        'Support python -m execution and an installed console script that call the same testable main boundary.',
        '__main__.py and console_scripts must contain separate command implementations.'
      ),
      outcome(
        'bookbot-build-artifacts',
        'Build wheel and source distribution from an identified clean revision and inspect contents, metadata, and excluded fixtures.',
        'A successful build command proves the artifact contains the intended files.'
      ),
      outcome(
        'bookbot-installed-smoke',
        'Install the built artifact into a fresh environment and test help, success, changed input, failure, and version output.',
        'Tests run from the source checkout prove the wheel is installable.'
      ),
    ]
  ),
  bookbotModule(
    'bookbot-security-recovery-defense',
    'Untrusted Inputs, Integrity, Privacy, Release, Rollback, and Defense',
    'A release analyzes arbitrary paths without limits, logs text excerpts, follows swapped symlinks, treats a digest as authenticity, cannot reproduce its wheel, and has no rollback or incident drill.',
    'production Bookbot release and residual-risk defense',
    [
      outcome(
        'bookbot-untrusted-input-defense',
        'Threat-model paths, devices, links, huge lines, malformed encodings, control characters, output injection, resource exhaustion, and race limits.',
        'A local command does not need an untrusted-input model.'
      ),
      outcome(
        'bookbot-data-minimization',
        'Keep reports and logs to authorized metrics and safe identifiers, with explicit excerpt, retention, deletion, and sharing policy.',
        'Text analytics output cannot expose sensitive source information.'
      ),
      outcome(
        'bookbot-integrity-purpose',
        'Use a modern digest for content identity while distinguishing accidental-corruption evidence from authenticated provenance.',
        'A matching SHA-256 digest proves who supplied a text.'
      ),
      outcome(
        'bookbot-release-rollback',
        'Gate immutable versioned artifacts on tests, accessibility, security, performance, clean installation, provenance, staged rollout, abort, and rollback evidence.',
        'Reinstalling source from the current branch is a reliable rollback.'
      ),
      outcome(
        'bookbot-production-defense',
        'Defend user value, corpus authority, text policy, correctness, determinism, accessibility, security, capacity, packaging, recovery, ownership, and residual risk as one release.',
        'Passing the final happy-path demo makes Bookbot production ready.',
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
    'Language, data model, standard library, exceptions, command execution, testing, profiling, and platform boundaries.'
  ),
  source(
    'Python pathlib Documentation',
    'https://docs.python.org/3.14/library/pathlib.html',
    'Python 3.14.6 current 2026-07-14',
    'Pure and concrete paths, PathLike behavior, text I/O, filesystem operations, errors, URI and platform boundaries.'
  ),
  source(
    'Python I/O Documentation',
    'https://docs.python.org/3.14/library/io.html',
    'Python 3.14.6 current 2026-07-14',
    'Binary, text, buffered, in-memory, encoding, newline, stream, cleanup, and nonblocking I/O boundaries.'
  ),
  source(
    'Unicode Standard 17 Core Specification',
    'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-3/',
    'Unicode 17.0.0 current 2026-07-14',
    'Code points, strings, normalization, case conversion, caseless matching, and conformance terminology.'
  ),
  source(
    'Unicode Normalization UAX 15',
    'https://unicode.org/reports/tr15/',
    'Unicode 17.0.0 current 2026-07-14',
    'Canonical and compatibility normalization forms, stability, equivalence, and stream-safe processing.'
  ),
  source(
    'Unicode Text Segmentation UAX 29',
    'https://unicode.org/reports/tr29/',
    'Revision 47 for Unicode 17.0.0 reviewed 2026-07-14',
    'Grapheme, word, and sentence boundaries, tailoring, test data, and implementation limits.'
  ),
  source(
    'Python Collections Documentation',
    'https://docs.python.org/3.14/library/collections.html',
    'Python 3.14.6 current 2026-07-14',
    'Counter behavior, missing values, updates, arithmetic, ordering, totals, and specialized-container boundaries.'
  ),
  source(
    'Python Sorting HOWTO',
    'https://docs.python.org/3.14/howto/sorting.html',
    'Python 3.14.6 current 2026-07-14',
    'Key functions, ascending and descending order, sort stability, multisort, DSU, and comparison boundaries.'
  ),
  source(
    'Python argparse Documentation',
    'https://docs.python.org/3.14/library/argparse.html',
    'Python 3.14.6 current 2026-07-14',
    'Arguments, validation, generated help, usage errors, exit status, color, suggestions, abbreviations, and testable parsing.'
  ),
  source(
    'Python unittest Documentation',
    'https://docs.python.org/3.14/library/unittest.html',
    'Python 3.14.6 current 2026-07-14',
    'Test cases, assertions, subtests, fixtures, discovery, command execution, and result evidence.'
  ),
  source(
    'Python unittest.mock Documentation',
    'https://docs.python.org/3.14/library/unittest.mock.html',
    'Python 3.14.6 current 2026-07-14',
    'Speccing, patching, file-handle mocks, integration-test limits, call evidence, and controlled failure injection.'
  ),
  source(
    'Python Profiling and Tracemalloc Documentation',
    'https://docs.python.org/3.14/library/debug.html',
    'Python 3.14.6 current 2026-07-14',
    'Deterministic profiling, timing, execution tracing, allocation tracing, and causal performance investigation.'
  ),
  source(
    'Python Packaging Command-Line Tools Guide',
    'https://packaging.python.org/en/latest/guides/creating-command-line-tools/',
    'PyPA guide current 2026-07-14',
    'Src layout, pyproject metadata, __main__, console entry points, pipx execution, builds, installation, and distribution.'
  ),
  source(
    'PyPA Entry Points Specification',
    'https://packaging.python.org/en/latest/specifications/entry-points/',
    'Specification current 2026-07-14',
    'console_scripts and gui_scripts groups, object references, wrappers, and installation behavior.'
  ),
  source(
    'PEP 621 Project Metadata',
    'https://peps.python.org/pep-0621/',
    'Accepted specification reviewed 2026-07-14',
    'Canonical static project metadata, dynamic fields, scripts, entry points, and pyproject tool boundaries.'
  ),
  source(
    'Python Security Considerations',
    'https://docs.python.org/3.14/library/security_warnings.html',
    'Python 3.14.6 current 2026-07-14',
    'Untrusted-input resource limits, parsing and archive cautions, cryptographic boundaries, and security review routing.'
  ),
  source(
    'Python hashlib Documentation',
    'https://docs.python.org/3.14/library/hashlib.html',
    'Python 3.14.6 current 2026-07-14',
    'Incremental hashing, guaranteed algorithms, digest identity, collision cautions, and security-purpose distinctions.'
  ),
  source(
    'Git 2.55 Documentation',
    'https://git-scm.com/docs',
    'Git 2.55 current 2026-07-14',
    'Repository status, diffs, commits, tags, revision identity, worktrees, recovery, and release evidence.'
  ),
  source(
    'WCAG 2.2 Recommendation',
    'https://www.w3.org/TR/WCAG22/',
    'W3C Recommendation current 2026-07-14',
    'Keyboard access, focus, reflow, status, error identification, target size, text alternatives, and no color-only meaning.'
  ),
  source(
    'ACM IEEE AAAI CS2023 Curriculum',
    'https://csed.acm.org/',
    'CS2023 reviewed 2026-07-14',
    'Recognized programming, software development, data, security, accessibility, ethics, testing, and professional outcomes.'
  ),
];

export const buildBookbotPythonConfig = finalizeCourse(
  {
    id: 'build-bookbot-python',
    competencyIdPrefix: 'bookbot-',
    title: 'Build and Ship a Unicode-Safe Bookbot with Python 3.14',
    version: '2026.07',
    audience: {
      description:
        'Python beginners with Git foundations who need to design, build, test, package, and defend a real command-line text-analysis product rather than copy a one-file tutorial.',
      entryKnowledge: [
        'Write and call Python functions; use strings, lists, dictionaries, loops, conditionals, exceptions, imports, typing, tests, and basic filesystem APIs.',
        'Inspect Git status and diffs, create focused commits, recover work, and explain the difference between the working tree, index, commit, branch, and remote.',
      ],
      deviceConstraints: [
        'Modern browser; instant Python practice uses deterministic pure-Python models and fixed in-memory text fixtures in an isolated Pyodide 3.14 worker. Real local files, terminals, subprocesses, package installation, Git mutation, operating-system races, native profiling, large-data load, and release publication remain explicit controlled transfer gates.',
      ],
      accessibilityAssumptions: [
        'Command traces, code, token spans, frequency maps, ranked rows, reports, diagnostics, test results, profiles, package records, and release evidence have structured text, explicit labels, keyboard operation, announced status, large targets, reduced motion, reflow, and no color-only meaning.',
      ],
    },
    scope: {
      includes: [
        'Python 3.14.6 command lifecycle, Git evidence, PathLike and file admission, byte and text I/O, explicit encoding and newline policy, Unicode 17 normalization and segmentation, token definitions, frequency maps, deterministic ranking, code-point and grapheme distinctions, streaming and memory bounds, typed domain records, accessible human and machine reports, exceptions and exit statuses, argparse, unit and integration testing, profiling, packaging, entry points, security, release, rollback, and production defense',
        'Runnable deterministic pure-Python evidence using original fixed fixtures plus explicit local-filesystem, terminal, subprocess, Git, packaging, installation, platform, load, security, accessibility, recovery, and release transfer gates',
        'Five cumulative authentic Bookbot deliveries and a performance-based unfamiliar-corpus defense examination',
      ],
      excludes: [
        'Copied tutorial prose, copyrighted book redistribution, one English-only whitespace count presented as universal, browser claims about host files or installed packages, hidden test answers, network scraping, arbitrary command execution, or production release based only on a plausible report.',
      ],
      nextCourses: ['build-static-site-python', 'build-web-scraper-python', 'personal-project-1'],
    },
    sources,
    sharedRequirements: [
      'Every activity retrieves Git state, input authority and identity, declared text policy, deterministic Python behavior, bounded resources, observable output, accessible diagnostics, changed-case tests, failure and recovery evidence, and explicit browser-versus-native transfer limits before adding one Bookbot boundary.',
      'Browser Python uses original fixed in-memory fixtures and deterministic pure functions. It does not claim real filesystem, terminal, subprocess, Git, packaging, installation, platform, race, native profiler, load, or release behavior; those require controlled transfer evidence.',
      'Passing work requires a stable scenario and artifact identity, prediction, intermediate data evidence, at least one changed Unicode or file case, at least one rejected case, exact stdout, stderr, and status expectations where applicable, tests that detect a deliberate defect, and a named owner for remaining risk.',
    ],
    modules,
    projects: [
      project(
        'bookbot-corpus-cli-foundation',
        'Authorized Corpus and CLI Foundation',
        'bookbot-text-io-encoding',
        'A community digital-archive coordinator',
        'They need a Git-traceable command skeleton that admits only the supplied authorized UTF-8 fixture, distinguishes bytes from text, handles newlines and decode failures, and returns inspectable output and errors without leaking handles.',
        [
          'bookbot-corpus-authority',
          'bookbot-main-boundary',
          'bookbot-regular-file-admission',
          'bookbot-explicit-encoding',
          'bookbot-context-cleanup',
        ]
      ),
      project(
        'bookbot-unicode-analytics-engine',
        'Unicode-Safe Book Analytics Engine',
        'bookbot-character-grapheme-metrics',
        'A multilingual reading-research group',
        'They need explicit normalization, caseless matching, language-aware word policy, original offsets, reconciled counts, deterministic ties, and honestly labeled code-point and grapheme evidence across changed scripts.',
        [
          'bookbot-normalization-form',
          'bookbot-word-definition',
          'bookbot-frequency-reconciliation',
          'bookbot-ranking-contract',
          'bookbot-codepoint-grapheme',
        ]
      ),
      project(
        'bookbot-bounded-report-pipeline',
        'Bounded Accessible Report Pipeline',
        'bookbot-report-format-accessibility',
        'A low-bandwidth public-library analytics team',
        'They need batch and streaming equivalence, a typed immutable pipeline, bounded memory, narrow human reports, stable JSON, separated diagnostics, terminal reflow, plain operation, and screen-reader-usable labels.',
        [
          'bookbot-batch-stream-equivalence',
          'bookbot-domain-records',
          'bookbot-serialization-schema',
          'bookbot-stdout-stderr-contract',
          'bookbot-structured-alternative',
        ]
      ),
      project(
        'bookbot-installable-release-candidate',
        'Installable Tested Bookbot Release Candidate',
        'bookbot-packaging-release',
        'An internal Python tools maintainer',
        'They need documented argparse behavior, causal statuses, real temporary-file and subprocess tests, correctness-preserving profiles, canonical package metadata, inspected artifacts, and fresh-environment command evidence.',
        [
          'bookbot-help-contract',
          'bookbot-exit-status-map',
          'bookbot-cli-subprocess',
          'bookbot-performance-regression',
          'bookbot-installed-smoke',
        ]
      ),
      project(
        'bookbot-production-defense',
        'Bookbot Production and Recovery Defense',
        'bookbot-security-recovery-defense',
        'A joint archive, accessibility, security, privacy, packaging, and operations review board',
        'The board needs input threat modeling, data minimization, integrity-purpose boundaries, reproducible immutable artifacts, accessibility and capacity gates, staged release, rollback, incident recovery, ownership, and explicit residual-risk acceptance.',
        [
          'bookbot-untrusted-input-defense',
          'bookbot-data-minimization',
          'bookbot-integrity-purpose',
          'bookbot-release-rollback',
          'bookbot-production-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar authorized text-analysis cases spanning repository evidence, command lifecycle, paths, files, encodings, newlines, Unicode normalization and segmentation, word policy, frequency reconciliation, deterministic ranking, code points and graphemes, streaming, domain records, accessible reports, diagnostics, exit status, argparse, testing, profiling, packaging, security, release, rollback, recovery, and residual-risk defense with explicit browser and native boundaries.',
    minimumQuestionBankSize: 580,
  },
  { researchedAt: RESEARCHED_AT, prerequisiteCourseIds: ['python-basics', 'git-basics'] }
);
