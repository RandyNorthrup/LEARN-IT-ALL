---
id: "102-loop-patterns"
title: "Common Loop Patterns and Idioms"
chapterId: ch5-loops
order: 13
duration: 25
objectives:
  - Master common Python loop patterns
  - Learn Pythonic iteration idioms
  - Recognize and apply design patterns
  - Write more expressive and efficient loops
---

# Common Loop Patterns and Idioms

Python has elegant patterns for common loop tasks. Learning these idioms makes your code more readable and Pythonic.

## Counter Pattern

```python
# Count occurrences
def count_occurrences(items, target):
    """Count how many times target appears."""
    count = 0
    for item in items:
        if item == target:
            count += 1
    return count

numbers = [1, 2, 3, 2, 1, 2, 4, 2]
print(count_occurrences(numbers, 2))  # 4

# Better: Use list.count()
print(numbers.count(2))  # 4

# Count multiple values
words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1

print(counts)
# {'apple': 3, 'banana': 2, 'cherry': 1}

# Best: Use Counter from collections
from collections import Counter
counts = Counter(words)
print(counts)
# Counter({'apple': 3, 'banana': 2, 'cherry': 1})
print(counts['apple'])  # 3
print(counts.most_common(2))  # [('apple', 3), ('banana', 2)]
```

## Accumulator Pattern

```python
# Sum pattern
def sum_numbers(numbers):
    """Sum all numbers."""
    total = 0
    for num in numbers:
        total += num
    return total

# Better: Use built-in sum()
numbers = [1, 2, 3, 4, 5]
print(sum(numbers))  # 15

# Product pattern
def product(numbers):
    """Multiply all numbers."""
    result = 1
    for num in numbers:
        result *= num
    return result

print(product([2, 3, 4]))  # 24

# String concatenation pattern
def join_words(words):
    """Join words with separator."""
    result = ""
    for word in words:
        result += word + " "
    return result.strip()

# Better: Use join()
words = ['hello', 'world', 'python']
print(" ".join(words))  # hello world python

# List building pattern
squares = []
for i in range(10):
    squares.append(i * i)

# Better: Use list comprehension
squares = [i * i for i in range(10)]
print(squares)
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

## Search Pattern

```python
# Linear search - find first match
def find_first(items, target):
    """Find first occurrence of target."""
    for item in items:
        if item == target:
            return item
    return None

numbers = [1, 3, 5, 7, 9, 11]
print(find_first(numbers, 7))  # 7

# Better: Use 'in' operator or try-except
if 7 in numbers:
    print("Found!")

# Find with index
def find_index(items, target):
    """Find index of first occurrence."""
    for i, item in enumerate(items):
        if item == target:
            return i
    return -1

print(find_index(numbers, 9))  # 4

# Better: Use list.index() with try-except
try:
    index = numbers.index(9)
    print(index)  # 4
except ValueError:
    print("Not found")

# Find all matches
def find_all(items, target):
    """Find all occurrences."""
    matches = []
    for item in items:
        if item == target:
            matches.append(item)
    return matches

# Better: Use list comprehension
numbers = [1, 2, 3, 2, 1, 2, 4]
matches = [x for x in numbers if x == 2]
print(matches)  # [2, 2, 2]

# Find with condition
def find_first_even(numbers):
    """Find first even number."""
    for num in numbers:
        if num % 2 == 0:
            return num
    return None

print(find_first_even([1, 3, 5, 8, 9]))  # 8

# Using next() with generator
numbers = [1, 3, 5, 8, 9]
first_even = next((x for x in numbers if x % 2 == 0), None)
print(first_even)  # 8
```

## Filter Pattern

```python
# Filter items based on condition
def filter_evens(numbers):
    """Keep only even numbers."""
    result = []
    for num in numbers:
        if num % 2 == 0:
            result.append(num)
    return result

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(filter_evens(numbers))  # [2, 4, 6, 8, 10]

# Better: List comprehension
evens = [x for x in numbers if x % 2 == 0]
print(evens)

# Best: Use filter()
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)

# Filter with multiple conditions
def filter_valid_ages(ages):
    """Filter ages between 18 and 65."""
    return [age for age in ages if 18 <= age <= 65]

ages = [15, 25, 30, 70, 45, 10, 55]
print(filter_valid_ages(ages))  # [25, 30, 45, 55]

# Filter and transform
def get_even_squares(numbers):
    """Get squares of even numbers."""
    return [x * x for x in numbers if x % 2 == 0]

