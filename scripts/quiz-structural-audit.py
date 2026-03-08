#!/usr/bin/env python3
"""
CompTIA Network+ Quiz Structural Validation Script
Validates JSON structure, required fields, question types, correctAnswer validity,
duplicate IDs, timeLimit/passingScore ranges, and cross-quiz consistency.
"""

import json
import os
import sys
from collections import Counter, defaultdict
from pathlib import Path

QUIZ_DIR = Path(__file__).resolve().parent.parent / "content" / "courses" / "comptia-network-plus" / "quizzes"

VALID_QUESTION_TYPES = {"multiple-choice", "multiple-select", "true-false"}

REQUIRED_TOP_LEVEL_FIELDS = {"id", "title", "questions"}
RECOMMENDED_TOP_LEVEL_FIELDS = {"passingScore", "timeLimit", "chapterId", "description", "tags"}

REQUIRED_QUESTION_FIELDS = {"id", "type", "question", "explanation"}
# correctAnswer or correctAnswers depending on type

TIMELIMIT_MIN = 600
TIMELIMIT_MAX = 7200
PASSING_SCORE_MIN = 70
PASSING_SCORE_MAX = 90

# Severity levels
CRITICAL = "CRITICAL"
WARNING = "WARNING"
INFO = "INFO"


class Issue:
    def __init__(self, severity, quiz_file, question_id, message):
        self.severity = severity
        self.quiz_file = quiz_file
        self.question_id = question_id
        self.message = message

    def __repr__(self):
        qid = f" [{self.question_id}]" if self.question_id else ""
        return f"[{self.severity}] {self.quiz_file}{qid}: {self.message}"


