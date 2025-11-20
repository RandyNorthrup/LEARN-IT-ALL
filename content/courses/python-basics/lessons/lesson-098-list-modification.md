---
id: "112-list-modification"
title: "Modifying Lists In-Place"
chapterId: ch8-lists
order: 4
duration: 25
objectives:
  - Master list mutation methods
  - Understand in-place vs copying operations
  - Learn when to mutate vs create new lists
  - Avoid common mutation pitfalls
---

# Modifying Lists In-Place

Lists are mutable - they can be changed after creation. Understanding in-place modification is key to efficient list manipulation.

## append() - Add Single Element

```python
# Add to end
fruits = ["apple", "banana"]
fruits.append("cherry")
print(fruits)  # ["apple", "banana", "cherry"]

# Returns None (modifies in-place)
result = fruits.append("date")
print(result)  # None
print(fruits)  # ["apple", "banana", "cherry", "date"]

# Can append any type
mixed = [1, 2, 3]
mixed.append("four")
mixed.append([5, 6])
mixed.append({"key": "value"})
print(mixed)  # [1, 2, 3, "four", [5, 6], {"key": "value"}]

# Appending list adds it as single element
numbers = [1, 2, 3]
numbers.append([4, 5])
print(numbers)  # [1, 2, 3, [4, 5]] - nested!
```

## extend() - Add Multiple Elements

```python
# Extend with another list
numbers = [1, 2, 3]
numbers.extend([4, 5, 6])
print(numbers)  # [1, 2, 3, 4, 5, 6]

# vs append
numbers = [1, 2, 3]
numbers.append([4, 5, 6])
print(numbers)  # [1, 2, 3, [4, 5, 6]] - nested!

# Extend with any iterable
numbers = [1, 2]
numbers.extend(range(3, 6))
print(numbers)  # [1, 2, 3, 4, 5]

numbers.extend("abc")  # String is iterable
print(numbers)  # [1, 2, 3, 4, 5, 'a', 'b', 'c']

# Alternative: += operator
numbers = [1, 2, 3]
numbers += [4, 5, 6]
print(numbers)  # [1, 2, 3, 4, 5, 6]

# Chaining
numbers = [1]
numbers.extend([2, 3]).extend([4, 5])  # Error! extend() returns None
# Can't chain extend() calls
```

## insert() - Add at Position

```python
# Insert at specific index
fruits = ["apple", "cherry"]
fruits.insert(1, "banana")  # Insert at index 1
print(fruits)  # ["apple", "banana", "cherry"]

# Insert at beginning
numbers = [2, 3, 4]
numbers.insert(0, 1)
print(numbers)  # [1, 2, 3, 4]

# Insert at end (like append)
numbers.insert(len(numbers), 5)
print(numbers)  # [1, 2, 3, 4, 5]

# Insert beyond length - inserts at end
numbers = [1, 2, 3]
numbers.insert(100, 4)
print(numbers)  # [1, 2, 3, 4]

# Negative index
numbers = [1, 2, 3, 4]
numbers.insert(-1, 99)  # Insert before last element
print(numbers)  # [1, 2, 3, 99, 4]

# Performance note: O(n) - shifts elements
# Prefer append() if adding to end
```

## remove() - Remove First Matching Value

```python
# Remove first occurrence
fruits = ["apple", "banana", "cherry", "banana"]
fruits.remove("banana")
print(fruits)  # ["apple", "cherry", "banana"]

# Only removes first match
numbers = [1, 2, 3, 2, 4]
numbers.remove(2)
print(numbers)  # [1, 3, 2, 4]

# Error if not found
try:
    fruits.remove("grape")
except ValueError as e:
    print(f"Error: {e}")  # "list.remove(x): x not in list"

# Safe remove
def safe_remove(lst, value):
    """Remove value if it exists"""
    if value in lst:
        lst.remove(value)
        return True
    return False

fruits = ["apple", "banana"]
safe_remove(fruits, "banana")  # Removes
safe_remove(fruits, "grape")   # No error

# Remove all occurrences
def remove_all(lst, value):
    """Remove all occurrences of value"""
    while value in lst:
        lst.remove(value)

numbers = [1, 2, 3, 2, 4, 2]
remove_all(numbers, 2)
print(numbers)  # [1, 3, 4]

# Better: filter with list comprehension
numbers = [1, 2, 3, 2, 4, 2]
numbers = [x for x in numbers if x != 2]
print(numbers)  # [1, 3, 4]
```

## pop() - Remove and Return Element

