---
id: lesson-012-009
title: Step 26
chapterId: chapter-12
order: 9
duration: 5
objectives:
  - Step 26
---

# Step 26

Create a `for` loop to iterate over your graph, and use the `.append()` method to add each node to the end of the `unvisited` list.

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
--fcc-editable-region--
```

## Hints

1. You should create a `for` loop to iterate over `graph` inside the `shortest_path` function.
2. You should append each node to `unvisited` inside your `for` loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6557743527cb92a06417ea97*
