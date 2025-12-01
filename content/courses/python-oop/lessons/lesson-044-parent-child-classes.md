---
id: "044"
title: "Parent and Child Class Relationships"
chapterId: "05"
order: 2
duration: "16 minutes"
objectives:
  - "Master parent-child class initialization patterns"
  - "Understand how attributes are shared and overridden"
  - "Learn to properly manage state across inheritance hierarchy"
  - "Recognize common initialization pitfalls"
  - "Apply best practices for parent-child relationships"
---

# Parent and Child Class Relationships

Understanding how parent and child classes interact is crucial for effective inheritance. This lesson explores initialization, state management, and the nuances of parent-child relationships.

## Introduction

When a child class inherits from a parent, they share a special relationship. The child has access to everything in the parent, but also needs to properly initialize the parent's state and manage its own additional state. Getting this relationship right is essential for maintainable code.

## Initializing Parent Classes

### The `super()` Function

`super()` provides access to the parent class, most commonly used to call the parent's `__init__` method:

```python
class Parent:
    def __init__(self, name: str):
        self.name = name
        print(f"Parent.__init__ called with {name}")


class Child(Parent):
    def __init__(self, name: str, age: int):
        # Call parent's __init__ first
        super().__init__(name)
        # Then initialize child-specific attributes
        self.age = age
        print(f"Child.__init__ called with {name}, {age}")


# Usage
child = Child("Alice", 10)
# Output:
# Parent.__init__ called with Alice
# Child.__init__ called with Alice, 10

print(child.name)  # "Alice" - from parent
print(child.age)   # 10 - from child
```

### Why Call `super().__init__()`?

**Always call `super().__init__()`** to properly initialize parent class state:

```python
# ❌ BAD: Not calling super().__init__()
class Vehicle:
    def __init__(self, make: str, model: str):
        self.make = make
        self.model = model
        self._engine_started = False
    
    def start_engine(self):
        self._engine_started = True
        return f"{self.make} {self.model} engine started"


class Car(Vehicle):
    def __init__(self, make: str, model: str, num_doors: int):
        # Forgot to call super().__init__()!
        self.num_doors = num_doors


car = Car("Toyota", "Camry", 4)
# print(car.make)  # AttributeError: 'Car' object has no attribute 'make'
# car.start_engine()  # AttributeError: 'Car' object has no attribute '_engine_started'
```

```python
# ✅ GOOD: Properly calling super().__init__()
class Car(Vehicle):
    def __init__(self, make: str, model: str, num_doors: int):
        super().__init__(make, model)  # Initialize parent
        self.num_doors = num_doors


car = Car("Toyota", "Camry", 4)
print(car.make)         # "Toyota" - works!
print(car.start_engine())  # "Toyota Camry engine started" - works!
print(car.num_doors)    # 4
```

### Order of Initialization

**Best Practice**: Call `super().__init__()` as the first line in child's `__init__`:

```python
class Parent:
    def __init__(self):
        self.parent_attr = "parent"
        print("Parent initialized")


class Child(Parent):
    def __init__(self):
        # ✅ GOOD: Call super first
        super().__init__()
        self.child_attr = "child"
        print("Child initialized")


child = Child()
# Output:
# Parent initialized
# Child initialized
```

Why first? The parent class may set up state that the child needs:

```python
class BankAccount:
    def __init__(self, account_number: str, initial_balance: float):
        self.account_number = account_number
        self._balance = initial_balance
        self._validate_balance()  # Parent validation
    
    def _validate_balance(self):
        if self._balance < 0:
            raise ValueError("Initial balance cannot be negative")


class SavingsAccount(BankAccount):
    def __init__(self, account_number: str, initial_balance: float, interest_rate: float):
        # Parent init validates balance - must call first!
        super().__init__(account_number, initial_balance)
        
        # Now safe to set child attributes
        self.interest_rate = interest_rate
        self._calculate_interest()  # Uses parent's _balance
    
    def _calculate_interest(self):
        """Uses parent's _balance attribute."""
        return self._balance * self.interest_rate


# Works correctly
account = SavingsAccount("SA001", 1000.0, 0.05)
```

## Attribute Sharing and Overriding

### Instance Attributes

Instance attributes set in parent are accessible in child:

