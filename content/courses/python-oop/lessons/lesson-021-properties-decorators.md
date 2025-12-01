---
id: properties-decorators
title: Properties and Decorators
chapterId: ch2-classes-objects
order: 21
duration: 17
objectives:
  - Master Python property decorator
  - Learn getter, setter, and deleter methods
  - Understand computed properties and validation
---

# Properties and Decorators

**Properties** provide controlled access to attributes, allowing you to add validation, computation, or side effects while maintaining a simple attribute-like interface.

## The Problem with Direct Access

```python
# ❌ Problem: No validation
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius  # Direct access

temp = Temperature(25)
temp.celsius = -500  # Oops! Below absolute zero (-273.15°C)
```

## Solution 1: Getter and Setter Methods

```python
# ❌ Works but not Pythonic
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    def get_celsius(self):
        return self._celsius
    
    def set_celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = value

temp = Temperature(25)
temp.set_celsius(30)  # Awkward!
print(temp.get_celsius())
```

## Solution 2: Properties (Pythonic!)

```python
# ✅ Pythonic with properties
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
            raise ValueError("Temperature below absolute zero")
        self._celsius = value

# Use like a regular attribute
temp = Temperature(25)
print(temp.celsius)  # 25 (calls getter)
temp.celsius = 30    # Calls setter with validation
# temp.celsius = -300  # ValueError!
```

## Read-Only Properties

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
        """Computed property (read-only)."""
        return self._radius * 2
    
    @property
    def area(self):
        """Computed property (read-only)."""
        return 3.14159 * self._radius ** 2
    
    @property
    def circumference(self):
        """Computed property (read-only)."""
        return 2 * 3.14159 * self._radius

circle = Circle(5)
print(circle.diameter)       # 10
print(circle.area)           # 78.53975
print(circle.circumference)  # 31.4159

# Cannot set computed properties
# circle.area = 100  # AttributeError!
```

## Properties with Setter

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
        """Computed property."""
        return self._width * self._height

rect = Rectangle(10, 5)
print(rect.area)  # 50

rect.width = 20
print(rect.area)  # 100 (automatically updated)

# rect.width = -5  # ValueError!
```

## Property Deleter

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

del resource.data  # "Releasing resource: Config"
# print(resource.data)  # ValueError!
```

## Lazy Properties (Computed Once)

```python
class DataProcessor:
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

processor = DataProcessor("data.txt")
# Data not loaded yet

print(processor.data)  # "Loading data from data.txt..."
print(processor.data)  # No loading message (cached)
```

## Dependent Properties

```python
class Product:
    def __init__(self, price, tax_rate=0.08):
        self._price = price
        self._tax_rate = tax_rate
    
    @property
    def price(self):
        return self._price
    
    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Price cannot be negative")
        self._price = value
    
    @property
    def tax_rate(self):
        return self._tax_rate
    
    @tax_rate.setter
    def tax_rate(self, value):
        if not 0 <= value <= 1:
            raise ValueError("Tax rate must be between 0 and 1")
        self._tax_rate = value
    
    @property
    def tax_amount(self):
        """Computed from price and tax_rate."""
        return self._price * self._tax_rate
    
    @property
    def total_price(self):
        """Computed from price and tax."""
        return self._price + self.tax_amount

product = Product(100.00)
print(f"Price: ${product.price}")
print(f"Tax: ${product.tax_amount}")
print(f"Total: ${product.total_price}")

# Change price, tax updates automatically
product.price = 200.00
print(f"New total: ${product.total_price}")
```

## Properties for Data Conversion

```python
class TemperatureConverter:
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """Convert Celsius to Fahrenheit."""
        return (self._celsius * 9/5) + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        """Set temperature using Fahrenheit."""
        celsius = (value - 32) * 5/9
        if celsius < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = celsius
    
    @property
    def kelvin(self):
        """Convert Celsius to Kelvin."""
        return self._celsius + 273.15
    
    @kelvin.setter
    def kelvin(self, value):
        """Set temperature using Kelvin."""
        if value < 0:
            raise ValueError("Below absolute zero")
        self._celsius = value - 273.15

temp = TemperatureConverter()
temp.celsius = 25
print(f"{temp.celsius}°C = {temp.fahrenheit}°F = {temp.kelvin}K")

# Set using Fahrenheit
temp.fahrenheit = 98.6
print(f"{temp.celsius}°C")  # 37.0°C

