---
id: lesson-004-028
title: Use Depth First Search in a Binary Search Tree
chapterId: chapter-04
order: 28
duration: 5
objectives:
  - Use Depth First Search in a Binary Search Tree
---

# Use Depth First Search in a Binary Search Tree

We know how to search a binary search tree for a specific value. But what if we just want to explore the entire tree? Or what if we don't have an ordered tree and we need to just search for a value? Here we will introduce some tree traversal methods which can be used to explore tree data structures. First up is depth-first search. In depth-first search, a given subtree is explored as deeply as possible before the search continues on to another subtree. There are three ways this can be done: In-order: Begin the search at the left-most node and end at the right-most node. Pre-order: Explore all the roots before the leaves. Post-order: Explore all the leaves before the roots. As you may guess, you may choose different search methods depending on what type of data your tree is storing and what you are looking for. For a binary search tree, an inorder traversal returns the nodes in sorted order.

## Instructions

Here we will create these three search methods on our binary search tree. Depth-first search is an inherently recursive operation which continues to explore further subtrees so long as child nodes are present. Once you understand this basic concept, you can simply rearrange the order in which you explore the nodes and subtrees to produce any of the three searches above. For example, in post-order search we would want to recurse all the way to a leaf node before we begin to return any of the nodes themselves, whereas in pre-order search we would want to return the nodes first, and then continue recursing down the tree. Define `inorder`, `preorder`, and `postorder` methods on our tree. Each of these methods should return an array of items which represent the tree traversal. Be sure to return the integer values at each node in the array, not the nodes themselves. Finally, return `null` if the tree is empty.

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
2. The binary search tree should have a method called `inorder`.
3. The binary search tree should have a method called `preorder`.
4. The binary search tree should have a method called `postorder`.
5. The `inorder` method should return an array of the node values that result from an inorder traversal.
6. The `preorder` method should return an array of the node values that result from a preorder traversal.
7. The `postorder` method should return an array of the node values that result from a postorder traversal.
8. The `inorder` method should return `null` for an empty tree.
9. The `preorder` method should return `null` for an empty tree.
10. The `postorder` method should return `null` for an empty tree.

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
  this.result = [];

  this.inorder = function(node) {
    if (!node) node = this.root;
    if (!node) return null;

    if (node.left) this.inorder(node.left);
    this.result.push(node.value);
    if (node.right) this.inorder(node.right);
    return this.result;
  };
  this.preorder = function(node) {
    if (!node) node = this.root;
    if (!node) return null;

    this.result.push(node.value);
    if (node.left) this.preorder(node.left);
    if (node.right) this.preorder(node.right);
    return this.result;
  };
  this.postorder = function(node) {
    if (!node) node = this.root;
    if (!node) return null;

    if (node.left) this.postorder(node.left);
    if (node.right) this.postorder(node.right);
    this.result.push(node.value);

    return this.result;
  };
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8257367417b2b2512c7e*
