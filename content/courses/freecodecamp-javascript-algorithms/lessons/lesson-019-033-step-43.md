---
id: lesson-019-033
title: Step 43
chapterId: chapter-19
order: 33
duration: 5
objectives:
  - Step 43
---

# Step 43

Now all of your numbers are appearing on the same line. This will not work for creating a pyramid.

You will need to add a new line to each row. However, pressing the return key to insert a line break between quotes in JavaScript will result in a parsing error. Instead, you need to use the special <dfn>escape sequence</dfn> `\n`, which is interpreted as a new line when the string is logged. For example:

```js
lineOne = lineOne + "\n" + lineTwo;
```

Use a second addition operator to append a new line after the `result` and `row` values.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

for (let i = 0; i < count; i = i + 1) {
  rows.push(i);
}

let result = ""

--fcc-editable-region--
for (const row of rows) {
  result = result + row;
}
--fcc-editable-region--

console.log(result);
```

## Hints

1. You should use the `\n` escape sequence. Remember that it needs to be a string, so it is wrapped in quotes.
2. You should concatenate your `row` variable to your `result` variable.
3. You should concatenate the `\n` escape sequence to your `row` variable.
4. You should assign the entire concatenation back to your `result` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f23b53db70af0f2620e78*
