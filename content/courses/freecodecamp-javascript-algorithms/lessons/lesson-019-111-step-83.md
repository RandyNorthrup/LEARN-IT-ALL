---
id: lesson-019-111
title: Step 83
chapterId: chapter-19
order: 111
duration: 5
objectives:
  - Step 83
---

# Step 83

Sometimes you will want to run different code when all of the `if...else if` conditions are `false`. You can do this by adding an `else` block. 

An `else` block will only evaluate if the conditions in the `if` and `else if` blocks are not met.

Here the `else` block is added to the `else if` block. 

```js

if (condition) {
  // this code will run if condition is true
} else if (condition2) {
  // this code will run if the first condition is false
} else {
  // this code will run 
  // if the first and second conditions are false
}
```

Add an `else` block to the `else if` block. Inside the `else` block, log the string `"This is the else block"` to the console.

To see the results in the console, you can manually change the `<` in the `else if` statement to `>`. That will make the condition `false` and the `else` block will run.

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

--fcc-editable-region--
if ("") {
  console.log("Condition is true");
} else if (5 < 10) {
  console.log("5 is less than 10");
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should have an `else` block.
2. Your `else` block should log the string `"This is the else block"` to the console.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 664599653fcd6e97104f9261*
