---
id: lesson-194-creating-modules
title: "Creating Your Own Modules"
chapterId: ch17-modules
order: 3
duration: 25
objectives:
  - Create custom Python modules with functions, classes, and variables
  - Understand and use the if __name__ == "__main__" pattern
  - Access special module attributes like __file__, __name__, and __doc__
  - Organize code across multiple modules in a project
  - Reload modules during development using importlib
  - Build a practical reusable utility module from scratch
---

# Creating Your Own Modules

You've been importing modules from Python's standard library — now it's time to create your own. Every `.py` file you write is already a module. In this lesson, you'll learn how to design modules intentionally so they're reusable, testable, and well-organized.

## Any `.py` File Is a Module

The moment you save a Python file, it becomes an importable module:

```python
# string_utils.py
def capitalize_words(text):
    """Capitalize the first letter of each word."""
    return " ".join(word.capitalize() for word in text.split())

def reverse_string(text):
    """Reverse a string."""
    return text[::-1]

def count_vowels(text):
    """Count vowels in a string."""
    return sum(1 for char in text.lower() if char in "aeiou")

VOWELS = "aeiou"
CONSONANTS = "bcdfghjklmnpqrstvwxyz"
```

Now any other Python file in the same directory can import it:

```python
# main.py
import string_utils

result = string_utils.capitalize_words("hello world")
print(result)  # "Hello World"

count = string_utils.count_vowels("Beautiful day")
print(count)  # 6
```

The module name is the filename without `.py`. The file `string_utils.py` becomes the module `string_utils`.

## Creating a Utility Module

Let's build a practical module step by step. A good module has a clear purpose, a docstring, and well-defined public functions:

```python
# math_utils.py
"""
Mathematical utility functions for common calculations.

This module provides helper functions for statistics,
geometry, and number theory operations.
"""

import math
from typing import Sequence

# Module-level constants
PHI = (1 + math.sqrt(5)) / 2  # Golden ratio
TAU = math.tau                  # 2 * pi


def mean(numbers: Sequence[float]) -> float:
    """Calculate the arithmetic mean of a sequence of numbers."""
    if not numbers:
        raise ValueError("Cannot calculate mean of empty sequence")
    return sum(numbers) / len(numbers)


def median(numbers: Sequence[float]) -> float:
    """Calculate the median of a sequence of numbers."""
    if not numbers:
        raise ValueError("Cannot calculate median of empty sequence")
    sorted_nums = sorted(numbers)
    n = len(sorted_nums)
    mid = n // 2
    if n % 2 == 0:
        return (sorted_nums[mid - 1] + sorted_nums[mid]) / 2
    return sorted_nums[mid]


def is_prime(n: int) -> bool:
    """Check if a number is prime."""
    if n < 2:
        return False
    if n < 4:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True


def circle_area(radius: float) -> float:
    """Calculate the area of a circle given its radius."""
    if radius < 0:
        raise ValueError("Radius cannot be negative")
    return math.pi * radius ** 2


def factorial(n: int) -> int:
    """Calculate n! iteratively."""
    if n < 0:
        raise ValueError("Factorial not defined for negative numbers")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
```

## Importing Your Own Modules

Once you've created a module, importing it works identically to standard library imports:

```python
# app.py — in the same directory as math_utils.py
import math_utils

scores = [85, 92, 78, 95, 88]
print(f"Mean score: {math_utils.mean(scores)}")
print(f"Median score: {math_utils.median(scores)}")
print(f"Golden ratio: {math_utils.PHI}")

# Using from...import
from math_utils import is_prime, circle_area

primes = [n for n in range(100) if is_prime(n)]
print(f"Primes under 100: {primes}")
print(f"Area of circle (r=5): {circle_area(5):.2f}")
```

### Importing from Different Directories

If your module is in a different directory, you need to make Python aware of it:

```
my_project/
├── main.py
├── lib/
│   ├── __init__.py
│   └── math_utils.py
└── helpers/
    ├── __init__.py
    └── string_utils.py
```

```python
# main.py
from lib.math_utils import mean, median
from helpers.string_utils import capitalize_words

# These work because lib/ and helpers/ have __init__.py files
```

## `__name__` and `__main__`: The Most Important Pattern

