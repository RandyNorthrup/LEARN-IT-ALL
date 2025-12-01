---
id: lesson-019-102
title: Step 57
chapterId: chapter-19
order: 102
duration: 5
objectives:
  - Step 57
---

# Step 57

Variables in JavaScript are available in a specific <dfn>scope</dfn>. In other words, where a variable is declared determines where in your code it can be used.

The first scope is the global scope. Variables that are declared outside of any "block" like a function or `for` loop are in the <dfn>global scope</dfn>. Your `character`, `count`, and `rows` variables are all in the global scope.

When a variable is in the global scope, a function can access it in its definition. Here is an example of a function using a global `title` variable:

```js
const title = "Professor ";
function demo(name) {
  return title + name;
}
demo("Naomi")
```

This example would return `"Professor Naomi"`. Update your `padRow` function to return the value of concatenating your `character` variable to the beginning of the `name` parameter.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
function padRow(name) {
  return name;
}
--fcc-editable-region--
const call = padRow("CamperChan");
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

1. Your `padRow` function should concatenate `character` to the beginning of `name`.
2. Your `padRow` function should return the result of `character + name`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610c538372aa61cc0f5b122*
