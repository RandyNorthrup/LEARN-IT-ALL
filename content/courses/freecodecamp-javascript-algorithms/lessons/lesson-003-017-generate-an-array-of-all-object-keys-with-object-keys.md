---
id: lesson-003-017
title: Generate an Array of All Object Keys with Object.keys()
chapterId: chapter-03
order: 17
duration: 5
objectives:
  - Generate an Array of All Object Keys with Object.keys()
---

# Generate an Array of All Object Keys with Object.keys()

We can also generate an array which contains all the keys stored in an object with the `Object.keys()` method. This method takes an object as the argument and returns an array of strings representing each property in the object. Again, there will be no specific order to the entries in the array.

## Instructions

Finish writing the `getArrayOfUsers` function so that it returns an array containing all the properties in the object it receives as an argument.

## Starter Code

```html
let users = {
  Alan: {
    age: 27,
    online: false
  },
  Jeff: {
    age: 32,
    online: true
  },
  Sarah: {
    age: 48,
    online: false
  },
  Ryan: {
    age: 19,
    online: true
  }
};

function getArrayOfUsers(obj) {
  // Only change code below this line

  // Only change code above this line
}

console.log(getArrayOfUsers(users));
```

## Hints

1. The `users` object should only contain the keys `Alan`, `Jeff`, `Sarah`, and `Ryan`
2. The `getArrayOfUsers` function should return an array which contains all the keys in the `users` object

## Solution

```html
```js
let users = {
  Alan: {
    age: 27,
    online: false
  },
  Jeff: {
    age: 32,
    online: true
  },
  Sarah: {
    age: 48,
    online: false
  },
  Ryan: {
    age: 19,
    online: true
  }
};

function getArrayOfUsers(obj) {
  return Object.keys(obj);
}

console.log(getArrayOfUsers(users));
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b7d367417b2b2512b1e*
