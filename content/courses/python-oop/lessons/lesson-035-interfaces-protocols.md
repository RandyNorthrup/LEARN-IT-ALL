---
id: interfaces-protocols
title: Interfaces and Protocols
chapterId: ch4-abstraction
order: 35
duration: 16
objectives:
  - Understand interface design patterns
  - Learn Python protocols (duck typing)
  - Master structural vs nominal typing
---

# Interfaces and Protocols

An **interface** defines what methods a class must have without specifying how they work. Python supports interfaces through **Abstract Base Classes** (nominal typing) and **Protocols** (structural/duck typing).

## What Is an Interface?

```python
# An interface is a contract
# "Any class implementing this interface MUST have these methods"

class PaymentInterface:
    """What ALL payment methods must provide."""
    
    def process_payment(self, amount): ...
    def refund_payment(self, transaction_id): ...
    def validate_payment_info(self, info): ...

# Any class with these methods satisfies the interface
```

## Nominal Typing: ABC Interfaces

```python
from abc import ABC, abstractmethod

class Sortable(ABC):
    """Interface for sortable objects."""
    
    @abstractmethod
    def compare_to(self, other) -> int:
        """
        Compare to another object.
        
        Returns:
            -1 if self < other
             0 if self == other
             1 if self > other
        """
        pass

class Task(Sortable):
    """EXPLICITLY implements Sortable interface."""
    
    def __init__(self, priority):
        self.priority = priority
    
    def compare_to(self, other) -> int:
        if self.priority < other.priority:
            return -1
        elif self.priority > other.priority:
            return 1
        return 0

# Must inherit from Sortable to be considered sortable
def sort_items(items: List[Sortable]):
    """Requires explicit Sortable inheritance."""
    pass
```

## Structural Typing: Protocols (Python 3.8+)

```python
from typing import Protocol

class Drawable(Protocol):
    """Protocol - duck typing interface."""
    
    def draw(self) -> None:
        """Draw the object."""
        ...

# NO INHERITANCE REQUIRED!
class Circle:
    def draw(self) -> None:
        print("Drawing circle")

class Square:
    def draw(self) -> None:
        print("Drawing square")

# Both satisfy Drawable protocol (duck typing)
def render(obj: Drawable) -> None:
    """Accepts anything with draw() method."""
    obj.draw()

render(Circle())  # ✅ Works
render(Square())  # ✅ Works
```

## ABC vs Protocol

### ABC: "Is-A" Relationship

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def make_sound(self): pass

class Dog(Animal):
    """Dog IS-A Animal (explicit inheritance)."""
    def make_sound(self):
        return "Woof"

# Type checking enforces inheritance
def handle_animal(animal: Animal):
    pass

handle_animal(Dog())  # ✅ Dog inherits from Animal
```

### Protocol: "Can-Do" Relationship

```python
from typing import Protocol

class Noisy(Protocol):
    """Anything that CAN make noise."""
    def make_sound(self) -> str: ...

# No inheritance needed!
class Alarm:
    def make_sound(self) -> str:
        return "BEEP BEEP"

class Person:
    def make_sound(self) -> str:
        return "Hello"

# Both satisfy protocol
def handle_noisy(obj: Noisy):
    pass

handle_noisy(Alarm())   # ✅ Has make_sound()
handle_noisy(Person())  # ✅ Has make_sound()
```

## Multiple Interface Implementation

```python
from abc import ABC, abstractmethod

class Readable(ABC):
    @abstractmethod
    def read(self) -> bytes: pass

class Writable(ABC):
    @abstractmethod
    def write(self, data: bytes) -> int: pass

class Seekable(ABC):
    @abstractmethod
    def seek(self, position: int) -> int: pass

# Implement multiple interfaces
class File(Readable, Writable, Seekable):
    """Implements three interfaces."""
    
    def __init__(self, filename):
        self.filename = filename
        self.position = 0
        self.data = b""
    
    def read(self) -> bytes:
        return self.data[self.position:]
    
    def write(self, data: bytes) -> int:
        self.data += data
        return len(data)
    
    def seek(self, position: int) -> int:
        self.position = position
        return self.position

# Functions can require specific interfaces
def copy_data(source: Readable, dest: Writable):
    """Requires Readable source and Writable dest."""
    data = source.read()
    dest.write(data)
```

## Protocol Runtime Checking

```python
from typing import Protocol, runtime_checkable

