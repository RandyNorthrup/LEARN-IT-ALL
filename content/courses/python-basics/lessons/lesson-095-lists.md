---
id: lesson-095-lists
title: Python Lists
chapterId: ch8-lists
order: 1
duration: 30
objectives:
  - Understand what sequences are in Python and how lists fit in
  - Create lists using literals, list(), and range()
  - Master positive and negative indexing
  - Use core list methods for adding, removing, and modifying elements
  - Iterate over lists with for loops and enumerate()
  - Work with nested lists and understand list copying
  - Know when to use lists vs other data structures
---

# Python Lists

## What Are Sequences in Python?

A **sequence** is an ordered collection of items where each item has a position (index). Python has several sequence types — strings, tuples, ranges — but **lists** are by far the most versatile because they are **mutable**: you can add, remove, and change elements after creation.

Think of a list like a numbered row of boxes. Each box can hold any Python object, and you can open any box by its number, swap its contents, add new boxes, or remove boxes.

---

## Creating Lists

### Literal Syntax

```python
empty = []
primes = [2, 3, 5, 7, 11, 13]
colors = ["red", "green", "blue"]
mixed = [42, "hello", 3.14, True, None]
```

### The `list()` Constructor

```python
letters = list("Python")       # ['P', 'y', 't', 'h', 'o', 'n']
coords = list((10, 20, 30))   # [10, 20, 30]
digits = list(range(10))      # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### Creating with `range()`

```python
evens = list(range(0, 20, 2))      # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
countdown = list(range(10, 0, -1)) # [10, 9, 8, ..., 1]
```

---

## Indexing

### Positive Indexing (Left to Right, Starting at 0)

```python
fruits = ["apple", "banana", "cherry", "date", "elderberry"]
print(fruits[0])   # apple
print(fruits[1])   # banana
print(fruits[4])   # elderberry
```

### Negative Indexing (Right to Left)

```python
print(fruits[-1])  # elderberry
print(fruits[-2])  # date
print(fruits[-5])  # apple
```

Accessing an index that doesn't exist raises `IndexError`:

```python
print(fruits[10])  # IndexError: list index out of range
```

---

## `len()` and Membership with `in`

```python
numbers = [10, 20, 30, 40, 50]
print(len(numbers))       # 5

print(30 in numbers)      # True
print(99 in numbers)      # False
print(99 not in numbers)  # True
```

The `in` operator is the Pythonic way to check membership. It performs a linear search (O(n)), so for large datasets consider a `set`.

---

## List Mutability

Unlike strings and tuples, lists can be changed **in place**:

```python
scores = [85, 90, 78]
scores[2] = 95        # Change third element
scores.append(88)     # Add new element
print(scores)         # [85, 90, 95, 88]
```

**Aliasing warning** — assignment creates a reference, not a copy:

```python
a = [1, 2, 3]
b = a           # b points to the SAME list
b.append(4)
print(a)        # [1, 2, 3, 4]  — a changed too!
```

---

## Slicing

Extract sub-lists with `list[start:stop:step]`:

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(numbers[2:5])    # [2, 3, 4]
print(numbers[:3])     # [0, 1, 2]
print(numbers[7:])     # [7, 8, 9]
print(numbers[::2])    # [0, 2, 4, 6, 8]
print(numbers[::-1])   # [9, 8, 7, ..., 0]  — reversed
```

Slicing always returns a **new list**.

---

## Adding Elements

```python
fruits = ["apple", "banana"]

# append — add to end
fruits.append("cherry")           # ['apple', 'banana', 'cherry']

# insert — add at position
fruits.insert(1, "avocado")       # ['apple', 'avocado', 'banana', 'cherry']

# extend — add multiple items
fruits.extend(["date", "fig"])    # ['apple', 'avocado', 'banana', 'cherry', 'date', 'fig']
```

> **`append` vs `extend`:** `append` adds one item (even a list — it nests). `extend` unpacks each element.

```python
a = [1, 2]
a.append([3, 4])   # [1, 2, [3, 4]]

b = [1, 2]
b.extend([3, 4])   # [1, 2, 3, 4]
```

---

## Removing Elements

```python
colors = ["red", "green", "blue", "green"]

colors.remove("green")   # Remove first occurrence → ['red', 'blue', 'green']

last = colors.pop()      # Remove & return last → 'green'
first = colors.pop(0)    # Remove & return index 0 → 'red'
```

```python
nums = [10, 20, 30, 40, 50]
del nums[1]       # [10, 30, 40, 50]
del nums[1:3]     # [10, 50]

nums.clear()      # []
```

---

## Iterating Over Lists

### Direct Iteration (Preferred)

