---
id: lesson-019-049
title: Step 75
chapterId: chapter-19
order: 49
duration: 5
objectives:
  - Step 75
---

# Step 75

Unfortunately, now the bottom of the pyramid has disappeared. This is because you have created another <dfn>off-by-one error</dfn>.

Your original loop went for `i` values from `0` to `7`, because `count` is `8` and your condition requires `i` to be less than `count`. Your loop is now running for `i` values from `1` to `7`.

Your loop needs to be updated to run when `i` is `8`, too. Looking at your logic, this means your loop should run when `i` is <dfn>less than or equal to</dfn> `count`. You can use the less than or equal to operator `<=` for this.

Update your loop condition to run while `i` is less than or equal to `count`.

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

1. Your `for` loop should not check if `i` is less than `count`.
2. Your `for` loop should check if `i` is less than or equal to `count`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f3ba3cceef11b6ba08b59*
