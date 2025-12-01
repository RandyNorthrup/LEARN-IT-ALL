---
id: lesson-019-064
title: Step 93
chapterId: chapter-19
order: 64
duration: 5
objectives:
  - Step 93
---

# Step 93

Your loop is no longer relying on the `continueLoop` variable. This makes the variable an <dfn>unused declaration</dfn>. Generally, you want to avoid unused declarations to prevent future confusion.

Remove your `continueLoop` variable.

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
let continueLoop = false;
let done = 0;

while (done !== count) {
  done++;
  rows.push(padRow(done, count));
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should no longer have a `continueLoop` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f48a419b40238e2b8b4d5*
