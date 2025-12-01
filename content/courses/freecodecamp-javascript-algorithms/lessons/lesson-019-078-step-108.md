---
id: lesson-019-078
title: Step 108
chapterId: chapter-19
order: 78
duration: 5
objectives:
  - Step 108
---

# Step 108

Arrays also have a `.shift()` method. This will remove the **first** element of the array, unlike `.pop()` which removes the last element. Here is an example of the `.shift()` method:

```js
const numbers = [1, 2, 3];
numbers.shift();
```

The `numbers` array would be `[2, 3]`.

Directly below your `numbers` array, declare a `shifted` variable and assign it the result of calling `.shift()` on the `numbers` array. On the next line, log the `shifted` variable to the console.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

// TODO: use a different type of loop
/*for (let i = 1; i <= count; i++) {
  rows.push(padRow(i, count));
}*/

/*while (rows.length < count) {
  rows.push(padRow(rows.length + 1, count));
}*/

/*for (let i = count; i > 0; i--) {
  rows.push(padRow(i, count));
}*/

--fcc-editable-region--
const numbers = [1, 2, 3];


const unshifted = numbers.unshift(5);
console.log(unshifted);
console.log(numbers);
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should use `const` to declare a `shifted` variable.
2. You should call `.shift()` on your `numbers` array.
3. You should assign the result of your `.shift()` call to your `shifted` variable.
4. You should log your `shifted` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4e74f7fd3f4a99ac2e50*
