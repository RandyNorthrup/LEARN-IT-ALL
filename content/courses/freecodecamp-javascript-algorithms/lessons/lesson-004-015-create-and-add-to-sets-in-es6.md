---
id: lesson-004-015
title: Create and Add to Sets in ES6
chapterId: chapter-04
order: 15
duration: 5
objectives:
  - Create and Add to Sets in ES6
---

# Create and Add to Sets in ES6

Now that you have worked through ES5, you are going to perform something similar in ES6. This will be considerably easier. ES6 contains a built-in data structure `Set` so many of the operations you wrote by hand are now included for you. Let's take a look:

To create a new empty set:

```js
var set = new Set();
```

You can create a set with a value:

```js
var set = new Set(1);
```

You can create a set with an array:

```js
var set = new Set([1, 2, 3]);
```

Once you have created a set, you can add the values you wish using the `add` method:

```js
var set = new Set([1, 2, 3]);
set.add([4, 5, 6]);
```

As a reminder, a set is a data structure that cannot contain duplicate values:

```js
var set = new Set([1, 2, 3, 1, 2, 3]);
// set contains [1, 2, 3] only
```

## Instructions

For this exercise, return a set with the following values: `1, 2, 3, 'Taco', 'Cat', 'Awesome'`

## Starter Code

```html
function checkSet() {
  var set = new Set([1, 2, 3, 3, 2, 1, 2, 3, 1]);
  // Only change code below this line

  // Only change code above this line
  console.log(Array.from(set));
  return set;
}

checkSet();
```

## Hints

1. Your `Set` should only contain the values `1, 2, 3, Taco, Cat, Awesome`.

## Solution

```html
```js
function checkSet(){var set = new Set([1,2,3,'Taco','Cat','Awesome']);
return set;}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8254367417b2b2512c70*
