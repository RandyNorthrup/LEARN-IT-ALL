---
id: lesson-012-012
title: Step 29
chapterId: chapter-12
order: 12
duration: 5
objectives:
  - Step 29
---

# Step 29

At the beginning, all the other nodes in the graph are considered to be at infinite distance from the source node, because the distance has not been determined yet.

Create an `else` clause and assign an infinite value to the node in the `distances` dictionary. For that, use the `float()` function with the string `'inf'` as argument to generate a floating point number representing the positive infinity.

## Starter Code

```html
my_graph = {
    'A': [('B', 3), ('D', 1)],
    'B': [('A', 3), ('C', 4)],
    'C': [('B', 4), ('D', 7)],
    'D': [('A', 1), ('C', 7)]
}

--fcc-editable-region--
def shortest_path(graph, start):
    unvisited = []
    distances = {}
    for node in graph:
        unvisited.append(node)
        if node == start:
            distances[node] = 0
--fcc-editable-region--
```

## Hints

1. You should have an `else` clause.
2. You should assign `float('inf')` to `distances[node]` inside your new `else` clause.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 655774d01daeeaa1978b99d5*
