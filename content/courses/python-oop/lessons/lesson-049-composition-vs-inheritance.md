---
id: "049"
title: "Composition vs Inheritance"
chapterId: "05"
order: 7
duration: "20 minutes"
objectives:
  - "Understand the difference between composition and inheritance"
  - "Master the 'has-a' vs 'is-a' relationship distinction"
  - "Learn when to prefer composition over inheritance"
  - "Refactor inheritance to composition effectively"
  - "Apply the principle 'favor composition over inheritance'"
---

# Composition vs Inheritance

"Favor composition over inheritance" is one of the most important principles in object-oriented design. This lesson explores the key differences between these two approaches, when to use each, and how to refactor between them.

## Introduction

Both inheritance and composition are mechanisms for code reuse and building relationships between classes:

- **Inheritance**: "is-a" relationship — a Car **is a** Vehicle
- **Composition**: "has-a" relationship — a Car **has an** Engine

While inheritance is powerful, it creates tight coupling and rigid hierarchies. Composition offers flexibility, loose coupling, and easier testing. Understanding when to use each is crucial for maintainable design.

## The Fundamental Difference

### Inheritance: "Is-A" Relationship

```python
class Vehicle:
    def __init__(self, brand: str):
        self.brand = brand
    
    def start(self):
        return f"{self.brand} vehicle starting"


class Car(Vehicle):  # Car IS-A Vehicle
    def __init__(self, brand: str, model: str):
        super().__init__(brand)
        self.model = model
    
    def drive(self):
        return f"Driving {self.brand} {self.model}"


car = Car("Toyota", "Camry")
print(isinstance(car, Vehicle))  # True - Car is a Vehicle
print(car.start())
print(car.drive())
```

Inheritance creates an "is-a" relationship: Car **is a** Vehicle.

### Composition: "Has-A" Relationship

```python
class Engine:
    def __init__(self, horsepower: int):
        self.horsepower = horsepower
    
    def start(self):
        return f"Engine with {self.horsepower}hp starting"


class Car:  # Car HAS-AN Engine
    def __init__(self, brand: str, model: str, engine: Engine):
        self.brand = brand
        self.model = model
        self.engine = engine  # Composition
    
    def start(self):
        return f"{self.brand} {self.model}: {self.engine.start()}"
    
    def drive(self):
        return f"Driving {self.brand} {self.model}"


engine = Engine(200)
car = Car("Toyota", "Camry", engine)
print(isinstance(car, Engine))  # False - Car is not an Engine
print(car.start())
print(car.drive())
```

Composition creates a "has-a" relationship: Car **has an** Engine.

## Comparing the Approaches

### Code Reuse

Both enable code reuse, but differently:

```python
# Inheritance: Reuse through extension
class Animal:
    def eat(self):
        return "Eating"
    
    def sleep(self):
        return "Sleeping"


class Dog(Animal):  # Inherits eat() and sleep()
    def bark(self):
        return "Woof!"


dog = Dog()
print(dog.eat())    # Inherited
print(dog.sleep())  # Inherited
print(dog.bark())   # Own method


# Composition: Reuse through delegation
class EatingBehavior:
    def eat(self):
        return "Eating"


class SleepingBehavior:
    def sleep(self):
        return "Sleeping"


class Dog:
    def __init__(self):
        self.eating = EatingBehavior()
        self.sleeping = SleepingBehavior()
    
    def eat(self):
        return self.eating.eat()  # Delegate
    
    def sleep(self):
        return self.sleeping.sleep()  # Delegate
    
    def bark(self):
        return "Woof!"


dog = Dog()
print(dog.eat())    # Delegated
print(dog.sleep())  # Delegated
print(dog.bark())   # Own method
```

### Coupling

Inheritance creates tight coupling; composition creates loose coupling:

