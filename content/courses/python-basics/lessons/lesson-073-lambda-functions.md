---
id: lambda-functions
title: Lambda Functions and Functional Programming
chapterId: ch6-functions
order: 5
duration: 25
objectives:
  - Understand lambda (anonymous) functions
  - Master map, filter, and reduce
  - Learn when to use lambdas vs regular functions
  - Apply functional programming concepts
---

# Lambda Functions and Functional Programming

Lambda functions are small anonymous functions perfect for simple operations. They're key to functional programming in Python.

## Lambda Syntax

Lambda functions are one-line functions without a name:

```python
# Regular function
def add(a, b):
    return a + b

# Lambda equivalent
add_lambda = lambda a, b: a + b

print(add(5, 3))        # 8
print(add_lambda(5, 3)) # 8
```

**Syntax:** `lambda parameters: expression`

## Basic Lambda Examples

```python
# Square a number
square = lambda x: x ** 2
print(square(5))  # 25

# Check if even
is_even = lambda x: x % 2 == 0
print(is_even(4))  # True
print(is_even(7))  # False

# Full name
full_name = lambda first, last: f"{first} {last}"
print(full_name("Alice", "Smith"))  # Alice Smith

# Max of two numbers
max_two = lambda a, b: a if a > b else b
print(max_two(10, 20))  # 20
```

## Lambda with map()

Apply a function to every item in a list:

```python
numbers = [1, 2, 3, 4, 5]

# Square all numbers
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Convert to strings
strings = list(map(lambda x: str(x), numbers))
print(strings)  # ['1', '2', '3', '4', '5']

# Uppercase names
names = ["alice", "bob", "charlie"]
upper_names = list(map(lambda name: name.upper(), names))
print(upper_names)  # ['ALICE', 'BOB', 'CHARLIE']
```

## Lambda with filter()

Keep only items that pass a test:

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Get even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

# Get numbers > 5
greater_than_five = list(filter(lambda x: x > 5, numbers))
print(greater_than_five)  # [6, 7, 8, 9, 10]

# Filter names by length
names = ["Alice", "Bob", "Charlie", "David"]
long_names = list(filter(lambda name: len(name) > 4, names))
print(long_names)  # ['Alice', 'Charlie', 'David']
```

## Lambda with sorted()

Custom sorting with key parameter:

```python
# Sort by absolute value
numbers = [-5, 2, -8, 1, -3, 4]
sorted_abs = sorted(numbers, key=lambda x: abs(x))
print(sorted_abs)  # [1, 2, -3, 4, -5, -8]

# Sort strings by length
words = ["apple", "pie", "banana", "cherry"]
sorted_length = sorted(words, key=lambda w: len(w))
print(sorted_length)  # ['pie', 'apple', 'banana', 'cherry']

# Sort tuples by second element
pairs = [(1, 5), (3, 2), (2, 8)]
sorted_pairs = sorted(pairs, key=lambda pair: pair[1])
print(sorted_pairs)  # [(3, 2), (1, 5), (2, 8)]

# Sort dictionaries
users = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
]
sorted_users = sorted(users, key=lambda user: user["age"])
for user in sorted_users:
    print(user)
# {'name': 'Bob', 'age': 25}
# {'name': 'Alice', 'age': 30}
# {'name': 'Charlie', 'age': 35}
```

## Lambda with reduce()

Reduce a list to a single value:

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Sum all numbers
total = reduce(lambda acc, x: acc + x, numbers)
print(total)  # 15

# Product of all numbers
product = reduce(lambda acc, x: acc * x, numbers)
print(product)  # 120

# Find maximum
maximum = reduce(lambda a, b: a if a > b else b, numbers)
print(maximum)  # 5

# Concatenate strings
words = ["Hello", "World", "Python"]
sentence = reduce(lambda a, b: f"{a} {b}", words)
print(sentence)  # Hello World Python
```

## Multiple Parameters

```python
# Two parameters
add = lambda a, b: a + b
print(add(10, 5))  # 15

# Three parameters
volume = lambda l, w, h: l * w * h
print(volume(2, 3, 4))  # 24

# Default parameters
greet = lambda name, greeting="Hello": f"{greeting}, {name}!"
print(greet("Alice"))  # Hello, Alice!
print(greet("Bob", "Hi"))  # Hi, Bob!
```

