---
id: lesson-017-075
title: Step 78
chapterId: chapter-17
order: 75
duration: 5
objectives:
  - Step 78
---

# Step 78

Your `infixEval` function will only evaluate the first multiplication or division operation, because `regex` isn't global. This means you'll want to use a recursive approach to evaluate the entire string.

If `infixEval` does not find any matches, it will return the `str` value as-is. Using a ternary expression, check if `str2` is equal to `str`. If it is, return `str`, otherwise return the result of calling `highPrecedence()` on `str2`.

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

1. Your `highPrecedence` function should use the `return` keyword.
2. You should use the `return` keyword with a condition to check if `str` is equal to `str2`.
3. You should use ternary syntax with your `return` statement.
4. If the ternary condition is true, you should return `str`.
5. If the ternary condition is false, you should return the result of calling `highPrecedence()`.
6. You should pass `str2` to your `highPrecedence()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d40fe4b7b50c30c2b4cd8*
