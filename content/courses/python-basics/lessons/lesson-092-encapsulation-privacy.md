---
id: "107-encapsulation-privacy"
title: "Encapsulation and Variable Privacy"
chapterId: ch7-scope
order: 11
duration: 25
objectives:
  - Understand encapsulation in Python
  - Learn naming conventions for privacy
  - Master name mangling
  - Implement property-based access control
---

# Encapsulation and Variable Privacy

Python doesn't have true private variables, but it provides conventions and mechanisms for controlling access to class internals.

## Python's Privacy Philosophy

```python
# Python's approach: "We're all consenting adults here"
# No enforced privacy, but conventions indicate intent

class BankAccount:
    def __init__(self, balance):
        self.balance = balance  # Public - anyone can access
        self._internal_id = 123  # Protected - internal use suggested
        self.__secret_key = "key"  # Private - name mangled

account = BankAccount(1000)

# Public access - encouraged
print(account.balance)  # 1000

# Protected access - discouraged but possible
print(account._internal_id)  # 123 - works but shows you know it's internal

# Private access - harder but still possible
# print(account.__secret_key)  # AttributeError
print(account._BankAccount__secret_key)  # "key" - name mangling
```

## Naming Conventions

```python
class Example:
    def __init__(self):
        # PUBLIC - No prefix
        self.public_var = "Anyone can use"
        
        # PROTECTED - Single underscore
        self._protected_var = "Internal use, but accessible"
        
        # PRIVATE - Double underscore (name mangled)
        self.__private_var = "Harder to access from outside"
        
        # SPECIAL - Double underscores both sides
        self.__special__ = "Python special methods"
    
    # Public method
    def public_method(self):
        """Public API method."""
        return "Public"
    
    # Protected method
    def _protected_method(self):
        """Internal helper method."""
        return "Protected"
    
    # Private method  
    def __private_method(self):
        """Very internal method."""
        return "Private"

obj = Example()

# Public access
print(obj.public_var)
print(obj.public_method())

# Protected access (works, but shows you're breaking convention)
print(obj._protected_var)
print(obj._protected_method())

# Private access (name mangled)
# print(obj.__private_var)  # AttributeError
print(obj._Example__private_var)  # Works with mangled name
```

## Name Mangling Explained

```python
class MyClass:
    def __init__(self):
        self.__private = "Private value"
    
    def show_private(self):
        """Access private from within class."""
        return self.__private  # Works normally inside class

obj = MyClass()

# Python transforms __private to _MyClass__private
print(obj._MyClass__private)  # "Private value"

# See all attributes
print([attr for attr in dir(obj) if not attr.startswith('__')])
# ['_MyClass__private', 'show_private']

# Name mangling prevents accidental overrides
class Parent:
    def __init__(self):
        self.__private = "Parent private"
    
    def get_private(self):
        return self.__private

class Child(Parent):
    def __init__(self):
        super().__init__()
        self.__private = "Child private"  # Different variable!
    
    def show_both(self):
        # Child's private
        print(f"Child: {self.__private}")
        # Parent's private (via name mangling)
        print(f"Parent: {self._Parent__private}")

child = Child()
child.show_both()
# Child: Child private
# Parent: Parent private
```

## Property-Based Encapsulation

```python
# ✅ GOOD - Use properties for controlled access
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius  # Protected storage
    
    @property
    def celsius(self):
        """Get temperature in Celsius."""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        """Set temperature with validation."""
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """Get temperature in Fahrenheit."""
        return self._celsius * 9/5 + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        """Set temperature using Fahrenheit."""
        if value < -459.67:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = (value - 32) * 5/9

# Use like attributes, but with validation
temp = Temperature(25)
print(temp.celsius)  # 25
print(temp.fahrenheit)  # 77.0

temp.celsius = 30  # Validated
print(temp.celsius)  # 30

# temp.celsius = -300  # ValueError: below absolute zero

# Can set via Fahrenheit
temp.fahrenheit = 32
print(temp.celsius)  # 0.0
```

