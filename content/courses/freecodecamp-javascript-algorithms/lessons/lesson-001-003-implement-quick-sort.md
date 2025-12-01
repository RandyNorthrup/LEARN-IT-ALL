---
id: lesson-001-003
title: Implement Quick Sort
chapterId: chapter-01
order: 3
duration: 5
objectives:
  - Implement Quick Sort
---

# Implement Quick Sort

Here we will move on to an intermediate sorting algorithm: quick sort. Quick sort is an efficient, recursive divide-and-conquer approach to sorting an array. In this method, a pivot value is chosen in the original array. The array is then partitioned into two subarrays of values less than and greater than the pivot value. We then combine the result of recursively calling the quick sort algorithm on both sub-arrays. This continues until the base case of an empty or single-item array is reached, which we return. The unwinding of the recursive calls return us the sorted array.

Quick sort is a very efficient sorting method, providing *O(nlog(n))* performance on average. It is also relatively easy to implement. These attributes make it a popular and useful sorting method.

**Instructions:** Write a function `quickSort` which takes an array of integers as input and returns an array of these integers in sorted order from least to greatest. While the choice of the pivot value is important, any pivot will do for our purposes here. For simplicity, the first or last element could be used.

## Starter Code

```html
function quickSort(array) {
  // Only change code below this line
  return array;
  // Only change code above this line
}
```

## Hints

1. `quickSort` should be a function.
2. `quickSort` should return a sorted array (least to greatest).
3. `quickSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92])` should return an array that is unchanged except for order.
4. `quickSort` should not use the built-in `.sort()` method.

## Solution

```html
```js
function quickSort(array) {
  if (array.length === 0) {
    return [];
  } else {
    const pivotValue = array[0];

    // Sort elements into three piles
    let lesser = [];
    let equal = [];
    let greater = [];
    for (let e of array) {
      if (e < pivotValue) {
        lesser.push(e);
      } else if (e > pivotValue) {
        greater.push(e);
      } else {
        equal.push(e);
      }
    }

    return [...quickSort(lesser), ...equal, ...quickSort(greater)];
  }
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d825a367417b2b2512c89*
