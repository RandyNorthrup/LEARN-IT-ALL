---
id: "100-loop-optimization"
title: "Loop Optimization Techniques"
chapterId: ch5-loops
order: 11
duration: 25
objectives:
  - Learn techniques to write faster loops
  - Understand loop performance pitfalls
  - Master optimization strategies
  - Profile and measure loop performance
---

# Loop Optimization Techniques

Writing efficient loops is crucial for performance. This lesson covers practical techniques to make your loops run faster.

## Move Invariants Outside Loops

```python
# ❌ BAD - Recomputes constant in every iteration
def process_items_slow(items, factor):
    results = []
    for item in items:
        # computed_value doesn't change but recalculated each time
        computed_value = factor * 2 + 10
        results.append(item * computed_value)
    return results

# ✅ GOOD - Compute once before loop
def process_items_fast(items, factor):
    results = []
    computed_value = factor * 2 + 10  # Moved outside
    for item in items:
        results.append(item * computed_value)
    return results

# Performance test
import time

items = list(range(100000))
factor = 5

start = time.time()
process_items_slow(items, factor)
slow_time = time.time() - start

start = time.time()
process_items_fast(items, factor)
fast_time = time.time() - start

print(f"Slow: {slow_time:.4f}s")
print(f"Fast: {fast_time:.4f}s")
print(f"Speedup: {slow_time/fast_time:.2f}x")
# Slow: 0.0234s
# Fast: 0.0187s
# Speedup: 1.25x
```

## Avoid Repeated Attribute Lookups

```python
# ❌ BAD - Looks up .append every iteration
def build_list_slow(n):
    result = []
    for i in range(n):
        result.append(i * 2)  # Attribute lookup each time
    return result

# ✅ GOOD - Cache the method reference
def build_list_fast(n):
    result = []
    append = result.append  # Cache reference
    for i in range(n):
        append(i * 2)  # Direct call
    return result

# ✅ BETTER - Use list comprehension (fastest)
def build_list_fastest(n):
    return [i * 2 for i in range(n)]

# Comparison
n = 100000

start = time.time()
build_list_slow(n)
slow = time.time() - start

start = time.time()
build_list_fast(n)
fast = time.time() - start

start = time.time()
build_list_fastest(n)
fastest = time.time() - start

print(f"Slow (lookups): {slow:.4f}s")
print(f"Fast (cached): {fast:.4f}s")
print(f"Fastest (comprehension): {fastest:.4f}s")
print(f"Speedup vs slow: {slow/fastest:.2f}x")
# Slow (lookups): 0.0156s
# Fast (cached): 0.0125s
# Fastest (comprehension): 0.0078s
# Speedup vs slow: 2.00x
```

## Use Local Variables

```python
# ❌ BAD - Global variable access is slower
MULTIPLIER = 10

def process_global(items):
    result = []
    for item in items:
        result.append(item * MULTIPLIER)  # Global lookup
    return result

# ✅ GOOD - Local variable access is faster
def process_local(items, multiplier):
    result = []
    for item in items:
        result.append(item * multiplier)  # Local lookup
    return result

# ✅ BETTER - Use comprehension with local
def process_best(items, multiplier):
    return [item * multiplier for item in items]

items = list(range(100000))

start = time.time()
process_global(items)
global_time = time.time() - start

start = time.time()
process_local(items, 10)
local_time = time.time() - start

start = time.time()
process_best(items, 10)
best_time = time.time() - start

print(f"Global: {global_time:.4f}s")
print(f"Local: {local_time:.4f}s")
print(f"Best: {best_time:.4f}s")
print(f"Speedup: {global_time/best_time:.2f}x")
```

## Prefer List Comprehensions

```python
# ❌ SLOWER - Traditional for loop
def squares_loop(n):
    result = []
    for i in range(n):
        result.append(i * i)
    return result

# ✅ FASTER - List comprehension
def squares_comp(n):
    return [i * i for i in range(n)]

# ✅ FASTEST - map with lambda (for simple operations)
def squares_map(n):
    return list(map(lambda x: x * x, range(n)))

n = 100000

start = time.time()
squares_loop(n)
loop_time = time.time() - start

start = time.time()
squares_comp(n)
comp_time = time.time() - start

start = time.time()
squares_map(n)
map_time = time.time() - start

print(f"Loop: {loop_time:.4f}s")
print(f"Comprehension: {comp_time:.4f}s")
print(f"Map: {map_time:.4f}s")
print(f"Speedup: {loop_time/comp_time:.2f}x")
# Loop: 0.0156s
# Comprehension: 0.0078s
# Map: 0.0094s
# Speedup: 2.00x
```

