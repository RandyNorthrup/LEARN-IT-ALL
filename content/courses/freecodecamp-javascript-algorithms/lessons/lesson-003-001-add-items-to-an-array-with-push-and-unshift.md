---
id: lesson-003-001
title: Add Items to an Array with push() and unshift()
chapterId: chapter-03
order: 1
duration: 5
objectives:
  - Add Items to an Array with push() and unshift()
---

# Add Items to an Array with push() and unshift()

An array's length, like the data types it can contain, is not fixed. Arrays can be defined with a length of any number of elements, and elements can be added or removed over time; in other words, arrays are <dfn>mutable</dfn>. In this challenge, we will look at two methods with which we can programmatically modify an array: `Array.push()` and `Array.unshift()`.

Both methods take one or more elements as parameters and add those elements to the array the method is being called on; the `push()` method adds elements to the end of an array, and `unshift()` adds elements to the beginning. Consider the following:

```js
let twentyThree = 'XXIII';
let romanNumerals = ['XXI', 'XXII'];

romanNumerals.unshift('XIX', 'XX');
```

`romanNumerals` would have the value `['XIX', 'XX', 'XXI', 'XXII']`.

```js
romanNumerals.push(twentyThree);
```

`romanNumerals` would have the value `['XIX', 'XX', 'XXI', 'XXII', 'XXIII']`. Notice that we can also pass variables, which allows us even greater flexibility in dynamically modifying our array's data.

## Instructions

We have defined a function, `mixedNumbers`, which we are passing an array as an argument. Modify the function by using `push()` and `unshift()` to add `'I', 2, 'three'` to the beginning of the array and `7, 'VIII', 9` to the end so that the returned array contains representations of the numbers 1-9 in order.

## Starter Code

```html
function mixedNumbers(arr) {
  // Only change code below this line

  // Only change code above this line
  return arr;
}

console.log(mixedNumbers(['IV', 5, 'six']));
```

## Hints

1. `mixedNumbers(["IV", 5, "six"])` should now return `["I", 2, "three", "IV", 5, "six", 7, "VIII", 9]`
2. The `mixedNumbers` function should utilize the `push()` method
3. The `mixedNumbers` function should utilize the `unshift()` method

## Solution

```html
```js
function mixedNumbers(arr) {
  arr.push(7,'VIII',9);
  arr.unshift('I',2,'three');
  return arr;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d78b2367417b2b2512b0e*
