---
id: lesson-046-019
title: Step 20
chapterId: chapter-46
order: 19
duration: 5
objectives:
  - Step 20
---

# Step 20

Once the algorithm has finished running, you need to decide which node(s) to display results for.

If a specific `target_node` was provided, you'll only show the distance and path to that node. Otherwise, you'll show results for all nodes.

After the outer `for _ in range(n):` loop ends, create a variable named `targets`. Use a conditional expression to assign it `[target_node]` if `target_node` is not `None`, otherwise assign it `list(range(n))`.

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

--fcc-editable-region--
```

## Hints

1. You should create a variable named `targets`.
2. Your `targets` variable should contain a conditional expression.
3. The conditional expression should check if `target_node is not None`.
4. You should assign `[target_node]` when a target is provided and `range(n)` otherwise.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 687b3ef0c2fe185b2abc4654*
