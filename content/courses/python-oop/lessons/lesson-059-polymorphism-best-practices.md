---
id: "059"
title: "Polymorphism Best Practices"
chapterId: "06"
order: 7
duration: "18 minutes"
objectives:
  - "Apply SOLID principles to polymorphic code"
  - "Design intuitive polymorphic interfaces"
  - "Handle edge cases and errors properly"
  - "Write testable polymorphic systems"
  - "Recognize and avoid common anti-patterns"
---

# Polymorphism Best Practices

Writing effective polymorphic code requires understanding principles, patterns, and pitfalls. This lesson provides guidelines for creating maintainable, robust polymorphic systems.

## Introduction

Good polymorphic code:
- Follows SOLID principles
- Has clear, consistent interfaces
- Handles errors gracefully
- Is easy to test and extend
- Avoids common pitfalls

## SOLID Principles

### 1. Single Responsibility Principle (SRP)

Each class should have one reason to change.

```python
from abc import ABC, abstractmethod

# ❌ BAD: Too many responsibilities
class Employee:
    def calculate_salary(self):
        pass
    
    def save_to_database(self):
        pass
    
    def generate_report(self):
        pass
    
    def send_email(self):
        pass


# ✅ GOOD: Separate responsibilities
class Employee:
    """Single responsibility: employee data."""
    def __init__(self, name: str, salary: float):
        self.name = name
        self.salary = salary


class SalaryCalculator:
    """Single responsibility: calculate salaries."""
    def calculate(self, employee: Employee) -> float:
        return employee.salary


class EmployeeRepository:
    """Single responsibility: data persistence."""
    def save(self, employee: Employee):
        print(f"Saving {employee.name} to database")


class ReportGenerator:
    """Single responsibility: generate reports."""
    def generate(self, employee: Employee) -> str:
        return f"Report for {employee.name}"
```

### 2. Open/Closed Principle (OCP)

Open for extension, closed for modification.

```python
from abc import ABC, abstractmethod
from typing import List

# ❌ BAD: Modifying existing code to add features
class AreaCalculator:
    def calculate_area(self, shapes: List):
        total = 0
        for shape in shapes:
            if shape.type == "circle":
                total += 3.14 * shape.radius ** 2
            elif shape.type == "square":
                total += shape.side ** 2
            # Adding triangle requires modifying this code!
        return total


# ✅ GOOD: Extend without modifying
class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass


class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius
    
    def area(self) -> float:
        return 3.14159 * self.radius ** 2


class Square(Shape):
    def __init__(self, side: float):
        self.side = side
    
    def area(self) -> float:
        return self.side ** 2


class AreaCalculator:
    """No modification needed to add new shapes!"""
    def calculate_total_area(self, shapes: List[Shape]) -> float:
        return sum(shape.area() for shape in shapes)


# Add new shape without touching AreaCalculator
class Triangle(Shape):
    def __init__(self, base: float, height: float):
        self.base = base
        self.height = height
    
    def area(self) -> float:
        return 0.5 * self.base * self.height
```

### 3. Liskov Substitution Principle (LSP)

Subtypes must be substitutable for their base types.

```python
# ❌ BAD: Violates LSP
class Bird:
    def fly(self):
        print("Flying")


class Penguin(Bird):
    def fly(self):
        raise NotImplementedError("Penguins can't fly!")
        # Violates LSP - can't substitute Penguin for Bird


# ✅ GOOD: Respects LSP
class Bird(ABC):
    @abstractmethod
    def move(self):
        pass


class FlyingBird(Bird):
    def move(self):
        self.fly()
    
    def fly(self):
        print("Flying")


class Penguin(Bird):
    def move(self):
        self.swim()
    
    def swim(self):
        print("Swimming")


def make_bird_move(bird: Bird):
    """Works correctly with any Bird."""
    bird.move()


make_bird_move(FlyingBird())  # Flying
make_bird_move(Penguin())     # Swimming
```

### 4. Interface Segregation Principle (ISP)

Clients shouldn't depend on interfaces they don't use.