```python
# Inheritance: Tight coupling
class Base:
    def method(self):
        return "base"


class Child(Base):
    def child_method(self):
        # Tightly coupled to Base implementation
        return super().method() + " child"


# If Base.method() changes, Child breaks


# Composition: Loose coupling
class Component:
    def method(self):
        return "component"


class Container:
    def __init__(self, component: Component):
        self.component = component  # Dependency injection
    
    def container_method(self):
        # Loosely coupled through interface
        return self.component.method() + " container"


# Container works with any object that has method()
```

### Flexibility

Composition is more flexible — behavior can change at runtime:

```python
# Inheritance: Fixed at class definition
class FastCar(Car):
    def drive(self):
        return "Driving fast!"


# Composition: Changeable at runtime
class DrivingBehavior:
    def drive(self):
        return "Driving normally"


class FastDrivingBehavior:
    def drive(self):
        return "Driving fast!"


class Car:
    def __init__(self, driving_behavior: DrivingBehavior):
        self.driving_behavior = driving_behavior
    
    def drive(self):
        return self.driving_behavior.drive()


# Can change behavior at runtime
car = Car(DrivingBehavior())
print(car.drive())  # "Driving normally"

car.driving_behavior = FastDrivingBehavior()
print(car.drive())  # "Driving fast!"
```

## When to Use Inheritance

### ✅ Use Inheritance When

**1. True "Is-A" Relationship**

```python
# Good: Square IS-A Shape
class Shape:
    def area(self):
        raise NotImplementedError


class Square(Shape):
    def __init__(self, side: float):
        self.side = side
    
    def area(self):
        return self.side ** 2
```

**2. Liskov Substitution Principle Holds**

Subclass can replace parent without breaking functionality:

```python
def calculate_total_area(shapes: list[Shape]) -> float:
    """Works with any Shape subclass."""
    return sum(shape.area() for shape in shapes)


shapes = [Square(5), Circle(3), Triangle(4, 3)]
total = calculate_total_area(shapes)  # Works seamlessly
```

**3. Extending Framework/Library Classes**

```python
from http.server import BaseHTTPRequestHandler

class MyHandler(BaseHTTPRequestHandler):
    """Extend framework class."""
    def do_GET(self):
        # Custom GET handling
        pass
```

**4. Implementing Interfaces/ABCs**

```python
from abc import ABC, abstractmethod

class Serializable(ABC):
    @abstractmethod
    def serialize(self) -> str:
        pass


class User(Serializable):
    """Implement interface."""
    def serialize(self) -> str:
        return f"User({self.name})"
```

## When to Use Composition

### ✅ Use Composition When

**1. "Has-A" Relationship**

```python
# Good: Car HAS-AN Engine
class Engine:
    def start(self):
        return "Engine starting"


class Car:
    def __init__(self, engine: Engine):
        self.engine = engine  # Has-a
    
    def start(self):
        return self.engine.start()
```

**2. Behavior Needs to Change at Runtime**

```python
# Strategy pattern with composition
class PaymentProcessor:
    def __init__(self, strategy):
        self.strategy = strategy
    
    def process(self, amount: float):
        return self.strategy.process(amount)


# Can swap strategies at runtime
processor = PaymentProcessor(CreditCardStrategy())
processor.process(100)

processor.strategy = PayPalStrategy()  # Change behavior
processor.process(100)
```

**3. Avoiding Fragile Base Class Problem**

```python
# ❌ FRAGILE: Child depends on parent implementation
class Base:
    def method(self):
        return self.internal_method()  # Internal detail
    
    def internal_method(self):
        return "base"


class Child(Base):
    def internal_method(self):
        # Breaks if Base.method() changes!
        return "child"


# ✅ ROBUST: Composition avoids fragility
class Component:
    def method(self):
        return "component"


class Container:
    def __init__(self, component: Component):
        self.component = component
    
    def method(self):
        return self.component.method()  # No fragility
```

**4. Multiple Behaviors Needed**

