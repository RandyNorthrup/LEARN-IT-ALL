---
id: "98-iterators"
title: "Iterators and Iteration Protocol"
chapterId: ch5-loops
order: 9
duration: 25
objectives:
  - Understand Python's iteration protocol
  - Learn how iterators work internally
  - Create custom iterators
  - Master iterator methods and patterns
---

# Iterators and Iteration Protocol

Every `for` loop in Python uses iterators under the hood. Understanding iterators helps you write more efficient code and create custom iterable objects.

## What is an Iterator?

```python
# A list is iterable (has __iter__ method)
numbers = [1, 2, 3, 4, 5]

# Get an iterator from the list
iterator = iter(numbers)
print(type(iterator))
# <class 'list_iterator'>

# Use next() to get elements one by one
print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3
print(next(iterator))  # 4
print(next(iterator))  # 5

# When exhausted, raises StopIteration
try:
    print(next(iterator))
except StopIteration:
    print("Iterator exhausted!")
# Iterator exhausted!
```

## How for Loops Work

```python
# What a for loop does internally:
numbers = [1, 2, 3]

# for num in numbers:
#     print(num)

# Is equivalent to:
iterator = iter(numbers)
while True:
    try:
        num = next(iterator)
        print(num)
    except StopIteration:
        break

# Output: 1 2 3
```

## iter() and next() Functions

```python
# iter() gets an iterator from an iterable
fruits = ["apple", "banana", "cherry"]
fruit_iter = iter(fruits)

print(next(fruit_iter))  # apple
print(next(fruit_iter))  # banana
print(next(fruit_iter))  # cherry

# Works with any iterable
text = "ABC"
text_iter = iter(text)
print(next(text_iter))  # A
print(next(text_iter))  # B
print(next(text_iter))  # C

# Works with range
r = range(3)
r_iter = iter(r)
print(next(r_iter))  # 0
print(next(r_iter))  # 1
print(next(r_iter))  # 2
```

## Iterators vs Iterables

```python
# Iterable: object that can be iterated over (has __iter__)
# Iterator: object that does the iteration (has __iter__ and __next__)

# List is iterable, but not an iterator
numbers = [1, 2, 3]
print(hasattr(numbers, '__iter__'))   # True (iterable)
print(hasattr(numbers, '__next__'))   # False (not iterator)

# Get iterator from iterable
iterator = iter(numbers)
print(hasattr(iterator, '__iter__'))  # True
print(hasattr(iterator, '__next__'))  # True (is iterator)

# An iterator is always iterable (can iter() itself)
iterator2 = iter(iterator)
print(iterator2 is iterator)  # True (returns self)
```

## Creating Custom Iterators

```python
class Countdown:
    """Iterator that counts down from a number."""
    
    def __init__(self, start):
        self.current = start
    
    def __iter__(self):
        """Return self (this object is an iterator)."""
        return self
    
    def __next__(self):
        """Return next value or raise StopIteration."""
        if self.current <= 0:
            raise StopIteration
        
        self.current -= 1
        return self.current + 1

# Use the custom iterator
countdown = Countdown(5)
for num in countdown:
    print(num, end=" ")
print()
# Output: 5 4 3 2 1

# Can also use next() manually
countdown2 = Countdown(3)
print(next(countdown2))  # 3
print(next(countdown2))  # 2
print(next(countdown2))  # 1
# next(countdown2)  # Raises StopIteration
```

## Iterator with State

```python
class FibonacciIterator:
    """Generate Fibonacci numbers up to n terms."""
    
    def __init__(self, max_terms):
        self.max_terms = max_terms
        self.count = 0
        self.a = 0
        self.b = 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.count >= self.max_terms:
            raise StopIteration
        
        self.count += 1
        
        if self.count == 1:
            return self.a
        elif self.count == 2:
            return self.b
        else:
            result = self.a + self.b
            self.a = self.b
            self.b = result
            return result

# Generate first 10 Fibonacci numbers
fib = FibonacciIterator(10)
for num in fib:
    print(num, end=" ")
print()
# Output: 0 1 1 2 3 5 8 13 21 34
```

