---
id: lesson-184-named-tuples
title: "Named Tuples"
chapterId: ch15-tuples
order: 4
duration: 30
objectives:
  - Explain why named tuples exist and what problems they solve
  - Create named tuples using collections.namedtuple and typing.NamedTuple
  - Access named tuple fields by name and by index
  - Use _fields, _asdict(), and _replace() methods
  - Add default values and custom methods to named tuples
  - Choose between named tuples, regular classes, dictionaries, and dataclasses
---

# Named Tuples

Regular tuples are powerful, but they have a significant readability problem: when you see `employee[2]`, you have no idea what that element represents. Is it an age? A salary? A department code? **Named tuples** solve this by letting you access elements by descriptive names while retaining all the benefits of regular tuples.

Named tuples are one of Python's hidden gems—lightweight, readable, and memory-efficient. In this lesson, you'll learn both ways to create them, explore their special methods, and understand when to choose them over alternatives.

## Why Named Tuples Exist

Consider this code that uses a regular tuple to represent a point:

```python
# Using a regular tuple
point = (3.5, 7.2)

# What do these indices mean?
x = point[0]  # Is this x? latitude? width?
y = point[1]  # Is this y? longitude? height?
```

The tuple works, but the code is not self-documenting. Now compare it with a named tuple:

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
point = Point(3.5, 7.2)

# Crystal clear!
print(point.x)  # 3.5
print(point.y)  # 7.2
```

Named tuples give you the best of both worlds: the readability of a class with the efficiency and immutability of a tuple.

## Creating Named Tuples with collections.namedtuple

The `collections.namedtuple` factory function creates a new tuple subclass with named fields.

### Basic Syntax

```python
from collections import namedtuple

# namedtuple(typename, field_names)
Color = namedtuple("Color", ["red", "green", "blue"])

# Create instances
crimson = Color(220, 20, 60)
sky_blue = Color(red=135, green=206, blue=235)

print(crimson)    # Color(red=220, green=20, blue=60)
print(sky_blue)   # Color(red=135, green=206, blue=235)
```

The first argument is the **type name**. The second specifies **field names** as a list, comma-separated string, or space-separated string.

### Creating Instances

```python
from collections import namedtuple

Student = namedtuple("Student", ["name", "age", "major", "gpa"])

alice = Student("Alice", 20, "Computer Science", 3.8)          # positional
bob = Student(name="Bob", age=22, major="Mathematics", gpa=3.5) # keyword
charlie = Student("Charlie", 21, major="Physics", gpa=3.9)

print(alice)
# Student(name='Alice', age=20, major='Computer Science', gpa=3.8)
```

### Using _make() for Conversion

The `_make()` class method creates a named tuple from an iterable—useful when reading data from files or databases:

```python
from collections import namedtuple

Employee = namedtuple("Employee", "id name department salary")

row = [101, "Alice", "Engineering", 95000]
emp = Employee._make(row)
print(emp)  # Employee(id=101, name='Alice', department='Engineering', salary=95000)
```

## Accessing Fields

Named tuples support access **by name** and **by index**:

```python
from collections import namedtuple

City = namedtuple("City", "name country population")
tokyo = City("Tokyo", "Japan", 13_960_000)

# Access by name (preferred — more readable)
print(tokyo.name)        # Tokyo
print(tokyo.country)     # Japan
print(tokyo.population)  # 13960000

# Access by index (still works — it's still a tuple)
print(tokyo[0])  # Tokyo
print(tokyo[1])  # Japan
print(tokyo[2])  # 13960000

# Unpacking works too
name, country, pop = tokyo
print(f"{name}, {country}: {pop:,}")  # Tokyo, Japan: 13,960,000
```

Named tuples also support all regular tuple operations like `len()`, iteration, slicing, and `in`.

## Special Attributes and Methods

Named tuples come with several useful underscore-prefixed attributes and methods. The underscores prevent name conflicts with your field names.

### _fields

The `_fields` attribute returns a tuple of field names:

```python
from collections import namedtuple

Point = namedtuple("Point", "x y z")
p = Point(1, 2, 3)

print(Point._fields)  # ('x', 'y', 'z')
print(p._fields)      # ('x', 'y', 'z')

# Useful for introspection and dynamic processing
for field in p._fields:
    print(f"{field} = {getattr(p, field)}")
# x = 1
# y = 2
# z = 3
```

### _asdict()

The `_asdict()` method returns the named tuple as a dictionary:

```python
from collections import namedtuple

