---
id: lesson-015-097
title: Step 110
chapterId: chapter-15
order: 97
duration: 5
objectives:
  - Step 110
---

# Step 110

Now you can start the code to fight monsters. To keep your code organized, your `fightDragon` function has been moved for you to be near the other `fight` functions.

Below your `weapons` array, define a `monsters` variable and assign it an array. Set that array to have three objects, each with a `name`, `level`, and `health` properties. The first object's values should be `"slime"`, `2`, and `15`, in order. The second should be `"fanged beast"`, `8`, and `60`. The third should be `"dragon"`, `20`, and `300`.

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

1. You should use `const` to declare a `monsters` variable.
2. Your `monsters` variable should be an array.
3. Your `monsters` variable should have 3 values.
4. Your `monsters` array should have 3 objects.
5. The first value in your `monsters` array should be an object with a `name` property set to `"slime"`.
6. The first value in your `monsters` array should be an object with a `level` property set to `2`.
7. The first value in your `monsters` array should be an object with a `health` property set to `15`.
8. The second value in your `monsters` array should be an object with a `name` property set to `"fanged beast"`.
9. The second value in your `monsters` array should be an object with a `level` property set to `8`.
10. The second value in your `monsters` array should be an object with a `health` property set to `60`.
11. The third value in your `monsters` array should be an object with a `name` property set to `"dragon"`.
12. The third value in your `monsters` array should be an object with a `level` property set to `20`.
13. The third value in your `monsters` array should be an object with a `health` property set to `300`.
14. You should not add any extra properties to your objects.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8d81f539f004776dd9b1e*
