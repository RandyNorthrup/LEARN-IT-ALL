---
id: lesson-046-010
title: Step 11
chapterId: chapter-46
order: 10
duration: 5
objectives:
  - Step 11
---

# Step 11

Now you need to check every node to find the one with the smallest known distance that has not been visited yet.

To do this, add a `for` loop inside the main loop.

The loop should iterate through each `node_no` in `range(n)`, where `n` is the number of nodes in the graph. Add `pass` as the body of the loop for now.

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

def shortest_path(matrix, start_node, target_node=None):
    n = len(matrix)
    distances = [INF] * n
    distances[start_node] = 0
    paths = [[node_no] for node_no in range(n)]
    visited = [False] * n

--fcc-editable-region--
    for _ in range(n):  
        min_distance = INF  
        current = -1

--fcc-editable-region--
```

## Hints

1. You should have a second `for` loop within the `shortest_path` function.
2. Your `for` loop should iterate over `range(n)` with `node_no` as the iteration variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 68760671d950767b055bf2f9*
