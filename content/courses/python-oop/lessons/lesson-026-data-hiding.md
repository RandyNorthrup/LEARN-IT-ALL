---
id: data-hiding
title: Data Hiding and Information Hiding
chapterId: ch3-encapsulation
order: 26
duration: 16
objectives:
  - Master information hiding principles
  - Understand public interfaces vs implementation
  - Learn to hide complexity
---

# Data Hiding and Information Hiding

**Information hiding** means hiding implementation details and exposing only what's necessary through a **public interface**. This reduces coupling and allows internal changes without affecting external code.

## The Principle

```python
# External code should use your class WITHOUT knowing:
# - How data is stored internally
# - What algorithms are used
# - What data structures are chosen
# - Implementation details

# External code should ONLY know:
# - What operations are available
# - What inputs they take
# - What outputs they return
# - What the contract/behavior is
```

## Bad Example: Exposed Implementation

```python
# ❌ Implementation exposed - tight coupling
class UserDatabase:
    def __init__(self):
        self.users = []  # Public list - anyone can modify!
    
    def add_user(self, user):
        self.users.append(user)

# External code depends on implementation
db = UserDatabase()
db.users.append("Alice")  # Direct access - bad!
db.users[0] = "Bob"       # Can modify - bad!

# What if we want to switch to a dictionary?
# All external code breaks!
```

## Good Example: Hidden Implementation

```python
# ✅ Implementation hidden - loose coupling
class UserDatabase:
    def __init__(self):
        self._users = []  # Private - implementation detail
    
    def add_user(self, user):
        """Public interface."""
        self._users.append(user)
    
    def get_user(self, index):
        """Public interface."""
        if 0 <= index < len(self._users):
            return self._users[index]
        return None
    
    def user_count(self):
        """Public interface."""
        return len(self._users)

# External code uses interface only
db = UserDatabase()
db.add_user("Alice")
user = db.get_user(0)
count = db.user_count()

# Implementation can change (list → dict) without breaking external code!
```

## Information Hiding Levels

### Level 1: Hide Data Structures

```python
class ShoppingCart:
    def __init__(self):
        # Hide the fact that we use a dictionary
        self._items = {}  # {product_id: quantity}
    
    def add_item(self, product_id, quantity=1):
        """Public interface - implementation hidden."""
        if product_id in self._items:
            self._items[product_id] += quantity
        else:
            self._items[product_id] = quantity
    
    def remove_item(self, product_id):
        """Public interface."""
        if product_id in self._items:
            del self._items[product_id]
    
    def get_quantity(self, product_id):
        """Public interface."""
        return self._items.get(product_id, 0)

# External code doesn't know about the dict
cart = ShoppingCart()
cart.add_item("laptop", 1)
cart.add_item("mouse", 2)
```

### Level 2: Hide Algorithms

```python
class PasswordValidator:
    def __init__(self):
        # Hide validation rules
        self._min_length = 8
        self._require_uppercase = True
        self._require_digit = True
    
    def validate(self, password):
        """Public interface - algorithm hidden."""
        return self._check_length(password) and \
               self._check_uppercase(password) and \
               self._check_digit(password)
    
    def _check_length(self, password):
        """Private - implementation detail."""
        return len(password) >= self._min_length
    
    def _check_uppercase(self, password):
        """Private - implementation detail."""
        return any(c.isupper() for c in password)
    
    def _check_digit(self, password):
        """Private - implementation detail."""
        return any(c.isdigit() for c in password)

# External code just validates - doesn't know rules
validator = PasswordValidator()
is_valid = validator.validate("MyPass123")
```

### Level 3: Hide External Dependencies

```python
class EmailService:
    def __init__(self):
        # Hide the email library being used
        import smtplib
        self._smtp = smtplib.SMTP('localhost')
    
    def send_email(self, to, subject, body):
        """Public interface - library hidden."""
        message = self._format_message(to, subject, body)
        self._smtp.send_message(message)
    
    def _format_message(self, to, subject, body):
        """Private - formatting logic hidden."""
        from email.message import EmailMessage
        msg = EmailMessage()
        msg['To'] = to
        msg['Subject'] = subject
        msg.set_content(body)
        return msg

# External code doesn't know about smtplib
email_service = EmailService()
email_service.send_email("user@example.com", "Hello", "World")
```

## Real-World Example: Cache Implementation