@runtime_checkable
class Sized(Protocol):
    """Protocol with runtime checking."""
    def __len__(self) -> int: ...

class MyList:
    def __len__(self) -> int:
        return 0

# Can check at runtime
obj = MyList()
print(isinstance(obj, Sized))  # True!

# Without @runtime_checkable, isinstance wouldn't work
```

## Real-World Example: Plugin System

```python
from abc import ABC, abstractmethod
from typing import List, Dict, Any

class Plugin(ABC):
    """
    Plugin interface.
    
    All plugins must implement this interface.
    Enables extensible plugin system.
    """
    
    @property
    @abstractmethod
    def name(self) -> str:
        """Plugin name."""
        pass
    
    @property
    @abstractmethod
    def version(self) -> str:
        """Plugin version."""
        pass
    
    @abstractmethod
    def initialize(self, config: Dict[str, Any]) -> None:
        """Initialize plugin with configuration."""
        pass
    
    @abstractmethod
    def execute(self, data: Any) -> Any:
        """Execute plugin logic."""
        pass
    
    @abstractmethod
    def cleanup(self) -> None:
        """Cleanup resources."""
        pass

# PLUGIN 1: Data validator
class ValidationPlugin(Plugin):
    @property
    def name(self) -> str:
        return "Data Validator"
    
    @property
    def version(self) -> str:
        return "1.0.0"
    
    def initialize(self, config: Dict[str, Any]) -> None:
        self.rules = config.get('rules', [])
        print(f"Initializing {self.name} v{self.version}")
    
    def execute(self, data: Any) -> Any:
        print(f"Validating data with {len(self.rules)} rules")
        # Validation logic
        return {"valid": True, "data": data}
    
    def cleanup(self) -> None:
        print(f"Cleaning up {self.name}")

# PLUGIN 2: Data transformer
class TransformPlugin(Plugin):
    @property
    def name(self) -> str:
        return "Data Transformer"
    
    @property
    def version(self) -> str:
        return "2.1.0"
    
    def initialize(self, config: Dict[str, Any]) -> None:
        self.transform_type = config.get('transform', 'uppercase')
        print(f"Initializing {self.name} v{self.version}")
    
    def execute(self, data: Any) -> Any:
        print(f"Transforming data: {self.transform_type}")
        if isinstance(data, str):
            return data.upper() if self.transform_type == 'uppercase' else data.lower()
        return data
    
    def cleanup(self) -> None:
        print(f"Cleaning up {self.name}")

# PLUGIN MANAGER
class PluginManager:
    """Manages plugins through common interface."""
    
    def __init__(self):
        self.plugins: List[Plugin] = []
    
    def register(self, plugin: Plugin) -> None:
        """Register a plugin."""
        self.plugins.append(plugin)
        print(f"Registered plugin: {plugin.name} v{plugin.version}")
    
    def initialize_all(self, config: Dict[str, Any]) -> None:
        """Initialize all plugins."""
        for plugin in self.plugins:
            plugin.initialize(config)
    
    def execute_pipeline(self, data: Any) -> Any:
        """Execute all plugins in sequence."""
        result = data
        for plugin in self.plugins:
            result = plugin.execute(result)
        return result
    
    def cleanup_all(self) -> None:
        """Cleanup all plugins."""
        for plugin in self.plugins:
            plugin.cleanup()

# USAGE: Works with ANY plugin implementing the interface
manager = PluginManager()

# Register plugins
validator = ValidationPlugin()
transformer = TransformPlugin()

manager.register(validator)
manager.register(transformer)

# Initialize
manager.initialize_all({
    'rules': ['non-empty', 'max-length'],
    'transform': 'uppercase'
})

# Execute pipeline
result = manager.execute_pipeline("hello world")
print(f"Result: {result}")

# Cleanup
manager.cleanup_all()

# Easy to add new plugins - just implement Plugin interface!
```

## Interface Segregation

```python
# ❌ Bad: "Fat" interface - forces implementations to provide too much
class Worker(ABC):
    @abstractmethod
    def work(self): pass
    
    @abstractmethod
    def eat(self): pass
    
    @abstractmethod
    def sleep(self): pass

# Robot workers can't eat or sleep!
class RobotWorker(Worker):
    def work(self): pass
    def eat(self): pass  # Doesn't make sense!
    def sleep(self): pass  # Doesn't make sense!

# ✅ Good: Segregated interfaces
class Workable(ABC):
    @abstractmethod
    def work(self): pass

