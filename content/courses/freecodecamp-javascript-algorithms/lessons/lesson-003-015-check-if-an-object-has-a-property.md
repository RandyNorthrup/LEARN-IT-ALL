---
id: lesson-003-015
title: Check if an Object has a Property
chapterId: chapter-03
order: 15
duration: 5
objectives:
  - Check if an Object has a Property
---

# Check if an Object has a Property

Now we can add, modify, and remove keys from objects. But what if we just wanted to know if an object has a specific property? JavaScript provides us with two different ways to do this. One uses the `hasOwnProperty()` method and the other uses the `in` keyword. If we have an object `users` with a property of `Alan`, we could check for its presence in either of the following ways:

```js
users.hasOwnProperty('Alan');
'Alan' in users;
```

Both of these would return `true`.

## Instructions

Finish writing the function so that it returns `true` if the object passed to it contains all four names, `Alan`, `Jeff`, `Sarah` and `Ryan` and returns `false` otherwise.

## Starter Code

```html
let users = {
  Alan: {
    age: 27,
    online: true
  },
  Jeff: {
    age: 32,
    online: true
  },
  Sarah: {
    age: 48,
    online: true
  },
  Ryan: {
    age: 19,
    online: true
  }
};

function isEveryoneHere(userObj) {
  // Only change code below this line
  
  // Only change code above this line
}

console.log(isEveryoneHere(users));
```

## Hints

1. The `users` object should not be accessed directly
2. assert(__helpers.removeJSComments(code).match(/users/gm).length <= 2)
3. The `users` object should only contain the keys `Alan`, `Jeff`, `Sarah`, and `Ryan`
4. The function `isEveryoneHere` should return `true` if `Alan`, `Jeff`, `Sarah`, and `Ryan` are properties on the object passed to it.
5. The function `isEveryoneHere` should return `false` if `Alan` is not a property on the object passed to it.
6. The function `isEveryoneHere` should return `false` if `Jeff` is not a property on the object passed to it.
7. The function `isEveryoneHere` should return `false` if `Sarah` is not a property on the object passed to it.
8. The function `isEveryoneHere` should return `false` if `Ryan` is not a property on the object passed to it.

## Solution

```html
```js
let users = {
  Alan: {
    age: 27,
    online: true
  },
  Jeff: {
    age: 32,
    online: true
  },
  Sarah: {
    age: 48,
    online: true
  },
  Ryan: {
    age: 19,
    online: true
  }
};

function isEveryoneHere(userObj) {
  return [
    'Alan',
    'Jeff',
    'Sarah',
    'Ryan'
  ].every(user => userObj.hasOwnProperty(user));
}

console.log(isEveryoneHere(users));
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b7d367417b2b2512b1c*
