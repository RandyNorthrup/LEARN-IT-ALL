---
id: "108-class-instance-scope"
title: "Class Scope vs Instance Scope"
chapterId: ch7-scope
order: 12
duration: 25
objectives:
  - Understand class vs instance variables
  - Master attribute lookup order
  - Learn when to use class vs instance attributes
  - Avoid common scope pitfalls with classes
---

# Class Scope vs Instance Scope

Classes in Python have two types of attributes: class attributes (shared by all instances) and instance attributes (unique to each instance).

## Class Attributes vs Instance Attributes

```python
class Counter:
    # CLASS ATTRIBUTE - shared by all instances
    total_count = 0
    
    def __init__(self, name):
        # INSTANCE ATTRIBUTE - unique to each instance
        self.name = name
        self.count = 0
        
        # Modify class attribute
        Counter.total_count += 1

# Create instances
c1 = Counter("First")
c2 = Counter("Second")
c3 = Counter("Third")

# Instance attributes are different
print(c1.name)  # First
print(c2.name)  # Second
print(c3.name)  # Third

# Class attribute is shared
print(c1.total_count)  # 3
print(c2.total_count)  # 3
print(c3.total_count)  # 3
print(Counter.total_count)  # 3

# All see the same class attribute
```

## Attribute Lookup Order

```python
class Example:
    class_var = "Class variable"
    
    def __init__(self):
        self.instance_var = "Instance variable"

obj = Example()

# Instance attribute lookup:
# 1. Check instance dictionary first
print(obj.instance_var)  # Found in instance

# 2. Then check class
print(obj.class_var)  # Not in instance, found in class

# Access via class
print(Example.class_var)  # Class variable

# Can't access instance var via class
# print(Example.instance_var)  # AttributeError

# Check where attributes are stored
print(obj.__dict__)  # {'instance_var': 'Instance variable'}
print(Example.__dict__)  # Contains 'class_var'
```

## Shadowing Class Attributes

```python
class Product:
    # Class attribute - default category
    category = "General"
    
    def __init__(self, name):
        self.name = name

# Both use class attribute
p1 = Product("Item 1")
p2 = Product("Item 2")

print(p1.category)  # General (from class)
print(p2.category)  # General (from class)

# Modify class attribute
Product.category = "Electronics"
print(p1.category)  # Electronics (both see change)
print(p2.category)  # Electronics

# Create instance attribute (shadows class attribute)
p1.category = "Food"

print(p1.category)  # Food (instance attribute)
print(p2.category)  # Electronics (still class attribute)
print(Product.category)  # Electronics

# Check instance dict
print(p1.__dict__)  # {'name': 'Item 1', 'category': 'Food'}
print(p2.__dict__)  # {'name': 'Item 2'} - no category

# Delete instance attribute reveals class attribute
del p1.category
print(p1.category)  # Electronics (back to class attribute)
```

## Mutable Class Attributes Trap

```python
# ❌ DANGEROUS - Mutable class attribute
class BadClass:
    # Shared list!
    items = []
    
    def add_item(self, item):
        self.items.append(item)  # Modifies shared list!

obj1 = BadClass()
obj2 = BadClass()

obj1.add_item("A")
obj2.add_item("B")

print(obj1.items)  # ['A', 'B'] - shared!
print(obj2.items)  # ['A', 'B'] - same list!

# ✅ GOOD - Instance attribute
class GoodClass:
    def __init__(self):
        self.items = []  # Each instance gets own list
    
    def add_item(self, item):
        self.items.append(item)

obj1 = GoodClass()
obj2 = GoodClass()

obj1.add_item("A")
obj2.add_item("B")

print(obj1.items)  # ['A'] - separate
print(obj2.items)  # ['B'] - separate
```

## When to Use Class Attributes

