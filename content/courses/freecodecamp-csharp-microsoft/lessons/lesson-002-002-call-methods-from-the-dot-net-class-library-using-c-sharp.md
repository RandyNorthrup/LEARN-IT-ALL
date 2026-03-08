---
id: lesson-002-002
title: Call Methods From the .NET Class Library Using C#
chapterId: chapter-02
order: 2
duration: 5
objectives:
  - Understand the .NET class library and namespaces
  - Use common String methods for text manipulation
  - Generate random numbers with the Random class
  - Work with DateTime for dates and times
  - Import namespaces with using statements
---

# Call Methods From the .NET Class Library Using C#

## The .NET Class Library

The **.NET class library** is a vast collection of pre-built classes and methods organized into **namespaces**. Instead of writing everything from scratch, you can leverage thousands of ready-made tools.

Common namespaces include:

| Namespace                    | Contains                                    |
|-----------------------------|---------------------------------------------|
| `System`                    | Core types (Console, Math, String, Int32)    |
| `System.Collections.Generic`| Lists, dictionaries, queues, stacks          |
| `System.IO`                 | File and stream I/O                          |
| `System.Linq`               | LINQ query methods                           |
| `System.Text`               | StringBuilder, Encoding                      |

With **implicit usings** enabled (default in .NET 8), the most common namespaces are automatically imported.

## String Methods

The `string` type has many built-in methods for text manipulation:

### Searching

```csharp
string message = "Hello, World!";

// Contains — does the string include a substring?
Console.WriteLine(message.Contains("World"));     // True
Console.WriteLine(message.Contains("world"));     // False (case-sensitive)

// StartsWith / EndsWith
Console.WriteLine(message.StartsWith("Hello"));   // True
Console.WriteLine(message.EndsWith("!"));          // True

// IndexOf — find the position of a substring (-1 if not found)
Console.WriteLine(message.IndexOf("World"));      // 7
Console.WriteLine(message.IndexOf("xyz"));        // -1
```

### Extracting

```csharp
string text = "Hello, World!";

// Substring — extract part of a string
string word = text.Substring(7, 5);   // "World" (start at 7, take 5 chars)
string rest = text.Substring(7);       // "World!" (start at 7 to end)

// Range syntax (C# 8+)
string first5 = text[..5];             // "Hello"
string last6 = text[^6..];            // "orld!"
```

### Transforming

```csharp
string name = "  Alice Smith  ";

Console.WriteLine(name.ToUpper());          // "  ALICE SMITH  "
Console.WriteLine(name.ToLower());          // "  alice smith  "
Console.WriteLine(name.Trim());             // "Alice Smith"
Console.WriteLine(name.TrimStart());        // "Alice Smith  "
Console.WriteLine(name.TrimEnd());          // "  Alice Smith"

// Replace
string updated = name.Trim().Replace("Alice", "Bob");
Console.WriteLine(updated);                // "Bob Smith"
```

### Splitting and Joining

```csharp
string csv = "apple,banana,cherry,date";

// Split into an array
string[] fruits = csv.Split(',');
foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}

// Join an array back into a string
string joined = String.Join(" | ", fruits);
Console.WriteLine(joined);  // "apple | banana | cherry | date"
```

### Checking for Empty/Null

```csharp
string empty = "";
string? nothing = null;

Console.WriteLine(String.IsNullOrEmpty(empty));       // True
Console.WriteLine(String.IsNullOrEmpty(nothing));     // True
Console.WriteLine(String.IsNullOrWhiteSpace("   ")); // True
```

## The Random Class

The `Random` class generates pseudo-random numbers:

```csharp
Random random = new Random();

// Random integer between 0 (inclusive) and 100 (exclusive)
int number = random.Next(100);           // 0–99
Console.WriteLine(number);

// Random integer in a range [min, max)
int die = random.Next(1, 7);             // 1–6 (simulates a die roll)
Console.WriteLine($"Die roll: {die}");

// Random double between 0.0 and 1.0
double fraction = random.NextDouble();
Console.WriteLine($"Random fraction: {fraction:F4}");
```

### Practical Example: Dice Roller

```csharp
Random rng = new Random();

Console.WriteLine("Rolling two dice...");
int die1 = rng.Next(1, 7);
int die2 = rng.Next(1, 7);
int total = die1 + die2;

Console.WriteLine($"Die 1: {die1}");
Console.WriteLine($"Die 2: {die2}");
Console.WriteLine($"Total: {total}");

if (total == 7 || total == 11)
    Console.WriteLine("You win!");
else if (total == 2 || total == 3 || total == 12)
    Console.WriteLine("You lose!");
else
    Console.WriteLine($"Point is {total}. Roll again.");
```

## The DateTime Struct

`DateTime` represents dates and times:

```csharp
// Current date and time
DateTime now = DateTime.Now;
Console.WriteLine(now);                       // e.g., 3/3/2026 2:30:45 PM

// Today's date (no time component)
DateTime today = DateTime.Today;
Console.WriteLine(today.ToShortDateString()); // e.g., 3/3/2026

// Create a specific date
DateTime birthday = new DateTime(2000, 6, 15);
Console.WriteLine(birthday.ToString("MMMM dd, yyyy")); // June 15, 2000

// Date arithmetic
DateTime nextWeek = today.AddDays(7);
TimeSpan age = today - birthday;
Console.WriteLine($"Days old: {age.Days}");
```

## Using Statements

If you need a namespace not covered by implicit usings, add a `using` directive:

```csharp
using System.Text;

StringBuilder sb = new StringBuilder();
sb.Append("Hello");
sb.Append(", ");
sb.Append("World!");
Console.WriteLine(sb.ToString());  // "Hello, World!"
```

With .NET 8's implicit usings, `System`, `System.Collections.Generic`, `System.IO`, `System.Linq`, and `System.Threading.Tasks` are imported automatically.

## Key Takeaways

- The .NET class library provides thousands of ready-made classes organized in namespaces
- String methods (`Contains`, `StartsWith`, `Substring`, `ToUpper`, `Trim`, `Split`, `Replace`) are essential for text processing
- The `Random` class generates pseudo-random integers and doubles
- `DateTime` handles date/time creation, formatting, and arithmetic
- Use `using` directives to import additional namespaces

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
