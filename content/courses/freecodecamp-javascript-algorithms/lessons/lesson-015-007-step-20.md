---
id: lesson-015-007
title: Step 20
chapterId: chapter-15
order: 7
duration: 5
objectives:
  - Step 20
---

# Step 20

Give your `#text` element the following text:

```markup
Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. 
You are in the town square. Where do you want to go? Use the buttons above.
```

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
--fcc-editable-region--
      <div id="text">

      </div>
--fcc-editable-region--
    </div>
    <script src="./script.js"></script>
  </body>
</html>
```

## Hints

1. Your `#text` element should have the above quoted text.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a2401b9842721796b72850*
