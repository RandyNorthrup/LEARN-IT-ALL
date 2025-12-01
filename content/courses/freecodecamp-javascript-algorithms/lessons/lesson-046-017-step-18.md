---
id: lesson-046-017
title: Step 18
chapterId: chapter-46
order: 17
duration: 5
objectives:
  - Step 18
---

# Step 18

Now that you've calculated the new possible distance to the neighbor, check if it's better than the one currently stored in the `distances` list. If it is, update the distance.

Inside the existing `if` block, add an `if` statement that checks if `new_distance` is less than `distances[node_no]`.

Inside this new conditional block, update `distances[node_no]` to store the `new_distance`.

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

--fcc-editable-region--
```

## Hints

1. You should have a nested `if` statement that checks if `new_distance` is less than `distances[node_no]`.
2. You should update `distances[node_no]` to store the `new_distance`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 687b3926419dec576850b814*