```python
# Remove last element
numbers = [1, 2, 3, 4, 5]
last = numbers.pop()
print(last)    # 5
print(numbers) # [1, 2, 3, 4]

# Remove at specific index
numbers = [1, 2, 3, 4, 5]
middle = numbers.pop(2)
print(middle)  # 3
print(numbers) # [1, 2, 4, 5]

# Remove first element
first = numbers.pop(0)
print(first)   # 1
print(numbers) # [2, 4, 5]

# Negative index
numbers = [1, 2, 3, 4, 5]
second_last = numbers.pop(-2)
print(second_last)  # 4
print(numbers)      # [1, 2, 3, 5]

# Error on empty list
empty = []
try:
    empty.pop()
except IndexError:
    print("Cannot pop from empty list")

# Safe pop
def safe_pop(lst, index=-1, default=None):
    """Pop or return default"""
    try:
        return lst.pop(index)
    except IndexError:
        return default

numbers = []
value = safe_pop(numbers, default=0)
print(value)  # 0
```

## clear() - Remove All Elements

```python
# Remove all elements
numbers = [1, 2, 3, 4, 5]
numbers.clear()
print(numbers)  # []

# Equivalent to
numbers = [1, 2, 3]
numbers = []  # Creates new list
# But clear() modifies in-place

# Difference matters with references
original = [1, 2, 3]
reference = original

# Using clear()
original.clear()
print(original)   # []
print(reference)  # [] - also affected

# Using assignment
original = [1, 2, 3]
reference = original
original = []
print(original)   # []
print(reference)  # [1, 2, 3] - not affected!

# Alternative: del slice
numbers = [1, 2, 3]
del numbers[:]
print(numbers)  # []
```

## reverse() - Reverse In-Place

```python
# Reverse list
numbers = [1, 2, 3, 4, 5]
numbers.reverse()
print(numbers)  # [5, 4, 3, 2, 1]

# Returns None
result = numbers.reverse()
print(result)  # None

# vs reversed() function
numbers = [1, 2, 3, 4, 5]
rev = reversed(numbers)  # Returns iterator
print(list(rev))  # [5, 4, 3, 2, 1]
print(numbers)    # [1, 2, 3, 4, 5] - unchanged

# vs slicing
numbers = [1, 2, 3, 4, 5]
reversed_copy = numbers[::-1]
print(reversed_copy)  # [5, 4, 3, 2, 1]
print(numbers)        # [1, 2, 3, 4, 5] - unchanged
```

## sort() - Sort In-Place

```python
# Sort ascending
numbers = [3, 1, 4, 1, 5, 9, 2]
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 9]

# Sort descending
numbers.sort(reverse=True)
print(numbers)  # [9, 5, 4, 3, 2, 1, 1]

# Sort strings
fruits = ["cherry", "apple", "banana"]
fruits.sort()
print(fruits)  # ["apple", "banana", "cherry"]

# Case-insensitive sort
words = ["Banana", "apple", "Cherry"]
words.sort(key=str.lower)
print(words)  # ["apple", "Banana", "Cherry"]

# Sort by length
words = ["python", "is", "awesome"]
words.sort(key=len)
print(words)  # ["is", "python", "awesome"]

# Sort complex objects
people = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
]
people.sort(key=lambda x: x["age"])
print([p["name"] for p in people])  # ["Bob", "Alice", "Charlie"]

# vs sorted() function
numbers = [3, 1, 4]
sorted_copy = sorted(numbers)
print(sorted_copy)  # [1, 3, 4]
print(numbers)      # [3, 1, 4] - unchanged
```

## Del Statement

```python
# Delete by index
numbers = [1, 2, 3, 4, 5]
del numbers[2]
print(numbers)  # [1, 2, 4, 5]

# Delete slice
numbers = [1, 2, 3, 4, 5]
del numbers[1:4]
print(numbers)  # [1, 5]

# Delete with step
numbers = [1, 2, 3, 4, 5, 6]
del numbers[::2]  # Delete every other element
print(numbers)  # [2, 4, 6]

# Delete entire list variable
numbers = [1, 2, 3]
del numbers
# print(numbers)  # NameError: name 'numbers' is not defined

# Multiple deletes
data = [1, 2, 3, 4, 5]
del data[0], data[-1]  # Delete first, then last
print(data)  # [2, 3, 4]
```

## Index Assignment

```python
# Replace single element
numbers = [1, 2, 3, 4, 5]
numbers[2] = 99
print(numbers)  # [1, 2, 99, 4, 5]

# Replace with different type
mixed = [1, 2, 3]
mixed[1] = "two"
print(mixed)  # [1, "two", 3]

# Negative index
numbers = [1, 2, 3, 4, 5]
numbers[-1] = 99
print(numbers)  # [1, 2, 3, 4, 99]

# Update based on current value
numbers = [1, 2, 3, 4, 5]
numbers[0] = numbers[0] * 10
print(numbers)  # [10, 2, 3, 4, 5]

# Swap elements
numbers = [1, 2, 3, 4, 5]
numbers[0], numbers[4] = numbers[4], numbers[0]
print(numbers)  # [5, 2, 3, 4, 1]
```

## Slice Assignment

