---
id: special-methods
title: Special Methods (Magic Methods)
chapterId: ch2-classes-objects
order: 15
duration: 18
objectives:
  - Master Python's special methods
  - Implement operator overloading
  - Create objects that behave like built-in types
---

# Special Methods (Magic Methods)

**Special methods** (also called **magic methods** or **dunder methods**) let your objects behave like built-in Python types. They have double underscores before and after their names.

## String Representation

### `__str__` and `__repr__`

```python
class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year
    
    def __str__(self):
        """User-friendly string for print()."""
        return f'"{self.title}" by {self.author} ({self.year})'
    
    def __repr__(self):
        """Developer-friendly string for debugging."""
        return f"Book('{self.title}', '{self.author}', {self.year})"

book = Book("1984", "George Orwell", 1949)

print(str(book))   # "1984" by George Orwell (1949)
print(repr(book))  # Book('1984', 'George Orwell', 1949)
print(book)        # Uses __str__ by default
```

## Comparison Operators

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __eq__(self, other):
        """Equal to: =="""
        return self.age == other.age
    
    def __ne__(self, other):
        """Not equal to: !="""
        return self.age != other.age
    
    def __lt__(self, other):
        """Less than: <"""
        return self.age < other.age
    
    def __le__(self, other):
        """Less than or equal: <="""
        return self.age <= other.age
    
    def __gt__(self, other):
        """Greater than: >"""
        return self.age > other.age
    
    def __ge__(self, other):
        """Greater than or equal: >="""
        return self.age >= other.age
    
    def __str__(self):
        return f"{self.name} ({self.age})"

alice = Person("Alice", 30)
bob = Person("Bob", 25)
charlie = Person("Charlie", 30)

print(alice == charlie)  # True (same age)
print(bob < alice)       # True (25 < 30)
print(alice >= bob)      # True (30 >= 25)

# Can now sort lists of Person objects
people = [alice, bob, charlie]
people.sort()
for person in people:
    print(person)
# Output:
# Bob (25)
# Alice (30)
# Charlie (30)
```

## Arithmetic Operators

```python
class Money:
    def __init__(self, amount, currency="USD"):
        self.amount = amount
        self.currency = currency
    
    def __add__(self, other):
        """Addition: +"""
        if self.currency != other.currency:
            raise ValueError("Cannot add different currencies")
        return Money(self.amount + other.amount, self.currency)
    
    def __sub__(self, other):
        """Subtraction: -"""
        if self.currency != other.currency:
            raise ValueError("Cannot subtract different currencies")
        return Money(self.amount - other.amount, self.currency)
    
    def __mul__(self, factor):
        """Multiplication: *"""
        return Money(self.amount * factor, self.currency)
    
    def __truediv__(self, divisor):
        """Division: /"""
        return Money(self.amount / divisor, self.currency)
    
    def __str__(self):
        return f"{self.amount:.2f} {self.currency}"

# Use arithmetic operators naturally
price = Money(100.50)
discount = Money(10.00)

final_price = price - discount
print(final_price)  # "90.50 USD"

total = price * 3
print(total)  # "301.50 USD"

split = total / 3
print(split)  # "100.50 USD"
```

## Container Emulation

### `__len__` and `__getitem__`

```python
class Playlist:
    def __init__(self, name):
        self.name = name
        self.songs = []
    
    def add_song(self, song):
        self.songs.append(song)
    
    def __len__(self):
        """Return number of songs."""
        return len(self.songs)
    
    def __getitem__(self, index):
        """Access songs by index."""
        return self.songs[index]
    
    def __setitem__(self, index, song):
        """Set song at index."""
        self.songs[index] = song
    
    def __delitem__(self, index):
        """Delete song at index."""
        del self.songs[index]
    
    def __contains__(self, song):
        """Check if song is in playlist."""
        return song in self.songs

playlist = Playlist("My Favorites")
playlist.add_song("Song 1")
playlist.add_song("Song 2")
playlist.add_song("Song 3")

# Works like a list
print(len(playlist))          # 3
print(playlist[0])            # "Song 1"
playlist[1] = "New Song"      # Replace song
print("Song 1" in playlist)   # True

# Can iterate
for song in playlist:
    print(song)
```

## Context Managers

```python
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        """Called when entering 'with' block."""
        print(f"Opening {self.filename}")
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_value, traceback):
        """Called when exiting 'with' block."""
        print(f"Closing {self.filename}")
        if self.file:
            self.file.close()

# Use with 'with' statement
# with FileManager("test.txt", "w") as f:
#     f.write("Hello, World!")
# File automatically closed
```

## Callable Objects

```python
class Multiplier:
    def __init__(self, factor):
        self.factor = factor
    
    def __call__(self, value):
        """Make object callable like a function."""
        return value * self.factor

# Create callable object
double = Multiplier(2)
triple = Multiplier(3)

# Call like functions
print(double(5))   # 10
print(triple(5))   # 15

# Can use with map
numbers = [1, 2, 3, 4]
doubled = list(map(double, numbers))
print(doubled)  # [2, 4, 6, 8]
```

## Iteration Support

```python
class CountDown:
    def __init__(self, start):
        self.start = start
    
    def __iter__(self):
        """Return iterator object (usually self)."""
        self.current = self.start
        return self
    
    def __next__(self):
        """Return next value in sequence."""
        if self.current <= 0:
            raise StopIteration
        
        self.current -= 1
        return self.current + 1

