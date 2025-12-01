---
id: lesson-019-072
title: Step 102
chapterId: chapter-19
order: 72
duration: 5
objectives:
  - Step 102
---

# Step 102

Again, push the result of calling `padRow` with your `i` and `count` variables to your `rows` array.

Open up the console to see the upside-down pyramid.

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
for (let i = count; i > 0; i = i - 1) {

}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your `for` loop should call `rows.push()`.
2. You should call `padRow()` in your `.push()` call.
3. You should pass `i` as the first argument to your `padRow()` call.
4. You should pass `count` as the second argument to your `padRow()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4b33e2a3364094ecb540*
