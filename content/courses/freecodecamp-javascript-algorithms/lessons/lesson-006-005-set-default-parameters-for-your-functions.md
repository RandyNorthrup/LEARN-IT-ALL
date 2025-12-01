---
id: lesson-006-005
title: Set Default Parameters for Your Functions
chapterId: chapter-06
order: 5
duration: 5
objectives:
  - Set Default Parameters for Your Functions
---

# Set Default Parameters for Your Functions

In order to help us create more flexible functions, ES6 introduces <dfn>default parameters</dfn> for functions.

Check out this code:

```js
const greeting = (name = "Anonymous") => "Hello " + name;

console.log(greeting("John"));
console.log(greeting());
```

The console will display the strings `Hello John` and `Hello Anonymous`.

The default parameter kicks in when the argument is not specified (it is undefined). As you can see in the example above, the parameter `name` will receive its default value `Anonymous` when you do not provide a value for the parameter. You can add default values for as many parameters as you want.

## Instructions

Modify the function `increment` by adding default parameters so that it will add 1 to `number` if `value` is not specified.

## Starter Code

```html
// Only change code below this line
const increment = (number, value) => number + value;
// Only change code above this line
```

## Hints

1. The result of `increment(5, 2)` should be `7`.
2. The result of `increment(5)` should be `6`.
3. A default parameter value of `1` should be used for `value`.

## Solution

```html
```js
const increment = (number, value = 1) => number + value;
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b88367417b2b2512b46*
