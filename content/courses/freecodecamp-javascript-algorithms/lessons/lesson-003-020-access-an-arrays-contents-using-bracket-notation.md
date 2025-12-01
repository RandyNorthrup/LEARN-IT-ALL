---
id: lesson-003-020
title: Access an Array's Contents Using Bracket Notation
chapterId: chapter-03
order: 20
duration: 5
objectives:
  - Access an Array's Contents Using Bracket Notation
---

# Access an Array's Contents Using Bracket Notation

The fundamental feature of any data structure is, of course, the ability to not only store data, but to be able to retrieve that data on command. So, now that we've learned how to create an array, let's begin to think about how we can access that array's information.

When we define a simple array as seen below, there are 3 items in it:

```js
let ourArray = ["a", "b", "c"];
```

In an array, each array item has an <dfn>index</dfn>. This index doubles as the position of that item in the array, and how you reference it. However, it is important to note, that JavaScript arrays are <dfn>zero-indexed</dfn>, meaning that the first element of an array is actually at the ***zeroth*** position, not the first. In order to retrieve an element from an array we can enclose an index in brackets and append it to the end of an array, or more commonly, to a variable which references an array object. This is known as <dfn>bracket notation</dfn>. For example, if we want to retrieve the `a` from `ourArray` and assign it to a variable, we can do so with the following code:

```js
let ourVariable = ourArray[0];
```

Now `ourVariable` has the value of `a`.

In addition to accessing the value associated with an index, you can also *set* an index to a value using the same notation:

```js
ourArray[1] = "not b anymore";
```

Using bracket notation, we have now reset the item at index 1 from the string `b`, to `not b anymore`. Now `ourArray` is `["a", "not b anymore", "c"]`.

## Instructions

In order to complete this challenge, set the 2nd position (index `1`) of `myArray` to anything you want, besides the letter `b`.

## Starter Code

```html
let myArray = ["a", "b", "c", "d"];
// Only change code below this line

// Only change code above this line
console.log(myArray);
```

## Hints

1. `myArray[0]` should be equal to the letter `a`
2. `myArray[1]` should not be equal to the letter `b`
3. `myArray[2]` should be equal to the letter `c`
4. `myArray[3]` should be equal to the letter `d`

## Solution

```html
```js
let myArray = ["a", "b", "c", "d"];
myArray[1] = "e";
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 5a661e0f1068aca922b3ef17*
