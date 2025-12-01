---
id: lesson-019-103
title: Step 58
chapterId: chapter-19
order: 103
duration: 5
objectives:
  - Step 58
---

# Step 58

Variables can also be declared inside a function. These variables are considered to be in the <dfn>local scope</dfn>, or <dfn>block scope</dfn>. A variable declared inside a function can only be used inside that function. If you try to access it outside of the function, you get a reference error.

To see this in action, use `const` to declare a `test` variable in your `padRow` function. Initialise it with the value `"Testing"`.

Then, below your function, try to log `test` to the console. You will see an error because it is not defined outside of the function's local scope. Remove that `console.log` to pass the tests and continue.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
function padRow(name) {

  return character + name;
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

1. Your function should declare a `test` variable.
2. You should initialise `test` with the value `"Testing"`. Don't forget the semicolon.
3. Your `test` variable should come before your `return` keyword.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610c6541c82551f95e765ab*
