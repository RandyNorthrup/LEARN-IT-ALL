---
id: lesson-001-022
title: Reading Data Introduction
chapterId: chapter-01
order: 22
duration: 5
objectives:
  - Understand the different data formats commonly used in data analysis
  - Use Pandas read functions to load data from various sources
  - Inspect loaded data and handle common loading issues
---

# Reading Data Introduction

Before you can analyze data, you need to get it into Python. Pandas supports reading from a wide variety of sources — files, databases, URLs, and APIs. This lesson introduces the key data formats and how to load them.

## Common Data Formats

| Format | Extension | Pandas Function | Best For |
|---|---|---|---|
| CSV | .csv | `pd.read_csv()` | Most common tabular format |
| Excel | .xlsx | `pd.read_excel()` | Business reports |
| JSON | .json | `pd.read_json()` | API data, web data |
| SQL | — | `pd.read_sql()` | Database queries |
| HTML | .html | `pd.read_html()` | Tables from web pages |
| Parquet | .parquet | `pd.read_parquet()` | Large datasets, fast I/O |

## Reading from a File

```python
import pandas as pd

# The simplest case
df = pd.read_csv('data.csv')
print(df.head())
print(df.info())
```

## Reading from a URL

Pandas can read directly from web URLs:

```python
url = 'https://raw.githubusercontent.com/datasets/covid-19/main/data/countries-aggregated.csv'
df = pd.read_csv(url)
print(df.head())
print(df.shape)
```

## Common Parameters

Most `read_*` functions share these parameters:

```python
df = pd.read_csv(
    'data.csv',
    sep=',',              # Delimiter (default: comma)
    header=0,             # Row number for column names (default: 0)
    index_col=None,       # Column to use as index
    usecols=['A', 'B'],   # Only load specific columns
    nrows=1000,           # Only read first N rows
    skiprows=5,           # Skip first N rows
    na_values=['NA', '?', 'missing'],  # Custom missing value markers
    dtype={'age': int},   # Force column types
    parse_dates=['date'], # Parse columns as dates
    encoding='utf-8'      # Character encoding
)
```

## Handling Loading Issues

### Encoding Problems

```python
# Try different encodings if utf-8 fails
df = pd.read_csv('data.csv', encoding='latin-1')  # or 'iso-8859-1'
```

### Large Files

```python
# Read in chunks for very large files
chunks = pd.read_csv('large_file.csv', chunksize=10000)
for chunk in chunks:
    # Process each chunk
    print(chunk.shape)
```

### Preview Before Loading

```python
# Read just the first few rows to check format
preview = pd.read_csv('unknown_data.csv', nrows=5)
print(preview)
print(preview.dtypes)
```

## Quick Inspection After Loading

```python
df = pd.read_csv('data.csv')

print(df.shape)       # (rows, columns)
print(df.columns)     # Column names
print(df.dtypes)      # Data types
print(df.head())      # First 5 rows
print(df.describe())  # Summary statistics
print(df.isnull().sum())  # Missing values per column
```

More resources:

-  <a href="https://github.com/krishnatray/RDP-Reading-Data-with-Python-and-Pandas" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c161*
