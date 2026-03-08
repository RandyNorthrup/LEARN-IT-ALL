---
id: lesson-142-context-managers
title: "Context Managers and Resource Management"
chapterId: ch11-error-handling
order: 5
duration: 25
objectives:
  - Master context managers with 'with' statement
  - Create custom context managers
  - Understand resource management
  - Use contextlib utilities
---

# Context Managers and Resource Management

Context managers provide automatic resource cleanup using the `with` statement.

## The 'with' Statement

```python
# Without context manager - manual cleanup
file = open("data.txt", "w")
try:
    file.write("Hello, World!")
finally:
    file.close()  # Must remember to close

# With context manager - automatic cleanup
with open("data.txt", "w") as file:
    file.write("Hello, World!")
# File automatically closed, even if exception occurs

# Multiple resources
with open("input.txt") as infile, \
     open("output.txt", "w") as outfile:
    content = infile.read()
    outfile.write(content.upper())
# Both files automatically closed

# Nested context managers
with open("data1.txt") as f1:
    with open("data2.txt") as f2:
        # Both files open
        combined = f1.read() + f2.read()
# Both files closed
```

## How Context Managers Work

```python
# The @contextmanager decorator lets you write context managers as
# generator functions. Code before 'yield' runs on entry, and code
# after 'yield' runs on exit (even if an exception occurs).
from contextlib import contextmanager

@contextmanager
def file_manager(filename, mode):
    """Simple file context manager"""
    # Setup: runs when entering 'with' block
    print(f"Opening {filename}")
    f = open(filename, mode)
    
    try:
        yield f  # Provide the resource to the 'with' block
    except Exception as exc:
        print(f"Exception occurred: {exc}")
        raise  # Re-raise the exception (don't suppress it)
    finally:
        # Cleanup: always runs when exiting 'with' block
        print(f"Closing {filename}")
        f.close()

# Usage
with file_manager("test.txt", "w") as f:
    f.write("Hello!")
# File automatically closed
```

## Custom Context Managers

```python
# Timer context manager
import time
from contextlib import contextmanager

@contextmanager
def timer():
    """Measure execution time"""
    info = {"start": time.time(), "elapsed": 0}
    try:
        yield info
    finally:
        info["end"] = time.time()
        info["elapsed"] = info["end"] - info["start"]
        print(f"Elapsed time: {info['elapsed']:.4f} seconds")

# Usage
with timer():
    # Code to measure
    total = sum(range(1000000))

# Timer with result access
with timer() as t:
    result = sum(range(1000000))

print(f"Total time: {t['elapsed']:.4f}s")

# Database transaction context manager
from types import SimpleNamespace

@contextmanager
def database_transaction(connection):
    """Database transaction with auto commit/rollback"""
    print("Beginning transaction")
    connection.begin()
    try:
        yield connection
    except Exception as e:
        print(f"Rolling back transaction: {e}")
        connection.rollback()
        raise
    else:
        print("Committing transaction")
        connection.commit()

def make_mock_connection():
    """Create a mock database connection"""
    return SimpleNamespace(
        begin=lambda: None,
        commit=lambda: print("  -> Committed"),
        rollback=lambda: print("  -> Rolled back"),
        execute=lambda sql: print(f"  -> Executing: {sql}"),
    )

# Usage
conn = make_mock_connection()
with database_transaction(conn) as db:
    db.execute("INSERT INTO users VALUES (1, 'Alice')")
    db.execute("INSERT INTO users VALUES (2, 'Bob')")
# Auto-commit on success

# With error - auto-rollback
try:
    with database_transaction(conn) as db:
        db.execute("INSERT INTO users VALUES (3, 'Charlie')")
        raise ValueError("Oops!")
except ValueError:
    pass  # Transaction rolled back

# Temporary directory context manager
import os
import shutil

@contextmanager
def temp_directory(prefix="temp_"):
    """Create and auto-cleanup temporary directory"""
    import tempfile
    path = tempfile.mkdtemp(prefix=prefix)
    print(f"Created temp directory: {path}")
    try:
        yield path
    finally:
        if os.path.exists(path):
            shutil.rmtree(path)
            print(f"Removed temp directory: {path}")

# Usage
with temp_directory("myapp_") as tmpdir:
    # Use temporary directory
    file_path = os.path.join(tmpdir, "data.txt")
    with open(file_path, "w") as f:
        f.write("Temporary data")
# Directory automatically deleted
```

