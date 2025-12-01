---
id: lesson-004-001
title: Learn how a Stack Works
chapterId: chapter-04
order: 1
duration: 5
objectives:
  - Learn how a Stack Works
---

# Learn how a Stack Works

You are probably familiar with stack of books on your table. You have likely used the undo feature of a text editor. You are also probably used to hitting the back button on your phone to go back to the previous view in your app.

You know what they all have in common? They all store the data in a way so that you can traverse backwards.

The topmost book in the stack was the one that was put there last. If you remove that book from your stack's top, you would expose the book that was put there before the last book and so on.

If you think about it, in all the above examples, you are getting <dfn>Last-In-First-Out</dfn> type of service. We will try to mimic this with our code.

This data storage scheme is called a <dfn>Stack</dfn>. In particular, we would have to implement the `push()` method that pushes JavaScript objects at the top of the stack; and `pop()` method, that removes the JavaScript object that's at the top of the stack at the current moment.

## Instructions

Here we have a stack of homework assignments represented as an array: `"BIO12"` is at the base, and `"PSY44"` is at the top of the stack.

Modify the given array and treat it like a `stack` using the JavaScript methods mentioned above. Remove the top element `"PSY44"` from the stack. Then add `"CS50"` to be the new top element of the stack.

## Starter Code

```html
var homeworkStack = ["BIO12","HIS80","MAT122","PSY44"];
// Only change code below this line
```

## Hints

1. `homeworkStack` should only contain 4 elements.
2. The last element in `homeworkStack` should be `"CS50"`.
3. `homeworkStack` should not contain `"PSY44"`.
4. The initial declaration of the `homeworkStack` should not be changed.

## Solution

```html
```js
// solution required
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8250367417b2b2512c5e*
