---
id: lesson-017-104
title: Step 75
chapterId: chapter-17
order: 104
duration: 5
objectives:
  - Step 75
---

# Step 75

You should use `console.log()` to print the result of calling the `highPrecedence` function with the string `"5*3"`.

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

1. You should call `console.log()`.
2. assert.match(code, /console\.log\(/);
3. You should call your `highPrecedence` function.
4. assert.match(code, /console\.log\(highPrecedence\(/);
5. Pass `5*3` as the argument
6. assert.match(code, /console\.log\(highPrecedence\(["']5\*3["']\)\);?/);

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 661f48f412d7631a1d9c30e6*
