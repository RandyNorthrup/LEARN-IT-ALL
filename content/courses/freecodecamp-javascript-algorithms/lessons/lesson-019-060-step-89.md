---
id: lesson-019-060
title: Step 89
chapterId: chapter-19
order: 60
duration: 5
objectives:
  - Step 89
---

# Step 89

When `done` has reached the value of `count`, we want the loop to stop executing.

Inside your `if` body, assign the boolean `false` to your `continueLoop` variable.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

// TODO: use a different type of loop
/*for (let i = 1; i <= count; i++) {
  rows.push(padRow(i, count));
}*/

let continueLoop = false;
let done = 0;

while (continueLoop) {
  done++;
--fcc-editable-region--
  if (done === count) {

  }
--fcc-editable-region--
}

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your `if` body should assign `false` to your `continueLoop` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f46b9c417a8341729a3ab*
