---
id: "115-list-sorting-searching"
title: "Sorting and Searching Lists"
chapterId: ch8-lists
order: 7
duration: 30
objectives:
  - Master list sorting techniques
  - Understand search algorithms
  - Learn custom sort keys
  - Optimize sorting and searching
---

# Sorting and Searching Lists

Sorting and searching are fundamental operations. Understanding how to do them efficiently is essential.

## Basic Sorting

```python
# sort() - modifies list in-place
numbers = [3, 1, 4, 1, 5, 9, 2]
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 9]

# sorted() - returns new sorted list
numbers = [3, 1, 4, 1, 5, 9, 2]
sorted_numbers = sorted(numbers)
print(sorted_numbers)  # [1, 1, 2, 3, 4, 5, 9]
print(numbers)         # [3, 1, 4, 1, 5, 9, 2] - unchanged

# When to use each
# Use sort() when you want to modify the list
# Use sorted() when you want to keep the original
```

## Reverse Sorting

```python
# Reverse parameter
numbers = [3, 1, 4, 1, 5, 9, 2]
numbers.sort(reverse=True)
print(numbers)  # [9, 5, 4, 3, 2, 1, 1]

# sorted() with reverse
numbers = [3, 1, 4, 1, 5, 9, 2]
descending = sorted(numbers, reverse=True)
print(descending)  # [9, 5, 4, 3, 2, 1, 1]

# String sorting
words = ["cherry", "apple", "banana"]
words.sort(reverse=True)
print(words)  # ['cherry', 'banana', 'apple']
```

## Sorting with Key Functions

```python
# Sort by length
words = ["python", "is", "awesome"]
words.sort(key=len)
print(words)  # ['is', 'python', 'awesome']

# Case-insensitive sort
words = ["Banana", "apple", "Cherry"]
words.sort(key=str.lower)
print(words)  # ['apple', 'Banana', 'Cherry']

# Sort by last character
words = ["apple", "banana", "cherry"]
words.sort(key=lambda x: x[-1])
print(words)  # ['apple', 'banana', 'cherry']

# Sort by absolute value
numbers = [-5, 2, -8, 3, -1]
numbers.sort(key=abs)
print(numbers)  # [-1, 2, 3, -5, -8]

# Multiple criteria - sort by length, then alphabetically
words = ["is", "python", "awesome", "hi"]
words.sort(key=lambda x: (len(x), x))
print(words)  # ['hi', 'is', 'awesome', 'python']
```

## Sorting Complex Objects

```python
# Sort dictionaries
people = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
]

# Sort by age
people.sort(key=lambda x: x["age"])
for person in people:
    print(f"{person['name']}: {person['age']}")
# Bob: 25
# Alice: 30
# Charlie: 35

# Sort by name
people.sort(key=lambda x: x["name"])
print([p["name"] for p in people])  # ['Alice', 'Bob', 'Charlie']

# Sort tuples
data = [(3, 'c'), (1, 'a'), (2, 'b')]
data.sort()  # Sorts by first element, then second
print(data)  # [(1, 'a'), (2, 'b'), (3, 'c')]

# Sort by second element
data.sort(key=lambda x: x[1])
print(data)  # [(1, 'a'), (2, 'b'), (3, 'c')]

# Sort objects
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    
    def __repr__(self):
        return f"Student({self.name}, {self.grade})"

students = [
    Student("Alice", 85),
    Student("Bob", 92),
    Student("Charlie", 78)
]

students.sort(key=lambda s: s.grade, reverse=True)
print(students)
# [Student(Bob, 92), Student(Alice, 85), Student(Charlie, 78)]
```

## Custom Sorting with operator Module

```python
from operator import itemgetter, attrgetter

# itemgetter for lists/tuples/dicts
people = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
]

people.sort(key=itemgetter("age"))
print([p["name"] for p in people])  # ['Bob', 'Alice', 'Charlie']

# Multiple keys
data = [
    {"category": "B", "value": 2},
    {"category": "A", "value": 3},
    {"category": "A", "value": 1},
    {"category": "B", "value": 1}
]

data.sort(key=itemgetter("category", "value"))
for item in data:
    print(item)
# {'category': 'A', 'value': 1}
# {'category': 'A', 'value': 3}
# {'category': 'B', 'value': 1}
# {'category': 'B', 'value': 2}

# attrgetter for objects
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __repr__(self):
        return f"Person({self.name}, {self.age})"

people = [Person("Alice", 30), Person("Bob", 25), Person("Charlie", 35)]
people.sort(key=attrgetter("age"))
print(people)
# [Person(Bob, 25), Person(Alice, 30), Person(Charlie, 35)]

# Multiple attributes
people.sort(key=attrgetter("age", "name"))
```

