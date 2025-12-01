---
id: lesson-046-026
title: Step 6
chapterId: chapter-46
order: 26
duration: 5
objectives:
  - Step 6
---

# Step 6

Right now, the `distances` list only has one element. However, you need one distance value for each node in the graph.

In Python, you can multiply a list by an integer to repeat it. For example, `[0] * 3` creates `[0, 0, 0]`.

Update the `distances` list to contain `n` copies of `INF` by multiplying `[INF]` by `n`.

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
    distances = [INF]

--fcc-editable-region--
```

## Hints

1. You should update `distances` to contain `n` copies of `INF`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 68e4c0ff9edcc92771d7549a*
