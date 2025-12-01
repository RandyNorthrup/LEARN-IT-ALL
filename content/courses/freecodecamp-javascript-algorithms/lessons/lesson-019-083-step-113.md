---
id: lesson-019-083
title: Step 113
chapterId: chapter-19
order: 83
duration: 5
objectives:
  - Step 113
---

# Step 113

Use an `if` statement to check if `inverted` is true. Remember that you do not need to use an equality operator here.

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

1. You should use an `if` statement.
2. Your `if` statement should check if `inverted` is `true`.
3. Your `if` condition should not use any comparison operators.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f5179b3b0ca558f6b4d4f*
