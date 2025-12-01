---
id: lesson-019-051
title: Step 77
chapterId: chapter-19
order: 51
duration: 5
objectives:
  - Step 77
---

# Step 77

JavaScript also has support for multi-line comments. A multi-line comment starts with `/*` and ends with `*/`.

Unlike a single-line comment, a multi-line comment will encapsulate multiple lines.

Use `/*` and `*/` to turn your current `for` loop, including the body, into a multi-line comment.

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

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should start a multi-line comment with `/*`.
2. You should end a multi-line comment with `*/`.
3. Your entire `for` loop should be commented out.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f3dd626be3a1ffe27e5d1*
