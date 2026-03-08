---
id: lesson-001-020
title: Data Cleaning Duplicates
chapterId: chapter-01
order: 20
duration: 5
objectives:
  - Detect duplicate rows in a DataFrame
  - Remove duplicates based on all or specific columns
  - Choose which duplicate to keep and understand the impact on analysis
---

# Data Cleaning Duplicates

Duplicate records are a common problem in real-world datasets. They can skew aggregations, inflate counts, and lead to incorrect conclusions. This lesson covers how to find and remove duplicates in Pandas.

## How Duplicates Occur

Duplicates can enter your data through:

- Multiple form submissions by the same user
- Overlapping data imports or merges
- Copy-paste errors in manual data entry
- System glitches that create redundant records

## Detecting Duplicates

Use `duplicated()` to find duplicate rows:

```python
import pandas as pd

df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob'],
    'email': ['a@test.com', 'b@test.com', 'a@test.com', 'c@test.com', 'b@test.com'],
    'age': [25, 30, 25, 35, 30]
})

# Check for exact duplicate rows
print(df.duplicated())
# 0    False
# 1    False
# 2     True  — duplicate of row 0
# 3    False
# 4     True  — duplicate of row 1

# Count total duplicates
print(f"Duplicate rows: {df.duplicated().sum()}")  # 2

# Show the duplicate rows
print(df[df.duplicated()])
```

## Check for Duplicates in Specific Columns

Sometimes rows are not exact duplicates but share key values:

```python
df = pd.DataFrame({
    'email': ['a@test.com', 'b@test.com', 'a@test.com', 'c@test.com'],
    'name': ['Alice', 'Bob', 'Alice Smith', 'Charlie'],
    'signup_date': ['2024-01-01', '2024-01-02', '2024-01-15', '2024-01-03']
})

# Duplicates based on email only
print(df.duplicated(subset=['email']))
# 0    False
# 1    False
# 2     True  — same email as row 0
# 3    False
```

## Removing Duplicates

Use `drop_duplicates()` to remove duplicate rows:

```python
# Remove exact duplicates (keep first occurrence)
df_clean = df.drop_duplicates()

# Remove duplicates based on specific columns
df_clean = df.drop_duplicates(subset=['email'])

# Keep the last occurrence instead of the first
df_clean = df.drop_duplicates(subset=['email'], keep='last')

# Remove ALL duplicates (keep neither)
df_clean = df.drop_duplicates(subset=['email'], keep=False)

print(df_clean)
```

## The keep Parameter

| Value | Behavior |
|---|---|
| `'first'` | Keep the first occurrence, drop later ones (default) |
| `'last'` | Keep the last occurrence, drop earlier ones |
| `False` | Drop ALL duplicates, keep none |

## Practical Example: Cleaning a User Dataset

```python
df = pd.DataFrame({
    'user_id': [1, 2, 3, 1, 4, 2],
    'action': ['login', 'login', 'signup', 'login', 'signup', 'purchase'],
    'timestamp': ['2024-01-01', '2024-01-01', '2024-01-02',
                  '2024-01-03', '2024-01-03', '2024-01-04']
})

print(f"Before: {len(df)} rows")

# If you want unique users, keep the most recent action
df_unique = df.sort_values('timestamp').drop_duplicates(
    subset=['user_id'], keep='last'
)

print(f"After: {len(df_unique)} rows")
print(df_unique)
```

Always check for duplicates early in your analysis. Even a small number of duplicates can distort averages, counts, and other statistics.

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/data-cleaning-rmotr-freecodecamp" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c15f*
