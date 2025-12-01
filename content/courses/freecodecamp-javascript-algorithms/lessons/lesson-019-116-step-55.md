---
id: lesson-019-116
title: Step 55
chapterId: chapter-19
order: 116
duration: 5
objectives:
  - Step 55
---

# Step 55

Before moving on, take a moment to review how functions work.

Declare a function named `addTwoNumbers`. This function should take two arguments and return the sum of those two arguments.

Your function should not use hard-coded values. An example of a hard-coded function might be:

```js
function sayName(firstName, lastName) {
  return "John Doe";
}

sayName("Camper", "Cat");
```

This function would return `"John Doe"` regardless of the arguments passed to the parameters `firstName`, and `lastName`, so `"John Doe"` is considered a hard-coded value.

Declare a `sum` variable and assign it the value of calling your `addTwoNumbers` function with `5` and `10` as the arguments. Log the `sum` variable to the console.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

function padRow(name) {
  return name;
}
--fcc-editable-region--

--fcc-editable-region--

const call = padRow("CamperChan");
console.log(call);


for (let i = 0; i < count; i = i + 1) {
  rows.push(character.repeat(i + 1))
}

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should have a function called `addTwoNumbers`.
2. Your function `addTwoNumbers` should have two parameters.
3. Your function should return the sum of the two parameters.
4. Your function should not return a hard-coded value. That is, it should work with any two number arguments.
5. You should declare a `sum` variable.
6. Your `sum` variable should have the value `15`.
7. You should assign `sum` the value from calling the `addTwoNumbers` function with `5` and `10` for the arguments.
8. You should log your `sum` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 66643c93e05093c728abdbe9*
