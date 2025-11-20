---
id: "90-conditional-expressions"
title: "Conditional Expressions and Inline Conditionals"
chapterId: ch4-comparisons
order: 12
duration: 20
objectives:
  - Master ternary operator syntax
  - Use conditional expressions effectively
  - Learn when to use inline conditionals
  - Avoid common ternary anti-patterns
---

# Conditional Expressions and Inline Conditionals

Python's ternary operator (conditional expression) provides a concise way to write simple conditionals in a single line. Learn when and how to use them effectively.

## Ternary Operator Syntax

```python
# Basic syntax: value_if_true if condition else value_if_false

age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)  # Adult

age = 15
status = "Adult" if age >= 18 else "Minor"
print(status)  # Minor

# Equivalent to:
if age >= 18:
    status = "Adult"
else:
    status = "Minor"
```

## Simple Assignments

```python
# Temperature check
temperature = 75
weather = "Hot" if temperature > 80 else "Comfortable"
print(weather)  # Comfortable

# Number sign
number = -5
sign = "Positive" if number > 0 else "Non-positive"
print(sign)  # Non-positive

# Boolean conversion
has_items = True
message = "Items available" if has_items else "No items"
print(message)  # Items available

# With calculations
x = 10
y = 20
max_value = x if x > y else y
print(f"Maximum: {max_value}")  # Maximum: 20

# Min/max using ternary
min_value = x if x < y else y
print(f"Minimum: {min_value}")  # Minimum: 10
```

## Default Values

```python
# Set default if value is None or falsy
username = None
display_name = username if username else "Guest"
print(display_name)  # Guest

# Better: use 'or' for this pattern
display_name = username or "Guest"
print(display_name)  # Guest

# With function call
def get_config():
    """Return config or None."""
    return None

config = get_config() if get_config() else {}
print(config)  # {}

# Better: avoid double call
result = get_config()
config = result if result else {}

# Or use 'or' operator
config = get_config() or {}
```

## In Function Returns

```python
def absolute_value(n):
    """Get absolute value using ternary."""
    return n if n >= 0 else -n

print(absolute_value(5))   # 5
print(absolute_value(-5))  # 5

def get_grade(score):
    """Simple grade using ternary."""
    return "Pass" if score >= 60 else "Fail"

print(get_grade(75))  # Pass
print(get_grade(45))  # Fail

def is_even(n):
    """Check if number is even."""
    return "Even" if n % 2 == 0 else "Odd"

print(is_even(4))  # Even
print(is_even(7))  # Odd

# Multiple return scenarios
def get_discount(is_member, purchase_total):
    """Calculate discount percentage."""
    return 15 if is_member and purchase_total > 100 else 10 if is_member else 0

print(f"{get_discount(True, 150)}%")   # 15%
print(f"{get_discount(True, 50)}%")    # 10%
print(f"{get_discount(False, 150)}%")  # 0%
```

## Chained Ternary (Use Sparingly!)

```python
# Chained ternary operators
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "D" if score >= 60 else "F"
print(grade)  # B

# ❌ Hard to read when complex
# Better: use regular if-elif
def get_grade_clear(score):
    """Clear grading function."""
    if score >= 90: return "A"
    if score >= 80: return "B"
    if score >= 70: return "C"
    if score >= 60: return "D"
    return "F"

print(get_grade_clear(85))  # B

# Acceptable chained ternary (simple cases)
value = 5
category = "low" if value < 10 else "medium" if value < 50 else "high"
print(category)  # low

# With calculations
num = 0
result = "positive" if num > 0 else "zero" if num == 0 else "negative"
print(result)  # zero
```

## In List Comprehensions

