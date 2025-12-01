---
id: immutability
title: Immutability and Immutable Objects
chapterId: ch3-encapsulation
order: 27
duration: 16
objectives:
  - Understand immutability concepts
  - Learn when and how to create immutable objects
  - Master frozen dataclasses and namedtuples
---

# Immutability and Immutable Objects

An **immutable object** cannot be modified after creation. Immutability provides **thread safety**, **simplicity**, and **predictability**—you know the object's state will never change unexpectedly.

## Mutable vs Immutable

```python
# Mutable - can be changed
my_list = [1, 2, 3]
my_list.append(4)     # Changed!
my_list[0] = 99       # Changed!

# Immutable - cannot be changed
my_tuple = (1, 2, 3)
# my_tuple.append(4)  # AttributeError!
# my_tuple[0] = 99    # TypeError!
```

## Built-in Immutable Types

```python
# Immutable types in Python
x = 42              # int (immutable)
y = 3.14            # float (immutable)
s = "hello"         # str (immutable)
t = (1, 2, 3)       # tuple (immutable)
f = frozenset([1])  # frozenset (immutable)

# Operations create NEW objects
s2 = s.upper()      # Creates new string
t2 = t + (4,)       # Creates new tuple
```

## Creating Immutable Classes (Basic)

```python
# ✅ Immutable class with properties
class Point:
    def __init__(self, x, y):
        self._x = x
        self._y = y
    
    @property
    def x(self):
        """Read-only x coordinate."""
        return self._x
    
    @property
    def y(self):
        """Read-only y coordinate."""
        return self._y
    
    def move(self, dx, dy):
        """Returns NEW point (doesn't modify this one)."""
        return Point(self._x + dx, self._y + dy)

point1 = Point(10, 20)
print(point1.x)  # 10

# point1.x = 5  # AttributeError! Read-only

point2 = point1.move(5, 5)  # Creates new point
print(point2.x)  # 15
print(point1.x)  # 10 (unchanged!)
```

## Immutable Classes with __slots__

```python
# ✅ Immutable with __slots__ (prevents attribute addition)
class ImmutablePerson:
    __slots__ = ('_name', '_age')
    
    def __init__(self, name, age):
        object.__setattr__(self, '_name', name)
        object.__setattr__(self, '_age', age)
    
    @property
    def name(self):
        return self._name
    
    @property
    def age(self):
        return self._age
    
    def __setattr__(self, name, value):
        """Prevent any attribute modification."""
        raise AttributeError("Cannot modify immutable object")

person = ImmutablePerson("Alice", 30)
print(person.name)  # "Alice"

# person.age = 31      # AttributeError!
# person.city = "NYC"  # AttributeError!
```

## Frozen Dataclasses (Python 3.7+)

```python
from dataclasses import dataclass

# ✅ Frozen dataclass - easiest way to create immutable class
@dataclass(frozen=True)
class Point:
    x: float
    y: float
    
    def move(self, dx, dy):
        """Returns new Point."""
        return Point(self.x + dx, self.y + dy)
    
    def distance_to(self, other):
        """Calculate distance (doesn't modify)."""
        return ((self.x - other.x)**2 + (self.y - other.y)**2)**0.5

point1 = Point(10, 20)
print(point1.x)  # 10

# point1.x = 5  # FrozenInstanceError!

point2 = point1.move(5, 5)
print(point2.x)  # 15
```

## Namedtuples (Immutable Alternative)

```python
from collections import namedtuple

# ✅ Namedtuple - lightweight immutable class
Point = namedtuple('Point', ['x', 'y'])

point1 = Point(10, 20)
print(point1.x)  # 10
print(point1[0])  # 10 (also supports indexing)

# point1.x = 5  # AttributeError!

# Create new point
point2 = point1._replace(x=15)
print(point2.x)  # 15
print(point1.x)  # 10 (unchanged)
```

## Benefits of Immutability

### 1. Thread Safety

