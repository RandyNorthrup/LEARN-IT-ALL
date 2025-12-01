---
id: dataclasses
title: Python Dataclasses
chapterId: ch2-classes-objects
order: 20
duration: 16
objectives:
  - Understand Python dataclasses
  - Learn when to use dataclasses vs regular classes
  - Master dataclass features and decorators
---

# Python Dataclasses

**Dataclasses** (Python 3.7+) automatically generate special methods for classes that primarily store data, reducing boilerplate code.

## Why Dataclasses?

### Without Dataclasses

```python
# ❌ Lots of boilerplate
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"
    
    def __eq__(self, other):
        if not isinstance(other, Point):
            return False
        return self.x == other.x and self.y == other.y
    
    def __hash__(self):
        return hash((self.x, self.y))
```

### With Dataclasses

```python
# ✅ Clean and concise
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

# Auto-generates __init__, __repr__, __eq__, and more!
point = Point(10, 20)
print(point)  # Point(x=10, y=20)
print(point == Point(10, 20))  # True
```

## Basic Dataclass

```python
from dataclasses import dataclass

@dataclass
class Product:
    name: str
    price: float
    quantity: int

# Create instance
laptop = Product("Laptop", 999.99, 10)
print(laptop)  # Product(name='Laptop', price=999.99, quantity=10)

# Equality works
laptop2 = Product("Laptop", 999.99, 10)
print(laptop == laptop2)  # True

# Access attributes normally
print(laptop.name)    # "Laptop"
laptop.price = 899.99  # Can modify
```

## Default Values

```python
from dataclasses import dataclass
from typing import List

@dataclass
class User:
    username: str
    email: str
    is_active: bool = True  # Default value
    login_count: int = 0    # Default value

# Use defaults
user1 = User("alice", "alice@example.com")
print(user1.is_active)  # True

# Override defaults
user2 = User("bob", "bob@example.com", is_active=False, login_count=5)
print(user2.login_count)  # 5
```

## Mutable Default Values

```python
from dataclasses import dataclass, field
from typing import List

# ❌ WRONG - Mutable default
# @dataclass
# class Team:
#     name: str
#     members: List[str] = []  # ERROR! Mutable default

# ✅ CORRECT - Use field with default_factory
@dataclass
class Team:
    name: str
    members: List[str] = field(default_factory=list)

team1 = Team("A")
team2 = Team("B")

team1.members.append("Alice")
print(team1.members)  # ['Alice']
print(team2.members)  # [] - separate lists!
```

## Dataclass Parameters

```python
from dataclasses import dataclass

# frozen=True makes instances immutable
@dataclass(frozen=True)
class ImmutablePoint:
    x: float
    y: float

point = ImmutablePoint(10, 20)
# point.x = 30  # Error! FrozenInstanceError

# order=True adds comparison methods
@dataclass(order=True)
class Version:
    major: int
    minor: int
    patch: int

v1 = Version(1, 0, 0)
v2 = Version(1, 2, 0)
v3 = Version(2, 0, 0)

print(v1 < v2)  # True
print(v3 > v1)  # True

versions = [v3, v1, v2]
versions.sort()
print(versions)  # [Version(1,0,0), Version(1,2,0), Version(2,0,0)]
```

## Field Options

```python
from dataclasses import dataclass, field

@dataclass
class Product:
    name: str
    price: float
    
    # Exclude from __init__
    id: str = field(init=False, default="")
    
    # Exclude from __repr__
    internal_code: str = field(repr=False, default="")
    
    # Exclude from comparison
    views: int = field(compare=False, default=0)
    
    # Make immutable after init
    category: str = field(default="General")
    
    def __post_init__(self):
        # Set computed fields after __init__
        self.id = f"{self.name[:3].upper()}{int(self.price)}"

product = Product("Laptop", 999.99)
print(product.id)  # "LAP999"
```

## Post-Initialization Processing

```python
from dataclasses import dataclass
import datetime

@dataclass
class Order:
    order_id: str
    amount: float
    created_at: datetime.datetime = None
    
    def __post_init__(self):
        """Called after __init__."""
        if self.created_at is None:
            self.created_at = datetime.datetime.now()
        
        # Validation
        if self.amount < 0:
            raise ValueError("Amount cannot be negative")

order = Order("ORD123", 99.99)
print(order.created_at)  # Current timestamp
```

## Inheritance with Dataclasses

```python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int

@dataclass
class Employee(Person):
    employee_id: str
    salary: float

# All fields from parent included
emp = Employee("Alice", 30, "E123", 75000)
print(emp)
# Employee(name='Alice', age=30, employee_id='E123', salary=75000)
```

## Converting to Dictionary

```python
from dataclasses import dataclass, asdict, astuple

@dataclass
class Book:
    title: str
    author: str
    year: int
    price: float

book = Book("1984", "George Orwell", 1949, 15.99)

# Convert to dict
book_dict = asdict(book)
print(book_dict)
# {'title': '1984', 'author': 'George Orwell', 'year': 1949, 'price': 15.99}

# Convert to tuple
book_tuple = astuple(book)
print(book_tuple)
# ('1984', 'George Orwell', 1949, 15.99)
```

## Dataclasses vs Regular Classes

### Use Dataclasses When:

