---
id: lesson-046-021
title: Step 22
chapterId: chapter-46
order: 21
duration: 5
objectives:
  - Step 22
---

# Step 22

At this point, you only want to display results for nodes that are not the start node and are reachable from it.

Add a conditional that checks if `node_no` equals `start_node` **or** if `distances[node_no]` equals `INF`.

If either condition is true, use `continue` to skip to the next iteration of the loop.

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
        pass

--fcc-editable-region--
```

## Hints

1. You should add a conditional statement inside the loop.
2. Your `if` statement should check if `node_no` is equal to `start_node` *or* if `distances[node_no]` is equal to `INF`.
3. You should use `continue` to skip to the next iteration of the loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 687b43c0e20d695e0b8cca5b*
