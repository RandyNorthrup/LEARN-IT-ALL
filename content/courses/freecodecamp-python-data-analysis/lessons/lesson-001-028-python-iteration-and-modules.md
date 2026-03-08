---
id: lesson-001-028
title: Python Iteration and Modules
chapterId: chapter-01
order: 28
duration: 5
objectives:
  - Use for loops and while loops to iterate over data
  - Import and use Python modules and packages
  - Apply iteration patterns common in data analysis workflows
---

# Python Iteration and Modules

Iteration (looping) and modules (importing code) are essential Python skills for data analysis. While Pandas and NumPy minimize the need for explicit loops, understanding iteration is still important for custom logic and data processing pipelines.

## For Loops

```python
# Loop over a list
fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    print(fruit)

# Loop with index
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# Loop over a range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Loop over a dictionary
student = {'name': 'Alice', 'age': 25, 'grade': 'A'}
for key, value in student.items():
    print(f"{key}: {value}")
```

## While Loops

```python
count = 0
while count < 5:
    print(count)
    count += 1

# With break and continue
numbers = [1, 5, 3, 8, 2, 9, 4]
for n in numbers:
    if n == 8:
        break          # Stop the loop entirely
    if n < 3:
        continue       # Skip to next iteration
    print(n)           # Prints: 5, 3
```

## Useful Built-in Functions for Iteration

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

print(sum(numbers))    # 31
print(min(numbers))    # 1
print(max(numbers))    # 9
print(len(numbers))    # 8
print(sorted(numbers)) # [1, 1, 2, 3, 4, 5, 6, 9]

# zip: iterate over multiple sequences in parallel
names = ['Alice', 'Bob', 'Charlie']
scores = [85, 92, 78]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# map: apply a function to each element
result = list(map(str.upper, names))
print(result)  # ['ALICE', 'BOB', 'CHARLIE']

# filter: keep elements that pass a test
high_scores = list(filter(lambda x: x > 80, scores))
print(high_scores)  # [85, 92]
```

## Importing Modules

Modules let you use code written by others. This is how you access NumPy, Pandas, and other libraries:

```python
# Import the entire module
import math
print(math.sqrt(16))  # 4.0
print(math.pi)        # 3.14159...

# Import with an alias
import numpy as np
import pandas as pd

# Import specific functions
from math import sqrt, pi
print(sqrt(16))  # 4.0

# Import everything (generally discouraged)
from os.path import *
```

## Common Modules for Data Analysis

```python
# The standard data analysis stack
import numpy as np           # Numerical computing
import pandas as pd          # Data manipulation
import matplotlib.pyplot as plt  # Plotting
import seaborn as sns        # Statistical visualization

# Other useful standard library modules
import os          # File and directory operations
import json        # Parse JSON data
import csv         # Read/write CSV files
import datetime    # Date and time handling
import re          # Regular expressions for text processing
```

## Iteration in Data Analysis

While Pandas vectorized operations are preferred, loops are sometimes necessary:

```python
import pandas as pd

# Iterating over DataFrame rows (use sparingly)
df = pd.DataFrame({'name': ['Alice', 'Bob'], 'score': [85, 92]})
for index, row in df.iterrows():
    print(f"{row['name']}: {row['score']}")

# Better: use vectorized operations when possible
df['grade'] = df['score'].apply(lambda x: 'A' if x >= 90 else 'B')
```

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/ds-content-python-under-10-minutes" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c167*
