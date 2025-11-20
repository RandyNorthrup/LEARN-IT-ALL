---
id: "119-list-best-practices"
title: "List Best Practices and Patterns"
chapterId: ch8-lists
order: 11
duration: 25
objectives:
  - Learn list best practices
  - Avoid common anti-patterns
  - Write idiomatic Python code
  - Master list design patterns
---

# List Best Practices and Patterns

Writing clean, efficient, and Pythonic list code is essential for every Python developer.

## Choosing Lists vs Other Collections

```python
# ✅ Use list when:
# - Order matters
# - Need indexing
# - Duplicate elements allowed
# - Frequent appends

# Shopping cart (order matters, duplicates OK)
cart = ["apple", "banana", "apple"]

# Command history (order matters)
history = ["ls", "cd documents", "pwd"]

# ❌ Don't use list when:
# - Need fast membership testing → Use set
# - Need key-value mapping → Use dict
# - Need queue operations → Use deque

# BAD - slow membership testing
banned_users = ["user1", "user2", "user3", ...]
if username in banned_users:  # O(n) - slow!
    pass

# GOOD - fast membership testing
banned_users = {"user1", "user2", "user3", ...}
if username in banned_users:  # O(1) - fast!
    pass

# BAD - using list as lookup table
user_ages = [("alice", 30), ("bob", 25), ...]
for name, age in user_ages:
    if name == "alice":  # O(n) lookup
        print(age)

# GOOD - use dict
user_ages = {"alice": 30, "bob": 25, ...}
print(user_ages["alice"])  # O(1) lookup
```

## List Comprehensions Best Practices

```python
# ✅ GOOD - Clear and concise
squares = [x**2 for x in range(10)]

# ✅ GOOD - Single condition
evens = [x for x in range(10) if x % 2 == 0]

# ⚠️ OK - Multiple conditions (still readable)
result = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]

# ❌ BAD - Too complex, use regular loop
result = [
    x**2 if x > 0 else x**3 if x < 0 else 0
    for x in range(-10, 10)
    if abs(x) > 5 and x % 2 == 0
]

# BETTER - Use function or regular loop
def transform(x):
    if x > 0:
        return x**2
    elif x < 0:
        return x**3
    else:
        return 0

result = [transform(x) for x in range(-10, 10) if abs(x) > 5 and x % 2 == 0]

# OR use regular loop for complex logic
result = []
for x in range(-10, 10):
    if abs(x) > 5 and x % 2 == 0:
        if x > 0:
            result.append(x**2)
        elif x < 0:
            result.append(x**3)
        else:
            result.append(0)

# ✅ GOOD - Nested comprehension for matrix operations
matrix = [[i*j for j in range(3)] for i in range(3)]

# ❌ BAD - More than 2 levels of nesting
# Use regular loops instead
```

## Naming Conventions

```python
# ✅ GOOD - Plural names for lists
users = ["alice", "bob", "charlie"]
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "cherry"]

# ❌ BAD - Singular names
user = ["alice", "bob", "charlie"]
number = [1, 2, 3, 4, 5]

# ✅ GOOD - Descriptive names
active_users = [user for user in users if user.is_active]
sorted_scores = sorted(scores, reverse=True)
filtered_data = [x for x in data if x > 0]

# ❌ BAD - Unclear names
list1 = [...]
data = [...]
tmp = [...]

# ✅ GOOD - Use singular in loops
for user in users:
    print(user.name)

for item in shopping_cart:
    calculate_price(item)

# ❌ BAD - Unclear loop variables
for x in users:
    print(x.name)

for i in shopping_cart:
    calculate_price(i)
```

## Iteration Patterns

```python
# ✅ GOOD - Direct iteration when you don't need index
for item in items:
    process(item)

# ❌ BAD - Using range(len()) when you don't need index
for i in range(len(items)):
    process(items[i])

# ✅ GOOD - enumerate when you need index
for i, item in enumerate(items):
    print(f"{i}: {item}")

# ❌ BAD - Manual index tracking
i = 0
for item in items:
    print(f"{i}: {item}")
    i += 1

# ✅ GOOD - zip for parallel iteration
for name, age in zip(names, ages):
    print(f"{name} is {age}")

# ❌ BAD - Manual indexing
for i in range(len(names)):
    print(f"{names[i]} is {ages[i]}")

# ✅ GOOD - reversed for reverse iteration
for item in reversed(items):
    print(item)

# ❌ BAD - Manual reverse indexing
for i in range(len(items) - 1, -1, -1):
    print(items[i])

# ✅ GOOD - Iterate directly, use break
for item in items:
    if item.id == target_id:
        found = item
        break
else:
    found = None

# ✅ ALSO GOOD - Use next() with generator
found = next((item for item in items if item.id == target_id), None)
```

