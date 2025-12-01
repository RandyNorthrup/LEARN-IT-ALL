---
id: lesson-019-108
title: Step 63
chapterId: chapter-19
order: 108
duration: 5
objectives:
  - Step 63
---

# Step 63

As expected, your function now returns `undefined` again. Your `call` variable is not necessary any more, so remove the `call` declaration and the `console.log` for the `call` variable.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
function padRow() {

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

1. You should not have a `call` declaration.
2. You should not log your `call` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610c8cfe4cf4d278e35c156*
