---
id: "057"
title: "Type Hints and Polymorphism"
chapterId: "06"
order: 5
duration: "20 minutes"
objectives:
  - "Use type hints with polymorphic code"
  - "Master Union types and Optional for flexibility"
  - "Leverage TypeVar for generic polymorphism"
  - "Use Protocol for structural type hints"
  - "Understand type checking with mypy"
---

# Type Hints and Polymorphism

Type hints make polymorphic code more maintainable by documenting expected types while preserving flexibility. They enable static type checkers to catch errors before runtime.

## Introduction

Type hints in Python:
- Document expected types
- Enable static type checking (mypy, pyright)
- Support IDE autocompletion
- Don't affect runtime performance
- Work perfectly with polymorphism

## Basic Type Hints with Polymorphism

### Without Type Hints

```python
def process_items(items):
    """Process items - but what types?"""
    total = 0
    for item in items:
        total += item.price  # Is this safe?
    return total
```

### With Type Hints

```python
from typing import List

class Product:
    def __init__(self, name: str, price: float):
        self.name = name
        self.price = price


def process_items(items: List[Product]) -> float:
    """Process items - now type checker knows what to expect."""
    total: float = 0.0
    for item in items:
        total += item.price  # ✅ Type checker verifies Product has .price
    return total


# Usage
products: List[Product] = [
    Product("Apple", 0.50),
    Product("Banana", 0.30)
]

total: float = process_items(products)
```

### Polymorphic Type Hints

```python
from typing import List

class Animal:
    def make_sound(self) -> str:
        return "Some sound"


class Dog(Animal):
    def make_sound(self) -> str:
        return "Woof"


class Cat(Animal):
    def make_sound(self) -> str:
        return "Meow"


# Accept any Animal (or subclass)
def animal_concert(animals: List[Animal]) -> None:
    """Type hint accepts Animal and all subclasses."""
    for animal in animals:
        print(animal.make_sound())


# Works with mixed animal types
animals: List[Animal] = [Dog(), Cat(), Dog()]
animal_concert(animals)  # ✅ Type checker approves
```

## Union Types

Accept multiple specific types:

```python
from typing import Union

class FileStorage:
    def save(self, path: str, data: str) -> None:
        print(f"Saving to file: {path}")


class DatabaseStorage:
    def save(self, table: str, data: str) -> None:
        print(f"Saving to database: {table}")


# Accept either storage type
def backup_data(
    data: str,
    storage: Union[FileStorage, DatabaseStorage]
) -> None:
    """Accepts FileStorage OR DatabaseStorage."""
    storage.save("backup", data)


# Both work
backup_data("data", FileStorage())
backup_data("data", DatabaseStorage())
```

### Union with None (Optional)

```python
from typing import Optional

class User:
    def __init__(self, name: str):
        self.name = name


def find_user(user_id: int) -> Optional[User]:
    """Returns User or None if not found.
    
    Optional[User] is shorthand for Union[User, None]
    """
    if user_id == 1:
        return User("Alice")
    return None


# Must handle None case
user: Optional[User] = find_user(1)
if user is not None:
    print(user.name)  # ✅ Type checker knows user is User here
else:
    print("User not found")
```

## Generic Types with TypeVar

Create functions that work with any type:

```python
from typing import TypeVar, List

T = TypeVar('T')

def first_element(items: List[T]) -> T:
    """Return first element - preserves type."""
    return items[0]


# Type checker infers return type
numbers: List[int] = [1, 2, 3]
first_num: int = first_element(numbers)  # Returns int

words: List[str] = ["hello", "world"]
first_word: str = first_element(words)  # Returns str
```

### Bounded TypeVar

Constrain TypeVar to specific types:

```python
from typing import TypeVar

class Animal:
    def make_sound(self) -> str:
        return "sound"


class Dog(Animal):
    def make_sound(self) -> str:
        return "Woof"


class Cat(Animal):
    def make_sound(self) -> str:
        return "Meow"


# T must be Animal or subclass
T = TypeVar('T', bound=Animal)

def make_noise(animal: T) -> T:
    """Accept any Animal, return same type."""
    print(animal.make_sound())
    return animal


dog: Dog = Dog()
same_dog: Dog = make_noise(dog)  # Returns Dog, not Animal

cat: Cat = Cat()
same_cat: Cat = make_noise(cat)  # Returns Cat, not Animal
```

