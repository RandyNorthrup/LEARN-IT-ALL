---
id: "046"
title: "Method Overriding"
chapterId: "05"
order: 4
duration: "16 minutes"
objectives:
  - "Understand what method overriding is and when to use it"
  - "Master techniques for overriding parent methods effectively"
  - "Learn to extend vs replace parent behavior"
  - "Recognize method overriding best practices"
  - "Avoid common overriding pitfalls"
---

# Method Overriding

Method overriding allows child classes to provide specific implementations of methods defined in parent classes. This is a core mechanism of polymorphism and specialization in object-oriented programming.

## Introduction

When a child class defines a method with the same name as a method in its parent class, it **overrides** the parent's method. This allows child classes to customize or completely replace parent behavior while maintaining the same interface.

Think of method overriding like customizing a recipe: you follow the basic structure but adjust ingredients or steps to your taste.

## What is Method Overriding?

**Method overriding** occurs when a child class provides its own implementation of a method that's already defined in the parent class.

```python
class Animal:
    def speak(self) -> str:
        """Generic animal sound."""
        return "Some sound"
    
    def move(self) -> str:
        """Generic movement."""
        return "Moving"


class Dog(Animal):
    def speak(self) -> str:
        """Override: Dogs bark."""
        return "Woof!"
    
    # move() not overridden - inherits parent's implementation


class Bird(Animal):
    def speak(self) -> str:
        """Override: Birds chirp."""
        return "Chirp!"
    
    def move(self) -> str:
        """Override: Birds fly."""
        return "Flying"


# Usage
dog = Dog()
bird = Bird()

print(dog.speak())   # "Woof!" - overridden
print(dog.move())    # "Moving" - inherited

print(bird.speak())  # "Chirp!" - overridden
print(bird.move())   # "Flying" - overridden
```

### Why Override Methods?

1. **Specialization**: Provide specific behavior for subclasses
2. **Polymorphism**: Same interface, different implementations
3. **Customization**: Adapt parent functionality to child needs
4. **Extension**: Add functionality to parent behavior

## Types of Method Overriding

### 1. Complete Replacement

Child completely replaces parent's implementation:

```python
class PaymentProcessor:
    def process_payment(self, amount: float) -> bool:
        """Base implementation - always succeeds."""
        print(f"Processing ${amount}")
        return True


class StripePaymentProcessor(PaymentProcessor):
    def process_payment(self, amount: float) -> bool:
        """Complete replacement with Stripe-specific logic."""
        print(f"Processing ${amount} through Stripe")
        
        # Completely different implementation
        if amount < 0:
            raise ValueError("Amount must be positive")
        
        # Call Stripe API
        stripe_result = self._call_stripe_api(amount)
        return stripe_result
    
    def _call_stripe_api(self, amount: float) -> bool:
        """Stripe-specific API call."""
        # Implementation details...
        return True


processor = StripePaymentProcessor()
processor.process_payment(100.0)
# Uses child's implementation, not parent's
```

### 2. Extension with super()

Child extends parent's behavior by calling `super()`:

```python
class Logger:
    def log(self, message: str) -> None:
        """Basic logging to console."""
        print(f"[LOG] {message}")


class FileLogger(Logger):
    def __init__(self, filepath: str):
        self.filepath = filepath
    
    def log(self, message: str) -> None:
        """Extend parent: log to console AND file."""
        # Call parent's implementation first
        super().log(message)
        
        # Add file logging
        with open(self.filepath, 'a') as f:
            f.write(f"[LOG] {message}\n")


logger = FileLogger("app.log")
logger.log("Application started")
# Logs to both console (parent) and file (child)
```

### 3. Partial Override with Augmentation

Child modifies some aspects while keeping others:

