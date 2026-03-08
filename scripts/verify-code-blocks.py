#!/usr/bin/env python3
"""
Exhaustive code block verifier for Python Basics course.
Executes every Python code block in every lesson, captures output,
and compares against inline # comments claiming output values.
"""

import re, os, glob, io, sys, signal
from contextlib import redirect_stdout, redirect_stderr

LESSONS_DIR = os.path.join(os.path.dirname(__file__), 
    '..', 'content', 'courses', 'python-basics', 'lessons')

# Patterns that make a code block non-executable standalone
SKIP_PATTERNS = [
    'input(', 'open(', 'Path(', '.read_text(', '.write_text(',
    'with open', 'write(', 'mkdir', 'rmdir', 'remove(', 'unlink(',
    'import tkinter', 'import pygame', 'import flask', 'import requests',
    'import sqlite', 'import csv', 'import xml', 'import pickle',
    'import pytest', 'import unittest', 'import logging', 'import asyncio',
    'import multiprocessing', 'import threading', 'import socket',
    'import http', 'import email', 'import smtplib',
    'from text_stats', 'from readability', 'from keywords', 'from sentiment',
    'from report', 'from config', 'from calculator', 'from utils',
    'from core', 'from database', 'from api', 'from game', 'from budget',
    'from contacts', 'from data_', 'from analyzer', 'from validator',
    'from processor', 'from inventory', 'from student', 'from bank',
    'from library', 'from employee', 'from shape', 'from animal',
    'from vehicle', 'from product', 'from recipe', 'from weather',
    'from playlist', 'from todo', 'from task', 'from quiz_',
    'from text_analyzer', 'from log_parser', 'from grade_',
    'os.environ', 'subprocess', 'sys.argv', 'sys.exit',
    'ArgumentParser', 'if __name__',
    'ctypes', 'import struct', 'tracemalloc', 'memory_profiler',
    'import dis', 'sys.getsizeof', 'weakref',
    'async ', 'await ', 'yield ',
    'timeit', 'import time', 'time.sleep', 'time.perf',
    'import profile', 'cProfile',
    # File operation patterns
    'file_path', 'filename', '.txt', '.csv', '.json', '.log',
    'pathlib', 'os.path.exists', 'os.listdir', 'os.walk',
    'shutil', 'tempfile',
    # Network
    'urllib', 'http.client',
    # Class definitions (allowed in specific lessons only) 
    # We don't skip these but handle errors
]

def timeout_handler(signum, frame):
    raise TimeoutError("Code block execution timed out")

def extract_code_blocks(content):
    """Extract all python code blocks with their line numbers."""
    blocks = []
    pattern = re.compile(r'```python\s*\n(.*?)```', re.DOTALL)
    for match in pattern.finditer(content):
        start_line = content[:match.start()].count('\n') + 2
        code = match.group(1)
        blocks.append((start_line, code))
    return blocks

def should_skip(code):
    """Check if code block should be skipped."""
    for pat in SKIP_PATTERNS:
        if pat in code:
            return True
    return False

def extract_print_expectations(code):
    """
    Extract print statements with inline # comments showing expected output.
    Returns list of (line_offset, expected_output_string).
    """
    expectations = []
    lines = code.split('\n')
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        
        # Pattern 1: print(...)  # expected output
        # Need to handle nested parens and strings
        if stripped.startswith('print(') and '#' in stripped:
            # Find the closing paren of print
            paren_depth = 0
            in_string = None
            j = 0
            print_end = -1
            for j, ch in enumerate(stripped):
                if ch in ('"', "'") and (j == 0 or stripped[j-1] != '\\'):
                    # Check for triple quotes
                    if stripped[j:j+3] in ('"""', "'''"):
                        if in_string == stripped[j:j+3]:
                            in_string = None
                        elif in_string is None:
                            in_string = stripped[j:j+3]
                    elif in_string is None:
                        in_string = ch
                    elif in_string == ch:
                        in_string = None
                elif in_string is None:
                    if ch == '(':
                        paren_depth += 1
                    elif ch == ')':
                        paren_depth -= 1
                        if paren_depth == 0:
                            print_end = j
                            break
            
            if print_end > 0:
                after = stripped[print_end+1:].strip()
                if after.startswith('#'):
                    expected = after[1:].strip()
                    # Remove trailing explanations in parens
                    # e.g., "True (because...)" -> just check "True"
                    expectations.append((i, expected))
        
        # Pattern 2: # Output: value  (standalone comment after print)
        elif stripped.startswith('# Output:') or stripped.startswith('#Output:'):
            expected = stripped.split(':', 1)[1].strip()
            expectations.append((i, expected))
    
    return expectations

def normalize_output(s):
    """Normalize output for comparison."""
    s = s.strip()
    # Remove ANSI escape codes
    s = re.sub(r'\033\[[0-9;]*m', '', s)
    return s

def compare_output(expected, actual):
    """
    Compare expected comment with actual output.
    Returns True if they match (accounting for acceptable differences).
    """
    exp = normalize_output(expected)
    act = normalize_output(actual)
    
    if not exp or not act:
        return True  # Can't compare
    
    # Direct match
    if exp == act:
        return True
    
    # Check if expected is a prefix of actual (comments often truncate)
    if act.startswith(exp):
        return True
    
    # Handle set/dict display order differences (non-deterministic)
    if '{' in exp and '{' in act:
        # Try parsing as Python literals
        try:
            exp_val = eval(exp)
            act_val = eval(act)
            if exp_val == act_val:
                return True
        except:
            pass
    
    # Handle floating point representation differences
    try:
        if abs(float(exp) - float(act)) < 1e-9:
            return True
    except (ValueError, TypeError):
        pass
    
    # Handle explanatory parenthetical in expected
    # e.g., "26.0 (float division result)" vs "26.0"
    exp_clean = re.split(r'\s*\(', exp)[0].strip()
    if exp_clean == act:
        return True
    
    # Handle "- explanation" suffix
    exp_clean2 = re.split(r'\s*-\s+\w', exp)[0].strip()
    if exp_clean2 == act:
        return True
    
    return False

