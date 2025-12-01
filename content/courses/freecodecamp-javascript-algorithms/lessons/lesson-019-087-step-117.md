---
id: lesson-019-087
title: Step 117
chapterId: chapter-19
order: 87
duration: 5
objectives:
  - Step 117
---

# Step 117

Your pyramid generator is now in a finished state, with more functionality than you originally planned! The next step is to clean up your code.

Remove all comments, both single- and multi-line, from your code.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];
let inverted = true;

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

--fcc-editable-region--
// TODO: use a different type of loop
for (let i = 1; i <= count; i++) {
  if (inverted) {
    rows.unshift(padRow(i, count));
  } else {
    rows.push(padRow(i, count));
  }
}

/*while (rows.length < count) {
  rows.push(padRow(rows.length + 1, count));
}*/

/*for (let i = count; i > 0; i--) {
  rows.push(padRow(i, count));
}*/
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should not have any single-line comments in your code.
2. You should not have any multi-line comments in your code.
3. You should not have any comments in your code.
4. You should remove code that was commented out by multi-line comments.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f53ad3d39175c5d4335ac*
