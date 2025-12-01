---
id: lesson-046-012
title: Step 13
chapterId: chapter-46
order: 12
duration: 5
objectives:
  - Step 13
---

# Step 13

If the conditional you just added is true, that means the current node is the best unvisited option you've found so far and you need to update your variables to reflect that.

Inside the `if` block, update `min_distance` to `distances[node_no]` and set `current` to `node_no`.

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
        for node_no in range(n):  
            if not visited[node_no] and distances[node_no] < min_distance:  
                pass

--fcc-editable-region--
```

## Hints

1. You should update the `min_distance` variable to `distances[node_no]`.
2. You should set `current` to `node_no`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 68760b53e250f982473e1808*
