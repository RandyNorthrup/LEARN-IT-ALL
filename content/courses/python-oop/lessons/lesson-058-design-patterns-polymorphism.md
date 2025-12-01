---
id: "058"
title: "Design Patterns with Polymorphism"
chapterId: "06"
order: 6
duration: "22 minutes"
objectives:
  - "Implement Strategy pattern with polymorphism"
  - "Use Factory pattern for object creation"
  - "Apply Observer pattern for event systems"
  - "Master Command pattern for encapsulating actions"
  - "Understand when to use each pattern"
---

# Design Patterns with Polymorphism

Design patterns are proven solutions to common software design problems. Polymorphism makes implementing these patterns natural and elegant in Python.

## Introduction

**Design Patterns** are reusable solutions to recurring problems. Polymorphism enables:
- Interchangeable implementations
- Open/Closed principle (open for extension, closed for modification)
- Flexible, maintainable designs

We'll cover four essential patterns: Strategy, Factory, Observer, and Command.

## Strategy Pattern

**Strategy Pattern**: Define a family of algorithms, encapsulate each one, and make them interchangeable.

### Problem

Hard-coded payment processing:

```python
# ❌ BAD: Hard to extend
class PaymentProcessor:
    def process_payment(self, amount: float, method: str):
        if method == "credit_card":
            print(f"Processing ${amount} via credit card")
            # Credit card logic
        elif method == "paypal":
            print(f"Processing ${amount} via PayPal")
            # PayPal logic
        elif method == "bitcoin":
            print(f"Processing ${amount} via Bitcoin")
            # Bitcoin logic
        # Adding new payment method requires modifying this class!
```

### Solution with Strategy Pattern

```python
from abc import ABC, abstractmethod

# Strategy interface
class PaymentStrategy(ABC):
    """Abstract payment strategy."""
    
    @abstractmethod
    def pay(self, amount: float) -> bool:
        """Process payment."""
        pass


# Concrete strategies
class CreditCardStrategy(PaymentStrategy):
    """Credit card payment strategy."""
    
    def __init__(self, card_number: str, cvv: str):
        self.card_number = card_number
        self.cvv = cvv
    
    def pay(self, amount: float) -> bool:
        print(f"Paying ${amount} with credit card {self.card_number[-4:]}")
        return True


class PayPalStrategy(PaymentStrategy):
    """PayPal payment strategy."""
    
    def __init__(self, email: str):
        self.email = email
    
    def pay(self, amount: float) -> bool:
        print(f"Paying ${amount} via PayPal account {self.email}")
        return True


class BitcoinStrategy(PaymentStrategy):
    """Bitcoin payment strategy."""
    
    def __init__(self, wallet_address: str):
        self.wallet_address = wallet_address
    
    def pay(self, amount: float) -> bool:
        print(f"Paying ${amount} via Bitcoin to {self.wallet_address}")
        return True


# Context using strategy
class ShoppingCart:
    """Shopping cart using payment strategy."""
    
    def __init__(self):
        self.items = []
        self.payment_strategy = None
    
    def add_item(self, item: str, price: float):
        self.items.append((item, price))
    
    def set_payment_strategy(self, strategy: PaymentStrategy):
        """Set payment strategy at runtime."""
        self.payment_strategy = strategy
    
    def checkout(self) -> bool:
        """Process payment using selected strategy."""
        if not self.payment_strategy:
            raise ValueError("No payment strategy set")
        
        total = sum(price for _, price in self.items)
        print(f"Total: ${total}")
        return self.payment_strategy.pay(total)


# Usage - can switch strategies dynamically
cart = ShoppingCart()
cart.add_item("Book", 15.99)
cart.add_item("Pen", 2.49)

# Pay with credit card
cart.set_payment_strategy(CreditCardStrategy("1234567890123456", "123"))
cart.checkout()

# Change strategy and checkout again
cart.set_payment_strategy(PayPalStrategy("user@example.com"))
cart.checkout()

# Add new strategy without modifying existing code!
class ApplePayStrategy(PaymentStrategy):
    def __init__(self, device_id: str):
        self.device_id = device_id
    
    def pay(self, amount: float) -> bool:
        print(f"Paying ${amount} via Apple Pay on device {self.device_id}")
        return True


cart.set_payment_strategy(ApplePayStrategy("iPhone-12"))
cart.checkout()
```

## Factory Pattern

**Factory Pattern**: Create objects without specifying exact classes.

### Problem

Tight coupling to concrete classes:

```python
# ❌ BAD: Tight coupling
def create_shape(shape_type: str):
    if shape_type == "circle":
        return Circle(5)
    elif shape_type == "square":
        return Square(10)
    # Adding new shape requires modifying this function
```

