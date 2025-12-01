---
id: lesson-019-028
title: Step 38
chapterId: chapter-19
order: 28
duration: 5
objectives:
  - Step 38
---

# Step 38

You should see the numbers zero through seven printed in your console, one per line. This will serve as the foundation for generating your pyramid.

Replace your log statement with a statement to push `i` to your `rows` array.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
for (let i = 0; i < count; i = i + 1) {
  console.log(i);
}
--fcc-editable-region--
```

## Hints

1. You should not have a `console.log` call.
2. You should call `.push()` on your `rows` array.
3. You should push `i` to your `rows` array.
4. Your `.push()` should happen in your `for` loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f1cedf3676fe26122ebf6*
