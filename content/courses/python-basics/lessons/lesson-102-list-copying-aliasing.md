---
id: "116-list-copying-aliasing"
title: "List Copying and Aliasing"
chapterId: ch8-lists
order: 8
duration: 25
objectives:
  - Understand list references vs copies
  - Master shallow and deep copying
  - Avoid aliasing bugs
  - Copy lists efficiently
---

# List Copying and Aliasing

Understanding how Python handles list references is crucial to avoiding subtle bugs.

## Assignment Creates Alias

```python
# Assignment doesn't copy!
list1 = [1, 2, 3]
list2 = list1  # list2 is an alias for list1

# Both reference the same list
print(id(list1) == id(list2))  # True

# Modifying one affects the other
list2.append(4)
print(list1)  # [1, 2, 3, 4]
print(list2)  # [1, 2, 3, 4]

list1[0] = 99
print(list1)  # [99, 2, 3, 4]
print(list2)  # [99, 2, 3, 4]

# Visualization
# list1 ──┐
#         ├──> [1, 2, 3]
# list2 ──┘

# Common bug
def process_list(data):
    # Modifies the original!
    data.append(999)
    return data

original = [1, 2, 3]
result = process_list(original)
print(original)  # [1, 2, 3, 999] - modified!
```

## Shallow Copy Methods

```python
# Method 1: Slice notation
original = [1, 2, 3, 4, 5]
copy = original[:]

copy.append(6)
print(original)  # [1, 2, 3, 4, 5] - unchanged
print(copy)      # [1, 2, 3, 4, 5, 6]

# Method 2: list() constructor
original = [1, 2, 3, 4, 5]
copy = list(original)

copy[0] = 99
print(original)  # [1, 2, 3, 4, 5] - unchanged
print(copy)      # [99, 2, 3, 4, 5]

# Method 3: .copy() method
original = [1, 2, 3, 4, 5]
copy = original.copy()

copy.append(6)
print(original)  # [1, 2, 3, 4, 5] - unchanged
print(copy)      # [1, 2, 3, 4, 5, 6]

# Method 4: copy.copy()
import copy

original = [1, 2, 3, 4, 5]
shallow = copy.copy(original)

shallow.append(6)
print(original)  # [1, 2, 3, 4, 5] - unchanged
print(shallow)   # [1, 2, 3, 4, 5, 6]

# All create independent top-level lists
```

## Shallow Copy Limitation

```python
# Shallow copy with nested lists
original = [[1, 2], [3, 4]]
shallow = original[:]

# Changing nested list affects both!
shallow[0][0] = 99
print(original)  # [[99, 2], [3, 4]] - affected!
print(shallow)   # [[99, 2], [3, 4]]

# Why? Nested lists are not copied
print(id(original[0]) == id(shallow[0]))  # True - same object!

# Visualization:
# original ──> [ptr1, ptr2]
#                 │     │
# shallow ───> [ptr1, ptr2]  # Same pointers!
#                 │     │
#                 ▼     ▼
#              [1, 2] [3, 4]

# Replacing entire nested list is safe
shallow = original[:]
shallow[0] = [99, 99]  # Replace, not modify
print(original)  # [[1, 2], [3, 4]] - unchanged
print(shallow)   # [[99, 99], [3, 4]]

# Common bug with default arguments
def add_item(item, items=[]):
    items.append(item)
    return items

# Looks innocent but shares list!
list1 = add_item(1)  # [1]
list2 = add_item(2)  # [1, 2] - Oops!

# Safe version
def add_item_safe(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

list1 = add_item_safe(1)  # [1]
list2 = add_item_safe(2)  # [2] - correct!
```

## Deep Copy

