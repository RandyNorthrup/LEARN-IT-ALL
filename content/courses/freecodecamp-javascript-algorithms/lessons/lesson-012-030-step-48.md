---
id: lesson-012-030
title: Step 48
chapterId: chapter-12
order: 30
duration: 5
objectives:
  - Step 48
---

# Step 48

Finally, below the `else` clause, append the neighbor node to its path.

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
        for node, distance in graph[current]:
            if distance + distances[current] < distances[node]:
                distances[node] = distance + distances[current]
                if paths[node][-1] == node:
                    paths[node] = paths[current]
                else:
                    paths[node].extend(paths[current])
--fcc-editable-region--    
    print(f'Unvisited: {unvisited}\nDistances: {distances}\nPaths: {paths}')
    
#shortest_path(my_graph, 'A')
```

## Hints

1. You should append `node` to `paths[node]` just after your `else` clause.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 655791847db8a9bd0b685f40*
