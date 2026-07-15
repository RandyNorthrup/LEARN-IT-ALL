const SPECS = {
  'rag-outcomes-task-evidence': {
    parameters:
      'question: str = "Which policy applies?", decision_owner: str = "benefits-team", evidence_items: int = 3, abstention_allowed: bool = True, evidence_bound: bool = True',
    body: `    if not question.strip() or not decision_owner.strip():
        return False, 0, "undefined-task"
    if evidence_items < 1:
        return False, evidence_items, "missing-evidence"
    if not abstention_allowed:
        return False, evidence_items, "forced-answer"
    if not evidence_bound:
        return False, evidence_items, "claim-overreach"
    assert evidence_items >= 1
    return True, evidence_items, "bounded-outcome"`,
    anchors: [
      'not question\\.strip',
      'evidence_items < 1',
      'not abstention_allowed',
      'not evidence_bound',
    ],
    task: 'gate a RAG task on a real decision, owner, evidence contract, and safe abstention',
  },
  'rag-ir-foundations-index': {
    parameters:
      'document_count: int = 8, term_count: int = 5, posting_count: int = 3, query_terms: int = 2, deterministic_order: bool = True',
    body: `    if document_count <= 0 or term_count <= 0:
        return False, 0, "corpus-shape"
    if posting_count < 0 or posting_count > document_count:
        return False, posting_count, "posting-list"
    if query_terms <= 0 or query_terms > term_count:
        return False, query_terms, "query-model"
    if not deterministic_order:
        return False, posting_count, "unstable-ranking"
    matched = min(posting_count, query_terms + 1)
    assert 0 <= matched <= document_count
    return True, matched, "inverted-index"`,
    anchors: [
      'document_count <= 0',
      'posting_count > document_count',
      'query_terms > term_count',
      'not deterministic_order',
    ],
    task: 'model corpus, query, terms, postings, Boolean matching, and deterministic ranked evidence',
  },
  'rag-ingestion-provenance': {
    parameters:
      'source_id: str = "manual-v3", bytes_read: int = 4096, parse_errors: int = 0, licensed: bool = True, provenance_kept: bool = True, content_trusted: bool = False',
    body: `    if not source_id or bytes_read < 0:
        return False, bytes_read, "source-admission"
    if parse_errors > 0:
        return False, parse_errors, "parse-quarantine"
    if not licensed or not provenance_kept:
        return False, bytes_read, "provenance-policy"
    if content_trusted:
        return False, bytes_read, "data-is-not-instruction"
    assert source_id == "manual-v3"
    return True, bytes_read, "quarantined-source"`,
    anchors: ['bytes_read < 0', 'parse_errors > 0', 'not licensed', 'content_trusted'],
    task: 'admit parsed content with identity, provenance, licensing, quarantine, and untrusted-data boundaries',
  },
  'rag-normalization-tokenization': {
    parameters:
      'original: str = "Café API v2", normalized: str = "café api v2", language: str = "fr", field_count: int = 3, offsets_preserved: bool = True',
    body: `    if not original or not normalized:
        return False, 0, "empty-text"
    if not language or field_count < 1:
        return False, field_count, "language-fields"
    if not offsets_preserved:
        return False, len(normalized), "citation-offsets"
    tokens = tuple(part for part in normalized.split() if part)
    if not tokens:
        return False, 0, "tokenization"
    assert "v2" in tokens
    return True, len(tokens), "unicode-field-model"`,
    anchors: ['not original', 'field_count < 1', 'not offsets_preserved', 'normalized\\.split'],
    task: 'normalize and tokenize multilingual fields without losing source text or citation offsets',
  },
  'rag-chunking-structure': {
    parameters:
      'token_count: int = 920, chunk_size: int = 240, overlap: int = 40, boundary_count: int = 5, parent_linked: bool = True',
    body: `    if token_count <= 0 or chunk_size <= 0:
        return False, 0, "chunk-input"
    if overlap < 0 or overlap >= chunk_size:
        return False, overlap, "overlap-budget"
    if boundary_count < 1 or not parent_linked:
        return False, boundary_count, "document-structure"
    stride = chunk_size - overlap
    chunks = 1 + max(0, (token_count - chunk_size + stride - 1) // stride)
    assert chunks >= 1
    return True, chunks, "structure-aware-chunks"`,
    anchors: [
      'chunk_size <= 0',
      'overlap >= chunk_size',
      'not parent_linked',
      'stride = chunk_size - overlap',
    ],
    task: 'choose structure-aware chunks, bounded overlap, stable identity, and parent-child evidence',
  },
  'rag-lexical-tfidf-bm25': {
    parameters:
      'term_frequency: int = 3, document_frequency: int = 4, document_count: int = 40, document_length: int = 180, average_length: int = 150, exact_identifier: bool = True',
    body: `    if term_frequency < 0 or document_frequency <= 0:
        return False, 0.0, "term-statistics"
    if document_count < document_frequency or average_length <= 0:
        return False, 0.0, "corpus-statistics"
    if document_length < 0:
        return False, 0.0, "document-length"
    idf_proxy = (document_count - document_frequency + 0.5) / (document_frequency + 0.5)
    score = term_frequency * idf_proxy / (1.0 + document_length / average_length)
    if exact_identifier and term_frequency == 0:
        return False, score, "identifier-miss"
    assert score >= 0.0
    return True, round(score, 4), "lexical-score"`,
    anchors: [
      'document_frequency <= 0',
      'document_count < document_frequency',
      'idf_proxy =',
      'exact_identifier and term_frequency == 0',
    ],
    task: 'compute inspectable TF-IDF or BM25-style lexical evidence and preserve exact identifiers',
  },
  'rag-retrieval-metrics': {
    parameters:
      'relevant_retrieved: int = 3, retrieved: int = 5, relevant_total: int = 4, reciprocal_rank: float = 0.5, graded_gain: float = 0.8',
    body: `    if min(relevant_retrieved, retrieved, relevant_total) < 0:
        return False, 0.0, "negative-count"
    if relevant_retrieved > retrieved or relevant_retrieved > relevant_total:
        return False, 0.0, "judgment-count"
    if not 0.0 <= reciprocal_rank <= 1.0 or not 0.0 <= graded_gain <= 1.0:
        return False, 0.0, "metric-range"
    precision = relevant_retrieved / retrieved if retrieved else 0.0
    recall = relevant_retrieved / relevant_total if relevant_total else 0.0
    balanced = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    assert 0.0 <= balanced <= 1.0
    return True, round((balanced + reciprocal_rank + graded_gain) / 3, 4), "metric-vector"`,
    anchors: [
      'relevant_retrieved > retrieved',
      'reciprocal_rank <= 1.0',
      'precision =',
      'recall =',
    ],
    task: 'separate precision, recall, reciprocal rank, graded gain, cutoff, and judgment assumptions',
  },
  'rag-embeddings-vector-semantics': {
    parameters:
      'query: tuple[float, ...] = (1.0, 0.0, 1.0), document: tuple[float, ...] = (0.5, 0.0, 0.5), dimensions: int = 3, same_model: bool = True, normalized: bool = False',
    body: `    if dimensions <= 0 or len(query) != dimensions or len(document) != dimensions:
        return False, 0.0, "dimension-contract"
    if not same_model:
        return False, 0.0, "embedding-space"
    dot = sum(left * right for left, right in zip(query, document, strict=True))
    query_norm = sum(value * value for value in query) ** 0.5
    document_norm = sum(value * value for value in document) ** 0.5
    if query_norm == 0.0 or document_norm == 0.0:
        return False, 0.0, "zero-vector"
    cosine = dot / (query_norm * document_norm)
    if normalized and abs(query_norm - 1.0) > 1e-6:
        return False, cosine, "normalization-claim"
    assert -1.0 <= cosine <= 1.0
    return True, round(cosine, 4), "cosine-evidence"`,
    anchors: [
      'len\\(query\\) != dimensions',
      'not same_model',
      'zip\\(query, document, strict=True\\)',
      'query_norm == 0.0',
    ],
    task: 'trace embedding space, dimensions, similarity, normalization, and model-version boundaries',
  },
  'rag-dense-retrieval': {
    parameters:
      'query_model: str = "retriever-v4", document_model: str = "retriever-v4", candidate_count: int = 50, relevant_rank: int = 4, domain_evaluated: bool = True, multilingual_evaluated: bool = True',
    body: `    if query_model != document_model:
        return False, 0, "model-space-mismatch"
    if candidate_count <= 0 or relevant_rank < 1 or relevant_rank > candidate_count:
        return False, relevant_rank, "candidate-rank"
    if not domain_evaluated:
        return False, relevant_rank, "domain-transfer"
    if not multilingual_evaluated:
        return False, relevant_rank, "language-transfer"
    recall_proxy = candidate_count - relevant_rank + 1
    assert recall_proxy > 0
    return True, recall_proxy, "dense-candidates"`,
    anchors: [
      'query_model != document_model',
      'relevant_rank > candidate_count',
      'not domain_evaluated',
      'not multilingual_evaluated',
    ],
    task: 'gate dense retrieval on one embedding space, candidate recall, domain, and language evidence',
  },
  'rag-ann-indexes': {
    parameters:
      'vectors: int = 10000, dimensions: int = 384, exact_recall: float = 0.96, latency_ms: float = 18.0, memory_mb: int = 96, filtered: bool = True',
    body: `    if vectors <= 0 or dimensions <= 0:
        return False, 0.0, "index-shape"
    if not 0.0 <= exact_recall <= 1.0:
        return False, exact_recall, "recall-range"
    if latency_ms <= 0.0 or memory_mb <= 0:
        return False, latency_ms, "resource-measurement"
    if not filtered:
        return False, exact_recall, "filter-recall"
    utility = exact_recall / latency_ms
    assert utility > 0.0
    return True, round(utility, 5), "ann-tradeoff"`,
    anchors: ['dimensions <= 0', 'exact_recall <= 1.0', 'latency_ms <= 0.0', 'not filtered'],
    task: 'compare exact, HNSW, IVF, and quantized indexes with recall, latency, memory, and filter evidence',
  },
  'rag-vector-store-lifecycle': {
    parameters:
      'document_id: str = "policy-17", content_version: int = 6, index_version: int = 6, tenant_match: bool = True, tombstoned: bool = False, idempotent: bool = True',
    body: `    if not document_id or content_version < 1:
        return False, content_version, "document-identity"
    if index_version != content_version:
        return False, index_version, "stale-index"
    if not tenant_match:
        return False, index_version, "tenant-filter"
    if tombstoned:
        return False, index_version, "deleted-document"
    if not idempotent:
        return False, index_version, "upsert-replay"
    assert index_version == content_version
    return True, index_version, "live-vector-record"`,
    anchors: [
      'content_version < 1',
      'index_version != content_version',
      'not tenant_match',
      'if tombstoned',
    ],
    task: 'preserve document identity, model and index versions, tenant filters, idempotency, and deletion',
  },
  'rag-hybrid-fusion': {
    parameters:
      'lexical_rank: int = 2, dense_rank: int = 5, rank_constant: int = 60, lexical_available: bool = True, dense_available: bool = True, calibrated: bool = True',
    body: `    if rank_constant <= 0 or lexical_rank < 1 or dense_rank < 1:
        return False, 0.0, "rank-input"
    if not lexical_available and not dense_available:
        return False, 0.0, "no-retriever"
    lexical_score = 1.0 / (rank_constant + lexical_rank) if lexical_available else 0.0
    dense_score = 1.0 / (rank_constant + dense_rank) if dense_available else 0.0
    fused = lexical_score + dense_score
    if not calibrated:
        return False, fused, "fusion-evaluation"
    assert fused > 0.0
    return True, round(fused, 6), "reciprocal-rank-fusion"`,
    anchors: [
      'rank_constant <= 0',
      'not lexical_available and not dense_available',
      'lexical_score =',
      'not calibrated',
    ],
    task: 'fuse lexical and dense candidates without comparing uncalibrated raw scores',
  },
  'rag-query-understanding': {
    parameters:
      'query: str = "reset MFA for contractor", intent: str = "procedure", filters_valid: bool = True, ambiguity: int = 1, rewrite_count: int = 2, original_preserved: bool = True',
    body: `    if not query.strip() or not intent:
        return False, 0, "query-intent"
    if not filters_valid:
        return False, rewrite_count, "filter-schema"
    if ambiguity < 0 or rewrite_count < 0 or rewrite_count > 5:
        return False, rewrite_count, "rewrite-budget"
    if not original_preserved:
        return False, rewrite_count, "query-lineage"
    if ambiguity > 2:
        return False, rewrite_count, "clarification-required"
    assert rewrite_count <= 5
    return True, rewrite_count, "bounded-query-plan"`,
    anchors: [
      'not query\\.strip',
      'not filters_valid',
      'rewrite_count > 5',
      'not original_preserved',
    ],
    task: 'classify intent, validate filters, bound rewrites, preserve lineage, and ask when ambiguity remains',
  },
  'rag-reranking': {
    parameters:
      'candidate_count: int = 40, rerank_count: int = 12, accepted_count: int = 5, cross_encoder_ms: float = 36.0, late_interaction: bool = False, evaluated: bool = True',
    body: `    if candidate_count <= 0 or rerank_count <= 0:
        return False, 0, "candidate-budget"
    if rerank_count > candidate_count or accepted_count > rerank_count:
        return False, accepted_count, "rerank-shape"
    if cross_encoder_ms <= 0.0:
        return False, accepted_count, "latency-evidence"
    if late_interaction and rerank_count < accepted_count:
        return False, accepted_count, "late-interaction-state"
    if not evaluated:
        return False, accepted_count, "quality-gate"
    assert 0 < accepted_count <= rerank_count
    return True, accepted_count, "reranked-context"`,
    anchors: [
      'rerank_count > candidate_count',
      'accepted_count > rerank_count',
      'cross_encoder_ms <= 0.0',
      'not evaluated',
    ],
    task: 'budget bi-encoder candidates, cross-encoder or late-interaction reranking, quality, and latency',
  },
  'rag-context-selection': {
    parameters:
      'candidate_tokens: int = 6400, context_budget: int = 2200, selected_tokens: int = 1800, duplicate_chunks: int = 1, citation_links: int = 6, order_tested: bool = True',
    body: `    if min(candidate_tokens, context_budget, selected_tokens) < 0:
        return False, selected_tokens, "token-accounting"
    if selected_tokens > context_budget or context_budget > candidate_tokens:
        return False, selected_tokens, "context-budget"
    if duplicate_chunks < 0 or citation_links < 1:
        return False, citation_links, "context-identity"
    if not order_tested:
        return False, citation_links, "position-bias"
    retained = selected_tokens - duplicate_chunks * 100
    assert retained >= 0
    return True, retained, "citation-mapped-context"`,
    anchors: [
      'selected_tokens > context_budget',
      'duplicate_chunks < 0',
      'citation_links < 1',
      'not order_tested',
    ],
    task: 'deduplicate, compress, order, and citation-map context within a measured token budget',
  },
  'rag-grounded-generation': {
    parameters:
      'claims: int = 4, supported_claims: int = 4, citations: int = 3, untrusted_instructions: int = 1, abstained_when_missing: bool = True, schema_valid: bool = True',
    body: `    if claims < 0 or supported_claims < 0 or supported_claims > claims:
        return False, supported_claims, "claim-count"
    if citations < 0 or untrusted_instructions < 0:
        return False, citations, "context-shape"
    if supported_claims != claims and not abstained_when_missing:
        return False, supported_claims, "unsupported-answer"
    if untrusted_instructions > 0 and not schema_valid:
        return False, supported_claims, "context-injection"
    coverage = supported_claims / claims if claims else 1.0
    assert 0.0 <= coverage <= 1.0
    return True, round(coverage, 4), "grounded-response"`,
    anchors: [
      'supported_claims > claims',
      'supported_claims != claims',
      'not abstained_when_missing',
      'untrusted_instructions > 0',
    ],
    task: 'treat retrieved text as untrusted data, ground every material claim, cite evidence, and abstain',
  },
  'rag-citations-user-experience': {
    parameters:
      'claims: int = 5, claim_links: int = 5, source_links: int = 4, stale_sources: int = 0, keyboard_reachable: bool = True, status_announced: bool = True',
    body: `    if claims < 0 or claim_links < 0 or source_links < 0:
        return False, 0, "citation-count"
    if claim_links < claims:
        return False, claim_links, "unsupported-claim"
    if stale_sources > 0:
        return False, stale_sources, "freshness-warning"
    if not keyboard_reachable or not status_announced:
        return False, source_links, "accessible-evidence"
    assert claim_links >= claims
    return True, source_links, "inspectable-citations"`,
    anchors: [
      'claim_links < claims',
      'stale_sources > 0',
      'not keyboard_reachable',
      'not status_announced',
    ],
    task: 'present claim-level citations, freshness, source inspection, keyboard access, and announced status',
  },
  'rag-pipeline-architecture': {
    parameters:
      'corpus_version: int = 12, embedding_version: int = 7, index_version: int = 12, prompt_version: int = 9, stage_count: int = 6, idempotent: bool = True, cache_key_complete: bool = True',
    body: `    if min(corpus_version, embedding_version, index_version, prompt_version) < 1:
        return False, 0, "version-contract"
    if index_version != corpus_version:
        return False, stage_count, "index-corpus-skew"
    if stage_count < 5:
        return False, stage_count, "missing-stage"
    if not idempotent or not cache_key_complete:
        return False, stage_count, "replay-cache"
    identity = corpus_version + embedding_version + prompt_version
    assert identity > index_version
    return True, identity, "versioned-pipeline"`,
    anchors: [
      'index_version != corpus_version',
      'stage_count < 5',
      'not idempotent',
      'not cache_key_complete',
    ],
    task: 'compose versioned ingestion, retrieval, reranking, context, generation, citation, and cache contracts',
  },
  'rag-end-to-end-evaluation': {
    parameters:
      'retrieval_score: float = 0.82, faithfulness: float = 0.91, answer_relevance: float = 0.84, citation_precision: float = 0.95, safety_pass: bool = True, human_reviewed: bool = True',
    body: `    scores = (retrieval_score, faithfulness, answer_relevance, citation_precision)
    if any(score < 0.0 or score > 1.0 for score in scores):
        return False, 0.0, "metric-range"
    if min(scores) < 0.75:
        return False, min(scores), "weak-stage"
    if not safety_pass:
        return False, min(scores), "safety-failure"
    if not human_reviewed:
        return False, min(scores), "judge-only"
    aggregate = sum(scores) / len(scores)
    assert aggregate <= 1.0
    return True, round(aggregate, 4), "layered-evaluation"`,
    anchors: [
      'any\\(score < 0.0',
      'min\\(scores\\) < 0.75',
      'not safety_pass',
      'not human_reviewed',
    ],
    task: 'evaluate retrieval, grounding, answer utility, citations, safety, and human evidence separately',
  },
  'rag-eval-datasets-judgments': {
    parameters:
      'queries: int = 120, assessors: int = 2, hard_negatives: int = 36, leaked_queries: int = 0, agreement: float = 0.78, slices_covered: int = 6',
    body: `    if queries <= 0 or assessors < 1 or hard_negatives < 0:
        return False, queries, "dataset-shape"
    if leaked_queries > 0:
        return False, leaked_queries, "evaluation-leakage"
    if agreement < 0.0 or agreement > 1.0:
        return False, 0, "agreement-range"
    if assessors < 2 or slices_covered < 4:
        return False, slices_covered, "judgment-coverage"
    assert hard_negatives < queries
    return True, queries, "versioned-eval-set"`,
    anchors: ['queries <= 0', 'leaked_queries > 0', 'agreement > 1.0', 'assessors < 2'],
    task: 'build versioned judgments with hard negatives, slice coverage, agreement, and leakage control',
  },
  'rag-security-poisoning-injection': {
    parameters:
      'documents: int = 20, quarantined: int = 2, tenant_authorized: bool = True, retrieved_instructions_ignored: bool = True, output_validated: bool = True, tools_enabled: bool = False',
    body: `    if documents <= 0 or quarantined < 0 or quarantined > documents:
        return False, quarantined, "ingestion-security"
    if not tenant_authorized:
        return False, quarantined, "retrieval-authorization"
    if not retrieved_instructions_ignored:
        return False, quarantined, "indirect-injection"
    if not output_validated:
        return False, quarantined, "unsafe-output"
    if tools_enabled:
        return False, quarantined, "tool-separation"
    assert quarantined <= documents
    return True, documents - quarantined, "defended-corpus"`,
    anchors: [
      'quarantined > documents',
      'not tenant_authorized',
      'not retrieved_instructions_ignored',
      'if tools_enabled',
    ],
    task: 'contain poisoning, embedding manipulation, indirect injection, tenant leaks, unsafe output, and tool effects',
  },
  'rag-privacy-governance': {
    parameters:
      'records: int = 100, pii_records: int = 8, authorized_records: int = 8, deletion_lag_hours: int = 4, retention_days: int = 30, residency_valid: bool = True',
    body: `    if records < 0 or pii_records < 0 or pii_records > records:
        return False, pii_records, "inventory"
    if authorized_records != pii_records:
        return False, authorized_records, "purpose-access"
    if deletion_lag_hours < 0 or deletion_lag_hours > 24:
        return False, deletion_lag_hours, "deletion-sla"
    if retention_days <= 0 or not residency_valid:
        return False, retention_days, "governance-policy"
    assert authorized_records <= records
    return True, retention_days, "governed-lifecycle"`,
    anchors: [
      'pii_records > records',
      'authorized_records != pii_records',
      'deletion_lag_hours > 24',
      'not residency_valid',
    ],
    task: 'enforce data minimization, purpose, access, deletion, retention, residency, and embedding privacy',
  },
  'rag-observability-reliability': {
    parameters:
      'trace_stages: int = 6, expected_stages: int = 6, retrieval_p95_ms: float = 42.0, error_rate: float = 0.01, content_logged: bool = False, rollback_ready: bool = True',
    body: `    if trace_stages != expected_stages or expected_stages < 5:
        return False, trace_stages, "trace-completeness"
    if retrieval_p95_ms <= 0.0 or error_rate < 0.0 or error_rate > 1.0:
        return False, error_rate, "service-signal"
    if content_logged:
        return False, error_rate, "sensitive-telemetry"
    if not rollback_ready:
        return False, error_rate, "recovery-readiness"
    assert trace_stages == expected_stages
    return True, round(retrieval_p95_ms, 2), "redacted-stage-trace"`,
    anchors: [
      'trace_stages != expected_stages',
      'error_rate > 1.0',
      'if content_logged',
      'not rollback_ready',
    ],
    task: 'trace every RAG stage with bounded redacted signals, SLOs, causal faults, and rollback readiness',
  },
  'rag-performance-cost-capacity': {
    parameters:
      'queries_per_second: int = 24, retrieval_ms: int = 45, rerank_ms: int = 38, generation_ms: int = 420, deadline_ms: int = 650, cost_microunits: int = 950, cache_hit: bool = False',
    body: `    if queries_per_second <= 0 or min(retrieval_ms, rerank_ms, generation_ms) < 0:
        return False, 0, "capacity-input"
    total_ms = retrieval_ms + rerank_ms + generation_ms
    if total_ms > deadline_ms:
        return False, total_ms, "latency-budget"
    if cost_microunits < 0:
        return False, cost_microunits, "cost-accounting"
    adjusted_cost = cost_microunits // 2 if cache_hit else cost_microunits
    assert adjusted_cost <= cost_microunits
    return True, adjusted_cost, "capacity-envelope"`,
    anchors: [
      'queries_per_second <= 0',
      'total_ms > deadline_ms',
      'cost_microunits < 0',
      'if cache_hit',
    ],
    task: 'budget stage latency, throughput, memory, provider work, cache validity, and cost without hiding quality loss',
  },
  'rag-ingestion-operations-recovery': {
    parameters:
      'source_version: int = 14, indexed_version: int = 14, failed_documents: int = 0, dead_letters: int = 0, blue_green_ready: bool = True, restore_verified: bool = True',
    body: `    if source_version < 1 or indexed_version < 1:
        return False, 0, "version-input"
    if indexed_version != source_version:
        return False, indexed_version, "index-lag"
    if failed_documents != dead_letters:
        return False, failed_documents, "failure-accounting"
    if not blue_green_ready:
        return False, indexed_version, "unsafe-cutover"
    if not restore_verified:
        return False, indexed_version, "unproven-recovery"
    assert failed_documents == dead_letters
    return True, indexed_version, "recoverable-index"`,
    anchors: [
      'indexed_version != source_version',
      'failed_documents != dead_letters',
      'not blue_green_ready',
      'not restore_verified',
    ],
    task: 'operate change capture, retries, dead letters, reindexing, blue-green cutover, deletion, and restore',
  },
  'rag-structured-graph-rag': {
    parameters:
      'entities: int = 12, relations: int = 18, hops: int = 2, provenance_edges: int = 18, schema_valid: bool = True, baseline_beaten: bool = True',
    body: `    if entities <= 0 or relations < 0:
        return False, 0, "graph-shape"
    if hops < 1 or hops > 4:
        return False, hops, "hop-budget"
    if provenance_edges < relations:
        return False, provenance_edges, "edge-provenance"
    if not schema_valid:
        return False, relations, "structured-contract"
    if not baseline_beaten:
        return False, relations, "complexity-not-earned"
    assert provenance_edges >= relations
    return True, hops, "grounded-multihop"`,
    anchors: ['entities <= 0', 'hops > 4', 'provenance_edges < relations', 'not baseline_beaten'],
    task: 'select structured, SQL, knowledge-graph, or GraphRAG retrieval only when multi-hop evidence beats baseline',
  },
  'rag-agentic-adaptive-rag': {
    parameters:
      'retrieval_rounds: int = 2, maximum_rounds: int = 4, tool_calls: int = 1, maximum_tool_calls: int = 3, confidence: float = 0.82, authorization_checked: bool = True, stop_reason: str = "evidence-sufficient"',
    body: `    if retrieval_rounds < 0 or retrieval_rounds > maximum_rounds:
        return False, retrieval_rounds, "retrieval-loop"
    if tool_calls < 0 or tool_calls > maximum_tool_calls:
        return False, tool_calls, "tool-budget"
    if not 0.0 <= confidence <= 1.0:
        return False, retrieval_rounds, "confidence-range"
    if not authorization_checked:
        return False, tool_calls, "tool-authorization"
    if stop_reason not in {"evidence-sufficient", "budget", "abstain"}:
        return False, retrieval_rounds, "stop-contract"
    assert retrieval_rounds <= maximum_rounds
    return True, retrieval_rounds, stop_reason`,
    anchors: [
      'retrieval_rounds > maximum_rounds',
      'tool_calls > maximum_tool_calls',
      'not authorization_checked',
      'stop_reason not in',
    ],
    task: 'bound adaptive retrieval, decomposition, tool authority, confidence, stop reasons, and loop evidence',
  },
  'rag-multimodal-rag': {
    parameters:
      'pages: int = 8, text_regions: int = 20, image_regions: int = 6, table_regions: int = 4, coordinates_kept: bool = True, text_alternatives: bool = True, modality_evaluated: bool = True',
    body: `    if pages <= 0 or min(text_regions, image_regions, table_regions) < 0:
        return False, 0, "document-regions"
    if not coordinates_kept:
        return False, pages, "visual-citation"
    if not text_alternatives:
        return False, pages, "accessibility-alternative"
    if not modality_evaluated:
        return False, pages, "modality-quality"
    regions = text_regions + image_regions + table_regions
    assert regions >= pages
    return True, regions, "multimodal-evidence"`,
    anchors: [
      'pages <= 0',
      'not coordinates_kept',
      'not text_alternatives',
      'not modality_evaluated',
    ],
    task: 'retrieve text, tables, images, layout, and audio evidence with coordinates and accessible alternatives',
  },
  'rag-architecture-selection-evolution': {
    parameters:
      'baseline_score: float = 0.74, candidate_score: float = 0.83, migration_cost: int = 40, benefit_units: int = 90, long_context_tested: bool = True, rollback_possible: bool = True',
    body: `    if not 0.0 <= baseline_score <= 1.0 or not 0.0 <= candidate_score <= 1.0:
        return False, 0.0, "score-range"
    if migration_cost < 0 or benefit_units < 0:
        return False, 0.0, "change-cost"
    if not long_context_tested:
        return False, candidate_score, "architecture-comparison"
    if candidate_score <= baseline_score or benefit_units <= migration_cost:
        return False, candidate_score - baseline_score, "complexity-not-earned"
    if not rollback_possible:
        return False, candidate_score, "migration-safety"
    improvement = candidate_score - baseline_score
    assert improvement > 0.0
    return True, round(improvement, 4), "earned-evolution"`,
    anchors: [
      'candidate_score <= 1.0',
      'not long_context_tested',
      'candidate_score <= baseline_score',
      'not rollback_possible',
    ],
    task: 'compare RAG, long context, fine-tuning, memory, graph, and self-corrective designs before migration',
  },
  'rag-testing-release-defense': {
    parameters:
      'unit: bool = True, retrieval_eval: bool = True, generation_eval: bool = True, security: bool = True, accessibility: bool = True, load: bool = True, rollback: bool = True, recovery: bool = True',
    body: `    gates = (unit, retrieval_eval, generation_eval, security, accessibility, load, rollback, recovery)
    passed = sum(1 for gate in gates if gate)
    if not unit or not retrieval_eval:
        return False, passed, "deterministic-gates"
    if not generation_eval or not security or not accessibility:
        return False, passed, "quality-safety-gates"
    if not load or not rollback or not recovery:
        return False, passed, "production-gates"
    assert passed == len(gates)
    return True, passed, "production-defense"`,
    anchors: [
      'not unit or not retrieval_eval',
      'not generation_eval',
      'not load or not rollback',
      'passed == len\\(gates\\)',
    ],
    task: 'gate release on component, end-to-end, security, accessibility, load, rollback, and recovery evidence',
  },
};

