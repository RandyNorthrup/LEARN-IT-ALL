---
id: "124-dict-keys-values"
title: "Dictionary Keys and Values Requirements"
chapterId: ch9-dictionaries
order: 6
duration: 25
objectives:
  - Understand dictionary key requirements
  - Master hashability concept
  - Learn valid and invalid key types
  - Handle edge cases properly
---

# Dictionary Keys and Values Requirements

Understanding what makes valid dictionary keys is crucial for effective Python programming.

## Hashability - The Key Requirement

```python
# Keys must be hashable (immutable)
# Hashable types have a hash() function

# Valid hashable types
print(hash("string"))    # String
print(hash(42))          # Integer
print(hash(3.14))        # Float
print(hash(True))        # Boolean
print(hash((1, 2, 3)))   # Tuple (of hashables)
print(hash(None))        # None

# Check if object is hashable
from collections.abc import Hashable

print(isinstance("hello", Hashable))  # True
print(isinstance(42, Hashable))       # True
print(isinstance((1, 2), Hashable))   # True
print(isinstance([1, 2], Hashable))   # False
print(isinstance({1, 2}, Hashable))   # False
print(isinstance({"a": 1}, Hashable)) # False

# Why hashability matters
d = {}
key = "test"
d[key] = "value"
# Python computes hash(key) to determine where to store the value
print(f"Hash of '{key}': {hash(key)}")
```

## Valid Key Types

```python
# Strings (most common)
d = {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
}

# Numbers
d = {
    42: "integer key",
    3.14: "float key",
    2+3j: "complex key",  # Even complex numbers!
    True: "bool key"      # bool is subclass of int
}

# None
d = {None: "none key"}
print(d[None])  # none key

# Tuples (if contents are hashable)
d = {
    (1, 2): "tuple key",
    ("a", "b", "c"): "string tuple",
    (1, (2, 3), 4): "nested tuple"
}
print(d[(1, 2)])  # tuple key

# Frozen sets
d = {
    frozenset([1, 2, 3]): "frozen set key"
}
print(d[frozenset([1, 2, 3])])  # frozen set key

# Mixed types
d = {
    "string": 1,
    42: 2,
    (1, 2): 3,
    None: 4,
    True: 5,
    frozenset([1]): 6
}
```

## Invalid Key Types

```python
# Lists are mutable - NOT hashable
try:
    d = {[1, 2]: "list key"}
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'list'

# Dictionaries are mutable - NOT hashable
try:
    d = {{"nested": "dict"}: "dict key"}
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'dict'

# Sets are mutable - NOT hashable
try:
    d = {{1, 2}: "set key"}
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'set'

# Tuples containing unhashables - NOT hashable
try:
    d = {(1, [2, 3]): "tuple with list"}
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'list'

# Custom mutable objects - NOT hashable by default
class MutablePerson:
    def __init__(self, name):
        self.name = name

try:
    person = MutablePerson("Alice")
    d = {person: "value"}
except TypeError as e:
    print(f"Error: {e}")
```

## Tuples as Keys

```python
# Coordinate system
grid = {}
grid[(0, 0)] = "origin"
grid[(1, 0)] = "east"
grid[(0, 1)] = "north"
grid[(-1, 0)] = "west"
grid[(0, -1)] = "south"

print(grid[(1, 0)])  # east

# 3D coordinates
space = {
    (0, 0, 0): "origin",
    (1, 2, 3): "point A"
}

# Multi-part keys
student_grades = {
    ("Alice", "Math"): 95,
    ("Alice", "Science"): 90,
    ("Bob", "Math"): 85,
    ("Bob", "Science"): 88
}
print(student_grades[("Alice", "Math")])  # 95

# Date tuples
events = {
    (2024, 1, 1): "New Year",
    (2024, 7, 4): "Independence Day",
    (2024, 12, 25): "Christmas"
}

# Nested tuples
matrix = {
    ((0, 0), (0, 1)): "edge",
    ((1, 0), (1, 1)): "edge"
}

# ⚠️ Tuple must be fully hashable
valid = {(1, 2, 3): "all ints"}  # OK
valid = {(1, "a", 3.14): "mixed"}  # OK

# Invalid - contains list
try:
    invalid = {(1, [2, 3]): "has list"}
except TypeError:
    print("Tuple with list not hashable")
```

## Boolean and Integer Key Quirks

