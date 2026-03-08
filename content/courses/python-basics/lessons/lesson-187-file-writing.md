---
id: lesson-187-file-writing
title: "Writing Files in Python"
chapterId: ch16-file-io
order: 2
duration: 25
objectives:
  - Write data to files using write mode, append mode, and exclusive create mode
  - Use the write() and writelines() methods to output text data
  - Send formatted output to files using the print() function's file parameter
  - Understand newline handling across different platforms
  - Apply practical patterns like atomic writes and temporary files
  - Build programs that generate reports, logs, and structured output
---

# Writing Files in Python

Reading files gets data into your program, but writing files lets your program produce lasting results — reports, logs, processed data, and more. Python's file writing interface mirrors its reading interface: open a file with a specified mode, write your data, and close the file.

## Write Modes Overview

When you open a file for writing, the **mode** determines how existing data is handled:

| Mode | Name | Behavior |
|------|------|----------|
| `'w'` | Write | Creates the file or **truncates** (empties) an existing file |
| `'a'` | Append | Creates the file or **adds to the end** of an existing file |
| `'x'` | Exclusive create | Creates a **new file only** — raises `FileExistsError` if it exists |

## Writing with `'w'` Mode

Write mode is the most common way to create or overwrite a file. **Warning**: if the file already exists, its contents are completely erased.

```python
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Hello, World!\n")
    file.write("This is line two.\n")
    file.write("And this is line three.\n")
```

## Appending with `'a'` Mode

Append mode adds data to the end without erasing what's already there — ideal for log files.

```python
from datetime import datetime

def log_event(message, log_file="app.log"):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(log_file, "a", encoding="utf-8") as file:
        file.write(f"[{timestamp}] {message}\n")

log_event("Application started")
log_event("User logged in: admin")
```

## Exclusive Create with `'x'` Mode

Exclusive create mode is a safety mechanism that prevents accidental overwriting:

```python
def safe_create(filename, content):
    try:
        with open(filename, "x", encoding="utf-8") as file:
            file.write(content)
        print(f"Created: {filename}")
    except FileExistsError:
        print(f"Skipped: '{filename}' already exists.")

safe_create("report.txt", "Quarterly Report\n")
safe_create("report.txt", "Would overwrite!")  # Safely blocked
```

## The `write()` Method

`write()` writes a string and returns the number of characters written. Unlike `print()`, it does **not** add a newline automatically.

```python
with open("output.txt", "w", encoding="utf-8") as file:
    chars_written = file.write("First line\n")
    print(f"Wrote {chars_written} characters")  # 11

    file.write("""Roses are red,
Violets are blue,
Python is great.
""")
```

## The `writelines()` Method

`writelines()` writes a list of strings without adding newlines between items:

```python
items = ["apple", "banana", "cherry", "date"]

with open("fruits.txt", "w", encoding="utf-8") as file:
    file.writelines(f"{item}\n" for item in items)
```

## Writing Formatted Data

Python's f-strings make writing structured output straightforward:

```python
students = [
    ("Alice", 95, "A"),
    ("Bob", 87, "B+"),
    ("Charlie", 92, "A-"),
]

with open("grades_report.txt", "w", encoding="utf-8") as file:
    file.write(f"{'Name':<15} {'Score':>5} {'Grade':>5}\n")
    file.write("-" * 27 + "\n")
    for name, score, grade in students:
        file.write(f"{name:<15} {score:>5} {grade:>5}\n")

    avg = sum(s[1] for s in students) / len(students)
    file.write("-" * 27 + "\n")
    file.write(f"{'Average':<15} {avg:>5.1f}\n")
```

## Newline Handling

Python's text mode handles newline translation automatically per platform. You can control this with the `newline` parameter:

```python
# Write Unix-style line endings regardless of platform
with open("unix_file.txt", "w", encoding="utf-8", newline="\n") as file:
    file.write("Line 1\nLine 2\n")

# Write Windows-style line endings regardless of platform
with open("windows_file.txt", "w", encoding="utf-8", newline="\r\n") as file:
    file.write("Line 1\nLine 2\n")
```

