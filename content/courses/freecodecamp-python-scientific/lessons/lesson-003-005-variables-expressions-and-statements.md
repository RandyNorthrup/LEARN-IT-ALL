---
id: lesson-003-005
title: Variables, Expressions, and Statements
chapterId: chapter-03
order: 5
duration: 15
objectives:
  - Create and use variables with proper naming conventions
  - Distinguish between expressions and statements
  - Convert between data types using int(), float(), and str()
  - Read user input with the input() function
---

# Variables, Expressions, and Statements

## Variables and Assignment

A **variable** is a name that refers to a value stored in memory. You create a variable by using the **assignment operator** (`=`):

```python
message = "Hello, Python!"
count = 42
pi = 3.14159
```

The variable name is on the left, the value is on the right. Python figures out the type automatically — you do not need to declare it.

You can change what a variable holds at any time:

```python
x = 10
print(x)    # 10
x = 20
print(x)    # 20
x = x + 5
print(x)    # 25
```

## Variable Naming Rules

Python variable names must follow these rules:

- Must start with a **letter** or **underscore** (`_`), never a number.
- Can contain letters, numbers, and underscores.
- **Case-sensitive**: `name`, `Name`, and `NAME` are three different variables.
- Cannot be a Python **reserved word** (like `if`, `for`, `while`, `class`, `return`).

Python convention is to use **snake_case** for variable names:

```python
# Good (snake_case)
student_name = "Alice"
total_score = 95
max_retry_count = 3

# Avoid (hard to read)
studentname = "Alice"
totalScore = 95       # This is camelCase — valid but not Pythonic
```

## Expressions vs. Statements

An **expression** is any combination of values, variables, and operators that Python can evaluate to produce a result:

```python
2 + 3           # expression → 5
x * 2           # expression → depends on x
len("hello")    # expression → 5
```

A **statement** is a complete unit of execution. Assignment is a statement. A `print()` call is a statement. Statements *do* something; expressions *produce* something.

```python
# Statement: assigns a value
result = 2 + 3

# Statement: prints a value
print(result)
```

## Type Conversion

Sometimes you need to convert between types. Python provides built-in functions for this:

```python
# String to integer
age_str = "25"
age = int(age_str)
print(age + 5)        # 30

# String to float
price_str = "19.99"
price = float(price_str)
print(price * 2)      # 39.98

# Number to string
count = 42
message = "You have " + str(count) + " items."
print(message)        # You have 42 items.
```

Be careful — invalid conversions cause errors:

```python
# This will crash with a ValueError
int("hello")    # Cannot convert "hello" to an integer
```

## Reading Input from Users

The `input()` function pauses your program and waits for the user to type something. It **always returns a string**:

```python
name = input("What is your name? ")
print("Hello,", name)
```

Since `input()` always returns a string, you must convert it if you need a number:

```python
age_str = input("How old are you? ")
age = int(age_str)

# Or combine in one line:
age = int(input("How old are you? "))

years_to_100 = 100 - age
print(f"You will be 100 in {years_to_100} years!")
```

## Putting It Together

```python
# Temperature converter: Fahrenheit to Celsius
fahrenheit_str = input("Enter temperature in Fahrenheit: ")
fahrenheit = float(fahrenheit_str)

celsius = (fahrenheit - 32) * 5 / 9

print(f"{fahrenheit}°F = {round(celsius, 1)}°C")
```

**Example run:**
```
Enter temperature in Fahrenheit: 72
72.0°F = 22.2°C
```

This program demonstrates variables, user input, type conversion, arithmetic expressions, and formatted output — all the building blocks of real programs.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
