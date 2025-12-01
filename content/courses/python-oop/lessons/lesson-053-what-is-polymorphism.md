---
id: "053"
title: "What is Polymorphism?"
chapterId: "06"
order: 1
duration: "16 minutes"
objectives:
  - "Understand polymorphism and its importance in OOP"
  - "Learn the different types of polymorphism"
  - "Master polymorphic behavior in Python"
  - "Recognize polymorphism in real-world code"
  - "Apply polymorphism for flexible designs"
---

# What is Polymorphism?

Polymorphism is the ability of different objects to respond to the same method call in different ways. It's one of the core pillars of object-oriented programming, enabling flexible, extensible code.

## Introduction

The word **polymorphism** comes from Greek: "poly" (many) + "morph" (forms) = many forms. In programming, it means that the same interface can have multiple implementations.

Polymorphism allows you to write code that works with objects of different types without knowing their specific type. This is the foundation of flexible, maintainable software design.

## The Core Concept

### Same Interface, Different Behavior

```python
# Different objects, same method name, different behavior
class Dog:
    def speak(self):
        return "Woof!"


class Cat:
    def speak(self):
        return "Meow!"


class Duck:
    def speak(self):
        return "Quack!"


# Polymorphic function - works with any object that has speak()
def make_sound(animal):
    """Works with any animal that can speak."""
    return animal.speak()


# Same function call, different results
dog = Dog()
cat = Cat()
duck = Duck()

print(make_sound(dog))   # "Woof!"
print(make_sound(cat))   # "Meow!"
print(make_sound(duck))  # "Quack!"
```

**Key Insight**: The function `make_sound()` doesn't need to know the specific type. It just needs an object with a `speak()` method.

### Benefits of Polymorphism

1. **Flexibility**: Write generic code that works with many types
2. **Extensibility**: Add new types without changing existing code
3. **Maintainability**: Less code duplication
4. **Abstraction**: Focus on "what" not "how"

## Types of Polymorphism

### 1. Duck Typing (Runtime Polymorphism)

Python's most common form: "If it walks like a duck and quacks like a duck, it's a duck."

```python
# No inheritance needed - just matching interface
class Bird:
    def fly(self):
        return "Flying in the sky"


class Airplane:
    def fly(self):
        return "Flying with engines"


class Butterfly:
    def fly(self):
        return "Fluttering around"


def take_flight(flyer):
    """Works with anything that can fly."""
    return flyer.fly()


# All work, even though unrelated types
print(take_flight(Bird()))       # "Flying in the sky"
print(take_flight(Airplane()))   # "Flying with engines"
print(take_flight(Butterfly()))  # "Fluttering around"
```

No inheritance, no interfaces — just matching method names.

### 2. Subtype Polymorphism (Classical)

Objects of different classes can be treated as objects of a common superclass:

```python
class Shape:
    def area(self):
        raise NotImplementedError


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2


class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height


class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height
    
    def area(self):
        return 0.5 * self.base * self.height


def calculate_total_area(shapes: list[Shape]) -> float:
    """Works with any Shape subclass."""
    return sum(shape.area() for shape in shapes)


# Polymorphism in action
shapes = [
    Circle(5),
    Rectangle(4, 6),
    Triangle(3, 4)
]

total = calculate_total_area(shapes)
print(f"Total area: {total}")
```

### 3. Operator Overloading

Same operator, different behavior based on type:

```python
# + operator behaves differently for different types
print(5 + 3)         # 8 (addition)
print("Hello" + " World")  # "Hello World" (concatenation)
print([1, 2] + [3, 4])     # [1, 2, 3, 4] (list concatenation)


# Custom operator overloading
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        """Define + for vectors."""
        return Vector(self.x + other.x, self.y + other.y)
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"


v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2  # Calls __add__
print(v3)  # Vector(4, 6)
```

### 4. Function Overloading (Simulated in Python)