### Solution with Factory Pattern

```python
from abc import ABC, abstractmethod

# Product interface
class Shape(ABC):
    """Abstract shape."""
    
    @abstractmethod
    def draw(self) -> str:
        pass
    
    @abstractmethod
    def area(self) -> float:
        pass


# Concrete products
class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius
    
    def draw(self) -> str:
        return f"Drawing circle with radius {self.radius}"
    
    def area(self) -> float:
        return 3.14159 * self.radius ** 2


class Square(Shape):
    def __init__(self, side: float):
        self.side = side
    
    def draw(self) -> str:
        return f"Drawing square with side {self.side}"
    
    def area(self) -> float:
        return self.side ** 2


class Triangle(Shape):
    def __init__(self, base: float, height: float):
        self.base = base
        self.height = height
    
    def draw(self) -> str:
        return f"Drawing triangle with base {self.base} and height {self.height}"
    
    def area(self) -> float:
        return 0.5 * self.base * self.height


# Factory
class ShapeFactory:
    """Factory for creating shapes."""
    
    # Registry of shape types
    _shapes = {
        'circle': Circle,
        'square': Square,
        'triangle': Triangle
    }
    
    @classmethod
    def create(cls, shape_type: str, **kwargs) -> Shape:
        """Create shape by type."""
        shape_class = cls._shapes.get(shape_type.lower())
        if not shape_class:
            raise ValueError(f"Unknown shape type: {shape_type}")
        return shape_class(**kwargs)
    
    @classmethod
    def register_shape(cls, name: str, shape_class: type):
        """Register new shape type."""
        cls._shapes[name.lower()] = shape_class


# Usage
circle = ShapeFactory.create('circle', radius=5)
square = ShapeFactory.create('square', side=10)
triangle = ShapeFactory.create('triangle', base=8, height=6)

print(circle.draw())
print(f"Area: {circle.area()}")

# Add new shape without modifying factory!
class Pentagon(Shape):
    def __init__(self, side: float):
        self.side = side
    
    def draw(self) -> str:
        return f"Drawing pentagon with side {self.side}"
    
    def area(self) -> float:
        return 1.72 * self.side ** 2


ShapeFactory.register_shape('pentagon', Pentagon)
pentagon = ShapeFactory.create('pentagon', side=7)
print(pentagon.draw())
```

## Observer Pattern

**Observer Pattern**: Define one-to-many dependency where multiple objects observe and react to state changes.

### Solution with Observer Pattern

```python
from abc import ABC, abstractmethod
from typing import List

# Observer interface
class Observer(ABC):
    """Abstract observer."""
    
    @abstractmethod
    def update(self, subject: 'Subject') -> None:
        """Receive update from subject."""
        pass


# Subject (Observable)
class Subject:
    """Subject being observed."""
    
    def __init__(self):
        self._observers: List[Observer] = []
        self._state = None
    
    def attach(self, observer: Observer) -> None:
        """Attach observer."""
        if observer not in self._observers:
            self._observers.append(observer)
            print(f"Attached {observer.__class__.__name__}")
    
    def detach(self, observer: Observer) -> None:
        """Detach observer."""
        self._observers.remove(observer)
        print(f"Detached {observer.__class__.__name__}")
    
    def notify(self) -> None:
        """Notify all observers of state change."""
        print("Notifying observers...")
        for observer in self._observers:
            observer.update(self)
    
    @property
    def state(self):
        return self._state
    
    @state.setter
    def state(self, value):
        self._state = value
        self.notify()  # Automatically notify on state change


# Concrete observers
class EmailNotifier(Observer):
    """Send email notification."""
    
    def update(self, subject: Subject) -> None:
        print(f"EmailNotifier: Sending email about state change to {subject.state}")


class SMSNotifier(Observer):
    """Send SMS notification."""
    
    def update(self, subject: Subject) -> None:
        print(f"SMSNotifier: Sending SMS about state change to {subject.state}")


class Logger(Observer):
    """Log state changes."""
    
    def update(self, subject: Subject) -> None:
        print(f"Logger: Recording state change to {subject.state}")


# Usage
subject = Subject()

# Attach observers
email = EmailNotifier()
sms = SMSNotifier()
logger = Logger()

subject.attach(email)
subject.attach(sms)
subject.attach(logger)

# Change state - all observers notified
print("\nChanging state to 'Processing':")
subject.state = "Processing"

print("\nChanging state to 'Complete':")
subject.state = "Complete"

# Can detach observers
print("\nDetaching email notifier:")
subject.detach(email)

print("\nChanging state to 'Archived':")
subject.state = "Archived"
```

