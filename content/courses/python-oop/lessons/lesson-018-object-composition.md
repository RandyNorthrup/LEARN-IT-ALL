---
id: object-composition
title: Object Composition
chapterId: ch2-classes-objects
order: 18
duration: 16
objectives:
  - Understand composition over inheritance
  - Learn to build complex objects from simple parts
  - Master has-a relationships
---

# Object Composition

**Composition** means building complex objects by combining simpler objects. It's the "has-a" relationship—a car **has an** engine, not **is an** engine.

## Composition vs Inheritance

### Inheritance (is-a)

```python
class Animal:
    def eat(self):
        return "Eating"

class Dog(Animal):  # Dog IS AN Animal
    def bark(self):
        return "Woof"
```

### Composition (has-a)

```python
class Engine:
    def start(self):
        return "Engine started"

class Car:  # Car HAS AN Engine
    def __init__(self):
        self.engine = Engine()
    
    def start(self):
        return self.engine.start()
```

## Why Composition?

**Advantages:**
- More flexible than inheritance
- Easier to change behavior at runtime
- Avoids deep inheritance hierarchies
- Follows "composition over inheritance" principle

## Basic Composition

```python
class Address:
    def __init__(self, street, city, zipcode):
        self.street = street
        self.city = city
        self.zipcode = zipcode
    
    def __str__(self):
        return f"{self.street}, {self.city} {self.zipcode}"

class Person:
    def __init__(self, name, address: Address):
        self.name = name
        self.address = address  # Composition: Person HAS AN Address
    
    def get_full_info(self):
        return f"{self.name} lives at {self.address}"

# Create composed object
address = Address("123 Main St", "Springfield", "12345")
person = Person("Alice", address)
print(person.get_full_info())
# "Alice lives at 123 Main St, Springfield 12345"
```

## Building Complex Objects

### Example: Computer System

```python
class CPU:
    def __init__(self, brand, speed):
        self.brand = brand
        self.speed = speed
    
    def process(self):
        return f"{self.brand} CPU processing at {self.speed}GHz"

class RAM:
    def __init__(self, size):
        self.size = size
    
    def load(self):
        return f"Loading data into {self.size}GB RAM"

class Storage:
    def __init__(self, capacity, type_name):
        self.capacity = capacity
        self.type = type_name
    
    def read(self):
        return f"Reading from {self.capacity}GB {self.type}"

class Computer:
    def __init__(self, cpu: CPU, ram: RAM, storage: Storage):
        self.cpu = cpu
        self.ram = ram
        self.storage = storage
    
    def boot(self):
        return [
            self.cpu.process(),
            self.ram.load(),
            self.storage.read()
        ]

# Build computer from parts
cpu = CPU("Intel", 3.5)
ram = RAM(16)
storage = Storage(512, "SSD")

computer = Computer(cpu, ram, storage)
for message in computer.boot():
    print(message)
```

## Delegation

**Delegation** means forwarding calls to composed objects:

```python
class Writer:
    def write(self, text):
        print(f"Writing: {text}")

class Logger:
    def __init__(self):
        self.writer = Writer()
    
    def log(self, message):
        # Delegate to writer
        self.writer.write(f"[LOG] {message}")

logger = Logger()
logger.log("Application started")  # "Writing: [LOG] Application started"
```

## Flexible Composition

### Swapping Components

```python
class EmailSender:
    def send(self, to, message):
        return f"Email sent to {to}: {message}"

class SMSSender:
    def send(self, to, message):
        return f"SMS sent to {to}: {message}"

class NotificationService:
    def __init__(self, sender):
        self.sender = sender  # Can be any sender
    
    def notify(self, recipient, message):
        return self.sender.send(recipient, message)
    
    def set_sender(self, sender):
        """Change sender at runtime."""
        self.sender = sender

# Use with email
service = NotificationService(EmailSender())
print(service.notify("alice@example.com", "Hello"))

# Switch to SMS
service.set_sender(SMSSender())
print(service.notify("555-1234", "Hello"))
```

## Composition Patterns

### 1. Aggregation (Shared Ownership)

```python
class Department:
    def __init__(self, name):
        self.name = name

class Employee:
    def __init__(self, name, department: Department):
        self.name = name
        self.department = department  # Department exists independently

# Department can exist without Employee
dept = Department("Engineering")
emp1 = Employee("Alice", dept)
emp2 = Employee("Bob", dept)  # Same department

del emp1  # Department still exists
```

### 2. Composition (Strong Ownership)

```python
class Engine:
    def __init__(self, horsepower):
        self.horsepower = horsepower

class Car:
    def __init__(self, model):
        self.model = model
        self.engine = Engine(200)  # Engine created and owned by Car
    
    def __del__(self):
        print(f"{self.model} and its engine are destroyed")

car = Car("Sedan")
del car  # Engine is destroyed with Car
```

## Real-World Example: Order System

