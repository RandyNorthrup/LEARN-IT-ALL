---
id: lesson-019-095
title: Step 48
chapterId: chapter-19
order: 95
duration: 5
objectives:
  - Step 48
---

# Step 48

In order to use a function, you need to call it. A <dfn>function call</dfn> tells your application to run the code from the function wherever you choose to call it. The syntax for a function call is the function name followed by parentheses. For example, this code defines and calls a `test` function.

```js
function test() {

}
test();
```

Call your `padRow` function.

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

1. You should call the `padRow` function.
2. Your `padRow` function body should be empty.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610c105bbdacc114d6cdc44*
