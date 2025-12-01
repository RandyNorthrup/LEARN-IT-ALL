---
id: lesson-017-098
title: Step 102
chapterId: chapter-17
order: 98
duration: 5
objectives:
  - Step 102
---

# Step 102

Create a `random` property. This property should use the first two numbers from an array to generate a random whole number. The range for this number starts at the first number (inclusive) of the two and ends just before the sum of these two numbers. Use the `Math.floor()` and `Math.random()` methods for the calculation.

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

1. Your `spreadsheetFunctions` object should have a `random` property.
2. Your `random` property should be a function.
3. Your `random` function should return a random number between the first two numbers in the array.
4. Your `random` function should return a whole number (integer).

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d4a5b32a1cad6165df286*
