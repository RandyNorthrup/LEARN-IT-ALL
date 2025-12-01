---
id: lesson-031-008
title: Verify an Object's Constructor with instanceof
chapterId: chapter-31
order: 8
duration: 5
objectives:
  - Verify an Object's Constructor with instanceof
---

# Verify an Object's Constructor with instanceof

Anytime a constructor function creates a new object, that object is said to be an <dfn>instance</dfn> of its constructor. JavaScript gives a convenient way to verify this with the `instanceof` operator. `instanceof` allows you to compare an object to a constructor, returning `true` or `false` based on whether or not that object was created with the constructor. Here's an example:

```js
let Bird = function(name, color) {
  this.name = name;
  this.color = color;
  this.numLegs = 2;
}

let crow = new Bird("Alexis", "black");

crow instanceof Bird;
```

This `instanceof` method would return `true`.

If an object is created without using a constructor, `instanceof` will verify that it is not an instance of that constructor:

```js
let canary = {
  name: "Mildred",
  color: "Yellow",
  numLegs: 2
};

canary instanceof Bird;
```

This `instanceof` method would return `false`.

## Instructions

Create a new instance of the `House` constructor, calling it `myHouse` and passing a number of bedrooms. Then, use `instanceof` to verify that it is an instance of `House`.

## Starter Code

```html
function House(numBedrooms) {
  this.numBedrooms = numBedrooms;
}

// Only change code below this line
```

## Hints

1. `myHouse` should have a `numBedrooms` attribute set to a number.
2. You should verify that `myHouse` is an instance of `House` using the `instanceof` operator.

## Solution

```html
```js
function House(numBedrooms) {
  this.numBedrooms = numBedrooms;
}
const myHouse = new House(4);
console.log(myHouse instanceof House);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7dae367417b2b2512b7a*
