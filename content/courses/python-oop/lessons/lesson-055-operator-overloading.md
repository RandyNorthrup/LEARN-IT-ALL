---
id: "055"
title: "Operator Overloading"
chapterId: "06"
order: 3
duration: "20 minutes"
objectives:
  - "Master Python's special methods for operator overloading"
  - "Implement arithmetic, comparison, and container operators"
  - "Understand operator precedence and behavior"
  - "Create intuitive, Pythonic class interfaces"
  - "Apply operator overloading best practices"
---

# Operator Overloading

Operator overloading lets you define how operators (+, -, *, ==, [], etc.) work with your custom classes. This creates intuitive, natural interfaces that feel like built-in Python types.

## Introduction

Python operators like `+`, `*`, `==`, `[]` work with built-in types:

```python
print(5 + 3)          # 8
print("Hello" + " World")  # "Hello World"
print([1, 2] + [3, 4])     # [1, 2, 3, 4]
```

You can make operators work with your classes too by implementing **special methods** (also called "magic methods" or "dunder methods" — double underscore methods like `__add__`).

## Arithmetic Operators

### Basic Arithmetic

```python
class Vector:
    """2D vector with arithmetic operations."""
    
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        """Implement + operator."""
        if not isinstance(other, Vector):
            return NotImplemented
        return Vector(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        """Implement - operator."""
        if not isinstance(other, Vector):
            return NotImplemented
        return Vector(self.x - other.x, self.y - other.y)
    
    def __mul__(self, scalar):
        """Implement * operator (scalar multiplication)."""
        if not isinstance(scalar, (int, float)):
            return NotImplemented
        return Vector(self.x * scalar, self.y * scalar)
    
    def __truediv__(self, scalar):
        """Implement / operator."""
        if not isinstance(scalar, (int, float)):
            return NotImplemented
        if scalar == 0:
            raise ValueError("Cannot divide by zero")
        return Vector(self.x / scalar, self.y / scalar)
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"


# Use arithmetic operators naturally
v1 = Vector(2, 3)
v2 = Vector(1, 4)

print(v1 + v2)   # Vector(3, 7)
print(v1 - v2)   # Vector(1, -1)
print(v1 * 2)    # Vector(4, 6)
print(v1 / 2)    # Vector(1.0, 1.5)
```

### Reflected Operators

For commutativity (e.g., `2 * vector` should work like `vector * 2`):

```python
class Vector:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y
    
    def __mul__(self, scalar):
        """vector * scalar"""
        if not isinstance(scalar, (int, float)):
            return NotImplemented
        return Vector(self.x * scalar, self.y * scalar)
    
    def __rmul__(self, scalar):
        """scalar * vector (reflected)"""
        return self.__mul__(scalar)
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"


v = Vector(2, 3)
print(v * 2)    # Vector(4, 6) - calls __mul__
print(2 * v)    # Vector(4, 6) - calls __rmul__
```

### In-Place Operators

```python
class Vector:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y
    
    def __iadd__(self, other):
        """Implement += operator."""
        if not isinstance(other, Vector):
            return NotImplemented
        self.x += other.x
        self.y += other.y
        return self
    
    def __imul__(self, scalar):
        """Implement *= operator."""
        if not isinstance(scalar, (int, float)):
            return NotImplemented
        self.x *= scalar
        self.y *= scalar
        return self
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"


v = Vector(2, 3)
print(v)       # Vector(2, 3)

v += Vector(1, 1)
print(v)       # Vector(3, 4)

v *= 2
print(v)       # Vector(6, 8)
```

### Complete Arithmetic Example

