---
id: lesson-004-033
title: Invert a Binary Tree
chapterId: chapter-04
order: 33
duration: 5
objectives:
  - Invert a Binary Tree
---

# Invert a Binary Tree

Here will we create a function to invert a binary tree. Given a binary tree, we want to produce a new tree that is equivalently the mirror image of this tree. Running an inorder traversal on an inverted tree will explore the nodes in reverse order when compared to the inorder traversal of the original tree. Write a method to do this called `invert` on our binary tree. Calling this method should invert the current tree structure. Ideally, we would like to do this in-place in linear time. That is, we only visit each node once and we modify the existing tree structure as we go, without using any additional memory. Good luck!

## Starter Code

```html
var displayTree = (tree) => console.log(JSON.stringify(tree, null, 2));
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
2. The binary search tree should have a method called `invert`.
3. The `invert` method should correctly invert the tree structure.
4. Inverting an empty tree should return `null`.

## Solution

```html
```js
var displayTree = (tree) => console.log(JSON.stringify(tree, null, 2));
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
function BinarySearchTree() {
  this.root = null;
  // Only change code below this line
  this.invert = function(node = this.root) {
    if (node) {
      const temp = node.left;
      node.left = node.right;
      node.right = temp;
      this.invert(node.left);
      this.invert(node.right);
    }
    return node;
  }
    // Only change code above this line
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8259367417b2b2512c83*
