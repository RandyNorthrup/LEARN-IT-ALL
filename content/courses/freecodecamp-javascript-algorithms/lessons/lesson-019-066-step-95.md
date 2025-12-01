---
id: lesson-019-066
title: Step 95
chapterId: chapter-19
order: 66
duration: 5
objectives:
  - Step 95
---

# Step 95

Using `done` to track the number of rows that have been generated is functional, but you can actually clean up the logic a bit further.

Arrays have a special `length` property that allows you to see how many values, or <dfn>elements</dfn>, are in the array. You would access this property using syntax like `myArray.length`.

Note that `rows.length` in the `padRow` call would give you an off-by-one error, because `done` is incremented *before* the call.

Update your condition to check if `rows.length` is less than `count`.

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

while (done <= count) {
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

1. Your `while` loop should check if `rows.length` is less than `count`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4934fb48f63abd5ae371*
