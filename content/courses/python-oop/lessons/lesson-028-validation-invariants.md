---
id: validation-invariants
title: Validation and Class Invariants
chapterId: ch3-encapsulation
order: 28
duration: 17
objectives:
  - Understand class invariants
  - Master input validation techniques
  - Learn to maintain object consistency
---

# Validation and Class Invariants

**Class invariants** are conditions that must **always** be true for an object. **Validation** ensures these invariants are maintained throughout the object's lifetime, preventing invalid states.

## What Are Invariants?

```python
# Rectangle invariant: width and height must always be positive
class Rectangle:
    """Invariant: width > 0 and height > 0"""
    
    def __init__(self, width, height):
        if width <= 0 or height <= 0:
            raise ValueError("Dimensions must be positive")
        self._width = width
        self._height = height

# This invariant is maintained throughout the object's life
rect = Rectangle(10, 5)  # ✅ Valid
# rect = Rectangle(-10, 5)  # ❌ ValueError - invariant violated
```

## Common Invariants

```python
# 1. Range constraints
class Temperature:
    """Invariant: celsius >= -273.15 (absolute zero)"""
    
    def __init__(self, celsius):
        if celsius < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = celsius

# 2. Non-null constraints
class User:
    """Invariant: username and email cannot be empty"""
    
    def __init__(self, username, email):
        if not username or not email:
            raise ValueError("Username and email required")
        self._username = username
        self._email = email

# 3. Format constraints
class EmailAddress:
    """Invariant: email must contain @ and domain"""
    
    def __init__(self, email):
        if "@" not in email or "." not in email.split("@")[1]:
            raise ValueError("Invalid email format")
        self._email = email

# 4. Relationship constraints
class BankAccount:
    """Invariant: balance >= overdraft_limit"""
    
    def __init__(self, balance=0, overdraft_limit=0):
        if balance < overdraft_limit:
            raise ValueError("Balance below overdraft limit")
        self._balance = balance
        self._overdraft_limit = overdraft_limit
```

## Validation in Constructors

```python
# ✅ Validate all parameters in __init__
class Product:
    def __init__(self, name, price, quantity):
        # Validate name
        if not name or not name.strip():
            raise ValueError("Name cannot be empty")
        if len(name) > 255:
            raise ValueError("Name too long")
        
        # Validate price
        if not isinstance(price, (int, float)):
            raise TypeError("Price must be a number")
        if price < 0:
            raise ValueError("Price cannot be negative")
        
        # Validate quantity
        if not isinstance(quantity, int):
            raise TypeError("Quantity must be an integer")
        if quantity < 0:
            raise ValueError("Quantity cannot be negative")
        
        self._name = name.strip()
        self._price = float(price)
        self._quantity = quantity

# All instances are guaranteed valid
product = Product("Laptop", 999.99, 10)  # ✅
# product = Product("", 999.99, 10)      # ❌ ValueError
# product = Product("Laptop", -100, 10)  # ❌ ValueError
```

## Validation in Setters

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius  # Uses setter
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        """Validate every time radius is set."""
        if not isinstance(value, (int, float)):
            raise TypeError("Radius must be a number")
        if value <= 0:
            raise ValueError("Radius must be positive")
        self._radius = float(value)
    
    @property
    def diameter(self):
        return self._radius * 2
    
    @property
    def area(self):
        return 3.14159 * self._radius ** 2

circle = Circle(5)
print(circle.area)  # 78.53975

circle.radius = 10   # ✅ Valid
# circle.radius = -5 # ❌ ValueError - invariant protected
```

## Maintaining Invariants Across Methods

```python
class Counter:
    """Invariant: count >= 0 (never negative)"""
    
    def __init__(self, initial=0):
        if initial < 0:
            raise ValueError("Initial count must be non-negative")
        self._count = initial
    
    def increment(self):
        """Maintain invariant: count stays >= 0."""
        self._count += 1
    
    def decrement(self):
        """Maintain invariant: prevent negative count."""
        if self._count == 0:
            raise ValueError("Cannot decrement below zero")
        self._count -= 1
    
    def reset(self):
        """Maintain invariant: reset to valid value."""
        self._count = 0
    
    @property
    def count(self):
        return self._count

