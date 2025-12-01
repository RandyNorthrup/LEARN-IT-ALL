---
id: lesson-015-172
title: Step 97
chapterId: chapter-15
order: 172
duration: 5
objectives:
  - Step 97
---

# Step 97

Now it is time to test your `buyWeapon` function. Right now, the `gold` amount is set to `50`. But to properly see the results of your `buyWeapon` function, the amount should be set to something higher. 

Update the `gold` amount to `250`. 

*NOTE*: The HTML has already been updated to reflect this change.

To test your `buyWeapon` function, open up the console. Then click on the `"Go to store"` button followed by the `"Buy weapon (30 gold)"` button four times.

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
        <span class="stat">Gold: <strong><span id="goldText">250</span></strong></span>
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

1. Your `gold` amount should be set to `250`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 662fbead61552e06d30fc048*
