---
id: lesson-031-020
title: Reset an Inherited Constructor Property
chapterId: chapter-31
order: 20
duration: 5
objectives:
  - Reset an Inherited Constructor Property
---

# Reset an Inherited Constructor Property

When an object inherits its `prototype` from another object, it also inherits the supertype's constructor property.

Here's an example:

```js
function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
let duck = new Bird();
duck.constructor
```

But `duck` and all instances of `Bird` should show that they were constructed by `Bird` and not `Animal`. To do so, you can manually set the constructor property of `Bird` to the `Bird` object:

```js
Bird.prototype.constructor = Bird;
duck.constructor
```

## Instructions

Fix the code so `duck.constructor` and `beagle.constructor` return their respective constructors.

## Starter Code

```html
function Animal() { }
function Bird() { }
function Dog() { }

Bird.prototype = Object.create(Animal.prototype);
Dog.prototype = Object.create(Animal.prototype);

// Only change code below this line



let duck = new Bird();
let beagle = new Dog();
```

## Hints

1. `Bird.prototype` should be an instance of `Animal`.
2. `duck.constructor` should return `Bird`.
3. `Dog.prototype` should be an instance of `Animal`.
4. `beagle.constructor` should return `Dog`.

## Solution

```html
```js
function Animal() { }
function Bird() { }
function Dog() { }
Bird.prototype = Object.create(Animal.prototype);
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Bird.prototype.constructor = Bird;
let duck = new Bird();
let beagle = new Dog();
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db1367417b2b2512b86*
