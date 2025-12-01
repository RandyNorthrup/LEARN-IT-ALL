---
id: lesson-019-050
title: Step 76
chapterId: chapter-19
order: 50
duration: 5
objectives:
  - Step 76
---

# Step 76

Comments can be helpful for explaining why your code takes a certain approach, or leaving to-do notes for your future self.

In JavaScript, you can use `//` to leave a single-line comment in your code.

Add a single-line comment above your `for` loop to remind yourself to change the code to a different kind of loop.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

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

1. You should start a single-line comment with `//`.
2. Your single-line comment should be at least five characters long.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f3ce51f70571e1c5227c8*