```python
class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age


class Student(Person):
    def __init__(self, name: str, age: int, student_id: str):
        super().__init__(name, age)
        self.student_id = student_id
    
    def introduce(self):
        # Access parent's attributes
        return f"I'm {self.name}, {self.age} years old, ID: {self.student_id}"


student = Student("Alice", 20, "S12345")
print(student.name)       # "Alice" - from parent
print(student.student_id) # "S12345" - from child
print(student.introduce()) # Uses both parent and child attributes
```

### Class Attributes

Class attributes are shared across the hierarchy:

```python
class Animal:
    kingdom = "Animalia"  # Class attribute
    
    def __init__(self, species: str):
        self.species = species  # Instance attribute


class Dog(Animal):
    family = "Canidae"  # Child class attribute
    
    def __init__(self, name: str):
        super().__init__("Canis familiaris")
        self.name = name


dog = Dog("Buddy")

# Access hierarchy of class attributes
print(dog.kingdom)  # "Animalia" - from parent class
print(dog.family)   # "Canidae" - from child class
print(dog.species)  # "Canis familiaris" - instance attribute
print(dog.name)     # "Buddy" - instance attribute

# Shared across all instances
dog2 = Dog("Max")
print(dog2.kingdom)  # Same "Animalia"
```

### Overriding Attributes

Child can override parent's attributes:

```python
class Configuration:
    debug = False
    timeout = 30
    
    def get_settings(self):
        return {
            'debug': self.debug,
            'timeout': self.timeout
        }


class DevelopmentConfiguration(Configuration):
    debug = True  # Override parent's class attribute
    timeout = 60  # Override parent's class attribute
    
    def __init__(self):
        self.verbose_logging = True  # Additional attribute


dev_config = DevelopmentConfiguration()
print(dev_config.get_settings())
# {'debug': True, 'timeout': 60} - overridden values

prod_config = Configuration()
print(prod_config.get_settings())
# {'debug': False, 'timeout': 30} - original values
```

## Managing Shared State

### Protected Attributes Convention

Use `_attribute` (single underscore) for attributes meant to be used by child classes:

```python
class Account:
    def __init__(self, account_id: str, initial_balance: float):
        self.account_id = account_id
        self._balance = initial_balance  # Protected - child classes can access
    
    def get_balance(self) -> float:
        """Public method to get balance."""
        return self._balance
    
    def _update_balance(self, amount: float) -> None:
        """Protected method - for use by child classes."""
        self._balance += amount


class CheckingAccount(Account):
    def __init__(self, account_id: str, initial_balance: float):
        super().__init__(account_id, initial_balance)
        self.overdraft_limit = 500.0
    
    def withdraw(self, amount: float) -> bool:
        """Uses parent's protected _update_balance method."""
        available = self._balance + self.overdraft_limit
        
        if amount <= available:
            self._update_balance(-amount)  # Access protected method
            return True
        return False


account = CheckingAccount("CHK001", 1000.0)
print(account.get_balance())  # 1000.0
account.withdraw(1200.0)      # Uses overdraft
print(account.get_balance())  # -200.0
```

### Private Attributes and Name Mangling

Use `__attribute` (double underscore) for truly private attributes:

```python
class BankAccount:
    def __init__(self, balance: float):
        self.__balance = balance  # Private - name mangled to _BankAccount__balance
    
    def get_balance(self):
        return self.__balance


class SavingsAccount(BankAccount):
    def __init__(self, balance: float, interest_rate: float):
        super().__init__(balance)
        self.interest_rate = interest_rate
    
    def add_interest(self):
        # Cannot directly access __balance!
        # self.__balance += self.__balance * self.interest_rate  # AttributeError
        
        # Must use parent's public interface
        current = self.get_balance()
        interest = current * self.interest_rate
        # But can't set it directly either - need parent method
        print(f"Interest calculated: {interest}")


# Name mangling makes __balance private to parent class
account = SavingsAccount(1000.0, 0.05)
# print(account.__balance)  # AttributeError
# print(account._SavingsAccount__balance)  # AttributeError
print(account._BankAccount__balance)  # 1000.0 - actual mangled name (don't do this!)
```

**Best Practice**: Use single underscore `_attribute` for protected attributes accessible by child classes. Use double underscore `__attribute` rarely, only for truly private implementation details.

## Common Parent-Child Patterns

### Pattern 1: Extending Parent Initialization

Add child-specific setup after parent initialization:

```python
class DatabaseConnection:
    def __init__(self, host: str, port: int, database: str):
        self.host = host
        self.port = port
        self.database = database
        self._connection = None
        self._connect()
    
    def _connect(self):
        """Establish connection."""
        print(f"Connecting to {self.host}:{self.port}/{self.database}")
        self._connection = f"Connection({self.host}:{self.port})"


class PooledDatabaseConnection(DatabaseConnection):
    def __init__(self, host: str, port: int, database: str, pool_size: int):
        # Initialize parent first
        super().__init__(host, port, database)
        
        # Add child-specific setup
        self.pool_size = pool_size
        self._pool = []
        self._initialize_pool()
    
    def _initialize_pool(self):
        """Create connection pool."""
        print(f"Creating pool with {self.pool_size} connections")
        self._pool = [f"PoolConnection_{i}" for i in range(self.pool_size)]


conn = PooledDatabaseConnection("localhost", 5432, "mydb", 5)
# Output:
# Connecting to localhost:5432/mydb
# Creating pool with 5 connections
```

### Pattern 2: Calling Parent Methods

Child can call parent's methods to extend or reuse functionality:

```python
class Logger:
    def __init__(self, name: str):
        self.name = name
    
    def log(self, message: str) -> None:
        """Basic logging."""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] {self.name}: {message}")


class FileLogger(Logger):
    def __init__(self, name: str, filepath: str):
        super().__init__(name)
        self.filepath = filepath
    
    def log(self, message: str) -> None:
        """Log to console AND file."""
        # Call parent's log method first
        super().log(message)
        
        # Add file logging
        with open(self.filepath, 'a') as f:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            f.write(f"[{timestamp}] {self.name}: {message}\n")


logger = FileLogger("AppLogger", "app.log")
logger.log("Application started")
# Logs to both console (via parent) and file (child addition)
```

### Pattern 3: Template Method

Parent defines algorithm structure, child implements specifics:

```python
from abc import ABC, abstractmethod

class DataProcessor(ABC):
    """Parent defines processing workflow."""
    
    def process(self, data):
        """Template method - defines algorithm structure."""
        print("Starting data processing...")
        
        # Steps defined by template
        loaded = self._load_data(data)
        validated = self._validate_data(loaded)
        transformed = self._transform_data(validated)
        result = self._save_data(transformed)
        
        print("Processing complete!")
        return result
    
    @abstractmethod
    def _load_data(self, data):
        """Child must implement."""
        pass
    
    @abstractmethod
    def _validate_data(self, data):
        """Child must implement."""
        pass
    
    @abstractmethod
    def _transform_data(self, data):
        """Child must implement."""
        pass
    
    @abstractmethod
    def _save_data(self, data):
        """Child must implement."""
        pass


class JSONDataProcessor(DataProcessor):
    """Concrete implementation for JSON data."""
    
    def _load_data(self, data):
        import json
        return json.loads(data)
    
    def _validate_data(self, data):
        if not isinstance(data, dict):
            raise ValueError("Expected dictionary")
        return data
    
    def _transform_data(self, data):
        # Transform keys to uppercase
        return {k.upper(): v for k, v in data.items()}
    
    def _save_data(self, data):
        import json
        result = json.dumps(data)
        print(f"Saved: {result}")
        return result


processor = JSONDataProcessor()
result = processor.process('{"name": "Alice", "age": 30}')
# Parent controls flow, child provides implementation
```

## Common Pitfalls

### Pitfall 1: Forgetting to Call `super().__init__()`

```python
# ❌ BAD: Parent not initialized
class Parent:
    def __init__(self, value: int):
        self.value = value
        self._cache = {}

class Child(Parent):
    def __init__(self, value: int, extra: str):
        # Forgot super().__init__()!
        self.extra = extra
    
    def use_cache(self):
        return self._cache  # AttributeError!


# ✅ GOOD: Always call super().__init__()
class Child(Parent):
    def __init__(self, value: int, extra: str):
        super().__init__(value)  # Initialize parent
        self.extra = extra
```

### Pitfall 2: Wrong Order of Initialization

```python
# ❌ BAD: Using parent's attribute before it's initialized
class Parent:
    def __init__(self, items: list):
        self.items = items
        self.count = len(items)

class Child(Parent):
    def __init__(self, items: list, multiplier: int):
        # Using self.count before parent initialized!
        self.total = self.count * multiplier  # AttributeError!
        super().__init__(items)


# ✅ GOOD: Call super first
class Child(Parent):
    def __init__(self, items: list, multiplier: int):
        super().__init__(items)  # Initialize parent first
        self.total = self.count * multiplier  # Now self.count exists
```