## Modifying Lists

```python
# ✅ GOOD - Don't modify while iterating directly
numbers = [1, 2, 3, 4, 5]
numbers = [x for x in numbers if x % 2 != 0]

# ❌ BAD - Modifying during iteration
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # Causes bugs!

# ✅ GOOD - Iterate over copy if must modify original
numbers = [1, 2, 3, 4, 5]
for num in numbers[:]:
    if num % 2 == 0:
        numbers.remove(num)

# ✅ GOOD - Build new list
old_list = [1, 2, 3, 4, 5]
new_list = [process(x) for x in old_list]

# ❌ BAD - Modifying in place when not needed
for i, item in enumerate(old_list):
    old_list[i] = process(item)

# ✅ GOOD - Clear intent with method names
def get_active_users(users):
    """Return new list of active users"""
    return [u for u in users if u.is_active]

def remove_inactive_users(users):
    """Modify users list in-place, removing inactive"""
    users[:] = [u for u in users if u.is_active]
```

## Empty List Checks

```python
# ✅ GOOD - Pythonic empty check
items = []
if not items:
    print("Empty")

if items:
    print("Has items")

# ❌ BAD - Verbose
if len(items) == 0:
    print("Empty")

if len(items) > 0:
    print("Has items")

# ✅ GOOD - None-safe check
def process_items(items=None):
    if not items:  # Handles None and empty list
        items = []
    # Process items

# ⚠️ Be careful with falsy values
numbers = [0, 0, 0]
if numbers:  # True - list has items
    print("Has numbers")

if any(numbers):  # False - all values are falsy
    print("Has truthy number")

if all(numbers):  # False - not all values are truthy
    print("All numbers truthy")
```

## Default Arguments

```python
# ❌ BAD - Mutable default argument
def add_item(item, items=[]):
    items.append(item)
    return items

list1 = add_item(1)  # [1]
list2 = add_item(2)  # [1, 2] - Oops! Shared list

# ✅ GOOD - Use None as default
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

list1 = add_item(1)  # [1]
list2 = add_item(2)  # [2] - Correct!

# ✅ GOOD - Document in-place vs copy
def add_item_inplace(item, items=None):
    """Add item to items in-place. Creates new list if None."""
    if items is None:
        items = []
    items.append(item)
    return items

def add_item_copy(item, items=None):
    """Return new list with item added. Original unchanged."""
    if items is None:
        items = []
    return items + [item]
```

## Copying Best Practices

```python
# ✅ GOOD - Clear when you're copying
original = [1, 2, 3]
copy = original[:]  # Or original.copy()

# ✅ GOOD - Assign when you want alias
original = [1, 2, 3]
alias = original

# ✅ GOOD - Deep copy for nested structures
import copy
original = [[1, 2], [3, 4]]
deep = copy.deepcopy(original)

# ✅ GOOD - Document copy behavior
def process_list(items):
    """Process items in-place. Modifies original list."""
    items.sort()
    items.reverse()

def process_list_copy(items):
    """Process items. Returns new list, original unchanged."""
    result = items[:]
    result.sort()
    result.reverse()
    return result

# ✅ GOOD - Defensive copying in classes
class DataStore:
    def __init__(self, data):
        self._data = data[:]  # Copy to protect internal state
    
    def get_data(self):
        return self._data[:]  # Return copy to protect internal state
```

## Function Return Values

```python
# ✅ GOOD - Consistent return types
def find_users(criteria):
    """Always return list, even if empty"""
    matching = [u for u in users if criteria(u)]
    return matching

# ❌ BAD - Inconsistent returns
def find_users(criteria):
    matching = [u for u in users if criteria(u)]
    if matching:
        return matching
    return None  # Sometimes list, sometimes None!

# Caller must check:
result = find_users(lambda u: u.age > 30)
if result is not None:
    for user in result:  # Extra check needed
        print(user)

# ✅ GOOD - Return empty list
result = find_users(lambda u: u.age > 30)
for user in result:  # Works even if empty
    print(user)

# ✅ GOOD - Return tuple for multiple values
def partition_numbers(numbers):
    """Return (evens, odds)"""
    evens = [x for x in numbers if x % 2 == 0]
    odds = [x for x in numbers if x % 2 != 0]
    return evens, odds

# ❌ BAD - Return list of lists (unclear)
def partition_numbers(numbers):
    return [
        [x for x in numbers if x % 2 == 0],
        [x for x in numbers if x % 2 != 0]
    ]
```

