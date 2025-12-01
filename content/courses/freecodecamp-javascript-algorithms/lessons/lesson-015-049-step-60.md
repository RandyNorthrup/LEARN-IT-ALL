---
id: lesson-015-049
title: Step 60
chapterId: chapter-15
order: 49
duration: 5
objectives:
  - Step 60
---

# Step 60

Now you can consolidate some of your code. Start by copying the code from inside the `goTown` function and paste it into your `update` function. Then, remove all the code from inside the `goTown` and `goStore` functions.

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

1. Your `update` function should set `button1.innerText` to `"Go to store"`.
2. Your `update` function should set `button2.innerText` to `"Go to cave"`.
3. Your `update` function should set `button3.innerText` to `"Fight dragon"`.
4. Your `update` function should set `button1.onclick` to `goStore`.
5. Your `update` function should set `button2.onclick` to `goCave`.
6. Your `update` function should set `button3.onclick` to `fightDragon`.
7. Your `update` function should set `text.innerText` to `"You are in the town square. You see a sign that says \"Store\"."`.
8. Your `goTown` function should be empty.
9. Your `goStore` function should be empty.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8b0b5053f16111b0b6b5f*