### Generic Classes

```python
from typing import TypeVar, Generic, List

T = TypeVar('T')

class Stack(Generic[T]):
    """Generic stack - works with any type."""
    
    def __init__(self):
        self._items: List[T] = []
    
    def push(self, item: T) -> None:
        """Add item to stack."""
        self._items.append(item)
    
    def pop(self) -> T:
        """Remove and return top item."""
        return self._items.pop()
    
    def peek(self) -> T:
        """View top item without removing."""
        return self._items[-1]


# Type-specific stacks
int_stack: Stack[int] = Stack()
int_stack.push(1)
int_stack.push(2)
num: int = int_stack.pop()  # Type checker knows it's int

str_stack: Stack[str] = Stack()
str_stack.push("hello")
word: str = str_stack.pop()  # Type checker knows it's str
```

## Protocol for Duck Typing

Type hint duck typing without inheritance:

```python
from typing import Protocol

class Drawable(Protocol):
    """Protocol for drawable objects."""
    def draw(self) -> str:
        ...


class Circle:
    """No inheritance from Drawable."""
    def draw(self) -> str:
        return "Drawing circle"


class Square:
    """No inheritance from Drawable."""
    def draw(self) -> str:
        return "Drawing square"


# Type hint with Protocol
def render(shape: Drawable) -> None:
    """Accepts anything with draw() method."""
    print(shape.draw())


# Both work without inheritance
render(Circle())  # ✅
render(Square())  # ✅
```

### Protocol with Properties

```python
from typing import Protocol

class Measurable(Protocol):
    """Protocol requiring properties."""
    
    @property
    def width(self) -> float:
        ...
    
    @property
    def height(self) -> float:
        ...
    
    def area(self) -> float:
        ...


class Rectangle:
    """Implements Measurable protocol."""
    
    def __init__(self, width: float, height: float):
        self._width = width
        self._height = height
    
    @property
    def width(self) -> float:
        return self._width
    
    @property
    def height(self) -> float:
        return self._height
    
    def area(self) -> float:
        return self.width * self.height


def describe_shape(shape: Measurable) -> str:
    """Works with any Measurable."""
    return f"Area: {shape.area()}, Dimensions: {shape.width}x{shape.height}"


rect = Rectangle(10, 5)
print(describe_shape(rect))
```

## Real-World Example: Data Processing Pipeline