## Error Handling

```python
# ✅ GOOD - Handle index errors
def safe_get(lst, index, default=None):
    """Safely get element at index"""
    try:
        return lst[index]
    except IndexError:
        return default

# ✅ GOOD - Validate before operations
def process_first(items):
    if not items:
        raise ValueError("Cannot process empty list")
    return process(items[0])

# ❌ BAD - Let it crash with unclear error
def process_first(items):
    return process(items[0])  # IndexError: list index out of range

# ✅ GOOD - Check membership before remove
def safe_remove(lst, value):
    if value in lst:
        lst.remove(value)
        return True
    return False

# ❌ BAD - Bare try-except
try:
    lst.remove(value)
except:  # Catches everything!
    pass
```

## Common Patterns

```python
# ✅ GOOD - Accumulation pattern
total = sum(numbers)
product = 1
for num in numbers:
    product *= num

# ✅ GOOD - Filter-map pattern
result = [transform(x) for x in data if condition(x)]

# ✅ GOOD - Find first matching
first_even = next((x for x in numbers if x % 2 == 0), None)

# ✅ GOOD - Partition pattern
evens = [x for x in numbers if x % 2 == 0]
odds = [x for x in numbers if x % 2 != 0]

# ✅ GOOD - Flatten nested list
flattened = [item for sublist in nested for item in sublist]

# ✅ GOOD - Remove duplicates preserving order
unique = list(dict.fromkeys(items))

# ✅ GOOD - Group by property
from collections import defaultdict
groups = defaultdict(list)
for item in items:
    groups[item.category].append(item)

# ✅ GOOD - Pairwise iteration
for a, b in zip(items, items[1:]):
    print(f"{a} → {b}")

# ✅ GOOD - Running calculations
from itertools import accumulate
running_sum = list(accumulate(numbers))
running_max = list(accumulate(numbers, max))
```

## Documentation

```python
# ✅ GOOD - Document list parameters
def process_items(items: list[int]) -> list[int]:
    """
    Process list of integers.
    
    Args:
        items: List of integers to process
        
    Returns:
        New list with processed integers
        
    Raises:
        ValueError: If items is empty
        
    Examples:
        >>> process_items([1, 2, 3])
        [2, 4, 6]
    """
    if not items:
        raise ValueError("Items cannot be empty")
    return [x * 2 for x in items]

# ✅ GOOD - Document in-place modification
def sort_items(items: list) -> None:
    """
    Sort items in-place.
    
    Note: Modifies the original list.
    
    Args:
        items: List to sort (modified in-place)
    """
    items.sort()

# ✅ GOOD - Document return of new list
def sorted_items(items: list) -> list:
    """
    Return sorted copy of items.
    
    Note: Original list is not modified.
    
    Args:
        items: List to sort
        
    Returns:
        New sorted list
    """
    return sorted(items)
```

## Summary

**Golden Rules:**

1. **Choose the right data structure**
   - List: Order + index access
   - Set: Unique items + fast lookup
   - Dict: Key-value pairs

2. **Iteration**
   - Direct iteration when possible
   - `enumerate()` when you need index
   - `zip()` for parallel iteration
   - Don't modify while iterating

3. **Comprehensions**
   - Use for simple transformations
   - Keep them readable
   - Use regular loops for complex logic

4. **Naming**
   - Plural names for lists
   - Singular in loops
   - Descriptive names always

5. **Copying**
   - Be explicit about copying
   - Use `[:]` or `.copy()` for shallow
   - Use `deepcopy()` for nested
   - Avoid mutable defaults

6. **Functions**
   - Document in-place vs copy
   - Return consistent types
   - Handle edge cases
   - Use type hints

**Anti-Patterns to Avoid:**

- ❌ Using list as queue (use `deque`)
- ❌ Repeated membership testing (use `set`)
- ❌ Using `range(len())` unnecessarily
- ❌ Modifying list while iterating
- ❌ Mutable default arguments
- ❌ Inconsistent return types
- ❌ Complex comprehensions

**Remember:** "Simple is better than complex" - Zen of Python
