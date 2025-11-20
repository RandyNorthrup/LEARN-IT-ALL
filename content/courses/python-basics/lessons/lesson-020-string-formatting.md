---
id: 46-string-formatting
title: String Formatting with f-strings
chapterId: ch2-variables
order: 7
duration: 30
objectives:
  - Master f-string syntax
  - Format numbers with precision
  - Use expressions inside f-strings
  - Learn formatting specifications
  - Compare f-strings with other formatting methods
---

# String Formatting with f-strings

## Introduction

F-strings (formatted string literals) are the modern way to format strings in Python. They're fast, readable, and powerful. Introduced in Python 3.6, they've become the preferred formatting method.

## Basic f-string Syntax

Put `f` before the string and use `{}` for variables:

```python
# Basic f-string
name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old")
# My name is Alice and I am 25 years old

# Without f-string (old way)
print("My name is " + name + " and I am " + str(age) + " years old")
```

## Expressions Inside f-strings

You can put any Python expression inside `{}`:

```python
# Math expressions
width = 10
height = 5
print(f"Area: {width * height}")  # Area: 50

# Function calls
name = "alice"
print(f"Hello, {name.upper()}!")  # Hello, ALICE!

# Conditional expressions
age = 25
status = f"Adult" if age >= 18 else "Minor"
print(f"Status: {status}")  # Status: Adult

# Direct conditionals
score = 85
print(f"Result: {'Pass' if score >= 60 else 'Fail'}")  # Result: Pass
```

## Formatting Numbers

### Decimal Places

```python
# Floating point numbers
price = 19.99567
print(f"Price: ${price:.2f}")  # Price: $19.00 (2 decimal places)

pi = 3.14159265359
print(f"Pi: {pi:.3f}")  # Pi: 3.142 (3 decimal places)
print(f"Pi: {pi:.7f}")  # Pi: 3.1415927 (7 decimal places)
```

### Thousands Separator

```python
# Add commas for readability
population = 8000000
print(f"Population: {population:,}")  # Population: 8,000,000

salary = 75000
print(f"Salary: ${salary:,}")  # Salary: $75,000

# Combine with decimal places
revenue = 1234567.89
print(f"Revenue: ${revenue:,.2f}")  # Revenue: $1,234,567.89
```

### Percentage

```python
# Format as percentage
success_rate = 0.856
print(f"Success: {success_rate:.1%}")  # Success: 85.6%

completion = 0.75
print(f"Progress: {completion:.0%}")  # Progress: 75%
```

### Padding and Alignment

```python
# Right align (default for numbers)
for i in range(1, 11):
    print(f"{i:3} squared is {i*i:4}")
#   1 squared is    1
#   2 squared is    4
#   3 squared is    9
# ...
#  10 squared is  100

# Left align
name = "Alice"
print(f"{name:<10} | Age: 25")  # Alice      | Age: 25

# Center align
title = "Python"
print(f"{title:^20}")  # "       Python       "

# Right align (explicit)
number = 42
print(f"{number:>10}")  # "        42"
```

### Padding with Characters

```python
# Pad with zeros
invoice = 42
print(f"Invoice: {invoice:05}")  # Invoice: 00042

# Pad with custom character
item = "Apple"
print(f"{item:*<10}")  # Apple*****
print(f"{item:*>10}")  # *****Apple
print(f"{item:*^10}")  # **Apple***
```

## Practical Examples

### Example 1: Shopping Receipt

```python
# Shopping receipt
items = [
    ("Apple", 3, 0.99),
    ("Banana", 5, 0.59),
    ("Orange", 2, 1.29)
]

print("=" * 40)
print(f"{'Item':<15} {'Qty':>5} {'Price':>8} {'Total':>10}")
print("-" * 40)

total = 0
for name, qty, price in items:
    item_total = qty * price
    total += item_total
    print(f"{name:<15} {qty:>5} ${price:>7.2f} ${item_total:>9.2f}")

print("-" * 40)
print(f"{'Grand Total:':<30} ${total:>9.2f}")
print("=" * 40)

# Output:
# ========================================
# Item              Qty    Price      Total
# ----------------------------------------
# Apple               3 $   0.99 $      2.97
# Banana              5 $   0.59 $      2.95
# Orange              2 $   1.29 $      2.58
# ----------------------------------------
# Grand Total:                   $      8.50
# ========================================
```

### Example 2: Progress Bar

```python
# Progress bar
def show_progress(current, total):
    percentage = current / total
    bar_length = 40
    filled = int(bar_length * percentage)
    bar = '█' * filled + '-' * (bar_length - filled)
    print(f"\r[{bar}] {percentage:.1%}", end='')

# Usage
for i in range(1, 101):
    show_progress(i, 100)
    # In real code, add time.sleep(0.1)
```

### Example 3: Data Table

```python
# Student grades table
students = [
    ("Alice Johnson", 95, 87, 92),
    ("Bob Smith", 78, 82, 80),
    ("Charlie Brown", 88, 91, 89)
]

print(f"{'Name':<20} {'Math':>6} {'Science':>8} {'English':>8} {'Average':>8}")
print("=" * 60)

for name, math, science, english in students:
    average = (math + science + english) / 3
    print(f"{name:<20} {math:>6} {science:>8} {english:>8} {average:>8.1f}")
```