Python doesn't have traditional function overloading, but we can simulate it:

```python
from typing import Union

def process(data: Union[int, str, list]):
    """Process different types differently."""
    if isinstance(data, int):
        return data * 2
    elif isinstance(data, str):
        return data.upper()
    elif isinstance(data, list):
        return len(data)
    else:
        raise TypeError(f"Unsupported type: {type(data)}")


print(process(5))           # 10
print(process("hello"))     # "HELLO"
print(process([1, 2, 3]))   # 3
```

Better approach using single-dispatch:

```python
from functools import singledispatch

@singledispatch
def process(data):
    """Default implementation."""
    raise TypeError(f"Unsupported type: {type(data)}")


@process.register(int)
def _(data: int):
    return data * 2


@process.register(str)
def _(data: str):
    return data.upper()


@process.register(list)
def _(data: list):
    return len(data)


print(process(5))           # 10
print(process("hello"))     # "HELLO"
print(process([1, 2, 3]))   # 3
```

## Polymorphism in Python

### Duck Typing Philosophy

```python
# Python doesn't check types - just tries to call methods
def process_items(container):
    """Works with any iterable."""
    for item in container:
        print(item)


# All work - different types, same interface
process_items([1, 2, 3])           # list
process_items((4, 5, 6))           # tuple
process_items({7, 8, 9})           # set
process_items("abc")               # string
process_items(range(10, 13))       # range
```

### Protocol-Based Polymorphism

```python
from typing import Protocol

class Drawable(Protocol):
    """Protocol: anything with draw() method."""
    def draw(self) -> str:
        ...


class Circle:
    def draw(self) -> str:
        return "Drawing circle"


class Square:
    def draw(self) -> str:
        return "Drawing square"


class Text:
    def draw(self) -> str:
        return "Drawing text"


def render(drawable: Drawable):
    """Works with any Drawable."""
    return drawable.draw()


# All work - no inheritance needed
print(render(Circle()))
print(render(Square()))
print(render(Text()))
```

### Abstract Base Classes

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    """Abstract base class."""
    
    @abstractmethod
    def make_sound(self) -> str:
        """Must be implemented by subclasses."""
        pass
    
    @abstractmethod
    def move(self) -> str:
        """Must be implemented by subclasses."""
        pass


class Dog(Animal):
    def make_sound(self) -> str:
        return "Woof!"
    
    def move(self) -> str:
        return "Running"


class Fish(Animal):
    def make_sound(self) -> str:
        return "Blub!"
    
    def move(self) -> str:
        return "Swimming"


def describe_animal(animal: Animal):
    """Works with any Animal subclass."""
    print(f"Sound: {animal.make_sound()}")
    print(f"Movement: {animal.move()}")


describe_animal(Dog())
print()
describe_animal(Fish())
```

## Real-World Examples

### Example 1: Payment Processing

```python
class PaymentMethod:
    """Base payment method."""
    def process_payment(self, amount: float) -> dict:
        raise NotImplementedError


class CreditCard(PaymentMethod):
    def __init__(self, card_number: str):
        self.card_number = card_number
    
    def process_payment(self, amount: float) -> dict:
        return {
            'method': 'credit_card',
            'amount': amount,
            'status': 'success',
            'card': f"****{self.card_number[-4:]}"
        }


class PayPal(PaymentMethod):
    def __init__(self, email: str):
        self.email = email
    
    def process_payment(self, amount: float) -> dict:
        return {
            'method': 'paypal',
            'amount': amount,
            'status': 'success',
            'email': self.email
        }


class BankTransfer(PaymentMethod):
    def __init__(self, account_number: str):
        self.account_number = account_number
    
    def process_payment(self, amount: float) -> dict:
        return {
            'method': 'bank_transfer',
            'amount': amount,
            'status': 'success',
            'account': self.account_number
        }


