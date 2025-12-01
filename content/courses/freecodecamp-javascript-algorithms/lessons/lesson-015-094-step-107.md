---
id: lesson-015-094
title: Step 107
chapterId: chapter-15
order: 94
duration: 5
objectives:
  - Step 107
---

# Step 107

After your `currentWeapon`, use the concatenation operator to set `text.innerText` to the string `"You sold a "`, then `currentWeapon`, then the string `"."`.

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

1. You should use the assignment operator with `text.innerText`.
2. You should add `"You sold a "` to `text.innerText`. Spacing is important.
3. You should add the value of `currentWeapon` to the `"You sold a "` string. Use the concatenation operator to do this on the same line.
4. You should add the string `"."` to the value of `currentWeapon`. Use the concatenation operator to do this on the same line.
5. Your `text.innerText` should update to the proper string.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8d61ddfe35744369365b7*
