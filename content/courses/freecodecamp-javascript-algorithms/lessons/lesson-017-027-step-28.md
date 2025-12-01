---
id: lesson-017-027
title: Step 28
chapterId: chapter-17
order: 27
duration: 5
objectives:
  - Step 28
---

# Step 28

In your `window.onload` function, you need to tell your `input` elements to call the `update` function when the value changes. You can do this by directly setting the `onchange` property.

Set the `onchange` property to be a reference to your `update` function.

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

1. Your `window.onload` function should access the `onchange` property of the `input` element.
2. Your `window.onload` function should set the `onchange` property to `update`.
3. Your `window.onload` function should not call your `update` function.
4. Your `input` elements should all have your `update` function as the `onchange` property.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6449749d20436c1f1dfadcf2*
