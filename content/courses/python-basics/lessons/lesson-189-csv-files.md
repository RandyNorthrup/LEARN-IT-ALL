---
id: lesson-189-csv-files
title: "Working with CSV Files"
chapterId: ch16-file-io
order: 4
duration: 25
objectives:
  - Read CSV files using csv.reader and csv.DictReader
  - Write CSV data using csv.writer and csv.DictWriter
  - Handle different delimiters, quoting options, and header rows
  - Process real-world tabular data from CSV files
  - Avoid common CSV pitfalls including encoding issues and newline handling
---

# Working with CSV Files

CSV (Comma-Separated Values) is one of the most common formats for tabular data. Spreadsheets, databases, and data tools all understand CSV. Python's built-in `csv` module handles the tricky edge cases that trip up naive string-splitting approaches.

## What Are CSV Files?

A CSV file stores tabular data as plain text — one row per line, values separated by commas:

```
Name,Age,City
Alice,30,New York
Bob,25,Los Angeles
```

Edge cases make the format trickier than it looks:

- Values with commas must be quoted: `"Smith, John",30,NYC`
- Values with quotes must escape them: `"She said ""hello""",30,NYC`
- Some files use tabs, semicolons, or pipes instead of commas

**Never parse CSV by splitting on commas** — use the `csv` module.

## Reading with `csv.reader`

`csv.reader` wraps a file object and yields each row as a **list of strings**:

```python
import csv

with open("students.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file)
    header = next(reader)
    print(f"Columns: {header}")

    for row in reader:
        name, age, grade = row
        print(f"{name} is {age} years old with grade {grade}")
```

**Important**: Always open CSV files with `newline=""` to prevent Python's newline translation from interfering with the csv module.

All CSV values are strings — convert as needed:

```python
import csv

with open("sales.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file)
    next(reader)  # Skip header

    total = 0
    for row in reader:
        quantity = int(row[1])
        price = float(row[2])
        total += quantity * price

    print(f"Total Revenue: ${total:,.2f}")
```

## Reading with `csv.DictReader`

`csv.DictReader` returns each row as a **dictionary** mapping column names to values — much more readable:

```python
import csv

with open("employees.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file)

    for row in reader:
        print(f"{row['name']} works in {row['department']}")
        print(f"  Salary: ${float(row['salary']):,.2f}")
```

For files without headers, provide field names manually:

```python
import csv

with open("data.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file, fieldnames=["id", "name", "score"])
    for row in reader:
        print(f"{row['name']}: {row['score']}")
```

### Practical Example: Student Grades

```python
import csv

def analyze_grades(csv_path):
    students = []
    with open(csv_path, "r", encoding="utf-8", newline="") as file:
        for row in csv.DictReader(file):
            avg = (float(row["math"]) + float(row["science"])
                   + float(row["english"])) / 3
            students.append({"name": row["name"], "average": avg})

    students.sort(key=lambda s: s["average"], reverse=True)

    print(f"{'Name':<15} {'Average':>7}")
    print("-" * 24)
    for s in students:
        print(f"{s['name']:<15} {s['average']:>7.1f}")

    class_avg = sum(s["average"] for s in students) / len(students)
    print(f"\nClass Average: {class_avg:.1f}")
    print(f"Top Student: {students[0]['name']}")
```

## Writing with `csv.writer`

`csv.writer` converts your data into properly formatted CSV rows:

```python
import csv

header = ["Product", "Quantity", "Price"]
rows = [
    ["Laptop", 10, 999.99],
    ["Mouse", 150, 29.99],
    ["Keyboard", 85, 79.99],
]

with open("inventory.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(header)    # Write header
    writer.writerows(rows)     # Write all data rows
```

The writer automatically handles quoting for values with commas or quotes:

```python
import csv

data = [
    ["Name", "Address", "Notes"],
    ["Smith, John", "123 Main St", 'He said "hello"'],
]

with open("contacts.csv", "w", encoding="utf-8", newline="") as file:
    csv.writer(file).writerows(data)
# Output: "Smith, John",123 Main St,"He said ""hello"""
```

## Writing with `csv.DictWriter`

`csv.DictWriter` writes rows from dictionaries:

```python
import csv

employees = [
    {"name": "Alice", "department": "Engineering", "salary": 95000},
    {"name": "Bob", "department": "Marketing", "salary": 72000},
]

with open("employees.csv", "w", encoding="utf-8", newline="") as file:
    fieldnames = ["name", "department", "salary"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(employees)
```

