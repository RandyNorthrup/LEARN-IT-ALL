---
id: creating-classes
title: Creating and Using Classes
chapterId: ch2-classes-objects
order: 12
duration: 16
objectives:
  - Master class creation syntax
  - Learn to organize class code
  - Understand class design best practices
---

# Creating and Using Classes

Let's dive deeper into creating well-designed classes that are easy to use, maintain, and understand.

## Class Design Principles

### 1. Single Responsibility

Each class should have one clear purpose:

```python
# ❌ Bad: Class doing too much
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
    
    def save_to_database(self):
        # Database logic
        pass
    
    def send_welcome_email(self):
        # Email logic
        pass
    
    def generate_report(self):
        # Reporting logic
        pass

# ✅ Good: Separate responsibilities
class User:
    """Represents a user with basic data."""
    def __init__(self, name, email):
        self.name = name
        self.email = email

class UserRepository:
    """Handles user database operations."""
    def save(self, user):
        # Database logic
        pass

class EmailService:
    """Handles email operations."""
    def send_welcome(self, user):
        # Email logic
        pass
```

### 2. Meaningful Names

Use descriptive class and method names:

```python
# ❌ Bad: Unclear names
class Data:
    def proc(self):
        pass

# ✅ Good: Clear names
class CustomerOrder:
    def process_payment(self):
        pass
```

### 3. Encapsulation

Keep internal details private:

```python
# ❌ Bad: Everything public
class BankAccount:
    def __init__(self, balance):
        self.balance = balance  # Direct access

account = BankAccount(1000)
account.balance = -500  # Oops! Negative balance

# ✅ Good: Controlled access
class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # Private by convention
    
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
    
    def withdraw(self, amount):
        if 0 < amount <= self._balance:
            self._balance -= amount
            return True
        return False
    
    def get_balance(self):
        return self._balance

account = BankAccount(1000)
account.deposit(200)
account.withdraw(300)
print(account.get_balance())  # 900
```

## Constructor Patterns

### Basic Constructor

```python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
```

### Constructor with Validation

```python
class Product:
    def __init__(self, name, price):
        if not name:
            raise ValueError("Product name cannot be empty")
        if price < 0:
            raise ValueError("Price cannot be negative")
        
        self.name = name
        self.price = price

# Validation happens automatically
product = Product("Laptop", 999.99)  # OK
# product = Product("", 999.99)      # Raises ValueError
# product = Product("Laptop", -100)  # Raises ValueError
```

### Constructor with Default Values

```python
class BlogPost:
    def __init__(self, title, content, published=False, views=0):
        self.title = title
        self.content = content
        self.published = published
        self.views = views

# Use defaults
post1 = BlogPost("My Post", "Content here")

# Or override defaults
post2 = BlogPost("Published Post", "Content", published=True, views=100)
```

### Constructor with Type Hints

```python
from datetime import datetime

class Order:
    def __init__(
        self,
        order_id: str,
        customer_name: str,
        total: float,
        created_at: datetime = None
    ):
        self.order_id = order_id
        self.customer_name = customer_name
        self.total = total
        self.created_at = created_at or datetime.now()
```

## Instance Methods

### Regular Methods

```python
class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add_item(self, item, quantity=1):
        """Add item to cart."""
        self.items.append({"item": item, "quantity": quantity})
    
    def get_total(self):
        """Calculate cart total."""
        return sum(
            item["item"].price * item["quantity"]
            for item in self.items
        )
    
    def get_item_count(self):
        """Count total items."""
        return sum(item["quantity"] for item in self.items)
    
    def clear(self):
        """Empty the cart."""
        self.items = []
```

### Methods that Return Self (Method Chaining)

```python
class StringBuilder:
    def __init__(self):
        self._parts = []
    
    def append(self, text):
        """Add text and return self for chaining."""
        self._parts.append(text)
        return self
    
    def append_line(self, text):
        """Add text with newline and return self."""
        self._parts.append(text + "\n")
        return self
    
    def build(self):
        """Return final string."""
        return "".join(self._parts)

# Method chaining
result = (StringBuilder()
    .append("Hello")
    .append(" ")
    .append("World")
    .append_line("!")
    .append("Goodbye")
    .build())

print(result)  # "Hello World!\nGoodbye"
```

## Class Methods and Static Methods

### Class Methods

```python
class Employee:
    company_name = "TechCorp"
    employee_count = 0
    
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.employee_count += 1
    
    @classmethod
    def from_string(cls, employee_str):
        """Alternative constructor from string."""
        name, salary = employee_str.split("-")
        return cls(name, float(salary))
    
    @classmethod
    def get_employee_count(cls):
        """Get total employee count."""
        return cls.employee_count

# Use regular constructor
emp1 = Employee("Alice", 75000)

# Use class method constructor
emp2 = Employee.from_string("Bob-80000")

print(Employee.get_employee_count())  # 2
```

