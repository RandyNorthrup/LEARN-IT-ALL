---
id: lesson-046-004
title: Step 4
chapterId: chapter-46
order: 4
duration: 5
objectives:
  - Step 4
---

# Step 4

You need to store the number of nodes in the graph. For this you will need a variable that matches the length of the adjacency matrix.

Inside the `shortest_path` function, create a variable `n` and set it to the length of the `matrix`.

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

--fcc-editable-region--
def shortest_path(matrix, start_node, target_node=None):
    pass

--fcc-editable-region--
```

## Hints

1. You should initialize `n` to the length of the `matrix`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 68625ad34aa3f58d7f3b9b07*
