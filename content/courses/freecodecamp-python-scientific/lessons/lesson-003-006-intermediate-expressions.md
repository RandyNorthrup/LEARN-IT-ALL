---
id: lesson-003-006
title: Intermediate Expressions
chapterId: chapter-03
order: 6
duration: 15
objectives:
  - Apply operator precedence rules correctly
  - Use string concatenation, repetition, and f-strings
  - Work with the modulo operator for common patterns
  - Use augmented assignment operators
---

# Intermediate Expressions

## Operator Precedence

When an expression has multiple operators, Python follows a specific order called **operator precedence** (similar to PEMDAS in math):

| Priority | Operator | Description |
|----------|----------|-------------|
| Highest | `**` | Exponentiation |
| | `*`, `/`, `//`, `%` | Multiplication, division, floor division, modulo |
| Lowest | `+`, `-` | Addition, subtraction |

Operators with the same priority are evaluated **left to right** (except `**`, which is right to left).

```python
result = 2 + 3 * 4
print(result)        # 14, not 20 (multiplication first)

result = (2 + 3) * 4
print(result)        # 20 (parentheses override precedence)

result = 2 ** 3 ** 2
print(result)        # 512 (right-to-left: 3**2=9, then 2**9=512)
```

When in doubt, **use parentheses** to make your intentions clear. Explicit code is always better than clever code.

## String Concatenation and Repetition

The `+` and `*` operators behave differently with strings:

```python
# Concatenation: joining strings with +
first = "Hello"
last = "World"
full = first + ", " + last + "!"
print(full)      # Hello, World!

# Repetition: repeating strings with *
line = "-" * 40
print(line)      # ----------------------------------------

banner = "Ha" * 3
print(banner)    # HaHaHa
```

You cannot add a string and a number directly:

```python
# This causes a TypeError:
# print("Age: " + 25)

# Fix: convert the number to a string
print("Age: " + str(25))    # Age: 25
```

## F-Strings (Formatted String Literals)

F-strings are the modern and preferred way to embed values inside strings. Prefix the string with `f` and place expressions inside `{}`:

```python
name = "Alice"
age = 30
score = 95.678

print(f"Name: {name}")
print(f"{name} is {age} years old.")
print(f"Score: {score:.2f}")         # 2 decimal places: 95.68
print(f"Next year: {age + 1}")       # Expressions work inside {}
```

F-strings are more readable than concatenation and more concise than `.format()`.

## The Modulo Operator

The modulo operator (`%`) returns the **remainder** after division. It has many practical uses:

```python
# Check if a number is even or odd
number = 17
if number % 2 == 0:
    print("Even")
else:
    print("Odd")     # Output: Odd

# Wrap around (e.g., clock math)
hour = 23
new_hour = (hour + 5) % 24
print(new_hour)   # 4 (wraps past midnight)

# Extract the last digit of a number
value = 4827
last_digit = value % 10
print(last_digit)   # 7
```

## Augmented Assignment Operators

Python provides shorthand operators that combine arithmetic with assignment:

```python
count = 10

count += 3    # Same as: count = count + 3  → 13
count -= 2    # Same as: count = count - 2  → 11
count *= 4    # Same as: count = count * 4  → 44
count //= 5   # Same as: count = count // 5 → 8
count %= 3    # Same as: count = count % 3  → 2

print(count)  # 2
```

These operators make code shorter and clearer when updating a variable based on its current value.

## Common Expression Patterns

```python
# Swap two variables
a = 5
b = 10
a, b = b, a
print(a, b)   # 10 5

# Calculate a percentage
correct = 17
total = 20
percentage = (correct / total) * 100
print(f"Score: {percentage}%")   # Score: 85.0%

# Convert minutes to hours and minutes
total_minutes = 143
hours = total_minutes // 60
minutes = total_minutes % 60
print(f"{total_minutes} minutes = {hours}h {minutes}m")  # 143 minutes = 2h 23m
```

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
