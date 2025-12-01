---
id: lesson-006-016
title: Use class Syntax to Define a Constructor Function
chapterId: chapter-06
order: 16
duration: 5
objectives:
  - Use class Syntax to Define a Constructor Function
---

# Use class Syntax to Define a Constructor Function

ES6 provides a new syntax to create objects, using the <dfn>class</dfn> keyword.

In ES5, an object can be created by defining a `constructor` function and using the `new` keyword to instantiate the object.

In ES6, a `class` declaration has a `constructor` method that is invoked with the `new` keyword. If the `constructor` method is not explicitly defined, then it is implicitly defined with no arguments.

```js
// Explicit constructor
class SpaceShuttle {
  constructor(targetPlanet) {
    this.targetPlanet = targetPlanet;
  }
  takeOff() {
    console.log("To " + this.targetPlanet + "!");
  }
}

// Implicit constructor 
class Rocket {
  launch() {
    console.log("To the moon!");
  }
}

const zeus = new SpaceShuttle('Jupiter');
// prints To Jupiter! in console
zeus.takeOff();

const atlas = new Rocket();
// prints To the moon! in console
atlas.launch();
```

It should be noted that the `class` keyword declares a new function, to which a constructor is added. This constructor is invoked when `new` is called to create a new object.

**Note:** UpperCamelCase should be used by convention for ES6 class names, as in `SpaceShuttle` used above.

The `constructor` method is a special method for creating and initializing an object created with a class. You will learn more about it in the Object Oriented Programming section of the JavaScript Algorithms And Data Structures Certification.

## Instructions

Use the `class` keyword and write a `constructor` to create the `Vegetable` class.

The `Vegetable` class allows you to create a vegetable object with a property `name` that gets passed to the `constructor`.

## Starter Code

```html
// Only change code below this line

// Only change code above this line

const carrot = new Vegetable('carrot');
console.log(carrot.name); // Should display 'carrot'
```

## Hints

1. `Vegetable` should be a `class` with a defined `constructor` method.
2. The `class` keyword should be used.
3. `Vegetable` should be able to be instantiated.
4. `carrot.name` should return `carrot`.

## Solution

```html
```js
class Vegetable {
  constructor(name) {
    this.name = name;
  }
}
const carrot = new Vegetable('carrot');
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b8b367417b2b2512b53*
