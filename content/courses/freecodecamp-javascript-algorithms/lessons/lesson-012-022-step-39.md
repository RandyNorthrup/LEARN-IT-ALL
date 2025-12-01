---
id: lesson-012-022
title: Step 39
chapterId: chapter-12
order: 22
duration: 5
objectives:
  - Step 39
---

# Step 39

Before the `print` call, create a `while` loop that runs while `unvisited` is not empty. Use the `pass` keyword to fill the loop body.

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
    
    print(f'Unvisited: {unvisited}\nDistances: {distances}\nPaths: {paths}')
    
#shortest_path(my_graph, 'A')
--fcc-editable-region--
```

## Hints

1. You should have a `while` loop that executes while `unvisited` is not empty. Don't forget the `pass` keyword.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65578cee7f2cb8b80127cce2*
