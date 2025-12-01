---
id: lesson-019-093
title: Step 22
chapterId: chapter-19
order: 93
duration: 5
objectives:
  - Step 22
---

# Step 22

Notice how the value inside your `rows` array has been changed directly? This is called <dfn>mutation</dfn>. As you learn more about arrays, you will learn when to mutate an array, and when you should not.

Before moving on, this is a great opportunity to learn a common array use. Currently, your code accesses the last element in the array with `rows[2]`. But you may not know how many elements are in an array when you want the last one.

You can make use of the `.length` property of an array - this returns the number of elements in the array. To get the last element of any array, you can use the following syntax:

```js
array[array.length - 1]
```

`array.length` returns the number of elements in the array. By subtracting `1`, you get the index of the last element in the array. You can apply this same concept to your `rows` array.

Update your `rows[2]` to dynamically access the last element in the `rows` array. Refer to the example above to help you.

You should not see anything change in your console.

## Starter Code

```html
let character = 'Hello';
let count = 8;
let rows = ["Naomi", "Quincy", "CamperChan"];
console.log(rows[0]);
--fcc-editable-region--
rows[2] = 10;
--fcc-editable-region--
console.log(rows);
```

## Hints

1. You should use the `.length` property of your `rows` array.
2. You should use `rows.length` in your bracket notation.
3. You should subtract `1` from the length in your bracket notation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610bbed59bc2a0194d85533*
