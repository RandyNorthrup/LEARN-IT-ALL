---
id: lesson-041-conditionals
title: If Statements and Conditionals
chapterId: ch4-comparisons
order: 1
duration: 35
objectives:
  - Understand boolean logic and comparison operators
  - Master if, elif, and else statements with multiple patterns
  - Use logical operators (and, or, not) with short-circuit evaluation
  - Understand truthiness and falsiness in Python
  - Write ternary expressions and match/case statements
  - Apply common conditional patterns like guard clauses and input validation
---

# If Statements and Conditionals

Conditionals are the decision-making backbone of programming. They let your programs choose different paths of execution based on data, user input, or computed results. In this lesson, we'll go deep into Python's conditional toolbox — from basic `if` statements to advanced pattern matching.

## Boolean Values Review

Python has exactly two boolean values: `True` and `False` (note the capitalization). Booleans are a subclass of integers, where `True` is `1` and `False` is `0`:

```python
is_raining = True
is_sunny = False

print(type(is_raining))  # <class 'bool'>

# Booleans are integers under the hood
print(True + True)    # 2
print(False + 1)      # 1
print(True * 10)      # 10
```

This integer relationship is useful — for example, you can sum a list of booleans to count how many are `True`:

```python
results = [True, False, True, True, False]
print(sum(results))  # 3 (three True values)
```

## Comparison Operators

Comparison operators compare two values and return a boolean:

```python
# Equal to (==)
print(5 == 5)       # True
print(5 == 3)       # False
print("abc" == "abc")  # True

# Not equal to (!=)
print(5 != 3)       # True
print(5 != 5)       # False

# Greater than (>)
print(10 > 5)       # True
print(3 > 10)       # False

# Less than (<)
print(3 < 10)       # True
print(10 < 5)       # False

# Greater than or equal to (>=)
print(10 >= 10)     # True

# Less than or equal to (<=)
print(5 <= 5)       # True
```

### Chaining Comparisons

Python supports **chained comparisons** — a feature many languages lack:

```python
x = 15

# Instead of: x > 10 and x < 20
print(10 < x < 20)    # True — reads naturally like math!

# You can chain multiple comparisons
age = 25
print(18 <= age <= 65)  # True (working age)

# Works with any comparison operators
a, b, c = 1, 2, 3
print(a < b < c)       # True
print(a < b > c)       # False (b is not > c)
print(1 <= 1 < 2)      # True
```

### Comparing Different Types

Be careful when comparing different types:

```python
print(1 == 1.0)       # True — int and float can be compared
print(1 == True)      # True — True is 1
print(0 == False)     # True — False is 0
print("1" == 1)       # False — string and int are different types
print(None == False)  # False — None is not False
```

## The `if` Statement

Execute code only when a condition is `True`:

```python
age = 20

if age >= 18:
    print("You are an adult")
    print("You can vote")
```

**Syntax rules:**
- The `if` keyword, followed by a condition, followed by a colon `:`
- The code block must be **indented** (4 spaces by convention)
- Python uses indentation instead of braces `{}` — indentation is not optional!

## The `else` Statement

Provide an alternative path when the condition is `False`:

```python
age = 15

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
```

## The `elif` Statement

Check multiple conditions in sequence. Only the **first** matching block executes:

```python
score = 85

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

print(f"Score: {score}, Grade: {grade}")  # Score: 85, Grade: B
```

**Important**: Once a condition matches, all remaining `elif` and `else` blocks are skipped. Order matters!

```python
# BAD ordering — first condition catches everything >= 60
score = 95
if score >= 60:
    print("D")     # This prints for 95! Wrong!
elif score >= 90:
    print("A")     # Never reached for scores >= 60

# GOOD ordering — check highest threshold first
if score >= 90:
    print("A")     # Correct!
elif score >= 60:
    print("D")
```

## Truthiness and Falsiness

In Python, **every value** can be evaluated as a boolean. You don't need to write explicit comparisons like `if x != 0:` — you can simply write `if x:`.

