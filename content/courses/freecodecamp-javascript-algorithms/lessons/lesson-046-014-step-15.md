---
id: lesson-046-014
title: Step 15
chapterId: chapter-46
order: 14
duration: 5
objectives:
  - Step 15
---

# Step 15

If a valid node was found in the pass, you need to mark it as visited so it won't be considered again in future iterations.

After the `if` statement you added in the previous step, set `visited[current]` to `True`.

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

    for _ in range(n):
        min_distance = INF  
        current = -1  
        for node_no in range(n):  
            if not visited[node_no] and distances[node_no] < min_distance:  
                min_distance = distances[node_no]  
                current = node_no

--fcc-editable-region--
        if current == -1:  
            break

--fcc-editable-region--
```

## Hints

1. You should set `visited[current]` to `True` after your last `if` statement.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 687774e17e0972345de2527a*