```python
# ✅ Immutable objects are thread-safe by default
from dataclasses import dataclass
from threading import Thread

@dataclass(frozen=True)
class Config:
    host: str
    port: int

config = Config("localhost", 8080)

# Multiple threads can safely read
def worker():
    print(f"Connecting to {config.host}:{config.port}")

threads = [Thread(target=worker) for _ in range(10)]
for t in threads:
    t.start()

# No race conditions - config cannot be modified!
```

### 2. Hashability

```python
# ✅ Immutable objects can be hashed (used in sets/dicts)
@dataclass(frozen=True)
class User:
    id: int
    name: str

user1 = User(1, "Alice")
user2 = User(2, "Bob")

# Can use in set
users = {user1, user2}

# Can use as dict key
user_data = {
    user1: {"email": "alice@example.com"},
    user2: {"email": "bob@example.com"}
}
```

### 3. Predictability

```python
# ✅ No unexpected changes
@dataclass(frozen=True)
class Money:
    amount: float
    currency: str

def process_payment(payment):
    """Function cannot accidentally modify payment."""
    print(f"Processing {payment.amount} {payment.currency}")
    # payment.amount = 0  # Cannot do this!

payment = Money(100.0, "USD")
process_payment(payment)
print(payment.amount)  # Still 100.0 - guaranteed!
```

### 4. Caching/Memoization

```python
from functools import lru_cache
from dataclasses import dataclass

@dataclass(frozen=True)
class Coords:
    lat: float
    lon: float

@lru_cache(maxsize=128)
def calculate_distance(point1: Coords, point2: Coords):
    """Cache results - only works with immutable objects."""
    # Expensive calculation
    return ((point1.lat - point2.lat)**2 + 
            (point1.lon - point2.lon)**2)**0.5

p1 = Coords(40.7, -74.0)
p2 = Coords(34.0, -118.2)

# First call - computed
result1 = calculate_distance(p1, p2)

# Second call - cached!
result2 = calculate_distance(p1, p2)
```

## Real-World Example: Order Item

```python
from dataclasses import dataclass
from typing import List

@dataclass(frozen=True)
class OrderItem:
    product_id: str
    name: str
    price: float
    quantity: int
    
    @property
    def total(self):
        """Computed property."""
        return self.price * self.quantity
    
    def with_quantity(self, new_quantity):
        """Returns new OrderItem with updated quantity."""
        return OrderItem(
            self.product_id,
            self.name,
            self.price,
            new_quantity
        )

@dataclass(frozen=True)
class Order:
    order_id: str
    items: tuple  # Use tuple (immutable) not list
    
    @property
    def total(self):
        """Computed total."""
        return sum(item.total for item in self.items)
    
    def add_item(self, item):
        """Returns NEW order with added item."""
        return Order(self.order_id, self.items + (item,))
    
    def remove_item(self, product_id):
        """Returns NEW order with item removed."""
        new_items = tuple(
            item for item in self.items 
            if item.product_id != product_id
        )
        return Order(self.order_id, new_items)

# Usage
item1 = OrderItem("123", "Laptop", 999.99, 1)
item2 = OrderItem("456", "Mouse", 29.99, 2)

order1 = Order("ORD-001", (item1,))
order2 = order1.add_item(item2)

print(f"Order 1 total: ${order1.total}")  # 999.99
print(f"Order 2 total: ${order2.total}")  # 1059.97
```

## Immutability with Collections

### Problem: Mutable Container

```python
# ❌ Bad - mutable list inside "immutable" class
@dataclass(frozen=True)
class BadContainer:
    items: list  # Mutable!

container = BadContainer([1, 2, 3])
container.items.append(4)  # Oops! Modified "immutable" object
```

### Solution: Immutable Container

```python
# ✅ Good - use tuple or frozenset
@dataclass(frozen=True)
class GoodContainer:
    items: tuple  # Immutable tuple

container = GoodContainer((1, 2, 3))
# container.items.append(4)  # AttributeError!

# Create new container
new_container = GoodContainer(container.items + (4,))
```

## Defensive Copying

