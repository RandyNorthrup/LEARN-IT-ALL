---
id: lesson-017-091
title: Step 94
chapterId: chapter-17
order: 91
duration: 5
objectives:
  - Step 94
---

# Step 94

The first argument for your `evalFormula` call needs to be the contents of the cell (which you stored in `value`). However, the contents start with an `=` character to trigger the function, so you need to pass the substring of `value` starting at index `1`.

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

1. You should pass `value` as the first argument to your `evalFormula()` call.
2. You should call the `.slice()` method on the `value` argument.
3. You should pass the number `1` as the argument to your `.slice()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d47c8f58107d10f1e5106*
