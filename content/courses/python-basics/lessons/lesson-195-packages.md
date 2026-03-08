---
id: lesson-195-packages
title: "Python Packages"
chapterId: ch17-modules
order: 4
duration: 30
objectives:
  - Understand what packages are and how they differ from modules
  - Create packages with proper __init__.py files
  - Use relative imports within a package
  - Build subpackages and organize complex project structures
  - Control package exports using __all__ and __init__.py
  - Design a real-world package with multiple submodules
---

# Python Packages

As your projects grow, a single directory of modules becomes hard to manage. **Packages** let you organize modules into a hierarchy of directories — think of them as folders for your code. In this lesson, you'll learn to create, structure, and import from packages.

## What Is a Package?

A **package** is a directory that contains Python modules and a special `__init__.py` file. While a module is a single `.py` file, a package is a collection of related modules grouped in a folder.

```
my_package/
├── __init__.py      ← Makes this directory a package
├── module_a.py
├── module_b.py
└── module_c.py
```

The `__init__.py` file is what tells Python "this directory is a package, not just a regular folder." It can be empty or contain initialization code.

### Modules vs. Packages

| Feature | Module | Package |
|---------|--------|---------|
| What it is | A single `.py` file | A directory with `__init__.py` |
| Contains | Functions, classes, variables | Other modules and subpackages |
| Accessed via | `import module` | `import package.module` |
| File | `utils.py` | `utils/__init__.py` |

## Creating a Package

Let's create a package called `geometry` for geometric calculations:

```
geometry/
├── __init__.py
├── shapes.py
├── calculations.py
└── constants.py
```

```python
# geometry/constants.py
"""Geometric constants."""

PI = 3.141592653589793
TAU = 6.283185307179586
E = 2.718281828459045
```

```python
# geometry/shapes.py
"""Shape definitions and geometric calculation functions."""

import math
from collections import namedtuple

Circle = namedtuple("Circle", ["radius"])
Rectangle = namedtuple("Rectangle", ["width", "height"])
Triangle = namedtuple("Triangle", ["base", "height"])

def circle_area(circle):
    return math.pi * circle.radius ** 2

def circle_circumference(circle):
    return 2 * math.pi * circle.radius

def rectangle_area(rect):
    return rect.width * rect.height

def rectangle_perimeter(rect):
    return 2 * (rect.width + rect.height)

def rectangle_is_square(rect):
    return rect.width == rect.height

def triangle_area(tri):
    return 0.5 * tri.base * tri.height
```

```python
# geometry/calculations.py
"""Utility functions for geometric calculations."""

import math

def distance(point1, point2):
    """Calculate distance between two 2D points."""
    return math.sqrt(
        (point2[0] - point1[0]) ** 2 +
        (point2[1] - point1[1]) ** 2
    )

def degrees_to_radians(degrees):
    """Convert degrees to radians."""
    return degrees * (math.pi / 180)

def radians_to_degrees(radians):
    """Convert radians to degrees."""
    return radians * (180 / math.pi)
```

## The `__init__.py` File

The `__init__.py` file serves multiple purposes:

### 1. Mark Directory as a Package

At minimum, it can be empty:

```python
# geometry/__init__.py
# (empty file — just marks geometry/ as a package)
```

### 2. Initialize Package-Level Code

You can define package-level variables or run initialization code:

```python
# geometry/__init__.py
"""The geometry package — tools for geometric calculations."""

__version__ = "1.0.0"
__author__ = "Your Name"

print(f"Geometry package v{__version__} loaded")  # Runs on import
```

### 3. Control the Public API

The most powerful use — re-export names so users don't need to know your internal structure:

```python
# geometry/__init__.py
"""The geometry package — tools for geometric calculations."""

__version__ = "1.0.0"

# Re-export key types and functions at the package level
from geometry.shapes import Circle, Rectangle, Triangle
from geometry.shapes import circle_area, rectangle_area, triangle_area
from geometry.calculations import distance
from geometry.constants import PI

__all__ = [
    "Circle", "Rectangle", "Triangle",
    "circle_area", "rectangle_area", "triangle_area",
    "distance", "PI",
]
```

With this `__init__.py`, users get a clean, simple API:

```python
# Instead of this (reaching into internal modules):
from geometry.shapes import Circle, circle_area
from geometry.calculations import distance

# Users can do this (importing from the package directly):
from geometry import Circle, circle_area, distance, PI

c = Circle(5)
print(circle_area(c))           # 78.53981633974483
print(distance((0, 0), (3, 4)))  # 5.0
```

## Importing from Packages

There are several ways to import from a package:

