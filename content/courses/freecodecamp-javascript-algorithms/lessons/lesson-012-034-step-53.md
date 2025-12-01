---
id: lesson-012-034
title: Step 53
chapterId: chapter-12
order: 34
duration: 5
objectives:
  - Step 53
---

# Step 53

The algorithm is complete but you can improve the output. Also, you can provide the function with an additional argument to return only the path between two nodes.

Add `target` as the third parameter to your function declaration and give it the default value of an empty string.

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
--fcc-editable-region--
    unvisited = list(graph)
    distances = {node: 0 if node == start else float('inf') for node in graph}
    paths = {node: [] for node in graph}
    paths[start].append(start)
    
    while unvisited:
        current = min(unvisited, key=distances.get)
        for node, distance in graph[current]:
            if distance + distances[current] < distances[node]:
                distances[node] = distance + distances[current]
                if paths[node] and paths[node][-1] == node:
                    paths[node] = paths[current][:]
                else:
                    paths[node].extend(paths[current])
                paths[node].append(node)
        unvisited.remove(current)
    
    print(f'Unvisited: {unvisited}\nDistances: {distances}\nPaths: {paths}')
    
shortest_path(my_graph, 'A')
```

## Hints

1. Your function should take three parameters:`graph`, `start`, and `target`. The order matters.
2. The `target` parameter should have the default value of an empty string.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6557924d47c325bf27afbe51*