```python
# Transform values conditionally
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Double even numbers, keep odd as-is
transformed = [n * 2 if n % 2 == 0 else n for n in numbers]
print(transformed)
# [1, 4, 3, 8, 5, 12, 7, 16, 9, 20]

# Label numbers
labeled = [f"{n} is even" if n % 2 == 0 else f"{n} is odd" for n in numbers[:5]]
print(labeled)
# ['1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd']

# Clamp values to range
values = [-5, 10, 25, 100, 150]
clamped = [0 if v < 0 else 100 if v > 100 else v for v in values]
print(clamped)
# [0, 10, 25, 100, 100]

# Apply different transformations
prices = [10, 25, 50, 75, 100]
discounted = [p * 0.9 if p >= 50 else p * 0.95 for p in prices]
print(discounted)
# [9.5, 23.75, 45.0, 67.5, 90.0]
```

## In Dictionary Comprehensions

```python
# Transform dictionary values
scores = {"Alice": 95, "Bob": 45, "Charlie": 78, "Diana": 55}

# Assign pass/fail
results = {name: "Pass" if score >= 60 else "Fail" for name, score in scores.items()}
print(results)
# {'Alice': 'Pass', 'Bob': 'Fail', 'Charlie': 'Pass', 'Diana': 'Fail'}

# Apply different multipliers
prices = {"apple": 1.0, "banana": 0.5, "cherry": 2.0}
sale_prices = {item: price * 0.8 if price > 1.0 else price * 0.9 for item, price in prices.items()}
print(sale_prices)
# {'apple': 0.9, 'banana': 0.45, 'cherry': 1.6}
```

## With Function Calls

```python
def expensive_operation(x):
    """Simulate expensive calculation."""
    print(f"Computing for {x}")
    return x * 2

def cheap_operation(x):
    """Simulate cheap calculation."""
    return x + 1

# Choose operation based on condition
x = 5
use_expensive = False

# ✅ Good: functions not called yet
result = expensive_operation(x) if use_expensive else cheap_operation(x)
print(result)
# 6

# With lambda for deferred execution
expensive = lambda x: expensive_operation(x)
cheap = lambda x: cheap_operation(x)

operation = expensive if use_expensive else cheap
result = operation(x)
print(result)
# 6
```

## In String Formatting

```python
# Pluralization
count = 1
message = f"{count} item" if count == 1 else f"{count} items"
print(message)  # 1 item

count = 5
message = f"{count} item" if count == 1 else f"{count} items"
print(message)  # 5 items

# Simple pluralization helper
def pluralize(count, singular, plural=None):
    """Pluralize word based on count."""
    plural = plural or f"{singular}s"
    return f"{count} {singular if count == 1 else plural}"

print(pluralize(1, "cat"))      # 1 cat
print(pluralize(5, "cat"))      # 5 cats
print(pluralize(1, "box", "boxes"))  # 1 box
print(pluralize(3, "box", "boxes"))  # 3 boxes

# Dynamic messages
is_authenticated = True
greeting = "Welcome back!" if is_authenticated else "Please log in"
print(greeting)  # Welcome back!

# Status indicators
is_online = False
status = "🟢 Online" if is_online else "🔴 Offline"
print(status)  # 🔴 Offline
```

## Nested Ternary (Avoid When Possible)

```python
# ❌ Hard to read nested ternary
x = 15
result = "small" if x < 10 else ("medium" if x < 20 else "large")
print(result)  # medium

# ✅ Better: regular if-elif
def categorize_size(x):
    """Categorize size clearly."""
    if x < 10:
        return "small"
    elif x < 20:
        return "medium"
    else:
        return "large"

print(categorize_size(15))  # medium

# Exception: Simple parenthesized ternary can be OK
age = 25
category = ("child" if age < 13 else
            "teen" if age < 20 else
            "adult" if age < 65 else
            "senior")
print(category)  # adult
```

## When to Use Ternary

