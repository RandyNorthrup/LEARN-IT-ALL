---
id: "043"
title: "Inheritance Basics"
chapterId: "05"
order: 1
duration: "15 minutes"
objectives:
  - "Understand what inheritance is and why it's useful"
  - "Learn the syntax for creating parent and child classes"
  - "Master the relationship between base and derived classes"
  - "Recognize when to use inheritance"
  - "Understand the 'is-a' relationship in OOP"
---

# Inheritance Basics

Inheritance is one of the four pillars of object-oriented programming, allowing classes to inherit attributes and methods from other classes. This lesson introduces inheritance fundamentals and shows you when and how to use this powerful feature.

## Introduction

Imagine you're building software to model different types of vehicles. Cars, trucks, and motorcycles all share common characteristics (wheels, engine, speed) but also have unique features. Instead of duplicating code, inheritance lets you define common features once in a parent class and specialize them in child classes.

This is the essence of inheritance: creating new classes based on existing ones, reusing code while adding specialized behavior.

## What is Inheritance?

**Inheritance** is a mechanism where a new class (child/derived class) is based on an existing class (parent/base class), inheriting its attributes and methods.

Think of biological inheritance: children inherit traits from parents but also have their own unique characteristics. Programming inheritance works similarly.

### Key Terminology

- **Base Class / Parent Class / Superclass**: The class being inherited from
- **Derived Class / Child Class / Subclass**: The class that inherits
- **Inheritance**: The "is-a" relationship between classes

```python
# Base class (parent)
class Animal:
    """Parent class with common animal features."""
    
    def __init__(self, name: str):
        self.name = name
    
    def speak(self) -> str:
        return "Some sound"
    
    def move(self) -> str:
        return f"{self.name} is moving"


# Derived class (child)
class Dog(Animal):  # Dog inherits from Animal
    """Child class inheriting from Animal."""
    
    def speak(self) -> str:
        """Override parent method."""
        return "Woof!"


# Usage
dog = Dog("Buddy")
print(dog.name)    # Inherited attribute: "Buddy"
print(dog.speak()) # Overridden method: "Woof!"
print(dog.move())  # Inherited method: "Buddy is moving"
```

### The "Is-A" Relationship

Inheritance represents an **"is-a"** relationship:
- A Dog **is an** Animal ✅
- A Car **is a** Vehicle ✅
- A Square **is a** Rectangle ✅

vs. composition ("has-a" relationship):
- A Dog **has an** owner ❌ (not inheritance)
- A Car **has an** engine ❌ (not inheritance)

```python
# ✅ GOOD: "is-a" relationship - use inheritance
class Vehicle:
    pass

class Car(Vehicle):  # A Car IS A Vehicle
    pass

class Truck(Vehicle):  # A Truck IS A Vehicle
    pass


# ❌ BAD: "has-a" relationship - don't use inheritance
class Engine:
    pass

# BAD: Car inherits from Engine
class Car(Engine):  # A Car IS NOT an Engine!
    pass

# ✅ GOOD: Car has an Engine - use composition
class Car:
    def __init__(self):
        self.engine = Engine()  # Composition: has-a
```

## Basic Inheritance Syntax

### Creating a Base Class

```python
class Employee:
    """Base class for all employees."""
    
    def __init__(self, name: str, employee_id: str, salary: float):
        self.name = name
        self.employee_id = employee_id
        self.salary = salary
    
    def get_details(self) -> str:
        """Return employee details."""
        return f"{self.name} (ID: {self.employee_id})"
    
    def calculate_pay(self) -> float:
        """Calculate employee pay."""
        return self.salary
```

### Creating a Derived Class

```python
class Developer(Employee):  # Inherit from Employee
    """Derived class for developers."""
    
    def __init__(self, name: str, employee_id: str, salary: float, programming_language: str):
        # Initialize parent class
        super().__init__(name, employee_id, salary)
        # Add developer-specific attribute
        self.programming_language = programming_language
    
    def write_code(self) -> str:
        """Developer-specific method."""
        return f"{self.name} is writing {self.programming_language} code"


# Usage
dev = Developer("Alice", "DEV001", 80000, "Python")

# Inherited attributes and methods work
print(dev.name)              # "Alice"
print(dev.get_details())     # "Alice (ID: DEV001)"
print(dev.calculate_pay())   # 80000

# Child-specific method
print(dev.write_code())      # "Alice is writing Python code"
```

## How Inheritance Works

### Attribute and Method Lookup

When you access an attribute or method on an object, Python searches in this order:

