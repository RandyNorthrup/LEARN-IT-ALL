---
id: lesson-186-file-reading
title: "Reading Files in Python"
chapterId: ch16-file-io
order: 1
duration: 30
objectives:
  - Open and close files safely using Python's built-in open() function
  - Use the with statement as a context manager for automatic resource cleanup
  - Read file contents using read(), readline(), and readlines() methods
  - Iterate over files line by line for memory-efficient processing
  - Handle common file reading errors like FileNotFoundError
  - Specify character encodings when reading text files
---

# Reading Files in Python

Reading files is one of the most fundamental skills in programming. Whether you're processing log files, loading configuration data, or analyzing text, understanding how to read files efficiently and safely is essential. Python provides a clean, intuitive interface for file operations that makes working with files straightforward.

## Opening Files with `open()`

Python's built-in `open()` function is the gateway to file operations. Pass it a filename and it returns a **file object** you can use to read data.

```python
file = open("example.txt")
content = file.read()
print(content)
file.close()  # Always close when done!
```

The function accepts several important parameters:

```python
open(file, mode='r', encoding=None, errors=None)
```

When reading, you'll primarily use two modes:

| Mode | Description |
|------|-------------|
| `'r'` | Read text (default mode) |
| `'rb'` | Read binary data (images, PDFs, etc.) |

## The `with` Statement: Safe File Handling

Forgetting to close a file can lead to resource leaks and data corruption. The `with` statement **automatically closes the file** when the block exits, even if an exception occurs.

```python
# The recommended way to work with files
with open("example.txt", "r") as file:
    content = file.read()
    print(content)
# File is automatically closed here

# Without 'with' — risky and verbose
file = open("example.txt", "r")
try:
    content = file.read()
finally:
    file.close()
```

The `with` statement should be your **default approach** every time you work with files.

## Reading Entire Files with `read()`

The `read()` method loads the entire file content into a single string. Perfect for small to medium-sized files.

```python
with open("poem.txt", "r") as file:
    content = file.read()
    print(f"File length: {len(content)} characters")
```

You can also read a specific number of characters:

```python
with open("poem.txt", "r") as file:
    beginning = file.read(100)  # First 100 characters
    more = file.read(50)        # Next 50 characters
```

Each call picks up where the last one left off. The file object maintains an internal **position pointer**. Use `tell()` to check position and `seek(0)` to jump back to the start.

## Reading One Line at a Time with `readline()`

The `readline()` method reads a single line, including the trailing newline character `\n`.

```python
with open("tasks.txt", "r") as file:
    line_number = 0
    while True:
        line = file.readline()
        if not line:  # Empty string means end of file
            break
        line_number += 1
        print(f"Line {line_number}: {line.rstrip()}")
```

The `rstrip()` call removes the trailing newline so your output is clean.

## Reading All Lines with `readlines()`

The `readlines()` method reads all lines and returns them as a **list of strings**, each including the trailing newline.

```python
with open("shopping.txt", "r") as file:
    lines = file.readlines()

print(f"File has {len(lines)} lines")

# Access specific lines by index
last_line = lines[-1].strip()
every_other = lines[::2]
```

## Iterating Over Files Line by Line

The most Pythonic and **memory-efficient** way to process a file is to iterate over the file object directly. Python reads one line at a time, so even enormous files won't overwhelm memory.

```python
with open("server.log", "r") as file:
    for line in file:
        if "ERROR" in line:
            print(line.strip())
```

This approach is excellent for log files and data pipelines:

```python
line_count = 0
word_count = 0
char_count = 0

with open("document.txt", "r") as file:
    for line in file:
        line_count += 1
        word_count += len(line.split())
        char_count += len(line)

print(f"Lines: {line_count}, Words: {word_count}, Characters: {char_count}")
```

## Reading Large Files Efficiently

For files that are hundreds of megabytes or larger, avoid loading everything into memory.

**Process line by line** — iteration is inherently memory-efficient:

```python
error_count = 0
with open("huge_log.txt", "r") as file:
    for line in file:
        if "CRITICAL" in line:
            error_count += 1
print(f"Found {error_count} critical errors")
```

**Read in fixed-size chunks** for binary files or precise control:

```python
def read_in_chunks(file_path, chunk_size=8192):
    with open(file_path, "r") as file:
        while True:
            chunk = file.read(chunk_size)
            if not chunk:
                break
            yield chunk
```

## Specifying Character Encoding

Text files can use different character encodings. Always specify encoding explicitly to avoid platform-dependent surprises.

```python
# Explicitly specify UTF-8 (recommended)
with open("international.txt", "r", encoding="utf-8") as file:
    content = file.read()

# Handle encoding errors gracefully
with open("messy_data.txt", "r", encoding="utf-8", errors="replace") as file:
    content = file.read()  # Bad bytes replaced with the � character
```

| `errors` Value | Behavior |
|----------------|----------|
| `'strict'` | Raise an error (default) |
| `'replace'` | Replace bad characters with `�` |
| `'ignore'` | Skip undecodable characters |

## Handling Common Errors

File operations are error-prone. Always anticipate problems:

```python
file_path = "config.txt"

try:
    with open(file_path, "r", encoding="utf-8") as file:
        config = file.read()
except FileNotFoundError:
    print(f"Error: '{file_path}' not found.")
    config = ""
except PermissionError:
    print(f"Error: No permission to read '{file_path}'.")
    config = ""
except OSError as e:
    print(f"Error reading file: {e}")
    config = ""
```

The try/except approach is preferred over checking `os.path.exists()` first because it avoids **race conditions**.

## Practical Examples

### Reading a Configuration File

```python
def read_config(file_path):
    """Read a simple key=value config file, ignoring comments."""
    config = {}
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            for line_num, line in enumerate(file, start=1):
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" in line:
                    key, value = line.split("=", 1)
                    config[key.strip()] = value.strip()
    except FileNotFoundError:
        print(f"Config file not found: {file_path}")
    return config

settings = read_config("app.conf")
print(settings.get("database_host", "localhost"))
```

### Searching Through Log Files

```python
def search_logs(log_path, keyword):
    """Search log files for entries matching a keyword."""
    matches = []
    try:
        with open(log_path, "r", encoding="utf-8") as file:
            for line in file:
                if keyword.lower() in line.lower():
                    matches.append(line.strip())
    except FileNotFoundError:
        print(f"Log file not found: {log_path}")
    print(f"Found {len(matches)} matches for '{keyword}'")
    return matches
```

## Try It Yourself

1. **Line Counter**: Write a program that reads a file and prints each line with its line number. Handle the case where the file does not exist.

2. **Word Frequency**: Read a text file and count how many times each word appears. Print the top 10 most frequent words using a dictionary and `str.lower()`.

3. **File Head**: Write a function `head(filename, n=10)` that prints the first `n` lines of a file, similar to the Unix `head` command.

4. **Grep Clone**: Write a function `grep(filename, pattern)` that prints all lines containing the given pattern string, with line numbers.

## Key Takeaways

- **Always use `with` statements** when opening files — they ensure proper cleanup even if errors occur.
- **`read()`** loads the entire file into memory — convenient for small files but dangerous for large ones.
- **`readline()`** reads one line at a time for fine-grained control.
- **`readlines()`** returns all lines as a list, useful for random access to lines.
- **Iterating directly** over a file object (`for line in file`) is the most memory-efficient approach.
- **Specify encoding explicitly** (typically `encoding="utf-8"`) to avoid platform-dependent surprises.
- **Handle errors with try/except** — use `FileNotFoundError` and `PermissionError` for helpful messages.
- For **large files**, process line by line or in chunks rather than loading everything at once.