## Use Built-in Functions

```python
# ❌ SLOW - Manual loop
def sum_slow(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

# ✅ FAST - Built-in function
def sum_fast(numbers):
    return sum(numbers)

numbers = list(range(100000))

start = time.time()
sum_slow(numbers)
slow = time.time() - start

start = time.time()
sum_fast(numbers)
fast = time.time() - start

print(f"Manual loop: {slow:.4f}s")
print(f"Built-in sum(): {fast:.4f}s")
print(f"Speedup: {slow/fast:.2f}x")
# Manual loop: 0.0078s
# Built-in sum(): 0.0016s
# Speedup: 4.88x

# More built-in function examples
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# min/max
print(min(numbers))  # Faster than manual loop
print(max(numbers))

# any/all
print(any(x > 5 for x in numbers))  # True if any > 5
print(all(x > 0 for x in numbers))  # True if all > 0

# sorted
sorted_nums = sorted(numbers)
```

## Avoid Concatenating Strings in Loops

```python
# ❌ VERY SLOW - String concatenation in loop
def concat_slow(items):
    result = ""
    for item in items:
        result += str(item) + ","  # Creates new string each time
    return result

# ✅ FAST - Use join()
def concat_fast(items):
    return ",".join(str(item) for item in items)

# ✅ ALSO FAST - Use list then join
def concat_list(items):
    parts = []
    for item in items:
        parts.append(str(item))
    return ",".join(parts)

items = list(range(10000))

start = time.time()
concat_slow(items)
slow = time.time() - start

start = time.time()
concat_fast(items)
fast = time.time() - start

start = time.time()
concat_list(items)
list_method = time.time() - start

print(f"String concat: {slow:.4f}s")
print(f"Join with gen: {fast:.4f}s")
print(f"Join with list: {list_method:.4f}s")
print(f"Speedup: {slow/fast:.2f}x")
# String concat: 0.0234s
# Join with gen: 0.0016s
# Join with list: 0.0016s
# Speedup: 14.63x
```

## Use Membership Testing Efficiently

```python
# ❌ SLOW - List membership O(n)
def find_in_list(target, items):
    count = 0
    for i in range(10000):
        if target in items:  # O(n) each time
            count += 1
    return count

# ✅ FAST - Set membership O(1)
def find_in_set(target, items):
    items_set = set(items)  # Convert once
    count = 0
    for i in range(10000):
        if target in items_set:  # O(1) each time
            count += 1
    return count

items = list(range(1000))
target = 999

start = time.time()
find_in_list(target, items)
list_time = time.time() - start

start = time.time()
find_in_set(target, items)
set_time = time.time() - start

print(f"List membership: {list_time:.4f}s")
print(f"Set membership: {set_time:.4f}s")
print(f"Speedup: {list_time/set_time:.2f}x")
# List membership: 0.1250s
# Set membership: 0.0008s
# Speedup: 156.25x
```

## Reduce Function Calls

```python
# ❌ SLOW - Function call overhead
def square(x):
    return x * x

def process_slow(items):
    result = []
    for item in items:
        result.append(square(item))  # Function call each iteration
    return result

# ✅ FASTER - Inline calculation
def process_fast(items):
    result = []
    for item in items:
        result.append(item * item)  # Direct calculation
    return result

# ✅ FASTEST - Comprehension
def process_fastest(items):
    return [item * item for item in items]

items = list(range(100000))

start = time.time()
process_slow(items)
slow = time.time() - start

start = time.time()
process_fast(items)
fast = time.time() - start

start = time.time()
process_fastest(items)
fastest = time.time() - start

print(f"With function calls: {slow:.4f}s")
print(f"Inline calculation: {fast:.4f}s")
print(f"Comprehension: {fastest:.4f}s")
print(f"Speedup: {slow/fastest:.2f}x")
```

