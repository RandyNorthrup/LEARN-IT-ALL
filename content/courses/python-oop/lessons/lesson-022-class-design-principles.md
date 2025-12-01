---
id: class-design-principles
title: Class Design Principles
chapterId: ch2-classes-objects
order: 22
duration: 16
objectives:
  - Learn principles for designing good classes
  - Understand cohesion and coupling
  - Master class responsibility patterns
---

# Class Design Principles

Good class design makes code **maintainable, testable, and extensible**. Let's explore the principles that guide effective class design.

## Single Responsibility Principle (SRP)

**A class should have only one reason to change.**

### Violating SRP

```python
# ❌ Bad: Multiple responsibilities
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
    
    def save_to_database(self):
        """Database responsibility."""
        pass
    
    def send_welcome_email(self):
        """Email responsibility."""
        pass
    
    def validate_email(self):
        """Validation responsibility."""
        pass
    
    def generate_report(self):
        """Reporting responsibility."""
        pass

# Changes to any of these features requires changing User class!
```

### Following SRP

```python
# ✅ Good: Single responsibility per class
class User:
    """Represents user data only."""
    def __init__(self, name, email):
        self.name = name
        self.email = email

class UserRepository:
    """Handles user persistence."""
    def save(self, user: User):
        # Database logic
        pass
    
    def find_by_email(self, email):
        # Query logic
        pass

class EmailService:
    """Handles email operations."""
    def send_welcome_email(self, user: User):
        # Email logic
        pass

class UserValidator:
    """Handles user validation."""
    def validate_email(self, email):
        # Validation logic
        pass

class UserReportGenerator:
    """Handles user reporting."""
    def generate_report(self, user: User):
        # Report logic
        pass
```

## High Cohesion

**Related functionality should be kept together.**

```python
# ✅ Good: High cohesion - all methods work with the same data
class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add_item(self, item):
        """Works with items."""
        self.items.append(item)
    
    def remove_item(self, item):
        """Works with items."""
        self.items.remove(item)
    
    def get_total(self):
        """Works with items."""
        return sum(item.price * item.quantity for item in self.items)
    
    def clear(self):
        """Works with items."""
        self.items = []

# ❌ Bad: Low cohesion - unrelated methods
class ShoppingCart:
    def add_item(self, item):
        pass
    
    def send_email(self, user):  # Unrelated!
        pass
    
    def log_to_file(self, message):  # Unrelated!
        pass
```

## Low Coupling

**Classes should be independent and loosely connected.**

```python
# ❌ Bad: Tight coupling
class Order:
    def __init__(self):
        self.items = []
        self.payment_processor = StripePaymentProcessor()  # Tight coupling!
    
    def process_payment(self, amount):
        self.payment_processor.charge(amount)

# ✅ Good: Loose coupling (dependency injection)
class Order:
    def __init__(self, payment_processor):
        self.items = []
        self.payment_processor = payment_processor  # Any payment processor works
    
    def process_payment(self, amount):
        self.payment_processor.charge(amount)

# Can easily swap implementations
stripe_processor = StripePaymentProcessor()
paypal_processor = PayPalPaymentProcessor()

order1 = Order(stripe_processor)
order2 = Order(paypal_processor)
```

## Encapsulation

**Hide internal details, expose only what's necessary.**

```python
# ❌ Bad: Everything public
class BankAccount:
    def __init__(self, balance):
        self.balance = balance  # Public
        self.transaction_log = []  # Public
        self.account_type = "checking"  # Public

account = BankAccount(1000)
account.balance = -500  # Oops! Direct modification

# ✅ Good: Controlled access
class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # Private
        self._transaction_log = []  # Private
        self._account_type = "checking"  # Private
    
    def deposit(self, amount):
        """Public interface with validation."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
        self._transaction_log.append(f"Deposit: {amount}")
    
    def withdraw(self, amount):
        """Public interface with validation."""
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount
        self._transaction_log.append(f"Withdrawal: {amount}")
    
    def get_balance(self):
        """Controlled access to balance."""
        return self._balance

account = BankAccount(1000)
account.deposit(500)  # Validated
# account._balance = -500  # Possible but violates convention
```

## Interface Segregation

**Clients shouldn't depend on interfaces they don't use.**

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
        raise NotImplementedError("Robots don't eat!")
    
    def sleep(self):
        raise NotImplementedError("Robots don't sleep!")

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

class Robot(Workable):  # Only implements what it needs
    def work(self):
        return "Working"
```

## Composition Over Inheritance

**Favor object composition over class inheritance.**

```python
# ❌ Problematic: Deep inheritance
class Animal:
    pass

class Mammal(Animal):
    pass

class Carnivore(Mammal):
    pass

class Dog(Carnivore):
    pass

# What about a platypus? Lays eggs but is a mammal...

# ✅ Better: Composition
class Animal:
    def __init__(self, diet, reproduction):
        self.diet = diet
        self.reproduction = reproduction

class Carnivore:
    def eat(self):
        return "Eating meat"

class Herbivore:
    def eat(self):
        return "Eating plants"

class EggLayer:
    def reproduce(self):
        return "Laying eggs"

class LiveBirth:
    def reproduce(self):
        return "Live birth"

# Flexible composition
dog = Animal(Carnivore(), LiveBirth())
platypus = Animal(Carnivore(), EggLayer())  # Mammal that lays eggs!
```

## Tell, Don't Ask

**Tell objects what to do, don't ask for their state.**

```python
# ❌ Bad: Asking for state
def process_order(order):
    if order.status == "pending":
        if order.payment_received:
            order.status = "processing"
            order.ship()
        else:
            order.status = "awaiting_payment"

