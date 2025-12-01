---
id: "054"
title: "Duck Typing and Protocols"
chapterId: "06"
order: 2
duration: "18 minutes"
objectives:
  - "Master Python's duck typing philosophy"
  - "Understand and use typing.Protocol effectively"
  - "Learn structural vs nominal typing"
  - "Apply protocols for flexible interfaces"
  - "Design protocol-based systems"
---

# Duck Typing and Protocols

"If it walks like a duck and quacks like a duck, it's a duck." Duck typing is Python's core polymorphism mechanism, and Protocols provide type-safe duck typing. This lesson explores both in depth.

## Introduction

Python doesn't check types at runtime — it just tries to use objects. If an object has the methods you call, it works. If not, you get an error. This is **duck typing**: behavior matters, not declared types.

**Protocols** (added in Python 3.8) bring static type checking to duck typing, giving you the best of both worlds: flexibility and type safety.

## Duck Typing Fundamentals

### The Core Idea

```python
# No shared base class, no formal interface
class Duck:
    def quack(self):
        return "Quack!"
    
    def fly(self):
        return "Flying"


class Person:
    def quack(self):
        return "I'm imitating a duck!"
    
    def fly(self):
        return "I'm flapping my arms"


class Airplane:
    def quack(self):
        return "Honk honk!"  # Horn sound
    
    def fly(self):
        return "Flying at 500 mph"


def make_it_quack_and_fly(thing):
    """Works with ANYTHING that has quack() and fly()."""
    print(thing.quack())
    print(thing.fly())


# All work - no inheritance, no interfaces
make_it_quack_and_fly(Duck())
print()
make_it_quack_and_fly(Person())
print()
make_it_quack_and_fly(Airplane())
```

**Key Point**: No type checking, no inheritance — just method calls.

### EAFP: Easier to Ask Forgiveness than Permission

Python's philosophy: Try it and handle errors, don't check types first.

```python
# ❌ LBYL (Look Before You Leap) - Not Pythonic
def process(obj):
    if hasattr(obj, 'process_data') and callable(obj.process_data):
        return obj.process_data()
    else:
        raise TypeError("Object doesn't have process_data method")


# ✅ EAFP - Pythonic
def process(obj):
    try:
        return obj.process_data()
    except AttributeError:
        raise TypeError("Object doesn't have process_data method")
```

### Duck Typing Benefits

```python
# One function works with many types
def get_length(container):
    """Works with ANYTHING that has __len__."""
    return len(container)


# All work
print(get_length([1, 2, 3]))        # list
print(get_length("hello"))          # string
print(get_length({'a': 1, 'b': 2})) # dict
print(get_length((1, 2)))           # tuple
print(get_length({1, 2, 3}))        # set
print(get_length(range(10)))        # range


# Custom class works too
class CustomContainer:
    def __init__(self, items):
        self.items = items
    
    def __len__(self):
        return len(self.items)


print(get_length(CustomContainer([1, 2, 3, 4])))
```

### Duck Typing Limitations

```python
# Problem: No type checking until runtime
def process_file(file_handler):
    """Expects read() and write() methods."""
    data = file_handler.read()
    file_handler.write(data)


# Error only at runtime if methods missing
class BadHandler:
    pass


try:
    process_file(BadHandler())  # AttributeError at runtime!
except AttributeError as e:
    print(f"Error: {e}")
```

**Solution**: Use Protocols for static type checking.

## Protocols: Structural Subtyping

### What are Protocols?

Protocols define interfaces without inheritance. A class implements a Protocol if it has the required methods, regardless of inheritance.

```python
from typing import Protocol

class Drawable(Protocol):
    """Protocol: anything with draw() method."""
    
    def draw(self) -> str:
        """Draw the object."""
        ...


# Classes don't inherit from Drawable
class Circle:
    def __init__(self, radius: float):
        self.radius = radius
    
    def draw(self) -> str:
        return f"Circle with radius {self.radius}"


class Square:
    def __init__(self, side: float):
        self.side = side
    
    def draw(self) -> str:
        return f"Square with side {self.side}"


class Text:
    def __init__(self, content: str):
        self.content = content
    
    def draw(self) -> str:
        return f"Text: {self.content}"


def render(drawable: Drawable) -> str:
    """Type checker verifies drawable has draw()."""
    return drawable.draw()


# All work - type checker happy
print(render(Circle(5)))
print(render(Square(4)))
print(render(Text("Hello")))
```

Type checkers (mypy, pyright) verify at static analysis time.

### Structural vs Nominal Typing