1. **Instance**: Look in the object itself
2. **Class**: Look in the object's class
3. **Parent Classes**: Look in parent classes (in MRO order)

```python
class Parent:
    class_var = "Parent class variable"
    
    def parent_method(self):
        return "Parent method"
    
    def shared_method(self):
        return "Parent version"


class Child(Parent):
    child_var = "Child class variable"
    
    def child_method(self):
        return "Child method"
    
    def shared_method(self):
        return "Child version"


child = Child()

# Lookup process:
print(child.child_method())   # Found in Child class
print(child.parent_method())  # Not in Child, found in Parent
print(child.shared_method())  # Found in Child (overrides Parent)
print(child.class_var)        # Not in Child, found in Parent
```

### Checking Inheritance Relationships

```python
class Animal:
    pass

class Dog(Animal):
    pass

class Cat(Animal):
    pass

dog = Dog()

# isinstance(): Check if object is instance of class
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True (Dog inherits from Animal)
print(isinstance(dog, Cat))     # False

# issubclass(): Check if class is subclass of another
print(issubclass(Dog, Animal))  # True
print(issubclass(Dog, Dog))     # True (class is subclass of itself)
print(issubclass(Animal, Dog))  # False
print(issubclass(Dog, Cat))     # False
```

## Common Inheritance Patterns

### Pattern 1: Specialization

Child class adds specialized behavior to parent:

```python
class Shape:
    """General shape class."""
    
    def __init__(self, color: str):
        self.color = color
    
    def describe(self) -> str:
        return f"A {self.color} shape"


class Circle(Shape):
    """Specialized shape: circle."""
    
    def __init__(self, color: str, radius: float):
        super().__init__(color)
        self.radius = radius
    
    def area(self) -> float:
        """Circle-specific calculation."""
        import math
        return math.pi * self.radius ** 2
    
    def describe(self) -> str:
        """More specific description."""
        return f"A {self.color} circle with radius {self.radius}"


class Rectangle(Shape):
    """Specialized shape: rectangle."""
    
    def __init__(self, color: str, width: float, height: float):
        super().__init__(color)
        self.width = width
        self.height = height
    
    def area(self) -> float:
        """Rectangle-specific calculation."""
        return self.width * self.height
    
    def describe(self) -> str:
        return f"A {self.color} rectangle {self.width}x{self.height}"


# Usage
circle = Circle("red", 5)
rectangle = Rectangle("blue", 10, 20)

print(circle.describe())      # "A red circle with radius 5"
print(circle.area())          # 78.54...
print(rectangle.describe())   # "A blue rectangle 10x20"
print(rectangle.area())       # 200
```

### Pattern 2: Extension

Child class extends parent with additional features:

```python
class BasicUser:
    """Basic user with minimal features."""
    
    def __init__(self, username: str, email: str):
        self.username = username
        self.email = email
    
    def get_profile(self) -> dict:
        return {'username': self.username, 'email': self.email}


class PremiumUser(BasicUser):
    """Extended user with premium features."""
    
    def __init__(self, username: str, email: str):
        super().__init__(username, email)
        self.premium_features = ['ad-free', 'cloud-storage', 'priority-support']
        self.storage_limit_gb = 100
    
    def get_profile(self) -> dict:
        """Extended profile with premium info."""
        profile = super().get_profile()  # Get basic profile
        profile['premium'] = True
        profile['features'] = self.premium_features
        profile['storage_gb'] = self.storage_limit_gb
        return profile
    
    def access_premium_feature(self, feature: str) -> str:
        """Premium-only method."""
        if feature in self.premium_features:
            return f"Accessing {feature}"
        return "Feature not available"


# Usage
basic = BasicUser("john", "john@example.com")
premium = PremiumUser("jane", "jane@example.com")

print(basic.get_profile())
# {'username': 'john', 'email': 'john@example.com'}

print(premium.get_profile())
# {'username': 'jane', 'email': 'jane@example.com', 
#  'premium': True, 'features': [...], 'storage_gb': 100}

print(premium.access_premium_feature('cloud-storage'))
# "Accessing cloud-storage"
```

### Pattern 3: Type Variation

Multiple child classes for different variations:

```python
class PaymentMethod:
    """Base class for payment methods."""
    
    def __init__(self, amount: float):
        self.amount = amount
    
    def process_payment(self) -> str:
        """Process payment - to be overridden."""
        raise NotImplementedError("Subclass must implement process_payment")


class CreditCardPayment(PaymentMethod):
    """Credit card payment variation."""
    
    def __init__(self, amount: float, card_number: str, cvv: str):
        super().__init__(amount)
        self.card_number = card_number
        self.cvv = cvv
    
    def process_payment(self) -> str:
        # Validate card
        # Process with payment gateway
        return f"Processed ${self.amount} via Credit Card ending in {self.card_number[-4:]}"


class PayPalPayment(PaymentMethod):
    """PayPal payment variation."""
    
    def __init__(self, amount: float, email: str):
        super().__init__(amount)
        self.email = email
    
    def process_payment(self) -> str:
        # Authenticate with PayPal
        # Process payment
        return f"Processed ${self.amount} via PayPal account {self.email}"


class CryptoPayment(PaymentMethod):
    """Cryptocurrency payment variation."""
    
    def __init__(self, amount: float, wallet_address: str, currency: str):
        super().__init__(amount)
        self.wallet_address = wallet_address
        self.currency = currency
    
    def process_payment(self) -> str:
        # Process crypto transaction
        return f"Processed ${self.amount} via {self.currency} to {self.wallet_address}"


# Polymorphic usage - all are PaymentMethod objects
def process_order_payment(payment: PaymentMethod) -> None:
    """Process payment regardless of type."""
    result = payment.process_payment()
    print(result)


# All variations work the same way
cc_payment = CreditCardPayment(100.0, "4532123456789012", "123")
paypal_payment = PayPalPayment(75.0, "user@example.com")
crypto_payment = CryptoPayment(200.0, "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5", "ETH")

process_order_payment(cc_payment)
process_order_payment(paypal_payment)
process_order_payment(crypto_payment)
```

## When to Use Inheritance

### ✅ Good Use Cases for Inheritance

1. **Clear "is-a" relationship exists**
```python
class Bird(Animal):  # Bird IS AN Animal
    pass
```

2. **Need to share common behavior**
```python
class Vehicle:
    def start_engine(self): pass
    def stop_engine(self): pass

class Car(Vehicle): pass
class Motorcycle(Vehicle): pass
# Both share engine management behavior
```

3. **Creating specialized versions**
```python
class Report:
    def generate(self): pass

class PDFReport(Report): pass
class ExcelReport(Report): pass
# Specialized report types
```

4. **Extending existing classes**
```python
class BasicAccount:
    pass

class PremiumAccount(BasicAccount):
    # Add premium features
    pass
```

### ❌ When NOT to Use Inheritance

1. **"Has-a" relationship**
```python
# ❌ BAD
class Car(Engine):  # Car HAS AN engine, not IS AN engine
    pass

# ✅ GOOD
class Car:
    def __init__(self):
        self.engine = Engine()  # Composition
```

2. **No clear parent-child relationship**
```python
# ❌ BAD
class Logger(FileWriter):  # Logger doesn't IS A FileWriter
    pass

# ✅ GOOD
class Logger:
    def __init__(self, file_writer: FileWriter):
        self.writer = file_writer  # Composition
```

3. **Just to reuse code**
```python
# ❌ BAD - inheritance just for utility methods
class MyClass(StringUtils, DateUtils, MathUtils):
    pass

# ✅ GOOD - use composition or modules
class MyClass:
    def __init__(self):
        self.string_utils = StringUtils()
```

4. **Inheritance would create rigid hierarchy**
```python
# ❌ BAD - too rigid
class ElectricFlyingCar(ElectricCar, FlyingVehicle):
    # Multiple inheritance complexity
    pass

# ✅ GOOD - composition for flexibility
class Vehicle:
    def __init__(self):
        self.power_source = None  # Can be any power source
        self.movement_type = None  # Can be any movement
```

## Inheritance vs Composition

**Rule of Thumb**: Favor composition over inheritance unless there's a clear "is-a" relationship.

```python
# Inheritance: "is-a"
class Dog(Animal):
    """Dog IS AN Animal - appropriate inheritance."""
    pass


# Composition: "has-a"
class Dog:
    """Dog HAS AN owner, HAS A collar - use composition."""
    
    def __init__(self, name: str):
        self.name = name
        self.owner = None  # Dog has an owner
        self.collar = None  # Dog has a collar


# Flexibility example
class Car:
    """Flexible car using composition."""
    
    def __init__(self):
        # Can swap components easily
        self.engine = GasolineEngine()
        self.transmission = AutomaticTransmission()
    
    def switch_to_electric(self):
        """Easy to change with composition."""
        self.engine = ElectricEngine()
    
    # Harder with inheritance:
    # class GasolineCar(Car): pass
    # class ElectricCar(Car): pass
    # Can't easily convert GasolineCar to ElectricCar
```

