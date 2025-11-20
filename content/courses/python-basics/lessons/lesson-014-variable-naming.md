---
id: variable-naming
title: Variable Naming Conventions
chapterId: ch2-variables
order: 1
duration: 20
objectives:
  - Understand Python variable naming rules
  - Learn PEP 8 naming conventions
  - Master descriptive variable naming
---

# Variable Naming Conventions

Choosing good variable names is one of the most important skills in programming. Clear names make code readable and maintainable.

## Python Naming Rules

Python has strict rules for variable names:

```python
# Valid variable names
age = 25
user_name = "Alice"
total_count = 100
_private = "hidden"
name2 = "Bob"

# Invalid variable names (will cause errors)
# 2name = "Bob"        # Cannot start with number
# user-name = "Alice"  # Cannot use hyphens
# total count = 100    # Cannot have spaces
# for = 5              # Cannot use reserved keywords
```

### Rules Summary:
1. Must start with a letter (a-z, A-Z) or underscore (_)
2. Can contain letters, numbers, and underscores
3. Cannot contain spaces or special characters
4. Cannot be a Python keyword (if, for, while, etc.)
5. Case-sensitive (`age` and `Age` are different)

## PEP 8 Conventions

PEP 8 is Python's official style guide. Follow these conventions:

### Snake Case for Variables

```python
# Good - snake_case
user_name = "Alice"
total_count = 100
max_retry_attempts = 3
is_valid = True

# Bad - camelCase (used in other languages)
userName = "Alice"
totalCount = 100
maxRetryAttempts = 3
```

### Constants in UPPERCASE

```python
# Constants - values that never change
MAX_CONNECTIONS = 100
PI = 3.14159
DEFAULT_TIMEOUT = 30
API_KEY = "secret-key-123"
```

### Private Variables with Underscore

```python
# Public variables
name = "Alice"
age = 25

# Private variables (convention, not enforced)
_internal_id = 12345
_cache = {}
```

## Descriptive Names

Use names that clearly describe what the variable holds:

```python
# ✅ Good - descriptive names
student_name = "Alice"
total_price = 99.99
is_logged_in = True
user_email = "alice@example.com"

# ❌ Bad - unclear names
n = "Alice"
tp = 99.99
flag = True
data = "alice@example.com"
```

## Avoid Single Letters (Except Loops)

```python
# ❌ Bad - unclear
x = 100
y = 200
z = x + y

# ✅ Good - descriptive
width = 100
height = 200
area = width + height

# ✅ Exception - loop counters
for i in range(10):
    print(i)

for x, y in coordinates:
    print(f"({x}, {y})")
```

## Boolean Variable Names

Boolean variables should ask a yes/no question:

```python
# ✅ Good - starts with is_, has_, can_, should_
is_active = True
has_permission = False
can_edit = True
should_retry = False
is_logged_in = True

# ❌ Bad - unclear
active = True
permission = False
edit = True
```

## Plurals for Collections

```python
# ✅ Good - plural names for lists/collections
students = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 28]
scores = [85, 92, 78]

# ✅ Good - singular for single values
student = "Alice"
age = 25
score = 85
```

## Avoid Reserved Keywords

Python has reserved keywords you cannot use as variable names:

```python
# These are INVALID and will cause errors:
# if = 10
# for = 20
# while = 30
# def = 40
# class = 50
# import = 60

# Instead, add context:
if_condition = 10
for_loop_count = 20
while_counter = 30
```

## Common Reserved Keywords

```python
# Control flow
if, elif, else, for, while, break, continue, pass, return

# Functions and classes
def, class, lambda

# Logical operators
and, or, not, is, in

# Values
True, False, None

# Others
import, from, as, with, try, except, finally, raise, assert, yield
```

## Practical Examples

### Example 1: E-commerce Variables

```python
# ✅ Good naming
product_name = "Laptop"
product_price = 999.99
is_in_stock = True
quantity_available = 50
discount_percentage = 10

total_price = product_price * (1 - discount_percentage / 100)
```

### Example 2: User Data

```python
# ✅ Good naming
user_id = 12345
user_name = "Alice Smith"
user_email = "alice@example.com"
is_email_verified = True
account_created_date = "2025-01-15"
```

### Example 3: Game Score

```python
# ✅ Good naming
player_name = "Alice"
current_score = 1500
high_score = 2000
lives_remaining = 3
is_game_over = False

if current_score > high_score:
    high_score = current_score
    print("New high score!")
```

## Naming Anti-Patterns to Avoid

```python
# ❌ Bad - too short
a = 100
b = 200
c = a + b

# ❌ Bad - too long
the_total_sum_of_all_numbers_in_the_list = 500

# ❌ Bad - using type in name (redundant)
name_string = "Alice"
age_int = 25
prices_list = [10, 20, 30]

# ✅ Good - balanced, descriptive
total = 100
price = 200
sum_total = total + price

total_sum = 500

name = "Alice"
age = 25
prices = [10, 20, 30]
```

## Key Takeaways

- Use **snake_case** for variables
- Use **UPPERCASE** for constants
- Use **descriptive names** that explain purpose
- Boolean variables should ask yes/no questions
- Avoid single letters except in loops
- Follow PEP 8 conventions
- Never use reserved keywords

## What's Next?

You've mastered variable naming! Next, we'll learn about **variable assignment and reassignment**.
