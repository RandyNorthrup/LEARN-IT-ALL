---
id: 67-stack-traces
title: Understanding Stack Traces
chapterId: ch12-testing
order: 8
duration: 20
objectives:
  - Read and understand stack traces
  - Navigate through error traces
  - Find the root cause of errors
  - Debug nested function calls
  - Use stack traces effectively
---

# Understanding Stack Traces

## Introduction

Stack traces show the sequence of function calls that led to an error. Learning to read them is essential for debugging.

## Basic Stack Trace

```python
def level1():
    level2()

def level2():
    level3()

def level3():
    result = 10 / 0  # Error occurs here

level1()

# Output:
"""
Traceback (most recent call last):
  File "script.py", line 9, in <module>
    level1()
  File "script.py", line 2, in level1
    level2()
  File "script.py", line 5, in level2
    level3()
  File "script.py", line 8, in level3
    result = 10 / 0
ZeroDivisionError: division by zero
"""
```

## Reading Stack Traces

```python
# Stack trace anatomy:
# 1. "Traceback (most recent call last):" - Header
# 2. Call chain (bottom is most recent)
# 3. Error type and message at bottom

def calculate(x, y):
    return x / y

def process(a, b):
    result = calculate(a, b)
    return result

process(10, 0)

# Read from BOTTOM to TOP:
# 1. ZeroDivisionError: division by zero
# 2. Error in calculate() at line X
# 3. Called from process() at line Y
# 4. Called from main at line Z
```

## Nested Function Calls

```python
def outer():
    print("Outer started")
    middle()
    print("Outer finished")

def middle():
    print("Middle started")
    inner()
    print("Middle finished")

def inner():
    print("Inner started")
    raise ValueError("Something went wrong!")

outer()

# Stack trace shows call chain:
# outer() -> middle() -> inner() -> ValueError
```

## Finding the Root Cause

```python
def process_data(data):
    clean_data = clean(data)
    return transform(clean_data)

def clean(data):
    return [x.strip().lower() for x in data]

def transform(data):
    return [x.upper() for x in data]  # Error here!

# If data contains non-strings:
process_data([123, "hello"])

# Stack trace points to line in transform()
# But root cause is in process_data() passing wrong type
```

## Multiple Exceptions

```python
def divide_all(numbers):
    results = []
    for i, num in enumerate(numbers):
        try:
            result = 10 / num
            results.append(result)
        except ZeroDivisionError:
            print(f"Error at index {i}: Cannot divide by zero")
    return results

divide_all([2, 0, 5, 0, 10])
# Shows which iterations failed
```

## Exception Context

```python
def load_config():
    try:
        with open("config.json") as f:
            return f.read()
    except FileNotFoundError:
        raise ValueError("Config file not found!") from None
        # "from None" suppresses original traceback

# Or keep context:
def load_config_with_context():
    try:
        with open("config.json") as f:
            return f.read()
    except FileNotFoundError as e:
        raise ValueError("Config file not found!") from e
        # Shows both exceptions
```

## Summary

**Reading Stack Traces:**
1. Read from bottom to top
2. Find error type and message
3. Locate where error occurred
4. Trace back through call chain
5. Identify root cause

**Key Points:**
- Stack traces show function call sequence
- Bottom = most recent call
- Top = original call
- Error type and message at bottom
- Line numbers point to exact location

## Next Steps

You've completed Testing & Debugging! Next, you'll learn about how computers work.
