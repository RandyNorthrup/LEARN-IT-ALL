---
id: lesson-015-152
title: Step 167
chapterId: chapter-15
order: 152
duration: 5
objectives:
  - Step 167
---

# Step 167

In the previous project, you learned how to work with `for` loops like this:

```js
for (let i = 0; i < 5; i++) {
  // code to run
}
```

`for` loops are declared with three expressions separated by semicolons: `for (a; b; c)`, where `a` is the initialization expression, `b` is the condition, and `c` is the final expression.

In this step, create a `for` loop where `i` is initialized to `0`, the loop runs as long as `i` is less than `10`, and `i` is incremented by `1` after each iteration using the increment operator `++`.

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

1. Your `for` loop initialization should have `i` initialized to `0`.
2. Your loop condition should run as long as `i` is less than `10`.
3. Your loop should increment `i` by `1` after each iteration. Remember to use the increment operator `++`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62aa27c40ca6f04ab8be5fac*
