---
id: lesson-019-086
title: Step 116
chapterId: chapter-19
order: 86
duration: 5
objectives:
  - Step 116
---

# Step 116

When `inverted` is false, you want to build a standard pyramid. Use `.push()` like you have in previous steps to achieve this.

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
  } else {

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

1. You should call the `.push()` method of `rows` in your `else` block.
2. You should pass a `padRow()` call as the argument for your `.push()` method.
3. You should pass `i` as the first argument to your `padRow()` call.
4. You should pass `count` as the second argument to your `padRow()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f535ec33a285b33af3774*
