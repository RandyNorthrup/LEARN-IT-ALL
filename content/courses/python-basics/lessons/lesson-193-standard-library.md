---
id: lesson-193-standard-library
title: "Python Standard Library Tour"
chapterId: ch17-modules
order: 2
duration: 35
objectives:
  - Navigate and use key modules from Python's standard library
  - Perform mathematical operations with the math module
  - Generate random values and make random selections using the random module
  - Work with dates, times, and time intervals using the datetime module
  - Access the operating system and system information through os and sys
  - Use advanced collections and functional programming tools from collections, itertools, and functools
---

# Python Standard Library Tour

Python is famous for being a "batteries included" language. This means Python ships with a massive collection of pre-built modules — the **standard library** — covering everything from math and file handling to networking and data compression. You don't need to install anything extra to use them.

In this lesson, we'll tour the modules you'll reach for most often in real-world Python programming.

## The "Batteries Included" Philosophy

The Python standard library contains over 200 modules. Instead of making you hunt for third-party solutions to common problems, Python provides tested, documented, well-maintained tools right out of the box:

```python
# Need to work with JSON? It's built in.
import json

# Need to handle file paths? Built in.
from pathlib import Path

# Need to send emails? Built in.
import smtplib

# Need regular expressions? Built in.
import re
```

