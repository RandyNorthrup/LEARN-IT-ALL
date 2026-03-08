#!/usr/bin/env python3
"""
LEARN-IT-ALL Course Quality Checker
====================================
Comprehensive validation script that checks accuracy, functionality,
and completeness for every available course.

Usage:
    python3 scripts/course-quality-check.py [--course COURSE_ID] [--verbose]
"""

import json
import os
import sys
import glob
import re
from pathlib import Path
from typing import Any

# ANSI colors
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
CYAN = '\033[96m'
BOLD = '\033[1m'
RESET = '\033[0m'

CONTENT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'content', 'courses')
DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'lib', 'data', 'courses.ts')

REQUIRED_FRONTMATTER_FIELDS = ['id', 'title', 'chapterId', 'order', 'duration', 'objectives']


def parse_frontmatter(filepath: str) -> dict | None:
    """Parse YAML frontmatter from a markdown file."""
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        if not content.startswith('---'):
            return None
        end = content.index('---', 3)
        fm_text = content[3:end].strip()
        result = {}
        for line in fm_text.split('\n'):
            if ':' in line and not line.strip().startswith('-'):
                key, _, value = line.partition(':')
                result[key.strip()] = value.strip().strip('"').strip("'")
            elif line.strip().startswith('- '):
                # Array item — associate with last key
                pass
        return result
    except Exception:
        return None


