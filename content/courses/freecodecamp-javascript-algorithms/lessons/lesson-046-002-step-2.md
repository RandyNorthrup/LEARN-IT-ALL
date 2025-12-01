---
id: lesson-046-002
title: Step 2
chapterId: chapter-46
order: 2
duration: 5
objectives:
  - Step 2
---

# Step 2

You will need to create a 2D list to represent the adjacency matrix of the graph. This matrix will be used to represent the weights of the edges between nodes in the graph.

Create a variable named `adj_matrix` and assign it a 2D list representing the graph with the following weights:

```py
[0, 5, 3, INF, 11, INF],
[5, 0, 1, INF, INF, 2],
[3, 1, 0, 1, 5, INF],
[INF, INF, 1, 0, 9, 3],
[11, INF, 5, 9, 0, INF],
[INF, 2, INF, 3, INF, 0]
```

## Starter Code

```html
INF = float('inf')
--fcc-editable-region--

--fcc-editable-region--
```

## Hints

1. You should create a variable named `adj_matrix`.
2. `adj_matrix` should be a 2D list containing the provided values.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 686251fb49ebc489ba60ccb5*
