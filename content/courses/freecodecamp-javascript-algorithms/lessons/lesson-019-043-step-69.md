---
id: lesson-019-043
title: Step 69
chapterId: chapter-19
order: 43
duration: 5
objectives:
  - Step 69
---

# Step 69

Now it is time for a bit of math. Consider a three-row pyramid. If we want it centered, it would look something like:

```md
··#··
·###·
#####
```

Empty spaces have been replaced with interpuncts, or middle dots, for readability. If you extrapolate the pattern, you can see that the spaces at the beginning and end of a row follow a pattern.

Update your blank space strings to be repeated `rowCount - rowNumber` times.

Open up the console to see the result.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
function padRow(rowNumber, rowCount) {
  return " " + character.repeat(rowNumber) + " ";
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

1. You should call `.repeat()` on your `" "` strings to repeat them `rowCount - rowNumber` times.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f374d532dc41189cc9cc2*