Can't inherit from multiple unrelated classes effectively:

```python
# ❌ AWKWARD: Multiple inheritance
class Flyable:
    def fly(self):
        return "Flying"

class Swimmable:
    def swim(self):
        return "Swimming"

class Duck(Flyable, Swimmable):
    pass


# ✅ CLEAR: Composition
class FlyingBehavior:
    def fly(self):
        return "Flying"


class SwimmingBehavior:
    def swim(self):
        return "Swimming"


class Duck:
    def __init__(self):
        self.flying = FlyingBehavior()
        self.swimming = SwimmingBehavior()
    
    def fly(self):
        return self.flying.fly()
    
    def swim(self):
        return self.swimming.swim()
```

## Common Pitfalls

### Pitfall 1: Inheriting for Code Reuse

```python
# ❌ BAD: ArrayList is not a Stack!
class Stack(list):
    """Inherit from list to reuse methods."""
    def push(self, item):
        self.append(item)
    
    def pop(self):
        return super().pop()


# Problem: Exposes all list methods!
stack = Stack()
stack.push(1)
stack.push(2)
stack.insert(0, 99)  # Breaks stack semantics!


# ✅ GOOD: Composition
class Stack:
    """Use list internally."""
    def __init__(self):
        self._items = []  # Composition
    
    def push(self, item):
        self._items.append(item)
    
    def pop(self):
        return self._items.pop()
    
    # Only expose stack operations
```

### Pitfall 2: Deep Inheritance Hierarchies

```python
# ❌ BAD: Deep hierarchy
class A:
    pass

class B(A):
    pass

class C(B):
    pass

class D(C):
    pass

class E(D):
    pass

# Hard to understand, fragile, difficult to change


# ✅ GOOD: Shallow with composition
class FeatureA:
    pass

class FeatureB:
    pass

class E:
    def __init__(self):
        self.feature_a = FeatureA()
        self.feature_b = FeatureB()
```

### Pitfall 3: Violating Liskov Substitution

```python
# ❌ BAD: Square is not a Rectangle!
class Rectangle:
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height


class Square(Rectangle):
    def __init__(self, side: float):
        super().__init__(side, side)
    
    @property
    def width(self):
        return self._side
    
    @width.setter
    def width(self, value):
        self._side = value
        self._height = value  # Violates Rectangle contract!


# ✅ GOOD: Both inherit from Shape
class Shape:
    def area(self):
        raise NotImplementedError


class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height


class Square(Shape):
    def __init__(self, side: float):
        self.side = side
    
    def area(self):
        return self.side ** 2
```

## Refactoring Inheritance to Composition

### Example: Refactoring Employee Hierarchy

```python
# BEFORE: Inheritance
class Employee:
    def __init__(self, name: str, salary: float):
        self.name = name
        self.salary = salary
    
    def calculate_bonus(self):
        return self.salary * 0.1


class Manager(Employee):
    def __init__(self, name: str, salary: float, team_size: int):
        super().__init__(name, salary)
        self.team_size = team_size
    
    def calculate_bonus(self):
        return self.salary * 0.2 + self.team_size * 100


class Developer(Employee):
    def __init__(self, name: str, salary: float, language: str):
        super().__init__(name, salary)
        self.language = language
    
    def calculate_bonus(self):
        return self.salary * 0.15


# AFTER: Composition with Strategy pattern
class BonusCalculator:
    """Base bonus calculator."""
    def calculate(self, salary: float) -> float:
        return salary * 0.1


class ManagerBonusCalculator(BonusCalculator):
    def __init__(self, team_size: int):
        self.team_size = team_size
    
    def calculate(self, salary: float) -> float:
        return salary * 0.2 + self.team_size * 100


class DeveloperBonusCalculator(BonusCalculator):
    def calculate(self, salary: float) -> float:
        return salary * 0.15


class Employee:
    def __init__(self, name: str, salary: float, 
                 bonus_calculator: BonusCalculator):
        self.name = name
        self.salary = salary
        self.bonus_calculator = bonus_calculator  # Composition
    
    def calculate_bonus(self):
        return self.bonus_calculator.calculate(self.salary)


# Usage - more flexible
manager = Employee("Alice", 80000, ManagerBonusCalculator(team_size=5))
developer = Employee("Bob", 70000, DeveloperBonusCalculator())

print(manager.calculate_bonus())
print(developer.calculate_bonus())

# Can change bonus calculation at runtime
developer.bonus_calculator = ManagerBonusCalculator(team_size=3)
```

