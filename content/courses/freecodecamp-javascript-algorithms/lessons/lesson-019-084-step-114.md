---
id: lesson-019-084
title: Step 114
chapterId: chapter-19
order: 84
duration: 5
objectives:
  - Step 114
---

# Step 114

Now move your `.unshift()` call into your `if` block.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];
let inverted = true;

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

// TODO: use a different type of loop
--fcc-editable-region--
for (let i = 1; i <= count; i++) {
  if (inverted) {

  }
  rows.unshift(padRow(i, count));
}
--fcc-editable-region--

/*while (rows.length < count) {
  rows.push(padRow(rows.length + 1, count));
}*/

/*for (let i = count; i > 0; i--) {
  rows.push(padRow(i, count));
}*/

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your `.unshift()` call should be in your `if` block.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f51f1df0a8757934a5796*
