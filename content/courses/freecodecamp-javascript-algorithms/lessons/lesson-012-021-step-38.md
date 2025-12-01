---
id: lesson-012-021
title: Step 38
chapterId: chapter-12
order: 21
duration: 5
objectives:
  - Step 38
---

# Step 38

Your function is going to explore all the nodes connected to the starting node. It will calculate the shortest paths for all of them. Then, it will remove the starting node from the unvisited nodes. 

Next, the closest neighbor node will be visited and the process will be repeated until all the nodes are visited.

From now on, you are going to work on the main loop that explores the nodes in the graph. To avoid issues with running an infinite loop during the algorithm development, turn your function call into a comment.

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
    
shortest_path(my_graph, 'A')
--fcc-editable-region--
```

## Hints

1. You should turn your function call into a comment.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65578cb031cd93b77a285db2*
