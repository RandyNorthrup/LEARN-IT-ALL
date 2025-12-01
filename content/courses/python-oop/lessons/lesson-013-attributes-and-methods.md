---
id: attributes-and-methods
title: Attributes and Methods
chapterId: ch2-classes-objects
order: 13
duration: 15
objectives:
  - Master instance and class attributes
  - Understand method types and when to use them
  - Learn attribute access patterns
---

# Attributes and Methods

**Attributes** store data, **methods** define behavior. Understanding how they work together is essential for effective OOP.

## Instance Attributes

Instance attributes belong to specific objects:

```python
class Student:
    def __init__(self, name, grade):
        self.name = name      # Instance attribute
        self.grade = grade    # Instance attribute

student1 = Student("Alice", 95)
student2 = Student("Bob", 87)

print(student1.name)   # "Alice"
print(student2.name)   # "Bob"
# Each object has its own values
```

### Setting Attributes in `__init__`

```python
class Car:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
        self.mileage = 0           # Default value
        self.is_running = False    # Default value
    
    def start(self):
        self.is_running = True
    
    def drive(self, miles):
        if self.is_running:
            self.mileage += miles

car = Car("Toyota", "Camry", 2020)
car.start()
car.drive(100)
print(car.mileage)  # 100
```

### Setting Attributes After Creation

```python
class Person:
    def __init__(self, name):
        self.name = name
    
    def set_age(self, age):
        self.age = age  # Added later

person = Person("Alice")
person.set_age(30)
print(person.age)  # 30

# Can also set directly (but not recommended)
person.city = "New York"
print(person.city)  # "New York"
```

## Class Attributes

Class attributes are shared by all instances:

```python
class Employee:
    company_name = "TechCorp"      # Class attribute
    employee_count = 0             # Class attribute
    
    def __init__(self, name):
        self.name = name           # Instance attribute
        Employee.employee_count += 1

emp1 = Employee("Alice")
emp2 = Employee("Bob")

print(emp1.company_name)           # "TechCorp"
print(emp2.company_name)           # "TechCorp"
print(Employee.employee_count)     # 2

# Change class attribute affects all instances
Employee.company_name = "NewCorp"
print(emp1.company_name)           # "NewCorp"
print(emp2.company_name)           # "NewCorp"
```

### When to Use Class Attributes

```python
class Circle:
    pi = 3.14159  # Class attribute - same for all circles
    
    def __init__(self, radius):
        self.radius = radius  # Instance attribute - unique per circle
    
    def area(self):
        return Circle.pi * self.radius ** 2

circle1 = Circle(5)
circle2 = Circle(10)

print(circle1.area())  # 78.53975
print(circle2.area())  # 314.159
```

## Public vs Private Attributes

### Public Attributes

```python
class Book:
    def __init__(self, title, pages):
        self.title = title    # Public - anyone can access
        self.pages = pages    # Public

book = Book("Python Guide", 300)
print(book.title)  # Direct access OK
book.pages = 350   # Direct modification OK
```

### Private Attributes (Convention)

```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # Private by convention (single underscore)
    
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
    
    def get_balance(self):
        return self._balance

account = BankAccount(1000)
account.deposit(500)
print(account.get_balance())  # 1500

# Can still access, but shouldn't (it's private)
# print(account._balance)  # Works but violates convention
```

### Name Mangling (Strong Privacy)

```python
class Secret:
    def __init__(self, value):
        self.__secret = value  # Double underscore - name mangled
    
    def reveal(self):
        return self.__secret

obj = Secret("password123")
print(obj.reveal())  # "password123"

# print(obj.__secret)  # AttributeError!
# Python mangles the name to _Secret__secret
```

## Instance Methods

Instance methods operate on object data:

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        """Calculate area - uses instance data."""
        return self.width * self.height
    
    def perimeter(self):
        """Calculate perimeter - uses instance data."""
        return 2 * (self.width + self.height)
    
    def resize(self, width, height):
        """Modify instance data."""
        self.width = width
        self.height = height

rect = Rectangle(10, 5)
print(rect.area())       # 50
rect.resize(20, 10)
print(rect.area())       # 200
```

## Class Methods

Class methods work with class-level data:

```python
class Pizza:
    menu_items = []  # Class attribute
    
    def __init__(self, name, price):
        self.name = name
        self.price = price
    
    @classmethod
    def add_to_menu(cls, name, price):
        """Add pizza to menu - class method."""
        pizza = cls(name, price)
        cls.menu_items.append(pizza)
        return pizza
    
    @classmethod
    def get_menu(cls):
        """Get all menu items."""
        return cls.menu_items

# Use class methods
Pizza.add_to_menu("Margherita", 10.99)
Pizza.add_to_menu("Pepperoni", 12.99)

