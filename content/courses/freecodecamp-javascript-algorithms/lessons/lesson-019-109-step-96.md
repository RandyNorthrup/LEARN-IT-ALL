---
id: lesson-019-109
title: Step 96
chapterId: chapter-19
order: 109
duration: 5
objectives:
  - Step 96
---

# Step 96

Replace the `done` reference in your `padRow` call with `rows.length + 1`.

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

1. You should pass `rows.length + 1` as the first argument to your `padRow` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 661483051820c3c1ab4595e0*
