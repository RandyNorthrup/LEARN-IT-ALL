---
id: lesson-019-080
title: Step 110
chapterId: chapter-19
order: 80
duration: 5
objectives:
  - Step 110
---

# Step 110

Sometimes you may wish to bring back previous code that you commented out. You can do so by removing the `/*` and `*/` around that code. This is called <dfn>uncommenting</dfn>.

Uncomment only your first `for` loop. Leave the single line comment and the other two multi line comments in place.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

--fcc-editable-region--
// TODO: use a different type of loop
/*for (let i = 1; i <= count; i++) {
  rows.push(padRow(i, count));
}*/

/*while (rows.length < count) {
  rows.push(padRow(rows.length + 1, count));
}*/

/*for (let i = count; i > 0; i--) {
  rows.push(padRow(i, count));
}*/
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should uncomment your first `for` loop.
2. You should not remove your single-line comment.
3. You should not uncomment your `while` loop.
4. You should not uncomment your second `for` loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4f79e2a82a4e92290f44*
