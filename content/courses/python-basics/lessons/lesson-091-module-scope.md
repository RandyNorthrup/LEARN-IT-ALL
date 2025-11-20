---
id: "106-module-scope"
title: "Module-Level Scope and Imports"
chapterId: ch7-scope
order: 10
duration: 25
objectives:
  - Understand module-level scope
  - Master import mechanics and scope
  - Learn how modules create namespaces
  - Understand circular imports
---

# Module-Level Scope and Imports

Each Python file (module) creates its own namespace. Understanding module scope is essential for organizing larger programs.

## Module Basics

```python
# mymodule.py - A Python module
"""This is a module docstring."""

# Module-level variable (module scope)
MODULE_CONSTANT = 100
module_variable = "Accessible from module"

# Module-level function
def module_function():
    """Function at module level."""
    print("I'm a module function")
    print(f"Accessing MODULE_CONSTANT: {MODULE_CONSTANT}")

# Module-level class
class ModuleClass:
    """Class at module level."""
    pass

# Code at module level runs when imported
print("Module is being loaded")

# This runs when module is imported
_private_var = "Not meant to be imported"
```

## Importing Creates Namespace

```python
# main.py - Importing the module

# Import entire module
import mymodule

# Access via module namespace
print(mymodule.MODULE_CONSTANT)  # 100
print(mymodule.module_variable)  # "Accessible from module"
mymodule.module_function()

# Create instance of class
obj = mymodule.ModuleClass()

# Module is an object
print(type(mymodule))  # <class 'module'>
print(dir(mymodule))   # List all names in module

# Import with alias
import mymodule as mm

print(mm.MODULE_CONSTANT)  # 100
mm.module_function()
```

## Selective Imports

```python
# Import specific names
from mymodule import MODULE_CONSTANT, module_function

# Use without module prefix
print(MODULE_CONSTANT)  # 100
module_function()

# But other names not available
# print(module_variable)  # Error!

# Import with alias
from mymodule import module_function as func

func()  # Call with alias

# Import everything (not recommended)
from mymodule import *

# All public names now in current namespace
print(MODULE_CONSTANT)
print(module_variable)
module_function()
# Note: _private_var NOT imported (starts with _)
```

## Module Scope Rules

```python
# example.py

# Module-level variable
counter = 0

def increment():
    """Modifies module variable."""
    global counter  # Refers to module-level counter
    counter += 1

def get_counter():
    """Reads module variable."""
    return counter  # Can read without global

# Usage
increment()
increment()
print(get_counter())  # 2

# Another function accessing same variable
def reset():
    """Reset counter."""
    global counter
    counter = 0

reset()
print(get_counter())  # 0
```

## Module Variables Are Shared

```python
# config.py
settings = {
    'debug': True,
    'max_connections': 100
}

def get_setting(key):
    """Get configuration setting."""
    return settings.get(key)

def set_setting(key, value):
    """Update configuration."""
    settings[key] = value

# file1.py
import config

print(config.settings['debug'])  # True
config.set_setting('debug', False)

# file2.py
import config

print(config.settings['debug'])  # False (changed by file1!)
# Module variables are shared across all imports
```

## Import Mechanics

```python
# When you import a module:
import mymodule

# Python does:
# 1. Search for mymodule.py in sys.path
# 2. Execute module code top to bottom
# 3. Create module object
# 4. Store in sys.modules
# 5. Bind name 'mymodule' in current namespace

import sys

# Check if module loaded
if 'mymodule' in sys.modules:
    print("Module already loaded")

# Get module object
mod = sys.modules['mymodule']
print(mod.MODULE_CONSTANT)

# Modules loaded once, then cached
import mymodule  # Already loaded, uses cache
import mymodule  # Still uses cache
# Module code only runs once!
```

## Reloading Modules

```python
import importlib
import mymodule

# Make changes to mymodule.py...

# Reload module (for development only!)
importlib.reload(mymodule)

# Module code runs again with changes

# Note: Reloading complex - better to restart Python
```

## Circular Imports Problem

```python
# module_a.py
print("Loading module A")

import module_b  # Imports B

def func_a():
    print("Function A")
    module_b.func_b()

# module_b.py
print("Loading module B")

import module_a  # Imports A (circular!)

def func_b():
    print("Function B")
    module_a.func_a()

# main.py
import module_a  # May cause issues!

# Problem: A imports B, B imports A
# Python can handle some cases but may fail
```

## Solving Circular Imports

```python
# ✅ SOLUTION 1: Import at function level
# module_a.py
def func_a():
    import module_b  # Import when needed
    print("Function A")
    module_b.func_b()

# module_b.py
def func_b():
    import module_a  # Import when needed
    print("Function B")
    module_a.func_a()

# ✅ SOLUTION 2: Restructure code
# shared.py - Common code
def shared_func():
    print("Shared functionality")

# module_a.py
import shared

def func_a():
    print("Function A")
    shared.shared_func()

# module_b.py
import shared

def func_b():
    print("Function B")
    shared.shared_func()

# ✅ SOLUTION 3: Use dependency injection
# module_a.py
def func_a(callback):
    print("Function A")
    callback()

# module_b.py
import module_a

def func_b():
    print("Function B")

def use_module_a():
    module_a.func_a(func_b)  # Pass function as parameter
```

## Module Search Path

```python
import sys

# Modules searched in sys.path order
print("Module search path:")
for path in sys.path:
    print(f"  {path}")

# Add custom path
sys.path.append('/custom/module/path')

# Now can import from custom path
# import my_custom_module

# Current directory is first in path
# That's why you can import local modules
```

## __name__ and __main__

