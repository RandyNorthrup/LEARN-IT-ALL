---
id: lesson-019-059
title: Step 88
chapterId: chapter-19
order: 59
duration: 5
objectives:
  - Step 88
---

# Step 88

The equality operator can lead to some strange behavior in JavaScript. For example, `"0" == 0` is true, even though one is a string and one is a number.

The <dfn>strict equality</dfn> operator `===` is used to check if two values are equal and share the same type. As a general rule, this is the equality operator you should always use. With the strict equality operator, `"0" === 0` becomes false, because while they might have the same value of zero, they are not of the same type.

Update your `done == count` condition to use the strict equality operator.

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

while (continueLoop) {
  done++;
--fcc-editable-region--
  if (done == count) {

  }
--fcc-editable-region--
}

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your `if` condition should use strict equality.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f46460f9c36330ebc07d8*
