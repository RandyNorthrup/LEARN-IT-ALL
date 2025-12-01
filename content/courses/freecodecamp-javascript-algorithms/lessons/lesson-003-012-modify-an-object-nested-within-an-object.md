---
id: lesson-003-012
title: Modify an Object Nested Within an Object
chapterId: chapter-03
order: 12
duration: 5
objectives:
  - Modify an Object Nested Within an Object
---

# Modify an Object Nested Within an Object

Now let's take a look at a slightly more complex object. Object properties can be nested to an arbitrary depth, and their values can be any type of data supported by JavaScript, including arrays and even other objects. Consider the following:

```js
let nestedObject = {
  id: 28802695164,
  date: 'December 31, 2016',
  data: {
    totalUsers: 99,
    online: 80,
    onlineStatus: {
      active: 67,
      away: 13,
      busy: 8
    }
  }
};
```

`nestedObject` has three properties: `id` (value is a number), `date` (value is a string), and `data` (value is an object with its nested structure). While structures can quickly become complex, we can still use the same notations to access the information we need. To assign the value `10` to the `busy` property of the nested `onlineStatus` object, we use dot notation to reference the property:

```js
nestedObject.data.onlineStatus.busy = 10;
```

## Instructions

Here we've defined an object `userActivity`, which includes another object nested within it. Set the value of the `online` key to `45`.

## Starter Code

```html
let userActivity = {
  id: 23894201352,
  date: 'January 1, 2017',
  data: {
    totalUsers: 51,
    online: 42
  }
};

// Only change code below this line

// Only change code above this line

console.log(userActivity);
```

## Hints

1. `userActivity` should have `id`, `date` and `data` properties.
2. `userActivity` should have a `data` key set to an object with keys `totalUsers` and `online`.
3. The `online` property nested in the `data` key of `userActivity` should be set to `45`
4. The `online` property should be set using dot or bracket notation.

## Solution

```html
```js
let userActivity = {
  id: 23894201352,
  date: 'January 1, 2017',
  data: {
    totalUsers: 51,
    online: 42
  }
};

userActivity.data.online = 45;
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b7c367417b2b2512b19*
