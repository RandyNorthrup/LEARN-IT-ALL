---
id: lesson-006-012
title: Use Destructuring Assignment to Pass an Object as a Function's Parameters
chapterId: chapter-06
order: 12
duration: 5
objectives:
  - Use Destructuring Assignment to Pass an Object as a Function's Parameters
---

# Use Destructuring Assignment to Pass an Object as a Function's Parameters

In some cases, you can destructure the object in a function argument itself.

Consider the code below:

```js
const profileUpdate = (profileData) => {
  const { name, age, nationality, location } = profileData;

}
```

This effectively destructures the object sent into the function. This can also be done in-place:

```js
const profileUpdate = ({ name, age, nationality, location }) => {

}
```

When `profileData` is passed to the above function, the values are destructured from the function parameter for use within the function.

## Instructions

Use destructuring assignment within the argument to the function `half` to send only `max` and `min` inside the function.

## Starter Code

```html
const stats = {
  max: 56.78,
  standard_deviation: 4.34,
  median: 34.54,
  mode: 23.87,
  min: -0.75,
  average: 35.85
};

// Only change code below this line
const half = (stats) => (stats.max + stats.min) / 2.0; 
// Only change code above this line
```

## Hints

1. `stats` should be an `object`.
2. `half(stats)` should be `28.015`
3. Destructuring should be used.
4. Destructured parameter should be used.

## Solution

```html
```js
const stats = {
  max: 56.78,
  standard_deviation: 4.34,
  median: 34.54,
  mode: 23.87,
  min: -0.75,
  average: 35.85
};

const half = ( {max, min} ) => (max + min) / 2.0;
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b8a367417b2b2512b4d*
