---
id: lesson-017-033
title: Step 34
chapterId: chapter-17
order: 33
duration: 5
objectives:
  - Step 34
---

# Step 34

In your `evalFormula`, declare an `idToText` arrow function which takes an `id` parameter.

Your `idToText` function should return the result of calling `.find()` on the `cells` array with a callback function that takes an `cell` parameter and returns `cell.id === id`.

Both of your functions should use implicit returns.

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

1. You should declare an `idToText` variable in your `evalFormula` function.
2. You should use `const` to declare your `idToText` variable.
3. Your `idToText` variable should be an arrow function.
4. Your `idToText` function should have an `id` parameter.
5. Your `idToText` function should return the result of calling the `.find()` method on your `cells` array. Your callback function should use an implicit return.
6. Your `idToText` function should use an implicit return.
7. You should pass a callback function to your `.find()` method. Use arrow syntax.
8. Your callback function should have a `cell` parameter.
9. Your callback function should return whether `cell.id` is strictly equal to `id`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6449842c6f6c84261075e4c9*