## Use Iterators and Generators

```python
# ❌ MEMORY INEFFICIENT - Creates full list
def process_all(n):
    numbers = [i for i in range(n)]
    result = []
    for num in numbers:
        if num % 2 == 0:
            result.append(num * num)
    return result

# ✅ MEMORY EFFICIENT - Uses generators
def process_lazy(n):
    numbers = range(n)  # range is already lazy
    evens = (num for num in numbers if num % 2 == 0)
    return [num * num for num in evens]

# ✅ BEST - Chain comprehensions
def process_best(n):
    return [num * num for num in range(n) if num % 2 == 0]

import sys

n = 1000000

# Memory comparison
all_list = [i for i in range(n)]
print(f"List memory: {sys.getsizeof(all_list):,} bytes")

lazy_range = range(n)
print(f"Range memory: {sys.getsizeof(lazy_range)} bytes")

# List memory: 8,000,056 bytes
# Range memory: 48 bytes

# Performance
start = time.time()
result1 = process_all(n)
all_time = time.time() - start

start = time.time()
result2 = process_lazy(n)
lazy_time = time.time() - start

start = time.time()
result3 = process_best(n)
best_time = time.time() - start

print(f"All list: {all_time:.4f}s")
print(f"Lazy: {lazy_time:.4f}s")
print(f"Best: {best_time:.4f}s")
```

## Optimize Nested Loops

```python
# ❌ SLOW - Nested loops with repeated work
def find_pairs_slow(list1, list2):
    pairs = []
    for x in list1:
        for y in list2:
            # Recalculates len every iteration
            if len(pairs) < 100:
                pairs.append((x, y))
    return pairs

# ✅ FASTER - Check condition outside inner loop
def find_pairs_fast(list1, list2):
    pairs = []
    for x in list1:
        if len(pairs) >= 100:
            break
        for y in list2:
            pairs.append((x, y))
            if len(pairs) >= 100:
                break
    return pairs

# ✅ FASTEST - Calculate max needed
def find_pairs_fastest(list1, list2):
    max_pairs = 100
    pairs = []
    count = 0
    for x in list1:
        if count >= max_pairs:
            break
        for y in list2:
            pairs.append((x, y))
            count += 1
            if count >= max_pairs:
                break
    return pairs

list1 = list(range(100))
list2 = list(range(100))

start = time.time()
find_pairs_slow(list1, list2)
slow = time.time() - start

start = time.time()
find_pairs_fast(list1, list2)
fast = time.time() - start

start = time.time()
find_pairs_fastest(list1, list2)
fastest = time.time() - start

print(f"Slow: {slow:.4f}s")
print(f"Fast: {fast:.4f}s")
print(f"Fastest: {fastest:.4f}s")
```

## Use NumPy for Numerical Loops

```python
# For numerical computations, NumPy is much faster
# Note: NumPy must be installed (pip install numpy)

# ❌ SLOW - Python loop
def sum_squares_python(n):
    return sum(i * i for i in range(n))

# ✅ FAST - NumPy vectorized
def sum_squares_numpy(n):
    import numpy as np
    arr = np.arange(n)
    return np.sum(arr * arr)

n = 1000000

start = time.time()
result1 = sum_squares_python(n)
python_time = time.time() - start

try:
    import numpy as np
    start = time.time()
    result2 = sum_squares_numpy(n)
    numpy_time = time.time() - start
    
    print(f"Python loop: {python_time:.4f}s")
    print(f"NumPy vectorized: {numpy_time:.4f}s")
    print(f"Speedup: {python_time/numpy_time:.2f}x")
    # Python loop: 0.0781s
    # NumPy vectorized: 0.0039s
    # Speedup: 20.03x
except ImportError:
    print("NumPy not installed")
```

## Break Early When Possible