```python
class Report:
    def generate(self, data: list) -> str:
        """Generate report."""
        header = self._create_header()
        body = self._create_body(data)
        footer = self._create_footer()
        return f"{header}\n{body}\n{footer}"
    
    def _create_header(self) -> str:
        return "=== REPORT ==="
    
    def _create_body(self, data: list) -> str:
        return "\n".join(str(item) for item in data)
    
    def _create_footer(self) -> str:
        from datetime import datetime
        return f"Generated: {datetime.now()}"


class DetailedReport(Report):
    def _create_header(self) -> str:
        """Override just the header."""
        return "=== DETAILED REPORT ===\nIncludes additional information"
    
    def _create_body(self, data: list) -> str:
        """Override body for more detail."""
        return "\n".join(
            f"Item #{i+1}: {item}" 
            for i, item in enumerate(data)
        )
    
    # _create_footer not overridden - uses parent's


report = DetailedReport()
print(report.generate(["A", "B", "C"]))
# Header and body overridden, footer from parent
```

## Overriding Special Methods

### Overriding `__init__`

Most common override - always call `super().__init__()`:

```python
class Vehicle:
    def __init__(self, make: str, model: str):
        self.make = make
        self.model = model
        self.mileage = 0


class ElectricVehicle(Vehicle):
    def __init__(self, make: str, model: str, battery_capacity: float):
        # Initialize parent first
        super().__init__(make, model)
        
        # Add electric-specific attributes
        self.battery_capacity = battery_capacity
        self.battery_level = 100.0


ev = ElectricVehicle("Tesla", "Model 3", 75.0)
print(f"{ev.make} {ev.model}")        # Parent attributes
print(f"Battery: {ev.battery_capacity}kWh")  # Child attribute
```

### Overriding `__str__` and `__repr__`

```python
class Product:
    def __init__(self, name: str, price: float):
        self.name = name
        self.price = price
    
    def __str__(self) -> str:
        """User-friendly string representation."""
        return f"{self.name}: ${self.price:.2f}"
    
    def __repr__(self) -> str:
        """Developer-friendly representation."""
        return f"Product(name='{self.name}', price={self.price})"


class DiscountedProduct(Product):
    def __init__(self, name: str, price: float, discount: float):
        super().__init__(name, price)
        self.discount = discount
    
    def __str__(self) -> str:
        """Override to show discount."""
        original = super().__str__()
        final_price = self.price * (1 - self.discount)
        return f"{original} (discount: {self.discount*100}%, final: ${final_price:.2f})"
    
    def __repr__(self) -> str:
        """Override for complete info."""
        return f"DiscountedProduct(name='{self.name}', price={self.price}, discount={self.discount})"


product = DiscountedProduct("Laptop", 1000.0, 0.15)
print(str(product))   # User-friendly with discount
print(repr(product))  # Developer-friendly with all details
```

### Overriding Comparison Methods

```python
class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
    
    def __eq__(self, other) -> bool:
        """Override equality comparison."""
        if not isinstance(other, Person):
            return False
        return self.name == other.name and self.age == other.age
    
    def __lt__(self, other) -> bool:
        """Override less-than for sorting."""
        if not isinstance(other, Person):
            return NotImplemented
        return self.age < other.age


class Employee(Person):
    def __init__(self, name: str, age: int, employee_id: str):
        super().__init__(name, age)
        self.employee_id = employee_id
    
    def __eq__(self, other) -> bool:
        """Override: Employees equal if same ID."""
        if not isinstance(other, Employee):
            return False
        return self.employee_id == other.employee_id
    
    def __lt__(self, other) -> bool:
        """Override: Sort by employee ID."""
        if not isinstance(other, Employee):
            return NotImplemented
        return self.employee_id < other.employee_id


emp1 = Employee("Alice", 30, "E001")
emp2 = Employee("Alice", 30, "E002")

print(emp1 == emp2)  # False - different IDs
print(emp1 < emp2)   # True - "E001" < "E002"

employees = [emp2, emp1]
employees.sort()
print([e.employee_id for e in employees])  # ['E001', 'E002']
```

## Best Practices for Method Overriding

### Practice 1: Maintain Method Signature

