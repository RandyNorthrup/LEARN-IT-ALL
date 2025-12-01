---
id: "056"
title: "Abstract Base Classes"
chapterId: "06"
order: 4
duration: "18 minutes"
objectives:
  - "Master Python's ABC module for defining interfaces"
  - "Create formal contracts with abstract methods"
  - "Understand abstract properties and class methods"
  - "Use ABCs for type checking and validation"
  - "Design effective abstract base classes"
---

# Abstract Base Classes

Abstract Base Classes (ABCs) define formal interfaces in Python. They specify what methods subclasses must implement, creating clear contracts and enabling static type checking.

## Introduction

An **Abstract Base Class** is a class that:
- Cannot be instantiated directly
- Defines abstract methods that subclasses must implement
- Provides a contract for what subclasses should do
- Enables polymorphism with type safety

Python's `abc` module provides tools for creating ABCs.

## Basic ABC Usage

### Defining an Abstract Base Class

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    """Abstract base class for shapes."""
    
    @abstractmethod
    def area(self) -> float:
        """Calculate area - must be implemented by subclasses."""
        pass
    
    @abstractmethod
    def perimeter(self) -> float:
        """Calculate perimeter - must be implemented by subclasses."""
        pass


# Cannot instantiate ABC directly
try:
    shape = Shape()
except TypeError as e:
    print(f"Error: {e}")
    # Error: Can't instantiate abstract class Shape with abstract methods area, perimeter
```

### Implementing the ABC

```python
class Rectangle(Shape):
    """Concrete implementation of Shape."""
    
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height
    
    def area(self) -> float:
        """Implement abstract method."""
        return self.width * self.height
    
    def perimeter(self) -> float:
        """Implement abstract method."""
        return 2 * (self.width + self.height)


class Circle(Shape):
    """Another concrete implementation."""
    
    def __init__(self, radius: float):
        self.radius = radius
    
    def area(self) -> float:
        """Implement abstract method."""
        return 3.14159 * self.radius ** 2
    
    def perimeter(self) -> float:
        """Implement abstract method."""
        return 2 * 3.14159 * self.radius


# Now can instantiate
rect = Rectangle(10, 5)
circle = Circle(7)

print(f"Rectangle area: {rect.area()}")
print(f"Circle area: {circle.area()}")


# Polymorphism works
def describe_shape(shape: Shape):
    """Works with any Shape."""
    print(f"Area: {shape.area()}")
    print(f"Perimeter: {shape.perimeter()}")


describe_shape(rect)
describe_shape(circle)
```

### Partial Implementation Fails

```python
class IncompleteShape(Shape):
    """Forgot to implement perimeter."""
    
    def area(self) -> float:
        return 42.0
    
    # Missing perimeter() implementation!


# Error at instantiation
try:
    incomplete = IncompleteShape()
except TypeError as e:
    print(f"Error: {e}")
    # Error: Can't instantiate abstract class IncompleteShape with abstract method perimeter
```

## Abstract Methods with Implementation

Abstract methods can provide default implementation:

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    """Abstract animal with some default behavior."""
    
    def __init__(self, name: str):
        self.name = name
    
    @abstractmethod
    def make_sound(self) -> str:
        """Must be implemented, but can call super()."""
        return f"{self.name} makes a sound"
    
    @abstractmethod
    def move(self) -> str:
        """Must be implemented."""
        pass
    
    def describe(self) -> str:
        """Concrete method - can use in subclasses."""
        return f"{self.name}: {self.make_sound()}, {self.move()}"


class Dog(Animal):
    """Concrete implementation."""
    
    def make_sound(self) -> str:
        # Can use parent's implementation
        base = super().make_sound()
        return f"{base}: Woof!"
    
    def move(self) -> str:
        return "Running on four legs"


dog = Dog("Buddy")
print(dog.describe())
# Buddy: Buddy makes a sound: Woof!, Running on four legs
```

## Abstract Properties

