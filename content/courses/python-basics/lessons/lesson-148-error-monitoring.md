---
id: lesson-148-error-monitoring
title: "Error Logging with the Logging Module"
chapterId: ch11-error-handling
order: 9
duration: 30
objectives:
  - Understand why logging is better than print() for error tracking
  - Use the logging module with different log levels
  - Format and direct log output to files and console
  - Log exceptions properly using exc_info and logging.exception()
---

# Error Logging with the Logging Module

When you first start writing Python, `print()` is your go-to debugging tool. You scatter print statements throughout your code to see what's happening. But as your programs grow, print statements become a mess — they clutter output, can't be turned off easily, and disappear when the program ends. Python's built-in `logging` module solves all of these problems.

## Why Logging Beats print()

Consider this common approach:

```python
def process_data(filename):
    print(f"Starting to process {filename}")  # debugging
    data = load_file(filename)
    print(f"Loaded {len(data)} records")  # debugging
    result = transform(data)
    print(f"Done processing")  # debugging
    return result
```

This has several problems:

- **No severity levels** — you can't distinguish informational messages from errors
- **No timestamps** — you don't know when things happened
- **No easy way to turn off** — you have to delete or comment out every print
- **No file output** — messages vanish when the terminal closes
- **Mixed with real output** — debugging prints mix with output your users need

The `logging` module fixes every one of these issues.

## Getting Started with logging

The simplest way to start logging:

```python
import logging

logging.basicConfig(level=logging.DEBUG)

logging.debug("This is a debug message")
logging.info("Program started successfully")
logging.warning("Disk space is getting low")
logging.error("Failed to open configuration file")
logging.critical("Database connection lost — shutting down")
```

Output:

```
DEBUG:root:This is a debug message
INFO:root:Program started successfully
WARNING:root:Disk space is getting low
ERROR:root:Failed to open configuration file
CRITICAL:root:Database connection lost — shutting down
```

Each message automatically includes the severity level and the logger name (`root` by default).

## Understanding Log Levels

Python's logging module defines five standard levels, in order of increasing severity:

| Level      | Value | When to Use                                      |
|------------|-------|--------------------------------------------------|
| `DEBUG`    | 10    | Detailed info for diagnosing problems             |
| `INFO`     | 20    | Confirmation that things are working as expected  |
| `WARNING`  | 30    | Something unexpected happened, but program works  |
| `ERROR`    | 40    | A serious problem — some functionality failed     |
| `CRITICAL` | 50    | A fatal error — the program may not continue      |

The key insight: when you set a logging level, only messages at that level **and above** are shown. This lets you control verbosity without changing your code:

```python
import logging

# During development — see everything
logging.basicConfig(level=logging.DEBUG)

# In production — only warnings and above
# logging.basicConfig(level=logging.WARNING)

logging.debug("Variable x = 42")        # shown only at DEBUG level
logging.info("User logged in")          # shown at DEBUG and INFO
logging.warning("Slow database query")  # shown at DEBUG, INFO, and WARNING
logging.error("File not found")         # shown at all levels except CRITICAL-only
```

## Formatting Log Messages

The default format is minimal. You'll usually want timestamps and other details:

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

logging.info("Application started")
logging.warning("Config file not found, using defaults")
```

Output:

```
2025-03-15 14:30:22 - INFO - Application started
2025-03-15 14:30:22 - WARNING - Config file not found, using defaults
```

Common format fields:

| Field            | Description                        |
|------------------|------------------------------------|
| `%(asctime)s`    | Human-readable timestamp           |
| `%(levelname)s`  | Level name (DEBUG, INFO, etc.)     |
| `%(message)s`    | The log message                    |
| `%(filename)s`   | Source file name                   |
| `%(lineno)d`     | Line number in source              |
| `%(funcName)s`   | Function name                      |
| `%(name)s`       | Logger name                        |

A more detailed format for debugging:

```python
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(filename)s:%(lineno)d - %(message)s"
)
```

This produces output like:

```
2025-03-15 14:30:22 [ERROR] processor.py:45 - Failed to parse record
```

## Logging to Files

Sending logs to a file is a one-line change:

```python
import logging

