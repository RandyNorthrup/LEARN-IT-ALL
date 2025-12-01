---
id: lesson-019-073
title: Step 103
chapterId: chapter-19
order: 73
duration: 5
objectives:
  - Step 103
---

# Step 103

Just like addition, there are different operators you can use for subtraction. The <dfn>subtraction assignment</dfn> operator `-=` subtracts the given value from the current variable value, then assigns the result back to the variable.

Replace your iteration statement with the correct statement using the subtraction assignment operator.

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
for (let i = count; i > 0; i = i - 1) {
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

1. Your `for` loop should not use `i = i - 1`.
2. Your `for` loop should use subtraction assignment to reduce `i` by `1`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4b641290da41b2cf0dd9*