```python
from abc import ABC, abstractmethod

class Person(ABC):
    """Abstract person with required properties."""
    
    @property
    @abstractmethod
    def full_name(self) -> str:
        """Full name - must be implemented."""
        pass
    
    @property
    @abstractmethod
    def age(self) -> int:
        """Age - must be implemented."""
        pass
    
    def introduce(self) -> str:
        """Concrete method using abstract properties."""
        return f"Hello, I'm {self.full_name}, age {self.age}"


class Student(Person):
    """Concrete implementation."""
    
    def __init__(self, first_name: str, last_name: str, age: int, student_id: str):
        self.first_name = first_name
        self.last_name = last_name
        self._age = age
        self.student_id = student_id
    
    @property
    def full_name(self) -> str:
        """Implement abstract property."""
        return f"{self.first_name} {self.last_name}"
    
    @property
    def age(self) -> int:
        """Implement abstract property."""
        return self._age


student = Student("Alice", "Smith", 20, "S12345")
print(student.introduce())
# Hello, I'm Alice Smith, age 20
```

## Abstract Class Methods and Static Methods

```python
from abc import ABC, abstractmethod

class DataLoader(ABC):
    """Abstract data loader."""
    
    @classmethod
    @abstractmethod
    def from_file(cls, filepath: str):
        """Load data from file - must implement."""
        pass
    
    @staticmethod
    @abstractmethod
    def validate_format(data: str) -> bool:
        """Validate data format - must implement."""
        pass
    
    @abstractmethod
    def load(self):
        """Load data - must implement."""
        pass


class CSVLoader(DataLoader):
    """CSV implementation."""
    
    def __init__(self, data: str):
        self.data = data
    
    @classmethod
    def from_file(cls, filepath: str):
        """Implement abstract classmethod."""
        print(f"Loading CSV from {filepath}")
        return cls("csv_data")
    
    @staticmethod
    def validate_format(data: str) -> bool:
        """Implement abstract staticmethod."""
        return ',' in data
    
    def load(self):
        """Implement abstract method."""
        return self.data.split(',')


# Usage
loader = CSVLoader.from_file("data.csv")
print(CSVLoader.validate_format("a,b,c"))  # True
print(loader.load())
```

## ABC vs Protocol

### When to Use ABC

```python
from abc import ABC, abstractmethod

# ✅ USE ABC: When you want inheritance
class Storage(ABC):
    """Storage interface - subclasses inherit."""
    
    @abstractmethod
    def save(self, key: str, value: str):
        pass
    
    def exists(self, key: str) -> bool:
        """Concrete helper method."""
        try:
            self.load(key)
            return True
        except KeyError:
            return False
    
    @abstractmethod
    def load(self, key: str) -> str:
        pass


class FileStorage(Storage):
    """Inherits exists() helper."""
    
    def save(self, key: str, value: str):
        print(f"Saving {key} to file")
    
    def load(self, key: str) -> str:
        print(f"Loading {key} from file")
        return "data"


storage = FileStorage()
print(storage.exists("key1"))  # Uses inherited exists()
```

### When to Use Protocol

```python
from typing import Protocol

# ✅ USE PROTOCOL: When you want structural typing (no inheritance)
class Drawable(Protocol):
    """Drawable interface - no inheritance needed."""
    def draw(self) -> str:
        ...


# No inheritance, just implements the method
class Circle:
    def draw(self) -> str:
        return "Drawing circle"


# Works with Drawable type hint
def render(obj: Drawable):
    return obj.draw()


render(Circle())  # Works!
```

### Combining Both

```python
from abc import ABC, abstractmethod
from typing import Protocol

# ABC for inheritance hierarchy
class Animal(ABC):
    @abstractmethod
    def move(self) -> str:
        pass


class Dog(Animal):
    def move(self) -> str:
        return "Running"


# Protocol for duck typing
class CanBark(Protocol):
    def bark(self) -> str:
        ...


# Dog implements both
class Dog(Animal):
    def move(self) -> str:
        return "Running"
    
    def bark(self) -> str:
        return "Woof!"


def make_noise(animal: CanBark):
    """Works with anything that can bark."""
    return animal.bark()
```

