---
id: lesson-017-012
title: Step 12
chapterId: chapter-17
order: 12
duration: 5
objectives:
  - Step 12
---

# Step 12

`range()` will return an array of numbers, which you need to convert back into characters. Chain the `.map()` method to your `range()` call.

Pass a callback function that takes `code` as the parameter and implicitly returns the value of passing `code` to the `String.fromCharCode()` method.

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

1. You should use the `.map()` method.
2. You should chain the `.map()` method to your `range` call.
3. You should use arrow syntax for the `.map()` callback.
4. Your `.map()` callback should take a `code` parameter.
5. Your `.map()` callback should use an implicit return.
6. Your `.map()` callback should return the result of calling `String.fromCharCode()`.
7. You should pass the variable `code` to `String.fromCharCode()`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 64345b810a6e481e5e326849*
