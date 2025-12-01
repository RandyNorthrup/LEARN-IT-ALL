---
id: lesson-019-016
title: Step 26
chapterId: chapter-19
order: 16
duration: 5
objectives:
  - Step 26
---

# Step 26

A <dfn>method</dfn> in JavaScript is a function that's associated with certain values or objects. An example you've already encountered is the `.log()` method, which is part of the `console` object.

Arrays have their own methods, and the first you will explore is the `.push()` method. This allows you to "push" a value to the end of an array. Here is an example to add the number `12` to the end of an array:

```js
array.push(12);
```

Use `.push()` to add the string `"freeCodeCamp"` to the end of your `rows` array. Add this code before your `console.log` so you can see the change you made to your array.

## Starter Code

```html
let character = 'Hello';
let count = 8;
--fcc-editable-region--
let rows = ["Naomi", "Quincy", "CamperChan"];

console.log(rows);
--fcc-editable-region--
```

## Hints

1. You should use `.push()` in your code.
2. You should use the `.push()` method of your `rows` array.
3. You should pass the string `"freeCodeCamp"` to your `.push()` method.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f0a55847d6cc485f29ba5*
