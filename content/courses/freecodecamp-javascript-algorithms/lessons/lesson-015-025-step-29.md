---
id: lesson-015-025
title: Step 29
chapterId: chapter-15
order: 25
duration: 5
objectives:
  - Step 29
---

# Step 29

Just like you did with the buttons, create variables for the following `id`s and use `querySelector()` to give them the element as a value:

`text`, `xpText`, `healthText`, `goldText`, `monsterStats`, and `monsterName`.

Remember to declare these with the `const` keyword, and name the variables to match the `id`s.

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

1. You should declare a `text` variable with `const`.
2. Your `text` variable should have the value of your `#text` element.
3. You should declare a `xpText` variable with `const`.
4. Your `xpText` variable should have the value of your `#xpText` element.
5. You should declare a `healthText` variable with `const`.
6. Your `healthText` variable should have the value of your `#healthText` element.
7. You should declare a `goldText` variable with `const`.
8. Your `goldText` variable should have the value of your `#goldText` element.
9. You should declare a `monsterStats` variable with `const`.
10. Your `monsterStats` variable should have the value of your `#monsterStats` element.
11. You should declare a `monsterName` variable with `const`.
12. Your `monsterName` variable should have the value of your `#monsterName` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a3bec30ea7f941412512dc*
