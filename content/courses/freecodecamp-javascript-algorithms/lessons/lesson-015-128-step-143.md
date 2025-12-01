---
id: lesson-015-128
title: Step 143
chapterId: chapter-15
order: 128
duration: 5
objectives:
  - Step 143
---

# Step 143

Add another object in the `locations` array. Everything should be the same as the `lose` object, except the `name` should be `"win"` and the `text` should be `"You defeat the dragon! YOU WIN THE GAME! &#x1F389;"`.

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

1. You should have seven values in the `locations` array.
2. Your seventh `locations` value should be an object.
3. Your seventh `locations` value should have a `name` property with the value `"win"`.
4. Your seventh `locations` value should have a `button text` array with three `"REPLAY?"` strings.
5. Your seventh `locations` value should have a `button functions` array with three `restart` variables.
6. Your seventh `locations` value should have a `text` property with the value `"You defeat the dragon! YOU WIN THE GAME! &#x1F389;"`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a94114ce0b8918b487390f*
