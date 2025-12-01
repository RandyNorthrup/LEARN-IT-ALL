---
id: lesson-004-023
title: Incidence Matrix
chapterId: chapter-04
order: 23
duration: 5
objectives:
  - Incidence Matrix
---

# Incidence Matrix

Yet another way to represent a graph is to put it in an <dfn>incidence matrix.</dfn>

An <dfn>incidence matrix</dfn> is a two-dimensional (2D) array. Generally speaking, an incidence matrix relates two different classes of objects between its two dimensions. This kind of matrix is similar to an adjacency matrix. However, the rows and columns mean something else here.

In graphs, we have edges and nodes. These will be our "two different classes of objects". This matrix will have the rows be the nodes and columns be the edges. This means that we can have an uneven number of rows and columns.

Each column will represent a unique edge. Also, each edge connects two nodes. To show that there is an edge between two nodes, you will put a 1 in the two rows of a particular column. Below is a 3 node graph with one edge between node 1 and node 3.

<blockquote>    1<br>   ---<br>1 | 1<br>2 | 0<br>3 | 1</blockquote>

Here is an example of an incidence matrix with 4 edges and 4 nodes. Remember, the columns are the edges and rows are the nodes themselves.

<blockquote>    1 2 3 4<br>   --------<br>1 | 0 1 1 1<br>2 | 1 1 0 0<br>3 | 1 0 0 1<br>4 | 0 0 1 0</blockquote>

Below is a JavaScript implementation of the same thing.

```js
var incMat = [
  [0, 1, 1, 1],
  [1, 1, 0, 0],
  [1, 0, 0, 1],
  [0, 0, 1, 0]
];
```

To make a directed graph, use `-1` for an edge leaving a particular node and `1` for an edge entering a node.

```js
var incMatDirected = [
  [ 0, -1,  1, -1],
  [-1,  1,  0,  0],
  [ 1,  0,  0,  1],
  [ 0,  0, -1,  0]
];
```

Graphs can also have <dfn>weights</dfn> on their edges. So far, we have <dfn>unweighted</dfn> edges where just the presence and lack of edge is binary (`0` or `1`). You can have different weights depending on your application. A different weight is represented as numbers greater than 1.

## Instructions

Create an incidence matrix of an undirected graph with five nodes and four edges. This matrix should be in a multi-dimensional array.

These five nodes have the following relationships. The first edge is between the first and second node. The second edge is between the second and third node. The third edge is between the third and fifth node. The fourth edge is between the fourth and second node. All edge weights are one and the edge order matters.

## Starter Code

```html
var incMatUndirected = [

];
```

## Hints

1. `incMatUndirected` should only contain five nodes.
2. There should be a first edge between the first and second node.
3. There should be a second edge between the second and third node.
4. There should be a third edge between the third and fifth node.
5. There should be a fourth edge between the second and fourth node.

## Solution

```html
```js
var incMatUndirected = [[1, 0, 0, 0],[1, 1, 0, 1],[0, 1, 1, 0],[0, 0, 0, 1],[0, 0, 1, 0]];
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8256367417b2b2512c79*