```python
# ✅ Good - implementation completely hidden
class Cache:
    def __init__(self, max_size=100):
        self._max_size = max_size
        self._data = {}
        self._access_order = []  # Track LRU
    
    def get(self, key):
        """Public interface."""
        if key in self._data:
            self._update_access(key)
            return self._data[key]
        return None
    
    def set(self, key, value):
        """Public interface."""
        if key in self._data:
            self._data[key] = value
            self._update_access(key)
        else:
            self._add_new(key, value)
    
    def _update_access(self, key):
        """Private - LRU tracking hidden."""
        if key in self._access_order:
            self._access_order.remove(key)
        self._access_order.append(key)
    
    def _add_new(self, key, value):
        """Private - eviction logic hidden."""
        if len(self._data) >= self._max_size:
            oldest = self._access_order.pop(0)
            del self._data[oldest]
        
        self._data[key] = value
        self._access_order.append(key)

# External code uses simple interface
cache = Cache(max_size=3)
cache.set("a", 1)
cache.set("b", 2)
cache.set("c", 3)
cache.set("d", 4)  # Evicts "a" (LRU)

# Implementation can change (LRU → LFU) without affecting external code
```

## Benefits of Information Hiding

### 1. Flexibility to Change Implementation

```python
# Version 1: List implementation
class TaskManager:
    def __init__(self):
        self._tasks = []  # List
    
    def add_task(self, task):
        self._tasks.append(task)
    
    def get_pending_tasks(self):
        return [t for t in self._tasks if not t.completed]

# Version 2: Dictionary implementation (no external code breaks!)
class TaskManager:
    def __init__(self):
        self._tasks = {}  # Changed to dict!
    
    def add_task(self, task):
        self._tasks[task.id] = task
    
    def get_pending_tasks(self):
        return [t for t in self._tasks.values() if not t.completed]

# External code stays the same!
manager = TaskManager()
manager.add_task(task)
pending = manager.get_pending_tasks()
```

### 2. Reduced Complexity

```python
# ✅ Complex logic hidden behind simple interface
class ReportGenerator:
    def generate_report(self, data):
        """Simple interface for complex operation."""
        cleaned = self._clean_data(data)
        validated = self._validate_data(cleaned)
        transformed = self._transform_data(validated)
        formatted = self._format_report(transformed)
        return formatted
    
    def _clean_data(self, data):
        """Hidden complexity."""
        # 50 lines of data cleaning
        pass
    
    def _validate_data(self, data):
        """Hidden complexity."""
        # 30 lines of validation
        pass
    
    def _transform_data(self, data):
        """Hidden complexity."""
        # 40 lines of transformation
        pass
    
    def _format_report(self, data):
        """Hidden complexity."""
        # 60 lines of formatting
        pass

# External code: simple!
generator = ReportGenerator()
report = generator.generate_report(raw_data)
```

### 3. Better Testing

```python
class PaymentProcessor:
    def __init__(self):
        self._payment_gateway = self._create_gateway()
    
    def process_payment(self, amount):
        """Public interface - easy to test."""
        validated = self._validate_amount(amount)
        return self._payment_gateway.charge(validated)
    
    def _validate_amount(self, amount):
        """Private - can be changed without affecting tests."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        return amount
    
    def _create_gateway(self):
        """Private - can be mocked in tests."""
        # Hide gateway implementation
        pass
```

## Public Interface Design

### What to Expose (Public)

```python
class BankAccount:
    """Public interface - what external code should use."""
    
    def deposit(self, amount):
        """✅ Public - core functionality."""
        pass
    
    def withdraw(self, amount):
        """✅ Public - core functionality."""
        pass
    
    def get_balance(self):
        """✅ Public - important information."""
        pass
    
    def get_statement(self, start_date, end_date):
        """✅ Public - useful feature."""
        pass
```

### What to Hide (Private)

```python
class BankAccount:
    """Private implementation - internal details."""
    
    def _validate_amount(self, amount):
        """❌ Private - validation logic."""
        pass
    
    def _log_transaction(self, transaction):
        """❌ Private - internal bookkeeping."""
        pass
    
    def _calculate_interest(self):
        """❌ Private - internal calculation."""
        pass
    
    def _check_fraud(self, transaction):
        """❌ Private - security logic."""
        pass
```

## Real-World Example: Database Connection Pool

