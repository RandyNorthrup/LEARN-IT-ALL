---
id: lesson-017-094
title: Step 97
chapterId: chapter-17
order: 94
duration: 5
objectives:
  - Step 97
---

# Step 97

Your spreadsheet is now functional. However, you don't have support for very many formulas.

Add an `even` property to your `spreadsheetFunctions`. It should take a `nums` parameter, and return the result of filtering the `nums` array to only include even numbers. Use a reference to your `isEven` function to help.

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

1. Your `spreadsheetFunctions` object should have an `even` property.
2. Your `even` property should be a function.
3. Your `even` function should take a `nums` parameter.
4. Your `even` function should use an implicit return.
5. Your `even` function should return the result of calling the `.filter()` method on `nums`.
6. You should pass a reference to your `isEven()` function as the callback for the `.filter()` method.
7. Your `even` function should return an array of even numbers.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d48b936802fd34c3f05af*