## Command Pattern

**Command Pattern**: Encapsulate a request as an object, allowing parameterization and queuing.

### Solution with Command Pattern

```python
from abc import ABC, abstractmethod
from typing import List

# Receiver - the actual object performing actions
class Light:
    """Light that can be controlled."""
    
    def __init__(self, location: str):
        self.location = location
        self.is_on = False
    
    def turn_on(self):
        self.is_on = True
        print(f"{self.location} light is ON")
    
    def turn_off(self):
        self.is_on = False
        print(f"{self.location} light is OFF")


# Command interface
class Command(ABC):
    """Abstract command."""
    
    @abstractmethod
    def execute(self) -> None:
        """Execute command."""
        pass
    
    @abstractmethod
    def undo(self) -> None:
        """Undo command."""
        pass


# Concrete commands
class LightOnCommand(Command):
    """Command to turn light on."""
    
    def __init__(self, light: Light):
        self.light = light
    
    def execute(self) -> None:
        self.light.turn_on()
    
    def undo(self) -> None:
        self.light.turn_off()


class LightOffCommand(Command):
    """Command to turn light off."""
    
    def __init__(self, light: Light):
        self.light = light
    
    def execute(self) -> None:
        self.light.turn_off()
    
    def undo(self) -> None:
        self.light.turn_on()


# Invoker - executes commands
class RemoteControl:
    """Remote control that executes commands."""
    
    def __init__(self):
        self.history: List[Command] = []
    
    def execute_command(self, command: Command) -> None:
        """Execute command and store in history."""
        command.execute()
        self.history.append(command)
    
    def undo_last(self) -> None:
        """Undo last command."""
        if self.history:
            command = self.history.pop()
            command.undo()
        else:
            print("Nothing to undo")


# Usage
living_room_light = Light("Living Room")
bedroom_light = Light("Bedroom")

remote = RemoteControl()

# Create commands
living_on = LightOnCommand(living_room_light)
living_off = LightOffCommand(living_room_light)
bedroom_on = LightOnCommand(bedroom_light)

# Execute commands
remote.execute_command(living_on)
remote.execute_command(bedroom_on)
remote.execute_command(living_off)

# Undo commands
print("\nUndoing commands:")
remote.undo_last()  # Undoes living_off (turns living room light on)
remote.undo_last()  # Undoes bedroom_on (turns bedroom light off)
```

## Real-World Example: Document Processing System

Combining multiple patterns:

