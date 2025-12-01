---
id: liskov-substitution
title: Liskov Substitution Principle
chapterId: ch4-abstraction
order: 38
duration: 16
objectives:
  - Understand Liskov Substitution Principle
  - Learn when subclasses correctly substitute base classes
  - Master contract compliance and behavioral subtyping
---

# Liskov Substitution Principle

The **Liskov Substitution Principle (LSP)** states: **objects of a superclass should be replaceable with objects of a subclass without breaking the application**. Subclasses must honor the contract established by the base class.

## The Principle

```python
# If S is a subtype of T, then objects of type T can be replaced
# with objects of type S without altering program correctness

class T:
    def method(self):
        pass

class S(T):
    def method(self):
        # Must work anywhere T.method() works
        pass

def use_t(obj: T):
    obj.method()  # Must work with T OR S

use_t(T())  # Works
use_t(S())  # Must also work! (LSP)
```

## Violating LSP

### Violation 1: Strengthening Preconditions

```python
# ❌ Bad: Subclass strengthens preconditions
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def set_width(self, width):
        """Accepts any positive number."""
        if width <= 0:
            raise ValueError("Width must be positive")
        self.width = width
    
    def set_height(self, height):
        """Accepts any positive number."""
        if height <= 0:
            raise ValueError("Height must be positive")
        self.height = height
    
    def area(self):
        return self.width * self.height

class Square(Rectangle):
    def set_width(self, width):
        """Strengthens precondition - requires width == height!"""
        if width != self.height:  # NEW constraint!
            raise ValueError("Square requires width == height")
        super().set_width(width)
    
    def set_height(self, height):
        """Strengthens precondition - requires width == height!"""
        if height != self.width:  # NEW constraint!
            raise ValueError("Square requires width == height")
        super().set_height(height)

# BREAKS LSP!
def resize_rectangle(rect: Rectangle):
    """Expects to work with ANY Rectangle."""
    rect.set_width(10)
    rect.set_height(5)
    assert rect.area() == 50

rectangle = Rectangle(1, 1)
resize_rectangle(rectangle)  # ✅ Works

square = Square(1, 1)
# resize_rectangle(square)  # ❌ Breaks! ValueError
```

### Violation 2: Weakening Postconditions

```python
# ❌ Bad: Subclass weakens postconditions
class FileReader:
    def read(self, filename):
        """Returns non-empty string (postcondition)."""
        with open(filename, 'r') as f:
            content = f.read()
        if not content:
            raise ValueError("File is empty")
        return content

class OptionalFileReader(FileReader):
    def read(self, filename):
        """Weakens postcondition - can return empty string!"""
        try:
            with open(filename, 'r') as f:
                return f.read()  # May return empty!
        except FileNotFoundError:
            return ""  # May return empty!

# BREAKS LSP!
def process_file(reader: FileReader, filename):
    """Expects non-empty content (base class postcondition)."""
    content = reader.read(filename)
    return content.upper()  # Assumes non-empty

reader = FileReader()
# process_file(reader, "file.txt")  # ✅ Works if file exists and non-empty

optional_reader = OptionalFileReader()
# process_file(optional_reader, "missing.txt")  # ❌ Returns "" - breaks assumption
```

### Violation 3: Changing Behavior

```python
# ❌ Bad: Subclass changes expected behavior
class Counter:
    def __init__(self):
        self.count = 0
    
    def increment(self):
        """Increments by 1."""
        self.count += 1

class DoubleCounter(Counter):
    def increment(self):
        """Changes behavior - increments by 2!"""
        self.count += 2  # Different from parent!

# BREAKS LSP!
def count_to_ten(counter: Counter):
    """Expects standard counting behavior."""
    for _ in range(10):
        counter.increment()
    return counter.count

regular = Counter()
print(count_to_ten(regular))  # 10 (expected)

double = DoubleCounter()
print(count_to_ten(double))  # 20 (unexpected!)
```

## Following LSP

### Solution 1: Proper Hierarchy

```python
# ✅ Good: Square and Rectangle as separate concepts
class Shape(ABC):
    """Base abstraction."""
    @abstractmethod
    def area(self): pass

class Rectangle(Shape):
    """Rectangle - independent."""
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def set_width(self, width):
        self.width = width
    
    def set_height(self, height):
        self.height = height
    
    def area(self):
        return self.width * self.height

class Square(Shape):
    """Square - independent, NOT a Rectangle."""
    def __init__(self, side):
        self.side = side
    
    def set_side(self, side):
        self.side = side
    
    def area(self):
        return self.side * self.side

# Works correctly - no substitution confusion
def calculate_area(shape: Shape):
    return shape.area()

calculate_area(Rectangle(10, 5))  # ✅ 50
calculate_area(Square(5))         # ✅ 25
```

