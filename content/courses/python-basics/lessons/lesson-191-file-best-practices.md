---
id: lesson-191-file-best-practices
title: "File I/O Best Practices"
chapterId: ch16-file-io
order: 6
duration: 25
objectives:
  - Apply professional file handling patterns including context managers and explicit encoding
  - Implement robust error handling for all file operations
  - Use the tempfile module for safe temporary file operations
  - Choose the right file format for different data storage needs
  - Optimize file I/O performance for large-scale data processing
  - Build a complete file processing pipeline combining the techniques from this chapter
---

# File I/O Best Practices

Throughout this chapter, you've learned to read files, write files, work with paths, and handle CSV and JSON formats. Now it's time to bring everything together with the professional patterns that distinguish production-quality code from beginner scripts.

## Always Use Context Managers

The `with` statement ensures files are closed properly, even when exceptions occur.

```python
# ALWAYS do this
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()

# NEVER do this in production
file = open("data.txt", "r")
content = file.read()
file.close()  # What if an exception occurs before this line?
```

For multiple files, use a single `with` statement:

```python
with (
    open("input.txt", "r", encoding="utf-8") as infile,
    open("output.txt", "w", encoding="utf-8") as outfile,
):
    for line in infile:
        outfile.write(line.upper())
```

## Handle Encoding Explicitly

Never rely on the system default encoding:

```python
# GOOD — explicit and portable
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()

# BAD — uses system default, varies by platform
with open("data.txt", "r") as f:
    content = f.read()
```

For files of unknown encoding:

```python
def read_text_file(path):
    for encoding in ["utf-8", "utf-8-sig", "latin-1", "cp1252"]:
        try:
            with open(path, "r", encoding=encoding) as f:
                return f.read(), encoding
        except UnicodeDecodeError:
            continue
    with open(path, "rb") as f:
        return f.read().decode("utf-8", errors="replace"), "fallback"
```

## Use `pathlib` for Paths

Prefer `pathlib.Path` over string concatenation or `os.path`:

```python
from pathlib import Path

# GOOD
data_dir = Path("project") / "data"
output = data_dir / "results.csv"
output.parent.mkdir(parents=True, exist_ok=True)

# LESS IDEAL
import os
output = os.path.join("project", "data", "results.csv")
os.makedirs(os.path.dirname(output), exist_ok=True)
```

## Error Handling Patterns

### Comprehensive Error Handling

```python
from pathlib import Path
import json

def load_json_config(config_path):
    path = Path(config_path)
    if not path.exists():
        raise FileNotFoundError(f"Config not found: {path}")

    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON in {path}: {e.msg}") from e
    except PermissionError:
        raise PermissionError(f"Cannot read: {path}")
```

### Default Value Pattern

```python
from pathlib import Path

def read_or_default(path, default="", encoding="utf-8"):
    try:
        return Path(path).read_text(encoding=encoding)
    except FileNotFoundError:
        return default

username = read_or_default("username.txt", default="anonymous").strip()
```

## Binary Files Basics

While this chapter focuses on text, know the basics of binary handling:

```python
# Reading binary files
with open("image.png", "rb") as f:
    header = f.read(8)
    print(f"Header bytes: {header.hex()}")

# Copying binary files efficiently
def copy_binary(source, destination):
    with open(source, "rb") as src, open(destination, "wb") as dst:
        while chunk := src.read(65536):
            dst.write(chunk)
```

For images use `Pillow`, for PDFs use `PyPDF2` — specialized libraries handle complex binary formats.

## Temporary Files with `tempfile`

The `tempfile` module creates temporary files and directories that are automatically cleaned up.

```python
import tempfile
from pathlib import Path

# Temporary file
with tempfile.NamedTemporaryFile(mode="w", suffix=".txt",
                                  delete=False, encoding="utf-8") as tmp:
    tmp.write("Temporary data\n")
    tmp_path = tmp.name

Path(tmp_path).unlink()  # Clean up when done
```

### Temporary Directories

```python
import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as tmp_dir:
    tmp_path = Path(tmp_dir)
    data_file = tmp_path / "processing.txt"
    data_file.write_text("intermediate results", encoding="utf-8")
    # Process files ...
# Directory and contents automatically deleted
```

### Atomic Writes

```python
import tempfile
import os
import json
from pathlib import Path

def atomic_write_json(path, data):
    """Write JSON atomically — fully succeeds or doesn't change the file."""
    path = Path(path)
    fd, tmp_path = tempfile.mkstemp(dir=path.parent, suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp_path, path)
    except Exception:
        os.unlink(tmp_path)
        raise
```

## File Locking Concepts

When multiple processes access the same file, coordinate with a simple lock file:

```python
from pathlib import Path
import time, os

def acquire_lock(lock_path, timeout=10):
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with open(lock_path, "x") as f:
                f.write(str(os.getpid()))
            return True
        except FileExistsError:
            time.sleep(0.1)
    return False

def release_lock(lock_path):
    Path(lock_path).unlink(missing_ok=True)
```

For production use, install the `filelock` package from PyPI.

## Configuration Files with `configparser`

Python's `configparser` reads INI-style config files — simpler than JSON for settings:

```python
import configparser

# Write
config = configparser.ConfigParser()
config["server"] = {"host": "localhost", "port": "8080", "debug": "true"}
config["database"] = {"engine": "postgresql", "name": "myapp"}

with open("app.ini", "w", encoding="utf-8") as f:
    config.write(f)

# Read
config = configparser.ConfigParser()
config.read("app.ini", encoding="utf-8")

host = config.get("server", "host")
port = config.getint("server", "port")
debug = config.getboolean("server", "debug")
```