### Example: Refactoring Notification System

```python
# BEFORE: Inheritance
class Notification:
    def send(self, message: str):
        raise NotImplementedError


class EmailNotification(Notification):
    def send(self, message: str):
        print(f"Email: {message}")


class SMSNotification(Notification):
    def send(self, message: str):
        print(f"SMS: {message}")


class PushNotification(Notification):
    def send(self, message: str):
        print(f"Push: {message}")


# AFTER: Composition
class NotificationChannel:
    """Single responsibility: send via channel."""
    def send(self, message: str):
        raise NotImplementedError


class EmailChannel(NotificationChannel):
    def send(self, message: str):
        print(f"Email: {message}")


class SMSChannel(NotificationChannel):
    def send(self, message: str):
        print(f"SMS: {message}")


class PushChannel(NotificationChannel):
    def send(self, message: str):
        print(f"Push: {message}")


class NotificationService:
    """Compose multiple channels."""
    def __init__(self):
        self.channels = []
    
    def add_channel(self, channel: NotificationChannel):
        self.channels.append(channel)
    
    def send(self, message: str):
        for channel in self.channels:
            channel.send(message)


# Usage - can combine channels
service = NotificationService()
service.add_channel(EmailChannel())
service.add_channel(SMSChannel())
service.send("Hello!")  # Sends via both email and SMS
```

## Real-World Example: Document Processing System

```python
from abc import ABC, abstractmethod
from typing import List

# Strategy interfaces
class Parser(ABC):
    """Parse document content."""
    @abstractmethod
    def parse(self, content: str) -> dict:
        pass


class Validator(ABC):
    """Validate parsed document."""
    @abstractmethod
    def validate(self, data: dict) -> bool:
        pass


class Storage(ABC):
    """Store document."""
    @abstractmethod
    def save(self, data: dict) -> str:
        pass


# Concrete implementations
class JSONParser(Parser):
    def parse(self, content: str) -> dict:
        import json
        return json.loads(content)


class XMLParser(Parser):
    def parse(self, content: str) -> dict:
        # Simplified XML parsing
        return {"xml": "parsed"}


class SchemaValidator(Validator):
    def __init__(self, schema: dict):
        self.schema = schema
    
    def validate(self, data: dict) -> bool:
        # Simplified validation
        required_fields = self.schema.get('required', [])
        return all(field in data for field in required_fields)


class BusinessRuleValidator(Validator):
    def __init__(self, rules: List[callable]):
        self.rules = rules
    
    def validate(self, data: dict) -> bool:
        return all(rule(data) for rule in self.rules)


class DatabaseStorage(Storage):
    def save(self, data: dict) -> str:
        # Simplified database save
        doc_id = f"doc_{id(data)}"
        print(f"Saved to database: {doc_id}")
        return doc_id


class FileStorage(Storage):
    def __init__(self, directory: str):
        self.directory = directory
    
    def save(self, data: dict) -> str:
        # Simplified file save
        filename = f"{self.directory}/doc_{id(data)}.json"
        print(f"Saved to file: {filename}")
        return filename


# Document processor using composition
class DocumentProcessor:
    """Process documents using composed strategies."""
    
    def __init__(self, parser: Parser, validator: Validator, storage: Storage):
        self.parser = parser
        self.validator = validator
        self.storage = storage
    
    def process(self, content: str) -> str:
        """Process document through pipeline."""
        # Parse
        print("Parsing document...")
        data = self.parser.parse(content)
        
        # Validate
        print("Validating document...")
        if not self.validator.validate(data):
            raise ValueError("Validation failed")
        
        # Store
        print("Storing document...")
        doc_id = self.storage.save(data)
        
        return doc_id
    
    def set_parser(self, parser: Parser):
        """Change parser at runtime."""
        self.parser = parser
    
    def set_validator(self, validator: Validator):
        """Change validator at runtime."""
        self.validator = validator
    
    def set_storage(self, storage: Storage):
        """Change storage at runtime."""
        self.storage = storage


# Usage - flexible composition
schema = {'required': ['title', 'author']}
processor = DocumentProcessor(
    parser=JSONParser(),
    validator=SchemaValidator(schema),
    storage=DatabaseStorage()
)

# Process document
content = '{"title": "My Document", "author": "John"}'
doc_id = processor.process(content)
print(f"Document ID: {doc_id}")

print("\n" + "=" * 50 + "\n")

# Change strategies at runtime
processor.set_parser(XMLParser())
processor.set_storage(FileStorage("/tmp/docs"))

# Process with different configuration
content2 = '<doc><title>XML Doc</title></doc>'
doc_id2 = processor.process(content2)
print(f"Document ID: {doc_id2}")
```