### Solution 2: Honor Contracts

```python
# ✅ Good: Subclass honors base class contract
class DataProcessor(ABC):
    @abstractmethod
    def process(self, data: list) -> list:
        """
        Process data.
        
        Contract:
            - Input: non-empty list
            - Output: non-empty list
            - No exceptions for valid input
        """
        pass

class UppercaseProcessor(DataProcessor):
    def process(self, data: list) -> list:
        """Honors contract - returns non-empty list."""
        if not data:
            raise ValueError("Data cannot be empty")  # Enforces precondition
        result = [item.upper() for item in data]
        if not result:
            raise ValueError("Result cannot be empty")  # Enforces postcondition
        return result

class LowercaseProcessor(DataProcessor):
    def process(self, data: list) -> list:
        """Honors contract - returns non-empty list."""
        if not data:
            raise ValueError("Data cannot be empty")
        result = [item.lower() for item in data]
        if not result:
            raise ValueError("Result cannot be empty")
        return result

# Works with ANY DataProcessor
def transform_data(processor: DataProcessor, data: list) -> list:
    """Relies on contract."""
    return processor.process(data)

transform_data(UppercaseProcessor(), ["hello"])  # ✅ Works
transform_data(LowercaseProcessor(), ["HELLO"])  # ✅ Works
```

### Solution 3: Consistent Behavior

```python
# ✅ Good: Subclasses maintain consistent behavior
class Cache(ABC):
    @abstractmethod
    def get(self, key: str) -> Optional[Any]:
        """Get value or None if not found."""
        pass
    
    @abstractmethod
    def set(self, key: str, value: Any) -> None:
        """Store value."""
        pass

class MemoryCache(Cache):
    def __init__(self):
        self._data = {}
    
    def get(self, key: str) -> Optional[Any]:
        """Consistent with contract."""
        return self._data.get(key)
    
    def set(self, key: str, value: Any) -> None:
        """Consistent with contract."""
        self._data[key] = value

class FileCache(Cache):
    def __init__(self, directory: str):
        self.directory = directory
    
    def get(self, key: str) -> Optional[Any]:
        """Consistent with contract."""
        try:
            with open(f"{self.directory}/{key}", 'r') as f:
                return f.read()
        except FileNotFoundError:
            return None
    
    def set(self, key: str, value: Any) -> None:
        """Consistent with contract."""
        with open(f"{self.directory}/{key}", 'w') as f:
            f.write(str(value))

# Works with ANY Cache implementation
def cache_workflow(cache: Cache):
    """Relies on consistent behavior."""
    cache.set("key", "value")
    retrieved = cache.get("key")
    assert retrieved == "value"  # Must work for all implementations

cache_workflow(MemoryCache())  # ✅ Works
cache_workflow(FileCache("/tmp"))  # ✅ Works
```

## Real-World Example: Payment Processors