```python
from typing import Protocol, TypeVar, Generic, List, Optional, Union
from abc import ABC, abstractmethod

# Protocol for data validation
class Validator(Protocol):
    """Protocol for validators."""
    def validate(self, data: str) -> bool:
        """Validate data."""
        ...


# Concrete validators
class EmailValidator:
    """Email validator."""
    def validate(self, data: str) -> bool:
        return '@' in data and '.' in data


class PhoneValidator:
    """Phone validator."""
    def validate(self, data: str) -> bool:
        return len(data) >= 10 and data.replace('-', '').isdigit()


# Generic data type
T = TypeVar('T')

# Abstract processor
class DataProcessor(ABC, Generic[T]):
    """Abstract data processor."""
    
    @abstractmethod
    def process(self, data: T) -> T:
        """Process data."""
        pass


# Concrete processors
class UppercaseProcessor(DataProcessor[str]):
    """Convert string to uppercase."""
    def process(self, data: str) -> str:
        return data.upper()


class TrimProcessor(DataProcessor[str]):
    """Trim whitespace from string."""
    def process(self, data: str) -> str:
        return data.strip()


class MultiplyProcessor(DataProcessor[int]):
    """Multiply integer by factor."""
    def __init__(self, factor: int):
        self.factor = factor
    
    def process(self, data: int) -> int:
        return data * self.factor


# Result type
class ProcessingResult(Generic[T]):
    """Processing result with validation."""
    
    def __init__(
        self,
        data: T,
        valid: bool,
        errors: Optional[List[str]] = None
    ):
        self.data = data
        self.valid = valid
        self.errors = errors or []
    
    def __repr__(self) -> str:
        status = "✅ Valid" if self.valid else "❌ Invalid"
        return f"Result({status}, data={self.data}, errors={self.errors})"


# Pipeline with type hints
class Pipeline(Generic[T]):
    """Data processing pipeline."""
    
    def __init__(self, validator: Optional[Validator] = None):
        self.validator = validator
        self.processors: List[DataProcessor[T]] = []
    
    def add_processor(self, processor: DataProcessor[T]) -> 'Pipeline[T]':
        """Add processor to pipeline."""
        self.processors.append(processor)
        return self  # For method chaining
    
    def process(self, data: T) -> ProcessingResult[T]:
        """Process data through pipeline."""
        # Validate first
        if self.validator:
            if not self.validator.validate(str(data)):
                return ProcessingResult(
                    data=data,
                    valid=False,
                    errors=["Validation failed"]
                )
        
        # Process through pipeline
        result = data
        for processor in self.processors:
            result = processor.process(result)
        
        return ProcessingResult(data=result, valid=True)
    
    def process_batch(self, items: List[T]) -> List[ProcessingResult[T]]:
        """Process multiple items."""
        return [self.process(item) for item in items]


# Usage with string pipeline
email_pipeline: Pipeline[str] = Pipeline(EmailValidator())
email_pipeline.add_processor(TrimProcessor())
email_pipeline.add_processor(UppercaseProcessor())

# Process single email
result1: ProcessingResult[str] = email_pipeline.process("  user@example.com  ")
print(result1)
# Result(✅ Valid, data=USER@EXAMPLE.COM, errors=[])

# Invalid email
result2: ProcessingResult[str] = email_pipeline.process("invalid-email")
print(result2)
# Result(❌ Invalid, data=invalid-email, errors=['Validation failed'])

# Process batch
emails: List[str] = [
    "alice@example.com",
    "bob@example.com  ",
    "invalid"
]
results: List[ProcessingResult[str]] = email_pipeline.process_batch(emails)
for result in results:
    print(result)

# Usage with int pipeline
number_pipeline: Pipeline[int] = Pipeline()
number_pipeline.add_processor(MultiplyProcessor(2))
number_pipeline.add_processor(MultiplyProcessor(3))

result3: ProcessingResult[int] = number_pipeline.process(5)
print(result3)
# Result(✅ Valid, data=30, errors=[])


# Type-safe storage interface
StorageType = TypeVar('StorageType')

class Storage(Protocol, Generic[StorageType]):
    """Generic storage protocol."""
    def save(self, key: str, value: StorageType) -> None:
        ...
    
    def load(self, key: str) -> Optional[StorageType]:
        ...


class InMemoryStorage(Generic[T]):
    """In-memory storage implementation."""
    
    def __init__(self):
        self._data: dict[str, T] = {}
    
    def save(self, key: str, value: T) -> None:
        self._data[key] = value
    
    def load(self, key: str) -> Optional[T]:
        return self._data.get(key)


# Type-specific storages
string_storage: InMemoryStorage[str] = InMemoryStorage()
string_storage.save("greeting", "Hello")
greeting: Optional[str] = string_storage.load("greeting")

int_storage: InMemoryStorage[int] = InMemoryStorage()
int_storage.save("count", 42)
count: Optional[int] = int_storage.load("count")


# Repository pattern with type hints
class Repository(ABC, Generic[T]):
    """Abstract repository."""
    
    def __init__(self, storage: Storage[T]):
        self.storage = storage
    
    def save(self, id: str, entity: T) -> None:
        """Save entity."""
        self.storage.save(id, entity)
    
    def find(self, id: str) -> Optional[T]:
        """Find entity by ID."""
        return self.storage.load(id)


class User:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email
    
    def __repr__(self) -> str:
        return f"User(name={self.name}, email={self.email})"


class UserRepository(Repository[User]):
    """User repository."""
    pass


# Usage
user_storage: InMemoryStorage[User] = InMemoryStorage()
user_repo: UserRepository = UserRepository(user_storage)

user_repo.save("1", User("Alice", "alice@example.com"))
found_user: Optional[User] = user_repo.find("1")
print(found_user)
```

