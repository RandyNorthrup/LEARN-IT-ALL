---
id: lesson-019-014
title: Step 21
chapterId: chapter-19
order: 14
duration: 5
objectives:
  - Step 21
---

# Step 21

Arrays are special in that they are considered <dfn>mutable</dfn>. This means you can change the value at an index directly.

For example, this code would assign the number `25` to the second element in the array:

```js
let array = [1, 2, 3];
array[1] = 25;
console.log(array); // prints [1, 25, 3]
```

Update the **third** element of your `rows` array to be the number `10`. Then print the `rows` array to your console.

## Starter Code

```html
let character = 'Hello';
let count = 8;
let rows = ["Naomi", "Quincy", "CamperChan"];
console.log(rows[0]);
--fcc-editable-region--

--fcc-editable-region--
```

## Hints

1. You should use bracket notation on the `rows` array again.
2. You should access the third element of the `rows` array.
3. You should use the assignment operator on the third element of the `rows` array.
4. You should assign the value `10` to the third element of your `rows` array.
5. You should have a second `console.log` statement in your code.
6. You should log the `rows` array.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f07d231941bc11719f664*
