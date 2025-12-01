---
id: lesson-031-005
title: Define a Constructor Function
chapterId: chapter-31
order: 5
duration: 5
objectives:
  - Define a Constructor Function
---

# Define a Constructor Function

<dfn>Constructors</dfn> are functions that create new objects. They define properties and behaviors that will belong to the new object. Think of them as a blueprint for the creation of new objects.

Here is an example of a constructor:

```js
function Bird() {
  this.name = "Albert";
  this.color = "blue";
  this.numLegs = 2;
}
```

This constructor defines a `Bird` object with properties `name`, `color`, and `numLegs` set to Albert, blue, and 2, respectively. Constructors follow a few conventions:

<ul><li>Constructors are defined with a capitalized name to distinguish them from other functions that are not <code>constructors</code>.</li><li>Constructors use the keyword <code>this</code> to set properties of the object they will create. Inside the constructor, <code>this</code> refers to the new object it will create.</li><li>Constructors define properties and behaviors instead of returning a value as other functions might.</li></ul>

## Instructions

Create a constructor, `Dog`, with properties `name`, `color`, and `numLegs` that are set to a string, a string, and a number, respectively.

## Hints

1. `Dog` should have a `name` property set to a string.
2. `Dog` should have a `color` property set to a string.
3. `Dog` should have a `numLegs` property set to a number.

## Solution

```html
```js
function Dog (name, color, numLegs) {
  this.name = 'name';
  this.color = 'color';
  this.numLegs = 4;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7dad367417b2b2512b77*
