---
id: lesson-019-048
title: Step 74
chapterId: chapter-19
order: 48
duration: 5
objectives:
  - Step 74
---

# Step 74

The pyramid looks a little funny now. Because you are starting the loop at `1` instead of `0`, you do not need to add one to `i` when you pass it to `padRow`.

Update the first argument of your `padRow` call to be `i`.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

--fcc-editable-region--
for (let i = 1; i < count; i++) {
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

1. You should not pass `i + 1` to `padRow`.
2. You should pass `i` to `padRow`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f3b664421471aa595170f*