## Real-World Example: Payment System

```python
from abc import ABC, abstractmethod
from typing import Dict, Optional
from datetime import datetime

class PaymentMethod(ABC):
    """Abstract payment method."""
    
    @abstractmethod
    def validate_credentials(self) -> bool:
        """Validate payment credentials."""
        pass
    
    @abstractmethod
    def process_payment(self, amount: float, currency: str) -> Dict:
        """Process payment and return transaction details."""
        pass
    
    @abstractmethod
    def refund_payment(self, transaction_id: str, amount: float) -> bool:
        """Refund a previous payment."""
        pass
    
    @property
    @abstractmethod
    def payment_type(self) -> str:
        """Payment method type identifier."""
        pass
    
    def log_transaction(self, transaction_id: str, amount: float):
        """Concrete helper method."""
        print(f"[{self.payment_type}] Transaction {transaction_id}: ${amount}")
    
    def calculate_fee(self, amount: float) -> float:
        """Default fee calculation - can be overridden."""
        return amount * 0.03  # 3% default fee


class CreditCardPayment(PaymentMethod):
    """Credit card payment implementation."""
    
    def __init__(self, card_number: str, cvv: str, expiry: str):
        self.card_number = card_number
        self.cvv = cvv
        self.expiry = expiry
        self._transactions = {}
    
    @property
    def payment_type(self) -> str:
        return "CREDIT_CARD"
    
    def validate_credentials(self) -> bool:
        """Validate card details."""
        # Simplified validation
        return (len(self.card_number) == 16 and 
                len(self.cvv) == 3 and 
                '/' in self.expiry)
    
    def process_payment(self, amount: float, currency: str = "USD") -> Dict:
        """Process credit card payment."""
        if not self.validate_credentials():
            raise ValueError("Invalid credit card credentials")
        
        transaction_id = f"CC_{int(datetime.now().timestamp())}"
        fee = self.calculate_fee(amount)
        
        transaction = {
            'transaction_id': transaction_id,
            'method': self.payment_type,
            'amount': amount,
            'currency': currency,
            'fee': fee,
            'total': amount + fee,
            'card_last_four': self.card_number[-4:],
            'status': 'SUCCESS',
            'timestamp': datetime.now().isoformat()
        }
        
        self._transactions[transaction_id] = transaction
        self.log_transaction(transaction_id, amount)
        
        return transaction
    
    def refund_payment(self, transaction_id: str, amount: float) -> bool:
        """Refund credit card payment."""
        if transaction_id not in self._transactions:
            return False
        
        print(f"Refunding ${amount} to card ending in {self.card_number[-4:]}")
        self._transactions[transaction_id]['status'] = 'REFUNDED'
        return True
    
    def calculate_fee(self, amount: float) -> float:
        """Credit card specific fee."""
        return amount * 0.025  # 2.5% for credit cards


class PayPalPayment(PaymentMethod):
    """PayPal payment implementation."""
    
    def __init__(self, email: str, password: str):
        self.email = email
        self.password = password
        self._transactions = {}
    
    @property
    def payment_type(self) -> str:
        return "PAYPAL"
    
    def validate_credentials(self) -> bool:
        """Validate PayPal credentials."""
        return '@' in self.email and len(self.password) >= 8
    
    def process_payment(self, amount: float, currency: str = "USD") -> Dict:
        """Process PayPal payment."""
        if not self.validate_credentials():
            raise ValueError("Invalid PayPal credentials")
        
        transaction_id = f"PP_{int(datetime.now().timestamp())}"
        fee = self.calculate_fee(amount)
        
        transaction = {
            'transaction_id': transaction_id,
            'method': self.payment_type,
            'amount': amount,
            'currency': currency,
            'fee': fee,
            'total': amount + fee,
            'email': self.email,
            'status': 'SUCCESS',
            'timestamp': datetime.now().isoformat()
        }
        
        self._transactions[transaction_id] = transaction
        self.log_transaction(transaction_id, amount)
        
        return transaction
    
    def refund_payment(self, transaction_id: str, amount: float) -> bool:
        """Refund PayPal payment."""
        if transaction_id not in self._transactions:
            return False
        
        print(f"Refunding ${amount} to PayPal account {self.email}")
        self._transactions[transaction_id]['status'] = 'REFUNDED'
        return True
    
    def calculate_fee(self, amount: float) -> float:
        """PayPal specific fee."""
        return amount * 0.029 + 0.30  # 2.9% + $0.30


class BankTransferPayment(PaymentMethod):
    """Bank transfer payment implementation."""
    
    def __init__(self, account_number: str, routing_number: str):
        self.account_number = account_number
        self.routing_number = routing_number
        self._transactions = {}
    
    @property
    def payment_type(self) -> str:
        return "BANK_TRANSFER"
    
    def validate_credentials(self) -> bool:
        """Validate bank account details."""
        return (len(self.account_number) >= 8 and 
                len(self.routing_number) == 9)
    
    def process_payment(self, amount: float, currency: str = "USD") -> Dict:
        """Process bank transfer payment."""
        if not self.validate_credentials():
            raise ValueError("Invalid bank account credentials")
        
        transaction_id = f"BT_{int(datetime.now().timestamp())}"
        fee = self.calculate_fee(amount)
        
        transaction = {
            'transaction_id': transaction_id,
            'method': self.payment_type,
            'amount': amount,
            'currency': currency,
            'fee': fee,
            'total': amount + fee,
            'account': f"****{self.account_number[-4:]}",
            'status': 'PENDING',  # Bank transfers take time
            'timestamp': datetime.now().isoformat()
        }
        
        self._transactions[transaction_id] = transaction
        self.log_transaction(transaction_id, amount)
        
        return transaction
    
    def refund_payment(self, transaction_id: str, amount: float) -> bool:
        """Refund bank transfer payment."""
        if transaction_id not in self._transactions:
            return False
        
        print(f"Initiating refund of ${amount} to account {self.account_number[-4:]}")
        self._transactions[transaction_id]['status'] = 'REFUND_PENDING'
        return True
    
    def calculate_fee(self, amount: float) -> float:
        """Bank transfer specific fee."""
        return 5.00  # Flat fee for bank transfers


# Payment processor using polymorphism
class PaymentProcessor:
    """Process payments using any payment method."""
    
    def __init__(self):
        self.payment_methods: Dict[str, PaymentMethod] = {}
    
    def add_payment_method(self, name: str, method: PaymentMethod):
        """Register a payment method."""
        if not method.validate_credentials():
            raise ValueError(f"Invalid credentials for {name}")
        self.payment_methods[name] = method
        print(f"Added payment method: {name} ({method.payment_type})")
    
    def process(self, method_name: str, amount: float) -> Dict:
        """Process payment using specified method."""
        if method_name not in self.payment_methods:
            raise ValueError(f"Unknown payment method: {method_name}")
        
        method = self.payment_methods[method_name]
        print(f"\nProcessing ${amount} via {method.payment_type}...")
        
        transaction = method.process_payment(amount)
        print(f"Transaction successful: {transaction['transaction_id']}")
        print(f"Fee: ${transaction['fee']:.2f}")
        print(f"Total: ${transaction['total']:.2f}")
        
        return transaction
    
    def refund(self, method_name: str, transaction_id: str, amount: float) -> bool:
        """Refund a payment."""
        if method_name not in self.payment_methods:
            raise ValueError(f"Unknown payment method: {method_name}")
        
        method = self.payment_methods[method_name]
        print(f"\nProcessing refund of ${amount}...")
        
        success = method.refund_payment(transaction_id, amount)
        if success:
            print("Refund successful")
        else:
            print("Refund failed")
        
        return success


# Usage
processor = PaymentProcessor()

# Add different payment methods
processor.add_payment_method(
    "my_visa",
    CreditCardPayment("1234567890123456", "123", "12/25")
)

processor.add_payment_method(
    "my_paypal",
    PayPalPayment("user@example.com", "securepassword123")
)

processor.add_payment_method(
    "my_bank",
    BankTransferPayment("123456789", "987654321")
)

# Process payments polymorphically
transaction1 = processor.process("my_visa", 100.00)
transaction2 = processor.process("my_paypal", 50.00)
transaction3 = processor.process("my_bank", 200.00)

# Refund
processor.refund("my_visa", transaction1['transaction_id'], 100.00)
```