class Eatable(ABC):
    @abstractmethod
    def eat(self): pass

class Sleepable(ABC):
    @abstractmethod
    def sleep(self): pass

# Human implements all three
class Human(Workable, Eatable, Sleepable):
    def work(self): pass
    def eat(self): pass
    def sleep(self): pass

# Robot implements only what makes sense
class Robot(Workable):
    def work(self): pass
```

## Protocol for Duck Typing

```python
from typing import Protocol

class SupportsClose(Protocol):
    """Anything that can be closed."""
    def close(self) -> None: ...

# Many different types satisfy this
class File:
    def close(self) -> None:
        print("Closing file")

class DatabaseConnection:
    def close(self) -> None:
        print("Closing connection")

class NetworkSocket:
    def close(self) -> None:
        print("Closing socket")

# Generic cleanup function
def cleanup(resource: SupportsClose) -> None:
    """Works with anything that has close()."""
    resource.close()

cleanup(File())  # ✅
cleanup(DatabaseConnection())  # ✅
cleanup(NetworkSocket())  # ✅
```

## Callback Interfaces

```python
from typing import Protocol

class EventHandler(Protocol):
    """Protocol for event handlers."""
    def handle_event(self, event: dict) -> None: ...

class Logger:
    def handle_event(self, event: dict) -> None:
        print(f"LOG: {event}")

class Notifier:
    def handle_event(self, event: dict) -> None:
        print(f"NOTIFY: {event}")

class EventBus:
    """Event bus using handler protocol."""
    
    def __init__(self):
        self.handlers: List[EventHandler] = []
    
    def subscribe(self, handler: EventHandler) -> None:
        self.handlers.append(handler)
    
    def publish(self, event: dict) -> None:
        for handler in self.handlers:
            handler.handle_event(event)

# Usage
bus = EventBus()
bus.subscribe(Logger())
bus.subscribe(Notifier())
bus.publish({"type": "user_login", "user_id": 123})
```

## When to Use Each

### Use ABC When:

✅ You want **explicit inheritance**  
✅ You need **runtime type checking**  
✅ Interface is part of **class hierarchy**  
✅ You want to **enforce** implementation  

### Use Protocol When:

✅ You want **duck typing**  
✅ You can't modify existing classes  
✅ You want **structural typing**  
✅ Interface is **behavior-based**  

```python
# ABC: Explicit inheritance needed
class Drawable(ABC):
    @abstractmethod
    def draw(self): pass

class Circle(Drawable):  # Must inherit
    def draw(self): pass

# Protocol: No inheritance needed
class Drawable(Protocol):
    def draw(self) -> None: ...

class Circle:  # No inheritance!
    def draw(self) -> None: pass
```

## Interface Design Best Practices

### 1. Small, Focused Interfaces

```python
# ✅ Good: Single responsibility
class Serializable(Protocol):
    def to_json(self) -> str: ...

# ❌ Bad: Too many responsibilities
class Everything(Protocol):
    def to_json(self) -> str: ...
    def to_xml(self) -> str: ...
    def to_csv(self) -> str: ...
    def save(self) -> None: ...
    def load(self) -> None: ...
```

### 2. Descriptive Names

```python
# ✅ Good: Clear purpose
class Comparable(Protocol):
    def __lt__(self, other) -> bool: ...

# ❌ Bad: Unclear
class Thing(Protocol):
    def do_stuff(self) -> Any: ...
```

### 3. Document Contracts

```python
class Repository(ABC):
    @abstractmethod
    def save(self, item):
        """
        Save item to repository.
        
        Contract:
            - Must be idempotent (safe to call multiple times)
            - Must not modify the item
            - Must raise ValueError if item is invalid
            - Must return item ID
        """
        pass
```

## Summary

**Interfaces** define contracts—methods that implementing classes must provide. Python supports interfaces through **Abstract Base Classes** (nominal typing - explicit inheritance required) and **Protocols** (structural typing - duck typing). Use **ABC** when you want explicit inheritance and runtime enforcement; use **Protocol** for duck typing and structural subtyping. Keep interfaces **small and focused** (Interface Segregation Principle). **Multiple interfaces** enable flexible composition over rigid inheritance hierarchies. Document **contracts** clearly—specify preconditions, postconditions, and invariants. Interfaces enable **polymorphism**, **dependency injection**, and **plugin architectures** by decoupling interface from implementation.
