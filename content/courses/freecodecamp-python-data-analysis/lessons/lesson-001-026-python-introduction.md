---
id: lesson-001-026
title: Python Introduction
chapterId: chapter-01
order: 26
duration: 5
objectives:
  - Review Python fundamentals needed for data analysis
  - Work with variables, data types, and basic operators
  - Use strings, numbers, and type conversion in data contexts
---

# Python Introduction

This lesson reviews the Python fundamentals you need for data analysis. If you are already comfortable with Python, this serves as a quick refresher. If you are new to Python, these concepts are essential building blocks.

## Variables and Data Types

Python variables are created by assignment. No type declaration is needed:

```python
# Numbers
age = 25              # int
temperature = 98.6    # float
complex_num = 3 + 4j  # complex

# Strings
name = "Alice"
city = 'New York'
multiline = """This is a
multiline string"""

# Booleans
is_active = True
is_empty = False

# None (represents no value)
result = None

# Check the type
print(type(age))      # <class 'int'>
print(type(name))     # <class 'str'>
```

## Arithmetic Operators

```python
a, b = 10, 3

print(a + b)   # 13  — addition
print(a - b)   # 7   — subtraction
print(a * b)   # 30  — multiplication
print(a / b)   # 3.333... — true division
print(a // b)  # 3   — floor division
print(a % b)   # 1   — modulus
print(a ** b)  # 1000 — power
```

## String Operations

Strings are heavily used in data analysis for column names, labels, and text data:

```python
name = "alice smith"

print(name.upper())       # 'ALICE SMITH'
print(name.title())       # 'Alice Smith'
print(name.split())       # ['alice', 'smith']
print(name.replace('alice', 'bob'))  # 'bob smith'
print(len(name))          # 11
print('alice' in name)    # True

# f-strings for formatting
age = 25
print(f"{name.title()} is {age} years old")  # 'Alice Smith is 25 years old'
```

## Type Conversion

Converting between types is common when loading data:

```python
# String to number
age_str = "25"
age_int = int(age_str)       # 25
price_str = "19.99"
price_float = float(price_str)  # 19.99

# Number to string
count = 42
count_str = str(count)  # "42"

# Boolean conversion
print(bool(0))    # False
print(bool(1))    # True
print(bool(""))   # False
print(bool("hi")) # True
```

## Comparison and Logic

```python
x = 10

# Comparisons
print(x > 5)    # True
print(x == 10)  # True
print(x != 5)   # True
print(x >= 10)  # True

# Logical operators
print(x > 5 and x < 20)  # True
print(x < 5 or x > 8)    # True
print(not x > 5)          # False
```

## Conditional Statements

```python
score = 85

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
else:
    grade = 'F'

print(f"Grade: {grade}")  # Grade: B
```

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/ds-content-python-under-10-minutes" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c165*
