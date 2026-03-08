---
id: lesson-006-006
title: Write Your First C# Code
chapterId: chapter-06
order: 6
duration: 5
objectives:
  - Understand what C# is and its role in the .NET ecosystem
  - Write and run a Hello World program using top-level statements
  - Use Console.WriteLine and Console.Write for output
  - Work with string literals, escape sequences, and verbatim strings
---

# Write Your First C# Code

## What Is C#?

C# (pronounced "C-sharp") is a modern, object-oriented programming language developed by Microsoft. It runs on the **.NET platform** — a free, open-source, cross-platform framework for building applications on Windows, macOS, and Linux. C# is used to build web apps, desktop apps, mobile apps, games (with Unity), cloud services, and more.

As of .NET 8 (the current Long-Term Support release), C# 12 is the latest version of the language.

## Your First Program: Hello World

Every C# journey begins with Hello World. In C# 12 / .NET 8, you can use **top-level statements**, which means you don't need to wrap your code in a `Main` method or class — the compiler handles that for you.

Create a new console project and run it:

```bash
dotnet new console -n HelloWorld
cd HelloWorld
```

Open `Program.cs` and replace its contents with:

```csharp
Console.WriteLine("Hello, World!");
```

Run the program:

```bash
dotnet run
```

Output:

```
Hello, World!
```

That single line is a complete C# program. The `Console.WriteLine()` method prints text to the terminal.

## Console.WriteLine vs Console.Write

C# provides two methods for printing text to the console:

- **`Console.WriteLine()`** — prints text followed by a newline character
- **`Console.Write()`** — prints text *without* adding a newline

```csharp
Console.Write("Hello, ");
Console.Write("World!");
Console.WriteLine();          // just a blank newline
Console.WriteLine("This is on a new line.");
```

Output:

```
Hello, World!
This is on a new line.
```

## String Literals and Character Literals

A **string literal** is a sequence of characters enclosed in double quotes:

```csharp
Console.WriteLine("This is a string literal.");
```

A **character literal** uses single quotes and holds exactly one character:

```csharp
char grade = 'A';
Console.WriteLine(grade);   // A
```

## Escape Sequences

Escape sequences let you embed special characters inside strings:

| Sequence | Meaning          |
|----------|------------------|
| `\n`    | New line         |
| `\t`    | Tab              |
| `\\`   | Backslash        |
| `\"`   | Double quote     |

```csharp
Console.WriteLine("Hello\tWorld");         // Hello    World
Console.WriteLine("She said \"Hi!\"");   // She said "Hi!"
Console.WriteLine("Line1\nLine2");         // two lines
Console.WriteLine("Path: C:\\Users\\file.txt");
```

## Verbatim Strings

Prefix a string with `@` to create a **verbatim string literal**. Escape sequences are ignored — backslashes are treated as literal characters. To include a double quote, use `""`:

```csharp
Console.WriteLine(@"C:\Users\Documents\file.txt");
Console.WriteLine(@"This spans
multiple lines
without escape sequences");
Console.WriteLine(@"She said ""Hello""");
```

Verbatim strings are especially useful for Windows file paths and multi-line text.

## Raw String Literals (C# 11+)

C# 11 introduced **raw string literals** using three or more double-quote characters:

```csharp
string json = """
    {
        "name": "Alice",
        "age": 30
    }
    """;
Console.WriteLine(json);
```

Raw string literals preserve internal formatting and require no escaping of quotes or backslashes.

## Combining String Interpolation with Verbatim Strings

You can combine interpolation (`$`) with verbatim (`@`) prefixes:

```csharp
string userName = "Alice";
Console.WriteLine($@"C:\Users\{userName}\Documents");
// Output: C:\Users\Alice\Documents
```

String interpolation is covered in detail in the string formatting lesson.

## Key Takeaways

- C# is a modern, cross-platform language running on .NET 8
- Top-level statements let you write concise programs without boilerplate
- `Console.WriteLine()` adds a newline; `Console.Write()` does not
- Escape sequences (`\n`, `\t`, `\\`, `\"`) insert special characters
- Verbatim strings (`@""`) disable escape processing
- Raw string literals (`"""..."""`) simplify complex, multi-line strings

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
