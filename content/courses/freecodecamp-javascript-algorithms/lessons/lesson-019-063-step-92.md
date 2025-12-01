---
id: lesson-019-063
title: Step 92
chapterId: chapter-19
order: 63
duration: 5
objectives:
  - Step 92
---

# Step 92

Since you have moved the comparison into the `while` condition, you can remove your entire `if` statement.

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

let continueLoop = false;
let done = 0;

--fcc-editable-region--
while (done !== count) {
  done++;
  rows.push(padRow(done, count));
  if (done === count) {
    continueLoop = false;
  } 
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should no longer have an `if` statement.
2. You should no longer set `continueLoop` to `false`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f487dc0c8fa38084f9754*
