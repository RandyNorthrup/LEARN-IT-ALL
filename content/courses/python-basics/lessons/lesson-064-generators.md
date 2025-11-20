---
id: "99-generators"
title: "Generators and yield Statements"
chapterId: ch5-loops
order: 10
duration: 30
objectives:
  - Understand generators and how they differ from regular functions
  - Master the yield statement
  - Learn generator expressions
  - Create memory-efficient pipelines
---

# Generators and yield Statements

Generators are a simple and powerful tool for creating iterators. They write like functions but behave like iterators, making them perfect for memory-efficient data processing.

## What is a Generator?

```python
# Regular function returns entire list
def get_squares_list(n):
    result = []
    for i in range(n):
        result.append(i * i)
    return result

# Generator function yields values one at a time
def get_squares_generator(n):
    for i in range(n):
        yield i * i

# Both can be used in for loops
print("List:")
for num in get_squares_list(5):
    print(num, end=" ")
print()

print("Generator:")
for num in get_squares_generator(5):
    print(num, end=" ")
print()

# Output:
# List: 0 1 4 9 16
# Generator: 0 1 4 9 16

# But generator is a generator object, not a list
gen = get_squares_generator(5)
print(type(gen))
# <class 'generator'>
```

## The yield Statement

```python
# yield pauses function and returns a value
# Function resumes where it left off on next call
def simple_generator():
    print("Starting")
    yield 1
    print("After first yield")
    yield 2
    print("After second yield")
    yield 3
    print("Done")

# Each next() call resumes execution
gen = simple_generator()
print(next(gen))
# Starting
# 1

print(next(gen))
# After first yield
# 2

print(next(gen))
# After second yield
# 3

# Next call raises StopIteration
# print(next(gen))
# Done
# StopIteration

# Using in for loop (handles StopIteration automatically)
print("\nUsing for loop:")
for value in simple_generator():
    print(f"Received: {value}")

# Output:
# Starting
# Received: 1
# After first yield
# Received: 2
# After second yield
# Received: 3
# Done
```

## Generator vs Function

```python
# Regular function
def count_function(n):
    result = []
    for i in range(n):
        result.append(i)
    return result

# Generator
def count_generator(n):
    for i in range(n):
        yield i

# Memory comparison
import sys

# Function creates full list in memory
nums_list = count_function(1000)
print(f"Function result size: {sys.getsizeof(nums_list)} bytes")
# Function result size: 8856 bytes

# Generator stores only state
nums_gen = count_generator(1000)
print(f"Generator size: {sys.getsizeof(nums_gen)} bytes")
# Generator size: 112 bytes

# Both give same results
print(list(count_function(5)))     # [0, 1, 2, 3, 4]
print(list(count_generator(5)))    # [0, 1, 2, 3, 4]
```

## Simple Generator Examples

```python
# Generate even numbers
def even_numbers(n):
    """Generate even numbers up to n."""
    for i in range(0, n + 1, 2):
        yield i

for num in even_numbers(10):
    print(num, end=" ")
print()
# 0 2 4 6 8 10

# Countdown generator
def countdown(n):
    """Count down from n to 1."""
    while n > 0:
        yield n
        n -= 1

for num in countdown(5):
    print(num, end=" ")
print()
# 5 4 3 2 1

# Fibonacci generator
def fibonacci(max_terms):
    """Generate Fibonacci numbers."""
    a, b = 0, 1
    count = 0
    while count < max_terms:
        yield a
        a, b = b, a + b
        count += 1

for num in fibonacci(10):
    print(num, end=" ")
print()
# 0 1 1 2 3 5 8 13 21 34
```

## Infinite Generators

```python
# Generator that never stops
def infinite_counter(start=0):
    """Count forever starting from start."""
    num = start
    while True:
        yield num
        num += 1

# Use with break or limit
counter = infinite_counter(10)
for i, num in enumerate(counter):
    if i >= 5:
        break
    print(num, end=" ")
print()
# 10 11 12 13 14

# Infinite sequence with pattern
def repeat_pattern(pattern):
    """Repeat pattern forever."""
    while True:
        for item in pattern:
            yield item

colors = repeat_pattern(['red', 'green', 'blue'])
for i, color in enumerate(colors):
    if i >= 7:
        break
    print(color, end=" ")
print()
# red green blue red green blue red
```

## Generator with State

```python
# Generator maintains state between yields
def running_sum(numbers):
    """Yield running sum of numbers."""
    total = 0
    for num in numbers:
        total += num
        yield total

for result in running_sum([1, 2, 3, 4, 5]):
    print(result, end=" ")
print()
# 1 3 6 10 15

# Running average
def running_average(numbers):
    """Yield running average."""
    total = 0
    count = 0
    for num in numbers:
        total += num
        count += 1
        yield total / count

numbers = [10, 20, 30, 40, 50]
for avg in running_average(numbers):
    print(f"{avg:.1f}", end=" ")
print()
# 10.0 15.0 20.0 25.0 30.0
```

