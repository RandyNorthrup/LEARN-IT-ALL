---
id: lesson-019-036
title: Step 46
chapterId: chapter-19
order: 36
duration: 5
objectives:
  - Step 46
---

# Step 46

You're getting closer! At this point, you're encountering what's known as an <dfn>off-by-one error</dfn>, a frequent problem in zero-based indexing languages like JavaScript.

The first index of your `rows` array is `0`, which is why you start your `for` loop with `i = 0`. But repeating a string zero times results in nothing to print.

To fix this, add `1` to the value of `i` in your `.repeat()` call. Do not assign it back to `i` like you did in your loop conditions.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
for (let i = 0; i < count; i = i + 1) {
  rows.push(character.repeat(i))
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should add `1` to `i` in your `.repeat()` method.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f2a70ad6225fa503e71c3*
