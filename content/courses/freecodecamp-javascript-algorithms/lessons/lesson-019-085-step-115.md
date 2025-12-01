---
id: lesson-019-085
title: Step 115
chapterId: chapter-19
order: 85
duration: 5
objectives:
  - Step 115
---

# Step 115

If your pyramid is not inverted, then you will want to have an `else` block that builds the pyramid in the normal order.

In earlier steps, you learned how to work with `else` statement like this:

```js
if (condition) {
  // if condition is true, run this code
} else {
  // if condition is false, run this code
}
```

Add an `else` block to your `if` block.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];
let inverted = true;

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

// TODO: use a different type of loop
--fcc-editable-region--
for (let i = 1; i <= count; i++) {
  if (inverted) {
    rows.unshift(padRow(i, count));
  }

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

1. You should add an `else` block.
2. Your `else` block should be empty.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f530d6e33d159e1bf4947*