## Generator Expressions

```python
# Like list comprehension but with parentheses
# List comprehension (creates full list)
squares_list = [x**2 for x in range(10)]
print(type(squares_list))
# <class 'list'>

# Generator expression (creates generator)
squares_gen = (x**2 for x in range(10))
print(type(squares_gen))
# <class 'generator'>

# Both give same results
print(list(squares_list))
print(list(squares_gen))
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Generator expression with condition
evens = (x for x in range(20) if x % 2 == 0)
print(list(evens))
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Memory efficient - no intermediate list
total = sum(x**2 for x in range(1000000))
print(f"Sum of squares: {total:,}")
```

## Passing Values to Generators

```python
# Generators can receive values via send()
def echo_generator():
    """Generator that echoes sent values."""
    while True:
        received = yield
        if received is not None:
            print(f"Received: {received}")

gen = echo_generator()
next(gen)  # Prime the generator
gen.send("Hello")   # Received: Hello
gen.send(42)        # Received: 42
gen.send([1, 2, 3]) # Received: [1, 2, 3]

# Generator with both yield and send
def accumulator():
    """Accumulate sent values."""
    total = 0
    while True:
        value = yield total
        if value is not None:
            total += value

acc = accumulator()
print(next(acc))        # 0 (initial total)
print(acc.send(10))     # 10
print(acc.send(20))     # 30
print(acc.send(5))      # 35
```

## Generator Pipeline

```python
# Chain generators for efficient processing

def read_numbers(numbers):
    """Yield numbers one by one."""
    for num in numbers:
        yield num

def square_numbers(numbers):
    """Square each number."""
    for num in numbers:
        yield num * num

def filter_large(numbers, threshold):
    """Filter numbers above threshold."""
    for num in numbers:
        if num > threshold:
            yield num

# Create pipeline (no computation yet!)
data = range(100)
pipeline = filter_large(square_numbers(read_numbers(data)), 5000)

# Computation happens on-demand
result = list(pipeline)
print(f"Found {len(result)} numbers")
print(result[:10])
# Found 29 numbers
# [5041, 5184, 5329, 5476, 5625, 5776, 5929, 6084, 6241, 6400]
```

## Practical File Processing

```python
# Process large files line by line
def read_file_lines(filename):
    """Generator to read file line by line."""
    with open(filename, 'r') as file:
        for line in file:
            yield line.strip()

def filter_comments(lines):
    """Filter out comment lines."""
    for line in lines:
        if not line.startswith('#') and line:
            yield line

def parse_data(lines):
    """Parse each line."""
    for line in lines:
        parts = line.split(',')
        yield parts

# Would process file without loading all into memory:
# pipeline = parse_data(filter_comments(read_file_lines('data.csv')))
# for record in pipeline:
#     process(record)

# Process log file
def read_log_lines(filename):
    """Read log file line by line."""
    # Simulated for example
    logs = [
        "ERROR: Connection failed",
        "INFO: Request received",
        "ERROR: Database timeout",
        "INFO: Request processed",
        "ERROR: Invalid input",
    ]
    for log in logs:
        yield log

def filter_errors(lines):
    """Yield only error lines."""
    for line in lines:
        if line.startswith('ERROR'):
            yield line

# Process errors only
error_pipeline = filter_errors(read_log_lines('app.log'))
for error in error_pipeline:
    print(error)
# ERROR: Connection failed
# ERROR: Database timeout
# ERROR: Invalid input
```

## Generator with Cleanup

```python
# Generators can handle resource cleanup
def managed_resource():
    """Generator with setup and cleanup."""
    print("Acquiring resource")
    try:
        yield "Resource is ready"
        yield "Still using resource"
    finally:
        print("Releasing resource")

# Resource cleaned up after iteration
for item in managed_resource():
    print(f"Using: {item}")

# Output:
# Acquiring resource
# Using: Resource is ready
# Using: Still using resource
# Releasing resource

# Even with early break
print("\nWith break:")
gen = managed_resource()
for item in gen:
    print(f"Using: {item}")
    break
gen.close()  # Explicitly close to trigger finally

# Output:
# Acquiring resource
# Using: Resource is ready
# Releasing resource
```

## Delegating to Subgenerators

