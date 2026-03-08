---
id: lesson-150-advanced-error-patterns
title: "Error Handling Patterns and Best Practices"
chapterId: ch11-error-handling
order: 11
duration: 30
objectives:
  - Compare LBYL and EAFP approaches to error handling
  - Apply guard clauses, retry logic, and validation patterns
  - Use context managers for reliable resource cleanup
  - Recognize and avoid common error handling anti-patterns
---

# Error Handling Patterns and Best Practices

Knowing the syntax of `try`/`except` is just the beginning. Writing *good* error handling means knowing *when* to catch, *what* to catch, and *how* to structure your code so errors don't become a bigger problem than the original failure. This lesson covers the practical patterns and best practices that experienced Python developers rely on every day.

## LBYL vs EAFP

Python has two competing philosophies for dealing with potential errors:

### Look Before You Leap (LBYL)

Check whether an operation will succeed *before* attempting it:

```python
import os

# LBYL: check first, then act
if os.path.exists(filename):
    with open(filename) as f:
        data = f.read()
else:
    data = ""
```

### Easier to Ask Forgiveness than Permission (EAFP)

Just try the operation and handle the error if it fails:

```python
# EAFP: try it, handle failure
try:
    with open(filename) as f:
        data = f.read()
except FileNotFoundError:
    data = ""
```

**Python strongly favors EAFP.** Here's why:

- **Race conditions** — with LBYL, the file could be deleted between the check and the open
- **Performance** — if the operation usually succeeds, EAFP avoids the overhead of checking
- **Cleaner code** — EAFP often reads more naturally in Python

LBYL makes sense when the check is cheap and failure is *expected* most of the time:

```python
# LBYL makes sense here — checking a key is cheap
if "email" in user_data:
    send_notification(user_data["email"])
```

## Guard Clauses

Guard clauses handle invalid conditions at the top of a function, so the main logic stays clean and unindented:

```python
# Without guard clauses — deeply nested
def process_order(order):
    if order is not None:
        if order.items:
            if order.customer.is_active:
                # finally, the actual logic
                total = sum(item.price for item in order.items)
                return total
            else:
                raise ValueError("Customer account is inactive")
        else:
            raise ValueError("Order has no items")
    else:
        raise ValueError("Order cannot be None")

# With guard clauses — flat and readable
def process_order(order):
    if order is None:
        raise ValueError("Order cannot be None")
    if not order.items:
        raise ValueError("Order has no items")
    if not order.customer.is_active:
        raise ValueError("Customer account is inactive")

    # Main logic — no nesting needed
    total = sum(item.price for item in order.items)
    return total
```

Guard clauses make your code easier to read because each validation is independent and the happy path is obvious.

## Retry Pattern

Some operations fail temporarily — a file might be locked, or a network connection might hiccup. A simple retry can solve these:

```python
import time

def retry(func, max_attempts=3, delay=1.0):
    """Call func() up to max_attempts times, with a delay between retries."""
    last_exception = None

    for attempt in range(1, max_attempts + 1):
        try:
            return func()
        except Exception as e:
            last_exception = e
            if attempt < max_attempts:
                print(f"Attempt {attempt} failed: {e}. Retrying in {delay}s...")
                time.sleep(delay)

    raise last_exception

# Usage
def read_sensor():
    # might fail intermittently
    data = get_sensor_reading()
    return data

try:
    value = retry(read_sensor, max_attempts=3, delay=0.5)
except Exception as e:
    print(f"All retries failed: {e}")
```

**Important**: only retry operations that might succeed on a second attempt. Retrying `int("hello")` will never work.

## Context Managers for Cleanup

The `with` statement ensures cleanup happens even if an error occurs. This is critical for files, database connections, and any resource that must be released:

```python
# Without context manager — cleanup might be skipped on error
f = open("data.txt")
try:
    data = f.read()
    process(data)
finally:
    f.close()

# With context manager — cleanup is guaranteed
with open("data.txt") as f:
    data = f.read()
    process(data)
```

You can create your own with `contextlib`:

```python
from contextlib import contextmanager

@contextmanager
def temporary_file(filename):
    """Create a temp file, yield it, then clean up."""
    import os
    try:
        f = open(filename, "w")
        yield f
    finally:
        f.close()
        os.remove(filename)

with temporary_file("scratch.txt") as f:
    f.write("temporary data")
    # file is automatically closed and deleted after this block
```

## Default Values Pattern

Instead of crashing on missing data, provide sensible defaults:

```python
# Default values
config = {"debug": True, "timeout": 30}
log_level = config.get("log_level", "INFO")  # "INFO" if key missing

# getattr() with default
timeout = getattr(settings, "timeout", 60)  # 60 if attr missing

# or-operator for falsy defaults
username = input("Enter name: ") or "Anonymous"
```

## Validation Pattern: Validate Early, Fail Fast

Catch bad data at the entry point of your program, not deep inside business logic:

```python
def create_user(name: str, age: int, email: str) -> dict:
    # Validate ALL inputs first
    errors = []

    if not name or not name.strip():
        errors.append("Name cannot be empty")
    if not isinstance(age, int) or age < 0 or age > 150:
        errors.append(f"Invalid age: {age}")
    if not email or "@" not in email:
        errors.append(f"Invalid email: {email}")

    if errors:
        raise ValueError(f"Invalid user data: {'; '.join(errors)}")

    # If we get here, data is valid — no error checking needed below
    return {
        "name": name.strip(),
        "age": age,
        "email": email.lower()
    }
```

