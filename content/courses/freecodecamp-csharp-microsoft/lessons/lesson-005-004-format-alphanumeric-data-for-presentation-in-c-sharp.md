---
id: lesson-005-004
title: Format Alphanumeric Data for Presentation in C#
chapterId: chapter-05
order: 4
duration: 5
objectives:
  - Use composite formatting and string interpolation to build formatted strings
  - Apply standard format specifiers for currency, percent, and number formatting
  - Create custom format strings for specialized display requirements
  - Control alignment and padding in formatted output
  - Understand culture-specific formatting and ToString overloads
---

# Format Alphanumeric Data for Presentation in C#

Raw data rarely looks good on screen. Turning a `decimal` like `1234.5` into `$1,234.50` or a `DateTime` into `March 3, 2026` requires formatting. C# provides multiple techniques — from classic composite formatting to modern string interpolation — that give you precise control over how data is displayed.

## Composite Formatting

Composite formatting uses `string.Format` or `Console.WriteLine` with numbered placeholders:

```csharp
string name = "Alice";
int age = 30;
decimal salary = 72500.50m;

// Using string.Format
string message = string.Format("Name: {0}, Age: {1}, Salary: {2}", name, age, salary);
Console.WriteLine(message);
// Output: Name: Alice, Age: 30, Salary: 72500.50

// Using Console.WriteLine directly
Console.WriteLine("Name: {0}, Age: {1}, Salary: {2}", name, age, salary);
```

The number inside `{}` refers to the argument's position (zero-based). You can reuse placeholders:

```csharp
Console.WriteLine("{0} is {0}. {0} will always be {0}.", "Truth");
// Output: Truth is Truth. Truth will always be Truth.
```

## String Interpolation

String interpolation (prefixed with `$`) is the modern, more readable approach:

```csharp
string name = "Bob";
int items = 5;
decimal total = 49.95m;

Console.WriteLine($"{name} purchased {items} items for {total}.");
// Output: Bob purchased 5 items for 49.95.
```

You can embed any expression inside the braces:

```csharp
int a = 10, b = 3;
Console.WriteLine($"{a} / {b} = {a / (double)b:F2}");
// Output: 10 / 3 = 3.33
```

## Standard Format Specifiers

Add a format specifier after a colon inside the placeholder to control display. The most common specifiers:

| Specifier | Name      | Example Input | Output |
|-----------|-----------|---------------|--------|
| `C` or `c` | Currency  | `1234.56`   | `$1,234.56` |
| `N` or `n` | Number    | `1234567.89`| `1,234,567.89` |
| `P` or `p` | Percent   | `0.856`     | `85.60%` |
| `D` or `d` | Decimal (integers only) | `42` | `42` |
| `F` or `f` | Fixed-point | `3.14159` | `3.14` |
| `E` or `e` | Scientific | `1234567.89`| `1.234568E+006` |
| `X` or `x` | Hexadecimal | `255`     | `FF` |

A number after the specifier controls precision (decimal places):

```csharp
decimal price = 19.5m;
Console.WriteLine($"Price: {price:C}");    // $19.50
Console.WriteLine($"Price: {price:C0}");   // $20 (zero decimal places)

double ratio = 0.8675;
Console.WriteLine($"Rate: {ratio:P}");     // 86.75%
Console.WriteLine($"Rate: {ratio:P1}");    // 86.8% (one decimal place)

int bigNum = 1_500_000;
Console.WriteLine($"Count: {bigNum:N0}");  // 1,500,000 (no decimals)

double pi = 3.14159265;
Console.WriteLine($"Pi: {pi:F4}");         // 3.1416 (four decimal places)

int hex = 255;
Console.WriteLine($"Hex: {hex:X}");        // FF
Console.WriteLine($"Hex: {hex:x4}");       // 00ff (lowercase, padded to 4)
```

## Date and Time Formatting

DateTime values support their own set of format specifiers:

