---
id: lesson-017-089
title: Step 92
chapterId: chapter-17
order: 89
duration: 5
objectives:
  - Step 92
---

# Step 92

Like you did with your `highPrecedence()` function, your `evalFormula()` function needs to ensure it has evaluated and replaced everything.

Use a ternary to check if `functionExpanded` is equal to the original string `x`. If it is, return `functionExpanded`, otherwise return the result of calling `evalFormula()` again with `functionExpanded` and `cells` as arguments.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="./styles.css" />
    <title>Functional Programming Spreadsheet</title>
  </head>
  <body>
    <div id="container">
      <div></div>
    </div>
    <script src="./script.js"></script>
  </body>
</html>
```

## Hints

1. Your `evalFormula` function should use the `return` keyword.
2. Your `return` statement should check if `functionExpanded` is equal to `x`.
3. Your `return` statement should use a ternary operator.
4. If the ternary condition is true, your `evalFormula()` should return `functionExpanded`.
5. If the ternary condition is false, your `evalFormula()` should return the result of calling `evalFormula()`.
6. You should pass `functionExpanded` as the first argument to your `evalFormula()` call.
7. You should pass `cells` as the second argument to your `evalFormula()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d4717a689e1cfa232e357*
