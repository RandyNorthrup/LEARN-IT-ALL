---
id: "92-nested-loops"
title: "Nested Loops"
chapterId: ch5-loops
order: 3
duration: 25
objectives:
  - Understand nested loop structure
  - Create multi-dimensional patterns
  - Master loop nesting best practices
  - Optimize nested loop performance
---

# Nested Loops

Nested loops are loops inside other loops. They're essential for working with multi-dimensional data, creating patterns, and processing matrices.

## Basic Nested Loops

```python
# Outer loop runs 3 times
for i in range(3):
    # Inner loop runs 4 times for each outer iteration
    for j in range(4):
        print(f"i={i}, j={j}")

# Output shows all combinations:
# i=0, j=0
# i=0, j=1
# i=0, j=2
# i=0, j=3
# i=1, j=0
# i=1, j=1
# ... (12 total combinations)
```

## Multiplication Table

```python
# Create a multiplication table
print("Multiplication Table (1-10):")
print("-" * 50)

for i in range(1, 11):
    for j in range(1, 11):
        product = i * j
        print(f"{product:4}", end="")
    print()  # New line after each row

# Output:
#    1   2   3   4   5   6   7   8   9  10
#    2   4   6   8  10  12  14  16  18  20
#    3   6   9  12  15  18  21  24  27  30
# ... (10 rows total)
```

## Pattern Printing

```python
# Right triangle pattern
rows = 5
for i in range(1, rows + 1):
    for j in range(i):
        print("*", end="")
    print()

# Output:
# *
# **
# ***
# ****
# *****

# Inverted triangle
for i in range(rows, 0, -1):
    for j in range(i):
        print("*", end="")
    print()

# Output:
# *****
# ****
# ***
# **
# *

# Number pyramid
for i in range(1, 6):
    # Print spaces
    for j in range(5 - i):
        print(" ", end="")
    # Print numbers
    for j in range(i):
        print(i, end=" ")
    print()

# Output:
#     1
#    2 2
#   3 3 3
#  4 4 4 4
# 5 5 5 5 5
```

## Processing 2D Lists (Matrices)

```python
# Create a 2D list (3x4 matrix)
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]

# Access all elements
print("All elements:")
for row in matrix:
    for element in row:
        print(element, end=" ")
    print()

# Output:
# 1 2 3 4
# 5 6 7 8
# 9 10 11 12

# With indices
print("\nWith row and column indices:")
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        print(f"matrix[{i}][{j}] = {matrix[i][j]}")

# Sum all elements
total = 0
for row in matrix:
    for element in row:
        total += element
print(f"\nSum of all elements: {total}")  # 78
```

## Finding Elements in 2D Lists

```python
# Search for a value in matrix
def find_in_matrix(matrix, target):
    """Find target value and return position."""
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if matrix[i][j] == target:
                return (i, j)
    return None

matrix = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
]

position = find_in_matrix(matrix, 50)
print(f"Found 50 at position: {position}")  # (1, 1)

position = find_in_matrix(matrix, 100)
print(f"Found 100 at position: {position}")  # None

# Find all occurrences
def find_all_in_matrix(matrix, target):
    """Find all positions of target value."""
    positions = []
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if matrix[i][j] == target:
                positions.append((i, j))
    return positions

matrix_with_dupes = [
    [1, 2, 3],
    [2, 2, 4],
    [5, 2, 6]
]

positions = find_all_in_matrix(matrix_with_dupes, 2)
print(f"Found 2 at positions: {positions}")
# [(0, 1), (1, 0), (1, 1), (2, 1)]
```

## Matrix Operations

```python
# Transpose a matrix (swap rows and columns)
def transpose(matrix):
    """Transpose a matrix."""
    rows = len(matrix)
    cols = len(matrix[0])
    
    transposed = []
    for j in range(cols):
        new_row = []
        for i in range(rows):
            new_row.append(matrix[i][j])
        transposed.append(new_row)
    
    return transposed

matrix = [
    [1, 2, 3],
    [4, 5, 6]
]

print("Original:")
for row in matrix:
    print(row)

print("\nTransposed:")
result = transpose(matrix)
for row in result:
    print(row)

# Original:
# [1, 2, 3]
# [4, 5, 6]

# Transposed:
# [1, 4]
# [2, 5]
# [3, 6]
```

## Matrix Addition

```python
def add_matrices(matrix1, matrix2):
    """Add two matrices element-wise."""
    rows = len(matrix1)
    cols = len(matrix1[0])
    
    result = []
    for i in range(rows):
        row = []
        for j in range(cols):
            row.append(matrix1[i][j] + matrix2[i][j])
        result.append(row)
    
    return result

a = [
    [1, 2, 3],
    [4, 5, 6]
]

b = [
    [10, 20, 30],
    [40, 50, 60]
]

result = add_matrices(a, b)
print("Matrix A + Matrix B:")
for row in result:
    print(row)

# Output:
# [11, 22, 33]
# [44, 55, 66]
```

## Generating Combinations

```python
# Generate all pairs from two lists
colors = ["red", "green", "blue"]
sizes = ["small", "medium", "large"]

print("All combinations:")
for color in colors:
    for size in sizes:
        print(f"{size} {color}")

# Output:
# small red
# small green
# small blue
# medium red
# medium green
# medium blue
# large red
# large green
# large blue

# Create product catalog
products = []
for color in colors:
    for size in sizes:
        products.append({"color": color, "size": size})

print(f"\nTotal products: {len(products)}")
for product in products[:3]:
    print(product)

# Output:
# Total products: 9
# {'color': 'red', 'size': 'small'}
# {'color': 'red', 'size': 'medium'}
# {'color': 'red', 'size': 'large'}
```