print(get_even_squares([1, 2, 3, 4, 5, 6]))
# [4, 16, 36]
```

## Map/Transform Pattern

```python
# Transform each element
def square_all(numbers):
    """Square each number."""
    result = []
    for num in numbers:
        result.append(num * num)
    return result

# Better: List comprehension
numbers = [1, 2, 3, 4, 5]
squares = [x * x for x in numbers]
print(squares)  # [1, 4, 9, 16, 25]

# Best: Use map()
squares = list(map(lambda x: x * x, numbers))
print(squares)

# Transform with function
def uppercase_all(words):
    """Convert all to uppercase."""
    return [word.upper() for word in words]

words = ['hello', 'world', 'python']
print(uppercase_all(words))
# ['HELLO', 'WORLD', 'PYTHON']

# Using map with method
upper = list(map(str.upper, words))
print(upper)

# Transform with condition (conditional expression)
def adjust_numbers(numbers):
    """Double evens, triple odds."""
    return [x * 2 if x % 2 == 0 else x * 3 for x in numbers]

numbers = [1, 2, 3, 4, 5, 6]
print(adjust_numbers(numbers))
# [3, 4, 9, 8, 15, 12]
```

## Group/Partition Pattern

```python
# Partition into two groups
def partition_by_sign(numbers):
    """Separate positive and negative."""
    positive = []
    negative = []
    for num in numbers:
        if num >= 0:
            positive.append(num)
        else:
            negative.append(num)
    return positive, negative

numbers = [1, -2, 3, -4, 5, -6, 0]
pos, neg = partition_by_sign(numbers)
print(f"Positive: {pos}")  # [1, 3, 5, 0]
print(f"Negative: {neg}")  # [-2, -4, -6]

# Better: List comprehensions
positive = [x for x in numbers if x >= 0]
negative = [x for x in numbers if x < 0]

# Group by key
def group_by_length(words):
    """Group words by their length."""
    groups = {}
    for word in words:
        length = len(word)
        if length not in groups:
            groups[length] = []
        groups[length].append(word)
    return groups

words = ['a', 'ab', 'abc', 'bc', 'def', 'x']
grouped = group_by_length(words)
print(grouped)
# {1: ['a', 'x'], 2: ['ab', 'bc'], 3: ['abc', 'def']}

# Better: Use defaultdict
from collections import defaultdict

def group_by_length_better(words):
    """Group using defaultdict."""
    groups = defaultdict(list)
    for word in words:
        groups[len(word)].append(word)
    return dict(groups)

# Best: Use itertools.groupby (for sorted data)
from itertools import groupby

words_sorted = sorted(words, key=len)
grouped = {k: list(v) for k, v in groupby(words_sorted, key=len)}
print(grouped)
```

## Min/Max Pattern

```python
# Find minimum value
def find_min(numbers):
    """Find minimum number."""
    if not numbers:
        return None
    
    minimum = numbers[0]
    for num in numbers:
        if num < minimum:
            minimum = num
    return minimum

# Better: Use built-in min()
numbers = [5, 2, 8, 1, 9, 3]
print(min(numbers))  # 1

# Find maximum with index
def find_max_index(numbers):
    """Find index of maximum value."""
    if not numbers:
        return -1
    
    max_val = numbers[0]
    max_idx = 0
    for i, num in enumerate(numbers):
        if num > max_val:
            max_val = num
            max_idx = i
    return max_idx

print(find_max_index(numbers))  # 4 (value 9)

# Better: Use max with enumerate
max_idx = max(range(len(numbers)), key=lambda i: numbers[i])
print(max_idx)  # 4

# Or use index of max value
max_val = max(numbers)
max_idx = numbers.index(max_val)
print(max_idx)  # 4

# Find min/max with custom key
students = [
    {'name': 'Alice', 'grade': 85},
    {'name': 'Bob', 'grade': 92},
    {'name': 'Charlie', 'grade': 78},
]

best_student = max(students, key=lambda s: s['grade'])
print(best_student)
# {'name': 'Bob', 'grade': 92}

worst_student = min(students, key=lambda s: s['grade'])
print(worst_student)
# {'name': 'Charlie', 'grade': 78}
```

## Running Calculation Pattern

```python
# Running sum (cumulative sum)
def running_sum(numbers):
    """Calculate running sum."""
    result = []
    total = 0
    for num in numbers:
        total += num
        result.append(total)
    return result

numbers = [1, 2, 3, 4, 5]
print(running_sum(numbers))
# [1, 3, 6, 10, 15]

# Using itertools.accumulate
from itertools import accumulate
print(list(accumulate(numbers)))
# [1, 3, 6, 10, 15]