Book = namedtuple("Book", "title author year pages")
book = Book("Fluent Python", "Luciano Ramalho", 2022, 1012)

book_dict = book._asdict()
print(book_dict)
# {'title': 'Fluent Python', 'author': 'Luciano Ramalho', 'year': 2022, 'pages': 1012}

# Useful for JSON serialization
import json
print(json.dumps(book._asdict(), indent=2))
```

### _replace()

Since named tuples are immutable, you can't modify fields directly. The `_replace()` method creates a **new** named tuple with specified fields changed:

```python
from collections import namedtuple

Config = namedtuple("Config", "host port debug timeout")
default_config = Config("localhost", 8080, False, 30)

# Create a modified copy — the original is unchanged
dev_config = default_config._replace(debug=True, port=3000)

print(default_config)  # Config(host='localhost', port=8080, debug=False, timeout=30)
print(dev_config)      # Config(host='localhost', port=3000, debug=True, timeout=30)
```

This is extremely useful when you need "almost the same" data with a few changes.

## Default Values

You can assign default values to the rightmost fields using the `defaults` parameter:

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y", "z"], defaults=[0.0])

p1 = Point(1.0, 2.0, 3.0)
p2 = Point(4.0, 5.0)  # z defaults to 0.0

print(p1)  # Point(x=1.0, y=2.0, z=3.0)
print(p2)  # Point(x=4.0, y=5.0, z=0.0)
```

Defaults apply from the rightmost fields leftward. If you provide more defaults, they cover more fields:

```python
from collections import namedtuple
Connection = namedtuple("Connection", "host port timeout", defaults=[8080, 30])
c1 = Connection("localhost")  # Connection(host='localhost', port=8080, timeout=30)
```

### Combining Functions with Named Tuples

Named tuples pair naturally with standalone functions. Define the data structure as a named tuple, then write functions that operate on it:

```python
from collections import namedtuple
import math

Vector2D = namedtuple("Vector2D", ["x", "y"])

def magnitude(v):
    """Calculate the length of the vector."""
    return math.sqrt(v.x ** 2 + v.y ** 2)

def normalized(v):
    """Return a unit vector in the same direction."""
    mag = magnitude(v)
    return Vector2D(v.x / mag, v.y / mag)

def dot(v1, v2):
    """Calculate the dot product of two vectors."""
    return v1.x * v2.x + v1.y * v2.y

v = Vector2D(3.0, 4.0)
print(magnitude(v))            # 5.0
print(normalized(v))           # Vector2D(x=0.6, y=0.8)
print(dot(v, Vector2D(1, 0)))  # 3.0
```

## Named Tuples as Lightweight Data Containers

Named tuples are excellent lightweight containers for structured data, especially when paired with functions:

```python
from collections import namedtuple

Temperature = namedtuple("Temperature", ["value", "unit"], defaults=["C"])

def to_fahrenheit(temp):
    """Convert a Temperature to Fahrenheit."""
    if temp.unit == "C":
        return Temperature(temp.value * 9/5 + 32, "F")
    return temp

def format_temp(temp):
    """Format a Temperature for display."""
    return f"{temp.value:.1f}°{temp.unit}"

boiling = Temperature(100, "C")
print(format_temp(boiling))                  # 100.0°C
print(format_temp(to_fahrenheit(boiling)))   # 212.0°F
```

## typing.NamedTuple: Class-Based Syntax with Type Annotations

Python 3.6+ provides an alternative way to define named tuples using `typing.NamedTuple`. Despite using the `class` keyword, this is **not** defining a class in the object-oriented sense—it creates a named tuple type, just like `collections.namedtuple`, but with built-in type annotations.

```python
from typing import NamedTuple

class Point(NamedTuple):
    x: float
    y: float

p = Point(3.5, 7.2)
print(p.x)       # 3.5
print(p[1])      # 7.2
print(p._fields)  # ('x', 'y')
```

The result is identical to `namedtuple("Point", ["x", "y"])`—an immutable tuple with named fields. The `class` syntax is just a cleaner way to declare the fields and their types.

### Default Values and Comparison

With `typing.NamedTuple`, default values are assigned directly to fields, which is more intuitive than the `defaults` parameter in `collections.namedtuple`:

```python
from typing import NamedTuple

class Connection(NamedTuple):
    host: str
    port: int = 8080
    timeout: int = 30

c = Connection("localhost")
print(c)  # Connection(host='localhost', port=8080, timeout=30)
```

You can also add docstrings and helper methods. Instances remain immutable tuples regardless:

```python
from typing import NamedTuple

class Color(NamedTuple):
    """An RGB color value."""
    red: int
    green: int
    blue: int

    def hex(self) -> str:
        return f"#{self.red:02x}{self.green:02x}{self.blue:02x}"

crimson = Color(220, 20, 60)
print(crimson.hex())  # #dc143c
print(isinstance(crimson, tuple))  # True
```

**Use `typing.NamedTuple`** when you want type annotations, cleaner syntax, and inline defaults. **Use `collections.namedtuple`** when you need to create types dynamically or support older Python versions.

## When to Use Named Tuples vs Alternatives

Choosing the right data structure matters. Here's a comparison:

### Named Tuples vs Regular Tuples

```python
# Hard to understand
user = ("alice", 30, "alice@example.com")
print(user[2])  # What is index 2?

# Self-documenting
from collections import namedtuple
User = namedtuple("User", "username age email")
user = User("alice", 30, "alice@example.com")
print(user.email)  # Clear intent
```

### Named Tuples vs Dictionaries

Named tuples are more memory-efficient and provide attribute-style access, but dictionaries are mutable and more flexible for dynamic data.

### Named Tuples vs Dataclasses

Python 3.7+ `dataclasses` offer more features (mutability, post-init, full inheritance) but named tuples are lighter and hashable by default.

**Choose named tuples when** you need a simple, immutable, hashable data container with tuple behavior.
**Choose dataclasses when** you need mutability, complex initialization, or full inheritance.

## Real-World Example: Configuration

```python
from collections import namedtuple

DatabaseConfig = namedtuple(
    "DatabaseConfig",
    ["host", "port", "database", "user", "pool_size"],
    defaults=["localhost", 5432, "myapp", "admin", 5],
)

dev_db = DatabaseConfig(database="myapp_dev")
prod_db = DatabaseConfig(host="db.prod.example.com", pool_size=20)

print(f"Dev: {dev_db.host}:{dev_db.port}/{dev_db.database}")
print(f"Prod: {prod_db.host}:{prod_db.port}/{prod_db.database}")
```

## Try It Yourself

### Exercise 1: Create a Named Tuple

Define a named tuple `Movie` with fields: `title`, `director`, `year`, `rating`. Create three movie instances and print them using both attribute access and index access.

```python
from collections import namedtuple

Movie = namedtuple("Movie", "title director year rating")

m1 = Movie("Inception", "Christopher Nolan", 2010, 8.8)
m2 = Movie("Parasite", "Bong Joon-ho", 2019, 8.5)
m3 = Movie("Spirited Away", "Hayao Miyazaki", 2001, 8.6)

for movie in (m1, m2, m3):
    print(f"{movie.title} ({movie.year}) by {movie.director} — {movie.rating}/10")
```

### Exercise 2: Named Tuple with Functions

Create a `Rectangle` named tuple with `width` and `height` fields. Write functions for `area()`, `perimeter()`, and `is_square()` that take a rectangle as a parameter. Test all three functions.

```python
from collections import namedtuple

Rectangle = namedtuple("Rectangle", ["width", "height"])

def area(rect):
    return rect.width * rect.height

def perimeter(rect):
    return 2 * (rect.width + rect.height)

def is_square(rect):
    return rect.width == rect.height

r1 = Rectangle(5, 3)
r2 = Rectangle(4, 4)
print(f"{r1}: area={area(r1)}, perimeter={perimeter(r1)}, square={is_square(r1)}")
print(f"{r2}: area={area(r2)}, perimeter={perimeter(r2)}, square={is_square(r2)}")
```

## Key Takeaways

- **Named tuples** add readable field names to regular tuples without sacrificing performance or immutability.
- Use `collections.namedtuple("Name", fields)` for the classic approach, or `typing.NamedTuple` for the modern class-based syntax with type annotations.
- Named tuples support access **by name** (`point.x`) and **by index** (`point[0]`), plus all standard tuple operations.
- Use `_fields` for introspection, `_asdict()` for dictionary conversion, `_replace()` for creating modified copies, and `_make()` for creating instances from iterables.
- The `typing.NamedTuple` form supports **default values**, **type annotations**, **docstrings**, and **custom methods**.
- Named tuples are ideal as **lightweight, immutable data containers**—more readable than tuples, more efficient than dictionaries, simpler than full classes.
- Choose **named tuples** for simple immutable records, **dataclasses** for mutable or complex objects, and **dictionaries** for dynamic or schema-free data.