# Use in for loop
for num in CountDown(5):
    print(num)
# Output: 5, 4, 3, 2, 1

# Or manually
countdown = CountDown(3)
print(next(countdown))  # 3
print(next(countdown))  # 2
print(next(countdown))  # 1
# print(next(countdown))  # StopIteration
```

## Attribute Access

```python
class DynamicAttributes:
    def __init__(self):
        self._data = {}
    
    def __getattr__(self, name):
        """Called when attribute not found."""
        print(f"Getting {name}")
        return self._data.get(name, f"{name} not found")
    
    def __setattr__(self, name, value):
        """Called when setting any attribute."""
        if name == "_data":
            # Allow setting _data normally
            super().__setattr__(name, value)
        else:
            print(f"Setting {name} = {value}")
            self._data[name] = value
    
    def __delattr__(self, name):
        """Called when deleting attribute."""
        print(f"Deleting {name}")
        if name in self._data:
            del self._data[name]

obj = DynamicAttributes()
obj.name = "Alice"      # Setting name = Alice
print(obj.name)         # Getting name, then prints "Alice"
del obj.name            # Deleting name
```

## Hash and Equality

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __eq__(self, other):
        """Points are equal if coordinates match."""
        return self.x == other.x and self.y == other.y
    
    def __hash__(self):
        """Hash based on coordinates."""
        return hash((self.x, self.y))
    
    def __str__(self):
        return f"({self.x}, {self.y})"

# Can use as dictionary keys
point1 = Point(10, 20)
point2 = Point(10, 20)
point3 = Point(30, 40)

print(point1 == point2)  # True

# Works in sets and as dict keys
points = {point1: "A", point3: "B"}
print(points[point2])  # "A" (point2 == point1)

# Works in sets
unique_points = {point1, point2, point3}
print(len(unique_points))  # 2 (point1 and point2 are equal)
```

## Boolean Conversion

```python
class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add(self, item):
        self.items.append(item)
    
    def __bool__(self):
        """True if cart has items."""
        return len(self.items) > 0
    
    def __len__(self):
        return len(self.items)

cart = ShoppingCart()

if not cart:
    print("Cart is empty")  # This prints

cart.add("Item 1")

if cart:
    print("Cart has items")  # This prints now
```

## Practical Example: Vector Class

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __add__(self, other):
        """Vector addition."""
        return Vector(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        """Vector subtraction."""
        return Vector(self.x - other.x, self.y - other.y)
    
    def __mul__(self, scalar):
        """Scalar multiplication."""
        return Vector(self.x * scalar, self.y * scalar)
    
    def __eq__(self, other):
        """Vector equality."""
        return self.x == other.x and self.y == other.y
    
    def __abs__(self):
        """Vector magnitude."""
        return (self.x ** 2 + self.y ** 2) ** 0.5
    
    def __bool__(self):
        """False if zero vector."""
        return self.x != 0 or self.y != 0

# Use naturally
v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(v1 + v2)        # Vector(4, 6)
print(v1 - v2)        # Vector(2, 2)
print(v1 * 2)         # Vector(6, 8)
print(abs(v1))        # 5.0 (magnitude)
print(v1 == v2)       # False
print(bool(v1))       # True (non-zero)
print(bool(Vector(0, 0)))  # False (zero vector)
```

## Common Special Methods Reference

| Method | Operator/Function | Description |
|--------|------------------|-------------|
| `__init__` | Constructor | Initialize object |
| `__str__` | `str()`, `print()` | User-friendly string |
| `__repr__` | `repr()` | Developer string |
| `__eq__` | `==` | Equality |
| `__ne__` | `!=` | Inequality |
| `__lt__` | `<` | Less than |
| `__le__` | `<=` | Less or equal |
| `__gt__` | `>` | Greater than |
| `__ge__` | `>=` | Greater or equal |
| `__add__` | `+` | Addition |
| `__sub__` | `-` | Subtraction |
| `__mul__` | `*` | Multiplication |
| `__truediv__` | `/` | Division |
| `__len__` | `len()` | Length |
| `__getitem__` | `[]` | Index access |
| `__setitem__` | `[] =` | Index assignment |
| `__contains__` | `in` | Membership test |
| `__call__` | `()` | Make callable |
| `__iter__` | `for` loop | Iteration |
| `__bool__` | `bool()`, `if` | Boolean value |
| `__hash__` | `hash()` | Hash value |

## Summary

**Special methods** (dunder methods) allow your objects to behave like built-in Python types. Implement `__str__` for user-friendly output and `__repr__` for debugging. Use comparison methods (`__eq__`, `__lt__`, etc.) to enable sorting and equality checks. Implement arithmetic operators (`__add__`, `__sub__`, etc.) for mathematical operations. Add `__len__`, `__getitem__`, and `__iter__` to make objects container-like. Use `__call__` to make objects callable like functions, and `__enter__`/`__exit__` for context managers. These methods make your classes feel natural and Pythonic to use.
