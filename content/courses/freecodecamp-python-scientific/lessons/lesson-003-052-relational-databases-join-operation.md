---
id: lesson-003-052
title: Relational Databases: Join Operation
chapterId: chapter-03
order: 52
duration: 5
objectives:
  - Write INNER JOIN and LEFT JOIN queries to combine tables
  - Use table aliases for cleaner multi-table queries
  - Join three or more tables in a single query
  - Reconstruct complete views from normalized data
---

# Relational Databases: Join Operation

Normalization splits data across multiple tables to eliminate duplication. **JOIN** is how you put it back together. JOINs let you combine rows from two or more tables based on a related column.

## INNER JOIN

An **INNER JOIN** returns only the rows that have matching values in both tables:

```sql
SELECT albums.title, artists.name
FROM albums
INNER JOIN artists ON albums.artist_id = artists.id;
```

This matches each album with its artist. Albums without a valid `artist_id` (or artists with no albums) are excluded.

### How It Works

```
Albums:                      Artists:
+----+-----------+-----------+  +----+---------+
| id | title     | artist_id |  | id | name    |
+----+-----------+-----------+  +----+---------+
| 1  | ANOTO     | 1         |  | 1  | Queen   |
| 2  | Abbey Rd  | 2         |  | 2  | Beatles |
| 3  | Unknown   | 99        |  | 3  | Adele   |
+----+-----------+-----------+  +----+---------+

INNER JOIN Result:
+-----------+---------+
| title     | name    |
+-----------+---------+
| ANOTO     | Queen   |   ← Match: artist_id=1
| Abbey Rd  | Beatles |   ← Match: artist_id=2
+-----------+---------+

"Unknown" excluded (no artist with id=99)
Adele excluded (no albums reference her)
```

## Using Aliases

Table names can get long. Use **aliases** for cleaner queries:

```sql
SELECT a.title, ar.name
FROM albums AS a
INNER JOIN artists AS ar ON a.artist_id = ar.id;
```

The `AS` keyword is optional — you can write `FROM albums a` instead.

## LEFT JOIN

A **LEFT JOIN** returns all rows from the left table, even if there is no match in the right table. Unmatched columns are filled with `NULL`:

```sql
SELECT ar.name, a.title
FROM artists AS ar
LEFT JOIN albums AS a ON ar.id = a.artist_id;
```

```
Result:
+---------+-----------+
| name    | title     |
+---------+-----------+
| Queen   | ANOTO     |
| Beatles | Abbey Rd  |
| Adele   | NULL      |   ← No albums, but Adele still appears
+---------+-----------+
```

LEFT JOINs are useful for finding records **without** matches:

```sql
-- Find artists with no albums
SELECT ar.name
FROM artists AS ar
LEFT JOIN albums AS a ON ar.id = a.artist_id
WHERE a.id IS NULL;
```

## Joining Multiple Tables

You can chain JOINs to combine three or more tables:

```sql
SELECT t.title AS track, a.title AS album, ar.name AS artist, g.name AS genre
FROM tracks AS t
INNER JOIN albums AS a ON t.album_id = a.id
INNER JOIN artists AS ar ON a.artist_id = ar.id
INNER JOIN genres AS g ON t.genre_id = g.id
ORDER BY ar.name, a.title, t.title;
```

This reconstructs the full picture from our normalized schema: for each track, we see its album, artist, and genre — even though each piece is stored in a separate table.

## Implementing JOINs in Python

```python
import sqlite3

conn = sqlite3.connect('music.db')
cur = conn.cursor()

# Multi-table JOIN
cur.execute('''
    SELECT t.title, a.title, ar.name, g.name
    FROM tracks t
    JOIN albums a ON t.album_id = a.id
    JOIN artists ar ON a.artist_id = ar.id
    JOIN genres g ON t.genre_id = g.id
    ORDER BY ar.name
''')

print(f"{'Track':<25} {'Album':<22} {'Artist':<15} {'Genre'}")
print('-' * 75)
for track, album, artist, genre in cur.fetchall():
    print(f"{track:<25} {album:<22} {artist:<15} {genre}")

conn.close()
```

Output:
```
Track                     Album                  Artist          Genre
---------------------------------------------------------------------------
Let It Be                 Let It Be              The Beatles     Rock
Hey Jude                  Past Masters           The Beatles     Rock
Stairway to Heaven        Led Zeppelin IV        Led Zeppelin    Rock
Bohemian Rhapsody         A Night at the Opera   Queen           Rock
We Will Rock You          News of the World      Queen           Rock
```

## Aggregate Queries with JOINs

Combine JOINs with `GROUP BY` for powerful summaries:

```sql
-- Count tracks per artist
SELECT ar.name, COUNT(t.id) AS track_count
FROM artists ar
JOIN albums a ON ar.id = a.artist_id
JOIN tracks t ON a.id = t.album_id
GROUP BY ar.name
ORDER BY track_count DESC;
```

```python
cur.execute('''
    SELECT ar.name, COUNT(t.id) as num_tracks, COUNT(DISTINCT a.id) as num_albums
    FROM artists ar
    JOIN albums a ON ar.id = a.artist_id
    JOIN tracks t ON a.id = t.album_id
    GROUP BY ar.name
    ORDER BY num_tracks DESC
''')

for artist, tracks, albums in cur.fetchall():
    print(f"{artist}: {tracks} tracks across {albums} albums")
```

## JOINs with Conditions

Add `WHERE` clauses after the JOINs to filter results:

```sql
-- Find all Rock tracks by Queen
SELECT t.title, a.title AS album
FROM tracks t
JOIN albums a ON t.album_id = a.id
JOIN artists ar ON a.artist_id = ar.id
JOIN genres g ON t.genre_id = g.id
WHERE ar.name = 'Queen' AND g.name = 'Rock';
```

JOINs are the essential tool for querying normalized databases. They let you store data efficiently in separate tables while still being able to view it as a unified whole whenever you need to.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
