---
id: "118-list-memory-performance"
title: "List Memory and Performance"
chapterId: ch8-lists
order: 10
duration: 25
objectives:
  - Understand list memory usage
  - Learn performance characteristics
  - Optimize list operations
  - Choose appropriate data structures
---

# List Memory and Performance

Understanding how lists work under the hood helps you write efficient code.

## Memory Layout

```python
import sys

# List overhead
empty_list = []
print(f"Empty list: {sys.getsizeof(empty_list)} bytes")  # ~56 bytes

# Memory grows with elements
for size in [1, 10, 100, 1000]:
    lst = list(range(size))
    bytes_used = sys.getsizeof(lst)
    print(f"{size:4d} elements: {bytes_used:6d} bytes ({bytes_used/size:.1f} bytes/element)")

# List pre-allocates space
lst = []
for i in range(20):
    lst.append(i)
    print(f"{i+1:2d} elements: {sys.getsizeof(lst):4d} bytes")
# Notice jumps - list over-allocates to avoid frequent resizing

# Element size matters
int_list = [1, 2, 3, 4, 5]
str_list = ["a", "b", "c", "d", "e"]
print(f"Int list: {sys.getsizeof(int_list)} bytes")
print(f"Str list: {sys.getsizeof(str_list)} bytes")
# Same size - list stores references, not values!

# Actual memory usage
def total_size(lst):
    """Calculate total memory including elements"""
    return sys.getsizeof(lst) + sum(sys.getsizeof(item) for item in lst)

numbers = [1, 2, 3, 4, 5]
words = ["hello", "world"]
print(f"Numbers total: {total_size(numbers)} bytes")
print(f"Words total: {total_size(words)} bytes")
```

## Time Complexity

```python
import time

# O(1) operations - constant time
def test_o1_operations():
    lst = list(range(100000))
    
    # Index access - O(1)
    start = time.time()
    for _ in range(10000):
        _ = lst[0]
        _ = lst[50000]
        _ = lst[-1]
    print(f"Index access: {time.time() - start:.6f}s")
    
    # Append - O(1) amortized
    start = time.time()
    for i in range(10000):
        lst.append(i)
    print(f"Append: {time.time() - start:.6f}s")
    
    # Pop last - O(1)
    start = time.time()
    for _ in range(10000):
        lst.pop()
    print(f"Pop last: {time.time() - start:.6f}s")

# O(n) operations - linear time
def test_on_operations():
    lst = list(range(10000))
    
    # Search - O(n)
    start = time.time()
    for _ in range(100):
        _ = 9999 in lst
    print(f"Search: {time.time() - start:.6f}s")
    
    # Insert at beginning - O(n)
    start = time.time()
    for i in range(100):
        lst.insert(0, i)
    print(f"Insert(0): {time.time() - start:.6f}s")
    
    # Remove - O(n)
    lst = list(range(1000))
    start = time.time()
    for _ in range(100):
        if 500 in lst:
            lst.remove(500)
    print(f"Remove: {time.time() - start:.6f}s")
    
    # Copy - O(n)
    lst = list(range(10000))
    start = time.time()
    for _ in range(1000):
        _ = lst[:]
    print(f"Copy: {time.time() - start:.6f}s")

# O(n log n) operations
def test_onlogn_operations():
    import random
    
    # Sort - O(n log n)
    for size in [100, 1000, 10000]:
        lst = [random.randint(0, 1000) for _ in range(size)]
        start = time.time()
        lst.sort()
        elapsed = time.time() - start
        print(f"Sort {size:5d} elements: {elapsed:.6f}s")

print("O(1) operations:")
test_o1_operations()
print("\nO(n) operations:")
test_on_operations()
print("\nO(n log n) operations:")
test_onlogn_operations()
```

## Operation Costs

```python
import time

# Compare different operations
def benchmark_operation(name, operation, iterations=10000):
    """Benchmark an operation"""
    start = time.time()
    for _ in range(iterations):
        operation()
    elapsed = time.time() - start
    print(f"{name:30s}: {elapsed:.6f}s ({elapsed/iterations*1e6:.3f} μs/op)")

# Setup
lst = list(range(1000))

# Benchmarks
benchmark_operation("Access first element", lambda: lst[0])
benchmark_operation("Access middle element", lambda: lst[500])
benchmark_operation("Access last element", lambda: lst[-1])
benchmark_operation("Append", lambda: lst.append(1))
benchmark_operation("Pop last", lambda: lst.pop())
benchmark_operation("Insert at beginning", lambda: lst.insert(0, 1))
benchmark_operation("Insert at middle", lambda: lst.insert(500, 1))
benchmark_operation("Remove from end", lambda: lst.pop() if lst else None)
benchmark_operation("Remove from middle", lambda: lst.pop(500) if len(lst) > 500 else None)
benchmark_operation("Search (in)", lambda: 500 in lst)
benchmark_operation("Count occurrences", lambda: lst.count(500))

# Key takeaway: Operations at the end are fast, at the beginning are slow
```

