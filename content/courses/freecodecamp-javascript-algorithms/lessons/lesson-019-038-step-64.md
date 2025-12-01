---
id: lesson-019-038
title: Step 64
chapterId: chapter-19
order: 38
duration: 5
objectives:
  - Step 64
---

# Step 64

In order to know how to format a row, your `padRow` function will need to know which row number you are on, and how many rows in total are being generated.

The best way to do this is by creating function parameters for them. Give your `padRow` function a `rowNumber` and `rowCount` parameter. Multiple parameters are separated by a comma:

```js
function name(first, second) {

}
```

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
function padRow() {

}
--fcc-editable-region--


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

1. Your `padRow` function should have a `rowNumber` parameter.
2. You should add a comma after your `rowNumber` parameter.
3. Your `padRow` function should have a `rowCount` parameter.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f2eccfe3f820304af1b39*
