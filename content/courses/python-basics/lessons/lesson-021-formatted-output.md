---
id: 47-formatted-output
title: Formatted Output and Print Options
chapterId: ch2-variables
order: 8
duration: 20
objectives:
  - Master print() function options
  - Control output formatting
  - Use sep and end parameters
  - Print to files
  - Understand output buffering
---

# Formatted Output and Print Options

## Introduction

The `print()` function has many options beyond just displaying text. You can control spacing, line endings, output destinations, and more.

## Basic Print Syntax

```python
# Simple print
print("Hello, World!")

# Multiple arguments
print("Name:", "Alice", "Age:", 25)
# Name: Alice Age: 25
```

## The sep Parameter

Control how multiple arguments are separated:

```python
# Default separator is space
print("apple", "banana", "cherry")
# apple banana cherry

# Custom separator: comma
print("apple", "banana", "cherry", sep=", ")
# apple, banana, cherry

# Separator: pipe
print("Name", "Age", "City", sep=" | ")
# Name | Age | City

# No separator
print("a", "b", "c", sep="")
# abc

# Newline separator
print("Item 1", "Item 2", "Item 3", sep="\n")
# Item 1
# Item 2
# Item 3
```

## The end Parameter

Control what's printed at the end:

```python
# Default end is newline (\n)
print("Line 1")
print("Line 2")
# Line 1
# Line 2

# Custom end: space instead of newline
print("Hello", end=" ")
print("World")
# Hello World

# No newline (empty string)
print("Loading", end="")
print("...", end="")
print("Done!")
# Loading...Done!

# Custom ending
print("First", end=" | ")
print("Second", end=" | ")
print("Third")
# First | Second | Third
```

## Practical Examples

### Example 1: Progress Indicator

```python
# Loading animation (simplified)
import time

for i in range(5):
    print(".", end="", flush=True)
    time.sleep(0.5)
print(" Done!")
# ..... Done!
```

### Example 2: CSV-like Output

```python
# Create CSV-style output
print("Name", "Age", "City", sep=",")
print("Alice", 25, "New York", sep=",")
print("Bob", 30, "Chicago", sep=",")
# Name,Age,City
# Alice,25,New York
# Bob,30,Chicago
```

### Example 3: Aligned Table

```python
# Table with custom separators
print("Name", "Score", "Grade", sep=" | ")
print("-" * 30)
print("Alice", "95", "A", sep=" | ")
print("Bob", "87", "B", sep=" | ")
# Name | Score | Grade
# ------------------------------
# Alice | 95 | A
# Bob | 87 | B
```

### Example 4: Countdown

```python
# Countdown without newlines
import time

for i in range(5, 0, -1):
    print(f"\r{i} ", end="", flush=True)
    time.sleep(1)
print("\rGo!")
# Displays: 5 4 3 2 1 Go! (updating same line)
```

## Print to Files

Redirect output to a file:

```python
# Write to file
with open("output.txt", "w") as f:
    print("Hello, File!", file=f)
    print("Line 2", file=f)

# Append to file
with open("log.txt", "a") as f:
    print("Log entry", file=f)

# Print to both console and file
message = "Important message"
print(message)  # To console
with open("log.txt", "a") as f:
    print(message, file=f)  # To file
```

## The flush Parameter

Control output buffering:

```python
# Default: output is buffered
print("Buffered output")

# Immediate output (flush buffer)
print("Immediate output", flush=True)

# Useful for progress indicators
import time
for i in range(5):
    print(f"Step {i}", flush=True)
    time.sleep(1)  # Output shows immediately
```

## Formatted Tables

```python
# Create aligned table
def print_table(data):
    # Header
    print(f"{'Name':<15} {'Age':>5} {'City':<12}")
    print("-" * 35)
    
    # Rows
    for name, age, city in data:
        print(f"{name:<15} {age:>5} {city:<12}")

# Usage
people = [
    ("Alice", 25, "New York"),
    ("Bob", 30, "Chicago"),
    ("Charlie", 35, "Boston")
]
print_table(people)
```

## Multi-line Output