```python
# ✅ GOOD - Constants shared by all instances
class Circle:
    PI = 3.14159  # Mathematical constant
    
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return Circle.PI * self.radius ** 2

# ✅ GOOD - Configuration shared by all instances
class Database:
    HOST = "localhost"
    PORT = 5432
    TIMEOUT = 30
    
    def __init__(self, db_name):
        self.db_name = db_name
    
    def connect(self):
        return f"Connecting to {Database.HOST}:{Database.PORT}/{self.db_name}"

# ✅ GOOD - Counting instances
class Employee:
    employee_count = 0
    
    def __init__(self, name):
        self.name = name
        Employee.employee_count += 1
    
    @classmethod
    def get_employee_count(cls):
        return cls.employee_count

e1 = Employee("Alice")
e2 = Employee("Bob")
print(Employee.get_employee_count())  # 2

# ✅ GOOD - Default values that can be overridden
class Car:
    # Default color (class attribute)
    default_color = "White"
    
    def __init__(self, model, color=None):
        self.model = model
        # Use instance color if provided, otherwise class default
        self.color = color if color else Car.default_color

car1 = Car("Toyota")
car2 = Car("Honda", "Blue")

print(car1.color)  # White (default)
print(car2.color)  # Blue (custom)
```

## Class Methods vs Instance Methods

```python
class BankAccount:
    # Class attribute - interest rate shared by all accounts
    interest_rate = 0.02
    total_accounts = 0
    
    def __init__(self, owner, balance):
        # Instance attributes
        self.owner = owner
        self.balance = balance
        BankAccount.total_accounts += 1
    
    # Instance method - operates on instance
    def deposit(self, amount):
        """Deposit money into this account."""
        self.balance += amount
    
    # Class method - operates on class
    @classmethod
    def set_interest_rate(cls, rate):
        """Set interest rate for all accounts."""
        cls.interest_rate = rate
    
    @classmethod
    def get_total_accounts(cls):
        """Get total number of accounts."""
        return cls.total_accounts
    
    # Static method - doesn't need class or instance
    @staticmethod
    def is_valid_amount(amount):
        """Check if amount is valid."""
        return amount > 0

# Instance methods need instance
acc1 = BankAccount("Alice", 1000)
acc1.deposit(500)
print(acc1.balance)  # 1500

# Class methods work on class
BankAccount.set_interest_rate(0.03)
print(acc1.interest_rate)  # 0.03
print(BankAccount.interest_rate)  # 0.03

# Static methods don't need instance or class
print(BankAccount.is_valid_amount(100))  # True
print(acc1.is_valid_amount(-50))  # False
```

## Accessing Class Attributes

```python
class Example:
    class_var = "Original"
    
    def __init__(self):
        self.instance_var = "Instance"
    
    def show_both(self):
        # Access class var via class name
        print(f"Class var via class: {Example.class_var}")
        
        # Access class var via self (lookup goes to class)
        print(f"Class var via self: {self.class_var}")
        
        # Access class var via type(self)
        print(f"Class var via type: {type(self).class_var}")
        
        # Access instance var
        print(f"Instance var: {self.instance_var}")
    
    @classmethod
    def modify_class_var(cls, value):
        cls.class_var = value

obj = Example()
obj.show_both()

# Modify class variable affects all instances
Example.class_var = "Modified"
obj.show_both()

# Or use class method
Example.modify_class_var("Changed")
obj.show_both()
```

## Inheritance and Class Attributes

```python
class Animal:
    # Class attribute
    species_count = 0
    kingdom = "Animalia"
    
    def __init__(self, name):
        self.name = name
        Animal.species_count += 1

class Dog(Animal):
    # Dog's own class attribute
    breed_count = 0
    
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed
        Dog.breed_count += 1

class Cat(Animal):
    # Cat's own class attribute
    breed_count = 0
    
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed
        Cat.breed_count += 1

# Create instances
dog1 = Dog("Rex", "Labrador")
dog2 = Dog("Max", "Beagle")
cat1 = Cat("Whiskers", "Siamese")

# Class attributes
print(f"Total animals: {Animal.species_count}")  # 3
print(f"Total dogs: {Dog.breed_count}")  # 2
print(f"Total cats: {Cat.breed_count}")  # 1

# Inherited class attribute
print(dog1.kingdom)  # Animalia (inherited)
print(cat1.kingdom)  # Animalia (inherited)

# Override inherited class attribute
Dog.kingdom = "Canis"
print(dog1.kingdom)  # Canis (Dog's version)
print(cat1.kingdom)  # Animalia (still Animal's version)
```

## Property vs Class Attribute

