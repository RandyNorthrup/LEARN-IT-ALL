---
id: lesson-004-021
title: Adjacency List
chapterId: chapter-04
order: 21
duration: 5
objectives:
  - Adjacency List
---

# Adjacency List

Graphs can be represented in different ways. Here we describe one way, which is called an <dfn>adjacency list</dfn>. An adjacency list is essentially a bulleted list where the left side is the node and the right side lists all the other nodes it's connected to. Below is a representation of an adjacency list.

<blockquote>Node1: Node2, Node3<br>Node2: Node1<br>Node3: Node1</blockquote>

Above is an undirected graph because `Node1` is connected to `Node2` and `Node3`, and that information is consistent with the connections `Node2` and `Node3` show. An adjacency list for a directed graph would mean each row of the list shows direction. If the above was directed, then `Node2: Node1` would mean there the directed edge is pointing from `Node2` towards `Node1`. We can represent the undirected graph above as an adjacency list by putting it within a JavaScript object.

```js
var undirectedG = {
  Node1: ["Node2", "Node3"],
  Node2: ["Node1"],
  Node3: ["Node1"]
};
```

This can also be more simply represented as an array where the nodes just have numbers rather than string labels.

```js
var undirectedGArr = [
  [1, 2], // Node1
  [0],    // Node2
  [0]     // Node3
];
```

## Instructions

Create a social network as an undirected graph with 4 nodes/people named `James`, `Jill`, `Jenny`, and `Jeff`. There are edges/relationships between James and Jeff, Jill and Jenny, and Jeff and Jenny.

## Starter Code

```html
var undirectedAdjList = {};
```

## Hints

1. `undirectedAdjList` should only contain four nodes.
2. There should be an edge between `Jeff` and `James`.
3. There should be an edge between `Jill` and `Jenny`.
4. There should be an edge between `Jeff` and `Jenny`.

## Solution

```html
```js
var undirectedAdjList = {
  James: ['Jeff'],
  Jill: ['Jenny'],
  Jenny: ['Jill', 'Jeff'],
  Jeff: ['James', 'Jenny']
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d8256367417b2b2512c77*
