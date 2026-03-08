---
id: lesson-008-001
title: "SQL — Build a Student Database (Part 2)"
chapterId: chapter-08
order: 6
duration: 180
objectives:
  - Define foreign keys to create relationships between tables
  - Perform INNER, LEFT, RIGHT, and FULL JOINs to combine data from multiple tables
  - Use aggregate functions (COUNT, SUM, AVG, MIN, MAX) with GROUP BY and HAVING
  - Write subqueries and use pattern matching with LIKE and ILIKE
  - Build a Bash script that reads CSV data and inserts it into PostgreSQL
  - Design a normalized relational database schema with junction tables
---

# SQL — Build a Student Database (Part 2)

In Part 1, you built individual tables and learned basic CRUD operations. Now you will connect those tables with **foreign keys**, combine data from multiple tables using **JOINs**, perform calculations with **aggregate functions**, and automate data insertion using a **Bash script** that reads from CSV files.

## Foreign Keys — Connecting Tables

A **foreign key** is a column in one table that references the primary key of another table. It enforces **referential integrity** — you cannot insert a value that does not exist in the referenced table.

### Setting Up the Schema

Let's rebuild the database with proper relationships:

```sql
CREATE DATABASE students;
\c students

CREATE TABLE majors(
  major_id SERIAL PRIMARY KEY,
  major VARCHAR(50) NOT NULL
);

CREATE TABLE courses(
  course_id SERIAL PRIMARY KEY,
  course VARCHAR(100) NOT NULL
);

CREATE TABLE students(
  student_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  major_id INT REFERENCES majors(major_id),
  gpa NUMERIC(2, 1)
);
```

The clause `REFERENCES majors(major_id)` makes `major_id` a foreign key. Now PostgreSQL will reject any `INSERT` or `UPDATE` that sets a `major_id` that does not exist in the `majors` table.

### Junction Tables for Many-to-Many Relationships

A student can take many courses, and a course can have many students. This **many-to-many** relationship requires a **junction table** (also called a linking or bridge table):

```sql
CREATE TABLE majors_courses(
  major_id INT REFERENCES majors(major_id),
  course_id INT REFERENCES courses(course_id),
  PRIMARY KEY(major_id, course_id)
);
```

This table has a **composite primary key** — the combination of `major_id` and `course_id` must be unique, preventing duplicate entries.

## JOINs — Combining Tables

JOINs are the heart of relational databases. They let you query data spread across multiple tables.

### Sample Data

Assume the tables are populated with the data from Part 1. Here are the JOINs:

### INNER JOIN

Returns only rows where there is a match in **both** tables:

```sql
SELECT students.first_name, students.last_name, majors.major
  FROM students
  INNER JOIN majors
  ON students.major_id = majors.major_id;
```

Output:

```
 first_name | last_name |     major
------------+-----------+------------------
 Alice      | Johnson   | Computer Science
 Bob        | Smith     | Mathematics
 Carol      | Williams  | Computer Science
 David      | Brown     | Biology
 Frank      | Miller    | Data Science
 Grace      | Wilson    | English
```

Eve does not appear because her `major_id` is NULL — there is no match in the `majors` table.

### LEFT JOIN

Returns all rows from the **left** table, with matching rows from the right table (or NULL if no match):

```sql
SELECT students.first_name, students.last_name, majors.major
  FROM students
  LEFT JOIN majors
  ON students.major_id = majors.major_id;
```

Now Eve appears with `NULL` in the major column.

### RIGHT JOIN

Returns all rows from the **right** table, with matching rows from the left table:

```sql
SELECT students.first_name, students.last_name, majors.major
  FROM students
  RIGHT JOIN majors
  ON students.major_id = majors.major_id;
```

This shows all majors, even if no student has that major. Game Design appears with NULL student info if nobody enrolled in it.

### FULL OUTER JOIN

Returns all rows from **both** tables, with NULLs where there is no match:

```sql
SELECT students.first_name, students.last_name, majors.major
  FROM students
  FULL JOIN majors
  ON students.major_id = majors.major_id;
```

### Using Table Aliases

Table aliases reduce typing and improve readability:

```sql
SELECT s.first_name, s.last_name, m.major
  FROM students AS s
  LEFT JOIN majors AS m
  ON s.major_id = m.major_id;
```

You can also omit the `AS` keyword:

```sql
SELECT s.first_name, s.last_name, m.major
  FROM students s
  LEFT JOIN majors m
  ON s.major_id = m.major_id;
```

### Joining Multiple Tables

You can chain JOINs to bring in data from three or more tables:

```sql
SELECT s.first_name, s.last_name, m.major, c.course
  FROM students s
  LEFT JOIN majors m ON s.major_id = m.major_id
  LEFT JOIN majors_courses mc ON m.major_id = mc.major_id
  LEFT JOIN courses c ON mc.course_id = c.course_id;
```

This query connects students to their majors and then to the courses associated with those majors.

## Aggregate Functions

Aggregate functions perform calculations on a set of rows and return a single value.

```sql
-- Count all students
SELECT COUNT(*) FROM students;

-- Average GPA
SELECT AVG(gpa) FROM students;

-- Highest and lowest GPA
SELECT MAX(gpa) AS highest_gpa, MIN(gpa) AS lowest_gpa FROM students;

-- Total number of distinct majors among students
SELECT COUNT(DISTINCT major_id) FROM students;
```

### GROUP BY

`GROUP BY` groups rows with the same value in a column, then lets you apply aggregate functions to each group:

```sql
-- Count students per major
SELECT m.major, COUNT(s.student_id) AS student_count
  FROM majors m
  LEFT JOIN students s ON m.major_id = s.major_id
  GROUP BY m.major
  ORDER BY student_count DESC;
```

