---
id: lesson-003-006
title: Copying Arrays Warning
chapterId: chapter-03
order: 6
duration: 5
objectives:
  - Understand the difference between array views and copies
  - Avoid common bugs caused by unintended shared references
  - Use the copy method to create independent array copies
---

# Copying Arrays Warning

One of the most common sources of bugs in NumPy code is the difference between **views** and **copies**. When you slice an array, NumPy returns a view that shares the same underlying data — modifying the view also modifies the original. Understanding this behavior is critical.

## The Problem: Views Share Data

Consider this example:

```python
import numpy as np

original = np.array([1, 2, 3, 4, 5])
slice_view = original[1:4]

# Modify the slice
slice_view[0] = 99

print(original)    # [1 99  3  4  5]  — original is changed!
print(slice_view)  # [99  3  4]
```

The slice `original[1:4]` did not create a new array. It created a **view** — a window into the same memory. Changing the view changed the original.

## Why Does NumPy Use Views?

Views exist for performance. If NumPy copied data every time you sliced an array, working with large datasets would be extremely slow and memory-intensive. Views allow you to work with sub-arrays at zero cost.

## How to Create a True Copy

When you need an independent copy, use the `.copy()` method:

```python
import numpy as np

original = np.array([1, 2, 3, 4, 5])
independent_copy = original[1:4].copy()

# Modify the copy
independent_copy[0] = 99

print(original)          # [1 2 3 4 5]  — original is unchanged
print(independent_copy)  # [99  3  4]
```

## Checking if an Array is a View

You can check whether an array owns its data using the `base` attribute:

```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
view = arr[1:4]
copy = arr[1:4].copy()

print(view.base is arr)  # True — view shares data with arr
print(copy.base is arr)  # False — copy has its own data
print(copy.base)         # None — no base means it owns its data
```

## Common Situations That Create Views

| Operation | Creates |
|---|---|
| `arr[1:4]` (slicing) | View |
| `arr.reshape(2, 3)` | View (usually) |
| `arr.T` (transpose) | View |
| `arr[[0, 2, 4]]` (fancy indexing) | Copy |
| `arr[arr > 3]` (boolean indexing) | Copy |

## The Assignment Trap

Python variable assignment also creates references, not copies:

```python
import numpy as np

a = np.array([1, 2, 3])
b = a        # b is the same object as a, not a copy
b[0] = 99
print(a)     # [99  2  3]  — a is changed!

# Correct approach
c = a.copy()  # c is a separate array
c[0] = 0
print(a)      # [99  2  3]  — a is unchanged
```

Always use `.copy()` when you intend to modify an array without affecting the original.

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a0a8e09c5df3cc3600ed7*
