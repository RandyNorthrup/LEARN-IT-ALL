---
id: 10-debugging-basics
title: Debugging Fundamentals
chapterId: ch1-intro
order: 10
duration: 20
objectives:
  - Understand what debugging is
  - Learn to read error messages
  - Use print debugging effectively
  - Find and fix common beginner errors
  - Develop debugging mindset
---

# Debugging Fundamentals

## Introduction

Debugging is finding and fixing errors in your code. Every programmer debugs constantly—it's a core skill you'll use daily.

## What is Debugging?

```python
# Bug: Code that doesn't work as expected
def add_numbers(a, b):
    return a + b + 1  # Bug! Should not add 1

result = add_numbers(2, 3)
print(result)  # Outputs 6, expected 5

# Debugging: Finding and fixing the bug
def add_numbers(a, b):
    return a + b  # Fixed!

result = add_numbers(2, 3)
print(result)  # Outputs 5 - correct!
```

## Types of Errors

```python
# 1. Syntax Error - Code won't run
print("Hello"  # Missing closing parenthesis - SyntaxError

# 2. Runtime Error - Code runs then crashes
x = 10 / 0  # ZeroDivisionError

# 3. Logic Error - Code runs but wrong result
def calculate_average(a, b):
    return a + b  # Logic error! Forgot to divide by 2

# No error message, but result is wrong
print(calculate_average(10, 20))  # 30, should be 15
```

## Reading Error Messages

```python
# Error message anatomy:
"""
Traceback (most recent call last):
  File "script.py", line 5, in <module>
    result = divide(10, 0)
  File "script.py", line 2, in divide
    return x / y
ZeroDivisionError: division by zero
"""

# How to read it:
# 1. Bottom line: Error type and message
#    "ZeroDivisionError: division by zero"
#
# 2. Work backwards: Where did error occur?
#    "File script.py, line 2, in divide"
#
# 3. What called it?
#    "File script.py, line 5, in <module>"

def divide(x, y):
    return x / y  # Line 2 - Error happens here

result = divide(10, 0)  # Line 5 - Called from here
```

## Print Debugging

```python
# Most basic debugging: print statements

def calculate_total(items):
    total = 0
    print(f"Starting calculation, items: {items}")  # Debug
    
    for item in items:
        print(f"Processing item: {item}")  # Debug
        total += item
        print(f"Current total: {total}")  # Debug
    
    print(f"Final total: {total}")  # Debug
    return total

result = calculate_total([10, 20, 30])
# Output shows each step:
# Starting calculation, items: [10, 20, 30]
# Processing item: 10
# Current total: 10
# Processing item: 20
# Current total: 30
# Processing item: 30
# Current total: 60
# Final total: 60
```

## Common Beginner Errors

```python
# 1. Forgetting to call function
def greet():
    print("Hello!")

greet  # Wrong! Just references function, doesn't call it
greet()  # Correct! Calls the function

# 2. Wrong indentation
def calculate():
print("Calculating")  # IndentationError!
    return 42

# Fix: Proper indentation
def calculate():
    print("Calculating")
    return 42

# 3. Using = instead of ==
x = 10
if x = 5:  # SyntaxError! Assignment in condition
    print("Five")

# Fix: Use == for comparison
if x == 5:
    print("Five")

# 4. Calling wrong type
x = "10"
result = x + 5  # TypeError! Can't add string and int

# Fix: Convert type
result = int(x) + 5

# 5. Index out of range
numbers = [1, 2, 3]
print(numbers[5])  # IndexError!

# Fix: Check index
if 5 < len(numbers):
    print(numbers[5])
```

## Debugging Process

```python
# Step 1: Reproduce the bug
def buggy_function(x):
    return x * 2 + 1

# Bug report: "Function returns wrong value for x=5"
print(buggy_function(5))  # Reproduce: outputs 11

# Step 2: Isolate the problem
print("Input:", 5)
print("x * 2 =", 5 * 2)  # 10 - correct
print("+ 1 =", 10 + 1)   # 11 - Wait, should be 10!

# Step 3: Identify the issue
# Bug: We're adding 1 when we shouldn't

# Step 4: Fix it
def fixed_function(x):
    return x * 2  # Removed the + 1

print(fixed_function(5))  # 10 - correct!

# Step 5: Test fix with more cases
print(fixed_function(0))   # 0 - good
print(fixed_function(-5))  # -10 - good
print(fixed_function(10))  # 20 - good
```

## Checking Assumptions

```python
# Use print to verify assumptions

def process_data(data):
    # Assumption: data is a list of numbers
    print(f"Type of data: {type(data)}")
    print(f"Length of data: {len(data)}")
    print(f"First item: {data[0] if data else 'Empty'}")
    
    total = 0
    for item in data:
        print(f"Processing: {item}, type: {type(item)}")
        total += item
    
    return total

# Test with different inputs
print(process_data([1, 2, 3]))
# print(process_data("123"))  # Would show data is string, not list!
```

## Simple Test Cases

```python
# Write simple tests while debugging

def multiply(a, b):
    return a * b

# Test cases
assert multiply(2, 3) == 6, "2 * 3 should be 6"
assert multiply(0, 5) == 0, "0 * anything should be 0"
assert multiply(-2, 3) == -6, "negative numbers should work"

print("All tests passed!")

# If a test fails, you know where the bug is
def buggy_multiply(a, b):
    return a + b  # Bug!

# assert buggy_multiply(2, 3) == 6  # AssertionError!
# This tells you the function is broken
```

## Debugging Checklist

```python
# When you have a bug:

# ✓ 1. Read the error message carefully
#      - What type of error?
#      - What line?
#      - What's the message?

# ✓ 2. Look at the line mentioned
#      - Is there a typo?
#      - Is the syntax correct?

# ✓ 3. Check the line before
#      - Sometimes error is on previous line

# ✓ 4. Print variable values
#      - Are they what you expect?

# ✓ 5. Test with simple input
#      - Does it work with easy cases?

# ✓ 6. Check types
#      - Is your string a number?
#      - Is your number a string?

# ✓ 7. Read the code aloud
#      - Explain what each line does
#      - Often you'll spot the bug

# ✓ 8. Take a break
#      - Fresh eyes see bugs better
```

## Preventing Bugs

```python
# 1. Use descriptive names
# Bad:
def f(x, y):
    return x + y

# Good:
def calculate_total_price(base_price, tax):
    return base_price + tax

# 2. Write comments
def calculate_discount(price, percent):
    # Convert percent to decimal (e.g., 20 -> 0.20)
    decimal = percent / 100
    # Calculate discount amount
    discount = price * decimal
    # Return discounted price
    return price - discount

# 3. Test as you go
def add_numbers(a, b):
    result = a + b
    print(f"Test: {a} + {b} = {result}")  # Quick test
    return result

# 4. Start simple
# Don't write 100 lines then test
# Write 5-10 lines, test, repeat

# 5. Use meaningful error messages
def divide(x, y):
    if y == 0:
        raise ValueError("Cannot divide by zero! Check your input.")
    return x / y
```

## Summary

**Debugging Process:**
1. Read error message
2. Find error location
3. Understand the problem
4. Fix the code
5. Test the fix

**Debugging Tools:**
- Print statements
- Error messages
- Simple test cases
- Type checking

**Common Errors:**
- Syntax errors (typos, missing punctuation)
- Runtime errors (division by zero, index out of range)
- Logic errors (wrong formula, wrong condition)

**Best Practices:**
- Read errors carefully
- Use descriptive names
- Test frequently
- Start simple
- Take breaks when stuck

## Next Steps

Next, you'll learn about version control with Git and how to track changes in your code.
