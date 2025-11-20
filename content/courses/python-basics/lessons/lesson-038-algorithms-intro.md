---
id: "80-algorithms-intro"
title: "Introduction to Algorithms"
chapterId: ch3-computing
order: 11
duration: 30
objectives:
  - Understand what algorithms are and why they matter
  - Learn to analyze algorithm efficiency with Big O notation
  - Recognize common algorithm patterns
  - Compare different approaches to solving problems
  - Apply algorithmic thinking to Python programming
---

# Introduction to Algorithms

An algorithm is a step-by-step procedure to solve a problem. Understanding algorithms and their efficiency is crucial for writing fast, scalable code.

## What is an Algorithm?

```python
def explain_algorithms():
    """Explain algorithm basics."""
    print("Algorithms:")
    
    print("\n1. What is an Algorithm?")
    print("   - Step-by-step procedure to solve a problem")
    print("   - Must be: Precise, Unambiguous, Finite, Correct")
    print("   - Input → Process → Output")
    
    print("\n2. Algorithm vs Code:")
    print("   - Algorithm: Abstract description (any language)")
    print("   - Code: Implementation in specific language (Python)")
    print("   - Same algorithm → Different code in different languages")
    
    print("\n3. Why Study Algorithms?")
    print("   - Efficiency: Solve problems faster")
    print("   - Scalability: Handle larger data")
    print("   - Optimization: Use less memory/time")
    print("   - Problem-solving: Recognize patterns")
    
    print("\n4. Algorithm Example (Find maximum):")
    print("""
   Algorithm: Find Maximum
   Input: List of numbers
   Output: Largest number
   
   1. Set max = first number
   2. For each remaining number:
      - If number > max:
        - Set max = number
   3. Return max
   """)

explain_algorithms()

# Implementation
def find_maximum(numbers):
    """Find maximum number in list."""
    if not numbers:
        return None
    
    max_num = numbers[0]
    
    for num in numbers[1:]:
        if num > max_num:
            max_num = num
    
    return max_num

numbers = [3, 7, 2, 9, 1, 5]
result = find_maximum(numbers)
print(f"Maximum of {numbers}: {result}")
```

## Algorithm Efficiency

```python
def explain_efficiency():
    """Explain algorithm efficiency."""
    print("\nAlgorithm Efficiency:")
    
    print("\n1. Why Efficiency Matters:")
    examples = [
        ("Small data (10 items)", "Any algorithm works fine"),
        ("Medium data (1,000 items)", "Slow algorithms noticeable"),
        ("Large data (1,000,000 items)", "Slow algorithms unusable"),
        ("Massive data (1,000,000,000 items)", "Only efficient algorithms work"),
    ]
    
    for size, impact in examples:
        print(f"   {size:30} {impact}")
    
    print("\n2. Measuring Efficiency:")
    print("   - Time Complexity: How long does it take?")
    print("   - Space Complexity: How much memory does it use?")
    print("   - Count operations, not actual time")
    print("   - Focus on growth rate as input size increases")
    
    print("\n3. Best, Average, Worst Case:")
    print("   - Best Case: Fastest possible (lucky input)")
    print("   - Average Case: Typical performance")
    print("   - Worst Case: Slowest possible (unlucky input)")
    print("   - Usually analyze worst case")

explain_efficiency()
```

## Big O Notation

```python
import time

def explain_big_o():
    """Explain Big O notation."""
    print("\nBig O Notation:")
    
    print("\n1. What is Big O?")
    print("   - Mathematical notation for algorithm efficiency")
    print("   - Describes how runtime grows with input size (n)")
    print("   - Ignores constants and lower-order terms")
    print("   - Focus on dominant term")
    
    print("\n2. Common Big O Complexities:")
    complexities = [
        ("O(1)", "Constant", "Same time regardless of input size", "Array access"),
        ("O(log n)", "Logarithmic", "Doubles input, adds constant time", "Binary search"),
        ("O(n)", "Linear", "Doubles input, doubles time", "Linear search"),
        ("O(n log n)", "Linearithmic", "Efficient sorting", "Merge sort"),
        ("O(n²)", "Quadratic", "Doubles input, 4x time", "Bubble sort"),
        ("O(n³)", "Cubic", "Doubles input, 8x time", "Matrix multiplication"),
        ("O(2ⁿ)", "Exponential", "Adds 1 input, doubles time", "Fibonacci (naive)"),
        ("O(n!)", "Factorial", "Extremely slow", "Traveling salesman"),
    ]
    
    print(f"\n   {'Big O':<12} {'Name':<15} {'Growth':<35} {'Example'}")
    print("   " + "-" * 90)
    for big_o, name, growth, example in complexities:
        print(f"   {big_o:<12} {name:<15} {growth:<35} {example}")
    
    print("\n3. Comparison (n=1000):")
    print("   O(1):        1 operation")
    print("   O(log n):    10 operations")
    print("   O(n):        1,000 operations")
    print("   O(n log n):  10,000 operations")
    print("   O(n²):       1,000,000 operations")
    print("   O(2ⁿ):       Too many to count!")

explain_big_o()

# O(1) - Constant time
def get_first_element(lst):
    """Access first element - O(1)."""
    if not lst:
        return None
    return lst[0]

# O(n) - Linear time
def find_element(lst, target):
    """Search for element - O(n)."""
    for i, item in enumerate(lst):
        if item == target:
            return i
    return -1

# O(n²) - Quadratic time
def find_duplicates(lst):
    """Find duplicates - O(n²) naive approach."""
    duplicates = []
    for i in range(len(lst)):
        for j in range(i + 1, len(lst)):
            if lst[i] == lst[j] and lst[i] not in duplicates:
                duplicates.append(lst[i])
    return duplicates

# O(n log n) - Linearithmic time
def efficient_sort(lst):
    """Sort list - O(n log n) using built-in."""
    return sorted(lst)

# Demonstrate time complexity differences
def measure_time(func, *args):
    """Measure function execution time."""
    start = time.time()
    result = func(*args)
    end = time.time()
    return end - start, result

print("\nTime Complexity Examples:")

# Test with different sizes
sizes = [100, 1000, 10000]

print("\nLinear Search O(n):")
for size in sizes:
    data = list(range(size))
    elapsed, _ = measure_time(find_element, data, -1)  # Worst case: not found
    print(f"  n={size:5}: {elapsed:.6f}s")

print("\nQuadratic Algorithm O(n²):")
for size in [100, 500, 1000]:  # Smaller sizes - quadratic is slow!
    data = list(range(size // 10)) * 10
    elapsed, _ = measure_time(find_duplicates, data)
    print(f"  n={size:5}: {elapsed:.6f}s")
```