const ENVIRONMENTS = [
  'a public-benefits policy change',
  'an incident-response knowledge search',
  'a multilingual support escalation',
  'a regulated document deletion request',
  'a multimodal maintenance-manual release',
  'an enterprise retrieval migration canary',
];

const CHANGES = [
  'replace one exact identifier with a synonym and compare lexical, dense, and hybrid recall',
  'move the only supporting passage to the middle of the context and rerun the position slice',
  'insert an untrusted instruction into a relevant document and prove it remains data',
  'change tenant, language, date, and document version and reject stale or unauthorized evidence',
  'double corpus size and candidate depth while preserving the latency, memory, and cost envelope',
  'remove one supporting source and require abstention instead of a plausible unsupported answer',
];

const CONSTRAINTS = [
  'retain corpus, document, chunk, model, index, prompt, query, and evaluation version identity',
  'keep browser execution pure, deterministic, bounded, and free of model, vector-database, network, file, credential, and host effects',
  'preserve source provenance, tenant authorization, deletion, freshness, citation offsets, and untrusted-data separation',
  'keep every status keyboard reachable, announced, readable without color, and linked to structured source evidence',
  'measure retrieval and generation separately before accepting an end-to-end score',
  'record the failed stage, causal trace, repair, rollback, recovery, and residual-risk owner',
];

