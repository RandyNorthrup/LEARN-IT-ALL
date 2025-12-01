---
id: lesson-019-074
title: Step 104
chapterId: chapter-19
order: 74
duration: 5
objectives:
  - Step 104
---

# Step 104

Because you are only subtracting one from `i`, you can use the <dfn>decrement operator</dfn> `--`.

Replace your subtraction assignment with the decrement operator.

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
for (let i = count; i > 0; i -= 1) {
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

1. Your `for` loop should not use subtraction assignment.
2. Your `for` loop should use the decrement operator.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4c3b01c44743719c99e4*
