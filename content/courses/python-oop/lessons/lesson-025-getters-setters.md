---
id: getters-setters
title: Getters and Setters
chapterId: ch3-encapsulation
order: 25
duration: 15
objectives:
  - Understand getter and setter patterns
  - Learn property decorators
  - Master controlled attribute access
---

# Getters and Setters

**Getters** retrieve attribute values, **setters** modify them. In Python, we use **properties** to implement them Pythonically while maintaining simple attribute-like access.

## The Problem

```python
# ❌ Direct access - no validation
class Person:
    def __init__(self, age):
        self.age = age

person = Person(25)
person.age = -5  # Oops! Invalid age accepted
```

## Solution 1: Explicit Methods (Not Pythonic)

```python
# ❌ Works but not Pythonic
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
print(person.get_age())  # Clunky
person.set_age(30)       # Not natural
```

## Solution 2: Properties (Pythonic!)

```python
# ✅ Pythonic with properties
class Person:
    def __init__(self, age):
        self._age = age
    
    @property
    def age(self):
        """Getter method."""
        return self._age
    
    @age.setter
    def age(self, value):
        """Setter method with validation."""
        if value < 0:
            raise ValueError("Age cannot be negative")
        self._age = value

person = Person(25)
print(person.age)  # 25 - looks like attribute access!
person.age = 30    # Validation happens automatically
# person.age = -5  # ValueError!
```

## Read-Only Properties

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        """Can read radius."""
        return self._radius
    
    @property
    def diameter(self):
        """Computed property (read-only)."""
        return self._radius * 2
    
    @property
    def area(self):
        """Computed property (read-only)."""
        return 3.14159 * self._radius ** 2

circle = Circle(5)
print(circle.radius)    # 5
print(circle.diameter)  # 10
print(circle.area)      # 78.53975

# circle.diameter = 20  # AttributeError! Read-only
```

## Read-Write Properties

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
        """Set temperature with validation."""
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """Get temperature in Fahrenheit."""
        return (self._celsius * 9/5) + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        """Set using Fahrenheit."""
        celsius = (value - 32) * 5/9
        if celsius < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = celsius

temp = Temperature(25)
print(temp.celsius)      # 25
print(temp.fahrenheit)   # 77.0

temp.fahrenheit = 32     # Set using Fahrenheit
print(temp.celsius)      # 0.0
```

## Validation in Setters

```python
class Product:
    def __init__(self, name, price, quantity):
        self.name = name          # Uses setter
        self.price = price        # Uses setter
        self.quantity = quantity  # Uses setter
    
    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self, value):
        if not value or len(value) < 2:
            raise ValueError("Name must be at least 2 characters")
        self._name = value.strip()
    
    @property
    def price(self):
        return self._price
    
    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Price cannot be negative")
        self._price = float(value)
    
    @property
    def quantity(self):
        return self._quantity
    
    @quantity.setter
    def quantity(self, value):
        if value < 0:
            raise ValueError("Quantity cannot be negative")
        self._quantity = int(value)

product = Product("Laptop", 999.99, 10)
print(product.name)   # "Laptop"
print(product.price)  # 999.99

# Validation prevents invalid values
# product.price = -100  # ValueError!
```

## Computed Properties

```python
class Rectangle:
    def __init__(self, width, height):
        self._width = width
        self._height = height
    
    @property
    def width(self):
        return self._width
    
    @width.setter
    def width(self, value):
        if value <= 0:
            raise ValueError("Width must be positive")
        self._width = value
    
    @property
    def height(self):
        return self._height
    
    @height.setter
    def height(self, value):
        if value <= 0:
            raise ValueError("Height must be positive")
        self._height = value
    
    @property
    def area(self):
        """Computed on-the-fly."""
        return self._width * self._height
    
    @property
    def perimeter(self):
        """Computed on-the-fly."""
        return 2 * (self._width + self._height)

rect = Rectangle(10, 5)
print(rect.area)       # 50
print(rect.perimeter)  # 30

rect.width = 20
print(rect.area)       # 100 (automatically updated!)
```

## Property with Deleter

```python
class Resource:
    def __init__(self, name):
        self._name = name
        self._data = f"Data for {name}"
    
    @property
    def data(self):
        """Get resource data."""
        if self._data is None:
            raise ValueError("Resource has been released")
        return self._data
    
    @data.setter
    def data(self, value):
        """Set resource data."""
        self._data = value
    
    @data.deleter
    def data(self):
        """Release resource."""
        print(f"Releasing resource: {self._name}")
        self._data = None

resource = Resource("Config")
print(resource.data)  # "Data for Config"

del resource.data  # Calls deleter
# print(resource.data)  # ValueError!
```

## Lazy Loading with Properties

```python
class DataLoader:
    def __init__(self, filename):
        self.filename = filename
        self._data = None  # Not loaded yet
    
    @property
    def data(self):
        """Load data only when first accessed."""
        if self._data is None:
            print(f"Loading data from {self.filename}...")
            # Simulate expensive operation
            self._data = f"Data from {self.filename}"
        return self._data

loader = DataLoader("data.txt")
# Data not loaded yet

print(loader.data)  # "Loading data from data.txt..."
print(loader.data)  # No loading message (cached)
```

