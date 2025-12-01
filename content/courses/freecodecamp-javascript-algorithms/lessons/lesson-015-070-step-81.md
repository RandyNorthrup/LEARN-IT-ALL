---
id: lesson-015-070
title: Step 81
chapterId: chapter-15
order: 70
duration: 5
objectives:
  - Step 81
---

# Step 81

Just like your `locations` array, your `weapons` array will hold objects. Add four objects to the `weapons` array, each with two properties: `name` and `power`. The first should have the `name` set to `"stick"` and the `power` set to `5`. The second should be `"dagger"` and `30`. The third, `"claw hammer"` and `50`. The fourth, `"sword"` and `100`.

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

1. Your `weapons` array should have four values.
2. Your `weapons` array should have four objects.
3. Your first `weapons` object should have the `name` set to `"stick"` and the `power` set to `5`.
4. Your second `weapons` object should have the `name` set to `"dagger"` and the `power` set to `30`.
5. Your third `weapons` object should have the `name` set to `"claw hammer"` and the `power` set to `50`.
6. Your fourth `weapons` object should have the `name` set to `"sword"` and the `power` set to `100`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8c7322e42962ad53ad204*
