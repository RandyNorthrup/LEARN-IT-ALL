---
id: lesson-005-003
title: Convert Data Types Using Casting and Conversion Techniques in C#
chapterId: chapter-05
order: 3
duration: 5
objectives:
  - Perform implicit conversions (widening) between compatible types
  - Use explicit casting (narrowing) with the cast operator
  - Apply Convert class methods for safe type conversion
  - Implement the TryParse pattern for parsing strings
  - Distinguish between Parse and TryParse and choose the right approach
---

# Convert Data Types Using Casting and Conversion Techniques in C#

Real-world programs constantly move data between types — reading user input as strings and turning it into numbers, converting integers to floating-point values for math, or transforming database results into application types. C# gives you several mechanisms to convert data safely and predictably.

## Implicit Conversion (Widening)

An **implicit conversion** happens automatically when the destination type can hold every possible value of the source type. No data is lost, so the compiler allows it without any special syntax:

```csharp
int myInt = 42;
long myLong = myInt;       // int → long (no data loss)
double myDouble = myLong;  // long → double (no data loss)

Console.WriteLine($"int: {myInt}, long: {myLong}, double: {myDouble}");
// Output: int: 42, long: 42, double: 42
```

Common implicit conversion paths:

```
byte → short → int → long → float → double
                int → decimal
```

> **Note:** `long` to `float` is implicit but may lose precision for very large values because `float` only has ~7 digits of precision. The conversion is allowed because the range of `float` covers `long`.

## Explicit Casting (Narrowing)

When converting from a larger type to a smaller type, data loss is possible. The compiler requires you to acknowledge this with an explicit **cast operator**:

```csharp
double price = 49.97;
int truncated = (int)price;  // Explicit cast — truncates decimal portion
Console.WriteLine(truncated); // 49 (not rounded — just dropped)

long bigNumber = 3_000_000_000L;
int overflow = (int)bigNumber; // Dangerous! Value exceeds int range
Console.WriteLine(overflow);   // -1294967296 (wrapped around)
```

**Warning:** Casting does not round — it truncates. And if the value exceeds the target type's range, you get silent overflow (unless you use a `checked` block).

```csharp
// Safe narrowing with checked
try
{
    checked
    {
        long big = 3_000_000_000L;
        int safe = (int)big; // Throws OverflowException
    }
}
catch (OverflowException)
{
    Console.WriteLine("Value too large for int!");
}
```

## The Convert Class

The `System.Convert` class provides static methods that handle type conversion with built-in range checking. Unlike a cast, `Convert` methods throw an `OverflowException` if the value is out of range:

```csharp
// String to numeric
string input = "123";
int number = Convert.ToInt32(input);
double fraction = Convert.ToDouble("45.67");

// Numeric to numeric (with overflow protection)
double largeValue = 300.0;
try
{
    byte smallByte = Convert.ToByte(largeValue); // Throws — 300 > 255
}
catch (OverflowException)
{
    Console.WriteLine("Cannot fit 300 into a byte!");
}

// Boolean conversions
bool flag = Convert.ToBoolean(1);    // true (any non-zero = true)
int back = Convert.ToInt32(true);    // 1
```

Useful `Convert` methods:

| Method | Converts To |
|--------|------------|
| `Convert.ToInt32()` | `int` |
| `Convert.ToInt64()` | `long` |
| `Convert.ToDouble()` | `double` |
| `Convert.ToDecimal()` | `decimal` |
| `Convert.ToByte()` | `byte` |
| `Convert.ToBoolean()` | `bool` |
| `Convert.ToString()` | `string` |

## Parse — Quick String-to-Number Conversion

Every numeric type has a static `Parse` method that converts a string to that type. It is fast but throws a `FormatException` if the string is not valid:

```csharp
int age = int.Parse("30");
double temp = double.Parse("98.6");
decimal salary = decimal.Parse("75000.50");

// This will crash at runtime:
// int bad = int.Parse("hello"); // FormatException
// int empty = int.Parse("");    // FormatException
// int nil = int.Parse(null);    // ArgumentNullException
```

Use `Parse` only when you are confident the string is valid — for example, when the data comes from a controlled source like a configuration file you wrote yourself.

## TryParse — The Safe Parsing Pattern

`TryParse` returns a `bool` indicating success or failure and outputs the result through an `out` parameter. It **never throws an exception**, making it perfect for user input:

```csharp
Console.Write("Enter your age: ");
string? userInput = Console.ReadLine();

if (int.TryParse(userInput, out int age))
{
    Console.WriteLine($"You are {age} years old.");
}
else
{
    Console.WriteLine("That's not a valid number.");
}
```

When `TryParse` fails, the `out` variable is set to the type's default value (0 for numeric types, `false` for `bool`).

The pattern works with all numeric types:

```csharp
bool isValidDouble = double.TryParse("3.14", out double pi);
bool isValidDecimal = decimal.TryParse("99.99", out decimal price);
bool isValidLong = long.TryParse("9999999999", out long bigNum);
bool isValidBool = bool.TryParse("true", out bool flag);
```

## Parse vs TryParse — When to Use Each

| Scenario | Use | Why |
|----------|-----|-----|
| User input from console or form | `TryParse` | Input may be anything |
| Reading a config file you control | `Parse` | Data format is guaranteed |
| Processing CSV/JSON from external source | `TryParse` | Data may be malformed |
| Converting a validated string | `Parse` | Already confirmed it's valid |

## Combining Conversions in Practice

Here is a realistic example that reads a CSV line and converts each field:

```csharp
string csvLine = "Alice,30,72500.50,true";
string[] fields = csvLine.Split(',');

string name = fields[0];

if (int.TryParse(fields[1], out int age) &&
    decimal.TryParse(fields[2], out decimal salary) &&
    bool.TryParse(fields[3], out bool isActive))
{
    Console.WriteLine($"Name: {name}");
    Console.WriteLine($"Age: {age}");
    Console.WriteLine($"Salary: {salary:C}");
    Console.WriteLine($"Active: {isActive}");
}
else
{
    Console.WriteLine("Error: Could not parse CSV data.");
}
```

## Recap

- **Implicit conversions** happen automatically when no data can be lost (small → large).
- **Explicit casts** use `(type)` syntax and may truncate or overflow.
- The **`Convert` class** provides safe conversion with overflow checking.
- **`Parse`** is fast but throws on invalid input — use it with trusted data.
- **`TryParse`** never throws and returns a bool — always use it for user input and external data.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