## Iterable vs Iterator Class

```python
# Better design: Separate iterable container from iterator

class EvenNumbers:
    """Iterable that generates even numbers up to max."""
    
    def __init__(self, max_value):
        self.max_value = max_value
    
    def __iter__(self):
        """Return a new iterator."""
        return EvenNumbersIterator(self.max_value)

class EvenNumbersIterator:
    """Iterator for even numbers."""
    
    def __init__(self, max_value):
        self.max_value = max_value
        self.current = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current > self.max_value:
            raise StopIteration
        
        result = self.current
        self.current += 2
        return result

# Can iterate multiple times (creates new iterator each time)
evens = EvenNumbers(10)

print("First iteration:")
for num in evens:
    print(num, end=" ")
print()

print("Second iteration:")
for num in evens:
    print(num, end=" ")
print()

# Output:
# First iteration: 0 2 4 6 8 10
# Second iteration: 0 2 4 6 8 10
```

## Built-in Iterators

```python
# Many built-in types are iterable
iterables = [
    [1, 2, 3],           # list
    (1, 2, 3),           # tuple
    {1, 2, 3},           # set
    "abc",               # string
    {"a": 1, "b": 2},    # dict (iterates over keys)
    range(3),            # range
]

for obj in iterables:
    iterator = iter(obj)
    print(f"{type(obj).__name__}: {list(iterator)}")

# Output:
# list: [1, 2, 3]
# tuple: (1, 2, 3)
# set: {1, 2, 3}
# str: ['a', 'b', 'c']
# dict: ['a', 'b']
# range: [0, 1, 2]
```

## Iterator Functions

```python
# map() returns an iterator
numbers = [1, 2, 3, 4, 5]
squared = map(lambda x: x**2, numbers)
print(type(squared))  # <class 'map'>
print(list(squared))  # [1, 4, 9, 16, 25]

# filter() returns an iterator
evens = filter(lambda x: x % 2 == 0, numbers)
print(type(evens))  # <class 'filter'>
print(list(evens))  # [2, 4]

# zip() returns an iterator
names = ["Alice", "Bob"]
ages = [25, 30]
combined = zip(names, ages)
print(type(combined))  # <class 'zip'>
print(list(combined))  # [('Alice', 25), ('Bob', 30)]

# enumerate() returns an iterator
fruits = ["apple", "banana"]
indexed = enumerate(fruits)
print(type(indexed))  # <class 'enumerate'>
print(list(indexed))  # [(0, 'apple'), (1, 'banana')]
```

## One-Time Consumption

```python
# Iterators can only be consumed once
numbers = [1, 2, 3, 4, 5]
iterator = iter(numbers)

# First consumption
result1 = list(iterator)
print(result1)  # [1, 2, 3, 4, 5]

# Second consumption (empty!)
result2 = list(iterator)
print(result2)  # []

# Need new iterator for second pass
iterator = iter(numbers)
result3 = list(iterator)
print(result3)  # [1, 2, 3, 4, 5]
```

## Infinite Iterators

```python
class InfiniteCounter:
    """Iterator that counts forever."""
    
    def __init__(self, start=0):
        self.current = start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        result = self.current
        self.current += 1
        return result

# Use with caution! Must break manually
counter = InfiniteCounter()
for num in counter:
    if num >= 5:
        break
    print(num, end=" ")
print()
# Output: 0 1 2 3 4

# itertools has infinite iterators
from itertools import count, cycle, repeat

# count() - infinite counting
counter = count(10)
print(next(counter))  # 10
print(next(counter))  # 11
print(next(counter))  # 12

# cycle() - repeat sequence forever
colors = cycle(['red', 'green', 'blue'])
for i, color in enumerate(colors):
    if i >= 7:
        break
    print(color, end=" ")
print()
# red green blue red green blue red

# repeat() - repeat value n times or forever
threes = repeat(3, 5)
print(list(threes))  # [3, 3, 3, 3, 3]
```

## Iterator Utilities from itertools

