---
id: lesson-007-021
title: Use the every Method to Check that Every Element in an Array Meets a Criteria
chapterId: chapter-07
order: 21
duration: 5
objectives:
  - Use the every Method to Check that Every Element in an Array Meets a Criteria
---

# Use the every Method to Check that Every Element in an Array Meets a Criteria

The `every` method works with arrays to check if *every* element passes a particular test. It returns a Boolean value - `true` if all values meet the criteria, `false` if not.

For example, the following code would check if every element in the `numbers` array is less than 10:

```js
const numbers = [1, 5, 8, 0, 10, 11];

numbers.every(function(currentValue) {
  return currentValue < 10;
});
```

The `every` method would return `false` here.

## Instructions

Use the `every` method inside the `checkPositive` function to check if every element in `arr` is positive. The function should return a Boolean value.

## Starter Code

```html
function checkPositive(arr) {
  // Only change code below this line


  // Only change code above this line
}

checkPositive([1, 2, 3, -4, 5]);
```

## Hints

1. Your code should use the `every` method.
2. `checkPositive([1, 2, 3, -4, 5])` should return `false`.
3. `checkPositive([1, 2, 3, 4, 5])` should return `true`.
4. `checkPositive([1, -2, 3, -4, 5])` should return `false`.

## Solution

```html
```js
function checkPositive(arr) {
  return arr.every(num => num > 0);
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7dab367417b2b2512b6e*
