---
id: lesson-003-009
title: Python Functions
chapterId: chapter-03
order: 9
duration: 15
objectives:
  - Explain why functions are essential in programming
  - Use built-in functions like print, len, max, min, abs, and round
  - Apply type conversion functions to transform data
  - Import and use the math and random modules
---

# Python Functions

## What Are Functions?

A **function** is a named, reusable block of code that performs a specific task. Functions are one of the most important concepts in programming because they let you:

- **Avoid repetition** (DRY — Don't Repeat Yourself): Write the logic once, use it many times.
- **Organize code**: Break a complex program into smaller, manageable pieces.
- **Abstract details**: Use a function without knowing exactly how it works internally.

You have already been using functions — `print()`, `input()`, `int()`, and `type()` are all built-in functions.

## Calling a Function

You call (or "invoke") a function by writing its name followed by parentheses. Values you pass inside the parentheses are called **arguments**:

```python
print("Hello")        # "Hello" is the argument
result = max(5, 10)   # 5 and 10 are arguments
print(result)         # 10
```

A function may **return** a value (like `max()` returns the larger number) or simply perform an action (like `print()` displays text).

## Essential Built-in Functions

Python comes with many built-in functions you can use immediately:

### `print()` — Display Output

```python
print("Hello, World!")
print("Score:", 95, "out of", 100)
print(42)                           # Can print numbers too
```

### `len()` — Get the Length

```python
print(len("Python"))     # 6 (number of characters)
print(len([1, 2, 3]))    # 3 (number of items in a list)
```

### `max()` and `min()` — Find Extremes

```python
print(max(4, 7, 2, 9))   # 9
print(min(4, 7, 2, 9))   # 2
print(max("apple", "banana", "cherry"))  # "cherry" (alphabetical)
```

### `abs()` — Absolute Value

```python
print(abs(-15))    # 15
print(abs(7))      # 7
print(abs(-3.14))  # 3.14
```

### `round()` — Round a Number

```python
print(round(3.14159))       # 3
print(round(3.14159, 2))    # 3.14 (round to 2 decimal places)
print(round(2.5))           # 2 (banker's rounding in Python 3)
```

## Type Conversion Functions

These functions convert values from one type to another:

```python
# int() — convert to integer
print(int("42"))       # 42
print(int(3.99))       # 3 (truncates, does NOT round)

# float() — convert to float
print(float("3.14"))   # 3.14
print(float(10))       # 10.0

# str() — convert to string
print(str(42))         # "42"
print(str(True))       # "True"

# bool() — convert to boolean
print(bool(0))         # False
print(bool(42))        # True
print(bool(""))        # False
print(bool("hello"))   # True
```

## The `math` Module

Python's `math` module provides advanced mathematical functions. You must **import** it before use:

```python
import math

print(math.sqrt(16))       # 4.0
print(math.pi)             # 3.141592653589793
print(math.ceil(3.2))      # 4 (round up)
print(math.floor(3.9))     # 3 (round down)
print(math.pow(2, 10))     # 1024.0
print(math.log(100, 10))   # 2.0 (log base 10 of 100)
```

## The `random` Module

The `random` module generates pseudo-random numbers:

```python
import random

print(random.random())           # Random float between 0.0 and 1.0
print(random.randint(1, 6))      # Random integer from 1 to 6 (inclusive)
print(random.choice(["heads", "tails"]))  # Random item from a list
```

### Example: Dice Roller

```python
import random

die1 = random.randint(1, 6)
die2 = random.randint(1, 6)
total = die1 + die2

print(f"You rolled {die1} and {die2} for a total of {total}.")
```

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