```python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

class OrderItem:
    def __init__(self, product: Product, quantity):
        self.product = product
        self.quantity = quantity
    
    def get_total(self):
        return self.product.price * self.quantity

class ShippingAddress:
    def __init__(self, street, city, zipcode):
        self.street = street
        self.city = city
        self.zipcode = zipcode

class PaymentMethod:
    def __init__(self, card_number):
        self.card_number = card_number

class Order:
    def __init__(self, customer_name, shipping: ShippingAddress, 
                 payment: PaymentMethod):
        self.customer_name = customer_name
        self.shipping = shipping
        self.payment = payment
        self.items = []
    
    def add_item(self, product: Product, quantity):
        item = OrderItem(product, quantity)
        self.items.append(item)
    
    def get_total(self):
        return sum(item.get_total() for item in self.items)
    
    def get_summary(self):
        return f"""
        Order for: {self.customer_name}
        Ship to: {self.shipping.street}, {self.shipping.city}
        Total: ${self.get_total():.2f}
        Items: {len(self.items)}
        """

# Build complex order
laptop = Product("Laptop", 999.99)
mouse = Product("Mouse", 29.99)

address = ShippingAddress("123 Main St", "Springfield", "12345")
payment = PaymentMethod("**** **** **** 1234")

order = Order("Alice", address, payment)
order.add_item(laptop, 1)
order.add_item(mouse, 2)

print(order.get_summary())
```

## Composition with Lists

```python
class Student:
    def __init__(self, name):
        self.name = name

class Course:
    def __init__(self, name):
        self.name = name
        self.students = []  # Course HAS MANY Students
    
    def enroll(self, student: Student):
        self.students.append(student)
    
    def get_roster(self):
        return [student.name for student in self.students]

# Create course with multiple students
python_course = Course("Python OOP")
python_course.enroll(Student("Alice"))
python_course.enroll(Student("Bob"))
python_course.enroll(Student("Charlie"))

print(python_course.get_roster())  # ['Alice', 'Bob', 'Charlie']
```

## Nested Composition

```python
class Wheel:
    def __init__(self, size):
        self.size = size

class Axle:
    def __init__(self):
        self.front_left = Wheel(17)
        self.front_right = Wheel(17)
        self.rear_left = Wheel(17)
        self.rear_right = Wheel(17)

class Engine:
    def __init__(self, horsepower):
        self.horsepower = horsepower

class Car:
    def __init__(self):
        self.engine = Engine(200)
        self.axle = Axle()  # Axle contains Wheels
    
    def get_wheel_count(self):
        return 4

car = Car()
print(car.axle.front_left.size)  # Access nested component
```

## Forwarding Methods

```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance
    
    def deposit(self, amount):
        self._balance += amount
    
    def withdraw(self, amount):
        if amount <= self._balance:
            self._balance -= amount
            return True
        return False
    
    def get_balance(self):
        return self._balance

class Customer:
    def __init__(self, name):
        self.name = name
        self.account = BankAccount(0)
    
    # Forward methods to account
    def deposit(self, amount):
        return self.account.deposit(amount)
    
    def withdraw(self, amount):
        return self.account.withdraw(amount)
    
    def get_balance(self):
        return self.account.get_balance()

customer = Customer("Alice")
customer.deposit(1000)
customer.withdraw(200)
print(customer.get_balance())  # 800
```

## When to Use Composition

### Use Composition When:

✅ Objects have a "has-a" relationship  
✅ You need flexibility to swap components  
✅ You want to avoid deep inheritance hierarchies  
✅ Behavior can be composed from multiple parts  
✅ Objects can exist independently  

### Use Inheritance When:

✅ Objects have a clear "is-a" relationship  
✅ Subclasses share significant behavior  
✅ You want polymorphism  
✅ The hierarchy is shallow (2-3 levels)  

## Best Practices

### 1. Inject Dependencies

```python
# ✅ Good - inject dependencies
class OrderProcessor:
    def __init__(self, payment_gateway, email_service):
        self.payment_gateway = payment_gateway
        self.email_service = email_service

# ❌ Bad - create dependencies internally
class OrderProcessor:
    def __init__(self):
        self.payment_gateway = PaymentGateway()  # Hard to test
        self.email_service = EmailService()      # Hard to swap
```

### 2. Use Type Hints

```python
# ✅ Good - clear types
class Car:
    def __init__(self, engine: Engine, transmission: Transmission):
        self.engine = engine
        self.transmission = transmission
```

### 3. Keep Composition Shallow

```python
# ✅ Good - shallow composition
class Order:
    def __init__(self, customer, items):
        self.customer = customer
        self.items = items

# ❌ Bad - too deep
# order.customer.address.city.state.country.region...
```

## Summary

**Composition** builds complex objects from simpler parts using "has-a" relationships, offering more flexibility than inheritance. Composed objects can be **swapped at runtime**, making systems more adaptable and testable. Use **delegation** to forward method calls to composed objects, and **inject dependencies** rather than creating them internally. Composition works well for **aggregation** (shared ownership) and **strong ownership** scenarios. Prefer composition over inheritance when objects can exist independently, when you need runtime flexibility, or when inheritance hierarchies would become too deep. Composition makes code more maintainable and easier to test.
