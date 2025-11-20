---
id: 12-python-style-guide
title: Python Style Guide and PEP 8
chapterId: ch1-intro
order: 12
duration: 25
objectives:
  - Understand PEP 8 style guide
  - Write clean, readable code
  - Follow Python naming conventions
  - Format code properly
  - Use best practices for maintainable code
---

# Python Style Guide and PEP 8

## Introduction

PEP 8 is Python's official style guide. Following it makes your code readable and maintainable by you and others.

## What is PEP 8?

```python
# PEP 8: Python Enhancement Proposal 8
# - Official Python style guide
# - Created by Guido van Rossum (Python's creator)
# - Widely adopted by Python community
# - Makes code consistent across projects

# Why follow PEP 8?
# - Code is read more than it's written
# - Consistency across projects
# - Professional appearance
# - Easier collaboration
```

## Indentation

```python
# Use 4 spaces per indentation level
# DON'T use tabs

# ✓ Correct:
def greet(name):
    if name:
        print(f"Hello, {name}!")
    else:
        print("Hello, stranger!")

# ✗ Wrong: 2 spaces
def greet(name):
  if name:
    print(f"Hello, {name}!")

# ✗ Wrong: Tabs (inconsistent)
def greet(name):
	if name:
		print(f"Hello, {name}!")
```

## Line Length

```python
# Maximum line length: 79 characters
# For docstrings/comments: 72 characters

# ✓ Correct: Break long lines
result = some_function(
    parameter1,
    parameter2,
    parameter3
)

# Or:
result = (
    some_very_long_variable_name
    + another_long_variable_name
    + yet_another_variable
)

# ✗ Wrong: Too long
result = some_function(parameter1, parameter2, parameter3, parameter4, parameter5, parameter6)
```

## Blank Lines

```python
# 2 blank lines before top-level functions and classes
# 1 blank line between methods inside a class

# ✓ Correct:
def first_function():
    pass


def second_function():  # 2 blank lines above
    pass


class MyClass:  # 2 blank lines above
    def method_one(self):
        pass
    
    def method_two(self):  # 1 blank line above
        pass

# ✗ Wrong: No spacing
def first_function():
    pass
def second_function():
    pass
```

## Imports

```python
# Imports at top of file
# Order: standard library, third-party, local
# One import per line

# ✓ Correct:
import os
import sys
from typing import List, Dict

import requests
import numpy as np

from myproject import utils

# ✗ Wrong:
import sys, os  # Multiple on one line
from myproject import *  # Wildcard import

# ✗ Wrong: Imports in middle of file
def some_function():
    import os  # Should be at top
    pass
```

## Naming Conventions

```python
# Variables and functions: snake_case
user_name = "Alice"
total_count = 42

def calculate_average(numbers):
    return sum(numbers) / len(numbers)

# Constants: UPPER_CASE
MAX_RETRIES = 3
API_KEY = "secret123"
DEFAULT_TIMEOUT = 30

# Classes: PascalCase
class UserAccount:
    pass

class DatabaseConnection:
    pass

# Private (internal use): _leading_underscore
def _internal_function():
    pass

_private_variable = "internal"

# ✗ Wrong:
userName = "Alice"  # camelCase
def CalculateAverage():  # PascalCase for function
    pass
max_retries = 3  # Constant not uppercase
```

## Whitespace

```python
# ✓ Correct: Space after comma
numbers = [1, 2, 3, 4, 5]
point = (10, 20)

# ✗ Wrong:
numbers = [1,2,3,4,5]  # No spaces

# ✓ Correct: No space before punctuation
result = calculate(10, 20)
items[0]

# ✗ Wrong:
result = calculate (10 , 20)  # Extra spaces
items [0]

# ✓ Correct: Space around operators
x = 5
y = x + 10
z = x * 2

# ✗ Wrong:
x=5  # No spaces
y=x+10

# ✓ Correct: No space for keyword arguments
def greet(name, greeting="Hello"):
    pass

greet(name="Alice", greeting="Hi")

# ✗ Wrong:
greet(name = "Alice", greeting = "Hi")  # Spaces around =
```

## Comments

```python
# Inline comments: At least 2 spaces from code
# Use complete sentences
# Start with #

# ✓ Correct:
x = x + 1  # Increment x by 1
count = 0  # Initialize counter

# ✗ Wrong:
x = x + 1 #no space
x = x + 1# no space before hash

# Block comments: Describe following code
# Each line starts with #

# This function calculates the average
# of a list of numbers. It returns 0
# if the list is empty.
def calculate_average(numbers):
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

# Docstrings: Multi-line string at start of function/class
def calculate_average(numbers):
    """
    Calculate the average of a list of numbers.
    
    Args:
        numbers: List of numeric values
        
    Returns:
        float: The average value, or 0 if empty
    """
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)
```

## String Quotes

