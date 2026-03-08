---
id: lesson-006-005
title: Store and Retrieve Data Using Literal and Variable Values in C#
chapterId: chapter-06
order: 5
duration: 5
objectives:
  - Declare and initialize variables with different data types
  - Use int, double, decimal, string, char, and bool types
  - Create implicitly-typed variables with the var keyword
  - Define constants with the const keyword
---

# Store and Retrieve Data Using Literal and Variable Values in C#

## Understanding Data Types

C# is a **strongly-typed** language — every variable must have a declared type, and the compiler enforces type safety. Here are the fundamental data types you'll use most often:

| Type      | Description                | Example              | Size       |
|-----------|----------------------------|----------------------|------------|
| `int`     | Whole numbers              | `42`, `-7`           | 32-bit     |
| `long`    | Large whole numbers        | `9_000_000_000L`     | 64-bit     |
| `double`  | Floating-point numbers     | `3.14`, `2.0`        | 64-bit     |
| `decimal` | High-precision decimals    | `19.99m`             | 128-bit    |
| `string`  | Text                       | `"Hello"`          | Variable   |
| `char`    | Single character           | `'A'`                | 16-bit     |
| `bool`    | True or false              | `true`, `false`      | 8-bit      |

Notice the suffixes: `decimal` literals require an `m` suffix, and `long` literals use `L`.

## Declaring and Initializing Variables

A **variable** is a named storage location in memory. You declare a variable by specifying its type and name, then optionally assigning a value:

```csharp
// Declaration only
int age;

// Declaration with initialization
int score = 95;
string name = "Alice";
double temperature = 98.6;
bool isActive = true;
char initial = 'A';
decimal price = 29.99m;
```

You must assign a value to a local variable before reading it, or the compiler will report an error:

```csharp
int x;
// Console.WriteLine(x);  // ERROR: Use of unassigned local variable 'x'
x = 10;
Console.WriteLine(x);     // OK: 10
```

## Reassigning Variables

Once declared, you can change a variable's value — but not its type:

```csharp
int count = 1;
count = 2;         // OK
count = count + 5; // OK, count is now 7
// count = "hello"; // ERROR: cannot assign string to int
```

## Implicitly-Typed Variables with `var`

The `var` keyword lets the compiler **infer** the type from the assigned value:

```csharp
var message = "Hello";    // inferred as string
var number = 42;           // inferred as int
var pi = 3.14;             // inferred as double
var isReady = false;       // inferred as bool
```

Key rules for `var`:
- You **must** initialize the variable on the same line
- The type is determined at compile time (it is NOT dynamic)
- Once inferred, the type cannot change

```csharp
var value = 10;
// value = "text";  // ERROR: cannot convert string to int
```

Use `var` when the type is obvious from the right side. Use explicit types when clarity matters.

## Constants

Use the `const` keyword to declare a value that **never changes**:

```csharp
const double Pi = 3.14159265;
const int MaxRetries = 3;
const string AppName = "LearnCSharp";
```

Constants must be initialized at declaration and cannot be modified later:

```csharp
const int Limit = 100;
// Limit = 200;  // ERROR: the left-hand side of an assignment must be a variable
```

By convention, constant names use **PascalCase** in C#.

## Literal Values

A **literal** is a fixed value written directly in code. Each data type has its own literal syntax:

```csharp
int dec = 42;              // decimal (base 10)
int hex = 0x2A;            // hexadecimal
int bin = 0b_0010_1010;    // binary (underscores for readability)

double d = 1.5e3;          // scientific notation: 1500.0
decimal money = 9.99m;     // decimal literal
long big = 100_000_000L;   // long literal with digit separators
```

Digit separators (`_`) improve readability for large numbers and are ignored by the compiler.

## Type Conversion Preview

C# allows **implicit** conversions when no data is lost (e.g., `int` to `double`), and requires **explicit** casts when data might be lost:

```csharp
int whole = 5;
double result = whole;          // implicit: 5 → 5.0

double pi = 3.14159;
int truncated = (int)pi;        // explicit cast: 3 (decimal part lost)

Console.WriteLine(result);      // 5
Console.WriteLine(truncated);   // 3
```

## Key Takeaways

- C# is strongly-typed: every variable has a fixed type
- Core types include `int`, `double`, `decimal`, `string`, `char`, and `bool`
- Use `var` for implicit typing when the type is obvious
- Use `const` for values that should never change
- Literal suffixes (`m`, `L`) and digit separators (`_`) clarify numeric values
- Implicit conversions are safe; explicit casts may lose data

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