# ✅ Good: Telling what to do
class Order:
    def __init__(self):
        self._status = "pending"
        self._payment_received = False
    
    def mark_payment_received(self):
        """Tell the order to update itself."""
        self._payment_received = True
        self._update_status()
    
    def _update_status(self):
        """Internal logic hidden."""
        if self._status == "pending" and self._payment_received:
            self._status = "processing"
            self._ship()
    
    def _ship(self):
        print("Shipping order...")

# Usage
order = Order()
order.mark_payment_received()  # Tell, don't ask
```

## Law of Demeter (Principle of Least Knowledge)

**Objects should only talk to their immediate friends.**

```python
# ❌ Bad: Violates Law of Demeter
class Order:
    def __init__(self, customer):
        self.customer = customer

class Customer:
    def __init__(self, address):
        self.address = address

class Address:
    def __init__(self, city):
        self.city = city

# Too much knowledge of internal structure
order = Order(Customer(Address("New York")))
city = order.customer.address.city  # Reaches too deep!

# ✅ Good: Follows Law of Demeter
class Order:
    def __init__(self, customer):
        self.customer = customer
    
    def get_customer_city(self):
        """Delegate to customer."""
        return self.customer.get_city()

class Customer:
    def __init__(self, address):
        self.address = address
    
    def get_city(self):
        """Delegate to address."""
        return self.address.get_city()

class Address:
    def __init__(self, city):
        self._city = city
    
    def get_city(self):
        return self._city

# Clean interface
order = Order(Customer(Address("New York")))
city = order.get_customer_city()  # One level of delegation
```

## Naming Conventions

```python
# ✅ Good: Clear, descriptive names
class CustomerOrderProcessor:  # PascalCase for classes
    MAX_ORDER_ITEMS = 100  # UPPERCASE for constants
    
    def __init__(self, database_connection):  # snake_case for variables
        self._connection = database_connection  # Leading underscore for private
        self.__api_key = "secret"  # Double underscore for name mangling
    
    def process_customer_order(self, order):  # snake_case for methods
        """Process a customer order."""  # Docstring
        pass
    
    def _validate_order(self, order):  # Private method
        """Internal validation method."""
        pass

# ❌ Bad: Unclear names
class PROC:  # What does PROC mean?
    x = 100  # What is x?
    
    def do_it(self, thing):  # What does it do?
        pass
```

## Keep Classes Small

```python
# ✅ Good: Focused, small class
class EmailValidator:
    """Single purpose: validate emails."""
    def validate(self, email):
        return "@" in email and "." in email.split("@")[1]

# ❌ Bad: God class doing everything
class UserManager:
    """Too many responsibilities!"""
    def create_user(self): pass
    def update_user(self): pass
    def delete_user(self): pass
    def send_email(self): pass
    def validate_email(self): pass
    def hash_password(self): pass
    def authenticate(self): pass
    def generate_token(self): pass
    def log_activity(self): pass
    def send_notification(self): pass
    # 50+ methods...
```

## Immutability When Possible

```python
# ✅ Good: Immutable value object
from dataclasses import dataclass

@dataclass(frozen=True)
class Money:
    amount: float
    currency: str
    
    def add(self, other):
        """Returns new Money object."""
        if self.currency != other.currency:
            raise ValueError("Currency mismatch")
        return Money(self.amount + other.amount, self.currency)

# Cannot modify after creation
price = Money(100, "USD")
# price.amount = 200  # Error! Frozen
new_price = price.add(Money(50, "USD"))  # Returns new object
```

## Dependency Injection

```python
# ✅ Good: Dependencies injected
class OrderService:
    def __init__(self, repository, email_service, logger):
        """Inject all dependencies."""
        self.repository = repository
        self.email_service = email_service
        self.logger = logger
    
    def create_order(self, order):
        self.logger.log("Creating order")
        self.repository.save(order)
        self.email_service.send_confirmation(order)

# Easy to test with mocks
mock_repo = MockRepository()
mock_email = MockEmailService()
mock_logger = MockLogger()

service = OrderService(mock_repo, mock_email, mock_logger)

# ❌ Bad: Dependencies created internally
class OrderService:
    def __init__(self):
        self.repository = DatabaseRepository()  # Hard to test!
        self.email_service = SmtpEmailService()  # Hard to swap!
        self.logger = FileLogger()              # Hard to mock!
```

## Fail Fast

```python
# ✅ Good: Validate early
class User:
    def __init__(self, username, age):
        if not username:
            raise ValueError("Username required")
        if age < 0:
            raise ValueError("Age must be positive")
        
        self.username = username
        self.age = age

# Fails immediately
# user = User("", -5)  # ValueError right away!

# ❌ Bad: Fail later
class User:
    def __init__(self, username, age):
        self.username = username
        self.age = age
    
    def save(self):
        if not self.username:  # Fails much later!
            raise ValueError("Username required")
```

## Design Checklist

When designing a class, ask:

✅ Does it have a single, clear responsibility?  
✅ Are related methods kept together (high cohesion)?  
✅ Is it loosely coupled to other classes?  
✅ Does it hide internal details (encapsulation)?  
✅ Is the interface minimal and intuitive?  
✅ Are dependencies injected, not created?  
✅ Does it validate inputs early?  
✅ Is it well-named and documented?  
✅ Is it testable?  
✅ Is it small and focused?  

## Summary

Design classes with **single responsibility**—one reason to change. Aim for **high cohesion** (related functionality together) and **low coupling** (minimal dependencies). Use **encapsulation** to hide internals and expose only necessary interfaces. Apply **interface segregation** so clients depend only on what they use. Prefer **composition over inheritance** for flexibility. Follow **Tell, Don't Ask** by having objects manage their own state. Practice **dependency injection** for testability. Use **immutability** when possible for safer code. **Fail fast** with early validation. Good class design makes systems maintainable, testable, and easy to extend.
