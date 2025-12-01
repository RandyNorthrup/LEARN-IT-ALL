---
id: class-variables
title: Class Variables vs Instance Variables
chapterId: ch2-classes-objects
order: 16
duration: 14
objectives:
  - Understand the difference between class and instance variables
  - Learn when to use each type
  - Avoid common variable scope mistakes
---

# Class Variables vs Instance Variables

Understanding the difference between **class variables** and **instance variables** is crucial for writing correct object-oriented code.

## Instance Variables

Instance variables are **unique to each object**:

```python
class Dog:
    def __init__(self, name, age):
        self.name = name  # Instance variable
        self.age = age    # Instance variable

dog1 = Dog("Buddy", 3)
dog2 = Dog("Max", 5)

print(dog1.name)  # "Buddy"
print(dog2.name)  # "Max"

# Each object has its own instance variables
dog1.name = "Buddy Jr."
print(dog1.name)  # "Buddy Jr."
print(dog2.name)  # "Max" (unchanged)
```

## Class Variables

Class variables are **shared by all instances**:

```python
class Dog:
    species = "Canis familiaris"  # Class variable (shared)
    
    def __init__(self, name, age):
        self.name = name  # Instance variable (unique)
        self.age = age    # Instance variable (unique)

dog1 = Dog("Buddy", 3)
dog2 = Dog("Max", 5)

# Both dogs share the same species
print(dog1.species)  # "Canis familiaris"
print(dog2.species)  # "Canis familiaris"
print(Dog.species)   # "Canis familiaris"

# Changing class variable affects all instances
Dog.species = "Domestic Dog"
print(dog1.species)  # "Domestic Dog"
print(dog2.species)  # "Domestic Dog"
```

## When to Use Each

### Use Instance Variables For:

- **Unique data** for each object
- **Object state** that varies between instances

```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner      # Different for each account
        self.balance = balance  # Different for each account
```

### Use Class Variables For:

- **Shared constants** across all instances
- **Counters** tracking all objects
- **Default values** for all instances

```python
class Employee:
    company_name = "TechCorp"       # Same for all employees
    min_salary = 50000              # Same for all employees
    employee_count = 0              # Shared counter
    
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.employee_count += 1  # Increment shared counter
```

## Accessing Variables

### Accessing Instance Variables

```python
class Person:
    def __init__(self, name):
        self.name = name
    
    def greet(self):
        return f"Hello, I'm {self.name}"  # Access via self

person = Person("Alice")
print(person.name)      # Access via instance
print(person.greet())   # "Hello, I'm Alice"
```

### Accessing Class Variables

```python
class Circle:
    pi = 3.14159  # Class variable
    
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        # Access class variable via class name
        return Circle.pi * self.radius ** 2
    
    def circumference(self):
        # Or access via self (finds class variable)
        return 2 * self.pi * self.radius

circle = Circle(5)
print(Circle.pi)          # Access via class
print(circle.pi)          # Access via instance
print(circle.area())      # Uses Circle.pi
```

## The Shadowing Problem

### What is Shadowing?

```python
class Counter:
    count = 0  # Class variable
    
    def __init__(self):
        self.count = 0  # Instance variable (shadows class variable!)
    
    def increment(self):
        self.count += 1  # Increments instance variable, not class

c1 = Counter()
c2 = Counter()

c1.increment()
c2.increment()

print(c1.count)      # 1 (instance variable)
print(c2.count)      # 1 (instance variable)
print(Counter.count) # 0 (class variable unchanged!)
```

### Avoiding Shadowing

```python
# ✅ Good: Different names
class Counter:
    total_count = 0  # Class variable - different name
    
    def __init__(self):
        self.instance_count = 0  # Instance variable - different name
        Counter.total_count += 1
    
    def increment(self):
        self.instance_count += 1

c1 = Counter()
c2 = Counter()

print(Counter.total_count)  # 2 (total objects created)
c1.increment()
c2.increment()
print(c1.instance_count)    # 1
print(c2.instance_count)    # 1
```

## Mutable Class Variables (Dangerous!)

### The Problem

```python
# ❌ DANGER: Mutable class variable shared by all
class Team:
    members = []  # Mutable class variable!
    
    def __init__(self, name):
        self.name = name
    
    def add_member(self, member):
        self.members.append(member)  # Modifies shared list!

team1 = Team("Team A")
team2 = Team("Team B")

team1.add_member("Alice")
team2.add_member("Bob")

print(team1.members)  # ['Alice', 'Bob'] - Both in team1!
print(team2.members)  # ['Alice', 'Bob'] - Both in team2!
```

### The Solution

