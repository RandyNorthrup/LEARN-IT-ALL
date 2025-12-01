---
id: lesson-019-106
title: Step 61
chapterId: chapter-19
order: 106
duration: 5
objectives:
  - Step 61
---

# Step 61

Now your `call` variable has the value `"Testing"`. But your function is no longer using the `name` parameter.

Remove the `name` parameter from your function declaration, then remove your `"CamperChan"` string from the `padRow` call.

Also, remove both `console.log` from the `padRow` function.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
function padRow(name) {
  const test = "Testing";
  console.log("This works!");
  return test;
  console.log("This works!");
}
const call = padRow("CamperChan");
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

1. Your `padRow` function should not have a `name` parameter.
2. You should not pass `"CamperChan"` to your `padRow` call.
3. You should still call your `padRow` function.
4. You should not have a `console.log` before your `return` keyword.
5. You should not have a `console.log` after your `return` keyword.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610c83b52583e245a079217*
