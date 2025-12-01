---
id: lesson-003-014
title: Use the delete Keyword to Remove Object Properties
chapterId: chapter-03
order: 14
duration: 5
objectives:
  - Use the delete Keyword to Remove Object Properties
---

# Use the delete Keyword to Remove Object Properties

Now you know what objects are and their basic features and advantages. In short, they are key-value stores which provide a flexible, intuitive way to structure data, ***and***, they provide very fast lookup time. Throughout the rest of these challenges, we will describe several common operations you can perform on objects so you can become comfortable applying these useful data structures in your programs.

In earlier challenges, we have both added to and modified an object's key-value pairs. Here we will see how we can *remove* a key-value pair from an object.

Let's revisit our `foods` object example one last time. If we wanted to remove the `apples` key, we can remove it by using the `delete` keyword like this:

```js
delete foods.apples;
```

## Instructions

Use the delete keyword to remove the `oranges`, `plums`, and `strawberries` keys from the `foods` object.

## Starter Code

```html
let foods = {
  apples: 25,
  oranges: 32,
  plums: 28,
  bananas: 13,
  grapes: 35,
  strawberries: 27
};

// Only change code below this line

// Only change code above this line

console.log(foods);
```

## Hints

1. The `foods` object should only have three keys: `apples`, `grapes`, and `bananas`.
2. The `oranges`, `plums`, and `strawberries` keys should be removed using `delete`.

## Solution

```html
```js
let foods = {
  apples: 25,
  oranges: 32,
  plums: 28,
  bananas: 13,
  grapes: 35,
  strawberries: 27
};

delete foods.oranges;
delete foods.plums;
delete foods.strawberries;

console.log(foods);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b7c367417b2b2512b1b*
