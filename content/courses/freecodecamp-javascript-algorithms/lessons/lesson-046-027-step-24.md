---
id: lesson-046-027
title: Step 24
chapterId: chapter-46
order: 27
duration: 5
objectives:
  - Step 24
---

# Step 24

Now you'll use the `join()` method to combine the string representations of the node numbers into a single readable path.

The `join()` method takes an iterable (like your generator expression) and combines all elements into one string, placing the separator between each element. For example:

```py
numbers = ['1', '2', '3']
route = ' -> '.join(numbers) # route will be '1 -> 2 -> 3'
```

Create a variable called `path` and assign it the result of joining `string_path` using `' -> '` as the separator.

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
        
--fcc-editable-region--
```

## Hints

1. You should create a variable called `path`.
2. You use `join` to join the items in `string_path` with `' -> '` as the separator and assign the result to `path`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 69046179fba35c03dec84fb6*
