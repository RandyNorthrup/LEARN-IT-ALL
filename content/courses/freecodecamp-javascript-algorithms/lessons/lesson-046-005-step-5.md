---
id: lesson-046-005
title: Step 5
chapterId: chapter-46
order: 5
duration: 5
objectives:
  - Step 5
---

# Step 5

You need to keep track of the shortest known distance from the start node to every other node in the graph.

To do this, create a variable named `distances` and initialize it as a list containing a single element: `INF`.

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
def shortest_path(matrix, start_node, target_node=None):
    n = len(matrix)

--fcc-editable-region--
```

## Hints

1. You should create a variable named `distances`.
2. The `distances` list should be initialized to `[INF]`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 686b73007fc582db0132c361*
