---
id: 51-built-in-functions
title: Python Built-in Functions
chapterId: ch6-functions
order: 7
duration: 30
objectives:
  - Learn commonly used built-in functions
  - Master type conversion functions
  - Use mathematical and sequence functions
  - Understand input/output functions
  - Apply built-in functions effectively
---

# Python Built-in Functions

## Introduction

Python provides 69+ built-in functions that are always available without importing. Let's explore the most useful ones.

## Type Conversion Functions

Convert between data types:

```python
# int() - Convert to integer
print(int("42"))        # 42
print(int(3.14))        # 3 (truncates)
print(int(True))        # 1

# float() - Convert to float
print(float("3.14"))    # 3.14
print(float(42))        # 42.0
print(float(False))     # 0.0

# str() - Convert to string
print(str(42))          # "42"
print(str(3.14))        # "3.14"
print(str([1, 2, 3]))   # "[1, 2, 3]"

# bool() - Convert to boolean
print(bool(0))          # False
print(bool(1))          # True
print(bool(""))         # False
print(bool("hello"))    # True

# list(), tuple(), set(), dict() - Convert to collections
print(list("hello"))    # ['h', 'e', 'l', 'l', 'o']
print(tuple([1, 2, 3])) # (1, 2, 3)
print(set([1, 1, 2, 3])) # {1, 2, 3}
```

## Mathematical Functions

Basic math operations:

```python
# abs() - Absolute value
print(abs(-10))         # 10
print(abs(3.14))        # 3.14
print(abs(-2.5))        # 2.5

# round() - Round to n decimal places
print(round(3.14159))      # 3
print(round(3.14159, 2))   # 3.14
print(round(3.14159, 3))   # 3.142

# pow() - Power (x ** y)
print(pow(2, 3))        # 8 (2^3)
print(pow(5, 2))        # 25 (5^2)
print(pow(2, -1))       # 0.5 (2^-1)

# min() - Minimum value
print(min(5, 2, 9, 1))     # 1
print(min([10, 20, 5]))    # 5
print(min("hello"))        # 'e' (smallest char)

# max() - Maximum value
print(max(5, 2, 9, 1))     # 9
print(max([10, 20, 5]))    # 20
print(max("hello"))        # 'o' (largest char)

# sum() - Sum of iterable
print(sum([1, 2, 3, 4]))   # 10
print(sum((10, 20, 30)))   # 60
print(sum([1, 2, 3], 10))  # 16 (starts at 10)
```

## Sequence Functions

Work with sequences (lists, strings, tuples):

```python
# len() - Length of sequence
print(len("hello"))        # 5
print(len([1, 2, 3]))      # 3
print(len({"a": 1, "b": 2}))  # 2

# sorted() - Return sorted list
print(sorted([3, 1, 4, 1, 5]))     # [1, 1, 3, 4, 5]
print(sorted("python"))            # ['h', 'n', 'o', 'p', 't', 'y']
print(sorted([3, 1, 2], reverse=True))  # [3, 2, 1]

# reversed() - Reverse iterator
print(list(reversed([1, 2, 3])))   # [3, 2, 1]
print(list(reversed("hello")))     # ['o', 'l', 'l', 'e', 'h']

# enumerate() - Index and value pairs
for i, char in enumerate("hello"):
    print(f"{i}: {char}")
# 0: h
# 1: e
# 2: l
# 3: l
# 4: o

# zip() - Combine iterables
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name} is {age}")
# Alice is 25
# Bob is 30
# Charlie is 35

# range() - Sequence of numbers
print(list(range(5)))          # [0, 1, 2, 3, 4]
print(list(range(2, 6)))       # [2, 3, 4, 5]
print(list(range(0, 10, 2)))   # [0, 2, 4, 6, 8]
```

## Logical Functions

Boolean operations:

```python
# all() - True if all elements are truthy
print(all([True, True, True]))   # True
print(all([True, False, True]))  # False
print(all([1, 2, 3]))            # True
print(all([1, 0, 3]))            # False (0 is falsy)
print(all([]))                   # True (empty = True)

# any() - True if any element is truthy
print(any([False, False, True]))  # True
print(any([False, False, False])) # False
print(any([0, 0, 1]))            # True
print(any([]))                   # False (empty = False)
```

## Input/Output Functions

```python
# print() - Output to console
print("Hello")
print("Name:", "Alice", sep=" | ")
print("No newline", end="")

# input() - Get user input (returns string)
# name = input("Enter your name: ")
# print(f"Hello, {name}!")

# format() - Format value
print(format(42, "05d"))      # 00042 (pad with zeros)
print(format(3.14159, ".2f")) # 3.14 (2 decimals)
```

## Type Checking Functions

```python
# type() - Get object type
print(type(42))          # <class 'int'>
print(type("hello"))     # <class 'str'>
print(type([1, 2, 3]))   # <class 'list'>

# isinstance() - Check if instance of type
print(isinstance(42, int))          # True
print(isinstance("hello", str))     # True
print(isinstance([1, 2], list))     # True
print(isinstance(42, (int, float))) # True (either type)
```

## Object Inspection Functions

