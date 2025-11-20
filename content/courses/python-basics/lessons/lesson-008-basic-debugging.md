---
id: basic-debugging
title: Basic Debugging Techniques
chapterId: ch1-intro
order: 8
duration: 25
objectives:
  - Understand common Python errors
  - Learn how to read error messages
  - Master basic debugging techniques
---

# Basic Debugging Techniques

Every programmer encounters errors (bugs) in their code. Learning to find and fix them is one of the most important skills you'll develop. Let's explore the basics of debugging Python code.

## What is Debugging?

**Debugging** is the process of finding and fixing errors in your code. The term comes from an actual bug (a moth) that caused problems in an early computer!

## Types of Errors

### 1. Syntax Errors

Mistakes in Python's grammar that prevent the code from running:

```python
# Missing colon
if age > 18
    print("Adult")
# SyntaxError: invalid syntax

# Missing closing quote
message = "Hello
# SyntaxError: unterminated string literal

# Missing closing parenthesis
print("Hello"
# SyntaxError: unexpected EOF while parsing
```

**How to fix**: Read the error message carefully - Python tells you exactly where the problem is!

### 2. Runtime Errors (Exceptions)

Errors that occur while the program is running:

```python
# ZeroDivisionError
result = 10 / 0
# ZeroDivisionError: division by zero

# TypeError
age = "25"
next_year = age + 1
# TypeError: can only concatenate str (not "int") to str

# ValueError
age = int("twenty-five")
# ValueError: invalid literal for int() with base 10: 'twenty-five'

# NameError
print(name)  # 'name' was never defined
# NameError: name 'name' is not defined

# IndexError
numbers = [1, 2, 3]
print(numbers[5])
# IndexError: list index out of range
```

### 3. Logical Errors

The code runs without errors but produces wrong results:

```python
# Wrong: Calculates 90% instead of adding 10%
price = 100
discounted_price = price * 0.10  # Should be price * 1.10

# Wrong: Using wrong operator
# Want to check if even, but using assignment instead of equality
number = 10
if number % 2 = 0:  # Should be ==
    print("Even")
```

## Reading Error Messages

Python error messages contain valuable information:

```python
print(name)
```

Error output:
```
Traceback (most recent call last):
  File "program.py", line 1, in <module>
    print(name)
NameError: name 'name' is not defined
```

Understanding the message:
1. **Traceback**: Shows where the error occurred
2. **File name and line number**: `program.py`, line 1
3. **Code snippet**: Shows the problematic line
4. **Error type**: `NameError`
5. **Description**: `name 'name' is not defined`

## Common Errors and Solutions

### NameError: Variable Not Defined

```python
# Wrong
print(name)

# Fix: Define the variable first
name = "Alice"
print(name)
```

### TypeError: Wrong Type

```python
# Wrong
age = "25"
next_year = age + 1

# Fix: Convert to int
age = 25  # or int("25")
next_year = age + 1
```

### IndentationError: Wrong Indentation

```python
# Wrong
def greet():
print("Hello")  # Not indented

# Fix: Proper indentation
def greet():
    print("Hello")
```

### ZeroDivisionError: Division by Zero

```python
# Wrong
result = 10 / 0

# Fix: Check before dividing
divisor = 0
if divisor != 0:
    result = 10 / divisor
else:
    print("Cannot divide by zero!")
```

### IndexError: Index Out of Range

```python
# Wrong
numbers = [1, 2, 3]
print(numbers[5])  # Only indices 0, 1, 2 exist

# Fix: Check list length or use valid index
if len(numbers) > 5:
    print(numbers[5])
else:
    print("Index out of range")
```

## Debugging Techniques

### 1. Print Debugging

Add `print()` statements to see what's happening:

```python
def calculate_total(price, quantity):
    print(f"Price: {price}")  # Debug output
    print(f"Quantity: {quantity}")  # Debug output
    total = price * quantity
    print(f"Total: {total}")  # Debug output
    return total

result = calculate_total(10, 5)
```

### 2. Check Variable Types

Use `type()` to verify variable types:

```python
age = "25"
print(type(age))  # <class 'str'> - Aha! Should be int

age = int(age)
print(type(age))  # <class 'int'> - Fixed!
```

### 3. Check Variable Values

Verify values at different points:

```python
x = 10
print(f"x = {x}")  # Check initial value

x = x + 5
print(f"After adding 5: x = {x}")  # Check after operation

x = x * 2
print(f"After doubling: x = {x}")  # Check final value
```

### 4. Simplify the Problem

Test small parts of your code independently:

```python
# Complex code with bug
result = ((a + b) * c - d) / e

# Break it down
step1 = a + b
print(f"Step 1: {step1}")

step2 = step1 * c
print(f"Step 2: {step2}")

step3 = step2 - d
print(f"Step 3: {step3}")

result = step3 / e
print(f"Final result: {result}")
```

### 5. Comment Out Code

Isolate the problem by commenting out sections:

```python
def process_data():
    step1()
    # step2()  # Comment out to test
    # step3()  # Comment out to test
    step4()
```

### 6. Use Rubber Duck Debugging

Explain your code line-by-line to someone (or something, like a rubber duck). Often, you'll find the bug while explaining!

## Debugging Workflow

1. **Read the error message** - Python tells you what's wrong
2. **Find the line number** - Go to the line mentioned in the error
3. **Understand the error type** - Know what kind of error it is
4. **Add print statements** - See what values variables have
5. **Test small pieces** - Isolate the problematic code
6. **Fix and test** - Make changes and run again
7. **Remove debug code** - Clean up print statements when done

## Practical Debugging Example

### Buggy Code

```python
# Calculate average of three numbers
num1 = input("Enter first number: ")
num2 = input("Enter second number: ")
num3 = input("Enter third number: ")

total = num1 + num2 + num3
average = total / 3

print(f"Average: {average}")
```

### Finding the Bug

```python
# Add debug prints
num1 = input("Enter first number: ")
print(f"num1 = {num1}, type = {type(num1)}")  # Debug

num2 = input("Enter second number: ")
print(f"num2 = {num2}, type = {type(num2)}")  # Debug

num3 = input("Enter third number: ")
print(f"num3 = {num3}, type = {type(num3)}")  # Debug

total = num1 + num2 + num3
print(f"total = {total}, type = {type(total)}")  # Debug
```

**Output reveals the problem:**
```
num1 = 10, type = <class 'str'>
num2 = 20, type = <class 'str'>
num3 = 30, type = <class 'str'>
total = 102030, type = <class 'str'>  # String concatenation!
```

### Fixed Code

```python
# Convert to int
num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))
num3 = int(input("Enter third number: "))

total = num1 + num2 + num3
average = total / 3

print(f"Average: {average}")
```

## Prevention is Better Than Cure

### Write Clean Code

```python
# Unclear
x = (a + b) * c / d - e

# Clear
subtotal = a + b
multiplied = subtotal * c
divided = multiplied / d
result = divided - e
```

### Use Meaningful Names

```python
# Bad
x = 10
y = 20
z = x + y

# Good
price = 10
tax = 20
total = price + tax
```

### Check Your Inputs

```python
age_str = input("Enter your age: ")

if age_str.isdigit():
    age = int(age_str)
    print(f"You are {age} years old")
else:
    print("Please enter a valid number")
```

### Test as You Go

Don't write hundreds of lines before testing. Test small pieces frequently:

```python
# Test each part
name = "Alice"
print(name)  # Works? ✓

age = 25
print(age)  # Works? ✓

message = f"Hello {name}, you are {age}"
print(message)  # Works? ✓
```

## Using Try-Except for Error Handling

Handle errors gracefully (you'll learn more about this later):

```python
try:
    age = int(input("Enter your age: "))
    print(f"You are {age} years old")
except ValueError:
    print("That's not a valid number!")
```

## Common Debugging Traps

### 1. Typos in Variable Names

```python
username = "Alice"
print(usernme)  # NameError - typo!
```

### 2. Using = Instead of ==

```python
# Wrong: Assignment, not comparison
if age = 18:  # SyntaxError
    print("Eighteen")

# Right: Comparison
if age == 18:
    print("Eighteen")
```

### 3. Forgetting to Convert Input

```python
# Wrong
age = input("Age: ")
if age > 18:  # TypeError - comparing string to int
    print("Adult")

# Right
age = int(input("Age: "))
if age > 18:
    print("Adult")
```

### 4. Off-by-One Errors

```python
numbers = [1, 2, 3, 4, 5]

# Wrong: IndexError - list only has indices 0-4
for i in range(1, 6):
    print(numbers[i])

# Right
for i in range(5):
    print(numbers[i])
```

## Debugging Tools (Preview)

As you advance, you'll use more sophisticated tools:
- **Python Debugger (pdb)**: Step through code line by line
- **IDE Debuggers**: Visual Studio Code, PyCharm have built-in debuggers
- **Linters**: Tools like pylint catch errors before you run code
- **Testing Frameworks**: pytest, unittest for automated testing

## Key Takeaways

- **Three error types**: Syntax, Runtime, Logical
- **Read error messages** carefully - they tell you what's wrong
- **Print debugging** is simple and effective
- **Test small pieces** of code independently
- **Check types and values** with `type()` and `print()`
- **Prevent bugs** with clear code and meaningful names
- **Test frequently** - don't write too much code before testing
- **Simplify** complex expressions for easier debugging
- **Comment out code** to isolate problems

## Chapter 1 Complete!

Congratulations! You've completed Chapter 1 and learned the fundamentals of Python:

✓ What Python is and why it's popular  
✓ Variables and assignment  
✓ Data types (int, float, str, bool, None)  
✓ String operations and methods  
✓ Numbers and mathematical operations  
✓ Getting user input  
✓ Writing comments  
✓ Basic debugging techniques  

You're now ready to take the Chapter 1 Quiz and move on to more advanced topics!