## Common Algorithm Patterns

### Linear Search

```python
def linear_search(lst, target):
    """
    Search for target in list sequentially.
    Time: O(n) - Check each element
    Space: O(1) - No extra space
    """
    for i in range(len(lst)):
        if lst[i] == target:
            return i  # Found at index i
    return -1  # Not found

# Test
numbers = [5, 2, 8, 1, 9, 3]
print("\nLinear Search:")
print(f"List: {numbers}")
print(f"Search for 8: index {linear_search(numbers, 8)}")
print(f"Search for 7: index {linear_search(numbers, 7)}")
```

### Binary Search

```python
def binary_search(sorted_lst, target):
    """
    Search in sorted list by repeatedly halving.
    Time: O(log n) - Halve search space each step
    Space: O(1) - No extra space
    Requirement: List must be sorted!
    """
    left = 0
    right = len(sorted_lst) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if sorted_lst[mid] == target:
            return mid  # Found
        elif sorted_lst[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1  # Not found

# Test
sorted_numbers = [1, 2, 3, 5, 8, 9]
print("\nBinary Search:")
print(f"List: {sorted_numbers}")
print(f"Search for 8: index {binary_search(sorted_numbers, 8)}")
print(f"Search for 7: index {binary_search(sorted_numbers, 7)}")

# Compare efficiency
print("\nLinear vs Binary Search (n=1,000,000):")
large_list = list(range(1_000_000))

# Linear search (worst case)
start = time.time()
linear_search(large_list, 999999)
linear_time = time.time() - start
print(f"Linear search: {linear_time:.6f}s")

# Binary search (worst case)
start = time.time()
binary_search(large_list, 999999)
binary_time = time.time() - start
print(f"Binary search: {binary_time:.6f}s")
print(f"Binary is {linear_time / binary_time:.0f}x faster!")
```

### Bubble Sort

```python
def bubble_sort(lst):
    """
    Sort by repeatedly swapping adjacent elements.
    Time: O(n²) - Nested loops
    Space: O(1) - In-place sorting
    Simple but slow for large data.
    """
    n = len(lst)
    comparisons = 0
    swaps = 0
    
    # Make copy to avoid modifying original
    arr = lst.copy()
    
    for i in range(n):
        # Last i elements already in place
        for j in range(n - i - 1):
            comparisons += 1
            if arr[j] > arr[j + 1]:
                # Swap
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swaps += 1
    
    print(f"  Comparisons: {comparisons}, Swaps: {swaps}")
    return arr

numbers = [64, 34, 25, 12, 22, 11, 90]
print(f"\nBubble Sort O(n²):")
print(f"Original: {numbers}")
sorted_numbers = bubble_sort(numbers)
print(f"Sorted:   {sorted_numbers}")
```

### Efficient Sorting

```python
def merge_sort(lst):
    """
    Sort by dividing and merging.
    Time: O(n log n) - Divide & conquer
    Space: O(n) - Temporary arrays
    Fast for large data.
    """
    if len(lst) <= 1:
        return lst
    
    # Divide
    mid = len(lst) // 2
    left = merge_sort(lst[:mid])
    right = merge_sort(lst[mid:])
    
    # Merge
    return merge(left, right)

def merge(left, right):
    """Merge two sorted lists."""
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

numbers = [64, 34, 25, 12, 22, 11, 90]
print(f"\nMerge Sort O(n log n):")
print(f"Original: {numbers}")
sorted_numbers = merge_sort(numbers)
print(f"Sorted:   {sorted_numbers}")

# Compare sorting algorithms
print("\nSorting Comparison:")
sizes = [100, 1000, 5000]

for size in sizes:
    import random
    data = [random.randint(1, 1000) for _ in range(size)]
    
    print(f"\nn = {size}:")
    
    # Bubble sort
    start = time.time()
    bubble_sort(data.copy())
    bubble_time = time.time() - start
    print(f"  Bubble Sort O(n²):     {bubble_time:.6f}s")
    
    # Merge sort
    start = time.time()
    merge_sort(data.copy())
    merge_time = time.time() - start
    print(f"  Merge Sort O(n log n): {merge_time:.6f}s")
    
    # Python's built-in (Tim sort, O(n log n))
    start = time.time()
    sorted(data)
    builtin_time = time.time() - start
    print(f"  Built-in sorted():     {builtin_time:.6f}s")
```

