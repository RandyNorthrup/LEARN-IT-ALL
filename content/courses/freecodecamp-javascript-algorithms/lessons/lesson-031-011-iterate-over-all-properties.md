---
id: lesson-031-011
title: Iterate Over All Properties
chapterId: chapter-31
order: 11
duration: 5
objectives:
  - Iterate Over All Properties
---

# Iterate Over All Properties

You have now seen two kinds of properties: <dfn>own properties</dfn> and `prototype` properties. Own properties are defined directly on the object instance itself. And prototype properties are defined on the `prototype`.

```js
function Bird(name) {
  this.name = name;  //own property
}

Bird.prototype.numLegs = 2; // prototype property

let duck = new Bird("Donald");
```

Here is how you add `duck`'s own properties to the array `ownProps` and `prototype` properties to the array `prototypeProps`:

```js
let ownProps = [];
let prototypeProps = [];

for (let property in duck) {
  if(duck.hasOwnProperty(property)) {
    ownProps.push(property);
  } else {
    prototypeProps.push(property);
  }
}

console.log(ownProps);
console.log(prototypeProps);
```

`console.log(ownProps)` would display `["name"]` in the console, and `console.log(prototypeProps)` would display `["numLegs"]`.

## Instructions

Add all of the own properties of `beagle` to the array `ownProps`. Add all of the `prototype` properties of `Dog` to the array `prototypeProps`.

## Starter Code

```html
function Dog(name) {
  this.name = name;
}

Dog.prototype.numLegs = 4;

let beagle = new Dog("Snoopy");

let ownProps = [];
let prototypeProps = [];

// Only change code below this line
```

## Hints

1. The `ownProps` array should only contain `name`.
2. The `prototypeProps` array should only contain `numLegs`.
3. You should solve this challenge without using the built in method `Object.keys()`.

## Solution

```html
```js
function Dog(name) {
  this.name = name;
}

Dog.prototype.numLegs = 4;

let beagle = new Dog("Snoopy");

let ownProps = [];
let prototypeProps = [];
for (let prop in beagle) {
  if (beagle.hasOwnProperty(prop)) {
    ownProps.push(prop);
  } else {
    prototypeProps.push(prop);
  }
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7daf367417b2b2512b7d*
