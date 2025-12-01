---
id: lesson-003-008
title: Iterate Through All an Array's Items Using For Loops
chapterId: chapter-03
order: 8
duration: 5
objectives:
  - Iterate Through All an Array's Items Using For Loops
---

# Iterate Through All an Array's Items Using For Loops

Sometimes when working with arrays, it is very handy to be able to iterate through each item to find one or more elements that we might need, or to manipulate an array based on which data items meet a certain set of criteria. JavaScript offers several built in methods that each iterate over arrays in slightly different ways to achieve different results (such as `every()`, `forEach()`, `map()`, etc.), however the technique which is most flexible and offers us the greatest amount of control is a simple `for` loop.

Consider the following:

```js
function greaterThanTen(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 10) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

greaterThanTen([2, 12, 8, 14, 80, 0, 1]);
```

Using a `for` loop, this function iterates through and accesses each element of the array, and subjects it to a simple test that we have created. In this way, we have easily and programmatically determined which data items are greater than `10`, and returned a new array, `[12, 14, 80]`, containing those items.

## Instructions

We have defined a function, `filteredArray`, which takes `arr`, a nested array, and `elem` as arguments, and returns a new array. `elem` represents an element that may or may not be present on one or more of the arrays nested within `arr`. Modify the function, using a `for` loop, to return a filtered version of the passed array such that any array nested within `arr` containing `elem` has been removed.

## Starter Code

```html
function filteredArray(arr, elem) {
  let newArr = [];
  // Only change code below this line

  // Only change code above this line
  return newArr;
}

console.log(filteredArray([[3, 2, 3], [1, 6, 3], [3, 13, 26], [19, 3, 9]], 3));
```

## Hints

1. `filteredArray([[10, 8, 3], [14, 6, 23], [3, 18, 6]], 18)` should return `[[10, 8, 3], [14, 6, 23]]`
2. `filteredArray([["trumpets", 2], ["flutes", 4], ["saxophones", 2]], 2)` should return `[["flutes", 4]]`
3. `filteredArray([["amy", "beth", "sam"], ["dave", "sean", "peter"]], "peter")` should return `[["amy", "beth", "sam"]]`
4. `filteredArray([[3, 2, 3], [1, 6, 3], [3, 13, 26], [19, 3, 9]], 3)` should return `[]`
5. The `filteredArray` function should utilize a `for` loop

## Solution

```html
```js
function filteredArray(arr, elem) {
  let newArr = [];
  for (let i = 0; i<arr.length; i++) {
    if (arr[i].indexOf(elem) < 0) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b7b367417b2b2512b15*