## Read-Only Properties

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        """Get radius (read-only)."""
        return self._radius
    
    @property
    def diameter(self):
        """Calculated property (read-only)."""
        return self._radius * 2
    
    @property
    def area(self):
        """Calculated property (read-only)."""
        import math
        return math.pi * self._radius ** 2
    
    @property
    def circumference(self):
        """Calculated property (read-only)."""
        import math
        return 2 * math.pi * self._radius

circle = Circle(5)
print(circle.radius)  # 5
print(circle.diameter)  # 10
print(circle.area)  # 78.54

# Can't set read-only properties
# circle.diameter = 20  # AttributeError: can't set attribute
# circle.area = 100     # AttributeError: can't set attribute
```

## Private Data with Properties

```python
class BankAccount:
    """Bank account with encapsulated balance."""
    
    def __init__(self, initial_balance):
        self.__balance = initial_balance  # Private
        self.__transactions = []  # Private
    
    @property
    def balance(self):
        """Get current balance (read-only)."""
        return self.__balance
    
    def deposit(self, amount):
        """Deposit money."""
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        
        self.__balance += amount
        self.__transactions.append(('deposit', amount))
    
    def withdraw(self, amount):
        """Withdraw money."""
        if amount <= 0:
            raise ValueError("Withdrawal must be positive")
        if amount > self.__balance:
            raise ValueError("Insufficient funds")
        
        self.__balance -= amount
        self.__transactions.append(('withdrawal', amount))
    
    @property
    def transaction_count(self):
        """Get number of transactions (read-only)."""
        return len(self.__transactions)
    
    def get_statement(self):
        """Get transaction history."""
        return self.__transactions.copy()  # Return copy, not original

# Usage
account = BankAccount(1000)

# Can read balance
print(account.balance)  # 1000

# Can't set balance directly
# account.balance = 5000  # AttributeError

# Must use methods
account.deposit(500)
account.withdraw(200)
print(account.balance)  # 1300

# Can access transaction count
print(account.transaction_count)  # 2

# Get statement (copy of data)
statement = account.get_statement()
print(statement)
# [('deposit', 500), ('withdrawal', 200)]
```

## Getters and Setters Pattern

```python
class Person:
    """Person with validated attributes."""
    
    def __init__(self, name, age):
        self._name = None
        self._age = None
        
        # Use setters for validation
        self.set_name(name)
        self.set_age(age)
    
    def get_name(self):
        """Get person's name."""
        return self._name
    
    def set_name(self, name):
        """Set name with validation."""
        if not name or not isinstance(name, str):
            raise ValueError("Name must be non-empty string")
        self._name = name.strip()
    
    def get_age(self):
        """Get person's age."""
        return self._age
    
    def set_age(self, age):
        """Set age with validation."""
        if not isinstance(age, int) or age < 0:
            raise ValueError("Age must be non-negative integer")
        if age > 150:
            raise ValueError("Age seems unrealistic")
        self._age = age

# Better: Use properties instead
class PersonBetter:
    """Person with properties (more Pythonic)."""
    
    def __init__(self, name, age):
        self.name = name  # Uses property setter
        self.age = age    # Uses property setter
    
    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self, value):
        if not value or not isinstance(value, str):
            raise ValueError("Name must be non-empty string")
        self._name = value.strip()
    
    @property
    def age(self):
        return self._age
    
    @age.setter
    def age(self, value):
        if not isinstance(value, int) or value < 0:
            raise ValueError("Age must be non-negative integer")
        if value > 150:
            raise ValueError("Age seems unrealistic")
        self._age = value

# Clean usage
person = PersonBetter("Alice", 30)
print(person.name)  # Alice
print(person.age)   # 30

person.name = "Bob"
person.age = 25
# person.age = -5  # ValueError
```

## Immutable Objects

```python
class ImmutablePoint:
    """Point that can't be changed after creation."""
    
    def __init__(self, x, y):
        self._x = x
        self._y = y
    
    @property
    def x(self):
        """Get x coordinate (read-only)."""
        return self._x
    
    @property
    def y(self):
        """Get y coordinate (read-only)."""
        return self._y
    
    def __repr__(self):
        return f"Point({self._x}, {self._y})"