```python
from itertools import islice, chain, tee

# islice() - slice an iterator
numbers = range(100)
first_ten = islice(numbers, 10)
print(list(first_ten))
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Skip first 5, take next 5
middle = islice(range(20), 5, 10)
print(list(middle))
# [5, 6, 7, 8, 9]

# chain() - combine multiple iterables
combined = chain([1, 2, 3], [4, 5, 6], [7, 8, 9])
print(list(combined))
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# tee() - split iterator into multiple independent iterators
numbers = range(5)
iter1, iter2 = tee(numbers)
print(list(iter1))  # [0, 1, 2, 3, 4]
print(list(iter2))  # [0, 1, 2, 3, 4]
```

## Practical Custom Iterator

```python
class FileLineIterator:
    """Iterator that reads file line by line."""
    
    def __init__(self, filename):
        self.filename = filename
        self.file = None
    
    def __iter__(self):
        self.file = open(self.filename, 'r')
        return self
    
    def __next__(self):
        line = self.file.readline()
        if not line:
            self.file.close()
            raise StopIteration
        return line.strip()

# Would work with actual file:
# for line in FileLineIterator('data.txt'):
#     print(line)

# Range-like custom iterator
class MyRange:
    """Custom range implementation."""
    
    def __init__(self, start, stop=None, step=1):
        if stop is None:
            self.start = 0
            self.stop = start
        else:
            self.start = start
            self.stop = stop
        self.step = step
    
    def __iter__(self):
        current = self.start
        if self.step > 0:
            while current < self.stop:
                yield current
                current += self.step
        else:
            while current > self.stop:
                yield current
                current += self.step

# Use like built-in range
for i in MyRange(5):
    print(i, end=" ")
print()
# 0 1 2 3 4

for i in MyRange(2, 10, 2):
    print(i, end=" ")
print()
# 2 4 6 8
```

## Memory Efficiency

```python
import sys

# List stores all values in memory
big_list = [i for i in range(1000000)]
print(f"List size: {sys.getsizeof(big_list):,} bytes")
# List size: 8,000,056 bytes

# Iterator generates values on-demand
big_range = range(1000000)
print(f"Range size: {sys.getsizeof(big_range)} bytes")
# Range size: 48 bytes

# Custom iterator is also memory-efficient
class LargeSequence:
    def __init__(self, n):
        self.n = n
    
    def __iter__(self):
        current = 0
        while current < self.n:
            yield current * current
            current += 1

seq = LargeSequence(1000000)
print(f"Custom iterator size: {sys.getsizeof(seq)} bytes")
# Custom iterator size: ~56 bytes

# Use iterator without storing all values
total = sum(islice(LargeSequence(1000000), 100))
print(f"Sum of first 100 squares: {total}")
```

## Summary

**Iterator Protocol:**
- `__iter__()` - Returns iterator object (usually `self`)
- `__next__()` - Returns next value or raises `StopIteration`

**Key Concepts:**
- **Iterable**: Has `__iter__()`, can be iterated over
- **Iterator**: Has both `__iter__()` and `__next__()`
- **for loops** use iterators internally
- **One-time use**: Iterators are exhausted after iteration

**Creating Iterators:**
```python
class MyIterator:
    def __iter__(self):
        return self
    
    def __next__(self):
        # Return value or raise StopIteration
        pass
```

**Benefits:**
- **Memory efficient**: Generate values on-demand
- **Lazy evaluation**: Compute only when needed
- **Large/infinite sequences**: Can't store in memory
- **Separation of concerns**: Iteration logic separate from data

**Common Patterns:**
- Custom iterators for sequential data
- Infinite iterators for streams
- File iterators for large files
- State-maintaining iterators

**Built-in Iterator Functions:**
- `iter()`, `next()` - Basic iteration
- `map()`, `filter()`, `zip()` - Transformation iterators
- `enumerate()`, `reversed()` - Utility iterators
- `itertools` module - Advanced iterator tools

Understanding iterators unlocks Python's iteration protocol and enables memory-efficient data processing!