# Running average
def running_average(numbers):
    """Calculate running average."""
    result = []
    total = 0
    for i, num in enumerate(numbers, 1):
        total += num
        result.append(total / i)
    return result

print(running_average([10, 20, 30, 40]))
# [10.0, 15.0, 20.0, 25.0]

# Running maximum
def running_max(numbers):
    """Track maximum so far."""
    if not numbers:
        return []
    
    result = []
    current_max = numbers[0]
    for num in numbers:
        current_max = max(current_max, num)
        result.append(current_max)
    return result

numbers = [1, 5, 3, 7, 2, 9, 4]
print(running_max(numbers))
# [1, 5, 5, 7, 7, 9, 9]

# Using accumulate with max
print(list(accumulate(numbers, max)))
# [1, 5, 5, 7, 7, 9, 9]
```

## Pairwise Iteration Pattern

```python
# Iterate over consecutive pairs
def consecutive_pairs(items):
    """Generate consecutive pairs."""
    pairs = []
    for i in range(len(items) - 1):
        pairs.append((items[i], items[i + 1]))
    return pairs

numbers = [1, 2, 3, 4, 5]
print(consecutive_pairs(numbers))
# [(1, 2), (2, 3), (3, 4), (4, 5)]

# Better: Use zip with slicing
pairs = list(zip(numbers, numbers[1:]))
print(pairs)
# [(1, 2), (2, 3), (3, 4), (4, 5)]

# Using itertools.pairwise (Python 3.10+)
# from itertools import pairwise
# print(list(pairwise(numbers)))

# Calculate differences between consecutive elements
def differences(numbers):
    """Calculate consecutive differences."""
    return [b - a for a, b in zip(numbers, numbers[1:])]

print(differences([10, 13, 15, 20, 22]))
# [3, 2, 5, 2]

# All pairs (combinations)
from itertools import combinations

def all_pairs(items):
    """Get all unique pairs."""
    return list(combinations(items, 2))

numbers = [1, 2, 3, 4]
print(all_pairs(numbers))
# [(1, 2), (1, 3), (1, 4), (2, 3), (2, 4), (3, 4)]
```

## Sentinel Pattern

```python
# Process until sentinel value
def read_until_sentinel(sentinel='END'):
    """Read inputs until sentinel."""
    items = []
    while True:
        item = input("Enter item (or END): ")
        if item == sentinel:
            break
        items.append(item)
    return items

# Would use:
# items = read_until_sentinel()

# Process file until marker
def read_until_marker(lines, marker='---'):
    """Read lines until marker."""
    result = []
    for line in lines:
        if line.strip() == marker:
            break
        result.append(line)
    return result

lines = ['line 1', 'line 2', '---', 'line 3']
print(read_until_marker(lines))
# ['line 1', 'line 2']

# Using itertools.takewhile
from itertools import takewhile

result = list(takewhile(lambda x: x.strip() != '---', lines))
print(result)
# ['line 1', 'line 2']
```

## Chunking Pattern

```python
# Split into fixed-size chunks
def chunk_list(items, chunk_size):
    """Split list into chunks."""
    chunks = []
    for i in range(0, len(items), chunk_size):
        chunks.append(items[i:i + chunk_size])
    return chunks

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(chunk_list(numbers, 3))
# [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]

# Using list comprehension
def chunk_list_comp(items, size):
    """Chunk using comprehension."""
    return [items[i:i + size] for i in range(0, len(items), size)]

print(chunk_list_comp(numbers, 4))
# [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10]]

# Generator version (memory efficient)
def chunk_generator(items, size):
    """Generate chunks on demand."""
    for i in range(0, len(items), size):
        yield items[i:i + size]

for chunk in chunk_generator(numbers, 3):
    print(chunk)
# [1, 2, 3]
# [4, 5, 6]
# [7, 8, 9]
# [10]
```

## Flatten Pattern

```python
# Flatten nested list (one level)
def flatten_one_level(nested):
    """Flatten one level of nesting."""
    result = []
    for sublist in nested:
        for item in sublist:
            result.append(item)
    return result

nested = [[1, 2], [3, 4], [5, 6]]
print(flatten_one_level(nested))
# [1, 2, 3, 4, 5, 6]

# Better: List comprehension
flat = [item for sublist in nested for item in sublist]
print(flat)

# Better: Use itertools.chain
from itertools import chain
flat = list(chain.from_iterable(nested))
print(flat)

# Flatten completely (all levels)
def flatten_recursive(nested):
    """Recursively flatten all levels."""
    result = []
    for item in nested:
        if isinstance(item, list):
            result.extend(flatten_recursive(item))
        else:
            result.append(item)
    return result