## Best Practices

### Practice 1: Keep ABCs Focused

```python
# ✅ GOOD: Focused interface
class Readable(ABC):
    @abstractmethod
    def read(self) -> str:
        pass


class Writable(ABC):
    @abstractmethod
    def write(self, data: str):
        pass


# Combine when needed
class ReadWrite(Readable, Writable):
    pass


# ❌ BAD: Too many responsibilities
class Everything(ABC):
    @abstractmethod
    def read(self): pass
    
    @abstractmethod
    def write(self): pass
    
    @abstractmethod
    def validate(self): pass
    
    @abstractmethod
    def transform(self): pass
    # Too much!
```

### Practice 2: Provide Concrete Helper Methods

```python
class Repository(ABC):
    """Abstract repository with helpers."""
    
    @abstractmethod
    def save(self, entity): pass
    
    @abstractmethod
    def find_by_id(self, id: str): pass
    
    # Concrete helper using abstract methods
    def save_all(self, entities: list):
        """Helper method - uses abstract save()."""
        for entity in entities:
            self.save(entity)
```

### Practice 3: Document Requirements

```python
class DataProcessor(ABC):
    """Process data with specific requirements.
    
    Subclasses must:
    - Implement validate() to check input data
    - Implement process() to transform data
    - Call super().__init__() in their __init__
    - Handle ValueError for invalid data
    
    Example:
        class CSVProcessor(DataProcessor):
            def validate(self, data):
                return isinstance(data, str) and ',' in data
            
            def process(self, data):
                return data.split(',')
    """
    
    @abstractmethod
    def validate(self, data) -> bool:
        """Validate input data."""
        pass
    
    @abstractmethod
    def process(self, data):
        """Process data."""
        pass
```

