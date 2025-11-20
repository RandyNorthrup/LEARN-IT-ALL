---
id: "117-list-advanced-techniques"
title: "Advanced List Techniques"
chapterId: ch8-lists
order: 9
duration: 25
objectives:
  - Master advanced list operations
  - Learn functional programming patterns
  - Use itertools with lists
  - Write efficient list code
---

# Advanced List Techniques

Go beyond basics with powerful list manipulation techniques.

## List Unpacking

```python
# Basic unpacking
numbers = [1, 2, 3]
a, b, c = numbers
print(a, b, c)  # 1 2 3

# Extended unpacking with *
numbers = [1, 2, 3, 4, 5]
first, *middle, last = numbers
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5

# Unpack first few
numbers = [1, 2, 3, 4, 5]
first, second, *rest = numbers
print(first, second)  # 1 2
print(rest)           # [3, 4, 5]

# Unpack last few
numbers = [1, 2, 3, 4, 5]
*rest, second_last, last = numbers
print(rest)             # [1, 2, 3]
print(second_last, last) # 4 5

# Skip elements
numbers = [1, 2, 3, 4, 5]
first, *_, last = numbers
print(first, last)  # 1 5

# Nested unpacking
data = [(1, 2), (3, 4), (5, 6)]
[(a1, a2), (b1, b2), (c1, c2)] = data
print(a1, b2, c1)  # 1 4 5

# Unpack in for loop
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
for number, letter in pairs:
    print(f"{number}: {letter}")
```

## Map, Filter, Reduce

```python
from functools import reduce

# map() - transform each element
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Multiple iterables
list1 = [1, 2, 3]
list2 = [10, 20, 30]
sums = list(map(lambda x, y: x + y, list1, list2))
print(sums)  # [11, 22, 33]

# With function
def square(x):
    return x ** 2

squared = list(map(square, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# filter() - keep matching elements
numbers = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6]

# Filter None values
mixed = [1, None, 2, None, 3]
filtered = list(filter(None, mixed))
print(filtered)  # [1, 2, 3]

# reduce() - accumulate to single value
numbers = [1, 2, 3, 4, 5]
total = reduce(lambda x, y: x + y, numbers)
print(total)  # 15

# With initial value
total = reduce(lambda x, y: x + y, numbers, 10)
print(total)  # 25 (10 + 1 + 2 + 3 + 4 + 5)

# Product
product = reduce(lambda x, y: x * y, numbers)
print(product)  # 120

# Max value
numbers = [3, 1, 4, 1, 5, 9, 2]
maximum = reduce(lambda x, y: x if x > y else y, numbers)
print(maximum)  # 9

# Combine operations
numbers = [1, 2, 3, 4, 5, 6]
result = reduce(
    lambda x, y: x + y,
    map(lambda x: x**2, filter(lambda x: x % 2 == 0, numbers))
)
print(result)  # 56 (4 + 16 + 36)

# List comprehension equivalent (often clearer)
result = sum(x**2 for x in numbers if x % 2 == 0)
print(result)  # 56
```

## Itertools for Lists

```python
from itertools import *

# chain() - concatenate iterables
list1 = [1, 2, 3]
list2 = [4, 5, 6]
list3 = [7, 8, 9]
combined = list(chain(list1, list2, list3))
print(combined)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Flatten nested lists
nested = [[1, 2], [3, 4], [5, 6]]
flattened = list(chain.from_iterable(nested))
print(flattened)  # [1, 2, 3, 4, 5, 6]

# islice() - slice iterator
numbers = range(100)
first_10 = list(islice(numbers, 10))
print(first_10)  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

middle = list(islice(numbers, 10, 20))
print(middle)  # [10, 11, ..., 19]

every_other = list(islice(numbers, 0, 20, 2))
print(every_other)  # [0, 2, 4, ..., 18]

# cycle() - repeat indefinitely
colors = ['red', 'green', 'blue']
cycled = islice(cycle(colors), 10)
print(list(cycled))
# ['red', 'green', 'blue', 'red', 'green', 'blue', 'red', 'green', 'blue', 'red']

# repeat() - repeat value
repeated = list(repeat('x', 5))
print(repeated)  # ['x', 'x', 'x', 'x', 'x']

# accumulate() - running totals
numbers = [1, 2, 3, 4, 5]
running_sum = list(accumulate(numbers))
print(running_sum)  # [1, 3, 6, 10, 15]

# With operation
running_product = list(accumulate(numbers, lambda x, y: x * y))
print(running_product)  # [1, 2, 6, 24, 120]

# Running maximum
numbers = [3, 1, 4, 1, 5, 9, 2]
running_max = list(accumulate(numbers, max))
print(running_max)  # [3, 3, 4, 4, 5, 9, 9]

# compress() - filter with boolean mask
letters = ['a', 'b', 'c', 'd', 'e']
mask = [1, 0, 1, 0, 1]
filtered = list(compress(letters, mask))
print(filtered)  # ['a', 'c', 'e']

# dropwhile() - drop until condition false
numbers = [1, 2, 3, 4, 5, 6]
result = list(dropwhile(lambda x: x < 4, numbers))
print(result)  # [4, 5, 6]

# takewhile() - take until condition false
result = list(takewhile(lambda x: x < 4, numbers))
print(result)  # [1, 2, 3]

# groupby() - group consecutive equal elements
data = [1, 1, 2, 2, 2, 3, 3, 1]
groups = [(k, list(g)) for k, g in groupby(data)]
print(groups)  # [(1, [1, 1]), (2, [2, 2, 2]), (3, [3, 3]), (1, [1])]

# pairwise() - adjacent pairs (Python 3.10+)
try:
    numbers = [1, 2, 3, 4, 5]
    pairs = list(pairwise(numbers))
    print(pairs)  # [(1, 2), (2, 3), (3, 4), (4, 5)]
except NameError:
    # Manual pairwise
    pairs = list(zip(numbers, numbers[1:]))
    print(pairs)

# combinations() - all combinations
from itertools import combinations

numbers = [1, 2, 3]
combos = list(combinations(numbers, 2))
print(combos)  # [(1, 2), (1, 3), (2, 3)]

# permutations() - all permutations
from itertools import permutations

numbers = [1, 2, 3]
perms = list(permutations(numbers, 2))
print(perms)  # [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]

# product() - cartesian product
list1 = [1, 2]
list2 = ['a', 'b']
prod = list(product(list1, list2))
print(prod)  # [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]
```

