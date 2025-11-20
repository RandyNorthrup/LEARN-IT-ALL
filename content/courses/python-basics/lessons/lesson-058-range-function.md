---
id: "93-range-function"
title: "The range() Function"
chapterId: ch5-loops
order: 4
duration: 20
objectives:
  - Master range() function syntax
  - Understand start, stop, step parameters
  - Generate number sequences efficiently
  - Use range() in various loop patterns
---

# The range() Function

The `range()` function generates sequences of numbers, making it essential for controlling loop iterations. It's memory-efficient and highly versatile.

## Basic range() Usage

```python
# range(stop) - generates 0 to stop-1
for i in range(5):
    print(i, end=" ")
print()
# Output: 0 1 2 3 4

# Convert to list to see all values
numbers = list(range(5))
print(numbers)
# [0, 1, 2, 3, 4]

# range(start, stop) - generates start to stop-1
for i in range(2, 7):
    print(i, end=" ")
print()
# Output: 2 3 4 5 6

# range(start, stop, step) - generates with custom increment
for i in range(0, 10, 2):
    print(i, end=" ")
print()
# Output: 0 2 4 6 8
```

## Parameters Explained

```python
# stop only (starts at 0, step is 1)
print(list(range(5)))
# [0, 1, 2, 3, 4]

# start and stop
print(list(range(3, 8)))
# [3, 4, 5, 6, 7]

# start, stop, and step
print(list(range(0, 20, 5)))
# [0, 5, 10, 15]

# Negative step (counting backwards)
print(list(range(10, 0, -1)))
# [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

# Starting from negative
print(list(range(-5, 5)))
# [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]

# Negative start and stop
print(list(range(-10, -5)))
# [-10, -9, -8, -7, -6]
```

## Common Patterns

### Counting Backwards

```python
# Countdown from 10 to 1
for i in range(10, 0, -1):
    print(f"{i}...", end=" ")
print("Blast off!")
# 10... 9... 8... 7... 6... 5... 4... 3... 2... 1... Blast off!

# Reverse iteration through indices
items = ["a", "b", "c", "d", "e"]
print("\nReverse order:")
for i in range(len(items) - 1, -1, -1):
    print(f"items[{i}] = {items[i]}")

# items[4] = e
# items[3] = d
# items[2] = c
# items[1] = b
# items[0] = a
```

### Even and Odd Numbers

```python
# Generate even numbers
evens = list(range(0, 20, 2))
print("Evens:", evens)
# Evens: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Generate odd numbers
odds = list(range(1, 20, 2))
print("Odds:", odds)
# Odds: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

# Sum all even numbers from 0 to 100
total = 0
for num in range(0, 101, 2):
    total += num
print(f"Sum of even numbers 0-100: {total}")
# Sum of even numbers 0-100: 2550

# Or using sum()
total = sum(range(0, 101, 2))
print(f"Sum using sum(): {total}")
# Sum using sum(): 2550
```

### Multiples

```python
# Multiples of 5
multiples_of_5 = list(range(0, 51, 5))
print("Multiples of 5:", multiples_of_5)
# [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]

# Multiples of 7 up to 100
multiples_of_7 = list(range(0, 101, 7))
print("Multiples of 7:", multiples_of_7)
# [0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98]

# First 10 multiples of a number
def first_n_multiples(number, count):
    """Get first n multiples of a number."""
    return list(range(number, number * (count + 1), number))

print(first_n_multiples(3, 10))
# [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
```

## Loop Index Patterns

```python
# Access list elements by index
fruits = ["apple", "banana", "cherry", "date", "elderberry"]

# Using range with len()
print("Fruits with index:")
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# 0: apple
# 1: banana
# 2: cherry
# 3: date
# 4: elderberry

# Skip first and last elements
print("\nMiddle elements:")
for i in range(1, len(fruits) - 1):
    print(fruits[i])

# banana
# cherry
# date

# Every other element
print("\nEvery other element:")
for i in range(0, len(fruits), 2):
    print(fruits[i])

# apple
# cherry
# elderberry
```

## Creating Number Sequences

```python
# Powers of 2
powers_of_2 = [2**i for i in range(10)]
print("Powers of 2:", powers_of_2)
# [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]

# Squares
squares = [i**2 for i in range(1, 11)]
print("Squares:", squares)
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# Factorial sequence
def factorial_sequence(n):
    """Generate first n factorials."""
    factorials = []
    factorial = 1
    for i in range(1, n + 1):
        factorial *= i
        factorials.append(factorial)
    return factorials

print("Factorials:", factorial_sequence(7))
# [1, 2, 6, 24, 120, 720, 5040]

# Fibonacci using range
def fibonacci(n):
    """Generate first n Fibonacci numbers."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib

print("Fibonacci:", fibonacci(10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

## Range with Step Zero (Error)

```python
# ❌ This will raise ValueError
try:
    for i in range(0, 10, 0):
        print(i)
except ValueError as e:
    print(f"Error: {e}")
# Error: range() arg 3 must not be zero

# Step must be non-zero
print("Valid steps: any integer except 0")
print("Positive step:", list(range(0, 5, 1)))   # [0, 1, 2, 3, 4]
print("Negative step:", list(range(5, 0, -1)))  # [5, 4, 3, 2, 1]
```

## Empty Ranges

```python
# When start >= stop with positive step
empty1 = list(range(5, 2))
print("Empty range (5, 2):", empty1)
# []