Keep the same signature (parameters and return type) as parent:

```python
# ❌ BAD: Changing signature
class Parent:
    def process(self, data: str) -> int:
        return len(data)

class Child(Parent):
    def process(self, data: str, extra: bool) -> str:  # Changed signature!
        return str(len(data))


# ✅ GOOD: Maintain signature
class Child(Parent):
    def process(self, data: str) -> int:  # Same signature
        # Can add processing but keep contract
        return len(data) * 2
```

### Practice 2: Honor Parent's Contract

Respect Liskov Substitution Principle - child should work wherever parent works:

```python
# ❌ BAD: Violating parent's contract
class FileReader:
    def read(self, filepath: str) -> str:
        """Read file and return content. Empty string if not found."""
        try:
            with open(filepath, 'r') as f:
                return f.read()
        except FileNotFoundError:
            return ""

class StrictFileReader(FileReader):
    def read(self, filepath: str) -> str:
        """VIOLATES CONTRACT: Raises exception instead of returning empty string."""
        with open(filepath, 'r') as f:  # Raises FileNotFoundError!
            return f.read()


# ✅ GOOD: Honor parent's contract
class StrictFileReader(FileReader):
    def read(self, filepath: str) -> str:
        """Honor contract: Still returns empty string on not found."""
        try:
            with open(filepath, 'r') as f:
                content = f.read()
                # Can add validation while honoring contract
                if not content:
                    print("Warning: File is empty")
                return content
        except FileNotFoundError:
            print("Warning: File not found")
            return ""  # Honor parent's contract
```

### Practice 3: Document Overridden Behavior

```python
class DataProcessor:
    def process(self, data):
        """Process data and return result.
        
        Args:
            data: Input data to process
        
        Returns:
            Processed data
        """
        return data.upper()


class AdvancedDataProcessor(DataProcessor):
    def process(self, data):
        """Process data with advanced features.
        
        Overrides parent to add trimming and validation.
        
        Args:
            data: Input data to process
        
        Returns:
            Processed, trimmed, and validated data
        
        Raises:
            ValueError: If data is empty after trimming
        """
        # Document what's different
        trimmed = data.strip()
        if not trimmed:
            raise ValueError("Data is empty")
        return super().process(trimmed)
```

### Practice 4: Use super() When Extending

When adding to parent's behavior, call `super()`:

```python
class Account:
    def withdraw(self, amount: float) -> bool:
        """Withdraw money."""
        if amount <= self._balance:
            self._balance -= amount
            return True
        return False


class PremiumAccount(Account):
    def withdraw(self, amount: float) -> bool:
        """Extend parent: Allow overdraft for premium."""
        # Check if parent's withdrawal succeeds
        if super().withdraw(amount):
            return True
        
        # If not, check premium overdraft
        if amount <= self._balance + self.overdraft_limit:
            self._balance -= amount
            return True
        
        return False
```

## Common Patterns

### Pattern 1: Template Method

Parent defines algorithm structure, children override specific steps:

```python
from abc import ABC, abstractmethod

class DataImporter(ABC):
    """Template method pattern."""
    
    def import_data(self, source: str):
        """Template method - defines algorithm structure."""
        print("Starting import...")
        
        # Steps that can be overridden
        data = self._read_source(source)
        validated = self._validate_data(data)
        transformed = self._transform_data(validated)
        self._save_data(transformed)
        
        print("Import complete!")
    
    @abstractmethod
    def _read_source(self, source: str):
        """Override: Read from source."""
        pass
    
    def _validate_data(self, data):
        """Override: Validate data (optional)."""
        return data
    
    @abstractmethod
    def _transform_data(self, data):
        """Override: Transform data."""
        pass
    
    @abstractmethod
    def _save_data(self, data):
        """Override: Save data."""
        pass


class CSVImporter(DataImporter):
    """Concrete importer for CSV files."""
    
    def _read_source(self, source: str):
        """Read CSV file."""
        import csv
        with open(source, 'r') as f:
            return list(csv.DictReader(f))
    
    def _validate_data(self, data):
        """Add CSV-specific validation."""
        validated = super()._validate_data(data)
        # Additional validation
        return [row for row in validated if row]
    
    def _transform_data(self, data):
        """Transform CSV data."""
        return [
            {k.lower(): v.strip() for k, v in row.items()}
            for row in data
        ]
    
    def _save_data(self, data):
        """Save to database."""
        print(f"Saving {len(data)} records to database")


importer = CSVImporter()
importer.import_data("data.csv")
# Parent controls flow, child provides implementation
```