### Falsy Values (evaluate to `False`)

```python
# All of these are "falsy" — they evaluate to False in a boolean context
print(bool(False))     # False
print(bool(None))      # False
print(bool(0))         # False (integer zero)
print(bool(0.0))       # False (float zero)
print(bool(0j))        # False (complex zero)
print(bool(""))        # False (empty string)
print(bool([]))        # False (empty list)
print(bool(()))        # False (empty tuple)
print(bool({}))        # False (empty dict)
print(bool(set()))     # False (empty set)
```

### Truthy Values (evaluate to `True`)

**Everything else** is truthy:

```python
print(bool(1))         # True (any non-zero number)
print(bool(-1))        # True (negative numbers too!)
print(bool(3.14))      # True
print(bool("hello"))   # True (non-empty string)
print(bool(" "))       # True (string with a space is NOT empty)
print(bool([0]))       # True (list with one element, even if it's 0)
print(bool({"a": 1}))  # True (non-empty dict)
```

### Using Truthiness in Practice

```python
# Instead of explicit checks, use truthiness:
name = input("Enter your name: ")

# Verbose way
if name != "":
    print(f"Hello, {name}!")

# Pythonic way — cleaner and idiomatic
if name:
    print(f"Hello, {name}!")

# Checking if a list has items
items = [1, 2, 3]
if items:  # True if the list is not empty
    print(f"Processing {len(items)} items")

# Checking for None
result = None
if result is None:  # Use 'is' for None checks, not truthiness
    print("No result yet")
```

## Logical Operators: `and`, `or`, `not`

### The `and` Operator

Returns `True` only if **both** conditions are `True`:

```python
age = 25
has_license = True

if age >= 18 and has_license:
    print("You can drive")
```

**Truth table for `and`:**

| A | B | A and B |
|---|---|---------|
| True | True | True |
| True | False | False |
| False | True | False |
| False | False | False |

### The `or` Operator

Returns `True` if **at least one** condition is `True`:

```python
is_weekend = True
is_holiday = False

if is_weekend or is_holiday:
    print("No work today!")
```

**Truth table for `or`:**

| A | B | A or B |
|---|---|--------|
| True | True | True |
| True | False | True |
| False | True | True |
| False | False | False |

### The `not` Operator

Inverts the boolean value:

```python
is_raining = False

if not is_raining:
    print("Let's go outside!")

# not True  → False
# not False → True
```

### Combining Logical Operators

You can combine operators. **Precedence**: `not` > `and` > `or`:

```python
age = 25
is_student = True
has_coupon = False

# not is evaluated first, then and, then or
if age < 18 or is_student and has_coupon:
    print("Discount applies")
else:
    print("Full price")
# Evaluates as: (age < 18) or (is_student and has_coupon)
# = False or (True and False) = False or False = False → "Full price"

# Use parentheses to make intent clear!
if (age < 18 or is_student) and has_coupon:
    print("Discount applies")
```

## Short-Circuit Evaluation

Python's `and` and `or` use **short-circuit evaluation** — they stop evaluating as soon as the result is determined:

```python
# With 'and': if the first operand is False, the second is never evaluated
x = 0
if x != 0 and 10 / x > 2:  # 10/x is never evaluated (avoids ZeroDivisionError!)
    print("Big number")

# With 'or': if the first operand is True, the second is never evaluated
name = "Alice"
if name or get_name_from_database():  # Database call is skipped
    print(f"Using name: {name}")
```

**Advanced detail**: `and` and `or` don't actually return `True`/`False` — they return one of their operands:

```python
# 'and' returns the first falsy value, or the last value if all truthy
print("hello" and "world")    # "world"
print("" and "world")         # ""
print("hello" and 0)          # 0

# 'or' returns the first truthy value, or the last value if all falsy
print("hello" or "world")     # "hello"
print("" or "world")          # "world"
print("" or 0 or None)        # None (all falsy, returns last)
print("" or 0 or "default")   # "default"

# This enables a common pattern for default values:
username = input_name or "Anonymous"
```