### Pitfall 3: Overriding Without Calling Super

```python
# ❌ BAD: Completely replacing parent behavior
class Parent:
    def save(self, data):
        self._validate(data)
        self._write_to_disk(data)
        self._update_index(data)

class Child(Parent):
    def save(self, data):
        # Forgot to call super().save()!
        # Now validation, indexing are skipped
        self._write_to_database(data)


# ✅ GOOD: Extend parent behavior
class Child(Parent):
    def save(self, data):
        # Keep parent's behavior
        super().save(data)
        # Add child's behavior
        self._write_to_database(data)
```

### Pitfall 4: Modifying Mutable Default Arguments

```python
# ❌ BAD: Mutable default argument
class Parent:
    def __init__(self, items=[]):  # BAD!
        self.items = items

class Child(Parent):
    def __init__(self, items=[], extra=None):  # BAD!
        super().__init__(items)
        self.extra = extra


# All instances share the same list!
child1 = Child()
child1.items.append(1)

child2 = Child()
print(child2.items)  # [1] - Unexpected!


# ✅ GOOD: Use None as default
class Parent:
    def __init__(self, items=None):
        self.items = items if items is not None else []

class Child(Parent):
    def __init__(self, items=None, extra=None):
        super().__init__(items)
        self.extra = extra


child1 = Child()
child1.items.append(1)

child2 = Child()
print(child2.items)  # [] - Correct!
```

## Real-World Example: E-Commerce Products

