---
id: lesson-012-020
title: Step 37
chapterId: chapter-12
order: 20
duration: 5
objectives:
  - Step 37
---

# Step 37

Add `\nPaths: {paths}` at the end of the f-string passed to the `print` call, so that it prints the `paths` variable, too.

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
    paths[start].append(start)
    
    print(f'Unvisited: {unvisited}\nDistances: {distances}')
    
shortest_path(my_graph, 'A')
--fcc-editable-region--
```

## Hints

1. You should modify your existing `print` call by adding `\nPaths: {paths}` at the end of the f-string.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65578c74607d40b6d8c4757f*
