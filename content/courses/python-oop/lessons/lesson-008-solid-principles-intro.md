---
id: solid-principles-intro
title: Introduction to SOLID Principles
chapterId: ch1-clean-code
order: 8
duration: 18
objectives:
  - Understand what SOLID principles are
  - Learn why SOLID matters in OOP
  - Get overview of all five SOLID principles
---

# Introduction to SOLID Principles

**SOLID** is an acronym for five design principles that make software more maintainable, flexible, and scalable. These principles are fundamental to good object-oriented design.

## What is SOLID?

**S**ingle Responsibility Principle  
**O**pen/Closed Principle  
**L**iskov Substitution Principle  
**I**nterface Segregation Principle  
**D**Dependency Inversion Principle

## Why SOLID Matters

SOLID principles help you write code that is:
- **Easy to understand** - Clear responsibilities
- **Easy to change** - Flexible design
- **Easy to test** - Isolated components
- **Easy to extend** - Add features without breaking existing code

## S - Single Responsibility Principle (SRP)

**A class should have only one reason to change.**

```python
# ❌ Bad: Multiple responsibilities
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
    
    def save_to_database(self):
        """Database operation"""
        database.save(self)
    
    def send_email(self, message):
        """Email operation"""
        email_service.send(self.email, message)
    
    def generate_report(self):
        """Reporting operation"""
        return f"User Report: {self.name}"

# ✅ Good: Single responsibility per class
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

class UserRepository:
    def save(self, user):
        """Handle database operations"""
        database.save(user)

class EmailService:
    def send_to_user(self, user, message):
        """Handle email operations"""
        email_service.send(user.email, message)

class UserReportGenerator:
    def generate(self, user):
        """Handle report generation"""
        return f"User Report: {user.name}"
```

## O - Open/Closed Principle (OCP)

**Software entities should be open for extension, but closed for modification.**

```python
# ❌ Bad: Must modify to add new discount types
class DiscountCalculator:
    def calculate(self, customer_type, amount):
        if customer_type == "regular":
            return amount * 0.10
        elif customer_type == "premium":
            return amount * 0.20
        elif customer_type == "vip":
            return amount * 0.30
        # Adding new type requires modifying this method

# ✅ Good: Extend by adding new classes
class DiscountStrategy:
    def calculate(self, amount):
        raise NotImplementedError

class RegularDiscount(DiscountStrategy):
    def calculate(self, amount):
        return amount * 0.10

class PremiumDiscount(DiscountStrategy):
    def calculate(self, amount):
        return amount * 0.20

class VIPDiscount(DiscountStrategy):
    def calculate(self, amount):
        return amount * 0.30

# Add new discount types without modifying existing code
class StudentDiscount(DiscountStrategy):
    def calculate(self, amount):
        return amount * 0.15
```

## L - Liskov Substitution Principle (LSP)

**Subclasses should be substitutable for their base classes.**

```python
# ❌ Bad: Violates LSP
class Bird:
    def fly(self):
        return "Flying"

class Penguin(Bird):
    def fly(self):
        raise Exception("Penguins can't fly!")
        # Breaks substitutability

# ✅ Good: Proper abstraction
class Bird:
    def move(self):
        raise NotImplementedError

class FlyingBird(Bird):
    def move(self):
        return "Flying"
    
    def fly(self):
        return "Flying high"

class Penguin(Bird):
    def move(self):
        return "Swimming"
    
    def swim(self):
        return "Swimming fast"

# Now all birds can move, but only some can fly
```

## I - Interface Segregation Principle (ISP)

**Clients shouldn't be forced to depend on interfaces they don't use.**

```python
# ❌ Bad: Fat interface
class Worker:
    def work(self):
        pass
    
    def eat(self):
        pass
    
    def sleep(self):
        pass

class Robot(Worker):
    def work(self):
        return "Working"
    
    def eat(self):
        raise Exception("Robots don't eat!")
    
    def sleep(self):
        raise Exception("Robots don't sleep!")

# ✅ Good: Segregated interfaces
class Workable:
    def work(self):
        raise NotImplementedError

class Eatable:
    def eat(self):
        raise NotImplementedError

class Sleepable:
    def sleep(self):
        raise NotImplementedError

class Human(Workable, Eatable, Sleepable):
    def work(self):
        return "Working"
    
    def eat(self):
        return "Eating"
    
    def sleep(self):
        return "Sleeping"

class Robot(Workable):
    def work(self):
        return "Working"
    # Robot only implements what it needs
```

## D - Dependency Inversion Principle (DIP)

**Depend on abstractions, not concretions.**

```python
# ❌ Bad: High-level depends on low-level
class MySQLDatabase:
    def save(self, data):
        print("Saving to MySQL")

class UserService:
    def __init__(self):
        self.db = MySQLDatabase()  # Tight coupling
    
    def save_user(self, user):
        self.db.save(user)

# ✅ Good: Both depend on abstraction
class Database:
    def save(self, data):
        raise NotImplementedError

class MySQLDatabase(Database):
    def save(self, data):
        print("Saving to MySQL")

class PostgreSQLDatabase(Database):
    def save(self, data):
        print("Saving to PostgreSQL")

class UserService:
    def __init__(self, database: Database):
        self.db = database  # Depend on abstraction
    
    def save_user(self, user):
        self.db.save(user)

# Can use any database implementation
mysql_service = UserService(MySQLDatabase())
postgres_service = UserService(PostgreSQLDatabase())
```

## Benefits of SOLID

### 1. Maintainability
Each principle makes code easier to understand and modify.

### 2. Flexibility
Easy to add new features without breaking existing code.

### 3. Testability
Isolated components are easier to test.

### 4. Reusability
Well-designed classes can be reused in different contexts.

### 5. Scalability
Systems grow without becoming unmanageable.

## When to Apply SOLID

- **Starting new projects** - Build on solid foundations
- **Refactoring** - Improve existing code structure
- **Code reviews** - Evaluate design quality
- **Growing codebases** - Prevent technical debt

## Common Mistakes

### 1. Over-Engineering

Don't apply SOLID just for the sake of it:

```python
# ❌ Bad: Over-engineered for simple task
class AdditionStrategy:
    def execute(self, a, b):
        return a + b

class Calculator:
    def __init__(self, strategy):
        self.strategy = strategy

# ✅ Good: Simple is better
def add(a, b):
    return a + b
```

### 2. Premature Abstraction

Start simple, refactor when needed:

```python
# Start with simple code
class Order:
    def calculate_total(self):
        return sum(item.price for item in self.items)

# Refactor to SOLID when complexity grows
# Not before you need it
```

## Summary

**SOLID principles** provide guidelines for writing maintainable OOP code. **Single Responsibility** means one reason to change, **Open/Closed** means extend without modifying, **Liskov Substitution** means subclasses work like base classes, **Interface Segregation** means no fat interfaces, and **Dependency Inversion** means depend on abstractions. Apply these principles to make code more **flexible, testable, and maintainable**, but avoid over-engineering simple solutions.
