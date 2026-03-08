---
id: lesson-003-049
title: Relational Database Design
chapterId: chapter-03
order: 49
duration: 5
objectives:
  - Apply normalization rules (1NF, 2NF, 3NF) to database design
  - Identify and eliminate data duplication in tables
  - Separate concerns into multiple related tables
  - Understand entity-relationship diagrams
---

# Relational Database Design

Creating a database is easy. Designing a **good** database takes thought. Poor design leads to duplicated data, inconsistencies, and headaches. Good design follows the principles of **normalization**.

## The Problem: Data Duplication

Consider storing music track data in a single table:

```
Tracks Table (BAD DESIGN):
+----+----------------+------------+---------+--------+-------+
| id | title          | artist     | album   | genre  | rating|
+----+----------------+------------+---------+--------+-------+
| 1  | Bohemian Rhap. | Queen      | ANOTO   | Rock   | 5     |
| 2  | We Will Rock U | Queen      | NOTW    | Rock   | 4     |
| 3  | Hey Jude       | Beatles    | Past M. | Rock   | 5     |
| 4  | Let It Be      | Beatles    | Let It B| Rock   | 4     |
| 5  | Radio Ga Ga    | Queen      | Works   | Rock   | 3     |
+----+----------------+------------+---------+--------+-------+
```

Problems with this design:
- **"Queen"** is stored three times. If you need to update the artist name, you must update every row.
- **"Rock"** is repeated for every track. If you rename a genre, you might miss a row.
- If you delete all Queen tracks, you lose the fact that Queen exists as an artist.

## Normalization

Normalization is the process of organizing data to minimize duplication. There are several **normal forms**, each building on the previous.

### First Normal Form (1NF)

Requirements:
- Each column holds a single value (no lists or sets)
- Each row is unique (has a primary key)

**Bad (violates 1NF):**
```
| id | name  | phones              |
|----|-------|---------------------|
| 1  | Alice | 555-1234, 555-5678  |  ← Multiple values!
```

**Good (1NF):**
```
Persons:            Phones:
| id | name  |      | person_id | phone    |
|----|-------|      |-----------|----------|
| 1  | Alice |      | 1         | 555-1234 |
                    | 1         | 555-5678 |
```

### Second Normal Form (2NF)

Requirements (must be in 1NF first):
- Every non-key column depends on the **entire** primary key, not just part of it

This mainly applies to tables with composite (multi-column) primary keys. If a column depends on only one part of the key, move it to its own table.

### Third Normal Form (3NF)

Requirements (must be in 2NF first):
- No non-key column depends on another non-key column (no **transitive dependencies**)

**Bad (violates 3NF):**
```
| student_id | student_name | dept_id | dept_name   |
|------------|-------------|---------|-------------|
| 1          | Alice       | CS      | Comp. Sci.  |
| 2          | Bob         | CS      | Comp. Sci.  |  ← dept_name repeated
```

`dept_name` depends on `dept_id`, not on `student_id`. Solution: separate the departments.

**Good (3NF):**
```
Students:                    Departments:
| id | name  | dept_id |     | id | name       |
|----|-------|---------|     |----|------------|
| 1  | Alice | CS      |     | CS | Comp. Sci. |
| 2  | Bob   | CS      |     | EE | Elec. Eng. |
```

## Designing a Multi-Table Schema

Let's redesign our music database properly:

```sql
CREATE TABLE artists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE genres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist_id INTEGER,
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);

CREATE TABLE tracks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    album_id INTEGER,
    genre_id INTEGER,
    rating INTEGER,
    FOREIGN KEY (album_id) REFERENCES albums(id),
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);
```

Now:
- Each artist name is stored **once** in the `artists` table
- Each genre name is stored **once** in the `genres` table
- Tracks reference artists and genres by **ID numbers** (foreign keys)
- Updating an artist name requires changing only **one row**

## Entity-Relationship Diagrams

Before writing SQL, sketch your design using an ER diagram:

```
[Artists] 1 ---- * [Albums] 1 ---- * [Tracks] * ---- 1 [Genres]
  id                 id                id               id
  name               title             title            name
                     artist_id         album_id
                                       genre_id
                                       rating
```

The notation `1 ---- *` means "one-to-many": one artist has many albums, one album has many tracks.

## Implementing in Python

```python
import sqlite3

conn = sqlite3.connect('music.db')
cur = conn.cursor()

# Create normalized tables
cur.executescript('''
    CREATE TABLE IF NOT EXISTS artists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
    );
    CREATE TABLE IF NOT EXISTS genres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
    );
    CREATE TABLE IF NOT EXISTS albums (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        artist_id INTEGER REFERENCES artists(id)
    );
    CREATE TABLE IF NOT EXISTS tracks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        album_id INTEGER REFERENCES albums(id),
        genre_id INTEGER REFERENCES genres(id),
        rating INTEGER DEFAULT 0
    );
''')

conn.commit()
print("Normalized music database created!")
conn.close()
```

Good database design is about thinking carefully **before** you write code. Taking the time to normalize your schema prevents countless problems down the road.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