## Choosing the Right Format

| Format | Best For | Pros | Cons |
|--------|----------|------|------|
| **Plain text** | Logs, simple data | Human-readable, universal | No structure |
| **CSV** | Tabular data | Simple, widely supported | No nesting |
| **JSON** | APIs, structured data | Hierarchical, typed | Verbose, no comments |
| **INI** | App settings | Simple, has sections | Flat values only |

## Performance Tips for Large Files

### Stream Instead of Loading

```python
# BAD — loads entire file into memory
with open("huge.csv", "r", encoding="utf-8") as f:
    all_lines = f.readlines()  # Could be gigabytes!

# GOOD — streams one line at a time
with open("huge.csv", "r", encoding="utf-8") as f:
    for line in f:
        process(line)
```

### Batch Writing

```python
BATCH_SIZE = 1000

with open("output.txt", "w", encoding="utf-8") as f:
    batch = []
    for item in large_dataset:
        batch.append(f"{item}\n")
        if len(batch) >= BATCH_SIZE:
            f.writelines(batch)
            batch.clear()
    if batch:
        f.writelines(batch)
```

## Complete Worked Example: File Processing Pipeline

```python
import csv
import json
from pathlib import Path
from datetime import datetime
from collections import defaultdict

def create_pipeline(output_dir):
    """Initialize a pipeline context with output directory and error list."""
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    return {"output_dir": output_path, "errors": []}

def read_csv_data(pipeline, csv_path):
    """Read and validate records from a CSV file."""
    records = []
    try:
        with open(csv_path, "r", encoding="utf-8", newline="") as f:
            for row_num, row in enumerate(csv.DictReader(f), start=2):
                try:
                    records.append({
                        "product": row["product"],
                        "quantity": int(row["quantity"]),
                        "price": float(row["price"]),
                        "region": row.get("region", "Unknown"),
                    })
                except (ValueError, KeyError) as e:
                    pipeline["errors"].append(f"Row {row_num}: {e}")
    except FileNotFoundError:
        pipeline["errors"].append(f"File not found: {csv_path}")
    return records

def process_records(records, min_qty=0):
    """Filter records and compute per-product totals."""
    filtered = [r for r in records if r["quantity"] >= min_qty]
    totals = defaultdict(lambda: {"quantity": 0, "revenue": 0.0})
    for r in filtered:
        totals[r["product"]]["quantity"] += r["quantity"]
        totals[r["product"]]["revenue"] += r["quantity"] * r["price"]
    return filtered, dict(totals)

def write_report(output_dir, title, totals):
    """Write a formatted text report to the output directory."""
    path = output_dir / "report.txt"
    with open(path, "w", encoding="utf-8") as f:
        f.write(f"{title}\n{'=' * len(title)}\n")
        f.write(f"Generated: {datetime.now():%Y-%m-%d %H:%M}\n\n")
        f.write(f"{'Product':<20} {'Qty':>8} {'Revenue':>12}\n")
        f.write("-" * 42 + "\n")
        grand = 0
        for product, data in sorted(totals.items()):
            f.write(f"{product:<20} {data['quantity']:>8,} "
                    f"${data['revenue']:>10,.2f}\n")
            grand += data["revenue"]
        f.write("-" * 42 + "\n")
        f.write(f"{'TOTAL':<20} {'':>8} ${grand:>10,.2f}\n")

def run_pipeline(pipeline, csv_input):
    """Execute the full pipeline: read, process, and write."""
    records = read_csv_data(pipeline, csv_input)
    if not records:
        print("No data to process.")
        return
    filtered, totals = process_records(records)
    write_report(pipeline["output_dir"], "Sales Report", totals)

    with open(pipeline["output_dir"] / "results.json", "w", encoding="utf-8") as f:
        json.dump({"products": totals}, f, indent=2)

    print(f"Done! {len(filtered)} records → {pipeline['output_dir']}")

pipeline = create_pipeline("output/sales")
run_pipeline(pipeline, "sales_data.csv")
```

## Try It Yourself

1. **Config Migration**: Read settings from an INI file and convert them to JSON, preserving sections as nested objects.

2. **Log Analyzer**: Read a log file, categorize entries by severity, generate statistics, and write summaries in text and JSON.

3. **File Backup Utility**: Create timestamped backups of a directory's files using `pathlib` and proper error handling.

4. **Safe File Editor**: Modify a config file using atomic writes and backup creation.

## Key Takeaways

- **Always use `with` statements** — context managers prevent resource leaks and ensure data is flushed.
- **Always specify `encoding="utf-8"`** — system defaults vary by platform and cause subtle bugs.
- **Use `pathlib.Path`** for path manipulation — cleaner and more expressive than `os.path`.
- **Handle errors at every level** — files can be missing, locked, corrupted, or wrongly encoded.
- **Use `tempfile`** for intermediate work — temp files and dirs are automatically cleaned up.
- **Choose the right format**: CSV for tabular data, JSON for hierarchical data, INI for settings.
- **Stream large files** line by line instead of loading them entirely into memory.
- **Write atomically** using temp-file-then-rename for critical data.
- **Batch writes** for better performance — accumulate data and write in larger chunks.
- **Build modular pipelines** that separate reading, processing, and writing for testability.
