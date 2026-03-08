#!/usr/bin/env python3
"""
Deep Quality Audit Script for CompTIA Network+ Exercise Files
Checks structural consistency across all 90 exercise JSON files.
"""

import json
import os
import re
import sys
from pathlib import Path

EXERCISES_DIR = Path("/home/randy/GitHub/learn-it-all/content/courses/comptia-network-plus/exercises")
LESSONS_DIR = Path("/home/randy/GitHub/learn-it-all/content/courses/comptia-network-plus/lessons")

REQUIRED_FIELDS = ["id", "lessonId", "title", "description", "difficulty", "points", "language", "starterCode", "solution", "hints", "testCases"]
REQUIRED_TC_FIELDS = ["id", "description", "isHidden"]
DIFFICULTY_POINTS = {"beginner": 75, "intermediate": 100, "advanced": 150}
VALID_DIFFICULTIES = set(DIFFICULTY_POINTS.keys())

issues = {"critical": [], "high": [], "medium": [], "low": []}

def add_issue(severity, filename, message):
    issues[severity].append({"file": filename, "message": message})

def audit_file(filepath):
    filename = filepath.name
    
    # Extract expected number from filename
    match = re.match(r'exercise-(\d{3})-(.+)\.json', filename)
    if not match:
        add_issue("critical", filename, f"Filename does not match expected pattern 'exercise-NNN-*.json'")
        return
    
    file_num = match.group(1)
    file_slug = match.group(2)
    
    # Parse JSON
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        add_issue("critical", filename, f"Invalid JSON: {e}")
        return
    except Exception as e:
        add_issue("critical", filename, f"Cannot read file: {e}")
        return
    
    # Check required fields
    for field in REQUIRED_FIELDS:
        if field not in data:
            add_issue("critical", filename, f"Missing required field: '{field}'")
    
    # Check id matches filename
    expected_id_prefix = f"exercise-{file_num}-"
    if "id" in data:
        if not data["id"].startswith(expected_id_prefix):
            add_issue("high", filename, f"ID '{data['id']}' does not match filename prefix '{expected_id_prefix}'")
        # Also check full match
        expected_id = f"exercise-{file_num}-{file_slug}"
        if data["id"] != expected_id:
            add_issue("medium", filename, f"ID '{data['id']}' does not exactly match filename-derived ID '{expected_id}'")
    
    # Check lessonId matches (exercise-044 → lesson-044)
    expected_lesson_id_prefix = f"lesson-{file_num}-"
    if "lessonId" in data:
        if not data["lessonId"].startswith(expected_lesson_id_prefix):
            add_issue("high", filename, f"lessonId '{data['lessonId']}' does not match expected prefix '{expected_lesson_id_prefix}'")
        
        # Check that the corresponding lesson file exists
        lesson_slug = data["lessonId"].replace(f"lesson-{file_num}-", "")
        lesson_file = LESSONS_DIR / f"{data['lessonId']}.md"
        if not lesson_file.exists():
            add_issue("high", filename, f"Referenced lesson file '{data['lessonId']}.md' does not exist")
    
    # Check difficulty is valid
    if "difficulty" in data:
        if data["difficulty"] not in VALID_DIFFICULTIES:
            add_issue("high", filename, f"Invalid difficulty: '{data['difficulty']}' (expected: {VALID_DIFFICULTIES})")
    
    # Check points match difficulty
    if "difficulty" in data and "points" in data:
        expected_points = DIFFICULTY_POINTS.get(data["difficulty"])
        if expected_points and data["points"] != expected_points:
            add_issue("high", filename, f"Points mismatch: difficulty='{data['difficulty']}' should have {expected_points} points, but has {data['points']}")
    
    # Check language
    if "language" in data:
        if data["language"] != "networking":
            add_issue("medium", filename, f"Language is '{data['language']}', expected 'networking'")
    
    # Check testCases
    if "testCases" in data:
        tc = data["testCases"]
        if not isinstance(tc, list):
            add_issue("critical", filename, f"testCases is not an array")
        else:
            if len(tc) < 3:
                add_issue("high", filename, f"testCases has only {len(tc)} entries (minimum 3 required)")
            
            for i, test_case in enumerate(tc):
                tc_id = test_case.get("id", f"index-{i}")
                for field in REQUIRED_TC_FIELDS:
                    if field not in test_case:
                        add_issue("high", filename, f"testCase '{tc_id}' missing required field: '{field}'")
                
                # Check expectedOutput exists (not strictly required but important)
                if "expectedOutput" not in test_case:
                    add_issue("medium", filename, f"testCase '{tc_id}' missing 'expectedOutput' field")
                
                # Check for empty descriptions
                if "description" in test_case and not test_case["description"].strip():
                    add_issue("medium", filename, f"testCase '{tc_id}' has empty description")
                
                # Check for empty expectedOutput
                if "expectedOutput" in test_case and not str(test_case["expectedOutput"]).strip():
                    add_issue("low", filename, f"testCase '{tc_id}' has empty expectedOutput")
    
    # Check hints
    if "hints" in data:
        if not isinstance(data["hints"], list):
            add_issue("high", filename, f"hints is not an array")
        elif len(data["hints"]) < 1:
            add_issue("medium", filename, f"hints array is empty")
        else:
            for i, hint in enumerate(data["hints"]):
                if not hint.strip():
                    add_issue("low", filename, f"Hint {i+1} is empty")
    
    # Check starterCode is not empty
    if "starterCode" in data:
        if not data["starterCode"].strip():
            add_issue("high", filename, f"starterCode is empty")
        # Check for TODO markers
        if "TODO" not in data["starterCode"] and "___" not in data["starterCode"] and "???" not in data["starterCode"] and "FILL" not in data["starterCode"] and "[" not in data["starterCode"]:
            add_issue("medium", filename, f"starterCode may lack fill-in markers (no TODO, ___, ???, FILL, or [...] found)")
    
    # Check solution is not empty
    if "solution" in data:
        if not data["solution"].strip():
            add_issue("high", filename, f"solution is empty")
    
    # Check title is not empty
    if "title" in data:
        if not data["title"].strip():
            add_issue("medium", filename, f"title is empty")
    
    # Check description is not empty
    if "description" in data:
        if not data["description"].strip():
            add_issue("medium", filename, f"description is empty")
    
    return data

