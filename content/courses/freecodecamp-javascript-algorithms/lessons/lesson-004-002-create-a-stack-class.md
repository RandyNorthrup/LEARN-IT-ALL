---
id: lesson-004-002
title: Create a Stack Class
chapterId: chapter-04
order: 2
duration: 5
objectives:
  - Create a Stack Class
---

# Create a Stack Class

In the last section, we talked about what a stack is and how we can use an array to represent a stack. In this section, we will be creating our own stack class. Although you can use arrays to create stacks, sometimes it is best to limit the amount of control we have with our stacks. Apart from the `push` and `pop` method, stacks have other useful methods. Let's add a `peek`, `isEmpty`, and `clear` method to our stack class.

## Instructions

Write a `push` method that pushes an element to the top of the stack, a `pop` method that removes and returns the element on the top of the stack, a `peek` method that looks at the top element in the stack, an `isEmpty` method that checks if the stack is empty, and a `clear` method that removes all elements from the stack. Normally stacks don't have this, but we've added a `print` helper method that console logs the collection.

## Starter Code

```html
function Stack() {
  var collection = [];
  this.print = function() {
    console.log(collection);
  };
  // Only change code below this line

  // Only change code above this line
}
```

## Hints

1. Your `Stack` class should have a `push` method.
2. Your `Stack` class should have a `pop` method.
3. Your `Stack` class should have a `peek` method.
4. Your `Stack` class should have a `isEmpty` method.
5. Your `Stack` class should have a `clear` method.
6. The `peek` method should return the top element of the stack
7. The `pop` method should remove and return the top element of the stack
8. The `isEmpty` method should return true if a stack does not contain any elements
9. The `clear` method should remove all element from the stack

## Solution

```html
```js
class Stack {
  constructor() {
    this.collection = [];
  }
  print() {
    console.log(this.collection);
  }
  push(val) {
    this.collection.push(val);
  }
  pop() {
    return this.collection.pop();
  }
  peek() {
    return this.collection[this.collection.length - 1];
  }
  isEmpty() {
    return this.collection.length === 0;
  }
  clear() {
    return (this.collection.length = 0);
  }
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8250367417b2b2512c5f*
