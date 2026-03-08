---
id: lesson-151-error-handling-apis
title: "Error Handling in Real Projects"
chapterId: ch11-error-handling
order: 12
duration: 30
objectives:
  - Handle errors in file operations, user input, and data processing
  - Build robust CLI applications with proper error handling
  - Apply error handling strategies in loops and during shutdown
  - Create a complete file processing script with comprehensive error handling
---

# Error Handling in Real Projects

You've learned `try`/`except` syntax and error handling patterns. Now it's time to apply them to real code. This lesson walks through file I/O, user input, data processing, and command-line tools — the scenarios where error handling matters most.

## Error Handling in File Operations

File operations are the most common source of errors. Files might not exist, permissions might be wrong, or encoding might be unexpected:

```python
def read_file_safely(filepath):
    """Read a file and return its contents, or None on failure."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: File '{filepath}' does not exist.")
    except PermissionError:
        print(f"Error: No permission to read '{filepath}'.")
    except UnicodeDecodeError:
        print(f"Error: '{filepath}' contains invalid text encoding.")
    return None
```

For writing, handle missing directories too:

```python
import os

def write_file_safely(filepath, content):
    """Write content to a file, creating directories if needed."""
    try:
        directory = os.path.dirname(filepath)
        if directory:
            os.makedirs(directory, exist_ok=True)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    except PermissionError:
        print(f"Error: No permission to write to '{filepath}'.")
    except OSError as e:
        print(f"Error writing to '{filepath}': {e}")
    return False
```

## Error Handling with User Input

When your program takes input from a user, assume they'll type anything:

```python
def get_integer(prompt, min_val=None, max_val=None):
    """Keep asking until the user enters a valid integer."""
    while True:
        user_input = input(prompt)
        try:
            value = int(user_input)
        except ValueError:
            print(f"'{user_input}' is not a valid number. Try again.")
            continue

        if min_val is not None and value < min_val:
            print(f"Value must be at least {min_val}.")
            continue
        if max_val is not None and value > max_val:
            print(f"Value must be at most {max_val}.")
            continue
        return value

# Usage
age = get_integer("Enter your age: ", min_val=0, max_val=150)
```

For menus, use a similar loop with `str(c) for c in valid_choices` to validate against allowed options.

## Error Handling with Data Processing

When processing JSON or CSV, expect malformed data:

```python
import json
import csv

def load_json_file(filepath):
    """Load JSON with clear error messages."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        raise FileNotFoundError(f"Data file not found: {filepath}")
    except json.JSONDecodeError as e:
        raise ValueError(
            f"Invalid JSON in '{filepath}' at line {e.lineno}: {e.msg}"
        )

def load_csv_records(filepath):
    """Load CSV records, skipping invalid rows."""
    records = []
    errors = []
    with open(filepath, "r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row_num, row in enumerate(reader, start=2):
            try:
                if not row.get("name", "").strip():
                    raise ValueError("Missing 'name'")
                records.append({"name": row["name"].strip()})
            except (ValueError, KeyError) as e:
                errors.append(f"Row {row_num}: {e}")

    if errors:
        print(f"Warning: {len(errors)} rows skipped:")
        for err in errors[:5]:
            print(f"  - {err}")
    return records
```

## Building a Robust CLI Application

Command-line tools need structured error handling:

```python
import sys
import os

def main():
    if len(sys.argv) < 2:
        print("Usage: python tool.py <input_file> [output_file]")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else "report.txt"

    if not os.path.isfile(input_path):
        print(f"Error: '{input_path}' not found.", file=sys.stderr)
        sys.exit(1)

    try:
        results = process_file(input_path)
    except ValueError as e:
        print(f"Error: Invalid data: {e}", file=sys.stderr)
        sys.exit(1)

    try:
        write_report(output_path, results)
    except PermissionError:
        print(f"Error: Cannot write to '{output_path}'.", file=sys.stderr)
        sys.exit(1)

    print(f"Report saved to {output_path}")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nInterrupted.", file=sys.stderr)
        sys.exit(130)
```

Key patterns: validate args early, print errors to stderr, use exit codes (0 = success), and catch `KeyboardInterrupt` at the top level.

## Error Handling in Loops

When processing many items, decide whether to skip or abort on failure:

```python
def process_all_files(file_list):
    """Process files, skipping failures."""
    results = []
    failed = []
    for filepath in file_list:
        try:
            results.append(process_file(filepath))
        except Exception as e:
            failed.append((filepath, str(e)))
            continue

    if failed:
        print(f"{len(failed)} file(s) failed:")
        for path, error in failed:
            print(f"  {path}: {error}")
    return results
```

You can also track `error_count` and `raise RuntimeError` once it exceeds a threshold to abort batch processing.

## Graceful Shutdown

Use `try`/`finally` to ensure cleanup happens even on errors:

