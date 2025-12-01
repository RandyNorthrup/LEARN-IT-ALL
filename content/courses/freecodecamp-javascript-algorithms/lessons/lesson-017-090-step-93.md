---
id: lesson-017-090
title: Step 93
chapterId: chapter-17
order: 90
duration: 5
objectives:
  - Step 93
---

# Step 93

Now your `update()` function can actually evaluate formulas. Remember that you wrote the `if` condition to check that a function was called.

Inside your `if` statement, set the `value` of the `element` to be the result of your `evalFormula()` function. Do not pass any arguments yet.

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

1. You should update the `value` property of `element` in your `if` block.
2. You should assign the `value` property the result of calling your `evalFormula()` function.
3. You should not pass any arguments to your `evalFormula()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d4769ba65f1d05ef6b634*
