import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-15T03:30:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing misconception for RAG competency ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function ragModule(id, title, context, artifact, skills) {
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict the stakeholder decision, corpus and query identity, relevance assumption, failure cost, and evidence that would falsify the proposed RAG claim before opening the governing source.`,
      workshop: `A retrieval engineer and domain partner incrementally build ${artifact}, change one query, document, tenant, language, model, index, or policy condition, and keep earlier Python, provenance, accessibility, security, evaluation, and evidence invariants active.`,
      debug: `A preserved trace contains a plausible ${artifact} with one ingestion, normalization, chunking, lexical, embedding, index, filter, fusion, reranking, context, generation, citation, authorization, latency, or recovery defect; identify the first failed stage before repair.`,
      lab: `An independent team receives a different corpus, query mix, relevance policy, language set, access model, latency budget, harm profile, and evidence duty and transfers ${title.toLowerCase()} into a new ${artifact}.`,
      review: `A delayed retrieval review reconstructs ${title.toLowerCase()} from source, document, chunk, model, index, query, candidate, response, citation, evaluation, operations, and stakeholder evidence, then attacks one retained misconception.`,
      quiz: `A release board compares near-miss decisions for ${title.toLowerCase()} and accepts only runnable changed-case evidence, safe abstention, explicit uncertainty, and named native-model, vector-store, provider, load, security, recovery, or production transfer gates.`,
    },
  };
}

const modules = [
  ragModule(
    'rag-outcomes-task-evidence',
    'RAG Outcomes, Task Framing, Baselines, and Evidence',
    'A support team asks for a chatbot because answers are stale, but has not defined the user decision, authoritative corpus, acceptable abstention, latency, harm, or evidence of improvement over search.',
    'RAG outcome and evidence charter',
    [
      outcome(
        'rag-task-user-decision',
        'Define the user, decision, information need, authoritative sources, freshness need, consequence of error, and observable outcome before choosing RAG.',
        'A conversational interface is itself a measurable RAG outcome.',
        'strategic',
        'create'
      ),
      outcome(
        'rag-answerability-abstention',
        'Specify answerable, unanswerable, ambiguous, unauthorized, stale, and conflicting cases with a useful abstention and escalation contract.',
        'A production assistant should always answer because silence is worse than uncertainty.',
        'professional',
        'create'
      ),
      outcome(
        'rag-stage-evidence-ladder',
        'Separate ingestion, retrieval, reranking, context, generation, citation, system, and stakeholder evidence so one passing stage cannot hide another failure.',
        'A plausible final answer proves that retrieval worked.',
        'metacognitive',
        'evaluate'
      ),
      outcome(
        'rag-baseline-first',
        'Establish searchable-document, lexical, and long-context baselines before adding embeddings, rerankers, agents, or graphs.',
        'The most complex RAG architecture is the safest starting baseline.',
        'strategic',
        'evaluate'
      ),
      outcome(
        'rag-authority-ethics-scope',
        'Bound corpus use, evaluation, monitoring, and red teaming by authorization, licensing, privacy, accessibility, domain expertise, and incident duties.',
        'Publicly reachable content is automatically authorized for ingestion and redistribution.',
        'professional',
        'create'
      ),
    ]
  ),
  ragModule(
    'rag-ir-foundations-index',
    'Information Retrieval Foundations and Inverted Indexes',
    'A team calls substring matching retrieval, cannot define a document or relevance judgment, and returns results in hash-map order when scores tie.',
    'inspectable mini search engine',
    [
      outcome(
        'rag-corpus-query-relevance',
        'Model corpus, document, field, query, information need, relevance, judgment, candidate, rank, and cutoff as distinct objects.',
        'Relevance is an inherent property of a document independent of a query and user.'
      ),
      outcome(
        'rag-boolean-set-retrieval',
        'Implement AND, OR, NOT, phrase, and field constraints using explicit set semantics and precedence.',
        'Boolean retrieval automatically ranks the most useful matching document first.'
      ),
      outcome(
        'rag-inverted-index-postings',
        'Build term dictionaries and postings with document identity, frequency, position, field, and deterministic serialization evidence.',
        'An inverted index stores one complete document under every term.'
      ),
      outcome(
        'rag-bag-words-limits',
        'Explain which order, syntax, negation, scope, and discourse evidence bag-of-words models discard.',
        'A bag-of-words representation preserves sentence meaning because it preserves every token.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'rag-ranking-ties-determinism',
        'Define stable score, tie-break, pagination, and snapshot rules so repeated retrieval is reproducible.',
        'Equal floating-point scores can be returned in any order without affecting tests or users.'
      ),
    ]
  ),
  ragModule(
    'rag-ingestion-provenance',
    'Source Ingestion, Parsing, OCR, Provenance, and Trust',
    'A connector strips headings and page coordinates from mixed PDFs, silently skips parse failures, duplicates documents, and treats retrieved instructions as trusted application policy.',
    'provenance-preserving ingestion ledger',
    [
      outcome(
        'rag-source-inventory-provenance',
        'Inventory source owner, authority, location, version, time, license, access policy, checksum, parser, and lineage for every ingested document.',
        'A filename and upload date are complete source provenance.'
      ),
      outcome(
        'rag-format-parser-contract',
        'Parse HTML, Markdown, PDF, office, JSON, email, and plain text through format-specific admission, size, recursion, and error contracts.',
        'Extracted plain text proves every source format was parsed correctly.'
      ),
      outcome(
        'rag-ocr-layout-evidence',
        'Retain page, region, reading order, table, figure, coordinate, OCR confidence, and source-image links when extraction needs layout evidence.',
        'High OCR character accuracy guarantees correct tables and reading order.'
      ),
      outcome(
        'rag-canonical-document-identity',
        'Detect exact and near duplicates while preserving editions, amendments, canonical identity, supersession, and provenance.',
        'Documents with similar text are interchangeable duplicates.'
      ),
      outcome(
        'rag-ingestion-quarantine-trust',
        'Quarantine malformed, unauthorized, poisoned, executable, hidden, or policy-violating content and always treat accepted content as untrusted data.',
        'Content becomes trusted instruction after it passes malware scanning.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  ragModule(
    'rag-normalization-tokenization',
    'Unicode, Language, Tokenization, Fields, and Citation Offsets',
    'A search service lowercases and compatibility-normalizes every field, tokenizes all languages on spaces, removes legal negation as a stop word, and can no longer link a hit to its source span.',
    'reversible multilingual text pipeline',
    [
      outcome(
        'rag-unicode-normalization-policy',
        'Choose and version Unicode normalization per field while retaining original text and testing canonical and compatibility distinctions.',
        'NFKC is harmless for every natural-language and identifier field.'
      ),
      outcome(
        'rag-language-tokenization',
        'Detect or receive language and apply language- and script-appropriate word, subword, character, or morphological tokenization.',
        'Whitespace tokenization works equally well for every writing system.'
      ),
      outcome(
        'rag-field-aware-indexing',
        'Separate title, heading, body, code, identifier, date, author, tenant, and access metadata with explicit weighting and filter semantics.',
        'Concatenating every field into one string preserves structure and policy.'
      ),
      outcome(
        'rag-stemming-stopword-boundary',
        'Evaluate case folding, stemming, lemmatization, stop words, synonyms, and accent handling by language, domain, and changed query.',
        'Removing common words always improves retrieval quality.'
      ),
      outcome(
        'rag-offset-lineage',
        'Maintain mappings from normalized tokens and chunks back to exact document spans, pages, regions, and versions.',
        'A chunk identifier is enough to reconstruct an exact human-inspectable citation.'
      ),
    ]
  ),
  ragModule(
    'rag-chunking-structure',
    'Chunking, Segmentation, Document Structure, and Identity',
    'A pipeline splits every 1,000 characters with 500-character overlap, cuts tables and procedures in half, assigns random IDs, and assumes more overlap always increases recall.',
    'structure-aware chunking experiment',
    [
      outcome(
        'rag-chunk-unit-boundaries',
        'Compare token, sentence, paragraph, section, semantic, table, code, and layout boundaries against the target retrieval unit.',
        'One universal chunk size is optimal for every document and query.'
      ),
      outcome(
        'rag-chunk-overlap-tradeoff',
        'Measure how chunk size and overlap affect boundary recall, redundancy, context cost, index size, and citation clarity.',
        'Maximum overlap increases information without adding retrieval duplicates or cost.'
      ),
      outcome(
        'rag-structure-metadata-context',
        'Carry titles, heading paths, lists, tables, code language, captions, effective dates, and access metadata into chunk representation.',
        'Chunk body text alone contains every signal needed for retrieval and interpretation.'
      ),
      outcome(
        'rag-parent-child-neighbor',
        'Retrieve small evidence units while expanding bounded parents, neighbors, tables, or sections without crossing document or access boundaries.',
        'Parent-document expansion is safe even when child and parent permissions differ.'
      ),
      outcome(
        'rag-stable-chunk-identity',
        'Derive stable document and chunk identity from source, version, structure, offsets, and content so updates, deletes, caches, and citations reconcile.',
        'Random chunk IDs are sufficient for incremental indexing and deletion.'
      ),
    ]
  ),
  ragModule(
    'rag-lexical-tfidf-bm25',
    'Lexical Retrieval with TF-IDF, BM25, Fields, and Exact Terms',
    'A dense-only assistant misses ticket IDs, product codes, error strings, and rare policy terms, while its lexical fallback has undocumented tokenization and scores that cannot be reproduced.',
    'tested lexical retrieval baseline',
    [
      outcome(
        'rag-term-frequency-evidence',
        'Compute term and document frequency from a declared token stream and explain saturation, repetition, and field effects.',
        'Repeating a query term indefinitely should increase relevance linearly.'
      ),
      outcome(
        'rag-tfidf-variant-contract',
        'Implement and document one TF-IDF formula, smoothing, sublinear term frequency, normalization, and library-specific convention.',
        'Every TF-IDF implementation uses the same formula and therefore the same scores.'
      ),
      outcome(
        'rag-bm25-length-saturation',
        'Apply BM25 term saturation and length normalization with measured parameters rather than unexplained defaults.',
        'BM25 is just TF-IDF with a different class name.'
      ),
      outcome(
        'rag-lexical-fields-phrases',
        'Support exact identifiers, phrases, proximity, field boosts, filters, and analyzer selection without silently changing query meaning.',
        'Semantic embeddings make phrase and exact-identifier retrieval unnecessary.'
      ),
      outcome(
        'rag-lexical-baseline-failure',
        'Diagnose synonym, vocabulary mismatch, morphology, spelling, language, and semantic-intent failures using labeled query slices.',
        'One poor lexical example proves dense retrieval will be better for the whole query distribution.'
      ),
    ]
  ),
  ragModule(
    'rag-retrieval-metrics',
    'Relevance Judgments and Retrieval Metrics',
    'A dashboard reports average similarity as retrieval accuracy, has one relevant document per query, ignores unjudged results, and compares systems at different cutoffs.',
    'retrieval evaluation notebook and judgment policy',
    [
      outcome(
        'rag-relevance-judgment-policy',
        'Define binary or graded relevance, assessor instructions, pooling, disagreement, unjudged handling, and query-specific evidence needs.',
        'A model score can replace human or domain relevance judgments.'
      ),
      outcome(
        'rag-precision-recall-cutoff',
        'Compute precision, recall, F-score, success, and hit rate at an explicit cutoff and explain which failure each reveals.',
        'Precision and recall are interchangeable names for retrieval accuracy.'
      ),
      outcome(
        'rag-mrr-map-ndcg',
        'Compute reciprocal rank, average precision, mean average precision, DCG, and nDCG from ordered judgments with correct denominators.',
        'MRR rewards every relevant result throughout the ranked list.'
      ),
      outcome(
        'rag-metric-query-slices',
        'Report metrics by language, intent, difficulty, freshness, tenant, source type, answerability, and harm instead of only one mean.',
        'A higher global mean guarantees every important user slice improved.'
      ),
      outcome(
        'rag-retrieval-comparison-uncertainty',
        'Use paired per-query differences, confidence intervals or resampling, practical thresholds, and regression inspection when comparing retrievers.',
        'A one-point metric increase on one fixed set is automatically a meaningful win.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  ragModule(
    'rag-embeddings-vector-semantics',
    'Embeddings, Vector Spaces, Similarity, and Model Contracts',
    'A team mixes query vectors from one model with document vectors from another, changes cosine to dot product, truncates dimensions, and interprets closeness as factual support.',
    'embedding-space and similarity audit',
    [
      outcome(
        'rag-embedding-purpose-model-card',
        'Select an embedding model using its training objective, query/document prompts, languages, domains, dimensions, license, limits, and evaluated task fit.',
        'The embedding model with the most dimensions is necessarily the best retriever.'
      ),
      outcome(
        'rag-vector-dimension-space',
        'Enforce model, revision, dimension, dtype, prompt, and preprocessing identity for every query and document vector.',
        'Vectors with the same length inhabit the same semantic space.'
      ),
      outcome(
        'rag-similarity-metric',
        'Implement cosine, dot-product, and distance calculations and match normalization and ranking direction to the model and index contract.',
        'Cosine similarity, dot product, and Euclidean distance always produce identical rankings.'
      ),
      outcome(
        'rag-vector-normalization-precision',
        'Measure normalization, float precision, quantization, zero-vector, NaN, and batch effects without overstating semantic meaning.',
        'Normalizing a vector makes its underlying embedding model more accurate.'
      ),
      outcome(
        'rag-embedding-limit-evidence',
        'Test negation, numbers, identifiers, rare terms, domain drift, multilingual queries, bias, and adversarial proximity as separate embedding limitations.',
        'High vector similarity proves that a passage supports the requested claim.'
      ),
    ]
  ),
  ragModule(
    'rag-dense-retrieval',
    'Dense Bi-Encoder Retrieval and Domain Transfer',
    'A semantic search prototype embeds queries and documents identically without checking model instructions, returns top five from a large corpus, and has never tested domain or language transfer.',
    'dense retrieval candidate service',
    [
      outcome(
        'rag-biencoder-offline-online',
        'Separate offline document encoding from online query encoding while preserving one versioned bi-encoder space.',
        'Dense retrieval compares every query and document jointly with full cross-attention.'
      ),
      outcome(
        'rag-asymmetric-query-document',
        'Apply model-specific query and document prompts, prefixes, normalization, and maximum-length behavior.',
        'Query and document text should always receive byte-identical preprocessing.'
      ),
      outcome(
        'rag-dense-candidate-depth',
        'Tune candidate depth from recall and downstream reranking evidence rather than context-window size.',
        'Retrieving exactly the final number of context chunks is always most efficient.'
      ),
      outcome(
        'rag-domain-language-transfer',
        'Evaluate dense retrieval on target domain, jargon, languages, intents, dates, and changed cases before accepting model-card results.',
        'A public benchmark score transfers unchanged to a private corpus.'
      ),
      outcome(
        'rag-embedding-migration',
        'Plan dual encoding, reindexing, compatibility, canaries, cache invalidation, rollback, and old-vector deletion across model changes.',
        'An embedding model can be changed without rebuilding or versioning the index.',
        'strategic',
        'create'
      ),
    ]
  ),
  ragModule(
    'rag-ann-indexes',
    'Exact and Approximate Nearest-Neighbor Indexes',
    'An HNSW index is called exact, its recall is measured against itself, tenant filters are applied after top-k, and memory or build cost is absent from the decision.',
    'ANN recall, latency, and resource experiment',
    [
      outcome(
        'rag-exact-vector-baseline',
        'Build an exact flat-search oracle on a bounded corpus for correctness, recall comparison, and changed-filter tests.',
        'An approximate index can validate its own recall without an exact baseline.'
      ),
      outcome(
        'rag-hnsw-graph-tradeoff',
        'Explain and tune HNSW construction, search breadth, graph degree, recall, latency, memory, updates, and deletion behavior.',
        'Increasing every HNSW parameter always improves production performance.'
      ),
      outcome(
        'rag-ivf-quantization-tradeoff',
        'Explain coarse partitioning, probes, product or scalar quantization, training data, compression loss, and rebuild requirements.',
        'Quantization reduces storage without changing nearest-neighbor results.'
      ),
      outcome(
        'rag-ann-filter-interaction',
        'Test prefilter, postfilter, iterative scan, oversampling, selectivity, tenant isolation, and filtered recall.',
        'Applying an access filter after approximate top-k preserves recall and authorization.'
      ),
      outcome(
        'rag-ann-capacity-selection',
        'Select index and parameters from corpus size, updates, filters, recall target, p95 latency, build time, memory, cost, and recovery evidence.',
        'The lowest single-query benchmark latency identifies the best production index.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  ragModule(
    'rag-vector-store-lifecycle',
    'Vector Store Schema, Versioning, Tenancy, Updates, and Deletes',
    'A vector store keeps only embedding and text, overwrites IDs on retry, mixes tenants, cannot identify its model revision, and leaves deleted content searchable.',
    'versioned vector-record lifecycle',
    [
      outcome(
        'rag-vector-record-schema',
        'Define document, chunk, tenant, source, version, offsets, content hash, model, dimensions, vector, metadata, timestamps, and policy fields.',
        'A vector plus raw text is a complete production vector-store record.'
      ),
      outcome(
        'rag-index-model-version-contract',
        'Reject queries when model, dimensions, preprocessing, metric, index, or schema versions are incompatible.',
        'Vector databases automatically detect every incompatible embedding-model change.'
      ),
      outcome(
        'rag-idempotent-upsert-reindex',
        'Make ingestion and reindexing idempotent with stable keys, generation identity, checkpoints, compare-and-swap, and reconciliation.',
        'Retrying an upsert can only improve correctness because the operation is named upsert.'
      ),
      outcome(
        'rag-delete-tombstone-erasure',
        'Propagate source deletion through chunks, vectors, caches, replicas, backups, logs, and verification within a stated service level.',
        'Deleting one vector-row immediately erases every derived copy.'
      ),
      outcome(
        'rag-vector-tenancy-recovery',
        'Enforce tenant and object authorization before search and prove backup, restore, index rebuild, and point-in-time recovery behavior.',
        'A tenant ID stored as metadata is an authorization control by itself.',
        'professional',
        'create'
      ),
    ]
  ),
  ragModule(
    'rag-hybrid-fusion',
    'Hybrid Retrieval, Score Calibration, and Rank Fusion',
    'A hybrid system adds raw BM25 and cosine scores, gives missing results zero without defining meaning, and wins globally while exact-identifier queries regress.',
    'hybrid retrieval and fusion evaluator',
    [
      outcome(
        'rag-lexical-dense-complement',
        'Identify query slices where exact lexical and semantic dense signals complement or conflict instead of assuming hybrid superiority.',
        'Hybrid retrieval is always at least as good as its best component.'
      ),
      outcome(
        'rag-score-calibration-boundary',
        'Avoid direct raw-score comparison across retrievers unless distributions and meaning are calibrated on target judgments.',
        'BM25 and cosine scores are comparable because both are larger for better results.'
      ),
      outcome(
        'rag-reciprocal-rank-fusion',
        'Implement reciprocal rank fusion with stable identities, rank constant, duplicate handling, missing candidates, and deterministic ties.',
        'RRF needs raw similarity scores to work correctly.'
      ),
      outcome(
        'rag-weighted-fusion-evaluation',
        'Tune weights, candidate depths, normalization, thresholds, and filters on separated development data and report slice regressions.',
        'Weights selected on the final test set provide unbiased evidence.'
      ),
      outcome(
        'rag-hybrid-fallback-degradation',
        'Define behavior when one retriever, model, index, language analyzer, or filter path fails or becomes stale.',
        'Returning the remaining retriever silently is always safe degradation.',
        'strategic',
        'create'
      ),
    ]
  ),
  ragModule(
    'rag-query-understanding',
    'Query Understanding, Filters, Rewriting, Expansion, and Decomposition',
    'A model rewrites every query, drops quoted identifiers and dates, invents metadata filters, and issues six hidden searches when the user needed one clarification.',
    'bounded query-plan compiler',
    [
      outcome(
        'rag-query-intent-entities-filters',
        'Extract intent, entities, exact terms, time, language, tenant, source, and authorization filters through a validated query schema.',
        'A language model output is a trustworthy database filter.'
      ),
      outcome(
        'rag-query-rewrite-lineage',
        'Preserve original query, rewrite purpose, version, generated alternatives, filters, and per-rewrite retrieval contribution.',
        'Only the rewritten query matters after generation.'
      ),
      outcome(
        'rag-query-expansion-feedback',
        'Evaluate synonyms, acronyms, spelling, pseudo-relevance feedback, and domain vocabulary without drifting away from user intent.',
        'Adding more related terms cannot reduce retrieval precision.'
      ),
      outcome(
        'rag-hyde-hypothetical-document',
        'Use hypothetical-document embedding only as an evaluated retrieval transform and never as evidence or a factual source.',
        'A generated hypothetical answer becomes evidence when its embedding retrieves relevant text.'
      ),
      outcome(
        'rag-decomposition-clarification-budget',
        'Decompose bounded multi-part or multi-hop questions, preserve dependencies, and ask for clarification when ambiguity exceeds policy.',
        'Agentic query decomposition is preferable to asking the user one clarifying question.'
      ),
    ]
  ),
  ragModule(
    'rag-reranking',
    'Cross-Encoder, Late-Interaction, Diversity, and Reranking',
    'A cross-encoder scores the whole corpus online, reranks only five dense candidates, ignores latency and diversity, and is declared better from one question.',
    'budgeted retrieve-and-rerank pipeline',
    [
      outcome(
        'rag-retrieve-rerank-shape',
        'Separate high-recall candidate retrieval, bounded expensive reranking, final context selection, and their independent cutoffs.',
        'A reranker can recover a relevant document that no retriever supplied.'
      ),
      outcome(
        'rag-crossencoder-relevance',
        'Apply a query-document cross-encoder with batching, truncation, calibration, model-card limits, and target relevance evaluation.',
        'Cross-encoder scores are calibrated probabilities of factual support.'
      ),
      outcome(
        'rag-late-interaction-colbert',
        'Explain token-level late interaction, index cost, maximum similarity, query/document encoding, and when it earns complexity.',
        'Late interaction is the same as a single pooled embedding with extra storage.'
      ),
      outcome(
        'rag-diversity-redundancy-selection',
        'Balance relevance, novelty, source diversity, conflict coverage, and duplicate suppression without hiding minority evidence.',
        'The top scores necessarily provide the most diverse supporting context.'
      ),
      outcome(
        'rag-reranker-budget-fallback',
        'Set candidate, token, batch, time, memory, retry, and fallback budgets and test quality under timeout and partial failure.',
        'A reranker timeout can safely return its partially ordered list without policy.'
      ),
    ]
  ),
  ragModule(
    'rag-context-selection',
    'Context Selection, Compression, Deduplication, and Position',
    'A service stuffs every retrieved chunk into a long prompt, repeats overlapping text, truncates citations, and assumes a larger context window guarantees every passage is used.',
    'citation-mapped context assembler',
    [
      outcome(
        'rag-context-token-budget',
        'Allocate tokens across instructions, query, history, evidence, citation metadata, answer, and safety reserves before assembly.',
        'The model context limit is the safe evidence budget.'
      ),
      outcome(
        'rag-context-dedup-conflicts',
        'Collapse duplicate and overlapping chunks while retaining source diversity, conflicting versions, amendments, and dissent evidence.',
        'Near-duplicate chunks can be dropped without checking provenance or effective date.'
      ),
      outcome(
        'rag-context-compression-evidence',
        'Compare extractive selection, sentence filtering, summaries, and structured compression against retained claim and citation evidence.',
        'A generated summary preserves all facts and source boundaries needed for grounding.'
      ),
      outcome(
        'rag-context-order-position-bias',
        'Test relevance order, chronology, source grouping, conflicts, and answer-position slices including evidence placed in the middle.',
        'Long-context models use all positions equally once a passage fits.'
      ),
      outcome(
        'rag-context-citation-map',
        'Assign stable context labels that map every excerpt back to source, version, page or span, access policy, and freshness.',
        'Numbering prompt chunks is enough to make citations durable after reindexing.'
      ),
    ]
  ),
  ragModule(
    'rag-grounded-generation',
    'Grounded Generation, Untrusted Context, Claims, and Abstention',
    'A prompt tells the model to use context but embeds retrieved instructions beside system policy, permits unsupported synthesis, and has no structured claim-to-source output.',
    'grounded answer contract and verifier',
    [
      outcome(
        'rag-instruction-data-separation',
        'Separate trusted system and developer policy from user input and retrieved data, label trust, and refuse instructions found inside evidence.',
        'XML or Markdown delimiters make prompt injection impossible.'
      ),
      outcome(
        'rag-grounded-prompt-contract',
        'Require answer scope, allowed sources, conflict handling, quotations, citations, uncertainty, abstention, and output schema explicitly.',
        'Telling a model to be accurate is an adequate grounding contract.'
      ),
      outcome(
        'rag-claim-evidence-entailment',
        'Decompose material response claims and verify each against cited evidence without equating topical relevance with entailment.',
        'A retrieved passage supports every claim in an answer about the same topic.'
      ),
      outcome(
        'rag-grounded-abstention-conflict',
        'Abstain, qualify, or surface conflicts when evidence is missing, stale, ambiguous, unauthorized, contradictory, or below threshold.',
        'Lowering temperature guarantees grounded answers when evidence is weak.'
      ),
      outcome(
        'rag-structured-output-validation',
        'Validate response schema, claim IDs, source IDs, quotations, spans, allowed actions, and unsafe content before display or tool use.',
        'Schema-valid model output is factually and operationally safe.'
      ),
    ]
  ),
  ragModule(
    'rag-citations-user-experience',
    'Citations, Freshness, Uncertainty, Accessibility, and Feedback',
    'An assistant appends three source links at the bottom, hides relevance behind color, opens inaccessible PDF pages, and reports confident text without freshness or conflict state.',
    'accessible evidence-first answer interface',
    [
      outcome(
        'rag-claim-level-citations',
        'Place citations at material claims and verify source ID, exact span, quotation fidelity, support, and link target.',
        'A bibliography at the end makes every answer claim traceable.'
      ),
      outcome(
        'rag-source-freshness-conflict-ui',
        'Expose title, authority, effective date, version, retrieval time, supersession, conflict, and stale-state evidence without overwhelming the answer.',
        'The most recently indexed source is necessarily the governing source.'
      ),
      outcome(
        'rag-accessible-evidence-inspection',
        'Make answers, citations, expandable excerpts, tables, confidence limits, loading, errors, and feedback keyboard and screen-reader operable.',
        'Providing alt text on the page logo satisfies accessibility for RAG evidence.'
      ),
      outcome(
        'rag-uncertainty-language-calibration',
        'Use calibrated language tied to answerability, retrieval, support, conflict, and policy rather than displaying raw model confidence.',
        'A model self-reported confidence percentage is a calibrated reliability measure.'
      ),
      outcome(
        'rag-feedback-correction-loop',
        'Capture structured missing-source, wrong-source, unsupported-claim, stale, unsafe, inaccessible, and unhelpful feedback with review and correction lineage.',
        'Thumbs up and down alone identify which RAG stage failed.'
      ),
    ]
  ),
  ragModule(
    'rag-pipeline-architecture',
    'End-to-End RAG Architecture, Versioning, Caches, and Failures',
    'A prototype hides ingestion, retrieval, reranking, generation, and citation inside one framework call, caches by query text alone, and cannot reproduce which corpus or prompt produced an answer.',
    'versioned end-to-end RAG service',
    [
      outcome(
        'rag-stage-interface-contracts',
        'Define typed inputs, outputs, identities, limits, errors, telemetry, and ownership for ingestion, retrieval, reranking, context, generation, citation, and evaluation stages.',
        'A framework chain object provides sufficient architectural contracts by default.'
      ),
      outcome(
        'rag-run-identity-lineage',
        'Bind each run to corpus, document, chunk, parser, embedding, index, query, reranker, prompt, generator, policy, and evaluation versions.',
        'Recording the final model name is enough to reproduce a RAG answer.'
      ),
      outcome(
        'rag-cache-key-invalidation',
        'Design embedding, retrieval, reranking, context, and answer cache keys and invalidation from every behavior-changing input and authorization boundary.',
        'Query text alone is a safe RAG response-cache key.'
      ),
      outcome(
        'rag-stage-errors-idempotency',
        'Classify retryable, terminal, partial, stale, unauthorized, ambiguous, and unknown outcomes while making external operations idempotent.',
        'Retrying the whole RAG pipeline is harmless because it mostly reads.'
      ),
      outcome(
        'rag-streaming-response-ownership',
        'Separate verified evidence, provisional generation, citation readiness, cancellation, cleanup, and terminal response ownership during streaming.',
        'Streaming tokens before citation verification has no effect on correctness.'
      ),
    ]
  ),
  ragModule(
    'rag-end-to-end-evaluation',
    'Component and End-to-End RAG Evaluation',
    'A team reports one LLM-judge score on generated answers, never measures retrieval, changes the evaluator prompt between runs, and has no human or safety review.',
    'layered RAG evaluation harness',
    [
      outcome(
        'rag-component-e2e-separation',
        'Evaluate ingestion, retrieval, reranking, context, generation, citations, safety, system quality, and user outcome separately and together.',
        'One end-to-end score tells which component needs repair.'
      ),
      outcome(
        'rag-retrieval-context-evaluation',
        'Measure candidate recall, ranking, context precision and recall, source diversity, conflict coverage, and citation-map integrity.',
        'Context precision alone proves the needed evidence was retrieved.'
      ),
      outcome(
        'rag-generation-grounding-evaluation',
        'Measure answer relevance, claim support, faithfulness, citation correctness, completeness, conflict handling, abstention, safety, and usefulness.',
        'Semantic similarity to one reference answer proves factual grounding.'
      ),
      outcome(
        'rag-llm-judge-contract',
        'Version judge model, rubric, prompt, inputs, calibration, position tests, variance, cost, and human disagreement and never treat judge output as ground truth.',
        'An LLM judge eliminates the need for stable rubrics and human validation.'
      ),
      outcome(
        'rag-human-outcome-evidence',
        'Design blinded domain review and user studies that measure decision correctness, time, accessibility, trust calibration, and harm.',
        'Offline answer scores automatically predict real user outcomes.',
        'strategic',
        'create'
      ),
    ]
  ),
  ragModule(
    'rag-eval-datasets-judgments',
    'Evaluation Datasets, Hard Negatives, Leakage, and Experiment Design',
    'An evaluation set contains synthetic easy questions generated from the indexed chunks, uses the same examples to tune and test, and has no hard negatives, slices, or versioned judgments.',
    'versioned retrieval and answer test collection',
    [
      outcome(
        'rag-query-set-sampling',
        'Sample real and designed queries across intents, languages, difficulty, freshness, answerability, access, source types, and harm with documented weights.',
        'A random sample of historical queries automatically covers rare high-harm cases.'
      ),
      outcome(
        'rag-qrels-assessor-agreement',
        'Create relevance and claim-support judgments with rubrics, independent assessors, adjudication, agreement, and provenance.',
        'Disagreement means one assessor is wrong and can be discarded.'
      ),
      outcome(
        'rag-hard-negative-counterfactual',
        'Include lexical, semantic, stale, conflicting, unauthorized, near-duplicate, adversarial, and counterfactual hard negatives.',
        'Random irrelevant documents provide sufficient negative examples.'
      ),
      outcome(
        'rag-synthetic-data-limits',
        'Use synthetic questions or judgments only with source separation, deduplication, realism checks, human calibration, and explicit uncertainty.',
        'A strong generator creates an unbiased evaluation set from the corpus.'
      ),
      outcome(
        'rag-eval-leakage-versioning',
        'Separate development, validation, test, canary, and incident sets and track document, query, judgment, prompt, model, and result versions.',
        'Keeping test answers hidden prevents every form of evaluation leakage.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  ragModule(
    'rag-security-poisoning-injection',
    'RAG Security: Poisoning, Injection, Authorization, and Unsafe Effects',
    'A shared knowledge base permits uploads, embeds hidden instructions, filters tenant results after retrieval, forwards generated URLs to tools, and assumes grounding reduces security risk.',
    'RAG threat model and adversarial test suite',
    [
      outcome(
        'rag-security-threat-model',
        'Model actors, assets, trust boundaries, connectors, parsers, embeddings, indexes, queries, context, models, outputs, tools, administration, and recovery.',
        'RAG security is the same as protecting the model API key.'
      ),
      outcome(
        'rag-document-poisoning-defense',
        'Detect, quarantine, review, version, attribute, and monitor malicious, hidden, duplicated, or authority-spoofed documents and embedding anomalies.',
        'High retrieval relevance is evidence that an uploaded document is benign.'
      ),
      outcome(
        'rag-indirect-prompt-injection',
        'Test direct, indirect, fragmented, encoded, multilingual, visual, and cross-document instructions while preserving retrieved content as untrusted data.',
        'A blocklist of phrases beginning with ignore catches prompt injection.'
      ),
      outcome(
        'rag-retrieval-authorization-isolation',
        'Apply tenant, user, object, field, purpose, and time authorization before candidate exposure, reranking, context, caches, logs, and citations.',
        'Filtering unauthorized chunks after top-k prevents information leakage.'
      ),
      outcome(
        'rag-output-tool-effect-separation',
        'Validate and encode output, prohibit secret leakage, and require independent authorization, confirmation, bounds, and audit before any tool effect.',
        'A grounded answer is safe to execute as a command or tool argument.',
        'professional',
        'create'
      ),
    ]
  ),
  ragModule(
    'rag-privacy-governance',
    'Privacy, Data Governance, Retention, Deletion, and Residency',
    'A RAG index contains copied customer records, embeds unnecessary identifiers, logs raw queries and passages, cannot erase derived data, and sends context to an undocumented region.',
    'governed RAG data-lifecycle record',
    [
      outcome(
        'rag-data-inventory-purpose',
        'Inventory data categories, subjects, owners, purposes, authority, sensitivity, flow, processors, regions, retention, and deletion duties.',
        'An internal knowledge base can be indexed for any internal AI purpose.'
      ),
      outcome(
        'rag-minimization-pii-redaction',
        'Minimize and transform source, metadata, query, context, output, feedback, and telemetry data while testing task utility and reidentification risk.',
        'Redacting visible names removes every privacy risk from embeddings.'
      ),
      outcome(
        'rag-embedding-privacy-risk',
        'Treat embeddings as potentially sensitive derived data and assess inversion, membership, linkage, access, export, and retention risk.',
        'Embedding vectors are anonymous because humans cannot read them directly.'
      ),
      outcome(
        'rag-deletion-retention-proof',
        'Propagate legal hold, retention, correction, deletion, and subject requests through sources, chunks, vectors, caches, logs, evaluations, and backups.',
        'Reindexing eventually is enough evidence that deleted data is gone.'
      ),
      outcome(
        'rag-residency-processor-audit',
        'Record provider retention, training use, subprocessors, regions, encryption, access, transfer, incident, and audit evidence for every external service.',
        'A provider enterprise plan automatically satisfies every governance requirement.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  ragModule(
    'rag-observability-reliability',
    'Observability, SLOs, Drift, Incidents, and Recovery',
    'A RAG endpoint records total latency and full prompts, cannot distinguish retrieval from generation failure, and notices stale results only after users complain.',
    'redacted stage trace and reliability dashboard',
    [
      outcome(
        'rag-stage-tracing-semantics',
        'Trace retrieval and generation operations with stable run, corpus, model, index, query, document, score, error, and version attributes aligned to current GenAI conventions.',
        'One HTTP server span is enough to diagnose a RAG pipeline.'
      ),
      outcome(
        'rag-slo-stage-signals',
        'Define availability, freshness, candidate recall proxy, grounded-answer success, citation integrity, latency, saturation, and cost service indicators and objectives.',
        'Endpoint uptime is a complete RAG reliability objective.'
      ),
      outcome(
        'rag-telemetry-redaction-cardinality',
        'Keep query and content capture disabled or tightly governed and bound labels, exemplars, hashes, sampling, retention, and cardinality.',
        'Hashing a query always makes it safe and low cardinality for metrics.'
      ),
      outcome(
        'rag-quality-drift-detection',
        'Monitor corpus, query, language, embedding, score, filter, feedback, answerability, citation, latency, and cost drift with labeled confirmation.',
        'A change in average vector distance proves semantic quality drift.'
      ),
      outcome(
        'rag-incident-causal-recovery',
        'Preserve first evidence, classify the failed stage, contain exposure, restore known versions, replay safe work, verify recovery, and update tests.',
        'Switching to a larger model is the safest generic RAG incident response.',
        'professional',
        'create'
      ),
    ]
  ),
  ragModule(
    'rag-performance-cost-capacity',
    'Latency, Throughput, Memory, Caching, Load, and Cost',
    'A team optimizes average response time with a warm cache, ignores index memory and model queueing, retrieves more candidates on every request, and reports token price without total service cost.',
    'RAG capacity and cost envelope',
    [
      outcome(
        'rag-stage-latency-budget',
        'Allocate deadlines across admission, query processing, retrieval, reranking, context, generation, citation, streaming, and cleanup with p50, p95, and p99 evidence.',
        'Average end-to-end latency identifies the slow RAG stage.'
      ),
      outcome(
        'rag-throughput-concurrency-backpressure',
        'Bound concurrent queries, embedding batches, index searches, reranks, model calls, queues, tenants, retries, and overload shedding.',
        'Async code removes model and vector-store capacity limits.'
      ),
      outcome(
        'rag-cache-quality-freshness',
        'Measure embedding, retrieval, reranking, context, prefix, and answer cache hit rate, saved work, staleness, authorization, invalidation, and quality.',
        'A high cache-hit rate proves a RAG cache is correct.'
      ),
      outcome(
        'rag-total-cost-accounting',
        'Account for ingestion, parsing, OCR, embeddings, storage, index build, query, reranking, generation, network, observability, evaluation, operations, and recovery.',
        'Generation-token price is the only material RAG cost.'
      ),
      outcome(
        'rag-load-fault-capacity-test',
        'Test realistic query mixes, cold and warm state, filter selectivity, update load, provider limits, degraded dependencies, quality, recovery, and cost together.',
        'A vector-store queries-per-second benchmark predicts full RAG capacity.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  ragModule(
    'rag-ingestion-operations-recovery',
    'Continuous Ingestion, Reindexing, Cutover, and Disaster Recovery',
    'A nightly job rebuilds the live index in place, loses failed documents, publishes partial results, misses deletes, and has backups that were never restored.',
    'recoverable continuous-indexing system',
    [
      outcome(
        'rag-connectors-change-capture',
        'Capture creates, updates, moves, permissions, supersession, deletes, checkpoints, source snapshots, and out-of-order events from connectors.',
        'Polling document modification time captures every meaningful source change.'
      ),
      outcome(
        'rag-ingestion-retry-deadletter',
        'Classify parse, policy, model, rate, storage, poison, and unknown failures with bounded retries, dead letters, replay identity, and operator evidence.',
        'Retrying every failed document until success is reliable ingestion.'
      ),
      outcome(
        'rag-blue-green-reindex-cutover',
        'Build immutable candidate indexes, reconcile counts and versions, run shadow and quality checks, switch atomically, monitor, and retain rollback.',
        'Rebuilding an index in place is safe when writes are paused.'
      ),
      outcome(
        'rag-index-consistency-deletion',
        'Reconcile source, metadata, chunks, vectors, lexical index, graph, caches, and tombstones and prove bounded visibility lag.',
        'Matching document counts proves every index copy is consistent.'
      ),
      outcome(
        'rag-backup-restore-rebuild',
        'Choose what to back up versus rebuild, retain source and configuration identity, test restore objectives, and verify retrieval and deletion after recovery.',
        'Vector indexes never need recovery planning because they can be regenerated.',
        'professional',
        'create'
      ),
    ]
  ),
  ragModule(
    'rag-structured-graph-rag',
    'Structured Retrieval, Knowledge Graphs, GraphRAG, and Multi-Hop Evidence',
    'A team converts every document into a generated graph, loses edge provenance, uses community summaries as facts, and never compares the result with SQL or baseline retrieval.',
    'provenance-preserving multi-hop retriever',
    [
      outcome(
        'rag-structured-retrieval-selection',
        'Choose relational, document, graph, lexical, vector, or combined retrieval from question structure, source authority, joins, constraints, and evidence needs.',
        'Unstructured vector search is the universal interface for every knowledge source.'
      ),
      outcome(
        'rag-sql-metadata-grounding',
        'Use validated schemas, parameterized queries, authorization, row provenance, aggregation grain, and textual evidence when questions require structured facts.',
        'LLM-generated SQL can run directly when the database is read only.'
      ),
      outcome(
        'rag-knowledge-graph-provenance',
        'Represent entities, relations, qualifiers, time, source spans, confidence, conflicts, schema, and extraction version and distinguish asserted from generated edges.',
        'A generated knowledge-graph edge is equivalent to a source assertion.'
      ),
      outcome(
        'rag-graphrag-community-search',
        'Explain GraphRAG indexing, communities, summaries, local, global, DRIFT, and basic search with cost, prompt-tuning, and migration limits.',
        'GraphRAG is a drop-in improvement over chunk retrieval for every question.'
      ),
      outcome(
        'rag-multihop-path-evidence',
        'Plan bounded multi-hop retrieval, preserve path and source evidence, detect cycles and missing links, and compare against a simpler baseline.',
        'A connected graph path proves the multi-hop conclusion is true.'
      ),
    ]
  ),
  ragModule(
    'rag-agentic-adaptive-rag',
    'Adaptive and Agentic RAG Loops',
    'An agent decides whether and how often to retrieve, rewrites until satisfied, calls broad tools, stores its own answers as memory, and has no stop, budget, or trace contract.',
    'bounded adaptive retrieval state machine',
    [
      outcome(
        'rag-adaptive-retrieval-router',
        'Route no-retrieval, lexical, dense, hybrid, structured, web, or human paths using explicit features, authority, cost, risk, and evaluated fallback.',
        'A model can reliably decide whether it needs external evidence without evaluation.'
      ),
      outcome(
        'rag-iterative-retrieval-loop',
        'Run bounded retrieve-read-critique-refine cycles with query lineage, evidence gain, duplicate detection, stop reasons, and total budget.',
        'Iterative retrieval should continue until the model says it is confident.'
      ),
      outcome(
        'rag-agent-tool-authorization',
        'Separate retrieval from tools and enforce per-call schema, least privilege, tenant, data, egress, confirmation, timeout, and effect evidence.',
        'A retrieval agent needs broad tool access to answer comprehensively.'
      ),
      outcome(
        'rag-agent-state-memory-boundary',
        'Separate current evidence, conversation state, user memory, generated hypotheses, source documents, and durable knowledge with provenance and expiry.',
        'An agent answer can be stored as future knowledge without independent verification.'
      ),
      outcome(
        'rag-agentic-evaluation-stop',
        'Evaluate task outcome, retrieval rounds, tool choices, evidence coverage, injection resistance, cost, latency, stop correctness, and recovery.',
        'Agentic RAG quality is measured by answer text alone.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  ragModule(
    'rag-multimodal-rag',
    'Multimodal RAG for Documents, Images, Tables, Layout, and Audio',
    'A maintenance assistant extracts only PDF text, loses diagrams and table headers, cites whole pages, and presents visual evidence without text alternatives.',
    'accessible multimodal evidence retriever',
    [
      outcome(
        'rag-multimodal-ingestion-layout',
        'Preserve pages, regions, coordinates, reading order, figures, captions, tables, formulas, code, audio time spans, OCR confidence, and source links.',
        'Text extraction captures every fact in a visually structured document.'
      ),
      outcome(
        'rag-visual-embedding-late-interaction',
        'Compare OCR-text, image embedding, region embedding, and multi-vector late-interaction retrieval by modality and target evidence.',
        'One page-image embedding precisely locates every supporting region.'
      ),
      outcome(
        'rag-table-chart-retrieval',
        'Retrieve tables and charts with title, units, headers, cells, footnotes, series, axes, source coordinates, and calculation grain.',
        'Flattening a table into arbitrary text preserves row and column meaning.'
      ),
      outcome(
        'rag-audio-video-retrieval',
        'Align transcript, speaker, time, scene, slide, caption, confidence, and media segment while handling corrections and access policy.',
        'A transcript timestamp alone proves who said what on screen.'
      ),
      outcome(
        'rag-multimodal-accessibility-eval',
        'Provide structured text alternatives and keyboard inspection and evaluate retrieval, grounding, citations, bias, injection, latency, and user comprehension by modality.',
        'Multimodal answers are accessible when the model generates a short caption.',
        'professional',
        'create'
      ),
    ]
  ),
  ragModule(
    'rag-architecture-selection-evolution',
    'RAG, Long Context, Fine-Tuning, Memory, and Architecture Evolution',
    'A platform adds graph, agentic, corrective, long-context, and fine-tuned components simultaneously, cannot attribute gains, and has no compatibility or rollback plan.',
    'evidence-based architecture and migration record',
    [
      outcome(
        'rag-long-context-comparison',
        'Compare search, RAG, full-context, cached-context, and hierarchical approaches on corpus size, freshness, authorization, position, latency, cost, citations, and quality.',
        'A context window large enough for the corpus makes retrieval obsolete.'
      ),
      outcome(
        'rag-finetuning-retrieval-boundary',
        'Use retrieval for external mutable evidence and fine-tuning for evaluated behavior or domain adaptation while testing combinations and update cost.',
        'Fine-tuning is the best way to keep factual knowledge current.'
      ),
      outcome(
        'rag-corrective-self-reflective',
        'Evaluate corrective retrieval, self-reflection, verification, query rewriting, and fallback against deterministic stage evidence and false confidence.',
        'Adding a model critique step guarantees hallucinations are corrected.'
      ),
      outcome(
        'rag-memory-knowledge-freshness',
        'Separate session, user, episodic, semantic, source, and generated memory with consent, provenance, authority, expiry, correction, deletion, and retrieval policy.',
        'Conversation memory is just another trustworthy RAG corpus.'
      ),
      outcome(
        'rag-architecture-migration-agility',
        'Change parsers, chunkers, embeddings, indexes, rerankers, prompts, models, providers, policies, and schemas through compatibility matrices, canaries, dual runs, rollback, and deletion.',
        'A framework abstraction makes RAG component migration automatic.',
        'strategic',
        'create'
      ),
    ]
  ),
  ragModule(
    'rag-testing-release-defense',
    'Testing, Red Teaming, Release, Rollback, and Production Defense',
    'A release has happy-path unit tests and one demo, but no component evals, injection or tenant tests, accessibility checks, load faults, rollback, deletion, restore, or stakeholder defense.',
    'production RAG release and defense dossier',
    [
      outcome(
        'rag-testing-pyramid-fixtures',
        'Build deterministic unit, property, parser, chunk, retrieval, reranking, context, citation, contract, integration, end-to-end, and changed-corpus tests with fixed seeds and versions.',
        'Snapshotting generated answers provides a stable RAG test suite.'
      ),
      outcome(
        'rag-security-privacy-redteam',
        'Red team poisoning, indirect injection, embedding manipulation, tenant leaks, secret extraction, unsafe output, tool effects, denial of service, deletion, and incident response.',
        'Prompt-injection tests alone cover the RAG security surface.'
      ),
      outcome(
        'rag-accessibility-usability-qa',
        'Verify keyboard, landmarks, headings, focus, status, errors, citations, tables, text alternatives, touch, reduced motion, responsive layouts, comprehension, and escalation.',
        'Automated accessibility scans prove citations are understandable and usable.'
      ),
      outcome(
        'rag-release-canary-rollback',
        'Promote immutable corpus, index, model, prompt, policy, and application versions through shadow, canary, slice, quality, safety, latency, cost, abort, and rollback gates.',
        'Rolling back application code restores the previous RAG behavior.'
      ),
      outcome(
        'rag-production-defense',
        'Defend stakeholder outcome, sources, relevance, retrieval, generation, citations, safety, privacy, accessibility, reliability, capacity, cost, recovery, ownership, and residual risk as one release.',
        'Passing offline accuracy permits a RAG system to be declared production ready.',
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
    'NIST Retrieval-Augmented Generation Definition',
    'https://csrc.nist.gov/glossary/term/rag',
    'NIST AI 100-2e2025 definition reviewed 2026-07-14',
    'Authoritative RAG terminology and separation of model from external retrieval system.'
  ),
  source(
    'Retrieval-Augmented Generation Original Paper',
    'https://arxiv.org/abs/2005.11401',
    'Lewis et al. 2020 reviewed 2026-07-14',
    'Foundational retrieval-augmented generation architecture, parametric and non-parametric memory, and knowledge-intensive tasks.'
  ),
  source(
    'Python 3.14 Documentation',
    'https://docs.python.org/3.14/',
    'Python 3.14.6 current 2026-07-14',
    'Language, standard library, typing, testing, Unicode, data structures, and WebAssembly/runtime boundaries.'
  ),
  source(
    'ACM IEEE AAAI CS2023 Curriculum',
    'https://csed.acm.org/',
    'CS2023 reviewed 2026-07-14',
    'Recognized information retrieval, data, AI, security, ethics, accessibility, testing, and professional outcomes.'
  ),
  source(
    'Unicode Normalization UAX 15',
    'https://unicode.org/reports/tr15/',
    'Unicode 17.0.0 UAX 15 revision 57 reviewed 2026-07-14',
    'Canonical and compatibility normalization, stability, conformance, and text-preservation limits.'
  ),
  source(
    'Unicode Text Segmentation UAX 29',
    'https://unicode.org/reports/tr29/',
    'Unicode 17.0.0 reviewed 2026-07-14',
    'Grapheme, word, and sentence segmentation across scripts and language boundaries.'
  ),
  source(
    'scikit-learn Text Feature Extraction',
    'https://scikit-learn.org/stable/modules/feature_extraction.html',
    'scikit-learn 1.9.0 current 2026-07-14',
    'Count, hashing, and TF-IDF feature extraction with exact library formula conventions.'
  ),
  source(
    'BM25 and Probabilistic Relevance Framework',
    'https://doi.org/10.1561/1500000019',
    'Robertson and Zaragoza 2009 reviewed 2026-07-14',
    'Probabilistic relevance, BM25 term saturation, length normalization, and parameter interpretation.'
  ),
  source(
    'NIST Text REtrieval Conference',
    'https://trec.nist.gov/',
    'TREC and 2026 RAG track reviewed 2026-07-14',
    'Test collections, runs, topics, judgments, retrieval measurement, and current RAG evaluation track.'
  ),
  source(
    'Dense Passage Retrieval Paper',
    'https://arxiv.org/abs/2004.04906',
    'Karpukhin et al. 2020 reviewed 2026-07-14',
    'Bi-encoder dense retrieval, question and passage encoding, hard negatives, and open-domain evaluation.'
  ),
  source(
    'Sentence Transformers Retrieve and Rerank',
    'https://www.sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html',
    'sentence-transformers 5.6.0 current 2026-07-14',
    'Semantic search, bi-encoder candidate generation, CrossEncoder reranking, and evaluated retrieve-rerank shape.'
  ),
  source(
    'HNSW Approximate Nearest Neighbor Paper',
    'https://arxiv.org/abs/1603.09320',
    'Malkov and Yashunin 2016 reviewed 2026-07-14',
    'Navigable small-world graph construction and approximate nearest-neighbor tradeoffs.'
  ),
  source(
    'Faiss Documentation and Research Library',
    'https://github.com/facebookresearch/faiss',
    'faiss-cpu 1.14.3 current 2026-07-14',
    'Exact and approximate vector search, IVF, product quantization, GPU or CPU boundaries, and evaluation.'
  ),
  source(
    'pgvector Documentation',
    'https://github.com/pgvector/pgvector',
    'pgvector 0.8.2 current 2026-07-14',
    'PostgreSQL vector types, exact search, HNSW, IVFFlat, iterative scans, filtering, indexing, and operations.'
  ),
  source(
    'Reciprocal Rank Fusion Paper',
    'https://doi.org/10.1145/1571941.1572114',
    'Cormack, Clarke, and Buettcher 2009 reviewed 2026-07-14',
    'Rank-based fusion without direct raw-score comparison.'
  ),
  source(
    'ColBERTv2 Late Interaction Paper',
    'https://arxiv.org/abs/2112.01488',
    'Santhanam et al. 2021 reviewed 2026-07-14',
    'Multi-vector late interaction, residual compression, retrieval quality, and storage tradeoffs.'
  ),
  source(
    'HyDE Precise Zero-Shot Dense Retrieval Paper',
    'https://arxiv.org/abs/2212.10496',
    'Gao et al. 2022 reviewed 2026-07-14',
    'Hypothetical-document embedding as a retrieval transform and its evidence limits.'
  ),
  source(
    'Lost in the Middle Paper',
    'https://arxiv.org/abs/2307.03172',
    'Liu et al. 2023 reviewed 2026-07-14',
    'Long-context position effects and evaluation protocols for evidence placement.'
  ),
  source(
    'OpenAI Retrieval Guide',
    'https://developers.openai.com/api/docs/guides/retrieval',
    'current retrieval and vector-store guide reviewed 2026-07-14',
    'Provider-managed vector stores, search, attributes, ranking options, chunking, and current API boundaries.'
  ),
  source(
    'BEIR Heterogeneous Retrieval Benchmark',
    'https://arxiv.org/abs/2104.08663',
    'Thakur et al. 2021 reviewed 2026-07-14',
    'Zero-shot information retrieval across heterogeneous tasks and domains.'
  ),
  source(
    'MTEB Massive Text Embedding Benchmark',
    'https://arxiv.org/abs/2210.07316',
    'Muennighoff et al. 2022 and current benchmark reviewed 2026-07-14',
    'Multi-task and multilingual embedding evaluation beyond one retrieval dataset.'
  ),
  source(
    'RAG Evaluation Survey',
    'https://arxiv.org/abs/2504.14891',
    'Gan et al. 2025 reviewed 2026-07-14',
    'Retrieval, generation, system, safety, cost, and LLM-era RAG evaluation methods and limitations.'
  ),
  source(
    'OWASP RAG Security Cheat Sheet',
    'https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html',
    'current 2026-07-14',
    'Document poisoning, embedding manipulation, context attacks, access control, storage, deletion, connectors, monitoring, and incident controls.'
  ),
  source(
    'OWASP LLM Verification Standard',
    'https://owasp.org/www-project-llm-verification-standard/LLMSVS-v2.0-en.html',
    'LLMSVS 2.0 reviewed 2026-07-14',
    'Verification controls for knowledge bases, vectors, embeddings, context, sensitive data, storage, and secure LLM integration.'
  ),
  source(
    'NIST AI RMF Generative AI Profile',
    'https://doi.org/10.6028/NIST.AI.600-1',
    'NIST AI 600-1 reviewed 2026-07-14',
    'Governance, provenance, privacy, information integrity, evaluation, incident, and third-party risk for generative systems including RAG.'
  ),
  source(
    'NIST NCCoE RAG Chatbot Technical and Security Learnings',
    'https://csrc.nist.gov/pubs/ir/8579/ipd',
    'NIST IR 8579 initial public draft reviewed 2026-07-14',
    'Point-in-time RAG architecture, local deployment, access control, validation, hallucination, injection, and data-exposure lessons.'
  ),
  source(
    'OpenTelemetry GenAI Semantic Conventions',
    'https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/',
    'OpenTelemetry semantic conventions 1.43.0 reviewed 2026-07-14',
    'Retrieval operation, query, document, model, content sensitivity, trace, metric, and versioned observability attributes.'
  ),
  source(
    'Microsoft GraphRAG Documentation',
    'https://microsoft.github.io/graphrag/',
    'current GraphRAG documentation reviewed 2026-07-14',
    'Structured graph indexing, communities, summaries, local, global, DRIFT, basic search, prompt tuning, cost, and migration.'
  ),
  source(
    'ColPali Visual Document Retrieval Paper',
    'https://arxiv.org/abs/2407.01449',
    'Faysse et al. 2024 reviewed 2026-07-14',
    'Vision-language multi-vector retrieval from visually rich document pages and late-interaction evidence.'
  ),
  source(
    'WCAG 2.2 Recommendation',
    'https://www.w3.org/TR/WCAG22/',
    'W3C Recommendation current 2026-07-14',
    'Keyboard access, focus, status, target size, reflow, errors, text alternatives, and accessible evidence experiences.'
  ),
].map((entry) => ({ ...entry }));

export const ragRetrievalAugmentedGenerationConfig = finalizeCourse(
  {
    id: 'rag-retrieval-augmented-generation',
    competencyIdPrefix: 'rag-',
    title: 'Retrieval-Augmented Generation Engineering with Python 3.14',
    version: '2026.07',
    audience: {
      description:
        'Python developers who can design and test ordinary object-oriented programs and need to build, evaluate, secure, operate, and defend evidence-grounded retrieval-augmented systems from first principles through production release.',
      entryKnowledge: [
        'Write and test Python programs using functions, classes, dataclasses, iterators, dictionaries, sets, files, exceptions, typing, packages, and deterministic fixtures.',
        'Explain basic API, authentication, authorization, Unicode, statistics, privacy, accessibility, security, versioning, and release boundaries without prior machine-learning expertise.',
      ],
      deviceConstraints: [
        'Modern browser; instant Python work runs deterministic pure-Python retrieval, ranking, chunking, vector-math, fusion, evaluation, policy, pipeline, and operations models in an isolated Pyodide 3.14 worker. Native packages, local files, models, vector stores, networks, provider APIs, credentials, OCR, load, faults, recovery systems, and production effects remain explicit controlled transfer gates.',
      ],
      accessibilityAssumptions: [
        'Ranked results, score tables, relevance judgments, chunk maps, retrieval traces, context assemblies, claim-evidence graphs, citations, security cases, dashboards, document regions, and media timelines have keyboard operation, announced status, large targets, reduced motion, structured text alternatives, and no color-only meaning.',
      ],
    },
    scope: {
      includes: [
        'Python 3.14.6; information-retrieval foundations; inverted indexes; Unicode and multilingual preprocessing; provenance-preserving parsing and OCR; chunking; TF-IDF and BM25; relevance judgments and ranked metrics; embeddings and vector similarity; dense retrieval; exact and approximate indexes; vector-store lifecycle; hybrid fusion; query rewriting and decomposition; cross-encoder and late-interaction reranking; context compression and position; grounded generation and abstention; accessible citations; versioned pipeline architecture; component and end-to-end evaluation; evaluation datasets; RAG security, privacy, governance, observability, performance, continuous ingestion, disaster recovery, structured and GraphRAG, adaptive and agentic RAG, multimodal RAG, architecture evolution, testing, release, rollback, and production defense',
        'Runnable deterministic pure-Python models using fixed fixtures plus explicit Python 3.14.6, NumPy 2.5.1, scikit-learn 1.9.0, sentence-transformers 5.6.0, Faiss 1.14.3, pgvector 0.8.2, evaluated embedding and generation models, vector database, OCR, provider, network, load, fault, privacy, security, accessibility, restore, and production transfer gates',
        'Five cumulative authentic evidence-grounded systems and a performance-based production defense examination',
      ],
      excludes: [
        'Browser claims about real model quality, production embeddings, vector-store durability, network or provider behavior, secret handling, OCR accuracy, compliance, load, recovery, or production safety',
        'A copied vendor-framework tutorial, one fixed provider architecture, autonomous tool effects, unauthorized corpus ingestion, hidden evaluation answers, fabricated citations, generated text treated as evidence, or production release based only on answer plausibility',
      ],
      nextCourses: ['capstone-project', 'build-ai-support-assistant'],
    },
    sources,
    sharedRequirements: [
      'Every activity retrieves Python correctness, source and corpus identity, document and chunk lineage, query and relevance assumptions, tenant authorization, freshness and deletion policy, bounded work, accessible status, untrusted-data separation, changed-case evaluation, safe abstention, causal failure evidence, and explicit browser-versus-production limits before adding one RAG boundary.',
      'Browser Python is deterministic and isolated. It models ingestion ledgers, token streams, chunks, lexical and vector scores, indexes, filters, fusion, reranking, context, claims, citations, evaluations, policy, traces, cost, state, and recovery using fixed fixtures. It never loads real models, imports third-party ML packages, opens files or networks, contacts databases or providers, uses credentials, executes commands, or causes external effects.',
      'Passing work requires stable scenario and artifact identity, versioned corpus and components, a prediction, inspectable intermediate stage evidence, changed query and corpus cases, at least one rejected or abstained case, accessible claim-level sources, independent retrieval and generation evaluation, failure and recovery evidence, and named native or production transfer gates.',
    ],
    modules,
    projects: [
      project(
        'rag-public-benefits-navigator',
        'Accessible Public-Benefits Policy Navigator',
        'rag-hybrid-fusion',
        'A county benefits service and community accessibility panel',
        'They need authoritative effective-dated policy ingestion, multilingual exact and semantic search, access-safe filters, hybrid fusion, changed-policy tests, clear abstention, and keyboard-readable evidence while staff remain the decision makers.',
        [
          'rag-source-inventory-provenance',
          'rag-language-tokenization',
          'rag-bm25-length-saturation',
          'rag-domain-language-transfer',
          'rag-reciprocal-rank-fusion',
        ]
      ),
      project(
        'rag-incident-runbook-assistant',
        'Evidence-First Incident Runbook Assistant',
        'rag-pipeline-architecture',
        'A twenty-four-hour reliability operations group',
        'They need versioned runbooks and incident evidence, exact error-string and semantic retrieval, reranking, bounded context, claim citations, stale and conflicting guidance, deterministic traces, streaming ownership, escalation, and rollback.',
        [
          'rag-lexical-fields-phrases',
          'rag-crossencoder-relevance',
          'rag-context-citation-map',
          'rag-claim-level-citations',
          'rag-run-identity-lineage',
        ]
      ),
      project(
        'rag-research-evidence-analyst',
        'Research Evidence and Evaluation Analyst',
        'rag-eval-datasets-judgments',
        'A nonprofit public-health research review team',
        'They need source authority and licensing, query and relevance rubrics, hard negatives, claim-level support and conflict evidence, blinded human review, slice metrics, judge calibration, privacy, and reproducible experiment lineage.',
        [
          'rag-authority-ethics-scope',
          'rag-qrels-assessor-agreement',
          'rag-hard-negative-counterfactual',
          'rag-generation-grounding-evaluation',
          'rag-human-outcome-evidence',
        ]
      ),
      project(
        'rag-multimodal-maintenance-guide',
        'Multimodal Equipment Maintenance Guide',
        'rag-multimodal-rag',
        'A municipal water-system maintenance and training team',
        'They need page, diagram, table, part-number, warning, and audio evidence; coordinate citations; OCR uncertainty; access controls; injection defense; text alternatives; offline escalation; modality evaluation; and safe human authorization before physical action.',
        [
          'rag-ocr-layout-evidence',
          'rag-multimodal-ingestion-layout',
          'rag-visual-embedding-late-interaction',
          'rag-table-chart-retrieval',
          'rag-multimodal-accessibility-eval',
        ]
      ),
      project(
        'rag-production-defense-platform',
        'Enterprise RAG Production Defense',
        'rag-testing-release-defense',
        'An engineering, domain, security, privacy, accessibility, legal, finance, and operations board',
        'The board needs defensible outcomes, source and relevance policy, component and end-to-end evaluations, security and privacy red teams, accessible evidence, capacity and total cost, immutable versions, canary migration, deletion, rollback, restore, incident drills, ownership, and residual-risk acceptance.',
        [
          'rag-production-defense',
          'rag-release-canary-rollback',
          'rag-security-privacy-redteam',
          'rag-load-fault-capacity-test',
          'rag-incident-causal-recovery',
        ]
      ),
    ],
    examContext:
      'Unfamiliar Python 3.14 RAG engineering cases spanning user outcomes, IR foundations, provenance, Unicode, parsing and OCR, chunking, lexical ranking, relevance judgments, embeddings, dense and approximate search, vector-store lifecycle, hybrid fusion, query transformation, reranking, context assembly, grounded generation, citations, architecture, evaluation, security, privacy, observability, performance, continuous ingestion, recovery, structured and graph retrieval, adaptive agents, multimodal evidence, long-context and fine-tuning boundaries, migration, testing, release, rollback, and residual-risk defense with explicit browser and production evidence limits.',
    minimumQuestionBankSize: 960,
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: ['python-basics', 'python-oop'],
  }
);