function details(suffix) {
  const cleaned = suffix.replace(/[^a-z0-9]/giu, '').toLowerCase() || '0';
  let value = 2166136261;
  for (const character of cleaned) {
    value ^= character.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  value >>>= 0;
  return {
    caseNumber: (value % 9000) + 1000,
    environment: ENVIRONMENTS[value % ENVIRONMENTS.length],
    change: CHANGES[(value >>> 4) % CHANGES.length],
    constraint: CONSTRAINTS[(value >>> 8) % CONSTRAINTS.length],
  };
}

function lookaheads(anchors, scope) {
  return anchors.map((anchor) => `(?=${scope}*?${anchor})`).join('');
}

export function ragPythonScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing RAG Python scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} RAG engineering team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic Python evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser code uses pure bounded models and fixed fixtures only. Native Python packages, embedding or generation models, vector databases, files, networks, credentials, provider APIs, OCR, load, faults, recovery systems, and production behavior require explicit authorized transfer gates.${probe}`;
}

export function ragPythonEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing RAG Python evidence profile for ${moduleId}`);
  const chosen = details(suffix);
  const scope = '(?:(?!# Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${scope}*?def\\s+${functionName}\\s*\\(${scope}*?\\)\\s*(?:->[^:]+)?\\s*:${lookaheads(spec.anchors, scope)}(?=${scope}*?assert)(?=${scope}*?return)${scope}*?return`,
    example: `${marker}
# Competency: ${competencyId}.
# Case ${chosen.caseNumber}: ${chosen.environment}.
# Operating constraint: ${chosen.constraint}.
# Changed case: ${chosen.change}.
def ${functionName}(${spec.parameters}) -> tuple[bool, int | float, str]:
    evidence_variant_${suffix} = "${suffix}-${[...suffix].reverse().join('')}-${chosen.caseNumber}"
    assert evidence_variant_${suffix}
    evidence_axes_${suffix} = (
        "corpus${suffix}",
        "query${[...suffix].reverse().join('')}",
        "tenant${chosen.caseNumber}",
        "index${suffix}${chosen.caseNumber}",
        "prompt${[...suffix].reverse().join('')}${chosen.caseNumber}",
        "evaluation${chosen.caseNumber}${suffix}",
    )
    assert len(set(evidence_axes_${suffix})) == 6
${spec.body}
`,
    requirement: `Append a runnable pure-Python function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Keep its defaults runnable, assert an invariant, and return observable changed-case evidence. Browser code must not import third-party packages, load models, open files or sockets, contact vector databases or provider APIs, read credentials or host state, execute commands, or cause external effects; verify those boundaries later with Python 3.14.6, pinned native packages, evaluated models, disposable data and indexes, controlled services, load, fault, recovery, security, accessibility, and production gates.`,
  };
}

export function ragPythonWorkedExample(moduleId, seed) {
  return ragPythonEvidenceContract({
    competencyId: `rag-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `# Evidence: rag-worked-${moduleId}-${seed}`,
    suffix: `worked${seed}`,
  }).example;
}

export const ragPythonEvidenceModuleIds = Object.freeze(Object.keys(SPECS));