```csharp
DateTime now = new DateTime(2026, 3, 3, 14, 30, 0);

Console.WriteLine($"{now:d}");    // 3/3/2026        (short date)
Console.WriteLine($"{now:D}");    // Tuesday, March 3, 2026  (long date)
Console.WriteLine($"{now:t}");    // 2:30 PM         (short time)
Console.WriteLine($"{now:T}");    // 2:30:00 PM      (long time)
Console.WriteLine($"{now:f}");    // Tuesday, March 3, 2026 2:30 PM
Console.WriteLine($"{now:yyyy-MM-dd}"); // 2026-03-03 (custom)
Console.WriteLine($"{now:MMMM dd, yyyy HH:mm}"); // March 03, 2026 14:30
```

## Custom Format Strings

When standard specifiers do not meet your needs, build custom format strings:

```csharp
int orderNumber = 42;
Console.WriteLine($"Order #{orderNumber:D6}");  // Order #000042

double value = 1234567.891;
Console.WriteLine($"{value:#,##0.00}");   // 1,234,567.89

// Phone number formatting
long phone = 5551234567;
Console.WriteLine($"Phone: {phone:(###) ###-####}"); // Phone: (555) 123-4567
```

Custom numeric format characters:
- `0` — digit placeholder (shows zero if no digit)
- `#` — digit placeholder (omits if no digit)
- `.` — decimal point
- `,` — group separator
- `%` — multiplies by 100 and shows percent sign

```csharp
double fraction = 0.425;
Console.WriteLine($"{fraction:0.0%}");   // 42.5%
Console.WriteLine($"{fraction:#.##%}");  // 42.5%
```

## Alignment and Padding

You can control the width of a formatted field for tabular output. A positive width right-aligns; negative left-aligns:

```csharp
string[] products = { "Widget", "Gadget", "Thingamajig" };
decimal[] prices = { 9.99m, 24.50m, 149.99m };
int[] quantities = { 100, 45, 12 };

Console.WriteLine($"{"Product",-15} {"Price",10} {"Qty",5}");
Console.WriteLine(new string('-', 32));

for (int i = 0; i < products.Length; i++)
{
    Console.WriteLine($"{products[i],-15} {prices[i],10:C} {quantities[i],5}");
}
```

Output:

```
Product              Price   Qty
--------------------------------
Widget               $9.99   100
Gadget              $24.50    45
Thingamajig        $149.99    12
```

You can also use `PadLeft` and `PadRight` string methods:

```csharp
string label = "Hello";
Console.WriteLine(label.PadLeft(10));       // "     Hello"
Console.WriteLine(label.PadRight(10, '.'));  // "Hello....."
Console.WriteLine(label.PadLeft(10, '*'));   // "*****Hello"
```

## Culture-Specific Formatting

Format specifiers like `C` (currency) and `N` (number) respect the current culture. You can override this using `CultureInfo`:

```csharp
using System.Globalization;

decimal amount = 1234.56m;

Console.WriteLine(amount.ToString("C", CultureInfo.GetCultureInfo("en-US")));  // $1,234.56
Console.WriteLine(amount.ToString("C", CultureInfo.GetCultureInfo("de-DE")));  // 1.234,56 €
Console.WriteLine(amount.ToString("C", CultureInfo.GetCultureInfo("ja-JP")));  // ¥1,235
```

## ToString Overloads

Every type in C# inherits `ToString()` from `object`. Numeric types accept format strings directly:

```csharp
int count = 42;
Console.WriteLine(count.ToString());        // "42"
Console.WriteLine(count.ToString("D5"));    // "00042"
Console.WriteLine(count.ToString("N0"));    // "42"
Console.WriteLine(count.ToString("C"));     // "$42.00"
```

## Recap

- **Composite formatting** (`string.Format`) uses numbered placeholders; **string interpolation** (`$""`) embeds expressions directly.
- **Standard specifiers** (`C`, `N`, `P`, `F`, `D`, `X`) cover the most common number formats.
- **Custom format strings** (`#`, `0`, `.`, `,`) give you pixel-level control.
- Use **alignment** (`,width`) and **PadLeft/PadRight** for tabular output.
- Culture-specific formatting ensures correct currency symbols and number separators for different locales.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