def checkout(payment_method: PaymentMethod, amount: float):
    """Process payment - works with any payment method."""
    print(f"Processing ${amount} payment...")
    result = payment_method.process_payment(amount)
    print(f"Payment via {result['method']}: {result['status']}")
    return result


# Polymorphism - same function, different payment methods
checkout(CreditCard("1234567890123456"), 99.99)
checkout(PayPal("user@example.com"), 49.99)
checkout(BankTransfer("9876543210"), 199.99)
```

### Example 2: File Handlers

```python
class FileHandler:
    """Base file handler."""
    def read(self, filepath: str):
        raise NotImplementedError
    
    def write(self, filepath: str, data):
        raise NotImplementedError


class CSVHandler(FileHandler):
    def read(self, filepath: str):
        print(f"Reading CSV from {filepath}")
        return [["Name", "Age"], ["Alice", "30"], ["Bob", "25"]]
    
    def write(self, filepath: str, data):
        print(f"Writing CSV to {filepath}")
        print(f"Rows written: {len(data)}")


class JSONHandler(FileHandler):
    def read(self, filepath: str):
        print(f"Reading JSON from {filepath}")
        return {"users": [{"name": "Alice", "age": 30}]}
    
    def write(self, filepath: str, data):
        import json
        print(f"Writing JSON to {filepath}")
        print(json.dumps(data, indent=2))


class XMLHandler(FileHandler):
    def read(self, filepath: str):
        print(f"Reading XML from {filepath}")
        return "<users><user>Alice</user></users>"
    
    def write(self, filepath: str, data):
        print(f"Writing XML to {filepath}")
        print(f"<data>{data}</data>")


def process_file(handler: FileHandler, filepath: str, data=None):
    """Process file - works with any handler."""
    content = handler.read(filepath)
    print(f"Read: {content}")
    
    if data:
        handler.write(filepath, data)


# Same function, different file formats
print("CSV:")
process_file(CSVHandler(), "data.csv", [["Name", "Value"]])

print("\nJSON:")
process_file(JSONHandler(), "data.json", {"key": "value"})

print("\nXML:")
process_file(XMLHandler(), "data.xml", "test")
```

### Example 3: Notification System

```python
class Notifier:
    """Base notifier."""
    def send(self, message: str, recipient: str):
        raise NotImplementedError


class EmailNotifier(Notifier):
    def send(self, message: str, recipient: str):
        print(f"📧 Email to {recipient}: {message}")


class SMSNotifier(Notifier):
    def send(self, message: str, recipient: str):
        print(f"📱 SMS to {recipient}: {message}")


class PushNotifier(Notifier):
    def send(self, message: str, recipient: str):
        print(f"🔔 Push to {recipient}: {message}")


class SlackNotifier(Notifier):
    def send(self, message: str, recipient: str):
        print(f"💬 Slack to {recipient}: {message}")


class NotificationService:
    """Service using polymorphism."""
    def __init__(self):
        self.notifiers: list[Notifier] = []
    
    def add_notifier(self, notifier: Notifier):
        self.notifiers.append(notifier)
    
    def notify_all(self, message: str, recipient: str):
        """Send via all notifiers."""
        for notifier in self.notifiers:
            notifier.send(message, recipient)


# Use multiple notifiers polymorphically
service = NotificationService()
service.add_notifier(EmailNotifier())
service.add_notifier(SMSNotifier())
service.add_notifier(PushNotifier())

print("Sending notification via all channels:")
service.notify_all("Your order has shipped!", "customer@example.com")
```

## Key Principles

### Principle 1: Program to Interface, Not Implementation

```python
# ❌ BAD: Depend on concrete types
def process_payment(payment: CreditCard, amount: float):
    return payment.process_payment(amount)


# ✅ GOOD: Depend on abstract interface
def process_payment(payment: PaymentMethod, amount: float):
    return payment.process_payment(amount)
