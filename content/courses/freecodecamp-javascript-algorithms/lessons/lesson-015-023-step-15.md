---
id: lesson-015-023
title: Step 15
chapterId: chapter-15
order: 23
duration: 5
objectives:
  - Step 15
---

# Step 15

JavaScript interacts with the HTML using the <dfn>Document Object Model</dfn>, or DOM. The DOM is a tree of objects that represents the HTML. You can access the HTML using the `document` object, which represents your entire HTML document.

One method for finding specific elements in your HTML is using the `querySelector()` method. The `querySelector()` method takes a CSS selector as an argument and returns the first element that matches that selector. For example, to find the `<h1>` element in your HTML, you would write:

```js
let h1 = document.querySelector("h1");
```

Note that `h1` is a string and matches the CSS selector you would use.

Create a `button1` variable and use `querySelector()` to assign it your element with the `id` of `button1`. Remember that CSS `id` selectors are prefixed with a `#`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./styles.css">
    <title>RPG - Dragon Repeller</title>
    <script src="./script.js"></script>
  </head>
  <body>
    <div id="game">
      <div id="stats">
        <span class="stat">XP: <strong><span id="xpText">0</span></strong></span>
        <span class="stat">Health: <strong><span id="healthText">100</span></strong></span>
        <span class="stat">Gold: <strong><span id="goldText">50</span></strong></span>
      </div>
      <div id="controls">
        <button id="button1">Go to store</button>
        <button id="button2">Go to cave</button>
        <button id="button3">Fight dragon</button>
      </div>
      <div id="monsterStats"></div>
      <div id="text"></div>
    </div>
  </body>
</html>
```

## Hints

1. You should use `let` to declare a `button1` variable.
2. You should use `document.querySelector()`.
3. You should use the `"#button1"` selector.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a3b79d520a7f3d0e25afd6*
