---
id: lesson-017-019
title: Step 20
chapterId: chapter-17
order: 19
duration: 5
objectives:
  - Step 20
---

# Step 20

Most spreadsheet programs include built-in functions for calculation.

Declare a `sum` function that takes a `nums` parameter, which will be an array of numbers. It should return the result of calling `reduce` on the array to sum all of the numbers.

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

1. You should declare a `sum` variable.
2. You should use `const` to declare your `sum` variable.
3. Your `sum` variable should be a function.
4. Your `sum` function should use arrow syntax.
5. Your `sum` function should have a `nums` parameter.
6. Your `sum` function should use an implicit return.
7. Your `sum` function should return the result of calling `.reduce()` on `nums`.
8. Your `sum` function should return the sum of all numbers in `nums`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 643498755d54c6279ba09078*
