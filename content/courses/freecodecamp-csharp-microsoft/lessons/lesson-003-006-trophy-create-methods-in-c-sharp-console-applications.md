---
id: lesson-003-006
title: Trophy - Create Methods in C# Console Applications
chapterId: chapter-03
order: 6
duration: 5
objectives:
  - Review key method concepts from the chapter
  - Assess understanding of method syntax, parameters, and return values
  - Identify best practices for method design
---

# Trophy — Create Methods in C# Console Applications

Congratulations on completing the **Create Methods in C# Console Applications** chapter! This lesson reviews everything you've learned and provides a self-assessment to solidify your understanding.

## Chapter Summary

You covered five major topics in this chapter:

### 1. Writing Your First Method

You learned the anatomy of a C# method:

```csharp
static returnType MethodName(parameters)
{
    // body
}
```

Key points:
- Methods promote **code reuse**, **readability**, and **maintainability**
- `void` methods perform actions; returning methods produce values
- Method names use **PascalCase** by convention
- **Method overloading** lets you define multiple methods with the same name but different parameter lists

### 2. Methods with Parameters

You explored the ways data flows *into* methods:

| Mechanism | Keyword | Copies data? | Caller variable modified? |
|-----------|---------|-------------|---------------------------|
| Value parameter | *(none)* | Yes | No |
| Reference parameter | `ref` | No | Yes |
| Output parameter | `out` | No | Yes (must assign) |
| Optional parameter | `= default` | N/A | N/A |
| Variable arguments | `params` | Yes (array) | No |

You also learned about **named arguments** for improved readability.

### 3. Methods that Return Values

You mastered returning data *from* methods:

- `return` sends a value back and exits the method
- **Tuples** return multiple values: `(int x, int y)`
- **Expression-bodied methods** use `=>` for concise one-liners
- **Method chaining** composes small methods into readable pipelines

### 4. Guided Project — Petting Zoo Visit

You built a complete application that:
- Shuffled student lists with the Fisher-Yates algorithm
- Split arrays into groups
- Generated randomized visit schedules
- Printed formatted output

This demonstrated how **decomposition** turns a complex problem into manageable pieces.

### 5. Challenge Project — Mini-Game

You designed a number guessing tournament with:
- Input validation methods
- Game logic methods with return values
- Display methods for user interaction
- A main game loop that composed all the methods together

## Self-Assessment Checklist

Rate your confidence on each skill (1 = need more practice, 5 = fully confident):

- [ ] I can define methods with the correct syntax (access modifier, return type, name, parameters)
- [ ] I understand the difference between `void` and returning methods
- [ ] I can use `ref` and `out` parameters correctly
- [ ] I know when to use optional parameters vs. method overloading
- [ ] I can write expression-bodied methods with `=>`
- [ ] I can return tuples from methods and deconstruct them
- [ ] I can decompose a complex problem into small, well-named methods
- [ ] I understand pass-by-value vs. pass-by-reference for value types and reference types

## Best Practices for Method Design

1. **Single Responsibility** — each method should do one thing and do it well
2. **Descriptive Names** — `CalculateTax()` is better than `Calc()` or `DoStuff()`
3. **Small Parameter Lists** — if a method needs more than 3–4 parameters, consider grouping them into an object
4. **Consistent Return Types** — don't return `-1` for errors; use the Try-pattern with `out` or throw exceptions
5. **Avoid Side Effects** — returning methods should compute and return, not also print or modify global state
6. **Keep Methods Short** — aim for 10–20 lines; if a method grows beyond that, look for opportunities to extract sub-methods

## What's Next

With methods mastered, you're ready to tackle **debugging and exception handling** in the next chapter. You'll learn how to find and fix bugs systematically, use the VS Code debugger, and write robust error-handling code with `try-catch-finally`.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
