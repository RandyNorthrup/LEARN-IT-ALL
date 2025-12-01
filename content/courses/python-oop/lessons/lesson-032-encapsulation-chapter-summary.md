---
id: encapsulation-chapter-summary
title: Chapter 3 Summary - Encapsulation
chapterId: ch3-encapsulation
order: 32
duration: 14
objectives:
  - Review all encapsulation concepts
  - Consolidate learning
  - Connect concepts to real-world practice
---

# Chapter 3 Summary: Encapsulation

**Encapsulation** is about bundling data with methods that operate on that data, and controlling access to protect the internal state. It's the foundation of maintainable, flexible, and reliable object-oriented code.

## Core Concepts Reviewed

### What Is Encapsulation?

**Definition**: Bundling data and methods together while hiding implementation details and controlling access through a public interface.

**Three Key Aspects**:
1. **Bundling** - Data and behavior together in classes
2. **Hiding** - Implementation details marked private
3. **Controlling** - Access through validated public interface

```python
class BankAccount:
    """Encapsulation example."""
    
    def __init__(self, balance):
        self._balance = balance  # Hidden data
    
    def deposit(self, amount):
        """Public interface with validation."""
        if amount <= 0:
            raise ValueError("Must be positive")
        self._balance += amount  # Controlled access
```

### Access Modifiers in Python

| Convention | Usage | Meaning |
|------------|-------|---------|
| `public` | `self.name` | External access allowed |
| `_protected` | `self._name` | Internal/subclass use |
| `__private` | `self.__name` | Class-internal only (name mangling) |

```python
class Example:
    def __init__(self):
        self.public = "Anyone can access"
        self._protected = "Internal use"
        self.__private = "Class-only"
```

### Getters and Setters (Properties)

**Pythonic approach**: Use `@property` decorator for attribute-like access with validation.

```python
class Temperature:
    @property
    def celsius(self):
        """Getter."""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        """Setter with validation."""
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = value
```

**When to use**:
- ✅ Attribute-like access
- ✅ Computed values
- ✅ Validation on assignment
- ❌ Expensive operations
- ❌ Side effects

### Information Hiding

**Principle**: Hide implementation details, expose only necessary interface.

**Benefits**:
- Change implementation without breaking external code
- Reduce complexity for users
- Prevent misuse
- Enable testing and mocking

```python
class Cache:
    def get(self, key):
        """Public - what users need."""
        pass
    
    def set(self, key, value):
        """Public - what users need."""
        pass
    
    def _evict_oldest(self):
        """Private - implementation detail."""
        pass
```

### Immutability

**Immutable objects**: Cannot be modified after creation.

**Benefits**:
- Thread-safe by default
- Hashable (usable in sets/dicts)
- Predictable behavior
- Cacheable/memoizable

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Point:
    """Immutable point."""
    x: float
    y: float
    
    def move(self, dx, dy):
        """Returns NEW point."""
        return Point(self.x + dx, self.y + dy)
```

### Class Invariants

**Invariant**: Condition that must always be true for an object.

**Enforcement**:
- Validate in constructor (`__init__`)
- Validate in setters
- Validate in methods that change state

```python
class Rectangle:
    """Invariant: width > 0 and height > 0"""
    
    def __init__(self, width, height):
        if width <= 0 or height <= 0:
            raise ValueError("Dimensions must be positive")
        self._width = width
        self._height = height
```

### Interface Design

**Good API Design Principles**:
1. **Intuitive** - Users guess correctly
2. **Consistent** - Similar operations work similarly
3. **Minimal** - Expose only what's necessary
4. **Hard to misuse** - Validation prevents errors
5. **Well-documented** - Clear docstrings

```python
class UserService:
    """Consistent, intuitive interface."""
    
    def get_user(self, user_id):
        """Get single user."""
        pass
    
    def get_all_users(self):
        """Get all users."""
        pass
    
    def create_user(self, data):
        """Create new user."""
        pass
```

### Defensive Programming

**Principle**: Assume anything that can go wrong will go wrong.

**Techniques**:
- Validate all inputs (type, range, format)
- Defensive copying of mutable objects
- Boundary checks
- Safe defaults
- Clear error messages

```python
class SafeList:
    def __init__(self, items):
        self._items = list(items)  # Defensive copy
    
    def get(self, index):
        if not 0 <= index < len(self._items):
            raise IndexError("Index out of range")
        return self._items[index]
```

## Key Takeaways

### 1. Encapsulation = Control

Encapsulation gives you **control** over how data is accessed and modified. This control enables:
- **Validation** - Ensure data is always valid
- **Consistency** - Maintain invariants
- **Flexibility** - Change implementation without breaking users
- **Security** - Prevent unauthorized access

### 2. Public Interface vs Private Implementation

```python
class Example:
    # PUBLIC INTERFACE (stable, documented, minimal)
    def do_something(self):
        """What users interact with."""
        pass
    
    # PRIVATE IMPLEMENTATION (hidden, can change freely)
    def _internal_helper(self):
        """Implementation detail."""
        pass