### Pattern 2: Hook Methods

Parent provides default implementation that child can optionally override:

```python
class RequestHandler:
    """Base handler with hooks."""
    
    def handle_request(self, request):
        """Main request handling."""
        self._before_handle(request)
        
        response = self._process_request(request)
        
        self._after_handle(response)
        
        return response
    
    def _before_handle(self, request):
        """Hook: Called before processing (override optional)."""
        pass  # Default: do nothing
    
    def _process_request(self, request):
        """Main processing (must override)."""
        raise NotImplementedError()
    
    def _after_handle(self, response):
        """Hook: Called after processing (override optional)."""
        pass  # Default: do nothing


class LoggingRequestHandler(RequestHandler):
    """Handler with logging hooks."""
    
    def _before_handle(self, request):
        """Override hook: Log request."""
        print(f"Handling request: {request}")
    
    def _process_request(self, request):
        """Implement processing."""
        return f"Processed: {request}"
    
    def _after_handle(self, response):
        """Override hook: Log response."""
        print(f"Response: {response}")


handler = LoggingRequestHandler()
result = handler.handle_request("GET /api/users")
```

### Pattern 3: Decorator Pattern via Override

```python
class Component:
    """Base component."""
    
    def operation(self) -> str:
        return "Base"


class Decorator(Component):
    """Base decorator."""
    
    def __init__(self, component: Component):
        self._component = component
    
    def operation(self) -> str:
        """Delegate to wrapped component."""
        return self._component.operation()


class UpperCaseDecorator(Decorator):
    """Override to add uppercase behavior."""
    
    def operation(self) -> str:
        result = super().operation()
        return result.upper()


class ExclamationDecorator(Decorator):
    """Override to add exclamation."""
    
    def operation(self) -> str:
        result = super().operation()
        return f"{result}!"


# Chain decorators
component = Component()
decorated = ExclamationDecorator(UpperCaseDecorator(component))
print(decorated.operation())  # "BASE!"
```

## Common Mistakes

### Mistake 1: Forgetting super() When Extending

```python
# ❌ BAD: Lost parent's behavior
class Parent:
    def setup(self):
        self.initialized = True
        print("Parent setup complete")

class Child(Parent):
    def setup(self):
        # Forgot super().setup()!
        self.child_ready = True
        print("Child setup complete")


child = Child()
child.setup()
# print(child.initialized)  # AttributeError! Parent setup never ran


# ✅ GOOD: Call super() to keep parent's behavior
class Child(Parent):
    def setup(self):
        super().setup()  # Run parent's setup
        self.child_ready = True
        print("Child setup complete")
```

### Mistake 2: Breaking Method Contract

```python
# ❌ BAD: Changed return type
class Parent:
    def get_count(self) -> int:
        return 10

class Child(Parent):
    def get_count(self) -> str:  # Changed return type!
        return "ten"


def use_count(obj: Parent):
    count = obj.get_count()
    return count + 5  # Expects int!


# use_count(Child())  # TypeError! Got string, not int


# ✅ GOOD: Maintain contract
class Child(Parent):
    def get_count(self) -> int:  # Same return type
        return super().get_count() * 2
```

### Mistake 3: Over-Overriding

