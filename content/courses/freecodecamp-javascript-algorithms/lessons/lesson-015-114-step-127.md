---
id: lesson-015-114
title: Step 127
chapterId: chapter-15
order: 114
duration: 5
objectives:
  - Step 127
---

# Step 127

You can make an `else` statement conditional by using `else if`. Here's an example:

```js
if (num > 10) {

} else if (num < 5) {

}
```

At the end of your `if` statement, add an `else if` statement to check if `monsterHealth` is less than or equal to `0`. In your `else if`, call the `defeatMonster` function.

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

1. You should have an `else if` statement.
2. Your `else if` statement should check if `monsterHealth` is less than or equal to `0`.
3. Your `else if` statement should call the `defeatMonster` function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8ee154c8946678775c4a4*
