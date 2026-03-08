---
id: lesson-001-025
title: Parsing HTML and Saving Data
chapterId: chapter-01
order: 25
duration: 5
objectives:
  - Extract tables from HTML web pages using Pandas
  - Parse HTML content with BeautifulSoup for custom scraping
  - Save analysis results in multiple output formats
---

# Parsing HTML and Saving Data

The web is a rich source of data. Pandas can read HTML tables directly from web pages, and Python's BeautifulSoup library handles more complex HTML parsing. This lesson also covers saving your processed data in various formats.

## Reading HTML Tables with Pandas

`pd.read_html()` scrapes all `<table>` elements from an HTML page:

```python
import pandas as pd

# Read tables from a URL
url = 'https://en.wikipedia.org/wiki/World_population'
tables = pd.read_html(url)

# pd.read_html returns a list of DataFrames (one per table)
print(f"Found {len(tables)} tables")

# Inspect the first table
df = tables[0]
print(df.head())
```

## Filtering Tables

When a page has many tables, use `match` to find the right one:

```python
# Find tables containing specific text
tables = pd.read_html(url, match='Population')
df = tables[0]
print(df.head())

# Read from a local HTML file
tables = pd.read_html('report.html')
```

## Parsing HTML with BeautifulSoup

For more complex scraping beyond simple tables:

```python
import requests
from bs4 import BeautifulSoup

# Fetch the page
response = requests.get('https://example.com')
soup = BeautifulSoup(response.text, 'html.parser')

# Find specific elements
title = soup.find('h1').text
links = [a['href'] for a in soup.find_all('a', href=True)]
paragraphs = [p.text for p in soup.find_all('p')]

# Extract a specific table
table = soup.find('table', {'class': 'data-table'})
rows = []
for tr in table.find_all('tr'):
    cells = [td.text.strip() for td in tr.find_all(['td', 'th'])]
    rows.append(cells)

df = pd.DataFrame(rows[1:], columns=rows[0])
print(df.head())
```

## Saving Data to Files

Once your data is cleaned and analyzed, save it:

### CSV

```python
df.to_csv('output.csv', index=False)

# With options
df.to_csv('output.csv',
          sep=',',
          index=False,
          na_rep='N/A',
          float_format='%.2f')
```

### Excel

```python
# Single sheet
df.to_excel('output.xlsx', sheet_name='Results', index=False)

# Multiple sheets
with pd.ExcelWriter('output.xlsx') as writer:
    df1.to_excel(writer, sheet_name='Summary', index=False)
    df2.to_excel(writer, sheet_name='Details', index=False)
```

### JSON

```python
# Different orientations
df.to_json('output.json', orient='records')   # List of objects
df.to_json('output.json', orient='columns')   # Dict of columns
df.to_json('output.json', orient='index')     # Dict of rows
```

### Parquet (Fast Binary Format)

```python
# Great for large datasets — faster and smaller than CSV
df.to_parquet('output.parquet')
df_loaded = pd.read_parquet('output.parquet')
```

## Best Practices

- Always check `robots.txt` before scraping a website
- Add delays between requests to avoid overloading servers
- Cache downloaded data locally to avoid repeated requests
- Use `index=False` when saving to CSV unless the index is meaningful

More resources:

-  <a href="https://github.com/krishnatray/RDP-Reading-Data-with-Python-and-Pandas" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c164*
