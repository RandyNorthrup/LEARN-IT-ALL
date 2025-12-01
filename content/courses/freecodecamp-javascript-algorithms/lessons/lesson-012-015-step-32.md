---
id: lesson-012-015
title: Step 32
chapterId: chapter-12
order: 15
duration: 5
objectives:
  - Step 32
---

# Step 32

All the distances in `distances` are set to infinite, except for the starting node. The `unvisited` list contains all the nodes in your graph. But actually, you don't need that `for` loop to achieve this result.

Remove your `for` loop with its entire body.

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
    unvisited = []
    distances = {}
    for node in graph:
        unvisited.append(node)
        if node == start:
            distances[node] = 0
        else:
            distances[node] = float('inf')
    print(f'Unvisited: {unvisited}\nDistances: {distances}')
    
shortest_path(my_graph, 'A')
--fcc-editable-region--
```

## Hints

1. You should remove your `for` loop and all the nested code.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 655777060d8ddea6741be1b1*