```python
class Money:
    """Money with currency handling."""
    
    def __init__(self, amount: float, currency: str = "USD"):
        self.amount = amount
        self.currency = currency
    
    def __add__(self, other):
        """Add two Money objects."""
        if not isinstance(other, Money):
            return NotImplemented
        if self.currency != other.currency:
            raise ValueError(f"Cannot add {self.currency} and {other.currency}")
        return Money(self.amount + other.amount, self.currency)
    
    def __sub__(self, other):
        """Subtract Money objects."""
        if not isinstance(other, Money):
            return NotImplemented
        if self.currency != other.currency:
            raise ValueError(f"Cannot subtract {self.currency} and {other.currency}")
        return Money(self.amount - other.amount, self.currency)
    
    def __mul__(self, factor):
        """Multiply by scalar."""
        if not isinstance(factor, (int, float)):
            return NotImplemented
        return Money(self.amount * factor, self.currency)
    
    def __rmul__(self, factor):
        """Reflected multiplication."""
        return self.__mul__(factor)
    
    def __truediv__(self, divisor):
        """Divide by scalar."""
        if not isinstance(divisor, (int, float)):
            return NotImplemented
        if divisor == 0:
            raise ValueError("Cannot divide by zero")
        return Money(self.amount / divisor, self.currency)
    
    def __neg__(self):
        """Unary negation."""
        return Money(-self.amount, self.currency)
    
    def __abs__(self):
        """Absolute value."""
        return Money(abs(self.amount), self.currency)
    
    def __repr__(self):
        return f"Money({self.amount:.2f} {self.currency})"


# Usage
price1 = Money(100, "USD")
price2 = Money(50, "USD")

print(price1 + price2)    # Money(150.00 USD)
print(price1 - price2)    # Money(50.00 USD)
print(price1 * 2)         # Money(200.00 USD)
print(2 * price1)         # Money(200.00 USD)
print(price1 / 4)         # Money(25.00 USD)
print(-price1)            # Money(-100.00 USD)
print(abs(Money(-50, "USD")))  # Money(50.00 USD)
```

## Comparison Operators

### Basic Comparisons

```python
class Person:
    """Person with age-based comparison."""
    
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
    
    def __eq__(self, other):
        """Implement == operator."""
        if not isinstance(other, Person):
            return NotImplemented
        return self.age == other.age
    
    def __ne__(self, other):
        """Implement != operator."""
        if not isinstance(other, Person):
            return NotImplemented
        return self.age != other.age
    
    def __lt__(self, other):
        """Implement < operator."""
        if not isinstance(other, Person):
            return NotImplemented
        return self.age < other.age
    
    def __le__(self, other):
        """Implement <= operator."""
        if not isinstance(other, Person):
            return NotImplemented
        return self.age <= other.age
    
    def __gt__(self, other):
        """Implement > operator."""
        if not isinstance(other, Person):
            return NotImplemented
        return self.age > other.age
    
    def __ge__(self, other):
        """Implement >= operator."""
        if not isinstance(other, Person):
            return NotImplemented
        return self.age >= other.age
    
    def __repr__(self):
        return f"Person({self.name}, {self.age})"


# Use comparison operators
alice = Person("Alice", 30)
bob = Person("Bob", 25)
charlie = Person("Charlie", 30)

print(alice == charlie)  # True (same age)
print(alice != bob)      # True (different age)
print(bob < alice)       # True (25 < 30)
print(alice >= charlie)  # True (30 >= 30)

# Works with sorting
people = [alice, bob, charlie]
people.sort()
print(people)  # Sorted by age
```

### Using functools.total_ordering

Implement only `__eq__` and one other comparison, get the rest automatically:

```python
from functools import total_ordering

@total_ordering
class Product:
    """Product with price comparison."""
    
    def __init__(self, name: str, price: float):
        self.name = name
        self.price = price
    
    def __eq__(self, other):
        """Only need __eq__."""
        if not isinstance(other, Product):
            return NotImplemented
        return self.price == other.price
    
    def __lt__(self, other):
        """Only need one other comparison."""
        if not isinstance(other, Product):
            return NotImplemented
        return self.price < other.price
    
    def __repr__(self):
        return f"Product({self.name}, ${self.price})"


# All comparisons work now
widget = Product("Widget", 19.99)
gadget = Product("Gadget", 29.99)

print(widget < gadget)   # True (from __lt__)
print(widget <= gadget)  # True (derived)
print(widget > gadget)   # False (derived)
print(widget >= gadget)  # False (derived)
print(widget == gadget)  # False (from __eq__)
print(widget != gadget)  # True (derived)
```

