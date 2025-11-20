---
id: "149-context-managers"
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
# Context managers implement __enter__ and __exit__
class FileManager:
    """Simple file context manager"""
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        """Called when entering 'with' block"""
        print(f"Opening {self.filename}")
        self.file = open(self.filename, self.mode)
        return self.file  # Returned to 'as' variable
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """
        Called when exiting 'with' block.
        
        Args:
            exc_type: Exception type (or None)
            exc_val: Exception value (or None)
            exc_tb: Exception traceback (or None)
        
        Returns:
            True to suppress exception, False to propagate
        """
        print(f"Closing {self.filename}")
        if self.file:
            self.file.close()
        
        if exc_type:
            print(f"Exception occurred: {exc_val}")
        
        return False  # Don't suppress exceptions

# Usage
with FileManager("test.txt", "w") as f:
    f.write("Hello!")
# File automatically closed
```

## Custom Context Managers

```python
# Timer context manager
import time

class Timer:
    """Measure execution time"""
    def __enter__(self):
        self.start = time.time()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end = time.time()
        self.elapsed = self.end - self.start
        print(f"Elapsed time: {self.elapsed:.4f} seconds")
        return False

# Usage
with Timer():
    # Code to measure
    total = sum(range(1000000))

# Timer with result access
with Timer() as timer:
    result = sum(range(1000000))

print(f"Total time: {timer.elapsed:.4f}s")

# Database transaction context manager
class DatabaseTransaction:
    """Database transaction with auto commit/rollback"""
    def __init__(self, connection):
        self.connection = connection
    
    def __enter__(self):
        print("Beginning transaction")
        self.connection.begin()
        return self.connection
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is None:
            print("Committing transaction")
            self.connection.commit()
        else:
            print(f"Rolling back transaction: {exc_val}")
            self.connection.rollback()
        return False

class MockConnection:
    def begin(self): pass
    def commit(self): print("  -> Committed")
    def rollback(self): print("  -> Rolled back")
    def execute(self, sql): print(f"  -> Executing: {sql}")

# Usage
conn = MockConnection()
with DatabaseTransaction(conn) as db:
    db.execute("INSERT INTO users VALUES (1, 'Alice')")
    db.execute("INSERT INTO users VALUES (2, 'Bob')")
# Auto-commit on success

# With error - auto-rollback
try:
    with DatabaseTransaction(conn) as db:
        db.execute("INSERT INTO users VALUES (3, 'Charlie')")
        raise ValueError("Oops!")
except ValueError:
    pass  # Transaction rolled back

# Temporary directory context manager
import os
import shutil

class TempDirectory:
    """Create and auto-cleanup temporary directory"""
    def __init__(self, prefix="temp_"):
        self.prefix = prefix
        self.path = None
    
    def __enter__(self):
        import tempfile
        self.path = tempfile.mkdtemp(prefix=self.prefix)
        print(f"Created temp directory: {self.path}")
        return self.path
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.path and os.path.exists(self.path):
            shutil.rmtree(self.path)
            print(f"Removed temp directory: {self.path}")
        return False

# Usage
with TempDirectory("myapp_") as tmpdir:
    # Use temporary directory
    file_path = os.path.join(tmpdir, "data.txt")
    with open(file_path, "w") as f:
        f.write("Temporary data")
# Directory automatically deleted
```

## Suppressing Exceptions

```python
# Context manager that suppresses exceptions
class SuppressException:
    """Suppress specific exceptions"""
    def __init__(self, *exception_types):
        self.exception_types = exception_types
    
    def __enter__(self):
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is None:
            return False
        
        # Suppress if exception type matches
        if issubclass(exc_type, self.exception_types):
            print(f"Suppressed {exc_type.__name__}: {exc_val}")
            return True
        
        return False

# Usage
with SuppressException(ValueError, TypeError):
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

# closing() - ensures close() method is called
class MockResource:
    def __init__(self, name):
        self.name = name
    
    def use(self):
        print(f"Using {self.name}")
    
    def close(self):
        print(f"Closing {self.name}")

with closing(MockResource("API")) as resource:
    resource.use()
# close() automatically called

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
import threading

class Lock:
    """Thread lock context manager"""
    def __init__(self):
        self._lock = threading.Lock()
    
    def __enter__(self):
        self._lock.acquire()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self._lock.release()
        return False

lock = Lock()

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

# DON'T: Forget to return False in __exit__ if not suppressing
class BadManager:
    def __exit__(self, *args):
        cleanup()
        # Forgot to return False - might suppress exceptions!

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
