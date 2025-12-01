---
id: lesson-019-065
title: Step 94
chapterId: chapter-19
order: 65
duration: 5
objectives:
  - Step 94
---

# Step 94

Your pyramid generator is still working. However, it could be possible to end up with an infinite loop again.

Because you are only checking if `done` is not equal to `count`, if `done` were to be **larger** than `count` your loop would go on forever.

Update your loop's condition to check if `done` is less than or equal to `count`.

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

1. Your `while` loop should check if `done` is less than or equal to `count`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f48e1d3682f39e81843c4*
