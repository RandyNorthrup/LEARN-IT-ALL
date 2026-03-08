---
id: lesson-003-003
title: Create C# Methods with Parameters
chapterId: chapter-03
order: 3
duration: 5
objectives:
  - Use value parameters and reference parameters (ref, out)
  - Define optional parameters with default values
  - Use named arguments and the params keyword
  - Explain pass-by-value vs pass-by-reference semantics
---

# Create C# Methods with Parameters

Parameters are the mechanism that makes methods flexible. Instead of hardcoding values inside a method, you define parameters that accept data from the caller. C# offers several parameter-passing strategies, each suited to different situations.

## Value Parameters (The Default)

By default, C# passes arguments **by value**. The method receives a *copy* of the data, so changes inside the method do not affect the original variable:

```csharp
static void TryDouble(int number)
{
    number *= 2;
    Console.WriteLine($"Inside method: {number}");
}

int value = 10;
TryDouble(value);
Console.WriteLine($"Outside method: {value}");
```

Output:

```
Inside method: 20
Outside method: 10
```

The original `value` remains unchanged because only the copy was modified.

## Reference Parameters with `ref`

The `ref` keyword passes a reference to the original variable. Changes inside the method *do* affect the caller's variable:

```csharp
static void DoubleIt(ref int number)
{
    number *= 2;
}

int value = 10;
DoubleIt(ref value);
Console.WriteLine(value);  // Output: 20
```

Both the method definition and the call site must include `ref`. The variable must be initialized before being passed as `ref`.

## Output Parameters with `out`

The `out` keyword is similar to `ref`, but the method is *required* to assign a value before it returns. The caller's variable does not need to be initialized beforehand:

```csharp
static bool TryParseAge(string input, out int age)
{
    if (int.TryParse(input, out age) && age >= 0 && age <= 150)
    {
        return true;
    }
    age = 0;
    return false;
}

if (TryParseAge("25", out int userAge))
{
    Console.WriteLine($"Valid age: {userAge}");
}
else
{
    Console.WriteLine("Invalid age input.");
}
```

The `out` pattern is commonly used for "try" methods that may or may not succeed — `int.TryParse` itself uses this pattern.

## Optional Parameters with Default Values

You can give parameters default values. If the caller omits those arguments, the defaults are used:

```csharp
static void PrintReceipt(string item, decimal price, int quantity = 1, decimal taxRate = 0.08m)
{
    decimal subtotal = price * quantity;
    decimal tax = subtotal * taxRate;
    decimal total = subtotal + tax;
    Console.WriteLine($"{item} x{quantity}: ${total:F2} (incl. tax)");
}

PrintReceipt("Widget", 9.99m);              // Uses defaults: qty=1, tax=8%
PrintReceipt("Gadget", 24.99m, 3);           // qty=3, default tax
PrintReceipt("Gizmo", 14.99m, 2, 0.10m);    // qty=2, tax=10%
```

Optional parameters must appear *after* all required parameters in the parameter list.

## Named Arguments

Named arguments let you specify which parameter each value maps to, regardless of order. This is especially useful with optional parameters:

```csharp
PrintReceipt("Widget", 9.99m, taxRate: 0.06m);  // Skip quantity, set tax
PrintReceipt(price: 5.00m, item: "Bolt");        // Reversed order
```

Named arguments improve readability when a method has multiple parameters of the same type, where positional arguments could be confusing.

## Variable Arguments with `params`

The `params` keyword lets a method accept a variable number of arguments as an array:

```csharp
static double Average(params double[] numbers)
{
    if (numbers.Length == 0) return 0;
    double sum = 0;
    foreach (double n in numbers)
        sum += n;
    return sum / numbers.Length;
}

Console.WriteLine(Average(90, 85, 92));  // 89.0
Console.WriteLine(Average(100, 75));      // 87.5
```

The `params` parameter must be the last in the list, and only one is allowed per method.

## Pass-by-Value vs Pass-by-Reference Summary

| Mechanism | Keyword | Must Initialize? | Method Can Modify Caller's Variable? |
|-----------|---------|-------------------|--------------------------------------|
| By value  | *(none)* | Yes | No |
| By reference | `ref` | Yes | Yes |
| Output | `out` | No | Yes (must assign) |

For **value types** (int, double, bool, struct), pass-by-value copies the data. For **reference types** (string, arrays, objects), pass-by-value copies the *reference* — the method can modify contents but cannot reassign the caller's variable.

## Practical Example: Swap Method

A classic use of `ref` parameters is a swap method:

```csharp
static void Swap(ref int a, ref int b)
{
    int temp = a;
    a = b;
    b = temp;
}

int x = 5, y = 10;
Swap(ref x, ref y);
Console.WriteLine($"x={x}, y={y}");  // Output: x=10, y=5
```

Without `ref`, the swap would only affect local copies and the caller's variables would remain unchanged.

## Key Takeaways

- Default parameter passing is by value — the method works with a copy
- Use `ref` when the method needs to read and modify the caller's variable
- Use `out` when the method needs to return an additional value to the caller
- Optional parameters provide defaults so callers can omit arguments
- Named arguments improve clarity and allow skipping optional parameters
- `params` enables methods that accept a flexible number of arguments

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