point = ImmutablePoint(3, 4)
print(point.x)  # 3
print(point.y)  # 4

# Can't modify
# point.x = 10  # AttributeError: can't set attribute

# Using __slots__ for true immutability
class TrulyImmutablePoint:
    """Point using __slots__ for efficiency and immutability."""
    __slots__ = ('_x', '_y')
    
    def __init__(self, x, y):
        object.__setattr__(self, '_x', x)
        object.__setattr__(self, '_y', y)
    
    @property
    def x(self):
        return self._x
    
    @property
    def y(self):
        return self._y
    
    def __setattr__(self, name, value):
        raise AttributeError("Point is immutable")
    
    def __repr__(self):
        return f"Point({self._x}, {self._y})"

point = TrulyImmutablePoint(5, 6)
print(point.x)  # 5
# point.x = 10  # AttributeError: Point is immutable
# point.z = 7   # AttributeError: Point is immutable
```

## Module-Level Privacy

```python
# mymodule.py

# Public constant
PUBLIC_CONSTANT = 100

# Protected (by convention)
_internal_helper = "Internal use"

# Private function
def _private_function():
    """Not intended for external use."""
    return "Private"

# Public function
def public_function():
    """Public API."""
    result = _private_function()  # Can use private internally
    return f"Public result: {result}"

# Control what gets exported
__all__ = ['PUBLIC_CONSTANT', 'public_function']

# When someone does: from mymodule import *
# Only PUBLIC_CONSTANT and public_function are imported
# _internal_helper and _private_function are not imported
```

## Best Practices

```python
# ✅ GOOD - Use single underscore for internal stuff
class GoodClass:
    def __init__(self):
        self._internal_state = {}  # Internal, but accessible if needed
    
    def _helper_method(self):
        """Internal helper."""
        pass
    
    def public_method(self):
        """Public API."""
        self._helper_method()

# ✅ GOOD - Use properties for computed values
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    @property
    def area(self):
        """Computed property."""
        return self.width * self.height
    
    @property
    def perimeter(self):
        """Computed property."""
        return 2 * (self.width + self.height)

# ✅ GOOD - Use double underscore to prevent name conflicts
class Parent:
    def __init__(self):
        self.__implementation = "Parent version"

class Child(Parent):
    def __init__(self):
        super().__init__()
        self.__implementation = "Child version"  # Won't conflict

# ❌ BAD - Don't use double underscore for simple hiding
class BadClass:
    def __init__(self):
        self.__value = 10  # Overkill, use _value instead

# ❌ BAD - Don't access name-mangled attributes
obj = BadClass()
# Don't do this:
print(obj._BadClass__value)  # Breaks encapsulation
```

## Summary

**Privacy Levels:**

1. **Public** (`name`): Normal use, part of API
2. **Protected** (`_name`): Internal use suggested
3. **Private** (`__name`): Name mangled, prevents conflicts

**Name Mangling:**
```python
class MyClass:
    def __init__(self):
        self.__private = "value"
        # Becomes: self._MyClass__private
```

**Properties Pattern:**
```python
class Example:
    @property
    def value(self):
        return self._value
    
    @value.setter
    def value(self, val):
        self._value = val
```

**Best Practices:**
- ✅ Use `_` prefix for internal attributes
- ✅ Use properties for validation and computed values
- ✅ Use `__all__` to control module exports
- ✅ Document what's public vs internal
- ✅ Return copies of mutable internal data
- ❌ Don't use `__` unless preventing name conflicts
- ❌ Don't access name-mangled attributes
- ❌ Don't rely on naming alone for security

**Key Principle:**
> "We're all consenting adults here" - Python trusts programmers to respect conventions rather than enforcing strict privacy.

Encapsulation in Python is about intent and convention, not enforcement!
