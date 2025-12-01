---
id: lesson-017-015
title: Step 15
chapterId: chapter-17
order: 15
duration: 5
objectives:
  - Step 15
---

# Step 15

Remember that `range()` returns an array, so you can chain array methods directly to the function call.

Call `range()` with `1` and `99` as the arguments, and chain the `.forEach()` method. Pass the `.forEach()` method an empty callback which takes `number` as the parameter.

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

1. You should call your `range()` function.
2. You should pass `1` as the first argument to your `range()` call.
3. You should pass `99` as the second argument to your `range()` call.
4. You should chain the `.forEach()` method to your `range()` call.
5. You should pass a callback function to `.forEach()` using arrow syntax.
6. Your callback function should have `number` as the only parameter.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6434750c53db16218f41e6e1*
