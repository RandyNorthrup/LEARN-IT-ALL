---
id: lesson-003-004
title: Introduction: Elements of Python
chapterId: chapter-03
order: 4
duration: 15
objectives:
  - Identify Python's fundamental data types
  - Write statements, expressions, and comments
  - Use basic arithmetic operators
  - Check the type of a value with type()
---

# Introduction: Elements of Python

## Statements and Expressions

A **statement** is a complete instruction that Python can execute. An **expression** is a piece of code that produces a value.

```python
# This is a statement (an assignment)
x = 10

# This is an expression (it produces the value 15)
x + 5

# A statement can contain an expression
result = x + 5   # The right side is an expression; the whole line is a statement
```

## Comments

Comments let you add notes to your code. Python ignores everything after the `#` symbol on a line:

```python
# This is a comment — Python ignores this line
temperature = 72   # This is an inline comment

# Comments explain WHY, not WHAT
# Bad:  x = x + 1  # add 1 to x
# Good: x = x + 1  # move to the next student in the list
```

## Data Types

Every value in Python has a **type**. The four most fundamental types are:

### Integers (`int`)
Whole numbers, positive or negative, with no decimal point.
```python
age = 25
temperature = -10
population = 7_900_000_000   # underscores improve readability
```

### Floating-Point Numbers (`float`)
Numbers with a decimal point.
```python
pi = 3.14159
price = 9.99
scientific = 2.5e6   # 2,500,000.0 in scientific notation
```

### Strings (`str`)
Text enclosed in single or double quotes.
```python
name = "Alice"
greeting = 'Hello, World!'
message = "Python is fun"
```

### Booleans (`bool`)
Logical values: either `True` or `False`.
```python
is_raining = True
is_weekend = False
```

## The `type()` Function

You can check the type of any value using the built-in `type()` function:

```python
print(type(42))          # <class 'int'>
print(type(3.14))        # <class 'float'>
print(type("hello"))     # <class 'str'>
print(type(True))        # <class 'bool'>
```

## Arithmetic Operators

Python supports all the standard math operations and a few extras:

| Operator | Operation | Example | Result |
|----------|-----------|---------|--------|
| `+` | Addition | `7 + 3` | `10` |
| `-` | Subtraction | `7 - 3` | `4` |
| `*` | Multiplication | `7 * 3` | `21` |
| `/` | Division | `7 / 3` | `2.3333...` |
| `//` | Floor Division | `7 // 3` | `2` |
| `%` | Modulo (remainder) | `7 % 3` | `1` |
| `**` | Exponentiation | `2 ** 10` | `1024` |

Notice that `/` always returns a `float`, even when dividing evenly:

```python
print(10 / 2)    # 5.0 (float, not int)
print(10 // 2)   # 5   (integer floor division)
print(10 % 3)    # 1   (remainder after division)
print(2 ** 8)    # 256 (2 to the power of 8)
```

## Putting It Together

```python
# Calculate the total cost of items with tax
price = 29.99
quantity = 3
tax_rate = 0.08

subtotal = price * quantity
tax = subtotal * tax_rate
total = subtotal + tax

print("Subtotal:", subtotal)
print("Tax:", round(tax, 2))
print("Total:", round(total, 2))
```

**Output:**
```
Subtotal: 89.97
Tax: 7.2
Total: 97.17
```

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
