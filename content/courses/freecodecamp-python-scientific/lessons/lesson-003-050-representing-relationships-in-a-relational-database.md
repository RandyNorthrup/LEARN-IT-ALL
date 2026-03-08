---
id: lesson-003-050
title: Representing Relationships in a Relational Database
chapterId: chapter-03
order: 50
duration: 5
objectives:
  - Define foreign keys to connect related tables
  - Model one-to-many and many-to-many relationships
  - Create junction tables for many-to-many relationships
  - Build a multi-table database schema with proper constraints
---

# Representing Relationships in a Relational Database

The power of relational databases comes from **relationships** between tables. Instead of duplicating data, you store each piece of information once and connect tables together using **foreign keys**.

## Foreign Keys

A **foreign key** is a column in one table that references the primary key of another table. It creates a link between the two tables.

```sql
CREATE TABLE artists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist_id INTEGER,
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);
```

Here, `albums.artist_id` is a foreign key pointing to `artists.id`. Each album "belongs to" an artist.

## One-to-Many Relationships

The most common relationship type. One record in table A relates to many records in table B:

- One **artist** has many **albums**
- One **album** has many **tracks**
- One **customer** has many **orders**

```
Artists:                Albums:
+----+---------+        +----+-----------+-----------+
| id | name    |        | id | title     | artist_id |
+----+---------+        +----+-----------+-----------+
| 1  | Queen   |        | 1  | ANOTO     | 1         |
| 2  | Beatles |        | 2  | The Works | 1         |
+----+---------+        | 3  | Abbey Rd  | 2         |
                        +----+-----------+-----------+
```

Queen (id=1) has two albums. Beatles (id=2) has one. The relationship is represented by storing the artist's `id` in each album row.

## Many-to-Many Relationships

Sometimes both sides can have multiple related records:

- A **student** can enroll in many **courses**
- A **course** can have many **students**

You cannot represent this with a single foreign key. Instead, you create a **junction table** (also called a bridge table or linking table):

```sql
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
);

CREATE TABLE enrollments (
    student_id INTEGER,
    course_id INTEGER,
    grade TEXT,
    enrolled_date TEXT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
```

```
Students:        Courses:          Enrollments:
+----+-------+   +----+----------+  +------------+-----------+-------+
| id | name  |   | id | title    |  | student_id | course_id | grade |
+----+-------+   +----+----------+  +------------+-----------+-------+
| 1  | Alice |   | 1  | Python   |  | 1          | 1         | A     |
| 2  | Bob   |   | 2  | SQL      |  | 1          | 2         | B+    |
+----+-------+   +----+----------+  | 2          | 1         | A-    |
                                    +------------+-----------+-------+
```

Alice is enrolled in Python and SQL. Both Alice and Bob are in Python. The junction table holds extra data like the grade.

## Building a Music Database Schema

Let's design a complete music database with multiple relationship types:

```python
import sqlite3

conn = sqlite3.connect('music.db')
cur = conn.cursor()

cur.executescript('''
    DROP TABLE IF EXISTS tracks;
    DROP TABLE IF EXISTS albums;
    DROP TABLE IF EXISTS artists;
    DROP TABLE IF EXISTS genres;
    DROP TABLE IF EXISTS playlist_tracks;
    DROP TABLE IF EXISTS playlists;

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
        year INTEGER,
        artist_id INTEGER NOT NULL,
        FOREIGN KEY (artist_id) REFERENCES artists(id)
    );

    CREATE TABLE tracks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        duration INTEGER,
        album_id INTEGER NOT NULL,
        genre_id INTEGER,
        FOREIGN KEY (album_id) REFERENCES albums(id),
        FOREIGN KEY (genre_id) REFERENCES genres(id)
    );

    -- Many-to-many: playlists <-> tracks
    CREATE TABLE playlists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );

    CREATE TABLE playlist_tracks (
        playlist_id INTEGER,
        track_id INTEGER,
        position INTEGER,
        PRIMARY KEY (playlist_id, track_id),
        FOREIGN KEY (playlist_id) REFERENCES playlists(id),
        FOREIGN KEY (track_id) REFERENCES tracks(id)
    );
''')

conn.commit()
print("Music database schema created!")
```

### Relationship Summary

```
[Artists] 1 ---< [Albums] 1 ---< [Tracks] >--- 1 [Genres]
                                    |
                              [PlaylistTracks]
                                    |
                               [Playlists]
```

- **Artists → Albums**: One-to-many (one artist, many albums)
- **Albums → Tracks**: One-to-many (one album, many tracks)
- **Genres → Tracks**: One-to-many (one genre, many tracks)
- **Playlists ↔ Tracks**: Many-to-many (via `playlist_tracks`)

## Enabling Foreign Key Enforcement

SQLite does not enforce foreign keys by default. Enable them explicitly:

```python
conn = sqlite3.connect('music.db')
conn.execute('PRAGMA foreign_keys = ON')

# Now this will fail if artist_id doesn't exist in artists:
cur = conn.cursor()
try:
    cur.execute('INSERT INTO albums (title, year, artist_id) VALUES (?, ?, ?)',
                ('Fake Album', 2024, 9999))
except sqlite3.IntegrityError as e:
    print(f"Constraint violated: {e}")
```

## The REFERENCES Constraint

The `REFERENCES` keyword creates the foreign key constraint:

```sql
-- Column-level constraint
create_col = '''artist_id INTEGER REFERENCES artists(id)'''

-- Table-level constraint (more explicit)
create_table = '''FOREIGN KEY (artist_id) REFERENCES artists(id)'''
```

Both forms work. The table-level form is preferred when you want the foreign key definition to be visually separate and easy to find.

Properly representing relationships is the foundation of relational database design. Foreign keys maintain **referential integrity** — ensuring that your data stays consistent and connected.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
