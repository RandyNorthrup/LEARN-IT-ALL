---
id: "70-memory-optimization"
title: "Memory Optimization and Efficiency"
chapterId: ch2-variables
order: 13
duration: 30
objectives:
  - Understand Python's memory management and object lifecycle
  - Use sys.getsizeof() to measure object memory usage
  - Recognize when objects are shared vs copied in memory
  - Apply techniques to reduce memory footprint
  - Leverage generators and iterators for memory efficiency
  - Understand interning and singleton patterns in Python
---

# Memory Optimization and Efficiency

Understanding how Python manages memory helps you write efficient code, especially when working with large datasets. This lesson explores Python's memory model and techniques for optimizing memory usage.

## Measuring Memory Usage

Use `sys.getsizeof()` to check how much memory an object uses:

```python
import sys

# Basic types memory usage
integer = 42
floating = 3.14
string = "hello"
boolean = True

print(f"int: {sys.getsizeof(integer)} bytes")      # int: 28 bytes
print(f"float: {sys.getsizeof(floating)} bytes")   # float: 24 bytes
print(f"str: {sys.getsizeof(string)} bytes")       # str: 54 bytes
print(f"bool: {sys.getsizeof(boolean)} bytes")     # bool: 28 bytes

# Container memory usage
empty_list = []
small_list = [1, 2, 3]
large_list = list(range(1000))

print(f"Empty list: {sys.getsizeof(empty_list)} bytes")   # Empty list: 56 bytes
print(f"Small list: {sys.getsizeof(small_list)} bytes")   # Small list: 80 bytes
print(f"Large list: {sys.getsizeof(large_list)} bytes")   # Large list: 8056 bytes

# String size grows with length
short_string = "hi"
long_string = "hello" * 100

print(f"Short string: {sys.getsizeof(short_string)} bytes")  # Short string: 51 bytes
print(f"Long string: {sys.getsizeof(long_string)} bytes")    # Long string: 549 bytes
```

## Object Identity and Memory Sharing

Python uses `id()` to show an object's memory address:

```python
# Small integers are cached (typically -5 to 256)
a = 100
b = 100
print(f"a id: {id(a)}")
print(f"b id: {id(b)}")
print(f"Same object? {a is b}")  # True - Python reuses small integers

# Large integers are not cached
x = 1000
y = 1000
print(f"x id: {id(x)}")
print(f"y id: {id(y)}")
print(f"Same object? {x is y}")  # False - separate objects

# Strings are interned (cached) for identifiers
str1 = "hello"
str2 = "hello"
print(f"Same string object? {str1 is str2}")  # True

# Strings with spaces are not automatically interned
str3 = "hello world"
str4 = "hello world"
print(f"Same object? {str3 is str4}")  # May be False

# Lists are never shared
list1 = [1, 2, 3]
list2 = [1, 2, 3]
print(f"Same list? {list1 is list2}")  # False - always separate objects
```

## String Interning

String interning stores only one copy of each distinct string:

```python
import sys

# Automatic interning for identifier-like strings
name1 = "alice"
name2 = "alice"
print(f"Auto-interned: {name1 is name2}")  # True

# Manual interning with sys.intern()
text1 = "hello world"
text2 = "hello world"
print(f"Before intern: {text1 is text2}")  # May be False

text1 = sys.intern(text1)
text2 = sys.intern(text2)
print(f"After intern: {text1 is text2}")   # True

# Use case: Comparing many strings
# Without interning: O(n) string comparison
# With interning: O(1) identity comparison
def find_matches_slow(target, words):
    """Compare strings character by character."""
    matches = []
    for word in words:
        if word == target:  # String comparison (slower)
            matches.append(word)
    return matches

def find_matches_fast(target, words):
    """Compare string identities."""
    # Intern all strings once
    target = sys.intern(target)
    words = [sys.intern(w) for w in words]
    
    matches = []
    for word in words:
        if word is target:  # Identity comparison (faster)
            matches.append(word)
    return matches

# Demo (with large datasets, interning saves time)
words_list = ["apple", "banana", "apple", "cherry", "apple"] * 1000
target_word = "apple"

matches = find_matches_fast(target_word, words_list)
print(f"Found {len(matches)} matches")  # Found 3000 matches
```

## Shallow vs Deep Copy

Understanding copy behavior prevents unexpected memory issues:

