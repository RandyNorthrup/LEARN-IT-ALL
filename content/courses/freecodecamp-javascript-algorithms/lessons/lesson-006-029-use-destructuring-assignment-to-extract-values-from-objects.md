---
id: lesson-006-029
title: Use Destructuring Assignment to Extract Values from Objects
chapterId: chapter-06
order: 29
duration: 5
objectives:
  - Use Destructuring Assignment to Extract Values from Objects
---

# Use Destructuring Assignment to Extract Values from Objects

<dfn>Destructuring assignment</dfn> is special syntax introduced in ES6, for neatly assigning values taken directly from an object.

Consider the following ES5 code:

```js
const user = { name: 'John Doe', age: 34 };

const name = user.name;
const age = user.age;
```

`name` would have a value of the string `John Doe`, and `age` would have the number `34`.

Here's an equivalent assignment statement using the ES6 destructuring syntax:

```js
const { name, age } = user;
```

Again, `name` would have a value of the string `John Doe`, and `age` would have the number `34`.

Here, the `name` and `age` variables will be created and assigned the values of their respective values from the `user` object. You can see how much cleaner this is.

You can extract as many or few values from the object as you want.

## Instructions

Replace the two assignments with an equivalent destructuring assignment. It should still assign the variables `today` and `tomorrow` the values of `today` and `tomorrow` from the `HIGH_TEMPERATURES` object.

## Starter Code

```html
const HIGH_TEMPERATURES = {
  yesterday: 75,
  today: 77,
  tomorrow: 80
};

// Only change code below this line

const today = HIGH_TEMPERATURES.today;
const tomorrow = HIGH_TEMPERATURES.tomorrow;

// Only change code above this line
```

## Hints

1. You should remove the ES5 assignment syntax.
2. You should use destructuring to create the `today` variable.
3. You should use destructuring to create the `tomorrow` variable.
4. `today` should be equal to `77` and `tomorrow` should be equal to `80`.

## Solution

```html
```js
const HIGH_TEMPERATURES = {
  yesterday: 75,
  today: 77,
  tomorrow: 80
};

const { today, tomorrow } = HIGH_TEMPERATURES;
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 5cfa550e84205a357704ccb6*