```python
# True == 1 and False == 0
d = {}
d[True] = "bool true"
d[1] = "int one"
print(d)  # {True: 'int one'} - 1 overwrites True!

# Because True == 1
print(True == 1)  # True
print(hash(True) == hash(1))  # True

d = {}
d[False] = "bool false"
d[0] = "int zero"
print(d)  # {False: 'int zero'} - 0 overwrites False!

# First key inserted determines the display
d = {}
d[1] = "first"
d[True] = "second"
print(d)  # {1: 'second'} - displays as 1

d = {}
d[True] = "first"
d[1] = "second"
print(d)  # {True: 'second'} - displays as True

# Practical implication
counts = {}
counts[0] = 10
counts[False] = counts.get(False, 0) + 5
print(counts)  # {0: 15} - both refer to same key!
```

## String Keys Patterns

```python
# Case-sensitive
d = {
    "name": "lowercase",
    "Name": "capitalized",
    "NAME": "uppercase"
}
print(len(d))  # 3 - all different keys

# Unicode strings
d = {
    "café": "French",
    "カフェ": "Japanese",
    "مقهى": "Arabic"
}

# Empty string is valid
d = {"": "empty key"}
print(d[""])  # empty key

# Very long strings
d = {"x" * 1000: "long key"}

# String with special characters
d = {
    "hello\nworld": "newline",
    "tab\there": "tab",
    "quote\"here": "quote"
}

# Raw strings
d = {
    r"C:\Users\Alice": "path",
    r"regex: \d+": "pattern"
}
```

## Number Keys

```python
# Integer keys
d = {
    0: "zero",
    1: "one",
    -1: "negative one",
    1000000: "million"
}

# Float keys (be careful!)
d = {
    1.0: "one point zero",
    3.14: "pi",
    -2.5: "negative"
}

# ⚠️ Float precision issues
d = {}
d[0.1 + 0.2] = "sum"
print(d)  # {0.30000000000000004: 'sum'}
print(0.3 in d)  # False!
print((0.1 + 0.2) in d)  # True

# Integer and float equivalence
d = {}
d[1] = "int one"
d[1.0] = "float one"
print(d)  # {1: 'float one'} - same key!

print(1 == 1.0)  # True
print(hash(1) == hash(1.0))  # True

# Complex numbers
d = {
    1+2j: "complex",
    (3+4j): "another"
}
```

## None as Key

```python
# None is a valid key
d = {None: "none value"}
print(d[None])  # none value

# Use case: optional parameters
cache = {
    "user1": {"name": "Alice"},
    None: {"name": "Guest"}  # Default for unauthenticated
}

def get_user(user_id=None):
    return cache.get(user_id, cache[None])

print(get_user("user1"))  # {'name': 'Alice'}
print(get_user())         # {'name': 'Guest'}

# None vs missing key
d = {None: "value"}
print(d.get(None))  # "value" - key exists
print(d.get("missing"))  # None - key doesn't exist

# Distinguish between None key and missing
if None in d:
    print("None is a key")
else:
    print("None is not a key")
```

## Custom Objects as Keys

```python
# Objects are hashable by default (use id)
class Person:
    def __init__(self, name):
        self.name = name

p1 = Person("Alice")
p2 = Person("Alice")

d = {p1: "first person"}
print(d[p1])  # first person
print(p2 in d)  # False - different object!

# Make custom class properly hashable and comparable
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __hash__(self):
        return hash((self.name, self.age))
    
    def __eq__(self, other):
        if not isinstance(other, Person):
            return False
        return self.name == other.name and self.age == other.age
    
    def __repr__(self):
        return f"Person('{self.name}', {self.age})"

p1 = Person("Alice", 30)
p2 = Person("Alice", 30)
p3 = Person("Bob", 25)

d = {p1: "first"}
print(p2 in d)  # True - same hash and equal!

d[p2] = "second"
print(d)  # {Person('Alice', 30): 'second'} - overwrites

d[p3] = "third"
print(d)  # {Person('Alice', 30): 'second', Person('Bob', 25): 'third'}

# ⚠️ WARNING: Don't modify hashable objects!
class BadPerson:
    def __init__(self, name):
        self.name = name
    
    def __hash__(self):
        return hash(self.name)
    
    def __eq__(self, other):
        return self.name == other.name

p = BadPerson("Alice")
d = {p: "value"}
print(d[p])  # value

p.name = "Bob"  # DANGER! Hash changed!
print(p in d)  # False - can't find it anymore!

# Dictionary is now corrupted
for key in d:
    print(f"Key: {key.name}")  # Bob
    print(f"Can access: {d[key]}")  # Works during iteration
    print(f"Direct access: {key in d}")  # False!
```