```python
# ✅ GOOD USE CASES:

# 1. Simple assignment
is_valid = True
message = "Valid" if is_valid else "Invalid"

# 2. Default values
name = None
display = name if name else "Unknown"
# Or better: display = name or "Unknown"

# 3. Simple transformations
numbers = [1, 2, 3, 4, 5]
squared_evens = [n*n if n % 2 == 0 else n for n in numbers]

# 4. Return values
def abs_value(n):
    return n if n >= 0 else -n

# ❌ AVOID:

# 1. Complex logic
# Bad
result = x if (a > b and c < d or e == f) else y if g else z

# 2. Long expressions
# Bad
value = very_long_function_name(arg1, arg2) if complex_condition() else another_long_function(arg3, arg4)

# 3. Side effects
# Bad
result = (x := x + 1) if condition else (y := y + 1)

# 4. When regular if-else is clearer
# Bad
status = "premium" if is_member and purchase_total > 100 and loyalty_points > 500 else "regular"

# Good
if is_member and purchase_total > 100 and loyalty_points > 500:
    status = "premium"
else:
    status = "regular"
```

## Ternary vs OR Operator

```python
# For default values, 'or' is often better

# Using ternary
username = None
display_name = username if username else "Guest"

# Using 'or' (more Pythonic for defaults)
display_name = username or "Guest"

# But be careful with falsy values!
count = 0  # Valid value, but falsy

# ❌ Wrong: treats 0 as invalid
display_count = count or "N/A"
print(display_count)  # N/A (wrong!)

# ✅ Right: explicit None check
display_count = count if count is not None else "N/A"
print(display_count)  # 0 (correct!)

# Or use ternary
display_count = "N/A" if count is None else count
print(display_count)  # 0 (correct!)
```

## Practical Examples

```python
# Temperature converter with validation
def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit."""
    return (celsius * 9/5 + 32) if -273.15 <= celsius <= 1000 else None

print(celsius_to_fahrenheit(0))      # 32.0
print(celsius_to_fahrenheit(100))    # 212.0
print(celsius_to_fahrenheit(-300))   # None (invalid)

# Safe division
def safe_divide(a, b):
    """Divide with zero check."""
    return a / b if b != 0 else None

print(safe_divide(10, 2))  # 5.0
print(safe_divide(10, 0))  # None

# Clamp value to range
def clamp(value, min_val, max_val):
    """Clamp value to range."""
    return min_val if value < min_val else max_val if value > max_val else value

print(clamp(5, 0, 10))    # 5
print(clamp(-5, 0, 10))   # 0
print(clamp(15, 0, 10))   # 10

# Get file extension
def get_extension(filename):
    """Get file extension or default."""
    return filename.split('.')[-1] if '.' in filename else "txt"

print(get_extension("document.pdf"))  # pdf
print(get_extension("README"))        # txt

# Format currency
def format_currency(amount):
    """Format as currency."""
    return f"${amount:,.2f}" if amount >= 0 else f"-${abs(amount):,.2f}"

print(format_currency(1234.5))   # $1,234.50
print(format_currency(-1234.5))  # -$1,234.50
```

## Summary

**Ternary Operator Syntax:**
```python
value_if_true if condition else value_if_false
```

**Best Use Cases:**
- ✅ Simple assignments
- ✅ Default values
- ✅ Simple transformations
- ✅ Short return statements
- ✅ List/dict comprehensions

**When to Avoid:**
- ❌ Complex conditions
- ❌ Long expressions
- ❌ Side effects
- ❌ Nested ternaries (unless very simple)
- ❌ When regular if-else is clearer

**Alternatives:**
- **OR operator**: For default values (`value or default`)
- **Regular if-else**: For complex logic
- **Match-case**: For multiple options (Python 3.10+)
- **Dictionary lookup**: For mapping values

**Key Rules:**
1. Prioritize readability over brevity
2. Use for simple cases only
3. Avoid chaining unless very clear
4. Consider regular if-else if ternary is hard to read
5. Be careful with falsy values when using OR

Ternary operators are powerful for simple conditional assignments, but don't sacrifice readability for conciseness!