## Container Operators

### Sequence Protocol

```python
class Playlist:
    """Music playlist with sequence operations."""
    
    def __init__(self, name: str):
        self.name = name
        self._songs = []
    
    def __len__(self):
        """Implement len()."""
        return len(self._songs)
    
    def __getitem__(self, index):
        """Implement indexing: playlist[i]."""
        return self._songs[index]
    
    def __setitem__(self, index, value):
        """Implement assignment: playlist[i] = song."""
        self._songs[index] = value
    
    def __delitem__(self, index):
        """Implement deletion: del playlist[i]."""
        del self._songs[index]
    
    def __contains__(self, song):
        """Implement 'in' operator."""
        return song in self._songs
    
    def __iter__(self):
        """Make iterable."""
        return iter(self._songs)
    
    def __reversed__(self):
        """Implement reversed()."""
        return reversed(self._songs)
    
    def append(self, song):
        """Add song to playlist."""
        self._songs.append(song)
    
    def __repr__(self):
        return f"Playlist({self.name}, {len(self._songs)} songs)"


# Usage
playlist = Playlist("My Favorites")
playlist.append("Song 1")
playlist.append("Song 2")
playlist.append("Song 3")

print(len(playlist))           # 3
print(playlist[0])             # "Song 1"
print("Song 2" in playlist)    # True

playlist[1] = "New Song 2"     # Replace
print(playlist[1])             # "New Song 2"

del playlist[0]                # Delete
print(len(playlist))           # 2

# Iteration
for song in playlist:
    print(song)

# Reversed
for song in reversed(playlist):
    print(song)
```

### Mapping Protocol

```python
class CaseInsensitiveDict:
    """Dictionary with case-insensitive keys."""
    
    def __init__(self):
        self._data = {}
    
    def __getitem__(self, key):
        """Get item: d[key]."""
        return self._data[key.lower()]
    
    def __setitem__(self, key, value):
        """Set item: d[key] = value."""
        self._data[key.lower()] = value
    
    def __delitem__(self, key):
        """Delete item: del d[key]."""
        del self._data[key.lower()]
    
    def __contains__(self, key):
        """Check membership: key in d."""
        return key.lower() in self._data
    
    def __len__(self):
        """Get length: len(d)."""
        return len(self._data)
    
    def __iter__(self):
        """Iterate over keys."""
        return iter(self._data)
    
    def keys(self):
        return self._data.keys()
    
    def values(self):
        return self._data.values()
    
    def items(self):
        return self._data.items()
    
    def __repr__(self):
        return f"CaseInsensitiveDict({dict(self._data)})"


# Usage
d = CaseInsensitiveDict()
d["Name"] = "Alice"
d["AGE"] = 30

print(d["name"])    # "Alice" - case insensitive
print(d["age"])     # 30
print("NAME" in d)  # True
print(len(d))       # 2

for key in d:
    print(f"{key}: {d[key]}")
```

## Callable Objects

```python
class Multiplier:
    """Callable object - acts like a function."""
    
    def __init__(self, factor: int):
        self.factor = factor
    
    def __call__(self, value: int) -> int:
        """Make instance callable."""
        return value * self.factor


# Use like a function
double = Multiplier(2)
triple = Multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15

# Can be used where functions are expected
numbers = [1, 2, 3, 4, 5]
doubled = list(map(double, numbers))
print(doubled)  # [2, 4, 6, 8, 10]
```

### Practical Callable Example

```python
class Validator:
    """Reusable validator."""
    
    def __init__(self, min_value: int, max_value: int):
        self.min_value = min_value
        self.max_value = max_value
    
    def __call__(self, value: int) -> bool:
        """Validate value."""
        return self.min_value <= value <= self.max_value


# Create validators
age_validator = Validator(0, 120)
percentage_validator = Validator(0, 100)

print(age_validator(25))      # True
print(age_validator(150))     # False
print(percentage_validator(50))  # True
print(percentage_validator(150)) # False
```