## Suppressing Exceptions

```python
# Context manager that suppresses exceptions
from contextlib import contextmanager

@contextmanager
def suppress_exception(*exception_types):
    """Suppress specific exceptions"""
    try:
        yield
    except exception_types as e:
        print(f"Suppressed {type(e).__name__}: {e}")

# Usage
with suppress_exception(ValueError, TypeError):
    result = int("not a number")  # ValueError suppressed
    print("This won't execute")

print("Continues after suppression")

# Standard library version
from contextlib import suppress

with suppress(FileNotFoundError):
    with open("missing.txt") as f:
        content = f.read()

print("File not found, but we continue")

# Suppress multiple exception types
with suppress(ValueError, KeyError, IndexError):
    data = {"name": "Alice"}
    value = data["age"]  # KeyError suppressed
    number = int("abc")  # ValueError suppressed
```

## contextlib Utilities

```python
from contextlib import contextmanager, closing, redirect_stdout
import sys
from io import StringIO

# @contextmanager decorator for generator-based context managers
@contextmanager
def managed_resource(name):
    """Simple context manager using generator"""
    print(f"Acquiring {name}")
    resource = f"Resource:{name}"
    
    try:
        yield resource  # Provide resource to 'with' block
    finally:
        print(f"Releasing {name}")

# Usage
with managed_resource("Database") as db:
    print(f"Using {db}")
# Automatic cleanup

# @contextmanager with exception handling
@contextmanager
def error_handler(operation_name):
    """Handle errors in context"""
    print(f"Starting {operation_name}")
    try:
        yield
    except Exception as e:
        print(f"Error in {operation_name}: {e}")
        raise
    finally:
        print(f"Finished {operation_name}")

# Usage
with error_handler("data processing"):
    data = [1, 2, 3]
    total = sum(data)

# closing() - ensures close() is called on objects that have it.
# Useful for objects that support close() but aren't context managers.
import io

buffer = io.StringIO("Hello from buffer")
with closing(buffer) as resource:
    content = resource.read()
    print(f"Read: {content}")
# buffer.close() automatically called

# redirect_stdout - capture stdout
output = StringIO()
with redirect_stdout(output):
    print("This goes to StringIO")
    print("Not to console")

captured = output.getvalue()
print(f"Captured: {captured}")

# redirect_stderr
from contextlib import redirect_stderr

errors = StringIO()
with redirect_stderr(errors):
    sys.stderr.write("Error message\n")

error_output = errors.getvalue()
print(f"Errors: {error_output}")
```

## Nested Context Managers

```python
# Managing multiple resources
@contextmanager
def file_processor(input_file, output_file):
    """Process files with automatic cleanup"""
    infile = None
    outfile = None
    
    try:
        infile = open(input_file, 'r')
        outfile = open(output_file, 'w')
        yield infile, outfile
    finally:
        if infile:
            infile.close()
        if outfile:
            outfile.close()

# Usage
# with file_processor("input.txt", "output.txt") as (inf, outf):
#     content = inf.read()
#     outf.write(content.upper())

# ExitStack for dynamic context managers
from contextlib import ExitStack

def process_multiple_files(filenames):
    """Open and process multiple files"""
    with ExitStack() as stack:
        files = [stack.enter_context(open(fname)) for fname in filenames]
        
        # All files now open
        for f in files:
            print(f.read()[:50])  # Read first 50 chars
        
        # All files automatically closed

# Usage
# process_multiple_files(["file1.txt", "file2.txt", "file3.txt"])

# Conditional context managers with ExitStack
def process_with_optional_logging(data, log_file=None):
    """Process with optional logging"""
    with ExitStack() as stack:
        # Only open log if provided
        log = None
        if log_file:
            log = stack.enter_context(open(log_file, 'a'))
        
        # Process data
        result = sum(data)
        
        if log:
            log.write(f"Processed {len(data)} items, result: {result}\n")
        
        return result

# Usage
result1 = process_with_optional_logging([1, 2, 3])
# result2 = process_with_optional_logging([4, 5, 6], "log.txt")
```

## Real-World Context Managers

