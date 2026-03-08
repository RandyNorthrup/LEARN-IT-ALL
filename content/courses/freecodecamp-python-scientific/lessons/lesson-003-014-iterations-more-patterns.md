---
id: lesson-003-014
title: Iterations: More Patterns
chapterId: chapter-03
order: 14
duration: 15
objectives:
  - Implement maximum and minimum finding patterns
  - Count items that match conditions
  - Use nested loops for two-dimensional patterns
  - Write list comprehensions as loop alternatives
---

# Iterations: More Patterns

## Maximum and Minimum Patterns

Finding the largest or smallest value is one of the most common loop patterns. The trick is to initialize your tracking variable with the **first element** (or use `None`):

```python
values = [41, 12, 87, 23, 56, 9, 74]

# Finding the maximum
largest = None

for value in values:
    if largest is None or value > largest:
        largest = value

print(f"Maximum: {largest}")   # 87
```

Using `None` as the initial value is a safer pattern than using an arbitrary number like `0` or `-999`, because it works correctly regardless of the data:

```python
# Finding the minimum
smallest = None

for value in values:
    if smallest is None or value < smallest:
        smallest = value

print(f"Minimum: {smallest}")   # 9
```

## Counting with Conditions

```python
# Count how many numbers are above a threshold
scores = [82, 65, 91, 78, 55, 94, 70, 88]
passing_count = 0

for score in scores:
    if score >= 70:
        passing_count += 1

total = len(scores)
print(f"{passing_count} out of {total} students passed.")
print(f"Pass rate: {passing_count / total * 100:.1f}%")
```

## Averaging Pattern

Combine summing and counting to compute an average:

```python
data = [23.5, 19.8, 27.1, 22.4, 25.0]
total = 0
count = 0

for value in data:
    total += value
    count += 1

average = total / count
print(f"Average: {average:.2f}")   # Average: 23.56
```

Of course, Python has built-in shortcuts:

```python
print(sum(data) / len(data))   # Same result
```

But understanding the manual pattern is essential for more complex scenarios.

## Nested Loops for 2D Patterns

Nested loops are useful for generating grids, tables, and two-dimensional patterns:

```python
# Print a rectangle of stars
rows = 4
cols = 6

for r in range(rows):
    for c in range(cols):
        print("*", end=" ")
    print()   # Move to the next line
```

**Output:**
```
* * * * * *
* * * * * *
* * * * * *
* * * * * *
```

```python
# Print a right triangle
for i in range(1, 6):
    print("*" * i)
```

**Output:**
```
*
**
***
****
*****
```

## List Comprehensions

A **list comprehension** is a concise way to create lists using a single expression. It can replace many loop patterns:

```python
# Traditional loop
squares = []
for x in range(1, 11):
    squares.append(x ** 2)

# List comprehension (same result)
squares = [x ** 2 for x in range(1, 11)]
print(squares)   # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

You can add a condition to filter:

```python
# Filter pattern as a list comprehension
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [n for n in numbers if n % 2 == 0]
print(evens)   # [2, 4, 6, 8, 10]
```

Combine mapping and filtering:

```python
# Squares of even numbers only
even_squares = [n ** 2 for n in range(1, 11) if n % 2 == 0]
print(even_squares)   # [4, 16, 36, 64, 100]
```

## `break` and `continue` Best Practices

- Use `break` to exit early when you've found what you need.
- Use `continue` to skip items that don't meet your criteria.
- Avoid overusing them — if a loop has many `break`/`continue` statements, consider restructuring.

```python
# Find the first negative number in a list
numbers = [5, 12, 8, -3, 7, -1]

for num in numbers:
    if num < 0:
        print(f"First negative: {num}")   # -3
        break
else:
    # This runs if the loop completed without break
    print("No negative numbers found.")
```

The `for/else` pattern is unique to Python: the `else` block runs only if the loop finishes normally (without `break`).

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
