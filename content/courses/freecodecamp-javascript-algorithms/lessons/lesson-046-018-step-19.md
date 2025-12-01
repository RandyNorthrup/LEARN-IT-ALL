---
id: lesson-046-018
title: Step 19
chapterId: chapter-46
order: 18
duration: 5
objectives:
  - Step 19
---

# Step 19

When you find a shorter path to a node, you also need to update the actual path taken to reach it.

Inside the same conditional block, update the `paths` list at the neighbor's index to reflect the new, shorter path.

You should assign `paths[node_no]` to be the current path to the `current` node, with the `node_no` (the neighbor) added at the end.

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

        if current == -1:
            break
        visited[current] = True

--fcc-editable-region--
        for node_no in range(n):
            distance = matrix[current][node_no]
            if distance != INF and not visited[node_no]:
                new_distance = distances[current] + distance
                if new_distance < distances[node_no]:
                    distances[node_no] = new_distance

--fcc-editable-region--
```

## Hints

1. You should update `paths[node_no]` to be the current path plus the neighbor node.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 687b3c7a3af0df59b363712e*
