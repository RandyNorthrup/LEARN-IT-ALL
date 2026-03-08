---
id: lesson-005-002
title: Choose the Correct Data Type in Your C# Code
chapterId: chapter-05
order: 2
duration: 5
objectives:
  - Distinguish between value types and reference types
  - Select the appropriate integral type for a given scenario
  - Choose the correct floating-point type based on precision requirements
  - Understand signed vs unsigned integer types
  - Recognize overflow behavior and how to prevent it
---

# Choose the Correct Data Type in Your C# Code

Choosing the right data type is one of the most important decisions you make when writing C#. The type you pick determines how much memory your variable consumes, what values it can hold, and what operations you can perform on it. In this lesson, you will learn about the full spectrum of built-in types so you can make informed choices.

## Value Types vs Reference Types

Every type in C# falls into one of two categories:

- **Value types** store data directly on the stack. When you assign one value-type variable to another, the runtime copies the data. Changing the copy does not affect the original. Examples include `int`, `double`, `bool`, `char`, and `struct`.
- **Reference types** store a reference (pointer) to data on the heap. Assigning one reference variable to another copies the reference, not the object — so both variables point to the same data. Examples include `string`, `object`, arrays, and classes.

```csharp
// Value type — independent copies
int a = 10;
int b = a;
b = 20;
Console.WriteLine(a); // 10 — unchanged

// Reference type — shared reference
int[] arr1 = { 1, 2, 3 };
int[] arr2 = arr1;
arr2[0] = 99;
Console.WriteLine(arr1[0]); // 99 — both point to the same array
```

> **Key takeaway:** Use value types for small, simple data. Use reference types when you need shared access or polymorphism.

## Integral Types

C# provides several integral (whole-number) types. The table below shows each type, its size, and its range:

| Type     | Size    | Range |
|----------|---------|-------|
| `byte`   | 1 byte  | 0 to 255 |
| `sbyte`  | 1 byte  | −128 to 127 |
| `short`  | 2 bytes | −32,768 to 32,767 |
| `ushort` | 2 bytes | 0 to 65,535 |
| `int`    | 4 bytes | −2.1 billion to 2.1 billion |
| `uint`   | 4 bytes | 0 to 4.2 billion |
| `long`   | 8 bytes | −9.2 quintillion to 9.2 quintillion |
| `ulong`  | 8 bytes | 0 to 18.4 quintillion |

```csharp
byte playerLevel = 50;       // Small positive number — byte is ideal
int population = 1_000_000;  // Underscores improve readability
long nationalDebt = 30_000_000_000_000L; // Suffix L for long literals
```

**When to choose which:**
- Use `int` as your default for most whole numbers.
- Use `long` when values exceed ±2.1 billion.
- Use `byte` or `short` only when you need to minimize memory (large arrays, file formats).
- Prefer signed types unless you have a specific reason (e.g., interop) to use unsigned.

## Floating-Point Types

For numbers with decimals, C# offers three options:

| Type      | Size    | Precision          | Suffix | Use Case |
|-----------|---------|---------------------|--------|----------|
| `float`   | 4 bytes | ~6–9 digits         | `f`    | Graphics, games |
| `double`  | 8 bytes | ~15–17 digits       | none   | General math, science |
| `decimal` | 16 bytes| ~28–29 digits       | `m`    | Financial calculations |

```csharp
float temperature = 98.6f;
double pi = 3.141592653589793;
decimal accountBalance = 10_432.95m;
```

The critical difference is **precision**. `float` and `double` are binary floating-point types — they are fast but can introduce tiny rounding errors. `decimal` is a base-10 type that preserves exact decimal representation, making it essential for money.

```csharp
// Binary floating-point rounding surprise
double result = 0.1 + 0.2;
Console.WriteLine(result == 0.3);       // False!
Console.WriteLine(result);              // 0.30000000000000004

// Decimal handles it correctly
decimal exact = 0.1m + 0.2m;
Console.WriteLine(exact == 0.3m);       // True
```

## Signed vs Unsigned

Signed types (`sbyte`, `short`, `int`, `long`) can represent negative numbers. Unsigned types (`byte`, `ushort`, `uint`, `ulong`) can only represent zero and positive numbers but get double the positive range.

```csharp
// Signed
int signedValue = -42; // Valid

// Unsigned
uint unsignedValue = 42;
// uint negative = -1; // Compile error — unsigned cannot be negative
```

Use unsigned types when negative values make no sense and you need the extra range, or when working with binary data, bit flags, or hardware interfaces.

## Overflow Behavior

When a value exceeds a type's range, **overflow** occurs. By default C# wraps around silently in unchecked contexts:

```csharp
byte maxByte = 255;
maxByte++; // Wraps to 0 — no error!
Console.WriteLine(maxByte); // 0

// Use checked to catch overflow at runtime
try
{
    checked
    {
        byte safe = 255;
        safe++; // Throws OverflowException
    }
}
catch (OverflowException ex)
{
    Console.WriteLine($"Overflow caught: {ex.Message}");
}
```

You can also enable overflow checking project-wide by adding `<CheckForOverflowUnderflow>true</CheckForOverflowUnderflow>` to your `.csproj` file.

## The `var` Keyword and Type Inference

C# lets you use `var` to let the compiler infer the type from the right-hand side:

```csharp
var count = 10;          // Inferred as int
var price = 19.99m;      // Inferred as decimal
var name = "Alice";      // Inferred as string
```

The variable is still strongly typed — `var` is just shorthand. Use it when the type is obvious from context; spell out the type when clarity matters.

## Recap

- **Value types** live on the stack and are copied on assignment; **reference types** live on the heap and share references.
- Use `int` for most integers, `long` for large values, `decimal` for money.
- Watch for silent overflow — use `checked` blocks when safety matters.
- Choose the smallest type that comfortably fits your data to optimize memory in performance-critical scenarios.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
