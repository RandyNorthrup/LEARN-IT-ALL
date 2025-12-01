---
id: lesson-046-009
title: Step 10
chapterId: chapter-46
order: 9
duration: 5
objectives:
  - Step 10
---

# Step 10

In this step, you will add a loop that will run once for each node in the graph. This loop will allow the algorithm to update distances and paths over multiple passes.

Create a `for` loop that runs `n` times. Use `_` as the loop variable since you don't need to use the iteration value.  

Inside the loop, you need to prepare for selecting the next node to process by creating two variables: 

- one to hold the smallest distance found so far in the current iteration  
- and another to store the index of the node that has this smallest distance.

Create variables `min_distance` and `current`, and set them to `INF` and `-1`, respectively.

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

--fcc-editable-region--
```

## Hints

1. You should have a `for` loop within the `shortest_path` function.
2. Your `for` loop should iterate over `range(n)`.
3. Your for loop should use `_` as the iteration variable.
4. You should create a variable named `min_distance` and set it to `INF` inside the for loop.
5. You should create a variable named `current` and set it to `-1` inside the for loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 68760464eb9c2e79cc913fac*