```python
# ❌ BAD: Overriding too many methods
class Parent:
    def method_a(self): pass
    def method_b(self): pass
    def method_c(self): pass
    def method_d(self): pass
    def method_e(self): pass

class Child(Parent):
    # Overriding everything - maybe inheritance wrong choice?
    def method_a(self): pass
    def method_b(self): pass
    def method_c(self): pass
    def method_d(self): pass
    def method_e(self): pass


# ✅ BETTER: Consider composition instead
class Child:
    def __init__(self):
        self.helper = Parent()  # Composition
    
    def method_a(self):
        # Custom implementation
        pass
    
    def method_b(self):
        # Delegate to helper when appropriate
        return self.helper.method_b()
```

## Real-World Example: Shape Hierarchy

```python
from abc import ABC, abstractmethod
import math

class Shape(ABC):
    """Abstract base shape."""
    
    def __init__(self, color: str):
        self.color = color
    
    @abstractmethod
    def area(self) -> float:
        """Calculate area - must override."""
        pass
    
    @abstractmethod
    def perimeter(self) -> float:
        """Calculate perimeter - must override."""
        pass
    
    def describe(self) -> str:
        """Describe shape - can override."""
        return f"A {self.color} shape"
    
    def __str__(self) -> str:
        """String representation."""
        return f"{self.describe()} (area: {self.area():.2f}, perimeter: {self.perimeter():.2f})"


class Circle(Shape):
    """Circle overrides abstract methods."""
    
    def __init__(self, color: str, radius: float):
        super().__init__(color)
        self.radius = radius
    
    def area(self) -> float:
        """Override: Circle area formula."""
        return math.pi * self.radius ** 2
    
    def perimeter(self) -> float:
        """Override: Circle circumference."""
        return 2 * math.pi * self.radius
    
    def describe(self) -> str:
        """Override: Circle-specific description."""
        base = super().describe()
        return f"{base} - Circle with radius {self.radius}"


class Rectangle(Shape):
    """Rectangle overrides abstract methods."""
    
    def __init__(self, color: str, width: float, height: float):
        super().__init__(color)
        self.width = width
        self.height = height
    
    def area(self) -> float:
        """Override: Rectangle area formula."""
        return self.width * self.height
    
    def perimeter(self) -> float:
        """Override: Rectangle perimeter."""
        return 2 * (self.width + self.height)
    
    def describe(self) -> str:
        """Override: Rectangle-specific description."""
        base = super().describe()
        return f"{base} - Rectangle {self.width}x{self.height}"
    
    def is_square(self) -> bool:
        """Additional method specific to Rectangle."""
        return self.width == self.height


class Square(Rectangle):
    """Square overrides Rectangle's constructor."""
    
    def __init__(self, color: str, side: float):
        # Call Rectangle's init with same width and height
        super().__init__(color, side, side)
        self.side = side
    
    def describe(self) -> str:
        """Override: Square-specific description."""
        # Skip Rectangle's describe, go to Shape's
        shape_desc = Shape.describe(self)
        return f"{shape_desc} - Square with side {self.side}"


# Polymorphic usage
shapes = [
    Circle("red", 5),
    Rectangle("blue", 4, 6),
    Square("green", 5)
]

for shape in shapes:
    print(shape)
    print()
```

## Summary

Method overriding is a fundamental OOP technique for customizing inherited behavior:

### Key Takeaways

1. **Overriding**: Child provides new implementation of parent's method
2. **Types**: Complete replacement, extension with super(), partial override
3. **Special methods**: Can override `__init__`, `__str__`, comparison methods, etc.
4. **super()**: Use to call parent's implementation when extending
5. **Contract**: Maintain parent's method signature and contract

### Best Practices

- ✅ Maintain method signature (LSP)
- ✅ Call super() when extending behavior
- ✅ Document overridden behavior
- ✅ Honor parent's contract and expectations
- ❌ Don't break method contracts
- ❌ Don't forget super() when needed
- ❌ Don't override everything (consider composition)

In the next lesson, we'll explore **multiple inheritance** and how to handle complexity when a class inherits from multiple parents.
