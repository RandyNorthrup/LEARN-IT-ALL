---
id: lesson-001-002
title: Implement Insertion Sort
chapterId: chapter-01
order: 2
duration: 5
objectives:
  - Implement Insertion Sort
---

# Implement Insertion Sort

The next sorting method we'll look at is insertion sort. This method works by building up a sorted array at the beginning of the list. It begins the sorted array with the first element. Then it inspects the next element and swaps it backwards into the sorted array until it is in sorted position. It continues iterating through the list and swapping new items backwards into the sorted portion until it reaches the end. This algorithm has quadratic time complexity in the average and worst cases.

**Instructions:** Write a function `insertionSort` which takes an array of integers as input and returns an array of these integers in sorted order from least to greatest.

## Starter Code

```html
function insertionSort(array) {
  // Only change code below this line
  return array;
  // Only change code above this line
}
```

## Hints

1. `insertionSort` should be a function.
2. `insertionSort` should return a sorted array (least to greatest).
3. `insertionSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92])` should return an array that is unchanged except for order.
4. `insertionSort([5, 4, 33, 2, 8])` should return `[2, 4, 5, 8, 33]`.
5. `insertionSort` should not use the built-in `.sort()` method.

## Solution

```html
```js
function insertionSort (array) {
  for (let currentIndex = 0; currentIndex < array.length; currentIndex++) {
    let current = array[currentIndex];
    let j = currentIndex - 1;
    while (j > -1 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }
  return array;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8259367417b2b2512c86*