```python
# Triple quotes for multi-line
message = """
Welcome to Python!
This is a multi-line message.
It preserves formatting.
"""
print(message)

# Using \n for newlines
print("Line 1\nLine 2\nLine 3")

# Multiple print statements
print("First line")
print("Second line")
print("Third line")
```

## Suppressing Output

```python
# Normal print
print("This will show")

# Suppress by printing nothing
print(end="")  # Prints nothing, not even newline

# Conditional print
debug = False
if debug:
    print("Debug message")

# Using None (prints "None")
print(None)  # None

# Empty string (prints newline only)
print("")  # (blank line)
```

## Print Formatting Tricks

```python
# Repeat characters
print("=" * 50)  # 50 equal signs

# Center text
title = "Python Course"
print(f"{title:^50}")  # Centers in 50 chars

# Progress bar
def progress_bar(percent):
    bar_length = 40
    filled = int(bar_length * percent)
    bar = "█" * filled + "░" * (bar_length - filled)
    print(f"[{bar}] {percent:.0%}", end="\r")

# Usage
progress_bar(0.75)  # [██████████████████████████████░░░░░░░░░░] 75%
```

## Combining Parameters

```python
# Multiple parameters together
print("Name", "Age", "City", sep=" | ", end=" <-\n")
# Name | Age | City <-

# Print to file with custom separator
with open("data.csv", "w") as f:
    print("Name", "Age", "City", sep=",", file=f)
    print("Alice", "25", "New York", sep=",", file=f)

# No newline, custom separator, flush
for i in range(5):
    print(i, end=" | ", flush=True)
# 0 | 1 | 2 | 3 | 4 |
```

## Common Print Patterns

```python
# Pattern 1: List items on one line
items = ["apple", "banana", "cherry"]
print(*items, sep=", ")
# apple, banana, cherry

# Pattern 2: Dictionary key-value pairs
data = {"name": "Alice", "age": 25, "city": "NYC"}
for key, value in data.items():
    print(f"{key}: {value}")

# Pattern 3: Numbered list
tasks = ["Buy milk", "Call Bob", "Finish report"]
for i, task in enumerate(tasks, 1):
    print(f"{i}. {task}")

# Pattern 4: Boxed text
def print_box(text):
    print("+" + "-" * (len(text) + 2) + "+")
    print(f"| {text} |")
    print("+" + "-" * (len(text) + 2) + "+")

print_box("Hello, World!")
# +----------------+
# | Hello, World! |
# +----------------+
```

## Output Redirection

```python
import sys

# Print to standard error
print("Error message", file=sys.stderr)

# Print to standard output (default)
print("Normal message", file=sys.stdout)

# Capture print output
from io import StringIO
output = StringIO()
print("Captured", file=output)
content = output.getvalue()
print(f"Content was: {content}")
```

## Debugging Prints

```python
# Variable inspection
x = 42
y = "hello"
print(f"{x = }, {y = }")  # x = 42, y = 'hello'

# Function return value
def calculate():
    return 42

result = calculate()
print(f"{result = }")  # result = 42

# Quick debug separator
print("\n" + "=" * 50 + " DEBUG " + "=" * 50)
print("Variable values here...")
print("=" * 107 + "\n")
```

## Performance Note

```python
# String concatenation in loop (SLOW)
result = ""
for i in range(1000):
    result += str(i) + "\n"
print(result)

# Multiple prints (FASTER)
for i in range(1000):
    print(i)

# Best: join list (FASTEST for string building)
result = "\n".join(str(i) for i in range(1000))
print(result)
```

## Summary

- **print()**: Outputs text to console or file
- **sep**: Controls separator between arguments (default: space)
- **end**: Controls ending character (default: newline `\n`)
- **file**: Redirects output to file object
- **flush**: Forces immediate output (bypasses buffer)
- **Multiple args**: `print(a, b, c)` auto-separates with spaces
- **Unpacking**: `print(*list)` unpacks list items
- **Format strings**: Use f-strings for complex formatting

## Next Steps

Next, you'll learn about variable scope basics and how Python manages variable lifetime.