```python
class ConnectionPool:
    """Hides complex connection management."""
    
    def __init__(self, max_connections=10):
        self._max_connections = max_connections
        self._available = []
        self._in_use = set()
        self._connection_count = 0
    
    # PUBLIC INTERFACE
    def get_connection(self):
        """Get a connection from pool."""
        return self._acquire_connection()
    
    def return_connection(self, conn):
        """Return connection to pool."""
        self._release_connection(conn)
    
    # HIDDEN IMPLEMENTATION
    def _acquire_connection(self):
        """Private - acquisition logic hidden."""
        if self._available:
            conn = self._available.pop()
            self._in_use.add(conn)
            return conn
        elif self._connection_count < self._max_connections:
            conn = self._create_new_connection()
            self._in_use.add(conn)
            return conn
        else:
            raise RuntimeError("No connections available")
    
    def _release_connection(self, conn):
        """Private - release logic hidden."""
        if conn in self._in_use:
            self._in_use.remove(conn)
            if self._is_connection_valid(conn):
                self._available.append(conn)
            else:
                self._close_connection(conn)
                self._connection_count -= 1
    
    def _create_new_connection(self):
        """Private - connection creation hidden."""
        self._connection_count += 1
        # Create actual connection
        return object()  # Placeholder
    
    def _is_connection_valid(self, conn):
        """Private - validation logic hidden."""
        # Check if connection is still valid
        return True
    
    def _close_connection(self, conn):
        """Private - cleanup logic hidden."""
        # Close the connection
        pass

# External code uses simple interface
pool = ConnectionPool(max_connections=5)
conn = pool.get_connection()
# Use connection
pool.return_connection(conn)
```

## Information Hiding Anti-Patterns

### Anti-Pattern 1: Exposing Internal State

```python
# ❌ Bad - exposes internal list
class Queue:
    def __init__(self):
        self.items = []  # Public!
    
    def enqueue(self, item):
        self.items.append(item)

queue = Queue()
queue.items.clear()  # Oops! External code broke it

# ✅ Good - hides internal list
class Queue:
    def __init__(self):
        self._items = []  # Private
    
    def enqueue(self, item):
        self._items.append(item)
    
    def dequeue(self):
        return self._items.pop(0) if self._items else None
```

### Anti-Pattern 2: Exposing Too Many Methods

```python
# ❌ Bad - everything is public
class DataProcessor:
    def process(self, data):
        return self.step3(self.step2(self.step1(data)))
    
    def step1(self, data):  # Should be private!
        pass
    
    def step2(self, data):  # Should be private!
        pass
    
    def step3(self, data):  # Should be private!
        pass

# ✅ Good - only essential methods public
class DataProcessor:
    def process(self, data):
        return self._step3(self._step2(self._step1(data)))
    
    def _step1(self, data):  # Private
        pass
    
    def _step2(self, data):  # Private
        pass
    
    def _step3(self, data):  # Private
        pass
```

### Anti-Pattern 3: Leaky Abstractions

```python
# ❌ Bad - implementation details leak through
class FileStorage:
    def save(self, filename, data):
        with open(f"/var/data/{filename}", "w") as f:  # Path exposed!
            f.write(data)

# ✅ Good - implementation hidden
class FileStorage:
    def __init__(self):
        self._base_path = "/var/data"
    
    def save(self, filename, data):
        full_path = self._get_full_path(filename)
        self._write_file(full_path, data)
    
    def _get_full_path(self, filename):
        """Private - path logic hidden."""
        return f"{self._base_path}/{filename}"
    
    def _write_file(self, path, data):
        """Private - file operations hidden."""
        with open(path, "w") as f:
            f.write(data)
```

## Information Hiding Checklist

When designing a class:

- [ ] **Minimize public interface** - only expose what's necessary
- [ ] **Hide data structures** - don't expose lists, dicts, etc.
- [ ] **Hide algorithms** - implementation details should be private
- [ ] **Hide dependencies** - don't expose libraries you use
- [ ] **Use descriptive names** - public methods should be clear
- [ ] **Document public interface** - explain what, not how
- [ ] **Keep privates private** - use `_` prefix consistently
- [ ] **Validate inputs** - in public methods
- [ ] **Handle errors** - in public methods
- [ ] **Think about change** - can you change implementation later?

## Summary

**Information hiding** is about separating **what** a class does (public interface) from **how** it does it (private implementation). Mark implementation details as **private** using underscore prefix and expose only **essential operations** through public methods. This creates **loose coupling**, allowing internal changes without breaking external code. Hide **data structures**, **algorithms**, and **dependencies** to reduce complexity and improve maintainability. A well-designed public interface is **stable**, **minimal**, and **intuitive**, while the private implementation can **evolve freely**. Information hiding is the foundation of **encapsulation** and enables true **modularity** in software design.
