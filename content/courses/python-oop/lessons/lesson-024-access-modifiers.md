---
id: access-modifiers
title: Access Modifiers in Python
chapterId: ch3-encapsulation
order: 24
duration: 14
objectives:
  - Master Python's access control conventions
  - Understand name mangling
  - Learn when to use each access level
---

# Access Modifiers in Python

Python uses **naming conventions** rather than strict access modifiers like other languages. Understanding these conventions is essential for proper encapsulation.

## Three Access Levels

### 1. Public (No Underscore)

Intended for use by anyone:

```python
class Car:
    def __init__(self, make, model):
        self.make = make    # Public
        self.model = model  # Public
    
    def start(self):  # Public method
        return "Car started"

car = Car("Toyota", "Camry")
print(car.make)    # "Toyota" - public access
print(car.start()) # "Car started"
```

### 2. Protected (Single Underscore)

Intended for internal use and subclasses:

```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # Protected (convention)
    
    def _calculate_interest(self):  # Protected method
        return self._balance * 0.02

account = BankAccount(1000)
# Can access but shouldn't (violates convention)
print(account._balance)  # Works but discouraged
```

### 3. Private (Double Underscore)

Name-mangled to prevent accidental access:

```python
class Secret:
    def __init__(self):
        self.__password = "secret123"  # Private (name mangled)
    
    def __validate(self):  # Private method
        return len(self.__password) > 8

secret = Secret()
# print(secret.__password)  # AttributeError!
# Mangled to: _Secret__password
print(secret._Secret__password)  # "secret123" (but don't do this!)
```

## Name Mangling Explained

```python
class Example:
    def __init__(self):
        self.public = "everyone can see"
        self._protected = "internal use"
        self.__private = "name mangled"

obj = Example()
print(obj.public)      # Works
print(obj._protected)  # Works (but discouraged)
# print(obj.__private) # AttributeError!

# Python mangles __private to _ClassName__private
print(obj._Example__private)  # Works but violates intent
```

## When to Use Each Level

### Use Public For:

```python
class Product:
    def __init__(self, name, price):
        self.name = name    # Public - users need this
        self.price = price  # Public - users need this
    
    def get_total(self, quantity):  # Public - part of API
        return self.price * quantity
```

### Use Protected For:

```python
class Vehicle:
    def __init__(self, speed):
        self._speed = speed  # Protected - for internal use
    
    def _check_speed_limit(self):  # Protected - helper method
        return self._speed <= 65

class Car(Vehicle):
    def drive(self):
        # Subclass can access protected members
        if self._check_speed_limit():
            return "Driving safely"
        return "Slow down!"
```

### Use Private For:

```python
class CreditCard:
    def __init__(self, number, cvv):
        self.__number = number  # Private - sensitive data
        self.__cvv = cvv        # Private - sensitive data
    
    def __encrypt(self):  # Private - internal implementation
        # Encryption logic
        pass
    
    def get_masked_number(self):  # Public - safe access
        return f"****-****-****-{self.__number[-4:]}"

card = CreditCard("1234567890123456", "123")
print(card.get_masked_number())  # "****-****-****-3456"
# Cannot access __number directly
```

## Practical Examples

### Example 1: User Authentication

```python
class User:
    def __init__(self, username, password):
        self.username = username           # Public
        self._is_active = True            # Protected
        self.__password_hash = self.__hash_password(password)  # Private
    
    def __hash_password(self, password):  # Private
        """Internal hashing logic."""
        return f"hashed_{password}"
    
    def check_password(self, password):   # Public
        """Public method to verify password."""
        return self.__hash_password(password) == self.__password_hash
    
    def _log_access(self):  # Protected
        """Internal logging."""
        print(f"User {self.username} accessed")

user = User("alice", "secret123")
print(user.username)              # Public access
print(user.check_password("secret123"))  # True
# Cannot access __password_hash directly
```

### Example 2: Database Connection

```python
class Database:
    def __init__(self, host, port):
        self.host = host              # Public
        self.port = port              # Public
        self._connection = None       # Protected
        self.__credentials = None     # Private
    
    def __authenticate(self):  # Private
        """Internal authentication."""
        pass
    
    def _create_connection(self):  # Protected
        """Internal connection logic."""
        self.__authenticate()
        self._connection = f"Connected to {self.host}:{self.port}"
    
    def connect(self):  # Public
        """Public API to connect."""
        self._create_connection()
        return self._connection

db = Database("localhost", 5432)
print(db.connect())  # Public method
```

