---
id: lesson-160-stack-traces
title: Understanding Stack Traces
chapterId: ch12-testing
order: 6
duration: 30
objectives:
  - Understand what a call stack is and how Python tracks function calls
  - Read and interpret Python tracebacks step by step
  - Recognize common error types and their typical tracebacks
  - Navigate tracebacks from nested function calls
  - Understand chained exceptions and exception context
  - Use the traceback module for programmatic inspection
  - Apply debugging strategies based on stack trace information
---

# Understanding Stack Traces

## What Is a Call Stack?

Every time Python calls a function, it places a **frame** on the **call stack** — a structure that tracks where execution is and where to return when the function finishes. Think of it like a stack of plates: each function call adds a plate, and when it returns, the plate is removed.

```
Call stack while inside inner():

  ┌──────────────┐
  │   inner()    │  ← currently executing
  ├──────────────┤
  │   middle()   │  ← waiting for inner()
  ├──────────────┤
  │   outer()    │  ← waiting for middle()
  ├──────────────┤
  │  <module>    │  ← top-level script
  └──────────────┘
```

When an error occurs inside `inner()`, Python walks back down this stack and reports every function that was in progress. That report is the **stack trace** (or **traceback**).

---

## Anatomy of a Python Traceback

```python
def level1():
    level2()

def level2():
    level3()

def level3():
    result = 10 / 0

level1()
```

Output:

```
Traceback (most recent call last):
  File "script.py", line 10, in <module>
    level1()
  File "script.py", line 2, in level1
    level2()
  File "script.py", line 5, in level2
    level3()
  File "script.py", line 8, in level3
    result = 10 / 0
ZeroDivisionError: division by zero
```

| Part | Meaning |
|------|---------|
| `Traceback (most recent call last):` | The **bottom** entry is the most recent call |
| `File "script.py", line 10, in <module>` | Top-level script called `level1()` |
| `File "script.py", line 8, in level3` | Where the error actually occurred |
| `ZeroDivisionError: division by zero` | Exception **type** and **message** |

### The Golden Rule: Read Bottom to Top

1. **Last line** — *what* went wrong (exception type + message).
2. **Line above** — *where* it happened (file, line, function, code).
3. **Read upward** — *how* execution got there (call chain).

---

## Annotated Example: Tracing a Real Bug

```python
def calculate_average(scores):
    return sum(scores) / len(scores)

def process_student(student):
    avg = calculate_average(student["scores"])
    return f"{student['name']}: {avg:.1f}"

def generate_report(students):
    for student in students:
        print(process_student(student))

students = [
    {"name": "Alice", "scores": [90, 85, 92]},
    {"name": "Bob", "scores": []},  # Empty!
]

generate_report(students)
```

```
Traceback (most recent call last):
  File "report.py", line 16, in <module>
    generate_report(students)
  File "report.py", line 9, in generate_report
    print(process_student(student))
  File "report.py", line 5, in process_student
    avg = calculate_average(student["scores"])
  File "report.py", line 2, in calculate_average
    return sum(scores) / len(scores)
ZeroDivisionError: division by zero
```

**Diagnosis:** Bob's empty scores list → `len([])` is 0 → division by zero. **Fix:**

```python
def calculate_average(scores):
    if not scores:
        return 0.0
    return sum(scores) / len(scores)
```

---

## Common Error Types and Their Tracebacks

### `NameError` — Undefined Variable

```python
print(username)
# NameError: name 'username' is not defined
```
**Cause:** Typo, forgot to define it, or out of scope.

### `TypeError` — Wrong Type

```python
result = "age: " + 25
# TypeError: can only concatenate str (not "int") to str
```
**Fix:** `"age: " + str(25)` or `f"age: {25}"`.

### `ValueError` — Right Type, Wrong Value

```python
number = int("hello")
# ValueError: invalid literal for int() with base 10: 'hello'
```

### `KeyError` — Missing Dictionary Key

```python
data = {"name": "Alice"}
print(data["age"])
# KeyError: 'age'
```
**Fix:** `data.get("age", "unknown")`.

### `IndexError` — Out of Range

```python
items = [10, 20, 30]
print(items[5])
# IndexError: list index out of range
```

### `AttributeError` — Missing Attribute/Method

```python
x = 42
x.append(10)
# AttributeError: 'int' object has no attribute 'append'
```
**Cause:** Variable holds a different type than expected.

### `ImportError` / `ModuleNotFoundError`

```python
import nonexistent_module
# ModuleNotFoundError: No module named 'nonexistent_module'
```

---

## Nested Function Call Traces

```python
def validate_email(email):
    if "@" not in email:
        raise ValueError(f"Invalid email: {email}")

def create_user(name, email):
    validate_email(email)
    return {"name": name, "email": email}

def register(form_data):
    return create_user(form_data["name"], form_data["email"])

register({"name": "Alice", "email": "bad-email"})
```

```
Traceback (most recent call last):
  File "app.py", line 12, in <module>
    register({"name": "Alice", "email": "bad-email"})
  File "app.py", line 10, in register
    return create_user(form_data["name"], form_data["email"])
  File "app.py", line 6, in create_user
    validate_email(email)
  File "app.py", line 3, in validate_email
    raise ValueError(f"Invalid email: {email}")
ValueError: Invalid email: bad-email
```

Read upward: `register()` → `create_user()` → `validate_email()` → error. The root cause is the invalid input data.

---

## Tracebacks in `try`/`except` Blocks

Catching an exception suppresses its traceback:

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Handled!")  # No traceback printed
```

### Printing the Traceback Manually

```python
import traceback

try:
    result = 10 / 0
except ZeroDivisionError:
    print("Error occurred:")
    traceback.print_exc()  # Prints full traceback, program continues
