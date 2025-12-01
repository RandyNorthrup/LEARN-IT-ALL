---
id: lesson-019-071
title: Step 101
chapterId: chapter-19
order: 71
duration: 5
objectives:
  - Step 101
---

# Step 101

Your iteration statement is also going to be different. Instead of adding `1` to `i` with each loop, you need to subtract `1`.

Like you did earlier with `i = i + 1`, update your iteration statement to give `i` the value of subtracting `1` from itself.

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
for (let i = count; i > 0; false) {

}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your `for` loop should use `i = i - 1` as the iteration.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4ae5b3924c3fc3373973*