counter = Counter(5)
counter.increment()  # 6
counter.decrement()  # 5
# Multiple decrements...
# counter.decrement()  # Eventually raises ValueError
```

## Complex Invariants

```python
class DateRange:
    """Invariant: start_date <= end_date"""
    
    def __init__(self, start_date, end_date):
        if start_date > end_date:
            raise ValueError("Start date must be before end date")
        self._start_date = start_date
        self._end_date = end_date
    
    @property
    def start_date(self):
        return self._start_date
    
    @start_date.setter
    def start_date(self, value):
        """Validate invariant when changing start_date."""
        if value > self._end_date:
            raise ValueError("Start date must be before end date")
        self._start_date = value
    
    @property
    def end_date(self):
        return self._end_date
    
    @end_date.setter
    def end_date(self, value):
        """Validate invariant when changing end_date."""
        if value < self._start_date:
            raise ValueError("End date must be after start date")
        self._end_date = value
    
    def duration_days(self):
        """Safe to compute - invariant guarantees valid range."""
        return (self._end_date - self._start_date).days

from datetime import date

date_range = DateRange(date(2024, 1, 1), date(2024, 12, 31))
print(date_range.duration_days())  # 365

# date_range.start_date = date(2025, 1, 1)  # ❌ ValueError
```

## Validation Strategies

### Strategy 1: Fail Fast (Strict)

```python
# ✅ Reject invalid data immediately
class StrictUser:
    def __init__(self, username, age):
        if not username or len(username) < 3:
            raise ValueError("Username must be at least 3 characters")
        if not 0 <= age <= 150:
            raise ValueError("Age must be between 0 and 150")
        
        self._username = username
        self._age = age

# Forces caller to provide valid data
try:
    user = StrictUser("AB", 25)  # ❌ Raises immediately
except ValueError as e:
    print(f"Error: {e}")
```

### Strategy 2: Normalization

```python
# ✅ Normalize/fix input when reasonable
class NormalizedUser:
    def __init__(self, username, email):
        # Normalize: strip whitespace, lowercase
        self._username = username.strip().lower()
        self._email = email.strip().lower()
        
        # Then validate
        if not self._username or len(self._username) < 3:
            raise ValueError("Invalid username")
        if "@" not in self._email:
            raise ValueError("Invalid email")

user = NormalizedUser("  Alice  ", "Alice@Example.com  ")
print(user._username)  # "alice" (normalized)
print(user._email)     # "alice@example.com" (normalized)
```

### Strategy 3: Default Values

```python
# ✅ Provide sensible defaults for optional parameters
class ServerConfig:
    def __init__(self, host, port=8080, timeout=30.0):
        # Validate required
        if not host:
            raise ValueError("Host required")
        
        # Validate optional with defaults
        if port <= 0 or port > 65535:
            raise ValueError("Invalid port")
        if timeout <= 0:
            raise ValueError("Timeout must be positive")
        
        self._host = host
        self._port = port
        self._timeout = timeout

config = ServerConfig("localhost")  # Uses defaults
print(config._port)  # 8080
```

## Real-World Example: Money Class

```python
from decimal import Decimal

class Money:
    """
    Invariants:
    1. amount >= 0 (no negative money)
    2. currency is 3-letter code (ISO 4217)
    3. amount uses Decimal (no floating point errors)
    """
    
    VALID_CURRENCIES = {"USD", "EUR", "GBP", "JPY", "CAD"}
    
    def __init__(self, amount, currency):
        # Validate and normalize amount
        if not isinstance(amount, (int, float, Decimal)):
            raise TypeError("Amount must be a number")
        amount = Decimal(str(amount))
        if amount < 0:
            raise ValueError("Amount cannot be negative")
        
        # Validate currency
        currency = currency.upper()
        if currency not in self.VALID_CURRENCIES:
            raise ValueError(f"Invalid currency: {currency}")
        
        self._amount = amount
        self._currency = currency
    
    @property
    def amount(self):
        return self._amount
    
    @property
    def currency(self):
        return self._currency
    
    def add(self, other):
        """Add money - maintains invariants."""
        if not isinstance(other, Money):
            raise TypeError("Can only add Money to Money")
        if self._currency != other._currency:
            raise ValueError("Cannot add different currencies")
        
        return Money(self._amount + other._amount, self._currency)
    
    def subtract(self, other):
        """Subtract money - maintains invariants."""
        if not isinstance(other, Money):
            raise TypeError("Can only subtract Money from Money")
        if self._currency != other._currency:
            raise ValueError("Cannot subtract different currencies")
        
        new_amount = self._amount - other._amount
        if new_amount < 0:
            raise ValueError("Result would be negative")
        
        return Money(new_amount, self._currency)
    
    def __repr__(self):
        return f"Money({self._amount}, '{self._currency}')"

