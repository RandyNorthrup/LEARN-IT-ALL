---
id: lesson-012-031
title: Step 49
chapterId: chapter-12
order: 31
duration: 5
objectives:
  - Step 49
---

# Step 49

The `.remove()` method removes from a list the first matching element that is passed as the argument:

```py
my_list = ['larch', 1, True, 1]
my_list.remove(1)
print(my_list) # Output: ['larch', True, 1]
```

Terminate the `while` loop by removing the current node from the `unvisited` list. Pay attention to the indentation.

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
                paths[node].append(node)
--fcc-editable-region--    
    print(f'Unvisited: {unvisited}\nDistances: {distances}\nPaths: {paths}')
    
#shortest_path(my_graph, 'A')
```

## Hints

1. You should use the `.remove()` method to remove the current node from `unvisited` after your `for` loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 655791ae44c182bd92f31caa*
