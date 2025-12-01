---
id: what-is-encapsulation
title: Understanding Encapsulation
chapterId: ch3-encapsulation
order: 23
duration: 15
objectives:
  - Understand what encapsulation is
  - Learn why encapsulation matters
  - Master public, protected, and private access
---

# Understanding Encapsulation

**Encapsulation** is bundling data and methods that operate on that data within a single unit (class), while restricting direct access to some components. It's about **information hiding** and **controlled access**.

## What is Encapsulation?

Encapsulation combines two concepts:

1. **Bundling** - Data and methods together in a class
2. **Hiding** - Restricting direct access to internal details

Think of it like a car: you use the steering wheel, pedals, and buttons (public interface) without knowing the engine's internal workings (private implementation).

## Why Encapsulation Matters

### Without Encapsulation

```python
# ❌ Bad: No encapsulation
class BankAccount:
    def __init__(self, balance):
        self.balance = balance  # Public - anyone can modify

account = BankAccount(1000)
account.balance = -500  # Oops! Direct access allows invalid state
print(account.balance)  # -500
```

### With Encapsulation

```python
# ✅ Good: Encapsulation protects data
class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # Private by convention
    
    def deposit(self, amount):
        """Controlled access with validation."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
    
    def withdraw(self, amount):
        """Controlled access with validation."""
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount
    
    def get_balance(self):
        """Read-only access to balance."""
        return self._balance

account = BankAccount(1000)
account.deposit(500)    # Validated
account.withdraw(200)   # Validated
print(account.get_balance())  # 1300

# Cannot directly set invalid balance
# account._balance = -500  # Possible but violates convention
```

## Access Levels in Python

### Public Attributes

No underscore - accessible from anywhere:

```python
class Person:
    def __init__(self, name):
        self.name = name  # Public

person = Person("Alice")
print(person.name)    # Allowed
person.name = "Bob"   # Allowed
```

### Protected Attributes

Single underscore - "internal use" by convention:

```python
class Person:
    def __init__(self, name):
        self._name = name  # Protected (by convention)

person = Person("Alice")
print(person._name)    # Works but violates convention
# Convention: Should only be accessed by class and subclasses
```

### Private Attributes

Double underscore - name mangled:

```python
class Person:
    def __init__(self, name):
        self.__name = name  # Private (name mangled)
    
    def get_name(self):
        return self.__name

person = Person("Alice")
print(person.get_name())  # "Alice" (via public method)
# print(person.__name)    # AttributeError!

# Still accessible with mangled name (but shouldn't)
print(person._Person__name)  # "Alice" (name mangled to _ClassName__attribute)
```

## Benefits of Encapsulation

### 1. Data Validation

```python
class Product:
    def __init__(self, name, price):
        self._name = name
        self._price = 0
        self.set_price(price)  # Use setter for validation
    
    def set_price(self, price):
        if price < 0:
            raise ValueError("Price cannot be negative")
        self._price = price
    
    def get_price(self):
        return self._price

product = Product("Laptop", 999.99)
# product.set_price(-100)  # ValueError!
```

### 2. Implementation Hiding

```python
class Stack:
    def __init__(self):
        self._items = []  # Internal implementation hidden
    
    def push(self, item):
        """Public interface."""
        self._items.append(item)
    
    def pop(self):
        """Public interface."""
        if not self._items:
            raise IndexError("Stack is empty")
        return self._items.pop()
    
    def is_empty(self):
        """Public interface."""
        return len(self._items) == 0

# Users don't need to know about _items
stack = Stack()
stack.push(1)
stack.push(2)
print(stack.pop())  # 2
```

### 3. Flexibility to Change Implementation

```python
# Version 1: List implementation
class Cache:
    def __init__(self):
        self._data = []  # List
    
    def add(self, item):
        self._data.append(item)
    
    def contains(self, item):
        return item in self._data

# Version 2: Set implementation (better performance)
class Cache:
    def __init__(self):
        self._data = set()  # Changed to set
    
    def add(self, item):
        self._data.add(item)  # Different method
    
    def contains(self, item):
        return item in self._data  # Same interface

# Public interface unchanged - users don't need to update code!
```

### 4. Maintaining Invariants

```python
class Rectangle:
    def __init__(self, width, height):
        self._width = 0
        self._height = 0
        self.set_dimensions(width, height)
    
    def set_dimensions(self, width, height):
        """Ensure width and height are always positive."""
        if width <= 0 or height <= 0:
            raise ValueError("Dimensions must be positive")
        self._width = width
        self._height = height
    
    def get_area(self):
        return self._width * self._height

# Rectangle invariant: dimensions always positive
rect = Rectangle(10, 5)
# rect.set_dimensions(-5, 10)  # ValueError! Invariant protected
```

