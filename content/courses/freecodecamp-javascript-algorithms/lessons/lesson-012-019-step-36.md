---
id: lesson-012-019
title: Step 36
chapterId: chapter-12
order: 19
duration: 5
objectives:
  - Step 36
---

# Step 36

Since the algorithm begins its assessment from the starting node, after creating the `paths` dictionary, you need to add the starting node to its own list in the `paths` dictionary.

Use the `.append()` method to append `start` to the `paths[start]` list.

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
    unvisited = list(graph)
    distances = {node: 0 if node == start else float('inf') for node in graph}
    paths = {node: [] for node in graph}
    
    print(f'Unvisited: {unvisited}\nDistances: {distances}')
    
shortest_path(my_graph, 'A')
--fcc-editable-region--
```

## Hints

1. You should use the `.append()` method to append `start` to `paths[start]`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65578c17d54dfab65cd54b95*
