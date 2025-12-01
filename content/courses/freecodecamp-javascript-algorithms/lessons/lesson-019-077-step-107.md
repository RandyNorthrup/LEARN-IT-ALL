---
id: lesson-019-077
title: Step 107
chapterId: chapter-19
order: 77
duration: 5
objectives:
  - Step 107
---

# Step 107

The `.unshift()` method of an array allows you to add a value to the **beginning** of the array, unlike `.push()` which adds the value at the end of the array. `.unshift()` returns the new length of the array it was called on.

```js
const countDown = [2, 1, 0];
const newLength = countDown.unshift(3);
console.log(countDown); // [3, 2, 1, 0]
console.log(newLength); // 4
```

Use `const` to declare an `unshifted` variable, and assign it the result of calling `.unshift()` on your `numbers` array. Pass `5` as the argument. Then print your `unshifted` variable.

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

console.log(numbers);
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should declare your `unshifted` variable.
2. You should call the `.unshift()` method on your `numbers` array.
3. You should pass `5` as the argument to your `.unshift()` call.
4. You should assign the result of your `.unshift()` call to your `unshifted` variable.
5. You should log your `unshifted` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f4de78f775e480ba2e451*
