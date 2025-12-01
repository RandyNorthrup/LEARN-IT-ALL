---
id: lesson-006-008
title: Use Destructuring Assignment to Assign Variables from Objects
chapterId: chapter-06
order: 8
duration: 5
objectives:
  - Use Destructuring Assignment to Assign Variables from Objects
---

# Use Destructuring Assignment to Assign Variables from Objects

Destructuring allows you to assign a new variable name when extracting values. You can do this by putting the new name after a colon when assigning the value.

Using the same object from the last example:

```js
const user = { name: 'John Doe', age: 34 };
```

Here's how you can give new variable names in the assignment:

```js
const { name: userName, age: userAge } = user;
```

You may read it as "get the value of `user.name` and assign it to a new variable named `userName`" and so on. The value of `userName` would be the string `John Doe`, and the value of `userAge` would be the number `34`.

## Instructions

Replace the two assignments with an equivalent destructuring assignment. It should still assign the variables `highToday` and `highTomorrow` the values of `today` and `tomorrow` from the `HIGH_TEMPERATURES` object.

## Starter Code

```html
const HIGH_TEMPERATURES = {
  yesterday: 75,
  today: 77,
  tomorrow: 80
};

// Only change code below this line
  
const highToday = HIGH_TEMPERATURES.today;
const highTomorrow = HIGH_TEMPERATURES.tomorrow; 

// Only change code above this line
```

## Hints

1. You should remove the ES5 assignment syntax.
2. You should use destructuring to create the `highToday` variable.
3. You should use destructuring to create the `highTomorrow` variable.
4. `highToday` should be equal to `77` and `highTomorrow` should be equal to `80`.

## Solution

```html
```js
const HIGH_TEMPERATURES = {
  yesterday: 75,
  today: 77,
  tomorrow: 80
};

const { today: highToday, tomorrow: highTomorrow } = HIGH_TEMPERATURES;
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b89367417b2b2512b49*
