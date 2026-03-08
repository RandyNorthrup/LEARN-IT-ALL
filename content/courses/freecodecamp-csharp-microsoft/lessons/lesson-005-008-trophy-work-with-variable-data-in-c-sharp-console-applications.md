---
id: lesson-005-008
title: Trophy - Work with Variable Data in C# Console Applications
chapterId: chapter-05
order: 8
duration: 5
objectives:
  - Review all key concepts from the Work with Variable Data chapter
  - Assess your understanding with self-check questions
  - Identify areas for further study before moving on
---

# Trophy — Work with Variable Data in C# Console Applications

Congratulations on completing the "Work with Variable Data in C# Console Applications" chapter! This lesson reviews the key concepts, provides self-assessment questions so you can gauge your understanding, and points you toward what comes next.

## Chapter Review

### Data Types

You learned that C# is a strongly typed language with two fundamental categories:

- **Value types** (`int`, `double`, `decimal`, `bool`, `char`, `struct`) store data directly on the stack. Assignment copies the value.
- **Reference types** (`string`, `object`, arrays, classes) store a reference to data on the heap. Assignment copies the reference.

For numeric data, you learned to choose the right type based on precision and range requirements:

| Use Case | Best Type |
|----------|-----------|
| General whole numbers | `int` |
| Large whole numbers | `long` |
| Financial calculations | `decimal` |
| Scientific calculations | `double` |
| Small positive integers (0–255) | `byte` |

### Type Conversion

You practiced four conversion techniques:

1. **Implicit conversion** — automatic widening (e.g., `int` → `long`)
2. **Explicit casting** — manual narrowing with `(type)` syntax
3. **`Convert` class** — methods like `Convert.ToInt32()` with overflow checking
4. **`TryParse`** — safe parsing that returns `bool` instead of throwing exceptions

The `TryParse` pattern is the most important for real applications because it handles invalid input gracefully.

### String Manipulation

Strings in C# are immutable — every modification creates a new string. You studied:

- **Searching:** `IndexOf`, `Contains`, `StartsWith`, `EndsWith`
- **Extracting:** `Substring`, range operators (`[7..12]`)
- **Modifying:** `Replace`, `Remove`, `Insert`, `Trim`, `ToUpper`, `ToLower`
- **Splitting/Joining:** `Split` and `string.Join`
- **Performance:** `StringBuilder` for loop-based concatenation

### Formatting

You learned to present data cleanly using:

- **String interpolation** (`$"text {variable:format}"`)
- **Standard format specifiers** (`C` for currency, `P` for percent, `N` for numbers)
- **Custom format strings** (`#,##0.00`, `D6` for zero-padded integers)
- **Alignment and padding** for tabular output

### Array Operations

You explored the `Array` class helpers and basic LINQ:

- `Array.Sort`, `Reverse`, `Clear`, `Resize`, `Copy`
- `Array.IndexOf`, `Find`, `FindAll`, `Exists`
- LINQ methods: `Where`, `Select`, `OrderBy`, `First`, `Count`, `Sum`, `Average`

## Self-Assessment Questions

Test yourself with these questions. Try to answer each one before revealing the answer.

**1. What is the difference between `float`, `double`, and `decimal`?**

<details>
<summary>Show answer</summary>

`float` (4 bytes, ~7 digits precision) and `double` (8 bytes, ~15 digits) are binary floating-point types — fast but prone to rounding errors with decimal fractions. `decimal` (16 bytes, ~28 digits) is a base-10 type that preserves exact decimal representation, making it essential for financial calculations.

</details>

**2. When should you use `TryParse` instead of `Parse`?**

<details>
<summary>Show answer</summary>

Use `TryParse` whenever the input might be invalid — user input, external data files, API responses. `Parse` throws exceptions on invalid input, so only use it when you are certain the data is valid.

</details>

**3. Why would you use `StringBuilder` instead of string concatenation?**

<details>
<summary>Show answer</summary>

Strings are immutable, so each concatenation creates a new string object. In a loop, this creates many temporary objects and causes poor performance. `StringBuilder` maintains a mutable buffer, only creating one final string when you call `ToString()`.

</details>

**4. What does `Array.Resize` actually do? Does it modify the array in place?**

<details>
<summary>Show answer</summary>

No — `Array.Resize` allocates a new array with the specified size, copies elements from the old array, and updates the reference (that is why it takes a `ref` parameter). The old array becomes eligible for garbage collection.

</details>

**5. What is the output of this code?**

```csharp
double result = 0.1 + 0.2;
Console.WriteLine(result == 0.3);
```

<details>
<summary>Show answer</summary>

`False`. Binary floating-point types cannot represent 0.1 and 0.2 exactly, so the sum is approximately `0.30000000000000004`. Use `decimal` for exact decimal arithmetic, or compare with a tolerance.

</details>

**6. What format specifier would you use to display `1234.5` as `$1,234.50`?**

<details>
<summary>Show answer</summary>

Use `C` (currency): `$"{1234.5m:C}"` produces `$1,234.50` in the en-US culture. The exact output depends on the current culture setting.

</details>

## Common Mistakes to Avoid

| Mistake | Better Approach |
|---------|----------------|
| Using `double` for money | Use `decimal` |
| Using `Parse` for user input | Use `TryParse` |
| Concatenating strings in a loop | Use `StringBuilder` |
| Ignoring overflow on casts | Use `checked` blocks or `Convert` methods |
| Comparing strings with `==` for culture-aware scenarios | Use `string.Compare` with `StringComparison` |

## What's Next

In the next chapter, **Add Logic to C# Console Applications**, you will learn to control program flow with:

- Boolean expressions and conditional operators
- `switch` statements and switch expressions
- `for`, `while`, and `do-while` loops
- Variable scope and code blocks

These control-flow tools combined with the variable-data skills you just learned will let you build truly interactive, data-driven applications.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
