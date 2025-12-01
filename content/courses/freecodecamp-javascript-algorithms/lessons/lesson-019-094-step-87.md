---
id: lesson-019-094
title: Step 87
chapterId: chapter-19
order: 94
duration: 5
objectives:
  - Step 87
---

# Step 87

The <dfn>equality</dfn> operator `==` is used to check if two values are equal. To compare two values, you'd use a statement like `value == 8`.

Below `done++` inside your loop, add an `if` statement. The statement should check if `done` is equal to `count` using the equality operator.

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
while (continueLoop) {
  done++;

}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should use an `if` statement in your loop. It should be added after `done++`.
2. Your `if` statement should use the equality operator to compare `done` and `count` in the condition.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610bf6fa14d700beed1b109*