## Nested Conditionals

You can put `if` statements inside other `if` statements:

```python
age = 25
has_ticket = True
is_vip = False

if age >= 18:
    if has_ticket:
        if is_vip:
            print("Welcome to the VIP section!")
        else:
            print("Welcome to general admission!")
    else:
        print("You need a ticket")
else:
    print("Too young to attend")
```

**Warning**: Deeply nested conditionals are hard to read. Prefer **guard clauses** or restructuring (see Common Patterns below).

## The Ternary Operator (Conditional Expression)

Python's ternary operator lets you write simple if/else on a single line:

```python
# Syntax: value_if_true if condition else value_if_false

age = 20
status = "adult" if age >= 18 else "minor"
print(status)  # "adult"

# Useful for simple assignments
x = 10
label = "positive" if x > 0 else "non-positive"

# In f-strings
score = 85
print(f"Result: {'Pass' if score >= 60 else 'Fail'}")  # Result: Pass

# Nested ternary (use sparingly — can be hard to read)
x = 0
sign = "positive" if x > 0 else ("negative" if x < 0 else "zero")
print(sign)  # "zero"
```

**Best practice**: Use ternary for simple conditions only. If the logic is complex, use a regular `if/elif/else`.

## Match/Case Statement (Python 3.10+)

Python 3.10 introduced **structural pattern matching** with `match`/`case`, similar to switch statements in other languages but much more powerful:

```python
# Basic value matching
def describe_status(code):
    match code:
        case 200:
            return "OK"
        case 301:
            return "Moved Permanently"
        case 404:
            return "Not Found"
        case 500:
            return "Internal Server Error"
        case _:             # _ is the wildcard/default case
            return f"Unknown status: {code}"

print(describe_status(200))   # OK
print(describe_status(404))   # Not Found
print(describe_status(418))   # Unknown status: 418
```

### Pattern Matching with Multiple Values

```python
def classify_day(day):
    match day.lower():
        case "monday" | "tuesday" | "wednesday" | "thursday" | "friday":
            return "Weekday"
        case "saturday" | "sunday":
            return "Weekend"
        case _:
            return "Invalid day"

print(classify_day("Monday"))    # Weekday
print(classify_day("Saturday"))  # Weekend
```

### Pattern Matching with Structure

```python
# Matching sequences and structures
def process_command(command):
    match command.split():
        case ["quit"]:
            return "Goodbye!"
        case ["hello", name]:
            return f"Hello, {name}!"
        case ["add", x, y]:
            return f"Sum: {int(x) + int(y)}"
        case ["move", direction, distance]:
            return f"Moving {direction} by {distance}"
        case _:
            return "Unknown command"

print(process_command("quit"))          # Goodbye!
print(process_command("hello Alice"))   # Hello, Alice!
print(process_command("add 3 5"))       # Sum: 8
```

## Common Conditional Patterns

### Guard Clauses (Early Returns)

Instead of deeply nested conditionals, return early for invalid cases:

```python
# HARD TO READ — deeply nested
def process_order(order):
    if order is not None:
        if order.items:
            if order.payment_valid:
                if order.in_stock:
                    # Actually process the order
                    return "Order processed"
                else:
                    return "Out of stock"
            else:
                return "Invalid payment"
        else:
            return "No items"
    else:
        return "No order"

# MUCH BETTER — guard clauses
def process_order(order):
    if order is None:
        return "No order"
    if not order.items:
        return "No items"
    if not order.payment_valid:
        return "Invalid payment"
    if not order.in_stock:
        return "Out of stock"

    # Happy path — clean and clear
    return "Order processed"
```

### Input Validation

```python
def get_positive_number():
    user_input = input("Enter a positive number: ")

    if not user_input:
        print("Error: No input provided")
        return None

    try:
        number = float(user_input)
    except ValueError:
        print("Error: That's not a number")
        return None

    if number <= 0:
        print("Error: Number must be positive")
        return None

    return number
```

