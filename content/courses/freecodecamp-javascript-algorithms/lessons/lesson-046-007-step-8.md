---
id: lesson-046-007
title: Step 8
chapterId: chapter-46
order: 7
duration: 5
objectives:
  - Step 8
---

# Step 8

In addition to tracking distances, you also need to keep track of the actual paths taken to reach each node.

You'll create a list where each entry stores the path taken to reach that node. Initially, each node's path will just contain itself.  

List comprehensions provide a concise way to create lists. For example:

```py
[x * 2 for x in range(3)]
```

Create a variable named `paths` and initialize it using a list comprehension that creates a list containing `[node_no]` for each `node_no` in `range(n)`.

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
    n = len(matrix)
    distances = [INF] * n
    distances[start_node] = 0

--fcc-editable-region--
```

## Hints

1. You should have a variable called `paths`.
2. You should initialize `paths` using a list comprehension.
3. Your list comprehension should use `node_no` to iterate over `range(n)`.
4. Your list comprehension should evaluate `[node_no]` for each `node_no` in `range(n)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 686b78bc13d518e1267448e4*
