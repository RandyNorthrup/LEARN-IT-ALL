---
id: lesson-015-039
title: Step 44
chapterId: chapter-15
order: 39
duration: 5
objectives:
  - Step 44
---

# Step 44

In your `goTown` function, change your `button` elements' `innerText` properties to be `"Go to store"`, `"Go to cave"`, and `"Fight dragon"`. Update your `onclick` properties to be `goStore`, `goCave`, and `fightDragon`, respectively.

Finally, update `innerText` property of your `text` to be `"You are in the town square. You see a sign that says Store."`.

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

1. You should set the `button1.innerText` property to be `"Go to store"` in your `goTown` function.
2. You should set the `button2.innerText` property to be `"Go to cave"` in your `goTown` function.
3. You should set the `button3.innerText` property to be `"Fight dragon"` in your `goTown` function.
4. You should set the `button1.onclick` property to be `goStore` in your `goTown` function.
5. You should set the `button2.onclick` property to be `goCave` in your `goTown` function.
6. You should set the `button3.onclick` property to be `fightDragon` in your `goTown` function.
7. You should set the `text.innerText` property to be `"You are in the town square. You see a sign that says Store."` in your `goTown` function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a7c071219da921758a35bb*
