---
id: lesson-004-016
title: Remove items from a set in ES6
chapterId: chapter-04
order: 16
duration: 5
objectives:
  - Remove items from a set in ES6
---

# Remove items from a set in ES6

Let's practice removing items from an ES6 Set using the `delete` method.

First, create an ES6 Set:

```js
var set = new Set([1,2,3]);
```

Now remove an item from your Set with the `delete` method.

```js
set.delete(1);
console.log([...set]) // should return [ 2, 3 ]
```

## Instructions

Now, create a set with the integers 1, 2, 3, 4, & 5.

Remove the values 2 and 5, and then return the set.

## Starter Code

```html
function checkSet(){
  // Only change code below this line
  var set = null;

  // Only change code above this line
  return set;   
}
```

## Hints

1. Your Set should contain the values 1, 3, & 4

## Solution

```html
```js
function checkSet(){
var set = new Set([1,2,3,4,5]);
set.delete(2);
set.delete(5);
return set;}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8254367417b2b2512c71*
