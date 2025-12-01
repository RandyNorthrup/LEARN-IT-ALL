---
id: lesson-007-019
title: Combine an Array into a String Using the join Method
chapterId: chapter-07
order: 19
duration: 5
objectives:
  - Combine an Array into a String Using the join Method
---

# Combine an Array into a String Using the join Method

The `join` method is used to join the elements of an array together to create a string. It takes an argument for the delimiter that is used to separate the array elements in the string.

Here's an example:

```js
const arr = ["Hello", "World"];
const str = arr.join(" ");
```

`str` would have a value of the string `Hello World`.

## Instructions

Use the `join` method (among others) inside the `sentensify` function to make a sentence from the words in the string `str`. The function should return a string. For example, `I-like-Star-Wars` would be converted to `I like Star Wars`. For this challenge, do not use the `replace` method.

## Starter Code

```html
function sentensify(str) {
  // Only change code below this line


  // Only change code above this line
}

sentensify("May-the-force-be-with-you");
```

## Hints

1. Your code should use the `join` method.
2. Your code should not use the `replace` method.
3. `sentensify("May-the-force-be-with-you")` should return a string.
4. `sentensify("May-the-force-be-with-you")` should return the string `May the force be with you`.
5. `sentensify("The.force.is.strong.with.this.one")` should return the string `The force is strong with this one`.
6. `sentensify("There,has,been,an,awakening")` should return the string `There has been an awakening`.

## Solution

```html
```js
function sentensify(str) {
  return str.split(/\W/).join(' ');
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7daa367417b2b2512b6c*
