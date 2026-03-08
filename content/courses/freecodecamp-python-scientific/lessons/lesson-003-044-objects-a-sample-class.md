---
id: lesson-003-044
title: Objects: A Sample Class
chapterId: chapter-03
order: 44
duration: 5
objectives:
  - Create a class using the class keyword and __init__
  - Define instance attributes and methods with self
  - Build a complete sample class from scratch
  - Create and use multiple instances of a class
---

# Objects: A Sample Class

Now that we understand what objects are, let's create our own. A **class** is a blueprint for creating objects. It defines what data the object holds and what actions it can perform.

## The class Keyword

Here is the simplest possible class:

```python
class PartyAnimal:
    x = 0

    def party(self):
        self.x = self.x + 1
        print(f"So far {self.x}")

an = PartyAnimal()
an.party()  # So far 1
an.party()  # So far 2
an.party()  # So far 3
```

Let's break this down:
- `class PartyAnimal:` defines a new class (blueprint)
- `x = 0` is a class attribute (shared default)
- `def party(self):` defines a method — a function that belongs to the class
- `self` refers to the specific instance calling the method
- `an = PartyAnimal()` creates an **instance** (an actual object from the blueprint)
- `an.party()` calls the method on that instance

## The `__init__` Method (Constructor)

The `__init__` method is called automatically when you create a new object. Use it to set up initial state:

```python
class Dog:
    def __init__(self, name, breed, age):
        self.name = name
        self.breed = breed
        self.age = age
    
    def bark(self):
        print(f"{self.name} says: Woof!")
    
    def describe(self):
        print(f"{self.name} is a {self.age}-year-old {self.breed}")
    
    def birthday(self):
        self.age += 1
        print(f"Happy birthday {self.name}! Now {self.age} years old.")

# Create instances
rex = Dog('Rex', 'German Shepherd', 5)
buddy = Dog('Buddy', 'Golden Retriever', 3)

rex.describe()    # Rex is a 5-year-old German Shepherd
buddy.bark()      # Buddy says: Woof!
rex.birthday()    # Happy birthday Rex! Now 6 years old.
```

### Understanding self

The `self` parameter is how each object keeps track of its own data. When you write `rex.bark()`, Python translates this to `Dog.bark(rex)` — the object `rex` is passed as `self`.

```python
class Counter:
    def __init__(self, start=0):
        self.count = start   # 'self.count' belongs to THIS specific instance
    
    def increment(self):
        self.count += 1
    
    def get_count(self):
        return self.count

a = Counter()       # a.count = 0
b = Counter(10)     # b.count = 10

a.increment()       # a.count = 1
a.increment()       # a.count = 2
print(a.get_count())  # 2
print(b.get_count())  # 10 (b is independent)
```

Each instance has its **own copy** of the data. Changing `a.count` does not affect `b.count`.

## Instance Attributes vs. Class Attributes

```python
class Student:
    school = "Python Academy"  # Class attribute (shared by all instances)
    
    def __init__(self, name, grade):
        self.name = name       # Instance attribute (unique to each)
        self.grade = grade     # Instance attribute

alice = Student('Alice', 'A')
bob = Student('Bob', 'B+')

print(alice.school)  # Python Academy (from class)
print(bob.school)    # Python Academy (same value)
print(alice.name)    # Alice (unique to alice)
print(bob.name)      # Bob (unique to bob)
```

## Building a More Complete Class

Let's build a `BankAccount` class that demonstrates real-world usage:

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.transactions = []
    
    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            self.transactions.append(f"Deposit: +${amount:.2f}")
            print(f"Deposited ${amount:.2f}. Balance: ${self.balance:.2f}")
        else:
            print("Deposit amount must be positive")
    
    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds")
        elif amount <= 0:
            print("Withdrawal amount must be positive")
        else:
            self.balance -= amount
            self.transactions.append(f"Withdrawal: -${amount:.2f}")
            print(f"Withdrew ${amount:.2f}. Balance: ${self.balance:.2f}")
    
    def get_statement(self):
        print(f"\n--- Statement for {self.owner} ---")
        for t in self.transactions:
            print(f"  {t}")
        print(f"  Current Balance: ${self.balance:.2f}")
        print("---")

# Usage
account = BankAccount('Alice', 1000)
account.deposit(500)      # Deposited $500.00. Balance: $1500.00
account.withdraw(200)     # Withdrew $200.00. Balance: $1300.00
account.withdraw(5000)    # Insufficient funds
account.get_statement()
```

## Multiple Objects from One Class

The power of classes is creating many objects from one blueprint:

```python
class Player:
    def __init__(self, name):
        self.name = name
        self.score = 0
    
    def add_points(self, points):
        self.score += points

# Create a list of players
names = ['Alice', 'Bob', 'Charlie']
players = [Player(name) for name in names]

# Each player is independent
players[0].add_points(10)
players[1].add_points(25)
players[2].add_points(15)

for p in players:
    print(f"{p.name}: {p.score} points")
# Alice: 10 points
# Bob: 25 points
# Charlie: 15 points
```

Classes let you create organized, reusable, and self-contained units of code. Each object manages its own data and exposes a clean interface through its methods.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
