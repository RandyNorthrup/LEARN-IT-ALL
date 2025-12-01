---
id: lesson-046-024
title: Step 26
chapterId: chapter-46
order: 24
duration: 5
objectives:
  - Step 26
---

# Step 26

At the end of your function, return the data you've computed so it can be used outside the function.

Return both the list of shortest `distances` from the `start_node` to all other nodes and the list of `paths` that lead to each node

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

        for node_no in range(n):
            distance = matrix[current][node_no]
            if distance != INF and not visited[node_no]:
                new_distance = distances[current] + distance
                if new_distance < distances[node_no]:
                    distances[node_no] = new_distance
                    paths[node_no] = paths[current] + [node_no]

--fcc-editable-region--
    targets = [target_node] if target_node is not None else range(n)
    for node_no in targets:
        if node_no == start_node or distances[node_no] == INF:
            continue
        string_path = (str(n) for n in paths[node_no])
        path = ' -> '.join(string_path)
        print(f'\n{start_node}-{node_no} distance: {distances[node_no]}\nPath: {path}')

--fcc-editable-region--
```

## Hints

1. You should have a `return` statement at the end of your function.
2. You should return both `distances` and `paths`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 687b499774fc9061b32e13cd*
