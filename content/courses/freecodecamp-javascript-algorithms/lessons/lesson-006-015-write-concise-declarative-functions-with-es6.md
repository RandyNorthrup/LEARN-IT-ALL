---
id: lesson-006-015
title: Write Concise Declarative Functions with ES6
chapterId: chapter-06
order: 15
duration: 5
objectives:
  - Write Concise Declarative Functions with ES6
---

# Write Concise Declarative Functions with ES6

When defining functions within objects in ES5, we have to use the keyword `function` as follows:

```js
const person = {
  name: "Taylor",
  sayHello: function() {
    return `Hello! My name is ${this.name}.`;
  }
};
```

With ES6, you can remove the `function` keyword and colon altogether when defining functions in objects. Here's an example of this syntax:

```js
const person = {
  name: "Taylor",
  sayHello() {
    return `Hello! My name is ${this.name}.`;
  }
};
```

## Instructions

Refactor the function `setGear` inside the object `bicycle` to use the shorthand syntax described above.

## Starter Code

```html
// Only change code below this line
const bicycle = {
  gear: 2,
  setGear: function(newGear) {
    this.gear = newGear;
  }
};
// Only change code above this line
bicycle.setGear(3);
console.log(bicycle.gear);
```

## Hints

1. Traditional function expression should not be used.
2. `setGear` should be a declarative function.
3. `bicycle.setGear(48)` should change the `gear` value to 48.

## Solution

```html
```js
const bicycle = {
  gear: 2,
  // setGear: function(newGear) {
  setGear(newGear) {
    this.gear = newGear;
  }
};
bicycle.setGear(3);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b8b367417b2b2512b50*
