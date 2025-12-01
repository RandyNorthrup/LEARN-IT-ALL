---
id: constructors
title: Constructors and Initialization
chapterId: ch2-classes-objects
order: 14
duration: 14
objectives:
  - Master the __init__ constructor method
  - Learn advanced initialization patterns
  - Understand object lifecycle
---

# Constructors and Initialization

The **constructor** (`__init__`) is the first method called when creating an object. It sets up the initial state of your object.

## Basic Constructor

```python
class Person:
    def __init__(self, name, age):
        """Constructor - initializes object."""
        self.name = name
        self.age = age

# When you create an object, __init__ is called
person = Person("Alice", 30)
# Equivalent to:
# person = Person.__new__(Person)
# person.__init__("Alice", 30)
```

## Constructor with Default Parameters

```python
class Server:
    def __init__(self, host="localhost", port=8080, ssl=False):
        self.host = host
        self.port = port
        self.ssl = ssl

# Use all defaults
server1 = Server()
print(f"{server1.host}:{server1.port}")  # "localhost:8080"

# Override some defaults
server2 = Server(port=3000)
print(f"{server2.host}:{server2.port}")  # "localhost:3000"

# Override all
server3 = Server("example.com", 443, True)
print(f"{server3.host}:{server3.port}")  # "example.com:443"
```

## Constructor with Validation

```python
class BankAccount:
    def __init__(self, account_number, initial_balance):
        # Validate account number
        if not account_number or len(account_number) != 10:
            raise ValueError("Account number must be 10 digits")
        
        # Validate balance
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative")
        
        self.account_number = account_number
        self.balance = initial_balance

# Valid account
account = BankAccount("1234567890", 1000)

# Invalid - raises ValueError
# account = BankAccount("123", 1000)
# account = BankAccount("1234567890", -100)
```

## Constructor with Type Hints

```python
from typing import List, Optional
from datetime import datetime

class BlogPost:
    def __init__(
        self,
        title: str,
        content: str,
        author: str,
        tags: Optional[List[str]] = None,
        created_at: Optional[datetime] = None
    ):
        self.title = title
        self.content = content
        self.author = author
        self.tags = tags or []
        self.created_at = created_at or datetime.now()

post = BlogPost("My Post", "Content here", "Alice")
```

## Multiple Constructor Patterns

### Using Class Methods as Alternative Constructors

```python
from datetime import datetime

class Person:
    def __init__(self, name, birth_year):
        self.name = name
        self.birth_year = birth_year
    
    @classmethod
    def from_birth_year(cls, name, birth_year):
        """Create person from birth year."""
        return cls(name, birth_year)
    
    @classmethod
    def from_age(cls, name, age):
        """Create person from current age."""
        current_year = datetime.now().year
        birth_year = current_year - age
        return cls(name, birth_year)
    
    @classmethod
    def from_string(cls, person_str):
        """Create person from formatted string."""
        name, birth_year = person_str.split(",")
        return cls(name, int(birth_year))

# Different ways to create Person
person1 = Person("Alice", 1990)
person2 = Person.from_age("Bob", 33)
person3 = Person.from_string("Charlie,1985")
```

### Factory Pattern

```python
class Animal:
    def __init__(self, species, sound):
        self.species = species
        self.sound = sound
    
    def make_sound(self):
        return self.sound
    
    @classmethod
    def create_dog(cls):
        """Factory method for dog."""
        return cls("Dog", "Woof")
    
    @classmethod
    def create_cat(cls):
        """Factory method for cat."""
        return cls("Cat", "Meow")
    
    @classmethod
    def create_cow(cls):
        """Factory method for cow."""
        return cls("Cow", "Moo")

# Use factory methods
dog = Animal.create_dog()
cat = Animal.create_cat()
cow = Animal.create_cow()

print(dog.make_sound())  # "Woof"
print(cat.make_sound())  # "Meow"
```

## Initialization with Mutable Defaults

### The Gotcha

```python
# ❌ WRONG - Mutable default shared between instances!
class Team:
    def __init__(self, name, members=[]):  # DON'T DO THIS
        self.name = name
        self.members = members

team1 = Team("A")
team2 = Team("B")

team1.members.append("Alice")
print(team2.members)  # ['Alice'] - Unexpected!
```

### The Fix

```python
# ✅ CORRECT - Create new list for each instance
class Team:
    def __init__(self, name, members=None):
        self.name = name
        self.members = members if members is not None else []

team1 = Team("A")
team2 = Team("B")

team1.members.append("Alice")
print(team1.members)  # ['Alice']
print(team2.members)  # []
```

## Initialization from Data Sources

### From Dictionary