## Guidelines for Choosing

### Decision Framework

```
Is there a true "is-a" relationship?
    ├─ YES: Can subclass substitute parent everywhere? (LSP)
    │   ├─ YES: Consider inheritance
    │   └─ NO: Use composition
    └─ NO: Use composition

Does behavior need to change at runtime?
    ├─ YES: Use composition
    └─ NO: Inheritance might be okay

Do you need multiple behaviors?
    ├─ YES: Use composition (avoid multiple inheritance)
    └─ NO: Inheritance might be okay

Is this for code reuse only (not true relationship)?
    ├─ YES: Use composition
    └─ NO: Inheritance might be okay
```

### General Rules

1. **Default to composition** unless clear reason for inheritance
2. **Use inheritance for**: True is-a relationships, interfaces/ABCs
3. **Use composition for**: Has-a relationships, runtime flexibility, code reuse
4. **Keep hierarchies shallow**: Max 2-3 levels
5. **Favor small interfaces**: Easier to compose

## Summary

Understanding when to use inheritance vs composition is crucial for maintainable OOP:

### Key Differences

| Aspect | Inheritance | Composition |
|--------|-------------|-------------|
| Relationship | "is-a" | "has-a" |
| Coupling | Tight | Loose |
| Flexibility | Fixed at compile time | Changeable at runtime |
| Complexity | Can grow quickly | More manageable |
| Testing | Harder (tight coupling) | Easier (loose coupling) |
| Reusability | Limited to hierarchy | High |

### When to Use

**Inheritance**:
- True is-a relationship
- Liskov Substitution holds
- Extending frameworks
- Implementing interfaces

**Composition**:
- Has-a relationship
- Runtime flexibility needed
- Multiple behaviors
- Code reuse without is-a

### Best Practices

- ✅ Favor composition over inheritance
- ✅ Use inheritance for true is-a relationships
- ✅ Keep inheritance hierarchies shallow
- ✅ Compose behaviors with strategy pattern
- ✅ Test that Liskov Substitution holds
- ❌ Don't inherit just for code reuse
- ❌ Don't create deep hierarchies
- ❌ Don't violate LSP

### Refactoring Approach

1. Identify inheritance for code reuse only
2. Extract behavior into separate classes
3. Inject behaviors via composition
4. Gain flexibility and loose coupling

In the next lesson, we'll explore **Mixins** — a specific pattern for composition that provides reusable functionality across unrelated classes.

