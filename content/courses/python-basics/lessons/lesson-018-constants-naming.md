---
id: 44-constants-naming
title: Constants and Naming Conventions
chapterId: ch2-variables
order: 5
duration: 20
objectives:
  - Understand Python naming conventions (PEP 8)
  - Learn how to define and use constants
  - Follow best practices for variable naming
  - Avoid common naming mistakes
---

# Constants and Naming Conventions

## Introduction

Python doesn't have true constants (variables that cannot be changed), but by convention, we use UPPERCASE names to indicate that a value should not be modified. Following naming conventions makes your code readable and professional.

## What Are Constants?

Constants are values that never change throughout your program:

```python
# Constants - UPPERCASE with underscores
MAX_CONNECTIONS = 100
API_KEY = "abc123xyz"
PI = 3.14159
DEFAULT_TIMEOUT_SECONDS = 30

# Usage
if current_connections < MAX_CONNECTIONS:
    print("Connection allowed")
```

**Important**: Python won't prevent you from changing a constant - the UPPERCASE naming is just a convention telling other programmers "don't change this value".

```python
MAX_USERS = 50
MAX_USERS = 100  # Python allows this, but you shouldn't do it!
```

## Naming Conventions (PEP 8)

Python's official style guide is called **PEP 8**. Here are the key rules:

### Variables and Functions: snake_case

```python
# Good - lowercase with underscores
user_name = "Alice"
total_price = 99.99
is_valid = True
has_permission = False

def calculate_total_price(items):
    pass

def send_email_notification(user):
    pass
```

### Constants: UPPERCASE_WITH_UNDERSCORES

```python
# Good - all uppercase
MAX_RETRIES = 3
DATABASE_URL = "localhost:5432"
DEFAULT_LANGUAGE = "en"
SECONDS_PER_DAY = 86400
```

### Classes: PascalCase

```python
# Good - capitalize each word, no underscores
class UserAccount:
    pass

class ShoppingCart:
    pass

class DatabaseConnection:
    pass
```

### Private Variables: _leading_underscore

```python
# Indicates "internal use only"
_internal_counter = 0
_cache = {}

def _helper_function():
    pass
```

## Good Variable Names

Choose names that are descriptive and meaningful:

```python
# Bad - unclear
x = 25
d = "2025-11-18"
temp = "John"
list1 = [1, 2, 3]

# Good - clear and descriptive
user_age = 25
registration_date = "2025-11-18"
customer_name = "John"
product_prices = [1, 2, 3]
```

### Single Letter Variables

Only use single letters in specific contexts:

```python
# Good - loop counters
for i in range(10):
    print(i)

for x, y in coordinates:
    print(x, y)

# Bad - unclear what 'a' represents
a = calculate_total(prices)

# Good - descriptive
total_price = calculate_total(prices)
```

## Naming Length

Balance between too short and too long:

```python
# Too short
n = "Alice"
p = 19.99

# Too long
the_name_of_the_currently_logged_in_user = "Alice"
the_final_calculated_price_after_discount = 19.99

# Just right
user_name = "Alice"
final_price = 19.99
```

## Boolean Variables

Boolean variables should answer yes/no questions:

```python
# Good - starts with is/has/can/should
is_valid = True
has_permission = False
can_edit = True
should_retry = False
is_authenticated = True

# Bad - unclear
valid = True
permission = False
edit = True
```

## Avoid Reserved Keywords

Don't use Python's reserved words:

```python
# Bad - 'class' and 'for' are reserved
class = "Math"  # SyntaxError
for = 10        # SyntaxError

# Good
class_name = "Math"
iteration_count = 10

# Other reserved words to avoid:
# if, else, elif, while, for, def, return, True, False, None,
# import, from, as, try, except, finally, raise, with, break,
# continue, pass, lambda, and, or, not, in, is
```

## Practical Examples

### Example 1: Configuration Constants

```python
# Configuration file
DATABASE_HOST = "localhost"
DATABASE_PORT = 5432
DATABASE_NAME = "myapp"
MAX_CONNECTIONS = 50
CONNECTION_TIMEOUT = 30

# Using constants
def connect_database():
    connection = create_connection(
        host=DATABASE_HOST,
        port=DATABASE_PORT,
        database=DATABASE_NAME,
        timeout=CONNECTION_TIMEOUT
    )
    return connection
```

### Example 2: Readable Code

```python
# Bad naming
def calc(x, y, z):
    t = x * y
    r = t - z
    return r

# Good naming
def calculate_total_price(quantity, unit_price, discount):
    subtotal = quantity * unit_price
    total = subtotal - discount
    return total
```

### Example 3: Boolean Flags

```python
# User account system
is_premium_member = True
has_verified_email = False
can_post_comments = True
should_show_ads = False

if is_premium_member and has_verified_email:
    print("Full access granted")
    
if not should_show_ads:
    print("Ad-free experience")
```

### Example 4: Magic Numbers vs Constants

```python
# Bad - magic numbers (what do these mean?)
if user_age >= 18:
    print("Adult")

if attempts > 3:
    print("Locked")

# Good - named constants
ADULT_AGE = 18
MAX_LOGIN_ATTEMPTS = 3

if user_age >= ADULT_AGE:
    print("Adult")

if attempts > MAX_LOGIN_ATTEMPTS:
    print("Locked")
```

## Common Naming Patterns

```python
# Collections (plural nouns)
user_names = ["Alice", "Bob", "Charlie"]
product_prices = [10.99, 20.99, 30.99]
error_messages = ["Invalid input", "Timeout"]

# Counts
user_count = 150
total_items = 42
remaining_attempts = 2

# Indices and positions
current_index = 0
start_position = 10
end_position = 50

# Flags and states
is_loading = True
has_error = False
is_complete = True

# Temporary values (when scope is tiny)
temp_value = x
tmp_result = calculate()
```

## Naming Anti-Patterns to Avoid

```python
# Don't use abbreviations unless very common
usr = "Alice"      # Bad
u = "Alice"        # Bad
user = "Alice"     # Good

# Don't use numbers in names (usually)
var1 = "data"      # Bad
var2 = "more data" # Bad
user_data = "data" # Good
admin_data = "more data" # Good

# Don't use type in name (usually)
user_string = "Alice"  # Bad - obvious it's a string
user = "Alice"         # Good

price_int = 50        # Bad
price = 50            # Good

# Exception: when distinguishing formats
user_id = 12345       # Good (integer)
user_id_str = "12345" # Good (string version)
```

## Summary

- **Constants**: UPPERCASE_WITH_UNDERSCORES (convention, not enforced)
- **Variables**: lowercase_with_underscores (snake_case)
- **Classes**: PascalCase
- **Private**: _leading_underscore
- **Choose descriptive names** that explain what the variable holds
- **Boolean variables** should start with is/has/can/should
- **Avoid reserved keywords** like if, for, class, def
- **Replace magic numbers** with named constants
- **Follow PEP 8** for consistent, professional code

## Next Steps

Next, you'll learn about multiple assignment and unpacking in Python.
