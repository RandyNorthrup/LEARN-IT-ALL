---
id: lesson-012-023
title: Step 40
chapterId: chapter-12
order: 23
duration: 5
objectives:
  - Step 40
---

# Step 40

Inside the `while` loop, the first thing to do is define the current node to visit. For that you can use the `min()` function. It returns the smallest item from the iterable passed as the argument.

Remove `pass`, then create a variable called `current` and assign it `min(unvisited)`.

## Starter Code

```html
my_graph = {
    'A': [('B', 3), ('D', 1)],
    'B': [('A', 3), ('C', 4)],
    'C': [('B', 4), ('D', 7)],
    'D': [('A', 1), ('C', 7)]
}

def shortest_path(graph, start):
    unvisited = list(graph)
    distances = {node: 0 if node == start else float('inf') for node in graph}
    paths = {node: [] for node in graph}
    paths[start].append(start)
--fcc-editable-region--
    while unvisited:
        pass
--fcc-editable-region--    
    print(f'Unvisited: {unvisited}\nDistances: {distances}\nPaths: {paths}')
    
#shortest_path(my_graph, 'A')
```

## Hints

1. You should create a `current` variable in your `while` loop.
2. You should assign `min(unvisited)` to your `current` variable. Remember to delete `pass`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65578d0f6c78a0b868a43b9c*
