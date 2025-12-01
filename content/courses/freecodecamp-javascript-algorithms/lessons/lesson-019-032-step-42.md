---
id: lesson-019-032
title: Step 42
chapterId: chapter-19
order: 32
duration: 5
objectives:
  - Step 42
---

# Step 42

Remember in your previous loop that you used the addition operator `+` to increase the value of `i` by `1`.

You can do a similar thing with a string value, by appending a new string to an existing string. For example, `hello = hello + " World";` would add the string `" World"` to the existing string stored in the `hello` variable. This is called <dfn>concatenation</dfn>.

In your `for...of` loop, use the addition operator to concatenate the `row` value to the `result` value.

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

}
--fcc-editable-region--

console.log(result);
```

## Hints

1. You should use the concatenation operator on your `result` variable.
2. You should concatenate `row` to your `result` variable.
3. You should assign the result of your concatenation back to the `result` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f229d2dbe09ef2954a4a1*