### Membership Testing with `in`

```python
# Check if a value is in a collection
valid_colors = {"red", "green", "blue", "yellow"}
user_color = "green"

if user_color in valid_colors:
    print(f"'{user_color}' is valid!")
else:
    print(f"'{user_color}' is not a valid color")

# Works with strings too
email = "user@example.com"
if "@" in email and "." in email:
    print("Looks like a valid email format")

# Check if key exists in dictionary
settings = {"theme": "dark", "language": "en"}
if "theme" in settings:
    print(f"Theme: {settings['theme']}")
```

### Conditional Assignment with `or`

```python
# Use 'or' for default values (short-circuit evaluation)
user_name = input("Name: ") or "Anonymous"
print(f"Hello, {user_name}!")

# Use dict.get() for safe dictionary access
config = {"debug": True}
verbose = config.get("verbose", False)  # Returns False if key missing
```

## Practical Examples

### Example 1: BMI Calculator

```python
def calculate_bmi(weight_kg, height_m):
    bmi = weight_kg / (height_m ** 2)

    if bmi < 18.5:
        category = "Underweight"
    elif bmi < 25.0:
        category = "Normal weight"
    elif bmi < 30.0:
        category = "Overweight"
    else:
        category = "Obese"

    return bmi, category

bmi, category = calculate_bmi(70, 1.75)
print(f"BMI: {bmi:.1f} — {category}")  # BMI: 22.9 — Normal weight
```

### Example 2: FizzBuzz (Classic Interview Question)

```python
for i in range(1, 31):
    if i % 15 == 0:       # Divisible by both 3 and 5
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
```

### Example 3: Password Strength Checker

```python
def check_password(password):
    if len(password) < 8:
        return "Weak: Too short (minimum 8 characters)"

    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_special = any(c in "!@#$%^&*()_+-=" for c in password)

    strength = sum([has_upper, has_lower, has_digit, has_special])

    if strength == 4:
        return "Strong"
    elif strength >= 2:
        return "Medium"
    else:
        return "Weak"

print(check_password("abc"))           # Weak: Too short
print(check_password("password"))      # Weak
print(check_password("Password1"))     # Medium
print(check_password("P@ssw0rd!"))     # Strong
```

## Try It Yourself

1. Write a function that takes a year and determines if it's a leap year. Rules: divisible by 4, except centuries unless divisible by 400.
2. Create a simple calculator that takes two numbers and an operator (+, -, *, /) and returns the result. Use `match/case` if you're on Python 3.10+.
3. Write a function that classifies a triangle as "equilateral", "isosceles", or "scalene" based on three side lengths. Include validation that the sides can form a valid triangle.
4. Implement a rock-paper-scissors game using conditionals.
5. Rewrite deeply nested conditionals from your own code (or the examples above) using guard clauses.

## Key Takeaways

- **Comparison operators** (`==`, `!=`, `<`, `>`, `<=`, `>=`) return booleans
- Python supports **chained comparisons**: `1 < x < 10`
- **`if`/`elif`/`else`** executes the first matching block; order matters
- **Truthiness**: `0`, `""`, `[]`, `None`, `{}`, `set()`, `False` are all falsy; everything else is truthy
- **Logical operators** follow precedence: `not` > `and` > `or`
- **Short-circuit evaluation**: `and` stops at the first falsy value; `or` stops at the first truthy value
- The **ternary operator** (`x if condition else y`) is useful for simple inline conditionals
- **`match`/`case`** (Python 3.10+) provides powerful structural pattern matching
- Use **guard clauses** (early returns) instead of deeply nested conditionals
- Always use `is None` / `is not None` — never `== None`
- **Indentation defines code blocks** in Python — it's syntactically required, not optional

## What's Next?

Now that you can make decisions in your programs, the next lesson will teach you about **loops** — how to repeat code automatically with `for` and `while`!