```python
import copy

# Deep copy - copies nested structures
original = [[1, 2], [3, 4]]
deep = copy.deepcopy(original)

# Now safe to modify nested lists
deep[0][0] = 99
print(original)  # [[1, 2], [3, 4]] - unchanged
print(deep)      # [[99, 2], [3, 4]]

# Nested lists are different objects
print(id(original[0]) == id(deep[0]))  # False

# Deep copy with complex nesting
original = [
    [1, [2, 3]],
    [4, [5, [6, 7]]]
]
deep = copy.deepcopy(original)

deep[0][1][0] = 99
deep[1][1][1][0] = 88
print(original)
# [[1, [2, 3]], [4, [5, [6, 7]]]] - unchanged

# Deep copy with objects
class Person:
    def __init__(self, name, friends=None):
        self.name = name
        self.friends = friends if friends else []
    
    def __repr__(self):
        return f"Person({self.name})"

alice = Person("Alice")
bob = Person("Bob")
alice.friends = [bob]

# Shallow copy
shallow = copy.copy(alice)
shallow.friends.append(Person("Charlie"))
print(alice.friends)  # [Person(Bob), Person(Charlie)] - affected!

# Deep copy
alice = Person("Alice")
bob = Person("Bob")
alice.friends = [bob]

deep = copy.deepcopy(alice)
deep.friends.append(Person("Charlie"))
print(alice.friends)  # [Person(Bob)] - unchanged
print(deep.friends)   # [Person(Bob), Person(Charlie)]
```

## When to Use Each

```python
# Use assignment (=) when you want alias
def modify_in_place(lst):
    """Intentionally modify original"""
    lst.sort()
    lst.reverse()

numbers = [3, 1, 4, 1, 5]
modify_in_place(numbers)
print(numbers)  # [5, 4, 3, 1, 1] - modified

# Use shallow copy when:
# 1. List contains immutable elements
numbers = [1, 2, 3, 4, 5]
backup = numbers[:]
numbers.sort()
# Can restore from backup

# 2. You only modify top level
matrix = [[1, 2], [3, 4]]
copy = matrix[:]
copy.append([5, 6])  # Only adding rows
print(matrix)  # [[1, 2], [3, 4]] - unchanged

# Use deep copy when:
# 1. Nested mutable structures
matrix = [[1, 2], [3, 4]]
backup = copy.deepcopy(matrix)
matrix[0][0] = 99
# Can restore from backup

# 2. Objects with mutable attributes
class Config:
    def __init__(self):
        self.settings = {"debug": True}

config1 = Config()
config2 = copy.deepcopy(config1)
config2.settings["debug"] = False
print(config1.settings)  # {"debug": True} - unchanged
```

## Detecting Aliases

```python
# Check if two names reference same object
list1 = [1, 2, 3]
list2 = list1
list3 = [1, 2, 3]

print(list1 is list2)  # True - same object
print(list1 is list3)  # False - different objects
print(list1 == list3)  # True - same values

# Check with id()
print(id(list1) == id(list2))  # True
print(id(list1) == id(list3))  # False

# Find all aliases (names pointing to same object)
def find_aliases(obj):
    """Find variable names pointing to obj"""
    import gc
    import sys
    
    names = []
    frame = sys._getframe(1)  # Caller's frame
    
    for name, value in frame.f_locals.items():
        if value is obj and name != "obj":
            names.append(name)
    
    return names

x = [1, 2, 3]
y = x
z = x
print(find_aliases(x))  # ['y', 'z']
```

## Copy in Function Parameters

```python
# Function receives reference
def append_item(lst, item):
    lst.append(item)  # Modifies original!

numbers = [1, 2, 3]
append_item(numbers, 4)
print(numbers)  # [1, 2, 3, 4]

# Defensive copy inside function
def append_item_safe(lst, item):
    result = lst[:]  # Copy
    result.append(item)
    return result

numbers = [1, 2, 3]
new_numbers = append_item_safe(numbers, 4)
print(numbers)      # [1, 2, 3] - unchanged
print(new_numbers)  # [1, 2, 3, 4]

# Document whether function modifies
def process_inplace(lst):
    """Modify list in-place. Returns None."""
    lst.sort()
    # No return statement

def process_copy(lst):
    """Return new sorted list. Original unchanged."""
    return sorted(lst)

# Caller decides
numbers = [3, 1, 4]
process_inplace(numbers)  # Modifies numbers
result = process_copy(numbers)  # Creates new list
```

## Return Value Aliasing

```python
# Returning reference can cause issues
class DataStore:
    def __init__(self):
        self._data = [1, 2, 3]
    
    def get_data(self):
        return self._data  # Returns reference!

store = DataStore()
data = store.get_data()
data.append(999)
print(store._data)  # [1, 2, 3, 999] - modified!

# Safe: return copy
class DataStore:
    def __init__(self):
        self._data = [1, 2, 3]
    
    def get_data(self):
        return self._data[:]  # Return copy

store = DataStore()
data = store.get_data()
data.append(999)
print(store._data)  # [1, 2, 3] - unchanged

# For nested structures
class DataStore:
    def __init__(self):
        self._data = [[1, 2], [3, 4]]
    
    def get_data(self):
        return copy.deepcopy(self._data)

store = DataStore()
data = store.get_data()
data[0][0] = 999
print(store._data)  # [[1, 2], [3, 4]] - unchanged
```