```python
def run_file_processor(output_path, items):
    """Process items and write results to a file with guaranteed cleanup."""
    output_file = None
    processed = 0
    try:
        output_file = open(output_path, "w")
        for item in items:
            result = process(item)
            output_file.write(f"{result}\n")
            processed += 1
    finally:
        if output_file and not output_file.closed:
            output_file.close()
        print(f"Processed {processed} items.")
```

## Error Handling Checklist

Before shipping any Python script, verify:

- [ ] **Files**: Handle `FileNotFoundError`, `PermissionError`, encoding errors
- [ ] **Input**: Validate and re-prompt on bad input
- [ ] **Data**: Handle malformed JSON, CSV, or other formats
- [ ] **Resources**: Use `with` statements for files and connections
- [ ] **Loops**: Decide skip vs abort strategy for individual failures
- [ ] **Exit codes**: Return 0 on success, non-zero on failure
- [ ] **Messages**: Error messages explain what went wrong and how to fix it
- [ ] **Ctrl+C**: Handle `KeyboardInterrupt` gracefully

## Complete Worked Example

A file processing script tying all patterns together:

```python
"""Word frequency analyzer with comprehensive error handling."""
import os
import sys
import logging
from collections import Counter

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger("word_counter")


def read_text_file(filepath):
    """Read a text file with encoding fallback."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    except UnicodeDecodeError:
        logger.warning(f"Encoding error in {filepath}, trying latin-1")
        with open(filepath, "r", encoding="latin-1") as f:
            return f.read()


def count_words(text):
    """Count word frequencies."""
    if not text or not text.strip():
        return Counter()
    words = text.lower().split()
    cleaned = [w.strip(".,!?;:\"'()-[]{}") for w in words]
    return Counter(w for w in cleaned if w)


def process_directory(directory):
    """Process all .txt files in a directory."""
    if not os.path.isdir(directory):
        raise FileNotFoundError(f"Directory not found: {directory}")

    total_counts = Counter()
    processed = 0
    failed = []

    for filename in sorted(os.listdir(directory)):
        if not filename.endswith(".txt"):
            continue
        filepath = os.path.join(directory, filename)
        try:
            text = read_text_file(filepath)
            counts = count_words(text)
            total_counts.update(counts)
            processed += 1
            logger.info(f"Processed {filename}: {sum(counts.values())} words")
        except PermissionError:
            failed.append((filename, "permission denied"))
        except OSError as e:
            failed.append((filename, str(e)))

    return {"counts": total_counts, "processed": processed, "failed": failed}


def write_report(filepath, results, top_n=20):
    """Write a word frequency report."""
    counts = results["counts"]
    lines = [
        "Word Frequency Report",
        f"Files processed: {results['processed']}",
        f"Unique words: {len(counts)}",
        f"Total words: {sum(counts.values())}",
        "",
    ]
    for word, count in counts.most_common(top_n):
        lines.append(f"  {word:<20} {count:>6}")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    logger.info(f"Report written to {filepath}")


def main():
    if len(sys.argv) < 2:
        print("Usage: python word_counter.py <directory> [report_file]")
        sys.exit(1)

    input_dir = sys.argv[1]
    report_path = sys.argv[2] if len(sys.argv) > 2 else "word_report.txt"

    try:
        results = process_directory(input_dir)
    except FileNotFoundError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    if results["processed"] == 0:
        print(f"No .txt files found in '{input_dir}'.", file=sys.stderr)
        sys.exit(1)

    try:
        write_report(report_path, results)
    except PermissionError:
        print(f"Error: Cannot write to '{report_path}'.", file=sys.stderr)
        sys.exit(1)

    print(f"Done. {results['processed']} files processed. Report: {report_path}")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nInterrupted.", file=sys.stderr)
        sys.exit(130)
```

## Try It Yourself

1. **Input validator**: Write `get_date(prompt)` that keeps asking until the user enters a valid `YYYY-MM-DD` date using `datetime.strptime()`.

2. **CSV cleaner**: Write a script that reads a CSV, validates rows, writes valid rows to `clean.csv` and invalid rows to `errors.csv`.

3. **Robust copier**: Write a script that copies files between directories, handling permission errors, existing files, and missing directories.

## Key Takeaways

- **File operations need specific handlers** — always catch `FileNotFoundError`, `PermissionError`, and encoding errors separately.
- **User input requires validation loops** — use `while True` with `try`/`except` and `continue` to re-prompt.
- **Data processing should be fault-tolerant** — skip bad records, collect errors, report at the end.
- **CLI tools need structure** — validate early, use stderr for errors, return proper exit codes.
- **Choose your loop strategy** — skip-and-continue for batch processing, abort-after-N for critical pipelines.
- **Always clean up** — use `try`/`finally` and context managers to release resources on any exit path.
- **Use the checklist** — verify files, input, parsing, cleanup, exit codes, and Ctrl+C handling before shipping.
