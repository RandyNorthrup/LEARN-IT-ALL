---
id: object-identity
title: Object Identity and Equality
chapterId: ch2-classes-objects
order: 17
duration: 14
objectives:
  - Understand object identity vs equality
  - Learn the difference between is and ==
  - Master object comparison techniques
---

# Object Identity and Equality

Python distinguishes between **identity** (same object) and **equality** (same value). Understanding this is crucial for writing correct comparisons.

## Identity vs Equality

### Identity: `is` operator

```python
# Identity checks if two variables refer to the SAME object
a = [1, 2, 3]
b = a  # b points to the same object
c = [1, 2, 3]  # c is a different object with same value

print(a is b)  # True (same object)
print(a is c)  # False (different objects)
print(id(a))   # Memory address of a
print(id(b))   # Same address as a
print(id(c))   # Different address
```

### Equality: `==` operator

```python
# Equality checks if two objects have the SAME VALUE
a = [1, 2, 3]
b = a
c = [1, 2, 3]

print(a == b)  # True (same value)
print(a == c)  # True (same value, different objects)
```

## When to Use `is` vs `==`

### Use `is` for:

**1. None Comparisons**

```python
# ✅ Correct
value = None
if value is None:
    print("No value")

# ❌ Wrong (but works)
if value == None:
    print("No value")
```

**2. Boolean Comparisons**

```python
# ✅ Preferred
flag = True
if flag is True:
    print("Flag is set")

# ✅ Also good (more Pythonic)
if flag:
    print("Flag is set")
```

**3. Singleton Objects**

```python
# ✅ Use 'is' for singletons
if obj is None:
    pass

if result is True:
    pass

if value is False:
    pass
```

### Use `==` for:

**Value Comparisons**

```python
# ✅ Correct - comparing values
name = "Alice"
if name == "Alice":
    print("Hello Alice")

number = 42
if number == 42:
    print("The answer")

# ✅ Correct - comparing object contents
list1 = [1, 2, 3]
list2 = [1, 2, 3]
if list1 == list2:
    print("Same contents")
```

## Default Object Equality

### Without `__eq__` Implementation

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person1 = Person("Alice", 30)
person2 = Person("Alice", 30)

# By default, compares identity (like 'is')
print(person1 == person2)  # False (different objects)
print(person1 is person2)  # False (different objects)
```

### With `__eq__` Implementation

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __eq__(self, other):
        """Two persons are equal if name and age match."""
        if not isinstance(other, Person):
            return False
        return self.name == other.name and self.age == other.age

person1 = Person("Alice", 30)
person2 = Person("Alice", 30)
person3 = Person("Bob", 25)

print(person1 == person2)  # True (same values)
print(person1 is person2)  # False (different objects)
print(person1 == person3)  # False (different values)
```

## Implementing Equality

### Basic Implementation

```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
    
    def __eq__(self, other):
        """Books are equal if title and author match."""
        if not isinstance(other, Book):
            return NotImplemented
        return (self.title == other.title and 
                self.author == other.author)
    
    def __hash__(self):
        """Hash based on immutable attributes."""
        return hash((self.title, self.author))

book1 = Book("1984", "George Orwell")
book2 = Book("1984", "George Orwell")

print(book1 == book2)  # True
print(book1 is book2)  # False
```

### Type Checking in `__eq__`

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __eq__(self, other):
        # Method 1: Return NotImplemented for different types
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

point = Point(1, 2)
print(point == Point(1, 2))  # True
print(point == (1, 2))       # False (NotImplemented -> False)
print(point == "test")       # False
```

## Hash and Equality

### The Rule

**If two objects are equal, they must have the same hash!**

```python
class Student:
    def __init__(self, student_id, name):
        self.student_id = student_id
        self.name = name
    
    def __eq__(self, other):
        if not isinstance(other, Student):
            return False
        return self.student_id == other.student_id
    
    def __hash__(self):
        # Hash based on student_id (used for equality)
        return hash(self.student_id)

# Now can use in sets and as dict keys
student1 = Student(1, "Alice")
student2 = Student(1, "Alice (updated)")

students = {student1, student2}
print(len(students))  # 1 (considered equal)

