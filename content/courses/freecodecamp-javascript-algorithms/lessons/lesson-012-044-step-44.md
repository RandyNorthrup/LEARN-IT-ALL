---
id: lesson-012-044
title: Step 44
chapterId: chapter-12
order: 44
duration: 5
objectives:
  - Step 44
---

# Step 44

When the condition of your new `if` is true, a shorter path to the neighbor node has been found.

Inside your new `if` block, delete `pass` and reassign the neighbor node distance to the sum of the neighbor node distance plus the distance of `current`.

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
        for node, distance in graph[current]:
--fcc-editable-region--
            if distance + distances[current] < distances[node]:
                pass
--fcc-editable-region--
    print(f'Unvisited: {unvisited}\nDistances: {distances}\nPaths: {paths}')
    
#shortest_path(my_graph, 'A')
```

## Hints

1. You should assign `distance + distances[current]` to `distances[node]` inside your new `if`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 657891ab9c1903f4e55433ba*
