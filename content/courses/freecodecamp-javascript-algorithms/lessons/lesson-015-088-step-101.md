---
id: lesson-015-088
title: Step 101
chapterId: chapter-15
order: 88
duration: 5
objectives:
  - Step 101
---

# Step 101

Once a player has the most powerful weapon, you can give them the ability to sell their old weapons.

In the outer `else` statement, set `button2.innerText` to `"Sell weapon for 15 gold"`. Also set `button2.onclick` to the function name `sellWeapon`.

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

1. You should set the value of `button2.innerText`.
2. You should set the value of `button2.innerText` to `"Sell weapon for 15 gold"`.
3. You should set the value of `button2.onclick`.
4. You should set the value of `button2.onclick` to `sellWeapon`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8d24c97461b3ddb9397c8*
