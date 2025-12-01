---
id: lesson-007-022
title: Use the some Method to Check that Any Elements in an Array Meet a Criteria
chapterId: chapter-07
order: 22
duration: 5
objectives:
  - Use the some Method to Check that Any Elements in an Array Meet a Criteria
---

# Use the some Method to Check that Any Elements in an Array Meet a Criteria

The `some` method works with arrays to check if *any* element passes a particular test. It returns a Boolean value - `true` if any of the values meet the criteria, `false` if not.

For example, the following code would check if any element in the `numbers` array is less than 10:

```js
const numbers = [10, 50, 8, 220, 110, 11];

numbers.some(function(currentValue) {
  return currentValue < 10;
});
```

The `some` method would return `true`.

## Instructions

Use the `some` method inside the `checkPositive` function to check if any element in `arr` is positive. The function should return a Boolean value.

## Starter Code

```html
function checkPositive(arr) {
  // Only change code below this line


  // Only change code above this line
}

checkPositive([1, 2, 3, -4, 5]);
```

## Hints

1. Your code should use the `some` method.
2. `checkPositive([1, 2, 3, -4, 5])` should return `true`.
3. `checkPositive([1, 2, 3, 4, 5])` should return `true`.
4. `checkPositive([-1, -2, -3, -4, -5])` should return `false`.

## Solution

```html
```js
function checkPositive(arr) {
  return arr.some(elem => elem > 0);
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7dab367417b2b2512b6f*
