#!/usr/bin/env python3
"""Comprehensive audit of CompTIA Network+ quiz files."""

import json
import os
from collections import defaultdict

QUIZ_DIR = "/home/randy/GitHub/learn-it-all/content/courses/comptia-network-plus/quizzes"
REQUIRED_TOP = ["id", "title", "description", "timeLimit", "passingScore", "questions"]
REQUIRED_Q = ["id", "type", "question", "options", "correctAnswer", "explanation"]

MIN_QUESTIONS_CHAPTER = 30
MIN_QUESTIONS_FINAL = 40

issues = []

def add_issue(sev, fname, detail):
    issues.append((sev, fname, detail))

files = sorted([f for f in os.listdir(QUIZ_DIR) if f.endswith(".json")])
all_questions = {}
quiz_summaries = []

for fname in files:
    fpath = os.path.join(QUIZ_DIR, fname)
    try:
        with open(fpath) as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        add_issue("CRITICAL", fname, f"Invalid JSON: {e}")
        quiz_summaries.append((fname, "INVALID", "-", "-", "-"))
        continue

    for field in REQUIRED_TOP:
        if field not in data:
            add_issue("HIGH", fname, f"Missing top-level field: {field}")

    quiz_id = data.get("id", "MISSING")
    time_limit = data.get("timeLimit", "MISSING")
    passing_score = data.get("passingScore", "MISSING")
    questions = data.get("questions", [])
    q_count = len(questions)

    if isinstance(time_limit, (int, float)):
        if time_limit < 60:
            add_issue("CRITICAL", fname, f"timeLimit={time_limit} appears to be in minutes, not seconds")

    if isinstance(passing_score, (int, float)):
        if passing_score < 50 or passing_score > 100:
            add_issue("HIGH", fname, f"passingScore={passing_score} seems unreasonable")

    is_final = "final" in fname.lower()
    min_q = MIN_QUESTIONS_FINAL if is_final else MIN_QUESTIONS_CHAPTER
    if q_count < min_q:
        add_issue("HIGH", fname, f"Only {q_count} questions (minimum {min_q} expected)")

    local_texts = {}
    local_ids = {}

    for qi, q in enumerate(questions):
        qnum = qi + 1
        for field in REQUIRED_Q:
            if field not in q:
                add_issue("CRITICAL", fname, f"Q{qnum}: Missing required field: {field}")

        qid = q.get("id", f"MISSING-{qnum}")
        qtext = q.get("question", "")
        qtype = q.get("type", "")
        options = q.get("options", [])
        correct = q.get("correctAnswer", None)
        explanation = q.get("explanation", "")

        if qid in local_ids:
            add_issue("CRITICAL", fname, f"Q{qnum}: Duplicate question ID '{qid}' (also Q{local_ids[qid]})")
        local_ids[qid] = qnum

        if isinstance(correct, int):
            if correct < 0 or correct >= len(options):
                add_issue("CRITICAL", fname, f"Q{qnum} ({qid}): correctAnswer={correct} out of bounds (options length={len(options)})")
        elif isinstance(correct, bool):
            if qtype != "true-false":
                add_issue("HIGH", fname, f"Q{qnum} ({qid}): Boolean correctAnswer but type is '{qtype}'")
        elif isinstance(correct, list):
            for idx in correct:
                if isinstance(idx, int) and (idx < 0 or idx >= len(options)):
                    add_issue("CRITICAL", fname, f"Q{qnum} ({qid}): correctAnswer index {idx} out of bounds")

        if qtext:
            normalized = qtext.strip().lower()
            if normalized in local_texts:
                add_issue("HIGH", fname, f"Q{qnum} ({qid}): Duplicate of Q{local_texts[normalized]} within same quiz")
            local_texts[normalized] = qnum
            if normalized in all_questions:
                other_file, other_qid = all_questions[normalized]
                if other_file != fname:
                    add_issue("MEDIUM", fname, f"Q{qnum} ({qid}): Cross-quiz duplicate with {other_file} ({other_qid})")
            else:
                all_questions[normalized] = (fname, qid)

        if not explanation or len(explanation.strip()) < 20:
            add_issue("MEDIUM", fname, f"Q{qnum} ({qid}): Explanation too short or missing ({len(str(explanation).strip())} chars)")

        if qtype not in ("multiple-choice", "true-false", "multiple-select"):
            add_issue("LOW", fname, f"Q{qnum} ({qid}): Unusual question type: '{qtype}'")

    issue_count = sum(1 for s, f, d in issues if f == fname)
    quiz_summaries.append((fname, q_count, time_limit, passing_score, issue_count))

print("=" * 100)
print("COMPTIA NETWORK+ QUIZ AUDIT REPORT")
print("=" * 100)

print("\n## PER-QUIZ SUMMARY")
print(f"{'File':<30} {'Q#':>4} {'TimeLimit':>12} {'PassScore':>10} {'Issues':>7}")
print("-" * 67)
for s in quiz_summaries:
    fname, qc, tl, ps, ic = s
    tl_str = f"{tl}s ({tl//60}m)" if isinstance(tl, int) else str(tl)
    print(f"{fname:<30} {str(qc):>4} {tl_str:>12} {str(ps):>10} {str(ic):>7}")

total_q = sum(s[1] for s in quiz_summaries if isinstance(s[1], int))
print(f"\nTotal questions across all quizzes: {total_q}")

for sev in ["CRITICAL", "HIGH", "MEDIUM", "LOW"]:
    sev_issues = [(f, d) for s, f, d in issues if s == sev]
    if sev_issues:
        print(f"\n## {sev} ISSUES ({len(sev_issues)})")
        print("-" * 80)
        for f, d in sev_issues:
            print(f"  [{f}] {d}")

print(f"\n## ISSUE TOTALS")
for sev in ["CRITICAL", "HIGH", "MEDIUM", "LOW"]:
    count = sum(1 for s, f, d in issues if s == sev)
    print(f"  {sev}: {count}")
print(f"  TOTAL: {len(issues)}")