## Context Managers

```python
class FileLogger:
    """Context manager for logging."""
    
    def __init__(self, filename: str):
        self.filename = filename
        self.file = None
    
    def __enter__(self):
        """Called when entering 'with' block."""
        print(f"Opening {self.filename}")
        self.file = open(self.filename, 'w')
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Called when exiting 'with' block."""
        print(f"Closing {self.filename}")
        if self.file:
            self.file.close()
        # Return False to propagate exceptions
        return False
    
    def log(self, message: str):
        """Write log message."""
        if self.file:
            self.file.write(f"{message}\n")


# Usage
with FileLogger("app.log") as logger:
    logger.log("Application started")
    logger.log("Processing data")
    logger.log("Application finished")
# File automatically closed
```

## String Representation

```python
class Book:
    """Book with multiple string representations."""
    
    def __init__(self, title: str, author: str, year: int):
        self.title = title
        self.author = author
        self.year = year
    
    def __str__(self):
        """User-friendly string (print, str())."""
        return f'"{self.title}" by {self.author}'
    
    def __repr__(self):
        """Developer-friendly string (repr(), debugging)."""
        return f"Book('{self.title}', '{self.author}', {self.year})"
    
    def __format__(self, format_spec):
        """Custom formatting."""
        if format_spec == 'short':
            return self.title
        elif format_spec == 'long':
            return f'"{self.title}" by {self.author} ({self.year})'
        else:
            return str(self)


book = Book("1984", "George Orwell", 1949)

print(str(book))        # "1984" by George Orwell
print(repr(book))       # Book('1984', 'George Orwell', 1949)
print(f"{book}")        # "1984" by George Orwell
print(f"{book:short}")  # 1984
print(f"{book:long}")   # "1984" by George Orwell (1949)
```

## Real-World Example: Matrix Class

```python
class Matrix:
    """2D matrix with operator overloading."""
    
    def __init__(self, rows: list[list[float]]):
        self.rows = rows
        self.num_rows = len(rows)
        self.num_cols = len(rows[0]) if rows else 0
    
    def __add__(self, other):
        """Matrix addition."""
        if not isinstance(other, Matrix):
            return NotImplemented
        if self.num_rows != other.num_rows or self.num_cols != other.num_cols:
            raise ValueError("Matrix dimensions must match")
        
        result = []
        for i in range(self.num_rows):
            row = []
            for j in range(self.num_cols):
                row.append(self.rows[i][j] + other.rows[i][j])
            result.append(row)
        
        return Matrix(result)
    
    def __mul__(self, scalar):
        """Scalar multiplication."""
        if not isinstance(scalar, (int, float)):
            return NotImplemented
        
        result = []
        for row in self.rows:
            result.append([val * scalar for val in row])
        
        return Matrix(result)
    
    def __rmul__(self, scalar):
        """Reflected scalar multiplication."""
        return self.__mul__(scalar)
    
    def __matmul__(self, other):
        """Matrix multiplication (@ operator)."""
        if not isinstance(other, Matrix):
            return NotImplemented
        if self.num_cols != other.num_rows:
            raise ValueError("Invalid matrix dimensions for multiplication")
        
        result = []
        for i in range(self.num_rows):
            row = []
            for j in range(other.num_cols):
                sum_val = sum(self.rows[i][k] * other.rows[k][j] 
                             for k in range(self.num_cols))
                row.append(sum_val)
            result.append(row)
        
        return Matrix(result)
    
    def __getitem__(self, index):
        """Get row or element."""
        if isinstance(index, int):
            return self.rows[index]
        elif isinstance(index, tuple):
            row, col = index
            return self.rows[row][col]
    
    def __setitem__(self, index, value):
        """Set row or element."""
        if isinstance(index, int):
            self.rows[index] = value
        elif isinstance(index, tuple):
            row, col = index
            self.rows[row][col] = value
    
    def __eq__(self, other):
        """Matrix equality."""
        if not isinstance(other, Matrix):
            return NotImplemented
        return self.rows == other.rows
    
    def __repr__(self):
        return f"Matrix({self.rows})"
    
    def __str__(self):
        """Pretty print matrix."""
        lines = []
        for row in self.rows:
            lines.append(" ".join(f"{val:6.2f}" for val in row))
        return "\n".join(lines)


# Usage
m1 = Matrix([[1, 2], [3, 4]])
m2 = Matrix([[5, 6], [7, 8]])

print("Matrix 1:")
print(m1)
print("\nMatrix 2:")
print(m2)

print("\nAddition (m1 + m2):")
print(m1 + m2)

print("\nScalar multiplication (m1 * 2):")
print(m1 * 2)

print("\nScalar multiplication (3 * m1):")
print(3 * m1)

print("\nMatrix multiplication (m1 @ m2):")
print(m1 @ m2)

print("\nIndexing:")
print(f"m1[0] = {m1[0]}")        # Get row
print(f"m1[1, 1] = {m1[1, 1]}")  # Get element

print("\nComparison:")
m3 = Matrix([[1, 2], [3, 4]])
print(f"m1 == m3: {m1 == m3}")
print(f"m1 == m2: {m1 == m2}")
```