```python
import copy

# Assignment creates a reference, not a copy
original = [1, 2, 3]
reference = original
reference.append(4)
print(f"Original: {original}")   # Original: [1, 2, 3, 4]
print(f"Reference: {reference}") # Reference: [1, 2, 3, 4]
print(f"Same object? {original is reference}")  # True

# Shallow copy creates new container, but shares nested objects
original = [[1, 2], [3, 4]]
shallow = original.copy()  # or list(original) or original[:]
shallow[0].append(99)      # Modifies nested list in both

print(f"Original: {original}")  # Original: [[1, 2, 99], [3, 4]]
print(f"Shallow: {shallow}")    # Shallow: [[1, 2, 99], [3, 4]]
print(f"Same object? {original is shallow}")         # False
print(f"Same nested? {original[0] is shallow[0]}")   # True

# Deep copy creates independent copies of everything
original = [[1, 2], [3, 4]]
deep = copy.deepcopy(original)
deep[0].append(99)

print(f"Original: {original}")  # Original: [[1, 2], [3, 4]]
print(f"Deep: {deep}")          # Deep: [[1, 2, 99], [3, 4]]
print(f"Same nested? {original[0] is deep[0]}")  # False
```

## Memory-Efficient Data Structures

Choose the right data structure for memory efficiency:

```python
import sys

# Tuple vs List: Tuples use less memory (immutable)
my_list = [1, 2, 3, 4, 5]
my_tuple = (1, 2, 3, 4, 5)

print(f"List: {sys.getsizeof(my_list)} bytes")    # List: 88 bytes
print(f"Tuple: {sys.getsizeof(my_tuple)} bytes")  # Tuple: 64 bytes

# Set for membership testing (faster and sometimes smaller)
items_list = list(range(10000))
items_set = set(range(10000))

print(f"List: {sys.getsizeof(items_list)} bytes")  # List: 80056 bytes
print(f"Set: {sys.getsizeof(items_set)} bytes")    # Set: 524512 bytes (larger but faster lookups)

# Generators vs Lists: Generators don't store all values
def numbers_list(n):
    """Return list of numbers (stores all in memory)."""
    return [i for i in range(n)]

def numbers_generator(n):
    """Return generator of numbers (stores one at a time)."""
    return (i for i in range(n))

big_list = numbers_list(1000000)
big_gen = numbers_generator(1000000)

print(f"List: {sys.getsizeof(big_list)} bytes")  # List: 8000056 bytes
print(f"Generator: {sys.getsizeof(big_gen)} bytes")  # Generator: 112 bytes

# Use generators for large datasets
def process_large_file_bad(filename):
    """Load entire file into memory."""
    with open(filename) as f:
        lines = f.readlines()  # All lines in memory
    for line in lines:
        process(line)

def process_large_file_good(filename):
    """Process file line by line (memory efficient)."""
    with open(filename) as f:
        for line in f:  # One line at a time
            process(line)
```

## Generator Expressions for Memory Efficiency

```python
import sys

# List comprehension (creates entire list in memory)
squares_list = [x**2 for x in range(1000000)]
print(f"List comprehension: {sys.getsizeof(squares_list)} bytes")
# List comprehension: 8000056 bytes

# Generator expression (creates values on demand)
squares_gen = (x**2 for x in range(1000000))
print(f"Generator expression: {sys.getsizeof(squares_gen)} bytes")
# Generator expression: 112 bytes

# Using generators with sum, max, min
total = sum(x**2 for x in range(1000000))  # Memory efficient
print(f"Sum: {total}")

# Chain generators for complex processing
def read_numbers(filename):
    """Generator to read numbers from file."""
    with open(filename) as f:
        for line in f:
            yield int(line.strip())

def filter_evens(numbers):
    """Generator to filter even numbers."""
    for num in numbers:
        if num % 2 == 0:
            yield num

def square_numbers(numbers):
    """Generator to square numbers."""
    for num in numbers:
        yield num ** 2

# Chained generators - memory efficient pipeline
# numbers = square_numbers(filter_evens(read_numbers('numbers.txt')))
# total = sum(numbers)  # Processes one number at a time
```

## String Concatenation Optimization

```python
import sys

# Inefficient: String concatenation in loop (creates many intermediate strings)
def concat_inefficient(words):
    """Concatenate strings inefficiently."""
    result = ""
    for word in words:
        result += word + " "  # Creates new string each iteration
    return result

# Efficient: Use join() (single allocation)
def concat_efficient(words):
    """Concatenate strings efficiently."""
    return " ".join(words)

words = ["hello"] * 10000

# join() is much faster and more memory efficient
result = concat_efficient(words)
print(f"Result length: {len(result)}")

# For building strings, use list then join
def build_html_inefficient(items):
    """Build HTML inefficiently."""
    html = "<ul>"
    for item in items:
        html += f"<li>{item}</li>"  # Many string creations
    html += "</ul>"
    return html

def build_html_efficient(items):
    """Build HTML efficiently."""
    parts = ["<ul>"]
    for item in items:
        parts.append(f"<li>{item}</li>")
    parts.append("</ul>")
    return "".join(parts)

items = ["Item " + str(i) for i in range(1000)]
html = build_html_efficient(items)
print(f"HTML length: {len(html)}")
```

## Slots for Memory Savings

`__slots__` reduces memory overhead for classes with many instances:

