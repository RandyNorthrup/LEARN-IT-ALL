---
id: lesson-004-029
title: Use Breadth First Search in a Binary Search Tree
chapterId: chapter-04
order: 29
duration: 5
objectives:
  - Use Breadth First Search in a Binary Search Tree
---

# Use Breadth First Search in a Binary Search Tree

Here we will introduce another tree traversal method: breadth-first search. In contrast to the depth-first search methods from the last challenge, breadth-first search explores all the nodes in a given level within a tree before continuing on to the next level. Typically, queues are utilized as helper data structures in the design of breadth-first search algorithms.

In this method, we start by adding the root node to a queue. Then we begin a loop where we dequeue the first item in the queue, add it to a new array, and then inspect both its child subtrees. If its children are not null, they are each enqueued. This process continues until the queue is empty.

## Instructions

Let's create a breadth-first search method in our tree called `levelOrder`. This method should return an array containing the values of all the tree nodes, explored in a breadth-first manner. Be sure to return the values in the array, not the nodes themselves. A level should be traversed from left to right. Next, let's write a similar method called `reverseLevelOrder` which performs the same search but in the reverse direction (right to left) at each level.

## Starter Code

```html
var displayTree = tree => console.log(JSON.stringify(tree, null, 2));
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
function BinarySearchTree() {
  this.root = null;
  // Only change code below this line
  
  // Only change code above this line
}
```

## Hints

1. The `BinarySearchTree` data structure should exist.
2. The binary search tree should have a method called `levelOrder`.
3. The binary search tree should have a method called `reverseLevelOrder`.
4. The `levelOrder` method should return an array of the tree node values explored in level order.
5. The `reverseLevelOrder` method should return an array of the tree node values explored in reverse level order.
6. The `levelOrder` method should return `null` for an empty tree.
7. The `reverseLevelOrder` method should return `null` for an empty tree.

## Solution

```html
```js
var displayTree = tree => console.log(JSON.stringify(tree, null, 2));
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
function BinarySearchTree() {
  this.root = null;
  // Only change code below this line
  this.levelOrder = (root = this.root) => {
    if(!root) return null;
    let queue = [root];
    let results = [];
    while(queue.length > 0) {
      let node = queue.shift();
      results.push(node.value);
      if(node.left) queue.push(node.left);
      if(node.right) queue.push(node.right);
    }
    return results;
  }

  this.reverseLevelOrder = (root = this.root) => {
    if(!root) return null;
    let queue = [root];
    let results = [] ;
    while ( queue.length > 0) {
      let node = queue.shift();
      results.push(node.value);
      if(node.right) queue.push(node.right);
      if(node.left ) queue.push(node.left);
    }
    return results;
  }
  // Only change code above this line
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8258367417b2b2512c7f*
