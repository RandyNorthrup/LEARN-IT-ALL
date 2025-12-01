---
id: lesson-031-006
title: Use a Constructor to Create Objects
chapterId: chapter-31
order: 6
duration: 5
objectives:
  - Use a Constructor to Create Objects
---

# Use a Constructor to Create Objects

Here's the `Bird` constructor from the previous challenge:

```js
function Bird() {
  this.name = "Albert";
  this.color  = "blue";
  this.numLegs = 2;
}

let blueBird = new Bird();
```

**NOTE:** `this` inside the constructor always refers to the object being created.

Notice that the `new` operator is used when calling a constructor. This tells JavaScript to create a new instance of `Bird` called `blueBird`. Without the `new` operator, `this` inside the constructor would not point to the newly created object, giving unexpected results. Now `blueBird` has all the properties defined inside the `Bird` constructor:

```js
blueBird.name;
blueBird.color;
blueBird.numLegs;
```

Just like any other object, its properties can be accessed and modified:

```js
blueBird.name = 'Elvira';
blueBird.name;
```

## Instructions

Use the `Dog` constructor from the last lesson to create a new instance of `Dog`, assigning it to a variable `hound`.

## Starter Code

```html
function Dog() {
  this.name = "Rupert";
  this.color = "brown";
  this.numLegs = 4;
}
// Only change code below this line
```

## Hints

1. `hound` should be created using the `Dog` constructor.
2. Your code should use the `new` operator to create an instance of `Dog`.

## Solution

```html
```js
function Dog() {
  this.name = "Rupert";
  this.color = "brown";
  this.numLegs = 4;
}
const hound = new Dog();
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7dad367417b2b2512b78*