```python
# NOMINAL TYPING (traditional inheritance)
class Animal:
    def make_sound(self):
        pass

class Dog(Animal):  # Explicit inheritance
    def make_sound(self):
        return "Woof"


# Dog IS-A Animal (nominal relationship)


# STRUCTURAL TYPING (Protocols)
from typing import Protocol

class CanMakeSound(Protocol):
    def make_sound(self) -> str:
        ...


class Cat:  # No inheritance!
    def make_sound(self) -> str:
        return "Meow"


# Cat implements CanMakeSound (structural relationship)
# Just needs the method, not inheritance
```

### Defining Protocols

```python
from typing import Protocol, runtime_checkable

@runtime_checkable  # Optional: enables isinstance() checks
class Closable(Protocol):
    """Protocol for objects that can be closed."""
    
    def close(self) -> None:
        """Close the resource."""
        ...


@runtime_checkable
class Readable(Protocol):
    """Protocol for objects that can be read."""
    
    def read(self, size: int = -1) -> str:
        """Read data."""
        ...


@runtime_checkable
class Writable(Protocol):
    """Protocol for objects that can be written to."""
    
    def write(self, data: str) -> int:
        """Write data, return bytes written."""
        ...


# File-like protocol
@runtime_checkable
class FileLike(Closable, Readable, Writable, Protocol):
    """Combines multiple protocols."""
    pass


# Any class with these methods implements the protocol
class StringBuffer:
    def __init__(self):
        self._buffer = ""
    
    def read(self, size: int = -1) -> str:
        return self._buffer
    
    def write(self, data: str) -> int:
        self._buffer += data
        return len(data)
    
    def close(self) -> None:
        self._buffer = ""


# Type checker accepts it
def process_file(file: FileLike):
    data = file.read()
    file.write(data.upper())
    file.close()


buffer = StringBuffer()
process_file(buffer)  # Works!

# Runtime check also works
print(isinstance(buffer, FileLike))  # True
```

### Protocol with Properties

```python
from typing import Protocol

class Sized(Protocol):
    """Protocol for objects with a size."""
    
    @property
    def size(self) -> int:
        """Get size."""
        ...


class Box:
    def __init__(self, width: int, height: int):
        self._width = width
        self._height = height
    
    @property
    def size(self) -> int:
        return self._width * self._height


class Bag:
    def __init__(self, items: list):
        self._items = items
    
    @property
    def size(self) -> int:
        return len(self._items)


def print_size(obj: Sized):
    """Works with any object that has size property."""
    print(f"Size: {obj.size}")


print_size(Box(10, 20))
print_size(Bag([1, 2, 3, 4]))
```

## Common Protocol Patterns

### Pattern 1: Iterator Protocol

```python
from typing import Protocol, TypeVar, Iterator

T = TypeVar('T')

class Iterable(Protocol[T]):
    """Protocol for iterable objects."""
    
    def __iter__(self) -> Iterator[T]:
        ...


class CustomRange:
    """Custom range implementation."""
    
    def __init__(self, start: int, end: int):
        self.start = start
        self.end = end
    
    def __iter__(self):
        current = self.start
        while current < self.end:
            yield current
            current += 1


def sum_all(items: Iterable[int]) -> int:
    """Sum all items - works with any iterable."""
    return sum(items)


# Works with built-in and custom iterables
print(sum_all([1, 2, 3]))
print(sum_all(CustomRange(1, 4)))
```

### Pattern 2: Context Manager Protocol

```python
from typing import Protocol

class ContextManager(Protocol):
    """Protocol for context managers."""
    
    def __enter__(self):
        ...
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        ...


class DatabaseConnection:
    """Custom context manager."""
    
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self.connected = False
    
    def __enter__(self):
        print(f"Connecting to {self.connection_string}")
        self.connected = True
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing connection")
        self.connected = False
        return False


def use_resource(resource: ContextManager):
    """Works with any context manager."""
    with resource:
        print("Using resource")


use_resource(DatabaseConnection("localhost:5432"))
```

### Pattern 3: Comparable Protocol

```python
from typing import Protocol

class Comparable(Protocol):
    """Protocol for comparable objects."""
    
    def __lt__(self, other) -> bool:
        ...
    
    def __le__(self, other) -> bool:
        ...
    
    def __gt__(self, other) -> bool:
        ...
    
    def __ge__(self, other) -> bool:
        ...


class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
    
    def __lt__(self, other):
        return self.age < other.age
    
    def __le__(self, other):
        return self.age <= other.age
    
    def __gt__(self, other):
        return self.age > other.age
    
    def __ge__(self, other):
        return self.age >= other.age


def get_max(items: list[Comparable]) -> Comparable:
    """Get maximum - works with any comparable."""
    return max(items)


people = [Person("Alice", 30), Person("Bob", 25), Person("Charlie", 35)]
oldest = get_max(people)
print(f"Oldest: {oldest.name}")
```

