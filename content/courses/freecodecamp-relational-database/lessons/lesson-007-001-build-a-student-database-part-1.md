---
id: lesson-007-001
title: "SQL — Build a Student Database (Part 1)"
chapterId: chapter-07
order: 5
duration: 180
objectives:
  - Create PostgreSQL databases and connect to them using psql
  - Design tables with appropriate data types and constraints
  - Insert, query, update, and delete data using SQL statements
  - Filter and sort results with WHERE, ORDER BY, and LIMIT
  - Define primary keys and NOT NULL constraints for data integrity
  - Build a multi-table student information database from scratch
---

# SQL — Build a Student Database (Part 1)

SQL (Structured Query Language) is the standard language for managing and querying relational databases. In this lesson, you will learn PostgreSQL — one of the most powerful open-source relational databases — by building a student database with tables for students, majors, and courses.

## Getting Started with PostgreSQL

### Connecting to PostgreSQL

The `psql` command-line tool is the primary way to interact with PostgreSQL:

```bash
# Connect to PostgreSQL as the default user
psql --username=freecodecamp --dbname=postgres
```

Once connected, you will see the `psql` prompt:

```
postgres=>
```

### Creating a Database

```sql
CREATE DATABASE students;
```

List all databases to confirm:

```sql
\l
```

Connect to the new database:

```sql
\c students
```

The prompt changes to `students=>`, confirming you are connected.

## Designing the Schema

Our student database needs three tables:

1. **majors** — stores available academic majors
2. **courses** — stores available courses
3. **students** — stores student information

### Creating the Majors Table

```sql
CREATE TABLE majors(
  major_id SERIAL PRIMARY KEY,
  major VARCHAR(50) NOT NULL
);
```

**Data types explained:**

| Type | Description |
|------|-------------|
| `SERIAL` | Auto-incrementing integer (1, 2, 3...) |
| `INT` or `INTEGER` | Whole number |
| `VARCHAR(n)` | Variable-length text up to n characters |
| `NUMERIC(p, s)` | Decimal number with p total digits and s decimal places |
| `DATE` | Calendar date (YYYY-MM-DD) |
| `BOOLEAN` | True or false |
| `TEXT` | Unlimited-length text |

**Constraints explained:**

- `PRIMARY KEY` — uniquely identifies each row; no duplicates allowed
- `NOT NULL` — the column must have a value; empty values rejected
- `UNIQUE` — all values in the column must be different

### Creating the Courses Table

```sql
CREATE TABLE courses(
  course_id SERIAL PRIMARY KEY,
  course VARCHAR(100) NOT NULL
);
```

### Creating the Students Table

```sql
CREATE TABLE students(
  student_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  major_id INT,
  gpa NUMERIC(2, 1)
);
```

The `gpa` column uses `NUMERIC(2, 1)`, which allows one digit before the decimal and one after (e.g., 3.7, 4.0, 2.5).

The `major_id` column will eventually reference the `majors` table — we will add that foreign key relationship in Part 2.

### Viewing Your Tables

```sql
\d
```

This lists all tables in the current database. To see the details of a specific table:

```sql
\d students
```

Output shows column names, types, and constraints.

## Inserting Data

### Adding Majors

```sql
INSERT INTO majors(major) VALUES('Computer Science');
INSERT INTO majors(major) VALUES('Mathematics');
INSERT INTO majors(major) VALUES('Biology');
INSERT INTO majors(major) VALUES('English');
INSERT INTO majors(major) VALUES('Data Science');
INSERT INTO majors(major) VALUES('Game Design');
```

Since `major_id` is `SERIAL`, PostgreSQL auto-generates the IDs (1, 2, 3...).

### Adding Courses

```sql
INSERT INTO courses(course) VALUES('Data Structures and Algorithms');
INSERT INTO courses(course) VALUES('Calculus');
INSERT INTO courses(course) VALUES('Web Programming');
INSERT INTO courses(course) VALUES('Cell Biology');
INSERT INTO courses(course) VALUES('Creative Writing');
INSERT INTO courses(course) VALUES('Statistics');
INSERT INTO courses(course) VALUES('Linear Algebra');
INSERT INTO courses(course) VALUES('Game Architecture');
```

### Adding Students

```sql
INSERT INTO students(first_name, last_name, major_id, gpa)
  VALUES('Alice', 'Johnson', 1, 3.8);

INSERT INTO students(first_name, last_name, major_id, gpa)
  VALUES('Bob', 'Smith', 2, 3.5);

INSERT INTO students(first_name, last_name, major_id, gpa)
  VALUES('Carol', 'Williams', 1, 3.9);

INSERT INTO students(first_name, last_name, major_id, gpa)
  VALUES('David', 'Brown', 3, 3.2);

INSERT INTO students(first_name, last_name, major_id, gpa)
  VALUES('Eve', 'Davis', NULL, 2.8);

INSERT INTO students(first_name, last_name, major_id, gpa)
  VALUES('Frank', 'Miller', 5, 3.6);

INSERT INTO students(first_name, last_name, major_id, gpa)
  VALUES('Grace', 'Wilson', 4, 3.4);

INSERT INTO students(first_name, last_name, major_id, gpa)
  VALUES('Henry', 'Taylor', 6, 3.1);
```

Notice that Eve has `NULL` for `major_id` — she has not declared a major yet. The column allows NULL because we did not add a `NOT NULL` constraint to it.

