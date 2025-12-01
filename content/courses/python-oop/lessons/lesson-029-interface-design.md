---
id: interface-design
title: Interface Design and API Design
chapterId: ch3-encapsulation
order: 29
duration: 18
objectives:
  - Master public interface design principles
  - Learn API consistency patterns
  - Understand usability and intuitiveness
---

# Interface Design and API Design

A well-designed **interface** is the contract between your class and its users. Good **API design** makes code **intuitive**, **consistent**, and **hard to misuse**.

## What Is an Interface?

```python
# The INTERFACE is what users see and use
class Stack:
    # PUBLIC INTERFACE - what users interact with
    def push(self, item):
        """Add item to stack."""
        pass
    
    def pop(self):
        """Remove and return top item."""
        pass
    
    def peek(self):
        """View top item without removing."""
        pass
    
    def is_empty(self):
        """Check if stack is empty."""
        pass
    
    # PRIVATE IMPLEMENTATION - hidden from users
    def _resize(self):
        """Internal resizing logic."""
        pass
```

## Principles of Good Interface Design

### 1. Make It Intuitive

```python
# ✅ Good - intuitive naming
class ShoppingCart:
    def add_item(self, product, quantity=1):
        """Clear what this does."""
        pass
    
    def remove_item(self, product_id):
        """Clear what this does."""
        pass
    
    def get_total(self):
        """Clear what this returns."""
        pass

# ❌ Bad - confusing naming
class ShoppingCart:
    def put(self, p, q=1):  # What does this do?
        pass
    
    def del(self, i):  # Delete what?
        pass
    
    def calc(self):  # Calculate what?
        pass
```

### 2. Be Consistent

```python
# ✅ Good - consistent naming patterns
class UserRepository:
    def get_user(self, user_id):
        """Get single user."""
        pass
    
    def get_users(self):
        """Get all users."""
        pass
    
    def create_user(self, data):
        """Create new user."""
        pass
    
    def update_user(self, user_id, data):
        """Update existing user."""
        pass
    
    def delete_user(self, user_id):
        """Delete user."""
        pass

# ❌ Bad - inconsistent naming
class UserRepository:
    def get_user(self, user_id):  # get_
        pass
    
    def fetch_users(self):  # fetch_?
        pass
    
    def make_user(self, data):  # make_?
        pass
    
    def user_update(self, user_id, data):  # Different order!
        pass
    
    def remove(self, user_id):  # remove instead of delete?
        pass
```

### 3. Minimize Surface Area

```python
# ✅ Good - small, focused interface
class EmailSender:
    def send(self, to, subject, body):
        """Simple, focused interface."""
        message = self._create_message(to, subject, body)
        self._send_message(message)
    
    def _create_message(self, to, subject, body):
        """Private - implementation detail."""
        pass
    
    def _send_message(self, message):
        """Private - implementation detail."""
        pass

# ❌ Bad - exposes too much
class EmailSender:
    def send(self, to, subject, body):
        pass
    
    def create_message(self, to, subject, body):  # Why expose this?
        pass
    
    def send_message(self, message):  # And this?
        pass
    
    def connect_smtp(self):  # And this?
        pass
    
    def disconnect_smtp(self):  # Too much exposed!
        pass
```

### 4. Make Misuse Difficult

```python
# ✅ Good - hard to misuse
class BankAccount:
    def deposit(self, amount):
        """Validates amount - can't deposit negative."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
    
    def withdraw(self, amount):
        """Validates amount and balance."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount

# ❌ Bad - easy to misuse
class BankAccount:
    def change_balance(self, amount):
        """No validation - can do anything!"""
        self._balance += amount  # Can add negative!
```

## Designing Method Signatures

### Clear Parameter Names

```python
# ✅ Good - clear parameter names
def create_user(username, email, age, is_active=True):
    pass

# Called clearly
create_user(
    username="alice",
    email="alice@example.com",
    age=25,
    is_active=True
)

# ❌ Bad - unclear parameters
def create_user(u, e, a, ia=True):
    pass

# What do these mean?
create_user("alice", "alice@example.com", 25, True)
```

### Required vs Optional Parameters

```python
# ✅ Good - required first, optional with defaults
class ServerConfig:
    def __init__(self, host, port=8080, timeout=30.0, debug=False):
        self.host = host        # Required - no default
        self.port = port        # Optional - has default
        self.timeout = timeout  # Optional - has default
        self.debug = debug      # Optional - has default

# Clear what's required
config = ServerConfig("localhost")
config = ServerConfig("localhost", port=9000)

# ❌ Bad - all required, unclear which are important
class ServerConfig:
    def __init__(self, host, port, timeout, debug):
        pass

# Unclear what can be omitted
config = ServerConfig("localhost", 8080, 30.0, False)
```

