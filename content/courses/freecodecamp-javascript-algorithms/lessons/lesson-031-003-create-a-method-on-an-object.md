---
id: lesson-031-003
title: Create a Method on an Object
chapterId: chapter-31
order: 3
duration: 5
objectives:
  - Create a Method on an Object
---

# Create a Method on an Object

Objects can have a special type of property, called a <dfn>method</dfn>.

Methods are properties that are functions. This adds different behavior to an object. Here is the `duck` example with a method:

```js
let duck = {
  name: "Aflac",
  numLegs: 2,
  sayName: function() {return "The name of this duck is " + duck.name + ".";}
};
duck.sayName();
```

The example adds the `sayName` method, which is a function that returns a sentence giving the name of the `duck`. Notice that the method accessed the `name` property in the return statement using `duck.name`. The next challenge will cover another way to do this.

## Instructions

Using the `dog` object, give it a method called `sayLegs`. The method should return the sentence `This dog has 4 legs.`

## Starter Code

```html
let dog = {
  name: "Spot",
  numLegs: 4,

};

dog.sayLegs();
```

## Hints

1. `dog.sayLegs()` should be a function.
2. `dog.sayLegs()` should return the given string - note that punctuation and spacing matter.

## Solution

```html
```js
let dog = {
  name: "Spot",
  numLegs: 4,
  sayLegs () {
    return 'This dog has ' + this.numLegs + ' legs.';
  }
};

dog.sayLegs();
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7dad367417b2b2512b75*
