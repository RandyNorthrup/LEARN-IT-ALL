---
id: lesson-019-075
title: Step 105
chapterId: chapter-19
order: 75
duration: 5
objectives:
  - Step 105
---

# Step 105

Use a multi-line comment to comment out this loop as well, to prepare for the next approach.

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

/*while (rows.length < count) {
  rows.push(padRow(rows.length + 1, count));
}*/

--fcc-editable-region--
for (let i = count; i > 0; i--) {
  rows.push(padRow(i, count));
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your `for` loop should be commented out using multi-line comment.
2. Your `for` loop body should be commented out as part of multi-line comment.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4cde8dd305450514a1cb*
