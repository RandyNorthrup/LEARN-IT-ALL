---
id: lesson-019-099
title: Step 52
chapterId: chapter-19
order: 99
duration: 5
objectives:
  - Step 52
---

# Step 52

When you have a value that is explicitly written in your code, like the `"Hello!"` string in your function, it is considered to be <dfn>hard-coded</dfn>. Hard-coding a value inside a function might not make it as reusable as you'd like.

Instead, you can define <dfn>parameters</dfn> for the function. Parameters are special variables that are given a value when you call the function, and can be used in your function to dynamically change the result of the function's code.

To add a parameter to your function, you need to add a variable name inside the parentheses. For example, this `demo` function has a `name` parameter:

```js
function demo(name) {

}
```

`name` sounds like a useful parameter, so go ahead and add it to your `padRow` function.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
function padRow() {
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

1. Your `padRow` function should have a `name` parameter.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610c2d8d67563174fcf96dc*
