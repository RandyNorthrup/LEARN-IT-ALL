---
id: lesson-019-057
title: Step 85
chapterId: chapter-19
order: 57
duration: 5
objectives:
  - Step 85
---

# Step 85

A <dfn>`while`</dfn> loop will run over and over again until the `condition` specified is no longer true. It has the following syntax:

```js
while (condition) {
  logic;
}
```

Use that syntax to declare a `while` loop with `continueLoop` as the condition. The body should be empty.

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
let continueLoop = false;
let done = 0;

--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should use a `while` loop.
2. Your `while` loop should use `continueLoop` as the condition.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f455b044d3230ed971e98*
