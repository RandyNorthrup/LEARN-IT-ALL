---
id: lesson-015-107
title: Step 120
chapterId: chapter-15
order: 107
duration: 5
objectives:
  - Step 120
---

# Step 120

Now you can build the `attack` function. First, update the `text` message to say `"The <monster name> attacks."`, replacing `<monster name>` with the name of the monster. Remember you can use the concatenation operator for this.

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

1. You should use dot notation to access the `innerText` property of `text`.
2. You should assign the string `"The "` to `innerText` property of `text`.
3. You should use the concatenation operator to add the value of `monsters[fighting].name` to the string `"The "`.
4. You should use the concatenation operator to add the string `" attacks."` to the `monsters[fighting].name` string.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8e35675c18c56354c08cf*
