---
id: lesson-197-modules-best-practices
title: "Module Best Practices and Patterns"
chapterId: ch17-modules
order: 6
duration: 25
objectives:
  - Apply PEP 8 import ordering conventions consistently
  - Identify and fix circular import problems in Python projects
  - Use common module patterns like registry, plugin, and configuration modules
  - Control a module's public interface using __all__ and naming conventions
  - Organize code effectively for medium to large Python projects
  - Evaluate trade-offs between different import styles and module designs
---

# Module Best Practices and Patterns

You now know how to create modules, build packages, and install third-party libraries. This final lesson in the chapter focuses on the **patterns and practices** that separate well-organized Python projects from tangled messes. These are the conventions professional Python developers follow every day.

## Import Ordering Conventions (PEP 8)

PEP 8, Python's style guide, defines a strict order for imports. Follow this in every file:

```python
# ┌─────────────────────────────────────────────────┐
# │  Group 1: Standard Library Imports              │
# └─────────────────────────────────────────────────┘
import os
import sys
from collections import defaultdict
from datetime import datetime, timedelta
from pathlib import Path

# ┌─────────────────────────────────────────────────┐
# │  Group 2: Third-Party Library Imports           │
# └─────────────────────────────────────────────────┘
import requests
import numpy as np
from flask import Flask, jsonify
from pydantic import BaseModel

# ┌─────────────────────────────────────────────────┐
# │  Group 3: Local Application/Library Imports     │
# └─────────────────────────────────────────────────┘
from myapp.models import User, Product
from myapp.utils import validate_email
from .helpers import format_output
```

Within each group, follow these sub-rules:

1. **`import` statements** come before `from...import` statements
2. **Alphabetize** within each sub-group
3. **One import per line** (don't combine modules on a single line)

```python
# GOOD — properly organized
import json
import os
import sys
from collections import Counter, defaultdict
from pathlib import Path

import pandas as pd
import requests

from myapp.core import config
from myapp.models import User

# BAD — disorganized
from myapp.models import User
import requests
import os
from pathlib import Path
import json
from collections import Counter, defaultdict
import sys
import pandas as pd
from myapp.core import config
```

The tool `isort` can automatically sort your imports to match PEP 8:

```bash
pip install isort
isort myfile.py    # Sorts imports automatically
```

## Avoiding Star Imports

The `from module import *` syntax is one of the most problematic patterns in Python:

```python
# BAD — star imports cause real-world problems
from os.path import *
from math import *
from json import *

# Which "log" is this? math.log? Or something else?
result = log(100)  # Ambiguous!

# If two modules define the same name, the last one wins silently
from module_a import *  # defines "process()"
from module_b import *  # also defines "process()" — silently overwrites!
```

### Why Star Imports Are Harmful

1. **Namespace pollution** — imports dozens or hundreds of names you don't need
2. **Name collisions** — later star imports silently overwrite earlier ones
3. **Readability** — impossible to tell where a name came from without checking every starred module
4. **Tooling** — linters and IDEs can't track where names originate

### The Right Alternative

Always import specific names:

```python
# GOOD — explicit is better than implicit
from math import sqrt, pi, log
from os.path import exists, join, dirname
from json import dumps, loads

# Now every name's origin is clear
result = log(100)      # Obviously math.log
path = join("a", "b")  # Obviously os.path.join
```

The **only acceptable use** of star imports is in `__init__.py` files to re-export a package's public API — and even then, the source module should define `__all__`:

```python
# mypackage/utils.py
__all__ = ["format_name", "validate_email"]

def format_name(name):
    return name.title()

def validate_email(email):
    return "@" in email

def _internal_helper():  # Not in __all__, won't be exported
    pass

# mypackage/__init__.py
from .utils import *  # Only imports format_name, validate_email
```

## Lazy Imports Pattern

Sometimes importing a module is expensive (it takes time to initialize). Lazy imports defer the cost until the module is actually needed:

```python
# EAGER import — module loads even if never used
import heavy_module  # Takes 2 seconds to import!

def rarely_used_feature():
    return heavy_module.process(data)

# LAZY import — module loads only when the function is called
def rarely_used_feature():
    import heavy_module  # Import happens here, only if called
    return heavy_module.process(data)
```

### When to Use Lazy Imports

```python
# Good use case: optional dependencies
def export_to_excel(data, filename):
    """Export data to Excel. Requires openpyxl."""
    try:
        import openpyxl
    except ImportError:
        raise ImportError(
            "The 'openpyxl' package is required for Excel export. "
            "Install it with: pip install openpyxl"
        )
    wb = openpyxl.Workbook()
    ws = wb.active
    for row in data:
        ws.append(row)
    wb.save(filename)


# Good use case: reducing startup time for CLI tools
def main():
    import argparse  # Only imported when actually running as CLI

    parser = argparse.ArgumentParser()
    parser.add_argument("--verbose", action="store_true")
    args = parser.parse_args()

    if args.verbose:
        import logging  # Only imported if verbose mode is requested
        logging.basicConfig(level=logging.DEBUG)
```

**Rule of thumb:** Keep imports at the top of the file by default. Use lazy imports only when there's a measurable benefit (startup time, optional dependencies).

## Circular Import Detection and Fixes

Circular imports occur when Module A imports Module B, and Module B imports Module A:

```python
# models.py
from services import save_user  # Imports services

def create_user(name):
    return {"name": name}

def save(user):
    save_user(user)


# services.py
from models import create_user  # Imports models — CIRCULAR!

def save_user(user):
    print(f"Saving {user['name']}")

def new_user(name):
    return create_user(name)
```

When Python tries to import `models`, it encounters `from services import save_user`, so it starts importing `services`. But `services` tries to `from models import User`, and `models` isn't fully loaded yet — boom, `ImportError`.

### Fix 1: Move Import Inside the Function

```python
# services.py — import inside the function that needs it
def new_user(name):
    from models import create_user  # Import deferred until function is called
    return create_user(name)

def save_user(user):
    print(f"Saving {user['name']}")
```

### Fix 2: Restructure with a Third Module

```python
# shared.py — shared data definitions
from collections import namedtuple

User = namedtuple("User", ["name"])

# models.py — no longer imports services directly
from shared import User

def save(user):
    from services import save_user  # Import deferred until needed
    save_user(user)

# services.py — imports only shared definitions
from shared import User

def save_user(user):
    print(f"Saving {user.name}")
```

### Fix 3: Use TYPE_CHECKING for Type Hints

When circular imports exist only for type annotations:

```python
from __future__ import annotations
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    # This block only runs during type checking, not at runtime
    from models import User

def process_user(user: "User") -> None:
    print(f"Processing {user.name}")
```

### How to Detect Circular Imports

Warning signs:
- `ImportError: cannot import name 'X' from partially initialized module`
- `AttributeError: module 'X' has no attribute 'Y'`
- Import works in one direction but not the other

Prevention:
- Keep module dependencies flowing in one direction (top-down)
- Models shouldn't import services, services import models
- Use dependency injection instead of direct imports

## Namespace Management

Keep your module's namespace clean and intentional:

```python
# utils.py — MESSY namespace
import os
import sys
import re
import json
from datetime import datetime

def process_data(data):
    ...

def format_output(result):
    ...

# When someone does dir(utils), they see:
# ['datetime', 'format_output', 'json', 'os', 'process_data', 're', 'sys']
# Those imported modules are cluttering the namespace!
```

```python
# utils.py — CLEAN namespace with __all__
import os
import sys
import re
import json
from datetime import datetime

__all__ = ["process_data", "format_output"]

def process_data(data):
    ...

def format_output(result):
    ...

# Now from utils import * only gets process_data and format_output
```

Use underscore prefixes for truly private module-level names:

```python
# _internal_cache = {}         # Private by convention
# _MAX_RETRIES = 3             # Private constant
# def _validate_input(data):   # Private helper function
```

## Module Design Principles

### Single Responsibility

Each module should have one clear purpose:

```python
# GOOD — clear, focused modules
# database.py — database connection and queries
# validators.py — input validation functions
# formatters.py — output formatting functions
# auth.py — authentication logic

# BAD — kitchen-sink module
# utils.py — database connections, validation, formatting,
#             authentication, email sending, PDF generation...
```

### Clear Public API

Define what your module exposes and stick to it:

```python
# user_service.py
"""User management operations."""

__all__ = ["create_user", "get_user", "update_user", "delete_user"]

# Public API
def create_user(name, email):
    """Create a new user."""
    _validate_email(email)
    user = _build_user_dict(name, email)
    _save_to_database(user)
    return user

def get_user(user_id):
    """Retrieve a user by ID."""
    return _query_database(user_id)

def update_user(user_id, **kwargs):
    """Update user fields."""
    user = get_user(user_id)
    user.update(kwargs)
    _save_to_database(user)
    return user

def delete_user(user_id):
    """Delete a user."""
    _remove_from_database(user_id)

# Private implementation details — not part of the public API
def _validate_email(email):
    if "@" not in email:
        raise ValueError(f"Invalid email: {email}")

def _build_user_dict(name, email):
    return {"name": name, "email": email, "created": datetime.now().isoformat()}

def _save_to_database(user):
    ...

def _query_database(user_id):
    ...

def _remove_from_database(user_id):
    ...
```

## Common Module Patterns

### The Registry Pattern

A registry module maintains a mapping of names to implementations:

```python
# registry.py
"""Plugin registry for data processors."""

_processors = {}

def register(name):
    """Decorator to register a data processor."""
    def decorator(func):
        _processors[name] = func
        return func
    return decorator

def get_processor(name):
    """Get a registered processor by name."""
    if name not in _processors:
        raise KeyError(f"No processor registered as '{name}'")
    return _processors[name]

def list_processors():
    """List all registered processor names."""
    return list(_processors.keys())
```

```python
# processors.py
from registry import register

@register("csv")
def process_csv(data):
    return data.split(",")

@register("json")
def process_json(data):
    import json
    return json.loads(data)

@register("uppercase")
def process_uppercase(data):
    return data.upper()
```

```python
# main.py
from registry import get_processor
import processors  # Triggers registration

handler = get_processor("csv")
result = handler("a,b,c")
print(result)  # ['a', 'b', 'c']
```

### The Configuration Module Pattern

A centralized configuration module that reads from environment variables with sensible defaults:

```python
# config.py
"""Application configuration loaded from environment variables."""

import os

# Server settings
HOST = os.environ.get("APP_HOST", "localhost")
PORT = int(os.environ.get("APP_PORT", "8000"))
DEBUG = os.environ.get("APP_DEBUG", "false").lower() == "true"

# Database
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///app.db")
DB_POOL_SIZE = int(os.environ.get("DB_POOL_SIZE", "5"))

# Security
SECRET_KEY = os.environ.get("SECRET_KEY", "change-me-in-production")
TOKEN_EXPIRY = int(os.environ.get("TOKEN_EXPIRY", "3600"))

def display():
    """Print current configuration (masking secrets)."""
    print(f"Host: {HOST}:{PORT}")
    print(f"Debug: {DEBUG}")
    print(f"Database: {DATABASE_URL}")
    print(f"Secret Key: {'*' * len(SECRET_KEY)}")
```

```python
# app.py
import config

print(f"Starting server on {config.HOST}:{config.PORT}")
if config.DEBUG:
    config.display()
```

### The Plugin Pattern

A module that dynamically discovers and loads plugins from a directory:

```python
# plugin_loader.py
"""Dynamically load plugins from a directory."""

import importlib
import pkgutil
from pathlib import Path

def load_plugins(package_name):
    """Import all modules in a package directory."""
    package = importlib.import_module(package_name)
    package_path = Path(package.__file__).parent

    plugins = {}
    for importer, modname, ispkg in pkgutil.iter_modules([str(package_path)]):
        module = importlib.import_module(f"{package_name}.{modname}")
        if hasattr(module, "register"):
            plugin_info = module.register()
            plugins[modname] = plugin_info
            print(f"  Loaded plugin: {modname}")

    return plugins
```

## Code Organization for Larger Projects

As projects grow, good organization becomes critical. Here's a proven structure:

```
my_project/
├── README.md
├── pyproject.toml              # Modern project configuration
├── requirements.txt            # Dependencies
├── .gitignore
│
├── src/                        # Source code
│   └── myapp/
│       ├── __init__.py
│       ├── __main__.py         # python -m myapp entry point
│       ├── cli.py              # Command-line interface
│       ├── config.py           # Configuration
│       │
│       ├── core/               # Core business logic
│       │   ├── __init__.py
│       │   ├── models.py
│       │   └── services.py
│       │
│       ├── api/                # API layer
│       │   ├── __init__.py
│       │   ├── routes.py
│       │   └── middleware.py
│       │
│       └── utils/              # Shared utilities
│           ├── __init__.py
│           ├── validators.py
│           └── formatters.py
│
├── tests/                      # Tests mirror src structure
│   ├── __init__.py
│   ├── test_models.py
│   ├── test_services.py
│   └── test_validators.py
│
└── docs/                       # Documentation
    └── usage.md
```

### Key Organization Principles

1. **Flat is better than nested** — Don't create deep hierarchies. Two to three levels of nesting is usually enough.

2. **Separate concerns** — Keep models, services, API routes, and utilities in separate modules.

3. **Import direction flows downward** — Higher-level modules import from lower-level ones, never the reverse.

```
cli.py  →  services.py  →  models.py
  ↓            ↓               ↓
api/     →  utils/       →  config.py
```

4. **Test structure mirrors source** — If you have `src/myapp/models.py`, your tests go in `tests/test_models.py`.

5. **`__init__.py` as the public face** — Use `__init__.py` to export the public API of each package. Internal modules can change without affecting users.

```python
# src/myapp/__init__.py
"""MyApp — a demonstration application."""

__version__ = "1.0.0"

from .core.models import User, Product
from .core.services import create_user, get_user

__all__ = ["User", "Product", "create_user", "get_user"]
```

## Try It Yourself

### Exercise 1: Organize Imports

Take the following messy imports and reorganize them according to PEP 8:

```python
# Before
from myapp.utils import helper
import json, os
from flask import Flask
import requests
from datetime import datetime
from myapp.models import User
import sys, re
import numpy as np
from collections import Counter

# After (try it yourself before looking!)
import json
import os
import re
import sys
from collections import Counter
from datetime import datetime

import numpy as np
import requests
from flask import Flask

from myapp.models import User
from myapp.utils import helper
```

### Exercise 2: Fix a Circular Import

Given these two files with a circular import, restructure them:

```python
# models.py
from formatters import format_user_display

def create_user(name, email):
    return {"name": name, "email": email}

def display_user(user):
    return format_user_display(user)

# formatters.py
from models import create_user  # CIRCULAR!

def format_user_display(user):
    return f"{user['name']} <{user['email']}>"

def create_default_user():
    return create_user("Guest", "guest@example.com")
```

### Exercise 3: Design a Module API

Create a module with a clear public API. Define `__all__`, use underscore prefixes for private helpers, include a module docstring, and add a `__main__` block with tests.

## Key Takeaways

- **Follow PEP 8 import ordering:** standard library, then third-party, then local — with blank lines between groups and alphabetical order within each group.
- **Never use star imports** (`from x import *`) in application code — they pollute namespaces and hide where names come from.
- **Lazy imports** defer expensive initialization until needed — useful for optional dependencies and reducing startup time.
- **Circular imports** are a design smell — fix them by restructuring code, moving imports into functions, or using `TYPE_CHECKING` for type-only imports.
- **Design modules with a single responsibility** and a clear public API defined by `__all__` and underscore naming conventions.
- **Common patterns** like registry, configuration, and plugin modules provide proven structures for organizing functionality.
- **For larger projects,** use a `src/` layout with packages grouped by feature, test files mirroring source structure, and import dependencies flowing in one direction.
- **Use tools** like `isort` (import sorting) and `black` (code formatting) to maintain consistent style automatically.