## Copy Performance

```python
import time
import copy

# Shallow copy performance
sizes = [100, 1000, 10000]

for size in sizes:
    original = list(range(size))
    
    # Slice
    start = time.time()
    for _ in range(1000):
        c = original[:]
    slice_time = time.time() - start
    
    # list()
    start = time.time()
    for _ in range(1000):
        c = list(original)
    list_time = time.time() - start
    
    # .copy()
    start = time.time()
    for _ in range(1000):
        c = original.copy()
    copy_time = time.time() - start
    
    print(f"\nSize {size}:")
    print(f"  Slice:  {slice_time:.6f}s")
    print(f"  list(): {list_time:.6f}s")
    print(f"  copy(): {copy_time:.6f}s")
# All very similar performance

# Deep copy is slower
nested = [[i] for i in range(100)]

start = time.time()
for _ in range(1000):
    c = nested[:]  # Shallow
shallow_time = time.time() - start

start = time.time()
for _ in range(1000):
    c = copy.deepcopy(nested)  # Deep
deep_time = time.time() - start

print(f"\nShallow: {shallow_time:.6f}s")
print(f"Deep:    {deep_time:.6f}s")
print(f"Ratio:   {deep_time / shallow_time:.2f}x slower")
```

## Common Pitfalls

```python
# Pitfall 1: Multiple assignments
a = b = c = [1, 2, 3]
a.append(4)
print(b)  # [1, 2, 3, 4] - all affected!
print(c)  # [1, 2, 3, 4]

# Should be:
a = [1, 2, 3]
b = a[:]
c = a[:]

# Pitfall 2: List multiplication
inner = [0]
matrix = [inner] * 3
matrix[0][0] = 1
print(matrix)  # [[1], [1], [1]] - all same!

# Should be:
matrix = [[0] for _ in range(3)]

# Pitfall 3: Modifying during iteration
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # Modifies original!
print(numbers)  # [1, 3, 4, 5] - missed 4!

# Should iterate over copy:
numbers = [1, 2, 3, 4, 5]
for num in numbers[:]:
    if num % 2 == 0:
        numbers.remove(num)
print(numbers)  # [1, 3, 5]

# Pitfall 4: Unexpected sharing
def create_matrix(rows, cols):
    # Wrong - all rows same list!
    return [[0] * cols] * rows

matrix = create_matrix(3, 3)
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [1, 0, 0], [1, 0, 0]]

# Correct:
def create_matrix(rows, cols):
    return [[0] * cols for _ in range(rows)]
```

## Summary

**Copying Methods:**

| Method | Type | Use Case | Nested Safe? |
|--------|------|----------|--------------|
| `=` | Alias | Want to modify original | N/A |
| `[:]` | Shallow | Immutable elements | No |
| `list()` | Shallow | Immutable elements | No |
| `.copy()` | Shallow | Immutable elements | No |
| `copy.copy()` | Shallow | Immutable elements | No |
| `copy.deepcopy()` | Deep | Nested mutable structures | Yes |

**Decision Tree:**

```
Need to modify original? 
  ├─ Yes → Use assignment (=)
  └─ No → Need to copy
      ├─ Has nested mutable structures?
      │   ├─ Yes → Use copy.deepcopy()
      │   └─ No → Use [:], list(), or .copy()
      └─ Performance critical?
          ├─ Yes → Use [:] or .copy()
          └─ No → Use most readable option
```

**Best Practices:**

- ✅ Use `[:]` or `.copy()` for shallow copies
- ✅ Use `copy.deepcopy()` for nested structures
- ✅ Document whether functions modify parameters
- ✅ Return copies from getters to protect internal state
- ✅ Use `is` to check for aliases
- ❌ Don't assume assignment copies
- ❌ Don't use shallow copy with nested mutables
- ❌ Don't modify list while iterating without copying

**Remember:** Assignment never copies - it creates an alias!
