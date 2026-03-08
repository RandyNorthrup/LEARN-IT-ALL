---
id: lesson-003-008
title: More Conditional Structures
chapterId: chapter-03
order: 8
duration: 15
objectives:
  - Build multi-branch decisions with elif chains
  - Combine conditions with logical operators (and, or, not)
  - Handle errors gracefully with try/except
  - Apply guardian patterns for safe code
---

# More Conditional Structures

## The `elif` Chain

When you have more than two branches, use `elif` (short for "else if"). Python checks each condition in order and executes the **first** one that is `True`:

```python
score = int(input("Enter your score: "))

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your grade: {grade}")
```

Only one block executes, even if multiple conditions are true. For a score of 95, the first condition matches, so it prints "A" and skips the rest.

## Nested Conditionals

You can place `if` statements inside other `if` statements:

```python
age = int(input("Your age: "))
has_license = input("Do you have a license? (yes/no): ")

if age >= 16:
    if has_license == "yes":
        print("You can drive.")
    else:
        print("You need to get a license first.")
else:
    print("You are too young to drive.")
```

Nested conditionals work, but too many levels of nesting makes code hard to read. Often you can flatten them using logical operators.

## Logical Operators

Python has three logical operators: `and`, `or`, and `not`.

```python
age = 25
income = 50000

# and: both conditions must be True
if age >= 18 and income >= 30000:
    print("Eligible for the loan.")

# or: at least one condition must be True
day = "Saturday"
if day == "Saturday" or day == "Sunday":
    print("It's the weekend!")

# not: inverts a boolean
is_raining = False
if not is_raining:
    print("No umbrella needed.")
```

## Short-Circuit Evaluation

Python evaluates logical expressions **lazily**:

- `and`: If the first condition is `False`, Python skips the second (the result is already `False`).
- `or`: If the first condition is `True`, Python skips the second (the result is already `True`).

```python
# Short-circuit prevents a division-by-zero error
x = 0
if x != 0 and 10 / x > 2:
    print("Passed")
else:
    print("Skipped safely")   # This runs; 10/x is never evaluated
```

## Error Handling with `try/except`

Sometimes errors are unavoidable — for example, when converting user input to a number. The `try/except` block lets you handle errors gracefully instead of crashing:

```python
try:
    value = int(input("Enter a number: "))
    print(f"You entered {value}")
except ValueError:
    print("That was not a valid number!")
```

If the user types "abc", `int()` raises a `ValueError`. Instead of crashing, Python jumps to the `except` block and prints the friendly message.

You can handle multiple error types:

```python
try:
    num = int(input("Enter a number: "))
    result = 100 / num
    print(f"100 / {num} = {result}")
except ValueError:
    print("Please enter a valid integer.")
except ZeroDivisionError:
    print("Cannot divide by zero!")
```

## Guardian Patterns

A **guardian pattern** uses short-circuit evaluation to protect against errors. Place the "guard" condition first:

```python
# Guard: check that the list is not empty before accessing elements
data = []

if len(data) > 0 and data[0] == "hello":
    print("Found hello")
else:
    print("List is empty or first element is not hello")

# Without the guard, data[0] on an empty list would crash
```

Guardian patterns make code robust without deep nesting.

## Practical Example

```python
# Safe pay calculator with overtime
try:
    hours = float(input("Enter hours worked: "))
    rate = float(input("Enter hourly rate: "))
except ValueError:
    print("Error: please enter numeric values.")
else:
    if hours > 40:
        regular = 40 * rate
        overtime = (hours - 40) * rate * 1.5
        pay = regular + overtime
    else:
        pay = hours * rate
    print(f"Total pay: ${pay:.2f}")
```

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
