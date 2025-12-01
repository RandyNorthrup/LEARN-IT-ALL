---
id: lesson-017-009
title: Step 9
chapterId: chapter-17
order: 9
duration: 5
objectives:
  - Step 9
---

# Step 9

Currently your `range` function returns an array with the correct length, but all of the values are the value of `start`. To fix this, chain the `.map()` method to your `.fill()` method.

Pass the `.map()` method a callback which takes `element` and `index` as parameters and returns the sum of those parameters.

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
2. You should chain the `.map()` method to your `.fill()` method.
3. You should pass a callback function to `.map()` using arrow syntax.
4. Your `.map()` callback should take `element` as the first parameter.
5. Your `.map()` callback should take `index` as the second parameter.
6. Your `.map()` callback should use an implicit return.
7. Your `.map()` callback should implicitly return the sum of `element` and `index`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 642e004130958c3975aa3a4a*
