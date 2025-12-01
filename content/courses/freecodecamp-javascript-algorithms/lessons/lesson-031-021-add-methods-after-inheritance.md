---
id: lesson-031-021
title: Add Methods After Inheritance
chapterId: chapter-31
order: 21
duration: 5
objectives:
  - Add Methods After Inheritance
---

# Add Methods After Inheritance

A constructor function that inherits its `prototype` object from a supertype constructor function can still have its own methods in addition to inherited methods.

For example, `Bird` is a constructor that inherits its `prototype` from `Animal`:

```js
function Animal() { }
Animal.prototype.eat = function() {
  console.log("nom nom nom");
};
function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
Bird.prototype.constructor = Bird;
```

In addition to what is inherited from `Animal`, you want to add behavior that is unique to `Bird` objects. Here, `Bird` will get a `fly()` function. Functions are added to `Bird's` `prototype` the same way as any constructor function:

```js
Bird.prototype.fly = function() {
  console.log("I'm flying!");
};
```

Now instances of `Bird` will have both `eat()` and `fly()` methods:

```js
let duck = new Bird();
duck.eat();
duck.fly();
```

`duck.eat()` would display the string `nom nom nom` in the console, and `duck.fly()` would display the string `I'm flying!`.

## Instructions

Add all necessary code so the `Dog` object inherits from `Animal` and the `Dog`'s `prototype` constructor is set to `Dog`. Then add a `bark()` method to the `Dog` object so that `beagle` can both `eat()` and `bark()`. The `bark()` method should print `Woof!` to the console.

## Starter Code

```html
function Animal() { }
Animal.prototype.eat = function() { console.log("nom nom nom"); };

function Dog() { }

// Only change code below this line




// Only change code above this line

let beagle = new Dog();
```

## Hints

1. `Animal` should not respond to the `bark()` method.
2. `Dog` should inherit the `eat()` method from `Animal`.
3. The `Dog` prototype should have a `bark()` method.
4. `beagle` should be an `instanceof` `Animal`.
5. The constructor for `beagle` should be set to `Dog`.
6. `beagle.eat()` should log the string `nom nom nom`
7. `beagle.bark()` should log the string `Woof!`

## Solution

```html
```js
function Animal() { }
Animal.prototype.eat = function() { console.log("nom nom nom"); };

function Dog() { }
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function () {
  console.log('Woof!');
};
let beagle = new Dog();

beagle.eat();
beagle.bark();
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db1367417b2b2512b87*
