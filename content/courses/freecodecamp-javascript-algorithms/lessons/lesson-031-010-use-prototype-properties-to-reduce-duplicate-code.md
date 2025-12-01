---
id: lesson-031-010
title: Use Prototype Properties to Reduce Duplicate Code
chapterId: chapter-31
order: 10
duration: 5
objectives:
  - Use Prototype Properties to Reduce Duplicate Code
---

# Use Prototype Properties to Reduce Duplicate Code

Since `numLegs` will probably have the same value for all instances of `Bird`, you essentially have a duplicated variable `numLegs` inside each `Bird` instance.

This may not be an issue when there are only two instances, but imagine if there are millions of instances. That would be a lot of duplicated variables.

A better way is to use the `prototype` of `Bird`. Properties in the `prototype` are shared among ALL instances of `Bird`. Here's how to add `numLegs` to the `Bird prototype`:

```js
Bird.prototype.numLegs = 2;
```

Now all instances of `Bird` have the `numLegs` property.

```js
console.log(duck.numLegs);
console.log(canary.numLegs);
```

Since all instances automatically have the properties on the `prototype`, think of a `prototype` as a "recipe" for creating objects. Note that the `prototype` for `duck` and `canary` is part of the `Bird` constructor as `Bird.prototype`.

## Instructions

Add a `numLegs` property to the `prototype` of `Dog`

## Starter Code

```html
function Dog(name) {
  this.name = name;
}



// Only change code above this line
let beagle = new Dog("Snoopy");
```

## Hints

1. `beagle` should have a `numLegs` property.
2. `beagle.numLegs` should be a number.
3. `numLegs` should be a `prototype` property not an own property.

## Solution

```html
```js
function Dog (name) {
  this.name = name;
}
Dog.prototype.numLegs = 4;
let beagle = new Dog("Snoopy");
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7dae367417b2b2512b7c*
