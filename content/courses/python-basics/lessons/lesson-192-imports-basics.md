---
id: lesson-192-imports-basics
title: "Import Statements and Module Basics"
chapterId: ch17-modules
order: 1
duration: 30
objectives:
  - Understand what modules are and why Python uses them
  - Use import, from...import, and import...as syntax correctly
  - Explain how Python finds modules using the module search path
  - Apply import best practices including proper ordering and avoiding circular imports
  - Import specific names versus entire modules and know when to use each approach
  - Work with common standard library modules in your programs
---

# Import Statements and Module Basics

As your Python programs grow beyond a single file, you need a way to organize code into reusable, logical pieces. That's exactly what modules provide. Every Python file you've ever written is already a module — and in this lesson, you'll learn how to harness that power to build well-structured programs.

## What Is a Module?

A **module** is simply a file containing Python code. It can define functions, classes, variables, and runnable code. The filename becomes the module name (minus the `.py` extension).

```python
# greetings.py — this file IS a module named "greetings"
def say_hello(name):
    return f"Hello, {name}!"

def say_goodbye(name):
    return f"Goodbye, {name}!"

DEFAULT_GREETING = "Hey there!"
```

Modules solve three fundamental problems:

1. **Code organization** — group related functionality together
2. **Code reuse** — write once, import anywhere
3. **Namespace management** — avoid naming collisions between different parts of your program

## The `import` Statement

The simplest way to use a module is the `import` statement:

```python
import math

print(math.pi)         # 3.141592653589793
print(math.sqrt(16))   # 4.0
print(math.ceil(3.2))  # 4
```

When you write `import math`, Python:

1. Searches for a module named `math`
2. Executes all the code in that module
3. Creates a **module object** and binds it to the name `math` in your current namespace

You access everything inside the module using **dot notation**: `math.pi`, `math.sqrt()`.

### Importing Multiple Modules

You can import multiple modules on separate lines (preferred) or on a single line:

```python
# Preferred — one import per line
import os
import sys
import math

# Valid but less readable
import os, sys, math
```

PEP 8 recommends one import per line for clarity and cleaner version control diffs.

## The `from...import` Syntax

When you only need specific items from a module, use `from...import`:

```python
from math import sqrt, pi, ceil

print(pi)         # 3.141592653589793
print(sqrt(16))   # 4.0
print(ceil(3.2))  # 4
```

Notice that you no longer need the `math.` prefix. The names `sqrt`, `pi`, and `ceil` are imported directly into your current namespace.

### Importing Everything with `*`

You *can* import all public names from a module:

```python
from math import *

print(sin(0))    # 0.0
print(cos(0))    # 1.0
print(factorial(5))  # 120
```

**Avoid this in production code.** Star imports pollute your namespace, make it unclear where names come from, and can cause silent name collisions:

```python
from math import *
from cmath import *  # Overwrites math's sqrt, log, etc.!

# Which sqrt is this? The real or complex version?
print(sqrt(4))
```

## The `import...as` Alias

You can rename a module or imported name using `as`:

```python
# Module alias — very common with long module names
import datetime as dt
import collections as col

today = dt.date.today()
counter = col.Counter("abracadabra")

# Name alias — useful to avoid collisions
from datetime import datetime as DateTime
from my_module import datetime as my_datetime
```

Some aliases are so conventional they're practically standard:

```python
import numpy as np          # Universal convention
import pandas as pd         # Universal convention
import matplotlib.pyplot as plt  # Universal convention
```

## Importing Specific Names vs. Entire Modules

Both approaches have their place. Here's when to use each:

```python
# Import the whole module when you use MANY items from it
import os
print(os.getcwd())
print(os.listdir("."))
print(os.path.exists("file.txt"))

# Import specific names when you use only a FEW items
from math import sqrt, pi
area = pi * sqrt(radius)
```

**Import the module** when:
- You use many functions/classes from it
- You want to make the origin of each name clear
- The module name is short and readable

**Import specific names** when:
- You use only one or two items
- The module name is long and would clutter your code
- You're in a performance-critical tight loop (avoids repeated attribute lookup)

## The Module Search Path

When you write `import something`, Python searches for the module in a specific order:

1. **The current directory** (or the directory of the script being run)
2. **PYTHONPATH** environment variable directories (if set)
3. **Installation-dependent default paths** (standard library, site-packages)

You can inspect the search path at runtime:

```python
import sys

for path in sys.path:
    print(path)
```

Typical output:

```
/home/user/my_project          # Current directory
/usr/lib/python3.12             # Standard library
/usr/lib/python3.12/lib-dynload
/home/user/.local/lib/python3.12/site-packages  # Third-party packages
```

### Modifying the Search Path

