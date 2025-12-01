---
id: lesson-015-140
title: Step 155
chapterId: chapter-15
order: 140
duration: 5
objectives:
  - Step 155
---

# Step 155

Use the `+=` operator to add `" Your <weapon> breaks."`, with a space in front of `Your`, to the end of `text.innerText`. Replace `<weapon>` with the last item in the `inventory` array using `inventory.pop()`, which will remove the last item in the array AND return it so it appears in your string.

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

1. You should use the compound assignment operator to modify `text.innerText`.
2. You should use the `pop` method on the `inventory` array.
3. You should add `" Your "`, with a space before and after it, to `text.innerText`.
4. You should add the return value of `inventory.pop()` to the `" Your "` string.
5. You should add `" breaks."`, with a space in front of it, to the end of your string.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62aa226207f33d3ad4c6f546*