Every module has a special attribute called `__name__`. Its value depends on how the module is being used:

- If the file is **run directly** (e.g., `python math_utils.py`), `__name__` is set to `"__main__"`
- If the file is **imported** by another module, `__name__` is set to the module name (e.g., `"math_utils"`)

This lets you write code that behaves differently when run directly vs. imported:

```python
# math_utils.py
def mean(numbers):
    return sum(numbers) / len(numbers)

def median(numbers):
    sorted_nums = sorted(numbers)
    n = len(sorted_nums)
    mid = n // 2
    if n % 2 == 0:
        return (sorted_nums[mid - 1] + sorted_nums[mid]) / 2
    return sorted_nums[mid]

# This block ONLY runs when the file is executed directly
if __name__ == "__main__":
    # Test/demo code goes here
    test_data = [10, 20, 30, 40, 50]
    print(f"Mean: {mean(test_data)}")
    print(f"Median: {median(test_data)}")
    print("All tests passed!")
```

```bash
# Running directly — __name__ is "__main__", test code executes
$ python math_utils.py
Mean: 30.0
Median: 30
All tests passed!
```

```python
# Importing — __name__ is "math_utils", test code does NOT execute
import math_utils
print(math_utils.mean([1, 2, 3]))  # 2.0
# The "All tests passed!" message does NOT appear
```

### Why This Pattern Matters

The `if __name__ == "__main__"` pattern is essential because:

1. **Testability** — you can include test/demo code that runs when developing the module but doesn't interfere with importing
2. **Flexibility** — the same file works as both a reusable library and a standalone script
3. **Safety** — importing a module won't trigger unintended side effects

```python
# converter.py
"""Temperature conversion utilities."""

def celsius_to_fahrenheit(c):
    return (c * 9 / 5) + 32

def fahrenheit_to_celsius(f):
    return (f - 32) * 5 / 9

def celsius_to_kelvin(c):
    return c + 273.15

if __name__ == "__main__":
    import sys

    if len(sys.argv) != 3:
        print("Usage: python converter.py <temp> <unit>")
        print("  unit: C, F, or K")
        sys.exit(1)

    temp = float(sys.argv[1])
    unit = sys.argv[2].upper()

    if unit == "C":
        print(f"{temp}°C = {celsius_to_fahrenheit(temp):.1f}°F")
        print(f"{temp}°C = {celsius_to_kelvin(temp):.1f}K")
    elif unit == "F":
        print(f"{temp}°F = {fahrenheit_to_celsius(temp):.1f}°C")
    else:
        print(f"Unknown unit: {unit}")
```

Now `converter.py` works as both a library and a command-line tool:

```bash
$ python converter.py 100 C
100°C = 212.0°F
100°C = 373.15K
```

```python
from converter import celsius_to_fahrenheit
print(celsius_to_fahrenheit(100))  # 212.0
```

## Module-Level Variables and Functions

Everything defined at the top level of a module is accessible when imported:

```python
# config.py
"""Application configuration module."""

# Module-level variables (act like constants)
APP_NAME = "MyApp"
VERSION = "2.1.0"
DEBUG = False
MAX_RETRIES = 3
DATABASE_URL = "sqlite:///app.db"

# Module-level functions
def get_config():
    """Return all configuration as a dictionary."""
    return {
        "app_name": APP_NAME,
        "version": VERSION,
        "debug": DEBUG,
        "max_retries": MAX_RETRIES,
        "database_url": DATABASE_URL,
    }

def is_debug():
    """Check if debug mode is enabled."""
    return DEBUG
```

```python
# app.py
import config

print(f"Starting {config.APP_NAME} v{config.VERSION}")
if config.is_debug():
    print("Debug mode enabled")
```

## Module Docstrings

Every module should have a docstring at the very top explaining its purpose:

```python
# validators.py
"""
Input validation utilities.

This module provides functions for validating common data
formats like email addresses, phone numbers, and URLs.

Example usage:
    from validators import is_valid_email, is_valid_phone

    if is_valid_email("user@example.com"):
        print("Valid email!")
"""

import re

def is_valid_email(email):
    """Validate an email address format."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def is_valid_phone(phone):
    """Validate a US phone number."""
    pattern = r'^\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$'
    return bool(re.match(pattern, phone))
```