```python
# ✅ CORRECT: Mutable instance variable
class Team:
    def __init__(self, name):
        self.name = name
        self.members = []  # Each team gets its own list
    
    def add_member(self, member):
        self.members.append(member)

team1 = Team("Team A")
team2 = Team("Team B")

team1.add_member("Alice")
team2.add_member("Bob")

print(team1.members)  # ['Alice']
print(team2.members)  # ['Bob']
```

## Practical Use Cases

### 1. Configuration Constants

```python
class DatabaseConnection:
    HOST = "localhost"       # Class variable
    PORT = 5432             # Class variable
    TIMEOUT = 30            # Class variable
    
    def __init__(self, database):
        self.database = database  # Instance variable
    
    def connect(self):
        return f"Connecting to {self.database} at {DatabaseConnection.HOST}:{DatabaseConnection.PORT}"
```

### 2. Object Counting

```python
class Product:
    total_products = 0  # Class variable - counts all products
    
    def __init__(self, name, price):
        self.name = name
        self.price = price
        Product.total_products += 1
    
    @classmethod
    def get_total_products(cls):
        return cls.total_products

p1 = Product("Laptop", 999)
p2 = Product("Mouse", 29)
p3 = Product("Keyboard", 79)

print(Product.get_total_products())  # 3
```

### 3. Default Values

```python
class EmailSettings:
    default_sender = "noreply@example.com"  # Class variable
    default_subject = "Notification"        # Class variable
    
    def __init__(self, recipient):
        self.recipient = recipient
        self.sender = EmailSettings.default_sender      # Use class default
        self.subject = EmailSettings.default_subject    # Use class default
    
    def customize(self, sender=None, subject=None):
        if sender:
            self.sender = sender
        if subject:
            self.subject = subject
```

### 4. Shared Cache

```python
class User:
    _cache = {}  # Class variable - shared cache
    
    def __init__(self, user_id, name):
        self.user_id = user_id
        self.name = name
        User._cache[user_id] = self
    
    @classmethod
    def get_from_cache(cls, user_id):
        return cls._cache.get(user_id)

user1 = User(1, "Alice")
user2 = User(2, "Bob")

# Retrieve from cache
cached_user = User.get_from_cache(1)
print(cached_user.name)  # "Alice"
```

## Modifying Class Variables

### From Class

```python
class Config:
    debug_mode = False

# Change for all instances
Config.debug_mode = True

config1 = Config()
config2 = Config()

print(config1.debug_mode)  # True
print(config2.debug_mode)  # True
```

### From Instance (Creates Shadow)

```python
class Config:
    debug_mode = False

config1 = Config()
config2 = Config()

# This creates an instance variable (shadow)
config1.debug_mode = True

print(config1.debug_mode)  # True (instance variable)
print(config2.debug_mode)  # False (class variable)
print(Config.debug_mode)   # False (class variable)

# To modify class variable from instance
Config.debug_mode = True
print(config2.debug_mode)  # True (now changed)
```

## Best Practices

### 1. Use UPPERCASE for Constants

```python
class Circle:
    PI = 3.14159  # Uppercase signals constant
    
    def __init__(self, radius):
        self.radius = radius  # Lowercase for instance variable
```

### 2. Use Class Methods to Modify Class Variables

```python
class GameSettings:
    difficulty = "normal"
    
    @classmethod
    def set_difficulty(cls, level):
        """Modify class variable safely."""
        if level in ["easy", "normal", "hard"]:
            cls.difficulty = level
        else:
            raise ValueError("Invalid difficulty")

GameSettings.set_difficulty("hard")
```

### 3. Avoid Mutable Class Variables

```python
# ❌ AVOID
class Bad:
    items = []  # Mutable class variable - dangerous!

# ✅ PREFER
class Good:
    def __init__(self):
        self.items = []  # Mutable instance variable - safe
```

### 4. Document Variable Scope

```python
class Server:
    """Server connection handler.
    
    Class Variables:
        DEFAULT_PORT: Default port number (8080)
        active_connections: Count of active connections
    
    Instance Variables:
        host: Server hostname
        port: Server port number
        connected: Connection status
    """
    
    DEFAULT_PORT = 8080
    active_connections = 0
    
    def __init__(self, host, port=None):
        self.host = host
        self.port = port or Server.DEFAULT_PORT
        self.connected = False
```

## Summary

**Instance variables** are unique to each object and defined in `__init__` using `self`, while **class variables** are shared across all instances and defined directly in the class body. Use instance variables for data that varies between objects, and class variables for shared constants, counters, or default values. Be careful with **mutable class variables** like lists and dictionaries—they're shared and can cause unexpected behavior. Avoid **shadowing** class variables by using different names for instance variables. Access class variables through the class name (`ClassName.variable`) to make your intent clear.
