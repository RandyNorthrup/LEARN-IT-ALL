---
id: lesson-003-019
title: Use an Array to Store a Collection of Data
chapterId: chapter-03
order: 19
duration: 5
objectives:
  - Use an Array to Store a Collection of Data
---

# Use an Array to Store a Collection of Data

The below is an example of the simplest implementation of an array data structure. This is known as a <dfn>one-dimensional array</dfn>, meaning it only has one level, or that it does not have any other arrays nested within it. Notice it contains <dfn>booleans</dfn>, <dfn>strings</dfn>, and <dfn>numbers</dfn>, among other valid JavaScript data types:

```js
let simpleArray = ['one', 2, 'three', true, false, undefined, null];
console.log(simpleArray.length);
```

The `console.log` call displays `7`.

All arrays have a length property, which as shown above, can be very easily accessed with the syntax `Array.length`. A more complex implementation of an array can be seen below. This is known as a <dfn>multi-dimensional array</dfn>, or an array that contains other arrays. Notice that this array also contains JavaScript <dfn>objects</dfn>, which we will examine very closely in our next section, but for now, all you need to know is that arrays are also capable of storing complex objects.

```js
let complexArray = [
  [
    {
      one: 1,
      two: 2
    },
    {
      three: 3,
      four: 4
    }
  ],
  [
    {
      a: "a",
      b: "b"
    },
    {
      c: "c",
      d: "d"
    }
  ]
];
```

## Instructions

We have defined a variable called `yourArray`. Complete the statement by assigning an array of at least 5 elements in length to the `yourArray` variable. Your array should contain at least one <dfn>string</dfn>, one <dfn>number</dfn>, and one <dfn>boolean</dfn>.

## Starter Code

```html
let yourArray; // Change this line
```

## Hints

1. `yourArray` should be an array.
2. `yourArray` should be at least 5 elements long.
3. `yourArray` should contain at least one `boolean`.
4. `yourArray` should contain at least one `number`.
5. `yourArray` should contain at least one `string`.

## Solution

```html
```js
let yourArray = ['a string', 100, true, ['one', 2], 'another string'];
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b7e367417b2b2512b20*
