---
id: lesson-017-058
title: Step 59
chapterId: chapter-17
order: 58
duration: 5
objectives:
  - Step 59
---

# Step 59

Your `addCharacters(char1)` is also returning a function, which returns another function. You need to make another function call to access that innermost function reference for the `.map()` callback. JavaScript allows you to immediately invoke returned functions:

```js
myFunc(1)("hi");
```

Immediately invoke the function returned from your `addCharacters(char1)` call, and pass `char2` as the argument.

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

1. You should chain a function call to your `addCharacters(char1)` call.
2. You should pass `char2` as the argument to your chained function call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d38f906b94cb5fe6ce7de*
