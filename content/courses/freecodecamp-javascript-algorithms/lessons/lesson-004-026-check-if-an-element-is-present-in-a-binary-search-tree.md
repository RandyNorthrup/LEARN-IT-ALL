---
id: lesson-004-026
title: Check if an Element is Present in a Binary Search Tree
chapterId: chapter-04
order: 26
duration: 5
objectives:
  - Check if an Element is Present in a Binary Search Tree
---

# Check if an Element is Present in a Binary Search Tree

Now that we have a general sense of what a binary search tree is let's talk about it in a little more detail. Binary search trees provide logarithmic time for the common operations of lookup, insertion, and deletion in the average case, and linear time in the worst case. Why is this? Each of those basic operations requires us to find an item in the tree (or in the case of insertion to find where it should go) and because of the tree structure at each parent node we are branching left or right and effectively excluding half the size of the remaining tree. This makes the search proportional to the logarithm of the number of nodes in the tree, which creates logarithmic time for these operations in the average case. Ok, but what about the worst case? Well, consider constructing a tree from the following values, adding them left to right: `10`, `12`, `17`, `25`. Following our rules for a binary search tree, we will add `12` to the right of `10`, `17` to the right of this, and `25` to the right of this. Now our tree resembles a linked list and traversing it to find `25` would require us to traverse all the items in linear fashion. Hence, linear time in the worst case. The problem here is that the tree is unbalanced. We'll look a little more into what this means in the following challenges.

## Instructions

In this challenge, we will create a utility for our tree. Write a method `isPresent` which takes an integer value as input and returns a boolean value for the presence or absence of that value in the binary search tree.

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
2. The binary search tree should have a method called `isPresent`.
3. The `isPresent` method should correctly check for the presence or absence of elements added to the tree.
4. `isPresent` should handle cases where the tree is empty.

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
  this.isPresent = function (value) {
    var current = this.root
    while (current) {
      if (value === current.value) {
        return true;
      }
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8257367417b2b2512c7c*
