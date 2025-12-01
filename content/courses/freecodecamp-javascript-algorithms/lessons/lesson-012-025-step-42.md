---
id: lesson-012-025
title: Step 42
chapterId: chapter-12
order: 25
duration: 5
objectives:
  - Step 42
---

# Step 42

After the `current` variable assignment, create a `for` loop to iterate over the tuples in the `graph[current]` list. You will need two iterating variables for that. Remember to use `pass` to fill the loop body.

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
        current = min(unvisited, key=distances.get)
--fcc-editable-region--    
    print(f'Unvisited: {unvisited}\nDistances: {distances}\nPaths: {paths}')
    
#shortest_path(my_graph, 'A')
```

## Hints

1. You should create a `for` loop to iterate over the tuples items in the `graph[current]` list. Use two iterating variables and don't forget to add the `pass` keyword.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65578f895f2a65ba7a916804*