## Real-World Example: Email System

```python
class Email:
    """Encapsulated email class."""
    
    def __init__(self, sender, recipient, subject, body):
        self._sender = self._validate_email(sender)
        self._recipient = self._validate_email(recipient)
        self._subject = subject
        self._body = body
        self._sent = False
        self._timestamp = None
    
    def _validate_email(self, email):
        """Private method for validation."""
        if "@" not in email or "." not in email:
            raise ValueError(f"Invalid email: {email}")
        return email.lower()
    
    def send(self):
        """Public method to send email."""
        if self._sent:
            raise RuntimeError("Email already sent")
        
        # Sending logic here
        from datetime import datetime
        self._timestamp = datetime.now()
        self._sent = True
        return f"Email sent from {self._sender} to {self._recipient}"
    
    def is_sent(self):
        """Public method to check status."""
        return self._sent
    
    def get_subject(self):
        """Public read-only access."""
        return self._subject
    
    # Prevent direct modification of sent status
    # No set_sent() method provided

# Use the encapsulated class
email = Email("alice@example.com", "bob@example.com", "Hello", "Message here")
print(email.send())
print(email.is_sent())  # True
# email._sent = False  # Violates encapsulation (but possible)
```

## Getter and Setter Pattern

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = 0
        self.set_celsius(celsius)
    
    def get_celsius(self):
        """Getter method."""
        return self._celsius
    
    def set_celsius(self, value):
        """Setter method with validation."""
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = value
    
    def get_fahrenheit(self):
        """Computed getter."""
        return (self._celsius * 9/5) + 32

temp = Temperature(25)
print(temp.get_celsius())     # 25
print(temp.get_fahrenheit())  # 77.0
temp.set_celsius(30)
print(temp.get_celsius())     # 30
```

## Property-Based Access (Pythonic)

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = 0
        self.celsius = celsius  # Uses property setter
    
    @property
    def celsius(self):
        """Get temperature."""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        """Set with validation."""
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """Computed property."""
        return (self._celsius * 9/5) + 32

# Cleaner interface
temp = Temperature(25)
print(temp.celsius)      # 25 (looks like attribute access)
temp.celsius = 30        # Uses setter with validation
print(temp.fahrenheit)   # 86.0
```

## When to Encapsulate

### Encapsulate When:

✅ Data needs validation  
✅ Implementation might change  
✅ You want to control access  
✅ Maintaining invariants is important  
✅ Adding side effects (logging, notifications)  

### Don't Over-Encapsulate:

```python
# ❌ Over-engineering for simple data
class Point:
    def __init__(self, x, y):
        self._x = x
        self._y = y
    
    def get_x(self):
        return self._x
    
    def set_x(self, value):
        self._x = value
    
    # Getters/setters without validation = unnecessary

# ✅ Better for simple data
class Point:
    def __init__(self, x, y):
        self.x = x  # Direct access is fine
        self.y = y
```

## Encapsulation Best Practices

### 1. Start with Public, Add Privacy Later

```python
# Start simple
class User:
    def __init__(self, name):
        self.name = name

# Add encapsulation when needed
class User:
    def __init__(self, name):
        self._name = name
    
    @property
    def name(self):
        return self._name
```

### 2. Use Properties Instead of Getters/Setters

```python
# ✅ Pythonic
@property
def balance(self):
    return self._balance

# ❌ Not Pythonic (but works)
def get_balance(self):
    return self._balance
```

### 3. Document Public Interface

```python
class Cache:
    """Simple cache implementation.
    
    Public Methods:
        add(key, value): Add item to cache
        get(key): Retrieve item from cache
        clear(): Empty the cache
    
    Private:
        _data: Internal storage (do not access directly)
        _validate_key(): Internal validation
    """
    pass
```

### 4. Name Private Methods with Single Underscore

```python
class DataProcessor:
    def process(self, data):
        """Public method."""
        validated = self._validate(data)
        cleaned = self._clean(validated)
        return self._transform(cleaned)
    
    def _validate(self, data):
        """Private helper method."""
        pass
    
    def _clean(self, data):
        """Private helper method."""
        pass
    
    def _transform(self, data):
        """Private helper method."""
        pass
```

## Summary

**Encapsulation** bundles data with methods and hides internal implementation details, exposing only a public interface. Use **single underscore** for protected attributes (convention) and **double underscore** for name-mangled private attributes. Encapsulation enables **data validation**, **implementation hiding**, and **maintaining invariants**. Use **properties** for Pythonic controlled access rather than explicit getter/setter methods. Don't over-encapsulate simple data—add privacy only when needed for validation, flexibility, or maintaining constraints. Good encapsulation makes code more **maintainable, flexible, and robust**.
