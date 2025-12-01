---
id: lesson-019-100
title: Step 53
chapterId: chapter-19
order: 100
duration: 5
objectives:
  - Step 53
---

# Step 53

A function does not have to return a hard-coded value. It can return the value stored in a variable. Parameters are special variables for a function, so they can also be returned.

Change your `padRow` function to `return` the `name` parameter directly.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
function padRow(name) {
  return "Hello!";
}
--fcc-editable-region--
const call = padRow();
console.log(call);


for (let i = 0; i < count; i = i + 1) {
  rows.push(character.repeat(i + 1))
}

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. Your `padRow` function should return the value of the `name` parameter.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610c424b7119919b62932f4*