## Algorithm Analysis Examples

```python
def analyze_algorithms():
    """Analyze algorithm complexity."""
    print("\nAlgorithm Analysis:")
    
    # Example 1: Single loop
    def example1(n):
        total = 0
        for i in range(n):  # n iterations
            total += i
        return total
    
    print("\n1. Single loop:")
    print("   for i in range(n):")
    print("       total += i")
    print("   Complexity: O(n) - Linear")
    
    # Example 2: Nested loops
    def example2(n):
        total = 0
        for i in range(n):  # n iterations
            for j in range(n):  # n iterations
                total += i * j
        return total
    
    print("\n2. Nested loops:")
    print("   for i in range(n):")
    print("       for j in range(n):")
    print("           total += i * j")
    print("   Complexity: O(n²) - Quadratic")
    
    # Example 3: Halving loop
    def example3(n):
        count = 0
        i = n
        while i > 0:
            count += 1
            i = i // 2  # Halve each time
        return count
    
    print("\n3. Halving loop:")
    print("   while i > 0:")
    print("       i = i // 2")
    print("   Complexity: O(log n) - Logarithmic")
    
    # Example 4: Constant time
    def example4(lst):
        if len(lst) > 0:
            return lst[0]
        return None
    
    print("\n4. Array access:")
    print("   return lst[0]")
    print("   Complexity: O(1) - Constant")
    
    # Demonstrate growth
    print("\n5. Growth Comparison (operations):")
    print(f"   {'n':<10} {'O(1)':<10} {'O(log n)':<12} {'O(n)':<12} {'O(n log n)':<15} {'O(n²)'}")
    print("   " + "-" * 70)
    
    import math
    for n in [10, 100, 1000, 10000]:
        o1 = 1
        olog = int(math.log2(n))
        on = n
        onlogn = int(n * math.log2(n))
        on2 = n * n
        
        print(f"   {n:<10} {o1:<10} {olog:<12} {on:<12} {onlogn:<15} {on2:,}")

analyze_algorithms()
```

## Practical Tips

```python
def algorithmic_thinking():
    """Tips for algorithmic thinking."""
    print("\nAlgorithmic Thinking Tips:")
    
    print("\n1. Understand the Problem:")
    print("   - What is the input?")
    print("   - What is the output?")
    print("   - What are the constraints?")
    print("   - What are edge cases?")
    
    print("\n2. Start Simple:")
    print("   - Get a working solution first")
    print("   - Optimize later if needed")
    print("   - 'Premature optimization is the root of all evil'")
    
    print("\n3. Consider Trade-offs:")
    print("   - Time vs Space")
    print("   - Simplicity vs Performance")
    print("   - Readability vs Speed")
    
    print("\n4. Recognize Patterns:")
    print("   - Two pointers")
    print("   - Sliding window")
    print("   - Divide and conquer")
    print("   - Dynamic programming")
    print("   - Greedy algorithms")
    
    print("\n5. Test and Measure:")
    print("   - Test with small inputs")
    print("   - Test edge cases")
    print("   - Measure actual performance")
    print("   - Profile before optimizing")
    
    print("\n6. Use Built-ins:")
    print("   - Python's sorted() is highly optimized")
    print("   - list, dict, set have efficient operations")
    print("   - Don't reinvent the wheel")

algorithmic_thinking()
```

## Summary

**Algorithms:**
- **Definition**: Step-by-step procedure to solve a problem
- **Properties**: Precise, unambiguous, finite, correct
- **Goal**: Solve problems efficiently

**Big O Notation:**
- **O(1)**: Constant - Best
- **O(log n)**: Logarithmic - Very good
- **O(n)**: Linear - Good
- **O(n log n)**: Linearithmic - Acceptable
- **O(n²)**: Quadratic - Slow for large data
- **O(2ⁿ)**: Exponential - Avoid if possible

**Common Patterns:**
- **Linear Search**: O(n) - Simple, any list
- **Binary Search**: O(log n) - Fast, sorted list only
- **Bubble Sort**: O(n²) - Simple, slow
- **Merge Sort**: O(n log n) - Fast, general-purpose

**Key Principles:**
1. Correctness first, optimization later
2. Consider time/space trade-offs
3. Measure actual performance
4. Use efficient data structures
5. Leverage built-in functions

Understanding algorithms helps you write faster, more scalable Python code that handles large datasets efficiently.