## Using `print()` to Write to Files

`print()` accepts a `file=` parameter that redirects output. This is often more convenient because it handles newlines and spacing automatically.

```python
with open("report.txt", "w", encoding="utf-8") as file:
    print("Sales Report", file=file)
    print("=" * 30, file=file)
    print(file=file)  # Empty line

    sales = {"Q1": 15000, "Q2": 18500, "Q3": 22000, "Q4": 19750}
    for quarter, amount in sales.items():
        print(f"  {quarter}: ${amount:,.2f}", file=file)

    print(f"\n  Total: ${sum(sales.values()):,.2f}", file=file)
```

Use `sep` for custom separators:

```python
with open("data.csv", "w", encoding="utf-8") as file:
    print("Name", "Age", "City", sep=",", file=file)
    print("Alice", 30, "NYC", sep=",", file=file)
```

## Writing Log Files

A practical set of logging functions:

```python
from datetime import datetime

def write_log(log_path, level, message):
    """Write a log entry to the specified file."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(log_path, "a", encoding="utf-8") as file:
        file.write(f"[{timestamp}] [{level}] {message}\n")

def log_info(log_path, message):
    write_log(log_path, "INFO", message)

def log_warning(log_path, message):
    write_log(log_path, "WARNING", message)

def log_error(log_path, message):
    write_log(log_path, "ERROR", message)

log_file = "application.log"
log_info(log_file, "Server starting on port 8080")
log_error(log_file, "Database connection failed")
```

## Practical Patterns

### Atomic Writes with Temporary Files

Write to a temporary file first, then rename it to prevent data loss if your program crashes mid-write:

```python
import os
import tempfile

def atomic_write(file_path, content):
    """Write atomically — either fully succeeds or doesn't change the file."""
    directory = os.path.dirname(file_path) or "."
    fd, temp_path = tempfile.mkstemp(dir=directory, suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as tmp:
            tmp.write(content)
        os.replace(temp_path, file_path)  # Atomic rename
    except Exception:
        os.unlink(temp_path)
        raise

atomic_write("config.json", '{"version": 2, "debug": false}\n')
```

### Writing with Backup

```python
import shutil
import os

def write_with_backup(file_path, content):
    if os.path.exists(file_path):
        shutil.copy2(file_path, file_path + ".bak")
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(content)
```

### Buffering and Flushing

Python buffers writes for performance. Force data to disk with `flush()`:

```python
with open("live_log.txt", "w", encoding="utf-8") as file:
    for i in range(5):
        file.write(f"Event {i}\n")
        file.flush()  # Other programs can now see this line
```

## Try It Yourself

1. **Journal App**: Write a program that appends timestamped entries to a journal file. Each run should prompt for a new entry and add it to the end.

2. **Multiplication Table**: Create a file containing the multiplication table (1×1 through 12×12) in a neatly formatted grid.

3. **File Splitter**: Write a function that reads a large text file and splits it into smaller files of `n` lines each (`part_001.txt`, `part_002.txt`, etc.).

4. **Safe Saver**: Implement atomic writes and test by deliberately raising an exception mid-write to verify the original file is unchanged.

## Key Takeaways

- **Write mode (`'w'`) truncates** the file — be careful not to accidentally erase data.
- **Append mode (`'a'`) preserves** existing content, ideal for logs and cumulative records.
- **Exclusive create (`'x'`)** prevents overwriting by raising an error if the file exists.
- **`write()` does not add newlines** — include `\n` explicitly. `print(file=f)` adds them by default.
- **`writelines()`** writes an iterable of strings without adding separators.
- **Always specify `encoding="utf-8"`** for consistent cross-platform behavior.
- **Use atomic writes** (temp file then rename) for critical data to prevent corruption.
- **Flush the buffer** with `file.flush()` when other processes need to see output immediately.
