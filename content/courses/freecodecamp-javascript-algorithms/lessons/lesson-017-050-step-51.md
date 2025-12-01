---
id: lesson-017-050
title: Step 51
chapterId: chapter-17
order: 50
duration: 5
objectives:
  - Step 51
---

# Step 51

You can pass a function <dfn>reference</dfn> as a callback parameter. A function reference is a function name without the parentheses. For example:

```js
const myFunc = (val) => `value: ${val}`;
const array = [1, 2, 3];
const newArray = array.map(myFunc);
```

The `.map()` method here will call the `myFunc` function, passing the same arguments that a `.map()` callback takes. The first argument is the value of the array at the current iteration, so `newArray` would be `[value: 1, value: 2, value: 3]`.

Pass a reference to your `elemValue` function as the callback to your `.map()` method.

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

1. You should not call your `elemValue` function.
2. You should pass a reference to `elemValue` as the callback to your `.map()` method.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d1b96dd7ea4b0061458bc*
