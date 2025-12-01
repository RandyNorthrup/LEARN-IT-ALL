---
id: lesson-015-161
title: Step 25
chapterId: chapter-15
order: 161
duration: 5
objectives:
  - Step 25
---

# Step 25

Give your `#monsterStats` element the same `border` and `padding` as your `#stats` element. Set its color to `#ffffff` and give it a `#c70d0d` background.

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

1. You should have a `#monsterStats` selector.
2. Your `#monsterStats` selector should have a `border` of `1px solid #0a0a23`.
3. Your `#monsterStats` selector should have `5px` of padding.
4. Your `#monsterStats` selector should have a `color` of `#ffffff`.
5. Your `#monsterStats` selector should have a `background-color` of `#c70d0d`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62fc1ee0c5a89717d4785729*