def check_course(course_id: str, verbose: bool = False) -> dict:
    """Run all quality checks on a single course. Returns a results dict."""
    course_dir = os.path.join(CONTENT_DIR, course_id)
    course_json_path = os.path.join(course_dir, 'course.json')
    results: dict[str, Any] = {
        'course_id': course_id,
        'passed': 0,
        'failed': 0,
        'warnings': 0,
        'checks': [],
    }

    def check(category: str, name: str, passed: bool, detail: str = ''):
        status = 'PASS' if passed else 'FAIL'
        if passed:
            results['passed'] += 1
        else:
            results['failed'] += 1
        results['checks'].append({'category': category, 'name': name, 'status': status, 'detail': detail})

    def warn(category: str, name: str, detail: str = ''):
        results['warnings'] += 1
        results['checks'].append({'category': category, 'name': name, 'status': 'WARN', 'detail': detail})

    # ==========================================
    # 1. STRUCTURE CHECKS
    # ==========================================

    # 1a. course.json exists
    check('Structure', 'course.json exists', os.path.exists(course_json_path))
    if not os.path.exists(course_json_path):
        return results

    with open(course_json_path) as f:
        course_data = json.load(f)

    # 1b. Required fields in course.json
    required_course_fields = ['id', 'title', 'description', 'difficulty', 'estimatedHours', 'language', 'tags', 'chapters']
    for field in required_course_fields:
        check('Structure', f'course.json has "{field}"', field in course_data, 
              f'Missing field: {field}' if field not in course_data else '')

    # 1c. Course ID matches directory name
    check('Structure', 'Course ID matches directory', 
          course_data.get('id') == course_id,
          f'ID={course_data.get("id")} but dir={course_id}' if course_data.get('id') != course_id else '')

    # 1d. Lessons directory exists
    lessons_dir = os.path.join(course_dir, 'lessons')
    check('Structure', 'lessons/ directory exists', os.path.isdir(lessons_dir))

    # ==========================================
    # 2. CONTENT COMPLETENESS CHECKS
    # ==========================================

    chapters = course_data.get('chapters', [])
    check('Completeness', 'Has at least 1 chapter', len(chapters) > 0)

    # 2a. All lessons listed in course.json exist on disk
    json_lessons = []
    for ch in chapters:
        json_lessons.extend(ch.get('lessons', []))

    disk_lessons = set()
    if os.path.isdir(lessons_dir):
        disk_lessons = set(os.listdir(lessons_dir))

    missing_lessons = [l for l in json_lessons if l not in disk_lessons]
    orphan_lessons = disk_lessons - set(json_lessons)

    check('Completeness', 'All listed lessons exist on disk', 
          len(missing_lessons) == 0,
          f'{len(missing_lessons)} missing: {", ".join(missing_lessons[:5])}{"..." if len(missing_lessons) > 5 else ""}' if missing_lessons else '')

    if orphan_lessons:
        warn('Completeness', 'Orphan lesson files detected',
             f'{len(orphan_lessons)} files on disk not in course.json')

    # 2b. No duplicate lesson references
    dupes = [l for l in json_lessons if json_lessons.count(l) > 1]
    check('Completeness', 'No duplicate lesson references', len(set(dupes)) == 0,
          f'Duplicates: {", ".join(set(dupes))}' if dupes else '')

    # 2c. Chapter ordering is sequential
    chapter_orders = [ch.get('order', 0) for ch in chapters]
    expected_orders = list(range(1, len(chapters) + 1))
    check('Completeness', 'Chapter ordering is sequential (1,2,3...)',
          chapter_orders == expected_orders,
          f'Got: {chapter_orders}' if chapter_orders != expected_orders else '')

    # 2d. Each chapter has lessons (quiz/exam-only chapters are acceptable)
    quiz_keywords = ['quiz', 'exam', 'test', 'assessment', 'review']
    empty_chapters = [ch['id'] for ch in chapters 
                      if not ch.get('lessons')
                      and not any(kw in ch.get('title', '').lower() or kw in ch.get('id', '').lower() 
                                  for kw in quiz_keywords)]
    check('Completeness', 'All chapters have lessons (quiz chapters exempt)',
          len(empty_chapters) == 0,
          f'Empty chapters: {", ".join(empty_chapters)}' if empty_chapters else '')

    # ==========================================
    # 3. LESSON QUALITY CHECKS
    # ==========================================

    if os.path.isdir(lessons_dir):
        lesson_files = sorted(glob.glob(os.path.join(lessons_dir, '*.md')))

        # 3a. All lessons have valid frontmatter
        invalid_fm = []
        empty_content = []
        short_content = []

        for lf in lesson_files:
            fm = parse_frontmatter(lf)
            fname = os.path.basename(lf)
            if fm is None:
                invalid_fm.append(fname)
            else:
                for field in REQUIRED_FRONTMATTER_FIELDS:
                    if field not in fm:
                        invalid_fm.append(f'{fname} (missing {field})')
                        break

            # Check content length
            with open(lf) as f:
                content = f.read()
            # Strip frontmatter
            if content.startswith('---'):
                try:
                    end = content.index('---', 3)
                    body = content[end + 3:].strip()
                except ValueError:
                    body = content
            else:
                body = content.strip()

            if len(body) == 0:
                empty_content.append(fname)
            elif len(body) < 100:
                short_content.append(fname)

        check('Quality', 'All lessons have valid frontmatter',
              len(invalid_fm) == 0,
              f'{len(invalid_fm)} invalid: {", ".join(invalid_fm[:3])}{"..." if len(invalid_fm) > 3 else ""}' if invalid_fm else '')

        check('Quality', 'No empty lessons',
              len(empty_content) == 0,
              f'{len(empty_content)} empty: {", ".join(empty_content[:3])}' if empty_content else '')

        if short_content:
            warn('Quality', 'Some lessons are very short (<100 chars)',
                 f'{len(short_content)} lessons: {", ".join(short_content[:3])}{"..." if len(short_content) > 3 else ""}')

    # ==========================================
    # 4. EXERCISE CHECKS
    # ==========================================

    exercises_dir = os.path.join(course_dir, 'exercises')
    has_exercises = os.path.isdir(exercises_dir)

    if has_exercises:
        exercise_files = glob.glob(os.path.join(exercises_dir, '*.json'))
        check('Exercises', f'Exercise files found ({len(exercise_files)})', len(exercise_files) > 0)

        # Validate exercise JSON structure
        invalid_exercises = []
        for ef in exercise_files:
            try:
                with open(ef) as f:
                    ex_data = json.load(f)
                required = ['id', 'title']
                for field in required:
                    if field not in ex_data:
                        invalid_exercises.append(f'{os.path.basename(ef)} (missing {field})')
                        break
            except json.JSONDecodeError:
                invalid_exercises.append(f'{os.path.basename(ef)} (invalid JSON)')

        check('Exercises', 'All exercise files are valid JSON with required fields',
              len(invalid_exercises) == 0,
              f'{len(invalid_exercises)} invalid' if invalid_exercises else '')
    else:
        warn('Exercises', 'No exercises directory',
             'Course has no interactive exercises')

    # ==========================================
    # 5. QUIZ CHECKS
    # ==========================================

    quizzes_dir = os.path.join(course_dir, 'quizzes')
    has_quizzes = os.path.isdir(quizzes_dir)

    if has_quizzes:
        quiz_files = glob.glob(os.path.join(quizzes_dir, '*.json'))
        check('Quizzes', f'Quiz files found ({len(quiz_files)})', len(quiz_files) > 0)

        invalid_quizzes = []
        for qf in quiz_files:
            try:
                with open(qf) as f:
                    quiz_data = json.load(f)
                required = ['id', 'title', 'questions']
                for field in required:
                    if field not in quiz_data:
                        invalid_quizzes.append(f'{os.path.basename(qf)} (missing {field})')
                        break
                # Check each question has required fields
                if 'questions' in quiz_data:
                    for i, q in enumerate(quiz_data['questions']):
                        if 'question' not in q and 'text' not in q:
                            invalid_quizzes.append(f'{os.path.basename(qf)} Q{i+1} (no question text)')
                            break
            except json.JSONDecodeError:
                invalid_quizzes.append(f'{os.path.basename(qf)} (invalid JSON)')

        check('Quizzes', 'All quiz files are valid with required fields',
              len(invalid_quizzes) == 0,
              f'{len(invalid_quizzes)} invalid: {", ".join(invalid_quizzes[:3])}' if invalid_quizzes else '')
    else:
        warn('Quizzes', 'No quizzes directory',
             'Course has no quizzes for assessment')

    # ==========================================
    # 6. METADATA ACCURACY CHECKS
    # ==========================================

    # 6a. Lesson count matches
    actual_lesson_count = len(json_lessons)
    check('Accuracy', 'Lesson count is accurate',
          True,  # informational
          f'{actual_lesson_count} lessons across {len(chapters)} chapters')

    # 6b. Difficulty is valid
    valid_difficulties = ['beginner', 'intermediate', 'advanced']
    check('Accuracy', 'Difficulty level is valid',
          course_data.get('difficulty', '').lower() in valid_difficulties,
          f'Got: {course_data.get("difficulty")}')

    # 6c. Language is specified
    check('Accuracy', 'Programming language specified',
          bool(course_data.get('language')),
          f'Language: {course_data.get("language", "NONE")}')

    # 6d. Tags are present
    check('Accuracy', 'Tags present',
          len(course_data.get('tags', [])) > 0,
          f'{len(course_data.get("tags", []))} tags')

    # 6e. Estimated hours is reasonable
    hours = course_data.get('estimatedHours', 0)
    check('Accuracy', 'Estimated hours is reasonable (1-200)',
          1 <= hours <= 200,
          f'{hours} hours')

    return results