```python
# Use single or double quotes consistently
# PEP 8 doesn't mandate one, but be consistent

# ✓ Correct: Consistent use
name = 'Alice'
message = 'Hello, world!'

# OR

name = "Alice"
message = "Hello, world!"

# Use the other quote to avoid escaping
text = "It's a beautiful day"  # Using double to avoid escaping '
code = 'print("Hello")'  # Using single to avoid escaping "

# Triple quotes for multi-line strings
description = """
This is a long description
that spans multiple lines.
"""
```

## Comparison and Boolean

```python
# ✓ Correct: Use 'is' for None
if value is None:
    pass

if value is not None:
    pass

# ✗ Wrong:
if value == None:  # Use 'is', not '=='
    pass

# ✓ Correct: Don't compare boolean to True/False
if is_valid:  # Good
    pass

if not is_valid:  # Good
    pass

# ✗ Wrong:
if is_valid == True:  # Redundant
    pass

if is_valid == False:  # Use 'not'
    pass

# ✓ Correct: Check for empty sequences
if items:  # True if items has content
    pass

if not items:  # True if items is empty
    pass

# ✗ Wrong:
if len(items) > 0:  # Unnecessary
    pass
```

## Function and Method Definitions

```python
# ✓ Correct: Proper spacing
def calculate_total(items, tax_rate=0.1):
    """Calculate total with tax."""
    subtotal = sum(item.price for item in items)
    tax = subtotal * tax_rate
    return subtotal + tax

# ✗ Wrong: Inconsistent spacing
def calculate_total( items,tax_rate=0.1 ):  # Bad spacing
    pass

# ✓ Correct: Default mutable arguments
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

# ✗ Wrong: Mutable default
def add_item(item, items=[]):  # Same list used for all calls!
    items.append(item)
    return items
```

## Class Definitions

```python
# ✓ Correct: Proper class structure
class BankAccount:
    """Represents a bank account with basic operations."""
    
    def __init__(self, initial_balance=0):
        """Initialize account with optional starting balance."""
        self.balance = initial_balance
        self._transactions = []
    
    def deposit(self, amount):
        """Add money to account."""
        if amount > 0:
            self.balance += amount
            self._transactions.append(f"Deposit: ${amount}")
            return True
        return False
    
    def get_balance(self):
        """Return current balance."""
        return self.balance

# ✗ Wrong: Poor structure
class bankaccount:  # Should be BankAccount
    def __init__(self,balance):  # No space after comma
        self.balance=balance  # No spaces around =
    def deposit(self,amount):  # No space after comma
        self.balance+=amount  # No spaces around +=
```

## Practical Example: Before and After

```python
# ✗ Before (Bad style):
def calcAvg(nums):
  total=0
  for n in nums:
    total=total+n
  return total/len(nums)

class user:
  def __init__(self,name,age):
    self.name=name
    self.age=age

# ✓ After (Good style):
def calculate_average(numbers):
    """Calculate the average of a list of numbers."""
    total = 0
    for number in numbers:
        total = total + number
    return total / len(numbers)


class User:
    """Represents a user with name and age."""
    
    def __init__(self, name, age):
        """Initialize user with name and age."""
        self.name = name
        self.age = age
```

## Linting Tools

```python
# Tools to check PEP 8 compliance:

# 1. pylint
# pip install pylint
# pylint myfile.py

# 2. flake8
# pip install flake8
# flake8 myfile.py

# 3. black (auto-formatter)
# pip install black
# black myfile.py  # Automatically formats file

# 4. VS Code extensions
# - Python (by Microsoft) - Has built-in linting
# - autopep8 - Auto-formats to PEP 8

# Example: Using black
# Before:
def hello(x,y,z):
  return x+y+z

# After black:
def hello(x, y, z):
    return x + y + z
```

## When to Break Rules

```python
# PEP 8 is a guide, not law
# Break rules when:
# 1. It improves readability
# 2. For consistency with existing code
# 3. When code would be less clear

# Example: Long string
# PEP 8 says 79 characters max, but this is clearer:
error_message = "The user authentication failed because the password was incorrect"

# Than:
error_message = (
    "The user authentication failed because "
    "the password was incorrect"
)

# But always have a good reason!
```

## Summary

**Key PEP 8 Rules:**
- 4 spaces for indentation
- 79 characters max line length
- snake_case for variables/functions
- PascalCase for classes
- UPPER_CASE for constants
- 2 blank lines between functions
- Spaces around operators
- Comments start with `#` and space

**Naming Conventions:**
- `variable_name`, `function_name()`: snake_case
- `ClassName`: PascalCase
- `CONSTANT_NAME`: UPPER_CASE
- `_private_name`: leading underscore

**Best Practices:**
- Be consistent
- Use linting tools
- Write docstrings
- Use meaningful names
- Keep code readable

**Tools:**
- pylint, flake8: Check compliance
- black: Auto-format
- VS Code: Built-in linting

## Next Steps

Next, you'll learn professional Python development best practices and project organization.
