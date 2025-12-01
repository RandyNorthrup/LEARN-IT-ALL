---
id: lesson-019-034
title: Step 44
chapterId: chapter-19
order: 34
duration: 5
objectives:
  - Step 44
---

# Step 44

Printing numbers won't result in a visually appealing pyramid. Now that you're outputting the formatted content of your `rows` array, it's time to update your original loop.

Instead of pushing `i` to the array, push the value of your `character` variable.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
for (let i = 0; i < count; i = i + 1) {
  rows.push(i);
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should no longer push your `i` variable.
2. You should push your `character` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f255022991ef34ed0ee88*
