---
id: lesson-017-105
title: Step 76
chapterId: chapter-17
order: 105
duration: 5
objectives:
  - Step 76
---

# Step 76

Remove both the `console.log()` with your `highPrecedence` call, and the `return` statement from your `highPrecedence` function.

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

1. Your code should not log the result of `highPrecedence("5*3")`.
2. assert.notMatch(code, /console\.log\(highPrecedence\("5\*3"\)\)/);
3. Your `highPrecedence` function should not return a value.
4. assert.isUndefined(highPrecedence("5*3"));

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 661f49650572031c6ebdb8e3*
