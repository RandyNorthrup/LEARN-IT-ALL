---
id: lesson-005-006
title: Modify the Content of Strings Using Built-In String Data Type Methods in C#
chapterId: chapter-05
order: 6
duration: 5
objectives:
  - Use IndexOf and Substring to search and extract portions of strings
  - Apply Replace, Remove, and Insert to modify string content
  - Use Contains, StartsWith, and EndsWith for string testing
  - Split strings into arrays and join arrays back into strings
  - Understand when to use StringBuilder for performance
  - Compare strings using ordinal and culture-sensitive approaches
---

# Modify the Content of Strings Using Built-In String Data Type Methods in C#

Strings are one of the most heavily used types in any C# application. Whether you are parsing user input, formatting output, or processing data files, you will constantly need to search, extract, and transform string content. This lesson covers the essential built-in methods that make string manipulation efficient and readable.

## Searching Inside Strings

### IndexOf and LastIndexOf

`IndexOf` returns the zero-based position of the first occurrence of a character or substring. It returns `-1` if not found:

```csharp
string message = "Hello, World! Hello, C#!";

int firstHello = message.IndexOf("Hello");      // 0
int secondHello = message.LastIndexOf("Hello");  // 14
int notFound = message.IndexOf("Python");        // -1

// Search starting from a specific position
int fromIndex = message.IndexOf("Hello", 1);     // 14
```

### Contains, StartsWith, and EndsWith

These methods return `bool` and are perfect for conditional checks:

```csharp
string email = "user@example.com";

bool hasAt = email.Contains("@");           // true
bool isGmail = email.EndsWith("@gmail.com"); // false
bool startsRight = email.StartsWith("user"); // true

// Case-insensitive comparison
bool found = email.Contains("USER", StringComparison.OrdinalIgnoreCase); // true
```

## Extracting Substrings

`Substring` extracts a portion of a string by position:

```csharp
string fullName = "John Michael Smith";

// From index to end
string fromMiddle = fullName.Substring(5);        // "Michael Smith"

// From index with length
string middleName = fullName.Substring(5, 7);     // "Michael"

// Common pattern: extract after a delimiter
string data = "Name:Alice";
int colonPos = data.IndexOf(':');
string value = data.Substring(colonPos + 1);      // "Alice"
```

You can also use the **range operator** (C# 8+) for cleaner syntax:

```csharp
string greeting = "Hello, World!";
string world = greeting[7..12];  // "World"
string last5 = greeting[^6..];  // "orld!"
```

## Modifying Strings

Remember: strings in C# are **immutable**. Every modification creates a new string.

### Replace

```csharp
string original = "The cat sat on the mat";
string replaced = original.Replace("cat", "dog");
// "The dog sat on the mat"

// Replace characters
string cleaned = "  extra   spaces  ".Replace(" ", "");
// "extraspaces"
```

### Remove and Insert

```csharp
string text = "Hello, Beautiful World!";

// Remove 11 characters starting at index 7
string shortened = text.Remove(7, 11);  // "Hello, World!"

// Insert at a specific position
string expanded = shortened.Insert(7, "Amazing ");
// "Hello, Amazing World!"
```

### Trim, TrimStart, TrimEnd

```csharp
string padded = "   Hello, World!   ";
string trimmed = padded.Trim();          // "Hello, World!"
string trimStart = padded.TrimStart();   // "Hello, World!   "
string trimEnd = padded.TrimEnd();       // "   Hello, World!"
```

### ToUpper and ToLower

```csharp
string mixed = "Hello World";
Console.WriteLine(mixed.ToUpper());  // "HELLO WORLD"
Console.WriteLine(mixed.ToLower());  // "hello world"
```

## Splitting and Joining

### String.Split

`Split` breaks a string into an array based on a delimiter:

```csharp
string csv = "Alice,30,Engineer,Seattle";
string[] fields = csv.Split(',');
// fields[0] = "Alice", fields[1] = "30", fields[2] = "Engineer", fields[3] = "Seattle"

// Split on multiple delimiters
string messy = "one;two,three four";
string[] parts = messy.Split(new char[] { ';', ',', ' ' });
// ["one", "two", "three", "four"]

// Remove empty entries
string spaced = "a,,b,,c";
string[] clean = spaced.Split(',', StringSplitOptions.RemoveEmptyEntries);
// ["a", "b", "c"]
```

### String.Join

`Join` does the opposite — combines an array into a single string:

```csharp
string[] words = { "Hello", "World", "from", "C#" };
string sentence = string.Join(" ", words);   // "Hello World from C#"
string dashed = string.Join("-", words);     // "Hello-World-from-C#"

// Works with any IEnumerable
int[] numbers = { 1, 2, 3, 4, 5 };
string numList = string.Join(", ", numbers); // "1, 2, 3, 4, 5"
```

## StringBuilder for Performance

Since strings are immutable, every concatenation creates a new string object. In loops, this causes excessive memory allocation. `StringBuilder` solves this by maintaining a mutable buffer:

```csharp
using System.Text;

// Bad — creates 1000 intermediate string objects
string slow = "";
for (int i = 0; i < 1000; i++)
    slow += i + " ";

// Good — uses a single mutable buffer
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
{
    sb.Append(i);
    sb.Append(' ');
}
string fast = sb.ToString();
```

**Rule of thumb:** Use `StringBuilder` when you are concatenating inside a loop or building a string from many parts. For a few concatenations, regular strings are fine.

Key `StringBuilder` methods:

```csharp
StringBuilder sb = new StringBuilder("Hello");
sb.Append(" World");          // "Hello World"
sb.AppendLine("!");           // "Hello World!\n"
sb.Insert(5, ",");            // "Hello, World!\n"
sb.Replace("World", "C#");   // "Hello, C#!\n"
sb.Remove(5, 1);              // "Hello C#!\n"
string result = sb.ToString();
```

## Comparing Strings

String comparison is more nuanced than it appears. C# provides two main approaches:

### Ordinal Comparison (byte-by-byte)

```csharp
// Case-sensitive ordinal (fastest)
bool exact = string.Equals("Hello", "hello", StringComparison.Ordinal); // false

// Case-insensitive ordinal
bool ignore = string.Equals("Hello", "hello", StringComparison.OrdinalIgnoreCase); // true
```

### Culture-Sensitive Comparison

Necessary when sorting or comparing text for display to users in different locales:

```csharp
// Culture-aware comparison
int result = string.Compare("straße", "strasse",
    StringComparison.CurrentCulture);
// Result depends on the current culture setting
```

**Best practice:** Use `StringComparison.Ordinal` or `OrdinalIgnoreCase` for internal comparisons (file paths, keys, identifiers). Use culture-sensitive comparisons only for user-facing text that must respect locale rules.

## Recap

- Use `IndexOf`/`Contains`/`StartsWith`/`EndsWith` to search strings without modifying them.
- `Substring` and the range operator extract portions of a string.
- `Replace`, `Remove`, `Insert`, and `Trim` create new modified copies (strings are immutable).
- `Split` and `Join` convert between strings and arrays.
- Use `StringBuilder` in loops to avoid excessive memory allocation.
- Choose ordinal comparison for internal logic and culture-sensitive comparison for user-facing text.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