```python
from abc import ABC, abstractmethod

# ❌ BAD: Fat interface
class Worker(ABC):
    @abstractmethod
    def work(self): pass
    
    @abstractmethod
    def eat(self): pass
    
    @abstractmethod
    def sleep(self): pass


class Robot(Worker):
    def work(self):
        print("Working")
    
    def eat(self):
        raise NotImplementedError("Robots don't eat!")
    
    def sleep(self):
        raise NotImplementedError("Robots don't sleep!")


# ✅ GOOD: Segregated interfaces
class Workable(ABC):
    @abstractmethod
    def work(self): pass


class Eatable(ABC):
    @abstractmethod
    def eat(self): pass


class Sleepable(ABC):
    @abstractmethod
    def sleep(self): pass


class Human(Workable, Eatable, Sleepable):
    def work(self):
        print("Working")
    
    def eat(self):
        print("Eating")
    
    def sleep(self):
        print("Sleeping")


class Robot(Workable):
    """Only implements what it needs."""
    def work(self):
        print("Working")
```

### 5. Dependency Inversion Principle (DIP)

Depend on abstractions, not concretions.

```python
from abc import ABC, abstractmethod

# ❌ BAD: Depends on concrete class
class EmailSender:
    def send(self, message: str):
        print(f"Sending email: {message}")


class NotificationService:
    def __init__(self):
        self.sender = EmailSender()  # Tightly coupled!
    
    def notify(self, message: str):
        self.sender.send(message)


# ✅ GOOD: Depends on abstraction
class MessageSender(ABC):
    @abstractmethod
    def send(self, message: str): pass


class EmailSender(MessageSender):
    def send(self, message: str):
        print(f"Sending email: {message}")


class SMSSender(MessageSender):
    def send(self, message: str):
        print(f"Sending SMS: {message}")


class NotificationService:
    def __init__(self, sender: MessageSender):
        self.sender = sender  # Depends on abstraction
    
    def notify(self, message: str):
        self.sender.send(message)


# Can inject any MessageSender
service1 = NotificationService(EmailSender())
service2 = NotificationService(SMSSender())
```

## Interface Design Best Practices

### Practice 1: Keep Interfaces Minimal

```python
# ✅ GOOD: Minimal, focused interface
class Storage(ABC):
    @abstractmethod
    def save(self, key: str, value: str): pass
    
    @abstractmethod
    def load(self, key: str) -> str: pass


# ❌ BAD: Too many methods
class Storage(ABC):
    @abstractmethod
    def save(self, key: str, value: str): pass
    
    @abstractmethod
    def load(self, key: str) -> str: pass
    
    @abstractmethod
    def delete(self, key: str): pass
    
    @abstractmethod
    def list_all(self): pass
    
    @abstractmethod
    def backup(self): pass
    
    @abstractmethod
    def restore(self): pass
    # Too much!
```

### Practice 2: Design for Consistency

```python
# ✅ GOOD: Consistent naming and behavior
class DataSource(ABC):
    @abstractmethod
    def read(self) -> str: pass
    
    @abstractmethod
    def write(self, data: str): pass
    
    @abstractmethod
    def close(self): pass


class FileSource(DataSource):
    def read(self) -> str:
        return "file data"
    
    def write(self, data: str):
        print(f"Writing to file: {data}")
    
    def close(self):
        print("Closing file")


class DatabaseSource(DataSource):
    def read(self) -> str:
        return "database data"
    
    def write(self, data: str):
        print(f"Writing to database: {data}")
    
    def close(self):
        print("Closing database connection")


# ❌ BAD: Inconsistent naming
class FileSource:
    def get(self): pass       # Inconsistent
    def save(self, data): pass
    def shutdown(self): pass


class DatabaseSource:
    def fetch(self): pass     # Different names
    def insert(self, data): pass
    def disconnect(self): pass
```

### Practice 3: Return Meaningful Types

```python
from typing import Optional, List

# ✅ GOOD: Clear return types
class Repository(ABC):
    @abstractmethod
    def find_by_id(self, id: str) -> Optional['User']:
        """Returns User or None if not found."""
        pass
    
    @abstractmethod
    def find_all(self) -> List['User']:
        """Returns list of all users (empty if none)."""
        pass


# ❌ BAD: Unclear return types
class Repository(ABC):
    @abstractmethod
    def find_by_id(self, id: str):
        """Returns User, None, False, or raises exception?"""
        pass
```

## Error Handling Best Practices

### Practice 1: Define Clear Error Hierarchy

