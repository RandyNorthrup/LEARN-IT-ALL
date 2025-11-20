---
id: "82-performance-optimization"
title: "Performance and Optimization Concepts"
chapterId: ch3-computing
order: 13
duration: 30
objectives:
  - Understand performance measurement and profiling
  - Learn common performance bottlenecks
  - Recognize optimization strategies and trade-offs
  - Apply performance best practices in Python
  - Understand when and how to optimize code
---

# Performance and Optimization Concepts

Performance optimization makes programs run faster and use less resources. Understanding performance fundamentals helps you write efficient code and identify bottlenecks.

## Performance Fundamentals

```python
def explain_performance():
    """Explain performance concepts."""
    print("Performance Fundamentals:")
    
    print("\n1. What is Performance?")
    print("   - Speed: How fast does it run?")
    print("   - Throughput: How much work per time?")
    print("   - Latency: How long to respond?")
    print("   - Resource usage: CPU, memory, disk, network")
    print("   - Scalability: Performance with growing data")
    
    print("\n2. Why Performance Matters:")
    examples = [
        ("Web page load", "100ms delay = 1% sales loss"),
        ("Search query", "500ms too slow, users leave"),
        ("Data processing", "Hours vs minutes matters"),
        ("Battery life", "Efficiency = longer device use"),
        ("Cost", "Better performance = fewer servers"),
    ]
    
    for context, impact in examples:
        print(f"   {context:20} {impact}")
    
    print("\n3. Performance vs Other Factors:")
    print("   - Correctness: Must be correct first!")
    print("   - Maintainability: Readable code matters")
    print("   - Development time: Don't over-optimize")
    print("   - Premature optimization: Avoid optimizing too early")
    print("   - 'Make it work, make it right, make it fast'")

explain_performance()
```

## Measuring Performance

```python
import time
import timeit

def explain_measurement():
    """Explain performance measurement."""
    print("\nPerformance Measurement:")
    
    print("\n1. Why Measure?")
    print("   - 'You can't improve what you don't measure'")
    print("   - Avoid guessing where bottlenecks are")
    print("   - Verify optimizations actually help")
    print("   - Compare different approaches")
    
    print("\n2. What to Measure:")
    print("   - Execution time (most common)")
    print("   - Memory usage")
    print("   - CPU utilization")
    print("   - I/O operations")
    print("   - Network latency")
    
    print("\n3. Measurement Tools:")
    print("   - time module: Simple timing")
    print("   - timeit module: Accurate micro-benchmarks")
    print("   - cProfile: Function-level profiling")
    print("   - memory_profiler: Memory usage")
    print("   - perf, valgrind: System-level tools")

explain_measurement()

# Simple timing
def simple_timing():
    """Demonstrate simple timing."""
    print("\nSimple Timing Example:")
    
    # Time a function
    start = time.time()
    
    # Do some work
    total = sum(range(1000000))
    
    end = time.time()
    elapsed = end - start
    
    print(f"Calculated sum of 1-1000000: {total}")
    print(f"Time: {elapsed:.6f} seconds")

simple_timing()

# Better timing with timeit
def benchmark_comparison():
    """Compare different approaches."""
    print("\nBenchmark Comparison:")
    
    # Approach 1: List comprehension
    time1 = timeit.timeit(
        '[x**2 for x in range(1000)]',
        number=1000
    )
    
    # Approach 2: map with lambda
    time2 = timeit.timeit(
        'list(map(lambda x: x**2, range(1000)))',
        number=1000
    )
    
    # Approach 3: for loop
    time3 = timeit.timeit(
        '''
result = []
for x in range(1000):
    result.append(x**2)
        ''',
        number=1000
    )
    
    print("Square numbers 0-999 (1000 iterations):")
    print(f"  List comprehension: {time1:.6f}s")
    print(f"  map with lambda:    {time2:.6f}s")
    print(f"  for loop:           {time3:.6f}s")
    
    fastest = min(time1, time2, time3)
    print(f"\nList comprehension is {time2/time1:.2f}x faster than map")
    print(f"List comprehension is {time3/time1:.2f}x faster than loop")

benchmark_comparison()
```

## Common Bottlenecks

