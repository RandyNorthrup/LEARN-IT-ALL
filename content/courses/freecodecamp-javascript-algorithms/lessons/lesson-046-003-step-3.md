---
id: lesson-046-003
title: Step 3
chapterId: chapter-46
order: 3
duration: 5
objectives:
  - Step 3
---

# Step 3

You will now create the main function that accepts three parameters: the adjacency matrix, the starting node, and an optional target node.

Create a function named `shortest_path` that takes in three parameters: `matrix`, `start_node`, and `target_node`. Assign `None` as the default value for `target_node`.

The `target_node` parameter is set to `None` by default, indicating that if no target node is specified, the function should compute the shortest paths from the starting node to all other nodes in the graph.

Add a `pass` statement inside the function body for now.

## Starter Code

```html
INF = float('inf')
adj_matrix = [
    [0, 5, 3, INF, 11, INF],
    [5, 0, 1, INF, INF, 2],
    [3, 1, 0, 1, 5, INF],
    [INF, INF, 1, 0, 9, 3],
    [11, INF, 5, 9, 0, INF],
    [INF, 2, INF, 3, INF, 0],
]

--fcc-editable-region--

--fcc-editable-region--
```

## Hints

1. You should create a function named `shortest_path`.
2. The function should take in three parameters: `matrix`, `start_node`, and `target_node` with `target_node` having a default value of `None`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 686253f1b051998ad4904e3e*
