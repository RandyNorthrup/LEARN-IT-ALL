---
id: lesson-019-067
title: Step 97
chapterId: chapter-19
order: 67
duration: 5
objectives:
  - Step 97
---

# Step 97

Now you no longer need your `done` variable. Remove the increment operation from your loop, and the variable declaration for `done`.

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
let done = 0;

while (rows.length < count) {
  done++;
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

1. You should not increment the `done` variable.
2. You should no longer have a `done` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4990b1caa03b9dc97a43*
