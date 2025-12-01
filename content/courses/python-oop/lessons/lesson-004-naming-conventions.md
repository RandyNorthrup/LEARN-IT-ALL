---
id: naming-conventions
title: Naming Conventions and Best Practices
chapterId: ch1-clean-code
order: 4
duration: 14
objectives:
  - Master Python naming conventions (PEP 8)
  - Learn how to choose meaningful names
  - Understand naming patterns for different contexts
---

# Naming Conventions and Best Practices

Good names are the foundation of readable code. Names should reveal intent without requiring additional explanation.

## Python Naming Conventions (PEP 8)

### Variables and Functions: snake_case

```python
# ✅ Good: lowercase with underscores
user_name = "Alice"
total_price = 99.99
MAX_CONNECTIONS = 100

def calculate_total():
    pass

def send_email_notification():
    pass
```

### Classes: PascalCase

```python
# ✅ Good: capitalize each word
class UserAccount:
    pass

class ShoppingCart:
    pass

class DatabaseConnection:
    pass
```

### Constants: UPPER_SNAKE_CASE

```python
# ✅ Good: all uppercase with underscores
MAX_RETRY_ATTEMPTS = 3
DEFAULT_TIMEOUT_SECONDS = 30
PI = 3.14159
DATABASE_URL = "postgresql://localhost/db"
```

### Private Attributes: _leading_underscore

```python
class BankAccount:
    def __init__(self):
        self._balance = 0  # private, internal use
        self.account_number = "12345"  # public
```

## Choosing Meaningful Names

### Rule 1: Names Should Reveal Intent

```python
# ❌ Bad: What is 'd'?
d = 86400

# ✅ Good: Clear meaning
seconds_per_day = 86400

# ❌ Bad: What does 'process' do?
def process(data):
    return [x * 2 for x in data]

# ✅ Good: Clear purpose
def double_all_values(numbers):
    return [number * 2 for number in numbers]
```

### Rule 2: Use Pronounceable Names

```python
# ❌ Bad: Unpronounceable abbreviations
gen_ymdhms = datetime.now()
dt_mod_ts = file.modified

# ✅ Good: Readable names
generation_timestamp = datetime.now()
modification_date = file.modified
```

### Rule 3: Use Searchable Names

```python
# ❌ Bad: Hard to search for
if status == 1:
    do_something()

# ✅ Good: Searchable constant
STATUS_ACTIVE = 1
STATUS_INACTIVE = 0

if status == STATUS_ACTIVE:
    do_something()
```

### Rule 4: Avoid Mental Mapping

```python
# ❌ Bad: What do i, j, k represent?
for i in range(len(users)):
    for j in range(len(users[i].orders)):
        process(users[i].orders[j])

# ✅ Good: Clear what each represents
for user in users:
    for order in user.orders:
        process(order)
```

## Naming Patterns

### Boolean Names: Start with is/has/can/should

```python
# ✅ Good: Boolean names
is_active = True
has_permission = False
can_edit = user.role == "admin"
should_retry = attempts < MAX_ATTEMPTS
```

### Collections: Use Plural Names

```python
# ✅ Good: Plural for collections
users = get_all_users()
active_orders = get_active_orders()
error_messages = ["Error 1", "Error 2"]

# ✅ Good: Singular for single items
user = get_user_by_id(123)
active_order = get_current_order()
error_message = "Invalid input"
```

### Functions: Start with Verbs

```python
# ✅ Good: Verb + noun pattern
def calculate_total():
    pass

def send_email():
    pass

def validate_user_input():
    pass

def fetch_user_data():
    pass
```

### Classes: Use Nouns

```python
# ✅ Good: Noun or noun phrase
class User:
    pass

class ShoppingCart:
    pass

class PaymentProcessor:
    pass
```

## Context Matters

### Add Context When Needed

```python
# ❌ Bad: Ambiguous in isolation
street = "Main St"
city = "Springfield"
state = "IL"
zip = "62701"

# ✅ Good: Clear context
address_street = "Main St"
address_city = "Springfield"
address_state = "IL"
address_zip = "62701"

# ✅ Even better: Use a class
class Address:
    def __init__(self):
        self.street = "Main St"
        self.city = "Springfield"
        self.state = "IL"
        self.zip_code = "62701"
```

### Don't Add Unnecessary Context

```python
# ❌ Bad: Redundant prefixes
class User:
    def __init__(self):
        self.user_name = ""
        self.user_email = ""
        self.user_password = ""

# ✅ Good: Context from class
class User:
    def __init__(self):
        self.name = ""
        self.email = ""
        self.password = ""
```

## Avoid These Common Mistakes

### Don't Use Single Letters (Except Loops)

```python
# ❌ Bad
a = get_account()
b = calculate_balance(a)

# ✅ Good
account = get_account()
balance = calculate_balance(account)

# ✅ Acceptable: Simple loop counters
for i in range(10):
    print(i)
```

### Don't Use Encodings or Hungarian Notation

```python
# ❌ Bad: Type prefixes (C-style)
str_name = "Alice"
int_age = 30
list_items = [1, 2, 3]

# ✅ Good: Python is dynamically typed
name = "Alice"
age = 30
items = [1, 2, 3]
```

### Don't Be Cute or Use Slang

```python
# ❌ Bad: Unclear, unprofessional
def whack_user():  # Delete user?
    pass

def go_fast():  # Optimize?
    pass

# ✅ Good: Professional, clear
def delete_user():
    pass

def optimize_performance():
    pass
```

## Real-World Example

```python
# ❌ Bad: Poor naming throughout
class A:
    def __init__(self, n, e, p):
        self.n = n
        self.e = e
        self.p = p
    
    def v(self):
        return '@' in self.e and len(self.p) >= 8

u = A("Alice", "alice@example.com", "password123")
if u.v():
    print("OK")

# ✅ Good: Clear, professional naming
class UserAccount:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
    
    def is_valid(self):
        """Check if account has valid email and password."""
        has_valid_email = '@' in self.email
        MIN_PASSWORD_LENGTH = 8
        has_strong_password = len(self.password) >= MIN_PASSWORD_LENGTH
        return has_valid_email and has_strong_password

user = UserAccount("Alice", "alice@example.com", "password123")
if user.is_valid():
    print("Account is valid")
```

## Summary

Follow **PEP 8 naming conventions**: snake_case for variables/functions, PascalCase for classes, UPPER_SNAKE_CASE for constants. Names should **reveal intent** without requiring comments, be **pronounceable and searchable**, and **avoid mental mapping**. Use **is/has/can/should** for booleans, **plural names** for collections, **verbs** for functions, and **nouns** for classes. Add context when needed but avoid redundancy. Good naming makes code self-documenting and professional.
