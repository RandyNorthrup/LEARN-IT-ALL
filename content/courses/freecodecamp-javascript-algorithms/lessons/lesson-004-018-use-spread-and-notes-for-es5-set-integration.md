---
id: lesson-004-018
title: Use Spread and Notes for ES5 Set() Integration
chapterId: chapter-04
order: 18
duration: 5
objectives:
  - Use Spread and Notes for ES5 Set() Integration
---

# Use Spread and Notes for ES5 Set() Integration

Do you remember the ES6 spread operator `...`?

`...` can take iterable objects in ES6 and turn them into arrays.

Let's create a Set, and check out the spread function.

```js
var set = new Set([1,2,3]);
var setToArr = [...set]
console.log(setToArr) // returns [ 1, 2, 3 ]
```

## Instructions

In this exercise we will pass a set object to the `checkSet` function. It should return an array containing the values of the Set.

Now you've successfully learned how to use the ES6 `Set()` object, good job!

## Starter Code

```html
function checkSet(set){
   // Only change code below this line

   // Only change code above this line
}
```

## Hints

1. `checkSet(new Set([1,2,3,4,5,6,7])` should return `[1, 2, 3, 4, 5, 6, 7]`.

## Solution

```html
```js
function checkSet(set){
return [...set];}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8255367417b2b2512c73*
