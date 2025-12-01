---
id: lesson-019-079
title: Step 109
chapterId: chapter-19
order: 79
duration: 5
objectives:
  - Step 109
---

# Step 109

Now that you've tried these methods, you can do another inverted pyramid approach. But first you need to clean up your experimentation.

Remove your `numbers` array, and the method calls and log calls.

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
const numbers = [1, 2, 3];
const shifted = numbers.shift();
console.log(shifted);
const unshifted = numbers.unshift(5);
console.log(unshifted);
console.log(numbers);
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should not have a `numbers` array.
2. You should not have an `unshifted` variable.
3. You should not have a `shifted` variable.
4. You should not have your `console.log` statements.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4efcb8068e4cb470dca1*