### Example 3: Configuration Manager

```python
class Config:
    def __init__(self):
        self._settings = {}           # Protected
        self.__api_key = "secret"     # Private
    
    def set(self, key, value):  # Public
        """Public method to set config."""
        self._settings[key] = value
    
    def get(self, key):  # Public
        """Public method to get config."""
        return self._settings.get(key)
    
    def _validate(self, key):  # Protected
        """Internal validation."""
        return key in self._settings
    
    def __get_api_key(self):  # Private
        """Private method for API key."""
        return self.__api_key

config = Config()
config.set("debug", True)
print(config.get("debug"))  # True
```

## Inheritance and Access Levels

```python
class Parent:
    def __init__(self):
        self.public_var = "public"
        self._protected_var = "protected"
        self.__private_var = "private"
    
    def public_method(self):
        return "Public method"
    
    def _protected_method(self):
        return "Protected method"
    
    def __private_method(self):
        return "Private method"

class Child(Parent):
    def test_access(self):
        print(self.public_var)      # Works
        print(self._protected_var)  # Works
        # print(self.__private_var) # AttributeError!
        
        print(self.public_method())     # Works
        print(self._protected_method()) # Works
        # print(self.__private_method()) # AttributeError!

child = Child()
child.test_access()
```

## Common Patterns

### Pattern 1: Public Interface, Private Implementation

```python
class Stack:
    def __init__(self):
        self.__items = []  # Private implementation
    
    def push(self, item):  # Public interface
        self.__items.append(item)
    
    def pop(self):  # Public interface
        if not self.__items:
            raise IndexError("Stack is empty")
        return self.__items.pop()
    
    def __len__(self):  # Special method
        return len(self.__items)
```

### Pattern 2: Protected Helpers

```python
class DataProcessor:
    def process(self, data):  # Public
        validated = self._validate(data)
        cleaned = self._clean(validated)
        return self._transform(cleaned)
    
    def _validate(self, data):  # Protected helper
        if not data:
            raise ValueError("Empty data")
        return data
    
    def _clean(self, data):  # Protected helper
        return [x.strip() for x in data]
    
    def _transform(self, data):  # Protected helper
        return [x.upper() for x in data]
```

### Pattern 3: Private State Management

```python
class Counter:
    def __init__(self):
        self.__count = 0  # Private state
    
    def increment(self):  # Public
        self.__count += 1
    
    def decrement(self):  # Public
        if self.__count > 0:
            self.__count -= 1
    
    def get_count(self):  # Public
        return self.__count
    
    # No direct access to __count
```

## Property Access

```python
class Temperature:
    def __init__(self, celsius):
        self.__celsius = celsius  # Private
    
    @property
    def celsius(self):  # Public getter
        return self.__celsius
    
    @celsius.setter
    def celsius(self, value):  # Public setter
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self.__celsius = value

temp = Temperature(25)
print(temp.celsius)  # Public access via property
temp.celsius = 30    # Public modification via property
```

## Best Practices

### 1. Use Single Underscore by Default

```python
# ✅ Good - single underscore for internal use
class MyClass:
    def __init__(self):
        self._internal_data = []
```

### 2. Use Double Underscore Sparingly

```python
# ✅ Use for truly private data
class PasswordManager:
    def __init__(self, password):
        self.__password_hash = hash(password)

# ❌ Avoid over-using
class Point:
    def __init__(self, x, y):
        self.__x = x  # Unnecessary - just use _x
        self.__y = y
```

### 3. Document Access Levels

```python
class MyClass:
    """Example class.
    
    Public Attributes:
        name: User-visible name
    
    Protected Attributes:
        _cache: Internal cache (do not use directly)
    
    Private Attributes:
        __secret: Sensitive data (name mangled)
    """
    pass
```

### 4. Respect Conventions

```python
# ✅ Respect single underscore convention
class MyClass:
    def __init__(self):
        self._internal = "internal"

# Don't access from outside
obj = MyClass()
# print(obj._internal)  # Works but discouraged
```

## Summary

Python uses **naming conventions** for access control: no underscore for **public**, single underscore for **protected** (convention), and double underscore for **private** (name-mangled). Use **public** for the intended API, **protected** for internal implementation that subclasses might use, and **private** for truly sensitive data. Python's approach trusts developers to respect conventions rather than enforcing strict access control. Always **document access levels** and follow the principle that "we're all consenting adults"—conventions guide good design, but nothing is truly private. Use **properties** to provide controlled public access to private data.
