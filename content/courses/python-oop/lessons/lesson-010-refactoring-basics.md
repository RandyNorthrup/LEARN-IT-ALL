---
id: refactoring-basics
title: Refactoring Techniques
chapterId: ch1-clean-code
order: 10
duration: 17
objectives:
  - Understand what refactoring is
  - Learn safe refactoring techniques
  - Master common refactoring patterns
---

# Refactoring Techniques

**Refactoring** is restructuring existing code without changing its external behavior. It's about improving code quality while keeping functionality intact.

## What is Refactoring?

Refactoring means:
- Improving internal structure
- Making code more maintainable
- Reducing complexity
- Keeping tests passing

## The Golden Rule

**Always refactor with passing tests!**

```python
# 1. Write tests first
def test_calculate_total():
    items = [Item("Book", 10, 2), Item("Pen", 5, 3)]
    assert calculate_total(items) == 35

# 2. Then refactor
# 3. Keep tests green
```

## Common Refactoring Techniques

### 1. Extract Method

**Break down long methods into smaller ones.**

```python
# ❌ Before: Long method
def process_invoice(invoice):
    # Validate
    if not invoice.items:
        raise ValueError("No items")
    for item in invoice.items:
        if item.price < 0:
            raise ValueError("Negative price")
    
    # Calculate
    subtotal = 0
    for item in invoice.items:
        subtotal += item.price * item.quantity
    
    tax = subtotal * 0.08
    total = subtotal + tax
    
    # Save
    database.save(invoice)
    email.send(invoice.customer, f"Total: {total}")

# ✅ After: Extracted methods
def process_invoice(invoice):
    validate_invoice(invoice)
    total = calculate_total(invoice)
    save_and_notify(invoice, total)

def validate_invoice(invoice):
    if not invoice.items:
        raise ValueError("No items")
    for item in invoice.items:
        if item.price < 0:
            raise ValueError("Negative price")

def calculate_total(invoice):
    subtotal = sum(item.price * item.quantity for item in invoice.items)
    TAX_RATE = 0.08
    tax = subtotal * TAX_RATE
    return subtotal + tax

def save_and_notify(invoice, total):
    database.save(invoice)
    email.send(invoice.customer, f"Total: {total}")
```

### 2. Extract Variable

**Make complex expressions clearer with named variables.**

```python
# ❌ Before: Complex expression
if (user.age >= 18 and user.country == "US" and 
    user.has_valid_id and not user.is_banned):
    allow_access()

# ✅ After: Named variable
is_adult = user.age >= 18
is_us_citizen = user.country == "US"
has_valid_id = user.has_valid_id
is_not_banned = not user.is_banned

can_access = is_adult and is_us_citizen and has_valid_id and is_not_banned

if can_access:
    allow_access()
```

### 3. Rename Variable/Method

**Use clear, descriptive names.**

```python
# ❌ Before: Unclear names
def calc(x, y):
    z = x * y * 0.08
    return z

# ✅ After: Clear names
def calculate_sales_tax(price, quantity):
    TAX_RATE = 0.08
    subtotal = price * quantity
    tax = subtotal * TAX_RATE
    return tax
```

### 4. Replace Magic Numbers with Constants

```python
# ❌ Before: Magic numbers
def calculate_shipping(weight):
    if weight < 5:
        return 10
    elif weight < 20:
        return 20
    else:
        return 30

# ✅ After: Named constants
LIGHT_PACKAGE_THRESHOLD = 5
MEDIUM_PACKAGE_THRESHOLD = 20
LIGHT_PACKAGE_COST = 10
MEDIUM_PACKAGE_COST = 20
HEAVY_PACKAGE_COST = 30

def calculate_shipping(weight):
    if weight < LIGHT_PACKAGE_THRESHOLD:
        return LIGHT_PACKAGE_COST
    elif weight < MEDIUM_PACKAGE_THRESHOLD:
        return MEDIUM_PACKAGE_COST
    else:
        return HEAVY_PACKAGE_COST
```

### 5. Introduce Parameter Object

```python
# ❌ Before: Too many parameters
def create_user(name, email, age, country, city, postal_code):
    # Parameters always passed together
    pass

def update_user(user_id, name, email, age, country, city, postal_code):
    # Same parameters repeated
    pass

# ✅ After: Parameter object
from dataclasses import dataclass

@dataclass
class UserData:
    name: str
    email: str
    age: int
    country: str
    city: str
    postal_code: str

def create_user(user_data: UserData):
    pass

def update_user(user_id: str, user_data: UserData):
    pass
```

### 6. Replace Conditional with Polymorphism

```python
# ❌ Before: Type checking with conditionals
class Bird:
    def __init__(self, bird_type):
        self.type = bird_type
    
    def move(self):
        if self.type == "sparrow":
            return "Flying"
        elif self.type == "penguin":
            return "Swimming"
        elif self.type == "ostrich":
            return "Running"

# ✅ After: Polymorphism
class Bird:
    def move(self):
        raise NotImplementedError

class Sparrow(Bird):
    def move(self):
        return "Flying"

class Penguin(Bird):
    def move(self):
        return "Swimming"

class Ostrich(Bird):
    def move(self):
        return "Running"
```

