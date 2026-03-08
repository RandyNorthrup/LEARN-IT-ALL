---
id: lesson-001-027
title: Python Functions and Collections
chapterId: chapter-01
order: 27
duration: 5
objectives:
  - Define and use functions with parameters, defaults, and return values
  - Work with Python lists, tuples, dictionaries, and sets
  - Apply list comprehensions for concise data transformation
---

# Python Functions and Collections

Functions and collections are fundamental to writing clean, reusable data analysis code. This lesson covers function definitions and Python's built-in collection types that you will use daily.

## Defining Functions

```python
# Basic function
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))  # Hello, Alice!

# Default parameters
def calculate_tax(amount, rate=0.08):
    return amount * rate

print(calculate_tax(100))       # 8.0 (uses default rate)
print(calculate_tax(100, 0.10)) # 10.0 (custom rate)

# Multiple return values
def statistics(numbers):
    return min(numbers), max(numbers), sum(numbers) / len(numbers)

low, high, avg = statistics([10, 20, 30, 40, 50])
print(f"Min: {low}, Max: {high}, Avg: {avg}")
```

## Lambda Functions

Small anonymous functions, often used with `apply()` in Pandas:

```python
# Lambda function
double = lambda x: x * 2
print(double(5))  # 10

# Common use: sorting
records = [('Alice', 85), ('Bob', 92), ('Charlie', 78)]
sorted_records = sorted(records, key=lambda x: x[1], reverse=True)
print(sorted_records)  # [('Bob', 92), ('Alice', 85), ('Charlie', 78)]
```

## Lists

Lists are ordered, mutable collections:

```python
fruits = ['apple', 'banana', 'cherry']

fruits.append('date')       # Add to end
fruits.insert(1, 'avocado') # Insert at position
fruits.remove('banana')     # Remove by value
popped = fruits.pop()       # Remove and return last item

print(len(fruits))   # Length
print(fruits[0])     # First element
print(fruits[-1])    # Last element
print(fruits[1:3])   # Slice
```

## List Comprehensions

A concise way to create lists — essential for data transformation:

```python
# Basic comprehension
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition (filter)
evens = [x for x in range(20) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Transform strings
names = ['alice', 'bob', 'charlie']
titled = [name.title() for name in names]
print(titled)  # ['Alice', 'Bob', 'Charlie']
```

## Dictionaries

Key-value pairs, used constantly in Pandas DataFrame creation:

```python
student = {'name': 'Alice', 'age': 25, 'grade': 'A'}

print(student['name'])          # 'Alice'
student['email'] = 'a@test.com'  # Add key
print(student.keys())           # dict_keys(['name', 'age', 'grade', 'email'])
print(student.values())         # dict_values(['Alice', 25, 'A', 'a@test.com'])
print(student.get('phone', 'N/A'))  # 'N/A' (default if missing)

# Dictionary comprehension
square_dict = {x: x**2 for x in range(5)}
print(square_dict)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

## Tuples and Sets

```python
# Tuples: immutable, often used for coordinates or return values
point = (3, 4)
x, y = point  # Unpacking

# Sets: unique values, useful for finding distinct items
colors = {'red', 'blue', 'green', 'red'}  # Duplicates removed
print(colors)  # {'red', 'blue', 'green'}

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a & b)  # {3, 4} — intersection
print(a | b)  # {1, 2, 3, 4, 5, 6} — union
print(a - b)  # {1, 2} — difference
```

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/ds-content-python-under-10-minutes" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c166*