## Best Practices

### Practice 1: Return NotImplemented for Unsupported Types

```python
class MyClass:
    def __add__(self, other):
        if not isinstance(other, MyClass):
            return NotImplemented  # Not raise TypeError!
        # ... implementation
```

This allows Python to try reflected operations.

### Practice 2: Be Consistent with Built-in Types

```python
# ✅ GOOD: Consistent with list
class MyList:
    def __add__(self, other):
        """+ concatenates like list."""
        return MyList(self._items + other._items)


# ❌ CONFUSING: + does something unexpected
class MyList:
    def __add__(self, other):
        """+ removes duplicates? Unexpected!"""
        return MyList(set(self._items + other._items))
```

### Practice 3: Implement Related Operators Together

```python
# If you implement __eq__, also implement __hash__ (or make unhashable)
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y
    
    def __hash__(self):
        return hash((self.x, self.y))
```

### Practice 4: Document Operator Behavior

```python
class Vector:
    """2D Vector with arithmetic operations.
    
    Supports:
    - Addition/subtraction: vector arithmetic
    - Multiplication: scalar multiplication only
    - Division: scalar division only
    - Comparison: based on magnitude
    
    Examples:
        >>> v1 = Vector(2, 3)
        >>> v2 = Vector(1, 4)
        >>> v1 + v2
        Vector(3, 7)
        >>> v1 * 2
        Vector(4, 6)
    """
```

## Summary

Operator overloading makes custom classes feel like built-in types:

### Key Operators

**Arithmetic**:
- `__add__`, `__sub__`, `__mul__`, `__truediv__`, `__floordiv__`, `__mod__`, `__pow__`
- Reflected: `__radd__`, `__rsub__`, etc.
- In-place: `__iadd__`, `__isub__`, etc.
- Unary: `__neg__`, `__pos__`, `__abs__`

**Comparison**:
- `__eq__`, `__ne__`, `__lt__`, `__le__`, `__gt__`, `__ge__`
- Use `@total_ordering` to generate missing comparisons

**Container**:
- `__len__`, `__getitem__`, `__setitem__`, `__delitem__`
- `__contains__`, `__iter__`, `__reversed__`

**Other**:
- `__call__`: Make callable
- `__enter__`, `__exit__`: Context manager
- `__str__`, `__repr__`: String representations
- `__hash__`: Make hashable

### Best Practices

- ✅ Return `NotImplemented` for unsupported types
- ✅ Be consistent with built-in type behavior
- ✅ Implement related operators together
- ✅ Document operator behavior
- ✅ Use `@total_ordering` for comparisons
- ❌ Don't surprise users with unexpected behavior
- ❌ Don't implement operators that don't make sense

In the next lesson, we'll explore **Abstract Base Classes and Interfaces**, creating formal contracts for polymorphic behavior.

