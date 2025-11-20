---
id: list-slicing
title: List Slicing
chapterId: ch8-lists
order: 35
duration: 25
objectives:
  - Master list slicing syntax [start:stop:step]
  - Extract sublists using slice notation
  - Use negative indices in slices
  - Copy and reverse lists with slicing
  - Apply slicing to practical problems
---

# List Slicing

Slicing is a powerful technique for extracting portions of a list. It allows you to create sublists efficiently using concise syntax.

## Basic Slice Syntax

The slice syntax is: `list[start:stop:step]`

- **start**: Index where slice begins (inclusive)
- **stop**: Index where slice ends (exclusive)
- **step**: Interval between indices (default: 1)

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Get elements from index 2 to 5
slice1 = numbers[2:6]
print(slice1)  # [2, 3, 4, 5]

# Get first three elements
first_three = numbers[0:3]
print(first_three)  # [0, 1, 2]

# Get last three elements
last_three = numbers[7:10]
print(last_three)  # [7, 8, 9]
```

## Omitting Start, Stop, Step

You can omit parts of the slice to use defaults.

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Omit start (from beginning)
print(numbers[:5])    # [0, 1, 2, 3, 4]

# Omit stop (until end)
print(numbers[5:])    # [5, 6, 7, 8, 9]

# Omit both (copy entire list)
print(numbers[:])     # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Specify step
print(numbers[::2])   # [0, 2, 4, 6, 8] (every 2nd element)
print(numbers[1::2])  # [1, 3, 5, 7, 9] (odd indices)
```

## Negative Indices in Slices

Use negative indices to count from the end.

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Last three elements
print(numbers[-3:])    # [7, 8, 9]

# All except last two
print(numbers[:-2])    # [0, 1, 2, 3, 4, 5, 6, 7]

# From index 2 to third from end
print(numbers[2:-2])   # [2, 3, 4, 5, 6, 7]

# Middle elements
print(numbers[3:-3])   # [3, 4, 5, 6]
```

## Step Values

The step parameter controls the interval between elements.

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Every 2nd element
print(numbers[::2])    # [0, 2, 4, 6, 8]

# Every 3rd element
print(numbers[::3])    # [0, 3, 6, 9]

# Every 2nd element from index 1
print(numbers[1::2])   # [1, 3, 5, 7, 9]

# From 1 to 8, every 2nd element
print(numbers[1:8:2])  # [1, 3, 5, 7]
```

## Reversing with Slices

Use negative step to reverse a list or extract elements backwards.

```python
numbers = [0, 1, 2, 3, 4, 5]

# Reverse entire list
print(numbers[::-1])   # [5, 4, 3, 2, 1, 0]

# Reverse from index 1 to 4
print(numbers[4:1:-1]) # [4, 3, 2]

# Every 2nd element in reverse
print(numbers[::-2])   # [5, 3, 1]

# Palindrome check
word = "radar"
is_palindrome = word == word[::-1]
print(is_palindrome)   # True
```

## Copying Lists

Slicing creates a **shallow copy** of the list.

```python
original = [1, 2, 3, 4, 5]

# Create copy using slice
copy = original[:]
copy[0] = 99

print(original)  # [1, 2, 3, 4, 5] - unchanged
print(copy)      # [99, 2, 3, 4, 5]

# Alternative ways to copy
copy2 = original.copy()
copy3 = list(original)
```

## Modifying Slices

You can assign to slices to replace multiple elements.

```python
numbers = [0, 1, 2, 3, 4, 5]

# Replace slice with new values
numbers[1:4] = [10, 20, 30]
print(numbers)  # [0, 10, 20, 30, 4, 5]

# Replace with different length
numbers[1:3] = [100]
print(numbers)  # [0, 100, 30, 4, 5]

# Delete elements using empty list
numbers[1:3] = []
print(numbers)  # [0, 4, 5]

# Insert elements
numbers[1:1] = [1, 2, 3]
print(numbers)  # [0, 1, 2, 3, 4, 5]
```

## Practical Examples

### Example 1: Split List into Chunks
```python
data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Split into first half and second half
mid = len(data) // 2
first_half = data[:mid]
second_half = data[mid:]

print(f"First half: {first_half}")   # [1, 2, 3, 4, 5]
print(f"Second half: {second_half}") # [6, 7, 8, 9, 10]
```

### Example 2: Get Every Nth Element
```python
numbers = list(range(1, 21))  # 1 to 20

# Get every 3rd number
every_third = numbers[::3]
print(every_third)  # [1, 4, 7, 10, 13, 16, 19]

# Get every 5th number starting from index 2
every_fifth = numbers[2::5]
print(every_fifth)  # [3, 8, 13, 18]
```

