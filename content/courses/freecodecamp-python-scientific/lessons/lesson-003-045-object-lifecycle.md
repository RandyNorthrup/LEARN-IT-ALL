---
id: lesson-003-045
title: Object Lifecycle
chapterId: chapter-03
order: 45
duration: 5
objectives:
  - Understand the object lifecycle: construction, usage, and destruction
  - Implement __init__ and __del__ special methods
  - Explain garbage collection and reference counting
  - Use the id() function to track object identity
---

# Object Lifecycle

Every object in Python goes through a lifecycle: it is **created** (constructed), **used** (methods called, attributes accessed), and eventually **destroyed** (garbage collected). Understanding this lifecycle helps you write efficient code and manage resources properly.

## Construction: `__init__`

The **constructor** is the `__init__` method. Python calls it automatically whenever you create a new instance:

```python
class PartyAnimal:
    def __init__(self, name):
        self.name = name
        self.count = 0
        print(f"{self.name} has been constructed")
    
    def party(self):
        self.count += 1
        print(f"{self.name} party count: {self.count}")

s = PartyAnimal('Sally')   # Sally has been constructed
s.party()                   # Sally party count: 1
s.party()                   # Sally party count: 2

j = PartyAnimal('Jim')     # Jim has been constructed
j.party()                   # Jim party count: 1
```

Each call to `PartyAnimal(...)` triggers the constructor, creating a brand new object with its own independent attributes.

## Usage: Methods and Attribute Access

During an object's life, you interact with it through:

**Attribute access** — reading or modifying data:
```python
print(s.name)       # Read attribute
print(s.count)      # Read attribute
s.count = 100       # Modify attribute directly
```

**Method calls** — triggering behavior:
```python
s.party()           # Call a method
```

**Passing to functions** — objects can be arguments:
```python
def announce(animal):
    print(f"{animal.name} has partied {animal.count} times")

announce(s)  # Sally has partied 101 times
```

## Destruction: `__del__`

The **destructor** is the `__del__` method. Python calls it when an object is about to be destroyed:

```python
class PartyAnimal:
    def __init__(self, name):
        self.name = name
        print(f"{self.name}: I am constructed")
    
    def party(self):
        print(f"{self.name}: So far I've partied")
    
    def __del__(self):
        print(f"{self.name}: I am destructed")

s = PartyAnimal('Sally')
# Sally: I am constructed

s.party()
# Sally: So far I've partied

s = 42  # Sally object is no longer referenced
# Sally: I am destructed
```

When we assign `s = 42`, the variable `s` stops pointing to the `PartyAnimal` object. With no references remaining, Python destroys it and calls `__del__`.

> **Note:** In practice, `__del__` is rarely used. Python's garbage collector handles cleanup automatically. For managing resources like files or network connections, use **context managers** (`with` statements) instead.

## Garbage Collection and Reference Counting

Python uses **reference counting** as its primary memory management strategy. Every object has a count of how many variables or data structures reference it:

```python
import sys

a = [1, 2, 3]          # Reference count: 1
b = a                   # Reference count: 2
c = a                   # Reference count: 3

print(sys.getrefcount(a))  # 4 (includes the temporary reference from the function call)

del b                   # Reference count drops
del c                   # Reference count drops
# 'a' still references the list, so it survives

del a                   # Reference count reaches 0 → object is destroyed
```

When a reference count reaches zero, the object is immediately deallocated.

### Circular References

Sometimes objects reference each other, creating a cycle:

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

a = Node(1)
b = Node(2)
a.next = b  # a references b
b.next = a  # b references a — circular!
```

Reference counting alone cannot handle this. Python has a **cyclic garbage collector** that periodically scans for and cleans up circular references.

## The `id()` Function

Every object has a unique identity, accessible via `id()`:

```python
a = PartyAnimal('Alice')
b = PartyAnimal('Bob')
c = a  # c points to the same object as a

print(f"id(a) = {id(a)}")
print(f"id(b) = {id(b)}")
print(f"id(c) = {id(c)}")
print(f"a is c: {a is c}")   # True (same object)
print(f"a is b: {a is b}")   # False (different objects)
```

The `is` operator compares identities (are these the exact same object?), while `==` compares values (do they have equal content?).

## Complete Lifecycle Example

```python
class FileProcessor:
    active_count = 0  # Class variable to track instances
    
    def __init__(self, filename):
        self.filename = filename
        self.data = None
        FileProcessor.active_count += 1
        print(f"Created processor for {filename}")
        print(f"  Active processors: {FileProcessor.active_count}")
    
    def process(self):
        self.data = f"Processed data from {self.filename}"
        print(f"  Processing {self.filename}...")
        return self.data
    
    def __del__(self):
        FileProcessor.active_count -= 1
        print(f"Destroyed processor for {self.filename}")
        print(f"  Active processors: {FileProcessor.active_count}")

# Watch the lifecycle
p1 = FileProcessor('data.csv')     # Created, count: 1
p2 = FileProcessor('report.csv')   # Created, count: 2

p1.process()                        # Usage
p2.process()                        # Usage

print(f"\np1 id: {id(p1)}")
print(f"p2 id: {id(p2)}")

del p1                              # Destroyed, count: 1
del p2                              # Destroyed, count: 0
```

## Practical Takeaways

| Phase | Method | When It Happens |
|-------|--------|-----------------|
| Construction | `__init__` | `obj = MyClass()` |
| Usage | Any method | `obj.method()`, `obj.attr` |
| Destruction | `__del__` | Last reference removed |

Understanding the object lifecycle gives you insight into how Python manages memory and helps you design classes that properly initialize their state and clean up after themselves.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