```python
import sys

# Regular class (uses __dict__ for attributes)
class PersonRegular:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# Class with __slots__ (no __dict__, fixed attributes)
class PersonSlots:
    __slots__ = ['name', 'age']
    
    def __init__(self, name, age):
        self.name = name
        self.age = age

# Compare memory usage
regular = PersonRegular("Alice", 30)
slots = PersonSlots("Bob", 25)

print(f"Regular instance: {sys.getsizeof(regular) + sys.getsizeof(regular.__dict__)} bytes")
print(f"Slots instance: {sys.getsizeof(slots)} bytes")

# Create many instances - slots saves significant memory
regular_people = [PersonRegular(f"Person{i}", i) for i in range(10000)]
slots_people = [PersonSlots(f"Person{i}", i) for i in range(10000)]

print(f"10000 regular instances: ~{sys.getsizeof(regular_people[0]) * 10000 / 1024:.1f} KB")
print(f"10000 slots instances: ~{sys.getsizeof(slots_people[0]) * 10000 / 1024:.1f} KB")
```

## Lazy Evaluation

Compute values only when needed:

```python
# Eager evaluation: Compute everything upfront
def calculate_all_eager():
    """Calculate all values immediately."""
    results = []
    for i in range(1000000):
        results.append(expensive_calculation(i))
    return results

def expensive_calculation(n):
    """Simulate expensive operation."""
    return n ** 2

# Lazy evaluation: Compute only what's needed
def calculate_all_lazy():
    """Generate values on demand."""
    for i in range(1000000):
        yield expensive_calculation(i)

# Example: Find first 5 values over threshold
def find_first_five_eager():
    """Eager: Calculates all 1 million values."""
    all_values = calculate_all_eager()
    results = []
    for value in all_values:
        if value > 1000000:
            results.append(value)
            if len(results) == 5:
                break
    return results

def find_first_five_lazy():
    """Lazy: Stops after finding 5."""
    results = []
    for value in calculate_all_lazy():
        if value > 1000000:
            results.append(value)
            if len(results) == 5:
                break  # Stops generating more values
    return results

# Lazy version is much faster - doesn't compute unnecessary values
first_five = find_first_five_lazy()
print(f"First five: {first_five}")
```

## Memory Profiling Best Practices

```python
import sys
from typing import List

def memory_efficient_function(data: List[int]) -> int:
    """
    Calculate sum without storing intermediate results.
    Memory: O(1) - only stores running total
    """
    total = 0
    for value in data:
        total += value
    return total

def memory_inefficient_function(data: List[int]) -> int:
    """
    Calculate sum by storing squared values.
    Memory: O(n) - stores full list of squared values
    """
    squared = [x ** 2 for x in data]
    return sum(squared)

# Efficient version using generator
def memory_efficient_squares(data: List[int]) -> int:
    """
    Calculate sum of squares efficiently.
    Memory: O(1) - generator expression
    """
    return sum(x ** 2 for x in data)

# Test with large dataset
large_data = list(range(1000000))

result1 = memory_efficient_function(large_data)
result2 = memory_efficient_squares(large_data)

print(f"Results: {result1}, {result2}")
```

## Practical Tips

```python
# 1. Reuse objects instead of creating new ones
# Bad: Creates many string objects
def format_numbers_bad(numbers):
    """Create new format string each iteration."""
    results = []
    for num in numbers:
        results.append(f"Value: {num}")
    return results

# Good: Reuse format approach
def format_numbers_good(numbers):
    """Efficient string formatting."""
    return [f"Value: {num}" for num in numbers]

# 2. Use 'in' with sets, not lists, for membership testing
# Bad: O(n) for each lookup
def filter_allowed_bad(items, allowed_list):
    """Check membership in list."""
    return [item for item in items if item in allowed_list]

# Good: O(1) for each lookup
def filter_allowed_good(items, allowed_set):
    """Check membership in set."""
    return [item for item in items if item in allowed_set]

items = list(range(10000))
allowed = set(range(0, 10000, 2))  # Even numbers
filtered = filter_allowed_good(items, allowed)

# 3. Delete large objects when done
large_list = list(range(10000000))
# ... use large_list ...
del large_list  # Explicitly release memory

# 4. Use context managers for resource cleanup
with open('large_file.txt') as f:
    # File automatically closed, memory released
    data = f.read()
# File is closed here
```

## Summary

- **Measure memory**: Use `sys.getsizeof()` to check object sizes
- **Object sharing**: Python caches small integers and strings
- **Generators**: Use for large datasets to save memory
- **String concatenation**: Use `join()` instead of `+=` in loops
- **Data structures**: Choose tuples over lists when possible
- **Slots**: Use `__slots__` for classes with many instances
- **Lazy evaluation**: Compute values only when needed
- **Cleanup**: Delete large objects when done with them

Memory optimization is about choosing the right data structures and patterns. Profile your code, identify bottlenecks, and apply these techniques where they matter most.
