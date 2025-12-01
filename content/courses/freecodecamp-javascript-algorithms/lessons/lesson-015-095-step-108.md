---
id: lesson-015-095
title: Step 108
chapterId: chapter-15
order: 95
duration: 5
objectives:
  - Step 108
---

# Step 108

Now use the `+=` operator to add the string `" In your inventory you have: "` and the contents of `inventory` to the `text.innerText`. Make sure to include the space at the beginning and end of the `" In your inventory you have: "` string.

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

1. You should add another `text.innerText` line.
2. You should use compound assignment on `text.innerText`.
3. You should add the string `" In your inventory you have: "` to the second `text.innerText` line. Spacing matters.
4. You should use the concatenation operator to add the value of `inventory` to the end of your second `text.innerText` line.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8d6c7001ebc45350e3d16*
