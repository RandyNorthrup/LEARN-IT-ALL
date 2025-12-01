---
id: abstract-base-classes
title: Abstract Base Classes (ABC)
chapterId: ch4-abstraction
order: 34
duration: 17
objectives:
  - Master ABC module and abstract methods
  - Learn to define interfaces in Python
  - Understand abstract vs concrete methods
---

# Abstract Base Classes (ABC)

Python's `abc` module provides **Abstract Base Classes (ABC)**—classes that define interfaces by specifying methods that subclasses **must** implement. ABCs create contracts that ensure consistent behavior across implementations.

## The ABC Module

```python
from abc import ABC, abstractmethod

# ABC is the base class for abstract classes
class MyAbstract(ABC):
    """Abstract base class."""
    
    @abstractmethod
    def required_method(self):
        """Subclasses MUST implement this."""
        pass

# Can't instantiate abstract class
# obj = MyAbstract()  # TypeError!

# Must subclass and implement abstract methods
class Concrete(MyAbstract):
    def required_method(self):
        """Implementation provided."""
        return "Implemented!"

# Now can instantiate
obj = Concrete()  # ✅ Works!
```

## Defining Abstract Methods

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    """Abstract shape interface."""
    
    @abstractmethod
    def area(self):
        """Calculate area - MUST be implemented."""
        pass
    
    @abstractmethod
    def perimeter(self):
        """Calculate perimeter - MUST be implemented."""
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        """Concrete implementation."""
        return self.width * self.height
    
    def perimeter(self):
        """Concrete implementation."""
        return 2 * (self.width + self.height)

# ✅ Implements all abstract methods
rect = Rectangle(10, 5)
print(rect.area())  # 50

# ❌ Missing implementation
class BadShape(Shape):
    def area(self):
        return 0
    # Missing perimeter()!

# shape = BadShape()  # TypeError: Can't instantiate with abstract methods
```

## Abstract Methods with Implementation

```python
from abc import ABC, abstractmethod

class Logger(ABC):
    """Abstract logger with default behavior."""
    
    @abstractmethod
    def log(self, message):
        """
        Abstract method WITH default implementation.
        
        Subclasses can call super().log() to use default,
        or override completely.
        """
        timestamp = datetime.now().isoformat()
        return f"[{timestamp}] {message}"

class FileLogger(Logger):
    def log(self, message):
        """Uses default formatting, adds file writing."""
        formatted = super().log(message)  # Call abstract method!
        with open("log.txt", "a") as f:
            f.write(formatted + "\n")
        return formatted

class ConsoleLogger(Logger):
    def log(self, message):
        """Completely overrides."""
        formatted = f">>> {message}"
        print(formatted)
        return formatted
```

## Multiple Abstract Methods

```python
from abc import ABC, abstractmethod

class Database(ABC):
    """Abstract database interface."""
    
    @abstractmethod
    def connect(self):
        """Establish connection."""
        pass
    
    @abstractmethod
    def disconnect(self):
        """Close connection."""
        pass
    
    @abstractmethod
    def execute(self, query):
        """Execute query."""
        pass
    
    @abstractmethod
    def fetch(self, query):
        """Fetch results."""
        pass

class SQLiteDatabase(Database):
    """Concrete implementation - must implement ALL abstract methods."""
    
    def connect(self):
        import sqlite3
        self.conn = sqlite3.connect("data.db")
    
    def disconnect(self):
        self.conn.close()
    
    def execute(self, query):
        cursor = self.conn.cursor()
        cursor.execute(query)
        self.conn.commit()
    
    def fetch(self, query):
        cursor = self.conn.cursor()
        return cursor.execute(query).fetchall()

# PostgreSQL, MySQL, MongoDB would implement the same interface
```

## Abstract Properties

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    """Abstract vehicle with required properties."""
    
    @property
    @abstractmethod
    def max_speed(self):
        """Each vehicle has a max speed."""
        pass
    
    @property
    @abstractmethod
    def fuel_capacity(self):
        """Each vehicle has fuel capacity."""
        pass
    
    def describe(self):
        """Concrete method using abstract properties."""
        return f"Max speed: {self.max_speed} mph, Capacity: {self.fuel_capacity} gallons"

class Car(Vehicle):
    @property
    def max_speed(self):
        return 120
    
    @property
    def fuel_capacity(self):
        return 15

car = Car()
print(car.describe())  # "Max speed: 120 mph, Capacity: 15 gallons"
```

