---
id: lesson-046-022
title: Step 23
chapterId: chapter-46
order: 22
duration: 5
objectives:
  - Step 23
---

# Step 23

Now that you've determined a node should be displayed, you need to format its path so it can be printed clearly. For this you will use a generator expression.

A generator expression is similar to a list comprehension, but instead of creating a list, it generates each value one at a time. It uses parentheses `()` instead of square brackets `[]`. For example:

```py
numbers = [1, 2, 3]
squared = (x**2 for x in numbers)  # Generator expression
```

Inside the loop after the `if` statement, create a variable called `string_path`. Assign it a generator expression that converts each node number in `paths[node_no]` to a string using `str()`. 

The generator expression should iterate over each node number `n` in `paths[node_no]`.

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

--fcc-editable-region--
```

## Hints

1. You should create a variable called `string_path`.
2. You should assign a generator expression to `string_path`.
3. Your generator expression should iterate over `paths[node_no]`.
4. Your generator expression should use `n` as the iteration variable to iterate over `paths[node_no]`.
5. Your generator expression should evaluate `str(n)` for each `n` in `paths[node_no]`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 687b45e16f38ad5f4e4bd799*