## Dependent Properties

```python
class Invoice:
    def __init__(self, subtotal, tax_rate=0.08):
        self._subtotal = subtotal
        self._tax_rate = tax_rate
        self._discount = 0
    
    @property
    def subtotal(self):
        return self._subtotal
    
    @subtotal.setter
    def subtotal(self, value):
        if value < 0:
            raise ValueError("Subtotal cannot be negative")
        self._subtotal = value
    
    @property
    def discount(self):
        return self._discount
    
    @discount.setter
    def discount(self, value):
        if not 0 <= value <= self._subtotal:
            raise ValueError("Invalid discount")
        self._discount = value
    
    @property
    def tax(self):
        """Computed from subtotal and discount."""
        taxable = self._subtotal - self._discount
        return taxable * self._tax_rate
    
    @property
    def total(self):
        """Computed from all components."""
        return self._subtotal - self._discount + self.tax

invoice = Invoice(100.00)
invoice.discount = 10.00

print(f"Subtotal: ${invoice.subtotal}")
print(f"Discount: ${invoice.discount}")
print(f"Tax: ${invoice.tax}")
print(f"Total: ${invoice.total}")
```

## Property Best Practices

### 1. Properties Should Be Fast

```python
# ✅ Good - fast property
@property
def full_name(self):
    return f"{self.first_name} {self.last_name}"

# ❌ Bad - expensive operation
@property
def statistics(self):
    # Processes millions of records
    return self._calculate_all_statistics()
```

### 2. Properties Should Not Have Side Effects

```python
# ✅ Good - no side effects
@property
def age(self):
    return self._age

# ❌ Bad - side effects
@property
def age(self):
    self.access_count += 1  # Side effect!
    return self._age
```

### 3. Use Properties for Attribute-Like Access

```python
# ✅ Good - feels like an attribute
@property
def balance(self):
    return self._balance

# ❌ Bad - should be a method (has parameters)
@property
def calculate_interest(self, rate):  # Can't have parameters!
    return self._balance * rate
```

### 4. Validate in Setters

```python
# ✅ Good - validation in setter
@property
def age(self):
    return self._age

@age.setter
def age(self, value):
    if not 0 <= value <= 150:
        raise ValueError("Invalid age")
    self._age = value
```

## Real-World Example: User Account

```python
class UserAccount:
    def __init__(self, username, email, balance=0):
        self.username = username  # Uses setter
        self.email = email        # Uses setter
        self._balance = balance
        self._is_active = True
    
    @property
    def username(self):
        return self._username
    
    @username.setter
    def username(self, value):
        if not value or len(value) < 3:
            raise ValueError("Username must be at least 3 characters")
        if not value.isalnum():
            raise ValueError("Username must be alphanumeric")
        self._username = value.lower()
    
    @property
    def email(self):
        return self._email
    
    @email.setter
    def email(self, value):
        if "@" not in value or "." not in value:
            raise ValueError("Invalid email")
        self._email = value.lower()
    
    @property
    def balance(self):
        """Read-only balance."""
        return self._balance
    
    @property
    def is_active(self):
        return self._is_active
    
    @property
    def status(self):
        """Computed status."""
        if not self._is_active:
            return "Inactive"
        elif self._balance < 0:
            return "Overdrawn"
        elif self._balance == 0:
            return "Zero Balance"
        else:
            return "Active"
    
    def deposit(self, amount):
        """Modify balance through method."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
    
    def withdraw(self, amount):
        """Modify balance through method."""
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount

# Use the account
account = UserAccount("Alice123", "Alice@Example.com", 1000)
print(account.username)  # "alice123" (lowercased)
print(account.email)     # "alice@example.com"
print(account.balance)   # 1000
print(account.status)    # "Active"

account.deposit(500)
print(account.balance)   # 1500
```

## When to Use Properties

### Use Properties For:

✅ Attribute-like access with validation  
✅ Computed values  
✅ Backward compatibility (add validation later)  
✅ Read-only access  
✅ Data conversion  

### Use Methods For:

✅ Operations with parameters  
✅ Expensive operations  
✅ Operations with side effects  
✅ Actions that modify state significantly  

```python
class BankAccount:
    @property
    def balance(self):
        """✅ Property - attribute-like."""
        return self._balance
    
    def calculate_interest(self, rate, years):
        """✅ Method - has parameters."""
        return self._balance * (1 + rate) ** years
    
    def transfer(self, amount, to_account):
        """✅ Method - significant action."""
        self.withdraw(amount)
        to_account.deposit(amount)
```

## Summary

Use **properties** to provide controlled access to attributes while maintaining simple syntax. Implement **getters** with `@property` for read access and **setters** with `@property_name.setter` for write access with validation. Properties enable **backward compatibility**—start with simple attributes, add validation later without changing the interface. Keep properties **fast and side-effect-free**, using them for **computed values** and **attribute-like access**. Use **read-only properties** for derived data and **deleters** for resource cleanup. Properties are Python's Pythonic answer to getters and setters, providing encapsulation without sacrificing clean syntax.