## Breaking Out of Nested Loops

```python
# Find first occurrence and stop
def find_first_negative(matrix):
    """Find first negative number in matrix."""
    found = False
    result = None
    
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if matrix[i][j] < 0:
                result = (i, j, matrix[i][j])
                found = True
                break
        if found:
            break
    
    return result

matrix = [
    [1, 2, 3],
    [4, -5, 6],
    [-7, 8, 9]
]

result = find_first_negative(matrix)
if result:
    i, j, value = result
    print(f"First negative {value} at ({i}, {j})")
# First negative -5 at (1, 1)

# Using else clause
def check_all_positive(matrix):
    """Check if all elements are positive."""
    for row in matrix:
        for element in row:
            if element <= 0:
                print(f"Found non-positive: {element}")
                break
        else:
            continue
        break
    else:
        print("All elements are positive!")

matrix_pos = [[1, 2, 3], [4, 5, 6]]
check_all_positive(matrix_pos)
# All elements are positive!

check_all_positive(matrix)
# Found non-positive: -5
```

## Nested Loop Performance

```python
import time

# ❌ Inefficient: Nested loops with large ranges
def slow_approach(n):
    """Inefficient nested loops."""
    count = 0
    for i in range(n):
        for j in range(n):
            count += 1
    return count

# ✅ More efficient: Mathematical approach
def fast_approach(n):
    """Avoid unnecessary loops."""
    return n * n

# Performance comparison
n = 1000

start = time.time()
result1 = slow_approach(n)
time1 = time.time() - start

start = time.time()
result2 = fast_approach(n)
time2 = time.time() - start

print(f"Nested loops: {result1} in {time1:.4f}s")
print(f"Math formula: {result2} in {time2:.6f}s")
print(f"Speedup: {time1/time2:.1f}x faster")

# Nested loops: 1000000 in 0.0523s
# Math formula: 1000000 in 0.000002s
# Speedup: 26150.0x faster
```

## Triple Nested Loops

```python
# 3D data structure
cube = [
    [
        [1, 2],
        [3, 4]
    ],
    [
        [5, 6],
        [7, 8]
    ]
]

# Access all elements
print("3D cube elements:")
for i in range(len(cube)):
    for j in range(len(cube[i])):
        for k in range(len(cube[i][j])):
            print(f"cube[{i}][{j}][{k}] = {cube[i][j][k]}")

# Generate RGB color space samples
print("\nRGB color samples:")
for r in range(0, 256, 85):  # Sample every 85 values
    for g in range(0, 256, 85):
        for b in range(0, 256, 85):
            print(f"rgb({r}, {g}, {b})")

# rgb(0, 0, 0)     - Black
# rgb(0, 0, 85)
# rgb(0, 0, 170)
# ... (64 total combinations)
```

## Common Patterns

```python
# Pattern 1: Diamond shape
def print_diamond(n):
    """Print diamond pattern."""
    # Upper half
    for i in range(n):
        for j in range(n - i - 1):
            print(" ", end="")
        for j in range(2 * i + 1):
            print("*", end="")
        print()
    
    # Lower half
    for i in range(n - 2, -1, -1):
        for j in range(n - i - 1):
            print(" ", end="")
        for j in range(2 * i + 1):
            print("*", end="")
        print()

print_diamond(5)
#     *
#    ***
#   *****
#  *******
# *********
#  *******
#   *****
#    ***
#     *

# Pattern 2: Chess board
def print_chessboard(size):
    """Print chess board pattern."""
    for i in range(size):
        for j in range(size):
            if (i + j) % 2 == 0:
                print("⬜", end="")
            else:
                print("⬛", end="")
        print()

print("\nChessboard:")
print_chessboard(8)
```

## Best Practices

```python
# ✅ GOOD: Clear variable names
for row_index in range(rows):
    for col_index in range(cols):
        process(matrix[row_index][col_index])

# ❌ BAD: Unclear names
for i in range(rows):
    for j in range(cols):
        for k in range(depth):
            # Hard to track which dimension is which
            pass

# ✅ GOOD: Extract inner loop to function
def process_row(row):
    """Process a single row."""
    for element in row:
        print(element, end=" ")
    print()

for row in matrix:
    process_row(row)

# ✅ GOOD: Limit nesting depth (max 2-3 levels)
# If more needed, refactor into functions

# ✅ GOOD: Use enumerate when you need indices
for i, row in enumerate(matrix):
    for j, element in enumerate(row):
        print(f"[{i}][{j}] = {element}")
```

## Summary

**Nested Loop Basics:**
- Outer loop controls rows/major iterations
- Inner loop(s) control columns/minor iterations
- Total iterations = outer × inner × ... iterations

**Common Uses:**
- **2D data**: Matrices, grids, tables
- **Patterns**: Shapes, ASCII art
- **Combinations**: Generating all pairs/triplets
- **Multi-dimensional**: 3D arrays, tensor operations

**Performance Tips:**
- Avoid unnecessary nesting (use math when possible)
- Break early when target is found
- Extract inner loops to functions for clarity
- Consider list comprehensions for simple cases
- Limit nesting depth (2-3 levels max)

**Breaking Out:**
- Use flag variables
- Use `break` with `else` clause
- Return from function immediately
- Extract to separate function

Nested loops are powerful but can become complex quickly. Keep them simple, well-named, and limit nesting depth!
