---
id: lesson-006-007
title: Trophy - Write Your First Code Using C#
chapterId: chapter-06
order: 7
duration: 5
objectives:
  - Review key C# concepts from Chapter 1
  - Test your understanding with self-assessment questions
  - Identify areas for further practice
---

# Trophy — Write Your First Code Using C#

Congratulations on completing the **Write Your First Code Using C#** chapter! This lesson reviews the key concepts you've learned and helps you assess your understanding before moving on.

## Chapter Summary

Throughout this chapter you've built a solid foundation in C#:

### 1. Hello World and Console Output
- C# is a modern, object-oriented language running on .NET 8 (cross-platform)
- **Top-level statements** let you write programs without boilerplate `Main` methods
- `Console.WriteLine()` prints text with a trailing newline
- `Console.Write()` prints text without a newline

### 2. Data Types and Variables
- C# is **strongly-typed** — every variable has a fixed type
- Core types: `int`, `double`, `decimal`, `string`, `char`, `bool`
- `var` lets the compiler infer the type from the assigned value
- `const` declares values that can never change

### 3. Numeric Operations
- Arithmetic operators: `+`, `-`, `*`, `/`, `%`
- **Integer division** truncates — cast to `double` or `decimal` for precision
- `++` / `--` increment and decrement by one
- The `Math` class provides `Pow`, `Sqrt`, `Abs`, `Round`, `Floor`, `Ceiling`, `Min`, `Max`

### 4. String Formatting
- **Concatenation** with `+` (simple but verbose)
- **String interpolation** with `$"{variable}"` (preferred)
- **Composite formatting** with `String.Format("{0}", value)`
- Format specifiers: `:C` (currency), `:N` (number), `:P` (percent), `:F` (fixed-point)
- `PadLeft` / `PadRight` for alignment

### 5. Projects
- **Student Grades Calculator**: arrays, `foreach`, conditional logic for letter grades
- **GPA Calculator**: parallel arrays, weighted averages, switch expressions, formatted output

## Self-Assessment Questions

Test yourself on the key concepts. Try to answer each question before checking the answer.

**Q1:** What is the difference between `Console.Write()` and `Console.WriteLine()`?

<details>
<summary>Answer</summary>

`Console.Write()` prints text without adding a newline at the end. `Console.WriteLine()` prints text and then moves the cursor to the next line.
</details>

**Q2:** What value does `7 / 2` produce in C#? How about `7.0 / 2`?

<details>
<summary>Answer</summary>

`7 / 2` produces `3` (integer division truncates). `7.0 / 2` produces `3.5` because one operand is a `double`, so floating-point division is used.
</details>

**Q3:** What is the difference between `var x = 10;` and `int x = 10;`?

<details>
<summary>Answer</summary>

Both create an `int` variable with value `10`. With `var`, the compiler infers the type from the assigned value. With `int`, the type is explicitly stated. Once assigned, `var x` is still strongly-typed as `int` — it is not dynamic.
</details>

**Q4:** How would you display the value `0.1525` as a percentage with one decimal place?

<details>
<summary>Answer</summary>

```csharp
double value = 0.1525;
Console.WriteLine($"{value:P1}");  // 15.3%
```
</details>

**Q5:** Write a `foreach` loop that prints every element of an `int[]` array called `scores`.

<details>
<summary>Answer</summary>

```csharp
foreach (int score in scores)
{
    Console.WriteLine(score);
}
```
</details>

## Common Mistakes to Avoid

| Mistake | Why It Fails | Fix |
|---------|-------------|-----|
| `int x; Console.WriteLine(x);` | Unassigned local variable | Initialize: `int x = 0;` |
| `decimal d = 3.14;` | `3.14` is a `double` literal | Add suffix: `3.14m` |
| `const int x = 5; x = 10;` | Constants cannot be reassigned | Remove `const` or don't reassign |
| `7 / 2` expecting `3.5` | Integer division truncates | Use `7.0 / 2` or cast |

## What's Next?

In **Chapter 2 — Create and Run Simple C# Console Applications**, you'll learn:
- How to set up VS Code with the .NET SDK
- Arrays and `foreach` loops in depth
- Decision logic with `if`, `else if`, and `else`
- Working with the .NET class library
- Writing clean, readable C# code

Keep practicing the fundamentals — they're the building blocks for everything that follows!

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
