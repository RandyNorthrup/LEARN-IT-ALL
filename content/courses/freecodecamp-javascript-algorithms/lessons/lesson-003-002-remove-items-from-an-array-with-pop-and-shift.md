---
id: lesson-003-002
title: Remove Items from an Array with pop() and shift()
chapterId: chapter-03
order: 2
duration: 5
objectives:
  - Remove Items from an Array with pop() and shift()
---

# Remove Items from an Array with pop() and shift()

Both `push()` and `unshift()` have corresponding methods that are nearly functional opposites: `pop()` and `shift()`. As you may have guessed by now, instead of adding, `pop()` *removes* an element from the end of an array, while `shift()` removes an element from the beginning. The key difference between `pop()` and `shift()` and their cousins `push()` and `unshift()`, is that neither method takes parameters, and each only allows an array to be modified by a single element at a time.

Let's take a look:

```js
let greetings = ['whats up?', 'hello', 'see ya!'];

greetings.pop();
```

`greetings` would have the value `['whats up?', 'hello']`.

```js
greetings.shift();
```

`greetings` would have the value `['hello']`.

We can also return the value of the removed element with either method like this:

```js
let popped = greetings.pop();
```

`greetings` would have the value `[]`, and `popped` would have the value `hello`.

## Instructions

We have defined a function, `popShift`, which takes an array as an argument and returns a new array. Modify the function, using `pop()` and `shift()`, to remove the first and last elements of the argument array, and assign the removed elements to their corresponding variables, so that the returned array contains their values.

## Starter Code

```html
function popShift(arr) {
  let popped; // Change this line
  let shifted; // Change this line
  return [shifted, popped];
}

console.log(popShift(['challenge', 'is', 'not', 'complete']));
```

## Hints

1. `popShift(["challenge", "is", "not", "complete"])` should return `["challenge", "complete"]`
2. The `popShift` function should utilize the `pop()` method
3. The `popShift` function should utilize the `shift()` method

## Solution

```html
```js
function popShift(arr) {
  let popped = arr.pop(); // Change this line
  let shifted = arr.shift(); // Change this line
  return [shifted, popped];
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d78b2367417b2b2512b0f*
