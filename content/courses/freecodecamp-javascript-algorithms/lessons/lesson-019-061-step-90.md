---
id: lesson-019-061
title: Step 90
chapterId: chapter-19
order: 61
duration: 5
objectives:
  - Step 90
---

# Step 90

To make your pyramid generate again, push the result of calling `padRow` with `done` and `count` as the arguments to your `rows` array, similar to what you did in your first loop.

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

let continueLoop = false;
let done = 0;

while (continueLoop) {
  done++;
--fcc-editable-region--

--fcc-editable-region--
  if (done === count) {
    continueLoop = false;
  } 
}

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your loop should call the `.push()` method on your `rows`.
2. You should call your `padRow` function in your `.push()` method.
3. You should pass `done` as the first argument to your `padRow` call.
4. You should pass `count` as the second argument to your `padRow` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4774e3e0df35a68bb5f2*