```python
# yield from delegates to another generator
def sub_generator():
    """Sub-generator with some values."""
    yield 1
    yield 2
    yield 3

def main_generator():
    """Main generator delegating to sub."""
    yield 'Start'
    yield from sub_generator()  # Delegate entire sub-generator
    yield 'End'

for value in main_generator():
    print(value, end=" ")
print()
# Start 1 2 3 End

# Flattening nested lists
def flatten(nested_list):
    """Recursively flatten nested lists."""
    for item in nested_list:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

nested = [1, [2, 3, [4, 5]], 6, [7, [8, 9]]]
flat = list(flatten(nested))
print(flat)
# [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Generator for Data Transformation

```python
# Transform data in memory-efficient way
def read_data():
    """Simulate reading data."""
    data = [
        {'name': 'Alice', 'age': 25, 'score': 85},
        {'name': 'Bob', 'age': 30, 'score': 92},
        {'name': 'Charlie', 'age': 28, 'score': 78},
        {'name': 'Diana', 'age': 35, 'score': 95},
    ]
    for record in data:
        yield record

def filter_high_scores(records, threshold=80):
    """Filter records with high scores."""
    for record in records:
        if record['score'] >= threshold:
            yield record

def extract_names(records):
    """Extract names from records."""
    for record in records:
        yield record['name']

# Build pipeline
pipeline = extract_names(filter_high_scores(read_data()))
high_scorers = list(pipeline)
print(high_scorers)
# ['Alice', 'Bob', 'Diana']
```

## Practical Number Sequences

```python
# Prime number generator
def primes():
    """Generate prime numbers forever."""
    yield 2
    primes_list = [2]
    candidate = 3
    while True:
        is_prime = True
        for p in primes_list:
            if p * p > candidate:
                break
            if candidate % p == 0:
                is_prime = False
                break
        if is_prime:
            primes_list.append(candidate)
            yield candidate
        candidate += 2

# Get first 20 primes
prime_gen = primes()
first_20 = [next(prime_gen) for _ in range(20)]
print(first_20)
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71]

# Collatz sequence generator
def collatz(n):
    """Generate Collatz sequence starting from n."""
    yield n
    while n != 1:
        if n % 2 == 0:
            n = n // 2
        else:
            n = 3 * n + 1
        yield n

sequence = list(collatz(13))
print(sequence)
# [13, 40, 20, 10, 5, 16, 8, 4, 2, 1]
```

## When to Use Generators

```python
# Use generators when:

# 1. Large datasets (avoid loading all into memory)
def process_large_file(filename):
    """Process file line by line."""
    # for line in read_large_file(filename):
    #     yield process(line)
    pass

# 2. Infinite sequences
def natural_numbers():
    """Generate 1, 2, 3, ... forever."""
    n = 1
    while True:
        yield n
        n += 1

# 3. Complex iteration logic
def permutations(items):
    """Generate permutations without storing all."""
    # Implementation would yield each permutation
    pass

# 4. Pipeline processing
# data -> filter -> transform -> aggregate

# Don't use generators when:
# - Need to access elements multiple times
# - Need random access or indexing
# - Need length of sequence
# - Sequence is small and fits in memory
```

## Generator Performance

```python
import time

# List approach - all computed upfront
def squares_list(n):
    return [x**2 for x in range(n)]

# Generator approach - computed on-demand
def squares_gen(n):
    for x in range(n):
        yield x**2

# Measure creation time
n = 1000000

start = time.time()
lst = squares_list(n)
list_time = time.time() - start
print(f"List creation: {list_time:.4f}s")

start = time.time()
gen = squares_gen(n)
gen_time = time.time() - start
print(f"Generator creation: {gen_time:.6f}s")

# Generator is instant (no computation yet)
# List creation: 0.1234s
# Generator creation: 0.000001s

# But both take similar time to consume fully
start = time.time()
sum(squares_gen(n))
gen_consume = time.time() - start
print(f"Generator consumption: {gen_consume:.4f}s")
```

## Summary

**Generator Function:**
```python
def my_generator(n):
    for i in range(n):
        yield i  # Use yield instead of return
```

**Generator Expression:**
```python
gen = (x**2 for x in range(10))  # Parentheses, not brackets
```

**Key Differences from Functions:**
- **yield** instead of **return**
- Pauses and resumes execution
- Returns generator object
- Values generated on-demand
- Can be infinite

**Benefits:**
- **Memory efficient**: Don't store all values
- **Lazy evaluation**: Compute only when needed
- **Infinite sequences**: Can't create with lists
- **Pipeline processing**: Chain transformations
- **State preservation**: Maintain state between yields

**When to Use:**
- Large datasets that don't fit in memory
- Infinite or very long sequences
- Complex iteration logic
- Data pipelines and transformations
- File processing line by line

**Key Methods:**
- `next(gen)` - Get next value
- `gen.send(value)` - Send value to generator
- `gen.close()` - Close generator
- `yield from` - Delegate to sub-generator

Generators are one of Python's most powerful features for memory-efficient, lazy evaluation of sequences!
