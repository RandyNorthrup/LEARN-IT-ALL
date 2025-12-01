---
id: lesson-007-024
title: Remove Elements from an Array Using slice Instead of splice
chapterId: chapter-07
order: 24
duration: 5
objectives:
  - Remove Elements from an Array Using slice Instead of splice
---

# Remove Elements from an Array Using slice Instead of splice

A common pattern while working with arrays is when you want to remove items and keep the rest of the array. JavaScript offers the `splice` method for this, which takes arguments for the index of where to start removing items, then the number of items to remove. If the second argument is not provided, the default is to remove items through the end. However, the `splice` method mutates the original array it is called on. Here's an example:

```js
const cities = ["Chicago", "Delhi", "Islamabad", "London", "Berlin"];
cities.splice(3, 1);
```

Here `splice` returns the string `London` and deletes it from the cities array. `cities` will have the value `["Chicago", "Delhi", "Islamabad", "Berlin"]`.

As we saw in the last challenge, the `slice` method does not mutate the original array, but returns a new one which can be saved into a variable. Recall that the `slice` method takes two arguments for the indices to begin and end the slice (the end is non-inclusive), and returns those items in a new array. Using the `slice` method instead of `splice` helps to avoid any array-mutating side effects.

## Instructions

Rewrite the function `nonMutatingSplice` by using `slice` instead of `splice`. It should limit the provided `cities` array to a length of 3, and return a new array with only the first three items.

Do not mutate the original array provided to the function.

## Starter Code

```html
function nonMutatingSplice(cities) {

  return cities.splice(3);
}
```

## Hints

1. Your code should use the `slice` method.
2. Your code should not use the `splice` method.
3. You should not mutate the original array passed to the function.
4. `nonMutatingSplice(["Chicago", "Delhi", "Islamabad", "London", "Berlin"])` should return `["Chicago", "Delhi", "Islamabad"]`.

## Solution

```html
```js
function nonMutatingSplice(cities) {
  return cities.slice(0,3);
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 9d7123c8c441eeafaeb5bdef*