menu = Pizza.get_menu()
for pizza in menu:
    print(f"{pizza.name}: ${pizza.price}")
```

## Static Methods

Static methods don't access instance or class data:

```python
class StringUtils:
    @staticmethod
    def is_palindrome(text):
        """Check if string is palindrome."""
        clean = text.lower().replace(" ", "")
        return clean == clean[::-1]
    
    @staticmethod
    def count_words(text):
        """Count words in string."""
        return len(text.split())
    
    @staticmethod
    def capitalize_words(text):
        """Capitalize each word."""
        return " ".join(word.capitalize() for word in text.split())

# Use without creating instance
print(StringUtils.is_palindrome("racecar"))      # True
print(StringUtils.count_words("hello world"))    # 2
print(StringUtils.capitalize_words("hello"))     # "Hello"
```

## Method Types Comparison

```python
class Example:
    class_var = "shared"
    
    def __init__(self, value):
        self.instance_var = value
    
    def instance_method(self):
        """Can access instance and class data."""
        return f"Instance: {self.instance_var}, Class: {Example.class_var}"
    
    @classmethod
    def class_method(cls):
        """Can access class data, not instance data."""
        return f"Class: {cls.class_var}"
    
    @staticmethod
    def static_method(value):
        """Cannot access class or instance data."""
        return f"Just processing: {value}"

obj = Example("test")
print(obj.instance_method())      # "Instance: test, Class: shared"
print(Example.class_method())     # "Class: shared"
print(Example.static_method(42))  # "Just processing: 42"
```

## Getters and Setters

### Without Properties

```python
class Person:
    def __init__(self, age):
        self._age = age
    
    def get_age(self):
        return self._age
    
    def set_age(self, age):
        if age < 0:
            raise ValueError("Age cannot be negative")
        self._age = age

person = Person(25)
print(person.get_age())  # 25
person.set_age(30)
print(person.get_age())  # 30
```

### With Properties (Pythonic Way)

```python
class Person:
    def __init__(self, age):
        self._age = age
    
    @property
    def age(self):
        """Get age."""
        return self._age
    
    @age.setter
    def age(self, age):
        """Set age with validation."""
        if age < 0:
            raise ValueError("Age cannot be negative")
        self._age = age

person = Person(25)
print(person.age)  # 25 (looks like attribute access)
person.age = 30    # Validation happens automatically
print(person.age)  # 30
```

## Computed Properties

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    @property
    def area(self):
        """Calculate area on the fly."""
        return self.width * self.height
    
    @property
    def perimeter(self):
        """Calculate perimeter on the fly."""
        return 2 * (self.width + self.height)

rect = Rectangle(10, 5)
print(rect.area)       # 50 (computed)
print(rect.perimeter)  # 30 (computed)

rect.width = 20
print(rect.area)       # 100 (automatically updated)
```

## Method Chaining

```python
class QueryBuilder:
    def __init__(self):
        self._filters = []
        self._limit = None
    
    def where(self, condition):
        """Add filter condition."""
        self._filters.append(condition)
        return self  # Return self for chaining
    
    def limit(self, count):
        """Set result limit."""
        self._limit = count
        return self  # Return self for chaining
    
    def build(self):
        """Build final query."""
        query = " AND ".join(self._filters)
        if self._limit:
            query += f" LIMIT {self._limit}"
        return query

# Chain methods together
query = (QueryBuilder()
    .where("age > 18")
    .where("country = 'US'")
    .limit(10)
    .build())

print(query)  # "age > 18 AND country = 'US' LIMIT 10"
```

## Best Practices

### 1. Initialize All Attributes in `__init__`

```python
# ✅ Good
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
        self.discount = 0  # Initialize even if 0

# ❌ Bad
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
        # discount not initialized - could cause AttributeError
```

### 2. Use Properties for Validation

```python
# ✅ Good
class Product:
    def __init__(self, price):
        self._price = price
    
    @property
    def price(self):
        return self._price
    
    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Price cannot be negative")
        self._price = value

# ❌ Bad
class Product:
    def __init__(self, price):
        self.price = price  # No validation
```

### 3. Keep Methods Focused

```python
# ✅ Good
class Order:
    def validate(self):
        # Just validation
        pass
    
    def calculate_total(self):
        # Just calculation
        pass
    
    def save(self):
        # Just saving
        pass

# ❌ Bad
class Order:
    def process(self):
        # Validates, calculates, saves all in one
        pass
```

## Summary

**Instance attributes** store unique data for each object, while **class attributes** are shared across all instances. Use **instance methods** for operations on object data, **class methods** for operations on class-level data, and **static methods** for utilities that don't need access to class or instance data. Implement **properties** for controlled attribute access with validation, and use **private attributes** (with underscore prefix) to signal internal implementation details. Initialize all attributes in `__init__` and keep methods focused on a single responsibility.
