---
id: lesson-188-file-paths
title: "Working with File Paths"
chapterId: ch16-file-io
order: 3
duration: 30
objectives:
  - Distinguish between relative and absolute file paths on different operating systems
  - Use the os.path module for classic path manipulation operations
  - Build modern, cross-platform paths with pathlib.Path objects
  - Check for file and directory existence and list directory contents
  - Create directories programmatically using mkdir and makedirs
  - Determine a script's own location using __file__
---

# Working with File Paths

So far, we've opened files using simple filenames like `"data.txt"`. But real-world programs need to navigate complex directory structures and construct paths that work across operating systems. Python provides two complementary tools: the classic `os.path` module and the modern `pathlib` module.

## Relative vs. Absolute Paths

**Absolute paths** specify the complete location from the filesystem root:

```
Linux/macOS:  /home/alice/projects/data.txt
Windows:      C:\Users\Alice\Projects\data.txt
```

**Relative paths** are relative to the **current working directory**:

```
data.txt              → file in the current directory
../data.txt           → file in the parent directory
subdir/data.txt       → file in a subdirectory
```

```python
import os
print(f"Current directory: {os.getcwd()}")
```

**Best practice**: Use relative paths for project-internal files, absolute paths for system resources.

## The `os.path` Module (Classic Approach)

### Joining Paths

Never concatenate paths with `/` or `\\`. Use `os.path.join()`:

```python
import os

data_dir = os.path.join("project", "data", "raw")
file_path = os.path.join(data_dir, "input.csv")
# Linux: project/data/raw/input.csv
# Windows: project\data\raw\input.csv
```

### Inspecting Paths

```python
import os

path = "/home/alice/projects/report.pdf"
print(os.path.basename(path))    # report.pdf
print(os.path.dirname(path))     # /home/alice/projects
print(os.path.splitext(path))    # ('/home/alice/projects/report', '.pdf')

# Convert relative to absolute
abs_path = os.path.abspath("data/input.csv")

# Normalize a messy path
clean = os.path.normpath("/home/alice/../alice/./projects//data.txt")
# /home/alice/projects/data.txt
```

### Checking Existence

```python
import os

print(os.path.exists("data/results.csv"))
print(os.path.isfile("data/results.csv"))
print(os.path.isdir("data"))
```

### Listing Directory Contents

```python
import os

entries = os.listdir("project/data")
csv_files = [f for f in os.listdir("project/data") if f.endswith(".csv")]
```

## The `pathlib` Module (Modern Approach)

Python 3.4+ introduced `pathlib`, which treats paths as **objects** rather than strings — cleaner, more readable code.

### Creating Path Objects

```python
from pathlib import Path

current = Path(".")
home = Path.home()
data_file = Path("project") / "data" / "input.csv"
```

### The `/` Operator for Joining

```python
from pathlib import Path

base = Path("project")
data_dir = base / "data" / "raw"
config = base / "config" / "settings.json"
print(data_dir)  # project/data/raw
```

### Path Properties

```python
from pathlib import Path

path = Path("/home/alice/projects/report.final.pdf")

print(path.name)      # report.final.pdf
print(path.stem)      # report.final
print(path.suffix)    # .pdf
print(path.suffixes)  # ['.final', '.pdf']
print(path.parent)    # /home/alice/projects
print(path.parts)     # ('/', 'home', 'alice', 'projects', 'report.final.pdf')
```

### Changing Path Components

```python
from pathlib import Path

original = Path("data/report.txt")
csv_version = original.with_suffix(".csv")    # data/report.csv
renamed = original.with_name("summary.txt")   # data/summary.txt
numbered = original.with_stem("report_v2")    # data/report_v2.txt
```

### Checking Existence and Type

```python
from pathlib import Path

path = Path("data/results.csv")
print(path.exists())
print(path.is_file())
print(path.is_dir())

if path.exists():
    print(f"Size: {path.stat().st_size} bytes")
```

### Listing Directory Contents and Globbing

```python
from pathlib import Path

project = Path("project")

# List all items
for item in project.iterdir():
    kind = "DIR" if item.is_dir() else "FILE"
    print(f"  [{kind}] {item.name}")

# Find files matching a pattern
for csv_file in project.glob("*.csv"):
    print(f"CSV: {csv_file}")

# Recursive glob — search all subdirectories
for py_file in project.glob("**/*.py"):
    print(f"Python: {py_file}")
```

### Reading and Writing with Path Objects