## List as Stack and Queue

```python
# Stack (LIFO - Last In First Out)
stack = []

# Push
stack.append(1)
stack.append(2)
stack.append(3)
print(stack)  # [1, 2, 3]

# Pop
top = stack.pop()
print(top)    # 3
print(stack)  # [1, 2]

# Peek
if stack:
    top = stack[-1]
    print(top)  # 2

# Stack class
class Stack:
    def __init__(self):
        self._items = []
    
    def push(self, item):
        self._items.append(item)
    
    def pop(self):
        if not self.is_empty():
            return self._items.pop()
        raise IndexError("Pop from empty stack")
    
    def peek(self):
        if not self.is_empty():
            return self._items[-1]
        raise IndexError("Peek from empty stack")
    
    def is_empty(self):
        return len(self._items) == 0
    
    def size(self):
        return len(self._items)

# Queue (FIFO - First In First Out)
# ⚠️ Using list as queue is inefficient!
queue = []

# Enqueue (inefficient - O(n))
queue.insert(0, 1)  # Shifts all elements!
queue.insert(0, 2)
queue.insert(0, 3)

# Use collections.deque instead
from collections import deque

queue = deque()

# Enqueue (efficient - O(1))
queue.append(1)
queue.append(2)
queue.append(3)
print(list(queue))  # [1, 2, 3]

# Dequeue
first = queue.popleft()
print(first)        # 1
print(list(queue))  # [2, 3]

# Peek
if queue:
    first = queue[0]
    print(first)  # 2
```

## Flatten Nested Lists

```python
# Flatten one level
nested = [[1, 2], [3, 4], [5, 6]]
flattened = [item for sublist in nested for item in sublist]
print(flattened)  # [1, 2, 3, 4, 5, 6]

# Using itertools
from itertools import chain
flattened = list(chain.from_iterable(nested))
print(flattened)  # [1, 2, 3, 4, 5, 6]

# Flatten arbitrarily nested
def flatten(nested_list):
    """Recursively flatten nested list"""
    result = []
    for item in nested_list:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result

deeply_nested = [1, [2, [3, [4, 5]], 6], 7, [8, 9]]
flattened = flatten(deeply_nested)
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Generator version (memory efficient)
def flatten_gen(nested_list):
    """Generator to flatten nested list"""
    for item in nested_list:
        if isinstance(item, list):
            yield from flatten_gen(item)
        else:
            yield item

flattened = list(flatten_gen(deeply_nested))
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Partition List

```python
# Partition by condition
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

evens = [x for x in numbers if x % 2 == 0]
odds = [x for x in numbers if x % 2 != 0]
print(evens)  # [2, 4, 6, 8, 10]
print(odds)   # [1, 3, 5, 7, 9]

# More efficient - single pass
def partition(lst, condition):
    """Partition list by condition"""
    true_items = []
    false_items = []
    for item in lst:
        if condition(item):
            true_items.append(item)
        else:
            false_items.append(item)
    return true_items, false_items

evens, odds = partition(numbers, lambda x: x % 2 == 0)
print(evens)  # [2, 4, 6, 8, 10]
print(odds)   # [1, 3, 5, 7, 9]

