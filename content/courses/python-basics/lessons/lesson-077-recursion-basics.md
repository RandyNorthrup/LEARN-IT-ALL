---
id: 53-recursion-basics
title: Recursive Functions
chapterId: ch6-functions
order: 9
duration: 30
objectives:
  - Understand recursion fundamentals
  - Write recursive functions
  - Identify base cases and recursive cases
  - Compare recursion vs iteration
  - Avoid infinite recursion
---

# Recursive Functions

## Introduction

A **recursive function** is a function that calls itself. Recursion is powerful for solving problems that can be broken down into smaller, similar subproblems.

## Basic Recursion

```python
def countdown(n):
    """Count down from n to 1"""
    if n <= 0:  # Base case
        print("Done!")
        return
    
    print(n)
    countdown(n - 1)  # Recursive call

countdown(5)
# 5
# 4
# 3
# 2
# 1
# Done!
```

## Base Case and Recursive Case

Every recursive function needs:
1. **Base case**: When to stop recursing
2. **Recursive case**: How to break down the problem

```python
def factorial(n):
    """Calculate n! (factorial)"""
    # Base case
    if n == 0 or n == 1:
        return 1
    
    # Recursive case
    return n * factorial(n - 1)

print(factorial(5))  # 120 (5 * 4 * 3 * 2 * 1)
print(factorial(0))  # 1 (base case)
```

## How Recursion Works

```python
# factorial(5) breakdown:
# factorial(5) = 5 * factorial(4)
#              = 5 * (4 * factorial(3))
#              = 5 * (4 * (3 * factorial(2)))
#              = 5 * (4 * (3 * (2 * factorial(1))))
#              = 5 * (4 * (3 * (2 * 1)))
#              = 5 * (4 * (3 * 2))
#              = 5 * (4 * 6)
#              = 5 * 24
#              = 120
```

## Classic Recursive Examples

### Sum of List

```python
def sum_list(numbers):
    """Sum all numbers in a list recursively"""
    # Base case: empty list
    if not numbers:
        return 0
    
    # Recursive case: first + sum of rest
    return numbers[0] + sum_list(numbers[1:])

print(sum_list([1, 2, 3, 4, 5]))  # 15
```

### Fibonacci Sequence

```python
def fibonacci(n):
    """Return the nth Fibonacci number"""
    # Base cases
    if n <= 0:
        return 0
    if n == 1:
        return 1
    
    # Recursive case
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(7))  # 13 (0,1,1,2,3,5,8,13)
```

### Power Function

```python
def power(base, exponent):
    """Calculate base^exponent recursively"""
    # Base case
    if exponent == 0:
        return 1
    
    # Recursive case
    return base * power(base, exponent - 1)

print(power(2, 5))  # 32 (2^5)
```

## Practical Examples

### Example 1: Count Down Timer

```python
import time

def timer(seconds):
    """Countdown timer"""
    if seconds == 0:
        print("Time's up!")
        return
    
    print(f"{seconds} seconds remaining...")
    time.sleep(1)
    timer(seconds - 1)

# timer(5)  # Uncomment to run
```

### Example 2: Reverse String

```python
def reverse_string(s):
    """Reverse a string recursively"""
    # Base case
    if len(s) <= 1:
        return s
    
    # Recursive case: last char + reverse of rest
    return s[-1] + reverse_string(s[:-1])

print(reverse_string("hello"))  # olleh
print(reverse_string("Python"))  # nohtyP
```

### Example 3: List Flattening

```python
def flatten(nested_list):
    """Flatten a nested list"""
    result = []
    for item in nested_list:
        if isinstance(item, list):
            result.extend(flatten(item))  # Recursive call
        else:
            result.append(item)
    return result

nested = [1, [2, 3], [4, [5, 6]], 7]
print(flatten(nested))  # [1, 2, 3, 4, 5, 6, 7]
```

### Example 4: Directory Tree

```python
def print_tree(path, indent=0):
    """Print directory tree recursively"""
    import os
    
    if os.path.isfile(path):
        print("  " * indent + "- " + os.path.basename(path))
    elif os.path.isdir(path):
        print("  " * indent + "+ " + os.path.basename(path))
        for item in os.listdir(path):
            print_tree(os.path.join(path, item), indent + 1)
```

## Recursion vs Iteration

```python
# Recursive approach
def factorial_recursive(n):
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)

# Iterative approach
def factorial_iterative(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

# Both produce same result
print(factorial_recursive(5))  # 120
print(factorial_iterative(5))  # 120
```

### When to Use Each

**Use recursion when:**
- Problem naturally divides into subproblems
- Code clarity is priority
- Working with tree/graph structures
- Problem definition is recursive

**Use iteration when:**
- Performance is critical
- Deep recursion might hit stack limit
- Simple counting/looping

## Common Pitfalls

### Missing Base Case

```python
def bad_countdown(n):
    print(n)
    bad_countdown(n - 1)  # No base case!

# bad_countdown(5)  # RecursionError!
```

### Incorrect Base Case

```python
def bad_factorial(n):
    if n == 0:  # Doesn't handle negative numbers!
        return 1
    return n * bad_factorial(n - 1)

# bad_factorial(-1)  # RecursionError!

# Fix: Add validation
def safe_factorial(n):
    if n < 0:
        raise ValueError("n must be non-negative")
    if n == 0:
        return 1
    return n * safe_factorial(n - 1)
```

### Infinite Recursion

```python
def bad_sum(n):
    if n == 1:
        return 1
    return n + bad_sum(n)  # Never gets closer to base case!

# bad_sum(5)  # RecursionError!
```

## Recursion Depth Limit

```python
import sys

# Check recursion limit
print(sys.getrecursionlimit())  # Usually 1000

# Increase if needed (use carefully!)
# sys.setrecursionlimit(2000)

# Deep recursion example
def deep_recursion(n):
    if n == 0:
        return 0
    return 1 + deep_recursion(n - 1)

print(deep_recursion(100))   # Works
# print(deep_recursion(10000))  # RecursionError!
```

## Tail Recursion

```python
# Regular recursion (not tail-recursive)
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # Multiplication after recursive call

# Tail recursion (recursive call is last operation)
def factorial_tail(n, accumulator=1):
    if n <= 1:
        return accumulator
    return factorial_tail(n - 1, n * accumulator)  # Nothing after recursive call

print(factorial_tail(5))  # 120
```

## Memoization (Optimization)

```python
# Inefficient: calculates same values multiple times
def fib_slow(n):
    if n <= 1:
        return n
    return fib_slow(n - 1) + fib_slow(n - 2)

# Optimized with memoization
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

print(fib_slow(10))  # Slow
print(fib_memo(30))  # Fast!
```

## Summary

- **Recursion**: Function that calls itself
- **Base case**: Stopping condition (required!)
- **Recursive case**: Breaks problem into smaller parts
- **Stack**: Each call adds to call stack
- **Pros**: Clear code for recursive problems
- **Cons**: Can be slower, stack limits
- **Alternatives**: Iteration, memoization
- **Avoid**: Missing base cases, infinite recursion

## Next Steps

Next, you'll learn about higher-order functions and function composition.