You can access a module's docstring via the `__doc__` attribute:

```python
import validators
print(validators.__doc__)
```

## Module Attributes

Every module has several special attributes you can inspect:

```python
import math_utils

# The module's name
print(math_utils.__name__)    # "math_utils"

# The file path of the module
print(math_utils.__file__)    # "/home/user/project/math_utils.py"

# The module's docstring
print(math_utils.__doc__)     # "Mathematical utility functions..."

# The module's namespace (all defined names)
print(dir(math_utils))        # ['PHI', 'TAU', 'circle_area', 'factorial', ...]

# The package the module belongs to (None for standalone modules)
print(math_utils.__package__)  # None or "" for top-level modules
```

The `dir()` function is especially useful for exploring what a module provides:

```python
import json

# List only public names (exclude those starting with _)
public_api = [name for name in dir(json) if not name.startswith("_")]
print(public_api)
# ['JSONDecodeError', 'JSONDecoder', 'JSONEncoder', 'dump', 'dumps', 'load', 'loads', ...]
```

## Reloading Modules

During development, you might change a module and want to reload it without restarting Python. Use `importlib.reload()`:

```python
import importlib
import math_utils

# After making changes to math_utils.py...
importlib.reload(math_utils)

# Now math_utils reflects the latest changes
```

**Important caveats:**

```python
import importlib
import math_utils

# Reload works on the module object
importlib.reload(math_utils)  # This works

# But names imported with "from" are NOT updated!
from math_utils import mean
importlib.reload(math_utils)
# mean still points to the OLD version!
# You'd need to re-import it:
from math_utils import mean  # Now updated
```

In practice, reloading is mainly useful in interactive Python sessions (REPL) and Jupyter notebooks. For normal development, just restart your script.

## Testing Modules Independently

A well-designed module should be testable on its own. The `if __name__ == "__main__"` block is perfect for quick tests:

```python
# text_stats.py
"""Text statistics module."""

def word_count(text):
    """Count words in text."""
    return len(text.split())

def char_count(text, include_spaces=False):
    """Count characters in text."""
    if include_spaces:
        return len(text)
    return len(text.replace(" ", ""))

def sentence_count(text):
    """Count sentences in text (rough estimate)."""
    return text.count(".") + text.count("!") + text.count("?")

def reading_time(text, wpm=200):
    """Estimate reading time in minutes."""
    words = word_count(text)
    return max(1, round(words / wpm))


if __name__ == "__main__":
    # Self-test when run directly
    sample = "Hello world. This is a test! How are you?"

    assert word_count(sample) == 9, f"Expected 9, got {word_count(sample)}"
    assert char_count(sample) == 33
    assert char_count(sample, include_spaces=True) == 41
    assert sentence_count(sample) == 3

    print(f"Word count: {word_count(sample)}")
    print(f"Char count: {char_count(sample)}")
    print(f"Sentences: {sentence_count(sample)}")
    print(f"Reading time: {reading_time(sample)} min")
    print("\n✓ All tests passed!")
```

## Practical Example: Reusable `math_utils` Module

Let's bring it all together with a complete, production-quality module:

