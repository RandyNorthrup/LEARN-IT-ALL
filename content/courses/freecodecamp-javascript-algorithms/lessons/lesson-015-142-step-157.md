---
id: lesson-015-142
title: Step 157
chapterId: chapter-15
order: 142
duration: 5
objectives:
  - Step 157
---

# Step 157

We don't want a player's only weapon to break. The logical AND operator checks if two statements are true.

Use the <dfn>logical AND</dfn> operator `&&` to add a second condition to your `if` statement. The player's weapon should only break if `inventory.length` does not equal (`!==`) one.

Here is an example of an `if` statement with two conditions:

```js
if (firstName === "Quincy" && lastName === "Larson") {

}
```

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

1. You should not modify the existing condition in your `if` statement.
2. You should use the logical AND operator `&&`.
3. You should use the logical AND operator to check if `inventory.length` does not equal `1`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62aa234322d4ad3e8bce42cc*