grades = {student1: 95, student2: 98}
print(len(grades))  # 1 (same key)
```

### Unhashable Objects

```python
class MutablePoint:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __eq__(self, other):
        if not isinstance(other, MutablePoint):
            return False
        return self.x == other.x and self.y == other.y
    
    # No __hash__ - cannot be used in sets or as dict keys

point = MutablePoint(1, 2)
# points = {point}  # TypeError: unhashable type

# But can still use equality
print(point == MutablePoint(1, 2))  # True
```

## Comparison Methods

```python
from functools import total_ordering

@total_ordering
class Version:
    def __init__(self, major, minor, patch):
        self.major = major
        self.minor = minor
        self.patch = patch
    
    def __eq__(self, other):
        if not isinstance(other, Version):
            return NotImplemented
        return (self.major == other.major and
                self.minor == other.minor and
                self.patch == other.patch)
    
    def __lt__(self, other):
        if not isinstance(other, Version):
            return NotImplemented
        return ((self.major, self.minor, self.patch) <
                (other.major, other.minor, other.patch))
    
    def __hash__(self):
        return hash((self.major, self.minor, self.patch))
    
    def __str__(self):
        return f"{self.major}.{self.minor}.{self.patch}"

# total_ordering provides other comparisons
v1 = Version(1, 0, 0)
v2 = Version(1, 2, 3)
v3 = Version(2, 0, 0)

print(v1 < v2)   # True
print(v2 <= v3)  # True
print(v3 > v1)   # True
print(v1 == Version(1, 0, 0))  # True

# Can sort
versions = [v3, v1, v2]
versions.sort()
print([str(v) for v in versions])  # ['1.0.0', '1.2.3', '2.0.0']
```

## Shallow vs Deep Equality

```python
class Container:
    def __init__(self, items):
        self.items = items
    
    def __eq__(self, other):
        if not isinstance(other, Container):
            return False
        # Shallow equality - compares references
        return self.items == other.items

# Shallow equality
list1 = [1, 2, 3]
c1 = Container(list1)
c2 = Container(list1)  # Same list reference
c3 = Container([1, 2, 3])  # Different list

print(c1 == c2)  # True (same list reference)
print(c1 == c3)  # True (equal list contents)
```

## Identity for Immutable Types

```python
# Small integers are cached
a = 256
b = 256
print(a is b)  # True (same object - cached)

a = 257
b = 257
print(a is b)  # False (different objects)

# String interning
s1 = "hello"
s2 = "hello"
print(s1 is s2)  # True (interned)

s1 = "hello world"
s2 = "hello world"
print(s1 is s2)  # May be False (not always interned)
```

## Best Practices

### 1. Always Use `isinstance` in `__eq__`

```python
# ✅ Good
def __eq__(self, other):
    if not isinstance(other, MyClass):
        return NotImplemented
    return self.value == other.value

# ❌ Bad
def __eq__(self, other):
    return self.value == other.value  # Crashes if other has no value
```

### 2. Implement `__hash__` with `__eq__`

```python
# ✅ Good - both implemented
class Point:
    def __init__(self, x, y):
        self._x = x
        self._y = y
    
    def __eq__(self, other):
        if not isinstance(other, Point):
            return False
        return self._x == other._x and self._y == other._y
    
    def __hash__(self):
        return hash((self._x, self._y))

# ❌ Bad - __eq__ without __hash__
class Point:
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    # Missing __hash__ - cannot use in sets
```

### 3. Use `is None` not `== None`

```python
# ✅ Correct
if value is None:
    pass

# ❌ Wrong
if value == None:
    pass
```

### 4. Don't Compare with `is` for Values

```python
# ❌ Wrong
name = "Alice"
if name is "Alice":  # Bad - use ==
    pass

# ✅ Correct
if name == "Alice":
    pass
```

## Summary

Use **`is`** to check object identity (same memory location) and **`==`** to check equality (same value). Always use **`is` for None comparisons** (`if x is None`), but use **`==` for value comparisons**. Implement **`__eq__`** to define custom equality for your classes, and always implement **`__hash__`** alongside `__eq__` if objects should be hashable for use in sets and dictionaries. Use **`isinstance()` in `__eq__`** to handle type checking properly, returning `NotImplemented` for incompatible types. Remember that equal objects **must have equal hashes**.
