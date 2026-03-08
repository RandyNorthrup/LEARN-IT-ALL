---
id: lesson-004-002
title: Create and Throw Exceptions in C# Console Applications
chapterId: chapter-04
order: 2
duration: 5
objectives:
  - Throw exceptions using the throw keyword
  - Use ArgumentException, ArgumentNullException, and InvalidOperationException
  - Create custom exception classes
  - Apply the fail-fast principle for early error detection
---

# Create and Throw Exceptions in C# Console Applications

So far you've learned to *catch* exceptions. Now you'll learn to *throw* them. Throwing exceptions is how your methods communicate that something has gone wrong — an invalid input, a violated precondition, or an impossible state. Well-placed exceptions make your code safer and bugs easier to find.

## The throw Keyword

Use `throw` to raise an exception explicitly:

```csharp
static double CalculateArea(double radius)
{
    if (radius < 0)
    {
        throw new ArgumentException("Radius cannot be negative.", nameof(radius));
    }
    return Math.PI * radius * radius;
}
```

When `throw` executes, the current method stops immediately and the runtime searches up the call stack for a matching `catch` block.

## Common Exception Types to Throw

### ArgumentException

Throw when an argument has an invalid value:

```csharp
static void SetVolume(int level)
{
    if (level < 0 || level > 100)
    {
        throw new ArgumentException(
            $"Volume must be between 0 and 100. Got: {level}",
            nameof(level));
    }
    // Set the volume...
}
```

Always include `nameof(parameter)` so the exception message identifies which parameter was invalid.

### ArgumentNullException

Throw when a required argument is `null`. The static `ThrowIfNull` method (.NET 6+) is the cleanest approach:

```csharp
static string FormatName(string firstName, string lastName)
{
    ArgumentNullException.ThrowIfNull(firstName);
    ArgumentNullException.ThrowIfNull(lastName);
    return $"{lastName}, {firstName}";
}
```

### InvalidOperationException

Throw when a method call is invalid given the object's current state:

```csharp
class BankAccount
{
    public decimal Balance { get; private set; }

    public void Withdraw(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Withdrawal amount must be positive.", nameof(amount));

        if (amount > Balance)
            throw new InvalidOperationException(
                $"Insufficient funds. Balance: {Balance:C}, Requested: {amount:C}");

        Balance -= amount;
    }
}
```

Notice the distinction: `ArgumentException` means the input is wrong regardless of state. `InvalidOperationException` means the input might be valid in other circumstances but not right now.

### ArgumentOutOfRangeException

A more specific `ArgumentException` for numeric ranges:

```csharp
static string GetMonth(int monthNumber)
{
    if (monthNumber < 1 || monthNumber > 12)
        throw new ArgumentOutOfRangeException(
            nameof(monthNumber), monthNumber, "Must be between 1 and 12.");

    string[] months = { "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
    return months[monthNumber - 1];
}
```

## Creating Custom Exceptions

When built-in exceptions don't fit, create your own:

```csharp
class InsufficientFundsException : Exception
{
    public decimal Balance { get; }
    public decimal AttemptedAmount { get; }

    public InsufficientFundsException(decimal balance, decimal attempted)
        : base($"Cannot withdraw {attempted:C}. Balance: {balance:C}")
    {
        Balance = balance;
        AttemptedAmount = attempted;
    }
}
```

Best practices: inherit from `Exception`, end the name with `Exception`, include context properties, and provide a meaningful message.

## When to Throw vs. Handle

- **Invalid method input** → Throw (the caller made a mistake)
- **User enters bad data** → Handle (prompt again with a helpful message)
- **File not found** → Depends (throw if required, handle if optional)
- **Impossible program state** → Throw (something is seriously wrong)

## The Fail-Fast Principle

Fail-fast means detecting errors as early as possible:

```csharp
static int[] CreateArray(int size)
{
    if (size < 0)
        throw new ArgumentOutOfRangeException(nameof(size), "Size cannot be negative.");
    if (size > 1_000_000)
        throw new ArgumentOutOfRangeException(nameof(size), "Size exceeds maximum.");
    return new int[size];
}
```

Without fail-fast, `new int[-1]` throws a cryptic `OverflowException`. With fail-fast, the caller gets a clear, specific error immediately. Bugs are caught closer to their source, and invalid data doesn't propagate through the system.

## Re-throwing Exceptions

Use `throw;` (without an argument) to re-throw while preserving the original stack trace:

```csharp
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    throw;  // Preserves original stack trace
}
```

Avoid `throw ex;` — this resets the stack trace, making it harder to find the original error source.

## Key Takeaways

- Use `throw` to signal errors to calling code with clear, specific exception types
- `ArgumentException` for bad input, `ArgumentNullException` for nulls, `InvalidOperationException` for invalid state
- Create custom exceptions when built-in types don't express the error clearly
- Fail fast by validating inputs at method boundaries
- Use `throw;` (not `throw ex;`) to preserve the original stack trace when re-throwing

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