# When start <= stop with negative step
empty2 = list(range(2, 5, -1))
print("Empty range (2, 5, -1):", empty2)
# []

# Start equals stop
empty3 = list(range(5, 5))
print("Empty range (5, 5):", empty3)
# []

# Valid ranges
valid1 = list(range(2, 5))
print("Valid (2, 5):", valid1)
# [2, 3, 4]

valid2 = list(range(5, 2, -1))
print("Valid (5, 2, -1):", valid2)
# [5, 4, 3]
```

## Memory Efficiency

```python
# range() is memory-efficient (doesn't store all values)
import sys

# Large range object
r = range(1000000)
print(f"Range object size: {sys.getsizeof(r)} bytes")
# Range object size: 48 bytes

# List stores all values
lst = list(range(1000000))
print(f"List size: {sys.getsizeof(lst)} bytes")
# List size: 8000056 bytes (much larger!)

# range() generates values on-demand
print(f"Memory saved: {sys.getsizeof(lst) - sys.getsizeof(r)} bytes")

# This is why we use range() in loops instead of creating lists
# ✅ Memory efficient
for i in range(1000000):
    pass  # Process each number without storing all

# ❌ Memory inefficient
# for i in list(range(1000000)):
#     pass  # Stores all 1 million numbers in memory!
```

## Range Operations

```python
# Check membership
print(5 in range(10))        # True
print(15 in range(10))       # False
print(5 in range(0, 10, 2))  # False (only evens)
print(6 in range(0, 10, 2))  # True

# Get length
print(len(range(10)))           # 10
print(len(range(5, 15)))        # 10
print(len(range(0, 20, 2)))     # 10

# Index access
r = range(10, 20)
print(r[0])    # 10 (first element)
print(r[5])    # 15
print(r[-1])   # 19 (last element)

# Slicing
r = range(20)
print(list(r[5:10]))    # [5, 6, 7, 8, 9]
print(list(r[::2]))     # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
print(list(r[::-1]))    # Reverse: [19, 18, 17, ..., 1, 0]
```

## Practical Examples

```python
# Generate alphabet positions
def char_positions():
    """Generate alphabet with positions."""
    for i in range(26):
        char = chr(ord('A') + i)
        print(f"{i + 1}: {char}")

print("Alphabet:")
char_positions()
# 1: A
# 2: B
# ... 26: Z

# Price range generator
def price_range(start, end, increment):
    """Generate price points."""
    # Convert to cents to avoid floating point issues
    start_cents = int(start * 100)
    end_cents = int(end * 100)
    increment_cents = int(increment * 100)
    
    for cents in range(start_cents, end_cents + 1, increment_cents):
        price = cents / 100
        print(f"${price:.2f}")

print("\nPrice points:")
price_range(9.99, 14.99, 0.50)
# $9.99
# $10.49
# $10.99
# $11.49
# ...

# Table of values
def print_conversion_table():
    """Print Celsius to Fahrenheit conversion."""
    print("°C    °F")
    print("-" * 10)
    for celsius in range(0, 101, 10):
        fahrenheit = (celsius * 9/5) + 32
        print(f"{celsius:3}   {fahrenheit:5.1f}")

print("\nTemperature conversion:")
print_conversion_table()
# °C    °F
# ----------
#   0    32.0
#  10    50.0
#  20    68.0
# ...
```

## Range vs List

```python
# When to use range() vs list
# ✅ Use range() for:
# - Loop iteration (memory efficient)
for i in range(100):
    process(i)

# - Generating sequences on-the-fly
sum(range(100))

# - Large sequences
for i in range(1000000):
    pass

# ✅ Use list(range()) when you need:
# - Multiple iterations
numbers = list(range(10))
for n in numbers: pass
for n in numbers: pass  # Can iterate again

# - Modifications
numbers = list(range(5))
numbers.append(10)
numbers[2] = 99

# - List methods
numbers = list(range(10))
numbers.reverse()
numbers.sort()

# Performance comparison
import time

# Measuring range() in loop
start = time.time()
for i in range(1000000):
    pass
range_time = time.time() - start

# Measuring list in loop
start = time.time()
numbers = list(range(1000000))
for i in numbers:
    pass
list_time = time.time() - start

print(f"range() time: {range_time:.4f}s")
print(f"list time: {list_time:.4f}s")
print(f"range() is {list_time/range_time:.1f}x faster")
```

## Summary

**range() Syntax:**
- `range(stop)` - 0 to stop-1
- `range(start, stop)` - start to stop-1
- `range(start, stop, step)` - start to stop-1 by step

**Key Features:**
- **Memory efficient** - Generates values on-demand
- **Immutable** - Cannot be modified
- **Sequence type** - Supports indexing, slicing, `in`, `len()`
- **Lazy evaluation** - Values computed when needed

**Common Patterns:**
- Forward: `range(10)` → 0, 1, 2, ..., 9
- Backward: `range(10, 0, -1)` → 10, 9, 8, ..., 1
- Evens: `range(0, 20, 2)` → 0, 2, 4, ..., 18
- Odds: `range(1, 20, 2)` → 1, 3, 5, ..., 19

**Best Practices:**
- Use `range()` directly in loops (don't convert to list)
- Use `enumerate()` instead of `range(len())` when you need both index and value
- Use negative step for counting backwards
- Remember: stop value is NOT included
- Step cannot be zero

The `range()` function is fundamental to Python loops - master it for efficient iteration!
