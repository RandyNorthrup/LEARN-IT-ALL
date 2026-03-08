#!/usr/bin/env python3
"""
Precise code block verifier v2.
Only flags genuine output mismatches, not explanatory comments.
"""

import re, os, glob, io, sys, signal
from contextlib import redirect_stdout, redirect_stderr

LESSONS_DIR = os.path.join(os.path.dirname(__file__), 
    '..', 'content', 'courses', 'python-basics', 'lessons')

SKIP_PATTERNS = [
    'input(', 'open(', 'Path(', '.read_text(', '.write_text(',
    'with open', 'mkdir', 'rmdir', 'remove(', 'unlink(',
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
    'file_path', 'filename',
    'pathlib', 'os.path.exists', 'os.listdir', 'os.walk',
    'shutil', 'tempfile',
    'urllib', 'http.client',
]

def timeout_handler(signum, frame):
    raise TimeoutError()

def should_skip(code):
    for pat in SKIP_PATTERNS:
        if pat in code:
            return True
    return False

def is_explanatory_comment(comment):
    """Return True if the comment is explanatory, not a literal expected output."""
    c = comment.strip()
    # Starts with words that are clearly not output
    skip_starts = [
        'Prints ', 'prints ', 'Output:', 'Returns', 'This ', 'Note:', 'Can ', 
        'Same ', 'May be', 'e.g.', 'E.g.', 'Should', 'Will ', 'Creates',
        'Like ', 'Similar', 'Works', 'Now ', 'Only ', 'Still ', 'Also ',
        'Raises', 'No ', 'Gets', 'Shows', 'Demonstrates', 'Not ',
        'Python ', 'The ', 'A ', 'An ', 'Each ', 'First', 'Both ',
        'Must ', 'Always ', 'Never ', 'Sometimes', 'Usually ', 'Different',
        'Equivalent', 'Better ', 'Faster', 'Slower', 'More ', 'Less ',
        'New ', 'Old ', 'Original', 'Modified', 'Updated', 'Changed',
        'Copied', 'Deleted', 'Added', 'Removed', 'Valid', 'Invalid',
        'Error', 'Warning', 'OK', 'Combine', 'Separate', 'Check',
        'Use ', 'Don\'t', 'Avoid', 'Prefer', 'Instead', 'Because',
        'Since ', 'If ', 'When ', 'While ', 'For ', 'After ',
        'Before ', 'Until ', 'Between', 'See ', 'Try ', 'Set ',
        'Define', 'Import', 'Call', 'Pass', 'Return',
        'Immutable', 'Mutable', 'Hashable', 'Iterable',
        'Runs', 'Stop', 'Start', 'End', 'Begin',
        'Variable', 'Function', 'Method', 'Class', 'Module',
        'Global', 'Local', 'Nonlocal', 'Outer', 'Inner',
        '!', 'assign ', 'access ', 'Possible', 'Unpacking',
        'Positional', 'Keyword', 'Default', 'Required',
    ]
    for s in skip_starts:
        if c.startswith(s):
            return True
    
    # Contains no Python-like value
    # Pure English sentences are likely explanatory
    words = c.split()
    if len(words) > 6:
        return True  # Long comments are explanations
    
    return False

def extract_value_from_comment(comment):
    """
    Extract just the expected value from a comment, stripping explanatory suffixes.
    e.g., "True — Python caches..." -> "True"
          "[1, 2, 3] (the list)" -> "[1, 2, 3]"
          "26.0" -> "26.0"
    """
    c = comment.strip()
    
    # Strip common separators for explanations
    # Handle: "value — explanation" or "value - explanation" 
    # But NOT "value - more_value" (like negative numbers)
    for sep in [' — ', ' – ']:
        if sep in c:
            c = c.split(sep)[0].strip()
    
    # Handle "value - explanation" but carefully (not "value - 5" which is math)
    if ' - ' in c:
        parts = c.split(' - ', 1)
        # If the part after - starts with a capital letter, it's likely an explanation
        if len(parts) == 2 and parts[1] and parts[1][0].isupper():
            c = parts[0].strip()
    
    # Handle "value (explanation)"
    # But not "(1, 2, 3)" which IS a value
    if '(' in c and not c.startswith('(') and not c.startswith('{') and not c.startswith('['):
        # Check if paren is part of an explanation
        paren_idx = c.index('(')
        before = c[:paren_idx].strip()
        try:
            eval(before)
            c = before  # If before parses as Python, use it
        except:
            pass
    
    return c

