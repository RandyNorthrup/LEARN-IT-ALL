---
id: lesson-004-044
title: Check if Tree is Binary Search Tree
chapterId: chapter-04
order: 44
duration: 5
objectives:
  - Check if Tree is Binary Search Tree
---

# Check if Tree is Binary Search Tree

Since you already know what a binary search tree is, this challenge will establish how it is you can tell that a tree is a binary search tree or not.

The main distinction of a binary search tree is that the nodes are ordered in an organized fashion. Nodes have at most 2 child nodes (placed to the right and/or left) based on if the child node's value is greater than or equal to (right) or less than (left) the parent node.

## Instructions

In this challenge, you will create a utility for your tree. Write a JavaScript method `isBinarySearchTree` which takes a tree as an input and returns a boolean value for whether the tree is a binary search tree or not. Use recursion whenever possible.

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
}
function isBinarySearchTree(tree) {
  // Only change code below this line
  
  // Only change code above this line
}
```

## Hints

1. Your Binary Search Tree should return true when checked with `isBinarySearchTree()`.
2. `isBinarySearchTree()` should return false when checked with a tree that is not a binary search tree.

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
}
function isBinarySearchTree(tree) {
  if (tree.root == null) {
    return null;
  } else {
    let isBST = true;
    function checkTree(node) {
      if (node.left != null) {
        const left = node.left;
        if (left.value >= node.value) {
          isBST = false;
        } else {
          checkTree(left);
        }
      }
      if (node.right != null) {
        const right = node.right;
        if (right.value < node.value) {
          isBST = false;
        } else {
          checkTree(right);
        }
      }
    }
    checkTree(tree.root);
    return isBST;
  }
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 5cc0c1b32479e176caf3b422*
