---
id: lesson-015-159
title: Step 16
chapterId: chapter-15
order: 159
duration: 5
objectives:
  - Step 16
---

# Step 16

We have run into a slight problem. You are trying to query your page for a button element, but your `script` tag is in the `head` of your HTML. This means your code runs before the browser has finished reading the HTML, and your `document.querySelector()` will not see the button - because the browser hasn't processed it yet.

To fix this, move your `script` element out of the `head` element, and place it at the end of your `body` element (just before the closing `</body>` tag).

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
--fcc-editable-region--
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
--fcc-editable-region--
</html>
```

## Hints

1. Your `script` element should not be in your `head` element.
2. Your `script` element should come at the end of your `body` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62b46e3a8d4be31be5af793d*
