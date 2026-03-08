---
id: lesson-002-008
title: Trophy - Create and Run Simple C# Console Applications
chapterId: chapter-02
order: 8
duration: 5
objectives:
  - Review key C# concepts from Chapter 2
  - Test your understanding with self-assessment questions
  - Identify areas for further practice
---

# Trophy — Create and Run Simple C# Console Applications

Congratulations on completing **Create and Run Simple C# Console Applications**! This lesson reviews everything you've learned in Chapter 2 and helps you assess your readiness to move on.

## Chapter Summary

### 1. Setting Up Your Development Environment
- Install the **.NET 8 SDK** and verify with `dotnet --version`
- Install **VS Code** with the **C# Dev Kit** extension
- Create projects with `dotnet new console`, build with `dotnet build`, run with `dotnet run`
- Understand the project structure: `.csproj`, `Program.cs`, `bin/`, `obj/`

### 2. Arrays and Iteration
- Arrays are **fixed-size**, **zero-indexed** collections of a single type
- Declare arrays: `int[] nums = { 1, 2, 3 };` or `new int[5]`
- Access elements by index: `nums[0]`; get size with `.Length`
- **foreach** iterates read-only; **for** allows index access and modification
- Helper methods: `Array.Sort()`, `Array.Reverse()`, `Array.IndexOf()`

### 3. Decision Logic
- **if / else if / else** for conditional branching
- Comparison operators: `==`, `!=`, `>`, `<`, `>=`, `<=`
- Logical operators: `&&` (AND), `||` (OR), `!` (NOT)
- **Short-circuit evaluation** prevents unnecessary checks
- The **ternary operator** `condition ? a : b` for inline conditionals

### 4. The .NET Class Library
- String methods: `Contains`, `StartsWith`, `Substring`, `ToUpper`, `ToLower`, `Trim`, `Split`, `Replace`
- `Random` class for generating pseudo-random numbers
- `DateTime` for date/time operations and formatting
- `using` directives import additional namespaces

### 5. Code Readability
- **PascalCase** for classes, methods, properties; **camelCase** for local variables
- Consistent indentation, spacing, and blank lines
- Comments should explain **why**, not **what**
- Use XML documentation (`///`) for public APIs

### 6. Projects
- **Guided Project**: processed student data arrays with foreach, if/else-if, and formatted output
- **Challenge Project**: independently built an array-processing application from requirements

## Self-Assessment Questions

**Q1:** What happens when you access an array index that doesn't exist?

<details>
<summary>Answer</summary>

C# throws an `IndexOutOfRangeException` at runtime. Always check `.Length` before accessing elements dynamically.
</details>

**Q2:** What's the difference between `foreach` and `for` when iterating an array?

<details>
<summary>Answer</summary>

`foreach` is simpler and read-only — you cannot modify the loop variable. `for` gives you the index, lets you modify elements, and offers more control (e.g., iterating backwards, skipping elements).
</details>

**Q3:** What does `&&` do differently from `||`?

<details>
<summary>Answer</summary>

`&&` (AND) requires **both** conditions to be `true`. `||` (OR) requires **at least one** to be `true`. Both use short-circuit evaluation.
</details>

**Q4:** How do you generate a random number between 1 and 10 (inclusive)?

<details>
<summary>Answer</summary>

```csharp
Random rng = new Random();
int number = rng.Next(1, 11);  // min inclusive, max exclusive
```
</details>

**Q5:** Why is `string.IsNullOrWhiteSpace()` preferred over `string.IsNullOrEmpty()`?

<details>
<summary>Answer</summary>

`IsNullOrWhiteSpace` also catches strings that contain only spaces, tabs, or newlines (e.g., `"   "`), which `IsNullOrEmpty` would consider non-empty.
</details>

## Common Mistakes to Avoid

| Mistake | Consequence | Fix |
|---------|------------|-----|
| `foreach (var x in arr) { x = 5; }` | Compiler error | Use a `for` loop to modify elements |
| `arr[arr.Length]` | `IndexOutOfRangeException` | Last valid index is `arr.Length - 1` |
| `if (x = 5)` instead of `if (x == 5)` | Assignment, not comparison | Use `==` for equality checks |
| Forgetting `break` isn't needed in if/else | Confusion from other languages | C# if/else doesn't fall through |

## What's Next?

In **Chapter 3 — Create Methods in C# Console Applications**, you'll learn:
- Writing your own methods with parameters and return values
- Understanding scope and lifetime of variables
- Method overloading
- Building larger programs by decomposing logic into reusable methods

You've built a strong foundation — you can set up a C# project, work with data, make decisions in code, and write clean, readable programs. Keep building!

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
