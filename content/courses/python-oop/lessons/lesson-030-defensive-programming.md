---
id: defensive-programming
title: Defensive Programming Techniques
chapterId: ch3-encapsulation
order: 30
duration: 16
objectives:
  - Master defensive programming principles
  - Learn to anticipate and prevent errors
  - Understand fail-safe design patterns
---

# Defensive Programming Techniques

**Defensive programming** means writing code that anticipates errors, validates inputs, and fails gracefully. Assume **anything that can go wrong will go wrong**, and protect against it.

## Core Principle: Never Trust Input

```python
# ❌ Trusting input - dangerous
def divide(a, b):
    return a / b  # What if b is 0?

# ✅ Defensive - validate input
def divide(a, b):
    if not isinstance(a, (int, float)):
        raise TypeError("a must be a number")
    if not isinstance(b, (int, float)):
        raise TypeError("b must be a number")
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

## Input Validation

### Validate Types

```python
class User:
    def __init__(self, name, age):
        # Validate types
        if not isinstance(name, str):
            raise TypeError("Name must be a string")
        if not isinstance(age, int):
            raise TypeError("Age must be an integer")
        
        # Validate values
        if not name.strip():
            raise ValueError("Name cannot be empty")
        if age < 0:
            raise ValueError("Age cannot be negative")
        
        self._name = name.strip()
        self._age = age

# Rejects invalid input early
# user = User(123, "25")  # TypeError!
# user = User("", 25)     # ValueError!
```

### Validate Ranges

```python
class Temperature:
    ABSOLUTE_ZERO = -273.15
    
    def __init__(self, celsius):
        if not isinstance(celsius, (int, float)):
            raise TypeError("Temperature must be a number")
        if celsius < self.ABSOLUTE_ZERO:
            raise ValueError(
                f"Temperature cannot be below absolute zero "
                f"({self.ABSOLUTE_ZERO}°C)"
            )
        self._celsius = celsius

# Prevents impossible values
temp = Temperature(25)      # ✅
# temp = Temperature(-300)  # ❌ ValueError
```

### Validate Formats

```python
import re

class EmailAddress:
    EMAIL_PATTERN = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    
    def __init__(self, email):
        if not isinstance(email, str):
            raise TypeError("Email must be a string")
        
        email = email.strip().lower()
        
        if not self.EMAIL_PATTERN.match(email):
            raise ValueError(f"Invalid email format: {email}")
        
        self._email = email

# Validates format
email = EmailAddress("user@example.com")  # ✅
# email = EmailAddress("invalid")         # ❌ ValueError
```

## Defensive Copying

### Problem: Mutable Arguments

```python
# ❌ Dangerous - external changes affect internal state
class Unsafe:
    def __init__(self, items):
        self._items = items  # Stores reference!

my_list = [1, 2, 3]
obj = Unsafe(my_list)

my_list.append(4)  # Modifies internal state!
# obj._items is now [1, 2, 3, 4]
```

### Solution: Defensive Copy

```python
# ✅ Safe - makes defensive copy
class Safe:
    def __init__(self, items):
        self._items = list(items)  # Creates copy!

my_list = [1, 2, 3]
obj = Safe(my_list)

my_list.append(4)  # External change
# obj._items is still [1, 2, 3] - protected!
```

### Defensive Copy on Return

```python
class TodoList:
    def __init__(self):
        self._items = []
    
    def add(self, item):
        self._items.append(item)
    
    def get_all(self):
        """Return copy to prevent external modification."""
        return self._items.copy()  # Defensive copy!

todos = TodoList()
todos.add("Task 1")

items = todos.get_all()
items.append("Task 2")  # Modifies copy, not internal list!
```

## Null/None Checks

```python
class UserService:
    def send_email(self, user, message):
        """Defensive checks for None."""
        if user is None:
            raise ValueError("User cannot be None")
        if message is None:
            raise ValueError("Message cannot be None")
        if not hasattr(user, 'email'):
            raise ValueError("User must have email attribute")
        if not user.email:
            raise ValueError("User email cannot be empty")
        
        # Safe to proceed
        self._do_send_email(user.email, message)
    
    def _do_send_email(self, email, message):
        """Internal method - assumes validated inputs."""
        pass