## Concrete Methods in Abstract Classes

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    """Abstract base with both abstract and concrete methods."""
    
    def __init__(self, name):
        self.name = name
    
    @abstractmethod
    def make_sound(self):
        """Abstract - each animal sounds different."""
        pass
    
    def eat(self):
        """Concrete - all animals eat the same way."""
        return f"{self.name} is eating"
    
    def sleep(self):
        """Concrete - all animals sleep the same way."""
        return f"{self.name} is sleeping"

class Dog(Animal):
    def make_sound(self):
        return f"{self.name} says: Woof!"

class Cat(Animal):
    def make_sound(self):
        return f"{self.name} says: Meow!"

dog = Dog("Buddy")
print(dog.make_sound())  # "Buddy says: Woof!"
print(dog.eat())         # "Buddy is eating" (inherited)
print(dog.sleep())       # "Buddy is sleeping" (inherited)
```

## Real-World Example: Repository Pattern

```python
from abc import ABC, abstractmethod
from typing import List, Optional

class Repository(ABC):
    """
    Abstract repository interface.
    
    Defines standard CRUD operations that all repositories must implement.
    Allows swapping storage backends (database, file, memory, etc.)
    """
    
    @abstractmethod
    def get_by_id(self, id: str):
        """Get single item by ID."""
        pass
    
    @abstractmethod
    def get_all(self) -> List:
        """Get all items."""
        pass
    
    @abstractmethod
    def create(self, item) -> str:
        """Create new item, return ID."""
        pass
    
    @abstractmethod
    def update(self, id: str, item) -> bool:
        """Update existing item."""
        pass
    
    @abstractmethod
    def delete(self, id: str) -> bool:
        """Delete item by ID."""
        pass
    
    def exists(self, id: str) -> bool:
        """Concrete method - checks if item exists."""
        return self.get_by_id(id) is not None

# IMPLEMENTATION 1: In-memory storage
class InMemoryRepository(Repository):
    """Repository using dictionary storage."""
    
    def __init__(self):
        self._data = {}
        self._next_id = 1
    
    def get_by_id(self, id: str):
        return self._data.get(id)
    
    def get_all(self) -> List:
        return list(self._data.values())
    
    def create(self, item) -> str:
        id = str(self._next_id)
        self._next_id += 1
        self._data[id] = item
        return id
    
    def update(self, id: str, item) -> bool:
        if id in self._data:
            self._data[id] = item
            return True
        return False
    
    def delete(self, id: str) -> bool:
        if id in self._data:
            del self._data[id]
            return True
        return False

# IMPLEMENTATION 2: File-based storage
import json
from pathlib import Path

class FileRepository(Repository):
    """Repository using JSON file storage."""
    
    def __init__(self, filepath: str):
        self.filepath = Path(filepath)
        self._ensure_file_exists()
    
    def _ensure_file_exists(self):
        if not self.filepath.exists():
            self.filepath.write_text(json.dumps({}))
    
    def _read_data(self) -> dict:
        return json.loads(self.filepath.read_text())
    
    def _write_data(self, data: dict):
        self.filepath.write_text(json.dumps(data, indent=2))
    
    def get_by_id(self, id: str):
        data = self._read_data()
        return data.get(id)
    
    def get_all(self) -> List:
        data = self._read_data()
        return list(data.values())
    
    def create(self, item) -> str:
        data = self._read_data()
        id = str(len(data) + 1)
        data[id] = item
        self._write_data(data)
        return id
    
    def update(self, id: str, item) -> bool:
        data = self._read_data()
        if id in data:
            data[id] = item
            self._write_data(data)
            return True
        return False
    
    def delete(self, id: str) -> bool:
        data = self._read_data()
        if id in data:
            del data[id]
            self._write_data(data)
            return True
        return False

