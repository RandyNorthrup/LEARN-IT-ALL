---
id: 66-error-patterns
title: Common Error Patterns
chapterId: ch12-testing
order: 7
duration: 25
objectives:
  - Recognize common error patterns
  - Fix typical Python errors quickly
  - Avoid common mistakes
  - Read and understand error messages
  - Develop error-fixing intuition
---

# Common Error Patterns

## Introduction

Learning to recognize common error patterns helps you fix bugs faster. This lesson covers frequent Python errors and their solutions.

## SyntaxError: Invalid Syntax

```python
# Missing colon
if x > 10  # SyntaxError!
    print("Big")

# Fix: Add colon
if x > 10:
    print("Big")

# Missing parentheses in print (Python 3)
print "Hello"  # SyntaxError!

# Fix: Add parentheses
print("Hello")

# Incorrect indentation
def greet():
print("Hello")  # IndentationError!

# Fix: Proper indentation
def greet():
    print("Hello")
```

## NameError: Name Not Defined

```python
# Using undefined variable
print(message)  # NameError: name 'message' is not defined

# Fix: Define variable first
message = "Hello"
print(message)

# Typo in variable name
username = "Alice"
print(usrname)  # NameError!

# Fix: Correct spelling
print(username)

# Using variable before assignment in function
def calculate():
    result = result + 10  # NameError!

# Fix: Initialize first
def calculate():
    result = 0
    result = result + 10
```

## TypeError: Type Errors

```python
# Concatenating string and int
message = "Age: " + 25  # TypeError!

# Fix: Convert to string
message = "Age: " + str(25)

# Calling non-callable
x = 5
result = x()  # TypeError: 'int' object is not callable

# Fix: Don't call non-function
result = x

# Wrong number of arguments
def greet(name):
    return f"Hello, {name}"

greet()  # TypeError: missing 1 required positional argument

# Fix: Provide argument
greet("Alice")
```

## IndexError: List Index Out of Range

```python
numbers = [1, 2, 3]
print(numbers[5])  # IndexError!

# Fix: Check index bounds
if 5 < len(numbers):
    print(numbers[5])
else:
    print("Index out of range")

# Safe access with default
def safe_get(lst, index, default=None):
    if 0 <= index < len(lst):
        return lst[index]
    return default

print(safe_get(numbers, 5, "Not found"))
```

## KeyError: Missing Dictionary Key

```python
user = {"name": "Alice", "age": 30}
print(user["email"])  # KeyError!

# Fix 1: Use get()
print(user.get("email", "No email"))

# Fix 2: Check if key exists
if "email" in user:
    print(user["email"])
else:
    print("No email")

# Fix 3: Use try-except
try:
    print(user["email"])
except KeyError:
    print("No email")
```

## AttributeError: Missing Attribute

```python
numbers = [1, 2, 3]
numbers.append(4)  # OK
numbers.add(5)  # AttributeError! (lists don't have 'add')

# Fix: Use correct method
numbers.append(5)

# Typo in method name
text = "hello"
result = text.uppper()  # AttributeError!

# Fix: Correct spelling
result = text.upper()
```

## ValueError: Invalid Value

```python
# Converting non-numeric string
number = int("hello")  # ValueError!

# Fix: Validate before converting
text = "hello"
if text.isdigit():
    number = int(text)
else:
    print("Not a valid number")

# Unpacking wrong number of values
a, b = [1, 2, 3]  # ValueError!

# Fix: Match number of variables
a, b, c = [1, 2, 3]
```

## IndentationError

```python
# Mixed tabs and spaces
def func():
    x = 10  # Tabs
        y = 20  # Spaces - IndentationError!

# Fix: Use consistent indentation (4 spaces recommended)
def func():
    x = 10
    y = 20

# Unexpected indent
x = 10
    y = 20  # IndentationError!

# Fix: Align properly
x = 10
y = 20
```

## ZeroDivisionError

```python
result = 10 / 0  # ZeroDivisionError!

# Fix: Check for zero
divisor = 0
if divisor != 0:
    result = 10 / divisor
else:
    result = None
    print("Cannot divide by zero")
```

## ModuleNotFoundError

```python
import nonexistent_module  # ModuleNotFoundError!

# Fix: Install module or check spelling
# pip install module_name

# Or check typo
import os  # Correct spelling
```

## Common Logic Errors

```python
# Using = instead of ==
x = 10
if x = 5:  # SyntaxError! (assignment in condition)
    print("Five")

# Fix: Use ==
if x == 5:
    print("Five")

# Off-by-one error
for i in range(10):
    print(i)  # Prints 0-9, not 1-10

# Fix: Adjust range
for i in range(1, 11):
    print(i)  # Prints 1-10

# Modifying list while iterating
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # Dangerous!

# Fix: Iterate over copy
for num in numbers[:]:
    if num % 2 == 0:
        numbers.remove(num)
```

## Mutable Default Arguments

```python
# Bug: List shared across calls
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item(1))  # [1]
print(add_item(2))  # [1, 2] - Unexpected!

# Fix: Use None
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item(1))  # [1]
print(add_item(2))  # [2] - Correct!
```

## Late Binding Closures

```python
# Bug: All functions use final 'i'
functions = []
for i in range(3):
    def func():
        return i
    functions.append(func)

print([f() for f in functions])  # [2, 2, 2] - All return 2!

# Fix: Capture value with default argument
functions = []
for i in range(3):
    def func(x=i):
        return x
    functions.append(func)

print([f() for f in functions])  # [0, 1, 2] - Correct!
```

## Reading Error Messages

```python
# Example error message:
"""
Traceback (most recent call last):
  File "script.py", line 10, in <module>
    result = calculate(5, 0)
  File "script.py", line 5, in calculate
    return x / y
ZeroDivisionError: division by zero
"""

# How to read:
# 1. Error type: ZeroDivisionError
# 2. Error message: "division by zero"
# 3. Location: line 5 in calculate()
# 4. Called from: line 10 in main script

def calculate(x, y):
    return x / y  # Line 5 - Error here!

result = calculate(5, 0)  # Line 10 - Called from here
```

## Error Prevention Checklist

```python
# 1. Validate inputs
def process_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    if age < 0 or age > 150:
        raise ValueError("Age must be between 0 and 150")
    return age

# 2. Handle edge cases
def safe_divide(a, b):
    if b == 0:
        return None
    return a / b

# 3. Use type hints
def add_numbers(a: int, b: int) -> int:
    return a + b

# 4. Add assertions
def calculate_average(numbers):
    assert len(numbers) > 0, "List cannot be empty"
    return sum(numbers) / len(numbers)

# 5. Use try-except for external operations
def read_file(filename):
    try:
        with open(filename) as f:
            return f.read()
    except FileNotFoundError:
        return None
```

## Summary

**Common Errors:**
- **SyntaxError**: Missing colons, parentheses, indentation
- **NameError**: Undefined variables, typos
- **TypeError**: Type mismatches, wrong arguments
- **IndexError**: List index out of bounds
- **KeyError**: Missing dictionary key
- **AttributeError**: Missing method or attribute
- **ValueError**: Invalid value for operation
- **ZeroDivisionError**: Division by zero

**Error Prevention:**
- Validate inputs
- Handle edge cases
- Use type hints
- Add assertions
- Use try-except for risky operations
- Read error messages carefully

## Next Steps

Next, you'll learn about stack traces and how to debug complex errors.
