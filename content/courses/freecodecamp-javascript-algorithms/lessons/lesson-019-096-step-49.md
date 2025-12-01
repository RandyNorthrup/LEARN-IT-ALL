---
id: lesson-019-096
title: Step 49
chapterId: chapter-19
order: 96
duration: 5
objectives:
  - Step 49
---

# Step 49

You are calling your `padRow` function, but not doing anything with that function call. All functions in JavaScript <dfn>return</dfn> a value, meaning they provide the defined result of calling them for you to use elsewhere.

To see the result of calling your `padRow` function, declare a `call` variable and assign your existing `padRow` call to that variable.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

function padRow() {

}
--fcc-editable-region--
padRow();
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

1. You should declare a `call` variable.
2. You should use `const` to declare your `call` variable.
3. You should assign `call` the result of your `padRow` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610c16c4fa0df12c0e30675*
