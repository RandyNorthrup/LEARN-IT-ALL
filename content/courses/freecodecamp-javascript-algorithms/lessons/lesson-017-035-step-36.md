---
id: lesson-017-035
title: Step 36
chapterId: chapter-17
order: 35
duration: 5
objectives:
  - Step 36
---

# Step 36

You need to be able to match cell ranges in a formula. Cell ranges can look like `A1:B12` or `A3:A25`. You can use a regular expression to match these patterns.

Start by declaring a `rangeRegex` variable and assign it a regular expression that matches `A` through `J` (the range of columns in your spreadsheet). Use a capture group with a character class to achieve this.

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

1. You should declare a `rangeRegex` variable after your `idToText` function.
2. You should use `const` to declare your `rangeRegex` variable.
3. Your `rangeRegex` variable should be a regular expression.
4. Your `rangeRegex` should use a capture group.
5. Your `rangeRegex` should use a character class in the capture group.
6. Your `rangeRegex` should use a character class to match `A` through `J`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6449849b78f43527be1e8a98*
