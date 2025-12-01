---
id: lesson-019-056
title: Step 84
chapterId: chapter-19
order: 56
duration: 5
objectives:
  - Step 84
---

# Step 84

Now that you have practiced working with `if...else if...else` statements, you can remove them from your code.

Once you complete that, use `let` to declare a `continueLoop` variable and assign it the boolean `false`. Then use `let` to declare a `done` variable and assign it the value `0`.

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
} else {
  console.log("This is the else block");
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should not have an `if` statement.
2. You should not have an `else if` statement.
3. You should not have an `else` statement.
4. You should use `let` to declare a `continueLoop` variable.
5. Your `continueLoop` variable should have the value `false`.
6. You should use `let` to declare a `done` variable.
7. Your `done` variable should have the value `0`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f44f10ea40f300b896a5e*
