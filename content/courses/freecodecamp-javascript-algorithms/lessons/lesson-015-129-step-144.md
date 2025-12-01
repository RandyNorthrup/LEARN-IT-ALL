---
id: lesson-015-129
title: Step 144
chapterId: chapter-15
order: 129
duration: 5
objectives:
  - Step 144
---

# Step 144

While your game is feature-complete at this stage, there are things you can do to make it more fun and engaging. To get started, you'll give `monsters` a dynamic attack value.

Inside your `attack` function, change your `health -= monsters[fighting].level;` line to `health -= getMonsterAttackValue(monsters[fighting].level);`. This sets `health` equal to `health` minus the return value of the `getMonsterAttackValue` function, and passes the `level` of the monster as an argument.

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

1. You should update your `health` line to be `health -= getMonsterAttackValue(monsters[fighting].level);`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62aa1cea594f152ba626b872*
