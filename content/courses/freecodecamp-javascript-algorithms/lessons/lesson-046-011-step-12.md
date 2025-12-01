---
id: lesson-046-011
title: Step 12
chapterId: chapter-46
order: 11
duration: 5
objectives:
  - Step 12
---

# Step 12

You need to decide whether the current node is a better choice than the one you've already found (if any). To do this, you'll add a conditional statement inside the loop.

The condition should do two things:

- Check if the node has not been visited yet.
- Compare the known distance to the current `min_distance`.

Inside the inner `for` loop, add an `if` statement that checks whether `node_no` has not been visited **and** whether `distances[node_no]` is less than `min_distance`.

Add `pass` as a placeholder inside the conditional block.

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
            pass

--fcc-editable-region--
```

## Hints

1. You should add an `if` statement inside your inner `for` loop.
2. Your `if` statement should check if the node is unvisited (`visited[node_no]` is falsy) and `distances[node_no]` is less than `min_distance`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6876089f7a500b7c782e5b83*