### 7. Consolidate Duplicate Conditional Fragments

```python
# ❌ Before: Duplication in branches
def process_payment(payment_type, amount):
    if payment_type == "credit_card":
        validate_credit_card()
        charge_credit_card(amount)
        log_transaction(amount)
    elif payment_type == "paypal":
        validate_paypal()
        charge_paypal(amount)
        log_transaction(amount)
    else:
        validate_bank_account()
        charge_bank_account(amount)
        log_transaction(amount)

# ✅ After: Extract common code
def process_payment(payment_type, amount):
    if payment_type == "credit_card":
        validate_credit_card()
        charge_credit_card(amount)
    elif payment_type == "paypal":
        validate_paypal()
        charge_paypal(amount)
    else:
        validate_bank_account()
        charge_bank_account(amount)
    
    log_transaction(amount)  # Once, outside conditional
```

### 8. Replace Nested Conditionals with Guard Clauses

```python
# ❌ Before: Deep nesting
def calculate_discount(user, order):
    if user is not None:
        if user.is_active:
            if order.total > 100:
                if user.is_premium:
                    return order.total * 0.20
                else:
                    return order.total * 0.10
            else:
                return 0
        else:
            return 0
    else:
        return 0

# ✅ After: Guard clauses (early returns)
def calculate_discount(user, order):
    if user is None:
        return 0
    
    if not user.is_active:
        return 0
    
    if order.total <= 100:
        return 0
    
    if user.is_premium:
        return order.total * 0.20
    
    return order.total * 0.10
```

### 9. Extract Class

```python
# ❌ Before: Class doing too much
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.street = None
        self.city = None
        self.postal_code = None
        self.country = None
    
    def get_full_address(self):
        return f"{self.street}, {self.city}, {self.postal_code}, {self.country}"
    
    def validate_address(self):
        # Address validation logic
        pass

# ✅ After: Separate address class
class Address:
    def __init__(self, street, city, postal_code, country):
        self.street = street
        self.city = city
        self.postal_code = postal_code
        self.country = country
    
    def get_full_address(self):
        return f"{self.street}, {self.city}, {self.postal_code}, {self.country}"
    
    def is_valid(self):
        # Address validation logic
        pass

class User:
    def __init__(self, name, email, address: Address):
        self.name = name
        self.email = email
        self.address = address
```

### 10. Inline Method

**Sometimes a method is too simple and should be inlined.**

```python
# ❌ Before: Unnecessary method
def get_rating(product):
    return get_product_rating(product)

def get_product_rating(product):
    return product.rating

# ✅ After: Inline simple method
def get_rating(product):
    return product.rating
```

## Refactoring Workflow

### Step-by-Step Process

1. **Identify Code Smell**
   - Long method, duplicate code, etc.

2. **Write Tests** (if they don't exist)
   - Ensure current behavior is captured

3. **Make Small Changes**
   - One refactoring at a time

4. **Run Tests**
   - Verify behavior hasn't changed

5. **Commit**
   - Small, focused commits

6. **Repeat**
   - Continue improving

### Example Workflow

```python
# Step 1: Identify smell (long method)
def process_order(order):
    # 150 lines of code...
    pass

# Step 2: Write test
def test_process_order():
    order = create_test_order()
    result = process_order(order)
    assert result.total == 100

# Step 3: Extract one method
def process_order(order):
    validate_order(order)
    # 130 lines remaining...
    pass

def validate_order(order):
    # Extracted validation logic
    pass

# Step 4: Run tests - GREEN ✓

# Step 5: Commit
# "Extract validate_order method"

# Step 6: Repeat for next refactoring
```

## When NOT to Refactor

- **No tests** - Too risky without safety net
- **Tight deadline** - Schedule it for later
- **Code you're deleting** - Don't polish code you'll remove
- **Stable, working code** - If it never changes, leave it

## Refactoring Tools

### Python Tools

```python
# Use IDE refactoring features:
# - Rename (Shift+F6 in PyCharm)
# - Extract Method (Ctrl+Alt+M)
# - Inline Variable (Ctrl+Alt+N)
# - Change Signature (Ctrl+F6)

# Static analysis tools:
# - pylint
# - flake8
# - mypy (type checking)
# - black (formatting)
```

## Summary

**Refactoring** improves code structure without changing behavior, always with **passing tests** as a safety net. Key techniques include **extracting methods** for long functions, **extracting variables** for clarity, **introducing parameter objects** for long parameter lists, and **replacing conditionals with polymorphism**. Use **guard clauses** to reduce nesting, **extract classes** when objects do too much, and **replace magic numbers** with constants. Refactor in **small steps**, run tests after each change, and commit frequently to maintain a clean, maintainable codebase.