### Return Values

```python
# ✅ Good - predictable return types
class UserRepository:
    def get_user(self, user_id) -> Optional[User]:
        """Returns User or None if not found."""
        pass
    
    def get_users(self) -> List[User]:
        """Returns list (empty if none)."""
        pass
    
    def create_user(self, data) -> User:
        """Returns created user."""
        pass

# ❌ Bad - inconsistent returns
class UserRepository:
    def get_user(self, user_id):
        """Returns User, None, or raises exception?"""
        pass
    
    def get_users(self):
        """Returns list, or None if empty?"""
        pass
    
    def create_user(self, data):
        """Returns user, user_id, or True?"""
        pass
```

## Interface Patterns

### Pattern 1: Builder Pattern (Fluent Interface)

```python
# ✅ Fluent interface - method chaining
class QueryBuilder:
    def __init__(self):
        self._table = None
        self._columns = []
        self._conditions = []
    
    def select(self, *columns):
        """Returns self for chaining."""
        self._columns = columns
        return self
    
    def from_table(self, table):
        """Returns self for chaining."""
        self._table = table
        return self
    
    def where(self, condition):
        """Returns self for chaining."""
        self._conditions.append(condition)
        return self
    
    def build(self):
        """Final method returns result."""
        query = f"SELECT {', '.join(self._columns)} FROM {self._table}"
        if self._conditions:
            query += f" WHERE {' AND '.join(self._conditions)}"
        return query

# Beautiful chaining
query = (QueryBuilder()
    .select("name", "email")
    .from_table("users")
    .where("age > 18")
    .where("is_active = true")
    .build())
```

### Pattern 2: Context Manager

```python
# ✅ Context manager interface
class DatabaseConnection:
    def __init__(self, connection_string):
        self.connection_string = connection_string
        self.connection = None
    
    def __enter__(self):
        """Called when entering 'with' block."""
        self.connection = self._connect()
        return self.connection
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Called when exiting 'with' block."""
        if self.connection:
            self.connection.close()
        return False
    
    def _connect(self):
        """Private - implementation detail."""
        # Create connection
        return object()

# Clean interface for resource management
with DatabaseConnection("localhost") as conn:
    # Use connection
    pass
# Connection automatically closed
```

### Pattern 3: Iterator Interface

```python
# ✅ Iterator interface
class PagedResults:
    def __init__(self, items, page_size=10):
        self.items = items
        self.page_size = page_size
        self.current_page = 0
    
    def __iter__(self):
        """Return iterator."""
        return self
    
    def __next__(self):
        """Get next page."""
        start = self.current_page * self.page_size
        end = start + self.page_size
        
        if start >= len(self.items):
            raise StopIteration
        
        page = self.items[start:end]
        self.current_page += 1
        return page

# Clean iteration interface
results = PagedResults(range(100), page_size=10)
for page in results:
    print(f"Page: {page}")
```

## Real-World Example: File Storage API

