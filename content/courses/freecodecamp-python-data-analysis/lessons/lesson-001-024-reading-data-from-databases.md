---
id: lesson-001-024
title: Reading Data from Databases
chapterId: chapter-01
order: 24
duration: 5
objectives:
  - Connect to SQL databases from Python using SQLAlchemy
  - Execute SQL queries and load results into Pandas DataFrames
  - Understand when to use database sources versus file-based data
---

# Reading Data from Databases

Many real-world datasets live in databases rather than files. Pandas integrates with SQL databases through SQLAlchemy, letting you query databases and work with results as DataFrames.

## Why Read from Databases?

- **Live data** — Databases contain the most up-to-date information
- **Large datasets** — Query only what you need instead of loading entire files
- **Joins** — Combine related tables with SQL before loading into Python
- **Security** — Databases have access controls and audit trails

## Setting Up a Connection

Pandas uses SQLAlchemy to connect to databases:

```python
import pandas as pd
from sqlalchemy import create_engine

# SQLite (file-based, no server needed)
engine = create_engine('sqlite:///my_database.db')

# PostgreSQL
engine = create_engine('postgresql://user:password@localhost:5432/dbname')

# MySQL
engine = create_engine('mysql+pymysql://user:password@localhost:3306/dbname')
```

## Reading with SQL Queries

Use `pd.read_sql()` to execute a query and get a DataFrame:

```python
# Read from a simple query
df = pd.read_sql('SELECT * FROM customers', engine)
print(df.head())

# Read with conditions
df = pd.read_sql(
    'SELECT name, email, signup_date FROM customers WHERE active = 1',
    engine
)

# Read with joins
query = """
    SELECT c.name, o.product, o.amount
    FROM customers c
    JOIN orders o ON c.id = o.customer_id
    WHERE o.amount > 100
    ORDER BY o.amount DESC
"""
df = pd.read_sql(query, engine)
print(df.head())
```

## Reading an Entire Table

```python
# Load a full table
df = pd.read_sql_table('customers', engine)

# Load with specific columns
df = pd.read_sql_table('customers', engine, columns=['name', 'email'])
```

## Working with SQLite

SQLite is perfect for learning because it requires no server setup:

```python
import sqlite3
import pandas as pd

# Create a connection
conn = sqlite3.connect('example.db')

# Create a table and insert data
conn.execute('''
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY,
        name TEXT,
        grade REAL
    )
''')
conn.execute("INSERT INTO students VALUES (1, 'Alice', 92.5)")
conn.execute("INSERT INTO students VALUES (2, 'Bob', 85.0)")
conn.commit()

# Read into a DataFrame
df = pd.read_sql('SELECT * FROM students', conn)
print(df)

conn.close()
```

## Writing DataFrames to Databases

```python
df = pd.DataFrame({
    'name': ['Charlie', 'Diana'],
    'grade': [78.5, 91.0]
})

# Write to a database table
df.to_sql('students', engine, if_exists='append', index=False)

# if_exists options: 'fail', 'replace', 'append'
```

## Best Practices

- Use SQL for filtering and joining — let the database do the heavy lifting
- Only load the columns and rows you need
- Close connections when done
- Never hard-code passwords in scripts — use environment variables

More resources:

-  <a href="https://github.com/krishnatray/RDP-Reading-Data-with-Python-and-Pandas" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c163*
