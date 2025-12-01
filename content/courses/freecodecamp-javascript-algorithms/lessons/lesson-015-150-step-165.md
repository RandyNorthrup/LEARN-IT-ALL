---
id: lesson-015-150
title: Step 165
chapterId: chapter-15
order: 150
duration: 5
objectives:
  - Step 165
---

# Step 165

After the `while` loop, set `text.innerText` to equal `"You picked <someGuess>. Here are the random numbers:"`. Replace `<someGuess>` with the `guess` function parameter.

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

1. You should set `text.innerText` to the string `"You picked "`. Remember that spacing matters.
2. You should use the concatenation operator to add the value of the `guess` parameter to your `"You picked "` string.
3. You should use the concatenation operator to add the string `". Here are the random numbers:"` to your `"You picked " + guess` string.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62aa27227399d647e1c37a3c*
