---
id: lesson-004-003
title: Create a Queue Class
chapterId: chapter-04
order: 3
duration: 5
objectives:
  - Create a Queue Class
---

# Create a Queue Class

Like stacks, queues are a collection of elements. But unlike stacks, queues follow the FIFO (First-In First-Out) principle. Elements added to a queue are pushed to the tail, or the end, of the queue, and only the element at the front of the queue is allowed to be removed.

We could use an array to represent a queue, but just like stacks, we want to limit the amount of control we have over our queues.

The two main methods of a queue class is the enqueue and the dequeue method. The enqueue method pushes an element to the tail of the queue, and the dequeue method removes and returns the element at the front of the queue. Other useful methods are the front, size, and isEmpty methods.

## Instructions

Write an `enqueue` method that pushes an element to the tail of the queue, a `dequeue` method that removes and returns the front element, a `front` method that lets us see the front element, a `size` method that shows the length, and an `isEmpty` method to check if the queue is empty.

## Starter Code

```html
function Queue() {
  var collection = [];
  this.print = function() {
    console.log(collection);
  };
  // Only change code below this line

  // Only change code above this line
}
```

## Hints

1. Your `Queue` class should have a `enqueue` method.
2. Your `Queue` class should have a `dequeue` method.
3. Your `Queue` class should have a `front` method.
4. Your `Queue` class should have a `size` method.
5. Your `Queue` class should have an `isEmpty` method.
6. The `dequeue` method should remove and return the front element of the queue
7. The `front` method should return value of the front element of the queue
8. The `size` method should return the length of the queue
9. The `isEmpty` method should return `false` if there are elements in the queue

## Solution

```html
```js
function Queue () { 
    var collection = [];
    this.print = function() {
        console.log(collection);
    };
    // Only change code below this line
    this.enqueue = function(item) {
        collection.push(item);
    }

    this.dequeue = function() {
        return collection.shift();
    }

    this.front = function() {
        return collection[0];
    }

    this.size = function(){
        return collection.length;
    }

    this.isEmpty = function() {
        return collection.length === 0 ? true : false;
    }
    // Only change code above this line
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8250367417b2b2512c60*