### Static Methods

```python
class MathUtils:
    """Collection of math utility functions."""
    
    @staticmethod
    def is_even(number):
        """Check if number is even."""
        return number % 2 == 0
    
    @staticmethod
    def celsius_to_fahrenheit(celsius):
        """Convert Celsius to Fahrenheit."""
        return (celsius * 9/5) + 32
    
    @staticmethod
    def fahrenheit_to_celsius(fahrenheit):
        """Convert Fahrenheit to Celsius."""
        return (fahrenheit - 32) * 5/9

# Use without creating instance
print(MathUtils.is_even(4))                    # True
print(MathUtils.celsius_to_fahrenheit(100))    # 212.0
print(MathUtils.fahrenheit_to_celsius(32))     # 0.0
```

## Special Methods (Magic Methods)

### String Representation

```python
class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year
    
    def __str__(self):
        """User-friendly string representation."""
        return f"{self.title} by {self.author} ({self.year})"
    
    def __repr__(self):
        """Developer-friendly representation."""
        return f"Book('{self.title}', '{self.author}', {self.year})"

book = Book("1984", "George Orwell", 1949)
print(str(book))   # "1984 by George Orwell (1949)"
print(repr(book))  # "Book('1984', 'George Orwell', 1949)"
```

### Comparison Methods

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __eq__(self, other):
        """Equal to."""
        return self.age == other.age
    
    def __lt__(self, other):
        """Less than."""
        return self.age < other.age
    
    def __le__(self, other):
        """Less than or equal."""
        return self.age <= other.age

alice = Person("Alice", 30)
bob = Person("Bob", 25)
charlie = Person("Charlie", 30)

print(alice == charlie)  # True
print(bob < alice)       # True
print(alice <= charlie)  # True

# Can now sort
people = [alice, bob, charlie]
people.sort()
print([p.name for p in people])  # ['Bob', 'Alice', 'Charlie']
```

## Property Decorators

### Read-Only Properties

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        """Get radius."""
        return self._radius
    
    @property
    def diameter(self):
        """Calculate diameter (read-only)."""
        return self._radius * 2
    
    @property
    def area(self):
        """Calculate area (read-only)."""
        return 3.14159 * self._radius ** 2

circle = Circle(5)
print(circle.radius)    # 5
print(circle.diameter)  # 10
print(circle.area)      # 78.53975

# circle.area = 100     # Error! Can't set area
```

### Properties with Setters

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        """Get temperature in Celsius."""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        """Set temperature in Celsius with validation."""
        if value < -273.15:
            raise ValueError("Temperature below absolute zero")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """Get temperature in Fahrenheit."""
        return (self._celsius * 9/5) + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        """Set temperature using Fahrenheit."""
        self.celsius = (value - 32) * 5/9

temp = Temperature(25)
print(temp.celsius)      # 25
print(temp.fahrenheit)   # 77.0

temp.fahrenheit = 32
print(temp.celsius)      # 0.0
```

## Documentation Best Practices

```python
class EmailValidator:
    """Validates email addresses according to RFC 5322.
    
    This class provides methods to check if an email address
    is properly formatted and optionally verify domain existence.
    
    Attributes:
        strict_mode: If True, apply stricter validation rules
    
    Example:
        >>> validator = EmailValidator(strict_mode=True)
        >>> validator.is_valid("user@example.com")
        True
    """
    
    def __init__(self, strict_mode=False):
        """Initialize the email validator.
        
        Args:
            strict_mode: Enable stricter validation (default: False)
        """
        self.strict_mode = strict_mode
    
    def is_valid(self, email):
        """Check if email address is valid.
        
        Args:
            email: The email address to validate
        
        Returns:
            True if valid, False otherwise
        
        Raises:
            TypeError: If email is not a string
        """
        if not isinstance(email, str):
            raise TypeError("Email must be a string")
        
        # Validation logic here
        return "@" in email and "." in email.split("@")[1]
```

## Summary

Create classes with **single responsibilities** and meaningful names. Use **constructors with validation** to ensure objects start in valid states. Implement **instance methods** for object behavior, **class methods** for alternative constructors, and **static methods** for utility functions. Use **special methods** like `__str__` and `__eq__` to make objects behave naturally. Leverage **property decorators** for controlled attribute access with validation. Always include **clear documentation** to help users understand how to use your classes effectively.