```

### 3. Properties Are Pythonic

Don't write Java-style getters/setters:
```python
# ❌ Not Pythonic
def get_name(self):
    return self._name

def set_name(self, value):
    self._name = value
```

Use properties:
```python
# ✅ Pythonic
@property
def name(self):
    return self._name

@name.setter
def name(self, value):
    if not value:
        raise ValueError("Name required")
    self._name = value
```

### 4. Validate Early, Validate Always

```python
class Product:
    def __init__(self, name, price):
        # Validate in constructor
        if not name:
            raise ValueError("Name required")
        if price < 0:
            raise ValueError("Price must be non-negative")
        
        self._name = name
        self._price = price
    
    @property
    def price(self):
        return self._price
    
    @price.setter
    def price(self, value):
        # Validate in setter
        if value < 0:
            raise ValueError("Price must be non-negative")
        self._price = value
```

### 5. Immutable When Possible

Prefer immutable objects for:
- Value objects (Point, Money, Date)
- Configuration
- Dictionary keys
- Thread-shared data

```python
@dataclass(frozen=True)
class Money:
    amount: Decimal
    currency: str
```

## Common Patterns Summary

### Pattern 1: Read-Only Property

```python
@property
def computed_value(self):
    """Computed on-the-fly, no setter."""
    return self._calculate()
```

### Pattern 2: Validated Property

```python
@property
def age(self):
    return self._age

@age.setter
def age(self, value):
    if not 0 <= value <= 150:
        raise ValueError("Invalid age")
    self._age = value
```

### Pattern 3: Defensive Copy

```python
def __init__(self, items):
    self._items = list(items)  # Copy

def get_items(self):
    return self._items.copy()  # Copy
```

### Pattern 4: Guard Clauses

```python
def process(self, data):
    if not data:
        raise ValueError("Data required")
    if not self._is_valid(data):
        raise ValueError("Invalid data")
    
    # Main logic
    return self._do_process(data)
```

## Real-World Application

Encapsulation is used everywhere in production code:

**Web Frameworks**:
```python
class Request:
    """Encapsulates HTTP request."""
    @property
    def json(self):
        """Parsed JSON (computed)."""
        return self._parse_json()
```

**Database ORMs**:
```python
class User(Model):
    """Encapsulates database row."""
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
```

**APIs and SDKs**:
```python
class APIClient:
    """Hides HTTP complexity."""
    def get_user(self, user_id):
        """Simple interface, complex implementation."""
        return self._make_request("GET", f"/users/{user_id}")
```

## Practice Checklist

When designing a new class:

- [ ] Identify what data the class manages
- [ ] Bundle related behavior with that data
- [ ] Mark implementation details as private (`_prefix`)
- [ ] Design minimal public interface
- [ ] Add validation in constructor and setters
- [ ] Use properties for attribute-like access
- [ ] Document public interface thoroughly
- [ ] Use immutable objects when appropriate
- [ ] Validate inputs, maintain invariants
- [ ] Think: Can someone misuse this API?

## What's Next?

With **encapsulation** mastered, you can:
- Build classes that hide complexity
- Design clean, intuitive APIs
- Maintain object consistency
- Write defensive, robust code

**Next chapter**: **Abstraction** - defining contracts and interfaces that multiple classes can implement, enabling polymorphism and flexible design.

## Chapter 3 Concepts Map

```
Encapsulation
├── Bundling (data + behavior)
├── Hiding (implementation details)
└── Controlling (access through interface)
    ├── Access Modifiers (public/_protected/__private)
    ├── Properties (getters/setters)
    ├── Information Hiding (public vs private)
    ├── Immutability (frozen objects)
    ├── Validation (invariants)
    ├── Interface Design (API usability)
    ├── Defensive Programming (fail-safe)
    └── Best Practices (real-world patterns)
```

## Summary

**Encapsulation** bundles data with methods, hides implementation, and controls access. Use **properties** for Pythonic getters/setters with validation. Hide implementation details (mark with `_`) and expose minimal, intuitive public interface. Maintain **class invariants** through validation in constructors, setters, and methods. Use **immutable objects** for value types. Practice **defensive programming**—validate inputs, use defensive copies, and fail fast with clear errors. Design interfaces that are **intuitive**, **consistent**, and **hard to misuse**. Encapsulation creates **maintainable**, **flexible**, and **reliable** code by controlling how objects are used and preventing invalid states. Master encapsulation, and you master the foundation of professional object-oriented programming.
