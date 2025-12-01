---
id: code-smells
title: Recognizing Code Smells
chapterId: ch1-clean-code
order: 9
duration: 16
objectives:
  - Understand what code smells are
  - Learn to identify common code smells
  - Know when to refactor problematic code
---

# Recognizing Code Smells

**Code smells** are indicators that something might be wrong with your code's design. They're not bugs—the code works—but they suggest deeper problems that make code hard to maintain.

## What Are Code Smells?

Code smells are patterns that indicate:
- Poor design decisions
- Violation of best practices
- Technical debt accumulation
- Areas needing refactoring

## Common Code Smells

### 1. Long Method

```python
# ❌ Bad: Method does too much
def process_order(order):
    # Validate order (20 lines)
    if not order.items:
        raise ValueError("Empty order")
    for item in order.items:
        if item.quantity <= 0:
            raise ValueError("Invalid quantity")
    
    # Calculate totals (30 lines)
    subtotal = 0
    for item in order.items:
        subtotal += item.price * item.quantity
    discount = 0
    if order.customer.is_premium:
        discount = subtotal * 0.1
    tax = (subtotal - discount) * 0.08
    total = subtotal - discount + tax
    
    # Process payment (25 lines)
    if order.payment_method == "credit_card":
        # credit card logic
        pass
    elif order.payment_method == "paypal":
        # paypal logic
        pass
    
    # Update inventory (20 lines)
    # ... more code
    
    # Send notifications (15 lines)
    # ... even more code
    # Total: 110+ lines!

# ✅ Good: Extract smaller methods
def process_order(order):
    validate_order(order)
    total = calculate_order_total(order)
    process_payment(order, total)
    update_inventory(order)
    send_order_confirmation(order)

def validate_order(order):
    if not order.items:
        raise ValueError("Empty order")
    for item in order.items:
        if item.quantity <= 0:
            raise ValueError("Invalid quantity")

def calculate_order_total(order):
    subtotal = sum(item.price * item.quantity for item in order.items)
    discount = calculate_discount(order, subtotal)
    tax = calculate_tax(subtotal - discount)
    return subtotal - discount + tax
```

### 2. Large Class

```python
# ❌ Bad: God object doing everything
class User:
    def __init__(self):
        self.name = None
        self.email = None
        self.password_hash = None
        self.orders = []
        self.cart = []
        self.wishlist = []
        self.preferences = {}
    
    def login(self): pass
    def logout(self): pass
    def reset_password(self): pass
    def update_profile(self): pass
    def add_to_cart(self): pass
    def remove_from_cart(self): pass
    def checkout(self): pass
    def view_order_history(self): pass
    def add_to_wishlist(self): pass
    def send_email(self): pass
    def generate_report(self): pass
    # 50+ methods...

# ✅ Good: Separate concerns
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

class UserAuthentication:
    def login(self, user, password): pass
    def logout(self, user): pass
    def reset_password(self, user): pass

class ShoppingCart:
    def __init__(self, user):
        self.user = user
        self.items = []
    
    def add_item(self, item): pass
    def remove_item(self, item): pass
    def checkout(self): pass

class OrderHistory:
    def get_orders(self, user): pass
    def get_order_details(self, order_id): pass
```

### 3. Duplicate Code

```python
# ❌ Bad: Copy-pasted logic
def validate_email(email):
    if not email:
        return False
    if '@' not in email:
        return False
    if '.' not in email.split('@')[1]:
        return False
    return True

def validate_admin_email(email):
    if not email:
        return False
    if '@' not in email:
        return False
    if '.' not in email.split('@')[1]:
        return False
    if not email.endswith('@company.com'):
        return False
    return True

# ✅ Good: Reusable validation
def is_valid_email_format(email):
    if not email or '@' not in email:
        return False
    domain = email.split('@')[1]
    return '.' in domain

def validate_email(email):
    return is_valid_email_format(email)

def validate_admin_email(email):
    return is_valid_email_format(email) and email.endswith('@company.com')
```

### 4. Long Parameter List

```python
# ❌ Bad: Too many parameters
def create_user(name, email, password, age, country, 
                city, postal_code, phone, preferences,
                newsletter, notifications, theme):
    # Hard to remember order and meaning
    pass

# ✅ Good: Use data class or dictionary
from dataclasses import dataclass

@dataclass
class UserData:
    name: str
    email: str
    password: str
    age: int
    country: str
    city: str
    postal_code: str
    phone: str
    preferences: dict
    newsletter: bool
    notifications: bool
    theme: str

def create_user(user_data: UserData):
    # Clear and organized
    pass
```

### 5. Dead Code

```python
# ❌ Bad: Unused code cluttering codebase
def old_calculate_price(items):
    # No longer used, kept "just in case"
    pass

def deprecated_send_email(user):
    # Replaced by new system
    pass

# def commented_out_function():
#     # Should be deleted, not commented
#     pass

# ✅ Good: Remove unused code
# Trust version control - delete it!
# If you need it later, get it from git history
```

