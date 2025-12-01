---
id: lesson-015-138
title: Step 153
chapterId: chapter-15
order: 138
duration: 5
objectives:
  - Step 153
---

# Step 153

The player should hit if either `Math.random() > .2` **or** if the player's health is less than `20`.

At the end of your `return` statement, use the <dfn>logical OR</dfn> operator `||` and check if `health` is less than `20`.

The logical OR operator will use the first value if it is truthy – that is, anything apart from `NaN`, `null`, `undefined`, `0`, `-0`, `0n`, `""`, and `false`. Otherwise, it will use the second value.

For example: `num < 10 || num > 20`.

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

1. Your `isMonsterHit` function should use the logical OR operator.
2. Your logical OR operator should use `health < 20` as the fallback value.
3. Your function should return the result of the comparison `Math.random() > .2` **or** `health < 20`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62aa21971e3b743844849985*