```

### Principle 2: Liskov Substitution Principle

Subclasses must be substitutable for their base class:

```python
def calculate_area(shape: Shape) -> float:
    """Should work with ANY shape."""
    return shape.area()


# All should work identically
shapes = [Circle(5), Rectangle(4, 6), Triangle(3, 4)]
areas = [calculate_area(shape) for shape in shapes]
```

### Principle 3: Open/Closed Principle

Open for extension, closed for modification:

```python
# Adding new payment method doesn't require changing checkout()
class Cryptocurrency(PaymentMethod):
    def process_payment(self, amount: float) -> dict:
        return {'method': 'crypto', 'amount': amount, 'status': 'success'}


# Works immediately - no changes to checkout() needed
checkout(Cryptocurrency(), 299.99)
```

## Benefits of Polymorphism

### 1. Code Reusability

```python
# One function works with many types
def display_info(obj):
    """Works with any object that has __str__."""
    print(str(obj))
```

### 2. Flexibility

```python
# Can swap implementations easily
def process_data(processor):
    """Works with any processor."""
    return processor.process()


# Swap without changing code
result1 = process_data(FastProcessor())
result2 = process_data(AccurateProcessor())
result3 = process_data(CachedProcessor())
```

### 3. Extensibility

```python
# Add new types without changing existing code
class NewShape(Shape):
    def area(self):
        return 42


# Existing code works immediately
shapes.append(NewShape())
total = calculate_total_area(shapes)  # Just works!
```

### 4. Testability

```python
# Easy to create test doubles
class MockPayment(PaymentMethod):
    def process_payment(self, amount: float):
        return {'method': 'mock', 'amount': amount, 'status': 'success'}


# Test with mock
def test_checkout():
    result = checkout(MockPayment(), 100)
    assert result['status'] == 'success'
```

## Common Patterns

### Pattern 1: Strategy Pattern

```python
# Different algorithms, same interface
class SortStrategy:
    def sort(self, data: list) -> list:
        raise NotImplementedError


class QuickSort(SortStrategy):
    def sort(self, data: list) -> list:
        # Quick sort implementation
        return sorted(data)


class MergeSort(SortStrategy):
    def sort(self, data: list) -> list:
        # Merge sort implementation
        return sorted(data)


# Use polymorphically
def sort_data(data: list, strategy: SortStrategy):
    return strategy.sort(data)
```

### Pattern 2: Template Method

```python
class DataProcessor:
    def process(self):
        """Template method."""
        data = self.load_data()
        validated = self.validate_data(data)
        processed = self.process_data(validated)
        self.save_data(processed)
    
    def load_data(self):
        raise NotImplementedError
    
    def validate_data(self, data):
        return data  # Default
    
    def process_data(self, data):
        raise NotImplementedError
    
    def save_data(self, data):
        raise NotImplementedError


# Different implementations of abstract methods
```

## Summary

Polymorphism is the ability to treat different types uniformly:

### Key Concepts

1. **Same interface, different behavior**: Objects respond differently to same method
2. **Duck typing**: Python's default - if it has the method, it works
3. **Subtype polymorphism**: Treat subclasses as superclass
4. **Operator overloading**: Same operator, different types
5. **Protocol-based**: Type hints with Protocol

### Types in Python

- **Duck typing**: No inheritance needed
- **Subclass polymorphism**: Classical OOP
- **Operator overloading**: Special methods (`__add__`, etc.)
- **Protocols**: Structural subtyping

### Benefits

- ✅ Flexible, reusable code
- ✅ Easy to extend with new types
- ✅ Reduces coupling
- ✅ Enables design patterns
- ✅ Improves testability

### Best Practices

- Program to interfaces, not implementations
- Use abstract base classes for contracts
- Follow Liskov Substitution Principle
- Leverage duck typing when appropriate
- Document expected interfaces

In the next lesson, we'll explore **Duck Typing and Protocols** in depth, Python's unique approach to polymorphism.

