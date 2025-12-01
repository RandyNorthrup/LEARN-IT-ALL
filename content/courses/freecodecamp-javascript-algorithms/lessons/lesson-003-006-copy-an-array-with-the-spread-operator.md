---
id: lesson-003-006
title: Copy an Array with the Spread Operator
chapterId: chapter-03
order: 6
duration: 5
objectives:
  - Copy an Array with the Spread Operator
---

# Copy an Array with the Spread Operator

While `slice()` allows us to be selective about what elements of an array to copy, among several other useful tasks, ES6's new <dfn>spread operator</dfn> allows us to easily copy *all* of an array's elements, in order, with a simple and highly readable syntax. The spread syntax simply looks like this: `...`

In practice, we can use the spread operator to copy an array like so:

```js
let thisArray = [true, true, undefined, false, null];
let thatArray = [...thisArray];
```

`thatArray` equals `[true, true, undefined, false, null]`. `thisArray` remains unchanged and `thatArray` contains the same elements as `thisArray`.

## Instructions

We have defined a function, `copyMachine` which takes `arr` (an array) and `num` (a number) as arguments. The function is supposed to return a new array made up of `num` copies of `arr`. We have done most of the work for you, but it doesn't work quite right yet. Modify the function using spread syntax so that it works correctly (hint: another method we have already covered might come in handy here!).

## Starter Code

```html
function copyMachine(arr, num) {
  let newArr = [];
  while (num >= 1) {
    // Only change code below this line

    // Only change code above this line
    num--;
  }
  return newArr;
}

console.log(copyMachine([true, false, true], 2));
```

## Hints

1. `copyMachine([true, false, true], 2)` should return `[[true, false, true], [true, false, true]]`
2. `copyMachine([1, 2, 3], 5)` should return `[[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]]`
3. `copyMachine([true, true, null], 1)` should return `[[true, true, null]]`
4. `copyMachine(["it works"], 3)` should return `[["it works"], ["it works"], ["it works"]]`
5. The `copyMachine` function should utilize the `spread operator` with array `arr`

## Solution

```html
```js
function copyMachine(arr,num){
    let newArr=[];
    while(num >=1){
    newArr.push([...arr]);
    num--;
    }
    return newArr;
}
console.log(copyMachine([true, false, true], 2));
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b7b367417b2b2512b13*
