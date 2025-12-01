---
id: lesson-017-031
title: Step 32
chapterId: chapter-17
order: 31
duration: 5
objectives:
  - Step 32
---

# Step 32

Spreadsheet software typically uses `=` at the beginning of a cell to indicate a calculation should be used, and spreadsheet functions should be evaluated.

Use the `&&` operator to add a second condition to your `if` statement that also checks if the first character of `value` is `"="`.

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

1. You should use the `&&` operator to add a second condition to your `if` statement that also checks if the first character of `value` is `"="`. You may use `[0]`, `.startsWith()`, or `.charAt(0)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 64497e0e5e5a2c2329785af4*
