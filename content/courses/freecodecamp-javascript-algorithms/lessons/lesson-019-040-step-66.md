---
id: lesson-019-040
title: Step 66
chapterId: chapter-19
order: 40
duration: 5
objectives:
  - Step 66
---

# Step 66

A <dfn>function call</dfn> allows you to actually use a function. You may not have been aware of it, but the methods like `.push()` that you have been using have been function calls.

A function is called by referencing the function's name, and adding `()`. Here's how to call a `test` function:

```js
test();
```

Replace the `character.repeat(i + 1)` in your `.push()` call with a function call for your `padRow` function. Do not add any arguments to it yet.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

function padRow(rowNumber, rowCount) {
  return character.repeat(rowNumber);
}


--fcc-editable-region--
for (let i = 0; i < count; i = i + 1) {
  rows.push(character.repeat(i + 1))
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should not use `i + 1` in your `push` call.
2. You should not use `character.repeat` in your `.push()` call.
3. You should call `padRow` in your `.push()` call.
4. You should not have arguments in your `padRow` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f34626216270c682e2f7b*
