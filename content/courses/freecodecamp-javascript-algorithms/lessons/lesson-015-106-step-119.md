---
id: lesson-015-106
title: Step 119
chapterId: chapter-15
order: 106
duration: 5
objectives:
  - Step 119
---

# Step 119

Now, you will need to update the text for the current monster's name and health.

Start by assigning `monsters[fighting].name` to the `innerText` property of `monsterName`. Then, assign `monsterHealth` to the `innerText` property of `monsterHealthText`.

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

1. You should use dot notation to access the `innerText` property of `monsterName`.
2. You should assign `monsters[fighting].name` to `monsterName.innerText`.
3. You should use dot notation to access the `innerText` property of `monsterHealthText`.
4. You should assign `monsterHealth` to `monsterHealthText.innerText`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8e271f8e3d1541f9624ad*
