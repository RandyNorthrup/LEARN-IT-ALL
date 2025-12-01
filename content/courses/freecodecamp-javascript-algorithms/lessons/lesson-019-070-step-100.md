---
id: lesson-019-070
title: Step 100
chapterId: chapter-19
order: 70
duration: 5
objectives:
  - Step 100
---

# Step 100

Because you are going to loop in the opposite direction, your loop needs to run while `i` is greater than `0`. You can use the <dfn>greater than</dfn> operator `>` for this.

Set your loop's condition to run when `i` is greater than `0`.

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
for (let i = count; false; false) {

}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your `for` loop should run when `i` is greater than `0`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4a83373de83ea101685f*