```python
# id() - Object identity (memory address)
x = [1, 2, 3]
print(id(x))  # e.g., 140234567890

# dir() - List object attributes/methods
print(dir("hello"))  # ['capitalize', 'upper', ...]

# help() - Get documentation
# help(len)  # Shows len() documentation

# vars() - Object's __dict__ attribute
class Person:
    def __init__(self, name):
        self.name = name

p = Person("Alice")
print(vars(p))  # {'name': 'Alice'}
```

## Practical Examples

### Example 1: Statistics Calculator

```python
def calculate_stats(numbers):
    """Calculate statistics for a list of numbers"""
    return {
        "count": len(numbers),
        "sum": sum(numbers),
        "min": min(numbers),
        "max": max(numbers),
        "average": sum(numbers) / len(numbers),
        "sorted": sorted(numbers)
    }

data = [5, 2, 9, 1, 7, 3]
stats = calculate_stats(data)
print(stats)
```

### Example 2: Data Validation

```python
def validate_scores(scores):
    """Check if all scores are valid (0-100)"""
    return all(0 <= score <= 100 for score in scores)

print(validate_scores([85, 90, 78]))      # True
print(validate_scores([85, 105, 78]))     # False (105 invalid)

def has_any_errors(error_flags):
    """Check if any error occurred"""
    return any(error_flags)

print(has_any_errors([False, False, False]))  # False
print(has_any_errors([False, True, False]))   # True
```

### Example 3: Name Formatter

```python
def format_names(first_names, last_names):
    """Combine first and last names"""
    full_names = []
    for first, last in zip(first_names, last_names):
        full_names.append(f"{first} {last}")
    return full_names

firsts = ["Alice", "Bob", "Charlie"]
lasts = ["Smith", "Jones", "Brown"]
print(format_names(firsts, lasts))
# ['Alice Smith', 'Bob Jones', 'Charlie Brown']
```

### Example 4: Grade Calculator

```python
def calculate_grade(score):
    """Calculate letter grade from numeric score"""
    score = round(score)  # Round to nearest integer
    
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

scores = [95.6, 87.3, 72.8, 65.1, 58.9]
for score in scores:
    grade = calculate_grade(score)
    print(f"{score:.1f} -> {grade}")
```

### Example 5: List Processing

```python
def process_list(items):
    """Demonstrate multiple built-in functions"""
    print(f"Length: {len(items)}")
    print(f"Min: {min(items)}")
    print(f"Max: {max(items)}")
    print(f"Sum: {sum(items)}")
    print(f"Sorted: {sorted(items)}")
    print(f"Reversed: {list(reversed(items))}")

numbers = [3, 1, 4, 1, 5, 9, 2, 6]
process_list(numbers)
```

### Example 6: Type Converter

```python
def safe_convert(value, target_type):
    """Safely convert value to target type"""
    try:
        if target_type == "int":
            return int(value)
        elif target_type == "float":
            return float(value)
        elif target_type == "str":
            return str(value)
        elif target_type == "bool":
            return bool(value)
        else:
            return None
    except (ValueError, TypeError):
        return None

print(safe_convert("42", "int"))      # 42
print(safe_convert("3.14", "float"))  # 3.14
print(safe_convert("hello", "int"))   # None (failed)
```

## Advanced Built-in Functions

```python
# filter() - Filter elements
numbers = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6]

# map() - Apply function to all elements
numbers = [1, 2, 3, 4]
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16]

# bin(), oct(), hex() - Number base conversion
print(bin(42))  # 0b101010 (binary)
print(oct(42))  # 0o52 (octal)
print(hex(42))  # 0x2a (hexadecimal)

# ord(), chr() - Character code conversion
print(ord('A'))   # 65 (ASCII code)
print(chr(65))    # 'A'
print(ord('🎉'))  # 127881 (Unicode)

# divmod() - Division and modulo
quotient, remainder = divmod(17, 5)
print(f"{quotient} remainder {remainder}")  # 3 remainder 2
```

## Common Patterns

```python
# Pattern 1: Safe min/max with default
numbers = []
min_value = min(numbers) if numbers else 0
max_value = max(numbers) if numbers else 0

# Pattern 2: Check if all unique
def all_unique(items):
    return len(items) == len(set(items))

# Pattern 3: Normalize scores
def normalize(scores):
    min_score = min(scores)
    max_score = max(scores)
    range_score = max_score - min_score
    return [(s - min_score) / range_score for s in scores]

# Pattern 4: Enumerate with custom start
for i, item in enumerate(items, start=1):
    print(f"{i}. {item}")
```

## Summary

**Type conversion**: `int()`, `float()`, `str()`, `bool()`, `list()`, `tuple()`, `set()`, `dict()`

**Math**: `abs()`, `round()`, `pow()`, `min()`, `max()`, `sum()`

**Sequences**: `len()`, `sorted()`, `reversed()`, `enumerate()`, `zip()`, `range()`

**Logic**: `all()`, `any()`

**I/O**: `print()`, `input()`, `format()`

**Type checking**: `type()`, `isinstance()`

**Object inspection**: `id()`, `dir()`, `help()`, `vars()`

These functions are always available—no imports needed!

## Next Steps

Next, you'll learn about function documentation using docstrings.