## Conditional Expressions in Lambdas

```python
# If-else in lambda
check_positive = lambda x: "Positive" if x > 0 else "Non-positive"
print(check_positive(5))   # Positive
print(check_positive(-3))  # Non-positive

# Grade calculator
get_grade = lambda score: "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"
print(get_grade(95))  # A
print(get_grade(85))  # B
print(get_grade(75))  # C
print(get_grade(65))  # F
```

## Practical Examples

### Example 1: Data Processing Pipeline

```python
# Process list of prices
prices = [10.50, 25.00, 15.75, 30.25, 20.00]

# Apply discount, filter above threshold, calculate total
discounted = list(map(lambda p: p * 0.9, prices))
expensive = list(filter(lambda p: p > 15, discounted))
total = reduce(lambda a, b: a + b, expensive)

print(f"Expensive items after discount: {expensive}")
print(f"Total: ${total:.2f}")
# Expensive items after discount: [22.5, 18.9, 27.225, 18.0]
# Total: $86.62
```

### Example 2: User Data Transformation

```python
users = [
    {"name": "alice", "age": 25, "active": True},
    {"name": "bob", "age": 30, "active": False},
    {"name": "charlie", "age": 35, "active": True}
]

# Transform names to uppercase
users_upper = list(map(lambda u: {**u, "name": u["name"].upper()}, users))

# Filter active users
active_users = list(filter(lambda u: u["active"], users_upper))

# Sort by age
sorted_active = sorted(active_users, key=lambda u: u["age"])

for user in sorted_active:
    print(f"{user['name']} - {user['age']}")
# ALICE - 25
# CHARLIE - 35
```

### Example 3: String Processing

```python
sentences = [
    "hello world",
    "python is awesome",
    "lambda functions are cool"
]

# Capitalize first letter of each word
capitalized = list(map(lambda s: s.title(), sentences))
print(capitalized)
# ['Hello World', 'Python Is Awesome', 'Lambda Functions Are Cool']

# Get word count
word_counts = list(map(lambda s: len(s.split()), sentences))
print(word_counts)  # [2, 3, 4]
```

## When to Use Lambdas

### ✅ Good Use Cases

```python
# Short, simple operations
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, numbers))

# Sorting key
words = ["apple", "pie", "banana"]
sorted_words = sorted(words, key=lambda w: len(w))

# Simple callbacks
buttons = ["Save", "Cancel", "Delete"]
actions = list(map(lambda btn: f"on_{btn.lower()}_click", buttons))
```

### ❌ Avoid for Complex Logic

```python
# ❌ Bad - too complex for lambda
process = lambda x: x * 2 if x > 0 else abs(x) if x < -10 else 0

# ✅ Better - use regular function
def process(x):
    if x > 0:
        return x * 2
    elif x < -10:
        return abs(x)
    else:
        return 0
```

## Lambda vs Regular Functions

```python
# Lambda: One-line, anonymous
square_lambda = lambda x: x ** 2

# Regular: Named, can have multiple statements
def square_regular(x):
    """Square a number"""
    result = x ** 2
    return result

# Both work the same
print(square_lambda(5))  # 25
print(square_regular(5)) # 25
```

**Use lambdas when:**
- Function is simple (one line)
- Used once (like in map/filter)
- Passing as argument to higher-order function

**Use regular functions when:**
- Logic is complex
- Need docstrings
- Used multiple times
- Multiple statements needed

## List Comprehensions vs map/filter

Often list comprehensions are more readable:

```python
numbers = [1, 2, 3, 4, 5]

# Using map
squared_map = list(map(lambda x: x ** 2, numbers))

# Using list comprehension (more Pythonic)
squared_comp = [x ** 2 for x in numbers]

# Using filter
evens_filter = list(filter(lambda x: x % 2 == 0, numbers))

# Using list comprehension (more Pythonic)
evens_comp = [x for x in numbers if x % 2 == 0]
```

## Key Takeaways

- **Lambda** creates anonymous one-line functions
- Syntax: `lambda params: expression`
- Use with **map()**, **filter()**, **sorted()**, **reduce()**
- Great for simple operations
- Use regular functions for complex logic
- List comprehensions often more readable than map/filter

## What's Next?

You've completed Chapter 3! Next, we'll explore **variable scope** in more depth in Chapter 4.