```python
# ✅ Primarily storing data
@dataclass
class Customer:
    id: int
    name: str
    email: str

# ✅ Need auto-generated methods
@dataclass
class Point:
    x: float
    y: float

# ✅ Simple value objects
@dataclass(frozen=True)
class Color:
    red: int
    green: int
    blue: int
```

### Use Regular Classes When:

```python
# ✅ Complex behavior and logic
class BankAccount:
    def __init__(self, account_number, balance):
        self._account_number = account_number
        self._balance = balance
        self._transaction_history = []
    
    def deposit(self, amount):
        # Complex business logic
        self._validate_amount(amount)
        self._balance += amount
        self._record_transaction("deposit", amount)
    
    def withdraw(self, amount):
        # Complex business logic
        pass

# ✅ Need private attributes with properties
class User:
    def __init__(self, password):
        self._password_hash = self._hash_password(password)
    
    @property
    def password(self):
        raise AttributeError("Password is write-only")
    
    @password.setter
    def password(self, value):
        self._password_hash = self._hash_password(value)
```

## Advanced Example

```python
from dataclasses import dataclass, field
from typing import List, Optional
from datetime import datetime

@dataclass
class OrderItem:
    product_id: str
    quantity: int
    price: float
    
    def get_total(self) -> float:
        return self.quantity * self.price

@dataclass
class Order:
    order_id: str
    customer_id: str
    items: List[OrderItem] = field(default_factory=list)
    status: str = "pending"
    created_at: datetime = field(default_factory=datetime.now)
    notes: Optional[str] = None
    
    def add_item(self, product_id: str, quantity: int, price: float):
        item = OrderItem(product_id, quantity, price)
        self.items.append(item)
    
    def get_total(self) -> float:
        return sum(item.get_total() for item in self.items)
    
    def __post_init__(self):
        if not self.order_id:
            raise ValueError("Order ID is required")

# Use the dataclass
order = Order("ORD001", "CUST123")
order.add_item("PROD1", 2, 50.00)
order.add_item("PROD2", 1, 75.00)

print(f"Order total: ${order.get_total()}")  # Order total: $175.0
print(order)
```

## Frozen Dataclasses (Immutable)

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Config:
    host: str
    port: int
    ssl: bool

config = Config("localhost", 8080, True)
print(config.host)  # "localhost"

# config.host = "example.com"  # Error! FrozenInstanceError

# Useful as dictionary keys
configs = {
    config: "Production",
    Config("localhost", 3000, False): "Development"
}
```

## Dataclass with Validation

```python
from dataclasses import dataclass

@dataclass
class Email:
    address: str
    
    def __post_init__(self):
        if "@" not in self.address:
            raise ValueError("Invalid email address")
        if "." not in self.address.split("@")[1]:
            raise ValueError("Invalid email domain")

# Valid email
email = Email("user@example.com")

# Invalid email raises ValueError
# email = Email("invalid-email")  # ValueError!
```

## Dataclasses with Type Hints

```python
from dataclasses import dataclass
from typing import List, Optional, Dict
from datetime import date

@dataclass
class Student:
    student_id: str
    name: str
    age: int
    grades: Dict[str, float] = field(default_factory=dict)
    courses: List[str] = field(default_factory=list)
    graduation_date: Optional[date] = None
    
    def add_grade(self, course: str, grade: float):
        self.grades[course] = grade
        if course not in self.courses:
            self.courses.append(course)

student = Student("S001", "Alice", 20)
student.add_grade("Math", 95.0)
student.add_grade("Physics", 88.5)

print(student.grades)  # {'Math': 95.0, 'Physics': 88.5}
```

## Performance Considerations

```python
# Dataclasses have minimal overhead
# They generate code at class definition time, not runtime

import timeit

# Regular class
class RegularPoint:
    def __init__(self, x, y):
        self.x = x
        self.y = y

# Dataclass
from dataclasses import dataclass

@dataclass
class DataPoint:
    x: float
    y: float

# Similar performance for object creation
# print(timeit.timeit('RegularPoint(1, 2)', globals=globals(), number=1000000))
# print(timeit.timeit('DataPoint(1, 2)', globals=globals(), number=1000000))
```

## Best Practices

### 1. Use Type Hints

```python
# ✅ Good
@dataclass
class User:
    name: str
    age: int

# ❌ Bad
@dataclass
class User:
    name: ...
    age: ...
```

### 2. Use frozen for Value Objects

```python
# ✅ Good - immutable value objects
@dataclass(frozen=True)
class Money:
    amount: float
    currency: str
```

### 3. Use field() for Mutable Defaults

```python
# ✅ Correct
@dataclass
class Cart:
    items: List[str] = field(default_factory=list)

# ❌ Wrong
# @dataclass
# class Cart:
#     items: List[str] = []  # ERROR!
```

## Summary

**Dataclasses** automatically generate `__init__`, `__repr__`, `__eq__`, and other methods, eliminating boilerplate for data-focused classes. Use **`field(default_factory=...)`** for mutable default values like lists and dictionaries. Set **`frozen=True`** to create immutable instances, and **`order=True`** to add comparison operators. Implement **`__post_init__`** for validation or computed fields. Dataclasses work best for simple data containers—use regular classes when you need complex behavior, private attributes with properties, or sophisticated initialization logic. Always include **type hints** to enable better tooling and documentation.
