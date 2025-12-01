---
id: lesson-046-006
title: Step 7
chapterId: chapter-46
order: 6
duration: 5
objectives:
  - Step 7
---

# Step 7

Now that you have your `distances` list initialized, you need to update the distance for the starting node.

Since the distance from the starting node to itself is always `0`, set the value at the `start_node` index in the `distances` list to `0`.

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
    distances = [INF] * n

--fcc-editable-region--
```

## Hints

1. You should set `distances[start_node]` to `0`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 686b7848fbaa41e0c2a7efef*