```python
class DataError(Exception):
    """Base exception for data errors."""
    pass


class ValidationError(DataError):
    """Data validation failed."""
    pass


class NotFoundError(DataError):
    """Resource not found."""
    pass


class Storage(ABC):
    @abstractmethod
    def save(self, key: str, data: str):
        """Save data.
        
        Raises:
            ValidationError: If data is invalid.
        """
        pass
    
    @abstractmethod
    def load(self, key: str) -> str:
        """Load data.
        
        Raises:
            NotFoundError: If key doesn't exist.
        """
        pass


class FileStorage(Storage):
    def save(self, key: str, data: str):
        if not data:
            raise ValidationError("Data cannot be empty")
        print(f"Saving {key}")
    
    def load(self, key: str) -> str:
        # Simulate not found
        if key == "missing":
            raise NotFoundError(f"Key '{key}' not found")
        return "data"


# Usage
storage = FileStorage()

try:
    storage.save("key", "")
except ValidationError as e:
    print(f"Validation error: {e}")

try:
    storage.load("missing")
except NotFoundError as e:
    print(f"Not found: {e}")
```

### Practice 2: Fail Fast and Clearly

```python
# ✅ GOOD: Fail fast with clear error
class PaymentProcessor(ABC):
    @abstractmethod
    def process(self, amount: float) -> bool:
        pass


class CreditCardProcessor(PaymentProcessor):
    def __init__(self, card_number: str):
        if not card_number or len(card_number) != 16:
            raise ValueError("Invalid card number: must be 16 digits")
        self.card_number = card_number
    
    def process(self, amount: float) -> bool:
        if amount <= 0:
            raise ValueError(f"Invalid amount: {amount}")
        print(f"Processing ${amount}")
        return True


# ❌ BAD: Silent failures
class CreditCardProcessor(PaymentProcessor):
    def __init__(self, card_number: str):
        self.card_number = card_number  # No validation!
    
    def process(self, amount: float) -> bool:
        if amount <= 0:
            return False  # Silent failure - why did it fail?
        print(f"Processing ${amount}")
        return True
```

## Testing Best Practices

### Practice 1: Test Through Interface

```python
from abc import ABC, abstractmethod

class Calculator(ABC):
    @abstractmethod
    def calculate(self, a: float, b: float) -> float:
        pass


class AddCalculator(Calculator):
    def calculate(self, a: float, b: float) -> float:
        return a + b


class MultiplyCalculator(Calculator):
    def calculate(self, a: float, b: float) -> float:
        return a * b


# Test all implementations through interface
def test_calculator(calc: Calculator):
    """Test any Calculator implementation."""
    result = calc.calculate(10, 5)
    assert isinstance(result, (int, float))
    assert result > 0


# Run tests
test_calculator(AddCalculator())
test_calculator(MultiplyCalculator())
```

### Practice 2: Use Test Doubles

```python
# Mock implementation for testing
class MockStorage(Storage):
    """Mock storage for testing."""
    
    def __init__(self):
        self.data = {}
    
    def save(self, key: str, data: str):
        self.data[key] = data
    
    def load(self, key: str) -> str:
        if key not in self.data:
            raise NotFoundError(f"Key '{key}' not found")
        return self.data[key]


# Test using mock
def test_service():
    storage = MockStorage()
    service = DataService(storage)
    
    service.save("test", "data")
    assert storage.data["test"] == "data"
```

## Common Anti-Patterns to Avoid

### Anti-Pattern 1: Type Checking Instead of Polymorphism

```python
# ❌ BAD: Type checking
def process(obj):
    if isinstance(obj, Dog):
        obj.bark()
    elif isinstance(obj, Cat):
        obj.meow()
    # Defeats the purpose of polymorphism!


# ✅ GOOD: Use polymorphism
class Animal(ABC):
    @abstractmethod
    def make_sound(self): pass


def process(animal: Animal):
    animal.make_sound()  # No type checking needed!
```

### Anti-Pattern 2: Returning None Instead of Appropriate Type

```python
# ❌ BAD: Returning None for errors
class UserRepository:
    def find(self, id: str) -> Optional[User]:
        try:
            # Search logic
            return None  # User not found
        except Exception:
            return None  # Error occurred
        # Can't distinguish between "not found" and "error"!


# ✅ GOOD: Use exceptions or result objects
class UserRepository:
    def find(self, id: str) -> Optional[User]:
        """Find user by ID.
        
        Returns:
            User if found, None if not found.
            
        Raises:
            DatabaseError: If database error occurs.
        """
        try:
            # Search logic
            return None  # Not found
        except Exception as e:
            raise DatabaseError(f"Database error: {e}")
```