# All operations maintain invariants
money1 = Money(100.50, "USD")
money2 = Money(25.25, "usd")  # Normalized to "USD"

money3 = money1.add(money2)
print(money3)  # Money(125.75, 'USD')

# Invalid operations rejected
# money4 = money1.subtract(Money(200, "USD"))  # ❌ Would be negative
# money5 = money1.add(Money(50, "EUR"))        # ❌ Different currency
```

## Validation Helpers

```python
class Validator:
    """Reusable validation utilities."""
    
    @staticmethod
    def require_non_empty(value, field_name):
        """Validate non-empty string."""
        if not value or not value.strip():
            raise ValueError(f"{field_name} cannot be empty")
        return value.strip()
    
    @staticmethod
    def require_positive(value, field_name):
        """Validate positive number."""
        if value <= 0:
            raise ValueError(f"{field_name} must be positive")
        return value
    
    @staticmethod
    def require_range(value, min_val, max_val, field_name):
        """Validate value in range."""
        if not min_val <= value <= max_val:
            raise ValueError(
                f"{field_name} must be between {min_val} and {max_val}"
            )
        return value
    
    @staticmethod
    def require_email(value):
        """Validate email format."""
        if "@" not in value or "." not in value.split("@")[1]:
            raise ValueError("Invalid email format")
        return value.lower().strip()

class ValidatedUser:
    def __init__(self, username, email, age):
        self._username = Validator.require_non_empty(username, "Username")
        self._email = Validator.require_email(email)
        self._age = Validator.require_range(age, 0, 150, "Age")

user = ValidatedUser("Alice", "alice@example.com", 25)  # ✅
# user = ValidatedUser("", "alice@example.com", 25)     # ❌ ValueError
```

## Documenting Invariants

```python
class BankAccount:
    """
    Represents a bank account.
    
    Invariants:
        - balance >= overdraft_limit
        - account_id is non-empty string
        - overdraft_limit <= 0 (limit is negative number)
    
    All methods maintain these invariants.
    """
    
    def __init__(self, account_id, balance=0.0, overdraft_limit=0.0):
        """
        Initialize bank account.
        
        Args:
            account_id: Unique account identifier (non-empty)
            balance: Initial balance (must be >= overdraft_limit)
            overdraft_limit: Overdraft limit (must be <= 0)
        
        Raises:
            ValueError: If invariants would be violated
        """
        if not account_id:
            raise ValueError("Account ID required")
        if overdraft_limit > 0:
            raise ValueError("Overdraft limit must be <= 0")
        if balance < overdraft_limit:
            raise ValueError("Balance below overdraft limit")
        
        self._account_id = account_id
        self._balance = balance
        self._overdraft_limit = overdraft_limit
    
    def withdraw(self, amount):
        """
        Withdraw money from account.
        
        Maintains invariant: balance >= overdraft_limit
        
        Args:
            amount: Amount to withdraw (must be positive)
        
        Raises:
            ValueError: If withdrawal would violate invariant
        """
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if self._balance - amount < self._overdraft_limit:
            raise ValueError("Insufficient funds")
        
        self._balance -= amount
```

## Invariant Checklist

When designing a class with invariants:

- [ ] **Identify invariants** - what must always be true?
- [ ] **Validate in constructor** - establish invariants immediately
- [ ] **Validate in setters** - maintain invariants on changes
- [ ] **Validate in methods** - prevent invariant violations
- [ ] **Document invariants** - explain what must stay true
- [ ] **Use appropriate exceptions** - ValueError for validation errors
- [ ] **Test boundaries** - verify edge cases
- [ ] **Normalize when reasonable** - fix input if possible
- [ ] **Fail fast** - reject invalid state immediately
- [ ] **Be consistent** - same validation everywhere

## Summary

**Class invariants** are conditions that must always hold true for an object. Establish invariants in the **constructor** through thorough validation, and maintain them throughout the object's lifetime using **property setters** and **method validation**. Use **fail-fast validation** to reject invalid data immediately, preventing inconsistent states. Document invariants clearly in docstrings, and use **type hints** and **descriptive error messages** to guide users. Common invariants include **range constraints** (age >= 0), **format requirements** (valid email), **relationship constraints** (start < end), and **consistency rules** (balance >= overdraft_limit). Proper validation and invariant maintenance create **reliable, predictable objects** that are impossible to put into invalid states.
