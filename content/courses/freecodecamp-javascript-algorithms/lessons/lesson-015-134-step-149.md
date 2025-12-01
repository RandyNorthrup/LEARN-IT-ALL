---
id: lesson-015-134
title: Step 149
chapterId: chapter-15
order: 134
duration: 5
objectives:
  - Step 149
---

# Step 149

If you play the game in its current state you might notice a bug. If your `xp` is high enough, the `getMonsterAttackValue` function will return a negative number, which will actually add to your total health when fighting a monster! You can fix this issue by using a <dfn>ternary operator</dfn> to ensure negative values are not returned.

The ternary operator is a conditional operator and can be used as a one-line `if-else` statement. The syntax is: `condition ? expressionIfTrue : expressionIfFalse`.

Here is an example of returning a value using an `if-else` statement and a refactored example using a ternary operator:

```js
// if-else statement
if (score > 0) {
  return score
} else {
  return default_score
}

// ternary operator
return score > 0 ? score : default_score
```

In `getMonsterAttackValue`, change `return hit` to a ternary operator that returns `hit` if `hit` is greater than `0`, or returns `0` if it is not.

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

1. You should use a ternary to change the `return` value if `hit` is greater than `0`.
2. You should use a ternary to return `hit` if `hit` is greater than `0`
3. You should use a ternary to return `0` if `hit` is not greater than `0`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62aa1eec891ed731db227a36*