```python
# Import the package itself
import geometry
# Access via: geometry.Circle, geometry.PI (if exported in __init__.py)

# Import a specific module from the package
from geometry import shapes
c = shapes.Circle(10)

# Import a specific class/function from a module
from geometry.shapes import Circle, Rectangle
c = Circle(10)
r = Rectangle(4, 6)

# Import with alias
from geometry import shapes as geo_shapes
c = geo_shapes.Circle(10)

# Import a module using full dotted path
import geometry.calculations
dist = geometry.calculations.distance((0, 0), (3, 4))
```

## Relative Imports

Inside a package, you can use **relative imports** to reference sibling modules without hardcoding the package name:

```python
# geometry/shapes.py — using relative imports
from collections import namedtuple
from .constants import PI        # Import from sibling module
from .calculations import distance  # Import from sibling module

Circle = namedtuple("Circle", ["radius"])

def circle_area(circle):
    return PI * circle.radius ** 2
```

The dot notation works like file paths:
- `.` means "current package" (same directory)
- `..` means "parent package" (one directory up)
- `...` means "grandparent package" (two directories up)

```python
# Relative import examples
from . import module_a          # Import sibling module
from .module_a import func      # Import from sibling module
from .. import parent_module    # Import from parent package
from ..sibling_pkg import mod   # Import from sibling package
```

### When to Use Relative vs. Absolute Imports

```python
# Absolute import — always works, PEP 8 preferred for most cases
from geometry.shapes import Circle

# Relative import — works only inside a package
from .shapes import Circle
```

**Use absolute imports** as the default — they're clearer and work everywhere.

**Use relative imports** when:
- The package might be renamed
- You want to emphasize that modules are part of the same package
- You're building a redistributable library

**Important:** Relative imports only work inside packages. You cannot use relative imports in a script run directly (`python shapes.py` will fail). The file must be imported as part of a package.

## Subpackages

Packages can contain other packages, creating a hierarchy:

```
myapp/
├── __init__.py
├── core/
│   ├── __init__.py
│   ├── config.py
│   └── database.py
├── models/
│   ├── __init__.py
│   ├── user.py
│   └── product.py
├── utils/
│   ├── __init__.py
│   ├── validators.py
│   └── formatters.py
└── api/
    ├── __init__.py
    ├── routes.py
    └── middleware.py
```

Each subdirectory with an `__init__.py` is a subpackage:

```python
# Importing from subpackages
from myapp.core.config import DATABASE_URL
from myapp.models.user import User
from myapp.utils.validators import is_valid_email
from myapp.api.routes import register_routes

# Or import the subpackage
from myapp.models import user
new_user = user.User("Alice", "alice@example.com")
```

### Subpackage `__init__.py`

Each subpackage's `__init__.py` can re-export its contents:

```python
# myapp/models/__init__.py
"""Data models for the application."""

from .user import User, UserRole
from .product import Product, Category

__all__ = ["User", "UserRole", "Product", "Category"]
```

This lets users import directly from the subpackage:

```python
from myapp.models import User, Product
```

## Namespace Packages (Python 3.3+)

Python 3.3 introduced **namespace packages** — packages that don't require an `__init__.py` file:

```
project/
├── part1/
│   └── mypackage/
│       └── module_a.py
└── part2/
    └── mypackage/
        └── module_b.py
```

If both `part1/` and `part2/` are on `sys.path`, Python merges them into a single `mypackage`:

```python
import sys
sys.path.extend(["part1", "part2"])

from mypackage import module_a  # From part1/
from mypackage import module_b  # From part2/
```

Namespace packages are mainly used by large projects that split their code across multiple directories or distributions. For most projects, regular packages with `__init__.py` are the right choice.

## Package `__all__` for Wildcard Imports

The `__all__` list in `__init__.py` controls what `from package import *` exports:

```python
# mypackage/__init__.py
from .module_a import ClassA, function_a
from .module_b import ClassB, function_b
from .module_c import ClassC

__all__ = [
    "ClassA", "function_a",
    "ClassB", "function_b",
    "ClassC",
]
```

Without `__all__`, a star import would bring in everything — including internal names you might not want exposed.

## Practical Example: Building a Calculator Package

Let's build a complete calculator package with submodules:

```
calculator/
├── __init__.py
├── basic.py
├── scientific.py
└── converters.py
```

```python
# calculator/basic.py
"""Basic arithmetic operations."""

def add(a, b):
    """Add two numbers."""
    return a + b

def subtract(a, b):
    """Subtract b from a."""
    return a - b

def multiply(a, b):
    """Multiply two numbers."""
    return a * b

def divide(a, b):
    """Divide a by b."""
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b

def integer_divide(a, b):
    """Floor division of a by b."""
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a // b

def modulo(a, b):
    """Return the remainder of a divided by b."""
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a % b
```

