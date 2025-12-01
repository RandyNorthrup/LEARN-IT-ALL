---
id: lesson-004-036
title: Reverse a Doubly Linked List
chapterId: chapter-04
order: 36
duration: 5
objectives:
  - Reverse a Doubly Linked List
---

# Reverse a Doubly Linked List

Let's create one more method for our doubly linked list called reverse which reverses the list in place. Once the method is executed the head should point to the previous tail and the tail should point to the previous head. Now, if we traverse the list from head to tail we should meet the nodes in a reverse order compared to the original list. Trying to reverse an empty list should return null.

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
2. The `DoublyLinkedList` should have a method called `reverse`.
3. Reversing an empty list should return `null`.
4. The `reverse` method should reverse the list.
5. The `next` and `previous` references should be correctly maintained when a list is reversed.

## Solution

```html
```js
  var Node = function(data, prev) {
    this.data = data;
    this.prev = prev;
    this.next = null;
  };
  var DoublyLinkedList = function() {
    this.head = null;
    this.tail = null;

    this.reverse = function() {
      if (!this.head || !this.head.next) {
        return this.head
      }

      let tail;
      let temp;
      let current = this.head;
      while(current !== null) {
        if(!tail) tail = current;
        temp = current.prev;
        current.prev = current.next;
        current.next = temp;
        current = current.prev;
      }

      this.head = temp.prev;
      this.tail = tail
    }
  };
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d825a367417b2b2512c88*