## Append Performance

```python
import time

# Why append is fast - over-allocation
def measure_append_times():
    """Measure time for each append"""
    lst = []
    times = []
    
    for i in range(1000):
        start = time.perf_counter()
        lst.append(i)
        elapsed = time.perf_counter() - start
        times.append(elapsed)
    
    # Find slow operations (reallocations)
    threshold = sum(times) / len(times) * 10
    slow_ops = [(i, t) for i, t in enumerate(times) if t > threshold]
    
    print(f"Total appends: {len(times)}")
    print(f"Slow operations: {len(slow_ops)}")
    print(f"Reallocation at: {[i for i, _ in slow_ops[:10]]}")
    # Notice pattern - reallocates at powers of 2

measure_append_times()

# Pre-allocation vs append
def compare_prealloc():
    n = 100000
    
    # Append
    start = time.time()
    lst = []
    for i in range(n):
        lst.append(i)
    append_time = time.time() - start
    
    # Pre-allocate
    start = time.time()
    lst = [0] * n
    for i in range(n):
        lst[i] = i
    prealloc_time = time.time() - start
    
    # List comprehension (fastest)
    start = time.time()
    lst = [i for i in range(n)]
    comp_time = time.time() - start
    
    print(f"\nAppend:        {append_time:.6f}s")
    print(f"Pre-allocate:  {prealloc_time:.6f}s")
    print(f"Comprehension: {comp_time:.6f}s")
    print(f"Speedup:       {append_time/comp_time:.2f}x")

compare_prealloc()
```

## List vs Other Data Structures

```python
import time
from collections import deque

# List vs deque for queue operations
def compare_list_deque():
    n = 10000
    
    # List - insert at beginning (slow)
    lst = []
    start = time.time()
    for i in range(n):
        lst.insert(0, i)
    list_time = time.time() - start
    
    # Deque - append to left (fast)
    dq = deque()
    start = time.time()
    for i in range(n):
        dq.appendleft(i)
    deque_time = time.time() - start
    
    print(f"List insert(0):   {list_time:.6f}s")
    print(f"Deque appendleft: {deque_time:.6f}s")
    print(f"Speedup:          {list_time/deque_time:.2f}x")

compare_list_deque()

# List vs set for membership testing
def compare_list_set():
    n = 10000
    data = list(range(n))
    data_set = set(data)
    
    # Search in list - O(n)
    start = time.time()
    for _ in range(1000):
        _ = n-1 in data
    list_time = time.time() - start
    
    # Search in set - O(1)
    start = time.time()
    for _ in range(1000):
        _ = n-1 in data_set
    set_time = time.time() - start
    
    print(f"\nList membership: {list_time:.6f}s")
    print(f"Set membership:  {set_time:.6f}s")
    print(f"Speedup:         {list_time/set_time:.2f}x")

compare_list_set()

# List vs dict for lookups
def compare_list_dict():
    n = 10000
    data = [(i, i*2) for i in range(n)]
    data_dict = dict(data)
    
    # Find in list - O(n)
    def find_in_list(lst, key):
        for k, v in lst:
            if k == key:
                return v
        return None
    
    start = time.time()
    for _ in range(1000):
        _ = find_in_list(data, n-1)
    list_time = time.time() - start
    
    # Find in dict - O(1)
    start = time.time()
    for _ in range(1000):
        _ = data_dict.get(n-1)
    dict_time = time.time() - start
    
    print(f"\nList lookup: {list_time:.6f}s")
    print(f"Dict lookup: {dict_time:.6f}s")
    print(f"Speedup:     {list_time/dict_time:.2f}x")

compare_list_dict()
```

## Memory Optimization

```python
import sys

# Avoid storing unnecessary references
def optimize_memory():
    # BAD - stores all intermediate results
    results = []
    for i in range(1000000):
        results.append(i ** 2)
    # Peak memory: ~40 MB
    
    # GOOD - generator (lazy evaluation)
    results = (i ** 2 for i in range(1000000))
    # Peak memory: ~200 bytes
    
    # Process one at a time
    for value in results:
        pass  # Process value

# Use __slots__ for many objects
class Point:
    """Regular class - each instance has __dict__"""
    def __init__(self, x, y):
        self.x = x
        self.y = y

class PointOptimized:
    """Optimized class - fixed attributes"""
    __slots__ = ['x', 'y']
    def __init__(self, x, y):
        self.x = x
        self.y = y

# Compare memory
points_regular = [Point(i, i) for i in range(1000)]
points_optimized = [PointOptimized(i, i) for i in range(1000)]

print(f"Regular:   {sys.getsizeof(points_regular[0])} bytes/object")
print(f"Optimized: {sys.getsizeof(points_optimized[0])} bytes/object")

# Share common data
# BAD - duplicate strings
users = [
    {"name": "Alice", "city": "New York"},
    {"name": "Bob", "city": "New York"},
    {"name": "Charlie", "city": "New York"},
]

# GOOD - share city reference
city = "New York"
users = [
    {"name": "Alice", "city": city},
    {"name": "Bob", "city": city},
    {"name": "Charlie", "city": city},
]
# All share same string object
```

