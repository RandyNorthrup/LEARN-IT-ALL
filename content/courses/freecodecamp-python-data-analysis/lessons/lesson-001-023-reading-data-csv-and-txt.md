---
id: lesson-001-023
title: Reading Data CSV and TXT
chapterId: chapter-01
order: 23
duration: 5
objectives:
  - Read CSV files with various delimiters and formatting options
  - Load fixed-width and tab-delimited text files
  - Handle common issues like headers, encodings, and mixed data types
---

# Reading Data CSV and TXT

CSV and text files are the most common formats for sharing data. While `pd.read_csv()` handles most cases, real-world files often have quirks that require additional parameters.

## Basic CSV Reading

```python
import pandas as pd

# Standard comma-separated file
df = pd.read_csv('data.csv')
print(df.head())
```

## Different Delimiters

Not all "CSV" files use commas. Common alternatives:

```python
# Tab-separated values (TSV)
df = pd.read_csv('data.tsv', sep='\t')

# Semicolon-separated (common in European locales)
df = pd.read_csv('data.csv', sep=';')

# Pipe-separated
df = pd.read_csv('data.txt', sep='|')

# Multiple whitespace (use regex)
df = pd.read_csv('data.txt', sep='\s+')  # One or more spaces
```

## Handling Headers

```python
# File has no header row
df = pd.read_csv('data.csv', header=None,
                 names=['col1', 'col2', 'col3'])

# Header is on a different row (e.g., row 2)
df = pd.read_csv('data.csv', header=2)

# Skip comment lines
df = pd.read_csv('data.csv', comment='#')
```

## Reading Text Files

Plain text files work the same way — just specify the delimiter:

```python
# Fixed-width file (each column has a set width)
df = pd.read_fwf('data.txt', widths=[10, 8, 12])

# Or specify column positions
df = pd.read_fwf('data.txt', colspecs=[(0, 10), (10, 18), (18, 30)])
```

## Selecting Specific Columns and Rows

```python
# Load only specific columns
df = pd.read_csv('data.csv', usecols=['name', 'age', 'salary'])

# Load only the first 100 rows
df = pd.read_csv('data.csv', nrows=100)

# Skip the first 5 rows
df = pd.read_csv('data.csv', skiprows=5)

# Skip specific rows by index
df = pd.read_csv('data.csv', skiprows=[0, 2, 4])

# Skip footer rows
df = pd.read_csv('data.csv', skipfooter=3, engine='python')
```

## Handling Dates

```python
# Parse date columns automatically
df = pd.read_csv('data.csv', parse_dates=['date_column'])

# Custom date format
df = pd.read_csv('data.csv', parse_dates=['date'],
                 date_format='%d/%m/%Y')

# Combine multiple columns into one date
df = pd.read_csv('data.csv',
                 parse_dates={'date': ['year', 'month', 'day']})
```

## Handling Missing Values

```python
# Custom missing value indicators
df = pd.read_csv('data.csv',
                 na_values=['NA', 'N/A', 'missing', '-', '?', ''])

# Keep default NaN values AND add custom ones
df = pd.read_csv('data.csv', na_values=['?'], keep_default_na=True)
```

## Writing CSV Files

```python
# Save to CSV
df.to_csv('output.csv', index=False)

# Custom options
df.to_csv('output.csv',
          sep=';',
          index=False,
          na_rep='MISSING',
          float_format='%.2f',
          columns=['name', 'age'])  # Only specific columns
```

More resources:

-  <a href="https://github.com/krishnatray/RDP-Reading-Data-with-Python-and-Pandas" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c162*
