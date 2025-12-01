---
id: lesson-019-053
title: Step 79
chapterId: chapter-19
order: 53
duration: 5
objectives:
  - Step 79
---

# Step 79

You'll see the string printed in the console, because `true` is in fact true.

Change the condition of your `if` statement to the boolean `false`.

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

--fcc-editable-region--
if (true) {
  console.log("Condition is true");
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your `if` condition should have `false` as the condition.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4377a359972c521d3f4b*
