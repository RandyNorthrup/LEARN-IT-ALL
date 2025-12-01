---
id: lesson-019-039
title: Step 65
chapterId: chapter-19
order: 39
duration: 5
objectives:
  - Step 65
---

# Step 65

Remember in an earlier step, you learned about return values. A function can <dfn>return</dfn> a value for your application to consume separately.

In a function, the `return` keyword is used to specify a return value. For example, this function would return the value given to the first parameter:

```js
function name(parameter) {
  return parameter;
}
```

Use the `return` keyword to return the value of the `character` variable, repeated `rowNumber` times.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
function padRow(rowNumber, rowCount) {

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

1. You should use the `.repeat()` method.
2. You should use the `.repeat()` method on your `character` variable.
3. You should pass `rowNumber` to your `.repeat()` call.
4. You should use the `return` keyword.
5. You should return the result of your `.repeat()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f2fbd45b520046cac68e8*
