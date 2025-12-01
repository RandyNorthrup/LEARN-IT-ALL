---
id: lesson-004-027
title: Find the Minimum and Maximum Height of a Binary Search Tree
chapterId: chapter-04
order: 27
duration: 5
objectives:
  - Find the Minimum and Maximum Height of a Binary Search Tree
---

# Find the Minimum and Maximum Height of a Binary Search Tree

In the last challenge we described a scenario in which a tree could become unbalanced. To understand the concept of balance, let's take a look at another tree property: height. Height in a tree represents the distance from the root node to any given leaf node. Different paths in a highly branched tree structure may have different heights, but for a given tree there will be a minimum and maximum height. If the tree is balanced, these values will differ at most by one. This means that in a balanced tree, all the leaf nodes exist within the same level, or if they are not within the same level they are at most one level apart.

The property of balance is important for trees because it is what determines the efficiency of tree operations. As we explained in the last challenge, we face worst case time complexity for heavily unbalanced trees. Self-balancing trees are commonly used to account for this issue in trees with dynamic data sets. Common examples of these include AVL trees, red-black trees, and B-trees. These trees all contain additional internal logic which re-balance the tree when insertions or deletions create a state of imbalance.

**Note:** A similar property to height is depth, which refers to how far a given node is from the root node.

## Instructions

Write two methods for our binary tree: `findMinHeight` and `findMaxHeight`. These methods should return an integer value for the minimum and maximum height within a given binary tree, respectively. If the node is empty let's assign it a height of `-1` (that's the base case). Finally, add a third method `isBalanced` which returns `true` or `false` depending on whether the tree is balanced or not. You can use the first two methods you just wrote to determine this.

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
2. The binary search tree should have a method called `findMinHeight`.
3. The binary search tree should have a method called `findMaxHeight`.
4. The binary search tree should have a method called `isBalanced`.
5. The `findMinHeight` method should return the minimum height of the tree.
6. The `findMaxHeight` method should return the maximum height of the tree.
7. An empty tree should return a height of `-1`.
8. The `isBalanced` method should return `false` if the tree is an unbalanced binary search tree.
9. The `isBalanced` method should return `true` if the tree is a balanced binary search tree.

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
  
  // Only change code above this line
  this.findMinHeight = function(root = this.root) {
    // empty tree.
    if (root === null) {
      return -1;
    }
    // leaf node.
    if (root.left === null && root.right === null) {
      return 0;
    }
    if (root.left === null) {
      return this.findMinHeight(root.right) + 1;
    }
    if (root.right === null) {
      return this.findMinHeight(root.left) + 1;
    }
    const lHeight = this.findMinHeight(root.left);
    const rHeight = this.findMinHeight(root.right);
    return Math.min(lHeight, rHeight) + 1;
  };
  this.findMaxHeight = function(root = this.root) {
    // empty tree.
    if (root === null) {
      return -1;
    }
    // leaf node.
    if (root.left === null && root.right === null) {
      return 0;
    }
    if (root.left === null) {
      return this.findMaxHeight(root.right) + 1;
    }
    if (root.right === null) {
      return this.findMaxHeight(root.left) + 1;
    }
    const lHeight = this.findMaxHeight(root.left);
    const rHeight = this.findMaxHeight(root.right);
    return Math.max(lHeight, rHeight) + 1;
  };
  this.isBalanced = function(root = this.root) {
    if (root === null) {
      return true;
    }

    if (root.left === null && root.right === null) {
      return true;
    }

    if (root.left === null) {
      return this.findMaxHeight(root.right) <= 0;
    }

    if (root.right === null) {
      return this.findMaxHeight(root.left) <= 0;
    }

    const lHeight = this.findMaxHeight(root.left);
    const rHeight = this.findMaxHeight(root.right);
    if (Math.abs(lHeight - rHeight) > 1) {
      return false;
    }
    return this.isBalanced(root.left) && this.isBalanced(root.right);
  };
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8257367417b2b2512c7d*
