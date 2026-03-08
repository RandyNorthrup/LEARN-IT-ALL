---
id: lesson-001-014
title: Pandas Indexing and Conditional Selection
chapterId: chapter-01
order: 14
duration: 5
objectives:
  - Use loc and iloc for label-based and position-based indexing
  - Filter DataFrame rows using boolean conditions
  - Select subsets of data using multiple criteria
---

# Pandas Indexing and Conditional Selection

Selecting specific data from a DataFrame is the most common operation in data analysis. Pandas provides several powerful methods for indexing and filtering.

## Selecting Columns

```python
import pandas as pd

df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'age': [25, 30, 35, 28],
    'salary': [50000, 60000, 70000, 55000]
})

# Single column (returns a Series)
print(df['name'])

# Multiple columns (returns a DataFrame)
print(df[['name', 'salary']])
```

## loc: Label-based Indexing

`loc` selects data by row and column **labels**:

```python
# Set a meaningful index
df = df.set_index('name')

# Select a single row by label
print(df.loc['Alice'])
# age       25
# salary    50000

# Select multiple rows
print(df.loc[['Alice', 'Charlie']])

# Select specific rows and columns
print(df.loc['Bob', 'salary'])        # 60000
print(df.loc['Alice':'Charlie', 'age'])  # Slice is inclusive!
```

## iloc: Position-based Indexing

`iloc` selects by integer **position** (zero-based):

```python
# First row
print(df.iloc[0])

# First two rows, first column
print(df.iloc[0:2, 0])

# Specific rows and columns by position
print(df.iloc[[0, 2], [0, 1]])

# Last row
print(df.iloc[-1])
```

## Conditional Selection (Boolean Indexing)

Filter rows based on conditions:

```python
# Reset index for clarity
df = df.reset_index()

# Rows where age > 28
print(df[df['age'] > 28])

# Rows where salary >= 60000
print(df[df['salary'] >= 60000])
```

## Multiple Conditions

Use `&` (and), `|` (or), and `~` (not). **Parentheses are required**:

```python
# Age > 25 AND salary > 55000
filtered = df[(df['age'] > 25) & (df['salary'] > 55000)]
print(filtered)

# Age < 28 OR salary > 65000
filtered = df[(df['age'] < 28) | (df['salary'] > 65000)]
print(filtered)

# NOT in a specific age group
filtered = df[~(df['age'] == 30)]
print(filtered)
```

## isin: Filtering by a List of Values

```python
# Select rows where name is Alice or Diana
selected = df[df['name'].isin(['Alice', 'Diana'])]
print(selected)

# Exclude specific values
excluded = df[~df['name'].isin(['Bob'])]
print(excluded)
```

## String Methods for Selection

```python
# Names that start with 'A'
print(df[df['name'].str.startswith('A')])

# Names containing 'li'
print(df[df['name'].str.contains('li')])
```

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/freecodecamp-intro-to-pandas" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c159*
