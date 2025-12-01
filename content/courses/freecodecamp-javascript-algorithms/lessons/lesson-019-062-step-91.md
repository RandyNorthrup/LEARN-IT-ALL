---
id: lesson-019-062
title: Step 91
chapterId: chapter-19
order: 62
duration: 5
objectives:
  - Step 91
---

# Step 91

The <dfn>strict inequality</dfn> operator `!==` allows you to check if two values are not equal, or do not have the same type. The syntax is similar to the equality operator: `value !== 4`.

Currently the `while` loop runs only if `continueLoop` is true. Update the `while` loop condition to check if `done` is not equal to `count`.

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
  done++;
  rows.push(padRow(done, count));
  if (done === count) {
    continueLoop = false;
  } 
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your `while` loop should check if `done` and `count` are not equal.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f47afe4c98536715d5fa4*
