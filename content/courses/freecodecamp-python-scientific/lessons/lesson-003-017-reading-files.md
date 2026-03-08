---
id: lesson-003-017
title: Reading Files
chapterId: chapter-03
order: 17
duration: 15
objectives:
  - Open and read files using open() and the with statement
  - Understand file modes for reading, writing, and appending
  - Read file content line by line for efficient processing
  - Handle FileNotFoundError gracefully
---

# Reading Files

## Why Read Files?

Most real-world programs work with data stored in files — configuration files, datasets, logs, user data, and more. Python makes file operations straightforward with the built-in `open()` function.

## Opening a File

The `open()` function takes a filename and a **mode** string:

| Mode | Description |
|------|-------------|
| `'r'` | Read (default) — file must exist |
| `'w'` | Write — creates file or **overwrites** existing content |
| `'a'` | Append — adds to end of file, creates if not exists |
| `'r+'` | Read and write |

```python
# Open a file for reading
file = open("data.txt", "r")
content = file.read()
print(content)
file.close()    # Always close the file when done
```

## The `with` Statement (Recommended)

The `with` statement automatically closes the file when the block finishes, even if an error occurs. This is the **preferred way** to work with files:

```python
with open("data.txt", "r") as file:
    content = file.read()
    print(content)
# File is automatically closed here
```

Always use `with` — it prevents resource leaks and makes your code cleaner.

## Reading Methods

### `read()` — Read Entire File

Reads the complete file content as a single string:

```python
with open("data.txt", "r") as file:
    content = file.read()
    print(len(content), "characters")
```

This works well for small files but can use a lot of memory for large files.

### `readline()` — Read One Line

Reads a single line (including the newline character `\n`):

```python
with open("data.txt", "r") as file:
    first_line = file.readline()
    second_line = file.readline()
    print("Line 1:", first_line.strip())
    print("Line 2:", second_line.strip())
```

### `readlines()` — Read All Lines into a List

Returns a list where each element is a line from the file:

```python
with open("data.txt", "r") as file:
    lines = file.readlines()
    print(f"File has {len(lines)} lines.")
    for line in lines:
        print(line.strip())
```

## Reading Line by Line (Most Common)

The most Pythonic and memory-efficient way to process a file is to iterate over it directly:

```python
with open("data.txt", "r") as file:
    for line in file:
        line = line.strip()   # Remove trailing newline
        print(line)
```

This approach reads one line at a time, making it efficient for files of any size.

## Practical Example: Processing a Data File

Suppose you have a file called `scores.txt`:

```
Alice,92
Bob,85
Charlie,78
Diana,96
```

You can read and process it:

```python
total = 0
count = 0

with open("scores.txt", "r") as file:
    for line in file:
        line = line.strip()
        if not line:           # Skip empty lines
            continue
        parts = line.split(",")
        name = parts[0]
        score = int(parts[1])
        total += score
        count += 1
        print(f"{name}: {score}")

if count > 0:
    average = total / count
    print(f"\nClass average: {average:.1f}")
```

**Output:**
```
Alice: 92
Bob: 85
Charlie: 78
Diana: 96

Class average: 87.8
```

## Handling FileNotFoundError

If you try to open a file that does not exist, Python raises a `FileNotFoundError`. Handle it with `try/except`:

```python
filename = input("Enter filename: ")

try:
    with open(filename, "r") as file:
        content = file.read()
        print(content)
except FileNotFoundError:
    print(f"Error: '{filename}' not found.")
    print("Please check the filename and try again.")
```

## Counting Lines, Words, and Characters

```python
def file_stats(filename):
    """Count lines, words, and characters in a file."""
    try:
        with open(filename, "r") as file:
            lines = 0
            words = 0
            chars = 0
            for line in file:
                lines += 1
                words += len(line.split())
                chars += len(line)
        print(f"Lines: {lines}")
        print(f"Words: {words}")
        print(f"Characters: {chars}")
    except FileNotFoundError:
        print(f"File '{filename}' not found.")

file_stats("data.txt")
```

This pattern — opening a file, processing it line by line, and handling errors — is fundamental to working with data in Python.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