service = UserService()
# service.send_email(None, "Hello")  # ❌ ValueError
```

## Boundary Checks

```python
class Array:
    def __init__(self, size):
        if size <= 0:
            raise ValueError("Size must be positive")
        self._data = [None] * size
    
    def get(self, index):
        """Defensive boundary check."""
        if not isinstance(index, int):
            raise TypeError("Index must be an integer")
        if index < 0 or index >= len(self._data):
            raise IndexError(
                f"Index {index} out of range [0, {len(self._data)})"
            )
        return self._data[index]
    
    def set(self, index, value):
        """Defensive boundary check."""
        if not isinstance(index, int):
            raise TypeError("Index must be an integer")
        if index < 0 or index >= len(self._data):
            raise IndexError(
                f"Index {index} out of range [0, {len(self._data)})"
            )
        self._data[index] = value

arr = Array(10)
arr.set(5, "value")  # ✅
# arr.set(10, "value")  # ❌ IndexError
```

## Fail-Safe Defaults

```python
class ServerConfig:
    """Use safe defaults for all optional parameters."""
    
    def __init__(
        self,
        host="localhost",           # Safe default
        port=8080,                  # Safe default
        timeout=30.0,               # Safe default
        max_connections=100,        # Safe default
        debug=False,                # Safe default (off)
        auto_reload=False           # Safe default (off)
    ):
        # Validate even with defaults
        if not isinstance(host, str) or not host:
            raise ValueError("Invalid host")
        if not 1 <= port <= 65535:
            raise ValueError("Port must be between 1 and 65535")
        if timeout <= 0:
            raise ValueError("Timeout must be positive")
        if max_connections <= 0:
            raise ValueError("Max connections must be positive")
        
        self.host = host
        self.port = port
        self.timeout = timeout
        self.max_connections = max_connections
        self.debug = debug
        self.auto_reload = auto_reload

# Can use without any configuration - safe defaults
config = ServerConfig()
```

## Assertions for Internal Checks

```python
class Stack:
    def __init__(self):
        self._items = []
    
    def push(self, item):
        self._items.append(item)
        # Assertion: verify internal consistency
        assert len(self._items) > 0, "Stack should not be empty after push"
    
    def pop(self):
        if self.is_empty():
            raise ValueError("Cannot pop from empty stack")
        item = self._items.pop()
        # Assertion: verify invariant
        assert len(self._items) >= 0, "Stack size should never be negative"
        return item
    
    def is_empty(self):
        return len(self._items) == 0

# Assertions catch internal logic errors during development
```

## Exception Handling

```python
class FileProcessor:
    def process_file(self, filename):
        """Defensive exception handling."""
        # Validate input
        if not filename:
            raise ValueError("Filename cannot be empty")
        
        try:
            with open(filename, 'r') as f:
                content = f.read()
        except FileNotFoundError:
            raise ValueError(f"File not found: {filename}")
        except PermissionError:
            raise ValueError(f"Permission denied: {filename}")
        except Exception as e:
            # Catch unexpected errors
            raise RuntimeError(f"Error reading file: {e}")
        
        # Process content
        try:
            result = self._process_content(content)
        except Exception as e:
            raise RuntimeError(f"Error processing content: {e}")
        
        return result
    
    def _process_content(self, content):
        """Internal processing."""
        return content.upper()

processor = FileProcessor()
# Handles errors gracefully with clear messages
```

## Real-World Example: Safe Database Connection

```python
from typing import Optional
import sqlite3

