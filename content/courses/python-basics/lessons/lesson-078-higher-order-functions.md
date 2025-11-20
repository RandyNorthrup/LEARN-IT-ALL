---
id: 54-higher-order-functions
title: Higher-Order Functions
chapterId: ch6-functions
order: 10
duration: 30
objectives:
  - Understand higher-order functions
  - Pass functions as arguments
  - Return functions from functions
  - Use map, filter, and reduce
  - Create function decorators
---

# Higher-Order Functions

## Introduction

A **higher-order function** is a function that either:
1. Takes one or more functions as arguments, OR
2. Returns a function as its result

This makes functions "first-class citizens" in Python.

## Functions as Arguments

Pass functions to other functions:

```python
def apply_operation(x, y, operation):
    """Apply an operation to two numbers"""
    return operation(x, y)

# Define operations
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

# Pass functions as arguments
print(apply_operation(5, 3, add))       # 8
print(apply_operation(5, 3, multiply))  # 15
```

## Functions as Return Values

Return functions from functions:

```python
def create_multiplier(n):
    """Return a function that multiplies by n"""
    def multiplier(x):
        return x * n
    return multiplier

# Create specialized functions
double = create_multiplier(2)
triple = create_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15
```

## Built-in Higher-Order Functions

### map()

Apply a function to all items:

```python
numbers = [1, 2, 3, 4, 5]

# Square all numbers
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Convert to strings
strings = list(map(str, numbers))
print(strings)  # ['1', '2', '3', '4', '5']

# Multiple iterables
def add(x, y):
    return x + y

list1 = [1, 2, 3]
list2 = [10, 20, 30]
result = list(map(add, list1, list2))
print(result)  # [11, 22, 33]
```

### filter()

Filter items based on a condition:

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Get even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

# Get numbers > 5
greater_than_five = list(filter(lambda x: x > 5, numbers))
print(greater_than_five)  # [6, 7, 8, 9, 10]

# Filter strings
words = ["apple", "banana", "cherry", "date"]
long_words = list(filter(lambda w: len(w) > 5, words))
print(long_words)  # ['banana', 'cherry']
```

### reduce()

Reduce sequence to single value:

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Sum all numbers
total = reduce(lambda x, y: x + y, numbers)
print(total)  # 15

# Find maximum
maximum = reduce(lambda x, y: x if x > y else y, numbers)
print(maximum)  # 5

# Multiply all numbers
product = reduce(lambda x, y: x * y, numbers)
print(product)  # 120
```

## Practical Examples

### Example 1: Data Processing Pipeline

```python
# Process list of numbers
data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filter evens, square them, sum the results
result = reduce(
    lambda x, y: x + y,
    map(
        lambda x: x**2,
        filter(lambda x: x % 2 == 0, data)
    )
)
print(result)  # 220 (4 + 16 + 36 + 64 + 100)
```

### Example 2: Custom Sort

```python
# Sort with custom key function
students = [
    {"name": "Alice", "grade": 85},
    {"name": "Bob", "grade": 92},
    {"name": "Charlie", "grade": 78}
]

# Sort by grade
sorted_students = sorted(students, key=lambda s: s["grade"])
print([s["name"] for s in sorted_students])
# ['Charlie', 'Alice', 'Bob']

# Sort by name length
sorted_by_name_len = sorted(students, key=lambda s: len(s["name"]))
print([s["name"] for s in sorted_by_name_len])
# ['Bob', 'Alice', 'Charlie']
```

### Example 3: Function Factory

```python
def create_greeting(greeting):
    """Create a custom greeting function"""
    def greet(name):
        return f"{greeting}, {name}!"
    return greet

# Create specialized greeters
say_hello = create_greeting("Hello")
say_hi = create_greeting("Hi")
say_bonjour = create_greeting("Bonjour")

print(say_hello("Alice"))    # Hello, Alice!
print(say_hi("Bob"))         # Hi, Bob!
print(say_bonjour("Claire")) # Bonjour, Claire!
```

### Example 4: Validation Pipeline

```python
def validate_all(value, *validators):
    """Apply all validators to a value"""
    for validator in validators:
        if not validator(value):
            return False
    return True

# Define validators
def is_not_empty(s):
    return len(s) > 0

def is_long_enough(s):
    return len(s) >= 6

def has_digit(s):
    return any(c.isdigit() for c in s)

# Validate password
password = "pass123"
is_valid = validate_all(
    password,
    is_not_empty,
    is_long_enough,
    has_digit
)
print(is_valid)  # True
```

### Example 5: Retry Mechanism

```python
import time

def retry(attempts, delay=1):
    """Decorator that retries a function"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == attempts - 1:
                        raise
                    print(f"Attempt {attempt + 1} failed, retrying...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(3, delay=0.5)
def unreliable_function():
    import random
    if random.random() < 0.7:
        raise Exception("Random failure")
    return "Success!"

# Will retry up to 3 times
# result = unreliable_function()
```

### Example 6: Function Composition

```python
def compose(*functions):
    """Compose multiple functions"""
    def inner(arg):
        result = arg
        for func in reversed(functions):
            result = func(result)
        return result
    return inner

# Define simple functions
def add_one(x):
    return x + 1

def double(x):
    return x * 2

def square(x):
    return x ** 2

# Compose them
pipeline = compose(square, double, add_one)
print(pipeline(3))  # ((3 + 1) * 2)^2 = 64
```

## Closures

Functions that remember their enclosing scope:

```python
def make_counter():
    """Create a counter function"""
    count = 0
    
    def counter():
        nonlocal count
        count += 1
        return count
    
    return counter

# Each counter maintains its own state
counter1 = make_counter()
counter2 = make_counter()

print(counter1())  # 1
print(counter1())  # 2
print(counter2())  # 1 (separate counter)
print(counter1())  # 3
```

## Partial Functions

Pre-fill function arguments:

```python
from functools import partial

def power(base, exponent):
    return base ** exponent

# Create specialized functions
square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))  # 25
print(cube(5))    # 125
```

## Map, Filter, Reduce Alternatives

```python
# Using list comprehensions (often more Pythonic)
numbers = [1, 2, 3, 4, 5]

# Instead of map
squared = [x**2 for x in numbers]

# Instead of filter
evens = [x for x in numbers if x % 2 == 0]

# Instead of reduce (for sum)
total = sum(numbers)
```

## Summary

- **Higher-order functions**: Take/return functions
- **Pass functions**: As arguments to other functions
- **Return functions**: Create function factories
- **map()**: Apply function to all items
- **filter()**: Keep items that pass test
- **reduce()**: Reduce to single value
- **Closures**: Functions that remember enclosing scope
- **Decorators**: Wrap functions to add behavior
- **List comprehensions**: Often clearer than map/filter

## Next Steps

Next, you'll learn about function annotations and type checking.
