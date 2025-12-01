---
id: lesson-019-076
title: Step 106
chapterId: chapter-19
order: 76
duration: 5
objectives:
  - Step 106
---

# Step 106

You can actually build the inverted pyramid without needing to loop "backwards" like you did.

To do this, you'll need to learn a couple of new array methods. Start by using `const` to declare a `numbers` variable. Assign it an array with the elements `1`, `2`, and `3`. Then log the `numbers` array.

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

/*for (let i = count; i > 0; i--) {
  rows.push(padRow(i, count));
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

1. You should use `const` to declare a `numbers` variable.
2. Your `numbers` variable should be an array.
3. Your `numbers` array should have the elements `1`, `2`, and `3` in that order.
4. You should log your `numbers` array.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4cffb1459d45e34902d1*
