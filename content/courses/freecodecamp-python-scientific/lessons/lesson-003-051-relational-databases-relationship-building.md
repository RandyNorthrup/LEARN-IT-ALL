---
id: lesson-003-051
title: Relational Databases: Relationship Building
chapterId: chapter-03
order: 51
duration: 5
objectives:
  - Insert data with foreign key references between tables
  - Load data from files into related database tables
  - Maintain referential integrity when building data
  - Use INSERT OR IGNORE and SELECT to link records
---

# Relational Databases: Relationship Building

Once you have designed a normalized schema with foreign keys, the next step is **populating it with data**. Inserting into related tables requires careful ordering and linking.

## The Insert Order Problem

With foreign keys, you must insert **parent records before child records**. You cannot insert an album for an artist that does not exist yet:

```python
import sqlite3

conn = sqlite3.connect('music.db')
conn.execute('PRAGMA foreign_keys = ON')
cur = conn.cursor()

# CORRECT order: artist first, then album
cur.execute('INSERT INTO artists (name) VALUES (?)', ('Queen',))
artist_id = cur.lastrowid  # Get the auto-generated ID

cur.execute('INSERT INTO albums (title, year, artist_id) VALUES (?, ?, ?)',
            ('A Night at the Opera', 1975, artist_id))

conn.commit()
```

The key technique: after inserting the parent record, use `cursor.lastrowid` to get the auto-generated primary key, then use it as the foreign key in the child record.

## INSERT OR IGNORE: Avoiding Duplicates

When loading data, you often encounter duplicates. Use `INSERT OR IGNORE` to skip rows that would violate a `UNIQUE` constraint:

```python
# This is safe to run multiple times
cur.execute('INSERT OR IGNORE INTO artists (name) VALUES (?)', ('Queen',))
cur.execute('INSERT OR IGNORE INTO artists (name) VALUES (?)', ('Queen',))  # Silently skipped
cur.execute('INSERT OR IGNORE INTO genres (name) VALUES (?)', ('Rock',))
```

## The Lookup Pattern: INSERT then SELECT

The standard pattern for building relationships is:
1. Insert the record (or ignore if it exists)
2. Look up its ID
3. Use that ID as a foreign key

```python
def get_or_create(cur, table, name):
    """Insert a record if it doesn't exist, then return its ID."""
    cur.execute(f'INSERT OR IGNORE INTO {table} (name) VALUES (?)', (name,))
    cur.execute(f'SELECT id FROM {table} WHERE name = ?', (name,))
    return cur.fetchone()[0]

# Usage
artist_id = get_or_create(cur, 'artists', 'Queen')
genre_id = get_or_create(cur, 'genres', 'Rock')

print(f"Artist ID: {artist_id}, Genre ID: {genre_id}")
```

This function works whether the record already exists or needs to be created.

## Loading Data from Files

Real-world data often comes from CSV files, JSON, or other sources. Here is a complete example loading music data from a structured format:

```python
import sqlite3

# Sample data (could come from a CSV or API)
track_data = [
    ('Bohemian Rhapsody', 'Queen', 'A Night at the Opera', 'Rock', 1975),
    ('We Will Rock You', 'Queen', 'News of the World', 'Rock', 1977),
    ('Hey Jude', 'The Beatles', 'Past Masters', 'Rock', 1968),
    ('Let It Be', 'The Beatles', 'Let It Be', 'Rock', 1970),
    ('Stairway to Heaven', 'Led Zeppelin', 'Led Zeppelin IV', 'Rock', 1971),
]

conn = sqlite3.connect('music.db')
conn.execute('PRAGMA foreign_keys = ON')
cur = conn.cursor()

for title, artist_name, album_title, genre_name, year in track_data:
    # Step 1: Ensure parent records exist and get their IDs
    cur.execute('INSERT OR IGNORE INTO artists (name) VALUES (?)', (artist_name,))
    cur.execute('SELECT id FROM artists WHERE name = ?', (artist_name,))
    artist_id = cur.fetchone()[0]
    
    cur.execute('INSERT OR IGNORE INTO genres (name) VALUES (?)', (genre_name,))
    cur.execute('SELECT id FROM genres WHERE name = ?', (genre_name,))
    genre_id = cur.fetchone()[0]
    
    # Step 2: Insert album (linked to artist)
    cur.execute('INSERT OR IGNORE INTO albums (title, year, artist_id) VALUES (?, ?, ?)',
                (album_title, year, artist_id))
    cur.execute('SELECT id FROM albums WHERE title = ? AND artist_id = ?',
                (album_title, artist_id))
    album_id = cur.fetchone()[0]
    
    # Step 3: Insert track (linked to album and genre)
    cur.execute('INSERT OR IGNORE INTO tracks (title, album_id, genre_id) VALUES (?, ?, ?)',
                (title, album_id, genre_id))
    print(f"  Loaded: {title} by {artist_name}")

conn.commit()
```

## Loading from CSV Files

```python
import sqlite3
import csv

conn = sqlite3.connect('music.db')
cur = conn.cursor()

with open('tracks.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        # Use the same lookup pattern
        cur.execute('INSERT OR IGNORE INTO artists (name) VALUES (?)',
                    (row['artist'],))
        cur.execute('SELECT id FROM artists WHERE name = ?',
                    (row['artist'],))
        artist_id = cur.fetchone()[0]
        
        # Continue with album and track insertion...

conn.commit()
conn.close()
```

## Maintaining Referential Integrity

Referential integrity means every foreign key value must correspond to an existing primary key. Here are strategies to maintain it:

### Constraint Actions

SQL supports actions when a referenced record is deleted or updated:

```sql
CREATE TABLE albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist_id INTEGER,
    FOREIGN KEY (artist_id) REFERENCES artists(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

| Action | Behavior |
|--------|----------|
| `CASCADE` | Delete/update child rows automatically |
| `SET NULL` | Set foreign key to NULL |
| `RESTRICT` | Prevent the delete/update |
| `NO ACTION` | Default; similar to RESTRICT |

### Verifying Data Integrity

```python
# Check for orphaned records (tracks with no valid album)
cur.execute('''
    SELECT t.title, t.album_id
    FROM tracks t
    LEFT JOIN albums a ON t.album_id = a.id
    WHERE a.id IS NULL
''')
orphans = cur.fetchall()
if orphans:
    print(f"Found {len(orphans)} orphaned tracks!")
else:
    print("All tracks have valid album references.")
```

Building relationships carefully ensures your database stays consistent and trustworthy. The INSERT-then-SELECT pattern is one of the most important techniques in database programming.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
