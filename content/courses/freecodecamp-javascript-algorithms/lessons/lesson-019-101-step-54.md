---
id: lesson-019-101
title: Step 54
chapterId: chapter-19
order: 101
duration: 5
objectives:
  - Step 54
---

# Step 54

If you open your console again, you'll see that your `padRow` function is returning `undefined`, even though you defined a return value! This is because parameters need to be given a value when you **call** the function.

When you pass a value to a function call, that value is referred to as an <dfn>argument</dfn>. Here is an example of calling a `demo` function and passing `"Naomi"` as the argument for the `name` parameter.

```js
function demo(name) {
  return name;
}
demo("Naomi");
```

Pass your own name as the argument for the `name` parameter in your `padRow` call. Remember that your name is a string, so you'll need to use quotes.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

function padRow(name) {
  return name;
}
--fcc-editable-region--
const call = padRow();
--fcc-editable-region--
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

1. You should pass a string to your `padRow()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610c48c4ea0891afa7c4696*