```python
# mymodule.py

def main_function():
    """Module's main functionality."""
    print("Running main function")

# Code that runs only when executed directly
if __name__ == '__main__':
    print("Module run directly")
    main_function()
else:
    print(f"Module imported, __name__ = {__name__}")

# When run directly: python mymodule.py
# __name__ == '__main__'
# Prints: "Module run directly"

# When imported: import mymodule
# __name__ == 'mymodule'
# Prints: "Module imported, __name__ = mymodule"
```

## Package Scope

```python
# mypackage/__init__.py
"""Package initialization."""

# Package-level variables
__version__ = '1.0.0'
__author__ = 'Developer'

# Import from submodules
from .submodule1 import func1
from .submodule2 import func2

# Make available at package level
__all__ = ['func1', 'func2', '__version__']

# mypackage/submodule1.py
def func1():
    print("Function from submodule1")

# mypackage/submodule2.py  
def func2():
    print("Function from submodule2")

# Usage
import mypackage

print(mypackage.__version__)  # 1.0.0
mypackage.func1()  # Function from submodule1
mypackage.func2()  # Function from submodule2
```

## Relative Imports

```python
# mypackage/
#   __init__.py
#   module_a.py
#   module_b.py
#   subpackage/
#     __init__.py
#     module_c.py

# mypackage/module_a.py
# Absolute import
from mypackage.module_b import some_function

# Relative import (within package)
from .module_b import some_function  # Same directory
from ..other_module import other_func  # Parent directory
from .subpackage.module_c import func  # Subdirectory

# mypackage/subpackage/module_c.py
# Import from parent package
from .. import module_a
from ..module_b import some_function

# Note: Relative imports only work within packages
# Can't use in scripts run directly
```

## Module Attributes

```python
# Every module has built-in attributes

# mymodule.py
print(f"Module name: {__name__}")
print(f"Module file: {__file__}")
print(f"Module docstring: {__doc__}")
print(f"Module package: {__package__}")

# Check if module has attribute
if hasattr(mymodule, 'some_function'):
    print("Has some_function")

# Get module attribute dynamically
func_name = 'module_function'
if hasattr(mymodule, func_name):
    func = getattr(mymodule, func_name)
    func()  # Call dynamically

# Set module attribute dynamically
setattr(mymodule, 'dynamic_var', 'Created at runtime')
print(mymodule.dynamic_var)
```

## Module Best Practices

```python
# ✅ GOOD - Clear module structure
# calculator.py
"""Calculator module for basic math operations."""

# Constants at top
PI = 3.14159
E = 2.71828

# Private helpers (prefixed with _)
def _validate_number(n):
    """Internal validation function."""
    if not isinstance(n, (int, float)):
        raise TypeError("Must be a number")

# Public functions
def add(a, b):
    """Add two numbers."""
    _validate_number(a)
    _validate_number(b)
    return a + b

def multiply(a, b):
    """Multiply two numbers."""
    _validate_number(a)
    _validate_number(b)
    return a * b

# Main block
if __name__ == '__main__':
    # Test code
    print(add(5, 3))
    print(multiply(4, 7))

# ✅ GOOD - Use __all__ to control exports
# mymodule.py
__all__ = ['public_func', 'PublicClass']

def public_func():
    """Exported by 'from mymodule import *'."""
    pass

def _private_func():
    """Not exported."""
    pass

class PublicClass:
    """Exported."""
    pass

class _PrivateClass:
    """Not exported."""
    pass
```

## Namespace Pollution

```python
# ❌ BAD - Pollutes namespace
from math import *

# What's in current namespace?
# sin, cos, tan, pi, e, ... (50+ names!)
print(sin(pi))  # Works but unclear where sin comes from

# ✅ GOOD - Explicit imports
from math import sin, pi

print(sin(pi))  # Clear that sin is from math

# ✅ BETTER - Keep namespace
import math

print(math.sin(math.pi))  # Very clear origin

# ❌ BAD - Naming conflicts
from module1 import func
from module2 import func  # Overwrites module1.func!

# ✅ GOOD - Use aliases
from module1 import func as func1
from module2 import func as func2

func1()
func2()
```

## Module Initialization

```python
# config_module.py
"""Module with initialization code."""

print("Initializing config module...")

# Load configuration on import
CONFIG = {
    'debug': False,
    'version': '1.0.0'
}

# Set up connections
_connection = None

def get_connection():
    """Get or create connection."""
    global _connection
    if _connection is None:
        print("Creating connection...")
        _connection = "Database connection"
    return _connection

# Initialize on import
get_connection()

print("Config module ready")

# When imported:
# import config_module
# Prints:
# Initializing config module...
# Creating connection...
# Config module ready
```

## Summary

**Module Scope:**
- Each module has its own namespace
- Module-level variables are global within module
- Modules loaded once, then cached

**Importing:**
```python
import module              # Full module
import module as alias     # With alias
from module import name    # Specific name
from module import *       # All public names (avoid)
```

**Module Attributes:**
- `__name__` - Module name or '__main__'
- `__file__` - Module file path
- `__doc__` - Module docstring
- `__all__` - Names exported by *

**Best Practices:**
- ✅ Use explicit imports
- ✅ Avoid `from module import *`
- ✅ Use `__all__` for public API
- ✅ Prefix private names with `_`
- ✅ Use `if __name__ == '__main__':`
- ✅ Avoid circular imports
- ✅ Keep modules focused and cohesive

**Common Patterns:**
```python
# Module with main
if __name__ == '__main__':
    main()

# Controlled exports
__all__ = ['public1', 'public2']

# Package initialization
from .submodule import func

# Avoid circular imports
# Import at function level or restructure
```

Understanding module scope is key to organizing larger Python projects!