### Anti-Pattern 3: Empty Base Class Methods

```python
# ❌ BAD: Empty implementations
class Animal:
    def make_sound(self):
        pass  # No clear contract


# ✅ GOOD: Use ABC to enforce contract
class Animal(ABC):
    @abstractmethod
    def make_sound(self):
        """Make animal sound - must be implemented."""
        pass
```

## Real-World Example: Plugin System with Best Practices

```python
from abc import ABC, abstractmethod
from typing import Dict, List, Optional
from enum import Enum

# Custom exceptions
class PluginError(Exception):
    """Base exception for plugin errors."""
    pass


class PluginNotFoundError(PluginError):
    """Plugin not found."""
    pass


class PluginLoadError(PluginError):
    """Plugin failed to load."""
    pass


# Plugin status enum
class PluginStatus(Enum):
    LOADED = "loaded"
    ACTIVE = "active"
    DISABLED = "disabled"
    ERROR = "error"


# Minimal, focused interface (ISP)
class Plugin(ABC):
    """Base plugin interface.
    
    All plugins must implement:
    - name: Unique plugin identifier
    - version: Plugin version
    - initialize(): Setup plugin
    - execute(): Run plugin
    - cleanup(): Clean up resources
    """
    
    @property
    @abstractmethod
    def name(self) -> str:
        """Unique plugin name."""
        pass
    
    @property
    @abstractmethod
    def version(self) -> str:
        """Plugin version."""
        pass
    
    @abstractmethod
    def initialize(self) -> None:
        """Initialize plugin.
        
        Raises:
            PluginLoadError: If initialization fails.
        """
        pass
    
    @abstractmethod
    def execute(self, **kwargs) -> Dict:
        """Execute plugin.
        
        Returns:
            Dict with execution results.
            
        Raises:
            PluginError: If execution fails.
        """
        pass
    
    @abstractmethod
    def cleanup(self) -> None:
        """Clean up resources."""
        pass


# Concrete plugins (SRP - single responsibility each)
class LoggerPlugin(Plugin):
    """Plugin for logging."""
    
    @property
    def name(self) -> str:
        return "logger"
    
    @property
    def version(self) -> str:
        return "1.0.0"
    
    def initialize(self) -> None:
        """Initialize logger."""
        print(f"Initializing {self.name} v{self.version}")
        self.logs: List[str] = []
    
    def execute(self, **kwargs) -> Dict:
        """Log message."""
        message = kwargs.get('message', '')
        if not message:
            raise PluginError("Message is required")
        
        self.logs.append(message)
        print(f"LOG: {message}")
        return {'status': 'success', 'logged': len(self.logs)}
    
    def cleanup(self) -> None:
        """Clean up logger."""
        print(f"Logger: {len(self.logs)} messages logged")
        self.logs.clear()


class CachePlugin(Plugin):
    """Plugin for caching."""
    
    @property
    def name(self) -> str:
        return "cache"
    
    @property
    def version(self) -> str:
        return "1.0.0"
    
    def initialize(self) -> None:
        """Initialize cache."""
        print(f"Initializing {self.name} v{self.version}")
        self.cache: Dict[str, str] = {}
    
    def execute(self, **kwargs) -> Dict:
        """Cache operations."""
        operation = kwargs.get('operation')
        key = kwargs.get('key')
        
        if not operation or not key:
            raise PluginError("Operation and key are required")
        
        if operation == 'set':
            value = kwargs.get('value', '')
            self.cache[key] = value
            return {'status': 'success', 'operation': 'set'}
        elif operation == 'get':
            value = self.cache.get(key)
            return {'status': 'success', 'operation': 'get', 'value': value}
        else:
            raise PluginError(f"Unknown operation: {operation}")
    
    def cleanup(self) -> None:
        """Clean up cache."""
        print(f"Cache: {len(self.cache)} entries cached")
        self.cache.clear()


# Plugin manager (OCP - open for extension, DIP - depends on abstraction)
class PluginManager:
    """Manage plugins following best practices."""
    
    def __init__(self):
        self._plugins: Dict[str, Plugin] = {}
        self._status: Dict[str, PluginStatus] = {}
    
    def register(self, plugin: Plugin) -> None:
        """Register plugin (DIP - depends on Plugin abstraction).
        
        Raises:
            PluginError: If plugin with same name already exists.
        """
        if plugin.name in self._plugins:
            raise PluginError(f"Plugin '{plugin.name}' already registered")
        
        try:
            plugin.initialize()
            self._plugins[plugin.name] = plugin
            self._status[plugin.name] = PluginStatus.LOADED
            print(f"✅ Registered plugin: {plugin.name} v{plugin.version}")
        except Exception as e:
            self._status[plugin.name] = PluginStatus.ERROR
            raise PluginLoadError(f"Failed to register {plugin.name}: {e}")
    
    def execute_plugin(self, name: str, **kwargs) -> Dict:
        """Execute plugin by name.
        
        Raises:
            PluginNotFoundError: If plugin doesn't exist.
            PluginError: If plugin execution fails.
        """
        if name not in self._plugins:
            raise PluginNotFoundError(f"Plugin '{name}' not found")
        
        plugin = self._plugins[name]
        
        if self._status[name] != PluginStatus.LOADED:
            raise PluginError(f"Plugin '{name}' is not loaded")
        
        try:
            result = plugin.execute(**kwargs)
            return result
        except Exception as e:
            self._status[name] = PluginStatus.ERROR
            raise PluginError(f"Plugin '{name}' execution failed: {e}")
    
    def cleanup_all(self) -> None:
        """Clean up all plugins."""
        for name, plugin in self._plugins.items():
            try:
                plugin.cleanup()
                self._status[name] = PluginStatus.DISABLED
            except Exception as e:
                print(f"⚠️  Error cleaning up {name}: {e}")
    
    def list_plugins(self) -> List[Dict]:
        """List all registered plugins."""
        return [
            {
                'name': plugin.name,
                'version': plugin.version,
                'status': self._status[plugin.name].value
            }
            for plugin in self._plugins.values()
        ]


# Usage demonstrating best practices
manager = PluginManager()

# Register plugins (OCP - can add new plugins without modifying manager)
try:
    manager.register(LoggerPlugin())
    manager.register(CachePlugin())
except PluginError as e:
    print(f"Registration error: {e}")

# List plugins
print("\nRegistered plugins:")
for info in manager.list_plugins():
    print(f"  - {info['name']} v{info['version']} ({info['status']})")

# Execute plugins (LSP - any Plugin implementation works)
try:
    manager.execute_plugin('logger', message='System started')
    manager.execute_plugin('cache', operation='set', key='user', value='Alice')
    result = manager.execute_plugin('cache', operation='get', key='user')
    print(f"Cache result: {result}")
except PluginError as e:
    print(f"Execution error: {e}")

# Clean up
print("\nCleaning up:")
manager.cleanup_all()
```

