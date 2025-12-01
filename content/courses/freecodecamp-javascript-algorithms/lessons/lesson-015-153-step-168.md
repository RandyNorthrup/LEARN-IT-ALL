---
id: lesson-015-153
title: Step 168
chapterId: chapter-15
order: 153
duration: 5
objectives:
  - Step 168
---

# Step 168

Now you can write the logic to run in the loop. Inside your `for` loop, use the `+=` operator to add to the end of `text.innerText`. Add the number at index `i` of the `numbers` array, using `numbers[i]`. Then add a new line, using the escape sequence you used earlier.

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

1. You should use compound assignment to add to the end of `text.innerText`.
2. You should use bracket notation to access `numbers[i]`.
3. You should add `numbers[i]` to your `text.innerText` value.
4. You should add a new-line character after the `numbers[i]` value. Remember that you can do this with `\n`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62aa28fb651bf14efa2dbb16*
