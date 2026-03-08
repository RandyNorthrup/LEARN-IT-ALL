---
id: lesson-004-006
title: Review the Principles of Code Debugging and Exception Handling
chapterId: chapter-04
order: 6
duration: 5
objectives:
  - Identify the three types of errors: syntax, runtime, and logic
  - Apply the scientific method for debugging
  - Read and interpret error messages and stack traces
  - Recognize common C# errors and their causes
---

# Review the Principles of Code Debugging and Exception Handling

Every developer spends significant time debugging. The difference between a novice and an experienced programmer isn't that experts write bug-free code — it's that experts find and fix bugs *systematically*. This lesson establishes the debugging mindset you'll use throughout your career.

## The Three Types of Errors

### Syntax Errors

Syntax errors violate the rules of the C# language. The compiler catches them *before* your program runs:

```csharp
// Missing semicolon
Console.WriteLine("Hello")

// Misspelled keyword
Console.WirteLine("Hello");

// Mismatched braces
if (true)
{
    Console.WriteLine("Oops");
// Missing closing brace
```

Syntax errors are the easiest to fix because the compiler tells you exactly what's wrong and where. The error message typically includes the file name, line number, and a description like `CS1002: ; expected`.

### Runtime Errors

Runtime errors occur while the program is executing. The code is syntactically valid, but something goes wrong during execution:

```csharp
// DivideByZeroException
int a = 10;
int b = 0;
int result = a / b;  // Crashes here

// IndexOutOfRangeException
int[] numbers = { 1, 2, 3 };
Console.WriteLine(numbers[5]);  // Index 5 doesn't exist

// NullReferenceException
string name = null;
Console.WriteLine(name.Length);  // Can't access Length on null

// FormatException
int age = int.Parse("abc");  // "abc" is not a valid integer
```

Runtime errors produce **exceptions** that crash your program unless handled. You'll learn to handle them with `try-catch` in a later lesson.

### Logic Errors

Logic errors are the hardest to find. The program compiles, runs without crashing, but produces *wrong results*:

```csharp
// Bug: using + instead of *
static double CalculateArea(double width, double height)
{
    return width + height;  // Should be width * height
}

// Bug: off-by-one error
for (int i = 0; i <= 10; i++)  // Runs 11 times, not 10
{
    Console.WriteLine(i);
}

// Bug: wrong comparison operator
if (temperature < 100)  // Should be > 100 for boiling
{
    Console.WriteLine("Water is boiling!");
}
```

The compiler can't catch logic errors because the code is technically valid. You find them through testing, code review, and careful debugging.

## The Scientific Method for Debugging

Effective debugging follows a structured process:

1. **Observe** — What is the actual vs. expected behavior?
2. **Hypothesize** — What could cause the difference?
3. **Test** — Add a breakpoint, insert a log, or change an input
4. **Analyze** — Did the test confirm your theory?
5. **Fix** — Make the minimal change to correct the bug
6. **Verify** — Run again to confirm the fix doesn't introduce new bugs

The biggest mistake beginners make is **randomly changing code**. Always have a hypothesis before making changes.

## Reading Error Messages

C# error messages follow a consistent format. Here's how to read them:

```
Unhandled exception. System.DivideByZeroException: Attempted to divide by zero.
   at Program.CalculateAverage(Int32[] scores) in /app/Program.cs:line 24
   at Program.Main(String[] args) in /app/Program.cs:line 8
```

| Component | Meaning |
|-----------|---------|
| `System.DivideByZeroException` | The exception type — tells you *what* went wrong |
| `Attempted to divide by zero.` | The message — explains the error in plain English |
| `at Program.CalculateAverage(...)` | The method where the error occurred |
| `in /app/Program.cs:line 24` | The exact file and line number |

## Understanding Stack Traces

The **stack trace** shows the method call chain from most recent (top) to oldest (bottom):

```
   at Program.CalculateAverage(Int32[] scores) in Program.cs:line 24
   at Program.ProcessStudentData(String name) in Program.cs:line 15
   at Program.Main(String[] args) in Program.cs:line 8
```

Read this as: `Main` called `ProcessStudentData`, which called `CalculateAverage`, which crashed at line 24. Always start at the **top** to find the immediate cause.

## Common C# Errors Quick Reference

| Error | Typical Cause |
|-------|---------------|
| `NullReferenceException` | Accessing a member on `null` |
| `IndexOutOfRangeException` | Array index beyond bounds |
| `FormatException` | Invalid string-to-number conversion |
| `DivideByZeroException` | Dividing by zero |
| `StackOverflowException` | Infinite recursion |
| `InvalidCastException` | Incompatible type conversion |

## Key Takeaways

- Syntax errors are caught at compile time, runtime errors crash during execution, and logic errors produce wrong results silently
- Use a systematic approach: observe, hypothesize, test, analyze, fix, verify
- Stack traces read top-to-bottom, with the crash location at the top
- Error messages tell you the exception type, a description, and the exact location
- Never change code randomly — always have a hypothesis first

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