```python
from datetime import datetime
from typing import Optional, List
from decimal import Decimal

class Product:
    """Base product class."""
    
    def __init__(self, product_id: str, name: str, price: Decimal, 
                 description: str, stock_quantity: int):
        self.product_id = product_id
        self.name = name
        self._price = price
        self.description = description
        self._stock_quantity = stock_quantity
        self.created_at = datetime.now()
        self._is_active = True
    
    @property
    def price(self) -> Decimal:
        """Get product price."""
        return self._price
    
    @price.setter
    def price(self, value: Decimal) -> None:
        """Set price with validation."""
        if value < 0:
            raise ValueError("Price cannot be negative")
        self._price = value
    
    def is_in_stock(self) -> bool:
        """Check if product is in stock."""
        return self._stock_quantity > 0 and self._is_active
    
    def reduce_stock(self, quantity: int) -> None:
        """Reduce stock quantity."""
        if quantity > self._stock_quantity:
            raise ValueError(f"Insufficient stock: {self._stock_quantity} available")
        self._stock_quantity -= quantity
    
    def get_info(self) -> dict:
        """Get product information."""
        return {
            'id': self.product_id,
            'name': self.name,
            'price': float(self._price),
            'in_stock': self.is_in_stock()
        }


class PhysicalProduct(Product):
    """Product that requires shipping."""
    
    def __init__(self, product_id: str, name: str, price: Decimal,
                 description: str, stock_quantity: int,
                 weight_kg: float, dimensions: tuple):
        # Initialize parent
        super().__init__(product_id, name, price, description, stock_quantity)
        
        # Physical product specifics
        self.weight_kg = weight_kg
        self.dimensions = dimensions  # (length, width, height)
        self._requires_special_handling = False
    
    def calculate_shipping_cost(self, destination: str) -> Decimal:
        """Calculate shipping based on weight and dimensions."""
        base_cost = Decimal("5.00")
        weight_cost = Decimal(str(self.weight_kg * 2))
        
        # Volumetric weight
        volume = self.dimensions[0] * self.dimensions[1] * self.dimensions[2]
        volume_cost = Decimal(str(volume * 0.01))
        
        total = base_cost + weight_cost + volume_cost
        
        if self._requires_special_handling:
            total += Decimal("10.00")
        
        return total
    
    def get_info(self) -> dict:
        """Extended product info with shipping details."""
        info = super().get_info()  # Get parent's info
        info['weight_kg'] = self.weight_kg
        info['dimensions'] = self.dimensions
        info['type'] = 'physical'
        return info


class DigitalProduct(Product):
    """Product delivered digitally."""
    
    def __init__(self, product_id: str, name: str, price: Decimal,
                 description: str, download_url: str,
                 file_size_mb: float, license_type: str):
        # Digital products have unlimited stock
        super().__init__(product_id, name, price, description, stock_quantity=999999)
        
        # Digital product specifics
        self.download_url = download_url
        self.file_size_mb = file_size_mb
        self.license_type = license_type
        self._download_count = 0
    
    def is_in_stock(self) -> bool:
        """Digital products always in stock."""
        return self._is_active
    
    def reduce_stock(self, quantity: int) -> None:
        """Digital products don't reduce stock."""
        self._download_count += quantity
    
    def get_download_link(self, customer_id: str) -> str:
        """Generate personalized download link."""
        from hashlib import sha256
        token = sha256(f"{customer_id}{self.product_id}".encode()).hexdigest()
        return f"{self.download_url}?token={token}"
    
    def get_info(self) -> dict:
        """Extended product info with digital details."""
        info = super().get_info()
        info['file_size_mb'] = self.file_size_mb
        info['license_type'] = self.license_type
        info['downloads'] = self._download_count
        info['type'] = 'digital'
        return info


class SubscriptionProduct(Product):
    """Product with recurring payments."""
    
    def __init__(self, product_id: str, name: str, price: Decimal,
                 description: str, billing_cycle: str,
                 features: List[str]):
        # Subscriptions have unlimited stock
        super().__init__(product_id, name, price, description, stock_quantity=999999)
        
        # Subscription specifics
        self.billing_cycle = billing_cycle  # 'monthly', 'yearly'
        self.features = features
        self._active_subscriptions = 0
    
    @property
    def price(self) -> Decimal:
        """Get subscription price per billing cycle."""
        return self._price
    
    def calculate_annual_price(self) -> Decimal:
        """Calculate annual cost."""
        if self.billing_cycle == 'monthly':
            return self._price * 12
        elif self.billing_cycle == 'yearly':
            return self._price
        return self._price
    
    def is_in_stock(self) -> bool:
        """Subscriptions always available."""
        return self._is_active
    
    def reduce_stock(self, quantity: int) -> None:
        """Track active subscriptions."""
        self._active_subscriptions += quantity
    
    def get_info(self) -> dict:
        """Extended product info with subscription details."""
        info = super().get_info()
        info['billing_cycle'] = self.billing_cycle
        info['features'] = self.features
        info['annual_price'] = float(self.calculate_annual_price())
        info['active_subscriptions'] = self._active_subscriptions
        info['type'] = 'subscription'
        return info


# Usage demonstration
physical = PhysicalProduct(
    "PHYS001", "Laptop", Decimal("999.99"),
    "High-performance laptop", 50,
    2.5, (35, 25, 2)
)

digital = DigitalProduct(
    "DIG001", "Python Course", Decimal("49.99"),
    "Complete Python programming course",
    "https://downloads.example.com/python-course",
    500.0, "personal"
)

subscription = SubscriptionProduct(
    "SUB001", "Premium Membership", Decimal("9.99"),
    "Access to all premium features",
    "monthly",
    ["ad-free", "cloud-storage", "priority-support"]
)

# All products share common interface
products: List[Product] = [physical, digital, subscription]

for product in products:
    print(product.get_info())
    print(f"In stock: {product.is_in_stock()}")
    print()

# But each has specialized behavior
print(f"Shipping cost: ${physical.calculate_shipping_cost('USA')}")
print(f"Download link: {digital.get_download_link('customer-123')}")
print(f"Annual cost: ${subscription.calculate_annual_price()}")
```

## Summary

Parent-child relationships require careful management of initialization and state:

### Key Takeaways

1. **Always call `super().__init__()`** to initialize parent class
2. **Call super first** in child's `__init__` method
3. **Use `_attribute`** for protected attributes accessible by children
4. **Use `__attribute`** rarely for truly private attributes
5. **Call `super().method()`** when extending parent methods
6. **Avoid mutable default arguments** in constructors

### Best Practices

- ✅ Initialize parent before child-specific setup
- ✅ Use protected attributes (`_attr`) for child access
- ✅ Call parent methods with `super()` when extending
- ✅ Document which attributes/methods are for child use
- ❌ Don't forget `super().__init__()`
- ❌ Don't use parent's attributes before initialization
- ❌ Don't completely override methods without calling super (unless intended)

In the next lesson, we'll explore the **`super()` function** in depth, including advanced uses and how it works with multiple inheritance.
