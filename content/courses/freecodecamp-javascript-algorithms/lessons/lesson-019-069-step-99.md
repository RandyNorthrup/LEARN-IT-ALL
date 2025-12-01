---
id: lesson-019-069
title: Step 99
chapterId: chapter-19
order: 69
duration: 5
objectives:
  - Step 99
---

# Step 99

What if you made your pyramid upside-down, or <dfn>inverted</dfn>? Time to try it out!

Start by creating a new `for` loop. Declare your iterator `i` and assign it the value of `count`, then use the boolean `false` for your condition and iteration statements.

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

--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your code should have a `for` loop.
2. Your `for` loop should initialise `i` with the value of `count`.
3. Your `for` loop should use `false` as the condition.
4. Your `for` loop should use `false` as the iteration.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4a1472f8e63d76162ce5*