# Multiple partitions
def partition_multi(lst, *conditions):
    """Partition by multiple conditions"""
    partitions = [[] for _ in range(len(conditions) + 1)]
    for item in lst:
        for i, condition in enumerate(conditions):
            if condition(item):
                partitions[i].append(item)
                break
        else:
            partitions[-1].append(item)
    return partitions

numbers = list(range(1, 21))
small, medium, large = partition_multi(
    numbers,
    lambda x: x < 7,
    lambda x: x < 14
)
print(small)   # [1, 2, 3, 4, 5, 6]
print(medium)  # [7, 8, 9, 10, 11, 12, 13]
print(large)   # [14, 15, 16, 17, 18, 19, 20]
```

## Rotate List

```python
# Rotate right
def rotate_right(lst, n):
    """Rotate list n positions to the right"""
    if not lst:
        return lst
    n = n % len(lst)  # Handle n > len
    return lst[-n:] + lst[:-n]

numbers = [1, 2, 3, 4, 5]
rotated = rotate_right(numbers, 2)
print(rotated)  # [4, 5, 1, 2, 3]

# Rotate left
def rotate_left(lst, n):
    """Rotate list n positions to the left"""
    if not lst:
        return lst
    n = n % len(lst)
    return lst[n:] + lst[:n]

rotated = rotate_left(numbers, 2)
print(rotated)  # [3, 4, 5, 1, 2]

# In-place rotation with deque
from collections import deque

numbers = deque([1, 2, 3, 4, 5])
numbers.rotate(2)  # Rotate right
print(list(numbers))  # [4, 5, 1, 2, 3]

numbers.rotate(-2)  # Rotate left
print(list(numbers))  # [1, 2, 3, 4, 5]
```

## Remove Duplicates

```python
# Remove duplicates (preserves order)
numbers = [1, 2, 3, 2, 4, 3, 5, 1]

# Method 1: dict.fromkeys()
unique = list(dict.fromkeys(numbers))
print(unique)  # [1, 2, 3, 4, 5]

# Method 2: set (doesn't preserve order)
unique = list(set(numbers))
print(sorted(unique))  # [1, 2, 3, 4, 5]

# Method 3: manual (preserves order)
def remove_duplicates(lst):
    """Remove duplicates preserving order"""
    seen = set()
    result = []
    for item in lst:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

unique = remove_duplicates(numbers)
print(unique)  # [1, 2, 3, 4, 5]

# For unhashable elements (like dicts)
data = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
    {"id": 1, "name": "Alice"}
]

def remove_duplicates_unhashable(lst, key):
    """Remove duplicates by key function"""
    seen = set()
    result = []
    for item in lst:
        k = key(item)
        if k not in seen:
            seen.add(k)
            result.append(item)
    return result

unique = remove_duplicates_unhashable(data, lambda x: x["id"])
print(unique)
# [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]
```

## Interleave Lists

```python
# Interleave two lists
list1 = [1, 2, 3]
list2 = ['a', 'b', 'c']

# Method 1: zip and flatten
interleaved = [item for pair in zip(list1, list2) for item in pair]
print(interleaved)  # [1, 'a', 2, 'b', 3, 'c']

# Method 2: chain and zip
from itertools import chain
interleaved = list(chain.from_iterable(zip(list1, list2)))
print(interleaved)  # [1, 'a', 2, 'b', 3, 'c']

# Method 3: manual
def interleave(lst1, lst2):
    """Interleave two lists"""
    result = []
    for item1, item2 in zip(lst1, lst2):
        result.append(item1)
        result.append(item2)
    return result

# Handle unequal lengths
def interleave_all(*lists):
    """Interleave multiple lists of any length"""
    from itertools import zip_longest
    result = []
    for items in zip_longest(*lists):
        for item in items:
            if item is not None:
                result.append(item)
    return result

list1 = [1, 2, 3, 4]
list2 = ['a', 'b']
interleaved = interleave_all(list1, list2)
print(interleaved)  # [1, 'a', 2, 'b', 3, 4]
```

## Summary

**Advanced Patterns:**

| Pattern | Technique | Use Case |
|---------|-----------|----------|
| Unpacking | `first, *middle, last = lst` | Extract parts |
| Map/Filter | `map()`, `filter()` | Transform/filter |
| Reduce | `reduce()` | Accumulate |
| Flatten | `chain.from_iterable()` | Nested lists |
| Partition | Custom function | Split by condition |
| Rotate | Slicing or `deque.rotate()` | Circular shift |
| Deduplicate | `dict.fromkeys()` | Remove duplicates |
| Interleave | `zip()` + `chain()` | Merge alternating |

**Best Practices:**

- ✅ Use comprehensions for clarity
- ✅ Use `itertools` for complex operations
- ✅ Use `deque` for queue operations
- ✅ Preserve order when removing duplicates if needed
- ✅ Consider memory with generators for large data
- ❌ Don't use list as queue (use `deque`)
- ❌ Don't reinvent itertools functions

**Remember:** Python's standard library has powerful tools - learn them!