## Querying Data with SELECT

### Basic Queries

```sql
-- Select all columns from all students
SELECT * FROM students;

-- Select specific columns
SELECT first_name, last_name, gpa FROM students;

-- Select all majors
SELECT * FROM majors;
```

### Filtering with WHERE

```sql
-- Students with GPA above 3.5
SELECT first_name, last_name, gpa FROM students WHERE gpa > 3.5;

-- Students in Computer Science (major_id = 1)
SELECT first_name, last_name FROM students WHERE major_id = 1;

-- Students without a major
SELECT first_name, last_name FROM students WHERE major_id IS NULL;

-- Multiple conditions with AND/OR
SELECT first_name, last_name, gpa
  FROM students
  WHERE gpa >= 3.5 AND major_id = 1;

SELECT first_name, last_name, gpa
  FROM students
  WHERE major_id = 1 OR major_id = 2;
```

**Important:** Use `IS NULL` and `IS NOT NULL` to check for NULL values, not `= NULL`.

### Sorting with ORDER BY

```sql
-- Sort by GPA descending (highest first)
SELECT first_name, last_name, gpa
  FROM students
  ORDER BY gpa DESC;

-- Sort by last name ascending (alphabetical)
SELECT first_name, last_name
  FROM students
  ORDER BY last_name ASC;

-- Sort by multiple columns
SELECT first_name, last_name, gpa
  FROM students
  ORDER BY major_id ASC, gpa DESC;
```

### Limiting Results

```sql
-- Get the top 3 students by GPA
SELECT first_name, last_name, gpa
  FROM students
  ORDER BY gpa DESC
  LIMIT 3;
```

### Combining Clauses

You can combine `WHERE`, `ORDER BY`, and `LIMIT` in a single query:

```sql
-- Top 3 Computer Science students by GPA
SELECT first_name, last_name, gpa
  FROM students
  WHERE major_id = 1
  ORDER BY gpa DESC
  LIMIT 3;
```

The clause order matters: `SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT ...`.

## Updating Data

The `UPDATE` statement modifies existing rows:

```sql
-- Update Eve's major to Data Science (major_id = 5)
UPDATE students SET major_id = 5 WHERE first_name = 'Eve' AND last_name = 'Davis';

-- Update Bob's GPA
UPDATE students SET gpa = 3.7 WHERE student_id = 2;

-- Update multiple columns at once
UPDATE students SET major_id = 2, gpa = 3.6 WHERE student_id = 4;
```

> **Warning:** Always include a `WHERE` clause with `UPDATE`. Without it, every row in the table will be modified.

```sql
-- THIS UPDATES ALL STUDENTS — be careful!
UPDATE students SET gpa = 4.0;
```

## Deleting Data

The `DELETE` statement removes rows:

```sql
-- Delete a specific student
DELETE FROM students WHERE student_id = 8;

-- Delete students with GPA below 3.0
DELETE FROM students WHERE gpa < 3.0;
```

> **Warning:** Like `UPDATE`, always use `WHERE` with `DELETE`. Without it, all rows are deleted.

Verify with:

```sql
SELECT * FROM students;
```

## Altering Tables

You can modify table structure after creation:

```sql
-- Add a new column
ALTER TABLE students ADD COLUMN email VARCHAR(100);

-- Remove a column
ALTER TABLE students DROP COLUMN email;

-- Rename a column
ALTER TABLE students RENAME COLUMN gpa TO grade_point_average;

-- Rename it back
ALTER TABLE students RENAME COLUMN grade_point_average TO gpa;

-- Add a constraint
ALTER TABLE students ALTER COLUMN gpa SET NOT NULL;

-- Remove a constraint
ALTER TABLE students ALTER COLUMN gpa DROP NOT NULL;
```

## Dropping Tables and Databases

```sql
-- Delete a table and all its data
DROP TABLE courses;

-- Delete a database (must not be connected to it)
\c postgres
DROP DATABASE students;
```

Use these commands with extreme caution — they are irreversible.

## Useful psql Commands

| Command | Description |
|---------|-------------|
| `\l` | List all databases |
| `\c dbname` | Connect to a database |
| `\d` | List all tables in current database |
| `\d tablename` | Describe a table's structure |
| `\x` | Toggle expanded display mode |
| `\i filename.sql` | Execute commands from a SQL file |
| `\q` | Quit psql |

## Key Takeaways

1. **`CREATE DATABASE`** and **`CREATE TABLE`** set up your data storage, with columns defined by types and constraints.
2. **`SERIAL PRIMARY KEY`** auto-generates unique identifiers for each row.
3. **`INSERT INTO`** adds data; always specify column names for clarity.
4. **`SELECT`** retrieves data; combine with **`WHERE`**, **`ORDER BY`**, and **`LIMIT`** for precise queries.
5. **`UPDATE`** and **`DELETE`** modify or remove data — always use **`WHERE`** to avoid affecting all rows.
6. **`ALTER TABLE`** modifies table structure after creation — add columns, rename them, or change constraints.
7. **`\d`**, **`\l`**, and **`\c`** are essential psql meta-commands for navigating databases and inspecting structure.

---

*This lesson is based on the "Learn SQL by Building a Student Database: Part 1" project from the [freeCodeCamp Relational Database Certification](https://www.freecodecamp.org/learn/relational-database/).*