```python
# Lock context manager
# Python's threading.Lock() is already a context manager!
import threading

lock = threading.Lock()

def thread_safe_operation():
    with lock:
        # Critical section - only one thread at a time
        print("Doing thread-safe work")

# Changed directory context manager
@contextmanager
def change_directory(path):
    """Temporarily change working directory"""
    original = os.getcwd()
    try:
        os.chdir(path)
        yield
    finally:
        os.chdir(original)

# Usage
print(f"Original: {os.getcwd()}")
# with change_directory("/tmp"):
#     print(f"Changed to: {os.getcwd()}")
print(f"Back to: {os.getcwd()}")

# Environment variable context manager
@contextmanager
def environment_variable(name, value):
    """Temporarily set environment variable"""
    original = os.environ.get(name)
    
    try:
        os.environ[name] = value
        yield
    finally:
        if original is None:
            os.environ.pop(name, None)
        else:
            os.environ[name] = original

# Usage
# with environment_variable("DEBUG", "1"):
#     print(f"DEBUG={os.environ.get('DEBUG')}")
# print(f"DEBUG={os.environ.get('DEBUG')}")

# Profiler context manager
import cProfile
import pstats

@contextmanager
def profile_code():
    """Profile code execution"""
    profiler = cProfile.Profile()
    profiler.enable()
    
    try:
        yield profiler
    finally:
        profiler.disable()
        stats = pstats.Stats(profiler)
        stats.sort_stats('cumulative')
        print("\nProfile Results:")
        stats.print_stats(10)

# Usage
# with profile_code():
#     # Code to profile
#     result = sum(range(100000))
```

## Exception Handling in Context Managers

```python
# Logging exceptions in context manager
@contextmanager
def logged_operation(name):
    """Log operation with exception details"""
    print(f"Starting: {name}")
    
    try:
        yield
        print(f"Success: {name}")
    except Exception as e:
        print(f"Failed: {name} - {e}")
        raise  # Re-raise after logging
    finally:
        print(f"Cleanup: {name}")

# Usage
try:
    with logged_operation("Database update"):
        raise ValueError("Update failed")
except ValueError:
    pass

# Retrying context manager
@contextmanager
def retry_context(max_attempts=3):
    """Context manager with retry logic"""
    attempt = 0
    
    while attempt < max_attempts:
        attempt += 1
        try:
            yield attempt
            break  # Success
        except Exception as e:
            if attempt == max_attempts:
                print(f"Failed after {max_attempts} attempts")
                raise
            print(f"Attempt {attempt} failed: {e}")

# Usage
with retry_context(max_attempts=3) as attempt:
    if attempt < 3:
        raise ValueError("Not yet")
    print("Success!")
```

## Best Practices

```python
# DO: Use context managers for resource cleanup
with open("file.txt") as f:
    content = f.read()

# DO: Create reusable context managers
@contextmanager
def timing(label):
    start = time.time()
    yield
    elapsed = time.time() - start
    print(f"{label}: {elapsed:.4f}s")

# DO: Handle exceptions appropriately
@contextmanager
def safe_operation():
    try:
        yield
    except Exception as e:
        print(f"Error: {e}")
        # Decide whether to suppress or re-raise

# DON'T: Swallow exceptions in context managers
@contextmanager
def bad_manager():
    try:
        yield
    except Exception:
        cleanup()
        # BUG: forgot to re-raise — exceptions are silently swallowed!

# DO: Use ExitStack for dynamic resources
with ExitStack() as stack:
    resources = [stack.enter_context(get_resource(i)) for i in range(n)]

# DO: Use contextlib.suppress for expected exceptions
with suppress(FileNotFoundError):
    os.remove("optional_file.txt")
```

## Summary

**Context Managers:**
- Automatic resource cleanup with `with` statement
- Implement `__enter__` and `__exit__` methods
- `__exit__` returns True to suppress exceptions

**Creating Context Managers:**
- Class-based: implement `__enter__` and `__exit__`
- Decorator-based: use `@contextmanager`
- Use `contextlib` utilities

**Common Patterns:**
- File operations
- Database transactions
- Locks and synchronization
- Temporary resources
- Directory/environment changes
- Exception suppression

**Best Practices:**
- Always use context managers for resources
- Return False from `__exit__` unless suppressing
- Use `@contextmanager` for simple cases
- Use `ExitStack` for dynamic resources
- Handle exceptions appropriately
- Clean up even if exceptions occur
