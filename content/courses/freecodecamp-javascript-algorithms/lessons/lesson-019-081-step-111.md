---
id: lesson-019-081
title: Step 111
chapterId: chapter-19
order: 81
duration: 5
objectives:
  - Step 111
---

# Step 111

Your pyramid is no longer inverted. This is because you are adding new rows to the **end** of the array.

Update your loop body to add new rows to the beginning of the array.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

// TODO: use a different type of loop
--fcc-editable-region--
for (let i = 1; i <= count; i++) {
  rows.push(padRow(i, count));
}
--fcc-editable-region--

/*while (rows.length < count) {
  rows.push(padRow(rows.length + 1, count));
}*/

/*for (let i = count; i > 0; i--) {
  rows.push(padRow(i, count));
}*/

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should use the `unshift` method of `rows`.
2. You should pass a `padRow()` call as the argument for your `.unshift()` method.
3. You should pass `i` as the first argument to your `padRow()` call.
4. You should pass `count` as the second argument to your `padRow()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f505d02b2bd513a1c3468*