## Frozenset as Key

```python
# Frozenset is immutable set
fs1 = frozenset([1, 2, 3])
fs2 = frozenset([3, 2, 1])  # Same elements

d = {fs1: "first"}
print(d[fs2])  # first - same frozenset!

# Use case: sets of tags
posts = {
    frozenset(["python", "tutorial"]): "Post 1",
    frozenset(["javascript", "react"]): "Post 2",
    frozenset(["python", "django"]): "Post 3"
}

# Query by tags
tags = frozenset(["python", "tutorial"])
print(posts.get(tags))  # Post 1

# Empty frozenset
d = {frozenset(): "empty set"}

# Nested frozensets
d = {
    frozenset([frozenset([1, 2]), frozenset([3, 4])]): "nested"
}
```

## Value Types (No Restrictions)

```python
# Values can be ANY type (no hashability requirement)
d = {
    "list": [1, 2, 3],
    "dict": {"nested": "value"},
    "set": {1, 2, 3},
    "tuple": (1, 2, 3),
    "function": print,
    "class": str,
    "none": None,
    "bool": True,
    "object": object()
}

# Mutable values are fine
d = {"numbers": [1, 2, 3]}
d["numbers"].append(4)
print(d)  # {'numbers': [1, 2, 3, 4]}

# Functions as values
operations = {
    "add": lambda x, y: x + y,
    "subtract": lambda x, y: x - y,
    "multiply": lambda x, y: x * y
}
result = operations["add"](5, 3)
print(result)  # 8

# Classes as values
types = {
    "string": str,
    "integer": int,
    "list": list
}
my_list = types["list"]([1, 2, 3])
```

## Key Collision and Resolution

```python
# When hashes collide (rare)
class AlwaysSameHash:
    def __init__(self, value):
        self.value = value
    
    def __hash__(self):
        return 42  # Always same hash!
    
    def __eq__(self, other):
        return isinstance(other, AlwaysSameHash) and self.value == other.value

a = AlwaysSameHash(1)
b = AlwaysSameHash(2)

d = {a: "first", b: "second"}
print(len(d))  # 2 - both stored despite same hash
print(d[a])    # first
print(d[b])    # second

# Python uses hash + equality for key lookup
# Same hash but different equality = different keys
```

## Best Practices

```python
# ✅ GOOD: Use immutable built-in types
coord_to_name = {
    (0, 0): "origin",
    (1, 1): "diagonal"
}

# ✅ GOOD: Use tuples for composite keys
grades = {
    ("Alice", "Math"): 95,
    ("Bob", "Science"): 88
}

# ✅ GOOD: Use frozenset for set keys
tag_groups = {
    frozenset(["python", "django"]): "web",
    frozenset(["python", "numpy"]): "data"
}

# ❌ BAD: Try to use list as key
try:
    d = {[1, 2]: "value"}  # TypeError!
except TypeError:
    # Convert to tuple instead
    d = {tuple([1, 2]): "value"}  # OK

# ❌ BAD: Modify object after using as key
class Mutable:
    def __init__(self, x):
        self.x = x
    def __hash__(self):
        return hash(self.x)

obj = Mutable(5)
d = {obj: "value"}
obj.x = 10  # DON'T DO THIS!

# ✅ GOOD: Make custom keys immutable
class ImmutablePoint:
    def __init__(self, x, y):
        self._x = x
        self._y = y
    
    @property
    def x(self):
        return self._x
    
    @property
    def y(self):
        return self._y
    
    def __hash__(self):
        return hash((self._x, self._y))
    
    def __eq__(self, other):
        return isinstance(other, ImmutablePoint) and \
               self._x == other._x and self._y == other._y
```

## Summary

**Valid Key Types:**
- ✅ Strings, integers, floats, complex
- ✅ Booleans, None
- ✅ Tuples (if contents hashable)
- ✅ Frozensets
- ✅ Custom immutable objects with `__hash__` and `__eq__`

**Invalid Key Types:**
- ❌ Lists (mutable)
- ❌ Dicts (mutable)
- ❌ Sets (mutable)
- ❌ Tuples containing unhashable objects

**Key Points:**
- Keys must be **hashable** (immutable)
- Values can be **any type** (no restrictions)
- `True == 1` and `False == 0` (same keys)
- Float keys can have precision issues
- Custom objects need `__hash__` and `__eq__`
- Don't modify objects after using as keys

**Remember:** When in doubt, use strings or tuples as keys!