By validating early:

- Your core logic stays clean with no defensive checks scattered throughout
- Error messages are clear and point to the actual problem
- You avoid partial operations (e.g., writing half a record before discovering invalid data)

## Error Wrapping

When you catch a low-level exception, raise a more meaningful one with context. Python 3 supports exception chaining with `from`:

```python
def load_config(path):
    try:
        with open(path) as f:
            import json
            return json.load(f)
    except FileNotFoundError as e:
        raise RuntimeError(f"Config file not found: {path}") from e
    except json.JSONDecodeError as e:
        raise RuntimeError(f"Invalid JSON in config file: {path}") from e
```

The `from e` preserves the original exception, so you can still see the root cause in the traceback. Using a built-in exception like `RuntimeError` with a descriptive message gives callers a clear, meaningful error while keeping debugging details.

## When NOT to Catch Exceptions

Sometimes the best error handling is **no error handling**. Don't catch exceptions when:

```python
# DON'T catch if you can't do anything useful
def calculate(x, y):
    # Bad — what would you even do with an error here?
    try:
        return x / y
    except ZeroDivisionError:
        return None  # now the caller has a silent None bomb

# DO let it propagate — the caller knows how to respond
def calculate(x, y):
    return x / y  # caller decides what to do with ZeroDivisionError
```

**Let exceptions propagate when:**

- You can't meaningfully recover from the error
- The caller is in a better position to decide what to do
- You'd just be re-raising anyway
- Catching would hide a real bug

## Anti-Patterns to Avoid

### Bare except

```python
# NEVER do this
try:
    do_something()
except:  # catches SystemExit, KeyboardInterrupt, everything
    pass

# At minimum, catch Exception
try:
    do_something()
except Exception:
    pass
```

A bare `except` catches `KeyboardInterrupt` (Ctrl+C) and `SystemExit`, making your program hard to stop.

### Catching Too Broadly

```python
# Bad — hides bugs
try:
    user = find_user(user_id)
    orders = user.get_orders()
    total = sum(o.amount for o in orders)
except Exception:
    total = 0  # was it a typo? a None user? a missing attribute?

# Good — catch specific errors
try:
    user = find_user(user_id)
except UserNotFoundError:
    total = 0
else:
    orders = user.get_orders()
    total = sum(o.amount for o in orders)
```

### Swallowing Errors

```python
# Bad — error disappears silently
try:
    save_to_database(record)
except DatabaseError:
    pass  # hope for the best!

# Good — at least log it
try:
    save_to_database(record)
except DatabaseError as e:
    logger.error(f"Failed to save record: {e}")
    raise  # or handle it properly
```

### Pokemon Exception Handling

```python
# Bad — one giant try block hides which step failed
try:
    config = load_config()
    data = read_file(config.input_path)
    results = process(data)
    save(results, config.output_path)
except Exception as e:
    print(f"Something went wrong: {e}")

# Good — targeted try blocks around risky operations
config = load_config()  # let config errors crash immediately

try:
    data = read_file(config.input_path)
except FileNotFoundError:
    print(f"Input file not found: {config.input_path}")
    sys.exit(1)

results = process(data)  # bugs here should crash, not be caught
```

## Writing Clean Error Messages

Error messages should tell the user **what went wrong** and **what they can do about it**:

```python
# Bad error messages
raise ValueError("invalid input")
raise FileNotFoundError("error")

# Good error messages
raise ValueError(
    f"Age must be between 0 and 150, got {age}"
)
raise FileNotFoundError(
    f"Config file '{path}' not found. "
    f"Create it by copying config.example.json to {path}"
)
```

A good error message answers: **What happened?** and **How do I fix it?**

## Try It Yourself

1. **LBYL vs EAFP**: Write a function `get_nested(data, keys, default=None)` that safely retrieves nested dictionary values like `data["a"]["b"]["c"]` using the EAFP approach.

2. **Guard clauses**: Take a function you've written that has deeply nested if/else blocks and refactor it using guard clauses.

3. **Retry pattern**: Write a `retry_with_backoff()` function where the delay doubles after each attempt (1s, 2s, 4s).

4. **Error wrapping**: Create a `DataLoadError` custom exception. Write a `load_data()` function that wraps `FileNotFoundError`, `json.JSONDecodeError`, and `csv.Error` into your custom exception with helpful messages.

## Key Takeaways

- **Prefer EAFP over LBYL** — in Python, it's usually better to try and handle failure than to check first.
- **Use guard clauses** — validate inputs at the top of functions, then write clean main logic without nesting.
- **Retry only transient failures** — retry network issues, not logic errors.
- **Context managers guarantee cleanup** — use `with` for files, connections, and any resource that needs releasing.
- **Validate early, fail fast** — catch bad data at your program's boundary, not deep in the core logic.
- **Wrap exceptions with `from`** — give callers clean domain errors while preserving the root cause.
- **Don't catch what you can't handle** — let exceptions propagate when the caller is better positioned to respond.
- **Avoid bare except, broad catches, and swallowed errors** — these hide bugs and make debugging miserable.
- **Write actionable error messages** — tell the user what went wrong and how to fix it.
