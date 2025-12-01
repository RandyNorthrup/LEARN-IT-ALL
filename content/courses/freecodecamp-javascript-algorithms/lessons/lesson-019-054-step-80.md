---
id: lesson-019-054
title: Step 80
chapterId: chapter-19
order: 54
duration: 5
objectives:
  - Step 80
---

# Step 80

Now the string is no longer printing, because `false` is not `true`. But what about other values?

Try changing the condition to the string `"false"`.

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
if (false) {
  console.log("Condition is true");
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your `if` statement should have the string `"false"` as the condition.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4455f457ef2e3ec6920f*