## Real-World Example: Storage System

```python
from typing import Protocol, Optional, Any
from abc import abstractmethod

# ============================================================================
# PROTOCOLS
# ============================================================================

class Storage(Protocol):
    """Protocol for storage backends."""
    
    def save(self, key: str, value: Any) -> bool:
        """Save value with key."""
        ...
    
    def load(self, key: str) -> Optional[Any]:
        """Load value by key."""
        ...
    
    def delete(self, key: str) -> bool:
        """Delete value by key."""
        ...
    
    def exists(self, key: str) -> bool:
        """Check if key exists."""
        ...


class Serializer(Protocol):
    """Protocol for serializers."""
    
    def serialize(self, obj: Any) -> str:
        """Serialize object to string."""
        ...
    
    def deserialize(self, data: str) -> Any:
        """Deserialize string to object."""
        ...


class CachePolicy(Protocol):
    """Protocol for cache eviction policies."""
    
    def should_evict(self, key: str, access_count: int, age: float) -> bool:
        """Determine if key should be evicted."""
        ...


# ============================================================================
# IMPLEMENTATIONS (No inheritance from protocols!)
# ============================================================================

class DictStorage:
    """In-memory dictionary storage."""
    
    def __init__(self):
        self._data: dict = {}
    
    def save(self, key: str, value: Any) -> bool:
        self._data[key] = value
        return True
    
    def load(self, key: str) -> Optional[Any]:
        return self._data.get(key)
    
    def delete(self, key: str) -> bool:
        if key in self._data:
            del self._data[key]
            return True
        return False
    
    def exists(self, key: str) -> bool:
        return key in self._data


class FileStorage:
    """File-based storage."""
    
    def __init__(self, directory: str):
        self.directory = directory
    
    def save(self, key: str, value: Any) -> bool:
        print(f"Saving {key} to {self.directory}/{key}.txt")
        return True
    
    def load(self, key: str) -> Optional[Any]:
        print(f"Loading {key} from {self.directory}/{key}.txt")
        return f"Data for {key}"
    
    def delete(self, key: str) -> bool:
        print(f"Deleting {self.directory}/{key}.txt")
        return True
    
    def exists(self, key: str) -> bool:
        print(f"Checking {self.directory}/{key}.txt")
        return True


class JSONSerializer:
    """JSON serialization."""
    
    def serialize(self, obj: Any) -> str:
        import json
        return json.dumps(obj)
    
    def deserialize(self, data: str) -> Any:
        import json
        return json.loads(data)


class PickleSerializer:
    """Pickle serialization."""
    
    def serialize(self, obj: Any) -> str:
        import pickle
        return pickle.dumps(obj).hex()
    
    def deserialize(self, data: str) -> Any:
        import pickle
        return pickle.loads(bytes.fromhex(data))


class LRUCachePolicy:
    """Least Recently Used eviction policy."""
    
    def should_evict(self, key: str, access_count: int, age: float) -> bool:
        # Simple: evict if old and rarely accessed
        return age > 300 and access_count < 5


class LFUCachePolicy:
    """Least Frequently Used eviction policy."""
    
    def should_evict(self, key: str, access_count: int, age: float) -> bool:
        # Evict if access count is low
        return access_count < 3


# ============================================================================
# SERVICE USING PROTOCOLS
# ============================================================================

class DataService:
    """Service using protocol-based dependencies."""
    
    def __init__(self, storage: Storage, serializer: Serializer):
        self.storage = storage
        self.serializer = serializer
    
    def store(self, key: str, obj: Any) -> bool:
        """Store object."""
        serialized = self.serializer.serialize(obj)
        return self.storage.save(key, serialized)
    
    def retrieve(self, key: str) -> Optional[Any]:
        """Retrieve object."""
        serialized = self.storage.load(key)
        if serialized is None:
            return None
        return self.serializer.deserialize(serialized)
    
    def remove(self, key: str) -> bool:
        """Remove object."""
        return self.storage.delete(key)


class CachedDataService:
    """Service with cache eviction."""
    
    def __init__(self, storage: Storage, cache_policy: CachePolicy):
        self.storage = storage
        self.cache_policy = cache_policy
        self.access_counts: dict[str, int] = {}
        self.ages: dict[str, float] = {}
    
    def get(self, key: str) -> Optional[Any]:
        """Get with cache eviction."""
        # Track access
        self.access_counts[key] = self.access_counts.get(key, 0) + 1
        
        # Check eviction
        age = self.ages.get(key, 0)
        access_count = self.access_counts[key]
        
        if self.cache_policy.should_evict(key, access_count, age):
            print(f"Evicting {key} from cache")
            self.storage.delete(key)
            return None
        
        return self.storage.load(key)


# ============================================================================
# USAGE
# ============================================================================

print("=" * 60)
print("DICT STORAGE + JSON SERIALIZER")
print("=" * 60)

service1 = DataService(DictStorage(), JSONSerializer())
service1.store("user1", {"name": "Alice", "age": 30})
data1 = service1.retrieve("user1")
print(f"Retrieved: {data1}")

print("\n" + "=" * 60)
print("FILE STORAGE + PICKLE SERIALIZER")
print("=" * 60)

service2 = DataService(FileStorage("/tmp/data"), PickleSerializer())
service2.store("user2", {"name": "Bob", "age": 25})
data2 = service2.retrieve("user2")
print(f"Retrieved: {data2}")

print("\n" + "=" * 60)
print("CACHED SERVICE WITH LRU POLICY")
print("=" * 60)

cached = CachedDataService(DictStorage(), LRUCachePolicy())
storage = DictStorage()
storage.save("key1", "value1")
cached.storage = storage
cached.ages["key1"] = 500  # Old
cached.access_counts["key1"] = 2  # Rarely accessed

result = cached.get("key1")  # Should be evicted
print(f"Result: {result}")
```