```python
class Temperature:
    # Class attribute - conversion factor
    KELVIN_OFFSET = 273.15
    
    def __init__(self, celsius):
        self._celsius = celsius  # Instance attribute
    
    @property
    def celsius(self):
        """Instance property."""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -Temperature.KELVIN_OFFSET:
            raise ValueError("Below absolute zero")
        self._celsius = value
    
    @property
    def kelvin(self):
        """Computed property using class attribute."""
        return self._celsius + Temperature.KELVIN_OFFSET
    
    @kelvin.setter
    def kelvin(self, value):
        if value < 0:
            raise ValueError("Kelvin cannot be negative")
        self._celsius = value - Temperature.KELVIN_OFFSET

temp1 = Temperature(25)
temp2 = Temperature(100)

# Instance properties
print(temp1.celsius)  # 25
print(temp2.celsius)  # 100

# Computed using class attribute
print(temp1.kelvin)  # 298.15
print(temp2.kelvin)  # 373.15

# Class attribute accessible from all instances
print(temp1.KELVIN_OFFSET)  # 273.15
print(temp2.KELVIN_OFFSET)  # 273.15
```

## Common Pitfalls

```python
# ❌ PITFALL 1: Mutable default in class attribute
class BadList:
    items = []  # Shared by all instances!
    
    def add(self, item):
        self.items.append(item)

obj1 = BadList()
obj2 = BadList()
obj1.add(1)
obj2.add(2)
print(obj1.items)  # [1, 2] - Oops!

# ✅ FIX: Use instance attribute
class GoodList:
    def __init__(self):
        self.items = []  # Each instance gets own list

# ❌ PITFALL 2: Confusing class and instance
class Counter:
    count = 0  # Class attribute
    
    def increment(self):
        self.count += 1  # Creates instance attribute!

c1 = Counter()
c2 = Counter()

c1.increment()  # self.count = 0 + 1 = 1 (creates instance attr)
print(c1.count)  # 1 (instance attribute)
print(c2.count)  # 0 (class attribute)
print(Counter.count)  # 0 (class attribute unchanged)

# ✅ FIX: Use class name to modify class attribute
class CounterFixed:
    count = 0
    
    def increment(self):
        CounterFixed.count += 1  # Modifies class attribute

# ❌ PITFALL 3: Assuming instance dict contains everything
class Example:
    class_var = "Class"
    
    def __init__(self):
        self.instance_var = "Instance"

obj = Example()
print("instance_var" in obj.__dict__)  # True
print("class_var" in obj.__dict__)  # False!
print(hasattr(obj, "class_var"))  # True (uses lookup)
```

## Best Practices

```python
# ✅ GOOD - Clear separation
class GoodExample:
    # Class attributes (UPPERCASE for constants)
    MAX_SIZE = 100
    DEFAULT_COLOR = "blue"
    counter = 0  # lowercase for variables
    
    def __init__(self, name):
        # Instance attributes
        self.name = name
        self.items = []  # Mutable - must be instance attr
        GoodExample.counter += 1
    
    @classmethod
    def get_counter(cls):
        """Access class attribute via classmethod."""
        return cls.counter

# ✅ GOOD - Document intended use
class Configuration:
    """Configuration class with shared defaults.
    
    Class Attributes:
        TIMEOUT: Default timeout for all operations
        RETRY_COUNT: Number of retries
    
    Instance Attributes:
        name: Configuration name
        settings: Instance-specific settings
    """
    TIMEOUT = 30
    RETRY_COUNT = 3
    
    def __init__(self, name):
        self.name = name
        self.settings = {}
```

## Summary

**Class Attributes:**
- Shared by all instances
- Defined in class body
- Access via `ClassName.attr` or `self.attr`
- Good for constants, defaults, counters

**Instance Attributes:**
- Unique to each instance
- Defined in `__init__` or instance methods
- Access via `self.attr`
- Good for object state

**Attribute Lookup Order:**
1. Instance `__dict__`
2. Class `__dict__`
3. Parent class `__dict__`
4. `object` class

**Key Differences:**
```python
class Example:
    class_var = []  # Shared - DON'T use for mutable defaults
    
    def __init__(self):
        self.instance_var = []  # Unique - GOOD for mutables
```

**Best Practices:**
- ✅ Use UPPERCASE for class constants
- ✅ Use instance attributes for mutable state
- ✅ Use `ClassName.attr` to modify class attributes
- ✅ Use `@classmethod` for class-level operations
- ❌ Don't use mutable class attributes as defaults
- ❌ Don't shadow class attributes unintentionally

Understanding class vs instance scope prevents subtle bugs and makes code more maintainable!
