---
id: lesson-046-015
title: Step 16
chapterId: chapter-46
order: 15
duration: 5
objectives:
  - Step 16
---

# Step 16

Now that you've selected and marked a node as visited, it's time to look at all of its neighbors to see if you can find shorter paths to them.

After the line `visited[current] = True`, add a `for` loop that iterates through `node_no` in `range(n)`.

Inside this loop, create a variable `distance` and set it to `matrix[current][node_no]`. This will give you the distance from the current node to the neighbor node.

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

--fcc-editable-region--
```

## Hints

1. You should add a `for` loop after marking the current node as visited.
2. The loop should iterate through `node_no` in `range(n)`.
3. You should create a variable `distance` inside the loop.
4. The variable `distance` should be set to `matrix[current][node_no]`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 687775bed85144353d298665*