## Summary

Abstract Base Classes define formal interfaces and contracts:

### Key Concepts

1. **ABC**: Base class that cannot be instantiated
2. **@abstractmethod**: Methods subclasses must implement
3. **Abstract properties**: Properties subclasses must implement
4. **Partial implementation**: Abstract methods can have default code
5. **Concrete methods**: Non-abstract methods inherited by subclasses

### Benefits

- ✅ Clear contracts for subclasses
- ✅ Static type checking
- ✅ Runtime validation (can't instantiate incomplete classes)
- ✅ Documentation of required interface
- ✅ Polymorphism with type safety
- ✅ Shared concrete implementation

### ABC vs Protocol

| Feature | ABC | Protocol |
|---------|-----|----------|
| Requires inheritance | Yes | No |
| Runtime checking | Yes | Optional |
| Concrete methods | Yes | No |
| Static typing | Yes | Yes |
| Use case | Inheritance hierarchies | Structural typing |

### Best Practices

- ✅ Keep ABCs focused and minimal
- ✅ Provide concrete helper methods
- ✅ Document requirements clearly
- ✅ Use `@abstractmethod` for required methods
- ✅ Use `@property` for required properties
- ❌ Don't make ABCs too large
- ❌ Don't forget to implement all abstract methods

In the next lesson, we'll explore **Design Patterns with Polymorphism**, applying polymorphism to solve common software design problems.

