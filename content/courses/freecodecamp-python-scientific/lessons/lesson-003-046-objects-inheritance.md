---
id: lesson-003-046
title: Objects: Inheritance
chapterId: chapter-03
order: 46
duration: 5
objectives:
  - Create child classes that inherit from parent classes
  - Override methods and use super() to extend behavior
  - Use isinstance() to check object types
  - Build a class hierarchy demonstrating the is-a relationship
---

# Objects: Inheritance

**Inheritance** is one of the pillars of object-oriented programming. It lets you create new classes based on existing ones, reusing code and creating logical hierarchies. A child class **inherits** all the attributes and methods of its parent, and can add new ones or override existing ones.

## The "Is-A" Relationship

Inheritance models the **is-a** relationship. A Dog **is an** Animal. A Car **is a** Vehicle. A CheckingAccount **is a** BankAccount.

```python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        print(f"{self.name} makes a sound")
    
    def describe(self):
        print(f"I am {self.name}, an Animal")

class Dog(Animal):       # Dog inherits from Animal
    def speak(self):
        print(f"{self.name} says: Woof!")

class Cat(Animal):       # Cat inherits from Animal
    def speak(self):
        print(f"{self.name} says: Meow!")
```

The parentheses after the class name indicate the **parent class** (also called the base class or superclass). The new class is the **child class** (subclass).

```python
rex = Dog('Rex')
whiskers = Cat('Whiskers')

rex.speak()       # Rex says: Woof!
whiskers.speak()  # Whiskers says: Meow!

# describe() is inherited from Animal
rex.describe()    # I am Rex, an Animal
```

`Dog` and `Cat` both **override** the `speak()` method while **inheriting** the `describe()` method without any changes.

## Using `super()`

The `super()` function lets you call a method from the parent class. This is especially useful in `__init__` to extend the parent's initialization:

```python
class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
    
    def describe(self):
        return f"{self.name} is a {self.species}"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, 'Dog')  # Call parent's __init__
        self.breed = breed              # Add new attribute
    
    def describe(self):
        base = super().describe()       # Get parent's description
        return f"{base} ({self.breed})"  # Extend it

rex = Dog('Rex', 'German Shepherd')
print(rex.describe())  # Rex is a Dog (German Shepherd)
print(rex.name)        # Rex (inherited attribute)
print(rex.breed)       # German Shepherd (new attribute)
```

Without `super().__init__()`, the parent's `__init__` would not run, and attributes like `name` and `species` would not be set.

## Method Overriding

A child class can **override** any method from the parent by defining a method with the same name:

```python
class Shape:
    def area(self):
        return 0
    
    def describe(self):
        return f"Shape with area {self.area()}"

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):  # Override
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):  # Override
        import math
        return math.pi * self.radius ** 2

shapes = [Rectangle(5, 3), Circle(4)]
for shape in shapes:
    print(shape.describe())
# Shape with area 15
# Shape with area 50.26548245743669
```

Notice that `describe()` is defined in `Shape` but calls `self.area()`. When called on a `Rectangle`, Python uses the `Rectangle` version of `area()`. This is called **polymorphism**.

## Checking Types with `isinstance()`

```python
rex = Dog('Rex', 'Shepherd')

print(isinstance(rex, Dog))     # True (rex IS a Dog)
print(isinstance(rex, Animal))  # True (rex IS also an Animal)
print(isinstance(rex, Cat))     # False (rex is NOT a Cat)
```

`isinstance()` checks the entire inheritance chain, making it more flexible than `type()` for type checking.

## Building a Class Hierarchy

```python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
    
    def get_pay(self):
        return self.salary
    
    def __str__(self):
        return f"{self.name}: ${self.get_pay():,.2f}"

class Manager(Employee):
    def __init__(self, name, salary, bonus):
        super().__init__(name, salary)
        self.bonus = bonus
    
    def get_pay(self):
        return self.salary + self.bonus

class Intern(Employee):
    def __init__(self, name):
        super().__init__(name, 0)  # Interns earn nothing
    
    def get_pay(self):
        return 0

# Polymorphism: treat all employees the same way
team = [
    Employee('Alice', 75000),
    Manager('Bob', 90000, 15000),
    Intern('Charlie')
]

total_payroll = 0
for person in team:
    print(person)                   # Uses __str__
    total_payroll += person.get_pay()

print(f"\nTotal payroll: ${total_payroll:,.2f}")
# Alice: $75,000.00
# Bob: $105,000.00
# Charlie: $0.00
# Total payroll: $180,000.00
```

## Multiple Inheritance

Python supports inheriting from multiple classes:

```python
class Flyer:
    def fly(self):
        print(f"{self.name} is flying")

class Swimmer:
    def swim(self):
        print(f"{self.name} is swimming")

class Duck(Animal, Flyer, Swimmer):
    def speak(self):
        print(f"{self.name} says: Quack!")

donald = Duck('Donald', 'Bird')
donald.speak()  # Donald says: Quack!
donald.fly()    # Donald is flying
donald.swim()   # Donald is swimming
```

Multiple inheritance is powerful but can create complexity. Use it sparingly and prefer composition (having objects as attributes) when the relationship is "has-a" rather than "is-a."

Inheritance is fundamental to building well-organized, maintainable Python programs. It allows you to write code once in a base class and reuse it across many specialized subclasses.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
