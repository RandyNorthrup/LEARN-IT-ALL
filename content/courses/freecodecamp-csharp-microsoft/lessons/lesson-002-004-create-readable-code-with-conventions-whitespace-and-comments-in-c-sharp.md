---
id: lesson-002-004
title: Create Readable Code with Conventions, Whitespace, and Comments in C#
chapterId: chapter-02
order: 4
duration: 5
objectives:
  - Apply C# naming conventions (PascalCase, camelCase)
  - Use whitespace and formatting to improve readability
  - Write single-line, multi-line, and XML documentation comments
  - Follow best practices for clean, maintainable code
---

# Create Readable Code with Conventions, Whitespace, and Comments in C#

## Why Readable Code Matters

You spend far more time **reading** code than writing it. Readable code is easier to debug, maintain, and extend. C# has well-established conventions that the entire .NET ecosystem follows.

## Naming Conventions

C# uses specific casing styles for different kinds of identifiers:

| Element               | Convention      | Example                  |
|-----------------------|----------------|--------------------------|
| Classes / Structs     | PascalCase     | `StudentRecord`          |
| Methods               | PascalCase     | `CalculateAverage()`     |
| Properties            | PascalCase     | `FirstName`              |
| Public constants      | PascalCase     | `MaxRetries`             |
| Local variables       | camelCase      | `studentCount`           |
| Method parameters     | camelCase      | `inputValue`             |
| Private fields        | _camelCase     | `_connectionString`      |
| Interfaces            | IPascalCase    | `IComparable`            |

### Good vs Poor Naming

```csharp
// ✗ Poor naming
int x = 5;
string s = "alice";
void DoStuff(int n) { }

// ✓ Good naming
int studentCount = 5;
string firstName = "Alice";
void PrintStudentReport(int studentId) { }
```

Choose names that describe **what** a variable holds or **what** a method does. Avoid single-letter names except in short loops (`i`, `j` for indices).

## Whitespace and Formatting

Consistent formatting makes code scannable at a glance.

### Braces and Indentation

C# convention places opening braces on their own line (Allman style):

```csharp
// C# convention (Allman style)
if (score >= 90)
{
    Console.WriteLine("Excellent!");
}
else
{
    Console.WriteLine("Keep trying.");
}
```

Use **4 spaces** for indentation (the default in VS Code for C#).

### Blank Lines

Use blank lines to separate logical sections:

```csharp
// Data setup
string[] students = { "Alice", "Bob", "Carol" };
int[] scores = { 92, 85, 78 };

// Processing
for (int i = 0; i < students.Length; i++)
{
    string grade = scores[i] >= 90 ? "A" : "B";
    Console.WriteLine($"{students[i]}: {grade}");
}

// Summary
Console.WriteLine($"Total students: {students.Length}");
```

### Spacing Around Operators

```csharp
// ✗ Hard to read
int result=a+b*c/d;

// ✓ Easy to read
int result = a + b * c / d;
```

## Comments

Comments explain the **why** behind code, not the **what** (the code itself should be clear enough for that).

### Single-Line Comments

Use `//` for brief explanations:

```csharp
int maxAttempts = 3;  // Limit retries to prevent lockout

// Calculate the weighted average
double average = totalPoints / totalCredits;
```

### Multi-Line Comments

Use `/* */` for longer explanations:

```csharp
/*
  This block processes all student records,
  calculates their final grades, and generates
  a summary report for the instructor.
*/
foreach (var student in students)
{
    ProcessGrades(student);
}
```

### XML Documentation Comments

Use `///` to document public APIs. These comments generate IntelliSense tooltips and documentation:

```csharp
/// <summary>
/// Calculates the average of an array of scores.
/// </summary>
/// <param name="scores">An array of integer scores.</param>
/// <returns>The average as a double.</returns>
/// <exception cref="ArgumentException">Thrown when the array is empty.</exception>
static double CalculateAverage(int[] scores)
{
    if (scores.Length == 0)
        throw new ArgumentException("Scores array cannot be empty.");

    int sum = 0;
    foreach (int score in scores)
    {
        sum += score;
    }
    return (double)sum / scores.Length;
}
```

Common XML tags:
- `<summary>` — what the method does
- `<param>` — describes a parameter
- `<returns>` — what the method returns
- `<exception>` — exceptions that may be thrown
- `<remarks>` — additional details

## When to Comment (and When Not To)

### Good Comments

```csharp
// Use banker's rounding per financial regulations
double rounded = Math.Round(amount, 2, MidpointRounding.ToEven);

// TODO: Replace with database lookup once DB is configured
string[] validUsers = { "admin", "manager" };
```

### Bad Comments (Unnecessary)

```csharp
// Increment i by 1
i++;

// Set name to "Alice"
string name = "Alice";

// Check if score is greater than or equal to 60
if (score >= 60) { }
```

If the code is clear, a comment restating it adds clutter. Comment the **intent** or **reasoning**, not the obvious mechanics.

## Code Organization Best Practices

1. **One statement per line** — don't chain unrelated operations
2. **Group related code** — variables together, logic together
3. **Keep methods short** — a method should do one thing well
4. **Use meaningful names** — reduce the need for comments
5. **Be consistent** — pick a style and stick with it across the project

### Before: Hard to Read

```csharp
int[] s={90,85,92,78,88};int t=0;foreach(int x in s){t+=x;}double a=(double)t/s.Length;Console.WriteLine(a);
```

### After: Clean and Readable

```csharp
int[] scores = { 90, 85, 92, 78, 88 };

int total = 0;
foreach (int score in scores)
{
    total += score;
}

double average = (double)total / scores.Length;
Console.WriteLine($"Average score: {average:F1}");
```

## Key Takeaways

- Use **PascalCase** for classes, methods, and properties; **camelCase** for local variables and parameters
- Format code consistently with proper indentation, spacing, and blank lines
- Write comments that explain **why**, not **what**
- Use XML documentation (`///`) for public methods and APIs
- Readable code reduces bugs and makes collaboration easier

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