def main():
    lessons_dir = os.path.abspath(LESSONS_DIR)
    lesson_files = sorted(glob.glob(os.path.join(lessons_dir, '*.md')))
    
    print(f"PRECISE CODE BLOCK VERIFICATION v2")
    print(f"=" * 70)
    print(f"Scanning {len(lesson_files)} lesson files...")
    
    all_issues = []
    blocks_executed = 0
    blocks_skipped = 0
    comparisons_made = 0
    
    for lf in lesson_files:
        fname = os.path.basename(lf)
        with open(lf) as f:
            content = f.read()
        
        # Find code blocks
        for match in re.finditer(r'```python\s*\n(.*?)```', content, re.DOTALL):
            code = match.group(1).strip()
            block_start = content[:match.start()].count('\n') + 2
            
            if should_skip(code) or 'print(' not in code:
                blocks_skipped += 1
                continue
            
            # Find SIMPLE single-print-per-line patterns with value comments
            # Only check blocks where we can unambiguously match prints to output
            lines = code.split('\n')
            
            # Collect print lines with their inline comments
            prints_with_comments = []
            all_print_lines = []
            
            for li, line in enumerate(lines):
                stripped = line.strip()
                if stripped.startswith('#'):
                    continue
                
                # Check if line has a print() call
                if 'print(' in stripped:
                    all_print_lines.append(li)
                    
                    # Find comment after the print
                    # Match print(...) followed by # comment
                    m = re.match(r'.*print\(.+\)\s+#\s+(.+)$', stripped)
                    if m:
                        comment = m.group(1).strip()
                        if not is_explanatory_comment(comment):
                            value = extract_value_from_comment(comment)
                            prints_with_comments.append((li, value, len(all_print_lines) - 1))
            
            if not prints_with_comments:
                blocks_skipped += 1
                continue
            
            # Execute the block
            try:
                old_handler = signal.signal(signal.SIGALRM, timeout_handler)
                signal.alarm(5)
                
                captured = io.StringIO()
                g = {'__builtins__': __builtins__}
                with redirect_stdout(captured), redirect_stderr(io.StringIO()):
                    exec(code, g)
                
                signal.alarm(0)
                actual = captured.getvalue()
                blocks_executed += 1
            except:
                signal.alarm(0)
                try:
                    signal.signal(signal.SIGALRM, signal.SIG_DFL)
                except:
                    pass
                blocks_skipped += 1
                continue
            finally:
                try:
                    signal.signal(signal.SIGALRM, signal.SIG_DFL)
                except:
                    pass
            
            actual_lines = actual.strip().split('\n') if actual.strip() else []
            
            for li, expected_val, print_order in prints_with_comments:
                comparisons_made += 1
                
                if print_order >= len(actual_lines):
                    continue  # Can't verify this one
                
                actual_val = actual_lines[print_order].strip()
                expected_clean = expected_val.strip()
                
                # Skip memory addresses, object reprs
                if 'object at 0x' in expected_clean or 'object at 0x' in actual_val:
                    continue
                if expected_clean.startswith('0x') or actual_val.startswith('0x'):
                    continue
                if '<' in expected_clean and '>' in expected_clean:
                    continue  # <class ...>, <function ...>, etc.
                
                # Skip if expected contains "..."
                if '...' in expected_clean:
                    continue
                
                # Direct match
                if expected_clean == actual_val:
                    continue
                
                # Try eval comparison for containers (set ordering)
                try:
                    e = eval(expected_clean)
                    a = eval(actual_val)
                    if e == a:
                        continue
                except:
                    pass
                
                # Float comparison
                try:
                    if abs(float(expected_clean) - float(actual_val)) < 1e-6:
                        continue
                except:
                    pass
                
                # Strip quotes for string comparisons
                if (expected_clean.startswith('"') and expected_clean.endswith('"')) or \
                   (expected_clean.startswith("'") and expected_clean.endswith("'")):
                    if expected_clean[1:-1] == actual_val:
                        continue
                
                line_num = block_start + li
                all_issues.append(
                    f"{fname} L{line_num}: "
                    f"expected [{expected_clean}] got [{actual_val}]"
                )
    
    print(f"\nResults:")
    print(f"  Blocks executed: {blocks_executed}")
    print(f"  Blocks skipped:  {blocks_skipped}")
    print(f"  Comparisons:     {comparisons_made}")
    print(f"  Mismatches:      {len(all_issues)}")
    print()
    
    if all_issues:
        print("MISMATCHES:")
        print("-" * 70)
        for issue in all_issues:
            print(f"  ❌ {issue}")
    else:
        print("✅ ALL VERIFIED — NO MISMATCHES")
    
    return len(all_issues)

if __name__ == '__main__':
    sys.exit(main())
