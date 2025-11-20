---
id: comments
title: Writing Comments
chapterId: ch1-intro
order: 7
duration: 15
objectives:
  - Understand the purpose of comments
  - Learn single-line and multi-line comment syntax
  - Follow commenting best practices
---

# Writing Comments

Comments are notes in your code that Python ignores when running the program. They're essential for explaining what your code does and making it easier for others (and future you!) to understand.

## Why Write Comments?

1. **Explain complex logic**: Help others understand tricky code
2. **Document your intentions**: Clarify why you made certain choices
3. **Remind yourself**: Remember what you were thinking
4. **Team communication**: Help teammates understand your code
5. **Disable code**: Temporarily turn off code without deleting it

## Single-Line Comments

Use the `#` symbol to create single-line comments:

```python
# This is a comment
print("Hello, World!")  # This is also a comment
```

Everything after `#` on that line is ignored by Python:

```python
# Calculate the area of a rectangle
width = 10
height = 20
area = width * height  # Store result in 'area' variable
```

## Multi-Line Comments

### Method 1: Multiple # Symbols

```python
# This is a longer comment
# that spans multiple lines
# using multiple # symbols
print("Hello")
```

### Method 2: Triple Quotes (Docstrings)

Triple quotes create multi-line strings that can act as comments:

```python
"""
This is a multi-line comment
using triple double quotes.
It can span many lines.
"""
print("Hello")
```

Or with single quotes:

```python
'''
This is also a multi-line comment
using triple single quotes.
'''
print("Hello")
```

**Note**: Triple-quoted strings are technically string literals, not comments. If they're not assigned to a variable, Python ignores them, making them function like comments.

## When to Use Comments

### Good Use Cases

#### 1. Explain Complex Logic

```python
# Calculate compound interest using the formula: A = P(1 + r)^t
principal = 1000
rate = 0.05
time = 10
amount = principal * (1 + rate) ** time
```

#### 2. Clarify Intent

```python
# Use floor division to get whole days
total_hours = 100
days = total_hours // 24  # 4 days (not 4.166...)
```

#### 3. TODO Reminders

```python
# TODO: Add input validation
age = int(input("Enter your age: "))

# FIXME: This breaks when user enters 0
result = 100 / user_input
```

#### 4. Section Headers

```python
# ===== User Input Section =====
name = input("Enter your name: ")
age = int(input("Enter your age: "))

# ===== Calculation Section =====
years_until_100 = 100 - age

# ===== Output Section =====
print(f"Hi {name}, you'll be 100 in {years_until_100} years!")
```

#### 5. Explain Why, Not What

```python
# Good: Explains WHY
# We add 1 because lists are 0-indexed
position = index + 1

# Bad: States the obvious
# Add 1 to index
position = index + 1
```

## When NOT to Use Comments

### Bad Comments

#### 1. Stating the Obvious

```python
# Bad: Comment just repeats the code
age = 25  # Set age to 25
name = "Alice"  # Set name to Alice

# Good: No comment needed (code is clear)
age = 25
name = "Alice"
```

#### 2. Commenting Bad Code Instead of Fixing It

```python
# Bad: Comment explains confusing code
x = a + b - c * d / e  # Calculate the thing

# Good: Use better names and structure
subtotal = price * quantity
tax = subtotal * tax_rate
total = subtotal + tax
```

#### 3. Outdated Comments

```python
# Bad: Comment doesn't match code
# Calculate total in dollars
total_euros = price * quantity  # Wrong currency!
```

## Comment Style Guidelines

### 1. Use Proper Grammar and Punctuation

```python
# Good
# Calculate the average score for all students.
average = sum(scores) / len(scores)

# Okay
# calculate average score
average = sum(scores) / len(scores)
```

### 2. Keep Comments Up to Date

```python
# When you change code, update the comments too!

# Old code and comment:
# Add 10% bonus
salary = base_salary * 1.10

# Updated code and comment:
# Add 15% bonus (updated policy as of 2025)
salary = base_salary * 1.15
```

