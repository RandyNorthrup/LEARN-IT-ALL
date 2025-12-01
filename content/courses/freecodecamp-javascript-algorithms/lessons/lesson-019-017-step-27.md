---
id: lesson-019-017
title: Step 27
chapterId: chapter-19
order: 17
duration: 5
objectives:
  - Step 27
---

# Step 27

Another method essential for this project is the `.pop()` method. It removes the last element from an array and <dfn>returns</dfn> that element.

When a method returns a value, you can think of it as giving the value back to you, making it available for use in other parts of your code.

Create a new variable called `popped` and assign it the result of `rows.pop()`. Then, log `popped` to the console.

## Starter Code

```html
let character = 'Hello';
let count = 8;
--fcc-editable-region--
let rows = ["Naomi", "Quincy", "CamperChan"];
rows.push("freeCodeCamp");

console.log(rows);
--fcc-editable-region--
```

## Hints

1. You should declare a variable called `popped`.
2. You should use `let` to declare your variable called `popped`.
3. You should call the `.pop()` method.
4. You should call the `.pop()` method on your `rows` array.
5. You should log your `popped` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f0c34aad72dc712b97624*
