---
id: lesson-017-040
title: Step 41
chapterId: chapter-17
order: 40
duration: 5
objectives:
  - Step 41
---

# Step 41

Declare a `rangeFromString` arrow function that takes two parameters, `num1` and `num2`. The function should implicitly return the result of calling `range` with `num1` and `num2` as arguments.

To be safe, parse `num1` and `num2` into integers as you pass them into `range`.

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

1. You should declare a `rangeFromString` variable after your `rangeRegex`.
2. You should use `const` to declare your `rangeFromString` variable.
3. Your `rangeFromString` variable should be an arrow function.
4. Your `rangeFromString` function should have `num1` as the first parameter.
5. Your `rangeFromString` function should have `num2` as the second parameter.
6. Your `rangeFromString` function should use an implicit return.
7. Your `rangeFromString` function should return the result of calling your `range` function.
8. You should call `parseInt` with `num1` as an argument and pass the result to the `range` call.
9. You should call `parseInt` with `num2` as the argument and pass the result to the `range` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6449876e7aae0d2f8257a497*