```python
# Replace slice with another list
numbers = [1, 2, 3, 4, 5]
numbers[1:4] = [20, 30, 40]
print(numbers)  # [1, 20, 30, 40, 5]

# Different lengths - list adjusts
numbers = [1, 2, 3, 4, 5]
numbers[1:4] = [99]  # Replace 3 elements with 1
print(numbers)  # [1, 99, 5]

numbers = [1, 2, 3]
numbers[1:2] = [20, 30, 40]  # Replace 1 element with 3
print(numbers)  # [1, 20, 30, 40, 3]

# Insert without removing
numbers = [1, 2, 3]
numbers[1:1] = [10, 20]  # Empty slice - just insert
print(numbers)  # [1, 10, 20, 2, 3]

# Clear slice
numbers = [1, 2, 3, 4, 5]
numbers[1:4] = []
print(numbers)  # [1, 5]

# Replace with different types
mixed = [1, 2, 3]
mixed[0:2] = ["a", "b"]
print(mixed)  # ["a", "b", 3]

# Extended slice assignment (same length required)
numbers = [1, 2, 3, 4, 5, 6]
numbers[::2] = [10, 30, 50]  # Replace every other
print(numbers)  # [10, 2, 30, 4, 50, 6]

# Wrong length raises error
try:
    numbers = [1, 2, 3, 4, 5]
    numbers[::2] = [10, 20]  # 3 positions, 2 values
except ValueError as e:
    print(f"Error: {e}")
```

## In-Place Operations

```python
# += (extend)
numbers = [1, 2, 3]
numbers += [4, 5]
print(numbers)  # [1, 2, 3, 4, 5]

# vs + (creates new list)
list1 = [1, 2]
list2 = list1 + [3, 4]
print(list1)  # [1, 2] - unchanged
print(list2)  # [1, 2, 3, 4]

# *= (repeat and extend)
numbers = [1, 2]
numbers *= 3
print(numbers)  # [1, 2, 1, 2, 1, 2]

# In-place with references
original = [1, 2, 3]
reference = original

original += [4, 5]
print(reference)  # [1, 2, 3, 4, 5] - affected!

# vs creating new list
original = [1, 2, 3]
reference = original

original = original + [4, 5]
print(reference)  # [1, 2, 3] - not affected!
```

## Modifying While Iterating (Dangerous!)

```python
# ❌ BAD - Modifying while iterating
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # Causes issues!
print(numbers)  # [1, 3, 4, 5] - Missed element 4!

# ✅ GOOD - Iterate over copy
numbers = [1, 2, 3, 4, 5]
for num in numbers[:]:  # Iterate over copy
    if num % 2 == 0:
        numbers.remove(num)
print(numbers)  # [1, 3, 5]

# ✅ BETTER - Use comprehension
numbers = [1, 2, 3, 4, 5]
numbers = [x for x in numbers if x % 2 != 0]
print(numbers)  # [1, 3, 5]

# ✅ GOOD - Iterate backward
numbers = [1, 2, 3, 4, 5]
for i in range(len(numbers) - 1, -1, -1):
    if numbers[i] % 2 == 0:
        del numbers[i]
print(numbers)  # [1, 3, 5]
```

## Performance Comparison

```python
import time

# append() vs insert(0)
def compare_append_vs_insert():
    n = 10000
    
    # append() - O(1) amortized
    start = time.time()
    numbers = []
    for i in range(n):
        numbers.append(i)
    append_time = time.time() - start
    
    # insert(0) - O(n) - shifts all elements
    start = time.time()
    numbers = []
    for i in range(n):
        numbers.insert(0, i)
    insert_time = time.time() - start
    
    print(f"append():    {append_time:.6f}s")
    print(f"insert(0):   {insert_time:.6f}s")
    print(f"Speedup:     {insert_time / append_time:.2f}x")

compare_append_vs_insert()
# append() is much faster!

# extend() vs +=
numbers1 = list(range(1000))
numbers2 = list(range(1000))

start = time.time()
numbers1.extend(range(1000))
extend_time = time.time() - start

start = time.time()
numbers2 += list(range(1000))
plus_time = time.time() - start

print(f"\nextend(): {extend_time:.6f}s")
print(f"+=:       {plus_time:.6f}s")
# Very similar performance
```

## Summary

**Mutation Methods:**

| Method | Returns | Operation | Time |
|--------|---------|-----------|------|
| `append(x)` | None | Add x to end | O(1) |
| `extend(iter)` | None | Add all from iter | O(k) |
| `insert(i, x)` | None | Insert x at i | O(n) |
| `remove(x)` | None | Remove first x | O(n) |
| `pop([i])` | Element | Remove & return | O(n) |
| `clear()` | None | Remove all | O(n) |
| `reverse()` | None | Reverse in-place | O(n) |
| `sort()` | None | Sort in-place | O(n log n) |

**Best Practices:**

- ✅ Use `append()` for adding to end (fast)
- ✅ Use `extend()` or `+=` for multiple elements
- ✅ Use list comprehension instead of modifying while iterating
- ✅ Remember these methods return `None`
- ❌ Don't modify list while iterating directly
- ❌ Don't use `insert(0, ...)` repeatedly (slow)
- ❌ Don't forget `sort()` sorts in-place

**Remember:** All these methods modify the list directly - they don't create copies!