```python
for fruit in fruits:
    print(fruit)
```

### With Index Using `enumerate()`

```python
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Custom start
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
```

> Avoid `for i in range(len(fruits))` — direct iteration or `enumerate()` is more Pythonic.

---

## Useful List Methods

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

numbers.sort()                # Sort in place: [1, 1, 2, 3, 4, 5, 6, 9]
numbers.sort(reverse=True)    # Descending: [9, 6, 5, 4, 3, 2, 1, 1]
numbers.reverse()             # Reverse in place
print(numbers.count(1))       # 2
print(numbers.index(5))       # Index of first occurrence
```

> **`sort()` vs `sorted()`:** `sort()` modifies in place, returns `None`. `sorted()` returns a new list.

```python
original = [3, 1, 2]
new_list = sorted(original)
print(original)  # [3, 1, 2]  — unchanged
print(new_list)   # [1, 2, 3]
```

### Built-in Functions

```python
nums = [4, 8, 15, 16, 23, 42]
print(len(nums))   # 6
print(min(nums))   # 4
print(max(nums))   # 42
print(sum(nums))   # 108
```

---

## Nested Lists (2D Lists)

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(matrix[1][2])  # 6  — row 1, column 2

for row in matrix:
    for value in row:
        print(f"{value:3}", end="")
    print()
```

Use cases: game boards, spreadsheet data, pixel grids.

---

## Copying Lists: Shallow vs Deep

### Shallow Copy

```python
original = [1, 2, 3]
shallow = original.copy()    # or list(original) or original[:]
shallow[0] = 99
print(original)  # [1, 2, 3]  — unaffected
```

### When Shallow Isn't Enough

```python
nested = [[1, 2], [3, 4]]
shallow = nested.copy()
shallow[0][0] = 99
print(nested)  # [[99, 2], [3, 4]]  — inner list shared!
```

### Deep Copy

```python
import copy
nested = [[1, 2], [3, 4]]  # fresh list
deep = copy.deepcopy(nested)
deep[0][0] = 99
print(nested)  # [[1, 2], [3, 4]]  — fully independent
```

---

## Common List Patterns

### Filtering and Transforming

```python
scores = [45, 82, 67, 91, 55, 78]
passing = [s for s in scores if s >= 60]       # [82, 67, 91, 78]

names = ["alice", "bob"]
upper = [n.capitalize() for n in names]        # ['Alice', 'Bob']
```

### Flattening a 2D List

```python
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [num for row in matrix for num in row]  # [1, 2, 3, 4, 5, 6]
```

### Zipping Two Lists

```python
names = ["Alice", "Bob", "Charlie"]
scores = [95, 87, 92]
paired = list(zip(names, scores))  # [('Alice', 95), ('Bob', 87), ...]
```

### Remove Duplicates Preserving Order

```python
items = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
seen = set()
unique = []
for item in items:
    if item not in seen:
        seen.add(item)
        unique.append(item)
print(unique)  # [3, 1, 4, 5, 9, 2, 6]
```

---

## Lists vs Other Data Structures

| Feature | List | Tuple | Set | Dict |
|---------|------|-------|-----|------|
| Mutable | Yes | No | Yes | Yes |
| Ordered | Yes | Yes | No | Yes (3.7+) |
| Duplicates | Allowed | Allowed | No | Keys unique |
| Use case | General collection | Fixed data | Unique items | Key-value mapping |

**Use a list when** you need an ordered, changeable collection. Use a tuple for immutable data, a set for unique items with fast membership checks, and a dict for key-value lookups.

---

## Try It Yourself

1. **Reverse without built-ins:** Write a function that reverses a list without `.reverse()` or slicing.
2. **Second largest:** Find the second largest number in a list without using `sort()`.
3. **Matrix transpose:** Given a 2D list, write code to transpose it (rows become columns).
4. **Frequency count:** Count how many times each element appears in a list, storing results in a dictionary.

---

## Key Takeaways

- Lists are **ordered, mutable sequences** — Python's most versatile built-in collection.
- **Indexing** starts at 0; negative indices count from the end.
- Use **`append()`** to add one element, **`extend()`** to add many, **`insert()`** at a specific position.
- Use **`remove()`**, **`pop()`**, **`del`**, or **`clear()`** to delete elements.
- **`enumerate()`** is the Pythonic way to loop with an index.
- **Slicing** extracts sub-lists and always returns a new list.
- Assignment creates an **alias**, not a copy. Use `.copy()` for shallow copies and `copy.deepcopy()` for nested structures.
- **Nested lists** represent 2D data like grids and matrices.
- Know the differences between lists, tuples, sets, and dicts to choose the right tool.
