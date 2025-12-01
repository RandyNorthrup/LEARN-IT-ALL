---
id: lesson-004-008
title: Remove Elements from a Linked List by Index
chapterId: chapter-04
order: 8
duration: 5
objectives:
  - Remove Elements from a Linked List by Index
---

# Remove Elements from a Linked List by Index

Before we move on to another data structure, let's get a couple of last bits of practice with linked lists.

Let's write a `removeAt` method that removes the `element` at a given `index`. The method should be called `removeAt(index)`. To remove an `element` at a certain `index`, we'll need to keep a running count of each node as we move along the linked list.

A common technique used to iterate through the elements of a linked list involves a <dfn>'runner'</dfn>, or sentinel, that 'points' at the nodes that your code is comparing. In our case, starting at the `head` of our list, we start with a `currentIndex` variable that starts at `0`. The `currentIndex` should increment by one for each node we pass.

Just like our `remove(element)` method, which <a href="/learn/coding-interview-prep/data-structures/remove-elements-from-a-linked-list" target="_blank" rel="noopener noreferrer nofollow">we covered in a previous lesson</a>, we need to be careful not to orphan the rest of our list when we remove the node in our `removeAt(index)` method. We keep our nodes contiguous by making sure that the node that has reference to the removed node has a reference to the next node.

## Instructions

Write a `removeAt(index)` method that removes and returns a node at a given `index`. The method should return `null` if the given `index` is either negative, or greater than or equal to the `length` of the linked list.

**Note:** Remember to keep count of the `currentIndex`.

## Starter Code

```html
function LinkedList() {
  var length = 0;
  var head = null;

  var Node = function(element){
    this.element = element;
    this.next = null;
  };

  this.size = function(){
    return length;
  };

  this.head = function(){
    return head;
  };

  this.add = function(element){
    var node = new Node(element);
    if(head === null){
      head = node;
    } else {
      var currentNode = head;

      while(currentNode.next){
        currentNode  = currentNode.next;
      }

      currentNode.next = node;
    }

    length++;
  };

  // Only change code below this line

  // Only change code above this line
}
```

## Hints

1. Your `LinkedList` class should have a `removeAt` method.
2. Your `removeAt` method should reduce the `length` of the linked list by one.
3. Your `removeAt` method should remove the element at the specified index from the linked list.
4. When only one element is present in the linked list, your `removeAt` method should remove and return the element at specified index, and reduce the length of the linked list.
5. Your `removeAt` method should return the element of the removed node.
6. Your `removeAt` method should return `null` and the linked list should not change if the given index is less than `0`.
7. Your `removeAt` method should return `null` and the linked list should not change if the given index is greater than or equal to the `length` of the list.

## Solution

```html
```js
function LinkedList() {
  var length = 0;
  var head = null;

  var Node = function (element) {
    this.element = element;
    this.next = null;
  };

  this.size = function () {
    return length;
  };

  this.head = function () {
    return head;
  };

  this.add = function (element) {
    var node = new Node(element);
    if (head === null) {
      head = node;
    } else {
      var currentNode = head;

      while (currentNode.next) {
        currentNode = currentNode.next;
      }

      currentNode.next = node;
    }

    length++;
  };

  this.removeAt = function (index) {
    var currentNode = head;
    var previous = head;
    var count = 0;
    if (index >= length || index < 0) {
      return null;
    }
    if (index === 0) {
      var removed = head.element;
      head = currentNode.next;
    } else {
      while (count < index) {
        previous = currentNode;
        currentNode = currentNode.next;
        count++;
      }
      var removed = previous.next.element;
      previous.next = currentNode.next;
    }
    length--;
    return removed;
  };
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8251367417b2b2512c65*