## Duck Typing vs Protocols: When to Use

### Use Duck Typing When:

```python
# ✅ Simple, obvious interfaces
def print_all(items):
    """Obviously needs __iter__."""
    for item in items:
        print(item)


# ✅ Internal code
def _internal_helper(obj):
    """Not public API, duck typing fine."""
    return obj.process()


# ✅ Rapid prototyping
def quick_test(thing):
    return thing.do_stuff()
```

### Use Protocols When:

```python
# ✅ Public APIs
from typing import Protocol

class Processor(Protocol):
    """Public interface - document with Protocol."""
    def process(self, data: str) -> str:
        ...

def process_data(processor: Processor, data: str) -> str:
    """Public API - use Protocol for clarity."""
    return processor.process(data)


# ✅ Large codebases
# Protocols help type checkers catch errors early


# ✅ Library code
# Users benefit from type hints and documentation
```

## Best Practices

### Practice 1: Minimal Protocols

```python
# ✅ GOOD: Small, focused protocol
class Drawable(Protocol):
    def draw(self) -> str:
        ...


# ❌ BAD: Too many methods
class EverythingProtocol(Protocol):
    def draw(self) -> str: ...
    def save(self) -> None: ...
    def load(self) -> None: ...
    def validate(self) -> bool: ...
    # Too much!
```

### Practice 2: Use @runtime_checkable Sparingly

```python
from typing import Protocol, runtime_checkable

# Only add @runtime_checkable if you need isinstance()
@runtime_checkable
class Closable(Protocol):
    def close(self) -> None:
        ...


# Most protocols don't need it - static checking is enough
class Readable(Protocol):
    def read(self) -> str:
        ...
```

### Practice 3: Document Expected Behavior

```python
class Processor(Protocol):
    """Protocol for data processors.
    
    Implementers must:
    - Accept data of any type
    - Return processed data of same type
    - Raise ValueError for invalid data
    - Be idempotent (same input -> same output)
    """
    
    def process(self, data: Any) -> Any:
        """Process data and return result.
        
        Args:
            data: Input data to process
        
        Returns:
            Processed data
        
        Raises:
            ValueError: If data is invalid
        """
        ...
```

## Summary

Duck typing and Protocols are Python's approach to polymorphism:

### Duck Typing

- **Philosophy**: "If it quacks like a duck, it's a duck"
- **No inheritance**: Just matching methods
- **Runtime checks**: Errors only when method called
- **EAFP**: Try it, handle errors
- **Pythonic**: Flexible, concise

### Protocols

- **Structural subtyping**: Interface without inheritance
- **Static typing**: Type checker verifies at development time
- **No runtime cost**: Just type hints
- **Best of both worlds**: Flexibility + type safety
- **@runtime_checkable**: Optional isinstance() support

### When to Use

**Duck Typing**:
- Simple, obvious interfaces
- Internal code
- Rapid prototyping
- Small scripts

**Protocols**:
- Public APIs
- Large codebases
- Library code
- Complex interfaces
- Team projects

### Key Benefits

- ✅ Flexible interfaces without inheritance
- ✅ Static type checking
- ✅ Clear documentation
- ✅ Easy to mock for testing
- ✅ Pythonic and elegant

In the next lesson, we'll explore **Method Overloading and Overriding**, understanding how to properly extend and modify inherited behavior.

