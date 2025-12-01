---
id: lesson-004-035
title: Create a Doubly Linked List
chapterId: chapter-04
order: 35
duration: 5
objectives:
  - Create a Doubly Linked List
---

# Create a Doubly Linked List

All of the linked lists we've created so far are singly linked lists. Here, we'll create a <dfn>doubly linked list</dfn>. As the name implies, nodes in a doubly linked list have references to the next and previous node in the list.

This allows us to traverse the list in both directions but it also requires more memory to be used because every node must contain an additional reference to the previous node in the list.

## Instructions

We've provided a `Node` object and started our `DoublyLinkedList`. Let's add two methods to our doubly linked list called `add` and `remove`. The `add` method should add the given element to the list while the `remove` method should remove all occurrences of a given element in the list.

Be careful to handle any possible edge cases when writing these methods, such as deletions for the first or last element. Also, removing any item on an empty list should return `null`.

## Starter Code

```html
var Node = function(data, prev) {
  this.data = data;
  this.prev = prev;
  this.next = null;
};
var DoublyLinkedList = function() {
  this.head = null;
  this.tail = null;
  // Only change code below this line
  
  // Only change code above this line
};
```

## Hints

1. The `DoublyLinkedList` data structure should exist.
2. The `DoublyLinkedList` should have a method called `add`.
3. The `DoublyLinkedList` should have a method called `remove`.
4. Removing an item from an empty list should return `null`.
5. The `add` method should add items to the list.
6. Each node should keep track of the previous node.
7. The first item should be removable from the list.
8. The last item should be removable from the list.

## Solution

```html
```js
// solution required
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d825a367417b2b2512c87*
