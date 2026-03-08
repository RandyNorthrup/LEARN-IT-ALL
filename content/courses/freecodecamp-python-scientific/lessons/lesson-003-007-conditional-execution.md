---
id: lesson-003-007
title: Conditional Execution
chapterId: chapter-03
order: 7
duration: 15
objectives:
  - Write boolean expressions using comparison operators
  - Use if and if-else statements for decision making
  - Apply proper indentation for code blocks
  - Understand truthy and falsy values in Python
---

# Conditional Execution

## Boolean Expressions

A **boolean expression** is an expression that evaluates to either `True` or `False`. These are the foundation of all decision-making in programming.

```python
print(5 > 3)       # True
print(10 == 10)    # True
print(7 < 2)       # False
print("a" != "b")  # True
```

## Comparison Operators

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| `==` | Equal to | `5 == 5` | `True` |
| `!=` | Not equal to | `5 != 3` | `True` |
| `<` | Less than | `3 < 5` | `True` |
| `>` | Greater than | `5 > 3` | `True` |
| `<=` | Less than or equal | `5 <= 5` | `True` |
| `>=` | Greater than or equal | `6 >= 7` | `False` |

**Important:** `=` is assignment, `==` is comparison. Mixing them up is a very common beginner mistake.

```python
x = 10     # Assignment: x now holds 10
x == 10    # Comparison: True (x is equal to 10)
```

## The `if` Statement

The `if` statement lets your program make decisions. The indented block runs **only if** the condition is `True`:

```python
temperature = 35

if temperature > 30:
    print("It's hot outside!")
    print("Stay hydrated.")

print("Have a good day.")
```

**Output:**
```
It's hot outside!
Stay hydrated.
Have a good day.
```

The last `print()` is not indented, so it runs regardless of the condition.

## Indentation Rules

Python uses **indentation** (whitespace at the beginning of a line) to define code blocks. Most languages use braces `{}` for this, but Python uses indentation. This makes Python code visually clean, but you must be consistent:

- Use **4 spaces** per indentation level (this is the standard).
- Never mix tabs and spaces.
- All lines in the same block must have the same indentation.

```python
if True:
    print("This is inside the if block")
    print("So is this")
print("This is outside the if block")
```

## The `if-else` Statement

Use `else` to specify what happens when the condition is `False`:

```python
age = int(input("Enter your age: "))

if age >= 18:
    print("You are an adult.")
    print("You can vote.")
else:
    print("You are a minor.")
    print(f"You can vote in {18 - age} years.")
```

Exactly one of the two blocks will execute — never both, never neither.

## Truthy and Falsy Values

In Python, every value can be used as a boolean. Values that act like `False` are called **falsy**; everything else is **truthy**.

**Falsy values:** `False`, `0`, `0.0`, `""` (empty string), `None`, `[]` (empty list), `{}` (empty dict)

**Truthy values:** Everything else — any non-zero number, any non-empty string, etc.

```python
name = input("Enter your name: ")

if name:
    print(f"Hello, {name}!")
else:
    print("You didn't enter a name.")
```

If the user presses Enter without typing anything, `name` is `""` (empty string), which is falsy, so the `else` block runs.

## A Simple Decision Program

```python
# Grade checker
score = int(input("Enter your test score: "))

if score >= 60:
    print("You passed!")
else:
    print("You did not pass.")
    print(f"You needed {60 - score} more points.")
```

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
