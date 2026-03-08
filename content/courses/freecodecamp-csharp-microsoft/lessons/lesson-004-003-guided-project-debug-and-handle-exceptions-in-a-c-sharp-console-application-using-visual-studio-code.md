---
id: lesson-004-003
title: Guided Project - Debug and Handle Exceptions in a C# Console Application Using Visual Studio Code
chapterId: chapter-04
order: 3
duration: 5
objectives:
  - Debug a buggy cash register application step by step
  - Identify and fix syntax errors, logic errors, and unhandled exceptions
  - Add proper exception handling to an existing application
  - Apply a systematic debugging process using VS Code tools
---

# Guided Project — Debug and Handle Exceptions in a C# Console Application

In this guided project, you'll work with a buggy cash register application. The program is supposed to calculate totals, apply discounts, and process payments — but it has multiple bugs. You'll use the VS Code debugger and exception handling techniques to find and fix every issue.

## The Buggy Cash Register

Here is the starting code. It contains **six intentional bugs** — a mix of syntax errors, logic errors, and missing exception handling:

```csharp
string[] items = { "Coffee", "Muffin", "Sandwich", "Water", "Cookie" };
double[] prices = { 3.50, 2.75, 6.99, 1.50, 2.00 };

Console.WriteLine("=== CASH REGISTER ===");
Console.WriteLine("Available items:");

for (int i = 0; i <= items.Length; i++)  // BUG 1: off-by-one (should be <)
{
    Console.WriteLine($"  {i + 1}. {items[i]} - ${prices[i]:F2}");
}

Console.Write("\nEnter item numbers (comma-separated): ");
string input = Console.ReadLine()!;
string[] selections = input.Split(',');

double subtotal = 0;
Console.WriteLine("\nYour order:");

foreach (string selection in selections)
{
    int index = int.Parse(selection) - 1;  // BUG 2: no exception handling for bad input
    Console.WriteLine($"  {items[index]} - ${prices[index]:F2}");
    subtotal += prices[index];
}

// Apply discount
Console.Write("Enter discount code (or press Enter to skip): ");
string discountCode = Console.ReadLine()!;
double discount = GetDiscount(discountCode);
double discountAmount = subtotal + discount;  // BUG 3: should be * not +

double total = subtotal - discountAmount;
Console.WriteLine($"\nSubtotal: ${subtotal:F2}");
Console.WriteLine($"Discount: -${discountAmount:F2}");
Console.WriteLine($"Total: ${total:F2}");

// Process payment
Console.Write("Enter payment amount: $");
double payment = double.Parse(Console.ReadLine()!);  // BUG 4: no exception handling

if (payment > total)  // BUG 5: should be >= to accept exact amount
{
    double change = payment - total;
    Console.WriteLine($"Change: ${change:F2}");
}
else
{
    Console.WriteLine("Insufficient payment.");
}

static double GetDiscount(string code)
{
    return code.ToUpper() switch  // BUG 6: NullReferenceException if code is null
    {
        "SAVE10" => 0.10,
        "SAVE20" => 0.20,
        "HALF" => 0.50,
        _ => 0.0
    };
}
```

## Debugging Walkthrough

### Bug 1: IndexOutOfRangeException in the Display Loop

**Symptom:** The program crashes immediately when listing items.

**Debugging steps:**
1. Set a breakpoint on the `for` loop line
2. Step through with F10, watching `i` in the Variables panel
3. When `i` equals `items.Length` (5), the index is out of range

**Fix:** Change `<=` to `<`:

```csharp
for (int i = 0; i < items.Length; i++)
```

### Bug 2: Unhandled FormatException on Item Selection

**Symptom:** Entering "abc" or nothing crashes the program.

**Fix:** Add `TryParse` validation and bounds checking:

```csharp
foreach (string selection in selections)
{
    string trimmed = selection.Trim();
    if (!int.TryParse(trimmed, out int itemNumber) || itemNumber < 1 || itemNumber > items.Length)
    {
        Console.WriteLine($"  Skipping invalid selection: '{trimmed}'");
        continue;
    }
    int index = itemNumber - 1;
    Console.WriteLine($"  {items[index]} - ${prices[index]:F2}");
    subtotal += prices[index];
}
```

### Bug 3: Wrong Discount Calculation

**Symptom:** The discount is added to the subtotal instead of being a percentage.

**Debugging steps:**
1. Set a breakpoint on the `discountAmount` line
2. Add `discount` and `subtotal` to the Watch window
3. Notice `subtotal + discount` gives 10.25 instead of a percentage of subtotal

**Fix:** Use multiplication:

```csharp
double discountAmount = subtotal * discount;
```

### Bug 4: Unhandled FormatException on Payment

**Fix:** Use a `TryParse` validation loop:

```csharp
double payment = 0;
while (payment <= 0)
{
    Console.Write("Enter payment amount: $");
    if (!double.TryParse(Console.ReadLine(), out payment) || payment <= 0)
        payment = 0;
}
```

### Bug 5: Exact Payment Rejected

**Symptom:** Paying exactly the total shows "Insufficient payment."

**Fix:** Change `>` to `>=`:

```csharp
if (payment >= total)
```

### Bug 6: NullReferenceException in GetDiscount

**Symptom:** If `Console.ReadLine()` returns null, `code.ToUpper()` crashes.

**Fix:** Add a null check:

```csharp
static double GetDiscount(string? code)
{
    if (string.IsNullOrWhiteSpace(code))
        return 0.0;

    return code.ToUpper() switch
    {
        "SAVE10" => 0.10,
        "SAVE20" => 0.20,
        "HALF" => 0.50,
        _ => 0.0
    };
}
```

## The Fixed Program

After applying all fixes, test with:
- Valid inputs: `1,3,5` with code `SAVE10`
- Edge cases: empty input, letters, zero payment, exact payment
- Boundary: selecting item 5 (last item), unknown discount codes

## What You Practiced

- **Systematic debugging** — breakpoints, stepping, and inspecting variables
- **Bug classification** — off-by-one (logic), missing validation (runtime), wrong operator (logic)
- **Exception handling** — `TryParse` for input, null checks for strings
- **Defensive programming** — making the program robust against unexpected input

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