```python
from abc import ABC, abstractmethod
from decimal import Decimal

class PaymentProcessor(ABC):
    """
    Abstract payment processor.
    
    CONTRACT:
    - process_payment() must return transaction ID (string)
    - process_payment() must raise ValueError for invalid amounts
    - process_payment() must not modify amount parameter
    - process_payment() with same inputs must be idempotent
    """
    
    @abstractmethod
    def process_payment(self, amount: Decimal, card_token: str) -> str:
        """
        Process payment.
        
        Args:
            amount: Payment amount (must be positive)
            card_token: Card token (must be non-empty)
        
        Returns:
            Transaction ID (string)
        
        Raises:
            ValueError: If amount <= 0 or card_token is empty
        """
        pass

# ✅ CORRECT: Honors contract
class StripeProcessor(PaymentProcessor):
    def process_payment(self, amount: Decimal, card_token: str) -> str:
        """Honors all contract requirements."""
        # Enforce preconditions (same as base)
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if not card_token:
            raise ValueError("Card token required")
        
        # Process payment
        print(f"Processing ${amount} via Stripe")
        transaction_id = f"stripe_{amount}"
        
        # Guarantee postcondition (returns string)
        return transaction_id

# ✅ CORRECT: Honors contract
class PayPalProcessor(PaymentProcessor):
    def process_payment(self, amount: Decimal, card_token: str) -> str:
        """Honors all contract requirements."""
        # Enforce preconditions
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if not card_token:
            raise ValueError("Card token required")
        
        # Process payment
        print(f"Processing ${amount} via PayPal")
        transaction_id = f"paypal_{amount}"
        
        # Guarantee postcondition
        return transaction_id

# ❌ WRONG: Violates contract (weakens preconditions)
class LenientProcessor(PaymentProcessor):
    def process_payment(self, amount: Decimal, card_token: str) -> str:
        """VIOLATES LSP - allows negative amounts!"""
        # Weakened precondition - accepts negative!
        if not card_token:
            raise ValueError("Card token required")
        
        # Process even negative amounts
        print(f"Processing ${amount} (even if negative)")
        return f"lenient_{amount}"

# APPLICATION CODE: Relies on contract
def process_order(processor: PaymentProcessor, amount: Decimal, token: str):
    """
    Process order payment.
    
    Expects processor to follow contract:
    - Rejects negative amounts
    - Returns transaction ID
    """
    # Assumes contract is enforced
    transaction_id = processor.process_payment(amount, token)
    print(f"Order processed: {transaction_id}")
    return transaction_id

# LSP SATISFIED: Works correctly
process_order(StripeProcessor(), Decimal("99.99"), "tok_visa")  # ✅
process_order(PayPalProcessor(), Decimal("49.99"), "tok_paypal")  # ✅

# LSP VIOLATED: Unexpected behavior
# process_order(LenientProcessor(), Decimal("-10.00"), "tok_test")  # ❌ Accepts negative!
```

## LSP Checklist

When creating subclasses:

- [ ] **Honor preconditions** - don't make them stricter
- [ ] **Honor postconditions** - don't make them weaker
- [ ] **Maintain invariants** - preserve base class guarantees
- [ ] **Preserve behavior** - don't change expected behavior
- [ ] **Same exceptions** - throw same exceptions for same inputs
- [ ] **No new exceptions** - don't throw unexpected exceptions
- [ ] **Type consistency** - maintain return types and parameters

## LSP Red Flags

Watch for these warning signs:

### Red Flag 1: Overriding Methods to Do Nothing

```python
# ❌ Bad: Subclass disables base functionality
class Bird:
    def fly(self):
        print("Flying")

class Penguin(Bird):
    def fly(self):
        pass  # Does nothing! Breaks LSP

# ✅ Good: Proper hierarchy
class Bird(ABC):
    @abstractmethod
    def move(self): pass

class FlyingBird(Bird):
    def move(self):
        print("Flying")

class Penguin(Bird):
    def move(self):
        print("Swimming")
```

### Red Flag 2: Type Checking in Client Code

```python
# ❌ Bad: Need type checking - LSP violated
def handle_shape(shape):
    if isinstance(shape, Square):
        # Special case for Square
        shape.set_side(10)
    elif isinstance(shape, Rectangle):
        # Different case for Rectangle
        shape.set_width(10)
        shape.set_height(5)

# ✅ Good: No type checking needed - LSP satisfied
def handle_shape(shape: Shape):
    area = shape.area()  # Works for all shapes
```

### Red Flag 3: Throwing New Exceptions

```python
# ❌ Bad: Subclass throws unexpected exception
class FileReader:
    def read(self, filename):
        """Never raises NetworkError."""
        with open(filename, 'r') as f:
            return f.read()

class RemoteFileReader(FileReader):
    def read(self, filename):
        """Throws NetworkError - violates LSP!"""
        # Download from network
        raise NetworkError("Connection failed")  # Unexpected!
```

## Summary

The **Liskov Substitution Principle** ensures that subclasses can replace their base classes without breaking functionality. Subclasses must **honor contracts**—maintain preconditions, postconditions, and invariants established by the base class. **Don't strengthen preconditions** (require more than base class), **don't weaken postconditions** (promise less than base class), and **don't change expected behavior**. Violations manifest as **type checking**, **disabled methods**, or **unexpected exceptions** in client code. Proper LSP adherence enables **true polymorphism**—code that works with the base class automatically works with all subclasses. Design inheritance hierarchies carefully—**favor composition over inheritance** when substitution doesn't make sense. LSP is essential for **reliable**, **maintainable**, and **predictable** object-oriented systems.