```python
from abc import ABC, abstractmethod
from typing import List, Dict
from enum import Enum

# Strategy Pattern: Processing strategies
class DocumentProcessor(ABC):
    """Abstract document processor strategy."""
    
    @abstractmethod
    def process(self, content: str) -> str:
        pass


class MarkdownProcessor(DocumentProcessor):
    """Process markdown documents."""
    def process(self, content: str) -> str:
        return f"<markdown>{content}</markdown>"


class HTMLProcessor(DocumentProcessor):
    """Process HTML documents."""
    def process(self, content: str) -> str:
        return f"<html>{content}</html>"


class PlainTextProcessor(DocumentProcessor):
    """Process plain text documents."""
    def process(self, content: str) -> str:
        return f"[TEXT]{content}[/TEXT]"


# Factory Pattern: Document creation
class DocumentType(Enum):
    MARKDOWN = "md"
    HTML = "html"
    TEXT = "txt"


class Document:
    """Document with processor."""
    
    def __init__(self, name: str, content: str, processor: DocumentProcessor):
        self.name = name
        self.content = content
        self.processor = processor
    
    def render(self) -> str:
        return self.processor.process(self.content)


class DocumentFactory:
    """Factory for creating documents."""
    
    _processors = {
        DocumentType.MARKDOWN: MarkdownProcessor,
        DocumentType.HTML: HTMLProcessor,
        DocumentType.TEXT: PlainTextProcessor
    }
    
    @classmethod
    def create_document(
        cls,
        name: str,
        content: str,
        doc_type: DocumentType
    ) -> Document:
        """Create document with appropriate processor."""
        processor_class = cls._processors[doc_type]
        processor = processor_class()
        return Document(name, content, processor)


# Observer Pattern: Document events
class DocumentObserver(ABC):
    """Observer for document events."""
    
    @abstractmethod
    def on_document_processed(self, doc: Document) -> None:
        pass


class DocumentLogger(DocumentObserver):
    """Log document processing."""
    def on_document_processed(self, doc: Document) -> None:
        print(f"LOG: Processed document '{doc.name}'")


class DocumentCounter(DocumentObserver):
    """Count processed documents."""
    def __init__(self):
        self.count = 0
    
    def on_document_processed(self, doc: Document) -> None:
        self.count += 1
        print(f"COUNT: Total documents processed: {self.count}")


# Command Pattern: Document operations
class DocumentCommand(ABC):
    """Abstract document command."""
    
    @abstractmethod
    def execute(self) -> None:
        pass
    
    @abstractmethod
    def undo(self) -> None:
        pass


class ProcessDocumentCommand(DocumentCommand):
    """Command to process document."""
    
    def __init__(self, doc: Document, observers: List[DocumentObserver]):
        self.doc = doc
        self.observers = observers
        self.result = None
    
    def execute(self) -> None:
        self.result = self.doc.render()
        print(f"Processed: {self.doc.name}")
        
        # Notify observers
        for observer in self.observers:
            observer.on_document_processed(self.doc)
    
    def undo(self) -> None:
        print(f"Undoing processing of {self.doc.name}")
        self.result = None


class DocumentSystem:
    """Complete document processing system."""
    
    def __init__(self):
        self.documents: Dict[str, Document] = {}
        self.observers: List[DocumentObserver] = []
        self.command_history: List[DocumentCommand] = []
    
    def add_observer(self, observer: DocumentObserver) -> None:
        """Add observer."""
        self.observers.append(observer)
    
    def create_document(
        self,
        name: str,
        content: str,
        doc_type: DocumentType
    ) -> Document:
        """Create document using factory."""
        doc = DocumentFactory.create_document(name, content, doc_type)
        self.documents[name] = doc
        print(f"Created document: {name} ({doc_type.value})")
        return doc
    
    def process_document(self, name: str) -> None:
        """Process document using command pattern."""
        if name not in self.documents:
            print(f"Document not found: {name}")
            return
        
        doc = self.documents[name]
        command = ProcessDocumentCommand(doc, self.observers)
        command.execute()
        self.command_history.append(command)
    
    def undo_last_operation(self) -> None:
        """Undo last command."""
        if self.command_history:
            command = self.command_history.pop()
            command.undo()
        else:
            print("No operations to undo")


# Usage - Complete system demonstration
print("=== Document Processing System ===\n")

system = DocumentSystem()

# Add observers
logger = DocumentLogger()
counter = DocumentCounter()
system.add_observer(logger)
system.add_observer(counter)

# Create documents using factory
doc1 = system.create_document(
    "README",
    "# Hello World",
    DocumentType.MARKDOWN
)

doc2 = system.create_document(
    "index",
    "<h1>Welcome</h1>",
    DocumentType.HTML
)

doc3 = system.create_document(
    "notes",
    "Simple text notes",
    DocumentType.TEXT
)

print("\n--- Processing Documents ---")
system.process_document("README")
system.process_document("index")
system.process_document("notes")

print("\n--- Undo Last Operation ---")
system.undo_last_operation()

print("\n--- Process Another Document ---")
system.process_document("README")
```

## Summary

Design patterns leverage polymorphism for flexible solutions:

### Patterns Covered

1. **Strategy Pattern**
   - Define family of interchangeable algorithms
   - Select algorithm at runtime
   - Use: Multiple ways to do same task

2. **Factory Pattern**
   - Create objects without specifying exact class
   - Centralize object creation logic
   - Use: Complex object creation, many product types

3. **Observer Pattern**
   - One-to-many dependency
   - Automatic notification of changes
   - Use: Event systems, pub/sub

4. **Command Pattern**
   - Encapsulate requests as objects
   - Support undo/redo
   - Use: Action queuing, macros, transactions

### When to Use Each Pattern

| Pattern | Use When |
|---------|----------|
| Strategy | Multiple algorithms for same task, select at runtime |
| Factory | Creating objects with complex initialization |
| Observer | Multiple objects react to state changes |
| Command | Need to queue, log, or undo operations |

### Benefits of Polymorphism in Patterns

- ✅ Open/Closed Principle (extend without modifying)
- ✅ Single Responsibility (each class has one job)
- ✅ Dependency Inversion (depend on abstractions)
- ✅ Easy to test (mock implementations)
- ✅ Flexible and maintainable code

### Pattern Comparison

| Aspect | Strategy | Factory | Observer | Command |
|--------|----------|---------|----------|---------|
| Focus | Algorithm | Creation | Notification | Encapsulation |
| Runtime change | Yes | No | Yes | No |
| Multiple implementations | Yes | Yes | Yes | Yes |
| Undo support | No | No | No | Yes |

In the next lesson, we'll cover **Polymorphism Best Practices**, providing guidelines for writing effective polymorphic code.

