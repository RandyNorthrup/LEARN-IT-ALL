---
id: lesson-019-098
title: Step 51
chapterId: chapter-19
order: 98
duration: 5
objectives:
  - Step 51
---

# Step 51

Your `call` variable has an `undefined` value, even though you defined it! This is because your `padRow` function does not currently return a value. By default, functions return `undefined` as their value.

In order to return something else, you need to use the `return` keyword. Here is an example of a function that returns the string `"Functions are cool!"`:

```js
function demo() {
  return "Functions are cool!";
}
```

Use the `return` keyword to have your function return the string `"Hello!"`.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
function padRow() {

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

1. Your `padRow` function should use the `return` keyword.
2. Your `padRow` function should return the string `"Hello!"`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610c21b3ef82015573ffbbe*
