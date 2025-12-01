---
id: lesson-019-042
title: Step 68
chapterId: chapter-19
order: 42
duration: 5
objectives:
  - Step 68
---

# Step 68

You should now see the same bunch of characters in your console. Your `padRow` function is doing the exact same thing you were doing earlier, but now it's in a reusable section of its own.

Use the addition operator to concatenate a single space `" "` to the beginning and end of your repeated `character` string.

Remember that you can use the `+` operator to concatenate strings like this:

```js
" " + "string"
```

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
function padRow(rowNumber, rowCount) {
  return character.repeat(rowNumber);
}
--fcc-editable-region--

for (let i = 0; i < count; i = i + 1) {
  rows.push(padRow(i + 1, count));
}

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should concatenate a single space to the beginning of your returned value.
2. You should concatenate a single space to the end of your returned value.
3. Your `padRow()` function should return the repeated `character` series with a space before and after the series.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f359af3e32e0f1a6880b7*