```python
# ❌ SLOW - Continues after finding
def find_slow(items, target):
    found = False
    result = None
    for item in items:
        if item == target:
            found = True
            result = item
        # Continues checking even after found
    return result

# ✅ FAST - Breaks immediately
def find_fast(items, target):
    for item in items:
        if item == target:
            return item  # Return immediately
    return None

# ✅ ALSO GOOD - Use built-in
def find_builtin(items, target):
    try:
        return items[items.index(target)]
    except ValueError:
        return None

items = list(range(100000))
target = 10  # Near beginning

start = time.time()
for _ in range(1000):
    find_slow(items, target)
slow = time.time() - start

start = time.time()
for _ in range(1000):
    find_fast(items, target)
fast = time.time() - start

print(f"No break: {slow:.4f}s")
print(f"With break: {fast:.4f}s")
print(f"Speedup: {slow/fast:.2f}x")
```

## Profile Your Code

```python
# Use timeit for accurate benchmarking
import timeit

# Compare different approaches
def approach1():
    return [x * 2 for x in range(1000)]

def approach2():
    return list(map(lambda x: x * 2, range(1000)))

def approach3():
    result = []
    for x in range(1000):
        result.append(x * 2)
    return result

# Time each approach
time1 = timeit.timeit(approach1, number=10000)
time2 = timeit.timeit(approach2, number=10000)
time3 = timeit.timeit(approach3, number=10000)

print(f"List comprehension: {time1:.4f}s")
print(f"Map: {time2:.4f}s")
print(f"For loop: {time3:.4f}s")

fastest = min(time1, time2, time3)
print(f"\nComprehension vs fastest: {time1/fastest:.2f}x")
print(f"Map vs fastest: {time2/fastest:.2f}x")
print(f"Loop vs fastest: {time3/fastest:.2f}x")
```

## Practical Optimization Example

```python
# Real-world example: Processing user data

# ❌ UNOPTIMIZED
def process_users_slow(users):
    import re
    results = []
    email_pattern = re.compile(r'^[\w\.-]+@[\w\.-]+\.\w+$')
    
    for user in users:
        # Repeated attribute lookups
        name = user['name']
        email = user['email']
        age = user['age']
        
        # String concatenation in loop
        full_info = ""
        full_info += name
        full_info += ","
        full_info += email
        full_info += ","
        full_info += str(age)
        
        # Regex compilation every iteration (moved outside now)
        if email_pattern.match(email):
            results.append(full_info)
    
    return results

# ✅ OPTIMIZED
def process_users_fast(users):
    import re
    # Compile regex once
    email_pattern = re.compile(r'^[\w\.-]+@[\w\.-]+\.\w+$')
    
    # Use comprehension with join
    return [
        f"{user['name']},{user['email']},{user['age']}"
        for user in users
        if email_pattern.match(user['email'])
    ]

# Test data
users = [
    {'name': f'User{i}', 'email': f'user{i}@example.com', 'age': 20 + i % 50}
    for i in range(10000)
]

start = time.time()
process_users_slow(users)
slow = time.time() - start

start = time.time()
process_users_fast(users)
fast = time.time() - start

print(f"Unoptimized: {slow:.4f}s")
print(f"Optimized: {fast:.4f}s")
print(f"Speedup: {slow/fast:.2f}x")
```

## Summary

**Key Optimization Techniques:**

1. **Move invariants outside loops**
   - Calculate constants before loop
   - Cache values that don't change

2. **Avoid repeated lookups**
   - Cache method references
   - Use local variables instead of globals

3. **Use comprehensions**
   - List/dict/set comprehensions are faster
   - Built-in functions beat manual loops

4. **Choose right data structures**
   - Use sets for membership testing
   - Use dicts for fast lookups
   - Consider NumPy for numerical work

5. **Minimize function calls**
   - Inline simple operations
   - Use built-in functions when available

6. **String operations**
   - Use join() instead of concatenation
   - Build list of parts, then join

7. **Break early**
   - Return/break as soon as possible
   - Don't continue unnecessary iterations

8. **Use iterators and generators**
   - Save memory with lazy evaluation
   - Chain operations efficiently

**Profiling Tools:**
- `timeit` - Accurate timing
- `cProfile` - Function-level profiling
- `line_profiler` - Line-by-line profiling

**Golden Rule:**
- **Profile first, optimize second**
- Focus on bottlenecks
- Readability matters - only optimize when needed
- Measure improvement with real data

Premature optimization is the root of all evil, but knowing these techniques helps you write efficient code from the start!