## Different Delimiters

Not all "CSV" files use commas. Use the `delimiter` parameter:

```python
import csv

# Tab-separated (TSV)
with open("data.tsv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file, delimiter="\t")
    for row in reader:
        print(row)

# Pipe-separated
with open("data.psv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file, delimiter="|")
    writer.writerow(["Name", "Age", "City"])

# Semicolon-separated (common in European locales)
with open("european.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file, delimiter=";")
```

## Quoting Options

Control how fields are quoted with the `quoting` parameter:

```python
import csv

rows = [["Alice", 30, "New York"], ["Bob", 25, "LA"]]

# QUOTE_MINIMAL (default) — only quote when necessary
# QUOTE_ALL — quote every field
# QUOTE_NONNUMERIC — quote all non-numeric fields

with open("quoted.csv", "w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f, quoting=csv.QUOTE_ALL)
    writer.writerows(rows)
# Output: "Alice","30","New York"
```

## Transforming CSV Files

A common task — read, process, write:

```python
import csv

def add_computed_column(input_path, output_path):
    with open(input_path, "r", encoding="utf-8", newline="") as infile, \
         open(output_path, "w", encoding="utf-8", newline="") as outfile:

        reader = csv.DictReader(infile)
        output_fields = reader.fieldnames + ["total"]
        writer = csv.DictWriter(outfile, fieldnames=output_fields)
        writer.writeheader()

        for row in reader:
            row["total"] = (float(row["math"]) + float(row["science"])
                            + float(row["english"]))
            writer.writerow(row)
```

## Real-World Example: Sales Analysis

```python
import csv
from collections import defaultdict

def analyze_sales(csv_path):
    sales_by_region = defaultdict(float)
    row_count = 0

    with open(csv_path, "r", encoding="utf-8", newline="") as file:
        for row in csv.DictReader(file):
            sales_by_region[row["region"]] += float(row["amount"])
            row_count += 1

    print(f"Processed {row_count} records\n")
    print("Sales by Region:")
    for region, total in sorted(sales_by_region.items(),
                                 key=lambda x: x[1], reverse=True):
        print(f"  {region:<20} ${total:>12,.2f}")

    print(f"\nGrand Total: ${sum(sales_by_region.values()):,.2f}")
```

## Common Pitfalls

### Encoding Issues

```python
import csv

def read_csv_safe(path):
    """Try multiple encodings to read a CSV."""
    for encoding in ["utf-8", "utf-8-sig", "latin-1", "cp1252"]:
        try:
            with open(path, "r", encoding=encoding, newline="") as f:
                return list(csv.reader(f))
        except UnicodeDecodeError:
            continue
    raise ValueError(f"Could not decode {path}")
```

Use `utf-8-sig` for files exported from Excel that have a BOM (Byte Order Mark).

### Empty Rows and Whitespace

```python
import csv

with open("messy.csv", "r", encoding="utf-8", newline="") as file:
    for row in csv.reader(file):
        if not any(row):    # Skip empty rows
            continue
        cleaned = [field.strip() for field in row]
        print(cleaned)
```

## Try It Yourself

1. **CSV Merger**: Read two CSV files with the same columns and merge them into one output file with a single header row.

2. **Grade Calculator**: Read a CSV with student names and three test scores. Calculate averages, assign letter grades, and write results to a new CSV.

3. **CSV Filter**: Write `filter_csv(input, output, column, value)` that copies only rows where the specified column matches the value.

4. **CSV to Text Table**: Read a CSV and print it as a neatly formatted text table with aligned columns and separator lines.

## Key Takeaways

- **Always use the `csv` module** instead of splitting on commas — it handles quoting and escaping correctly.
- **`csv.DictReader`** provides named field access; **`csv.reader`** gives positional list access.
- **Always open CSV files with `newline=""`** to prevent double newlines on Windows.
- **Specify `encoding="utf-8"`** (or `"utf-8-sig"` for Excel files) for international characters.
- **All CSV values are strings** — convert with `int()` or `float()` after reading.
- **Use `delimiter`** to handle TSV, pipe-separated, or semicolon-separated files.
- **`writeheader()`** writes the column names when using `DictWriter` — call it before data rows.