## Performance Best Practices

```python
import time

# 1. Use comprehensions
def compare_comprehension():
    n = 100000
    
    # For loop with append
    start = time.time()
    result = []
    for i in range(n):
        result.append(i ** 2)
    loop_time = time.time() - start
    
    # Comprehension
    start = time.time()
    result = [i ** 2 for i in range(n)]
    comp_time = time.time() - start
    
    print(f"Loop:          {loop_time:.6f}s")
    print(f"Comprehension: {comp_time:.6f}s")
    print(f"Speedup:       {loop_time/comp_time:.2f}x")

compare_comprehension()

# 2. Use built-in functions
def compare_builtin():
    n = 100000
    data = list(range(n))
    
    # Manual sum
    start = time.time()
    total = 0
    for x in data:
        total += x
    manual_time = time.time() - start
    
    # Built-in sum
    start = time.time()
    total = sum(data)
    builtin_time = time.time() - start
    
    print(f"\nManual sum: {manual_time:.6f}s")
    print(f"Built-in:   {builtin_time:.6f}s")
    print(f"Speedup:    {manual_time/builtin_time:.2f}x")

compare_builtin()

# 3. Avoid repeated operations
def optimize_repeated():
    data = list(range(1000))
    
    # BAD - repeated len() call
    start = time.time()
    for _ in range(10000):
        for i in range(len(data)):
            _ = data[i]
    slow_time = time.time() - start
    
    # GOOD - cache len()
    start = time.time()
    for _ in range(10000):
        length = len(data)
        for i in range(length):
            _ = data[i]
    fast_time = time.time() - start
    
    # BETTER - iterate directly
    start = time.time()
    for _ in range(10000):
        for item in data:
            _ = item
    best_time = time.time() - start
    
    print(f"\nRepeated len(): {slow_time:.6f}s")
    print(f"Cached len():   {fast_time:.6f}s")
    print(f"Direct iter:    {best_time:.6f}s")

optimize_repeated()

# 4. Use appropriate methods
def optimize_operations():
    data = list(range(10000))
    
    # Remove duplicates
    # BAD - O(n²)
    start = time.time()
    result = []
    for item in data:
        if item not in result:
            result.append(item)
    slow_time = time.time() - start
    
    # GOOD - O(n)
    start = time.time()
    result = list(dict.fromkeys(data))
    fast_time = time.time() - start
    
    print(f"\nNaive dedupe: {slow_time:.6f}s")
    print(f"Fast dedupe:  {fast_time:.6f}s")
    print(f"Speedup:      {slow_time/fast_time:.2f}x")

optimize_operations()
```

## Profiling List Operations

```python
import cProfile
import pstats
from io import StringIO

def profile_list_operations():
    """Profile various list operations"""
    # Create large list
    data = list(range(100000))
    
    # Various operations
    # Append
    for i in range(10000):
        data.append(i)
    
    # Search
    for _ in range(100):
        _ = 50000 in data
    
    # Sort
    data.sort()
    
    # Comprehension
    squares = [x**2 for x in data[:1000]]
    
    # Filter
    evens = [x for x in data[:1000] if x % 2 == 0]

# Profile it
profiler = cProfile.Profile()
profiler.enable()
profile_list_operations()
profiler.disable()

# Print stats
stream = StringIO()
stats = pstats.Stats(profiler, stream=stream)
stats.sort_stats('cumulative')
stats.print_stats(10)
print(stream.getvalue())
```

## Summary

**Time Complexity:**

| Operation | Average | Worst | Notes |
|-----------|---------|-------|-------|
| Index | O(1) | O(1) | Very fast |
| Append | O(1) | O(n) | Amortized O(1) |
| Insert | O(n) | O(n) | Shifts elements |
| Remove | O(n) | O(n) | Shifts elements |
| Search | O(n) | O(n) | Linear scan |
| Sort | O(n log n) | O(n log n) | Timsort |
| Copy | O(n) | O(n) | All elements |

**Memory:**

- Empty list: ~56 bytes overhead
- Over-allocates for growth (~12% extra)
- Stores references, not values
- Each reference: 8 bytes (64-bit Python)

**Optimization Guidelines:**

1. **Use right data structure:**
   - List: Random access, append
   - Deque: Queue operations
   - Set: Membership testing
   - Dict: Key-value lookups

2. **Avoid expensive operations:**
   - Don't insert at beginning
   - Don't search in large lists
   - Don't copy unnecessarily

3. **Use efficient idioms:**
   - Comprehensions over loops
   - Built-ins over manual code
   - Generators for large data

**Remember:** "Premature optimization is the root of all evil" - profile first!
