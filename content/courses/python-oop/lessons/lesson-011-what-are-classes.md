---
id: what-are-classes
title: What Are Classes and Objects?
chapterId: ch2-classes-objects
order: 11
duration: 15
objectives:
  - Understand what classes and objects are
  - Learn the difference between classes and objects
  - Create your first Python class
---

# What Are Classes and Objects?

**Classes** are blueprints for creating objects. **Objects** are instances of classes. This is the foundation of object-oriented programming.

## Real-World Analogy

Think of a **class** as a cookie cutter and **objects** as the cookies:

- **Cookie Cutter (Class)** - The template/blueprint
- **Cookies (Objects)** - Individual instances made from the template

Each cookie has the same shape but can have different decorations (different data).

## Classes vs Objects

### Class: The Blueprint

```python
class Dog:
    """Blueprint for creating dog objects."""
    
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed
    
    def bark(self):
        return f"{self.name} says Woof!"
```

### Objects: The Instances

```python
# Create objects from the Dog class
buddy = Dog("Buddy", "Golden Retriever")
max_dog = Dog("Max", "German Shepherd")
luna = Dog("Luna", "Husky")

# Each object is unique
print(buddy.name)      # "Buddy"
print(max_dog.name)    # "Max"
print(luna.bark())     # "Luna says Woof!"
```

## Why Use Classes?

### Without Classes (Dictionaries)

```python
# ❌ Problems: No structure, easy to make mistakes
buddy = {
    "name": "Buddy",
    "breed": "Golden Retriever",
    "age": 3
}

max_dog = {
    "name": "Max",
    "bred": "German Shepherd",  # Typo! Should be "breed"
    "age": 5
}

# No built-in behavior
def bark(dog):
    return f"{dog['name']} says Woof!"

print(bark(buddy))
```

### With Classes

```python
# ✅ Better: Structure, validation, behavior included
class Dog:
    def __init__(self, name, breed, age):
        self.name = name
        self.breed = breed
        self.age = age
    
    def bark(self):
        return f"{self.name} says Woof!"
    
    def get_info(self):
        return f"{self.name} is a {self.age}-year-old {self.breed}"

buddy = Dog("Buddy", "Golden Retriever", 3)
max_dog = Dog("Max", "German Shepherd", 5)

print(buddy.bark())       # "Buddy says Woof!"
print(buddy.get_info())   # "Buddy is a 3-year-old Golden Retriever"
```

## Creating Your First Class

### Basic Class Structure

```python
class ClassName:
    """Class documentation string."""
    
    def __init__(self, parameter1, parameter2):
        """Initialize the object."""
        self.attribute1 = parameter1
        self.attribute2 = parameter2
    
    def method_name(self):
        """Method documentation."""
        # Method code
        pass
```

### Practical Example: BankAccount

```python
class BankAccount:
    """Represents a bank account."""
    
    def __init__(self, owner, balance=0):
        """Create a new bank account.
        
        Args:
            owner: Account owner's name
            balance: Initial balance (default 0)
        """
        self.owner = owner
        self.balance = balance
    
    def deposit(self, amount):
        """Add money to the account."""
        self.balance += amount
        return f"Deposited ${amount}. New balance: ${self.balance}"
    
    def withdraw(self, amount):
        """Remove money from the account."""
        if amount > self.balance:
            return "Insufficient funds"
        self.balance -= amount
        return f"Withdrew ${amount}. New balance: ${self.balance}"
    
    def get_balance(self):
        """Return current balance."""
        return self.balance

# Create account objects
john_account = BankAccount("John", 1000)
jane_account = BankAccount("Jane", 500)

# Use the objects
print(john_account.deposit(200))   # "Deposited $200. New balance: $1200"
print(jane_account.withdraw(100))  # "Withdrew $100. New balance: $400"
print(john_account.get_balance())  # 1200
```

## Understanding `__init__`

The `__init__` method is called automatically when you create an object:

```python
class Person:
    def __init__(self, name, age):
        print(f"Creating Person object for {name}")
        self.name = name
        self.age = age

# When you create an object, __init__ runs automatically
person = Person("Alice", 30)
# Output: "Creating Person object for Alice"
```

## Understanding `self`

`self` refers to the specific object instance:

```python
class Counter:
    def __init__(self):
        self.count = 0  # Each object has its own count
    
    def increment(self):
        self.count += 1  # Modifies THIS object's count
    
    def get_count(self):
        return self.count  # Returns THIS object's count

# Create two separate counters
counter1 = Counter()
counter2 = Counter()

counter1.increment()
counter1.increment()
counter2.increment()

print(counter1.get_count())  # 2
print(counter2.get_count())  # 1
# Each object maintains its own state!
```

## Class Attributes vs Instance Attributes

### Instance Attributes

```python
class Dog:
    def __init__(self, name):
        self.name = name  # Instance attribute - unique to each object

dog1 = Dog("Buddy")
dog2 = Dog("Max")

print(dog1.name)  # "Buddy"
print(dog2.name)  # "Max"
```

### Class Attributes

```python
class Dog:
    species = "Canis familiaris"  # Class attribute - shared by all
    
    def __init__(self, name):
        self.name = name  # Instance attribute - unique to each

dog1 = Dog("Buddy")
dog2 = Dog("Max")

print(dog1.species)  # "Canis familiaris"
print(dog2.species)  # "Canis familiaris"
print(Dog.species)   # "Canis familiaris"

# All dogs share the same species
```

## Methods vs Functions

### Functions

```python
def calculate_area(length, width):
    """Standalone function."""
    return length * width

area = calculate_area(10, 5)
```

### Methods

```python
class Rectangle:
    def __init__(self, length, width):
        self.length = length
        self.width = width
    
    def calculate_area(self):
        """Method - belongs to the class."""
        return self.length * self.width

rect = Rectangle(10, 5)
area = rect.calculate_area()  # Called on an object
```

## Practical Example: Complete Class

```python
class Product:
    """Represents a product in an e-commerce system."""
    
    # Class attribute - applies to all products
    tax_rate = 0.08
    
    def __init__(self, name, price, quantity):
        """Initialize a product.
        
        Args:
            name: Product name
            price: Unit price
            quantity: Stock quantity
        """
        self.name = name
        self.price = price
        self.quantity = quantity
    
    def get_total_value(self):
        """Calculate total inventory value."""
        return self.price * self.quantity
    
    def get_price_with_tax(self):
        """Calculate price including tax."""
        return self.price * (1 + Product.tax_rate)
    
    def is_in_stock(self):
        """Check if product is available."""
        return self.quantity > 0
    
    def sell(self, amount):
        """Sell a quantity of product."""
        if amount > self.quantity:
            return f"Only {self.quantity} available"
        self.quantity -= amount
        return f"Sold {amount} {self.name}(s). {self.quantity} remaining"
    
    def restock(self, amount):
        """Add inventory."""
        self.quantity += amount
        return f"Restocked {amount} {self.name}(s). Total: {self.quantity}"

# Use the Product class
laptop = Product("Laptop", 999.99, 50)
mouse = Product("Mouse", 29.99, 200)

print(laptop.get_price_with_tax())  # 1079.99
print(laptop.sell(5))               # "Sold 5 Laptop(s). 45 remaining"
print(mouse.is_in_stock())          # True
print(laptop.get_total_value())     # 44999.55 (999.99 * 45)
```

## Common Mistakes

### 1. Forgetting `self`

```python
# ❌ Wrong
class Dog:
    def __init__(name):  # Missing self!
        self.name = name

# ✅ Correct
class Dog:
    def __init__(self, name):
        self.name = name
```

### 2. Using Class Name Instead of `self`

```python
# ❌ Wrong
class Counter:
    def __init__(self):
        Counter.count = 0  # Creates class attribute, not instance
    
    def increment(self):
        Counter.count += 1  # Modifies class, not instance

# ✅ Correct
class Counter:
    def __init__(self):
        self.count = 0  # Instance attribute
    
    def increment(self):
        self.count += 1  # Modifies this specific object
```

### 3. Not Returning Values from Methods

```python
# ❌ Wrong
class Calculator:
    def add(self, a, b):
        sum_result = a + b  # Calculated but not returned!

calc = Calculator()
result = calc.add(5, 3)
print(result)  # None

# ✅ Correct
class Calculator:
    def add(self, a, b):
        return a + b

calc = Calculator()
result = calc.add(5, 3)
print(result)  # 8
```

## Summary

**Classes** are blueprints for creating objects, while **objects** are instances of classes. Use the `__init__` method to initialize objects with data, and use `self` to refer to the specific object instance. **Instance attributes** are unique to each object, while **class attributes** are shared by all instances. Methods are functions that belong to a class and operate on object data. Classes provide **structure, encapsulation, and reusability** that dictionaries and functions alone cannot achieve.
