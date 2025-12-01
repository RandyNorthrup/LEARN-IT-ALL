---
id: lesson-012-027
title: Step 45
chapterId: chapter-12
order: 27
duration: 5
objectives:
  - Step 45
---

# Step 45

Once the distance to a node is set inside the `distances` dictionary, you need to keep track of the path to that node, too. If the distance for the node in the processed tuple has been updated, the last item in its path is the node itself.

Inside your conditional, nest another `if` statement that triggers when the last element of `paths[node]` is equal to `node`. Use `pass` to fill the `if` statement body.

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
--fcc-editable-region--    
    print(f'Unvisited: {unvisited}\nDistances: {distances}\nPaths: {paths}')
    
#shortest_path(my_graph, 'A')
```

## Hints

1. You should create a nested `if` statements that checks if `paths[node][-1]` is equal to `node`. Don't forget to use `pass`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 655790d113d14dbb727eaf41*