## Type Checking with mypy

### Running mypy

```bash
# Install mypy
pip install mypy

# Check file
mypy your_file.py

# Check with strict mode
mypy --strict your_file.py
```

### Common Type Errors

```python
from typing import List

def process_numbers(numbers: List[int]) -> int:
    return sum(numbers)


# ❌ Type error: List[str] is not List[int]
process_numbers(["1", "2", "3"])  # mypy error!

# ✅ Correct
process_numbers([1, 2, 3])


# ❌ Type error: missing return
def get_value(x: int) -> int:
    if x > 0:
        return x
    # mypy error: not all paths return a value


# ✅ Correct
def get_value(x: int) -> int:
    if x > 0:
        return x
    return 0
```

## Best Practices

### Practice 1: Use Protocols for Duck Typing

```python
# ✅ GOOD: Protocol for duck typing
from typing import Protocol

class Closable(Protocol):
    def close(self) -> None:
        ...


def cleanup(resource: Closable) -> None:
    resource.close()


# ❌ BAD: Forcing inheritance
class Closable:
    def close(self) -> None:
        pass


class File(Closable):  # Forced to inherit
    def close(self) -> None:
        pass
```

### Practice 2: Use TypeVar for Generic Functions

```python
from typing import TypeVar, List

T = TypeVar('T')

# ✅ GOOD: Preserves type
def first(items: List[T]) -> T:
    return items[0]


nums = [1, 2, 3]
x = first(nums)  # x is int

# ❌ BAD: Loses type information
def first(items: list) -> object:
    return items[0]


nums = [1, 2, 3]
x = first(nums)  # x is object (less useful)
```

### Practice 3: Use Optional for Nullable Returns

```python
from typing import Optional

# ✅ GOOD: Explicit about None
def find_user(id: int) -> Optional[User]:
    if id in users:
        return users[id]
    return None


# ❌ BAD: Unclear if None is possible
def find_user(id: int) -> User:
    if id in users:
        return users[id]
    return None  # Type checker unhappy!
```

### Practice 4: Type Hint Collections Generically

```python
from typing import List, Dict, Set

# ✅ GOOD: Specific element types
def process_names(names: List[str]) -> Dict[str, int]:
    return {name: len(name) for name in names}


# ❌ BAD: No element types
def process_names(names: list) -> dict:
    return {name: len(name) for name in names}
```

## Summary

Type hints enhance polymorphic code with static checking:

### Key Concepts

1. **Type hints**: Document expected types without runtime impact
2. **Union types**: Accept multiple specific types
3. **Optional**: Shorthand for Union[T, None]
4. **TypeVar**: Create generic functions and classes
5. **Protocol**: Type hint duck typing
6. **Generic**: Create type-safe containers
7. **mypy**: Static type checker for Python

### Benefits

- ✅ Catch type errors before runtime
- ✅ Better IDE autocompletion
- ✅ Self-documenting code
- ✅ Refactoring confidence
- ✅ Works with polymorphism
- ✅ No performance cost

### Type Hint Tools

| Feature | Use Case |
|---------|----------|
| `Union[A, B]` | Accept A or B |
| `Optional[T]` | Accept T or None |
| `TypeVar('T')` | Generic type variable |
| `Protocol` | Duck typing interface |
| `Generic[T]` | Generic class |
| `List[T]` | Typed list |
| `Dict[K, V]` | Typed dictionary |

### Best Practices

- ✅ Use Protocols for duck typing
- ✅ Use TypeVar for generic functions
- ✅ Use Optional for nullable returns
- ✅ Type hint collection elements
- ✅ Run mypy to catch errors
- ❌ Don't over-complicate simple code
- ❌ Don't use `Any` unless necessary

In the next lesson, we'll explore **Design Patterns with Polymorphism**, using polymorphism to implement common design patterns elegantly.

