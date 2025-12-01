---
id: lesson-015-156
title: Step 171
chapterId: chapter-15
order: 156
duration: 5
objectives:
  - Step 171
---

# Step 171

Now add an `else` statement. Inside, add `"Wrong! You lose 10 health!"` to the end of `text.innerText`. Subtract `10` from `health` and update `healthText.innerText`.

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

1. You should add an `else` block.
2. Your `else` block should use compound assignment to add `"Wrong! You lose 10 health!"` to the end of `text.innerText`.
3. Your `else` block should use compound assignment to subtract `10` from `health`.
4. Your `else` block should update the `healthText.innerText` to reflect the new value of `health`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62aa29d8f8f88152c91350ca*