### 3. Be Concise

```python
# Good
# Convert Celsius to Fahrenheit
fahrenheit = (celsius * 9/5) + 32

# Too verbose
# This line of code takes the temperature value that is
# currently stored in the celsius variable and converts it
# to Fahrenheit using the standard conversion formula
fahrenheit = (celsius * 9/5) + 32
```

### 4. Use Comments for Complex Logic Only

```python
# Needs comment (complex)
# Binary search - check middle, then recursively search left or right half
result = binary_search(arr, target, 0, len(arr) - 1)

# No comment needed (simple)
total = price + tax
```

## Docstrings (Function Documentation)

For functions (you'll learn these later), use docstrings:

```python
def calculate_area(width, height):
    """
    Calculate the area of a rectangle.
    
    Args:
        width: The width of the rectangle
        height: The height of the rectangle
    
    Returns:
        The area (width * height)
    """
    return width * height
```

## Commenting Out Code

Temporarily disable code for testing:

```python
print("This will run")
# print("This is commented out")
print("This will also run")
```

### Multi-Line Code Comments

```python
# Temporarily disable this section
# while testing other features
# total = price * quantity
# tax = total * 0.08
# final_price = total + tax

# Use this simplified version for testing
final_price = 100
```

**Tip**: Most code editors let you comment/uncomment multiple lines with a keyboard shortcut (Ctrl+/ or Cmd+/).

## Real-World Examples

### Example 1: Data Processing Script

```python
# ===== Data Import =====
# Read student scores from CSV file
scores = [85, 92, 78, 90, 88]

# ===== Calculations =====
# Calculate class statistics
average = sum(scores) / len(scores)
highest = max(scores)
lowest = min(scores)

# ===== Output =====
print(f"Class Average: {average:.2f}")
print(f"Highest Score: {highest}")
print(f"Lowest Score: {lowest}")
```

### Example 2: Configuration Settings

```python
# Application Settings
# These values can be modified to customize behavior

MAX_LOGIN_ATTEMPTS = 3  # Lock account after 3 failed attempts
SESSION_TIMEOUT = 1800  # 30 minutes in seconds
DEBUG_MODE = False      # Set to True for development
```

### Example 3: Algorithm Explanation

```python
# Euclidean algorithm to find GCD (Greatest Common Divisor)
# Repeatedly replace larger number with remainder until one is 0
a = 48
b = 18

while b != 0:
    temp = b
    b = a % b  # Get remainder
    a = temp

gcd = a  # When b is 0, a contains the GCD
print(f"GCD: {gcd}")  # Output: 6
```

## Comment Best Practices Summary

✅ **DO:**
- Explain WHY, not WHAT
- Comment complex or non-obvious logic
- Keep comments up to date
- Use comments for TODOs and FIXMEs
- Be concise and clear
- Use proper grammar

❌ **DON'T:**
- State the obvious
- Leave outdated comments
- Comment bad code instead of rewriting it
- Over-comment simple code
- Write essays in comments

## Python Enhancement Proposal (PEP) 8 Guidelines

Python's official style guide recommends:

```python
# Comments should be complete sentences
# Start with a capital letter and end with a period.

# Inline comments should be separated by at least 2 spaces
x = x + 1  # Increment x

# Block comments apply to code that follows
# and are indented to the same level as that code.
```

## Key Takeaways

- Use **`#`** for single-line comments
- Use **triple quotes** for multi-line comments
- Comments help explain **complex logic** and **intentions**
- **Update comments** when you change code
- Don't comment **obvious code**
- Use comments for **TODOs** and **section headers**
- Keep comments **concise** and **clear**
- **Good code** with clear names needs fewer comments

## What's Next?

You've learned how to document your code! In the next lesson, we'll cover **basic debugging** techniques to find and fix errors in your programs.