```python
# calculator/scientific.py
"""Scientific calculator functions."""

import math

def power(base, exponent):
    """Raise base to the power of exponent."""
    return base ** exponent

def square_root(n):
    """Calculate the square root."""
    if n < 0:
        raise ValueError("Cannot calculate square root of negative number")
    return math.sqrt(n)

def logarithm(n, base=math.e):
    """Calculate logarithm with given base (default: natural log)."""
    if n <= 0:
        raise ValueError("Logarithm undefined for non-positive numbers")
    return math.log(n, base)

def factorial(n):
    """Calculate n factorial."""
    if n < 0:
        raise ValueError("Factorial undefined for negative numbers")
    return math.factorial(n)

def sin(degrees):
    """Calculate sine of angle in degrees."""
    return math.sin(math.radians(degrees))

def cos(degrees):
    """Calculate cosine of angle in degrees."""
    return math.cos(math.radians(degrees))
```

```python
# calculator/converters.py
"""Unit conversion functions."""

def celsius_to_fahrenheit(c):
    return (c * 9 / 5) + 32

def fahrenheit_to_celsius(f):
    return (f - 32) * 5 / 9

def km_to_miles(km):
    return km * 0.621371

def miles_to_km(miles):
    return miles / 0.621371

def kg_to_pounds(kg):
    return kg * 2.20462

def pounds_to_kg(pounds):
    return pounds / 2.20462
```

```python
# calculator/__init__.py
"""
Calculator package — arithmetic, scientific, and conversion tools.

Usage:
    from calculator import add, subtract, square_root
    from calculator.converters import celsius_to_fahrenheit
"""

__version__ = "1.0.0"

# Re-export the most commonly used functions at the package level
from .basic import add, subtract, multiply, divide
from .scientific import power, square_root, factorial

__all__ = [
    "add", "subtract", "multiply", "divide",
    "power", "square_root", "factorial",
]
```

Now users get a clean experience:

```python
# Simple usage — import from the package directly
from calculator import add, square_root
print(add(5, 3))          # 8
print(square_root(144))   # 12.0

# Full access when needed
from calculator.scientific import sin, cos
from calculator.converters import celsius_to_fahrenheit
print(sin(45))                       # 0.7071...
print(celsius_to_fahrenheit(100))    # 212.0
```

## Organizing a Project into Packages

Here's a recommended structure for a medium-sized Python project:

```
weather_app/
├── README.md
├── requirements.txt
├── setup.py
├── main.py                  ← Entry point
├── weather/                 ← Main package
│   ├── __init__.py
│   ├── api/                 ← API subpackage
│   │   ├── __init__.py
│   │   ├── client.py
│   │   └── endpoints.py
│   ├── models/              ← Data models subpackage
│   │   ├── __init__.py
│   │   ├── forecast.py
│   │   └── location.py
│   ├── utils/               ← Utilities subpackage
│   │   ├── __init__.py
│   │   ├── formatting.py
│   │   └── caching.py
│   └── config.py            ← Configuration
└── tests/                   ← Test package
    ├── __init__.py
    ├── test_api.py
    ├── test_models.py
    └── test_utils.py
```

Guidelines for organizing packages:

1. **Group by feature** — put related code together (`models/`, `api/`, `utils/`)
2. **Keep `__init__.py` lean** — re-export key names, avoid heavy logic
3. **One class per file** for major classes, group small utilities together
4. **Separate tests** from source code
5. **Use `__all__`** to define your public API clearly

## Try It Yourself

### Exercise 1: Create a Package

Create a `text_tools` package with three modules:

```
text_tools/
├── __init__.py        # Re-export key functions
├── analyzers.py       # word_count, char_count, sentence_count
├── transformers.py    # uppercase, lowercase, title_case, reverse
└── validators.py      # is_palindrome, is_email, has_numbers
```

### Exercise 2: Package with Subpackages

Design (on paper or in code) a package structure for a todo list application. Include subpackages for models, storage, and display.

### Exercise 3: Relative Imports

Create two modules inside a package that import from each other using relative imports. Verify they work correctly when imported from outside the package.

## Key Takeaways

- A **package** is a directory containing an `__init__.py` file and one or more Python modules.
- **`__init__.py`** marks a directory as a package and can re-export names for a cleaner public API.
- Use **absolute imports** (`from mypackage.module import name`) as the default style.
- Use **relative imports** (`from .module import name`) inside packages when you want to reference sibling modules without hardcoding the package name.
- **Subpackages** let you create hierarchical structures for large projects — each subdirectory with its own `__init__.py`.
- **Namespace packages** (Python 3.3+) work without `__init__.py` but are only needed for specialized use cases.
- Define **`__all__`** in `__init__.py` to control what `from package import *` exports.
- **Organize by feature**, keep `__init__.py` lean, and separate tests from source code to build maintainable Python projects.
