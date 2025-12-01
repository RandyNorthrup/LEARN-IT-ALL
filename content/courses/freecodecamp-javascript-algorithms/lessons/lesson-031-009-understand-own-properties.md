---
id: lesson-031-009
title: Understand Own Properties
chapterId: chapter-31
order: 9
duration: 5
objectives:
  - Understand Own Properties
---

# Understand Own Properties

In the following example, the `Bird` constructor defines two properties: `name` and `numLegs`:

```js
function Bird(name) {
  this.name = name;
  this.numLegs = 2;
}

let duck = new Bird("Donald");
let canary = new Bird("Tweety");
```

`name` and `numLegs` are called <dfn>own properties</dfn>, because they are defined directly on the instance object. That means that `duck` and `canary` each has its own separate copy of these properties. In fact every instance of `Bird` will have its own copy of these properties. The following code adds all of the own properties of `duck` to the array `ownProps`:

```js
let ownProps = [];

for (let property in duck) {
  if(duck.hasOwnProperty(property)) {
    ownProps.push(property);
  }
}

console.log(ownProps);
```

The console would display the value `["name", "numLegs"]`.

## Instructions

Add the own properties of `canary` to the array `ownProps`.

## Starter Code

```html
function Bird(name) {
  this.name = name;
  this.numLegs = 2;
}

let canary = new Bird("Tweety");
let ownProps = [];
// Only change code below this line
```

## Hints

1. `ownProps` should include the values `numLegs` and `name`.
2. You should solve this challenge without using the built in method `Object.keys()`.
3. You should solve this challenge without hardcoding the `ownProps` array.

## Solution

```html
```js
function Bird(name) {
  this.name = name;
  this.numLegs = 2;
}

let canary = new Bird("Tweety");
function getOwnProps (obj) {
  const props = [];

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      props.push(prop);
    }
  }

  return props;
}

const ownProps = getOwnProps(canary);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7dae367417b2b2512b7b*