You can add directories to `sys.path` at runtime (though it's rarely the best approach):

```python
import sys

# Add a custom directory to the module search path
sys.path.insert(0, "/home/user/my_libraries")

# Now Python will search this directory first
import my_custom_module
```

A better approach is to use packages (covered in a later lesson) or set the `PYTHONPATH` environment variable.

## Importing from Subdirectories

If your project has this structure:

```
my_project/
├── main.py
└── utils/
    ├── __init__.py
    └── helpers.py
```

You can import from subdirectories using dot notation:

```python
# In main.py
from utils.helpers import format_name
from utils import helpers

# Or import the package itself
import utils.helpers
result = utils.helpers.format_name("alice")
```

The `__init__.py` file marks `utils/` as a **package** — a special kind of module that can contain other modules. We'll explore packages in depth later in this chapter.

## Common Standard Library Imports

Python includes a vast standard library. Here are the modules you'll use most often:

```python
# Mathematics
import math
print(math.gcd(24, 36))      # 12 — greatest common divisor

# Random numbers
import random
print(random.randint(1, 100)) # Random integer between 1 and 100

# Operating system interaction
import os
print(os.getcwd())            # Current working directory

# System-specific parameters
import sys
print(sys.version)             # Python version string

# Date and time
from datetime import datetime, timedelta
now = datetime.now()
tomorrow = now + timedelta(days=1)
print(f"Tomorrow: {tomorrow.strftime('%Y-%m-%d')}")

# JSON processing
import json
data = json.dumps({"name": "Alice", "age": 30})
print(data)  # '{"name": "Alice", "age": 30}'

# File path handling
from pathlib import Path
config = Path.home() / ".config" / "myapp" / "settings.json"
print(config)
```

## Import Best Practices

### Import Order (PEP 8)

Organize imports into three groups, separated by blank lines:

```python
# 1. Standard library imports
import os
import sys
from datetime import datetime

# 2. Third-party library imports
import requests
import numpy as np
from flask import Flask

# 3. Local application imports
from myapp.models import User
from myapp.utils import validate_email
```

This convention makes it immediately clear where each dependency comes from.

### Keep Imports at the Top

Place all imports at the top of your file, right after module docstrings and comments:

```python
"""
User authentication module.

Handles login, logout, and session management.
"""

import hashlib
import secrets
from datetime import datetime, timedelta

from myapp.database import get_connection
from myapp.models import User
```

### Avoid Shadowing Built-in Names

Be careful not to overwrite Python's built-in names with imports:

```python
# BAD — shadows the built-in list type
from mymodule import list

# GOOD — use an alias instead
from mymodule import list as my_list
```

## Avoiding Circular Imports

A **circular import** occurs when two modules import each other:

```python
# module_a.py
from module_b import function_b

def function_a():
    return function_b() + " from A"

# module_b.py
from module_a import function_a  # Circular! This will fail

def function_b():
    return function_a() + " from B"
```

This raises an `ImportError` because Python can't finish loading one module before the other needs it. Solutions:

```python
# Solution 1: Move the import inside the function
# module_b.py
def function_b():
    from module_a import function_a  # Import when needed
    return function_a() + " from B"

# Solution 2: Restructure your code
# Put shared code in a third module that both can import
# shared.py
def shared_function():
    return "shared logic"
```

## The `__all__` List

A module can define `__all__` to control what gets exported with `from module import *`:

```python
# mymodule.py
__all__ = ["public_function", "public_helper"]

def public_function():
    return "I'm public"

def public_helper():
    return "I'm also public"

def _private_helper():
    return "I'm private by convention"

def _internal_helper():
    return "I'm also private by convention"
```

When someone writes `from mymodule import *`, only `public_function` and `public_helper` are imported. The underscore-prefixed names are excluded by convention, and `__all__` makes this explicit.

## Try It Yourself

### Exercise 1: Module Explorer

Write a script that imports the `math` module and prints all available functions and constants:

```python
import math

# Print all public names in the math module
public_names = [name for name in dir(math) if not name.startswith("_")]
print(f"The math module has {len(public_names)} public names:\n")

for name in public_names:
    obj = getattr(math, name)
    if callable(obj):
        print(f"  Function: {name}()")
    else:
        print(f"  Constant: {name} = {obj}")
```

### Exercise 2: Import Styles

Rewrite this code three different ways — using `import`, `from...import`, and `import...as`:

```python
# Version 1: import module
import random
numbers = [random.randint(1, 50) for _ in range(10)]
picked = random.choice(numbers)
random.shuffle(numbers)

# Version 2: from...import
from random import randint, choice, shuffle
numbers = [randint(1, 50) for _ in range(10)]
picked = choice(numbers)
shuffle(numbers)

# Version 3: import...as
import random as rng
numbers = [rng.randint(1, 50) for _ in range(10)]
picked = rng.choice(numbers)
rng.shuffle(numbers)
```

### Exercise 3: Clean Import Organization

Take this messy import block and reorganize it following PEP 8 conventions:

```python
# BEFORE (messy)
from myapp.utils import helper
import json
import requests
import os
from datetime import datetime
from flask import Flask
from myapp.models import User
import sys

# AFTER (clean, PEP 8 compliant)
import json
import os
import sys
from datetime import datetime

import requests
from flask import Flask

from myapp.models import User
from myapp.utils import helper
```

## Key Takeaways

- A **module** is any `.py` file — it can define functions, classes, and variables that other files can use.
- Use `import module` to import entire modules and access contents via dot notation.
- Use `from module import name` to import specific names directly into your namespace.
- Use `import module as alias` to create shorter or clearer names for modules.
- **Avoid `from module import *`** in production code — it pollutes your namespace and hides where names come from.
- Python finds modules by searching `sys.path` — the current directory, PYTHONPATH, and installed packages.
- Follow PEP 8 import ordering: **standard library → third-party → local** with blank lines between groups.
- Circular imports happen when two modules import each other; fix them by restructuring or using deferred imports.
- The `__all__` list controls what gets exported during star imports.