### 6. Comments Explaining Bad Code

```python
# ❌ Bad: Comments instead of clear code
def calc(x, y, z):
    # Add x and y, then multiply by z and subtract 100
    return (x + y) * z - 100

# ✅ Good: Self-documenting code
def calculate_adjusted_total(base_amount, additional_amount, multiplier):
    """Calculate total with multiplier adjustment."""
    ADJUSTMENT_CONSTANT = 100
    subtotal = base_amount + additional_amount
    adjusted = subtotal * multiplier
    return adjusted - ADJUSTMENT_CONSTANT
```

### 7. Magic Numbers

```python
# ❌ Bad: Mysterious numbers
def calculate_price(base_price):
    if base_price > 100:
        return base_price * 0.9
    return base_price * 0.95

def can_checkout(cart_total):
    return cart_total >= 25

# ✅ Good: Named constants
BULK_ORDER_THRESHOLD = 100
BULK_ORDER_DISCOUNT = 0.10
REGULAR_DISCOUNT = 0.05
MINIMUM_ORDER_AMOUNT = 25

def calculate_price(base_price):
    if base_price > BULK_ORDER_THRESHOLD:
        return base_price * (1 - BULK_ORDER_DISCOUNT)
    return base_price * (1 - REGULAR_DISCOUNT)

def can_checkout(cart_total):
    return cart_total >= MINIMUM_ORDER_AMOUNT
```

### 8. Inconsistent Naming

```python
# ❌ Bad: Inconsistent names
def getUserData(): pass
def get_user_orders(): pass
def FetchUserPrefs(): pass
def retrieve_user_wishlist(): pass

# ✅ Good: Consistent naming convention
def get_user_data(): pass
def get_user_orders(): pass
def get_user_preferences(): pass
def get_user_wishlist(): pass
```

### 9. Primitive Obsession

```python
# ❌ Bad: Using primitives for complex data
def create_order(customer_id, customer_name, customer_email,
                 product_ids, product_names, product_prices,
                 quantities):
    # Too many related primitives
    pass

# ✅ Good: Use objects for complex data
@dataclass
class Customer:
    id: str
    name: str
    email: str

@dataclass
class OrderItem:
    product_id: str
    product_name: str
    price: float
    quantity: int

def create_order(customer: Customer, items: list[OrderItem]):
    # Clear data structures
    pass
```

### 10. Switch Statements (Type Checking)

```python
# ❌ Bad: Type-based conditionals
def calculate_area(shape):
    if shape.type == "circle":
        return 3.14 * shape.radius ** 2
    elif shape.type == "rectangle":
        return shape.width * shape.height
    elif shape.type == "triangle":
        return 0.5 * shape.base * shape.height
    # Adding new shape requires modifying this function

# ✅ Good: Polymorphism
class Shape:
    def calculate_area(self):
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def calculate_area(self):
        return 3.14 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def calculate_area(self):
        return self.width * self.height

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height
    
    def calculate_area(self):
        return 0.5 * self.base * self.height
```

### 11. Data Clumps

```python
# ❌ Bad: Same parameters appear together
def create_invoice(customer_name, customer_email, customer_address):
    pass

def send_receipt(customer_name, customer_email, customer_address):
    pass

def update_billing(customer_name, customer_email, customer_address):
    pass

# ✅ Good: Group related data
@dataclass
class Customer:
    name: str
    email: str
    address: str

def create_invoice(customer: Customer):
    pass

def send_receipt(customer: Customer):
    pass

def update_billing(customer: Customer):
    pass
```

### 12. Inappropriate Intimacy

```python
# ❌ Bad: Classes too dependent on each other
class Order:
    def __init__(self):
        self.items = []
        self.customer = None
    
    def calculate_total(self):
        # Accessing customer's internal data directly
        discount = 0
        if self.customer.loyalty_points > 1000:
            discount = 0.1
        # ...

# ✅ Good: Proper encapsulation
class Customer:
    def get_discount_rate(self):
        """Return discount rate based on loyalty."""
        if self.loyalty_points > 1000:
            return 0.1
        return 0

class Order:
    def calculate_total(self):
        discount_rate = self.customer.get_discount_rate()
        # Use public interface, not internal data
```

## When to Refactor

Refactor when:
- You identify a code smell
- You need to modify smelly code
- You're about to add a feature
- Code becomes hard to understand
- Tests become difficult to write

**Don't refactor when:**
- Code works and never changes
- Deadline is critical (but schedule it)
- You don't have tests

## Summary

**Code smells** indicate potential design problems that make code hard to maintain. Common smells include **long methods**, **large classes**, **duplicate code**, **long parameter lists**, and **magic numbers**. Other smells are **dead code**, **poor comments**, **primitive obsession**, and **switch statements** that should use polymorphism. Recognize these patterns early and refactor before they accumulate into **technical debt** that's expensive to fix later.
