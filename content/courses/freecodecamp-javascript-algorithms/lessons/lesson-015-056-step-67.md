---
id: lesson-015-056
title: Step 67
chapterId: chapter-15
order: 56
duration: 5
objectives:
  - Step 67
---

# Step 67

Following the same pattern as you did for the button text, update the three buttons' `onclick` assignments to be the first, second, and third values of the `"button functions"` array.

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

1. You should access the first element of the `"button functions"` property of the `location` parameter.
2. You should set the `button1.onclick` property to be the first element of the `"button functions"` property of the `location` parameter.
3. You should access the second element of the `"button functions"` property of the `location` parameter.
4. You should set the `button2.onclick` property to be the second element of the `"button functions"` property of the `location` parameter.
5. You should access the third element of the `"button functions"` property of the `location` parameter.
6. You should set the `button3.onclick` property to be the third element of the `"button functions"` property of the `location` parameter.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8c1154d3ae11aee80353f*
