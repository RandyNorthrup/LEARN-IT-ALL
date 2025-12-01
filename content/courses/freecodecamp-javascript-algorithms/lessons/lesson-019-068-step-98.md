---
id: lesson-019-068
title: Step 98
chapterId: chapter-19
order: 68
duration: 5
objectives:
  - Step 98
---

# Step 98

That's a very clean and functional loop. Nice work! But there's still more to explore.

Use a multi-line comment to comment out your `while` loop.

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
while (rows.length < count) {
  rows.push(padRow(rows.length + 1, count));
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your `while` loop should be commented out.
2. Your `while` loop body should be commented out.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f49e32001983c90b75850*
