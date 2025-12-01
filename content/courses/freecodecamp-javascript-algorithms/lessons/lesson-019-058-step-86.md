---
id: lesson-019-058
title: Step 86
chapterId: chapter-19
order: 58
duration: 5
objectives:
  - Step 86
---

# Step 86

Right now, if you change `continueLoop` to true, your `while` loop will run forever. This is called an <dfn>infinite loop</dfn>, and you should be careful to avoid these. An infinite loop can lock up your system, requiring a full restart to escape.

To avoid this, start by using the increment operator to increase the value of the `done` variable inside your loop.

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

--fcc-editable-region--
while (continueLoop) {

}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your `while` loop should increment the `done` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f45ccf4ca5c31f253005a*
