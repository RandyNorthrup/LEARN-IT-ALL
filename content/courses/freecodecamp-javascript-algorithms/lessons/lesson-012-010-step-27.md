---
id: lesson-012-010
title: Step 27
chapterId: chapter-12
order: 10
duration: 5
objectives:
  - Step 27
---

# Step 27

While the algorithm explores the graph, it should keep track of the currently known shortest distance between the starting node and the other nodes.

Before your `for` loop, create a new variable named `distances` and assign it an empty dictionary.

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
    for node in graph:
        unvisited.append(node)
--fcc-editable-region--
```

## Hints

1. You should have a variable named `distances`.
2. Your `distances` variable should be an empty dictionary.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6557746aad2844a0cd864e12*
