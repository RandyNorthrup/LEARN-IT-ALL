---
id: lesson-019-107
title: Step 62
chapterId: chapter-19
order: 107
duration: 5
objectives:
  - Step 62
---

# Step 62

Because your function was no longer using the parameter, changing the argument did not affect it.

Go ahead and remove the `test` declaration and `return` statement from your `padRow` function, so the function is empty again.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
function padRow() {
  const test = "Testing";
  return test;
}
const call = padRow();
console.log(call);
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

1. Your `padRow` function should not have a `test` variable.
2. Your `padRow` function should not return a value.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610c87eac0f0b256d7b037e*