## Stable Sorting

```python
# Python's sort is stable - maintains relative order
data = [
    ("Alice", 30),
    ("Bob", 25),
    ("Charlie", 30),
    ("David", 25)
]

# Sort by age (second element)
data.sort(key=lambda x: x[1])
print(data)
# [('Bob', 25), ('David', 25), ('Alice', 30), ('Charlie', 30)]
# Bob and David maintain their relative order
# Alice and Charlie maintain their relative order

# Use stability for multi-level sorting
# Sort by secondary key first, then primary
students = [
    ("Alice", "B", 85),
    ("Bob", "A", 85),
    ("Charlie", "B", 90),
    ("David", "A", 90)
]

# First sort by grade
students.sort(key=lambda x: x[2], reverse=True)
# Then sort by section (stable - preserves grade order within sections)
students.sort(key=lambda x: x[1])

for student in students:
    print(student)
# ('Bob', 'A', 90)
# ('David', 'A', 90)
# ('Charlie', 'B', 90)
# ('Alice', 'B', 85)
```

## Linear Search

```python
# Find element
def linear_search(lst, target):
    """Return index of target or -1"""
    for i, value in enumerate(lst):
        if value == target:
            return i
    return -1

numbers = [3, 1, 4, 1, 5, 9, 2]
print(linear_search(numbers, 5))  # 4
print(linear_search(numbers, 7))  # -1

# Find all occurrences
def find_all(lst, target):
    """Return list of all indices where target appears"""
    return [i for i, value in enumerate(lst) if value == target]

numbers = [1, 2, 3, 2, 4, 2]
print(find_all(numbers, 2))  # [1, 3, 5]

# Find first matching condition
def find_first(lst, condition):
    """Return first element matching condition"""
    for item in lst:
        if condition(item):
            return item
    return None

numbers = [1, 3, 5, 8, 9]
first_even = find_first(numbers, lambda x: x % 2 == 0)
print(first_even)  # 8

# Using next() with generator
numbers = [1, 3, 5, 8, 9]
first_even = next((x for x in numbers if x % 2 == 0), None)
print(first_even)  # 8

# Find with index
def find_index(lst, condition):
    """Return index of first element matching condition"""
    for i, item in enumerate(lst):
        if condition(item):
            return i
    return -1

numbers = [1, 3, 5, 8, 9]
index = find_index(numbers, lambda x: x % 2 == 0)
print(index)  # 3
```

## Binary Search

```python
# Binary search (requires sorted list)
def binary_search(sorted_list, target):
    """Return index of target in sorted list or -1"""
    left, right = 0, len(sorted_list) - 1
    
    while left <= right:
        mid = (left + right) // 2
        mid_value = sorted_list[mid]
        
        if mid_value == target:
            return mid
        elif mid_value < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
print(binary_search(numbers, 5))  # 4
print(binary_search(numbers, 7))  # 6
print(binary_search(numbers, 10)) # -1

# Using bisect module
import bisect

numbers = [1, 3, 5, 7, 9]

# Find insertion point
index = bisect.bisect_left(numbers, 5)
print(index)  # 2 - index where 5 would be inserted

index = bisect.bisect_left(numbers, 6)
print(index)  # 3 - index where 6 would be inserted

# Insert and maintain sorted order
bisect.insort(numbers, 6)
print(numbers)  # [1, 3, 5, 6, 7, 9]

# Check if element exists
def binary_contains(sorted_list, target):
    """Check if target is in sorted list"""
    i = bisect.bisect_left(sorted_list, target)
    return i < len(sorted_list) and sorted_list[i] == target

print(binary_contains(numbers, 6))   # True
print(binary_contains(numbers, 10))  # False
```

## Finding Min/Max

```python
# Simple min/max
numbers = [3, 1, 4, 1, 5, 9, 2]
print(min(numbers))  # 1
print(max(numbers))  # 9

# With key function
words = ["python", "is", "awesome"]
shortest = min(words, key=len)
longest = max(words, key=len)
print(shortest)  # "is"
print(longest)   # "awesome"

# Find min/max with index
numbers = [3, 1, 4, 1, 5, 9, 2]

min_value = min(numbers)
min_index = numbers.index(min_value)
print(f"Min {min_value} at index {min_index}")  # Min 1 at index 1

max_value = max(numbers)
max_index = numbers.index(max_value)
print(f"Max {max_value} at index {max_index}")  # Max 9 at index 5

# Or use enumerate
min_index, min_value = min(enumerate(numbers), key=lambda x: x[1])
max_index, max_value = max(enumerate(numbers), key=lambda x: x[1])
print(f"Min {min_value} at index {min_index}")  # Min 1 at index 1
print(f"Max {max_value} at index {max_index}")  # Max 9 at index 5

# Complex objects
people = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
]

youngest = min(people, key=lambda x: x["age"])
oldest = max(people, key=lambda x: x["age"])
print(youngest["name"])  # Bob
print(oldest["name"])    # Charlie
```

