---
id: lesson-001-001
title: Implement Selection Sort
chapterId: chapter-01
order: 1
duration: 5
objectives:
  - Implement Selection Sort
---

# Implement Selection Sort

Here we will implement selection sort. Selection sort works by selecting the minimum value in a list and swapping it with the first value in the list. It then starts at the second position, selects the smallest value in the remaining list, and swaps it with the second element. It continues iterating through the list and swapping elements until it reaches the end of the list. Now the list is sorted. Selection sort has quadratic time complexity in all cases.

**Instructions**: Write a function `selectionSort` which takes an array of integers as input and returns an array of these integers in sorted order from least to greatest.

## Starter Code

```html
function selectionSort(array) {
  // Only change code below this line
  return array;
  // Only change code above this line
}
```

## Hints

1. `selectionSort` should be a function.
2. `selectionSort` should return a sorted array (least to greatest).
3. assert.isTrue(
  isSorted(
    selectionSort([
      1,
      4,
      2,
      8,
      345,
      123,
      43,
      32,
      5643,
      63,
      123,
      43,
      2,
      55,
      1,
      234,
      92
    ])
  )
);
4. `selectionSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92])` should return an array that is unchanged except for order.
5. `selectionSort` should not use the built-in `.sort()` method.

## Solution

```html
```js
function selectionSort(array) {
  for (let i = 0; i < array.length-1; i++) {
    let minimumIndex = i;
    for (let j = i+1; j < array.length; j++){
      if (array[j] < array[minimumIndex]) {
        minimumIndex = j;
      }
    }
    let value = array[minimumIndex];
    array[minimumIndex] = array[i];
    array[i] = value;
  }
    return array;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8259367417b2b2512c85*
