---
id: lesson-031-014
title: Remember to Set the Constructor Property when Changing the Prototype
chapterId: chapter-31
order: 14
duration: 5
objectives:
  - Remember to Set the Constructor Property when Changing the Prototype
---

# Remember to Set the Constructor Property when Changing the Prototype

There is one crucial side effect of manually setting the prototype to a new object. It erases the `constructor` property! This property can be used to check which constructor function created the instance, but since the property has been overwritten, it now gives false results:

```js
duck.constructor === Bird;
duck.constructor === Object;
duck instanceof Bird;
```

In order, these expressions would evaluate to `false`, `true`, and `true`.

To fix this, whenever a prototype is manually set to a new object, remember to define the `constructor` property:

```js
Bird.prototype = {
  constructor: Bird,
  numLegs: 2,
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name); 
  }
};
```

## Instructions

Define the `constructor` property on the `Dog` `prototype`.

## Starter Code

```html
function Dog(name) {
  this.name = name;
}

// Only change code below this line
Dog.prototype = {

  numLegs: 4,
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name);
  }
};
```

## Hints

1. `Dog.prototype` should set the `constructor` property.

## Solution

```html
```js
function Dog(name) {
  this.name = name;
}
Dog.prototype = {
  constructor: Dog,
  numLegs: 4,
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name);
  }
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7daf367417b2b2512b80*