## Counting and Frequency

```python
# Count occurrences
numbers = [1, 2, 3, 2, 4, 2, 5]
count = numbers.count(2)
print(count)  # 3

# Frequency of all elements
from collections import Counter

numbers = [1, 2, 3, 2, 4, 2, 5, 1]
freq = Counter(numbers)
print(freq)  # Counter({2: 3, 1: 2, 3: 1, 4: 1, 5: 1})

# Most common
print(freq.most_common(2))  # [(2, 3), (1, 2)]

# Manual frequency count
def count_frequency(lst):
    """Return dictionary of element frequencies"""
    freq = {}
    for item in lst:
        freq[item] = freq.get(item, 0) + 1
    return freq

numbers = [1, 2, 3, 2, 4, 2, 5, 1]
print(count_frequency(numbers))
# {1: 2, 2: 3, 3: 1, 4: 1, 5: 1}

# Find duplicates
def find_duplicates(lst):
    """Return list of duplicate elements"""
    freq = Counter(lst)
    return [item for item, count in freq.items() if count > 1]

numbers = [1, 2, 3, 2, 4, 2, 5, 1]
print(find_duplicates(numbers))  # [1, 2]
```

## Filtering and Selecting

```python
# Filter with comprehension
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in numbers if x % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]

# filter() function
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

# Select top N
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
top_3 = sorted(numbers, reverse=True)[:3]
print(top_3)  # [9, 6, 5]

# Using heapq for efficiency (O(n log k) vs O(n log n))
import heapq

numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
top_3 = heapq.nlargest(3, numbers)
print(top_3)  # [9, 6, 5]

bottom_3 = heapq.nsmallest(3, numbers)
print(bottom_3)  # [1, 1, 2]

# Top N with key
people = [
    {"name": "Alice", "score": 85},
    {"name": "Bob", "score": 92},
    {"name": "Charlie", "score": 78},
    {"name": "David", "score": 95}
]

top_scorers = heapq.nlargest(2, people, key=lambda x: x["score"])
print([p["name"] for p in top_scorers])  # ['David', 'Bob']
```

## Performance Comparison

```python
import time

# Linear vs binary search
n = 100000
sorted_list = list(range(n))

# Linear search
target = n - 1
start = time.time()
index = sorted_list.index(target)
linear_time = time.time() - start

# Binary search
start = time.time()
index = binary_search(sorted_list, target)
binary_time = time.time() - start

print(f"Linear: {linear_time:.8f}s")
print(f"Binary: {binary_time:.8f}s")
print(f"Speedup: {linear_time / binary_time:.2f}x")

# Sort vs sorted for already sorted list
numbers = list(range(10000))

start = time.time()
numbers.sort()
sort_time = time.time() - start

numbers = list(range(10000))
start = time.time()
result = sorted(numbers)
sorted_time = time.time() - start

print(f"\nsort():   {sort_time:.8f}s")
print(f"sorted(): {sorted_time:.8f}s")
# Very similar - Python's Timsort is optimized for partially sorted data
```

## Summary

**Sorting:**

| Method | In-Place | Returns | Use When |
|--------|----------|---------|----------|
| `list.sort()` | Yes | None | Modify original |
| `sorted()` | No | New list | Keep original |
| `reversed()` | No | Iterator | Iterate reverse |

**Searching:**

| Algorithm | Complexity | Requirements | Best For |
|-----------|------------|--------------|----------|
| Linear | O(n) | None | Unsorted, small lists |
| Binary | O(log n) | Sorted list | Large sorted lists |
| `in` | O(n) | None | Simple membership |
| `index()` | O(n) | None | Find position |

**Best Practices:**

- ✅ Use `sorted()` to keep original list
- ✅ Use `key` parameter instead of `lambda` when possible
- ✅ Use binary search for large sorted lists
- ✅ Use `Counter` for frequency counting
- ✅ Use `heapq.nlargest/nsmallest` for top-N selections
- ❌ Don't sort unnecessarily
- ❌ Don't use linear search on large sorted lists
- ❌ Don't forget sort() returns None

**Remember:** Python's sorting is stable and very fast (Timsort algorithm)!
