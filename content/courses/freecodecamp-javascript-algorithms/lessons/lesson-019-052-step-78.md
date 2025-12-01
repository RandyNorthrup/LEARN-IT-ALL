---
id: lesson-019-052
title: Step 78
chapterId: chapter-19
order: 52
duration: 5
objectives:
  - Step 78
---

# Step 78

Your pyramid has disappeared again. That's okay - that is to be expected.

Before you create your new loop, you need to learn about `if` statements. An <dfn>`if` statement</dfn> allows you to run a block of code only when a condition is met. They use the following syntax:

```js
if (condition) {
  logic
}
```

Create an `if` statement with the boolean `true` as the condition. In the body, print the string `"Condition is true"`.

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

--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should create an `if` statement.
2. Your `if` statement should have `true` as the condition.
3. Your `if` body should log `"Condition is true"`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f415b76859a2736771607*
