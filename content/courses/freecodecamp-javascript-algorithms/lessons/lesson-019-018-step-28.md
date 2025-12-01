---
id: lesson-019-018
title: Step 28
chapterId: chapter-19
order: 18
duration: 5
objectives:
  - Step 28
---

# Step 28

You should have seen `"freeCodeCamp"` printed to the console. This is because `.pop()` returns the value that was removed from the array - and you pushed `"freeCodeCamp"` to the end of the array earlier.

But what does `.push()` return? Assign your existing `rows.push()` to a new `pushed` variable, and log it.

## Starter Code

```html
let character = 'Hello';
let count = 8;
let rows = ["Naomi", "Quincy", "CamperChan"];
--fcc-editable-region--
rows.push("freeCodeCamp");

--fcc-editable-region--
let popped = rows.pop();
console.log(popped);
console.log(rows);
```

## Hints

1. You should declare a `pushed` variable.
2. You should use `let` to declare your `pushed` variable.
3. You should assign `rows.push("freeCodeCamp")` to your `pushed` variable.
4. You should log your `pushed` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f0da9bf1035c9097af20a*
