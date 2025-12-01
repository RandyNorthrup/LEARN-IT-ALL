---
id: lesson-019-088
title: Step 118
chapterId: chapter-19
order: 88
duration: 5
objectives:
  - Step 118
---

# Step 118

Nice work! Experiment with different values for your `character`, `count`, and `inverted` variables.

When you are ready to move on to your next project, set `character` to `"!"`, `count` to `10`, and `inverted` to `false` to continue.

Congratulations on completing your first JavaScript project!

## Starter Code

```html
--fcc-editable-region--
const character = "#";
const count = 8;
const rows = [];
let inverted = true;
--fcc-editable-region--

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

for (let i = 1; i <= count; i++) {
  if (inverted) {
    rows.unshift(padRow(i, count));
  } else {
    rows.push(padRow(i, count));
  }
}

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should set `character` to `"!"`.
2. You should set `count` to `10`.
3. You should set `inverted` to `false`.

## Solution

```html
```js
const character = "!";
const count = 10;
const rows = [];
let inverted = false;

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

for (let i = 1; i <= count; i++) {
  if (inverted) {
    rows.unshift(padRow(i, count));
  } else {
    rows.push(padRow(i, count));
  }
}

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f540c2176ea5dec01306d*
