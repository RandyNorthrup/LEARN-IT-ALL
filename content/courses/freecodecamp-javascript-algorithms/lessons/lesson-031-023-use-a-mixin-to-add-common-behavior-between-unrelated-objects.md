---
id: lesson-031-023
title: Use a Mixin to Add Common Behavior Between Unrelated Objects
chapterId: chapter-31
order: 23
duration: 5
objectives:
  - Use a Mixin to Add Common Behavior Between Unrelated Objects
---

# Use a Mixin to Add Common Behavior Between Unrelated Objects

As you have seen, behavior is shared through inheritance. However, there are cases when inheritance is not the best solution. Inheritance does not work well for unrelated objects like `Bird` and `Airplane`. They can both fly, but a `Bird` is not a type of `Airplane` and vice versa.

For unrelated objects, it's better to use <dfn>mixins</dfn>. A mixin allows other objects to use a collection of functions.

```js
let flyMixin = function(obj) {
  obj.fly = function() {
    console.log("Flying, wooosh!");
  }
};
```

The `flyMixin` takes any object and gives it the `fly` method.

```js
let bird = {
  name: "Donald",
  numLegs: 2
};

let plane = {
  model: "777",
  numPassengers: 524
};

flyMixin(bird);
flyMixin(plane);
```

Here `bird` and `plane` are passed into `flyMixin`, which then assigns the `fly` function to each object. Now `bird` and `plane` can both fly:

```js
bird.fly();
plane.fly();
```

The console would display the string `Flying, wooosh!` twice, once for each `.fly()` call.

Note how the mixin allows for the same `fly` method to be reused by unrelated objects `bird` and `plane`.

## Instructions

Create a mixin named `glideMixin` that defines a method named `glide`. Then use the `glideMixin` to give both `bird` and `boat` the ability to glide.

## Starter Code

```html
let bird = {
  name: "Donald",
  numLegs: 2
};

let boat = {
  name: "Warrior",
  type: "race-boat"
};

// Only change code below this line
```

## Hints

1. Your code should declare a `glideMixin` variable that is a function.
2. Your code should use the `glideMixin` on the `bird` object to give it the `glide` method.
3. Your code should use the `glideMixin` on the `boat` object to give it the `glide` method.

## Solution

```html
```js
let bird = {
  name: "Donald",
  numLegs: 2
};

let boat = {
  name: "Warrior",
  type: "race-boat"
};
function glideMixin (obj) {
  obj.glide = () => 'Gliding!';
}

glideMixin(bird);
glideMixin(boat);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db2367417b2b2512b89*