# USAGE: Code works with ANY repository implementation
def manage_users(repo: Repository):
    """Works with any Repository implementation."""
    
    # Create user
    user_id = repo.create({"name": "Alice", "email": "alice@example.com"})
    print(f"Created user: {user_id}")
    
    # Get user
    user = repo.get_by_id(user_id)
    print(f"User: {user}")
    
    # Update user
    repo.update(user_id, {"name": "Alice Smith", "email": "alice@example.com"})
    
    # Check existence
    if repo.exists(user_id):
        print("User exists")
    
    # Delete user
    repo.delete(user_id)

# Works with in-memory storage
memory_repo = InMemoryRepository()
manage_users(memory_repo)

# Works with file storage
file_repo = FileRepository("users.json")
manage_users(file_repo)

# Could easily add DatabaseRepository, CloudRepository, etc.
```

## Checking Abstract Status

```python
from abc import ABC, abstractmethod

class Base(ABC):
    @abstractmethod
    def required(self):
        pass

# Check if class is abstract
print(Base.__abstractmethods__)  # frozenset({'required'})

# Check if method is abstract
print(hasattr(Base.required, '__isabstractmethod__'))  # True

# After implementation, no longer abstract
class Concrete(Base):
    def required(self):
        pass

print(Concrete.__abstractmethods__)  # frozenset() - empty!
```

## Multiple Inheritance with ABC

```python
from abc import ABC, abstractmethod

class Drawable(ABC):
    @abstractmethod
    def draw(self):
        pass

class Movable(ABC):
    @abstractmethod
    def move(self, x, y):
        pass

class Sprite(Drawable, Movable):
    """Must implement methods from BOTH abstract bases."""
    
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def draw(self):
        print(f"Drawing sprite at ({self.x}, {self.y})")
    
    def move(self, x, y):
        self.x = x
        self.y = y

sprite = Sprite(10, 20)
sprite.draw()
sprite.move(30, 40)
```

## Best Practices

### 1. Keep Interfaces Small

```python
# ✅ Good - focused interface
class Readable(ABC):
    @abstractmethod
    def read(self):
        pass

class Writable(ABC):
    @abstractmethod
    def write(self, data):
        pass

# ❌ Bad - too many responsibilities
class FileOperations(ABC):
    @abstractmethod
    def read(self): pass
    
    @abstractmethod
    def write(self, data): pass
    
    @abstractmethod
    def delete(self): pass
    
    @abstractmethod
    def copy(self, dest): pass
    
    @abstractmethod
    def move(self, dest): pass
    # Too much!
```

### 2. Provide Meaningful Defaults

```python
# ✅ Good - default implementation where sensible
class Cache(ABC):
    @abstractmethod
    def get(self, key):
        pass
    
    @abstractmethod
    def set(self, key, value):
        pass
    
    def get_or_default(self, key, default=None):
        """Concrete method with default behavior."""
        value = self.get(key)
        return value if value is not None else default
```

### 3. Document Contracts

```python
class DataProcessor(ABC):
    @abstractmethod
    def process(self, data):
        """
        Process input data.
        
        Args:
            data: Raw data to process (list or dict)
        
        Returns:
            Processed data in same format as input
        
        Raises:
            ValueError: If data format is invalid
        
        Contract:
            - Must not modify original data
            - Must handle empty input gracefully
            - Must validate data structure
        """
        pass
```

## Summary

**Abstract Base Classes (ABC)** define interfaces by specifying methods that subclasses must implement. Use `from abc import ABC, abstractmethod` to create abstract classes. Mark methods with `@abstractmethod` to make them required—subclasses must implement all abstract methods before they can be instantiated. ABCs can include both **abstract methods** (must be implemented) and **concrete methods** (inherited as-is). Use abstract properties with `@property @abstractmethod` for required attributes. ABCs create **contracts** ensuring consistent interfaces across implementations, enabling **polymorphism** and **dependency injection**. Keep abstract interfaces **small and focused**, provide **meaningful defaults** in concrete methods, and **document contracts** clearly. ABCs are the foundation of **design by contract** in Python.