### Example 3: Remove First and Last Elements
```python
data = [10, 20, 30, 40, 50]

# Remove first and last
middle = data[1:-1]
print(middle)  # [20, 30, 40]

# Keep only middle 3 elements
data = [1, 2, 3, 4, 5, 6, 7]
middle_three = data[2:-2]
print(middle_three)  # [3, 4, 5]
```

### Example 4: Pagination
```python
items = list(range(1, 51))  # 50 items
page_size = 10

# Get page 1 (items 0-9)
page_1 = items[0:page_size]
print(f"Page 1: {page_1}")

# Get page 3 (items 20-29)
page_num = 3
start = (page_num - 1) * page_size
end = start + page_size
page_3 = items[start:end]
print(f"Page 3: {page_3}")
```

### Example 5: Sliding Window
```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8]
window_size = 3

# Generate sliding windows
for i in range(len(numbers) - window_size + 1):
    window = numbers[i:i + window_size]
    print(f"Window {i}: {window}")

# Output:
# Window 0: [1, 2, 3]
# Window 1: [2, 3, 4]
# Window 2: [3, 4, 5]
# etc.
```

### Example 6: Extract Alternating Elements
```python
data = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

# Get even indices (0, 2, 4, 6)
evens = data[::2]
print(evens)  # ['a', 'c', 'e', 'g']

# Get odd indices (1, 3, 5, 7)
odds = data[1::2]
print(odds)   # ['b', 'd', 'f', 'h']
```

### Example 7: Reverse Last N Elements
```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8]
n = 3

# Reverse last 3 elements
numbers[-n:] = numbers[-n:][::-1]
print(numbers)  # [1, 2, 3, 4, 5, 8, 7, 6]
```

### Example 8: Check Palindrome
```python
def is_palindrome(items):
    """Check if list is palindrome using slicing"""
    return items == items[::-1]

print(is_palindrome([1, 2, 3, 2, 1]))  # True
print(is_palindrome([1, 2, 3, 4, 5]))  # False
print(is_palindrome(['a', 'b', 'a']))  # True
```

## Slice Object

You can create reusable slice objects.

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Create slice object
first_five = slice(0, 5)
last_three = slice(-3, None)

print(numbers[first_five])  # [0, 1, 2, 3, 4]
print(numbers[last_three])  # [7, 8, 9]

# Useful for consistent slicing
data_slice = slice(2, 8, 2)
print(numbers[data_slice])  # [2, 4, 6]
```

## Empty Slices

Slices can be empty if start >= stop.

```python
numbers = [1, 2, 3, 4, 5]

# Empty slices
print(numbers[3:3])   # []
print(numbers[5:3])   # []
print(numbers[10:20]) # []

# Safe slicing - no IndexError
print(numbers[100:])  # []
print(numbers[:100])  # [1, 2, 3, 4, 5]
```

## Common Mistakes

### Mistake 1: Confusing stop index (exclusive)
```python
numbers = [0, 1, 2, 3, 4]

# ❌ Wrong - expecting [0, 1, 2, 3]
result = numbers[0:3]  # Actually [0, 1, 2]

# ✅ Correct - stop is exclusive
result = numbers[0:4]  # [0, 1, 2, 3]
```

### Mistake 2: Modifying slice affects original
```python
original = [1, 2, 3, 4, 5]
view = original  # Not a slice, just reference!

view[0] = 99
print(original)  # [99, 2, 3, 4, 5] - modified!

# ✅ Correct - use slice to copy
copy = original[:]
copy[0] = 99
print(original)  # [1, 2, 3, 4, 5] - unchanged
```

### Mistake 3: Negative step with wrong indices
```python
numbers = [0, 1, 2, 3, 4, 5]

# ❌ Wrong - start > stop with negative step is empty
result = numbers[1:4:-1]  # []

# ✅ Correct - swap start and stop for negative step
result = numbers[4:1:-1]  # [4, 3, 2]
```

## Key Takeaways

- **Slice syntax**: `[start:stop:step]`
- **start** is inclusive, **stop** is exclusive
- Omit start to slice from beginning: `[:5]`
- Omit stop to slice until end: `[5:]`
- Use **negative indices** to count from end
- **step** controls interval (default: 1)
- **Negative step** reverses direction: `[::-1]`
- Slicing creates a **shallow copy**
- Slices **never raise IndexError** - they return empty list if invalid
- Can assign to slices to modify multiple elements

## Practice

Try these exercises:
1. Extract first 5 elements, last 5 elements, and middle 5 elements from a list
2. Create a function that returns every 3rd element from a list
3. Write code to reverse only the middle portion of a list
4. Implement pagination using slicing (10 items per page)
