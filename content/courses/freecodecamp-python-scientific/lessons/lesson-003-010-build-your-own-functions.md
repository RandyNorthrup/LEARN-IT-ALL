---
id: lesson-003-010
title: Build your own Functions
chapterId: chapter-03
order: 10
duration: 15
objectives:
  - Define functions using the def keyword
  - Distinguish between parameters and arguments
  - Write functions with return statements and docstrings
  - Understand variable scope and default parameters
---

# Build your own Functions

## Defining a Function

You create your own functions using the `def` keyword, followed by a name, parentheses, and a colon. The body is indented:

```python
def greet():
    print("Hello!")
    print("Welcome to Python.")

# Call the function
greet()
greet()   # You can call it as many times as you want
```

A function must be **defined before** it is called. Python reads your code from top to bottom.

## Parameters and Arguments

A **parameter** is a variable listed in the function definition. An **argument** is the actual value passed when calling the function:

```python
def greet(name):          # 'name' is a parameter
    print(f"Hello, {name}!")

greet("Alice")            # "Alice" is an argument
greet("Bob")              # "Bob" is an argument
```

Functions can have multiple parameters:

```python
def add(a, b):
    print(f"{a} + {b} = {a + b}")

add(3, 5)      # 3 + 5 = 8
add(10, 20)    # 10 + 20 = 30
```

## The `return` Statement

A function can send a value back to the caller using `return`. This is what makes functions truly powerful — they produce results you can use:

```python
def square(n):
    return n ** 2

result = square(5)
print(result)         # 25
print(square(3) + square(4))   # 9 + 16 = 25
```

When Python hits `return`, the function immediately exits, and the value after `return` is sent back:

```python
def absolute_value(x):
    if x < 0:
        return -x
    return x

print(absolute_value(-7))   # 7
print(absolute_value(3))    # 3
```

## Functions Without `return`

If a function has no `return` statement, it returns `None` by default:

```python
def say_hello():
    print("Hello!")

result = say_hello()     # Prints "Hello!"
print(result)            # None
```

## Docstrings

A **docstring** is a string placed immediately after the `def` line that documents what the function does:

```python
def celsius_to_fahrenheit(celsius):
    """Convert a temperature from Celsius to Fahrenheit."""
    return celsius * 9 / 5 + 32

# You can read a function's docstring
help(celsius_to_fahrenheit)
```

Docstrings are a best practice. They make your code self-documenting and help other developers (and your future self) understand your functions.

## Variable Scope

Variables created inside a function are **local** — they only exist while the function is running:

```python
def my_function():
    secret = 42       # Local variable
    print(secret)

my_function()          # 42
# print(secret)        # NameError: 'secret' is not defined
```

Variables created outside any function are **global** — they can be read from inside functions:

```python
greeting = "Hello"     # Global variable

def say_hi(name):
    print(f"{greeting}, {name}!")   # Can read 'greeting'

say_hi("Alice")        # Hello, Alice!
```

## Default Parameters

You can give parameters default values. If the caller doesn't provide an argument, the default is used:

```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")                  # Hello, Alice!
greet("Bob", "Good morning")    # Good morning, Bob!
```

## Returning Multiple Values

Python functions can return multiple values using tuples:

```python
def divide(a, b):
    """Return quotient and remainder."""
    quotient = a // b
    remainder = a % b
    return quotient, remainder

q, r = divide(17, 5)
print(f"17 ÷ 5 = {q} remainder {r}")   # 17 ÷ 5 = 3 remainder 2
```

## Practical Example

```python
def calculate_bmi(weight_kg, height_m):
    """Calculate Body Mass Index from weight (kg) and height (m)."""
    bmi = weight_kg / (height_m ** 2)
    return round(bmi, 1)

def bmi_category(bmi):
    """Return the BMI category as a string."""
    if bmi < 18.5:
        return "Underweight"
    elif bmi < 25:
        return "Normal weight"
    elif bmi < 30:
        return "Overweight"
    else:
        return "Obese"

my_bmi = calculate_bmi(70, 1.75)
print(f"BMI: {my_bmi} - {bmi_category(my_bmi)}")
# BMI: 22.9 - Normal weight
```

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