## Real-World Example: Employee System

```python
from datetime import datetime
from typing import List

class Employee:
    """Base employee class with common features."""
    
    def __init__(self, name: str, employee_id: str, hire_date: datetime, base_salary: float):
        self.name = name
        self.employee_id = employee_id
        self.hire_date = hire_date
        self.base_salary = base_salary
    
    def years_employed(self) -> int:
        """Calculate years employed."""
        return (datetime.now() - self.hire_date).days // 365
    
    def get_salary(self) -> float:
        """Get employee salary."""
        return self.base_salary
    
    def get_info(self) -> str:
        """Get employee information."""
        return f"{self.name} ({self.employee_id}) - {self.years_employed()} years"


class FullTimeEmployee(Employee):
    """Full-time employee with benefits."""
    
    def __init__(self, name: str, employee_id: str, hire_date: datetime, 
                 base_salary: float, benefits_package: str):
        super().__init__(name, employee_id, hire_date, base_salary)
        self.benefits_package = benefits_package
        self.vacation_days = 20
    
    def get_salary(self) -> float:
        """Full-time salary with benefits."""
        # Benefits add value
        benefits_value = 5000 if self.benefits_package == 'premium' else 2000
        return self.base_salary + benefits_value
    
    def request_vacation(self, days: int) -> bool:
        """Request vacation days."""
        if days <= self.vacation_days:
            self.vacation_days -= days
            return True
        return False


class PartTimeEmployee(Employee):
    """Part-time employee paid hourly."""
    
    def __init__(self, name: str, employee_id: str, hire_date: datetime, 
                 hourly_rate: float, hours_per_week: int):
        # Base salary calculated from hourly rate
        annual_salary = hourly_rate * hours_per_week * 52
        super().__init__(name, employee_id, hire_date, annual_salary)
        self.hourly_rate = hourly_rate
        self.hours_per_week = hours_per_week
    
    def get_weekly_pay(self) -> float:
        """Calculate weekly pay."""
        return self.hourly_rate * self.hours_per_week


class Contractor(Employee):
    """Contractor with project-based payment."""
    
    def __init__(self, name: str, employee_id: str, hire_date: datetime, 
                 contract_value: float, contract_duration_months: int):
        super().__init__(name, employee_id, hire_date, contract_value)
        self.contract_duration_months = contract_duration_months
        self.projects_completed = []
    
    def get_monthly_payment(self) -> float:
        """Calculate monthly payment."""
        return self.base_salary / self.contract_duration_months
    
    def complete_project(self, project_name: str) -> None:
        """Mark project as completed."""
        self.projects_completed.append(project_name)


# Usage
full_time = FullTimeEmployee(
    "Alice Smith",
    "FT001",
    datetime(2020, 1, 15),
    75000,
    "premium"
)

part_time = PartTimeEmployee(
    "Bob Jones",
    "PT001",
    datetime(2022, 6, 1),
    25.0,  # $25/hour
    20     # 20 hours/week
)

contractor = Contractor(
    "Carol White",
    "CT001",
    datetime(2023, 3, 1),
    60000,  # $60k contract
    6       # 6 months
)

# All share common Employee interface
employees: List[Employee] = [full_time, part_time, contractor]

for emp in employees:
    print(emp.get_info())
    print(f"Salary: ${emp.get_salary():,.2f}")
    print()
```

## Summary

Inheritance is a powerful OOP feature that enables code reuse and establishes relationships between classes:

### Key Takeaways

1. **Definition**: Child classes inherit attributes and methods from parent classes
2. **Syntax**: `class Child(Parent):` creates inheritance relationship
3. **"Is-A" Test**: Use inheritance only when child "is a" type of parent
4. **Method Lookup**: Python searches instance → class → parent classes
5. **Common Patterns**: Specialization, extension, type variation
6. **Checking**: Use `isinstance()` and `issubclass()` to check relationships

### Best Practices

- ✅ Use inheritance for clear "is-a" relationships
- ✅ Keep inheritance hierarchies shallow (prefer 2-3 levels)
- ✅ Call `super().__init__()` in child constructors
- ✅ Override methods to specialize behavior
- ❌ Don't use inheritance just to reuse code
- ❌ Avoid deep inheritance chains (hard to maintain)
- ❌ Don't inherit when composition is more appropriate

In the next lesson, we'll explore **parent-child class relationships** in depth, including how to properly initialize parent classes and manage shared state.