logging.basicConfig(
    filename="app.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logging.info("This goes to the file, not the console")
logging.error("Errors are saved too")
```

To log to **both** a file and the console, add a stream handler:

```python
import logging

# Set up file logging
logging.basicConfig(
    filename="app.log",
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# Also log to console
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.WARNING)  # console only shows warnings+
console_handler.setFormatter(
    logging.Formatter("%(levelname)s - %(message)s")
)
logging.getLogger().addHandler(console_handler)

logging.debug("Only in the file")
logging.warning("In both file and console")
```

This is a common pattern: verbose logging to a file for later analysis, but only important messages on screen.

## Using Logger Objects

For anything beyond a simple script, create named loggers instead of using the root logger:

```python
import logging

# Create a named logger
logger = logging.getLogger("myapp.data")
logger.setLevel(logging.DEBUG)

# Add a handler
handler = logging.StreamHandler()
handler.setFormatter(logging.Formatter("%(name)s - %(levelname)s - %(message)s"))
logger.addHandler(handler)

logger.info("Processing data file")
logger.error("Invalid data format")
```

Output:

```
myapp.data - INFO - Processing data file
myapp.data - ERROR - Invalid data format
```

Named loggers let you identify which module produced each message and configure different modules independently. A common pattern uses `__name__` so each module gets its own logger:

```python
# In file: data_processor.py
import logging

logger = logging.getLogger(__name__)

def process(filename):
    logger.info(f"Processing {filename}")
    # ... processing logic ...
    logger.debug(f"Processed 150 records from {filename}")
```

## Logging Exceptions

When you catch an exception, you want the full traceback in your logs. There are two ways:

### Using exc_info=True

```python
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)

try:
    result = 10 / 0
except ZeroDivisionError:
    logger.error("Calculation failed", exc_info=True)
```

Output:

```
ERROR:__main__:Calculation failed
Traceback (most recent call last):
  File "example.py", line 7, in <module>
    result = 10 / 0
ZeroDivisionError: division by zero
```

### Using logging.exception()

This is a shortcut that automatically logs at ERROR level with the traceback:

```python
try:
    data = open("missing_file.txt").read()
except FileNotFoundError:
    logger.exception("Could not load data file")
```

`logger.exception()` is equivalent to `logger.error(..., exc_info=True)` — it's just shorter. **Only call it inside an except block**, since it needs an active exception to report.

### Logging and Re-raising

Sometimes you want to log an error but still let it propagate:

```python
import json

def load_config(path):
    try:
        with open(path) as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        logger.exception(f"Failed to load config from {path}")
        raise  # re-raise so the caller can handle it too
```

## When to Use Each Level

**Rules of thumb:**

- **DEBUG**: Variable values, function entry/exit — anything that helps trace execution
- **INFO**: Successful operations, milestones — things you'd want in a production log
- **WARNING**: Unusual situations that aren't errors yet — fallback to defaults, low disk space
- **ERROR**: Something failed, but the program continues — a file couldn't be read
- **CRITICAL**: The program cannot continue — required config missing, database unreachable

## Practical Example: A File Processor with Logging

```python
import logging
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S"
)
logger = logging.getLogger("file_processor")

def process_files(directory):
    logger.info(f"Scanning directory: {directory}")

    if not os.path.isdir(directory):
        logger.error(f"Directory not found: {directory}")
        return []

    results = []
    files = os.listdir(directory)
    logger.info(f"Found {len(files)} files")

    for filename in files:
        filepath = os.path.join(directory, filename)

        if not filename.endswith(".txt"):
            logger.debug(f"Skipping non-txt file: {filename}")
            continue

        try:
            with open(filepath) as f:
                content = f.read()
            word_count = len(content.split())
            logger.info(f"Processed {filename}: {word_count} words")
            results.append({"file": filename, "words": word_count})
        except PermissionError:
            logger.warning(f"Permission denied: {filename}, skipping")
        except Exception:
            logger.exception(f"Unexpected error processing {filename}")

    logger.info(f"Processing complete: {len(results)} files processed")
    return results

if __name__ == "__main__":
    process_files("./documents")
```

## Try It Yourself

1. **Basic logging**: Replace all `print()` statements in one of your scripts with appropriate logging calls. Set up `basicConfig` and choose the right log level for each message.

2. **Dual output**: Configure logging so that DEBUG and above goes to a file called `debug.log`, but only ERROR and above appears on the console.

3. **Module loggers**: Create two Python files that each use `logging.getLogger(__name__)`. Import one from the other and observe how the logger names help you trace which module produced each message.

4. **Exception logging**: Write a function that reads a JSON file and logs any errors with full tracebacks using `logger.exception()`. Test it with a missing file and a file with invalid JSON.

## Key Takeaways

- **Use logging instead of print()** — it gives you levels, timestamps, file output, and easy on/off control.
- **Five levels exist for a reason** — DEBUG, INFO, WARNING, ERROR, and CRITICAL let you filter messages by importance.
- **`basicConfig()` gets you started fast** — set the level, format, and optionally a filename.
- **Named loggers (`getLogger(__name__)`) scale** — each module gets its own logger, and you can control them independently.
- **Always log exceptions with tracebacks** — use `exc_info=True` or `logger.exception()` inside except blocks.
- **Log to files in any real project** — console output disappears, but log files persist for debugging later.
- **Set the right level for deployment** — DEBUG during development, INFO or WARNING in production.
