---
id: lesson-015-011
title: Step 24
chapterId: chapter-15
order: 11
duration: 5
objectives:
  - Step 24
---

# Step 24

Using a selector list (`selector1, selector2`) give both your `#controls` and `#stats` elements a `border` of `1px solid #0a0a23`, a `#0a0a23` text color, and `5px` of `padding`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./styles.css">
    <title>RPG - Dragon Repeller</title>
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
      <div id="monsterStats">
        <span class="stat">Monster Name: <strong><span id="monsterName"></span></strong></span>
        <span class="stat">Health: <strong><span id="monsterHealth"></span></strong></span>
      </div>
      <div id="text">
        Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above.
      </div>
    </div>
    <script src="./script.js"></script>
  </body>
</html>
```

## Hints

1. You should have a `#controls, #stats` selector list.
2. Your `#controls, #stats` selector should have a `border` of `1px solid #0a0a23`.
3. Your `#controls, #stats` selector should have a `color` of `#0a0a23`.
4. Your `#controls, #stats` selector should have `5px` of padding.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a24128d5e8af1b47ad1aab*
