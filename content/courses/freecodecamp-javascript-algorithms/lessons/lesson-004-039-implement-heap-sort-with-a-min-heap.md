---
id: lesson-004-039
title: Implement Heap Sort with a Min Heap
chapterId: chapter-04
order: 39
duration: 5
objectives:
  - Implement Heap Sort with a Min Heap
---

# Implement Heap Sort with a Min Heap

Now that we can add and remove elements let's see some of the applications heaps can be used for. Heaps are commonly used to implement priority queues because they always store an item of greatest or least value in first position. In addition, they are used to implement a sorting algorithm called heap sort. We'll see how to do this here. Heap sort uses a min heap, the reverse of a max heap. A min heap always stores the element of least value in the root position.

Heap sort works by taking an unsorted array, adding each item in the array into a min heap, and then extracting every item out of the min heap into a new array. The min heap structure ensures that the new array will contain the original items in least to greatest order. This is one of the most efficient sorting algorithms with average and worst case performance of O(nlog(n)).

## Instructions

Let's implement heap sort with a min heap. Feel free to adapt your max heap code here. Create an object `MinHeap` with `insert`, `remove`, and `sort` methods. The `sort` method should return an array of all the elements in the min heap sorted from smallest to largest.

## Starter Code

```html
function isSorted(a){
  for(let i = 0; i < a.length - 1; i++)
    if(a[i] > a[i + 1])
      return false;
  return true;
}
// Generate a randomly filled array
function createRandomArray(size = 5){
  let a = new Array(size);
  for(let i = 0; i < size; i++)
    a[i] = Math.floor(Math.random() * 100);
  
  return a;
}
const array = createRandomArray(25);

var MinHeap = function() {
  // Only change code below this line
  
  // Only change code above this line
};
```

## Hints

1. The `MinHeap` data structure should exist.
2. `MinHeap` should have a method called `insert`.
3. `MinHeap` should have a method called `remove`.
4. `MinHeap` should have a method called `sort`.
5. The `sort` method should return an array containing all items added to the min heap in sorted order.
6. const heap = new MinHeap();
    const arr = createRandomArray(25);
7. for (let i of arr) {
      heap.insert(i);
    }
8. const result = heap.sort();
    arr.sort((a, b) => a - b);
9. for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== result[i]) {
        return false;
      }
    }
    return true;
  })()
);

## Solution

```html
```js
// solution required
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d825b367417b2b2512c8c*