```python
from pathlib import Path

config_path = Path("config") / "settings.txt"
config_path.write_text("debug=true\n", encoding="utf-8")
content = config_path.read_text(encoding="utf-8")

# Path objects also work with open()
with open(config_path, "a", encoding="utf-8") as f:
    f.write("verbose=false\n")
```

## Creating Directories

### With `os`

```python
import os
os.mkdir("new_folder")
os.makedirs("path/to/deep/folder", exist_ok=True)
```

### With `pathlib`

```python
from pathlib import Path

Path("new_folder").mkdir(exist_ok=True)
Path("path/to/deep/folder").mkdir(parents=True, exist_ok=True)
```

A common pattern — ensure output directories exist before writing:

```python
from pathlib import Path

output_dir = Path("results") / "2024"
output_dir.mkdir(parents=True, exist_ok=True)
(output_dir / "summary.txt").write_text("Done.\n", encoding="utf-8")
```

## Cross-Platform Path Handling

`pathlib` handles platform differences automatically:

```python
from pathlib import Path

config = Path("config") / "app" / "settings.json"
# Linux:   config/app/settings.json
# Windows: config\app\settings.json

home = Path.home()  # /home/alice or C:\Users\Alice
app_config = home / ".myapp" / "config.json"
```

## Using `__file__` for Script Location

When your script needs files relative to its own location (not the working directory), use `__file__`:

```python
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent

data_file = SCRIPT_DIR / "data" / "defaults.json"
config_file = SCRIPT_DIR / "config.ini"

# Works regardless of WHERE you run the script from:
#   cd /tmp && python /home/alice/project/main.py
#   → SCRIPT_DIR is still /home/alice/project
```

A practical pattern for distributable scripts:

```python
from pathlib import Path
import json

SCRIPT_DIR = Path(__file__).resolve().parent
TEMPLATES_DIR = SCRIPT_DIR / "templates"

def load_template(name):
    template_path = TEMPLATES_DIR / name
    if not template_path.exists():
        raise FileNotFoundError(f"Template not found: {template_path}")
    return template_path.read_text(encoding="utf-8")
```

## Putting It All Together

A practical file organizer using many path operations:

```python
from pathlib import Path
from datetime import datetime

def organize_files(source_dir, dest_dir):
    """Organize files by extension into subdirectories."""
    source = Path(source_dir)
    dest = Path(dest_dir)

    if not source.is_dir():
        print(f"Source not found: {source}")
        return

    moved = 0
    for file_path in source.iterdir():
        if not file_path.is_file():
            continue

        ext = file_path.suffix.lower()
        if ext in (".jpg", ".png", ".gif"):
            category = "images"
        elif ext in (".txt", ".md", ".pdf"):
            category = "documents"
        elif ext in (".py", ".js", ".html"):
            category = "code"
        else:
            category = "other"

        category_dir = dest / category
        category_dir.mkdir(parents=True, exist_ok=True)
        dest_path = category_dir / file_path.name

        if dest_path.exists():
            ts = datetime.now().strftime("%Y%m%d_%H%M%S")
            dest_path = category_dir / f"{file_path.stem}_{ts}{file_path.suffix}"

        file_path.rename(dest_path)
        moved += 1

    print(f"Organized {moved} files into {dest}")
```

## Try It Yourself

1. **Directory Tree**: Write `print_tree(directory, indent=0)` that prints a visual tree of all files and directories with indentation for nesting depth.

2. **Extension Counter**: Scan a directory recursively and count files per extension. Print a summary sorted by count.

3. **Duplicate Finder**: Walk a directory recursively and find files with the same name. Print each group of duplicates.

4. **Project Scaffolder**: Create a function that builds a standard project structure (`src/`, `tests/`, `docs/`, `data/`) with starter files.

## Key Takeaways

- **Never concatenate paths with `+`** — use `os.path.join()` or `pathlib.Path` with `/` for cross-platform compatibility.
- **`pathlib.Path` is the modern approach** with intuitive properties: `.name`, `.stem`, `.suffix`, `.parent`.
- **Use `.glob("**/*.ext")`** for recursive file searching instead of manual directory walking.
- **Create directories with `exist_ok=True`** to avoid errors when they already exist.
- **Use `Path(__file__).resolve().parent`** to find files relative to your script's location.
- **`os.path` remains valid** in older codebases — know both, prefer `pathlib` for new code.
- **`resolve()`** converts relative to absolute; **`.parts`** breaks a path into components.