### Example 4: Scientific Notation

```python
# Large and small numbers
speed_of_light = 299792458  # m/s
print(f"Speed of light: {speed_of_light:e} m/s")
# Speed of light: 2.997925e+08 m/s

planck_constant = 0.000000000000000000000000000000000662607015
print(f"Planck constant: {planck_constant:.3e}")
# Planck constant: 6.626e-34
```

### Example 5: Binary, Octal, Hex

```python
# Number base conversion
number = 42

print(f"Decimal: {number}")      # Decimal: 42
print(f"Binary: {number:b}")     # Binary: 101010
print(f"Octal: {number:o}")      # Octal: 52
print(f"Hex: {number:x}")        # Hex: 2a
print(f"Hex (upper): {number:X}") # Hex (upper): 2A

# With prefix
print(f"Binary: {number:#b}")    # Binary: 0b101010
print(f"Octal: {number:#o}")     # Octal: 0o52
print(f"Hex: {number:#x}")       # Hex: 0x2a
```

### Example 6: Date Formatting

```python
# Date formatting (with datetime)
from datetime import datetime

now = datetime.now()
print(f"Date: {now:%Y-%m-%d}")           # Date: 2025-11-18
print(f"Time: {now:%H:%M:%S}")           # Time: 14:30:00
print(f"Full: {now:%Y-%m-%d %H:%M:%S}")  # Full: 2025-11-18 14:30:00
print(f"Readable: {now:%B %d, %Y}")      # Readable: November 18, 2025
```

## Multi-line f-strings

```python
# Multi-line f-strings
name = "Alice"
age = 25
job = "Engineer"

# Method 1: Multi-line string
message = f"""
Hello {name}!
You are {age} years old.
Your job is: {job}
"""
print(message)

# Method 2: Backslash continuation
message = f"Hello {name}! " \
          f"You are {age} years old. " \
          f"Your job is: {job}"
print(message)
```

## Debugging with f-strings (Python 3.8+)

```python
# Self-documenting expressions
x = 10
y = 20

# Without = (just the value)
print(f"{x + y}")  # 30

# With = (shows expression AND value)
print(f"{x + y =}")  # x + y = 30
print(f"{x = }")     # x = 10
print(f"{y = }")     # y = 20

# Great for debugging
name = "Alice"
age = 25
print(f"{name = }, {age = }")  # name = 'Alice', age = 25
```

## Comparison with Other Methods

```python
# Old methods (still work, but f-strings are better)
name = "Alice"
age = 25

# Method 1: Concatenation (avoid)
print("My name is " + name + " and I am " + str(age))

# Method 2: % formatting (old style)
print("My name is %s and I am %d" % (name, age))

# Method 3: .format() method (verbose)
print("My name is {} and I am {}".format(name, age))

# Method 4: f-strings (BEST!)
print(f"My name is {name} and I am {age}")
```

## Format Specification Mini-Language

```python
# General format: {value:[[fill]align][sign][#][0][width][,][.precision][type]}

# Fill and align
print(f"{'test':*<10}")   # test******
print(f"{'test':*>10}")   # ******test
print(f"{'test':*^10}")   # ***test***

# Sign
number = 42
print(f"{number:+}")      # +42 (always show sign)
print(f"{number:-}")      # 42 (only negative)
print(f"{number: }")      # " 42" (space for positive)

# Width and precision
value = 3.14159
print(f"{value:10.2f}")   # "      3.14" (width 10, 2 decimals)

# Type
print(f"{42:d}")  # 42 (decimal)
print(f"{42:f}")  # 42.000000 (float)
print(f"{42:e}")  # 4.200000e+01 (exponent)
print(f"{42:x}")  # 2a (hexadecimal)
```

## Common Patterns

```python
# Currency
price = 29.99
print(f"${price:.2f}")  # $29.99

# Percentage
ratio = 0.75
print(f"{ratio:.1%}")  # 75.0%

# Large numbers
population = 8000000
print(f"{population:,}")  # 8,000,000

# Padding invoice numbers
invoice = 42
print(f"INV-{invoice:05}")  # INV-00042

# Right-aligned numbers in table
for i in [1, 10, 100, 1000]:
    print(f"{i:>6}")
#      1
#     10
#    100
#   1000
```

## Summary

- **f-strings**: Put `f` before string, use `{}` for variables
- **Expressions**: Any Python code works inside `{}`
- **Precision**: `:.2f` for 2 decimal places
- **Thousands**: `:,` adds commas
- **Percentage**: `:.1%` formats as percentage
- **Alignment**: `:<` left, `:>` right, `:^` center
- **Padding**: `{value:05}` pads with zeros
- **Debugging**: `{variable =}` shows name and value (Python 3.8+)
- **Best practice**: Use f-strings over older formatting methods

## Next Steps

Next, you'll learn about advanced variable concepts including scope preview and variable lifecycle.
