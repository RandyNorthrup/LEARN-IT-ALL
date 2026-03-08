---
id: lesson-006-004
title: Perform Basic String Formatting in C#
chapterId: chapter-06
order: 4
duration: 5
objectives:
  - Concatenate strings with the + operator
  - Use string interpolation with $"" syntax
  - Format strings with String.Format and composite formatting
  - Apply padding with PadLeft and PadRight
  - Format numbers with currency, numeric, and percentage specifiers
---

# Perform Basic String Formatting in C#

## String Concatenation

The simplest way to combine strings is the `+` operator:

```csharp
string firstName = "John";
string lastName = "Doe";
string fullName = firstName + " " + lastName;
Console.WriteLine(fullName);  // John Doe
```

You can also concatenate strings with non-string values — C# automatically calls `.ToString()` on them:

```csharp
int age = 30;
string message = "Age: " + age;
Console.WriteLine(message);  // Age: 30
```

While concatenation works, it becomes hard to read with many variables. Use **string interpolation** instead.

## String Interpolation

Prefix a string with `$` to enable **string interpolation**. Place expressions inside `{}` braces:

```csharp
string name = "Alice";
int score = 95;
double gpa = 3.85;

Console.WriteLine($"Student: {name}");
Console.WriteLine($"Score: {score} / 100");
Console.WriteLine($"GPA: {gpa}");
```

Output:

```
Student: Alice
Score: 95 / 100
GPA: 3.85
```

You can put any valid C# expression inside the braces:

```csharp
int a = 5, b = 3;
Console.WriteLine($"{a} + {b} = {a + b}");           // 5 + 3 = 8
Console.WriteLine($"Uppercase: {name.ToUpper()}");    // Uppercase: ALICE
Console.WriteLine($"Is passing: {score >= 60}");      // Is passing: True
```

## Composite Formatting with String.Format

`String.Format` uses numbered placeholders (`{0}`, `{1}`, etc.) that correspond to arguments:

```csharp
string result = String.Format("Hello, {0}! You scored {1} out of {2}.", "Bob", 87, 100);
Console.WriteLine(result);
// Hello, Bob! You scored 87 out of 100.
```

`Console.WriteLine` also supports composite formatting directly:

```csharp
Console.WriteLine("Name: {0}, Age: {1}", "Carol", 25);
// Name: Carol, Age: 25
```

Composite formatting is the older approach — string interpolation (`$""`) is generally preferred in modern C#.

## Number Formatting Specifiers

Both interpolation and composite formatting support **format specifiers** after a colon inside the braces:

| Specifier | Name       | Example Input | Output        |
|-----------|------------|---------------|---------------|
| `:C`      | Currency   | `1234.56`     | `$1,234.56`   |
| `:N`      | Number     | `1234567.89`  | `1,234,567.89`|
| `:N0`     | Number (0 decimals) | `1234.5` | `1,235`   |
| `:P`      | Percent    | `0.856`       | `85.60%`      |
| `:P0`     | Percent (0 decimals) | `0.856` | `86%`    |
| `:D4`     | Decimal (padded) | `42`     | `0042`        |
| `:F2`     | Fixed-point| `3.14159`     | `3.14`        |

```csharp
decimal price = 1234.5m;
double taxRate = 0.0825;
int orderId = 42;

Console.WriteLine($"Price:    {price:C}");      // Price:    $1,234.50
Console.WriteLine($"Tax Rate: {taxRate:P}");     // Tax Rate: 8.25%
Console.WriteLine($"Order:    {orderId:D6}");    // Order:    000042
Console.WriteLine($"Total:    {price:N2}");      // Total:    1,234.50
Console.WriteLine($"Pi:       {Math.PI:F4}");    // Pi:       3.1416
```

> **Note:** Currency and number formatting depends on the system's culture settings. The examples above use `en-US` formatting.

## Padding and Alignment

Use `PadLeft` and `PadRight` to add padding characters to a string:

```csharp
string label = "Total";
Console.WriteLine(label.PadLeft(15));         //           Total
Console.WriteLine(label.PadRight(15, '-'));   // Total----------
Console.WriteLine(label.PadLeft(15, '.'));    // ..........Total
```

You can also use **alignment** in format specifiers. A positive number right-aligns; a negative number left-aligns:

```csharp
string[] items = { "Apples", "Bread", "Milk" };
decimal[] prices = { 3.99m, 2.49m, 4.29m };

Console.WriteLine($"{"Item",-15}{"Price",10}");
Console.WriteLine(new string('-', 25));

for (int i = 0; i < items.Length; i++)
{
    Console.WriteLine($"{items[i],-15}{prices[i],10:C}");
}
```

Output:

```
Item                Price
-------------------------
Apples              $3.99
Bread               $2.49
Milk                $4.29
```

The `,` followed by a number specifies the field width. Negative means left-align, positive means right-align.

## Combining Verbatim and Interpolated Strings

Use `$@` (or `@$`) to combine interpolation with verbatim strings:

```csharp
string user = "admin";
string path = $@"C:\Users\{user}\AppData\config.json";
Console.WriteLine(path);
// C:\Users\admin\AppData\config.json
```

## Key Takeaways

- String interpolation (`$""`) is the modern, readable way to format strings
- `String.Format` uses numbered placeholders (`{0}`, `{1}`)
- Format specifiers (`:C`, `:N`, `:P`, `:D`, `:F`) control number display
- `PadLeft` / `PadRight` and alignment specifiers create formatted columns
- Combine `$` and `@` for interpolated verbatim strings

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