def load_quiz(filepath):
    """Load and parse a quiz JSON file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data, None
    except json.JSONDecodeError as e:
        return None, str(e)
    except Exception as e:
        return None, str(e)


def validate_top_level(quiz, filename):
    """Validate top-level quiz fields."""
    issues = []

    # Check required fields
    for field in REQUIRED_TOP_LEVEL_FIELDS:
        if field not in quiz:
            issues.append(Issue(CRITICAL, filename, None, f"Missing required top-level field: '{field}'"))

    # Check recommended fields
    for field in RECOMMENDED_TOP_LEVEL_FIELDS:
        if field not in quiz:
            issues.append(Issue(WARNING, filename, None, f"Missing recommended top-level field: '{field}'"))

    # Validate passingScore range
    if "passingScore" in quiz:
        ps = quiz["passingScore"]
        if not isinstance(ps, (int, float)):
            issues.append(Issue(CRITICAL, filename, None, f"passingScore is not a number: {ps}"))
        elif ps < PASSING_SCORE_MIN or ps > PASSING_SCORE_MAX:
            issues.append(Issue(WARNING, filename, None,
                                f"passingScore {ps} outside recommended range [{PASSING_SCORE_MIN}-{PASSING_SCORE_MAX}]"))

    # Validate timeLimit range
    if "timeLimit" in quiz:
        tl = quiz["timeLimit"]
        if not isinstance(tl, (int, float)):
            issues.append(Issue(CRITICAL, filename, None, f"timeLimit is not a number: {tl}"))
        elif tl < TIMELIMIT_MIN or tl > TIMELIMIT_MAX:
            issues.append(Issue(WARNING, filename, None,
                                f"timeLimit {tl}s outside recommended range [{TIMELIMIT_MIN}-{TIMELIMIT_MAX}]s"))

    # Check questions is a list
    if "questions" in quiz:
        if not isinstance(quiz["questions"], list):
            issues.append(Issue(CRITICAL, filename, None, "Field 'questions' is not an array"))
        elif len(quiz["questions"]) == 0:
            issues.append(Issue(CRITICAL, filename, None, "Quiz has zero questions"))

    return issues


def validate_question(q, index, filename, total_options_count=4):
    """Validate individual question structure."""
    issues = []
    qid = q.get("id", f"(index {index})")

    # Check required fields
    for field in REQUIRED_QUESTION_FIELDS:
        if field not in q:
            issues.append(Issue(CRITICAL, filename, qid, f"Missing required field: '{field}'"))

    # Validate type
    qtype = q.get("type", "")
    if qtype not in VALID_QUESTION_TYPES:
        issues.append(Issue(CRITICAL, filename, qid, f"Invalid question type: '{qtype}'"))

    # Validate options exist for MC and MS
    if qtype in ("multiple-choice", "multiple-select"):
        options = q.get("options")
        if options is None:
            issues.append(Issue(CRITICAL, filename, qid, "Missing 'options' field"))
        elif not isinstance(options, list):
            issues.append(Issue(CRITICAL, filename, qid, "Field 'options' is not an array"))
        elif len(options) < 2:
            issues.append(Issue(WARNING, filename, qid, f"Only {len(options)} options (minimum 2 expected)"))
        elif len(options) < 3:
            issues.append(Issue(INFO, filename, qid, f"Only {len(options)} options (3-4 typical)"))

    # Validate correctAnswer / correctAnswers
    if qtype == "multiple-choice":
        if "correctAnswer" not in q:
            issues.append(Issue(CRITICAL, filename, qid, "Missing 'correctAnswer' for multiple-choice question"))
        else:
            ca = q["correctAnswer"]
            options = q.get("options", [])
            if isinstance(ca, int):
                if ca < 0 or ca >= len(options):
                    issues.append(Issue(CRITICAL, filename, qid,
                                        f"correctAnswer index {ca} out of range [0-{len(options)-1}]"))
            elif isinstance(ca, str):
                # Letter-based (a, b, c, d) or one of option IDs
                pass  # acceptable
            else:
                issues.append(Issue(CRITICAL, filename, qid,
                                    f"correctAnswer has unexpected type: {type(ca).__name__}"))

    elif qtype == "multiple-select":
        if "correctAnswers" not in q and "correctAnswer" not in q:
            issues.append(Issue(CRITICAL, filename, qid,
                                "Missing 'correctAnswers' for multiple-select question"))
        else:
            ca = q.get("correctAnswers", q.get("correctAnswer"))
            if not isinstance(ca, list):
                issues.append(Issue(CRITICAL, filename, qid,
                                    f"correctAnswers should be an array, got {type(ca).__name__}"))
            elif len(ca) < 2:
                issues.append(Issue(WARNING, filename, qid,
                                    f"Multiple-select has only {len(ca)} correct answer(s) (should be 2+)"))
            else:
                options = q.get("options", [])
                # Check if options are objects or strings
                if options and isinstance(options[0], dict):
                    # Object-format options: validate IDs
                    valid_ids = {opt.get("id") for opt in options if isinstance(opt, dict)}
                    for ans in ca:
                        if ans not in valid_ids:
                            issues.append(Issue(CRITICAL, filename, qid,
                                                f"correctAnswers value '{ans}' not in option IDs {valid_ids}"))
                elif options and isinstance(options[0], str):
                    # Index-based
                    for ans in ca:
                        if isinstance(ans, int) and (ans < 0 or ans >= len(options)):
                            issues.append(Issue(CRITICAL, filename, qid,
                                                f"correctAnswers index {ans} out of range [0-{len(options)-1}]"))

    elif qtype == "true-false":
        if "correctAnswer" not in q:
            issues.append(Issue(CRITICAL, filename, qid, "Missing 'correctAnswer' for true-false question"))
        else:
            ca = q["correctAnswer"]
            if not isinstance(ca, bool):
                issues.append(Issue(CRITICAL, filename, qid,
                                    f"correctAnswer for true-false should be boolean, got {type(ca).__name__}: {ca}"))
        # true-false should not have options (or can have trivial ones)
        if "options" in q and len(q.get("options", [])) > 0:
            issues.append(Issue(INFO, filename, qid, "True-false question has explicit options array (not typical)"))

    # Check for empty question text
    if not q.get("question", "").strip():
        issues.append(Issue(CRITICAL, filename, qid, "Empty question text"))

    # Check for empty explanation
    if not q.get("explanation", "").strip():
        issues.append(Issue(WARNING, filename, qid, "Empty explanation"))

    return issues


def check_duplicate_ids(quiz, filename):
    """Check for duplicate question IDs within a quiz."""
    issues = []
    ids = [q.get("id", "") for q in quiz.get("questions", [])]
    id_counts = Counter(ids)
    for qid, count in id_counts.items():
        if count > 1:
            issues.append(Issue(CRITICAL, filename, qid, f"Duplicate question ID appears {count} times"))
    return issues


def check_cross_quiz_id_conflicts(all_quizzes):
    """Check if question IDs without chapter prefixes could conflict across quizzes."""
    issues = []
    id_to_quiz = defaultdict(list)
    for filename, quiz in all_quizzes.items():
        for q in quiz.get("questions", []):
            qid = q.get("id", "")
            id_to_quiz[qid].append(filename)

    for qid, files in id_to_quiz.items():
        if len(files) > 1:
            issues.append(Issue(WARNING, files[0], qid,
                                f"Question ID '{qid}' reused across quizzes: {', '.join(files)}"))
    return issues


def check_option_format_consistency(all_quizzes):
    """Check for inconsistent option formats across quizzes."""
    issues = []
    string_option_quizzes = []
    object_option_quizzes = []

    for filename, quiz in all_quizzes.items():
        has_string = False
        has_object = False
        for q in quiz.get("questions", []):
            options = q.get("options", [])
            if options:
                if isinstance(options[0], str):
                    has_string = True
                elif isinstance(options[0], dict):
                    has_object = True
        if has_string:
            string_option_quizzes.append(filename)
        if has_object:
            object_option_quizzes.append(filename)

    if string_option_quizzes and object_option_quizzes:
        issues.append(Issue(WARNING, "CROSS-QUIZ", None,
                            f"Inconsistent option formats — String-based: {', '.join(sorted(string_option_quizzes))} | "
                            f"Object-based: {', '.join(sorted(object_option_quizzes))}"))
    return issues


def check_id_format_consistency(all_quizzes):
    """Check for inconsistent question ID naming patterns."""
    issues = []
    prefixed = []
    bare = []
    for filename, quiz in all_quizzes.items():
        ids = [q.get("id", "") for q in quiz.get("questions", [])]
        has_prefix = any("-" in qid and qid.startswith("ch") for qid in ids)
        if has_prefix:
            prefixed.append(filename)
        else:
            bare.append(filename)

    if prefixed and bare:
        issues.append(Issue(INFO, "CROSS-QUIZ", None,
                            f"Inconsistent ID format — Chapter-prefixed: {', '.join(sorted(prefixed))} | "
                            f"Bare IDs: {', '.join(sorted(bare))}"))
    return issues


def check_question_type_distribution(quiz, filename):
    """Report question type distribution."""
    issues = []
    type_counts = Counter(q.get("type", "unknown") for q in quiz.get("questions", []))
    total = sum(type_counts.values())
    dist = ", ".join(f"{t}: {c}" for t, c in sorted(type_counts.items()))
    issues.append(Issue(INFO, filename, None, f"Question distribution (total={total}): {dist}"))
    return issues


def check_duplicate_question_text(all_quizzes):
    """Detect questions with identical or very similar text across all quizzes."""
    issues = []
    text_to_location = defaultdict(list)

    for filename, quiz in all_quizzes.items():
        for q in quiz.get("questions", []):
            qtext = q.get("question", "").strip().lower()
            qid = q.get("id", "?")
            if qtext:
                text_to_location[qtext].append((filename, qid))

    for text, locations in text_to_location.items():
        if len(locations) > 1:
            locs = "; ".join(f"{f} [{qid}]" for f, qid in locations)
            # Only report if it's within same quiz or actually duplicate cross-quiz
            within_same = defaultdict(list)
            for f, qid in locations:
                within_same[f].append(qid)
            for f, qids in within_same.items():
                if len(qids) > 1:
                    issues.append(Issue(CRITICAL, f, "/".join(qids),
                                        f"DUPLICATE question text within same quiz: '{text[:80]}...'"))
            if len(within_same) > 1:
                issues.append(Issue(WARNING, "CROSS-QUIZ", None,
                                    f"Similar question text found in multiple quizzes: '{text[:80]}...' => {locs}"))

    return issues


def main():
    quiz_files = sorted(QUIZ_DIR.glob("*.json"))

    if not quiz_files:
        print(f"ERROR: No quiz files found in {QUIZ_DIR}")
        sys.exit(1)

    print(f"{'='*80}")
    print(f"CompTIA Network+ Quiz Structural Validation")
    print(f"{'='*80}")
    print(f"Quiz directory: {QUIZ_DIR}")
    print(f"Files found: {len(quiz_files)}")
    print()

    all_issues = []
    all_quizzes = {}
    load_errors = []

    # Load all quizzes
    for fpath in quiz_files:
        fname = fpath.name
        quiz, error = load_quiz(fpath)
        if error:
            all_issues.append(Issue(CRITICAL, fname, None, f"JSON parse error: {error}"))
            load_errors.append(fname)
        else:
            all_quizzes[fname] = quiz

    # Per-quiz validation
    for fname, quiz in sorted(all_quizzes.items()):
        print(f"--- Validating: {fname} ---")

        # Top-level validation
        all_issues.extend(validate_top_level(quiz, fname))

        # Question-level validation
        for i, q in enumerate(quiz.get("questions", [])):
            all_issues.extend(validate_question(q, i, fname))

        # Duplicate IDs
        all_issues.extend(check_duplicate_ids(quiz, fname))

        # Distribution info
        all_issues.extend(check_question_type_distribution(quiz, fname))

    # Cross-quiz checks
    print(f"\n--- Cross-Quiz Validation ---")
    all_issues.extend(check_cross_quiz_id_conflicts(all_quizzes))
    all_issues.extend(check_option_format_consistency(all_quizzes))
    all_issues.extend(check_id_format_consistency(all_quizzes))
    all_issues.extend(check_duplicate_question_text(all_quizzes))

    # Print results organized by severity
    print(f"\n{'='*80}")
    print(f"RESULTS SUMMARY")
    print(f"{'='*80}")

    severity_order = [CRITICAL, WARNING, INFO]
    issue_counts = Counter(i.severity for i in all_issues)

    print(f"\nTotal issues: {len(all_issues)}")
    for sev in severity_order:
        print(f"  {sev}: {issue_counts.get(sev, 0)}")

    for sev in severity_order:
        sev_issues = [i for i in all_issues if i.severity == sev]
        if sev_issues:
            print(f"\n{'─'*80}")
            print(f"  {sev} ISSUES ({len(sev_issues)})")
            print(f"{'─'*80}")
            for issue in sev_issues:
                print(f"  {issue}")

    # Quiz summary table
    print(f"\n{'='*80}")
    print(f"QUIZ SUMMARY TABLE")
    print(f"{'='*80}")
    print(f"{'File':<35} {'Qs':>4} {'MC':>4} {'MS':>4} {'TF':>4} {'Pass':>5} {'Time':>6} {'Tags':>5}")
    print(f"{'─'*35} {'─'*4} {'─'*4} {'─'*4} {'─'*4} {'─'*5} {'─'*6} {'─'*5}")
    for fname in sorted(all_quizzes.keys()):
        quiz = all_quizzes[fname]
        questions = quiz.get("questions", [])
        tc = Counter(q.get("type", "?") for q in questions)
        ps = quiz.get("passingScore", "N/A")
        tl = quiz.get("timeLimit", "N/A")
        tags = "Yes" if quiz.get("tags") else "No"
        print(f"{fname:<35} {len(questions):>4} {tc.get('multiple-choice', 0):>4} "
              f"{tc.get('multiple-select', 0):>4} {tc.get('true-false', 0):>4} "
              f"{str(ps):>5} {str(tl):>6} {tags:>5}")

    print(f"\n{'='*80}")

    # Return exit code based on critical issues
    critical_count = issue_counts.get(CRITICAL, 0)
    if critical_count > 0:
        print(f"\n⚠ {critical_count} CRITICAL issue(s) found. Review recommended.")
        return 1
    else:
        print(f"\n✓ No critical issues found.")
        return 0


if __name__ == "__main__":
    sys.exit(main())
