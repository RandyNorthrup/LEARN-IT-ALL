---
id: lesson-002-variables
title: Variables and Assignment
chapterId: ch1-intro
order: 2
duration: 30
objectives:
  - Understand what variables are and how Python's memory model works
  - Learn how to create, assign, and reassign variables
  - Use type(), id(), and del for variable inspection and management
  - Master naming conventions and augmented assignment operators
  - Understand dynamic typing, None, and common beginner mistakes
---

# Variables and Assignment

Variables are the fundamental building blocks of every program. They let you store data, label it with meaningful names, and use it throughout your code. In this lesson, we'll go well beyond the basics and explore how Python actually handles variables under the hood.

## What Is a Variable?

A common beginner analogy is that a variable is like a "box" that holds a value. While helpful at first, this isn't quite accurate in Python. A more precise way to think about it:

> **A variable in Python is a name (label) that refers to an object in memory.**

When you write `x = 42`, Python creates an integer object `42` in memory, and the name `x` points (refers) to that object. The variable doesn't "contain" the value — it **references** it.

```python
x = 42
```

Think of it like a sticky note labeled `x` placed on the object `42`. Multiple sticky notes can point to the same object.

## Creating Variables

In Python, you create a variable by assigning a value to a name using the `=` operator:

```python
age = 25
name = "Alice"
temperature = 98.6
is_student = True
```

Key observations:
- **No type declaration needed** — Python infers the type automatically (this is called **dynamic typing**)
- **`=` is the assignment operator** — it's not the same as "equals" in mathematics
- **No semicolons** at the end of lines
- **No special keyword** like `var`, `let`, or `int` is needed

## Python's Memory Model: References, Not Boxes

Let's see how Python's reference model works in practice using the `id()` function, which returns the memory address of an object:

```python
a = [1, 2, 3]
b = a            # b now refers to the SAME list object

print(id(a))     # e.g., 140234866534400
print(id(b))     # Same address! 140234866534400

b.append(4)
print(a)         # [1, 2, 3, 4] — a is affected too!
```

Because `a` and `b` are references to the **same object**, modifying through one name affects the other. This is crucial to understand to avoid subtle bugs.

Compare this with integers, where Python may reuse small integer objects:

```python
x = 42
y = 42
print(id(x) == id(y))  # True — Python caches small integers (-5 to 256)

x = 1000
y = 1000
print(id(x) == id(y))  # May be False — larger integers aren't always cached
```

## The `type()` Function

Use `type()` to check what kind of data a variable holds:

```python
age = 25
name = "Alice"
price = 19.99
is_active = True
items = [1, 2, 3]

print(type(age))       # <class 'int'>
print(type(name))      # <class 'str'>
print(type(price))     # <class 'float'>
print(type(is_active)) # <class 'bool'>
print(type(items))     # <class 'list'>
```

You can also use `isinstance()` for type checking in real programs:

```python
value = 42
print(isinstance(value, int))    # True
print(isinstance(value, str))    # False
print(isinstance(value, (int, float)))  # True — checks multiple types
```

## Dynamic Typing

Python is **dynamically typed**, meaning a variable can be reassigned to a value of a completely different type:

```python
data = 42          # data is an int
print(type(data))  # <class 'int'>

data = "hello"     # now data is a str — perfectly valid!
print(type(data))  # <class 'str'>

data = [1, 2, 3]   # now data is a list
print(type(data))  # <class 'list'>
```

This flexibility is powerful but requires discipline. In **statically typed** languages like Java or C++, this would cause an error. In Python, it's your responsibility to keep track of what type your variable holds.

## Variable Naming Rules

Python has strict rules for variable names:

### Valid Names

```python
age = 30
first_name = "Bob"
total_count = 100
_private = "hidden"        # Leading underscore: convention for "internal use"
__very_private = "secret"  # Double underscore: name mangling in classes
MAX_SIZE = 1000            # ALL_CAPS: convention for constants
student2 = "Charlie"       # Numbers allowed (but not at the start)
```

### Invalid Names

