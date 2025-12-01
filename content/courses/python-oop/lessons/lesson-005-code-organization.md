---
id: code-organization
title: Code Organization and Project Structure
chapterId: ch1-clean-code
order: 5
duration: 16
objectives:
  - Learn how to organize code into logical modules
  - Understand project structure best practices
  - Master file and directory organization
---

# Code Organization and Project Structure

Well-organized code is easier to navigate, maintain, and scale. Good organization is like a well-organized library—everything has its place.

## Why Organization Matters

```python
# ❌ Bad: Everything in one giant file (app.py - 2000 lines)
class User:
    pass

class Order:
    pass

class Product:
    pass

def send_email():
    pass

def process_payment():
    pass

# ... 1990 more lines ...

# ✅ Good: Organized into modules
# models/user.py
# models/order.py
# models/product.py
# utils/email.py
# services/payment.py
```

## Project Structure

### Standard Python Project Layout

```
my_project/
├── src/
│   ├── __init__.py
│   ├── main.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── product.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   └── payment.py
│   └── utils/
│       ├── __init__.py
│       ├── validation.py
│       └── formatting.py
├── tests/
│   ├── test_models.py
│   └── test_services.py
├── docs/
├── requirements.txt
└── README.md
```

## Organizing by Feature

Group related code together by functionality.

```python
# ✅ Good: Feature-based organization
ecommerce/
├── users/
│   ├── models.py      # User model
│   ├── services.py    # User operations
│   └── validation.py  # User validation
├── orders/
│   ├── models.py      # Order model
│   ├── services.py    # Order processing
│   └── notifications.py
└── products/
    ├── models.py      # Product model
    ├── inventory.py   # Stock management
    └── pricing.py     # Price calculations
```

## Module Organization

### Keep Related Code Together

```python
# user.py - All user-related code
class User:
    """User model."""
    pass

def create_user(name, email):
    """Create new user."""
    pass

def validate_email(email):
    """Validate email format."""
    pass

class UserNotFoundError(Exception):
    """Raised when user doesn't exist."""
    pass
```

### Separate Concerns

```python
# ❌ Bad: Mixed concerns in one file
# database.py
class Database:
    pass

def send_email():  # Email doesn't belong here
    pass

# ✅ Good: Separate files
# database.py
class Database:
    pass

# email.py
def send_email():
    pass
```

## Import Organization

### Group and Order Imports

```python
# ✅ Good: Organized imports
# 1. Standard library
import os
import sys
from datetime import datetime

# 2. Third-party packages
import requests
from flask import Flask

# 3. Local application imports
from models.user import User
from utils.validation import validate_email
```

### Avoid Circular Imports

```python
# ❌ Bad: Circular dependency
# user.py
from order import Order

class User:
    def get_orders(self):
        return Order.find_by_user(self.id)

# order.py
from user import User

class Order:
    def get_user(self):
        return User.find_by_id(self.user_id)

# ✅ Good: Break the cycle
# user.py
class User:
    def get_orders(self):
        from order import Order  # Import inside method
        return Order.find_by_user(self.id)

# order.py
class Order:
    def get_user(self):
        from user import User
        return User.find_by_id(self.user_id)
```

## Class Organization

### Logical Order Within Classes

```python
class User:
    """User account model."""
    
    # 1. Class constants
    MAX_LOGIN_ATTEMPTS = 3
    PASSWORD_MIN_LENGTH = 8
    
    # 2. Constructor
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self._password_hash = None
    
    # 3. Public methods
    def set_password(self, password):
        """Set user password."""
        self._password_hash = self._hash_password(password)
    
    def verify_password(self, password):
        """Check if password is correct."""
        return self._verify_hash(password, self._password_hash)
    
    # 4. Private helper methods
    def _hash_password(self, password):
        """Hash password (private)."""
        pass
    
    def _verify_hash(self, password, hash_value):
        """Verify password hash (private)."""
        pass
    
    # 5. Special methods
    def __str__(self):
        return f"User({self.name})"
    
    def __repr__(self):
        return f"User(name='{self.name}', email='{self.email}')"
```

## Configuration Management

### Separate Configuration from Code

```python
# ❌ Bad: Hardcoded config
class Database:
    def connect(self):
        conn = connect("postgresql://localhost/mydb")  # Hardcoded!

# ✅ Good: External configuration
# config.py
DATABASE_URL = "postgresql://localhost/mydb"
MAX_CONNECTIONS = 10
TIMEOUT_SECONDS = 30

# database.py
from config import DATABASE_URL, MAX_CONNECTIONS

class Database:
    def connect(self):
        conn = connect(DATABASE_URL)
```

## Avoid These Mistakes

### Don't Create Giant Files

```python
# ❌ Bad: 3000-line file
# app.py (too big!)

# ✅ Good: Split into modules
# main.py - Entry point (50 lines)
# models/ - Data models (200 lines total)
# services/ - Business logic (300 lines total)
# utils/ - Helpers (150 lines total)
```

### Don't Use Meaningless Names

```python
# ❌ Bad directory structure
project/
├── stuff/
├── things/
└── misc/

# ✅ Good directory structure
project/
├── models/
├── services/
└── utils/
```

## Summary

Organize code **by feature** to keep related functionality together, follow **standard project layouts** with clear directory structure, **group imports** logically (standard → third-party → local), organize classes with **public methods first** then private helpers, and **separate configuration** from code. Keep files focused and reasonably sized. Good organization makes codebases **easy to navigate and maintain**.