deeply_nested = [1, [2, [3, 4]], [5, [6, [7, 8]]]]
print(flatten_recursive(deeply_nested))
# [1, 2, 3, 4, 5, 6, 7, 8]
```

## Zip Pattern

```python
# Parallel iteration
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
cities = ['NYC', 'LA', 'Chicago']

# Iterate multiple lists together
for name, age, city in zip(names, ages, cities):
    print(f"{name}, {age}, from {city}")
# Alice, 25, from NYC
# Bob, 30, from LA
# Charlie, 35, from Chicago

# Create dictionary from two lists
name_age_dict = dict(zip(names, ages))
print(name_age_dict)
# {'Alice': 25, 'Bob': 30, 'Charlie': 35}

# Transpose matrix using zip
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

transposed = [list(row) for row in zip(*matrix)]
print(transposed)
# [[1, 4, 7], [2, 5, 8], [3, 6, 9]]

# Or simpler:
transposed = list(map(list, zip(*matrix)))
print(transposed)
```

## Enumerate Pattern

```python
# Index and value together
fruits = ['apple', 'banana', 'cherry']

# Get both index and value
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple
# 1: banana
# 2: cherry

# Start counting from 1
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry

# Find indices of matching elements
def find_all_indices(items, target):
    """Find all indices where item equals target."""
    return [i for i, item in enumerate(items) if item == target]

numbers = [1, 2, 3, 2, 1, 2, 4]
print(find_all_indices(numbers, 2))
# [1, 3, 5]

# Modify list with indices
def update_at_indices(items, indices, value):
    """Update items at specific indices."""
    for i, item in enumerate(items):
        if i in indices:
            items[i] = value
    return items

numbers = [0, 0, 0, 0, 0]
update_at_indices(numbers, [1, 3], 99)
print(numbers)
# [0, 99, 0, 99, 0]
```

## Dictionary Iteration Patterns

```python
# Iterate over dictionary
person = {'name': 'Alice', 'age': 30, 'city': 'NYC'}

# Keys only (default)
for key in person:
    print(key)
# name
# age
# city

# Explicit keys
for key in person.keys():
    print(key)

# Values only
for value in person.values():
    print(value)
# Alice
# 30
# NYC

# Keys and values together
for key, value in person.items():
    print(f"{key}: {value}")
# name: Alice
# age: 30
# city: NYC

# Filter dictionary
def filter_dict(d, min_value):
    """Keep items with value >= min_value."""
    return {k: v for k, v in d.items() if v >= min_value}

scores = {'Alice': 85, 'Bob': 72, 'Charlie': 90, 'Diana': 68}
high_scores = filter_dict(scores, 80)
print(high_scores)
# {'Alice': 85, 'Charlie': 90}

# Merge dictionaries
dict1 = {'a': 1, 'b': 2}
dict2 = {'c': 3, 'd': 4}

# Python 3.9+
merged = dict1 | dict2
print(merged)

# Alternative
merged = {**dict1, **dict2}
print(merged)
# {'a': 1, 'b': 2, 'c': 3, 'd': 4}
```

## Summary

**Common Patterns:**

1. **Counter**: Count occurrences → Use `Counter`
2. **Accumulator**: Build up result → Use comprehension or `sum()`
3. **Search**: Find items → Use `in`, `index()`, or `next()`
4. **Filter**: Select items → Use comprehension or `filter()`
5. **Map**: Transform items → Use comprehension or `map()`
6. **Group**: Partition items → Use `defaultdict` or `groupby()`
7. **Min/Max**: Find extremes → Use `min()`, `max()`
8. **Running**: Cumulative calculations → Use `accumulate()`
9. **Pairwise**: Consecutive pairs → Use `zip(items, items[1:])`
10. **Flatten**: Unnest lists → Use `chain.from_iterable()`

**Pythonic Idioms:**

```python
# Enumerate with start
for i, item in enumerate(items, start=1):
    ...

# Zip parallel iteration
for x, y in zip(list1, list2):
    ...

# Dictionary comprehension with filtering
{k: v for k, v in d.items() if condition}

# List comprehension with condition
[x for x in items if condition]

# Default dict for grouping
from collections import defaultdict
groups = defaultdict(list)

# Accumulate for running calculations
from itertools import accumulate
running = list(accumulate(items))

# Chain for flattening
from itertools import chain
flat = list(chain.from_iterable(nested))

# Next with default
first_match = next((x for x in items if condition), default)
```

**Key Principle**: Use built-in functions and standard library tools - they're faster, clearer, and more Pythonic!