class DatabaseConnection:
    """Defensive database connection wrapper."""
    
    def __init__(self, database_path: str):
        # Validate input
        if not database_path:
            raise ValueError("Database path cannot be empty")
        if not isinstance(database_path, str):
            raise TypeError("Database path must be a string")
        
        self._database_path = database_path
        self._connection: Optional[sqlite3.Connection] = None
    
    def connect(self):
        """Connect with defensive error handling."""
        if self._connection is not None:
            # Already connected - defensive check
            return
        
        try:
            self._connection = sqlite3.connect(self._database_path)
        except sqlite3.Error as e:
            raise RuntimeError(f"Failed to connect to database: {e}")
    
    def execute(self, query: str, params: tuple = ()):
        """Execute query with defensive checks."""
        # Validate query
        if not query:
            raise ValueError("Query cannot be empty")
        if not isinstance(query, str):
            raise TypeError("Query must be a string")
        
        # Validate params
        if not isinstance(params, (tuple, list)):
            raise TypeError("Parameters must be tuple or list")
        
        # Defensive check: ensure connected
        if self._connection is None:
            raise RuntimeError("Not connected to database")
        
        try:
            cursor = self._connection.cursor()
            cursor.execute(query, params)
            self._connection.commit()
            return cursor.fetchall()
        except sqlite3.Error as e:
            # Rollback on error (fail-safe)
            self._connection.rollback()
            raise RuntimeError(f"Query execution failed: {e}")
    
    def close(self):
        """Close connection safely."""
        if self._connection is not None:
            try:
                self._connection.close()
            except sqlite3.Error as e:
                # Log error but don't raise (closing should be safe)
                print(f"Warning: Error closing connection: {e}")
            finally:
                self._connection = None
    
    def __enter__(self):
        """Context manager support."""
        self.connect()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Always close connection."""
        self.close()
        return False

# Usage with defensive safety
with DatabaseConnection("data.db") as db:
    results = db.execute("SELECT * FROM users WHERE age > ?", (18,))
# Connection always closed, even if errors occur
```

## Defensive Programming Checklist

### Input Validation

- [ ] **Validate types** - check `isinstance()`
- [ ] **Validate ranges** - check bounds
- [ ] **Validate formats** - check patterns/structure
- [ ] **Check for None** - handle null values
- [ ] **Validate empty** - check empty strings/collections
- [ ] **Normalize input** - strip whitespace, lowercase, etc.

### State Protection

- [ ] **Defensive copying** - copy mutable inputs
- [ ] **Immutable returns** - return copies, not internal state
- [ ] **Private attributes** - use `_` prefix
- [ ] **Property validation** - validate in setters
- [ ] **Maintain invariants** - check class invariants

### Error Handling

- [ ] **Try-except blocks** - handle expected errors
- [ ] **Clear error messages** - explain what went wrong
- [ ] **Specific exceptions** - raise appropriate exception types
- [ ] **Fail fast** - detect errors early
- [ ] **Cleanup resources** - use try-finally or context managers

### Fail-Safe Design

- [ ] **Safe defaults** - use sensible default values
- [ ] **Boundary checks** - validate array indices, ranges
- [ ] **Assertions** - verify internal consistency
- [ ] **Graceful degradation** - continue with reduced functionality
- [ ] **Logging** - log errors for debugging

## Common Defensive Patterns

### Pattern 1: Guard Clauses

```python
# ✅ Early returns with guard clauses
def process_user(user):
    # Guard clauses at the top
    if user is None:
        raise ValueError("User cannot be None")
    if not user.is_active:
        raise ValueError("User is not active")
    if not user.email:
        raise ValueError("User has no email")
    
    # Main logic - all validations passed
    send_email(user.email)
```

### Pattern 2: Safe Indexing

```python
# ✅ Safe dictionary/list access
def get_user_email(user_data):
    """Safely get email with default."""
    return user_data.get('email', 'no-email@example.com')

# ✅ Safe list access
def get_first_item(items):
    """Safely get first item."""
    return items[0] if items else None
```

### Pattern 3: Validation Functions

```python
# ✅ Reusable validation utilities
def require_positive(value, name):
    """Validate positive number."""
    if value <= 0:
        raise ValueError(f"{name} must be positive")

def require_non_empty(value, name):
    """Validate non-empty string."""
    if not value or not value.strip():
        raise ValueError(f"{name} cannot be empty")

class Product:
    def __init__(self, name, price):
        require_non_empty(name, "Name")
        require_positive(price, "Price")
        self._name = name
        self._price = price
```

## Summary

**Defensive programming** anticipates errors and protects against them through rigorous **input validation**, **boundary checks**, and **error handling**. Validate all inputs for **type**, **range**, and **format** before processing. Use **defensive copying** to protect internal state from external modification. Implement **guard clauses** to fail fast when preconditions aren't met. Provide **safe defaults** and **clear error messages** to guide users. Use **assertions** to verify internal consistency during development. Handle exceptions gracefully and **always clean up resources** using context managers or try-finally blocks. Remember: **assume nothing, validate everything, fail gracefully**. Defensive programming makes code **robust**, **reliable**, and **maintainable** by preventing errors before they cause problems.