```python
# math_utils.py
"""
Mathematical utilities — reusable statistics and number functions.

Provides:
    - Statistical functions: mean, median, mode, standard_deviation
    - Number utilities: is_prime, clamp, fibonacci
    - Geometric calculations: circle_area, distance

Usage:
    from math_utils import mean, median, is_prime

    avg = mean([85, 92, 78])
    mid = median([10, 20, 30, 40])
"""

import math
from collections import Counter

__all__ = [
    "mean", "median", "mode", "standard_deviation",
    "is_prime", "clamp", "fibonacci",
    "circle_area", "distance",
]

# --- Statistics Functions ---

def mean(numbers):
    """Return the arithmetic mean."""
    if not numbers:
        raise ValueError("Cannot compute mean of empty sequence")
    return sum(numbers) / len(numbers)

def median(numbers):
    """Return the median value."""
    if not numbers:
        raise ValueError("Cannot compute median of empty sequence")
    s = sorted(numbers)
    n = len(s)
    mid = n // 2
    return (s[mid - 1] + s[mid]) / 2 if n % 2 == 0 else s[mid]

def mode(numbers):
    """Return the most common value(s)."""
    if not numbers:
        raise ValueError("Cannot compute mode of empty sequence")
    counts = Counter(numbers)
    max_count = max(counts.values())
    return [val for val, cnt in counts.items() if cnt == max_count]

def standard_deviation(numbers):
    """Return the population standard deviation."""
    avg = mean(numbers)
    variance = sum((x - avg) ** 2 for x in numbers) / len(numbers)
    return math.sqrt(variance)

# --- Number Utilities ---

def is_prime(n):
    """Check if n is a prime number."""
    if n < 2:
        return False
    if n < 4:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

def clamp(value, minimum, maximum):
    """Restrict value to the range [minimum, maximum]."""
    return max(minimum, min(maximum, value))

def fibonacci(n):
    """Return a list of the first n Fibonacci numbers."""
    if n <= 0:
        return []
    fibs = [0, 1]
    while len(fibs) < n:
        fibs.append(fibs[-1] + fibs[-2])
    return fibs[:n]

# --- Geometry ---

def circle_area(radius):
    """Calculate circle area from radius."""
    return math.pi * radius ** 2

def distance(point1, point2):
    """Calculate Euclidean distance between two 2D points."""
    return math.sqrt((point2[0] - point1[0])**2 + (point2[1] - point1[1])**2)


if __name__ == "__main__":
    data = [4, 8, 15, 16, 23, 42]
    print(f"Data: {data}")
    print(f"Mean: {mean(data):.2f}")
    print(f"Median: {median(data):.2f}")
    print(f"Mode: {mode(data)}")
    print(f"Std Dev: {standard_deviation(data):.2f}")
    print(f"\nPrimes under 30: {[n for n in range(30) if is_prime(n)]}")
    print(f"Fibonacci(10): {fibonacci(10)}")
    print(f"Circle area (r=5): {circle_area(5):.2f}")
    print(f"Distance (0,0)→(3,4): {distance((0,0), (3,4)):.2f}")
```

## Try It Yourself

### Exercise 1: Create a Validation Module

Create a file called `validators.py` with at least three validation functions. Include a module docstring, type hints, and a `__main__` test block.

### Exercise 2: Build a Config Module

Create a `config.py` that stores application settings as module-level variables, with a `get_all()` function that returns them as a dict and a `display()` function that prints them formatted.

### Exercise 3: Module Inspector

Write a script that imports a module by name and prints a formatted report:

```python
import importlib

def inspect_module(module_name):
    mod = importlib.import_module(module_name)
    print(f"Module: {mod.__name__}")
    print(f"File: {getattr(mod, '__file__', 'built-in')}")
    print(f"Doc: {(mod.__doc__ or 'No docstring').strip()[:100]}")

    public = [n for n in dir(mod) if not n.startswith("_")]
    funcs = [n for n in public if callable(getattr(mod, n))]
    non_funcs = [n for n in public if not callable(getattr(mod, n))]

    print(f"\nFunctions ({len(funcs)}):")
    for name in funcs:
        print(f"  {name}")
    print(f"\nVariables/Constants ({len(non_funcs)}):")
    for name in non_funcs:
        print(f"  {name} = {getattr(mod, name)!r}")

if __name__ == "__main__":
    inspect_module("json")
```

## Key Takeaways

- **Every `.py` file is a module** — the filename (without `.py`) is the module name, and everything defined inside is importable.
- **Design modules with a clear purpose** — each module should have one responsibility, a docstring, and a well-defined public API.
- **The `if __name__ == "__main__"` pattern** is essential — it lets a file work as both a reusable module and a standalone script by guarding code that should only run when executed directly.
- **Module-level variables** act as configuration or constants and are accessible by any file that imports the module.
- **Module attributes** like `__name__`, `__file__`, and `__doc__` let you introspect modules at runtime, which is useful for debugging and documentation.
- **Use `importlib.reload()`** to reload modules during interactive development, but remember that `from...import` bindings won't update automatically.
- **Define `__all__`** to explicitly declare which names are part of your module's public API.
- Always include a **module docstring** and **function docstrings** so users can understand your module via `help()`.
