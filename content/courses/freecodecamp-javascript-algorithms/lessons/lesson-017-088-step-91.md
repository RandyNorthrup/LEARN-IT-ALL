---
id: lesson-017-088
title: Step 91
chapterId: chapter-17
order: 88
duration: 5
objectives:
  - Step 91
---

# Step 91

Now you can start applying your function parser to your `evalFormula` logic. Declare a `functionExpanded` variable, and assign it the result of calling `applyFunction` with your `cellExpanded` string.

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

1. You should declare a `functionExpanded` variable.
2. You should use `const` to declare your `functionExpanded` variable.
3. You should assign the `functionExpanded` variable the result of calling your `applyFunction` function.
4. You should pass `cellExpanded` to your `applyFunction` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d46c03e7d02cecb30f021*