```python
class User:
    def __init__(self, username, email, age):
        self.username = username
        self.email = email
        self.age = age
    
    @classmethod
    def from_dict(cls, data):
        """Create user from dictionary."""
        return cls(
            username=data["username"],
            email=data["email"],
            age=data["age"]
        )

# Create from dict
user_data = {
    "username": "alice",
    "email": "alice@example.com",
    "age": 30
}
user = User.from_dict(user_data)
```

### From JSON

```python
import json

class Product:
    def __init__(self, name, price, in_stock):
        self.name = name
        self.price = price
        self.in_stock = in_stock
    
    @classmethod
    def from_json(cls, json_str):
        """Create product from JSON string."""
        data = json.loads(json_str)
        return cls(
            name=data["name"],
            price=data["price"],
            in_stock=data["in_stock"]
        )

# Create from JSON
json_data = '{"name": "Laptop", "price": 999.99, "in_stock": true}'
product = Product.from_json(json_data)
print(product.name)  # "Laptop"
```

### From File

```python
class Config:
    def __init__(self, settings):
        self.settings = settings
    
    @classmethod
    def from_file(cls, filename):
        """Load configuration from file."""
        with open(filename, 'r') as f:
            settings = json.load(f)
        return cls(settings)

# config = Config.from_file("config.json")
```

## Post-Initialization Processing

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        # Post-initialization calculations
        self._area = self._calculate_area()
        self._perimeter = self._calculate_perimeter()
    
    def _calculate_area(self):
        """Calculate area during initialization."""
        return self.width * self.height
    
    def _calculate_perimeter(self):
        """Calculate perimeter during initialization."""
        return 2 * (self.width + self.height)
    
    @property
    def area(self):
        return self._area
    
    @property
    def perimeter(self):
        return self._perimeter

rect = Rectangle(10, 5)
print(rect.area)       # 50 (calculated at init)
print(rect.perimeter)  # 30 (calculated at init)
```

## Initialization with Dependencies

```python
class Database:
    def __init__(self, connection_string):
        self.connection_string = connection_string
    
    def connect(self):
        print(f"Connecting to {self.connection_string}")

class UserRepository:
    def __init__(self, database: Database):
        """Initialize with database dependency."""
        self.database = database
    
    def get_user(self, user_id):
        self.database.connect()
        return f"User {user_id}"

# Create dependencies
db = Database("postgresql://localhost/mydb")
user_repo = UserRepository(db)
user_repo.get_user(123)
```

## Initialization Patterns

### Builder Pattern

```python
class EmailBuilder:
    def __init__(self):
        self._to = None
        self._subject = None
        self._body = None
    
    def to(self, address):
        self._to = address
        return self
    
    def subject(self, subject):
        self._subject = subject
        return self
    
    def body(self, body):
        self._body = body
        return self
    
    def build(self):
        """Create Email from builder."""
        if not self._to or not self._subject:
            raise ValueError("To and subject required")
        return Email(self._to, self._subject, self._body)

class Email:
    def __init__(self, to, subject, body):
        self.to = to
        self.subject = subject
        self.body = body

# Use builder
email = (EmailBuilder()
    .to("alice@example.com")
    .subject("Hello")
    .body("Message here")
    .build())
```

### Copy Constructor

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    @classmethod
    def from_point(cls, other):
        """Copy constructor."""
        return cls(other.x, other.y)
    
    def __str__(self):
        return f"({self.x}, {self.y})"

point1 = Point(10, 20)
point2 = Point.from_point(point1)  # Copy

print(point1)  # "(10, 20)"
print(point2)  # "(10, 20)"

point2.x = 30
print(point1)  # "(10, 20)" - unchanged
print(point2)  # "(30, 20)" - modified
```

## Initialization Best Practices

### 1. Initialize All Attributes

```python
# ✅ Good
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
        self.discount = 0      # Explicit default
        self.quantity = 0      # Explicit default

# ❌ Bad
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
        # discount and quantity might not exist
```

### 2. Validate Early

```python
# ✅ Good - fail fast
class User:
    def __init__(self, email):
        if "@" not in email:
            raise ValueError("Invalid email")
        self.email = email

# ❌ Bad - fail later
class User:
    def __init__(self, email):
        self.email = email
    
    def send_email(self):
        if "@" not in self.email:  # Too late!
            raise ValueError("Invalid email")
```

### 3. Use Type Hints

```python
# ✅ Good
class Order:
    def __init__(
        self,
        order_id: str,
        total: float,
        items: List[str]
    ):
        self.order_id = order_id
        self.total = total
        self.items = items
```

## Summary

The **`__init__` constructor** initializes objects with their starting state and should validate inputs early. Use **default parameters** for optional values, but never use mutable defaults directly—use `None` and create new instances. Implement **alternative constructors** using class methods for different initialization patterns like `from_dict` or `from_json`. Always **initialize all attributes** in `__init__` to avoid `AttributeError`, and use **type hints** to document expected parameter types. Validate data in the constructor to **fail fast**, catching errors before objects are in an invalid state.
