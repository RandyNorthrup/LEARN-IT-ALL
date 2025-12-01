---
id: lesson-019-041
title: Step 67
chapterId: chapter-19
order: 41
duration: 5
objectives:
  - Step 67
---

# Step 67

Your `padRow` function has two parameters which you defined. Values are provided to those parameters when a function is called.

The values you provide to a function call are referred to as <dfn>arguments</dfn>, and you <dfn>pass</dfn> arguments to a function call. Here's a function call with `"Hello"` passed as an argument:

```js
test("Hello");
```

Pass `i + 1` and `count` as the arguments to your `padRow` call. Like parameters, arguments are separated by a comma.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

function padRow(rowNumber, rowCount) {
  return character.repeat(rowNumber);
}


--fcc-editable-region--
for (let i = 0; i < count; i = i + 1) {
  rows.push(padRow())
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should pass `i + 1` to your `padRow()` call.
2. You should have a comma after your `i + 1` argument.
3. You should pass `count` as your second argument.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f34e99571070d56d2f231*