```python
from typing import Tuple
from dataclasses import dataclass

@dataclass(frozen=True)
class ImmutableList:
    items: Tuple[int, ...]
    
    def __init__(self, items):
        # Defensive copy - convert to tuple
        object.__setattr__(self, 'items', tuple(items))
    
    def append(self, item):
        """Returns new ImmutableList."""
        return ImmutableList(self.items + (item,))
    
    def remove(self, item):
        """Returns new ImmutableList."""
        new_items = tuple(x for x in self.items if x != item)
        return ImmutableList(new_items)

# Even if passed a list, it's converted to tuple
my_list = [1, 2, 3]
immutable = ImmutableList(my_list)

my_list.append(4)  # Modify original
print(immutable.items)  # (1, 2, 3) - unchanged!
```

## When to Use Immutability

### Use Immutable Objects When:

✅ **Value objects** - things identified by their value (Point, Money, Date)  
✅ **Configuration** - settings that shouldn't change  
✅ **Dictionary keys** - need to be hashable  
✅ **Thread-shared data** - accessed by multiple threads  
✅ **Functional programming** - avoiding side effects  

```python
# ✅ Good - value objects
@dataclass(frozen=True)
class Money:
    amount: float
    currency: str

@dataclass(frozen=True)
class Address:
    street: str
    city: str
    zipcode: str
```

### Use Mutable Objects When:

✅ **Entity objects** - things with identity (User, Account)  
✅ **Large data structures** - performance considerations  
✅ **Builder patterns** - incrementally constructing objects  
✅ **Frequent updates** - state changes often  

```python
# ✅ Good - entity with identity
class BankAccount:
    def __init__(self, account_id, balance):
        self.account_id = account_id  # Identity
        self._balance = balance       # Mutable state
    
    def deposit(self, amount):
        """Modify state."""
        self._balance += amount
```

## Immutability Best Practices

### 1. Use Frozen Dataclasses

```python
# ✅ Easiest way to create immutable classes
from dataclasses import dataclass

@dataclass(frozen=True)
class Config:
    host: str
    port: int
    timeout: float = 30.0
```

### 2. Return New Instances

```python
# ✅ Operations return new objects
@dataclass(frozen=True)
class Temperature:
    celsius: float
    
    def to_fahrenheit(self):
        """Returns new Temperature."""
        return Temperature((self.celsius * 9/5) + 32)
```

### 3. Use Tuples for Collections

```python
# ✅ Use tuple instead of list
@dataclass(frozen=True)
class Team:
    name: str
    members: tuple  # Not list!
```

### 4. Document Immutability

```python
@dataclass(frozen=True)
class Point:
    """
    Immutable 2D point.
    
    All operations return new Point instances.
    """
    x: float
    y: float
```

## Immutability Anti-Patterns

### Anti-Pattern 1: Fake Immutability

```python
# ❌ Bad - claims immutable but isn't
class FakeImmutable:
    def __init__(self, value):
        self.value = value  # Public attribute!

obj = FakeImmutable(10)
obj.value = 20  # Oops! Not actually immutable
```

### Anti-Pattern 2: Mutable Internal State

```python
# ❌ Bad - mutable state inside
@dataclass(frozen=True)
class BadCache:
    _cache: dict  # Mutable!
    
    def get(self, key):
        return self._cache.get(key)
    
    def set(self, key, value):
        self._cache[key] = value  # Modifying "immutable" object!
```

### Anti-Pattern 3: Breaking Frozen

```python
# ❌ Bad - working around frozen
@dataclass(frozen=True)
class Cheater:
    value: int
    
    def change(self, new_value):
        object.__setattr__(self, 'value', new_value)  # Don't do this!
```

## Summary

**Immutable objects** cannot be changed after creation, providing **thread safety**, **hashability**, and **predictability**. Use **frozen dataclasses** with `@dataclass(frozen=True)` for easy immutable class creation, or **namedtuples** for lightweight immutable data. Immutable objects are ideal for **value objects** (Point, Money), **configuration**, and **dictionary keys**. When operations need to "modify" an immutable object, return a **new instance** instead. Use **tuples instead of lists** for immutable collections, and practice **defensive copying** to protect against external mutation. Immutability eliminates entire categories of bugs related to unexpected state changes and makes code **easier to reason about** and **test**.
