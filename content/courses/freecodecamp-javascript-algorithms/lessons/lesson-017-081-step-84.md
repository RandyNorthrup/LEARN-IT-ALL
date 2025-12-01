---
id: lesson-017-081
title: Step 84
chapterId: chapter-17
order: 81
duration: 5
objectives:
  - Step 84
---

# Step 84

Declare a `toNumberList` function that takes an `args` parameter and implicitly returns the result of splitting the `args` by commas. Then chain a `map` method to your `split` method and pass in `parseFloat` as the argument to the `map` method.

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

1. You should declare a `toNumberList` variable.
2. You should use `const` to declare your `toNumberList` variable.
3. Your `toNumberList` variable should be an arrow function.
4. Your `toNumberList` function should have an `args` parameter.
5. Your `toNumberList` function should use an implicit return.
6. Your `toNumberList` function should return the result of calling the `.split()` method of `args`.
7. You should split `args` on the `","` character.
8. You should chain the `.map()` method to the `.split()` method.
9. You should pass a reference to `parseFloat` as the callback to `.map()`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d44da986f2bc9b72f5fe2*
