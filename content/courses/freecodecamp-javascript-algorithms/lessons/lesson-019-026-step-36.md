---
id: lesson-019-026
title: Step 36
chapterId: chapter-19
order: 26
duration: 5
objectives:
  - Step 36
---

# Step 36

Your <dfn>iteration</dfn> statement will tell your loop what to do with the iterator after each run.

When you reassign a variable, you can use the variable to reference the previous value before the reassignment. This allows you to do things like add three to an existing number. For example, `bees = bees + 3` would increase the value of `bees` by three.

Use that syntax to replace your `"iteration"` string with a reassignment statement that increases `i` by one.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
for (let i = 0; i < count; "iteration") {

}
--fcc-editable-region--
```

## Hints

1. You should add one to your `i` variable.
2. You should assign `i + 1` back to your `i` variable.
3. Your `for` loop should increase `i` by `1` on each iteration.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f1b6e60bd9edf902c81fd*