# Set using Kelvin
temp.kelvin = 300
print(f"{temp.celsius}°C")  # 26.85°C
```

## Validation with Properties

```python
class User:
    def __init__(self, username, email, age):
        self.username = username  # Uses setter
        self.email = email        # Uses setter
        self.age = age            # Uses setter
    
    @property
    def username(self):
        return self._username
    
    @username.setter
    def username(self, value):
        if not value or len(value) < 3:
            raise ValueError("Username must be at least 3 characters")
        if not value.isalnum():
            raise ValueError("Username must be alphanumeric")
        self._username = value
    
    @property
    def email(self):
        return self._email
    
    @email.setter
    def email(self, value):
        if "@" not in value or "." not in value:
            raise ValueError("Invalid email address")
        self._email = value.lower()
    
    @property
    def age(self):
        return self._age
    
    @age.setter
    def age(self, value):
        if not 0 <= value <= 150:
            raise ValueError("Invalid age")
        self._age = value

# Validation happens automatically
user = User("alice123", "Alice@Example.com", 30)
print(user.username)  # "alice123"
print(user.email)     # "alice@example.com" (lowercased)

# Invalid values rejected
# user = User("ab", "invalid", 200)  # ValueError!
```

## Property vs Method

### Use Property When:

```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance
    
    @property
    def balance(self):
        """✅ Property - looks like data, computed quickly."""
        return self._balance
    
    @property
    def is_overdrawn(self):
        """✅ Property - simple boolean check."""
        return self._balance < 0
```

### Use Method When:

```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance
        self._transactions = []
    
    def calculate_interest(self, rate, years):
        """✅ Method - has parameters."""
        return self._balance * (1 + rate) ** years
    
    def get_transaction_history(self):
        """✅ Method - expensive operation."""
        # Might query database, process lots of data
        return self._transactions
    
    def withdraw(self, amount):
        """✅ Method - modifies state."""
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount
```

## Private vs Public Attributes

```python
class Person:
    def __init__(self, name, ssn):
        self._name = name      # Protected (convention)
        self.__ssn = ssn       # Private (name mangled)
    
    @property
    def name(self):
        """Public access to protected attribute."""
        return self._name
    
    @name.setter
    def name(self, value):
        if not value:
            raise ValueError("Name cannot be empty")
        self._name = value
    
    @property
    def ssn_last_four(self):
        """Public access to last 4 digits only."""
        return self.__ssn[-4:]

person = Person("Alice", "123-45-6789")
print(person.name)          # "Alice"
print(person.ssn_last_four) # "6789"
# print(person.__ssn)       # AttributeError!
```

## Caching with Properties

```python
class ExpensiveCalculation:
    def __init__(self, data):
        self.data = data
        self._result_cache = None
        self._data_hash = None
    
    @property
    def result(self):
        """Cache result until data changes."""
        current_hash = hash(tuple(self.data))
        
        if self._data_hash != current_hash:
            print("Calculating result...")
            self._result_cache = sum(x ** 2 for x in self.data)
            self._data_hash = current_hash
        else:
            print("Using cached result...")
        
        return self._result_cache

calc = ExpensiveCalculation([1, 2, 3, 4, 5])
print(calc.result)  # "Calculating result..." then 55
print(calc.result)  # "Using cached result..." then 55

calc.data.append(6)
print(calc.result)  # "Calculating result..." then 91
```

## Best Practices

### 1. Use Properties for Computed Values

```python
# ✅ Good
class Rectangle:
    @property
    def area(self):
        return self.width * self.height
```

### 2. Properties Should Be Fast

```python
# ✅ Good - fast property
@property
def is_adult(self):
    return self.age >= 18

# ❌ Bad - expensive operation
@property
def statistics(self):
    # Processes millions of records...
    pass
```

### 3. Properties Should Not Have Side Effects

```python
# ✅ Good - no side effects
@property
def full_name(self):
    return f"{self.first_name} {self.last_name}"

# ❌ Bad - side effects
@property
def data(self):
    self.access_count += 1  # Side effect!
    return self._data
```

### 4. Document Properties

```python
@property
def price_with_tax(self):
    """Calculate total price including tax.
    
    Returns:
        float: Price with tax applied
    """
    return self.price * (1 + self.tax_rate)
```

## Summary

**Properties** provide controlled attribute access while maintaining a simple interface—use them for validation, computed values, and data conversion. Implement **getters** with `@property`, **setters** with `@property_name.setter`, and **deleters** with `@property_name.deleter`. Properties work best for **fast computations** without side effects that feel like attribute access. Use **lazy properties** to defer expensive calculations until needed, and **cache results** when appropriate. Properties enable you to start with simple attributes and add validation later without changing the interface. Always validate in setters and keep property operations fast and side-effect-free.
