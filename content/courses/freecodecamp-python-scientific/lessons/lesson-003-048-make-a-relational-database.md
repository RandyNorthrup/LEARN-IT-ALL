---
id: lesson-003-048
title: Make a Relational Database
chapterId: chapter-03
order: 48
duration: 5
objectives:
  - Understand why databases are essential for data persistence
  - Work with SQLite in Python using the sqlite3 module
  - Create tables with appropriate data types and primary keys
  - Perform complete CRUD operations (Create, Read, Update, Delete)
---

# Make a Relational Database

So far, our programs lose their data when they stop running. **Databases** solve this by providing persistent, structured storage that multiple programs can access concurrently.

## Why Databases?

You could store data in text files or CSV files, but databases offer critical advantages:

| Concern | Files | Databases |
|---------|-------|-----------|
| Persistence | Yes | Yes |
| Structure | Loose | Enforced schemas |
| Concurrent access | Dangerous | Safe (locking) |
| Querying | Manual parsing | SQL (powerful, fast) |
| Data integrity | No guarantees | Constraints, types |
| Scalability | Poor | Excellent |

## Relational Database Concepts

A relational database organizes data into **tables** (also called relations):

- A **table** is like a spreadsheet with a defined structure
- A **row** (record) represents one entity — one person, one order, one product
- A **column** (field) represents one attribute — name, email, price
- A **primary key** is a column that uniquely identifies each row

```
Users Table:
+----+----------+---------------------+-----+
| id | name     | email               | age |
+----+----------+---------------------+-----+
| 1  | Alice    | alice@example.com   | 30  |
| 2  | Bob      | bob@example.com     | 25  |
| 3  | Charlie  | charlie@example.com | 35  |
+----+----------+---------------------+-----+
```

## SQLite and Python

**SQLite** is a lightweight database built into Python — no installation required. It stores the entire database in a single file, making it perfect for learning and small applications.

### Connecting and Creating a Table

```python
import sqlite3

# Connect to a database (creates the file if it doesn't exist)
conn = sqlite3.connect('mydata.db')
cursor = conn.cursor()

# Create a table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        age INTEGER
    )
''')

conn.commit()  # Save changes
```

### Common SQLite Data Types

| SQLite Type | Python Type | Example |
|-------------|-------------|----------|
| `INTEGER` | `int` | `42` |
| `REAL` | `float` | `3.14` |
| `TEXT` | `str` | `'hello'` |
| `BLOB` | `bytes` | Binary data |
| `NULL` | `None` | Missing value |

## CRUD Operations

### Create (INSERT)

```python
# Insert a single row
cursor.execute('''
    INSERT INTO users (name, email, age) VALUES (?, ?, ?)
''', ('Alice', 'alice@example.com', 30))

# Insert multiple rows
users_data = [
    ('Bob', 'bob@example.com', 25),
    ('Charlie', 'charlie@example.com', 35),
    ('Diana', 'diana@example.com', 28)
]
cursor.executemany('''
    INSERT INTO users (name, email, age) VALUES (?, ?, ?)
''', users_data)

conn.commit()
```

> **Important:** Always use `?` placeholders instead of f-strings to prevent **SQL injection** attacks.

### Read (SELECT)

```python
# Fetch all rows
cursor.execute('SELECT * FROM users')
all_users = cursor.fetchall()
for user in all_users:
    print(user)  # (1, 'Alice', 'alice@example.com', 30)

# Fetch with conditions
cursor.execute('SELECT name, age FROM users WHERE age > ?', (27,))
for row in cursor.fetchall():
    print(f"{row[0]} is {row[1]} years old")

# Fetch one row
cursor.execute('SELECT * FROM users WHERE id = ?', (1,))
user = cursor.fetchone()
print(user)  # (1, 'Alice', 'alice@example.com', 30)
```

### Update

```python
cursor.execute('''
    UPDATE users SET age = ? WHERE name = ?
''', (31, 'Alice'))

conn.commit()
print(f"Rows updated: {cursor.rowcount}")  # 1
```

### Delete

```python
cursor.execute('DELETE FROM users WHERE name = ?', ('Charlie',))
conn.commit()
print(f"Rows deleted: {cursor.rowcount}")  # 1
```

## Complete Working Example

```python
import sqlite3

def create_database():
    conn = sqlite3.connect('books.db')
    cur = conn.cursor()
    
    # Create table
    cur.execute('''CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        year INTEGER,
        pages INTEGER
    )''')
    
    # Insert sample data
    books = [
        ('Python Crash Course', 'Eric Matthes', 2019, 544),
        ('Automate the Boring Stuff', 'Al Sweigart', 2019, 592),
        ('Fluent Python', 'Luciano Ramalho', 2022, 1012),
    ]
    cur.executemany('INSERT INTO books (title, author, year, pages) VALUES (?, ?, ?, ?)', books)
    conn.commit()
    
    # Query data
    cur.execute('SELECT title, author, pages FROM books ORDER BY pages DESC')
    print("Books by page count (descending):")
    for title, author, pages in cur.fetchall():
        print(f"  {title} by {author} ({pages} pages)")
    
    # Aggregate query
    cur.execute('SELECT COUNT(*), AVG(pages) FROM books')
    count, avg_pages = cur.fetchone()
    print(f"\n{count} books, average {avg_pages:.0f} pages")
    
    conn.close()

create_database()
```

Always close the connection when you're done, or use a context manager:

```python
with sqlite3.connect('books.db') as conn:
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM books')
    # Connection automatically commits on success
```

Databases are the backbone of almost every application. Mastering SQL and `sqlite3` gives you the foundation to work with any relational database system.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