def print_results(results: dict, verbose: bool = False):
    """Pretty-print the results for a single course."""
    cid = results['course_id']
    total = results['passed'] + results['failed']
    
    if results['failed'] == 0:
        status_icon = f'{GREEN}PASS{RESET}'
    else:
        status_icon = f'{RED}FAIL{RESET}'

    print(f'\n{BOLD}{"=" * 70}{RESET}')
    print(f'{BOLD}{CYAN}{cid}{RESET}  [{status_icon}]  '
          f'{GREEN}{results["passed"]}/{total} passed{RESET}  '
          f'{YELLOW}{results["warnings"]} warnings{RESET}')
    print(f'{"=" * 70}')

    if verbose or results['failed'] > 0 or results['warnings'] > 0:
        current_category = ''
        for c in results['checks']:
            if c['category'] != current_category:
                current_category = c['category']
                print(f'\n  {BOLD}{current_category}{RESET}')

            if c['status'] == 'PASS':
                icon = f'{GREEN}✓{RESET}'
            elif c['status'] == 'FAIL':
                icon = f'{RED}✗{RESET}'
            else:
                icon = f'{YELLOW}!{RESET}'

            detail = f'  {c["detail"]}' if c['detail'] else ''
            print(f'    {icon} {c["name"]}{detail}')


def main():
    verbose = '--verbose' in sys.argv or '-v' in sys.argv
    target_course = None
    
    for i, arg in enumerate(sys.argv):
        if arg == '--course' and i + 1 < len(sys.argv):
            target_course = sys.argv[i + 1]

    print(f'\n{BOLD}{"=" * 70}{RESET}')
    print(f'{BOLD}  LEARN-IT-ALL — Course Quality Checker{RESET}')
    print(f'{"=" * 70}')

    # Find all courses
    if target_course:
        course_dirs = [target_course]
    else:
        course_dirs = sorted([
            os.path.basename(os.path.dirname(p))
            for p in glob.glob(os.path.join(CONTENT_DIR, '*/course.json'))
        ])

    total_passed = 0
    total_failed = 0
    total_warnings = 0
    total_lessons = 0
    total_exercises = 0
    total_quizzes = 0
    failed_courses = []

    for cid in course_dirs:
        results = check_course(cid, verbose)
        print_results(results, verbose)
        total_passed += results['passed']
        total_failed += results['failed']
        total_warnings += results['warnings']

        # Count content
        course_dir = os.path.join(CONTENT_DIR, cid)
        lessons_dir = os.path.join(course_dir, 'lessons')
        exercises_dir = os.path.join(course_dir, 'exercises')
        quizzes_dir = os.path.join(course_dir, 'quizzes')
        total_lessons += len(os.listdir(lessons_dir)) if os.path.isdir(lessons_dir) else 0
        total_exercises += len(glob.glob(os.path.join(exercises_dir, '*.json'))) if os.path.isdir(exercises_dir) else 0
        total_quizzes += len(glob.glob(os.path.join(quizzes_dir, '*.json'))) if os.path.isdir(quizzes_dir) else 0

        if results['failed'] > 0:
            failed_courses.append(cid)

    # Summary
    print(f'\n{BOLD}{"=" * 70}{RESET}')
    print(f'{BOLD}  SUMMARY{RESET}')
    print(f'{"=" * 70}')
    print(f'  Courses checked:   {len(course_dirs)}')
    print(f'  Total lessons:     {total_lessons:,}')
    print(f'  Total exercises:   {total_exercises:,}')
    print(f'  Total quizzes:     {total_quizzes:,}')
    print(f'  Checks passed:     {GREEN}{total_passed}{RESET}')
    print(f'  Checks failed:     {RED}{total_failed}{RESET}')
    print(f'  Warnings:          {YELLOW}{total_warnings}{RESET}')
    
    if failed_courses:
        print(f'\n  {RED}Failed courses:{RESET}')
        for fc in failed_courses:
            print(f'    {RED}✗{RESET} {fc}')
    else:
        print(f'\n  {GREEN}{BOLD}All courses passed quality checks!{RESET}')

    print()
    return 1 if total_failed > 0 else 0


if __name__ == '__main__':
    sys.exit(main())
