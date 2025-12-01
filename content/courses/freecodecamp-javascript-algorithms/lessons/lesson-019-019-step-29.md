---
id: lesson-019-019
title: Step 29
chapterId: chapter-19
order: 19
duration: 5
objectives:
  - Step 29
---

# Step 29

Were you expecting to see `4` in the console? `.push()` returns the new length of the array, after adding the value you give it.

It is important to be aware of what values a method returns. Take some time to experiment with `.push()` and `.pop()`. When you are ready, remove all of your `.push()` and `.pop()` calls, and your `console.log` statements.

## Starter Code

```html
let character = 'Hello';
let count = 8;
let rows = ["Naomi", "Quincy", "CamperChan"];
--fcc-editable-region--
let pushed = rows.push("freeCodeCamp");
console.log(pushed);
let popped = rows.pop();
console.log(popped);
console.log(rows);
--fcc-editable-region--
```

## Hints

1. You should not have a `.push()` call.
2. You should not have a `.pop()` call.
3. You should not have any log statements.
4. You should not have a `popped` variable.
5. You should not have a `pushed` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f0ee51d7460ce88cd248d*