```

### Capturing as a String

```python
import traceback

try:
    result = int("abc")
except ValueError:
    error_text = traceback.format_exc()
    # Log it, send to monitoring, etc.
    print(f"Logged:\n{error_text}")
```

---

## Using the `traceback` Module

| Function | Purpose |
|----------|---------|
| `traceback.print_exc()` | Print current exception traceback to stderr |
| `traceback.format_exc()` | Return traceback as a string |
| `traceback.extract_tb(tb)` | Extract raw frame data as a list |
| `traceback.print_stack()` | Print current call stack (no exception needed) |

```python
import traceback
import sys

try:
    1 / 0
except ZeroDivisionError:
    exc_type, exc_value, exc_tb = sys.exc_info()
    frames = traceback.extract_tb(exc_tb)
    for frame in frames:
        print(f"  {frame.filename}:{frame.lineno} in {frame.name}")
```

---

## Chained Exceptions

### Implicit Chaining (`__context__`)

When a new exception occurs inside an `except` block, Python links both:

```python
try:
    value = int("abc")
except ValueError:
    result = 1 / 0  # New error while handling the first
```

```
Traceback (most recent call last):
  ...
ValueError: invalid literal for int() with base 10: 'abc'

During handling of the above exception, another exception occurred:

  ...
ZeroDivisionError: division by zero
```

### Explicit Chaining (`raise ... from ...`)

```python
def load_config(path):
    try:
        with open(path) as f:
            return f.read()
    except FileNotFoundError as e:
        raise RuntimeError(f"Cannot load config from {path}") from e
```

Output shows both exceptions linked with "The above exception was the direct cause."

### Suppressing the Chain (`from None`)

```python
try:
    open("missing.txt")
except FileNotFoundError:
    raise ValueError("Config file required") from None
    # Only shows ValueError — original is hidden
```

---

## Tracebacks in Multi-Threaded Programs

Each thread has its own call stack. Unhandled exceptions in threads print to stderr but **don't crash the main thread**:

```python
import threading
import traceback

def safe_worker():
    try:
        raise RuntimeError("Thread failed!")
    except Exception:
        traceback.print_exc()  # Log it properly

t = threading.Thread(target=safe_worker)
t.start()
t.join()
print("Main continues")  # Still runs
```

**Best practice:** Always wrap thread targets in try/except.

---

## Debugging Strategies Using Stack Traces

### 1. Reproduce First

Before fixing, make sure you can trigger the exact same traceback consistently.

### 2. Read Bottom-Up

Exception type → where it happened → call chain.

### 3. Distinguish Symptom from Root Cause

```python
def get_user(user_id):
    users = load_users()     # Returns None if DB fails
    return users[user_id]    # TypeError: 'NoneType' is not subscriptable
# Error is here, but root cause is load_users() returning None
```

### 4. Add Diagnostic Prints

```python
def process(data):
    print(f"DEBUG: data={data}, type={type(data)}")
    return data["key"]
```

### 5. Use Assertions

```python
def divide(a, b):
    assert b != 0, f"Divisor cannot be zero (got b={b})"
    return a / b
```

---

## Common Traceback Patterns

| Pattern | Likely Cause |
|---------|-------------|
| `TypeError: 'NoneType' object is not ...` | Function returned `None` (forgot `return`?) |
| `RecursionError: maximum recursion depth` | Infinite recursion — bad base case |
| `TypeError: func() takes 2 ... but 3 were given` | Wrong argument count |
| `FileNotFoundError` | Wrong path or missing file |
| `SyntaxError` | Typo, missing colon, unmatched parens |

### The `NoneType` Pattern

```python
def find_student(name):
    students = {"alice": 95, "bob": 87}
    if name in students:
        return students[name]
    # No return for the else case → returns None

grade = find_student("charlie")
print(grade.upper())  # AttributeError: 'NoneType' has no attribute 'upper'
```

**Fix:** Return a value in all paths, or check for `None` before using the result.

---

## How IDEs Display Tracebacks

- **VS Code** makes file paths and line numbers **clickable** — click to jump to the error.
- **PyCharm** colors tracebacks and shows local variables per frame.
- **Jupyter Notebooks** display rich tracebacks with syntax-highlighted code.

When working in a terminal, use the file and line info to navigate:

```
File "src/utils/parser.py", line 42, in parse_input
```

→ Open `src/utils/parser.py`, go to line 42.

---

## Try It Yourself

1. **Traceback reading:** Write code that causes `NameError`, `TypeError`, and `KeyError`. Read each traceback and identify the line and cause.
2. **Error logger:** Create a decorator that wraps any function in try/except, logs the traceback to a file, and re-raises.
3. **Chained exception:** Demonstrate explicit chaining with `raise ... from ...`.
4. **Safe caller:** Write `safe_call(func, *args)` that catches any exception, prints a formatted report, and returns `None`.

---

## Key Takeaways

- A **traceback** shows the chain of function calls leading to an error — read it **bottom to top**.
- The **last line** gives the exception type and message; the **line above** shows where it happened.
- Recognize common exceptions: `NameError`, `TypeError`, `ValueError`, `KeyError`, `IndexError`, `AttributeError`.
- **Chained exceptions** preserve context when one error triggers another.
- Use the **`traceback` module** (`print_exc()`, `format_exc()`) to capture and log tracebacks programmatically.
- The **root cause** may be several frames above the exception — trace upward to find it.
- In **multi-threaded** programs, always wrap thread targets in try/except.
- Modern **IDEs** make tracebacks clickable for instant navigation.
- Debug workflow: **reproduce** → **read bottom-up** → **distinguish symptom from cause** → **add diagnostics**.
