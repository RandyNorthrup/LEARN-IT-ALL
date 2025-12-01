---
id: lesson-031-015
title: Understand Where an Object’s Prototype Comes From
chapterId: chapter-31
order: 15
duration: 5
objectives:
  - Understand Where an Object’s Prototype Comes From
---

# Understand Where an Object’s Prototype Comes From

Just like people inherit genes from their parents, an object inherits its `prototype` directly from the constructor function that created it. For example, here the `Bird` constructor creates the `duck` object:

```js
function Bird(name) {
  this.name = name;
}

let duck = new Bird("Donald");
```

`duck` inherits its `prototype` from the `Bird` constructor function. You can show this relationship with the `isPrototypeOf` method:

```js
Bird.prototype.isPrototypeOf(duck);
```

This would return `true`.

## Instructions

Use `isPrototypeOf` to check the `prototype` of `beagle`.

## Starter Code

```html
function Dog(name) {
  this.name = name;
}

let beagle = new Dog("Snoopy");

// Only change code below this line
```

## Hints

1. You should show that `Dog.prototype` is the `prototype` of `beagle`

## Solution

```html
```js
function Dog(name) {
  this.name = name;
}
let beagle = new Dog("Snoopy");
Dog.prototype.isPrototypeOf(beagle);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db0367417b2b2512b81*