## Summary

Effective polymorphism requires following established principles and practices:

### SOLID Principles

1. **Single Responsibility**: One class, one reason to change
2. **Open/Closed**: Open for extension, closed for modification
3. **Liskov Substitution**: Subtypes must be substitutable
4. **Interface Segregation**: Small, focused interfaces
5. **Dependency Inversion**: Depend on abstractions

### Design Guidelines

- ✅ Keep interfaces minimal and focused
- ✅ Design for consistency
- ✅ Return meaningful types
- ✅ Define clear error hierarchies
- ✅ Fail fast with clear errors
- ✅ Test through interfaces
- ✅ Document requirements clearly

### Anti-Patterns to Avoid

- ❌ Type checking instead of polymorphism
- ❌ Returning None for different error conditions
- ❌ Empty base class methods (use ABC)
- ❌ Fat interfaces (too many methods)
- ❌ Silent failures
- ❌ Tight coupling to concrete classes

### Best Practices Checklist

- [ ] Follows SOLID principles
- [ ] Minimal, focused interfaces
- [ ] Clear error handling strategy
- [ ] Consistent naming and behavior
- [ ] Proper type hints
- [ ] Comprehensive documentation
- [ ] Testable design
- [ ] Extensible without modification

In the next lesson, we'll explore **Testing Polymorphic Code**, covering strategies for thoroughly testing polymorphic systems.