```python
def explain_bottlenecks():
    """Explain common performance bottlenecks."""
    print("\nCommon Performance Bottlenecks:")
    
    print("\n1. CPU-Bound:")
    print("   - Heavy computation")
    print("   - Complex algorithms")
    print("   - Inefficient loops")
    print("   - Solution: Optimize algorithm, use faster language (C), parallelize")
    
    print("\n2. Memory-Bound:")
    print("   - Large data structures")
    print("   - Memory allocations")
    print("   - Cache misses")
    print("   - Solution: Reduce memory usage, improve data layout")
    
    print("\n3. I/O-Bound:")
    print("   - Disk reads/writes")
    print("   - Network requests")
    print("   - Database queries")
    print("   - Solution: Cache, async I/O, batch operations")
    
    print("\n4. Algorithm Complexity:")
    print("   - O(n²) when O(n log n) possible")
    print("   - Nested loops")
    print("   - Repeated work")
    print("   - Solution: Better algorithm, memoization")

explain_bottlenecks()

# CPU-bound example
def cpu_bound_example():
    """Demonstrate CPU-bound operation."""
    print("\nCPU-Bound Example (Computing primes):")
    
    def is_prime(n):
        """Check if number is prime (inefficient)."""
        if n < 2:
            return False
        for i in range(2, n):
            if n % i == 0:
                return False
        return True
    
    start = time.time()
    primes = [n for n in range(2, 1000) if is_prime(n)]
    elapsed = time.time() - start
    
    print(f"Found {len(primes)} primes below 1000")
    print(f"Time: {elapsed:.6f}s")
    print("Bottleneck: Heavy computation in is_prime()")

cpu_bound_example()

# Memory-bound example
def memory_bound_example():
    """Demonstrate memory-bound operation."""
    print("\nMemory-Bound Example (Large list):")
    
    import sys
    
    # Create large list
    large_list = [x for x in range(1000000)]
    
    size_bytes = sys.getsizeof(large_list)
    size_mb = size_bytes / (1024 * 1024)
    
    print(f"List size: {size_mb:.2f} MB")
    print(f"List length: {len(large_list):,}")
    print("Bottleneck: Large memory allocation")

memory_bound_example()
```

## Optimization Strategies

```python
def explain_optimization_strategies():
    """Explain optimization strategies."""
    print("\nOptimization Strategies:")
    
    print("\n1. Algorithm Selection:")
    print("   - Choose efficient algorithms (O(n log n) vs O(n²))")
    print("   - Use appropriate data structures")
    print("   - Example: dict lookup O(1) vs list search O(n)")
    
    print("\n2. Caching/Memoization:")
    print("   - Store computed results")
    print("   - Avoid redundant calculations")
    print("   - Trade memory for speed")
    
    print("\n3. Lazy Evaluation:")
    print("   - Compute only when needed")
    print("   - Generators vs lists")
    print("   - Short-circuit evaluation")
    
    print("\n4. Batching:")
    print("   - Process multiple items together")
    print("   - Reduce overhead")
    print("   - Example: Batch database queries")
    
    print("\n5. Parallelization:")
    print("   - Use multiple CPU cores")
    print("   - Multi-threading, multi-processing")
    print("   - Be aware of GIL in Python")
    
    print("\n6. Code-Level Optimizations:")
    print("   - Use built-in functions (faster)")
    print("   - Avoid unnecessary work")
    print("   - Minimize function calls")
    print("   - Use local variables (faster than global)")

explain_optimization_strategies()
```

## Algorithm Selection Example

```python
import timeit

def algorithm_selection_demo():
    """Demonstrate algorithm selection impact."""
    print("\nAlgorithm Selection Impact:")
    
    # Problem: Find duplicates in a list
    test_data = list(range(1000)) + list(range(500))  # 500 duplicates
    
    # Approach 1: Nested loops O(n²)
    def find_duplicates_slow(lst):
        duplicates = []
        for i in range(len(lst)):
            for j in range(i + 1, len(lst)):
                if lst[i] == lst[j] and lst[i] not in duplicates:
                    duplicates.append(lst[i])
        return duplicates
    
    # Approach 2: Set comparison O(n)
    def find_duplicates_fast(lst):
        seen = set()
        duplicates = set()
        for item in lst:
            if item in seen:
                duplicates.add(item)
            seen.add(item)
        return list(duplicates)
    
    # Time both
    time_slow = timeit.timeit(lambda: find_duplicates_slow(test_data), number=10)
    time_fast = timeit.timeit(lambda: find_duplicates_fast(test_data), number=10)
    
    print(f"Finding duplicates in {len(test_data)} items (10 runs):")
    print(f"  O(n²) nested loops: {time_slow:.6f}s")
    print(f"  O(n) set approach:  {time_fast:.6f}s")
    print(f"  Speedup: {time_slow/time_fast:.0f}x faster with better algorithm!")

algorithm_selection_demo()
```

## Caching/Memoization