def main():
    print("=" * 80)
    print("CompTIA Network+ Exercise Files - Deep Quality Audit")
    print("=" * 80)
    
    # Find all exercise files
    exercise_files = sorted(EXERCISES_DIR.glob("exercise-*.json"))
    print(f"\nFound {len(exercise_files)} exercise files")
    
    if len(exercise_files) != 90:
        add_issue("critical", "GLOBAL", f"Expected 90 exercise files, found {len(exercise_files)}")
    
    # Check for missing exercise numbers
    found_nums = set()
    for f in exercise_files:
        m = re.match(r'exercise-(\d{3})', f.name)
        if m:
            found_nums.add(int(m.group(1)))
    
    expected_nums = set(range(1, 91))
    missing = expected_nums - found_nums
    extra = found_nums - expected_nums
    if missing:
        add_issue("critical", "GLOBAL", f"Missing exercise numbers: {sorted(missing)}")
    if extra:
        add_issue("high", "GLOBAL", f"Extra/unexpected exercise numbers: {sorted(extra)}")
    
    # Audit each file
    all_data = {}
    difficulty_counts = {"beginner": 0, "intermediate": 0, "advanced": 0}
    
    for filepath in exercise_files:
        data = audit_file(filepath)
        if data:
            all_data[filepath.name] = data
            diff = data.get("difficulty", "unknown")
            if diff in difficulty_counts:
                difficulty_counts[diff] += 1
    
    # Summary statistics
    print(f"\nDifficulty distribution:")
    for d, c in difficulty_counts.items():
        print(f"  {d}: {c}")
    
    # Print issues
    print("\n" + "=" * 80)
    print("AUDIT RESULTS")
    print("=" * 80)
    
    total = 0
    for severity in ["critical", "high", "medium", "low"]:
        count = len(issues[severity])
        total += count
        print(f"\n{'🔴' if severity == 'critical' else '🟠' if severity == 'high' else '🟡' if severity == 'medium' else '🟢'} {severity.upper()} Issues: {count}")
        if count > 0:
            for issue in issues[severity]:
                print(f"  [{issue['file']}] {issue['message']}")
    
    print(f"\n{'=' * 80}")
    print(f"Total issues found: {total}")
    print(f"{'=' * 80}")
    
    return 1 if issues["critical"] or issues["high"] else 0

if __name__ == "__main__":
    sys.exit(main())