You can see every available module in the official docs at [docs.python.org/3/library](https://docs.python.org/3/library/), or list them interactively:

```python
import sys
print(sys.stdlib_module_names)  # Python 3.10+
```

## The `math` Module

The `math` module provides mathematical functions for floating-point arithmetic:

```python
import math

# Constants
print(math.pi)    # 3.141592653589793
print(math.e)     # 2.718281828459045
print(math.tau)   # 6.283185307179586 (2 * pi)
print(math.inf)   # Positive infinity

# Rounding
print(math.ceil(3.2))    # 4  — round UP to nearest integer
print(math.floor(3.8))   # 3  — round DOWN to nearest integer
print(math.trunc(-3.7))  # -3 — truncate toward zero

# Powers and roots
print(math.sqrt(144))    # 12.0
print(math.pow(2, 10))   # 1024.0
print(math.log(100, 10)) # 2.0  — log base 10

# Trigonometry (angles in radians)
angle = math.radians(45)       # Convert degrees to radians
print(math.sin(angle))         # 0.7071067811865476
print(math.cos(angle))         # 0.7071067811865476

# Useful utilities
print(math.gcd(48, 18))        # 6  — greatest common divisor
print(math.factorial(6))       # 720
print(math.isclose(0.1 + 0.2, 0.3))  # True — float comparison!
print(math.comb(10, 3))        # 120 — combinations (10 choose 3)
print(math.perm(10, 3))        # 720 — permutations
```

The `math.isclose()` function is especially valuable — it handles the infamous floating-point precision issue that trips up every programmer at some point.

## The `random` Module

The `random` module generates pseudo-random numbers for simulations, games, and testing:

```python
import random

# Set seed for reproducible results (great for testing)
random.seed(42)

# Random integers
print(random.randint(1, 10))      # Random int from 1 to 10 (inclusive)
print(random.randrange(0, 100, 5)) # Random multiple of 5 from 0 to 95

# Random floats
print(random.random())            # Float between 0.0 and 1.0
print(random.uniform(1.5, 9.5))   # Float between 1.5 and 9.5

# Random selections from sequences
colors = ["red", "green", "blue", "yellow", "purple"]
print(random.choice(colors))      # Pick one random element
print(random.choices(colors, k=3))  # Pick 3 WITH replacement
print(random.sample(colors, k=3))  # Pick 3 WITHOUT replacement

# Shuffle a list in place
deck = list(range(1, 53))
random.shuffle(deck)
print(deck[:5])  # First 5 cards of shuffled deck
```

### Practical Example: Password Generator

```python
import random
import string

def generate_password(length=16):
    """Generate a secure random password."""
    characters = string.ascii_letters + string.digits + string.punctuation
    password = [
        random.choice(string.ascii_uppercase),  # At least one uppercase
        random.choice(string.ascii_lowercase),  # At least one lowercase
        random.choice(string.digits),           # At least one digit
        random.choice(string.punctuation),      # At least one special char
    ]
    # Fill the rest randomly
    password += random.choices(characters, k=length - 4)
    random.shuffle(password)
    return "".join(password)

print(generate_password())     # e.g., "k3!Qm9@xR7#pW2$n"
print(generate_password(24))   # Longer password
```

> **Note:** For real cryptographic purposes, use `secrets` instead of `random`. The `random` module is not cryptographically secure.

## The `datetime` Module

The `datetime` module handles dates, times, and time calculations:

```python
from datetime import date, time, datetime, timedelta

# Current date and time
today = date.today()
now = datetime.now()
print(f"Today: {today}")           # 2026-03-03
print(f"Now: {now}")               # 2026-03-03 14:30:22.123456

# Creating specific dates and times
birthday = date(1990, 6, 15)
meeting = datetime(2026, 3, 15, 14, 30)  # March 15, 2026 at 2:30 PM
alarm = time(7, 30, 0)  # 7:30 AM

# Accessing components
print(f"Year: {today.year}")
print(f"Month: {today.month}")
print(f"Day: {today.day}")
print(f"Weekday: {today.strftime('%A')}")  # "Tuesday"
```

### Formatting and Parsing Dates

```python
from datetime import datetime

now = datetime.now()

# Formatting datetime to string (strftime)
print(now.strftime("%Y-%m-%d"))           # "2026-03-03"
print(now.strftime("%B %d, %Y"))          # "March 03, 2026"
print(now.strftime("%I:%M %p"))           # "02:30 PM"
print(now.strftime("%A, %B %d, %Y"))      # "Tuesday, March 03, 2026"

# Parsing string to datetime (strptime)
date_string = "2026-03-03"
parsed = datetime.strptime(date_string, "%Y-%m-%d")
print(parsed)  # 2026-03-03 00:00:00
```

### Time Arithmetic with `timedelta`

```python
from datetime import datetime, timedelta

now = datetime.now()

# Add or subtract time
tomorrow = now + timedelta(days=1)
next_week = now + timedelta(weeks=1)
two_hours_later = now + timedelta(hours=2)
yesterday = now - timedelta(days=1)

print(f"Tomorrow: {tomorrow.strftime('%Y-%m-%d')}")
print(f"Next week: {next_week.strftime('%Y-%m-%d')}")

# Calculate difference between dates
deadline = datetime(2026, 12, 31)
remaining = deadline - now
print(f"Days until deadline: {remaining.days}")
print(f"Total seconds: {remaining.total_seconds()}")
```

## The `os` Module

The `os` module provides operating system interaction:

```python
import os

# Current working directory
print(os.getcwd())              # /home/user/projects

# List directory contents
files = os.listdir(".")
print(files)                    # ['main.py', 'data', 'README.md']

# Environment variables
home = os.environ.get("HOME", "/home/default")
path = os.environ.get("PATH", "")
print(f"Home directory: {home}")

# Check existence
print(os.path.exists("main.py"))    # True/False
print(os.path.isfile("main.py"))    # True if it's a file
print(os.path.isdir("data"))        # True if it's a directory

# Path manipulation
full_path = os.path.join("home", "user", "documents", "file.txt")
print(full_path)               # home/user/documents/file.txt

directory = os.path.dirname("/home/user/file.txt")
filename = os.path.basename("/home/user/file.txt")
print(f"Dir: {directory}")     # /home/user
print(f"File: {filename}")     # file.txt

# Create directories
os.makedirs("output/reports/2026", exist_ok=True)
```

> **Tip:** For modern path handling, prefer `pathlib.Path` (covered in a different lesson). It provides an object-oriented interface that's cleaner than `os.path`.

## The `sys` Module

The `sys` module gives access to Python interpreter internals:

```python
import sys

# Python version
print(sys.version)           # 3.12.0 (main, Oct 2 2023, ...)
print(sys.version_info)      # sys.version_info(major=3, minor=12, ...)

# Command-line arguments
# Running: python script.py arg1 arg2
print(sys.argv)              # ['script.py', 'arg1', 'arg2']

# Module search path
print(sys.path)              # List of directories Python searches for modules

# Platform information
print(sys.platform)          # 'linux', 'darwin', 'win32'

# Exit the program
# sys.exit(0)   # Exit with status 0 (success)
# sys.exit(1)   # Exit with status 1 (error)

# Memory and recursion
print(sys.getrecursionlimit())  # 1000 (default)
print(sys.getsizeof([1, 2, 3])) # Size in bytes
```

### Practical Example: CLI Script

```python
import sys

def main():
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <filename>", file=sys.stderr)
        sys.exit(1)

    filename = sys.argv[1]
    print(f"Processing: {filename}")

if __name__ == "__main__":
    main()
```

## The `collections` Module

The `collections` module extends Python's built-in container types:

```python
from collections import Counter, defaultdict, deque

# Counter — count occurrences
words = "the cat sat on the mat the cat".split()
word_counts = Counter(words)
print(word_counts)                    # Counter({'the': 3, 'cat': 2, ...})
print(word_counts.most_common(2))     # [('the', 3), ('cat', 2)]

# defaultdict — dict with default values for missing keys
scores = defaultdict(list)
scores["alice"].append(95)
scores["bob"].append(87)
scores["alice"].append(92)
print(dict(scores))  # {'alice': [95, 92], 'bob': [87]}

# You'd get a KeyError with a regular dict unless you checked first

# deque — double-ended queue (fast append/pop on both ends)
queue = deque(["task1", "task2", "task3"])
queue.append("task4")         # Add to right
queue.appendleft("task0")     # Add to left
print(queue.popleft())        # Remove from left: "task0"

# deque with max length — automatically drops oldest items
recent = deque(maxlen=3)
for i in range(5):
    recent.append(i)
print(list(recent))           # [2, 3, 4] — only keeps last 3
```

## The `itertools` Module

The `itertools` module provides memory-efficient tools for working with iterators:

```python
import itertools

# count — infinite counter
counter = itertools.count(start=10, step=5)
print([next(counter) for _ in range(5)])  # [10, 15, 20, 25, 30]

# cycle — repeat a sequence forever
colors = itertools.cycle(["red", "green", "blue"])
print([next(colors) for _ in range(7)])
# ['red', 'green', 'blue', 'red', 'green', 'blue', 'red']

# chain — combine multiple iterables into one
combined = list(itertools.chain([1, 2], [3, 4], [5, 6]))
print(combined)  # [1, 2, 3, 4, 5, 6]

# combinations and permutations
letters = "ABC"
print(list(itertools.combinations(letters, 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'C')]

print(list(itertools.permutations(letters, 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]

# product — Cartesian product
sizes = ["S", "M", "L"]
colors = ["red", "blue"]
variants = list(itertools.product(sizes, colors))
print(variants)
# [('S', 'red'), ('S', 'blue'), ('M', 'red'), ('M', 'blue'), ...]
```

## The `functools` Module

The `functools` module provides higher-order functions and operations on callables:

```python
from functools import reduce, partial, lru_cache

# reduce — apply a function cumulatively
numbers = [1, 2, 3, 4, 5]
total = reduce(lambda a, b: a + b, numbers)
print(total)  # 15

product = reduce(lambda a, b: a * b, numbers)
print(product)  # 120

# partial — create a new function with some arguments pre-filled
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)
print(square(5))  # 25
print(cube(3))    # 27

# lru_cache — automatic memoization (caching)
@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(50))  # 12586269025 — instant with caching!
print(fibonacci.cache_info())
# CacheInfo(hits=48, misses=51, maxsize=128, currsize=51)
```

## The `string` Module

The `string` module provides useful string constants and a template class:

```python
import string

print(string.ascii_letters)    # abcdefghijklmnopqrstuvwxyzABCDEF...
print(string.ascii_lowercase)  # abcdefghijklmnopqrstuvwxyz
print(string.ascii_uppercase)  # ABCDEFGHIJKLMNOPQRSTUVWXYZ
print(string.digits)           # 0123456789
print(string.punctuation)      # !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
print(string.hexdigits)        # 0123456789abcdefABCDEF

# Useful for validation
def is_alphanumeric(text):
    valid_chars = string.ascii_letters + string.digits
    return all(char in valid_chars for char in text)

print(is_alphanumeric("Hello123"))  # True
print(is_alphanumeric("Hello 123")) # False (space)
```

## Try It Yourself

### Exercise 1: Date Calculator

Build a function that calculates important dates:

```python
from datetime import date, timedelta

def date_calculator(birthdate_str):
    """Calculate various dates from a birthdate (YYYY-MM-DD)."""
    birth = date.fromisoformat(birthdate_str)
    today = date.today()

    age_days = (today - birth).days
    age_years = age_days // 365
    next_birthday = birth.replace(year=today.year)
    if next_birthday < today:
        next_birthday = next_birthday.replace(year=today.year + 1)
    days_until = (next_birthday - today).days
    ten_thousand = birth + timedelta(days=10_000)

    print(f"Age: {age_years} years ({age_days:,} days)")
    print(f"Days until next birthday: {days_until}")
    print(f"10,000th day alive: {ten_thousand}")

date_calculator("1990-06-15")
```

### Exercise 2: Word Frequency Analyzer

Use `collections.Counter` to analyze text:

```python
from collections import Counter

def analyze_text(text):
    words = text.lower().split()
    counter = Counter(words)
    print(f"Total words: {len(words)}")
    print(f"Unique words: {len(counter)}")
    print(f"\nTop 5 words:")
    for word, count in counter.most_common(5):
        bar = "#" * count
        print(f"  {word:>12}: {bar} ({count})")

sample = "the quick brown fox jumps over the lazy dog the fox the dog"
analyze_text(sample)
```

### Exercise 3: Random Data Generator

Create a function that generates random test data:

```python
import random
from datetime import date, timedelta

def generate_test_users(count=5):
    first_names = ["Alice", "Bob", "Charlie", "Diana", "Eve"]
    last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones"]
    domains = ["gmail.com", "yahoo.com", "outlook.com"]

    users = []
    for _ in range(count):
        first = random.choice(first_names)
        last = random.choice(last_names)
        age = random.randint(18, 65)
        email = f"{first.lower()}.{last.lower()}@{random.choice(domains)}"
        signup = date.today() - timedelta(days=random.randint(1, 365))
        users.append({
            "name": f"{first} {last}",
            "age": age,
            "email": email,
            "signup_date": signup.isoformat(),
        })
    return users

for user in generate_test_users(3):
    print(user)
```

## Key Takeaways

- Python's standard library is **"batteries included"** — over 200 modules ship with every Python installation.
- The **`math`** module handles mathematical operations like `sqrt`, `ceil`, `floor`, `gcd`, and provides constants like `pi` and `e`.
- The **`random`** module generates pseudo-random numbers, picks random items, and shuffles sequences — use `secrets` for cryptographic needs.
- The **`datetime`** module manages dates, times, and time intervals; use `strftime` to format and `strptime` to parse date strings.
- The **`os`** and **`sys`** modules interact with the operating system and Python interpreter — getting paths, environment variables, and command-line arguments.
- **`collections`** extends built-in containers with `Counter`, `defaultdict`, and `deque` for specialized data handling.
- **`itertools`** provides memory-efficient tools like `chain`, `combinations`, `permutations`, and `product` for working with iterators.
- **`functools`** offers higher-order utilities: `reduce` for cumulative operations, `partial` for pre-filling arguments, and `lru_cache` for automatic memoization.
- Learning the standard library saves time — before installing a third-party package, check if Python already provides what you need.
