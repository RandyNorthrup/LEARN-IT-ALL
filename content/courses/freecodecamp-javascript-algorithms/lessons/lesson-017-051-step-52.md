---
id: lesson-017-051
title: Step 52
chapterId: chapter-17
order: 51
duration: 5
objectives:
  - Step 52
---

# Step 52

Because `elemValue` returns a function, your `addCharacters` function ultimately returns an array of function references. You want the `.map()` method to run the inner function of your `elemValue` function, which means you need to call `elemValue` instead of reference it. Pass `num` as the argument to your `elemValue` function.

<!-- TODO: Explain further? -->

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

1. You should call `elemValue()` in your `.map()` method.
2. You should pass `num` to your `elemValue()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d1cadf0d96ab0b7e12da4*
