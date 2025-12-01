---
id: lesson-031-018
title: Inherit Behaviors from a Supertype
chapterId: chapter-31
order: 18
duration: 5
objectives:
  - Inherit Behaviors from a Supertype
---

# Inherit Behaviors from a Supertype

In the previous challenge, you created a `supertype` called `Animal` that defined behaviors shared by all animals:

```js
function Animal() { }
Animal.prototype.eat = function() {
  console.log("nom nom nom");
};
```

This and the next challenge will cover how to reuse the methods of `Animal` inside `Bird` and `Dog` without defining them again. It uses a technique called inheritance. This challenge covers the first step: make an instance of the `supertype` (or parent). You already know one way to create an instance of `Animal` using the `new` operator:

```js
let animal = new Animal();
```

There are some disadvantages when using this syntax for inheritance, which are too complex for the scope of this challenge. Instead, here's an alternative approach without those disadvantages:

```js
let animal = Object.create(Animal.prototype);
```

`Object.create(obj)` creates a new object, and sets `obj` as the new object's `prototype`. Recall that the `prototype` is like the "recipe" for creating an object. By setting the `prototype` of `animal` to be the `prototype` of `Animal`, you are effectively giving the `animal` instance the same "recipe" as any other instance of `Animal`.

```js
animal.eat();
animal instanceof Animal;
```

The `instanceof` method here would return `true`.

## Instructions

Use `Object.create` to make two instances of `Animal` named `duck` and `beagle`.

## Starter Code

```html
function Animal() { }

Animal.prototype = {
  constructor: Animal,
  eat: function() {
    console.log("nom nom nom");
  }
};

// Only change code below this line

let duck; // Change this line
let beagle; // Change this line
```

## Hints

1. The `duck` variable should be defined.
2. The `beagle` variable should be defined.
3. The `duck` variable should be initialised with `Object.create`.
4. The `beagle` variable should be initialised with `Object.create`.
5. `duck` should have a `prototype` of `Animal`.
6. `beagle` should have a `prototype` of `Animal`.

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
let duck = Object.create(Animal.prototype);
let beagle = Object.create(Animal.prototype);

duck.eat();
beagle.eat();
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db0367417b2b2512b84*
