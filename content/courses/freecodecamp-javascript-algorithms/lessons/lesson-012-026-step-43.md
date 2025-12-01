---
id: lesson-012-026
title: Step 43
chapterId: chapter-12
order: 26
duration: 5
objectives:
  - Step 43
---

# Step 43

Create an `if` statement to check if the distance of the neighbor node (the second item in the processed tuple) plus the distance of `current` is less than the currently known distance of the neighbor node (the first item in the processed tuple). 

Use the `pass` keyword to temporarily fill the body of the `if`.

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
    
    while unvisited:
        current = min(unvisited, key=distances.get)
--fcc-editable-region--
        for node, distance in graph[current]:
            pass
--fcc-editable-region--    
    print(f'Unvisited: {unvisited}\nDistances: {distances}\nPaths: {paths}')
    
#shortest_path(my_graph, 'A')
```

## Hints

1. You should have an `if` statement to check if `distance + distances[current]` is less than `distances[node]`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65578fcf00322dbad5dee05b*