```python
from functools import lru_cache

def memoization_demo():
    """Demonstrate memoization benefits."""
    print("\nMemoization Example (Fibonacci):")
    
    # Without memoization (exponential time)
    def fib_slow(n):
        if n <= 1:
            return n
        return fib_slow(n-1) + fib_slow(n-2)
    
    # With memoization (linear time)
    @lru_cache(maxsize=None)
    def fib_fast(n):
        if n <= 1:
            return n
        return fib_fast(n-1) + fib_fast(n-2)
    
    # Compare
    print("\nCalculating fib(30):")
    
    start = time.time()
    result_slow = fib_slow(30)
    time_slow = time.time() - start
    print(f"  Without cache: {time_slow:.6f}s → {result_slow}")
    
    start = time.time()
    result_fast = fib_fast(30)
    time_fast = time.time() - start
    print(f"  With cache:    {time_fast:.6f}s → {result_fast}")
    
    print(f"  Speedup: {time_slow/time_fast:.0f}x faster!")
    
    # Show cache info
    print(f"\nCache statistics: {fib_fast.cache_info()}")

memoization_demo()
```

## Data Structure Choice

```python
def data_structure_comparison():
    """Compare data structure performance."""
    print("\nData Structure Performance:")
    
    # Setup
    n = 100000
    test_items = list(range(n))
    
    print(f"\nSearching for item in {n:,} elements:")
    
    # List search: O(n)
    test_list = test_items.copy()
    time_list = timeit.timeit(
        lambda: n-1 in test_list,
        number=1000
    )
    print(f"  List (O(n)):      {time_list:.6f}s")
    
    # Set search: O(1)
    test_set = set(test_items)
    time_set = timeit.timeit(
        lambda: n-1 in test_set,
        number=1000
    )
    print(f"  Set (O(1)):       {time_set:.6f}s")
    print(f"  Set is {time_list/time_set:.0f}x faster!")
    
    # Dict lookup: O(1)
    test_dict = {x: x for x in test_items}
    time_dict = timeit.timeit(
        lambda: n-1 in test_dict,
        number=1000
    )
    print(f"  Dict (O(1)):      {time_dict:.6f}s")

data_structure_comparison()
```

## Code-Level Optimizations

```python
def code_level_optimizations():
    """Demonstrate code-level optimizations."""
    print("\nCode-Level Optimizations:")
    
    # 1. Use built-ins
    print("\n1. Built-in Functions (sum vs manual loop):")
    
    numbers = list(range(10000))
    
    # Manual loop
    time_manual = timeit.timeit(
        '''
total = 0
for n in numbers:
    total += n
        ''',
        globals={'numbers': numbers},
        number=1000
    )
    
    # Built-in sum
    time_builtin = timeit.timeit(
        'sum(numbers)',
        globals={'numbers': numbers},
        number=1000
    )
    
    print(f"  Manual loop: {time_manual:.6f}s")
    print(f"  Built-in sum: {time_builtin:.6f}s")
    print(f"  Built-in is {time_manual/time_builtin:.1f}x faster")
    
    # 2. Local vs global variables
    print("\n2. Local vs Global Variables:")
    
    global_var = 10
    
    def use_global():
        total = 0
        for i in range(1000):
            total += global_var
        return total
    
    def use_local():
        local_var = 10
        total = 0
        for i in range(1000):
            total += local_var
        return total
    
    time_global = timeit.timeit(use_global, number=10000)
    time_local = timeit.timeit(use_local, number=10000)
    
    print(f"  Global variable: {time_global:.6f}s")
    print(f"  Local variable:  {time_local:.6f}s")
    print(f"  Local is {time_global/time_local:.1f}x faster")

code_level_optimizations()
```

## When to Optimize

```python
def when_to_optimize():
    """Guidelines for when to optimize."""
    print("\nWhen to Optimize:")
    
    print("\n1. Optimization Rules:")
    print("   Rule 1: Don't optimize")
    print("   Rule 2: (For experts only) Don't optimize yet")
    print("   Rule 3: Profile before optimizing")
    
    print("\n2. Optimization Process:")
    print("   Step 1: Make it work (correctness)")
    print("   Step 2: Make it right (clean code)")
    print("   Step 3: Measure performance")
    print("   Step 4: If too slow, profile to find bottleneck")
    print("   Step 5: Optimize the bottleneck")
    print("   Step 6: Measure again to verify improvement")
    print("   Step 7: Repeat if necessary")
    
    print("\n3. When NOT to Optimize:")
    print("   - Code runs fast enough already")
    print("   - No performance requirements")
    print("   - Optimization makes code unreadable")
    print("   - Development time too costly")
    print("   - Not a bottleneck (profile first!)")
    
    print("\n4. When to Optimize:")
    print("   - User-facing delays (UI lag)")
    print("   - Batch jobs taking too long")
    print("   - Server costs too high")
    print("   - Battery drain on mobile")
    print("   - After profiling shows clear bottleneck")

when_to_optimize()
```