Output:

```
      major        | student_count
-------------------+--------------
 Computer Science  |            2
 Mathematics       |            1
 Biology           |            1
 Data Science      |            1
 English           |            1
 Game Design       |            0
```

### HAVING

`HAVING` filters groups after aggregation (like `WHERE` but for groups):

```sql
-- Only show majors with more than 1 student
SELECT m.major, COUNT(s.student_id) AS student_count
  FROM majors m
  LEFT JOIN students s ON m.major_id = s.major_id
  GROUP BY m.major
  HAVING COUNT(s.student_id) > 1;
```

**Key distinction:** `WHERE` filters individual rows *before* grouping. `HAVING` filters groups *after* aggregation.

```sql
-- Average GPA per major, only for students with GPA > 3.0,
-- only showing majors where the average is above 3.5
SELECT m.major, AVG(s.gpa) AS avg_gpa
  FROM students s
  INNER JOIN majors m ON s.major_id = m.major_id
  WHERE s.gpa > 3.0
  GROUP BY m.major
  HAVING AVG(s.gpa) > 3.5
  ORDER BY avg_gpa DESC;
```

## Subqueries

A subquery is a query nested inside another query. It can appear in `WHERE`, `FROM`, or `SELECT` clauses:

```sql
-- Students with GPA above average
SELECT first_name, last_name, gpa
  FROM students
  WHERE gpa > (SELECT AVG(gpa) FROM students);

-- Students in majors that have the word 'Science'
SELECT first_name, last_name
  FROM students
  WHERE major_id IN (
    SELECT major_id FROM majors WHERE major LIKE '%Science%'
  );
```

## Pattern Matching — LIKE and ILIKE

`LIKE` matches patterns using `%` (any number of characters) and `_` (exactly one character):

```sql
-- Majors containing 'Science'
SELECT * FROM majors WHERE major LIKE '%Science%';

-- Names starting with 'A'
SELECT * FROM students WHERE first_name LIKE 'A%';

-- Names with exactly 3 characters
SELECT * FROM students WHERE first_name LIKE '___';

-- Case-insensitive matching with ILIKE
SELECT * FROM majors WHERE major ILIKE '%science%';
```

`ILIKE` is a PostgreSQL extension that performs case-insensitive pattern matching.

## Building a Bash Script for Data Insertion

In real projects, you rarely insert data one row at a time. Let's build a script that reads a CSV file and inserts the data automatically.

### The CSV File

Create `students_data.csv`:

```
first_name,last_name,major,gpa
Alice,Johnson,Computer Science,3.8
Bob,Smith,Mathematics,3.5
Carol,Williams,Computer Science,3.9
David,Brown,Biology,3.2
Eve,Davis,,2.8
Frank,Miller,Data Science,3.6
```

### The Insertion Script

Create `insert_data.sh`:

```bash
#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

# Read the CSV file line by line, skipping the header
cat students_data.csv | while IFS="," read FIRST LAST MAJOR GPA; do
  # Skip the header row
  if [[ $FIRST == "first_name" ]]; then
    continue
  fi

  # Handle the major
  if [[ -n $MAJOR ]]; then
    # Check if the major already exists
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    # If not, insert it
    if [[ -z $MAJOR_ID ]]; then
      INSERT_MAJOR_RESULT=$($PSQL "INSERT INTO majors(major) VALUES('$MAJOR')")
      if [[ $INSERT_MAJOR_RESULT == "INSERT 0 1" ]]; then
        echo "Inserted into majors: $MAJOR"
      fi
      # Get the new major_id
      MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")
    fi

    # Insert the student with major_id
    INSERT_STUDENT_RESULT=$($PSQL "INSERT INTO students(first_name, last_name, major_id, gpa) VALUES('$FIRST', '$LAST', $MAJOR_ID, $GPA)")
  else
    # Insert student without a major
    INSERT_STUDENT_RESULT=$($PSQL "INSERT INTO students(first_name, last_name, gpa) VALUES('$FIRST', '$LAST', $GPA)")
  fi

  if [[ $INSERT_STUDENT_RESULT == "INSERT 0 1" ]]; then
    echo "Inserted student: $FIRST $LAST"
  fi
done
```

**Key elements of this script:**

- `IFS=","` sets the **Internal Field Separator** to a comma, so each CSV field is read into a separate variable.
- `--no-align --tuples-only` tells psql to return raw values without formatting or headers.
- `-c` passes a SQL command directly from the command line.
- The script checks if a major exists before inserting a duplicate.

Run it:

```bash
chmod +x insert_data.sh
./insert_data.sh
```

## Key Takeaways

1. **Foreign keys** (`REFERENCES`) enforce relationships between tables and prevent orphaned data.
2. **Junction tables** model many-to-many relationships with composite primary keys.
3. **INNER JOIN** returns only matching rows; **LEFT/RIGHT JOIN** includes all rows from one side; **FULL JOIN** includes everything.
4. **Aggregate functions** (`COUNT`, `AVG`, `SUM`, `MIN`, `MAX`) summarize data across rows.
5. **GROUP BY** organizes rows into groups for aggregation; **HAVING** filters groups after aggregation.
6. **Subqueries** nest queries for complex lookups — use them in `WHERE`, `FROM`, or `SELECT`.
7. **LIKE/ILIKE** with `%` and `_` enable flexible text pattern matching.
8. **Bash + psql** combination lets you automate database operations by scripting SQL commands and reading external data files.

---

*This lesson is based on the "Learn SQL by Building a Student Database: Part 2" project from the [freeCodeCamp Relational Database Certification](https://www.freecodecamp.org/learn/relational-database/).*
