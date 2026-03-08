---
id: lesson-004-004
title: Implement Exception Handling in C# Console Applications
chapterId: chapter-04
order: 4
duration: 5
objectives:
  - Use try-catch-finally blocks for exception handling
  - Catch specific exception types in the correct order
  - Understand the exception hierarchy in C#
  - Apply when clauses in catch blocks for filtered handling
---

# Implement Exception Handling in C# Console Applications

Exceptions are C#'s mechanism for handling runtime errors gracefully. Instead of letting your program crash, you can **catch** exceptions, respond appropriately, and keep running. This lesson covers the `try-catch-finally` pattern and how to handle specific exception types.

## The try-catch-finally Pattern

The basic structure wraps risky code in a `try` block and handles errors in one or more `catch` blocks:

```csharp
try
{
    // Code that might throw an exception
    Console.Write("Enter a number: ");
    int number = int.Parse(Console.ReadLine()!);
    Console.WriteLine($"You entered: {number}");
}
catch (FormatException)
{
    // Runs if the parse fails
    Console.WriteLine("That's not a valid number.");
}
finally
{
    // Always runs, whether or not an exception occurred
    Console.WriteLine("Input processing complete.");
}
```

Flow of execution:
1. Code in `try` runs normally
2. If an exception is thrown, execution jumps to the matching `catch` block
3. The `finally` block runs regardless — exception or not

## Catching Specific Exceptions

C# has many built-in exception types. Catching specific types lets you respond differently to different errors:

```csharp
static double SafeDivide(string numeratorStr, string denominatorStr)
{
    try
    {
        double numerator = double.Parse(numeratorStr);
        double denominator = double.Parse(denominatorStr);

        if (denominator == 0)
            throw new DivideByZeroException("Denominator cannot be zero.");

        return numerator / denominator;
    }
    catch (FormatException ex)
    {
        Console.WriteLine($"Invalid number format: {ex.Message}");
        return 0;
    }
    catch (DivideByZeroException ex)
    {
        Console.WriteLine($"Division error: {ex.Message}");
        return 0;
    }
}
```

## The Exception Hierarchy

All exceptions inherit from `System.Exception`. Catch blocks are checked top to bottom — the first match wins:

```
System.Exception
├── FormatException
├── DivideByZeroException
├── IndexOutOfRangeException
├── NullReferenceException
├── InvalidOperationException
└── ArgumentException
    ├── ArgumentNullException
    └── ArgumentOutOfRangeException
```

**Rule: catch specific exceptions before general ones:**

```csharp
// CORRECT ORDER — specific first, general last
try { /* ... */ }
catch (FormatException ex) { /* handles format errors */ }
catch (Exception ex) { /* handles everything else */ }
```

## The when Clause

C# allows you to add a `when` clause to a `catch` block for even more specific filtering:

```csharp
try
{
    int[] data = LoadData();
    ProcessData(data);
}
catch (ArgumentException ex) when (ex.ParamName == "count")
{
    Console.WriteLine("Invalid count parameter. Must be positive.");
}
catch (ArgumentException ex) when (ex.ParamName == "source")
{
    Console.WriteLine("Data source is invalid.");
}
catch (ArgumentException ex)
{
    Console.WriteLine($"Argument error: {ex.Message}");
}
```

The `when` clause is evaluated *before* the catch block is entered. If the `when` condition is false, the runtime continues checking subsequent catch blocks.

## The finally Block

The `finally` block runs whether or not an exception was thrown — ideal for cleanup:

```csharp
StreamReader? reader = null;
try
{
    reader = new StreamReader("data.txt");
    Console.WriteLine(reader.ReadToEnd());
}
catch (FileNotFoundException)
{
    Console.WriteLine("File not found.");
}
finally
{
    reader?.Dispose();  // Always close the file
}
```

## Key Takeaways

- Use `try-catch` to handle exceptions instead of letting your program crash
- Catch specific exception types to provide targeted error handling
- Order catch blocks from most specific to most general
- Use `when` clauses for conditional exception filtering
- Use `finally` for cleanup code that must always run
- Catching `Exception` (the base type) as a catch-all should be a last resort, not the first option

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
