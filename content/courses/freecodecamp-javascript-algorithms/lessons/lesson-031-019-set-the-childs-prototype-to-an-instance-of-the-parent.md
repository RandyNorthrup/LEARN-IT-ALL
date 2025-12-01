---
id: lesson-031-019
title: Set the Child's Prototype to an Instance of the Parent
chapterId: chapter-31
order: 19
duration: 5
objectives:
  - Set the Child's Prototype to an Instance of the Parent
---

# Set the Child's Prototype to an Instance of the Parent

In the previous challenge you saw the first step for inheriting behavior from the supertype (or parent) `Animal`: making a new instance of `Animal`.

This challenge covers the next step: set the `prototype` of the subtype (or child)—in this case, `Bird`—to be an instance of `Animal`.

```js
Bird.prototype = Object.create(Animal.prototype);
```

Remember that the `prototype` is like the "recipe" for creating an object. In a way, the recipe for `Bird` now includes all the key "ingredients" from `Animal`.

```js
let duck = new Bird("Donald");
duck.eat();
```

`duck` inherits all of `Animal`'s properties, including the `eat` method.

## Instructions

Modify the code so that instances of `Dog` inherit from `Animal`.

## Starter Code

```html
function Animal() { }

Animal.prototype = {
  constructor: Animal,
  eat: function() {
    console.log("nom nom nom");
  }
};

function Dog() { }

// Only change code below this line


let beagle = new Dog();
```

## Hints

1. `Dog.prototype` should be an instance of `Animal`.

## Solution

```html
```js
function Animal() { }

Animal.prototype = {
  constructor: Animal,
  eat: function() {
    console.log("nom nom nom");
  }
};

function Dog() { }
Dog.prototype = Object.create(Animal.prototype);

let beagle = new Dog();
beagle.eat();
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db1367417b2b2512b85*
