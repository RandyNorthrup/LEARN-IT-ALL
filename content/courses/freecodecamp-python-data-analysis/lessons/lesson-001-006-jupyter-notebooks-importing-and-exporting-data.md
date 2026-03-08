---
id: lesson-001-006
title: Jupyter Notebooks Importing and Exporting Data
chapterId: chapter-01
order: 6
duration: 5
objectives:
  - Import data from CSV, Excel, and JSON files into a Jupyter Notebook
  - Export analysis results and DataFrames to various file formats
  - Upload and download files in Google Colab
---

# Jupyter Notebooks Importing and Exporting Data

One of the most important skills in data analysis is getting data into and out of your notebook. Jupyter Notebooks support importing data from many sources and exporting results in multiple formats.

## Importing CSV Files

CSV (Comma-Separated Values) is the most common data format. Use Pandas to load it:

```python
import pandas as pd

# Load from a local file
df = pd.read_csv('data/sales.csv')

# Load from a URL
url = 'https://example.com/data.csv'
df = pd.read_csv(url)

# Specify options
df = pd.read_csv('data.csv',
                 sep=';',           # Different delimiter
                 header=0,          # Row number for column names
                 index_col='id',    # Use a column as the index
                 na_values=['N/A', 'missing'])  # Custom missing values

print(df.head())
```

## Importing Excel Files

```python
# Requires openpyxl: pip install openpyxl
df = pd.read_excel('report.xlsx', sheet_name='Sheet1')

# Read all sheets into a dictionary of DataFrames
all_sheets = pd.read_excel('report.xlsx', sheet_name=None)
for name, sheet_df in all_sheets.items():
    print(f"Sheet: {name}, Shape: {sheet_df.shape}")
```

## Importing JSON Files

```python
# From a file
df = pd.read_json('data.json')

# From a URL (common with APIs)
df = pd.read_json('https://api.example.com/data')

# Nested JSON requires normalization
from pandas import json_normalize
import json

with open('nested.json') as f:
    data = json.load(f)
df = json_normalize(data, record_path='records')
```

## Exporting Data

Save your results in various formats:

```python
# To CSV
df.to_csv('output.csv', index=False)

# To Excel
df.to_excel('output.xlsx', sheet_name='Results', index=False)

# To JSON
df.to_json('output.json', orient='records')

# To clipboard (paste into spreadsheets)
df.to_clipboard()
```

## Working with Files in Google Colab

Google Colab runs in the cloud, so file handling is slightly different:

```python
# Upload files from your computer
from google.colab import files
uploaded = files.upload()  # Opens a file picker

# Read the uploaded file
import pandas as pd
import io
df = pd.read_csv(io.BytesIO(uploaded['data.csv']))

# Download a file to your computer
df.to_csv('results.csv', index=False)
files.download('results.csv')

# Mount Google Drive for persistent storage
from google.colab import drive
drive.mount('/content/drive')
df = pd.read_csv('/content/drive/MyDrive/data.csv')
```

## Exporting Notebooks

Jupyter Notebooks can be exported to other formats via **File → Download As**:

- **HTML** — Share as a static web page
- **PDF** — For reports and presentations
- **Python (.py)** — Extract just the code

More resources:

-  <a href="https://github.com/rmotr-curriculum/ds-content-interactive-jupyterlab-tutorial" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c151*
