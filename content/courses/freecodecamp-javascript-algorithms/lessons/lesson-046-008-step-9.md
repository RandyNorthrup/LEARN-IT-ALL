---
id: lesson-046-008
title: Step 9
chapterId: chapter-46
order: 8
duration: 5
objectives:
  - Step 9
---

# Step 9

As the algorithm runs, you need to keep track of which nodes you've already visited, so you don't process them more than once.

To do this, create a list named `visited` and initialize it with `False` for every node.

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
    distances[start_node] = 0
    paths = [[node_no] for node_no in range(n)]

--fcc-editable-region--
```

## Hints

1. You should have a list named `visited` inside the `shortest_path` function.
2. You should initialize the `visited` list with `False` for every node using `[False] * n`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 686b82af323098e7a5203bf4*