## Profiling Example

```python
import cProfile
import pstats
from io import StringIO

def profiling_demo():
    """Demonstrate profiling."""
    print("\nProfiling Example:")
    
    def slow_function():
        """Function with performance issues."""
        # Intentionally inefficient code
        result = []
        for i in range(1000):
            for j in range(100):
                result.append(i * j)
        return result
    
    def fast_function():
        """Function with some computation."""
        return [i * j for i in range(1000) for j in range(100)]
    
    # Profile the code
    profiler = cProfile.Profile()
    profiler.enable()
    
    slow_function()
    fast_function()
    
    profiler.disable()
    
    # Print stats
    s = StringIO()
    stats = pstats.Stats(profiler, stream=s)
    stats.strip_dirs()
    stats.sort_stats('cumulative')
    stats.print_stats(10)  # Top 10 functions
    
    print(s.getvalue()[:500])  # Print first 500 chars
    print("\n... (profiling output) ...")
    print("\nProfiling shows which functions take the most time!")

profiling_demo()
```

## Optimization Trade-offs

```python
def explain_tradeoffs():
    """Explain optimization trade-offs."""
    print("\nOptimization Trade-offs:")
    
    print("\n1. Time vs Space:")
    print("   - Cache results: Faster but uses more memory")
    print("   - Compression: Less space but slower access")
    print("   - Indexing: Fast queries but extra storage")
    
    print("\n2. Simplicity vs Performance:")
    print("   - Simple code: Easy to maintain")
    print("   - Optimized code: May be complex")
    print("   - Balance readability and speed")
    
    print("\n3. Development Time vs Runtime:")
    print("   - Quick solution: Ships faster")
    print("   - Optimized solution: Takes longer to develop")
    print("   - Consider if optimization is worth effort")
    
    print("\n4. Premature vs Necessary Optimization:")
    print("   - Premature: Optimizing before knowing bottleneck")
    print("   - Necessary: Optimizing proven slow code")
    print("   - 'Premature optimization is the root of all evil' - Knuth")

explain_tradeoffs()
```

## Python Performance Tips

```python
def python_performance_tips():
    """Python-specific performance tips."""
    print("\nPython Performance Tips:")
    
    print("\n1. Use Built-in Functions and Methods:")
    print("   - sum(), min(), max(), sorted() are optimized")
    print("   - List/dict/set methods in C")
    
    print("\n2. Use List Comprehensions:")
    print("   - [x*2 for x in items]  # Faster than loop")
    
    print("\n3. Use Generators for Large Data:")
    print("   - (x*2 for x in items)  # Memory efficient")
    
    print("\n4. Choose Right Data Structure:")
    print("   - dict/set for lookups (O(1))")
    print("   - list for ordered data (O(n) search)")
    print("   - collections.deque for queues")
    
    print("\n5. Avoid Global Variables:")
    print("   - Local variable access is faster")
    
    print("\n6. Use 'in' with Sets, not Lists:")
    print("   - x in my_set  # O(1)")
    print("   - x in my_list # O(n)")
    
    print("\n7. String Concatenation:")
    print("   - ''.join(strings)  # Good")
    print("   - s += string       # Bad in loops")
    
    print("\n8. For CPU-intensive tasks:")
    print("   - Consider NumPy for numerical computing")
    print("   - Use multiprocessing for parallelism")
    print("   - Consider Cython or native extensions")

python_performance_tips()
```

## Summary

**Performance Fundamentals:**
- **Measure first**: Profile before optimizing
- **Bottlenecks**: CPU-bound, memory-bound, I/O-bound, algorithm complexity
- **Goals**: Speed, throughput, latency, resource usage, scalability

**Optimization Strategies:**
1. **Algorithm selection**: O(n log n) vs O(n²)
2. **Caching**: Store results to avoid recomputation
3. **Data structures**: Choose right structure (dict vs list)
4. **Built-ins**: Use optimized Python functions
5. **Lazy evaluation**: Compute only when needed
6. **Parallelization**: Use multiple cores

**When to Optimize:**
- Make it work → Make it right → Make it fast
- Profile to find actual bottlenecks
- Optimize only when necessary
- Balance performance with readability

**Trade-offs:**
- Time vs space (memory)
- Simplicity vs performance
- Development time vs runtime speed
- Premature vs necessary optimization

**Python Tips:**
- Use built-in functions (fast, optimized)
- List comprehensions over loops
- Generators for large data
- dict/set for O(1) lookups
- Local variables faster than global

Understanding performance concepts helps you write efficient Python code and make informed optimization decisions based on actual measurements, not guesses.