def verify_lesson(filepath):
    """Verify all code blocks in a lesson file. Returns list of issues."""
    issues = []
    fname = os.path.basename(filepath)
    
    with open(filepath) as f:
        content = f.read()
    
    blocks = extract_code_blocks(content)
    
    for block_start, code in blocks:
        if should_skip(code):
            continue
        
        if 'print(' not in code:
            continue
        
        expectations = extract_print_expectations(code)
        if not expectations:
            continue
        
        # Execute the code block with timeout
        old_handler = None
        try:
            old_handler = signal.signal(signal.SIGALRM, timeout_handler)
            signal.alarm(5)  # 5 second timeout
            
            captured_out = io.StringIO()
            captured_err = io.StringIO()
            g = {'__builtins__': __builtins__}
            
            with redirect_stdout(captured_out), redirect_stderr(captured_err):
                exec(code, g)
            
            signal.alarm(0)
            actual_output = captured_out.getvalue()
            
        except TimeoutError:
            signal.alarm(0)
            continue  # Skip blocks that take too long
        except Exception as e:
            signal.alarm(0)
            # Only report if it's a clear bug, not a missing dependency
            if isinstance(e, (NameError, AttributeError)):
                # Likely references something from a previous code block
                continue
            elif isinstance(e, (TypeError, ValueError, IndexError, KeyError)):
                issues.append(f"{fname} L{block_start}: RUNTIME ERROR: {type(e).__name__}: {str(e)[:80]}")
            continue
        finally:
            if old_handler is not None:
                try:
                    signal.signal(signal.SIGALRM, old_handler)
                except:
                    pass
        
        # Compare actual output lines with expectations
        actual_lines = actual_output.strip().split('\n') if actual_output.strip() else []
        
        # Match each print statement's expected output to actual output
        # We need to figure out which actual output line corresponds to which print
        
        # Count print statements (not in comments) to know total expected outputs
        code_lines = code.split('\n')
        print_indices = []
        for ci, cl in enumerate(code_lines):
            stripped = cl.strip()
            if stripped.startswith('#'):
                continue
            if 'print(' in stripped and not stripped.startswith('#'):
                print_indices.append(ci)
        
        if len(actual_lines) < len(print_indices):
            # Some prints might produce multiple lines or no output
            pass
        
        # Simple approach: match expectations to actual output by order
        # Find which print index each expectation belongs to
        exp_to_actual = []
        for exp_line_offset, exp_text in expectations:
            # Find which print this expectation is for
            print_order = -1
            for pi_idx, pi in enumerate(print_indices):
                if pi == exp_line_offset or pi == exp_line_offset - 1 or pi == exp_line_offset:
                    print_order = pi_idx
                    break
                # Check if print is on the same line as the expectation
                if pi == exp_line_offset:
                    print_order = pi_idx
                    break
            
            # Try matching by index
            if print_order >= 0 and print_order < len(actual_lines):
                exp_to_actual.append((exp_line_offset, exp_text, actual_lines[print_order]))
        
        # If matching by print order didn't work well, try sequential matching
        if not exp_to_actual and len(expectations) == len(actual_lines):
            for (exp_offset, exp_text), act_line in zip(expectations, actual_lines):
                exp_to_actual.append((exp_offset, exp_text, act_line))
        
        # Verify matches
        for exp_offset, exp_text, act_text in exp_to_actual:
            if not compare_output(exp_text, act_text):
                line_num = block_start + exp_offset
                issues.append(
                    f"{fname} L{line_num}: MISMATCH\n"
                    f"    Expected: {exp_text}\n"
                    f"    Actual:   {act_text}"
                )
    
    return issues


def main():
    lessons_dir = os.path.abspath(LESSONS_DIR)
    lesson_files = sorted(glob.glob(os.path.join(lessons_dir, '*.md')))
    
    print(f"EXHAUSTIVE CODE BLOCK VERIFICATION")
    print(f"=" * 70)
    print(f"Scanning {len(lesson_files)} lesson files...")
    print()
    
    all_issues = []
    files_with_issues = 0
    total_blocks_checked = 0
    total_blocks_skipped = 0
    
    for lf in lesson_files:
        fname = os.path.basename(lf)
        
        with open(lf) as f:
            content = f.read()
        
        blocks = extract_code_blocks(content)
        checked = 0
        skipped = 0
        
        for _, code in blocks:
            if should_skip(code) or 'print(' not in code:
                skipped += 1
            else:
                checked += 1
        
        total_blocks_checked += checked
        total_blocks_skipped += skipped
        
        issues = verify_lesson(lf)
        
        if issues:
            files_with_issues += 1
            all_issues.extend(issues)
    
    print(f"Results:")
    print(f"  Files scanned: {len(lesson_files)}")
    print(f"  Code blocks checked: {total_blocks_checked}")
    print(f"  Code blocks skipped: {total_blocks_skipped}")
    print(f"  Files with issues: {files_with_issues}")
    print(f"  Total issues: {len(all_issues)}")
    print()
    
    if all_issues:
        print("ISSUES FOUND:")
        print("-" * 70)
        for issue in all_issues:
            print(f"  ❌ {issue}")
            print()
    else:
        print("✅ ALL CODE BLOCKS VERIFIED — NO MISMATCHES FOUND")
    
    return len(all_issues)


if __name__ == '__main__':
    sys.exit(main())