```python
from typing import Optional, List
from pathlib import Path

class FileStorage:
    """
    Simple file storage API.
    
    Interface Design Goals:
    - Intuitive method names
    - Consistent parameter order
    - Clear return types
    - Hard to misuse
    - Minimal surface area
    """
    
    def __init__(self, base_directory: str):
        """
        Initialize storage.
        
        Args:
            base_directory: Root directory for storage
        
        Raises:
            ValueError: If directory doesn't exist
        """
        self._base = Path(base_directory)
        if not self._base.exists():
            raise ValueError(f"Directory not found: {base_directory}")
    
    # PUBLIC INTERFACE - What users interact with
    
    def save(self, filename: str, content: str) -> bool:
        """
        Save content to file.
        
        Args:
            filename: Name of file to save
            content: Content to write
        
        Returns:
            True if successful
        
        Raises:
            ValueError: If filename is invalid
        """
        self._validate_filename(filename)
        path = self._get_path(filename)
        path.write_text(content)
        return True
    
    def load(self, filename: str) -> Optional[str]:
        """
        Load content from file.
        
        Args:
            filename: Name of file to load
        
        Returns:
            File content, or None if not found
        """
        self._validate_filename(filename)
        path = self._get_path(filename)
        
        if not path.exists():
            return None
        
        return path.read_text()
    
    def delete(self, filename: str) -> bool:
        """
        Delete file.
        
        Args:
            filename: Name of file to delete
        
        Returns:
            True if deleted, False if not found
        """
        self._validate_filename(filename)
        path = self._get_path(filename)
        
        if not path.exists():
            return False
        
        path.unlink()
        return True
    
    def exists(self, filename: str) -> bool:
        """
        Check if file exists.
        
        Args:
            filename: Name of file to check
        
        Returns:
            True if file exists
        """
        self._validate_filename(filename)
        path = self._get_path(filename)
        return path.exists()
    
    def list_files(self) -> List[str]:
        """
        List all files.
        
        Returns:
            List of filenames (empty if none)
        """
        return [f.name for f in self._base.glob("*") if f.is_file()]
    
    # PRIVATE IMPLEMENTATION - Hidden from users
    
    def _validate_filename(self, filename: str) -> None:
        """Validate filename (private)."""
        if not filename or "/" in filename or "\\" in filename:
            raise ValueError("Invalid filename")
    
    def _get_path(self, filename: str) -> Path:
        """Get full path (private)."""
        return self._base / filename

# CLEAN, INTUITIVE INTERFACE
storage = FileStorage("/tmp/storage")

# Save
storage.save("data.txt", "Hello, World!")

# Load
content = storage.load("data.txt")

# Check existence
if storage.exists("data.txt"):
    print("File exists")

# List
files = storage.list_files()

# Delete
storage.delete("data.txt")
```

## API Design Checklist

### Method Design

- [ ] **Clear names** - verbs for actions, nouns for queries
- [ ] **Consistent naming** - use same patterns throughout
- [ ] **Required parameters first** - optional parameters last
- [ ] **Sensible defaults** - for optional parameters
- [ ] **Clear return types** - document what's returned
- [ ] **Handle errors** - validate inputs, raise clear exceptions

### Interface Design

- [ ] **Minimal surface** - only expose what's necessary
- [ ] **Intuitive** - users should guess correctly
- [ ] **Consistent** - similar operations work similarly
- [ ] **Hard to misuse** - validate and prevent errors
- [ ] **Well documented** - explain purpose and usage
- [ ] **Type hints** - use type annotations

### Class Design

- [ ] **Single responsibility** - class has one clear purpose
- [ ] **Cohesive** - methods work together logically
- [ ] **Loosely coupled** - minimal dependencies
- [ ] **Stable interface** - changes don't break users
- [ ] **Private implementation** - hide internal details

## Common API Design Mistakes

### Mistake 1: Exposing Implementation

```python
# ❌ Bad - exposes internal list
class TodoList:
    def __init__(self):
        self.items = []  # Public!

# ✅ Good - hides implementation
class TodoList:
    def __init__(self):
        self._items = []
    
    def add(self, item):
        self._items.append(item)
    
    def get_all(self):
        return self._items.copy()
```

### Mistake 2: Inconsistent Naming

```python
# ❌ Bad - inconsistent
class UserService:
    def get_user(self, id):
        pass
    
    def fetch_all_users(self):  # get_ vs fetch_?
        pass
    
    def make_user(self, data):  # make_ vs create_?
        pass

# ✅ Good - consistent
class UserService:
    def get_user(self, id):
        pass
    
    def get_all_users(self):
        pass
    
    def create_user(self, data):
        pass
```

### Mistake 3: Too Many Parameters

```python
# ❌ Bad - too many parameters
def create_user(username, email, first_name, last_name, age, 
                country, city, address, phone, bio):
    pass

# ✅ Good - use data object
class UserData:
    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.profile = {}

def create_user(data: UserData):
    pass
```

## Summary

Good **API design** makes interfaces **intuitive**, **consistent**, and **hard to misuse**. Use **clear, descriptive names** for methods and parameters, following consistent patterns throughout your codebase. Keep the **public interface minimal**—expose only what users need, hide implementation details. Design methods to **fail fast** with clear error messages when misused. Use **type hints** and **comprehensive docstrings** to document behavior. Make similar operations work similarly to leverage users' **existing knowledge**. Consider **common patterns** like builders, context managers, and iterators for familiar interfaces. A well-designed API is **stable** (changes don't break users), **discoverable** (easy to learn), and **pleasant to use** (code reads naturally). Invest time in interface design—it's the contract with your users and the hardest thing to change later.
