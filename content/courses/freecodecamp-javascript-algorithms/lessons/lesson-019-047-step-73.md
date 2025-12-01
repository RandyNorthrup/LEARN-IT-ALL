---
id: lesson-019-047
title: Step 73
chapterId: chapter-19
order: 47
duration: 5
objectives:
  - Step 73
---

# Step 73

Rather than having to pass `i + 1` to your `padRow` call, you could instead start your loop at `1`. This would allow you to create a one-indexed loop.

Update your iterator to start at `1` instead of `0`.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

--fcc-editable-region--
for (let i = 0; i < count; i++) {
  rows.push(padRow(i + 1, count));
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your `for` loop should initialise `i` at `1`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f39b444fd6f16d1e49c1f*