```python
2fast = "No"        # Cannot start with a number
first-name = "No"   # Hyphens not allowed (Python sees it as subtraction)
class = "No"        # 'class' is a reserved keyword
my var = "No"       # Spaces not allowed
dollar$ = "No"      # Special characters not allowed (except _)
```

### Best Practices (PEP 8 Style Guide)

1. **Use descriptive names**: `student_count` instead of `sc`
2. **Use snake_case for variables and functions**: `first_name`, not `firstName`
3. **Use UPPER_SNAKE_CASE for constants**: `MAX_ATTEMPTS = 3`
4. **Avoid single-letter names** (except in short loops or math formulas)
5. **Don't shadow built-in names**: avoid naming variables `list`, `str`, `type`, `id`, `print`

```python
# BAD — shadows the built-in list() function
list = [1, 2, 3]
# Now you can't use list() to convert things!

# GOOD — use a descriptive name instead
numbers = [1, 2, 3]
```

## Assignment Variations

### Simple Assignment

```python
x = 10
```

### Multiple Assignment (Same Value)

```python
a = b = c = 0
print(a, b, c)  # 0 0 0
```

### Multiple Assignment (Different Values)

```python
x, y, z = 1, 2, 3
print(x, y, z)  # 1 2 3

# Also works with other iterables
first, second, third = "ABC"
print(first)  # A
```

### Swapping Values

In many languages, swapping requires a temporary variable. Python makes it elegant:

```python
a = 10
b = 20

a, b = b, a  # Swap in one line!

print(a)  # 20
print(b)  # 10
```

## Augmented Assignment Operators

Python provides shorthand operators for modifying a variable's value:

```python
score = 100

score += 10   # Same as: score = score + 10  → 110
score -= 5    # Same as: score = score - 5   → 105
score *= 2    # Same as: score = score * 2   → 210
score /= 3    # Same as: score = score / 3   → 70.0
score //= 2   # Same as: score = score // 2  → 35.0 (floor division)
score %= 10   # Same as: score = score % 10  → 5.0 (remainder)
score **= 3   # Same as: score = score ** 3  → 125.0 (exponentiation)

print(score)  # 125.0
```

These operators are not only shorter to write — they're also slightly more efficient because Python evaluates the variable name only once.

```python
# Practical example: accumulating a total
total = 0
total += 19.99
total += 5.49
total += 12.00
print(f"Order total: ${total:.2f}")  # Order total: $37.48
```

## The `None` Type

`None` is Python's null value — it represents the **absence of a value**. It's its own type: `NoneType`.

```python
result = None
print(result)        # None
print(type(result))  # <class 'NoneType'>
```

Common uses of `None`:
- **Default function return value**: Functions that don't explicitly return a value return `None`
- **Placeholder initialization**: When you want to declare a variable but don't have a value yet
- **Sentinel value**: Indicating "no result" or "not found"

```python
# Functions return None if no return statement
def greet(name):
    print(f"Hello, {name}!")

result = greet("Alice")  # Prints: Hello, Alice!
print(result)            # None

# Placeholder initialization
user_input = None
database_connection = None

# Check for None using 'is', not '=='
if result is None:
    print("No return value")
```

**Important**: Always use `is None` or `is not None` instead of `== None`. The `is` operator checks identity (same object in memory), which is faster and more correct for `None`.

## The `del` Keyword

You can delete a variable using `del`, which removes the name from the current scope:

```python
x = 42
print(x)  # 42

del x
# print(x)  # NameError: name 'x' is not defined
```

This doesn't necessarily delete the object from memory — it just removes the reference. Python's garbage collector will clean up the object if no other references exist.

```python
a = [1, 2, 3]
b = a       # b also references the list
del a       # Remove the name 'a'
print(b)    # [1, 2, 3] — the list still exists because b references it
```

## Constants Convention

Python doesn't have true constants (values that can't be changed). Instead, the convention is to use **ALL_CAPS** names to signal that a value should not be modified:

```python
PI = 3.14159265358979
MAX_CONNECTIONS = 100
DATABASE_URL = "postgresql://localhost/mydb"
GRAVITY = 9.81

# Nothing stops you from changing these, but DON'T:
# PI = 3  # Technically works, but violates the convention
```

This is a social contract among Python developers. Modern tools like type checkers can also enforce this with `Final`:

```python
from typing import Final

MAX_SIZE: Final = 1024
# MAX_SIZE = 2048  # Type checkers will flag this as an error
```

## Variable Scope Preview

Variables have a **scope** — the region of code where they're accessible. We'll cover this in detail when we learn about functions, but here's a quick preview:

```python
# This variable is in the "global" scope
message = "Hello from global"

def my_function():
    # This variable is in the "local" scope
    local_var = "Hello from local"
    print(message)      # Can access global variables
    print(local_var)    # Can access local variables

my_function()
# print(local_var)  # NameError! local_var doesn't exist out here
```

The key insight: variables created inside a function are **local** and disappear when the function ends. Variables created outside functions are **global** and accessible everywhere.

## Common Beginner Mistakes

### Mistake 1: Using a variable before assigning it

```python
# print(total)  # NameError: name 'total' is not defined
total = 0
print(total)    # 0 — assign first, then use!
```

### Mistake 2: Using = instead of == for comparison

```python
x = 5
# if x = 5:    # SyntaxError! Use == for comparison
if x == 5:     # Correct
    print("x is 5")
```

### Mistake 3: Case sensitivity

```python
Name = "Alice"
# print(name)   # NameError! Python is case-sensitive
print(Name)     # "Alice"
```

### Mistake 4: Shadowing built-in names

```python
# Don't do this:
list = [1, 2, 3]           # Shadows the built-in list()
# new_list = list("hello") # TypeError! 'list' is now your variable

# Do this instead:
my_list = [1, 2, 3]
```

### Mistake 5: Mutable default trap (preview)

```python
# This is a subtle bug we'll revisit in the functions chapter
a = [1, 2, 3]
b = a             # b is NOT a copy — it's the same list!
b.append(4)
print(a)          # [1, 2, 3, 4] — a was modified too!

# To make a copy:
b = a.copy()      # or: b = list(a) or b = a[:]
```

## Practical Examples

### Example 1: Temperature Converter

```python
celsius = 37.0
fahrenheit = (celsius * 9/5) + 32
print(f"{celsius}°C = {fahrenheit}°F")  # 37.0°C = 98.6°F
```

### Example 2: Simple Interest Calculator

```python
principal = 1000.00
rate = 0.05
years = 3

interest = principal * rate * years
total = principal + interest

print(f"Principal: ${principal:.2f}")
print(f"Interest: ${interest:.2f}")
print(f"Total after {years} years: ${total:.2f}")
```

### Example 3: Unpacking Coordinates

```python
point = (3, 7)
x, y = point
print(f"X coordinate: {x}, Y coordinate: {y}")

# Calculate distance from origin
import math
distance = math.sqrt(x**2 + y**2)
print(f"Distance from origin: {distance:.2f}")
```

## Try It Yourself

1. Create variables for a book: `title`, `author`, `pages`, `price`, `is_available`. Print them all using f-strings.
2. Use `type()` and `id()` to inspect your variables. Try assigning two variables to the same string and compare their `id()` values.
3. Practice swapping: create `a = "first"` and `b = "second"`, swap them, and print the result.
4. Use augmented assignment to simulate a bank account: start with a balance of $1000, deposit $250, withdraw $100, then add 5% interest.
5. Create a "constant" `TAX_RATE = 0.08` and calculate the tax and total for a $49.99 purchase.

## Key Takeaways

- Variables in Python are **references (labels)** pointing to objects in memory, not "boxes"
- Use `type()` to check a variable's type and `id()` to see its memory address
- Python is **dynamically typed** — variables can be reassigned to different types
- Follow **PEP 8**: use `snake_case` for variables, `ALL_CAPS` for constants
- **Augmented assignment** operators (`+=`, `-=`, `*=`, etc.) provide shorthand for common operations
- `None` represents the absence of a value; check it with `is None`
- `del` removes a variable name from scope
- **Avoid shadowing** built-in names like `list`, `str`, `type`
- Understand the **reference model** to avoid bugs with mutable objects

## What's Next?

Now that you understand variables and how Python manages data in memory, the next lesson will explore **data types** in detail — integers, floats, strings, booleans, and more!
