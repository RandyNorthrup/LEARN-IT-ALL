---
id: dry-principle
title: DRY Principle - Don't Repeat Yourself
chapterId: ch1-clean-code
order: 7
duration: 14
objectives:
  - Understand the DRY principle
  - Learn to identify and eliminate code duplication
  - Master techniques for code reuse
---

# DRY Principle - Don't Repeat Yourself

**DRY (Don't Repeat Yourself)** means every piece of knowledge should have a single, authoritative representation in your code. Duplication leads to maintenance nightmares.

## Why DRY Matters

```python
# ❌ Bad: Repeated validation logic
def create_user(name, email):
    if not name or len(name) < 2:
        raise ValueError("Invalid name")
    if not email or '@' not in email:
        raise ValueError("Invalid email")
    # create user...

def update_user(name, email):
    if not name or len(name) < 2:
        raise ValueError("Invalid name")
    if not email or '@' not in email:
        raise ValueError("Invalid email")
    # update user...

# ✅ Good: Single source of truth
def validate_user_data(name, email):
    """Validate user name and email."""
    if not name or len(name) < 2:
        raise ValueError("Invalid name")
    if not email or '@' not in email:
        raise ValueError("Invalid email")

def create_user(name, email):
    validate_user_data(name, email)
    # create user...

def update_user(name, email):
    validate_user_data(name, email)
    # update user...
```

## Identifying Duplication

### Type 1: Exact Duplication

```python
# ❌ Bad: Copy-pasted code
def calculate_order_total(items):
    total = 0
    for item in items:
        total += item.price * item.quantity
    tax = total * 0.08
    return total + tax

def calculate_cart_total(products):
    total = 0
    for product in products:
        total += product.price * product.quantity
    tax = total * 0.08
    return total + tax

# ✅ Good: Extract common logic
def calculate_subtotal(items):
    """Calculate subtotal from items with price and quantity."""
    return sum(item.price * item.quantity for item in items)

def apply_tax(subtotal):
    """Apply 8% sales tax."""
    TAX_RATE = 0.08
    return subtotal * TAX_RATE

def calculate_total_with_tax(items):
    """Calculate total including tax."""
    subtotal = calculate_subtotal(items)
    tax = apply_tax(subtotal)
    return subtotal + tax
```

### Type 2: Structural Duplication

```python
# ❌ Bad: Similar structure repeated
def get_active_users():
    users = database.get_all_users()
    active = []
    for user in users:
        if user.is_active:
            active.append(user)
    return active

def get_premium_users():
    users = database.get_all_users()
    premium = []
    for user in users:
        if user.is_premium:
            premium.append(user)
    return premium

# ✅ Good: Generic filter function
def filter_users(predicate):
    """Filter users by predicate function."""
    users = database.get_all_users()
    return [user for user in users if predicate(user)]

def get_active_users():
    return filter_users(lambda user: user.is_active)

def get_premium_users():
    return filter_users(lambda user: user.is_premium)
```

## Techniques for Eliminating Duplication

### 1. Extract Functions

```python
# ❌ Bad: Repeated formatting
print(f"Name: {user.name.strip().title()}")
print(f"City: {user.city.strip().title()}")
print(f"Country: {user.country.strip().title()}")

# ✅ Good: Extract formatting function
def format_text(text):
    """Format text: strip whitespace and title case."""
    return text.strip().title()

print(f"Name: {format_text(user.name)}")
print(f"City: {format_text(user.city)}")
print(f"Country: {format_text(user.country)}")
```

### 2. Use Parameters

```python
# ❌ Bad: Separate functions for similar operations
def send_welcome_email(user):
    subject = "Welcome!"
    body = f"Welcome {user.name}"
    send_email(user.email, subject, body)

def send_password_reset_email(user):
    subject = "Password Reset"
    body = f"Reset your password {user.name}"
    send_email(user.email, subject, body)

# ✅ Good: Parameterized function
def send_user_email(user, subject, body_template):
    """Send email to user with personalized body."""
    body = body_template.format(name=user.name)
    send_email(user.email, subject, body)

# Usage
send_user_email(user, "Welcome!", "Welcome {name}")
send_user_email(user, "Password Reset", "Reset your password {name}")
```

### 3. Use Data Structures

```python
# ❌ Bad: Repeated if-elif chains
def get_discount(user_type):
    if user_type == "premium":
        return 0.20
    elif user_type == "regular":
        return 0.10
    elif user_type == "new":
        return 0.05
    else:
        return 0

# ✅ Good: Data-driven approach
DISCOUNT_RATES = {
    "premium": 0.20,
    "regular": 0.10,
    "new": 0.05,
}

def get_discount(user_type):
    """Get discount rate for user type."""
    return DISCOUNT_RATES.get(user_type, 0)
```

### 4. Use Classes and Inheritance

```python
# ❌ Bad: Repeated validation in functions
def create_product(name, price):
    if not name:
        raise ValueError("Name required")
    if price < 0:
        raise ValueError("Price must be positive")
    # create product...

def update_product(name, price):
    if not name:
        raise ValueError("Name required")
    if price < 0:
        raise ValueError("Price must be positive")
    # update product...

# ✅ Good: Validation in class
class Product:
    def __init__(self, name, price):
        self._validate_name(name)
        self._validate_price(price)
        self.name = name
        self.price = price
    
    def _validate_name(self, name):
        if not name:
            raise ValueError("Name required")
    
    def _validate_price(self, price):
        if price < 0:
            raise ValueError("Price must be positive")
    
    def update(self, name=None, price=None):
        if name is not None:
            self._validate_name(name)
            self.name = name
        if price is not None:
            self._validate_price(price)
            self.price = price
```

## Configuration Duplication

```python
# ❌ Bad: Hardcoded values repeated
def connect_to_database():
    return connect("postgresql://localhost/mydb")

def backup_database():
    return backup("postgresql://localhost/mydb")

def migrate_database():
    return migrate("postgresql://localhost/mydb")

# ✅ Good: Configuration constant
DATABASE_URL = "postgresql://localhost/mydb"

def connect_to_database():
    return connect(DATABASE_URL)

def backup_database():
    return backup(DATABASE_URL)

def migrate_database():
    return migrate(DATABASE_URL)
```

## When Duplication is Acceptable

Sometimes duplication is better than the wrong abstraction:

```python
# Sometimes OK: Different contexts, different meanings
def validate_user_age(age):
    """Validate user age for account creation."""
    MIN_AGE = 13
    if age < MIN_AGE:
        raise ValueError(f"Must be at least {MIN_AGE}")

def validate_driver_age(age):
    """Validate age for driver's license."""
    MIN_AGE = 16
    if age < MIN_AGE:
        raise ValueError(f"Must be at least {MIN_AGE}")

# These look similar but serve different purposes
# and may evolve differently
```

## Real-World Example

```python
# ❌ Bad: Massive duplication
def process_order_with_credit_card(order, card):
    if not order.items:
        raise ValueError("Empty order")
    total = sum(item.price * item.quantity for item in order.items)
    if order.customer.is_premium:
        total *= 0.9
    charge_credit_card(card, total)
    send_email(order.customer.email, "Order confirmed")
    update_inventory(order.items)

def process_order_with_paypal(order, paypal_account):
    if not order.items:
        raise ValueError("Empty order")
    total = sum(item.price * item.quantity for item in order.items)
    if order.customer.is_premium:
        total *= 0.9
    charge_paypal(paypal_account, total)
    send_email(order.customer.email, "Order confirmed")
    update_inventory(order.items)

# ✅ Good: DRY with extracted logic
def validate_order(order):
    if not order.items:
        raise ValueError("Empty order")

def calculate_total(order):
    total = sum(item.price * item.quantity for item in order.items)
    if order.customer.is_premium:
        PREMIUM_DISCOUNT = 0.10
        total *= (1 - PREMIUM_DISCOUNT)
    return total

def complete_order(order):
    send_email(order.customer.email, "Order confirmed")
    update_inventory(order.items)

def process_order(order, payment_method):
    validate_order(order)
    total = calculate_total(order)
    payment_method.charge(total)
    complete_order(order)
```

## Summary

The **DRY principle** eliminates code duplication by creating a single source of truth for each piece of logic. **Extract functions** for repeated code, **use parameters** instead of multiple similar functions, leverage **data structures** for repeated patterns, and use **classes** for shared behavior. DRY makes code **easier to maintain** because changes only need to happen in one place, and **reduces bugs** by eliminating inconsistencies between duplicated code.
